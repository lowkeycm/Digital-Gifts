import Link from "next/link";

export function Nav() {
  return (
    <header className="shell nav product-nav">
      <Link className="brand product-brand" href="/your-song">
        <span className="product-parent">Digital Gifts</span>
        Your Song
      </Link>
      <nav className="navlinks" aria-label="Your Song navigation">
        <a href="/your-song#how">How it works</a>
        <a href="/your-song#why">Why it feels personal</a>
        <Link href="/">All gifts</Link>
      </nav>
      <Link className="pill primary nav-cta" href="/create">Create a song</Link>
    </header>
  );
}
