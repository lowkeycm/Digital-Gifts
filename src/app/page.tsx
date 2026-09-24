import Link from "next/link";
import { Nav } from "@/components/Nav";

export default function Home() {
  return (
    <><Nav/><main>
      <section className="shell hero">
        <div className="hero-copy">
          <span className="eyebrow">A real story, turned into music</span>
          <h1>Give them a song nobody else could have.</h1>
          <p className="lede">Tell us the little things: how you met, the joke only you get, the moment they showed up when it mattered. Those details become the song.</p>
          <div className="actions"><Link className="pill primary" href="/create">Start your song · $29</Link><a className="pill" href="#how">See how it works</a></div>
          <div className="hero-proof"><span>Preview before you unlock</span><span>One revision included</span><span>No writing skills required</span></div>
        </div>
        <div className="hero-art" aria-label="Record sleeve illustration">
          <div className="record-sleeve">
            <div className="sleeve-copy"><span>ONE OF ONE</span><strong>THE SONG<br/>ONLY YOU<br/>COULD GIVE.</strong></div>
            <div className="record-disc"><div className="record-label">FOR YOU</div></div>
            <div className="sleeve-signature">made from the details that matter</div>
          </div>
          <div className="story-slip"><span className="eyebrow">Story note 03</span><p>“She steals my fries every time and still says she didn’t want any.”</p></div>
        </div>
      </section>

      <section id="how" className="section section-dark"><div className="shell">
        <div className="section-heading"><span className="eyebrow light">How it works</span><h2>Tell it messy.<br/>That is the good part.</h2><p>We are not asking you to write lyrics. We are asking for the stuff only the two of you know.</p></div>
        <div className="steps-row">
          <article className="step-card"><span>01</span><h3>Tell us about them</h3><p>Answer a short set of guided questions about the memories, habits and moments that actually matter.</p></article>
          <article className="step-card featured"><span>02</span><h3>Hear your preview</h3><p>We turn those details into a song. You hear a personalized preview before paying for the full version.</p></article>
          <article className="step-card"><span>03</span><h3>Unlock + revise</h3><p>Get the full song for $29. If one detail misses, use the included revision to correct it.</p></article>
        </div>
      </div></section>

      <section id="why" className="section paper-section"><div className="shell specificity-grid">
        <div><span className="eyebrow">Why the questions matter</span><h2>Generic answers make generic songs.</h2><p className="lede">“She is always there for me” is true, but it gives the songwriter almost nothing. The specific moment is where the song starts to feel like yours.</p></div>
        <div className="before-after">
          <div className="comparison muted-card"><span>Too thin</span><p>“We met in college. She is funny and always supports me.”</p></div>
          <div className="comparison strong-card"><span>Something to write from</span><p>“We met at Howard. I thought she was stuck up at first. Years later she drove four hours after work so I would not sit alone at the hospital.”</p></div>
        </div>
      </div></section>

      <section className="section close-section"><div className="shell close-card"><div><span className="eyebrow light">The gift is the recognition</span><h2>They should hear one line and know exactly who made it.</h2></div><Link className="pill inverse" href="/create">Tell us your story</Link></div></section>
    </main><footer><div className="shell footer-grid"><strong>Your Song <span>working name</span></strong><p>V1 prototype. Real Suno generation, Stripe checkout and final legal copy are not connected yet.</p></div></footer></>
  );
}
