-- Existing gifts retain the original record experience and saved presentation.
alter table public.song_beta_sessions
  add column gift_scene text not null default 'record'
  constraint song_beta_sessions_gift_scene_check
  check (gift_scene in ('record', 'teddy', 'equalizer'));

comment on column public.song_beta_sessions.gift_scene is
  'Recipient music experience, independent of the saved note/card/letter presentation. Owner writes through service-only gift API.';
