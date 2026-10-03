import { requireFullSongAccess } from "@/lib/song-access";
import { NextResponse } from "next/server";
import { storagePublishableKey } from "@/lib/supabase";
import { z } from "zod";
import {
  bodyJSON,
  apiError,
  ClientError,
  privateHeaders,
} from "@/lib/beta-http";
import { requireSession, db } from "@/lib/beta-repository";
import {
  mediaBucket,
  mediaFor,
  verifyMedia,
  type GiftMedia,
} from "@/lib/gift-media";
export const maxDuration = 60;
const base = z.object({
  songId: z.string().uuid(),
  accessToken: z.string().uuid(),
});
const schema = z.discriminatedUnion("action", [
  base.extend({
    action: z.literal("prepare"),
    requestId: z.string().uuid(),
    kind: z.enum(["photo", "reaction"]),
    mime: z.enum([
      "image/jpeg",
      "image/png",
      "image/webp",
      "video/mp4",
      "video/quicktime",
      "video/webm",
    ]),
    size: z.number().int().positive().max(52428800),
    consent: z.literal(true),
  }),
  base.extend({ action: z.literal("complete"), assetId: z.string().uuid() }),
]);
export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await bodyJSON(request));
    if (!parsed.success)
      throw new ClientError(
        "Choose a supported file and confirm you have permission to upload it.",
      );
    const p = parsed.data;
    requireFullSongAccess(await requireSession(p.songId, p.accessToken));
    if (p.action === "prepare") {
      if (
        (p.kind === "photo" &&
          (!p.mime.startsWith("image/") || p.size > 8388608)) ||
        (p.kind === "reaction" && !p.mime.startsWith("video/"))
      )
        throw new ClientError("Use a photo up to 8 MB or a video up to 50 MB.");
      const { data, error } = await db().rpc("reserve_beta_media", {
        p_session_id: p.songId,
        p_request_id: p.requestId,
        p_kind: p.kind,
        p_mime: p.mime,
        p_size: p.size,
      });
      if (error) {
        if (error.message.includes("upload_limit"))
          throw new ClientError("This song has reached its upload limit.", 429);
        throw error;
      }
      const media = (Array.isArray(data) ? data[0] : data) as GiftMedia;
      const bucket = mediaBucket(media.kind);
      const { data: signed, error: e } = await db()
        .storage.from(bucket)
        .createSignedUploadUrl(media.storage_path, { upsert: false });
      if (e || !signed) throw new Error("upload_sign_failed");
      const url = new URL(signed.signedUrl);
      url.hostname = url.hostname.replace(
        ".supabase.co",
        ".storage.supabase.co",
      );
      url.pathname = "/storage/v1/upload/resumable/sign";
      url.search = "";
      return NextResponse.json(
        {
          assetId: media.id,
          path: media.storage_path,
          bucket,
          token: signed.token,
          apiKey: storagePublishableKey(),
          endpoint: url.toString(),
          ready: media.status === "ready",
        },
        { headers: privateHeaders },
      );
    }
    const media = await mediaFor(p.assetId, p.songId);
    if (!media) throw new ClientError("Upload not found.", 404);
    if (media.status !== "ready") {
      await verifyMedia(media);
      const { error } = await db()
        .from("song_beta_media")
        .update({ status: "ready" })
        .eq("id", media.id);
      if (error) throw error;
    }
    const { error } = await db()
      .from("song_beta_sessions")
      .update(
        media.kind === "photo"
          ? { gift_photo_id: media.id }
          : { reaction_asset_id: media.id },
      )
      .eq("id", p.songId);
    if (error) throw error;
    return NextResponse.json(
      { ok: true, assetId: media.id },
      { headers: privateHeaders },
    );
  } catch (e) {
    return apiError(e);
  }
}
