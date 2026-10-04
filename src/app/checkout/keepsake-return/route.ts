import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { db, sessionFor } from "@/lib/beta-repository";
import { checkoutCookieName, paymentSiteOrigin } from "@/lib/payments";
import { reconcileKeepsake, type KeepsakeOrder } from "@/lib/keepsake-payments";
import { privateHeaders } from "@/lib/beta-http";
export async function GET(request: Request) {
  const q = new URL(request.url).searchParams;
  const id = q.get("order");
  if (!z.string().uuid().safeParse(id).success)
    return new Response(null, { status: 404 });
  const { data, error } = await db()
    .from("song_keepsake_orders")
    .select("*")
    .eq("id", id!)
    .maybeSingle();
  if (error)
    return new Response("Please refresh to confirm your keepsake.", {
      status: 503,
      headers: privateHeaders,
    });
  const order = data as KeepsakeOrder | null;
  if (!order) return new Response(null, { status: 404 });
  const key =
    (await cookies()).get(checkoutCookieName(order.session_id))?.value ?? "";
  if (!(await sessionFor(order.session_id, key)))
    return NextResponse.redirect(new URL("/my-songs", paymentSiteOrigin()), {
      status: 303,
      headers: privateHeaders,
    });
  let status = q.has("cancelled") ? "cancelled" : "pending";
  if (!q.has("cancelled") && order.stripe_checkout_id) {
    try {
      if (await reconcileKeepsake(order.stripe_checkout_id, order.mode))
        status = "confirmed";
    } catch {}
  }
  const url = new URL(
    `/song/${order.session_id}/keepsake`,
    paymentSiteOrigin(),
  );
  url.searchParams.set("key", key);
  url.searchParams.set("payment", status);
  return NextResponse.redirect(url, { status: 303, headers: privateHeaders });
}
