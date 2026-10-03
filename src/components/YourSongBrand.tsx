import Link from "next/link";
import Image from "next/image";

export function YourSongBrand() {
  return (
    <Link href="/your-song" className="your-song-brand" aria-label="Your Song home">
      <Image
        src="/images/your-song-logo.webp"
        alt="Your Song. A story only you could tell."
        width={1024}
        height={333}
        className="your-song-brand-logo"
        unoptimized
      />
    </Link>
  );
}

export function YourSongFooter() {
  return (
    <footer className="your-song-footer shell">
      <div className="your-song-footer-identity">
        <YourSongBrand />
        <span>by <Link href="/">The Gift Smith</Link></span>
      </div>
      <Link href="/your-song#questions">Questions & answers</Link>
    </footer>
  );
}
