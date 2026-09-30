import { db } from "./beta-repository";
import { ClientError } from "./beta-http";
export const mediaBucket = (kind: string) =>
  kind === "photo" ? "song-gift-photos" : "song-reaction-videos";
export type GiftMedia = {
  id: string;
  session_id: string;
  kind: "photo" | "reaction";
  mime_type: string;
  byte_size: number;
  storage_path: string;
  status: string;
};
export async function mediaFor(
  id: string,
  sessionId: string,
): Promise<GiftMedia | null> {
  const { data, error } = await db()
    .from("song_beta_media")
    .select("*")
    .eq("id", id)
    .eq("session_id", sessionId)
    .maybeSingle();
  if (error) throw new Error("media_read_failed");
  return data;
}
export function validMediaHeader(bytes: Uint8Array, mime: string) {
  const text = (a: number, b: number) =>
    String.fromCharCode(...bytes.slice(a, b));
  if (mime === "image/jpeg")
    return bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
  if (mime === "image/png")
    return (
      Array.from(bytes.slice(0, 8)).join(",") === "137,80,78,71,13,10,26,10"
    );
  if (mime === "image/webp")
    return text(0, 4) === "RIFF" && text(8, 12) === "WEBP";
  if (mime === "video/webm")
    return Array.from(bytes.slice(0, 4)).join(",") === "26,69,223,163";
  return (
    ["video/mp4", "video/quicktime"].includes(mime) && text(4, 8) === "ftyp"
  );
}
export async function verifyMedia(media: GiftMedia) {
  const bucket = db().storage.from(mediaBucket(media.kind));
  const { data: info, error } = await bucket.info(media.storage_path);
  if (error || !info)
    throw new ClientError(
      "The upload has not finished. Try saving it again.",
      409,
    );
  if (
    Number(info.size) !== Number(media.byte_size) ||
    info.contentType !== media.mime_type
  )
    throw new ClientError(
      "The uploaded file does not match. Please choose the file again.",
    );
  const { data: signed, error: signError } = await bucket.createSignedUrl(
    media.storage_path,
    60,
  );
  if (signError || !signed) throw new Error("media_sign_failed");
  const response = await fetch(signed.signedUrl, {
    headers: { Range: "bytes=0-511" },
    signal: AbortSignal.timeout(15000),
    cache: "no-store",
  });
  if (!response.ok || !response.body) throw new Error("media_check_failed");
  const reader = response.body.getReader();
  const chunks: number[] = [];
  try {
    while (chunks.length < 512) {
      const { value, done } = await reader.read();
      if (done) break;
      chunks.push(...value.slice(0, 512 - chunks.length));
    }
  } finally {
    await reader.cancel();
  }
  if (!validMediaHeader(new Uint8Array(chunks), media.mime_type))
    throw new ClientError(
      "That file format could not be verified. Try a different file.",
    );
}
