-- Separate free-test sessions from legacy demo orders. No fake payment records.
create table public.song_beta_sessions (
 id uuid primary key default gen_random_uuid(),
 request_id uuid not null unique,
 access_token uuid not null default gen_random_uuid(),
 gift_token uuid not null default gen_random_uuid(),
 email text not null,
 ip_hash text not null,
 raw_answers jsonb not null,
 created_at timestamptz not null default now()
);
create table public.song_beta_jobs (
 id uuid primary key default gen_random_uuid(),
 session_id uuid not null references public.song_beta_sessions(id),
 kind text not null check(kind in ('original','revision')),
 notes text not null default '',
 status text not null default 'submitting' check(status in ('submitting','queued','processing','complete','failed','uncertain')),
 task_id text unique,
 callback_token uuid not null default gen_random_uuid(),
 callback_payload jsonb,
 error_code text,
 sync_until timestamptz,
 last_sync_at timestamptz,
 created_at timestamptz not null default now()
);
create table public.song_beta_tracks (
 id uuid primary key default gen_random_uuid(),
 session_id uuid not null references public.song_beta_sessions(id),
 job_id uuid not null references public.song_beta_jobs(id),
 provider_audio_id text not null,
 storage_path text not null,
 title text not null,
 lyrics text not null default '',
 duration numeric,
 created_at timestamptz not null default now(),
 unique(job_id, provider_audio_id)
);
create table public.song_beta_feedback (
 session_id uuid primary key references public.song_beta_sessions(id),
 rating integer not null check(rating between 1 and 5),
 comments text not null check(char_length(comments)<=3000),
 reaction_url text check(char_length(reaction_url)<=2000),
 may_contact boolean not null default false,
 updated_at timestamptz not null default now()
);
alter table public.song_beta_sessions enable row level security;
alter table public.song_beta_jobs enable row level security;
alter table public.song_beta_tracks enable row level security;
alter table public.song_beta_feedback enable row level security;
revoke all on public.song_beta_sessions,public.song_beta_jobs,public.song_beta_tracks,public.song_beta_feedback from public,anon,authenticated;
grant all on public.song_beta_sessions,public.song_beta_jobs,public.song_beta_tracks,public.song_beta_feedback to service_role;
create index song_beta_email_time on public.song_beta_sessions(email,created_at);
create index song_beta_ip_time on public.song_beta_sessions(ip_hash,created_at);
create index song_beta_job_session on public.song_beta_jobs(session_id,created_at);
create index song_beta_job_time on public.song_beta_jobs(created_at);
create index song_beta_track_session on public.song_beta_tracks(session_id);

-- Called only with the backend secret. Atomic reservations prevent double clicks
-- and concurrent visitors from exceeding the global credit budget.
create function public.reserve_beta_song(p_request_id uuid,p_email text,p_ip_hash text,p_answers jsonb)
returns public.song_beta_sessions language plpgsql security invoker set search_path=''
as $$
declare s public.song_beta_sessions;
begin
 perform pg_advisory_xact_lock(71340922);
 select * into s from public.song_beta_sessions where request_id=p_request_id;
 if found then return s; end if;
 if (select count(*) from public.song_beta_sessions where created_at>now()-interval '1 day')>=50
 or (select count(*) from public.song_beta_sessions where email=lower(trim(p_email)) and created_at>now()-interval '1 day')>=3
 or (select count(*) from public.song_beta_sessions where ip_hash=p_ip_hash and created_at>now()-interval '1 day')>=10
 then raise exception 'beta_limit' using errcode='P0001'; end if;
 insert into public.song_beta_sessions(request_id,email,ip_hash,raw_answers) values(p_request_id,lower(trim(p_email)),p_ip_hash,p_answers) returning * into s;
 return s;
end $$;

create function public.reserve_beta_job(p_session_id uuid,p_kind text,p_notes text default '',p_retry boolean default false)
returns public.song_beta_jobs language plpgsql security invoker set search_path=''
as $$
declare j public.song_beta_jobs;
begin
 perform pg_advisory_xact_lock(71340922);
 perform 1 from public.song_beta_sessions where id=p_session_id for update;
 if not found then raise exception 'missing_session'; end if;
 if p_kind not in ('original','revision') then raise exception 'invalid_kind'; end if;
 select * into j from public.song_beta_jobs where session_id=p_session_id and kind=p_kind order by created_at desc limit 1;
 if found and (j.status<>'failed' or not p_retry) then return j; end if;
 if (select count(*) from public.song_beta_jobs where session_id=p_session_id and kind=p_kind)>=3 then raise exception 'retry_limit'; end if;
 if p_kind='revision' and not exists(select 1 from public.song_beta_jobs where session_id=p_session_id and kind='original' and status='complete') then raise exception 'original_not_ready'; end if;
 if (select count(*) from public.song_beta_jobs where created_at>now()-interval '1 day')>=100 then raise exception 'beta_limit'; end if;
 insert into public.song_beta_jobs(session_id,kind,notes) values(p_session_id,p_kind,coalesce(j.notes,p_notes)) returning * into j;
 return j;
end $$;
-- Returns one row only to the request holding a short synchronization lease.
create function public.claim_beta_sync(p_job_id uuid)
returns setof public.song_beta_jobs language sql security invoker set search_path=''
as $$
 update public.song_beta_jobs set sync_until=now()+interval '90 seconds',last_sync_at=now()
 where id=p_job_id and status not in ('complete','failed')
 and (sync_until is null or sync_until<now())
 and (last_sync_at is null or last_sync_at<now()-interval '8 seconds') returning *
$$;
revoke all on function public.reserve_beta_song(uuid,text,text,jsonb), public.reserve_beta_job(uuid,text,text,boolean), public.claim_beta_sync(uuid) from public,anon,authenticated;
grant execute on function public.reserve_beta_song(uuid,text,text,jsonb), public.reserve_beta_job(uuid,text,text,boolean), public.claim_beta_sync(uuid) to service_role;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('song-beta-audio','song-beta-audio',false,31457280,array['audio/mpeg']) on conflict(id) do nothing;
