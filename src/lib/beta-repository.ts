import { createPrivateServerClient } from "./supabase";
import type { Intake } from "./intake";
import { ClientError } from "./beta-http";
import { z } from "zod";
import type { SavedMusicDirection } from "./music/direction";
import { hasFullSongAccess } from "./song-access";
export type BetaSession = {
  id: string;
  access_token: string;
  gift_token: string;
  selected_track_id: string | null;
  gift_photo_id: string | null;
  reaction_asset_id: string | null;
  gift_message?: string;
  gift_scene?: "record" | "teddy" | "equalizer";
  gift_template?: "portrait" | "record" | "letter";
  gift_shared_at?: string | null;
  gift_given_at?: string | null;
  raw_answers: Intake;
  created_at: string;
  checkout_mode?: "free" | "test" | "live";
  payment_status?: "not_required" | "pending" | "paid";
};
export type BetaJob = {
  id: string;
  session_id: string;
  kind: "original" | "revision";
  notes: string;
  status: string;
  task_id: string | null;
  callback_token: string;
  callback_payload: unknown;
  created_at: string;
  error_code: string | null;
  music_direction?: SavedMusicDirection | null;
  revision_number?: number;
  request_id?: string | null;
};
export type BetaTrack = {
  id: string;
  job_id: string;
  title: string;
  lyrics: string;
  storage_path: string;
  duration: number | null;
  preview_storage_path?: string | null;
};
export function db() {
  return createPrivateServerClient();
}
export async function sessionFor(
  id: string,
  key: string,
  gift = false,
): Promise<BetaSession | null> {
  if (
    !z.string().uuid().safeParse(id).success ||
    !z.string().uuid().safeParse(key).success
  )
    return null;
  const { data, error } = await db()
    .from("song_beta_sessions")
    .select("*")
    .eq("id", id)
    .eq(gift ? "gift_token" : "access_token", key)
    .maybeSingle();
  if (error) throw new Error("session_read_failed");
  return data && (!gift || hasFullSongAccess(data)) ? data : null;
}
export async function requireSession(id: string, key: string) {
  const session = await sessionFor(id, key);
  if (!session) throw new ClientError("This song link is invalid.", 404);
  return session;
}
export async function jobsFor(id: string): Promise<BetaJob[]> {
  const { data, error } = await db()
    .from("song_beta_jobs")
    .select("*")
    .eq("session_id", id)
    .order("created_at");
  if (error) throw new Error("jobs_read_failed");
  return data ?? [];
}
export async function tracksFor(id: string): Promise<BetaTrack[]> {
  const { data, error } = await db()
    .from("song_beta_tracks")
    .select("*")
    .eq("session_id", id)
    .order("created_at");
  if (error) throw new Error("tracks_read_failed");
  return data ?? [];
}
export async function updateJob(id: string, values: Record<string, unknown>) {
  const { error } = await db()
    .from("song_beta_jobs")
    .update(values)
    .eq("id", id);
  if (error) throw new Error("job_write_failed");
}
export async function dailyJobCount() {
  const { count, error } = await db()
    .from("song_beta_jobs")
    .select("id", { count: "exact", head: true })
    .gte("created_at", new Date(Date.now() - 86400000).toISOString());
  if (error) throw new Error("job_count_failed");
  return count ?? 0;
}
