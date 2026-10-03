import { z } from "zod";
import type { Intake } from "@/lib/intake";
import { directionStyle, musicDirectionSchema, type MusicDirection } from "./direction";

export const KIE_PROMPT_LIMIT = 3000;
export function kieBrief(input: Intake, revision?: string) {
  return [
    `Write a complete personalized song for ${input.recipientName}. Relationship: ${input.relationship}. Occasion: ${input.occasion}.`,
    "Use these real details in the customer's own words. Do not invent facts. Turn them into lyrics, not a generic summary.",
    `Our story: ${input.howYouMet}`,
    `Favorite memory: ${input.favoriteMemory}`,
    `Little details: ${input.smallDetails}`,
    input.hardMoment && `They showed up for me: ${input.hardMoment}`,
    `What I want to say: ${input.whatYouWantToSay}`,
    input.mustInclude && `Please include: ${input.mustInclude}`,
    revision &&
      `Requested revision (follow this when it corrects an earlier detail): ${revision}`,
  ]
    .filter(Boolean)
    .join("\n");
}

async function api(path: string, body?: unknown) {
  const key = process.env.KIE_API_KEY;
  if (!key) throw new Error("Music generation is not configured.");
  const response = await fetch(`https://api.kie.ai/api/v1/${path}`, {
    method: body ? "POST" : "GET",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(20000),
    cache: "no-store",
  });
  const result = await response.json();
  if (!response.ok || result.code !== 200) {
    // Do not expose upstream errors, prompts, or credentials to logs/clients.
    throw new KieError(Number(result.code || response.status));
  }
  return result.data;
}
export class KieError extends Error {
  constructor(public code: number) {
    super(`Music service error ${code}`);
  }
}
export async function startKie(
  input: Intake,
  callback: string,
  revision?: string,
  direction?: MusicDirection,
) {
  const prompt = kieBrief(input, revision);
  if (prompt.length > KIE_PROMPT_LIMIT)
    throw new Error("Story is too long for music generation.");
  const sound = direction ? musicDirectionSchema.parse(direction) : undefined;
  const result = await api("jobs/createTask", {
    model: "ai-music-api/generate",
    callBackUrl: callback,
    input: {
      model: "V6",
      custom_mode: false,
      instrumental: false,
      prompt,
      style: sound ? directionStyle(sound) : `${input.genre}, ${input.vocalPreference}. Complete song with verses, chorus and a finished ending.`,
      ...(sound?.negativeTags.length ? { negative_tags: sound.negativeTags.join(", ") } : {}),
    },
  });
  return z.object({ taskId: z.string().min(1).max(200) }).parse(result).taskId;
}
export async function queryKie(taskId: string) {
  return api(`jobs/recordInfo?taskId=${encodeURIComponent(taskId)}`);
}
export type KieTrack = {
  id: string;
  url: string;
  title: string;
  lyrics: string;
  duration: number | null;
};
// Kie documents music callbacks separately from the generic Market task envelope.
// Normalize both without mistaking a streaming preview URL for a completed file.
export function readKieTracks(payload: unknown): KieTrack[] {
  const rows: KieTrack[] = [];
  const visit = (value: unknown, depth = 0) => {
    if (depth > 7 || value == null) return;
    if (typeof value === "string") {
      if (value.startsWith("{") || value.startsWith("[")) {
        try {
          visit(JSON.parse(value), depth + 1);
        } catch {}
      }
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((v) => visit(v, depth + 1));
      return;
    }
    if (typeof value !== "object") return;
    const v = value as Record<string, unknown>;
    const url = v.audio_url ?? v.audioUrl;
    if (typeof url === "string" && url.startsWith("https://"))
      rows.push({
        id: String(v.id ?? v.audioId ?? rows.length),
        url,
        title: String(v.title ?? "Your Song").slice(0, 200),
        lyrics: String(v.lyrics ?? v.prompt ?? "").slice(0, 10000),
        duration: typeof v.duration === "number" ? v.duration : null,
      });
    for (const k of ["data", "response", "sunoData", "result", "resultJson"])
      visit(v[k], depth + 1);
    if (Array.isArray(v.resultUrls))
      for (const u of v.resultUrls) {
        if (typeof u === "string" && /\.mp3(?:\?|$)/i.test(u))
          rows.push({
            id: String(rows.length),
            url: u,
            title: "Your Song",
            lyrics: "",
            duration: null,
          });
        else visit(u, depth + 1);
      }
  };
  visit(payload);
  return rows
    .filter((t, i) => rows.findIndex((x) => x.url === t.url) === i)
    .slice(0, 4);
}
