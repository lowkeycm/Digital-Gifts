import Link from "next/link";

export function Nav() {
  return (
    <header className="shell nav">
      <Link className="brand" href="/">Your Song <span>working name</span></Link>
      <nav className="navlinks" aria-label="Primary navigation">
        <a href="/#how">How it works</a>
        <a href="/#why">Why it feels personal</a>
      </nav>
      <Link className="pill primary nav-cta" href="/create">Create a song</Link>
    </header>
  );
}
