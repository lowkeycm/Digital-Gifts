import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { projectUrl, publishableKey } from "@/lib/supabase";
import { customerCookieOptions } from "@/lib/customer-library";
import { studioCookieOptions } from "@/lib/studio-account";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const client = createServerClient(projectUrl, publishableKey, {
    cookieOptions:
      request.nextUrl.pathname.startsWith("/my-songs") ||
      request.nextUrl.pathname.startsWith("/api/my-songs")
        ? customerCookieOptions
        : studioCookieOptions,
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(values, headers) {
        values.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        values.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
        Object.entries(headers).forEach(([key, value]) =>
          response.headers.set(key, value),
        );
      },
    },
  });
  await client.auth.getUser();
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = {
  matcher: [
    "/studio/:path*",
    "/api/studio/:path*",
    "/create",
    "/api/intakes",
    "/api/songs/:id/media",
    "/my-songs/:path*",
    "/api/my-songs/:path*",
  ],
};
