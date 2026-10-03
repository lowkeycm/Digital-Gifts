import { requireFullSongAccess } from "@/lib/song-access";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireSession, jobsFor } from "@/lib/beta-repository";
import { revisionNotes, revisionNotesAllowance } from "@/lib/revisions";
import { reserveAndStart } from "@/lib/beta-generation";
import { kieBrief, KIE_PROMPT_LIMIT } from "@/lib/music/kie";
import { requestOrigin, bodyJSON, apiError, ClientError } from "@/lib/beta-http";
export const maxDuration = 60;
const schema = z.object({
  songId: z.string().uuid(),
  accessToken: z.string().uuid(),
  notes: z.string().trim().min(5).max(500),
  requestId: z.string().uuid(),
});
export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await bodyJSON(request));
    if (!parsed.success)
      throw new ClientError("Tell us what to change in 5 to 500 characters.");
    const p = parsed.data,
      session = await requireSession(p.songId, p.accessToken);
    requireFullSongAccess(session);
    const jobs = await jobsFor(session.id);
    const replay = jobs.find((j) => j.request_id === p.requestId);
    if (p.notes.length > revisionNotesAllowance(session.raw_answers, jobs, replay?.revision_number))
      throw new ClientError("Please shorten your notes so there’s room for all three revisions.");
    if (kieBrief(session.raw_answers, revisionNotes(jobs, p.notes, replay?.revision_number)).length > KIE_PROMPT_LIMIT)
      throw new ClientError("Please shorten your revision notes.");
    await reserveAndStart(
      session,
      "revision",
      requestOrigin(request),
      p.notes,
      false,
      p.requestId,
    );
    return NextResponse.json({ ok: true });
  } catch (e) {
    return apiError(e);
  }
}
