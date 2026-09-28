export type GenerationRequest = {
  brief: string;
  kind: "preview" | "full" | "revision";
  sourceGenerationId?: string;
  revisionInstruction?: string;
};

export type GenerationResult = {
  provider: string;
  providerGenerationId: string;
  status: "queued" | "processing" | "complete" | "failed";
  audioUrl?: string;
  lyrics?: string;
};

export interface MusicProvider {
  generate(request: GenerationRequest): Promise<GenerationResult>;
}
