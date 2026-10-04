import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sessionFor, db } from "@/lib/beta-repository";
import { betaReady } from "@/lib/beta-config";
import { GiftExperience } from "@/components/GiftExperience";
import { YourSongBrand } from "@/components/YourSongBrand";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "A song for you | Your Song",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};
export default async function GiftPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ key?: string }>;
}) {
  const { id } = await params,
    { key } = await searchParams;
  if (!key || !betaReady()) notFound();
  const session = await sessionFor(id, key, true);
  if (!session) notFound();
  if (!session.selected_track_id)
    return (
      <main id="main-content" className="gift-waiting">
        <YourSongBrand />
        <span className="eyebrow">A little anticipation</span>
        <h1>Your gift is getting its finishing touch.</h1>
        <p>
          The person making your gift is choosing your song. Come back to this
          link in a little while.
        </p>
      </main>
    );
  const { data: track, error } = await db()
    .from("song_beta_tracks")
    .select("id,title,lyrics")
    .eq("session_id", id)
    .eq("id", session.selected_track_id)
    .maybeSingle();
  if (error) throw new Error("gift_track_read_failed");
  if (!track) notFound();
  return (
    <GiftExperience
      message={session.gift_message}
      scene={session.gift_scene}
      template={session.gift_template}
      recipient={session.raw_answers.recipientName}
      occasion={session.raw_answers.occasion}
      title={track.title}
      lyrics={track.lyrics}
      audioUrl={`/api/songs/${id}/audio?key=${key}&track=${track.id}&gift=1`}
      photoUrl={
        session.gift_photo_id
          ? `/api/songs/${id}/media?key=${key}&asset=${session.gift_photo_id}&gift=1`
          : null
      }
    />
  );
}
