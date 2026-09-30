import { NextResponse } from "next/server";
import { z } from "zod";
import { sessionFor } from "@/lib/beta-repository";
import { db } from "@/lib/beta-repository";
import { mediaBucket, mediaFor } from "@/lib/gift-media";
import { isStudioOwner } from "@/lib/studio-auth";
import { privateHeaders } from "@/lib/beta-http";
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params,
      u = new URL(request.url),
      asset = u.searchParams.get("asset") ?? "",
      key = u.searchParams.get("key") ?? "",
      gift = u.searchParams.get("gift") === "1";
    if (
      !z.string().uuid().safeParse(id).success ||
      !z.string().uuid().safeParse(asset).success
    )
      return new Response(null, { status: 404 });
    const studio =
      u.searchParams.get("studio") === "1" && (await isStudioOwner());
    const s = studio ? null : await sessionFor(id, key, gift);
    if (!studio && !s) return new Response(null, { status: 404 });
    const media = await mediaFor(asset, id);
    if (
      !media ||
      media.status !== "ready" ||
      (gift &&
        !studio &&
        (media.kind !== "photo" || s?.gift_photo_id !== asset))
    )
      return new Response(null, { status: 404 });
    const { data, error } = await db()
      .storage.from(mediaBucket(media.kind))
      .createSignedUrl(
        media.storage_path,
        900,
        u.searchParams.get("download") === "1"
          ? {
              download:
                media.kind === "reaction"
                  ? "reaction." + media.storage_path.split(".").pop()
                  : "gift-photo." + media.storage_path.split(".").pop(),
            }
          : undefined,
      );
    if (error || !data) return new Response(null, { status: 503 });
    return NextResponse.redirect(data.signedUrl, {
      status: 307,
      headers: privateHeaders,
    });
  } catch {
    return new Response(null, { status: 503, headers: privateHeaders });
  }
}
