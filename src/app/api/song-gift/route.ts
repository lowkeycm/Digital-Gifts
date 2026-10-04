import { requireFullSongAccess } from "@/lib/song-access";
import { NextResponse } from "next/server";
import { z } from "zod";
import {
  bodyJSON,
  apiError,
  ClientError,
  privateHeaders,
} from "@/lib/beta-http";
import { requireSession, db } from "@/lib/beta-repository";
const schema = z.object({
  songId: z.string().uuid(),
  accessToken: z.string().uuid(),
  trackId: z.string().uuid().optional(),
  removePhoto: z.boolean().optional(),
  message: z.string().trim().max(600).optional(),
  given: z.boolean().optional(),
});
export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await bodyJSON(request));
    if (!parsed.success)
      throw new ClientError("Choose a song or photo to update.");
    const p = parsed.data;
    requireFullSongAccess(await requireSession(p.songId, p.accessToken));
    const updates: Record<string, unknown> = {};
    if (p.trackId) {
      const { data, error } = await db()
        .from("song_beta_tracks")
        .select("id")
        .eq("id", p.trackId)
        .eq("session_id", p.songId)
        .maybeSingle();
      if (error || !data)
        throw new ClientError("Choose one of your completed songs.");
      updates.selected_track_id = p.trackId;
    }
    if (p.removePhoto) updates.gift_photo_id = null;
    if (p.message !== undefined) updates.gift_message = p.message;
    if (p.given !== undefined)
      updates.gift_given_at = p.given ? new Date().toISOString() : null;
    if (!Object.keys(updates).length)
      throw new ClientError("Choose a song or photo to update.");
    const { error } = await db()
      .from("song_beta_sessions")
      .update(updates)
      .eq("id", p.songId);
    if (error) throw error;
    return NextResponse.json({ ok: true }, { headers: privateHeaders });
  } catch (e) {
    return apiError(e);
  }
}
