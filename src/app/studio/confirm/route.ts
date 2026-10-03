import { NextResponse } from "next/server";
import { authorizedStudioUser, studioAuthClient } from "@/lib/studio-account";
import { privateHeaders } from "@/lib/beta-http";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const origin = new URL(process.env.STRIPE_SITE_URL ?? "https://www.yourgiftsmith.com").origin;
  const code = url.searchParams.get("code");
  if (code && code.length <= 500) {
    const client = await studioAuthClient(true);
    const flowId = url.searchParams.get("sb_flow_id");
    const { data, error } = await client.auth.exchangeCodeForSession(code, flowId ? { flowId } : undefined);
    if (!error && await authorizedStudioUser(data.user)) {
      return NextResponse.redirect(new URL(url.searchParams.get("next") === "password" ? "/studio/password" : "/studio", origin), { headers: privateHeaders });
    }
    await client.auth.signOut({ scope: "local" });
  }
  return NextResponse.redirect(new URL("/studio?auth=expired", origin), { headers: privateHeaders });
}
