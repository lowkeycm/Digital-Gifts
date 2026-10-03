import "server-only";
import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import ffmpeg from "ffmpeg-static";
import { SONG_PREVIEW_SECONDS } from "./song-access";

// A separate file is essential: a browser playback timer would expose the full MP3.
export async function createAudioPreview(bytes: Buffer) {
  if (!ffmpeg) throw new Error("preview_encoder_unavailable");
  const directory = await mkdtemp(join(tmpdir(), "song-preview-"));
  try {
    const input = join(directory, "input.mp3"), output = join(directory, "preview.mp3");
    await writeFile(input, bytes);
    await promisify(execFile)(ffmpeg, [
      "-hide_banner", "-loglevel", "error", "-nostdin",
      "-protocol_whitelist", "file,pipe", "-f", "mp3", "-i", input,
      "-map", "0:a:0", "-t", String(SONG_PREVIEW_SECONDS), "-vn",
      "-map_metadata", "-1", "-af", "afade=t=out:st=57:d=3",
      "-c:a", "libmp3lame", "-b:a", "128k", "-threads", "1", "-y", output,
    ], { timeout: 20000, maxBuffer: 65536 });
    const preview = await readFile(output);
    if (!preview.length || preview.length > 2 * 1024 * 1024) throw new Error("invalid_audio_preview");
    return preview;
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}
