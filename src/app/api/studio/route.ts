import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { bodyJSON, ClientError, apiError, privateHeaders } from "@/lib/beta-http";
import { authorizedStudioUser, studioAuthClient, studioEmailAllowed, limitStudioAuth, requireStudioOwner } from "@/lib/studio-account";
import { syncJob } from "@/lib/beta-generation";

const email = z.string().trim().email().max(254).transform(value => value.toLowerCase());
const password = z.string().min(12, "Choose a password with at least 12 characters.").max(200);
const schema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("login"), email, password: z.string().min(1).max(200) }),
  z.object({ action: z.literal("signup"), email, password }),
  z.object({ action: z.literal("recover"), email }),
  z.object({ action: z.literal("password"), password }),
  z.object({ action: z.literal("logout") }),
  z.object({ action: z.literal("sync"), jobId: z.string().uuid() }),
]);
export const maxDuration = 60;
export async function POST(request: Request) {
  try {
    const p = schema.safeParse(await bodyJSON(request));
    if (!p.success) throw new ClientError(p.error.issues[0]?.message ?? "Check your sign-in details.");
    const values = p.data;
    const client = await studioAuthClient(true);
    if (values.action === "login" || values.action === "signup" || values.action === "recover") {
      await limitStudioAuth(request, values.email);
      const allowed = await studioEmailAllowed(values.email);
      if (!allowed) {
        if (values.action === "login") throw new ClientError("Email or password not recognized.", 401);
        return NextResponse.json({ ok: true, message: "If this email has studio access, check your inbox for the next step." }, { headers: privateHeaders });
      }
      const site = new URL(process.env.STRIPE_SITE_URL ?? "https://www.yourgiftsmith.com").origin;
      if (values.action === "recover") {
        const { error } = await client.auth.resetPasswordForEmail(values.email, { redirectTo: `${site}/studio/confirm?next=password` });
        if (error) throw new ClientError("We could not send the recovery email. Please try again shortly.", 503);
        return NextResponse.json({ ok: true, message: "Check your email for a link to reset your password. Open it in this browser." }, { headers: privateHeaders });
      }
      if (values.action === "signup") {
        const { data, error } = await client.auth.signUp({ email: values.email, password: values.password,
          options: { emailRedirectTo: `${site}/studio/confirm` } });
        if (error) throw new ClientError(error.code === "email_address_not_authorized"
          ? "Account emails could not be sent. Please contact the site owner."
          : "We could not set up this account. Try signing in or resetting your password.", 400);
        if (data.session && !(await authorizedStudioUser(data.user))) {
          await client.auth.signOut({ scope: "local" });
          throw new ClientError("Please confirm your email before signing in.", 403);
        }
        return NextResponse.json({ ok: true, ...(data.session ? { redirect: "/studio" } : {
          message: "Check your email to confirm your account. Open the link in this browser, then sign in.",
        }) }, { headers: privateHeaders });
      }
      const { data, error } = await client.auth.signInWithPassword({ email: values.email, password: values.password });
      if (error || !(await authorizedStudioUser(data.user))) {
        await client.auth.signOut({ scope: "local" });
        throw new ClientError("Email or password not recognized. Confirm your email first, or reset your password.", 401);
      }
      (await cookies()).delete("gift-studio");
    } else if (values.action === "logout") {
      const { error } = await client.auth.signOut({ scope: "local" });
      if (error) throw new ClientError("We could not sign you out. Please try again.", 503);
      (await cookies()).delete("gift-studio");
    } else {
      await requireStudioOwner();
      if (values.action === "password") {
        const { error } = await client.auth.updateUser({ password: values.password });
        if (error) throw new ClientError("Your password could not be updated. Use at least 12 characters and try again.", 400);
        await client.auth.signOut({ scope: "others" });
      } else await syncJob(values.jobId);
    }
    return NextResponse.json({ ok: true }, { headers: privateHeaders });
  } catch (e) {
    const response = apiError(e);
    Object.entries(privateHeaders).forEach(([key, value]) => response.headers.set(key, value));
    return response;
  }
}
