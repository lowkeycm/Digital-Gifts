import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GiftBrand } from "@/components/GiftBrand";
import { sessionFor, tracksFor } from "@/lib/beta-repository";
import { betaReady } from "@/lib/beta-config";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "A song for you | The Gift Smith",
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
  const tracks = await tracksFor(id);
  return (
    <>
      <header className="shell gift-nav">
        <GiftBrand />
      </header>
      <main id="main-content" className="shell section delivery-shell">
        <span className="eyebrow">A gift made from real memories</span>
        <h1 className="delivery-title">
          For {session.raw_answers.recipientName}.
        </h1>
        <p className="lede">Some things deserve a song.</p>
        <div className="studio-tracks">
          {tracks.map((t, i) => (
            <article className="studio-track" key={t.id}>
              <div className="studio-record" aria-hidden="true">
                <span>{session.raw_answers.recipientName.slice(0, 1)}</span>
              </div>
              <div>
                <span className="eyebrow">Version {i + 1}</span>
                <h2>{t.title}</h2>
                <audio
                  controls
                  preload="none"
                  src={`/api/songs/${id}/audio?key=${key}&track=${t.id}&gift=1`}
                />
                <a
                  className="pill"
                  href={`/api/songs/${id}/audio?key=${key}&track=${t.id}&gift=1&download=1`}
                >
                  Keep the MP3
                </a>
                {t.lyrics && (
                  <details>
                    <summary>Read the lyrics</summary>
                    <p className="song-lyrics">{t.lyrics}</p>
                  </details>
                )}
              </div>
            </article>
          ))}
        </div>
        {!tracks.length && (
          <p>Your song is still being prepared. Please check back shortly.</p>
        )}
      </main>
    </>
  );
}
