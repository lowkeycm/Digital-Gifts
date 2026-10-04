import { NextResponse } from "next/server";
import { z } from "zod";
import {
  apiError,
  bodyJSON,
  ClientError,
  privateHeaders,
} from "@/lib/beta-http";
import { customerAuthClient } from "@/lib/customer-library";
export async function POST(request: Request) {
  try {
    const p = z
      .object({ tokenHash: z.string().regex(/^[a-zA-Z0-9_-]{20,300}$/) })
      .safeParse(await bodyJSON(request));
    if (!p.success)
      throw new ClientError("That sign-in link is invalid. Request a new one.");
    const auth = await customerAuthClient(true);
    const { data, error } = await auth.auth.verifyOtp({
      token_hash: p.data.tokenHash,
      type: "magiclink",
    });
    if (error || !data.user?.email_confirmed_at)
      throw new ClientError(
        "That sign-in link has expired or was already used. Request a new one.",
        401,
      );
    return NextResponse.json({ ok: true }, { headers: privateHeaders });
  } catch (e) {
    return apiError(e);
  }
}
