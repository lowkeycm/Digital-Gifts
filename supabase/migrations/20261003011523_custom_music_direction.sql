-- Saved server-generated music direction is private alongside the existing job.
-- Nullable for all previous songs; no new permissions or RLS policies.
alter table public.song_beta_jobs add column music_direction jsonb;
comment on column public.song_beta_jobs.music_direction is 'Validated musical direction, model/version, fingerprint and usage. Customer story remains untouched in session raw_answers.';
