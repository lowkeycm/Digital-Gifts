import Link from "next/link";

export function YourSongBrand() {
  return (
    <Link href="/your-song" className="your-song-brand" aria-label="Your Song home">
      <span className="your-song-brand-record" aria-hidden="true"><i /></span>
      <span>Your <em>Song</em><small>A story only you could tell.</small></span>
    </Link>
  );
}

export function YourSongFooter() {
  return (
    <footer className="your-song-footer shell">
      <span>Your Song <span>by <Link href="/">The Gift Smith</Link></span></span>
      <Link href="/your-song#questions">Questions & answers</Link>
    </footer>
  );
}
