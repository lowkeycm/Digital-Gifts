import { after } from "next/server";
import { createHash } from "node:crypto";
import {
  db,
  jobsFor,
  updateJob,
  type BetaJob,
  type BetaSession,
} from "./beta-repository";
import { KieError, startKie, queryKie, readKieTracks } from "./music/kie";
import { storeAudio } from "./audio-storage";

export async function reserveAndStart(
  session: BetaSession,
  kind: "original" | "revision",
  baseUrl: string,
  notes = "",
  retry = false,
) {
  const { data, error } = await db().rpc("reserve_beta_job", {
    p_session_id: session.id,
    p_kind: kind,
    p_notes: notes,
    p_retry: retry,
  });
  if (error) throw new Error(error.message);
  const job = (Array.isArray(data) ? data[0] : data) as BetaJob;
  // Claim submission once, including when two requests received the same reservation.
  const { data: claimed, error: claimError } = await db()
    .from("song_beta_jobs")
    .update({ status: "uncertain" })
    .eq("id", job.id)
    .eq("status", "submitting")
    .select("id");
  if (claimError) throw new Error("job_claim_failed");
  if (!claimed?.length) return job;
  try {
    const callback = new URL("/api/music/callback", baseUrl);
    callback.searchParams.set("job", job.id);
    callback.searchParams.set("token", job.callback_token);
    const taskId = await startKie(
      session.raw_answers,
      callback.toString(),
      job.notes || undefined,
    );
    // An early callback may already have bound this task. Do not regress completed jobs.
    const { error: e } = await db()
      .from("song_beta_jobs")
      .update({ task_id: taskId, status: "queued" })
      .eq("id", job.id)
      .eq("status", "uncertain");
    if (e) throw new Error("task_bind_failed");
  } catch (e) {
    // Transport timeouts may have incurred a generation. Never blindly resubmit them.
    const definitive =
      e instanceof KieError && [400, 401, 402, 403, 422, 429].includes(e.code);
    // A callback can finish while submission is still awaiting its response.
    // Only annotate an unconfirmed submission, never regress that callback.
    const { error: saveError } = await db()
      .from("song_beta_jobs")
      .update({
        status: definitive ? "failed" : "uncertain",
        error_code: definitive
          ? `provider_${e.code}`
          : "submission_unconfirmed",
      })
      .eq("id", job.id)
      .eq("status", "uncertain")
      .is("task_id", null);
    if (saveError) throw new Error("submission_status_save_failed");
  }
  return job;
}

export async function syncJob(jobId: string) {
  const { data, error } = await db().rpc("claim_beta_sync", {
    p_job_id: jobId,
  });
  if (error) throw new Error("sync_claim_failed");
  const job = (Array.isArray(data) ? data[0] : data) as BetaJob | undefined;
  if (!job) return;
  try {
    let payload: unknown = job.callback_payload;
    let complete = false,
      failed = false;
    if (payload && typeof payload === "object") {
      const p = payload as { code?: number; data?: { callbackType?: string } };
      complete = p.code === 200 && p.data?.callbackType === "complete";
      failed =
        Boolean(p.code && p.code !== 200) || p.data?.callbackType === "error";
    }
    if (!complete && !failed && job.task_id) {
      payload = await queryKie(job.task_id);
      const p = payload as { state?: string; status?: string };
      complete = p.state === "success" || p.status === "SUCCESS";
      failed =
        p.state === "fail" ||
        [
          "CREATE_TASK_FAILED",
          "GENERATE_AUDIO_FAILED",
          "SENSITIVE_WORD_ERROR",
        ].includes(p.status ?? "");
    }
    if (failed) {
      await updateJob(job.id, {
        status: "failed",
        error_code: "provider_generation_failed",
      });
      return;
    }
    if (!complete) return;
    const tracks = readKieTracks(payload);
    if (!tracks.length) {
      await updateJob(job.id, { error_code: "awaiting_audio_files" });
      return;
    }
    for (const track of tracks) {
      const name = createHash("sha256")
        .update(track.id)
        .digest("hex")
        .slice(0, 24);
      const path = `${job.session_id}/${job.id}/${name}.mp3`;
      const { data: existing, error: readError } = await db()
        .from("song_beta_tracks")
        .select("id")
        .eq("job_id", job.id)
        .eq("provider_audio_id", track.id)
        .maybeSingle();
      if (readError) throw new Error("track_read_failed");
      if (existing) continue;
      await storeAudio(path, track.url);
      const { error: e } = await db().from("song_beta_tracks").upsert(
        {
          session_id: job.session_id,
          job_id: job.id,
          provider_audio_id: track.id,
          storage_path: path,
          title: track.title,
          lyrics: track.lyrics,
          duration: track.duration,
        },
        { onConflict: "job_id,provider_audio_id" },
      );
      if (e) throw new Error("track_save_failed");
    }
    await updateJob(job.id, { status: "complete", error_code: null });
  } catch {
    // Preserve the task and callback so refresh/reconciliation can retry storage,
    // never regenerate music as a side effect of a download failure.
    await updateJob(job.id, { error_code: "sync_retry_needed" });
  } finally {
    await updateJob(job.id, { sync_until: null });
  }
}
export function scheduleSync(jobs: BetaJob[]) {
  const pending = jobs.filter(
    (j) => !["complete", "failed"].includes(j.status),
  );
  if (pending.length)
    after(async () => {
      for (const job of pending) await syncJob(job.id);
    });
}
export async function syncSession(id: string) {
  const jobs = await jobsFor(id);
  scheduleSync(jobs);
  return jobs;
}
