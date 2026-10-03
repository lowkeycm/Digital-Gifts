import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db, sessionFor } from "@/lib/beta-repository";
import { checkoutCookieName, fulfillCheckout, paymentSiteOrigin, type CheckoutOrder } from "@/lib/payments";
import { privateHeaders } from "@/lib/beta-http";
export const maxDuration = 60;
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const orderId = params.get("order");
  if (!z.string().uuid().safeParse(orderId).success) return new NextResponse(null, { status: 404 });
  const { data, error } = await db().from("song_checkout_orders").select("*").eq("id", orderId!).maybeSingle();
  if (error) return new NextResponse("Please refresh to confirm your payment.", { status: 503, headers: privateHeaders });
  const order = data as CheckoutOrder | null;
  if (!order) return new NextResponse(null, { status: 404 });
  const key = (await cookies()).get(checkoutCookieName(order.session_id))?.value ?? "";
  if (!await sessionFor(order.session_id, key))
    return new NextResponse("Open your saved private song link to check your payment. If you cannot find it, contact The Gift Smith with your receipt.", { status: 401, headers: privateHeaders });
  let payment = params.has("cancelled") ? "cancelled" : "pending";
  if (!params.has("cancelled") && order.stripe_checkout_id) {
    try { if (await fulfillCheckout(order.stripe_checkout_id, order.mode, order.session_id)) payment = "confirmed"; }
    catch { /* Saved order remains recoverable from the private studio and webhook retries. */ }
  }
  const url = new URL(`/song/${order.session_id}`, paymentSiteOrigin());
  url.searchParams.set("key", key); url.searchParams.set("payment", payment);
  return NextResponse.redirect(url, { status: 303, headers: privateHeaders });
}
