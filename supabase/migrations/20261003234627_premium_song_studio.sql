-- Additive, backend-only customer studio fields and separate keepsake entitlement.
alter table public.song_beta_sessions
  add column gift_message text not null default '' check (char_length(gift_message) <= 600),
  add column gift_given_at timestamptz;

create table public.song_keepsake_orders (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null unique references public.song_beta_sessions(id),
  mode text not null check (mode in ('test','live')),
  amount integer not null default 900 check (amount = 900),
  currency text not null default 'usd' check (currency = 'usd'),
  origin text not null,
  stripe_checkout_id text unique,
  checkout_attempt integer not null default 1 check (checkout_attempt > 0),
  status text not null default 'pending' check (status in ('pending','paid')),
  payment_intent text,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);
alter table public.song_keepsake_orders enable row level security;
revoke all on public.song_keepsake_orders from public, anon, authenticated;
grant all on public.song_keepsake_orders to service_role;

create or replace function public.reserve_song_keepsake(p_session_id uuid, p_origin text)
returns public.song_keepsake_orders
language plpgsql security invoker set search_path = '' as $$
declare s public.song_beta_sessions; o public.song_keepsake_orders;
begin
  select * into s from public.song_beta_sessions where id=p_session_id for update;
  if s.id is null or s.payment_status <> 'paid' or s.checkout_mode not in ('test','live') then
    raise exception 'payment_required';
  end if;
  if s.selected_track_id is null then raise exception 'gift_selection_required'; end if;
  insert into public.song_keepsake_orders(session_id,mode,origin)
  values(s.id,s.checkout_mode,p_origin) on conflict(session_id) do nothing;
  select * into o from public.song_keepsake_orders where session_id=s.id;
  return o;
end $$;
revoke all on function public.reserve_song_keepsake(uuid,text) from public, anon, authenticated;
grant execute on function public.reserve_song_keepsake(uuid,text) to service_role;
