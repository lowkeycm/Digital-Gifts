import Link from "next/link";
import { redirect } from "next/navigation";
import { YourSongBrand } from "@/components/YourSongBrand";
import { StudioSignIn } from "@/components/StudioSignIn";
import { requireStudioOwner } from "@/lib/studio-account";

export const dynamic = "force-dynamic";
export const metadata = { title: "Change password | Your Song", robots: { index: false, follow: false } };
export default async function PasswordPage() {
  try { await requireStudioOwner(); } catch { redirect("/studio?auth=expired"); }
  return <main id="main-content" className="shell section studio-sign-in">
    <YourSongBrand />
    <section className="card studio-login-card"><h1>Choose a new password</h1><StudioSignIn initialMode="password" />
      <Link href="/studio">Back to studio</Link>
    </section>
  </main>;
}
