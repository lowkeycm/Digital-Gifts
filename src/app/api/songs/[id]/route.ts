import { NextResponse } from "next/server";
import { betaReady } from "@/lib/beta-config";
import { requireSession, tracksFor, db } from "@/lib/beta-repository";
import { syncSession } from "@/lib/beta-generation";
import { apiError, privateHeaders } from "@/lib/beta-http";
export const maxDuration = 60;
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    if (!betaReady())
      return NextResponse.json(
        { error: "The test studio is being connected." },
        { status: 503 },
      );
    const { id } = await params,
      key = request.headers.get("x-song-key") ?? "";
    const session = await requireSession(id, key);
    const [jobs, tracks, feedback] = await Promise.all([
      syncSession(id),
      tracksFor(id),
      db()
        .from("song_beta_feedback")
        .select("rating")
        .eq("session_id", id)
        .maybeSingle(),
    ]);
    return NextResponse.json(
      {
        id,
        recipientName: session.raw_answers.recipientName,
        genre: session.raw_answers.genre,
        occasion: session.raw_answers.occasion,
        giftToken: session.gift_token,
        selectedTrackId: session.selected_track_id,
        giftPhotoId: session.gift_photo_id,
        reactionAssetId: session.reaction_asset_id,
        jobs: jobs.map((j) => ({
          id: j.id,
          kind: j.kind,
          status: j.status,
          error: j.error_code,
          createdAt: j.created_at,
        })),
        tracks: tracks.map((t) => ({
          id: t.id,
          jobId: t.job_id,
          title: t.title,
          lyrics: t.lyrics,
          duration: t.duration,
        })),
        feedbackSaved: Boolean(feedback.data),
      },
      { headers: privateHeaders },
    );
  } catch (e) {
    return apiError(e);
  }
}
