import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import Module, { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."),
  require = createRequire(import.meta.url);
const resolve = Module._resolveFilename,
  load = Module._load,
  jar = new Map();
let user = null,
  authError = null,
  verifiedToken = null,
  signInCalls = 0,
  sendCount = 0,
  matched = true,
  rateAllowed = true;
const id = "11111111-1111-4111-8111-111111111111",
  key = "22222222-2222-4222-8222-222222222222";
const song = {
  id,
  access_token: key,
  created_at: "2026-10-04",
  email: "synthetic@example.com",
  raw_answers: { email: "synthetic@example.com" },
};
const auth = {
  getUser: async () => ({ data: { user }, error: authError }),
  verifyOtp: async (p) => {
    signInCalls++;
    verifiedToken = p;
    return { data: { user }, error: authError };
  },
  signOut: async () => ({ error: null }),
};
const cookieOptions = [];
Module._resolveFilename = function (id, ...args) {
  return resolve.call(
    this,
    id.startsWith("@/") ? path.join(root, "src", id.slice(2)) : id,
    ...args,
  );
};
Module._load = function (id, ...args) {
  if (id === "server-only") return {};
  if (id === "next/headers")
    return {
      cookies: async () => ({
        get: (n) => jar.get(n),
        getAll: () => [...jar].map(([name, { value }]) => ({ name, value })),
        set: (name, value, options) => {
          jar.set(name, { value });
          cookieOptions.push({ name, ...options });
        },
        delete: (n) => jar.delete(n),
      }),
    };
  if (id === "@supabase/ssr")
    return {
      createServerClient: (_u, _k, options) => {
        assert.equal(options.cookieOptions.name, "gift-customer-account");
        return { auth };
      },
    };
  return load.call(this, id, ...args);
};
Module._extensions[".ts"] = (m, f) =>
  m._compile(
    ts.transpileModule(fs.readFileSync(f, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
    }).outputText,
    f,
  );
const queries = [];
const db = () => ({
  auth: {
    admin: {
      generateLink: async (p) => {
        assert.equal(p.type, "magiclink");
        assert.equal(p.email, song.email);
        return {
          data: {
            properties: { hashed_token: "synthetic_hash_12345678901234567890" },
          },
          error: null,
        };
      },
    },
  },
  from: () => {
    const q = {
      select() {
        return this;
      },
      eq(k, v) {
        queries.push([k, v]);
        return this;
      },
      limit() {
        return this;
      },
      order() {
        return this;
      },
      then(resolve) {
        return Promise.resolve({
          data: matched ? [song] : [],
          error: null,
        }).then(resolve);
      },
    };
    return q;
  },
});
const repo = {
  db,
  sessionFor: async (i, k) => (i === id && k === key ? song : null),
  requireSession: async (i, k) => {
    assert.equal(i, id);
    assert.equal(k, key);
    return song;
  },
};
for (const [file, exports] of [
  ["beta-repository.ts", repo],
  [
    "studio-account.ts",
    {
      limitStudioAuth: async () => {
        if (!rateAllowed)
          throw new (require("../src/lib/beta-http.ts").ClientError)(
            "Too many attempts",
            429,
          );
      },
    },
  ],
]) {
  const filename = require.resolve("../src/lib/" + file);
  require.cache[filename] = { id: filename, filename, loaded: true, exports };
}
const checks = [];
function pass(s) {
  checks.push(s);
  console.log("PASS", s);
}
const library = require("../src/lib/customer-library.ts"),
  access = require("../src/app/api/my-songs/access/route.ts"),
  confirm = require("../src/app/api/my-songs/confirm/route.ts");
const headers = {
  "content-type": "application/json",
  origin: "https://www.yourgiftsmith.com",
  host: "www.yourgiftsmith.com",
};
const req = (body) =>
  new Request("https://www.yourgiftsmith.com/api/my-songs/access", {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
delete process.env.RESEND_API_KEY;
delete process.env.SONG_EMAIL_FROM;
let r = await access.POST(req({ email: song.email }));
assert.equal(r.status, 503);
assert.equal(library.customerEmailEnabled(), false);
await library.rememberSong(song);
assert.ok(
  cookieOptions.some((o) => o.name === "song-collection" && o.httpOnly),
);
assert.equal((await library.librarySongs()).songs.length, 1);
jar.set("song-collection", {
  value: JSON.stringify([{ id, key: "33333333-3333-4333-8333-333333333333" }]),
});
assert.equal((await library.librarySongs()).songs.length, 0);
pass(
  "Device collection requires a valid private capability; malformed/forged entries cannot reveal songs; absent sender reports unavailable",
);
jar.set("gift-customer-account", { value: "synthetic-cookie" });
queries.length = 0;
user = { email: song.email, email_confirmed_at: null };
assert.equal((await library.librarySongs()).songs.length, 0);
assert.equal(queries.length, 0);
user = { email: "SYNTHETIC@EXAMPLE.COM", email_confirmed_at: "2026-10-04" };
authError = { message: "expired" };
assert.equal((await library.librarySongs()).songs.length, 0);
authError = null;
assert.equal((await library.librarySongs()).songs.length, 1);
assert.ok(queries.some(([k, v]) => k === "email" && v === song.email));
pass(
  "Account library uses server getUser, confirmed mailbox and exact normalized email; expired/unconfirmed identity cannot list songs",
);
process.env.RESEND_API_KEY = "re_synthetic";
process.env.SONG_EMAIL_FROM = "Your Song <synthetic@example.com>";
globalThis.fetch = async (url, options) => {
  assert.equal(url, "https://api.resend.com/emails");
  sendCount++;
  const body = JSON.parse(options.body);
  assert.deepEqual(body.to, [song.email]);
  assert.ok(body.text.includes("/my-songs/confirm?token_hash="));
  assert.ok(!JSON.stringify(body).includes(key));
  return new Response("{}", { status: 200 });
};
r = await access.POST(req({ email: song.email }));
assert.equal(r.status, 200);
const known = await r.json();
assert.equal(sendCount, 1);
matched = false;
r = await access.POST(req({ email: "unknown@example.com" }));
assert.equal(r.status, 200);
assert.deepEqual(await r.json(), known);
assert.equal(sendCount, 1);
matched = true;
rateAllowed = false;
r = await access.POST(req({ email: song.email }));
assert.equal(r.status, 429);
assert.equal(sendCount, 1);
rateAllowed = true;
pass(
  "Known and unknown email receive the same response; rate limits precede sending; email contains a single-use sign-in token, no song owner key",
);
authError = { message: "expired" };
r = await confirm.POST(
  req({ tokenHash: "synthetic_hash_12345678901234567890" }),
);
assert.equal(r.status, 401);
authError = null;
r = await confirm.POST(
  req({ tokenHash: "synthetic_hash_12345678901234567890" }),
);
assert.equal(r.status, 200);
assert.equal(verifiedToken.type, "magiclink");
assert.equal(signInCalls, 2);
r = await confirm.POST(req({ tokenHash: "short" }));
assert.equal(r.status, 400);
assert.equal(signInCalls, 2);
r = await confirm.POST(
  new Request("https://www.yourgiftsmith.com/api/my-songs/confirm", {
    method: "POST",
    headers: { ...headers, origin: "https://attacker.example" },
    body: JSON.stringify({ tokenHash: "synthetic_hash_12345678901234567890" }),
  }),
);
assert.equal(r.status, 403);
assert.equal(signInCalls, 2);
pass(
  "Explicit confirmation verifies the magic-link token; expired, malformed and cross-origin requests fail; owner and customer cookies stay separate",
);
fs.writeFileSync(
  root + "/docs/qa/premium-access-checks.json",
  JSON.stringify(
    {
      environment:
        "Actual TypeScript library/routes with controlled Supabase Auth and email transport. No email sent; live sender configuration and delivery remain a launch dependency.",
      checks,
    },
    null,
    2,
  ) + "\n",
);
