import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StudioPreviewKeepsake } from "@/components/StudioPreviewKeepsake";
import { buildKeepsake } from "@/lib/keepsake-art";
import { studioPreview, studioPreviewAllowed } from "@/lib/studio-preview";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Keepsake preview | Your Song",
  robots: { index: false, follow: false },
};
export default async function Page() {
  if (!studioPreviewAllowed()) notFound();
  const designs = Object.fromEntries(
    await Promise.all(
      studioPreview.tracks.map(async (track) => {
        const { svg } = await buildKeepsake({
          recipient: studioPreview.recipientName,
          title: track.title,
          lyrics: track.lyrics,
        });
        return [
          track.id,
          `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`,
        ];
      }),
    ),
  );
  return <StudioPreviewKeepsake designs={designs} />;
}
