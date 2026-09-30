alter table public.song_beta_tracks add constraint song_beta_tracks_session_id_id_key unique(session_id,id);
alter table public.song_beta_sessions add column selected_track_id uuid;
alter table public.song_beta_sessions add constraint selected_track_belongs_to_song
  foreign key(id,selected_track_id) references public.song_beta_tracks(session_id,id);

create table public.song_beta_media (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.song_beta_sessions(id),
  request_id uuid not null unique,
  kind text not null check(kind in ('photo','reaction')),
  mime_type text not null,
  byte_size bigint not null check(byte_size>0 and byte_size<=52428800),
  storage_path text not null unique,
  consent_version text not null default 'private-media-2026-09-30',
  status text not null default 'pending' check(status in ('pending','ready')),
  created_at timestamptz not null default now(),
  unique(session_id,id)
);
alter table public.song_beta_media enable row level security;
revoke all on public.song_beta_media from public,anon,authenticated;
grant all on public.song_beta_media to service_role;
alter table public.song_beta_sessions add column gift_photo_id uuid;
alter table public.song_beta_sessions add column reaction_asset_id uuid;
alter table public.song_beta_sessions add constraint gift_photo_belongs_to_song
  foreign key(id,gift_photo_id) references public.song_beta_media(session_id,id);
alter table public.song_beta_sessions add constraint reaction_belongs_to_song
  foreign key(id,reaction_asset_id) references public.song_beta_media(session_id,id);

create function public.reserve_beta_media(p_session_id uuid,p_request_id uuid,p_kind text,p_mime text,p_size bigint)
returns setof public.song_beta_media language plpgsql security invoker set search_path=public as $$
declare v public.song_beta_media; v_id uuid:=gen_random_uuid(); v_ext text;
begin
  perform pg_advisory_xact_lock(hashtextextended(p_session_id::text,7193));
  select * into v from public.song_beta_media where request_id=p_request_id;
  if found then
    if v.session_id<>p_session_id or v.kind<>p_kind or v.mime_type<>p_mime or v.byte_size<>p_size then raise exception 'upload_request_conflict'; end if;
    return next v; return;
  end if;
  if p_size<=0 or (p_kind='photo' and p_size>8388608) or p_size>52428800 then raise exception 'upload_size'; end if;
  v_ext:=case p_mime when 'image/jpeg' then 'jpg' when 'image/png' then 'png' when 'image/webp' then 'webp' when 'video/mp4' then 'mp4' when 'video/quicktime' then 'mov' when 'video/webm' then 'webm' end;
  if v_ext is null or (p_kind='photo' and p_mime not like 'image/%') or (p_kind='reaction' and p_mime not like 'video/%') or p_kind not in ('photo','reaction') then raise exception 'upload_type'; end if;
  if (select count(*) from public.song_beta_media where session_id=p_session_id and kind=p_kind)>=6 then raise exception 'upload_limit'; end if;
  insert into public.song_beta_media(id,session_id,request_id,kind,mime_type,byte_size,storage_path)
  values(v_id,p_session_id,p_request_id,p_kind,p_mime,p_size,p_session_id::text||'/'||v_id::text||'.'||v_ext) returning * into v;
  return next v;
end $$;
revoke all on function public.reserve_beta_media(uuid,uuid,text,text,bigint) from public,anon,authenticated;
grant execute on function public.reserve_beta_media(uuid,uuid,text,text,bigint) to service_role;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values
 ('song-gift-photos','song-gift-photos',false,8388608,array['image/jpeg','image/png','image/webp']),
 ('song-reaction-videos','song-reaction-videos',false,52428800,array['video/mp4','video/quicktime','video/webm']);
