import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { bodyJSON, ClientError, apiError } from "@/lib/beta-http";
import {
  matchesStudioPassword,
  studioLogin,
  requireStudioOwner,
} from "@/lib/studio-auth";
import { syncJob } from "@/lib/beta-generation";
const schema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("login"), password: z.string().max(200) }),
  z.object({ action: z.literal("logout") }),
  z.object({ action: z.literal("sync"), jobId: z.string().uuid() }),
]);
export const maxDuration = 60;
export async function POST(request: Request) {
  try {
    const p = schema.safeParse(await bodyJSON(request));
    if (!p.success) throw new ClientError("Invalid studio request.");
    if (p.data.action === "login") {
      if (!matchesStudioPassword(p.data.password))
        throw new ClientError("Studio password not recognized.", 401);
      await studioLogin();
    } else {
      await requireStudioOwner();
      if (p.data.action === "logout") (await cookies()).delete("gift-studio");
      else await syncJob(p.data.jobId);
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return apiError(e);
  }
}
