import { NextResponse } from "next/server";
import { z } from "zod";
import { sessionFor, db } from "@/lib/beta-repository";
import { BETA_BUCKET } from "@/lib/beta-config";
import { privateHeaders } from "@/lib/beta-http";
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params,
      u = new URL(request.url),
      key = u.searchParams.get("key") ?? "",
      track = u.searchParams.get("track") ?? "";
    if (!z.string().uuid().safeParse(track).success)
      return new Response(null, { status: 404 });
    const gift = u.searchParams.get("gift") === "1";
    const session = await sessionFor(id, key, gift);
    if (!session || (gift && session.selected_track_id !== track))
      return new Response(null, { status: 404 });
    const { data, error } = await db()
      .from("song_beta_tracks")
      .select("storage_path")
      .eq("session_id", id)
      .eq("id", track)
      .maybeSingle();
    if (error || !data) return new Response(null, { status: 404 });
    const { data: signed, error: e } = await db()
      .storage.from(BETA_BUCKET)
      .createSignedUrl(
        data.storage_path,
        3600,
        u.searchParams.get("download") === "1"
          ? { download: "your-song.mp3" }
          : undefined,
      );
    if (e || !signed) return new Response(null, { status: 503 });
    return NextResponse.redirect(signed.signedUrl, {
      status: 307,
      headers: privateHeaders,
    });
  } catch {
    return new Response(null, { status: 503, headers: privateHeaders });
  }
}
