import { requireFullSongAccess } from "@/lib/song-access";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireSession } from "@/lib/beta-repository";
import { reserveAndStart } from "@/lib/beta-generation";
import { requestOrigin, bodyJSON, apiError, ClientError } from "@/lib/beta-http";
export const maxDuration = 60;
const schema = z.object({
  songId: z.string().uuid(),
  accessToken: z.string().uuid(),
  kind: z.enum(["original", "revision"]),
});
export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await bodyJSON(request));
    if (!parsed.success) throw new ClientError("Invalid song request.");
    const p = parsed.data,
      session = await requireSession(p.songId, p.accessToken);
    if (p.kind === "revision") requireFullSongAccess(session);
    await reserveAndStart(
      session,
      p.kind,
      requestOrigin(request),
      "",
      true,
    );
    return NextResponse.json({ ok: true });
  } catch (e) {
    return apiError(e);
  }
}
