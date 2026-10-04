import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StudioHeader } from "@/components/StudioHeader";
import { KeepsakePurchase } from "@/components/KeepsakePurchase";
import { buildKeepsake } from "@/lib/keepsake-art";
import { studioPreview, studioPreviewAllowed } from "@/lib/studio-preview";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Keepsake design preview | Your Song",
  robots: { index: false, follow: false },
};
export default async function Page() {
  if (!studioPreviewAllowed()) notFound();
  const t = studioPreview.tracks[0];
  const { svg } = await buildKeepsake({
    recipient: studioPreview.recipientName,
    title: t.title,
    lyrics: t.lyrics,
  });
  return (
    <>
      <StudioHeader />
      <main id="main-content" className="studio-world">
        <div className="studio-shell keepsake-page">
          <Link className="keepsake-back" href="/studio-preview">
            ← Back to studio preview
          </Link>
          <div className="keepsake-layout">
            <div className="keepsake-wall">
              <div className="keepsake-frame">
                <Image
                  unoptimized
                  src={`data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`}
                  alt="Sample personalized lyric print"
                  width={576}
                  height={720}
                />
              </div>
              <p>Your printable design. Frame shown for inspiration.</p>
            </div>
            <section className="workbench-panel">
              <span className="studio-kicker">THE LYRIC KEEPSAKE</span>
              <h1>
                The words.
                <br />
                Somewhere they
                <br />
                can see them.
              </h1>
              <p>
                The lyrics to <strong>{t.title}</strong>, designed just for
                Jennifer. Print it, frame it, or tuck it into a card.
              </p>
              <ul className="keepsake-details">
                <li>Personalized 8 × 10 inch PDF</li>
                <li>Download as soon as payment is confirmed</li>
                <li>Print at home or at your favorite print shop</li>
              </ul>
              <p className="keepsake-material">
                Digital download. Printing and frame are not included.
              </p>
              <div className="keepsake-price">
                $9 <span>one-time addition</span>
              </div>
              <KeepsakePurchase
                id="preview"
                accessKey="preview"
                demonstration
              />
              <Link className="keepsake-decline" href="/studio-preview">
                Continue with my song gift
              </Link>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
