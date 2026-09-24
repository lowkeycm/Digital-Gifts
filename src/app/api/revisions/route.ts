import { NextResponse } from "next/server";
import { z } from "zod";
import { requestRevision } from "@/lib/song-repository";

const schema = z.object({
  songId: z.string().uuid(),
  accessToken: z.string().uuid(),
  type: z.string().min(1).max(80),
  notes: z.string().min(5).max(1500),
});

export async function POST(req: Request) {
  try {
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) return NextResponse.json({ error: "Tell us what needs changing." }, { status: 400 });
    const id = await requestRevision({
      intakeId: parsed.data.songId,
      accessToken: parsed.data.accessToken,
      revisionType: parsed.data.type,
      notes: parsed.data.notes,
    });
    return NextResponse.json({ ok: true, id, status: "requested" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Revision request failed.";
    const conflict = /revision already/i.test(message);
    return NextResponse.json({ error: conflict ? "Your included revision has already been requested." : "We could not save that revision." }, { status: conflict ? 409 : 500 });
  }
}
