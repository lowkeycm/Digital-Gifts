import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckoutButton } from "@/components/CheckoutButton";
import { Nav } from "@/components/Nav";
import { getSongSession } from "@/lib/song-repository";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function PreviewPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ key?: string }> }) {
  const { id } = await params;
  const { key } = await searchParams;
  if (!key) notFound();
  const song = await getSongSession(id, key);
  if (!song || !song.preview) notFound();

  return (
    <><Nav/><main id="main-content" className="shell section preview-shell">
      <div className="gift-kicker"><span className="status">DEMO PREVIEW</span><span>Made for {song.recipientName}</span></div>
      <div className="preview-grid">
        <section className="record-sleeve compact-sleeve" aria-label="Personalized record sleeve">
          <div className="sleeve-label">FOR {song.recipientName.toUpperCase()}</div>
          <div className="mini-record" />
          <div className="sleeve-meta"><span>{song.genre}</span><span>{song.occasion}</span></div>
        </section>
        <section className="preview-copy">
          <span className="eyebrow">The first listen</span>
          <h1 className="preview-title">Does this feel like the two of you?</h1>
          <p className="lede">Your story is saved. This is a demo of your private preview, so no real song has been generated yet. You can try the gift page and revision experience without paying.</p>
          <div className="audio-shell">
            <div className="audio-label"><strong>Personalized preview</strong><span>Demo mode</span></div>
            <div className="mock-player"><span className="play-dot" aria-hidden="true">♪</span><div><strong>Preview placeholder</strong><small>Your song will be available here when generation is connected.</small></div></div>
          </div>
          <div className="price-row"><div><div className="price">$29</div><div className="help">Planned price: full song + one revision</div></div><CheckoutButton songId={id} accessToken={key} /></div>
          <div className="help-line">Small detail off later? Fix the detail. You do not have to start over.</div>
          <Link className="text-link" href="/create">Change the story instead</Link>
        </section>
      </div>
    </main></>
  );
}
