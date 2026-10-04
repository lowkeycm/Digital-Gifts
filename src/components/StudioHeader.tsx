import Link from "next/link";
import { YourSongBrand } from "./YourSongBrand";
import { StudioIcon } from "./StudioIcon";
export function StudioHeader() {
  return (
    <header className="studio-header">
      <div className="shell">
        <YourSongBrand />
        <nav aria-label="Your studio">
          <Link href="/my-songs">
            <StudioIcon name="music" size={17} />
            My songs
          </Link>
          <Link className="studio-new-song" href="/create">
            Create a song <span aria-hidden="true">+</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
