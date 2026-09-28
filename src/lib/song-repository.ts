import type { Intake } from "@/lib/intake";
import type { GenerationResult } from "@/lib/music/provider";
import { createPublicServerClient } from "@/lib/supabase";

export type SongSession = {
  id: string;
  recipientName: string;
  relationship: string;
  occasion: string;
  genre: string;
  vocalPreference: string;
  status: string;
  orderStatus: string;
  preview: null | { id: string; audioPath: string | null; lyrics: string | null; status: string };
  full: null | { id: string; audioPath: string | null; lyrics: string | null; status: string };
  revision: null | { id: string; revisionType: string; customerNotes: string; status: string };
};

function firstRow<T>(data: unknown): T {
  if (Array.isArray(data)) return data[0] as T;
  return data as T;
}

export async function createIntake(input: Intake, musicBrief: string) {
  const supabase = createPublicServerClient();
  const { data, error } = await supabase.rpc("create_song_intake", {
    p_email: input.email,
    p_recipient_name: input.recipientName,
    p_relationship: input.relationship,
    p_occasion: input.occasion,
    p_genre: input.genre,
    p_vocal_preference: input.vocalPreference,
    p_raw_answers: input,
    p_music_brief: musicBrief,
  });
  if (error) throw new Error(`Database intake failed: ${error.message}`);
  const row = firstRow<{ id: string; access_token: string }>(data);
  if (!row?.id || !row?.access_token) throw new Error("Database intake did not return access credentials.");
  return { id: row.id, accessToken: row.access_token };
}

export async function recordGeneration(input: {
  intakeId: string;
  accessToken: string;
  kind: "preview" | "full" | "revision";
  result: GenerationResult;
}) {
  const supabase = createPublicServerClient();
  const { data, error } = await supabase.rpc("record_song_generation", {
    p_intake_id: input.intakeId,
    p_access_token: input.accessToken,
    p_provider: input.result.provider,
    p_provider_generation_id: input.result.providerGenerationId,
    p_kind: input.kind,
    p_status: input.result.status,
    p_audio_path: input.result.audioUrl ?? null,
    p_lyrics: input.result.lyrics ?? null,
    p_provider_payload: { mock: input.result.provider === "mock" },
  });
  if (error) throw new Error(`Database generation failed: ${error.message}`);
  return firstRow<{ generation_id: string }>(data)?.generation_id;
}

export async function getSongSession(intakeId: string, accessToken: string): Promise<SongSession | null> {
  const supabase = createPublicServerClient();
  const { data, error } = await supabase.rpc("get_song_session", {
    p_intake_id: intakeId,
    p_access_token: accessToken,
  });
  if (error || !data) return null;
  const raw = firstRow<Record<string, unknown>>(data);
  if (!raw || Object.keys(raw).length === 0) return null;
  return {
    id: String(raw.id),
    recipientName: String(raw.recipient_name),
    relationship: String(raw.relationship),
    occasion: String(raw.occasion),
    genre: String(raw.genre),
    vocalPreference: String(raw.vocal_preference),
    status: String(raw.status),
    orderStatus: String(raw.order_status ?? "pending"),
    preview: (raw.preview as SongSession["preview"]) ?? null,
    full: (raw.full as SongSession["full"]) ?? null,
    revision: (raw.revision as SongSession["revision"]) ?? null,
  };
}

export async function completeDemoCheckout(intakeId: string, accessToken: string) {
  const supabase = createPublicServerClient();
  const { data, error } = await supabase.rpc("complete_demo_checkout", {
    p_intake_id: intakeId,
    p_access_token: accessToken,
  });
  if (error) throw new Error(`Demo checkout failed: ${error.message}`);
  return firstRow<{ order_id: string }>(data)?.order_id;
}

export async function requestRevision(input: { intakeId: string; accessToken: string; revisionType: string; notes: string }) {
  const supabase = createPublicServerClient();
  const { data, error } = await supabase.rpc("request_song_revision", {
    p_intake_id: input.intakeId,
    p_access_token: input.accessToken,
    p_revision_type: input.revisionType,
    p_customer_notes: input.notes,
  });
  if (error) throw new Error(error.message);
  return firstRow<{ revision_id: string }>(data)?.revision_id;
}

export async function checkDatabaseHealth() {
  const supabase = createPublicServerClient();
  const { data, error } = await supabase.rpc("digital_gifts_health");
  if (error) throw new Error(error.message);
  return data;
}
