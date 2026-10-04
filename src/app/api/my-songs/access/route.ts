import { NextResponse } from "next/server";
import { z } from "zod";
import {
  apiError,
  bodyJSON,
  ClientError,
  privateHeaders,
} from "@/lib/beta-http";
import { db, requireSession } from "@/lib/beta-repository";
import {
  customerEmailEnabled,
  emailCustomerAccess,
} from "@/lib/customer-library";
import { limitStudioAuth } from "@/lib/studio-account";
const schema = z.union([
  z.object({ email: z.string().trim().toLowerCase().email().max(254) }),
  z.object({ songId: z.string().uuid(), accessToken: z.string().uuid() }),
]);
export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await bodyJSON(request));
    if (!parsed.success)
      throw new ClientError("Enter the email you used for your song.");
    if (!customerEmailEnabled())
      throw new ClientError(
        "Email access isn’t available yet. Open your saved private song link.",
        503,
      );
    const email =
      "email" in parsed.data
        ? parsed.data.email
        : (
            await requireSession(parsed.data.songId, parsed.data.accessToken)
          ).raw_answers.email.toLowerCase();
    await limitStudioAuth(request, `customer:${email}`);
    const { data, error } = await db()
      .from("song_beta_sessions")
      .select("id")
      .eq("email", email)
      .limit(1);
    if (error) throw new Error("customer_library_read_failed");
    if (data?.length) await emailCustomerAccess(email);
    return NextResponse.json(
      {
        ok: true,
        message:
          "If that email has songs, a private sign-in link is on its way. Check your inbox and spam folder.",
      },
      { headers: privateHeaders },
    );
  } catch (e) {
    return apiError(e);
  }
}
