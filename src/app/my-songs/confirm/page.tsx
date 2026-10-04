import type { Metadata } from "next";
import Link from "next/link";
import { CustomerAccess } from "@/components/CustomerAccess";
import { StudioHeader } from "@/components/StudioHeader";
export const metadata: Metadata = {
  title: "Open your studio | Your Song",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};
export default async function Confirm({
  searchParams,
}: {
  searchParams: Promise<{ token_hash?: string }>;
}) {
  const { token_hash } = await searchParams;
  return (
    <>
      <StudioHeader />
      <main id="main-content" className="studio-world customer-confirm">
        <div className="workbench-panel">
          <span className="studio-kicker">WELCOME BACK</span>
          <h1>Your songs are waiting.</h1>
          <p>
            Open your personal collection to listen, finish a gift, or make
            something new.
          </p>
          {token_hash && /^[a-zA-Z0-9_-]{20,300}$/.test(token_hash) ? (
            <CustomerAccess tokenHash={token_hash} />
          ) : (
            <Link href="/my-songs">Request a fresh sign-in link</Link>
          )}
        </div>
      </main>
    </>
  );
}
