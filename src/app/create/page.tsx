import type { Metadata } from "next";
import { YourSongFooter } from "@/components/YourSongBrand";
import { Nav } from "@/components/Nav";
import { IntakeForm } from "@/components/IntakeForm";

import { betaReady } from "@/lib/beta-config";
import { isStudioOwner } from "@/lib/studio-account";
import { publicCheckoutMode, stripeReady } from "@/lib/payments";
import { notFound } from "next/navigation";
export const metadata: Metadata = { title: "Create your song | Your Song" };
export const dynamic = "force-dynamic";

export default async function CreatePage({ searchParams }: { searchParams: Promise<{ checkout?: string }> }) {
  const testCheckout = (await searchParams).checkout === "test";
  if (testCheckout && !await isStudioOwner()) notFound();
  const mode = testCheckout ? "test" : publicCheckoutMode();
  return <><Nav/><main id="main-content" className="shell create-layout"><aside className="create-aside"><span className="eyebrow">Your Song / Your story</span><h2>Tell it like you remember it.</h2><p>The place you met. The thing they always say. The ordinary moment you still think about. You bring the memories; the questions help you find them.</p><div className="aside-note"><strong>Good detail</strong><p>“Every time we road-trip, she falls asleep before we leave the city and wakes up asking if we are there yet.”</p></div></aside><div className="form-wrap"><IntakeForm ready={betaReady() && (mode === "free" || stripeReady(mode))} checkoutMode={mode}/></div></main><YourSongFooter/></>;
}
