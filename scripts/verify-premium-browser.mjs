import http from "node:http";
import { spawn, execFileSync } from "node:child_process";
import fs from "node:fs";
import fsp from "node:fs/promises";
import assert from "node:assert/strict";
import Module, { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const qaRequire = createRequire(
  path.join(
    process.env.STUDIO_QA_RUNTIME ?? path.join(root, "..", "qa-runtime"),
    "package.json",
  ),
);
const { chromium } = qaRequire("playwright"),
  cm = qaRequire("@sparticuz/chromium"),
  chrome = cm.default ?? cm;
const require = createRequire(import.meta.url),
  orig = Module._load;
Module._load = function (id, ...args) {
  if (id === "server-only") return {};
  return orig.call(this, id, ...args);
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
const { createAudioPreview } = require("../src/lib/audio-preview.ts");
const source = fs.readFileSync(root + "/public/audio/the-way-i-see-you.mp3");
const clip = await createAudioPreview(source);
const clipFile = path.join(root, "..", "preview-qa.mp3");
await fsp.writeFile(clipFile, clip);
const duration = Number(
  execFileSync(
    "ffprobe",
    [
      "-v",
      "error",
      "-show_entries",
      "format=duration",
      "-of",
      "default=noprint_wrappers=1:nokey=1",
      clipFile,
    ],
    { encoding: "utf8" },
  ),
);
assert.ok(duration >= 59.9 && duration < 60.1);
assert.ok(clip.length < source.length);
await assert.rejects(() =>
  createAudioPreview(Buffer.from("not an audio file")),
);
const id = "11111111-1111-4111-8111-111111111111",
  owner = "22222222-2222-4222-8222-222222222222",
  gift = "33333333-3333-4333-8333-333333333333",
  t1 = "44444444-4444-4444-8444-444444444444",
  t2 = "55555555-5555-4555-8555-555555555555",
  job = "77777777-7777-4777-8777-777777777777";
const session = {
  id,
  access_token: owner,
  gift_token: gift,
  selected_track_id: null,
  gift_photo_id: null,
  reaction_asset_id: null,
  checkout_mode: "test",
  payment_status: "pending",
  email: "synthetic@example.com",
  gift_message: "",
  gift_given_at: null,
  raw_answers: {
    email: "synthetic@example.com",
    recipientName: "Jennifer",
    genre: "Acoustic",
    occasion: "Anniversary",
  },
  created_at: "2026-10-03T00:00:00Z",
};
const tracks = [t1, t2].map((id, i) => ({
  id,
  session_id: session.id,
  job_id: job,
  title: i ? "Always You" : "Every Little Thing",
  lyrics:
    "The coffee going cold beside the window\nThe laughter coming down the hall\nOf all the roads that brought me here\nI would choose the one that led to you\n\nEvery little thing we are\nEvery ordinary day\nA thousand quiet reasons\nI would choose you anyway",
  storage_path: `version-${i}.mp3`,
  preview_storage_path: `version-${i}.preview.mp3`,
  duration: 245,
}));
const tables = {
  song_beta_sessions: [session],
  song_beta_tracks: tracks,
  song_beta_jobs: [
    {
      id: job,
      session_id: id,
      kind: "original",
      status: "complete",
      created_at: session.created_at,
    },
  ],
  song_beta_feedback: [],
  song_beta_media: [],
  song_checkout_orders: [],
  song_keepsake_orders: [],
};
const signed = [];
let originalReservations = 0;
const fixture = http.createServer(async (req, res) => {
  const u = new URL(req.url, "http://127.0.0.1:4133");
  let raw = "";
  for await (const c of req) raw += c;
  const b = raw ? JSON.parse(raw) : {};
  res.setHeader("Content-Type", "application/json");
  const send = (s, v) => {
    res.statusCode = s;
    res.end(JSON.stringify(v));
  };
  if (u.pathname.startsWith("/storage/v1/object/sign/")) {
    signed.push({ path: u.pathname, ...b });
    return send(200, {
      signedURL: "/object/public/" + u.pathname.split("/").at(-1),
    });
  }
  if (u.pathname.startsWith("/storage/v1/object/public/")) {
    res.setHeader("Content-Type", "audio/mpeg");
    const bytes = u.pathname.includes(".preview.") ? clip : source;
    res.setHeader("Accept-Ranges", "bytes");
    const range = /bytes=(\d+)-(\d*)/.exec(req.headers.range ?? "");
    if (range) {
      const start = Number(range[1]),
        end = range[2]
          ? Math.min(Number(range[2]), bytes.length - 1)
          : bytes.length - 1;
      res.statusCode = 206;
      res.setHeader("Content-Range", `bytes ${start}-${end}/${bytes.length}`);
      res.setHeader("Content-Length", end - start + 1);
      res.end(bytes.subarray(start, end + 1));
    } else {
      res.setHeader("Content-Length", bytes.length);
      res.end(bytes);
    }
    return;
  }
  const name = u.pathname.split("/").at(-1);
  if (name === "reserve_beta_job") {
    assert.equal(b.p_kind, "original");
    originalReservations++;
    return send(200, tables.song_beta_jobs[0]);
  }
  if (name === "claim_beta_sync") return send(200, []);
  if (!tables[name]) return send(404, {});
  let rows = tables[name].filter((r) =>
    [...u.searchParams].every(
      ([k, v]) => !v.startsWith("eq.") || String(r[k]) === v.slice(3),
    ),
  );
  if (req.method === "PATCH") {
    rows.forEach((r) => Object.assign(r, b));
    return send(200, rows);
  }
  if (req.method === "POST") {
    tables[name].push(b);
    return send(201, b);
  }
  return send(
    200,
    req.headers.accept?.includes("vnd.pgrst.object") ? (rows[0] ?? null) : rows,
  );
});
await new Promise((r) => fixture.listen(4133, "127.0.0.1", r));
const origin = "http://127.0.0.1:3133";
const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "-p", "3133", "-H", "127.0.0.1"],
  {
    cwd: root,
    env: {
      ...process.env,
      SUPABASE_URL: "http://127.0.0.1:4133",
      SUPABASE_SECRET_KEY: "fixture-only",
      KIE_API_KEY: "fixture-no-provider",
      STRIPE_SITE_URL: origin,
      STRIPE_TEST_SECRET_KEY: "sk_test_fixture",
      STRIPE_TEST_WEBHOOK_SECRET: "whsec_fixture",
      CHECKOUT_MODE: "free",
    },
    stdio: ["ignore", "pipe", "pipe"],
  },
);
let logs = "";
server.stdout.on("data", (c) => (logs += c));
server.stderr.on("data", (c) => (logs += c));
let browser;
const checks = [];
function pass(s) {
  checks.push(s);
  console.log("PASS", s);
}
try {
  for (let n = 0; n < 100; n++) {
    try {
      if ((await fetch(origin + "/studio-preview")).ok) break;
    } catch {}
    await new Promise((r) => setTimeout(r, 100));
  }
  browser = await chromium.launch({
    executablePath: await chrome.executablePath(),
    args: chrome.args,
    headless: true,
  });
  const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    }),
    page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const privatePath = `/song/${id}?key=${owner}`;
  const shot = async (name) => {
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: `${root}/docs/qa/${name}.jpg`,
      fullPage: true,
      quality: 85,
    });
  };
  const post = (url, data) =>
    page.request.post(origin + url, { data, headers: { origin } });
  await page.goto(origin + privatePath);
  await page.getByRole("heading", { name: "For Jennifer." }).waitFor();
  await page.getByRole("button", { name: "Keep my songs" }).waitFor();
  assert.equal(await page.locator("audio").count(), 1);
  assert.equal(
    await page.getByText("AFTER THE GIFT", { exact: true }).count(),
    0,
  );
  assert.match(
    await page
      .locator(".checkout-offer")
      .innerText()
      .catch(() => page.locator(".workbench-panel").innerText()),
    /29/,
  );
  await shot("premium-checkout-1440");
  await page.getByRole("button", { name: "Play song", exact: true }).click();
  await page.waitForFunction(
    () => document.querySelector("audio").currentTime > 0,
  );
  assert.ok(await page.locator("audio").evaluate((a) => a.duration < 61));
  await page.getByRole("button", { name: "Pause song", exact: true }).click();
  assert.equal(
    await page.getByRole("link", { name: "Download MP3" }).count(),
    0,
  );
  assert.equal(
    (
      await post("/api/song-gift", {
        songId: id,
        accessToken: owner,
        trackId: t1,
      })
    ).status(),
    402,
  );
  pass(
    "Unpaid studio offers $29, one real 60-second player, and denies gift editing/full downloads",
  );
  session.payment_status = "paid";
  await page.reload();
  await page
    .locator(".ownership-seal")
    .filter({ hasText: "Purchase confirmed" })
    .waitFor();
  await page.getByText("Saved in My songs on this browser.").waitFor();
  assert.equal(
    await page.locator(".studio-revision").getAttribute("open"),
    null,
  );
  assert.equal(
    await page.getByText("AFTER THE GIFT", { exact: true }).count(),
    0,
  );
  await shot("premium-studio-1440");
  await page.locator(".studio-revision summary").click();
  await shot("premium-revision-1440");
  await page.setViewportSize({ width: 390, height: 844 });
  await shot("premium-revision-390");
  await page.locator(".studio-revision summary").click();
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.getByRole("button", { name: /Always You/ }).click();
  await page
    .getByRole("heading", { name: "Always You", exact: true })
    .waitFor();
  await page.getByRole("button", { name: "Play song", exact: true }).click();
  await page.waitForFunction(
    () =>
      document.querySelector("audio").currentTime > 0 &&
      document.querySelector("audio").duration > 60,
  );
  await page.getByRole("slider", { name: "Song position" }).fill("30");
  assert.ok(await page.locator("audio").evaluate((a) => a.currentTime >= 29));
  await page.getByRole("button", { name: "Pause song", exact: true }).click();
  assert.equal(await page.locator("audio").count(), 1);
  await page.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(
    await page
      .locator(".studio-vinyl")
      .evaluate((e) => getComputedStyle(e).animationName),
    "none",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  pass(
    "Paid state unlocks the same originals; version switching, full playback, seek, pause and reduced motion work",
  );
  await page.getByRole("button", { name: "Give this version" }).click();
  await page.getByRole("heading", { name: "A little more you." }).waitFor();
  assert.equal(session.selected_track_id, t2);
  await page
    .getByLabel("A note from you")
    .fill("Every ordinary day with you is my favorite.");
  await shot("premium-prepare-1440");
  await page.getByRole("link", { name: /See your keepsake/ }).click();
  await page.getByRole("heading", { name: /Somewhere they/ }).waitFor();
  assert.equal(
    session.gift_message,
    "Every ordinary day with you is my favorite.",
  );
  await page
    .getByRole("link", { name: "Back to your gift", exact: false })
    .click();
  await page.getByRole("button", { name: "Get my gift ready" }).waitFor();
  assert.equal(
    await page.getByLabel("A note from you").inputValue(),
    session.gift_message,
  );

  await page.getByRole("button", { name: "Get my gift ready" }).click();
  await page
    .getByRole("heading", { name: "Ready for their first listen." })
    .waitFor();
  assert.equal(
    session.gift_message,
    "Every ordinary day with you is my favorite.",
  );
  const giftLinks = await page
    .locator(".gift-share a")
    .evaluateAll((els) => els.map((e) => e.href));
  assert.ok(giftLinks.every((l) => !l.includes(owner)));
  await page
    .getByRole("button", { name: "Copy gift link", exact: true })
    .click();
  const shared = await page.getByLabel("Recipient’s gift link").inputValue();
  assert.ok(shared.includes(gift));
  assert.ok(!shared.includes(owner));
  await shot("premium-share-1440");
  const recipient = await context.newPage();
  await recipient.goto(origin + `/gift/${id}?key=${gift}`);
  await recipient.getByText(session.gift_message, { exact: true }).waitFor();
  assert.ok(!(await recipient.content()).includes(owner));
  assert.equal(await recipient.locator("audio").count(), 1);
  assert.equal(
    (
      await recipient.request.get(
        origin + `/api/songs/${id}/keepsake?key=${gift}&preview=1`,
      )
    ).status(),
    404,
  );
  await recipient.screenshot({
    path: root + "/docs/qa/premium-recipient-1440.jpg",
    fullPage: true,
    quality: 85,
  });
  await recipient.setViewportSize({ width: 390, height: 844 });
  await recipient.screenshot({
    path: root + "/docs/qa/premium-recipient-390.jpg",
    fullPage: true,
    quality: 85,
  });
  await recipient.close();
  pass(
    "Selection and personal note persist; recipient sees only the chosen gift and no owner key",
  );
  await page
    .getByRole("button", { name: "I’ve given the gift", exact: true })
    .click();
  await page.getByText("AFTER THE GIFT", { exact: true }).waitFor();
  assert.ok(session.gift_given_at);
  await page.getByText("Share your feedback", { exact: false }).click();
  assert.equal(
    await page.getByLabel("How personal did the song feel?").inputValue(),
    "",
  );
  await page.getByLabel("How personal did the song feel?").selectOption("4");
  await page
    .getByRole("button", { name: "Send feedback", exact: true })
    .click();
  await page.getByText("Saved. Thank you for sharing.").waitFor();
  await page.reload();
  await page.getByText("AFTER THE GIFT", { exact: true }).waitFor();
  pass(
    "Feedback appears only after gift-given action; rating is never preselected and saved state survives reload",
  );
  const download = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Save private access", exact: true })
    .click();
  const file = await download;
  const saved = await fsp.readFile(await file.path(), "utf8");
  assert.ok(saved.includes(owner));
  assert.ok(!saved.includes(gift));
  const cookies = await context.cookies();
  assert.ok(
    cookies.find((c) => c.name === "song-collection" && c.httpOnly && c.secure),
  );
  assert.equal(
    await page.getByRole("button", { name: "Email me access" }).count(),
    0,
  );
  await page.goto(origin + "/my-songs");
  await page
    .getByRole("heading", { name: "For Jennifer", exact: true })
    .waitFor();
  await shot("premium-library-1440");
  assert.match(
    await page.locator(".library-recovery").innerText(),
    /stay on this browser/,
  );
  pass(
    "My songs returns to verified device collection; private access file downloads; unconfigured email is not promised",
  );
  await page.goto(origin + `/song/${id}/keepsake?key=${owner}`);
  await page.getByRole("heading", { name: /Somewhere they/ }).waitFor();
  await page.locator(".keepsake-frame img").evaluate((img) => img.decode());
  await shot("premium-keepsake-1440");
  assert.equal(
    (
      await page.request.get(origin + `/api/songs/${id}/keepsake?key=${owner}`)
    ).status(),
    403,
  );
  const svg = await page.request.get(
    origin + `/api/songs/${id}/keepsake?key=${owner}&preview=1`,
  );
  assert.equal(svg.status(), 200);
  assert.match(await svg.text(), /YOUR KEEPSAKE PREVIEW/);
  tables.song_keepsake_orders.push({
    id: "88888888-8888-4888-8888-888888888888",
    session_id: id,
    mode: "test",
    status: "paid",
    stripe_checkout_id: null,
    amount: 900,
    currency: "usd",
  });
  const pdf = await page.request.get(
    origin + `/api/songs/${id}/keepsake?key=${owner}`,
  );
  assert.equal(pdf.status(), 200);
  assert.ok((await pdf.body()).subarray(0, 4).equals(Buffer.from("%PDF")));
  await fsp.writeFile(
    root + "/docs/qa/premium-lyric-sample.pdf",
    await pdf.body(),
  );
  const printed = execFileSync(
    "pdftotext",
    [root + "/docs/qa/premium-lyric-sample.pdf", "-"],
    { encoding: "utf8" },
  );
  assert.ok(printed.includes("For Jennifer"));
  assert.ok(printed.includes("I would choose you anyway"));
  execFileSync("pdftoppm", [
    "-scale-to",
    "900",
    "-singlefile",
    "-png",
    root + "/docs/qa/premium-lyric-sample.pdf",
    root + "/docs/qa/premium-lyric-render",
  ]);
  await page.reload();
  await page.getByRole("link", { name: "Download my printable PDF" }).waitFor();
  pass(
    "Real watermarked keepsake preview and 8×10 PDF render; unpurchased and recipient access denied, paid download allowed",
  );
  session.gift_given_at = null;
  for (const width of [390, 320, 768, 1440]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
    for (const route of [
      privatePath,
      privatePath + "&step=prepare",
      privatePath + "&step=share",
      "/my-songs",
      `/song/${id}/keepsake?key=${owner}`,
    ]) {
      await page.goto(origin + route);
      await page.locator("main h1").waitFor();
      if (route.startsWith("/song/") && !route.includes("/keepsake"))
        await page.locator(".studio-player-room").waitFor();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      );
      assert.equal(overflow, false, `overflow ${width} ${route.split("?")[0]}`);
      if (width === 390) {
        const name = route.includes("/keepsake")
          ? "keepsake"
          : route.includes("prepare")
            ? "prepare"
            : route.includes("share")
              ? "share"
              : route === "/my-songs"
                ? "library"
                : "studio";
        await shot(`premium-${name}-390`);
      }
    }
  }
  pass(
    "Listen, prepare, share, collection and keepsake have no overflow at 320,390,768,1440px",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(origin + privatePath);
  await page.locator(".studio-player-room").waitFor();
  await page.getByRole("button", { name: /Make it theirs/ }).click();
  await page.waitForFunction(() => {
    const e = document.querySelector(".studio-workbench");
    return (
      e &&
      e.getBoundingClientRect().top >= 0 &&
      e.getBoundingClientRect().top < innerHeight / 3
    );
  });
  pass("Mobile step navigation scrolls directly to the active gift task");
  await page.goto(origin + "/studio-preview?view=checkout");
  await page
    .getByRole("button", { name: "Keep my songs", exact: true })
    .waitFor();
  await page
    .getByRole("button", { name: "Keep my songs", exact: true })
    .click();
  await page
    .locator(".ownership-seal")
    .filter({ hasText: "Purchase confirmed" })
    .waitFor();
  await page
    .getByRole("button", { name: "Give this version", exact: true })
    .click();
  await page.getByRole("link", { name: /See your keepsake/ }).waitFor();
  await page.getByRole("link", { name: /See your keepsake/ }).click();
  await page.locator(".keepsake-frame img").evaluate((img) => img.decode());
  await page.goto(origin + "/your-song");
  assert.equal(await page.locator(".studio-player-room").count(), 0);
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth + 1,
    ),
    false,
  );
  pass(
    "Public preview supports checkout-to-studio walkthrough and keepsake inspection; public song page remains separate",
  );
  assert.deepEqual(errors, []);
  assert.equal(originalReservations > 0, true);
  assert.ok(tables.song_beta_jobs.length === 1);
  pass("No browser exceptions or duplicate original generations");
  await fsp.writeFile(
    root + "/docs/qa/premium-browser-evidence.json",
    JSON.stringify(
      {
        date: new Date().toISOString(),
        scope:
          "Production build with real browser, SDK, FFmpeg, audio files and PDF generation; controlled synthetic REST/storage and paid-state transition. Separate Stripe contract tests validate fulfillment. No customer data, actual charges or generation credits.",
        checks,
      },
      null,
      2,
    ) + "\n",
  );
} catch (e) {
  if (browser) {
    const p = browser.contexts()[0]?.pages()[0];
    if (p) {
      await p.screenshot({
        path: root + "/docs/qa/premium-failure.jpg",
        fullPage: true,
      });
      console.error((await p.locator("body").innerText()).slice(0, 3000));
    }
  }
  console.error(logs);
  throw e;
} finally {
  if (browser) await browser.close();
  server.kill();
  fixture.close();
}
