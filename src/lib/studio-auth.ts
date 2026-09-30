import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { ClientError } from "./beta-http";
export function studioConfigured() {
  return (process.env.TEST_STUDIO_PASSWORD?.length ?? 0) >= 16;
}
export function matchesStudioPassword(value: string) {
  const expected = process.env.TEST_STUDIO_PASSWORD ?? "";
  const a = createHmac("sha256", "studio-comparison").update(value).digest(),
    b = createHmac("sha256", "studio-comparison").update(expected).digest();
  return studioConfigured() && timingSafeEqual(a, b);
}
function signature(expires: string) {
  return createHmac("sha256", process.env.TEST_STUDIO_PASSWORD!)
    .update(`gift-studio:${expires}`)
    .digest("hex");
}
export async function studioLogin() {
  const expires = String(Date.now() + 8 * 60 * 60 * 1000);
  (await cookies()).set("gift-studio", `${expires}.${signature(expires)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 8 * 60 * 60,
    path: "/",
  });
}
export async function isStudioOwner() {
  if (!studioConfigured()) return false;
  const value = (await cookies()).get("gift-studio")?.value ?? "",
    [expires, sig] = value.split(".");
  if (
    !/^\d+$/.test(expires) ||
    Number(expires) < Date.now() ||
    !sig ||
    sig.length !== 64
  )
    return false;
  return timingSafeEqual(Buffer.from(sig), Buffer.from(signature(expires)));
}
export async function requireStudioOwner() {
  if (!(await isStudioOwner()))
    throw new ClientError("Please sign in to the test studio.", 401);
}
