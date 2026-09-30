import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { db } from "./beta-repository";
import { BETA_BUCKET } from "./beta-config";
// Only provider-returned media reaches this function. Also reject private hosts,
// redirects and oversized/non-audio responses before storing any bytes.
export async function fetchAudio(url: string) {
  const u = new URL(url);
  if (
    u.protocol !== "https:" ||
    u.username ||
    u.password ||
    (u.port && u.port !== "443") ||
    isIP(u.hostname) ||
    !u.hostname.includes(".")
  )
    throw new Error("invalid_audio_host");
  const addresses = await lookup(u.hostname, { all: true });
  if (
    !addresses.length ||
    addresses.some((a) =>
      /^(127\.|10\.|192\.168\.|169\.254\.|0\.|172\.(1[6-9]|2\d|3[01])\.|100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\.|2[2-5]\d\.|::|f[cd]|fe[89ab])/i.test(
        a.address,
      ),
    )
  )
    throw new Error("private_audio_host");
  const res = await fetch(url, {
    redirect: "error",
    signal: AbortSignal.timeout(25000),
  });
  if (
    !res.ok ||
    Number(res.headers.get("content-length")) > 30 * 1024 * 1024 ||
    !res.body
  )
    throw new Error("audio_download_failed");
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 30 * 1024 * 1024) throw new Error("audio_too_large");
      chunks.push(value);
    }
  } finally {
    await reader.cancel();
  }
  const bytes = Buffer.concat(chunks);
  if (
    !(
      bytes.subarray(0, 3).toString() === "ID3" ||
      (bytes[0] === 255 && (bytes[1] & 224) === 224)
    )
  )
    throw new Error("invalid_mp3");
  return bytes;
}
export async function storeAudio(path: string, url: string) {
  const bytes = await fetchAudio(url);
  const { error } = await db()
    .storage.from(BETA_BUCKET)
    .upload(path, bytes, { contentType: "audio/mpeg", upsert: true });
  if (error) throw new Error("audio_storage_failed");
}
