import "server-only";
import { createServerClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { createHash } from "node:crypto";
import { projectUrl, publishableKey, createPrivateServerClient } from "./supabase";
import { ClientError } from "./beta-http";

export const studioCookieOptions = {
  name: "gift-studio-account",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function studioAuthClient(writable = false) {
  const jar = await cookies();
  return createServerClient(projectUrl, publishableKey, {
    cookieOptions: studioCookieOptions,
    cookies: {
      getAll: () => jar.getAll(),
      // Proxy handles refreshes before Server Components render.
      setAll: writable
        ? (values) => { values.forEach(({ name, value, options }) => jar.set(name, value, options)); }
        : undefined,
    },
  });
}

export async function studioEmailAllowed(email: string) {
  const { data, error } = await createPrivateServerClient().from("song_studio_owners")
    .select("email").eq("email", email.trim().toLowerCase()).maybeSingle();
  if (error) throw new Error("studio_owner_read_failed");
  return !!data;
}

export async function authorizedStudioUser(user: User | null) {
  if (!user?.email || !user.email_confirmed_at) return false;
  const { data, error } = await createPrivateServerClient().rpc("claim_studio_owner", {
    p_user_id: user.id, p_email: user.email.toLowerCase(),
  });
  if (error) throw new Error("studio_owner_read_failed");
  return data === true;
}

export async function isStudioOwner() {
  const client = await studioAuthClient();
  const { data: { user }, error } = await client.auth.getUser();
  return !error && await authorizedStudioUser(user);
}

export async function requireStudioOwner() {
  if (!(await isStudioOwner())) throw new ClientError("Please sign in to the studio.", 401);
}

export async function limitStudioAuth(request: Request, email: string) {
  // Vercel supplies this header; never store emails or IPs in attempt logs.
  const ip = request.headers.get("x-vercel-forwarded-for") ?? "local";
  const key = createHash("sha256").update(`${ip}:${email.trim().toLowerCase()}`).digest("hex");
  const { data, error } = await createPrivateServerClient().rpc("reserve_studio_auth_attempt", { p_key: key });
  if (error) throw new Error("studio_auth_limit_failed");
  if (data !== true) throw new ClientError("Too many attempts. Please try again in five minutes.", 429);
}
