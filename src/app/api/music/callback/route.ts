import { after, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/beta-repository";
import { syncJob } from "@/lib/beta-generation";
export const maxDuration = 60;
export async function POST(request: Request) {
  try {
    const url = new URL(request.url),
      id = url.searchParams.get("job"),
      token = url.searchParams.get("token");
    if (
      !z.string().uuid().safeParse(id).success ||
      !z.string().uuid().safeParse(token).success
    )
      return new Response(null, { status: 403 });
    const { data: job, error } = await db()
      .from("song_beta_jobs")
      .select("id,task_id,status")
      .eq("id", id!)
      .eq("callback_token", token!)
      .maybeSingle();
    if (error) throw error;
    if (!job) return new Response(null, { status: 403 });
    const text = await request.text();
    if (text.length > 200000) return new Response(null, { status: 413 });
    const body = JSON.parse(text);
    const taskId = body?.data?.task_id ?? body?.data?.taskId;
    if (
      typeof taskId !== "string" ||
      taskId.length > 200 ||
      (job.task_id && taskId !== job.task_id)
    )
      return new Response(null, { status: 400 });
    if (!["complete", "failed"].includes(job.status)) {
      // Nonterminal callbacks must never replace an already stored final callback.
      const isFinal =
        body?.data?.callbackType === "complete" ||
        body?.data?.callbackType === "error" ||
        body.code !== 200;
      const values: Record<string, unknown> = { task_id: taskId };
      if (isFinal) values.callback_payload = body;
      const { error: e } = await db()
        .from("song_beta_jobs")
        .update(values)
        .eq("id", job.id)
        .not("status", "in", "(complete,failed)");
      if (e) throw e;
      after(() => syncJob(job.id));
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Callback could not be saved." },
      { status: 500 },
    );
  }
}
