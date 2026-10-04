import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { z } from "zod";
import { db, sessionFor, type BetaSession } from "./beta-repository";
import { projectUrl, publishableKey } from "./supabase";
import { paymentSiteOrigin } from "./payments";

export const customerCookieOptions = {
  name: "gift-customer-account",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};
const DEVICE_COOKIE = "song-collection";
const entriesSchema = z
  .array(z.object({ id: z.string().uuid(), key: z.string().uuid() }))
  .max(16);
export async function customerAuthClient(writable = false) {
  const jar = await cookies();
  return createServerClient(projectUrl, publishableKey, {
    cookieOptions: customerCookieOptions,
    cookies: {
      getAll: () => jar.getAll(),
      setAll: writable
        ? (values) =>
            values.forEach(({ name, value, options }) =>
              jar.set(name, value, options),
            )
        : undefined,
    },
  });
}
export async function deviceSongs() {
  try {
    return entriesSchema.parse(
      JSON.parse((await cookies()).get(DEVICE_COOKIE)?.value ?? "[]"),
    );
  } catch {
    return [];
  }
}
export async function rememberSong(session: BetaSession) {
  const entries = await deviceSongs();
  const next = [
    { id: session.id, key: session.access_token },
    ...entries.filter((e) => e.id !== session.id),
  ].slice(0, 16);
  (await cookies()).set(DEVICE_COOKIE, JSON.stringify(next), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}
export async function librarySongs() {
  const jar = await cookies();
  let email: string | null = null;
  if (jar.getAll().some((c) => c.name.startsWith(customerCookieOptions.name))) {
    const auth = await customerAuthClient();
    const {
      data: { user },
      error,
    } = await auth.auth.getUser();
    if (!error && user?.email_confirmed_at && user.email)
      email = user.email.toLowerCase();
  }
  const remembered = await Promise.all(
    (await deviceSongs()).map((e) => sessionFor(e.id, e.key)),
  );
  let accountSongs: BetaSession[] = [];
  if (email) {
    const { data, error } = await db()
      .from("song_beta_sessions")
      .select("*")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) throw new Error("customer_library_read_failed");
    accountSongs = data ?? [];
  }
  const songs = [
    ...new Map(
      [...accountSongs, ...remembered.filter((s): s is BetaSession => !!s)].map(
        (s) => [s.id, s],
      ),
    ).values(),
  ].sort((a, b) => b.created_at.localeCompare(a.created_at));
  return { email, songs };
}
export function customerEmailEnabled() {
  return !!process.env.RESEND_API_KEY && !!process.env.SONG_EMAIL_FROM;
}
const escape = (text: string) =>
  text.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
export async function emailCustomerAccess(email: string) {
  if (!customerEmailEnabled()) throw new Error("customer_email_not_configured");
  const { data, error } = await db().auth.admin.generateLink({
    type: "magiclink",
    email,
  });
  if (error || !data.properties?.hashed_token)
    throw new Error("customer_link_failed");
  const link = new URL("/my-songs/confirm", paymentSiteOrigin());
  link.searchParams.set("token_hash", data.properties.hashed_token);
  const url = link.toString();
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.SONG_EMAIL_FROM,
      to: [email],
      subject: "Your songs are waiting for you",
      text: `Your private studio is ready. Open this secure link to return to your songs:\n\n${url}\n\nThis link signs you in. Keep it private. If you didn’t request it, you can ignore this email.\n\nYour Song by The Gift Smith`,
      html: `<div style="font-family:Arial,sans-serif;max-width:540px;margin:auto;color:#172b39;padding:36px"><p style="letter-spacing:3px;font-size:12px">YOUR SONG</p><h1 style="font-family:Georgia,serif;font-weight:400">Your stories. Your songs.</h1><p>Your private studio is ready whenever you are.</p><p style="margin:30px 0"><a style="background:#172b39;color:#fff;padding:15px 25px;border-radius:6px;text-decoration:none" href="${escape(url)}">Open My songs</a></p><p style="font-size:13px;color:#666">This link signs you in. Keep it private. If you didn’t request it, you can ignore this email.</p><p>Your Song by The Gift Smith</p></div>`,
    }),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error("customer_email_failed");
}
