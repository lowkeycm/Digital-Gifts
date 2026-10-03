import { createClient } from "@supabase/supabase-js";

export const projectUrl = process.env.SUPABASE_URL ?? "https://hyjmlkowbhftisynztui.supabase.co";
export const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY ?? "sb_publishable_IdWRcx-L29pkrnY2b1AiDQ_Ye6CPHRq";

export function createPublicServerClient() {
  return createClient(projectUrl, publishableKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

// This client must only be imported by server routes and server components.
export function createPrivateServerClient() {
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("Private song storage is not configured.");
  return createClient(projectUrl, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}

// The public gateway header is safe for the browser; never return a server key.
export function storagePublishableKey() {
  if (!publishableKey.startsWith("sb_publishable_")) {
    throw new Error("Storage requires a publishable project key.");
  }
  return publishableKey;
}
