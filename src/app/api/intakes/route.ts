import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { intakeSchema } from "@/lib/intake";
import { betaReady } from "@/lib/beta-config";
import { kieBrief, KIE_PROMPT_LIMIT } from "@/lib/music/kie";
import { db, type BetaSession } from "@/lib/beta-repository";
import { reserveAndStart } from "@/lib/beta-generation";
import {
  requestOrigin,
  bodyJSON,
  apiError,
  ClientError,
  privateHeaders,
} from "@/lib/beta-http";
export const maxDuration = 60;
const schema = intakeSchema.extend({
  requestId: z.string().uuid(),
  consent: z.literal(true),
  website: z.string().max(0).optional(),
});
export async function POST(request: Request) {
  try {
    if (!betaReady())
      throw new ClientError(
        "The test studio is being connected. Please keep your story and try again shortly.",
        503,
      );
    const parsed = schema.safeParse(await bodyJSON(request));
    if (!parsed.success)
      throw new ClientError(
        "Please complete the story details and agree to the test notice.",
      );
    const { requestId, consent: _, website: __, ...input } = parsed.data;
    void _;
    void __;
    if (kieBrief(input).length > KIE_PROMPT_LIMIT - 600)
      throw new ClientError(
        "Please shorten your story to leave room for your included revision.",
      );
    const ip =
      request.headers.get("x-vercel-forwarded-for")?.split(",")[0] ??
      request.headers.get("x-forwarded-for")?.split(",")[0] ??
      "local";
    const ipHash = createHmac(
      "sha256",
      process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY!,
    )
      .update(ip)
      .digest("hex");
    const { data, error } = await db().rpc("reserve_beta_song", {
      p_request_id: requestId,
      p_email: input.email,
      p_ip_hash: ipHash,
      p_answers: { ...input, testConsent: { accepted: true, version: "free-test-2026-09-29" } },
    });
    if (error) throw new Error(error.message);
    const session = (Array.isArray(data) ? data[0] : data) as BetaSession;
    await reserveAndStart(session, "original", requestOrigin(request));
    return NextResponse.json(
      { id: session.id, accessToken: session.access_token },
      { headers: privateHeaders },
    );
  } catch (e) {
    return apiError(e);
  }
}
