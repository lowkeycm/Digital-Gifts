import "server-only";
import Stripe from "stripe";
import { ClientError } from "./beta-http";
import { db, type BetaSession } from "./beta-repository";
import { reserveAndStart } from "./beta-generation";
import { SONG_PRICE_CENTS, SONG_CURRENCY, INCLUDED_REVISIONS } from "./offer";

export type PaymentMode = "test" | "live";
export type CheckoutOrder = {
  id: string; session_id: string; mode: PaymentMode; amount: number; currency: string;
  origin: string; stripe_checkout_id: string | null; status: "pending" | "paid"; checkout_attempt: number;
};
export function publicCheckoutMode() {
  const value = process.env.CHECKOUT_MODE ?? "free";
  if (value !== "free" && value !== "live") throw new Error("invalid_checkout_mode");
  return value;
}
function keyFor(mode: PaymentMode) {
  const key = (mode === "test" ? process.env.STRIPE_TEST_SECRET_KEY : process.env.STRIPE_SECRET_KEY) ?? "";
  if (!new RegExp(`^(sk|rk)_${mode}_`).test(key)) throw new ClientError("Checkout is temporarily unavailable. Your story is saved.", 503);
  return key;
}
export function webhookSecret(mode: PaymentMode) {
  const secret = mode === "test" ? process.env.STRIPE_TEST_WEBHOOK_SECRET : process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret?.startsWith("whsec_")) throw new ClientError("Payment confirmation is not configured.", 503);
  return secret;
}
export function stripeFor(mode: PaymentMode) {
  return new Stripe(keyFor(mode), { timeout: 15000, maxNetworkRetries: 1 });
}
export function stripeReady(mode: PaymentMode) {
  try { keyFor(mode); webhookSecret(mode); paymentSiteOrigin(); return true; } catch { return false; }
}
export function paymentSiteOrigin() {
  const url = new URL(process.env.STRIPE_SITE_URL ?? "https://www.yourgiftsmith.com");
  if (url.username || url.password || url.search || url.hash || url.pathname !== "/" ||
      (url.protocol !== "https:" && !(!process.env.VERCEL && url.hostname === "127.0.0.1")))
    throw new Error("invalid_payment_origin");
  return url.origin;
}
export function checkoutCookieName(id: string) { return `song-checkout-${id}`; }
export async function orderFor(sessionId: string) {
  const { data, error } = await db().from("song_checkout_orders").select("*").eq("session_id", sessionId).maybeSingle();
  if (error) throw new Error("checkout_read_failed");
  return data as CheckoutOrder | null;
}
export function validatePaidCheckout(checkout: Stripe.Checkout.Session, order: CheckoutOrder) {
  if (checkout.id !== order.stripe_checkout_id || checkout.mode !== "payment" ||
      checkout.livemode !== (order.mode === "live") || checkout.payment_status !== "paid" ||
      checkout.status !== "complete" || checkout.amount_total !== order.amount ||
      checkout.currency !== order.currency || order.amount !== SONG_PRICE_CENTS || order.currency !== SONG_CURRENCY ||
      checkout.metadata?.app !== "your_song" || checkout.metadata.order_id !== order.id ||
      checkout.metadata.song_id !== order.session_id || checkout.client_reference_id !== order.id)
    throw new ClientError("This payment does not match your song order.", 409);
}
export async function fulfillCheckout(checkoutId: string, mode: PaymentMode, expectedSongId?: string) {
  const { data, error } = await db().from("song_checkout_orders").select("*").eq("stripe_checkout_id", checkoutId).maybeSingle();
  if (error) throw new Error("checkout_read_failed");
  const order = data as CheckoutOrder | null;
  if (!order || order.mode !== mode || (expectedSongId && order.session_id !== expectedSongId))
    throw new ClientError("Payment confirmation is not available for this order.", 409);
  const checkout = await stripeFor(mode).checkout.sessions.retrieve(checkoutId);
  if (checkout.payment_status !== "paid") return null;
  validatePaidCheckout(checkout, order);
  const { data: paid, error: paidError } = await db().rpc("mark_song_checkout_paid", {
    p_order_id: order.id, p_checkout_id: checkout.id,
    p_payment_intent: typeof checkout.payment_intent === "string" ? checkout.payment_intent : checkout.payment_intent?.id ?? null,
    p_mode: mode, p_amount: checkout.amount_total, p_currency: checkout.currency,
  });
  if (paidError) throw new Error("payment_save_failed");
  const session = (Array.isArray(paid) ? paid[0] : paid) as BetaSession;
  await reserveAndStart(session, "original", order.origin);
  return session;
}
export async function createSongCheckout(session: BetaSession): Promise<string | null> {
  if (!session.checkout_mode || session.checkout_mode === "free") throw new ClientError("This song does not need checkout.", 409);
  const mode = session.checkout_mode;
  if (!stripeReady(mode)) throw new ClientError("Checkout is temporarily unavailable. Your story is saved.", 503);
  const { data, error } = await db().rpc("reserve_song_checkout", { p_session_id: session.id, p_origin: paymentSiteOrigin() });
  if (error) throw new Error("checkout_reserve_failed");
  let order = (Array.isArray(data) ? data[0] : data) as CheckoutOrder;
  if (order.status === "paid") return null;
  const stripe = stripeFor(mode);
  if (order.stripe_checkout_id) {
    const existing = await stripe.checkout.sessions.retrieve(order.stripe_checkout_id);
    if (existing.payment_status === "paid") {
      await fulfillCheckout(existing.id, mode, session.id); return null;
    }
    if (existing.status === "open" && existing.url) return existing.url;
    if (existing.status !== "expired") throw new ClientError("Your payment is being confirmed. Please check your song page.", 409);
    const { data: renewed, error: renewError } = await db().from("song_checkout_orders")
      .update({ stripe_checkout_id: null, checkout_attempt: order.checkout_attempt + 1 })
      .eq("id", order.id).eq("stripe_checkout_id", existing.id).eq("status", "pending").select("*");
    if (renewError) throw new Error("checkout_renew_failed");
    if (!renewed?.length) throw new ClientError("Checkout is updating. Please try again.", 409);
    order = renewed[0] as CheckoutOrder;
  }
  const checkout = await stripe.checkout.sessions.create({
    mode: "payment", allowed_payment_method_types: ["card"], customer_email: session.raw_answers.email,
    client_reference_id: order.id,
    metadata: { app: "your_song", order_id: order.id, song_id: session.id },
    payment_intent_data: { metadata: { app: "your_song", order_id: order.id, song_id: session.id } },
    line_items: [{ quantity: 1, price_data: { currency: SONG_CURRENCY, unit_amount: SONG_PRICE_CENTS,
      product_data: { name: "Your Song", description: `A full personalized song, two original versions, ${INCLUDED_REVISIONS} revisions, MP3 downloads and a private gift page.` } } }],
    success_url: `${order.origin}/checkout/return?order=${order.id}`,
    cancel_url: `${order.origin}/checkout/return?order=${order.id}&cancelled=1`,
  }, { idempotencyKey: `your-song-${mode}-${order.id}-${order.checkout_attempt}` });
  if (!checkout.url || checkout.livemode !== (mode === "live")) throw new Error("checkout_response_invalid");
  const { data: bound, error: bindError } = await db().from("song_checkout_orders")
    .update({ stripe_checkout_id: checkout.id }).eq("id", order.id)
    .eq("checkout_attempt", order.checkout_attempt).is("stripe_checkout_id", null).select("id");
  if (bindError) throw new Error("checkout_bind_failed");
  if (!bound?.length && (await orderFor(session.id))?.stripe_checkout_id !== checkout.id)
    throw new Error("checkout_bind_conflict");
  return checkout.url;
}
