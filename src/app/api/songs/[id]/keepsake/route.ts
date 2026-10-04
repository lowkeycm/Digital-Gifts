import { requireSession, tracksFor } from "@/lib/beta-repository";
import { requireFullSongAccess } from "@/lib/song-access";
import { keepsakeFor } from "@/lib/keepsake-payments";
import { buildKeepsake } from "@/lib/keepsake-art";
import { apiError, ClientError, privateHeaders } from "@/lib/beta-http";
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const q = new URL(request.url).searchParams;
    const session = await requireSession(id, q.get("key") ?? "");
    requireFullSongAccess(session);
    const preview = q.get("preview") === "1";
    if (!preview && (await keepsakeFor(id))?.status !== "paid")
      throw new ClientError(
        "Add the lyric keepsake to download your print.",
        403,
      );
    const track = (await tracksFor(id)).find(
      (t) => t.id === session.selected_track_id,
    );
    if (!track) throw new ClientError("Choose a gift version first.", 409);
    const art = await buildKeepsake({
      recipient: session.raw_answers.recipientName,
      title: track.title,
      lyrics: track.lyrics,
    });
    return new Response(preview ? art.svg : new Uint8Array(art.pdf), {
      headers: {
        ...privateHeaders,
        "Content-Type": preview ? "image/svg+xml" : "application/pdf",
        "X-Content-Type-Options": "nosniff",
        ...(preview
          ? {
              "Content-Security-Policy":
                "default-src 'none'; style-src 'unsafe-inline'; font-src data:; sandbox",
            }
          : {
              "Content-Disposition":
                'attachment; filename="Your-Song-Lyric-Keepsake.pdf"',
            }),
      },
    });
  } catch (e) {
    return apiError(e);
  }
}
