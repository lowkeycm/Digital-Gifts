import { NextResponse } from "next/server";
import { betaReady } from "@/lib/beta-config";
import { requireSession, tracksFor, db } from "@/lib/beta-repository";
import { syncSession } from "@/lib/beta-generation";
import { apiError, privateHeaders } from "@/lib/beta-http";
import { orderFor, fulfillCheckout, paymentSiteOrigin } from "@/lib/payments";
import { reserveAndStart } from "@/lib/beta-generation";
import { revisionNotesAllowance } from "@/lib/revisions";
export const maxDuration = 60;
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    if (!betaReady())
      return NextResponse.json(
        { error: "Song creation is temporarily unavailable. Please try again shortly." },
        { status: 503 },
      );
    const { id } = await params,
      key = request.headers.get("x-song-key") ?? "";
    let session = await requireSession(id, key);
    if (session.payment_status === "pending") {
      const order = await orderFor(id);
      if (order?.stripe_checkout_id) {
        try { session = await fulfillCheckout(order.stripe_checkout_id, order.mode, id) ?? session; }
        catch { /* Keep the saved order available while webhook/reconciliation retries. */ }
      }
    } else if (session.payment_status === "paid") {
      // Recover a webhook interrupted after saving payment but before reserving music.
      await reserveAndStart(session, "original", paymentSiteOrigin());
    }
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
        checkout: { mode: session.checkout_mode ?? "free", status: session.payment_status ?? "not_required" },
        revisionNotesLimit: revisionNotesAllowance(session.raw_answers, jobs),
        jobs: jobs.map((j) => ({
          id: j.id,
          kind: j.kind,
          status: j.status,
          error: j.error_code,
          createdAt: j.created_at,
          revisionNumber: j.revision_number ?? (j.kind === "revision" ? 1 : 0),
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
