import { ClientError } from "./beta-http";

export const SONG_PREVIEW_SECONDS = 60;

export function hasFullSongAccess(session: {
  checkout_mode?: "free" | "test" | "live";
  payment_status?: "not_required" | "pending" | "paid";
}) {
  return (session.checkout_mode ?? "free") === "free" || session.payment_status === "paid";
}

export function requireFullSongAccess(session: Parameters<typeof hasFullSongAccess>[0]) {
  if (!hasFullSongAccess(session))
    throw new ClientError("Unlock your full song before downloading, making revisions or preparing your gift.", 402);
}
