import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { sessionFor, tracksFor } from "@/lib/beta-repository";
import { hasFullSongAccess } from "@/lib/song-access";
import {
  keepsakeAvailable,
  keepsakeFor,
  reconcileKeepsake,
} from "@/lib/keepsake-payments";
import { ClientError } from "@/lib/beta-http";
import { buildKeepsake } from "@/lib/keepsake-art";
import { StudioHeader } from "@/components/StudioHeader";
import { YourSongFooter } from "@/components/YourSongBrand";
import { KeepsakePurchase } from "@/components/KeepsakePurchase";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Your lyric keepsake | Your Song",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};
export default async function KeepsakePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ key?: string; payment?: string }>;
}) {
  const { id } = await params;
  const { key, payment } = await searchParams;
  if (!key) notFound();
  const session = await sessionFor(id, key);
  if (!session) notFound();
  const back = `/song/${id}?key=${key}&step=prepare`;
  if (!hasFullSongAccess(session)) redirect(back);
  const track = (await tracksFor(id)).find(
    (t) => t.id === session.selected_track_id,
  );
  if (!track) redirect(back);
  let order = await keepsakeFor(id);
  if (order?.stripe_checkout_id && order.status !== "paid") {
    try {
      await reconcileKeepsake(order.stripe_checkout_id, order.mode);
      order = await keepsakeFor(id);
    } catch {}
  }
  let layoutError = "";
  try {
    await buildKeepsake({
      recipient: session.raw_answers.recipientName,
      title: track.title,
      lyrics: track.lyrics,
    });
  } catch (e) {
    layoutError =
      e instanceof ClientError
        ? e.message
        : "We couldn’t prepare this print yet. Your song and gift page are still available.";
  }
  const paid = order?.status === "paid";
  return (
    <>
      <StudioHeader />
      <main id="main-content" className="studio-world">
        <div className="studio-shell keepsake-page">
          <Link className="keepsake-back" href={back}>
            ← Back to your gift
          </Link>
          <div className="keepsake-layout">
            <div className="keepsake-wall">
              {!layoutError && (
                <div className="keepsake-frame">
                  <Image
                    src={`/api/songs/${id}/keepsake?key=${key}&preview=1`}
                    width={576}
                    height={720}
                    unoptimized
                    alt={`Personalized lyric print for ${session.raw_answers.recipientName}: ${track.title}`}
                  />
                </div>
              )}
              <p>Your printable design. Frame shown for inspiration.</p>
            </div>
            <section className="workbench-panel">
              <span className="studio-kicker">THE LYRIC KEEPSAKE</span>
              <h1>Personalized lyric print</h1>
              <p>
                <strong>{track.title}</strong> · For{" "}
                {session.raw_answers.recipientName}
              </p>
              <ul className="keepsake-details">
                <li>Personalized 8 × 10 inch PDF</li>
                <li>Download as soon as payment is confirmed</li>
                <li>Print at home or at your favorite print shop</li>
              </ul>
              <p className="keepsake-material">
                Digital download. Printing and frame are not included.
              </p>
              {layoutError ? (
                <p role="alert">{layoutError}</p>
              ) : paid ? (
                <>
                  <div className="keepsake-paid" role="status">
                    Payment confirmed.
                  </div>
                  <a
                    className="studio-button studio-button-main"
                    href={`/api/songs/${id}/keepsake?key=${key}`}
                  >
                    Download my printable PDF
                  </a>
                  <p className="workbench-footnote">
                    Your current gift version is used for the print. You can
                    download again after choosing another version.
                  </p>
                </>
              ) : keepsakeAvailable(session) ? (
                <>
                  <div className="keepsake-price">
                    $9 <span>one-time addition</span>
                  </div>
                  <KeepsakePurchase id={id} accessKey={key} />
                  {payment === "pending" && (
                    <p role="status">
                      Your payment is being confirmed. Refresh shortly to
                      download.
                    </p>
                  )}
                  {payment === "cancelled" && (
                    <p role="status">
                      No keepsake was added. Your original gift is ready
                      whenever you are.
                    </p>
                  )}
                </>
              ) : (
                <p>The keepsake offer will be available with paid songs.</p>
              )}
              <Link className="keepsake-decline" href={back}>
                {paid
                  ? "Continue preparing my gift"
                  : "Continue with my song gift"}
              </Link>
            </section>
          </div>
        </div>
      </main>
      <YourSongFooter />
    </>
  );
}
