-- Originals are generated before purchase. Revisions remain payment-gated.
alter table public.song_beta_tracks add column preview_storage_path text;

create or replace function public.reserve_beta_job(p_session_id uuid,p_kind text,p_notes text default '',p_retry boolean default false,p_request_id uuid default null)
returns public.song_beta_jobs language plpgsql security invoker set search_path=''
as $$
declare j public.song_beta_jobs; s public.song_beta_sessions; round_number integer;
begin
 perform pg_advisory_xact_lock(71340922);
 select * into s from public.song_beta_sessions where id=p_session_id for update;
 if not found then raise exception 'missing_session'; end if;
 if p_kind='revision' and s.checkout_mode<>'free' and s.payment_status<>'paid' then raise exception 'payment_required'; end if;
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

revoke all on function public.reserve_beta_job(uuid,text,text,boolean,uuid) from public,anon,authenticated;
grant execute on function public.reserve_beta_job(uuid,text,text,boolean,uuid) to service_role;
