import { NextResponse } from "next/server";
export class ClientError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}
export function assertSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host") ?? new URL(request.url).host;
  // Private-link pages use no-referrer, which can serialize Origin as "null".
  // Sec-Fetch-Site is a browser-controlled header and still proves same-origin.
  const sameOriginFetch =
    request.headers.get("sec-fetch-site") === "same-origin";
  let originMatches = false;
  if (origin && origin !== "null") {
    try {
      const parsed = new URL(origin);
      originMatches = parsed.host === host && /^https?:$/.test(parsed.protocol);
    } catch {}
  }
  if (!originMatches && !((!origin || origin === "null") && sameOriginFetch))
    throw new ClientError("Please submit from the website.", 403);
}
export async function bodyJSON(request: Request) {
  assertSameOrigin(request);
  if (!request.headers.get("content-type")?.includes("application/json"))
    throw new ClientError("Invalid request.", 415);
  const text = await request.text();
  if (text.length > 24000)
    throw new ClientError("Please shorten your request.", 413);
  try {
    return JSON.parse(text);
  } catch {
    throw new ClientError("Invalid request.");
  }
}
export function apiError(error: unknown) {
  if (error instanceof ClientError)
    return NextResponse.json(
      { error: error.message },
      { status: error.status },
    );
  const code = error instanceof Error ? error.message : "";
  if (/beta_limit|retry_limit/.test(code))
    return NextResponse.json(
      { error: "The test limit has been reached. Please try again tomorrow." },
      { status: 429 },
    );
  console.error("song_request_failed", {
    type: error instanceof Error ? error.name : "unknown",
  });
  return NextResponse.json(
    {
      error:
        "We could not finish that request. Your saved song is safe. Please try again.",
    },
    { status: 503 },
  );
}
export const privateHeaders = {
  "Cache-Control": "private, no-store",
  "Referrer-Policy": "no-referrer",
};

// POST callers have already validated Origin against the external Host.
export function requestOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== "null") return new URL(origin).origin;
  const internal = new URL(request.url);
  return `${process.env.VERCEL ? "https:" : internal.protocol}//${request.headers.get("host") ?? internal.host}`;
}
