-- Existing songs keep their access. Checkout is opt-in per session; backend only.
alter table public.song_beta_sessions
 add column checkout_mode text not null default 'free' check(checkout_mode in ('free','test','live')),
 add column payment_status text not null default 'not_required' check(payment_status in ('not_required','pending','paid'));
alter table public.song_beta_sessions add constraint song_payment_mode_valid
 check ((checkout_mode='free' and payment_status='not_required') or (checkout_mode<>'free' and payment_status in ('pending','paid')));
alter table public.song_beta_jobs add column revision_number integer;
update public.song_beta_jobs set revision_number=case when kind='original' then 0 else 1 end;
alter table public.song_beta_jobs alter column revision_number set not null;
alter table public.song_beta_jobs add constraint song_revision_number_valid
 check ((kind='original' and revision_number=0) or (kind='revision' and revision_number between 1 and 3));
alter table public.song_beta_jobs add column request_id uuid unique;

create table public.song_checkout_orders (
 id uuid primary key default gen_random_uuid(),
 session_id uuid not null unique references public.song_beta_sessions(id),
 mode text not null check(mode in ('test','live')),
 amount integer not null default 2900 check(amount=2900),
 currency text not null default 'usd' check(currency='usd'),
 origin text not null,
 stripe_checkout_id text unique,
 stripe_payment_intent text,
 status text not null default 'pending' check(status in ('pending','paid')),
 checkout_attempt integer not null default 1,
 created_at timestamptz not null default now(),
 paid_at timestamptz
);
alter table public.song_checkout_orders enable row level security;
revoke all on public.song_checkout_orders from public,anon,authenticated;
grant all on public.song_checkout_orders to service_role;

create function public.reserve_song_checkout(p_session_id uuid,p_origin text)
returns public.song_checkout_orders language plpgsql security invoker set search_path=''
as $$
declare s public.song_beta_sessions; o public.song_checkout_orders;
begin
 select * into s from public.song_beta_sessions where id=p_session_id for update;
 if not found or s.checkout_mode='free' then raise exception 'invalid_checkout'; end if;
 select * into o from public.song_checkout_orders where session_id=s.id;
 if found then return o; end if;
 insert into public.song_checkout_orders(session_id,mode,origin) values(s.id,s.checkout_mode,p_origin) returning * into o;
 return o;
end $$;

create function public.mark_song_checkout_paid(p_order_id uuid,p_checkout_id text,p_payment_intent text,p_mode text,p_amount integer,p_currency text)
returns public.song_beta_sessions language plpgsql security invoker set search_path=''
as $$
declare o public.song_checkout_orders; s public.song_beta_sessions;
begin
 select * into o from public.song_checkout_orders where id=p_order_id for update;
 if not found or o.mode<>p_mode or o.amount<>p_amount or o.currency<>p_currency
 or o.stripe_checkout_id is distinct from p_checkout_id then raise exception 'invalid_payment'; end if;
 update public.song_checkout_orders set status='paid',paid_at=coalesce(paid_at,now()),stripe_payment_intent=p_payment_intent where id=o.id;
 update public.song_beta_sessions set payment_status='paid' where id=o.session_id and checkout_mode=p_mode returning * into s;
 if not found then raise exception 'invalid_payment_session'; end if;
 return s;
end $$;

