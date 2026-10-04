import "server-only";
import type Stripe from "stripe";
import { db, tracksFor, type BetaSession } from "./beta-repository";
import { ClientError } from "./beta-http";
import {
  paymentSiteOrigin,
  stripeFor,
  stripeReady,
  type PaymentMode,
} from "./payments";
import { buildKeepsake } from "./keepsake-art";
export const KEEPSAKE_PRICE = 900;
export type KeepsakeOrder = {
  id: string;
  session_id: string;
  mode: PaymentMode;
  amount: number;
  currency: string;
  origin: string;
  stripe_checkout_id: string | null;
  checkout_attempt: number;
  status: "pending" | "paid";
};
export function keepsakeAvailable(session: BetaSession) {
  return (
    session.payment_status === "paid" &&
    (session.checkout_mode === "test" || session.checkout_mode === "live") &&
    stripeReady(session.checkout_mode)
  );
}
export async function keepsakeFor(id: string) {
  const { data, error } = await db()
    .from("song_keepsake_orders")
    .select("*")
    .eq("session_id", id)
    .maybeSingle();
  if (error) throw new Error("keepsake_read_failed");
  return data as KeepsakeOrder | null;
}
export function validateKeepsake(
  checkout: Stripe.Checkout.Session,
  order: KeepsakeOrder,
) {
  if (
    checkout.id !== order.stripe_checkout_id ||
    checkout.mode !== "payment" ||
    checkout.status !== "complete" ||
    checkout.payment_status !== "paid" ||
    checkout.livemode !== (order.mode === "live") ||
    checkout.amount_total !== KEEPSAKE_PRICE ||
    order.amount !== KEEPSAKE_PRICE ||
    checkout.currency !== "usd" ||
    order.currency !== "usd" ||
    checkout.metadata?.app !== "your_song" ||
    checkout.metadata?.product !== "lyric_keepsake" ||
    checkout.metadata?.order_id !== order.id ||
    checkout.metadata?.song_id !== order.session_id ||
    checkout.client_reference_id !== order.id
  )
    throw new ClientError("This payment does not match your keepsake.", 409);
}
export async function reconcileKeepsake(checkoutId: string, mode: PaymentMode) {
  const { data, error } = await db()
    .from("song_keepsake_orders")
    .select("*")
    .eq("stripe_checkout_id", checkoutId)
    .maybeSingle();
  if (error) throw new Error("keepsake_read_failed");
  const order = data as KeepsakeOrder | null;
  if (!order || order.mode !== mode)
    throw new ClientError("This keepsake payment could not be confirmed.", 409);
  const checkout = await stripeFor(mode).checkout.sessions.retrieve(checkoutId);
  if (checkout.payment_status !== "paid") return false;
  validateKeepsake(checkout, order);
  const { error: saveError } = await db()
    .from("song_keepsake_orders")
    .update({
      status: "paid",
      paid_at: new Date().toISOString(),
      payment_intent:
        typeof checkout.payment_intent === "string"
          ? checkout.payment_intent
          : (checkout.payment_intent?.id ?? null),
    })
    .eq("id", order.id)
    .eq("stripe_checkout_id", checkout.id)
    .eq("status", "pending");
  if (saveError) throw new Error("keepsake_save_failed");
  return true;
}
export async function createKeepsakeCheckout(session: BetaSession) {
  if (!keepsakeAvailable(session))
    throw new ClientError(
      "The keepsake can be added after purchasing your song.",
      409,
    );
  const track = (await tracksFor(session.id)).find(
    (t) => t.id === session.selected_track_id,
  );
  if (!track) throw new ClientError("Choose your gift version first.", 409);
  // A printable result must exist before offering a charge.
  await buildKeepsake({
    recipient: session.raw_answers.recipientName,
    title: track.title,
    lyrics: track.lyrics,
  });
  const { data, error } = await db().rpc("reserve_song_keepsake", {
    p_session_id: session.id,
    p_origin: paymentSiteOrigin(),
  });
  if (error) throw new Error("keepsake_reserve_failed");
  let order = (Array.isArray(data) ? data[0] : data) as KeepsakeOrder;
  if (order.status === "paid") return null;
  const stripe = stripeFor(order.mode);
  if (order.stripe_checkout_id) {
    const previous = await stripe.checkout.sessions.retrieve(
      order.stripe_checkout_id,
    );
    if (previous.payment_status === "paid") {
      await reconcileKeepsake(previous.id, order.mode);
      return null;
    }
    if (previous.status === "open" && previous.url) return previous.url;
    if (previous.status !== "expired")
      throw new ClientError(
        "Your keepsake payment is being confirmed. Check again shortly.",
        409,
      );
    const { data: renewed, error: renewError } = await db()
      .from("song_keepsake_orders")
      .update({
        stripe_checkout_id: null,
        checkout_attempt: order.checkout_attempt + 1,
      })
      .eq("id", order.id)
      .eq("stripe_checkout_id", previous.id)
      .eq("status", "pending")
      .select("*");
    if (renewError || !renewed?.length)
      throw new ClientError("Checkout is updating. Please try again.", 409);
    order = renewed[0];
  }
  const metadata = {
    app: "your_song",
    product: "lyric_keepsake",
    order_id: order.id,
    song_id: session.id,
  };
  const checkout = await stripe.checkout.sessions.create(
    {
      mode: "payment",
      managed_payments: { enabled: false },
      integration_identifier: "your-song-keepsake-mvztpkrx",
      customer_email: session.raw_answers.email,
      client_reference_id: order.id,
      metadata,
      payment_intent_data: { metadata },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: KEEPSAKE_PRICE,
            product_data: {
              name: "Your Song lyric keepsake",
              description:
                "Personalized 8 × 10 inch printable PDF. Digital download only; no physical frame or shipping.",
            },
          },
        },
      ],
      success_url: `${order.origin}/checkout/keepsake-return?order=${order.id}`,
      cancel_url: `${order.origin}/checkout/keepsake-return?order=${order.id}&cancelled=1`,
    },
    {
      idempotencyKey: `song-keepsake-${order.mode}-${order.id}-${order.checkout_attempt}`,
    },
  );
  if (!checkout.url || checkout.livemode !== (order.mode === "live"))
    throw new Error("keepsake_checkout_invalid");
  const { data: bound, error: bindError } = await db()
    .from("song_keepsake_orders")
    .update({ stripe_checkout_id: checkout.id })
    .eq("id", order.id)
    .eq("checkout_attempt", order.checkout_attempt)
    .is("stripe_checkout_id", null)
    .select("id");
  if (
    bindError ||
    (!bound?.length &&
      (await keepsakeFor(session.id))?.stripe_checkout_id !== checkout.id)
  )
    throw new Error("keepsake_checkout_bind_failed");
  return checkout.url;
}
