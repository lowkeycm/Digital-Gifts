import { NextResponse } from "next/server";
import { z } from "zod";
import { requireSession, db } from "@/lib/beta-repository";
import { bodyJSON, apiError, ClientError } from "@/lib/beta-http";
const schema = z.object({
  songId: z.string().uuid(),
  accessToken: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  comments: z.string().trim().max(3000),
  mayContact: z.boolean(),
});
export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await bodyJSON(request));
    if (!parsed.success)
      throw new ClientError(
        "Choose a rating and keep feedback under 3,000 characters.",
      );
    const p = parsed.data;
    await requireSession(p.songId, p.accessToken);
    const { error } = await db().from("song_beta_feedback").upsert({
      session_id: p.songId,
      rating: p.rating,
      comments: p.comments,
      may_contact: p.mayContact,
      updated_at: new Date().toISOString(),
    });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    return apiError(e);
  }
}