-- Replace the old signature. Old callers still work for originals; revisions now
-- require a distinct request UUID, preventing a replay from consuming another round.
drop function public.reserve_beta_job(uuid,text,text,boolean);
create function public.reserve_beta_job(p_session_id uuid,p_kind text,p_notes text default '',p_retry boolean default false,p_request_id uuid default null)
returns public.song_beta_jobs language plpgsql security invoker set search_path=''
as $$
declare j public.song_beta_jobs; s public.song_beta_sessions; round_number integer;
begin
 perform pg_advisory_xact_lock(71340922);
 select * into s from public.song_beta_sessions where id=p_session_id for update;
 if not found then raise exception 'missing_session'; end if;
 if s.checkout_mode<>'free' and s.payment_status<>'paid' then raise exception 'payment_required'; end if;
 if p_kind not in ('original','revision') then raise exception 'invalid_kind'; end if;
 if p_request_id is not null then
  select * into j from public.song_beta_jobs where request_id=p_request_id;
  if found then
   if j.session_id<>p_session_id or j.kind<>p_kind then raise exception 'invalid_request'; end if;
   return j;
  end if;
 end if;
 select * into j from public.song_beta_jobs where session_id=p_session_id and kind=p_kind order by created_at desc,id desc limit 1;
 if p_kind='original' then
  if found and (j.status<>'failed' or not p_retry) then return j; end if;
  round_number:=0;
 elsif p_retry then
  if not found then raise exception 'missing_revision'; end if;
  if j.status<>'failed' then return j; end if;
  round_number:=j.revision_number;
 else
  if p_request_id is null then
   if j.id is not null then return j; end if;
  end if;
  if j.id is not null and j.status not in ('complete','failed') then raise exception 'revision_pending'; end if;
  if j.id is not null and j.status='failed' then raise exception 'revision_retry_required'; end if;
  round_number:=coalesce(j.revision_number,0)+1;
  if round_number>3 then raise exception 'revision_limit'; end if;
 end if;
 if (select count(*) from public.song_beta_jobs where session_id=p_session_id and kind=p_kind and revision_number=round_number)>=3 then raise exception 'retry_limit'; end if;
 if p_kind='revision' and not exists(select 1 from public.song_beta_jobs where session_id=p_session_id and kind='original' and status='complete') then raise exception 'original_not_ready'; end if;
 if (select count(*) from public.song_beta_jobs where created_at>now()-interval '1 day')>=100 then raise exception 'beta_limit'; end if;
 insert into public.song_beta_jobs(session_id,kind,notes,revision_number,request_id)
 values(p_session_id,p_kind,case when p_retry then coalesce(j.notes,'') else coalesce(p_notes,'') end,round_number,p_request_id) returning * into j;
 return j;
end $$;
revoke all on function public.reserve_song_checkout(uuid,text), public.mark_song_checkout_paid(uuid,text,text,text,integer,text), public.reserve_beta_job(uuid,text,text,boolean,uuid) from public,anon,authenticated;
grant execute on function public.reserve_song_checkout(uuid,text), public.mark_song_checkout_paid(uuid,text,text,text,integer,text), public.reserve_beta_job(uuid,text,text,boolean,uuid) to service_role;

-- Mode is chosen by the server at intake reservation, never by a public client.
drop function public.reserve_beta_song(uuid,text,text,jsonb);
create function public.reserve_beta_song(p_request_id uuid,p_email text,p_ip_hash text,p_answers jsonb,p_checkout_mode text default 'free')
returns public.song_beta_sessions language plpgsql security invoker set search_path=''
as $$
declare s public.song_beta_sessions;
begin
 if p_checkout_mode not in ('free','test','live') then raise exception 'invalid_checkout_mode'; end if;
 perform pg_advisory_xact_lock(71340922);
 select * into s from public.song_beta_sessions where request_id=p_request_id;
 if found then return s; end if;
 if (select count(*) from public.song_beta_sessions where created_at>now()-interval '1 day')>=50
 or (select count(*) from public.song_beta_sessions where email=lower(trim(p_email)) and created_at>now()-interval '1 day')>=3
 or (select count(*) from public.song_beta_sessions where ip_hash=p_ip_hash and created_at>now()-interval '1 day')>=10
 then raise exception 'beta_limit' using errcode='P0001'; end if;
 insert into public.song_beta_sessions(request_id,email,ip_hash,raw_answers,checkout_mode,payment_status) values(p_request_id,lower(trim(p_email)),p_ip_hash,p_answers,p_checkout_mode,case when p_checkout_mode='free' then 'not_required' else 'pending' end) returning * into s;
 return s;
end $$;


revoke all on function public.reserve_beta_song(uuid,text,text,jsonb,text) from public,anon,authenticated;
grant execute on function public.reserve_beta_song(uuid,text,text,jsonb,text) to service_role;
