import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Nav } from "@/components/Nav";
import { RevisionForm } from "@/components/RevisionForm";
import { getSongSession } from "@/lib/song-repository";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function SongPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ key?: string }> }) {
  const { id } = await params;
  const { key } = await searchParams;
  if (!key) notFound();
  const song = await getSongSession(id, key);
  if (!song) notFound();
  if (song.orderStatus !== "paid") redirect(`/preview/${id}?key=${key}`);

  return (
    <><Nav/><main className="shell section delivery-shell">
      <div className="delivery-heading"><span className="status">YOUR SONG</span><p>Private gift page</p></div>
      <h1 className="delivery-title">For {song.recipientName}.</h1>
      <p className="lede delivery-lede">A {song.genre.toLowerCase()} song built from the details you gave us. The player here is still a demo placeholder. The delivery experience and revision path are live.</p>
      <div className="delivery-player">
        <div className="album-mark"><span>FOR</span><strong>{song.recipientName.slice(0, 1).toUpperCase()}</strong></div>
        <div className="player-copy"><span className="eyebrow">Full song</span><h3>{song.occasion} edition</h3><div className="mock-player dark"><span className="play-dot">▶</span><div><strong>Full-song placeholder</strong><small>Suno output will replace this block.</small></div></div></div>
      </div>
      <div className="delivery-actions"><button className="pill" disabled>Download when Suno is connected</button><Link className="pill" href={`/preview/${id}?key=${key}`}>Back to preview</Link></div>
      <RevisionForm songId={id} accessToken={key} alreadyRequested={Boolean(song.revision)} />
    </main></>
  );
}
