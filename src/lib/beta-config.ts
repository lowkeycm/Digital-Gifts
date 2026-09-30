export function betaReady() {
  return Boolean(
    process.env.KIE_API_KEY &&
      (process.env.SUPABASE_SECRET_KEY ||
        process.env.SUPABASE_SERVICE_ROLE_KEY),
  );
}
export const BETA_BUCKET = "song-beta-audio";
