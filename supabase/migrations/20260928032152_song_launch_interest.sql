-- Public signup is deliberately write-only. No email list or membership lookup is exposed.
create table public.song_launch_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (email = lower(btrim(email)) and length(email) <= 254),
  source text not null check (source in ('/', '/your-song')),
  consent_version text not null default 'launch-announcement-v1' check (consent_version = 'launch-announcement-v1'),
  consented_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create index song_launch_signups_created_at_idx on public.song_launch_signups(created_at);
alter table public.song_launch_signups enable row level security;
revoke all on table public.song_launch_signups from public, anon, authenticated;
grant select, insert, update, delete on table public.song_launch_signups to service_role;

-- Intentional anonymous intake boundary: validates consent, normalizes, deduplicates,
-- limits growth and returns no data. Cannot read, edit or delete an existing signup.
create function public.register_song_launch_interest(p_email text, p_source text, p_consent boolean)
returns void
language plpgsql security definer set search_path = '' as $$
declare
  normalized_email text := lower(btrim(p_email));
begin
  if p_consent is distinct from true or p_source is null or p_source not in ('/', '/your-song')
     or normalized_email is null or length(normalized_email) > 254
     or normalized_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then
    raise exception 'Invalid signup' using errcode = '22023';
  end if;
  -- Serialize the small intake operation so parallel requests cannot exceed the cap.
  perform pg_advisory_xact_lock(584219761);
  if (select count(*) from public.song_launch_signups where created_at > now() - interval '1 hour') >= 200 then
    raise exception 'Please try again later' using errcode = 'P0429';
  end if;
  insert into public.song_launch_signups(email, source)
    values (normalized_email, p_source)
    on conflict (email) do nothing;
end;
$$;
revoke all on function public.register_song_launch_interest(text, text, boolean) from public, anon, authenticated;
grant execute on function public.register_song_launch_interest(text, text, boolean) to anon, service_role;
