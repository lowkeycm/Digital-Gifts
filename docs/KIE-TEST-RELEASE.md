# Free test release

Owner request: functional Your Song testing with Kie, no Stripe/paywall. Testers create a full song, listen, download, share a read-only gift link, request one new rendition, and leave feedback or an optional reaction-video link. This is the core song test; voice cloning and other proposed paid add-ons are not part of this release. No emails are sent or promised. Publication rights to reaction videos must be obtained separately.

## Exact infrastructure

- GitHub: lowkeycm/Digital-Gifts
- Vercel: digital-gifts, prj_naAJ6e1cVre7JrijE52Ox8tM60Jr, team_K0quIbtPFw7RIl9M7bG54yTE
- Domain: www.yourgiftsmith.com
- Supabase: Digital Enterprise / Digital Gifts, hyjmlkowbhftisynztui

## Credentials

Set in this Vercel project's Production and Preview environments, then redeploy:

- KIE_API_KEY: Kie API key with a small available credit balance.
- SUPABASE_SECRET_KEY: backend secret key from the exact Supabase project's API keys. Legacy SUPABASE_SERVICE_ROLE_KEY is accepted alternatively.
- TEST_STUDIO_PASSWORD: at least 16 characters, for owner-only /studio access.

No NEXT_PUBLIC_ prefix. Never paste values into chat or commit them. No provider call can run without Kie and private-storage credentials. Missing configuration leaves the intake readable but disables submission. The owner studio is disabled without its password.

## Flow

/create -> /song/[id]?key=owner-token. Free full songs, no orders or paid flags. /preview routes beta sessions to their full song. Legacy demo sessions remain identifiable and their checkout endpoint is disabled.

/gift/[id]?key=gift-token permits audio and download only. It does not expose the customer's story/email, feedback, revision controls, or owner token. Save the private URL because there is no email recovery in this test release. /studio lists recent sessions, jobs, notes/ratings and reaction links for the owner.

Kie V6 uses the documented Market createTask route with ai-music-api/generate, non-custom prompt and separate style. Original wording is preserved with a visible 2,400-character brief budget, leaving 600 characters under Kie's 3,000-character limit for revision instructions. A revision is a new rendition and can change melody; the original recordings remain. There is no LLM rewriting step.

Callbacks carry a per-job random secret and are saved durably before background processing. Only authenticated callbacks or server-side Kie status responses supply audio URLs. Browser polling falls back to Kie's task status endpoint; each sync takes a database lease to prevent concurrent imports. MP3s are copied to private Supabase Storage and delivered with one-hour signed URLs. Status retries never regenerate audio. Ambiguous submission timeouts stay uncertain rather than automatically spending twice; use Kie's dashboard and the studio task ID to investigate.

The browser stops automatic checks after 15 minutes and offers a manual check. If callbacks are exhausted, the tester reopening their song or the owner using Check provider status resumes reconciliation. There is no scheduled background sweep in this release. Check the studio during the test and resolve pending jobs before provider download links expire.

## Limits and isolation

New beta tables: song_beta_sessions, song_beta_jobs, song_beta_tracks, song_beta_feedback. RLS enabled, no anon/authenticated privileges. Backend-only SECURITY INVOKER reservation functions. Bucket song-beta-audio is private, MP3 only, 30 MB/file. Existing demo data and launch signup data are unchanged.

Rolling 24-hour limits: 50 new stories globally, 3 per normalized email, 10 per HMAC-hashed source IP; 100 total generation reservations globally. Each original/revision allows at most 3 attempts, and only explicit failed attempts can retry. Completed revisions cannot be requested again. Duplicate request IDs and atomic job reservations avoid double submission. These are cost ceilings and basic abuse limits, not identity verification.

Feedback permission only allows contact to discuss sharing. It does not authorize publication. URLs are displayed as links and never downloaded by the server.

## Provider sources checked 2026-09-29

- https://docs.kie.ai/suno-api/generate-music
- https://docs.kie.ai/suno-api/generate-music-callbacks
- https://docs.kie.ai/market/common/get-task-detail
- https://kie.ai/pricing
- https://supabase.com/docs/guides/storage/buckets/creating-buckets

## Verification

See docs/qa/beta-*.json and screenshots. Provider contract tests use mocked responses; full browser testing uses an explicitly simulated provider and local PostgreSQL. The production schema and access privileges are checked independently through Supabase. Live production verification passed on September 30: two original tracks and two revised tracks arrived through real Kie callbacks, were stored privately, and played in the browser. MP3 download returned a 5,452,085-byte audio/mpeg attachment from Supabase. The requested Pine Street to Maple Street revision appeared in both new tracks while the original tracks retained Pine Street. Feedback persisted. The synthetic release QA session and its rating must be excluded from customer/marketing reporting. Production credentials are configured; Preview remains setup-pending. See docs/qa/beta-live-checks.json for scope and limitations.
