-- Owner account authorization stays backend-only and separate from song customers.
create table public.song_studio_owners (
  email text primary key check (email = lower(email)),
  user_id uuid unique references auth.users(id) on delete restrict,
  created_at timestamptz not null default now()
);
alter table public.song_studio_owners enable row level security;
revoke all on public.song_studio_owners from public, anon, authenticated;
grant select, update on public.song_studio_owners to service_role;

-- Clay's explicitly recorded operator account, people/clay.md.
insert into public.song_studio_owners(email) values ('nerdsandbots@gmail.com');

create function public.claim_studio_owner(p_user_id uuid, p_email text)
returns boolean language plpgsql security invoker set search_path = '' as $$
declare v_user uuid;
begin
  -- Called only after Supabase getUser verifies the identity and confirmed email.
  select user_id into v_user from public.song_studio_owners
    where email = lower(p_email) for update;
  if not found then return false; end if;
  if v_user is null then
    update public.song_studio_owners set user_id = p_user_id where email = lower(p_email);
    return true;
  end if;
  return v_user = p_user_id;
end;
$$;
revoke all on function public.claim_studio_owner(uuid, text) from public, anon, authenticated;
grant execute on function public.claim_studio_owner(uuid, text) to service_role;

create table public.song_studio_auth_attempts (
  key text primary key check (key ~ '^[a-f0-9]{64}$'),
  window_start timestamptz not null,
  attempts integer not null check (attempts > 0)
);
alter table public.song_studio_auth_attempts enable row level security;
revoke all on public.song_studio_auth_attempts from public, anon, authenticated;
grant select, insert, update, delete on public.song_studio_auth_attempts to service_role;

create function public.reserve_studio_auth_attempt(p_key text)
returns boolean language plpgsql security invoker set search_path = '' as $$
declare v_attempts integer;
begin
  delete from public.song_studio_auth_attempts where window_start < now() - interval '1 day';
  insert into public.song_studio_auth_attempts(key, window_start, attempts)
    values (p_key, now(), 1)
  on conflict (key) do update set
    window_start = case when public.song_studio_auth_attempts.window_start < now() - interval '5 minutes' then now() else public.song_studio_auth_attempts.window_start end,
    attempts = case when public.song_studio_auth_attempts.window_start < now() - interval '5 minutes' then 1 else public.song_studio_auth_attempts.attempts + 1 end
  returning attempts into v_attempts;
  return v_attempts <= 8;
end;
$$;
revoke all on function public.reserve_studio_auth_attempt(text) from public, anon, authenticated;
grant execute on function public.reserve_studio_auth_attempt(text) to service_role;
