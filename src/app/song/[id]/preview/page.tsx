import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { sessionFor, db } from "@/lib/beta-repository";
import { betaReady } from "@/lib/beta-config";
import { GiftExperience } from "@/components/GiftExperience";
import { GiftShare } from "@/components/GiftShare";
import { hasFullSongAccess } from "@/lib/song-access";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Preview your gift | Your Song",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default async function GiftPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ key?: string }>;
}) {
  const { id } = await params;
  const { key } = await searchParams;
  if (!key || !betaReady()) notFound();
  // Sender rights must be established server-side. Gift tokens cannot open this route.
  const session = await sessionFor(id, key);
  if (!session) notFound();
  const editPath = `/song/${id}?key=${key}`;
  if (!hasFullSongAccess(session)) redirect(editPath);
  if (!session.selected_track_id) redirect(`${editPath}#gift-preparation`);
  const { data: track, error } = await db()
    .from("song_beta_tracks")
    .select("id,title,lyrics")
    .eq("session_id", id)
    .eq("id", session.selected_track_id)
    .maybeSingle();
  if (error) throw new Error("gift_track_read_failed");
  if (!track) notFound();
  const giftPath = `/gift/${id}?key=${session.gift_token}`;
  return (
    <>
      <section
        className="gift-preview-toolbar"
        aria-label="Private gift preview controls"
      >
        <div className="shell">
          <div className="gift-preview-heading">
            <div>
              <span className="eyebrow">Your private preview</span>
              <h2>Ready for their first listen?</h2>
              <p>
                This is how their gift will look. Send your gift to share the
                recipient’s link.
              </p>
            </div>
            <Link
              className="gift-preview-back"
              href={`${editPath}&step=prepare`}
            >
              ← Edit your gift
            </Link>
          </div>
          <GiftShare
            owner={{ songId: id, accessToken: key }}
            giftPath={giftPath}
            recipient={session.raw_answers.recipientName}
          />
        </div>
      </section>
      <GiftExperience
        message={session.gift_message}
        scene={session.gift_scene}
        template={session.gift_template}
        recipient={session.raw_answers.recipientName}
        occasion={session.raw_answers.occasion}
        title={track.title}
        lyrics={track.lyrics}
        audioUrl={`/api/songs/${id}/audio?key=${session.gift_token}&track=${track.id}&gift=1`}
        photoUrl={
          session.gift_photo_id
            ? `/api/songs/${id}/media?key=${session.gift_token}&asset=${session.gift_photo_id}&gift=1`
            : null
        }
      />
    </>
  );
}
