import Image from "next/image";
import Link from "next/link";
import { DigitalGiftsNav } from "@/components/DigitalGiftsNav";
import { Arrow, GiftFooter } from "@/components/GiftBrand";
import { StoryNotes } from "@/components/StoryNotes";
import { KeepsakeGallery } from "@/components/KeepsakeGallery";

export default function Home() {
  return (
    <>
      <DigitalGiftsNav />
      <main id="main-content">
        <section className="shell gift-hero">
          <div className="gift-hero-copy">
            <span className="eyebrow">Personal gifts. Real stories.</span>
            <h1>
              For the person{" "}<br />
              who means
              <br />
              <em>everything.</em>
            </h1>
            <p>
              A song about your story. A keepsake full of memories. Gifts that
              say, “I know you,” in a way nothing off a shelf can.
            </p>
            <div className="hero-actions">
              <Link href="/your-song" className="gift-button">
                Discover Your Song
                <Arrow />
              </Link>
              <a href="#gifts" className="quiet-link">
                Meet the collection <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="hero-footnote">
              <span className="tiny-star" aria-hidden="true">
                ✳
              </span>
              <span>
                You bring the memories.
                <br />
                We help you make them a gift.
              </span>
            </div>
          </div>
          <div className="hero-photo-stage">
            <div className="hero-photo">
              <Image
                src="/images/first-listen.webp"
                alt="A woman listening to music beside her smiling partner in a sunlit home"
                fill
                preload
                sizes="(max-width: 760px) 100vw, 57vw"
              />
            </div>
            <div className="photo-note">
              <span>The best part?</span>
              <p>
                The moment
                <br />
                they realize
                <br />
                <em>it’s about them.</em>
              </p>
              <div className="note-line" />
            </div>
            <span className="photo-side-label">A little more personal.</span>
          </div>
        </section>
        <div className="gift-ribbon">
          <div className="shell">
            <span>Inside jokes.</span>
            <i aria-hidden="true" />
            <span>Ordinary Tuesdays.</span>
            <i aria-hidden="true" />
            <span>Your kind of love.</span>
            <i aria-hidden="true" />
            <span>All worth giving.</span>
          </div>
        </div>
        <section id="gifts" className="collection-section">
          <div className="shell">
            <div className="section-label">
              <span>01 / The collection</span>
              <span>Made from what matters</span>
            </div>
            <div className="song-feature">
              <div className="song-feature-title">
                <span className="eyebrow light">Meet our first gift</span>
                <h2>
                  Your story.
                  <br />
                  <em>Their song.</em>
                </h2>
                <div className="sound-line" aria-hidden="true">
                  {Array.from({ length: 33 }, (_, i) => (
                    <i
                      key={i}
                      style={{ height: `${12 + ((i * 19) % 53)}px` }}
                    />
                  ))}
                </div>
                <div className="song-feature-copy">
                  <p>
                    The first date. The terrible dancing. The person who stayed.
                    Your Song turns the details only you know into a
                    personalized song for someone you love.
                  </p>
                  <div className="feature-details">
                    <span>Digital song</span>
                    <span>One revision included</span>
                  </div>
                  <Link className="gift-button cream-button" href="/your-song">
                    Explore Your Song
                    <Arrow />
                  </Link>
                  <p className="small-note">
                    Try the experience in demo mode. Launch price: $29.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="how" className="section shell story-section">
          <div className="story-intro">
            <span className="eyebrow">02 / Made personal</span>
            <h2>
              The little things
              <br />
              are <em>the big things.</em>
            </h2>
            <p>
              You don’t need the perfect words. You need the ones that are
              yours. The nickname, the late-night drive, the joke that stopped
              being funny to everyone else.
            </p>
            <p>That’s the material a personal gift is made of.</p>
            <Link className="quiet-link" href="/create">
              Start with your memories <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <StoryNotes />
        </section>
        <section className="method-strip">
          <div className="shell method-grid">
            <div>
              <span>01</span>
              <p>
                <strong>Tell us about them.</strong>
                <br />
                Follow a few thoughtful questions.
              </p>
            </div>
            <div>
              <span>02</span>
              <p>
                <strong>Make it yours.</strong>
                <br />
                Add the details only you would know.
              </p>
            </div>
            <div>
              <span>03</span>
              <p>
                <strong>Give them the feeling.</strong>
                <br />A gift with your story at its heart.
              </p>
            </div>
          </div>
        </section>
        <section id="keepsakes" className="section keepsake-section">
          <div className="shell">
            <div className="keepsake-heading">
              <div>
                <span className="eyebrow">03 / A little look ahead</span>
                <h2>
                  First, the song.
                  <br />
                  Then, <em>something to hold.</em>
                </h2>
              </div>
              <div>
                <span className="development-label">In development</span>
                <p>
                  We’re working on a framed photo gift that opens your song with
                  a scan. Something for their shelf, with a story inside.
                </p>
                <p className="small-note">
                  Concept shown. Not available to order yet.
                </p>
              </div>
            </div>
            <KeepsakeGallery />
          </div>
        </section>
        <section className="gift-close">
          <div className="shell">
            <span className="eyebrow">
              You already have the best part: the story.
            </span>
            <h2>
              Who came to mind
              <br />
              <em>while you were here?</em>
            </h2>
            <Link href="/your-song" className="gift-button">
              Make it personal
              <Arrow />
            </Link>
            <p>Start with Your Song.</p>
          </div>
        </section>
      </main>
      <GiftFooter />
    </>
  );
}
