import { z } from "zod";

// Shared validation only. Provider credentials and translation stay server-side.
export const musicDirectionSchema = z.object({
  genre: z.string().min(1).max(100),
  vocals: z.string().max(150),
  instruments: z.array(z.string().min(1).max(60)).max(3),
  tempo: z.string().max(70),
  mood: z.string().max(100),
  production: z.string().max(100),
  arrangement: z.string().max(140),
  negativeTags: z.array(z.string().min(1).max(50)).max(8),
}).strict();

export type MusicDirection = z.infer<typeof musicDirectionSchema>;
export function directionStyle(direction: MusicDirection) {
  return [direction.genre, direction.vocals, ...direction.instruments,
    direction.tempo, direction.mood, direction.production, direction.arrangement]
    .filter(Boolean).join(", ");
}

export type SavedMusicDirection = {
  id: string;
  fingerprint: string;
  version: string;
  model: string;
  createdAt: string;
  direction: MusicDirection;
  usage: { inputTokens: number | null; outputTokens: number | null; totalTokens: number | null; credits: number | null };
};
