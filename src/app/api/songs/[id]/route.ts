import { customerEmailEnabled } from "@/lib/customer-library";
import {
  keepsakeFor,
  keepsakeAvailable,
  reconcileKeepsake,
} from "@/lib/keepsake-payments";
import { after, NextResponse } from "next/server";
import { betaReady } from "@/lib/beta-config";
import { requireSession, tracksFor, db } from "@/lib/beta-repository";
import { syncSession } from "@/lib/beta-generation";
import { apiError, privateHeaders } from "@/lib/beta-http";
import { orderFor, fulfillCheckout, paymentSiteOrigin } from "@/lib/payments";
import { reserveAndStart } from "@/lib/beta-generation";
import { revisionNotesAllowance } from "@/lib/revisions";
import { hasFullSongAccess, SONG_PREVIEW_SECONDS } from "@/lib/song-access";
import { ensureTrackPreview } from "@/lib/audio-storage";
export const maxDuration = 120;
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    if (!betaReady())
      return NextResponse.json(
        {
          error:
            "Song creation is temporarily unavailable. Please try again shortly.",
        },
        { status: 503 },
      );
    const { id } = await params,
      key = request.headers.get("x-song-key") ?? "";
    let session = await requireSession(id, key);
    if (session.payment_status === "pending") {
      const order = await orderFor(id);
      if (order?.stripe_checkout_id) {
        try {
          session =
            (await fulfillCheckout(order.stripe_checkout_id, order.mode, id)) ??
            session;
        } catch {
          /* Keep the saved order available while webhook/reconciliation retries. */
        }
      }
    }
    if (session.checkout_mode && session.checkout_mode !== "free") {
      // Recover previously saved intakes and interrupted submissions. Reservation
      // returns the original job and never starts another generation after payment.
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
    if (
      !hasFullSongAccess(session) &&
      tracks.some((t) => !t.preview_storage_path)
    ) {
      after(async () => {
        for (const track of tracks.filter((t) => !t.preview_storage_path)) {
          try {
            await ensureTrackPreview(track);
          } catch {
            console.error("song_preview_prepare_failed", { trackId: track.id });
          }
        }
      });
    }
    const originalJobs = new Set(
      jobs
        .filter((j) => j.kind === "original" && j.status === "complete")
        .map((j) => j.id),
    );
    const previewReady =
      tracks.filter((t) => originalJobs.has(t.job_id) && t.preview_storage_path)
        .length >= 2;
    let keepsake = await keepsakeFor(id);
    if (keepsake?.status === "pending" && keepsake.stripe_checkout_id) {
      try {
        await reconcileKeepsake(keepsake.stripe_checkout_id, keepsake.mode);
        keepsake = await keepsakeFor(id);
      } catch {
        /* Webhook can reconcile later. */
      }
    }
    return NextResponse.json(
      {
        id,
        recipientName: session.raw_answers.recipientName,
        genre: session.raw_answers.genre,
        occasion: session.raw_answers.occasion,
        giftToken: hasFullSongAccess(session) ? session.gift_token : null,
        selectedTrackId: session.selected_track_id,
        giftPhotoId: session.gift_photo_id,
        giftMessage: session.gift_message ?? "",
        giftGivenAt: session.gift_given_at ?? null,
        emailEnabled: customerEmailEnabled(),
        keepsake: {
          available: keepsakeAvailable(session),
          paid: keepsake?.status === "paid",
        },
        reactionAssetId: session.reaction_asset_id,
        checkout: {
          mode: session.checkout_mode ?? "free",
          status: session.payment_status ?? "not_required",
          previewSeconds: SONG_PREVIEW_SECONDS,
          previewReady,
        },
        revisionNotesLimit: revisionNotesAllowance(session.raw_answers, jobs),
        jobs: jobs.map((j) => ({
          id: j.id,
          kind: j.kind,
          status: j.status,
          error: j.error_code,
          createdAt: j.created_at,
          revisionNumber: j.revision_number ?? (j.kind === "revision" ? 1 : 0),
        })),
        tracks: tracks
          .filter((t) => hasFullSongAccess(session) || t.preview_storage_path)
          .map((t) => ({
            id: t.id,
            jobId: t.job_id,
            title: t.title,
            lyrics: hasFullSongAccess(session) ? t.lyrics : "",
            duration: hasFullSongAccess(session)
              ? t.duration
              : Math.min(
                  t.duration ?? SONG_PREVIEW_SECONDS,
                  SONG_PREVIEW_SECONDS,
                ),
          })),
        feedbackSaved: Boolean(feedback.data),
      },
      { headers: privateHeaders },
    );
  } catch (e) {
    return apiError(e);
  }
}
