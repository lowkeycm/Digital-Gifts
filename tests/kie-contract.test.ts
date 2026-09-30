import { test } from "node:test";
import assert from "node:assert/strict";
import {
  kieBrief,
  readKieTracks,
  startKie,
  KieError,
} from "../src/lib/music/kie";
const input = {
  recipientName: "Jo",
  relationship: "My sister",
  occasion: "Birthday",
  genre: "R&B",
  vocalPreference: "Female vocal",
  howYouMet: "We grew up on Pine Street.",
  favoriteMemory: "You called the GPS a bossy toaster.",
  smallDetails: "You always steal my fries.",
  hardMoment: "",
  whatYouWantToSay: "You make ordinary days worth remembering.",
  mustInclude: "Jojo",
  email: "test@example.com",
};
test("raw details and revision are preserved; contact information excluded", () => {
  const brief = kieBrief(input, "Please say Jojo, not Joey.");
  for (const v of [
    input.howYouMet,
    input.favoriteMemory,
    input.smallDetails,
    input.whatYouWantToSay,
    "Please say Jojo, not Joey.",
  ])
    assert.ok(brief.includes(v));
  assert.ok(!brief.includes(input.email));
});
test("music callback and Market task envelope normalize into complete audio", () => {
  const tracks = [
    {
      id: "a",
      audio_url: "https://cdn.example.com/a.mp3",
      prompt: "Lyrics",
      title: "For Jo",
      duration: 200,
    },
    { id: "b", audio_url: "https://cdn.example.com/b.mp3" },
  ];
  assert.equal(readKieTracks({ data: { data: tracks } }).length, 2);
  assert.equal(
    readKieTracks({ resultJson: JSON.stringify({ data: tracks }) })[0].lyrics,
    "Lyrics",
  );
  assert.equal(
    readKieTracks({
      response: {
        sunoData: [{ id: "c", audioUrl: "https://cdn.example.com/c.mp3" }],
      },
    }).length,
    1,
  );
  assert.equal(
    readKieTracks({
      data: [{ stream_audio_url: "https://cdn.example.com/stream" }],
    }).length,
    0,
  );
  assert.equal(readKieTracks({ resultJson: "not json" }).length, 0);
});
test("submission uses current V6 contract and does not silently truncate", async () => {
  const previous = globalThis.fetch;
  process.env.KIE_API_KEY = "test-only-key";
  let calls = 0;
  globalThis.fetch = async (url, options) => {
    calls++;
    assert.equal(url, "https://api.kie.ai/api/v1/jobs/createTask");
    const body = JSON.parse(String(options?.body));
    assert.equal(body.input.model, "V6");
    assert.equal(body.input.custom_mode, false);
    assert.equal(body.input.instrumental, false);
    assert.equal(body.input.prompt, kieBrief(input));
    assert.ok(body.input.style.includes("Female vocal"));
    return Response.json({ code: 200, data: { taskId: "test-job" } });
  };
  try {
    assert.equal(
      await startKie(input, "https://example.com/callback"),
      "test-job",
    );
    await assert.rejects(
      startKie(
        { ...input, smallDetails: "x".repeat(4000) },
        "https://example.com/callback",
      ),
    );
    assert.equal(calls, 1);
    globalThis.fetch = async () =>
      Response.json({ code: 402, msg: "Insufficient credits" });
    await assert.rejects(
      startKie(input, "https://example.com/callback"),
      (e: unknown) => e instanceof KieError && e.code === 402,
    );
  } finally {
    globalThis.fetch = previous;
    delete process.env.KIE_API_KEY;
  }
});

test("same-site validation uses external Host behind Next routing", async () => {
  const { bodyJSON } = await import("../src/lib/beta-http");
  const make = (origin: string) =>
    new Request("http://localhost:4300/api/intakes", {
      method: "POST",
      headers: {
        host: "127.0.0.1:4300",
        origin,
        "content-type": "application/json",
      },
      body: '{"ok":true}',
    });
  assert.deepEqual(await bodyJSON(make("http://127.0.0.1:4300")), { ok: true });
  await assert.rejects(bodyJSON(make("https://wrong.example")));
});

test("private-link referrer policy does not block same-origin fetches", async () => {
  const { bodyJSON } = await import("../src/lib/beta-http");
  const make = (site: string) =>
    new Request("https://www.yourgiftsmith.com/api/revisions", {
      method: "POST",
      headers: {
        origin: "null",
        "sec-fetch-site": site,
        "content-type": "application/json",
      },
      body: "{}",
    });
  assert.deepEqual(await bodyJSON(make("same-origin")), {});
  await assert.rejects(bodyJSON(make("cross-site")));
});
