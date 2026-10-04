import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import {
  bodyJSON,
  apiError,
  ClientError,
  privateHeaders,
} from "@/lib/beta-http";
import { requireSession } from "@/lib/beta-repository";
import { createKeepsakeCheckout } from "@/lib/keepsake-payments";
import { checkoutCookieName } from "@/lib/payments";
export const maxDuration = 60;
export async function POST(request: Request) {
  try {
    const p = z
      .object({ songId: z.string().uuid(), accessToken: z.string().uuid() })
      .safeParse(await bodyJSON(request));
    if (!p.success) throw new ClientError("Invalid keepsake order.");
    const s = await requireSession(p.data.songId, p.data.accessToken);
    const url = await createKeepsakeCheckout(s);
    (await cookies()).set(checkoutCookieName(s.id), s.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 86400,
    });
    return NextResponse.json({ url, paid: !url }, { headers: privateHeaders });
  } catch (e) {
    return apiError(e);
  }
}
