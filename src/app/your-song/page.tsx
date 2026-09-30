import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Arrow, GiftFooter } from "@/components/GiftBrand";
import { SongSamples } from "@/components/SongSamples";
import { LaunchSignup } from "@/components/LaunchSignup";

export const metadata: Metadata = {
  title: "Your Song | The Gift Smith",
  description:
    "Turn your memories, inside jokes and real stories into a personalized song. Explore Your Song by The Gift Smith.",
};
const questions = [
  [
    "Do I need to write the lyrics?",
    "No. Answer the guided questions in your own words. Names, places, little habits and specific memories give the song its personal details. You do not need to make them rhyme.",
  ],
  [
    "What will I get, and can I download it?",
    "During testing, you can create a full song, download the MP3 and share a listening page with the recipient for free. One new rendition is included if you want a revision. A frame is not included.",
  ],
  [
    "How quickly will my song be ready?",
    "Generation can take several minutes. Your song page shows its progress and keeps your result so you can return using your private link. We are measuring turnaround during this test.",
  ],
  [
    "Is the music made with AI?",
    "Yes. We use AI music tools to turn your story into a song. Your own words, memories and details are the source material. It isn’t a commission performed by a human recording artist.",
  ],
  [
    "What kind of song can I make?",
    "The story form includes R&B, country, pop, acoustic, rock, hip-hop and gospel, plus an option to describe another style. You can also choose a male or female vocal, or leave it open.",
  ],
  [
    "What if a detail needs changing?",
    "Your free test includes one new rendition using your original story and the changes you request. It may change the melody and delivery too. The original stays available.",
  ],
  [
    "Can I try it today?",
    "We are opening a free test before the paid launch. Use Start your song to check availability. Testing has daily limits, and no card is required. Save your private song link so you can return; email delivery is not part of this test.",
  ],
];
export default function YourSongPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <section className="song-hero">
          <Image
            src="/images/first-listen.webp"
            alt="A couple sharing a quiet moment while she listens to music"
            fill
            preload
            sizes="100vw"
          />
          <div className="song-hero-shade" />
          <div className="shell song-hero-content">
            <span className="eyebrow light">Your Song / by The Gift Smith</span>
            <h1>
              They’ve heard
              <br />
              “I love you.”
              <br />
              <em>Not like this.</em>
            </h1>
            <p>
              A personalized song made from your memories, your inside jokes,
              and the things you’ve been meaning to say.
            </p>
            <Link className="gift-button cream-button" href="/create">
              Start your song
              <Arrow />
            </Link>
            <span className="song-price-note">
              Free during testing · Full song + one revision
            </span>
          </div>
        </section>
        <SongSamples />
        <LaunchSignup source="/your-song" />
        <section id="how" className="section shell song-process">
          <div className="process-heading">
            <span className="eyebrow">
              From your words to their first listen
            </span>
            <h2>
              No songwriting skills.
              <br />
              <em>Just a story worth telling.</em>
            </h2>
          </div>
          <div className="process-steps">
            <article>
              <span>01 / The story</span>
              <h3>Tell it your way.</h3>
              <p>
                A few guided questions help you find the memories, quirks and
                moments you want in the song. Rough notes are welcome.
              </p>
            </article>
            <article>
              <span>02 / The first listen</span>
              <h3>Hear yourself in it.</h3>
              <p>
                Listen to your full song and choose the version that feels right.
                No payment is needed during testing.
              </p>
            </article>
            <article>
              <span>03 / The gift</span>
              <h3>Make it their moment.</h3>
              <p>
                The full song belongs on a private gift page. One included
                revision gives you room to correct a detail.
              </p>
            </article>
          </div>
        </section>
        <section className="song-story-section">
          <div className="shell song-story-grid">
            <div>
              <span className="eyebrow light">
                The detail they’ll recognize
              </span>
              <h2>
                “You always
                <br />
                steal <em>my fries.</em>”
              </h2>
              <p>
                It doesn’t have to sound profound. If it means something to you,
                it belongs in the story.
              </p>
            </div>
            <div className="song-story-note">
              <span>Try thinking about…</span>
              <ul>
                <li>The first thing you noticed about them.</li>
                <li>The tiny habit you’d miss the most.</li>
                <li>The moment you knew they were your person.</li>
                <li>The words you don’t say often enough.</li>
              </ul>
              <Link href="/create" className="quiet-link">
                Start your song <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>
        <section id="included" className="section shell purchase-section">
          <div>
            <span className="eyebrow">One gift. All your details.</span>
            <h2>
              A song for them.
              <br />
              <em>From you.</em>
            </h2>
            <p>
              Built around the person, not a name dropped into a generic love
              song.
            </p>
          </div>
          <div className="song-offer">
            <div className="offer-top">
              <span>Your Song</span>
              <span>Full song + one revision</span>
            </div>
            <div className="offer-price">
              Free<span>during testing</span>
            </div>
            <ul>
              <li>A full personalized digital song</li>
              <li>Your choice of style and vocal preference</li>
              <li>A private song page and MP3 download</li>
              <li>One revision for a missed detail</li>
            </ul>
            <Link href="/create" className="gift-button">
              Start your song
              <Arrow />
            </Link>
          </div>
        </section>
        <section id="questions" className="section shell faq-section">
          <div>
            <span className="eyebrow">Before you begin</span>
            <h2>
              A few
              <br />
              <em>good questions.</em>
            </h2>
          </div>
          <div className="faq-list">
            {questions.map(([q, a], i) => (
              <details key={q}>
                <summary>
                  <span className="faq-number">0{i + 1}</span>
                  <span>{q}</span>
                  <span className="faq-plus" aria-hidden="true" />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="gift-close">
          <div className="shell">
            <span className="eyebrow">You know them better than anyone.</span>
            <h2>
              That’s a pretty
              <br />
              <em>good place to start.</em>
            </h2>
            <Link href="/create" className="gift-button">
              Start your song
              <Arrow />
            </Link>
          </div>
        </section>
      </main>
      <GiftFooter />
    </>
  );
}
