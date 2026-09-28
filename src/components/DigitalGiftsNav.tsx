import Link from "next/link";

export function DigitalGiftsNav() {
  return (
    <header className="shell dg-nav">
      <Link className="dg-brand" href="/">
        <span className="dg-brand-mark">DG</span>
        <span>Digital Gifts</span>
      </Link>
      <nav className="dg-navlinks" aria-label="Digital Gifts navigation">
        <a href="/#gifts">Gifts</a>
        <a href="/#how">How it works</a>
        <Link href="/your-song">Your Song</Link>
      </nav>
      <Link className="pill primary nav-cta" href="/your-song">
        Start with a song
      </Link>
    </header>
  );
}
