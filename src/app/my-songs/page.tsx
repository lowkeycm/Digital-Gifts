import type { Metadata } from "next";
import Link from "next/link";
import { StudioHeader } from "@/components/StudioHeader";
import { YourSongFooter } from "@/components/YourSongBrand";
import { CustomerAccess, ForgetSongs } from "@/components/CustomerAccess";
import { customerEmailEnabled, librarySongs } from "@/lib/customer-library";
import { StudioIcon } from "@/components/StudioIcon";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "My songs | Your Song",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};
export default async function MySongs() {
  const { songs, email } = await librarySongs();
  const enabled = customerEmailEnabled();
  return (
    <>
      <StudioHeader />
      <main id="main-content" className="studio-world">
        <div className="studio-shell song-library">
          <div className="studio-welcome">
            <div>
              <span className="studio-kicker">YOUR PERSONAL COLLECTION</span>
              <h1>
                Stories worth keeping<span>.</span>
              </h1>
              <p>
                Your songs, your gifts, and the next story waiting to be told.
              </p>
            </div>
          </div>
          <div className="library-grid">
            {songs.map((s) => (
              <Link
                key={s.id}
                className="library-album"
                href={`/song/${s.id}?key=${s.access_token}`}
              >
                <div className="library-art">
                  <div className="library-record" />
                  <span>
                    Made for<strong>{s.raw_answers.recipientName}</strong>
                    <small>{s.raw_answers.occasion}</small>
                  </span>
                </div>
                <div className="library-album-info">
                  <div>
                    <h2>For {s.raw_answers.recipientName}</h2>
                    <p>
                      {s.gift_given_at
                        ? "Gift given"
                        : s.payment_status === "pending"
                          ? "Your previews"
                          : s.selected_track_id
                            ? "Your gift is taking shape"
                            : "Ready for a listen"}
                    </p>
                  </div>
                  <StudioIcon name="arrow" />
                </div>
              </Link>
            ))}
            <Link href="/create" className="library-new">
              <span>+</span>
              <h2>
                Another person.
                <br />
                Another story.
              </h2>
              <p>Make their next gift a song.</p>
              <strong>
                Create a song <StudioIcon name="arrow" size={17} />
              </strong>
            </Link>
          </div>
          <section className="library-recovery">
            <div>
              <span className="studio-kicker">COME BACK ANYTIME</span>
              <h2>
                {songs.length
                  ? "Your songs, ready when you are."
                  : "Already made a song?"}
              </h2>
              <p>
                {email
                  ? `Signed in as ${email}.`
                  : enabled
                    ? "Use your email to find your songs on any device. No password to remember."
                    : "Open your saved private song link to add it to this collection. Songs saved here stay on this browser; your downloaded private access file works on other devices."}
              </p>
              {(email || songs.length > 0) && <ForgetSongs />}
            </div>
            {enabled && !email && <CustomerAccess />}
          </section>
        </div>
      </main>
      <YourSongFooter />
    </>
  );
}
