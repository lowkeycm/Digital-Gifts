import { NextResponse } from "next/server";
import { z } from "zod";
import { getMusicProvider } from "@/lib/music";
import { completeDemoCheckout, getSongSession, recordGeneration } from "@/lib/song-repository";

const schema = z.object({
  songId: z.string().uuid(),
  accessToken: z.string().uuid(),
});

export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Invalid song link." }, { status: 400 });
    if (process.env.DEMO_CHECKOUT === "false") {
      return NextResponse.json({ error: "Stripe checkout is not connected yet." }, { status: 501 });
    }

    const session = await getSongSession(parsed.data.songId, parsed.data.accessToken);
    if (!session) return NextResponse.json({ error: "Song not found." }, { status: 404 });

    await completeDemoCheckout(parsed.data.songId, parsed.data.accessToken);
    if (!session.full) {
      const provider = getMusicProvider();
      const result = await provider.generate({
        brief: `Create the full version of the approved ${session.genre} personalized song for ${session.recipientName}.`,
        kind: "full",
      });
      await recordGeneration({ intakeId: parsed.data.songId, accessToken: parsed.data.accessToken, kind: "full", result });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("checkout_failed", error);
    return NextResponse.json({ error: "Demo checkout failed. Please try again." }, { status: 500 });
  }
}
