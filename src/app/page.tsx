import Link from "next/link";
import { DigitalGiftsNav } from "@/components/DigitalGiftsNav";

export default function Home() {
  return (
    <><DigitalGiftsNav/><main>
      <section className="shell dg-hero">
        <div className="dg-hero-copy">
          <span className="eyebrow">Personal, on purpose</span>
          <h1 className="dg-title">Gifts made from the stories only you know.</h1>
          <p className="dg-lede">Digital Gifts turns memories, photos and the little details into gifts made for one person. Start with a personalized song. More formats are being built around the same idea.</p>
          <div className="actions">
            <Link className="pill primary" href="/your-song">Create a personalized song</Link>
            <a className="pill" href="#gifts">See what we are building</a>
          </div>
          <div className="dg-hero-note">
            <span className="dg-note-number">01</span>
            <p>The best gift is not the most expensive one. It is the one that makes them say, “How did you know to put that in there?”</p>
          </div>
        </div>

        <div className="dg-hero-art" aria-label="A collection of personalized gift concepts">
          <div className="dg-frame">
            <div className="dg-frame-photo">
              <span>YOUR<br/>MEMORY</span>
            </div>
            <div className="dg-frame-caption">
              <strong>For the moments worth keeping</strong>
              <span className="qr-mark" aria-hidden="true" />
            </div>
          </div>
          <div className="dg-song-card">
            <span className="dg-card-kicker">YOUR SONG</span>
            <strong>A song made from the details that matter.</strong>
            <div className="dg-mini-player"><span>▶</span><i /></div>
          </div>
          <div className="dg-gift-tag">
            <span>MADE FOR</span>
            <strong>one person</strong>
          </div>
        </div>
      </section>

      <section id="gifts" className="dg-product-section">
        <div className="shell">
          <div className="dg-section-intro">
            <div>
              <span className="eyebrow">Digital Gifts</span>
              <h2>One idea. Different ways to give it.</h2>
            </div>
            <p>We are building around the part people remember: seeing themselves in the gift. The format can change. The personal details stay at the center.</p>
          </div>

          <div className="dg-product-grid">
            <article className="dg-product-card dg-product-live">
              <div className="dg-product-topline"><span className="dg-status-live">First product</span><span>01</span></div>
              <div className="dg-product-visual dg-vinyl-visual"><div className="dg-vinyl-disc" /></div>
              <div>
                <span className="eyebrow light">Your Song</span>
                <h3>Turn the story into their song.</h3>
                <p>Tell us the memories, inside jokes and small details. Hear a personalized preview, then unlock the full song.</p>
                <Link className="pill inverse" href="/your-song">Explore Your Song</Link>
              </div>
            </article>

            <article className="dg-product-card dg-product-soon">
              <div className="dg-product-topline"><span className="dg-status-soon">In development</span><span>02</span></div>
              <div className="dg-product-visual dg-frame-visual">
                <div className="dg-mini-frame"><span>PHOTO</span><i className="qr-mark"/></div>
              </div>
              <div>
                <span className="eyebrow">Framed Song Gift</span>
                <h3>Something they can open before they hear it.</h3>
                <p>A framed photo or print with a private QR experience that opens the song. The physical product and fulfillment are still being developed.</p>
                <span className="dg-coming-copy">Coming after the digital song experience is proven.</span>
              </div>
            </article>

            <article className="dg-product-card dg-product-lab">
              <div className="dg-product-topline"><span>Gift lab</span><span>03+</span></div>
              <div className="dg-product-visual dg-stack-visual">
                <span className="dg-stack-card one">PHOTO</span>
                <span className="dg-stack-card two">STORY</span>
                <span className="dg-stack-card three">MOMENT</span>
              </div>
              <div>
                <span className="eyebrow">More formats</span>
                <h3>The brand is bigger than one product.</h3>
                <p>Digital Gifts is the home for new ways to turn real stories into personal digital experiences and keepsakes. We will add products here as they are actually ready.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="how" className="section dg-how-section">
        <div className="shell">
          <div className="dg-how-heading">
            <span className="eyebrow">The Digital Gifts method</span>
            <h2>Start with the person.<br/>Then choose the format.</h2>
          </div>
          <div className="dg-how-grid">
            <article><span>01</span><h3>Tell us what makes them them</h3><p>Names are easy. The good material is the trip that went wrong, the phrase they always say, the old photo, the inside joke.</p></article>
            <article><span>02</span><h3>We turn those details into the gift</h3><p>The product might be a song today and a different keepsake tomorrow. The source material stays personal.</p></article>
            <article><span>03</span><h3>You get the reveal</h3><p>The point is not the technology. It is the moment they recognize themselves in what you gave them.</p></article>
          </div>
        </div>
      </section>

      <section className="section dg-recognition-section">
        <div className="shell dg-recognition-grid">
          <div>
            <span className="eyebrow light">The detail is the difference</span>
            <h2>“I love you” is nice.<br/>“Remember Miami?” is yours.</h2>
          </div>
          <div className="dg-detail-stack">
            <div className="dg-detail-card muted"><span>Generic</span><p>“You are always there for me.”</p></div>
            <div className="dg-detail-card"><span>Personal</span><p>“You drove four hours after work so I would not sit there alone.”</p></div>
            <div className="dg-detail-card accent"><span>The little stuff</span><p>“You still steal my fries after saying you do not want any.”</p></div>
          </div>
        </div>
      </section>

      <section className="section dg-occasions">
        <div className="shell">
          <span className="eyebrow">For the reasons people give</span>
          <div className="dg-occasion-row" aria-label="Gift occasions">
            <span>Birthdays</span><span>Anniversaries</span><span>Weddings</span><span>Parents</span><span>Milestones</span><span>Remembrance</span><span>Just because</span>
          </div>
        </div>
      </section>

      <section className="section close-section">
        <div className="shell dg-close-card">
          <div>
            <span className="eyebrow light">Start with the first Digital Gift</span>
            <h2>Tell us the story. We will turn it into a song.</h2>
            <p>Your Song is the first product under Digital Gifts, with a guided story intake and a private preview before the full song.</p>
          </div>
          <Link className="pill inverse" href="/your-song">Go to Your Song</Link>
        </div>
      </section>
    </main>
    <footer className="dg-footer"><div className="shell footer-grid"><strong>Digital Gifts</strong><p>Personalized gift experiences built from real stories. Your Song is available in V1; additional formats are still in development.</p></div></footer>
    </>
  );
}
