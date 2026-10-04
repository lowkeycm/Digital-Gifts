-- Gift presentation preferences; existing owner and recipient access rules apply.
alter table public.song_beta_sessions
  add column if not exists gift_template text not null default 'portrait'
    check (gift_template in ('portrait', 'record', 'letter')),
  add column if not exists gift_shared_at timestamptz;
comment on column public.song_beta_sessions.gift_shared_at is
  'Owner used a share action. Enables the after-gift reminder; does not confirm recipient delivery.';
