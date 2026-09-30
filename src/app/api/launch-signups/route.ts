import { NextResponse } from "next/server";
import { z } from "zod";
import { createPublicServerClient } from "@/lib/supabase";
import { assertSameOrigin, apiError } from "@/lib/beta-http";

const signupSchema = z.object({
  email: z.string().trim().toLowerCase().max(254).email(),
  consent: z.literal(true),
  source: z.enum(["/", "/your-song"]),
  website: z.string().max(200).default(""),
});

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
  } catch (error) {
    return apiError(error);
  }
  // Read a bounded stream, including requests without Content-Length.
  const reader = request.body?.getReader();
  if (!reader)
    return NextResponse.json({ error: "Email required." }, { status: 400 });
  let bytes = 0;
  let body = "";
  const decoder = new TextDecoder();
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 4096) {
        await reader.cancel();
        return NextResponse.json(
          { error: "Request too large." },
          { status: 413 },
        );
      }
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
    const parsed = signupSchema.safeParse(JSON.parse(body));
    if (!parsed.success)
      return NextResponse.json(
        { error: "Enter a valid email and agree to the launch announcement." },
        { status: 400 },
      );
    if (parsed.data.website) return NextResponse.json({ ok: true });
    const { error } = await createPublicServerClient().rpc(
      "register_song_launch_interest",
      {
        p_email: parsed.data.email,
        p_source: parsed.data.source,
        p_consent: parsed.data.consent,
      },
    );
    if (error) {
      return NextResponse.json(
        { error: "Unable to save signup. Please try again." },
        { status: error.code === "P0429" ? 429 : 503 },
      );
    }
    // Identical response for new and existing addresses; never return lead data.
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to save signup. Please try again." },
      { status: 400 },
    );
  }
}
