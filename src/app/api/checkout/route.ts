import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { requireSession } from "@/lib/beta-repository";
import { bodyJSON, apiError, ClientError, privateHeaders } from "@/lib/beta-http";
import { createSongCheckout, checkoutCookieName } from "@/lib/payments";
const schema = z.object({ songId: z.string().uuid(), accessToken: z.string().uuid() });
export const maxDuration = 60;
export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await bodyJSON(request));
    if (!parsed.success) throw new ClientError("Invalid song order.");
    const session = await requireSession(parsed.data.songId, parsed.data.accessToken);
    const url = await createSongCheckout(session);
    (await cookies()).set(checkoutCookieName(session.id), session.access_token, {
      httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 86400,
    });
    return NextResponse.json({ url, paid: !url }, { headers: privateHeaders });
  } catch (e) { return apiError(e); }
}
