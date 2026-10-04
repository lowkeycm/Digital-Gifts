"use client";
import Image from "next/image";
import Link from "next/link";
import { StudioHeader } from "./StudioHeader";
import { KeepsakePurchase } from "./KeepsakePurchase";
import { useStudioPreviewDraft } from "./StudioPreviewDraft";
export function StudioPreviewKeepsake({
  designs,
}: {
  designs: Record<string, string>;
}) {
  const preview = useStudioPreviewDraft();
  if (!preview?.ready) return <p role="status">Opening your print...</p>;
  const state = preview.draft.state;
  const track =
    state.tracks.find((t) => t.id === state.selectedTrackId) ?? state.tracks[0];
  return (
    <>
      <StudioHeader />
      <main id="main-content" className="studio-world">
        <div className="studio-shell keepsake-page">
          <Link className="keepsake-back" href="/studio-preview?step=prepare">
            ← Back to your gift
          </Link>
          <div className="keepsake-layout">
            <div className="keepsake-wall">
              <div className="keepsake-frame">
                <Image
                  unoptimized
                  src={designs[track.id]}
                  alt={`Lyric print for ${state.recipientName}: ${track.title}`}
                  width={576}
                  height={720}
                />
              </div>
              <p>Frame shown for inspiration.</p>
            </div>
            <section className="workbench-panel">
              <span className="studio-kicker">LYRIC KEEPSAKE</span>
              <h1>Personalized lyric print</h1>
              <p>
                <strong>{track.title}</strong> · For {state.recipientName}
              </p>
              <ul className="keepsake-details">
                <li>Personalized 8 × 10 inch PDF</li>
                <li>Download after purchase</li>
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
              <Link
                className="keepsake-decline"
                href="/studio-preview?step=prepare"
              >
                Continue with my song gift
              </Link>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
