import { mockMusicProvider } from "./mock";
import { sunoMusicProvider } from "./suno";

export function getMusicProvider() {
  return process.env.MUSIC_PROVIDER === "suno" ? sunoMusicProvider : mockMusicProvider;
}
