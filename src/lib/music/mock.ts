import type { MusicProvider } from "./provider";

export const mockMusicProvider: MusicProvider = {
  async generate(request) {
    return {
      provider: "mock",
      providerGenerationId: `mock_${crypto.randomUUID()}`,
      status: "complete",
      audioUrl: undefined,
      lyrics: request.kind === "preview"
        ? "Demo preview. The production music provider will write and perform from the customer's raw story details."
        : "Demo full song. This proves delivery and revision flow before Suno is connected.",
    };
  },
};
