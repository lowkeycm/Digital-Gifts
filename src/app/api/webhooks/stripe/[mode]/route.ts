import { NextResponse } from "next/server";
import { stripeFor, webhookSecret, fulfillCheckout, type PaymentMode } from "@/lib/payments";
export const maxDuration = 60;
export const runtime = "nodejs";
export async function POST(request: Request, { params }: { params: Promise<{ mode: string }> }) {
  const { mode } = await params;
  if (mode !== "test" && mode !== "live") return new NextResponse(null, { status: 404 });
  let stripe, secret;
  try { stripe = stripeFor(mode); secret = webhookSecret(mode); }
  catch { return NextResponse.json({ error: "Webhook not configured" }, { status: 503 }); }
  const raw = await request.text();
  if (raw.length > 500000) return new NextResponse(null, { status: 413 });
  let event;
  try { event = stripe.webhooks.constructEvent(raw, request.headers.get("stripe-signature") ?? "", secret); }
  catch { return NextResponse.json({ error: "Invalid signature" }, { status: 400 }); }
  if (event.livemode !== (mode === "live")) return NextResponse.json({ error: "Wrong mode" }, { status: 400 });
  if (["checkout.session.completed", "checkout.session.async_payment_succeeded"].includes(event.type)) {
    const checkout = event.data.object as { id: string; metadata?: { app?: string }; payment_status?: string };
    if (checkout.metadata?.app !== "your_song" || checkout.payment_status !== "paid")
      return NextResponse.json({ received: true });
    try { await fulfillCheckout(checkout.id, mode as PaymentMode); }
    catch { return NextResponse.json({ error: "Confirmation pending; retry event" }, { status: 503 }); }
  }
  return NextResponse.json({ received: true });
}
