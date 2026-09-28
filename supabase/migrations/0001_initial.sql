create extension if not exists pgcrypto;

create table if not exists public.song_intakes (
  id uuid primary key default gen_random_uuid(),
  email text not null check (char_length(email) between 3 and 320),
  recipient_name text not null check (char_length(recipient_name) between 1 and 80),
  relationship text not null check (char_length(relationship) between 1 and 80),
  occasion text not null check (char_length(occasion) between 1 and 80),
  genre text not null check (char_length(genre) between 1 and 80),
  vocal_preference text not null check (char_length(vocal_preference) between 1 and 80),
  raw_answers jsonb not null check (jsonb_typeof(raw_answers) = 'object'),
  music_brief text not null check (char_length(music_brief) <= 16000),
  status text not null default 'submitted' check (status in ('submitted','preview_ready','paid','delivered','revision_requested','closed')),
  access_token uuid not null default gen_random_uuid() unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.generations (
  id uuid primary key default gen_random_uuid(),
  intake_id uuid not null references public.song_intakes(id) on delete cascade,
  provider text not null check (char_length(provider) between 1 and 80),
  provider_generation_id text,
  kind text not null check (kind in ('preview','full','revision')),
  status text not null default 'queued' check (status in ('queued','processing','complete','failed')),
  audio_path text,
  lyrics text,
  provider_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  intake_id uuid not null unique references public.song_intakes(id) on delete restrict,
  payment_provider text not null check (payment_provider in ('demo','stripe')),
  payment_reference text unique,
  amount_cents integer not null default 2900 check (amount_cents >= 0),
  currency text not null default 'usd' check (char_length(currency) = 3),
  status text not null default 'pending' check (status in ('pending','paid','refunded','failed')),
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create table if not exists public.revisions (
  id uuid primary key default gen_random_uuid(),
  intake_id uuid not null references public.song_intakes(id) on delete cascade,
  generation_id uuid references public.generations(id) on delete set null,
  revision_type text not null check (char_length(revision_type) between 1 and 80),
  customer_notes text not null check (char_length(customer_notes) between 5 and 1500),
  status text not null default 'requested' check (status in ('requested','processing','complete','declined')),
  included_revision boolean not null default true,
  created_at timestamptz not null default now()
);

create unique index if not exists one_included_revision_per_intake on public.revisions(intake_id) where included_revision = true;
create index if not exists generations_intake_idx on public.generations(intake_id, created_at desc);
create index if not exists revisions_intake_idx on public.revisions(intake_id, created_at desc);
create index if not exists revisions_generation_idx on public.revisions(generation_id);

alter table public.song_intakes enable row level security;
alter table public.generations enable row level security;
alter table public.orders enable row level security;
alter table public.revisions enable row level security;

revoke all on table public.song_intakes from anon, authenticated;
revoke all on table public.generations from anon, authenticated;
revoke all on table public.orders from anon, authenticated;
revoke all on table public.revisions from anon, authenticated;

create or replace function public.create_song_intake(
  p_email text,p_recipient_name text,p_relationship text,p_occasion text,p_genre text,p_vocal_preference text,p_raw_answers jsonb,p_music_brief text
) returns table(id uuid,access_token uuid)
language plpgsql security definer set search_path=''
as $$
declare v_id uuid; v_token uuid;
begin
  if p_email is null or char_length(trim(p_email)) not between 3 and 320 then raise exception 'invalid email'; end if;
  if p_raw_answers is null or jsonb_typeof(p_raw_answers)<>'object' then raise exception 'invalid answers'; end if;
  insert into public.song_intakes(email,recipient_name,relationship,occasion,genre,vocal_preference,raw_answers,music_brief)
  values(lower(trim(p_email)),trim(p_recipient_name),trim(p_relationship),trim(p_occasion),trim(p_genre),trim(p_vocal_preference),p_raw_answers,p_music_brief)
  returning public.song_intakes.id,public.song_intakes.access_token into v_id,v_token;
  return query select v_id,v_token;
end $$;

create or replace function public.record_song_generation(
  p_intake_id uuid,p_access_token uuid,p_provider text,p_provider_generation_id text,p_kind text,p_status text,p_audio_path text,p_lyrics text,p_provider_payload jsonb default '{}'::jsonb
) returns table(generation_id uuid)
language plpgsql security definer set search_path=''
as $$
declare v_generation_id uuid;
begin
  if not exists(select 1 from public.song_intakes where id=p_intake_id and access_token=p_access_token) then raise exception 'invalid song access'; end if;
  if p_kind not in('preview','full','revision') then raise exception 'invalid generation kind'; end if;
  if p_status not in('queued','processing','complete','failed') then raise exception 'invalid generation status'; end if;
  if p_kind in('preview','full') then
    select id into v_generation_id from public.generations where intake_id=p_intake_id and kind=p_kind order by created_at desc limit 1;
    if v_generation_id is not null then return query select v_generation_id; return; end if;
  end if;
  insert into public.generations(intake_id,provider,provider_generation_id,kind,status,audio_path,lyrics,provider_payload,completed_at)
  values(p_intake_id,p_provider,p_provider_generation_id,p_kind,p_status,p_audio_path,p_lyrics,coalesce(p_provider_payload,'{}'::jsonb),case when p_status='complete' then now() else null end)
  returning id into v_generation_id;
  update public.song_intakes set status=case when p_kind='preview' and p_status='complete' then 'preview_ready' when p_kind='full' and p_status='complete' then 'delivered' else status end,updated_at=now() where id=p_intake_id;
  return query select v_generation_id;
end $$;

create or replace function public.complete_demo_checkout(p_intake_id uuid,p_access_token uuid)
returns table(order_id uuid)
language plpgsql security definer set search_path=''
as $$
declare v_order_id uuid;
begin
  if not exists(select 1 from public.song_intakes where id=p_intake_id and access_token=p_access_token) then raise exception 'invalid song access'; end if;
  insert into public.orders(intake_id,payment_provider,payment_reference,amount_cents,currency,status,paid_at)
  values(p_intake_id,'demo','demo_'||p_intake_id::text,2900,'usd','paid',now())
  on conflict(intake_id) do update set status='paid',paid_at=coalesce(public.orders.paid_at,excluded.paid_at)
  returning id into v_order_id;
  update public.song_intakes set status='paid',updated_at=now() where id=p_intake_id;
  return query select v_order_id;
end $$;

create or replace function public.request_song_revision(p_intake_id uuid,p_access_token uuid,p_revision_type text,p_customer_notes text)
returns table(revision_id uuid)
language plpgsql security definer set search_path=''
as $$
declare v_revision_id uuid; v_generation_id uuid;
begin
  if not exists(select 1 from public.song_intakes i join public.orders o on o.intake_id=i.id and o.status='paid' where i.id=p_intake_id and i.access_token=p_access_token) then raise exception 'invalid paid song access'; end if;
  if exists(select 1 from public.revisions where intake_id=p_intake_id and included_revision=true) then raise exception 'revision already requested'; end if;
  if char_length(trim(p_customer_notes)) not between 5 and 1500 then raise exception 'invalid revision notes'; end if;
  select id into v_generation_id from public.generations where intake_id=p_intake_id and kind='full' order by created_at desc limit 1;
  insert into public.revisions(intake_id,generation_id,revision_type,customer_notes,status,included_revision)
  values(p_intake_id,v_generation_id,trim(p_revision_type),trim(p_customer_notes),'requested',true)
  returning id into v_revision_id;
  update public.song_intakes set status='revision_requested',updated_at=now() where id=p_intake_id;
  return query select v_revision_id;
end $$;

create or replace function public.get_song_session(p_intake_id uuid,p_access_token uuid)
returns jsonb language sql security definer set search_path=''
as $$
select jsonb_build_object(
'id',i.id,'recipient_name',i.recipient_name,'relationship',i.relationship,'occasion',i.occasion,'genre',i.genre,'vocal_preference',i.vocal_preference,'status',i.status,
'order_status',coalesce((select o.status from public.orders o where o.intake_id=i.id order by o.created_at desc limit 1),'pending'),
'preview',(select jsonb_build_object('id',g.id,'audioPath',g.audio_path,'lyrics',g.lyrics,'status',g.status) from public.generations g where g.intake_id=i.id and g.kind='preview' order by g.created_at desc limit 1),
'full',(select jsonb_build_object('id',g.id,'audioPath',g.audio_path,'lyrics',g.lyrics,'status',g.status) from public.generations g where g.intake_id=i.id and g.kind='full' order by g.created_at desc limit 1),
'revision',(select jsonb_build_object('id',r.id,'revisionType',r.revision_type,'customerNotes',r.customer_notes,'status',r.status) from public.revisions r where r.intake_id=i.id order by r.created_at desc limit 1)
) from public.song_intakes i where i.id=p_intake_id and i.access_token=p_access_token
$$;

create or replace function public.digital_gifts_health()
returns jsonb language sql security invoker set search_path=''
as $$ select jsonb_build_object('ok',true,'schema','personalized_song_v1') $$;

revoke all on function public.create_song_intake(text,text,text,text,text,text,jsonb,text) from public;
revoke all on function public.record_song_generation(uuid,uuid,text,text,text,text,text,text,jsonb) from public;
revoke all on function public.complete_demo_checkout(uuid,uuid) from public;
revoke all on function public.request_song_revision(uuid,uuid,text,text) from public;
revoke all on function public.get_song_session(uuid,uuid) from public;
revoke all on function public.digital_gifts_health() from public;

grant execute on function public.create_song_intake(text,text,text,text,text,text,jsonb,text) to anon;
grant execute on function public.record_song_generation(uuid,uuid,text,text,text,text,text,text,jsonb) to anon;
grant execute on function public.complete_demo_checkout(uuid,uuid) to anon;
grant execute on function public.request_song_revision(uuid,uuid,text,text) to anon;
grant execute on function public.get_song_session(uuid,uuid) to anon;
grant execute on function public.digital_gifts_health() to anon;
