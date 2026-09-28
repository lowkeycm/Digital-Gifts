import { createClient } from "@supabase/supabase-js";

const projectUrl = process.env.SUPABASE_URL ?? "https://hyjmlkowbhftisynztui.supabase.co";
const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY ?? "sb_publishable_IdWRcx-L29pkrnY2b1AiDQ_Ye6CPHRq";

export function createPublicServerClient() {
  return createClient(projectUrl, publishableKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
