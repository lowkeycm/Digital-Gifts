import type { MusicProvider } from "./provider";

/**
 * Official Suno Platform adapter placeholder.
 * Do not guess private or gated API endpoints.
 */
export const sunoMusicProvider: MusicProvider = {
  async generate() {
    throw new Error("Official Suno Platform access is not configured yet.");
  },
};
