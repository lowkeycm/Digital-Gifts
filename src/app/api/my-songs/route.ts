import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import {
  apiError,
  bodyJSON,
  ClientError,
  privateHeaders,
} from "@/lib/beta-http";
import { requireSession } from "@/lib/beta-repository";
import { customerAuthClient, rememberSong } from "@/lib/customer-library";
export async function POST(request: Request) {
  try {
    const body = await bodyJSON(request);
    const p = z
      .object({ songId: z.string().uuid(), accessToken: z.string().uuid() })
      .safeParse(body);
    if (!p.success) throw new ClientError("Invalid private song link.");
    await rememberSong(await requireSession(p.data.songId, p.data.accessToken));
    return NextResponse.json({ saved: true }, { headers: privateHeaders });
  } catch (e) {
    return apiError(e);
  }
}
export async function DELETE(request: Request) {
  try {
    await bodyJSON(request);
    const auth = await customerAuthClient(true);
    await auth.auth.signOut({ scope: "local" });
    (await cookies()).delete("song-collection");
    return NextResponse.json({ ok: true }, { headers: privateHeaders });
  } catch (e) {
    return apiError(e);
  }
}
