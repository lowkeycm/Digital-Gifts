import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Arrow, GiftFooter } from "@/components/GiftBrand";
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
    "What kind of song can I make?",
    "The story form includes R&B, country, pop, acoustic, rock, hip-hop and gospel, plus an option to describe another style. You can also choose a male or female vocal, or leave it open.",
  ],
  [
    "What if a detail needs changing?",
    "The planned $29 offer includes one revision. Use it to explain a missed detail or correction. Your original story stays saved, so you do not have to begin again.",
  ],
  [
    "Can I order a song today?",
    "You can explore the story form and private gift-page demo. Real music generation and paid checkout are not live yet. The demo does not produce an actual song or collect payment.",
  ],
  [
    "Does the song come with a frame?",
    "Your Song is a digital gift. The framed photo and song gift shown in the collection is a separate concept in development, and is not currently available to order.",
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
              Start your story
              <Arrow />
            </Link>
            <span className="song-price-note">
              Launch price $29 · Full song + one revision
            </span>
          </div>
        </section>
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
                The song experience is designed around a personal preview before
                you decide to unlock the full version.
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
          <p className="demo-note">
            You can try this journey now in demo mode. Real audio and payments
            are still being connected.
          </p>
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
                I have a story <span aria-hidden="true">↗</span>
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
              <span className="development-label">Preview edition</span>
            </div>
            <div className="offer-price">
              $29<span>planned launch price</span>
            </div>
            <ul>
              <li>A full personalized digital song</li>
              <li>Your choice of style and vocal preference</li>
              <li>A private song page</li>
              <li>One revision for a missed detail</li>
            </ul>
            <Link href="/create" className="gift-button">
              Try the story experience
              <Arrow />
            </Link>
            <p>
              No payment collected in this demo. No real audio generated yet.
            </p>
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
              Tell your story
              <Arrow />
            </Link>
          </div>
        </section>
      </main>
      <GiftFooter />
    </>
  );
}
