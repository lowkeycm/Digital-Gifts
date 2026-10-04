import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import Module, { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import RealStripe from "stripe";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."),
  require = createRequire(import.meta.url);
const originalResolve = Module._resolveFilename,
  originalLoad = Module._load;
const cookieJar = new Map();
const session = {
  id: "11111111-1111-4111-8111-111111111111",
  access_token: "22222222-2222-4222-8222-222222222222",
  checkout_mode: "test",
  payment_status: "paid",
  selected_track_id: "44444444-4444-4444-8444-444444444444",
  raw_answers: {
    recipientName: "Jennifer",
    email: "synthetic@example.com",
    favoriteMemory: "These exact  words stay private",
  },
};
let previewReady = true,
  createFailure = null;
let orders = [],
  checkouts = new Map(),
  createCalls = [],
  generationCalls = 0,
  generationClaimed = false;
class FixtureStripe extends RealStripe {
  constructor(...args) {
    super(...args);
    this.checkout = {
      sessions: {
        create: async (body, options) => {
          if (createFailure) throw createFailure;
          if (body.managed_payments?.enabled !== false)
            throw new RealStripe.errors.StripeInvalidRequestError({
              message:
                "Product tax code is required for Managed Payments, which is enabled by default on your account.",
            });
          assert.equal("allowed_payment_method_types" in body, false);
          assert.equal("payment_method_types" in body, false);
          createCalls.push({ body, options });
          let existing = [...checkouts.values()].find(
            (c) => c.key === options.idempotencyKey,
          );
          if (existing) return existing;
          const c = {
            id: "cs_test_" + createCalls.length,
            key: options.idempotencyKey,
            status: "open",
            payment_status: "unpaid",
            livemode: false,
            mode: "payment",
            url: "https://checkout.stripe.com/c/pay/synthetic",
            metadata: body.metadata,
            client_reference_id: body.client_reference_id,
            amount_total: 900,
            currency: "usd",
            payment_intent: "pi_test_fixture",
          };
          checkouts.set(c.id, c);
          return c;
        },
        retrieve: async (id) => {
          assert.ok(checkouts.has(id));
          return structuredClone(checkouts.get(id));
        },
      },
    };
  }
}
Module._resolveFilename = function (id, ...rest) {
  return originalResolve.call(
    this,
    id.startsWith("@/") ? path.join(root, "src", id.slice(2)) : id,
    ...rest,
  );
};
Module._load = function (id, ...rest) {
  if (id === "server-only") return {};
  if (id === "stripe") return FixtureStripe;
  if (id === "next/headers")
    return {
      cookies: async () => ({
        get: (k) =>
          cookieJar.has(k) ? { value: cookieJar.get(k) } : undefined,
        set: (k, v) => cookieJar.set(k, v),
      }),
    };
  return originalLoad.call(this, id, ...rest);
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
const repo = {
  jobsFor: async () => [
    {
      id: "original-job",
      kind: "original",
      status: previewReady ? "complete" : "queued",
    },
  ],
  tracksFor: async () => [
    {
      id: "44444444-4444-4444-8444-444444444444",
      title: "A song for you",
      lyrics:
        "Every ordinary day\nA thousand quiet reasons\nI would choose you anyway",
    },
  ],
  requireSession: async (id, key) => {
    if (id !== session.id || key !== session.access_token)
      throw new Error("invalid_session");
    return structuredClone(session);
  },
  sessionFor: async (id, key) =>
    id === session.id && key === session.access_token
      ? structuredClone(session)
      : null,
  db: () => ({
    rpc: async (name, p) => {
      if (name === "reserve_song_keepsake") {
        let o = orders.find((o) => o.session_id === p.p_session_id);
        if (!o) {
          o = {
            id: "33333333-3333-4333-8333-333333333333",
            session_id: session.id,
            mode: "test",
            amount: 900,
            currency: "usd",
            origin: p.p_origin,
            stripe_checkout_id: null,
            status: "pending",
            checkout_attempt: 1,
          };
          orders.push(o);
        }
        return { data: structuredClone(o), error: null };
      }
      if (name === "mark_song_checkout_paid") {
        const o = orders.find((o) => o.id === p.p_order_id);
        assert.equal(o.stripe_checkout_id, p.p_checkout_id);
        assert.equal(p.p_amount, 2900);
        o.status = "paid";
        session.payment_status = "paid";
        return { data: structuredClone(session), error: null };
      }
      throw new Error(name);
    },
    from: () => {
      let filters = [],
        values;
      const q = {
        select() {
          return this;
        },
        eq(k, v) {
          filters.push((o) => o[k] === v);
          return this;
        },
        is(k, v) {
          filters.push((o) => o[k] === v);
          return this;
        },
        update(v) {
          values = v;
          return this;
        },
        maybeSingle() {
          return this;
        },
        then(resolve) {
          const rows = orders.filter((o) => filters.every((f) => f(o)));
          if (values) rows.forEach((o) => Object.assign(o, values));
          return Promise.resolve({
            data: values
              ? structuredClone(rows)
              : structuredClone(rows[0] ?? null),
            error: null,
          }).then(resolve);
        },
      };
      return q;
    },
  }),
};
for (const [filename, exports] of [
  ["beta-repository.ts", repo],
  [
    "beta-generation.ts",
    {
      reserveAndStart: async (s) => {
        assert.equal(s.payment_status, "paid");
        if (!generationClaimed) {
          generationClaimed = true;
          generationCalls++;
        }
      },
    },
  ],
]) {
  const p = require.resolve("../src/lib/" + filename);
  require.cache[p] = { id: p, filename: p, loaded: true, exports };
}
process.env.CHECKOUT_MODE = "free";
process.env.STRIPE_TEST_SECRET_KEY = "sk_test_synthetic_only";
process.env.STRIPE_TEST_WEBHOOK_SECRET = "whsec_fixture_only";
delete process.env.STRIPE_SECRET_KEY;
delete process.env.STRIPE_WEBHOOK_SECRET;
const keepsake = require("../src/lib/keepsake-payments.ts"),
  checkoutRoute = require("../src/app/api/keepsake-checkout/route.ts"),
  webhook = require("../src/app/api/webhooks/stripe/[mode]/route.ts"),
  returnRoute = require("../src/app/checkout/keepsake-return/route.ts");
const checks = [];
function pass(s) {
  checks.push(s);
  console.log("PASS", s);
}
const headers = {
  "content-type": "application/json",
  origin: "https://www.yourgiftsmith.com",
  host: "www.yourgiftsmith.com",
};
session.payment_status = "pending";
await assert.rejects(
  () => keepsake.createKeepsakeCheckout(session),
  /after purchasing/,
);
session.payment_status = "paid";
session.selected_track_id = null;
await assert.rejects(() => keepsake.createKeepsakeCheckout(session));
session.selected_track_id = "44444444-4444-4444-8444-444444444444";
assert.equal(createCalls.length, 0);
pass(
  "Unpaid songs cannot buy a keepsake; a printable design is required before checkout",
);
let r = await checkoutRoute.POST(
  new Request("https://www.yourgiftsmith.com/api/keepsake-checkout", {
    method: "POST",
    headers,
    body: JSON.stringify({
      songId: session.id,
      accessToken: session.access_token,
      amount: 1,
    }),
  }),
);
assert.equal(r.status, 200);
assert.equal(
  (await r.json()).url,
  "https://checkout.stripe.com/c/pay/synthetic",
);
await Promise.all([
  keepsake.createKeepsakeCheckout(session),
  keepsake.createKeepsakeCheckout(session),
]);
assert.equal(createCalls.length, 1);
assert.equal(orders.length, 1);
const payload = createCalls[0].body;
assert.equal(payload.line_items[0].price_data.unit_amount, 900);
assert.equal(payload.metadata.product, "lyric_keepsake");
assert.equal(payload.managed_payments.enabled, false);
assert.equal("payment_method_types" in payload, false);
assert.ok(!JSON.stringify(payload).includes(session.access_token));
assert.ok(
  !JSON.stringify(payload).includes(session.raw_answers.favoriteMemory),
);
assert.equal(generationCalls, 0);
pass(
  "Fixed $9 USD hosted Checkout ignores client amount, reuses order, excludes private keys/story, and starts no music generation",
);
const c = checkouts.get(orders[0].stripe_checkout_id);
assert.equal(await keepsake.reconcileKeepsake(c.id, "test"), false);
assert.equal(orders[0].status, "pending");
c.status = "complete";
c.payment_status = "paid";
const invalid = [
  { amount_total: 2900 },
  { currency: "eur" },
  { livemode: true },
  { mode: "subscription" },
  { status: "open" },
  { payment_status: "unpaid" },
  { id: "different" },
  { client_reference_id: "different" },
  { metadata: { ...c.metadata, product: "base_song" } },
  { metadata: { ...c.metadata, app: "other" } },
  { metadata: { ...c.metadata, order_id: "different" } },
  { metadata: { ...c.metadata, song_id: "different" } },
];
for (const patch of invalid)
  assert.throws(() => keepsake.validateKeepsake({ ...c, ...patch }, orders[0]));
await assert.rejects(() => keepsake.reconcileKeepsake(c.id, "live"));
pass(
  "Fulfillment rejects wrong amount, currency, live mode, product, session, order, app, reference and incomplete payment",
);
const stripe = new RealStripe("sk_test_synthetic_only");
const event = JSON.stringify({
    id: "evt_synthetic",
    livemode: false,
    type: "checkout.session.completed",
    data: { object: c },
  }),
  signature = stripe.webhooks.generateTestHeaderString({
    payload: event,
    secret: "whsec_fixture_only",
  });
r = await webhook.POST(
  new Request("https://www.yourgiftsmith.com/api/webhooks/stripe/test", {
    method: "POST",
    headers: { "stripe-signature": "invalid" },
    body: event,
  }),
  { params: Promise.resolve({ mode: "test" }) },
);
assert.equal(r.status, 400);
assert.equal(orders[0].status, "pending");
for (let i = 0; i < 2; i++) {
  r = await webhook.POST(
    new Request("https://www.yourgiftsmith.com/api/webhooks/stripe/test", {
      method: "POST",
      headers: { "stripe-signature": signature },
      body: event,
    }),
    { params: Promise.resolve({ mode: "test" }) },
  );
  assert.equal(r.status, 200);
}
assert.equal(orders[0].status, "paid");
assert.equal(session.payment_status, "paid");
assert.equal(generationCalls, 0);
assert.equal(await keepsake.createKeepsakeCheckout(session), null);
assert.equal(createCalls.length, 1);
pass(
  "Actual Stripe SDK signature validation rejects forged events; duplicate signed events grant one keepsake without altering base purchase",
);
r = await returnRoute.GET(
  new Request(
    "https://www.yourgiftsmith.com/checkout/keepsake-return?order=" +
      orders[0].id,
  ),
);
assert.equal(r.status, 303);
assert.ok(r.headers.get("location").includes(session.access_token));
cookieJar.clear();
r = await returnRoute.GET(
  new Request(
    "https://www.yourgiftsmith.com/checkout/keepsake-return?order=" +
      orders[0].id,
  ),
);
assert.equal(r.status, 303);
assert.ok(r.headers.get("location").endsWith("/my-songs"));
assert.ok(!r.headers.get("location").includes(session.access_token));
pass(
  "Checkout return requires owner cookie; missing cookie returns to My songs without exposing private access",
);
orders[0].status = "pending";
c.status = "expired";
c.payment_status = "unpaid";
await keepsake.createKeepsakeCheckout(session);
assert.equal(orders[0].checkout_attempt, 2);
assert.equal(createCalls.length, 2);
assert.ok(createCalls[1].options.idempotencyKey.endsWith("-2"));
r = await checkoutRoute.POST(
  new Request("https://www.yourgiftsmith.com/api/keepsake-checkout", {
    method: "POST",
    headers: { ...headers, origin: "https://attacker.example" },
    body: JSON.stringify({
      songId: session.id,
      accessToken: session.access_token,
    }),
  }),
);
assert.equal(r.status, 403);
pass(
  "Expired sessions renew with a new idempotency attempt; cross-origin creation is denied",
);
const art = require("../src/lib/keepsake-art.ts");
for (const specimen of [
  { recipient: "Jennifer", title: "A song", lyrics: "" },
  { recipient: "Jennifer", title: "A song", lyrics: "漢字" },
  { recipient: "X".repeat(300), title: "A song", lyrics: "Ordinary words" },
  {
    recipient: "Jennifer",
    title: "A song",
    lyrics: "Ordinary words\n".repeat(300),
  },
])
  await assert.rejects(() => art.buildKeepsake(specimen));
pass(
  "Unprintable lettering, oversize names and excessive lyrics are rejected before a charge",
);
fs.writeFileSync(
  path.join(root, "docs/qa/premium-keepsake-checks.json"),
  JSON.stringify(
    {
      environment:
        "Real TypeScript routes, actual PDF generation and Stripe SDK signature verification, controlled database/provider transport. No actual payment or customer data.",
      checks,
    },
    null,
    2,
  ) + "\n",
);
