import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StudioPreviewGift } from "@/components/StudioPreviewGift";
import { studioPreviewAllowed } from "@/lib/studio-preview";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Gift preview | Your Song",
  robots: { index: false, follow: false },
};
export default function Page() {
  if (!studioPreviewAllowed()) notFound();
  return <StudioPreviewGift />;
}
