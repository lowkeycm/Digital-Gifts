import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SongStudio } from "@/components/SongStudio";
import { StudioHeader } from "@/components/StudioHeader";
import { YourSongFooter } from "@/components/YourSongBrand";
import { studioPreview, studioPreviewAllowed } from "@/lib/studio-preview";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Studio design preview | Your Song",
  robots: { index: false, follow: false },
};
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; step?: string }>;
}) {
  const { view, step } = await searchParams;
  const demo =
    view === "checkout"
      ? {
          ...studioPreview,
          checkout: { ...studioPreview.checkout!, status: "pending" },
        }
      : studioPreview;
  if (!studioPreviewAllowed()) notFound();
  return (
    <>
      <StudioHeader />
      <main id="main-content" className="studio-world">
        <div className="studio-shell">
          <SongStudio
            key={view ?? "paid"}
            id="preview"
            accessKey="preview"
            initialStep={step}
            demonstration={demo}
          />
        </div>
      </main>
      <YourSongFooter />
    </>
  );
}
