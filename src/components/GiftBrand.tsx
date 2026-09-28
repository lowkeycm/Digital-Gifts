import Link from "next/link";

export function GiftMark() {
  return (
    <svg viewBox="0 0 40 44" fill="none" aria-hidden="true">
      <path
        d="M20 14C8 14 4 6 10 4c5-2 10 10 10 10Zm0 0C32 14 36 6 30 4c-5-2-10 10-10 10ZM7 17h26v22H7zM20 15v24M3 17h34"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="m15 14-5 8m15-8 5 8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
export function GiftBrand() {
  return (
    <Link href="/" className="gift-brand" aria-label="The Gift Smith home">
      <GiftMark />
      <span>
        <small>The</small>{" "}Gift Smith
      </span>
    </Link>
  );
}
export function Arrow() {
  return (
    <span className="button-arrow" aria-hidden="true">
      ↗
    </span>
  );
}
export function GiftFooter() {
  return (
    <footer className="gift-footer">
      <div className="shell">
        <div className="footer-top">
          <GiftBrand />
          <p>
            For the people.
            <br />
            For the stories.
            <br />
            For the feeling.
          </p>
          <nav aria-label="Footer">
            <Link href="/your-song">Your Song</Link>
            <Link href="/your-song#samples">Hear a sample</Link>
            <Link href="/your-song#questions">Questions & answers</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} The Gift Smith</span>
          <span>
            Personal gifts. Real stories.
          </span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
