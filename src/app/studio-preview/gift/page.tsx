export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GiftExperience } from "@/components/GiftExperience";
import { studioPreview, studioPreviewAllowed } from "@/lib/studio-preview";
export const metadata: Metadata = {
  title: "Recipient design preview | Your Song",
  robots: { index: false, follow: false },
};
export default function Page() {
  if (!studioPreviewAllowed()) notFound();
  const t = studioPreview.tracks[0];
  return (
    <>
      <div className="studio-demo-notice">
        Recipient design example.{" "}
        <Link href="/studio-preview">Back to studio preview</Link>
      </div>
      <GiftExperience
        recipient="Jennifer"
        occasion="Anniversary"
        title={t.title}
        lyrics={t.lyrics}
        audioUrl="/audio/the-way-i-see-you.mp3"
        photoUrl={null}
        message="For every ordinary day that you make something special."
      />
    </>
  );
}
