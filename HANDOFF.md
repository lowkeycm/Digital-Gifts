# HANDOFF

Read both blocks below before starting work. Doctrine item 12 in `AGENTS.md` explains what to do with them: same operator, same platform, within 24 hours, pick up silently; anything else, read the Last Session block back and get acknowledgment before working.

Every session ends by updating this file, committing, and pushing. Not committed means the session did not happen.

## Last Session (hero price line removed)

- **When / who:** October 3, 2026 / Clay / ChatGPT Work Mode.
- **Request:** Remove the $29/full song/three revisions line below the Your Song hero CTA. Existing merge/publication authorization persists.
- **Branch:** clay/remove-hero-price from d4c4cd1a6cb38fac825ddfaeb65c10e48feccf03.
- **Changed:** Removed only the hero helper span; pricing and revision allowance elsewhere remain. Shared logo, photography, CTA and payment settings preserved.
- **Verification:** npm check/build pass. Actual production-build Chromium at 1440/390 confirms absence in hero, retained offer price, CTA navigation to intake, no overflow or runtime errors; screenshots visually inspected. Evidence docs/qa/hero-price-*. Website brief scoped maintenance review and Hub completion gate recorded.
- **Guidance:** Marketing-Hub website-system and all six references plus editorial anchors reloaded; established design and inspected research retained. Shared context manually resolved because local Hub helper is unavailable.
- **Release target:** digital-gifts prj_naAJ6e1cVre7JrijE52Ox8tM60Jr / Pride Family Realty team_K0quIbtPFw7RIl9M7bG54yTE / www.yourgiftsmith.com. Checked PR merge and actual live verification follow; final release result recorded in PR. No provider calls, real customer records or Stripe settings touched.

## Prior Session (supplied Your Song logo)

- **When / who:** October 3, 2026 / Clay / ChatGPT Work Mode.
- **Request:** Use supplied heart-shaped record logo on Your Song pages. Existing merge/publication authorization continues.
- **Branch:** clay/your-song-logo from 27861f47c8040acda828a45d49a8ade37f7e69f8. Prior Stripe documentation PR32 merged; production dpl_EyRSTPLsnFENyqTbpRnqWgzUtENQ READY, health HTTP200/checkout free.
- **Changed:** Background removed with image generation, then optimized to transparent lossless 1024x333 WebP. Shared YourSongBrand now uses supplied navy/gold heart record, wordmark and tagline. Product footer includes logo plus parent attribution. Responsive header widths and cream plaque on occasion pages preserve CTA/menu and dark-background contrast. Parent Gift Smith logo and gift favicon remain unchanged.
- **Verification:** Lint/type/build pass. Actual production-build Chromium at 1440/390 verifies product, intake, owner song, sender preview, recipient, footer and all six occasion headers; 320/768 no overflow. Logo navigation, CTA, mobile menu, playback, selection, recipient-only sharing, clipboard/native share fallback and credential boundaries pass; no runtime errors. Synthetic REST/storage fixture only, no provider calls or production records. Evidence docs/qa/your-song-logo-*.jpg and checks JSON, visually inspected.
- **Guidance:** Marketing-Hub 05fe2d3421819644678754eea9dd4ebfe442d3a3 website-system references and editorial anchors loaded anew through GitHub; established design/research retained for logo maintenance. Existing brief/baseline preserved; completion gate recorded before push.
- **Release target:** digital-gifts prj_naAJ6e1cVre7JrijE52Ox8tM60Jr / Pride Family Realty team_K0quIbtPFw7RIl9M7bG54yTE / www.yourgiftsmith.com. Prepared for checked PR merge and live visual verification; final result in PR.
- **Remaining payment work:** Stripe app tools are now available in subsequent session registry; recheck capabilities when resuming Payments. Website credentials/webhook and real sandbox acceptance remain separate. No payment settings changed in this logo task.

## Prior Session (Stripe app connection and integration review)

- **When / who:** October 3 UTC, 2026 / Clay / ChatGPT Work Mode.
- **Request:** Install Stripe app, invoke implementation planner, then build or review Payments and Invoicing for yourgiftsmith.com; use official docs skill only if planner remains unavailable. Owner reported connected.
- **App and fallback:** Plugin installation confirmed. No Stripe/planner tools exposed in registry after connection; account identity and credentials remain unverified. Ran requested npx official docs fallback, installed and validated stripe-best-practices, committed and pushed its personal skill checkout. No planner invocation claimed.
- **Branch / deliverable:** clay/stripe-integration-review, based on ddc01642d8aa8c1a2e206170a6a61d3543b5f04c. docs/STRIPE-INTEGRATION-PLAN.md contains tailored plan, source-backed findings, Invoicing distinction and exact secure sandbox setup. STRIPE-SETUP.md now distinguishes app connection from server acceptance and recommends restricted keys.
- **Review:** Existing Stripe 23.0.0 uses API 2026-09-30.endive. Core amount/signature/order/privacy/replay checks pass. Before paid launch, move long provider work out of webhook into durable recoverable execution, add account receipts and owner-link email/recovery, define refund/dispute handling. Broader payment methods require async failure handling. Checkout tracking label recommended. Optional paid invoices cost extra; standalone invoices do not trigger song fulfillment today.
- **Verification / boundaries:** Nine Stripe server checks rerun successfully with real SDK signatures and controlled transport. No hosted sandbox acceptance, actual charge, invoice, database mutation, secrets change or runtime/UI change. Public CHECKOUT_MODE remains free by existing choice. Existing merge/publication authorization persists for documentation.
- **Next:** Owner supplies website sandbox key and signing secret securely through exact Vercel digital-gifts sensitive variables, redeploy and run actual hosted acceptance. Do not ask for keys in chat or treat the app connection as completed website integration.

## Prior Session (three revisions and Stripe preparation)

- **When / who:** October 3 UTC, 2026 / Clay / ChatGPT Work Mode.
- **Request / choice:** Three included revisions and set up Stripe. Owner selected test first, preserving public no-paywall generation until explicit paid launch. Existing merge/publication authorization persists.
- **Branch:** clay/three-revisions-stripe, based on main 04c447622f68bc09b12c34f6310e46d6d8c4ccff.
- **Changed:** Three atomic revision rounds with UUID replay protection, separate retry budgets, cumulative original correction notes and persistent musical direction. All tracks retained. Public offer says $29 and three revisions; private studio shows remaining/pending/retry/exhausted states. Server-only Stripe 23 hosted checkout with exact server-owned $29 USD, isolated test/live keys, signed raw-body webhooks, saved paid confirmation before music, return/poll reconciliation and replay-safe reservations. Owner-only sandbox intake; public payments default off.
- **Database:** Confirmed Digital Enterprise / Digital Gifts hyjmlkowbhftisynztui. Applied supabase/migrations/20261003024938_three_revisions_stripe.sql, additive checkout state/order table and revision rounds. Five pre-existing sessions remain free/not_required. Real transaction tests passed and rolled back; new table/RPCs service-only with RLS. Existing legacy demo advisories unchanged, new RLS-without-policy informational warning is intentional for backend-only orders.
- **Verification:** Lint/type/build; 17 source-module music checks; nine Stripe SDK/server tests (real signature generation/validation against controlled transport, no real charge); real database constraints and replay; production-build desktop/mobile browser checks including three actual API revision submissions, original preservation, pending/failed/exhausted, saved checkout error, owner-only sandbox, no overflow/runtime errors. QA images/json under docs/qa/stripe-*. Marketing-Hub scoped review and completion gate recorded in website brief.
- **Stripe account:** Clay asked about a subaccount. Official Stripe multiple-account guidance supports a dedicated ordinary The Gift Smith account under the same login, legal entity RelevAInt, LLC, tax ID and optionally bank. No Stripe Connect setup needed. Domain is yourgiftsmith.com. Account is not created/connected; owner onboarding/agreements required. Sign-in reached authenticator then expired back to login. No credentials, webhook or settings changed. Vercel Stripe variables absent; no real hosted checkout acceptance yet. See docs/STRIPE-SETUP.md for exact safe setup.
- **Release:** PR #30 merged with two passing checks at e5a09154bc1c50c630b6905f306929fdcc66d806; feature branch deleted. Production dpl_5x6gRG583MoVsd1Zowi7BgJyLZAN READY on www.yourgiftsmith.com, exact digital-gifts prj_naAJ6e1cVre7JrijE52Ox8tM60Jr / Pride Family Realty team_K0quIbtPFw7RIl9M7bG54yTE. Live product confirms $29/three revisions in hero, process and offer. Product CTA reaches enabled intake. Live health HTTP200, ok=true, musicProvider=kie, checkout=free, mode=customer. No production generation or real charge made for this smoke check. Follow-up release record also changes the story-budget sentence to refer to revisions; final result in PR.
- **Remaining:** Dedicated Stripe sandbox credentials and webhook, then real sandbox success/cancel/decline/replay acceptance. Keep CHECKOUT_MODE=free until owner explicitly launches payments. Email delivery, tax/legal launch policy and real paid acceptance remain separate launch work. Never request keys in chat.

## Prior Session (custom music direction)

- **When / who:** October 2 evening New York / October 3 UTC, 2026 / Clay / ChatGPT Work Mode.
- **Request:** Optional plain-language sound, mood, energy, vocals, instruments, inspiration and exclusions; backend LLM converts these into Suno direction while preserving the personal story. Existing merge/publication authorization continues.
- **Branch:** clay/custom-song-direction from 5d2d904f8ecc321cd1bfec43b7d31c9d2b92eb46.
- **Changed:** Optional collapsed controls in first intake step and Duet choice. Server-only Kie Gemini 3.8 Flash translation using existing KIE_API_KEY, validated structured output; separate V6 non-custom style/negative_tags, raw memories unchanged. Job-level direction fingerprint/model/version/usage saved before music call, replay claim prevents duplicate spend, matching retries/factual revisions reuse direction. Musical revisions translate explicit sound notes. Preparation failure is safely retryable before any music submission; ambiguous music timeouts stay uncertain. Owner dashboard can inspect saved direction. Consent notice/version now covers story plus musical preferences.
- **Database:** Additive nullable song_beta_jobs.music_direction JSONB applied to Digital Gifts hyjmlkowbhftisynztui and verified; old songs compatible, RLS/grants untouched. Existing advisory set unchanged. Migration source supabase/migrations/20261003011523_custom_music_direction.sql. No credentials copied.
- **Validation:** npm run check/build pass. node scripts/verify-music-direction.mjs --record covers provider payload, bounds/envelopes, no personal details in LLM input, raw spacing, cache, concurrent replay, revision categories and failures/retries. Production-build Chromium desktop/mobile with REST/storage fixture covers custom/empty paths, optional keyboard controls/back-forward, owner view and existing gift sharing/playback; no overflow or runtime errors. Screenshots inspected under docs/qa/custom-sound-*. Marketing-Hub complete gate passed with baseline intact.
- **Guidance:** Marketing-Hub 05fe2d3421819644678754eea9dd4ebfe442d3a3 website references/editorial anchors, Supabase, AI persistence and React review applied. Live Kie/Suno docs researched; Musicful link treated as directional. Exact tempo/timing/voice replication not promised.
- **Release:** Exact target digital-gifts prj_naAJ6e1cVre7JrijE52Ox8tM60Jr / Pride Family Realty team_K0quIbtPFw7RIl9M7bG54yTE / www.yourgiftsmith.com. Prepared for checked merge and live provider acceptance; final release record in PR.
- **Boundaries:** No paywall, voice cloning, external messaging or story rewriting. Blank optional fields skip LLM. Personal memories go only to existing songwriting service. Source output/usage are private; recipient sees selected song only.

## Prior Session (customer-ready presentation)

- **When / who:** October 2 evening New York, 2026 / Clay / ChatGPT Work Mode.
- **Request:** Remove all free-test, first-song-free and launch/signup promotion; present the normal customer offer and journey with no payment step yet. Existing publication authorization continues.
- **Branch:** clay/customer-ready-song-flow from 4fdd1e978c9e52a7a4abd7d53606d82bcf5d7749.
- **Changed:** Removed parent/product announcement bars, both launch signup sections, mobile Launch updates link and framed-product teaser. Restored established $29/full song/one revision presentation. Practical download/revision/sharing FAQ; neutral intake CTA and customer errors; preserved Kie AI/permission notice with song-creation-2026-10-02 consent version. Feedback no longer reads like a test invitation. Legacy demos remain truthfully labeled; owner admin/internal beta names unchanged. Launch subscriber data/API retained, no expanded marketing consent.
- **Validation:** Lint/type/build pass. Production-build Chromium 1440/390 render and four-step intake through actual API/local synthetic database pass without checkout. Raw customer wording and new notice version verified. Selected song -> private preview -> recipient, playback, alternate preservation, invalid-key boundaries, clipboard fallback/native-share payload/cancel, mobile navigation and 320/768 overflow pass; no browser errors. Evidence docs/qa/customer-ready-*. No provider credits or production records created.
- **Guidance:** Marketing-Hub 05fe2d3421819644678754eea9dd4ebfe442d3a3 website-system references and editorial anchors applied. Established art direction/research reused for copy maintenance. Shared profiles resolved manually, no invented new brand strategy. React/Next review preserves boundaries/hooks/accessibility.
- **Release:** Target confirmed digital-gifts prj_naAJ6e1cVre7JrijE52Ox8tM60Jr / Pride Family Realty team_K0quIbtPFw7RIl9M7bG54yTE / www.yourgiftsmith.com. Prepared for checked PR merge and live verification; final release record in PR. Previous PR27 merged at 4fdd1e9 with production READY.
- **Boundaries:** Payments remain disabled. API generation/revision/upload limits, private-link recovery and sharing behavior unchanged. Email sending and paid checkout still require separate launch work. No environment/schema changes.

## Prior Session (Black family homepage image)

- **When / who:** 2026-10-02 evening New York / Clay / ChatGPT Work Mode.
- **Request:** Show Black people in the homepage image.
- **Branch:** clay/black-family-home-hero from 34f69556e2198de184d6212b785bb15b12d23514. Existing merge/publication authorization continues.
- **Changed:** Generated edit of the illustrative mother/daughter scene, now featuring a Black mother and daughter. Preserves warm lighting, emotional interaction, personal note, setting and composition. New 161,938-byte WebP and alt text, homepage only. Your Song image and all copy preserved.
- **Validation:** Lint/type/build pass. Production-build browser desktop/mobile image loading, crop and no overflow/runtime errors verified, product navigation works and Your Song hero preserved. Screenshots visually inspected in docs/qa/gift-smith-black-family-*. Restricted runtime blocked child processes with EPERM; build and browser passed with normal subprocess permissions. Chromium recovered through packaged extractor.
- **Release:** Verified exact digital-gifts project prj_naAJ6e1cVre7JrijE52Ox8tM60Jr / team_K0quIbtPFw7RIl9M7bG54yTE / www.yourgiftsmith.com. Prepared for checked PR merge/live acceptance; final release record in PR.

## Prior Session (parent brand positioning)

- **When / who:** 2026-10-02 UTC / October 1 evening New York / Clay / ChatGPT Work Mode.
- **Request:** Make the homepage explain The Gift Smith as the personal-gift parent brand, then introduce Your Song as its first product.
- **Branch:** clay/parent-brand-positioning from d1205654813e63fb12e7b4927443db6e4a9ff304. Continuing existing merge/publication approval.
- **Changed:** Brand-led hero, Meet our first gift anchor, parent navigation/footer, explicit Our first gift / Your Song by The Gift Smith product introduction, product-attributed sample eyebrow and revised brand-story/closing links. Product funnel header, intake, audio, sharing and consent remain unchanged. No invented available catalog.
- **Validation:** Lint/type/build pass. Actual production-build Chromium desktop/mobile screenshots inspected; anchor navigation, mobile menu close, full-song playback, product navigation, unchanged product header/image/sample copy, no overflow/page errors verified at 1440/390. Evidence docs/qa/gift-smith-positioning-*. Hub complete evidence gate passes; scoped visual/conversion/technical review in website brief. React review: primitive copy prop only, no new effects, fetching or dependencies.
- **Release:** Target verified digital-gifts prj_naAJ6e1cVre7JrijE52Ox8tM60Jr / Pride Family Realty team_K0quIbtPFw7RIl9M7bG54yTE / www.yourgiftsmith.com. Prepared for checked PR merge and live acceptance; final release record in this change's PR. Previous hero change PR25 is merged at d120565, production dpl_8izWBF8NEh3e2BCTuDtSZtr89NFb READY and visually verified.

## Prior Session (distinct parent hero)

- **When / who:** 2026-10-02 / Clay / ChatGPT Work Mode, same-day continuation.
- **Request:** Give The Gift Smith a different hero image from Your Song, with the same feeling.
- **Branch:** clay/distinct-gift-smith-hero from cd43f50e7effc5d71b7ac605f65e7aeee007f798. Existing merge/publication authorization continues.
- **Changed:** New generated mother/daughter personal-note scene on homepage only, optimized 157,620-byte WebP with descriptive alt. Desktop crop preserves both faces; mobile retains its existing crop. Your Song keeps first-listen.webp. No backend, provider, payment, secrets or data changes.
- **Validation:** Lint/type/build pass. Production-build Chromium at 1440x900 and 390x844: image decodes, no overflow/runtime errors, Discover Your Song link works and product hero stays unchanged. Desktop and mobile screenshots visually inspected in docs/qa/gift-smith-hero-*. Hub completion evidence command passes; scoped rendered review in website brief. No new full-site research claim.
- **Release target:** Verified digital-gifts prj_naAJ6e1cVre7JrijE52Ox8tM60Jr, Pride Family Realty team_K0quIbtPFw7RIl9M7bG54yTE, www.yourgiftsmith.com. This commit is prepared for automatic preview, green-check merge and production verification; final release result is in its GitHub PR.

## Prior Session

- **When / who:** 2026-10-02 UTC (October 1 evening, New York) / Clay / ChatGPT Work Mode.
- **Request:** Your Song must lead its product funnel while The Gift Smith remains the multi-product storefront; sender preview needs a clear action to share the correct recipient link.
- **Branch:** clay/your-song-brand-sharing from main eff16506d3269419d90fe917f874c15af91adb01. Existing publishing authorization continues for requested site updates.
- **Changed:** Shared Your Song wordmark in product header, intake, owner pages and gift player; product sample-cover labels and private-page titles updated. Quiet parent footer links home. Added owner-authenticated /song/[id]/preview with actual selected gift, back-to-editor link and Send your gift toolbar. Studio Preview & send opens this route. Shared native-share/copy/selectable-link/email-draft controls only use the recipient URL. No automatic sending or delivery claim. Recipient page has no editing/share toolbar. All versions remain available to the owner.
- **Validation:** Lint, TypeScript, production build and actual production-build Chromium desktop/mobile pass. Checks cover studio selection -> preview -> recipient, one chosen player, full photo containment, play/pause, native-share payload/cancel via controlled browser stubs, clipboard failure fallback and email draft recipient URL. Recipient/invalid tokens receive 404 on owner preview; missing selection returns to editor; unselected recipient audio is denied. No owner key in recipient page. No overflow at 320/768. Evidence docs/qa/your-song-{brand,preview,recipient}-*.jpg and your-song-sharing-checks.json. Local Supabase REST/storage fixture and supplied example audio, no paid generation calls. Native OS delivery is not asserted.
- **Guidance:** Marketing-Hub 05fe2d3421819644678754eea9dd4ebfe442d3a3 website-system and references loaded via GitHub; shared profiles resolved manually. Scoped maintenance/utility change reuses established research and visual design, with three-gate rendered review. No full-site redesign or new-gallery-research claim. Next local docs and React review applied.
- **Release:** PR 23 merged at acc5cac8571118115ddfe0d69ca93855b2fa2f8a after green Vercel check. Production dpl_9Pbe5UeggvhnsPgVtNhjSMKmSr9x READY on www.yourgiftsmith.com. Live product header/sample labels/footer and existing synthetic owner -> preview -> recipient verified. Preview shows selected revision and uploaded photo; Copy gift link exposes the correct recipient URL and confirmation; recipient opens one song without editing toolbar. Feature branch deleted. Follow-up records acceptance and clarifies two short studio/photo labels. No schema, provider, environment, payment changes or new generation calls. Exact Vercel target digital-gifts prj_naAJ6e1cVre7JrijE52Ox8tM60Jr / team_K0quIbtPFw7RIl9M7bG54yTE unchanged.
- **Runtime notes:** Scratch was pruned; repository recovered from GitHub. Local Next start needs explicit -H 127.0.0.1 because networkInterfaces is unavailable. Browser QA uses packaged Chromium; fixture is not production data. Preview environment may lack beta credentials; real private flow acceptance belongs on authorized production test session.

## Prior Session (tonearm and full photo)

- **When / who:** 2026-09-30 / Clay / ChatGPT Work Mode, same-day continuation.
- **Request:** Fix the detached-looking needle and arm disappearing beneath the spinning record. Follow-up: show the whole uploaded photo instead of covering it with the player.
- **Branch:** clay/fix-turntable-tonearm from main e6dde00a4512d454fb8d30ebe0a18d03fdc5e378. Continuing existing publication authorization.
- **Changed:** Replaced disconnected CSS arm/cartridge with a connected SVG assembly, counterweight, bearing, headshell, finger lift and stylus. Arm rotates around the bearing at translateZ(32px), above the 12px platter. It swings into the grooves on playback and returns outside them on pause/end. Existing native audio and reduced-motion behavior retained. Uploaded photo now sits in a separate paper frame beside the player on desktop and above it on mobile, uses contain instead of cover, and opens full size. No-photo sleeve artwork remains.
- **Validation:** Lint/type/build pass. Actual production-build Chromium checks at 1440x900 and 390x844 locate the stylus and hit-test its rendered layer: above vinyl while playing, off vinyl at rest. Play/pause, native audio, ended event and reduced motion pass. Full photo loaded, contain fit and zero player overlap verified on both layouts; no overflow at 320/768. Screenshots visually inspected in docs/qa/tonearm-*. Local audio/database fixture, no paid generation call. No backend/schema changes.
- **Release:** PR 21 merged at 28d7a90d7ced1ab0651df3af03ebb36ada87b7c2 after the Vercel check passed. Production dpl_3DJ9LtW2rzzTdrmGZrRaoEbbDvxy is READY and aliased to www.yourgiftsmith.com. Live recipient playback confirmed the connected arm above vinyl, full photo loaded with contain sizing in its own frame, and pause returning the arm beside the record. Evidence: docs/qa/tonearm-live.jpg. Merged feature branch deleted. Target verified digital-gifts prj_naAJ6e1cVre7JrijE52Ox8tM60Jr, Pride Family Realty team_K0quIbtPFw7RIl9M7bG54yTE. Documentation-only release record follows on clay/record-tonearm-release.

## Prior Session (personal gift release)

- **When / who:** 2026-09-30 / Clay / ChatGPT Work Mode.
- **Request:** Reaction files rather than links; explicitly chosen gift song with private alternate versions; a 3D spinning-record gift page, occasion backgrounds, optional uploaded image.
- **Branch:** clay/personal-gift-player, based on main 40c0b16577fdd6cfbefa3aea0acb1448bcd6220d. Continuing existing publication authorization.
- **Changed:** Selected version is enforced server-side for gift page/audio. Owner retains every version. Six occasion treatments, CSS dimensional turntable, optional photo sleeve, native MP3 player/download, reduced-motion fallback. Private signed resumable file uploads with progress, retries, consent, MIME/size/signature checks. Owner studio can review/download reaction video. No Kie or paywall changes.
- **Infrastructure:** Verified Digital Enterprise / Digital Gifts hyjmlkowbhftisynztui; additive personalized_gift_media migration applied. Media table RLS/backend-only grants and two private buckets verified. Vercel target remains digital-gifts prj_naAJ6e1cVre7JrijE52Ox8tM60Jr, team_K0quIbtPFw7RIl9M7bG54yTE, www.yourgiftsmith.com.
- **Validation:** Lint/type/build pass. PostgreSQL constraints, idempotency and upload limits pass. Actual production-build browser test passes file uploads, consent, owner/recipient/studio boundaries, song selection and preservation, playback rotation/pause, reduced motion and six themes. Desktop/mobile screenshots inspected, widths 320/390/768/1440 checked. Local provider/storage fixtures are explicit; no new generation credits used. Marketing-Hub 9fe5b4cdef6bf66b3c455d257e8fec4eb9676d04 applied with existing inspected project references; scoped contract and evidence in docs/website-brief.md. Plan baseline was recorded after initial code and before rendered QA, not before implementation.
- **Release:** PR 16 merged core gift/media UI. PRs 17/18 added sanitized diagnostics; PR 19 fixes signed upload routing at d7e8efec549d6aa8006bdd6c659f361effc84606. Production dpl_D2TrUgVRosChULUMuzZhY94WrhWo is READY on www.yourgiftsmith.com. Live photo (139,012 bytes) and multi-chunk video (7,340,032 bytes) uploaded, verified, and persisted as ready. Photo visible on recipient page; 2-second synthetic video decodes without error. Selected revision plays (223.32 seconds) and pauses; only one gift player, all four owner versions retained. Database readback confirms selection, sizes, status and private-review consent version. See docs/qa/gift-live-checks.json and gift-live-recipient.jpg.
- **Upload root cause / regression:** Signed Tus uses /storage/v1/upload/resumable/sign, not the ordinary session-authenticated endpoint, plus a public apikey header. Ordinary endpoint returned 400 Invalid Compact JWS. Supabase's primary signed-Uppy example documents this distinction. Local fixture now requires correct endpoint and both headers. Public-key accessor only returns sb_publishable_ values; server keys never leave backend. This correction passed lint/type/build and the complete browser regression before live acceptance.
- **Boundaries:** 8 MiB photos, 50 MiB reaction videos, six reservations per kind/song. Reactions private by default; permission to publish remains separate. No email delivery; sharing uses recipient link. Old gifts need an explicit selection. Automated upload cleanup is not implemented. Existing test session remains synthetic and excluded from customer/marketing reporting.

## Prior Session (Kie free test)

- **When / who:** 2026-09-30 UTC / September 29 evening New York / Clay / ChatGPT Work Mode.
- **Request:** Connect Kie for real test users, full operation without Stripe/paywall; collect feedback/reaction videos. Existing publication authorization continues. Optional voice-cloning add-on is not in this core song test.
- **Branch:** clay/kie-test-funnel, based on main 54430e459286502293f58bb405f29dae9518c653.
- **Changed:** Kie V6 adapter, atomic free-test session/job reservation, completion callbacks with per-job secret, status polling fallback, private durable MP3 storage, full playback/download, one new-rendition revision preserving original, separate read-only recipient token, optional feedback/video link, password-protected owner studio. Restored Start your song navigation and product CTAs. No payment collection or paid/demo order mutation. Raw customer wording preserved with visible provider prompt budget.
- **Infrastructure:** Verified Vercel digital-gifts prj_naAJ6e1cVre7JrijE52Ox8tM60Jr in team_K0quIbtPFw7RIl9M7bG54yTE, Supabase Digital Enterprise / Digital Gifts hyjmlkowbhftisynztui. Additive kie_test_funnel migration applied; 4 new beta tables RLS/private, service-role-only invoker RPCs and private song-beta-audio bucket verified. Existing legacy demo and launch-interest data unchanged. Advisor findings on new tables are expected no-policy information because backend-only access; existing legacy anonymous RPC warnings remain.
- **Credential handoff:** Production now has working Kie/private-storage credentials and the studio password form is configured. Secret values were never read, printed or committed. Preview remains setup-pending, so copy the same keys into Preview separately if preview generations are needed. Studio login was functionally verified with a local synthetic password; the real owner password is not known to the assistant.
- **Validation:** Type/lint/build, 6 provider/origin/signup contract tests, PostgreSQL reservation/security tests, and full rendered browser flow passed. Browser verified intake, playback/download, callback/storage, original-preserving revision, feedback, recipient isolation, owner login/readback and mobile layouts at 320/390/768/1440 with no runtime errors. Screens inspected. Browser provider/transport were explicit local fixtures; see docs/qa/beta-* for evidence. Live production Kie generation and revision both completed with authentic callbacks, yielding 2 originals and 2 revised songs. Playback and MP3 attachment download from private Supabase storage passed. Revised lyrics use Maple Street instead of Pine Street; originals retain Pine Street. Feedback saved and read back. Synthetic QA only, exclude its email/rating from customer feedback and marketing. Sources, limits, known recovery boundaries and setup are in docs/KIE-TEST-RELEASE.md.
- **Release:** PR #14 merged at 2771ae1b5979a5052a8a38446e472d3d7b3d7d5e. Production dpl_5JwwJK1a8Cxh2WWV1NbuHrnSqFSV READY on www.yourgiftsmith.com. Live health reports Kie/free-test/checkout disabled. Follow-up fixes launch signup under no-referrer, clarifies launch copy, and adds a direct gift-page link with safe clipboard fallback. See docs/qa/beta-live-checks.json.
- **Limitations:** No sending email, payments, voice cloning, or automatic reaction-publication consent. Private URL is the test delivery/recovery mechanism. Uncertain provider submissions are never automatically duplicated. Failed callbacks can be reconciled by reopening song or owner studio; no scheduled sweep. The real generation -> stored download -> revision acceptance gate passed. Recipient isolation was verified with the complete local PostgreSQL/browser fixture; cloud clipboard navigation prevented a separate live recipient-page browser check.

## Prior Session (favicon)

- **When / who:** 2026-09-28 after midnight New York / Clay / ChatGPT Work Mode
- **Request:** Use the gift part of the logo as the favicon.
- **Branch:** `clay/gift-favicon` from main `5bf5f2d`.
- **Changed:** Isolated transparent gift-and-music mark with no lettering. Added root App Router `favicon.ico` containing 16/32/48px PNG frames and `icon.png` at 192px. Next automatically advertises both throughout the site. Source logo unchanged.
- **QA:** Check/build pass; desktop/mobile pages render and both advertised icon URLs return 200. Inspected icon artwork and page renders. `docs/qa/favicon-*` records evidence.
- **Target / authorization:** Requested live-site refinement under existing publication authorization. Verified digital-gifts project `prj_naAJ6e1cVre7JrijE52Ox8tM60Jr` / team `team_K0quIbtPFw7RIl9M7bG54yTE`, www.yourgiftsmith.com. Publish through PR and verify deployed icon metadata/assets.
- **Previous release:** Thumbnail playback PR #12 merged at `5bf5f2d932460566181c17abbd0460f951dce0aa`; production `dpl_4psxKN2avcLB8wWEUgCryqmN9PLo` READY, actual thumbnail play/pause verified live. Branch deleted.
- **Remaining:** Music/Stripe/sending-email integration work remains unchanged.

## Prior Session (thumbnail playback)

- **When:** 2026-09-28, shortly after midnight New York
- **Who / platform:** Clay / ChatGPT Work Mode
- **Request:** Play directly from song thumbnails; continue the requested live-site refinement.
- **Branch:** `clay/thumbnail-playback` from main `765638c`.
- **Changed:** The entire cover toggles its full song with a visible 48px gold play/pause affordance. Clicking a side cover centers it immediately and starts playback inside the user gesture, avoiding a scroll-selection pause race and mobile autoplay restrictions. Native player and cover states stay synchronized. Dragging still browses without autoplay, and only one track plays.
- **Verified:** Check/build pass. Actual desktop 1440x900 and mobile 390x844 renders inspected, 320px overflow check passes. Center and side thumbnail play, second click pause, native pause synchronization, Enter/Space, drag without play, first click after drag, and mobile touch play/pause pass with no runtime errors. Evidence: `docs/qa/thumbnail-*`.
- **Target / authorization:** Continued website publication authorization; verified digital-gifts Vercel project `prj_naAJ6e1cVre7JrijE52Ox8tM60Jr`, team `team_K0quIbtPFw7RIl9M7bG54yTE`, www.yourgiftsmith.com. Publish after branch checks and verify live.
- **Previous release confirmed:** Carousel PR #11 merged at `765638c076e75ad8584fb41392511d4c88824b53`; production `dpl_G5TZSGya6MKMbmZEyqki6BjcSyyS` READY. All covers loaded, correct track switching and real full-song playback verified on live domain. Branch deleted.
- **Remaining:** Existing music/Stripe/sending-email integration work. No backend changes.

## Prior Session (album carousel)

- **When:** 2026-09-28 UTC / September 27 evening, New York
- **Who:** Clay
- **Platform:** ChatGPT Work Mode
- **Request:** Improve song selection with a physically scrollable 3D music-service-style album carousel. Song 1 Brother to Sister, Song 2 Son to Mother, Song 3 Husband to Wife.
- **Branch:** `clay/song-album-carousel`, from main `0bf90dc` after the logo release.
- **Changed:** Shared home/product song section now has three illustrated album covers in a navy listening room. Native horizontal scroll and touch swipe, mouse drag, previous/next buttons, card selection, keyboard Left/Right/Home/End. Covers rotate/recede with scroll and the center album comes forward. Reduced-motion removes 3D transformations. Native full-track player, track length and relationship remain visible; changing selection pauses the previous track. No autoplay or signup barrier. Same full MP3 files.
- **Mapping:** Ebony, I Love You = Brother to Sister; The Way I See You = Son to Mother; Traci, My Rock = Husband to Wife. Explicitly supplied by Clay, not inferred from names or lyrics. Cover art depicts fictional people and is labeled illustrative.
- **QA:** Lint/typecheck/build and Chromium desktop 1440x900/mobile 390x844; 320/390/768/1440 overflow and image loading. Touch swipe (emulated), mouse drag, keyboard, edge buttons, reduced motion, audio fallback, all three tracks decoded and sought past 45 seconds with only one playing. No runtime errors. See `docs/qa/carousel-room-*` and `carousel-checks.json`. Real physical-device touch performance is not measured.
- **Publication:** Continuing Clay's explicit website publication authorization and requested follow-up. Verified target digital-gifts, project `prj_naAJ6e1cVre7JrijE52Ox8tM60Jr`, team `team_K0quIbtPFw7RIl9M7bG54yTE`, www.yourgiftsmith.com. Merge this branch PR after preview checks; verify live after deployment.
- **Logo release:** PR #10 merged at `0bf90dc5a170db775c5f0ff59416e5ef1259f56c`, production `dpl_E2HWjXQ98W8ep4Yifo7j4cLPbmAi` READY. New logo loaded on the live domain in browser. Old branch deleted.
- **Remaining:** Music, paid checkout and sending-email integrations remain unchanged and incomplete. No database changes or new signup submissions in this visual update.

## Prior Session (supplied logo)

- **When:** 2026-09-28 UTC / September 27 evening, New York
- **Who:** Clay
- **Platform:** ChatGPT Work Mode
- **Request / authorization:** Remove the supplied logo background and “add it to the site,” continuing the explicit publish authorization. Apply this requested logo update to the live website.
- **Branch:** `clay/gift-smith-logo`, from main `8678a1f`.
- **Changed:** Transparent navy/gold supplied logo replaces the provisional wordmark in the shared header and footer, including the intake. Background removed with image editing; lossless transparent WebP is 117 KB, responsive Next image delivery. Original upload unchanged.
- **Verification:** Lint/typecheck and production build pass. Actual Chromium renders inspected at 1440x900 and 390x844. Home, Your Song and intake have loaded logos and no overflow at 320/390/768/1440. Mobile menu and logo home link work; no browser runtime errors. Evidence: `docs/qa/logo-*`.
- **Target:** Verified Vercel `digital-gifts`, project `prj_naAJ6e1cVre7JrijE52Ox8tM60Jr`, team `team_K0quIbtPFw7RIl9M7bG54yTE`; www.yourgiftsmith.com. Publish through the branch PR after its deployment checks pass; verify live asset after merge.
- **Remaining:** Existing music, payment and sending-email integration work. No backend, signup or audio behavior changed.

## Prior Session (launch signup and full songs)

- **When:** 2026-09-28 UTC / September 27 evening, New York
- **Who:** Clay
- **Platform:** ChatGPT Work Mode
- **Request:** Apply supplied website feedback: launch email capture, real sample songs, fewer availability disclaimers, smaller frame teaser, practical FAQs, AI disclosure and wordmark spacing.
- **Branch:** `clay/launch-signup-samples`, from current main.
- **Changed:** Both marketing pages now have three full songs and a working launch signup. Main launch CTAs point to the signup; story demo remains secondary and labeled. Framed concept gallery replaced by a single teaser. Full-length 128 kbps MP3 copies are public; original supplied files remain unchanged. No invented genre/customer attribution.
- **Database:** Confirmed Digital Enterprise / Digital Gifts `hyjmlkowbhftisynztui`; additive `song_launch_interest` migration version `20260928032152` applied. No existing song data changed. `song_launch_signups` is private/RLS-enabled, no anon/authenticated table privileges. Deliberate public write-only RPC validates consent, normalizes/deduplicates emails, caps new rows at 200/hour and returns no data. Source and launch-only consent version/time retained. Synthetic `gift-smith-launch-qa@example.com` and `gift-smith-live-qa@example.com` retained, must exclude example.com test entries from eventual sends. No emails sent.
- **Verification:** Lint/typecheck and production build pass. Local Chromium rendered 1440x900 and 390x844; no horizontal overflow at 320/390/768/1440 on either page. Full songs decoded with durations 4:05, 3:55, 4:30 and playback/seek beyond 30 seconds passed, other tracks pause. Signup persists through real Supabase; case-insensitive duplicate stays one row; invalid email, absent consent, foreign origin and oversized body rejected; honeypot does not insert. Simulated service failure keeps email and retry succeeds. Menu/FAQ pass, no browser runtime errors. Evidence in `docs/qa/launch-*`.
- **Security review:** Supabase advisor reports intentional anonymous SECURITY DEFINER signup RPC and no table policies because direct access is denied; existing song RPC warnings are unchanged. RPC only appends validated launch consent, cannot list/update/delete leads or expose membership. Honeypot/origin checks are basic spam defenses, not bot authentication; 200/hour is a global growth ceiling, not per-user throttling. Captcha/per-source controls needed if traffic abuse emerges. See `docs/LAUNCH-SIGNUP.md`.
- **Domain / Stripe context:** Clay reports yourgiftsmith.com DNS is Hostinger. HTTPS apex redirect to www verified in preceding turn. RelevAInt, LLC is the proposed operating entity; a dedicated Gift Smith Stripe account under that LLC was recommended, not created or connected. Do not silently change legal identity strings.
- **Publication authorization:** After the automatic review rejected the initial push, Clay asked for full songs instead of excerpts, then explicitly said “Yes publish what you need.” This approves publishing the three full songs as website assets in the public repository and publishing this requested update. The earlier blocker is resolved by this new authorization. No need to request it again.
- **Release:** PR #8 merged to main at `da7dd25b2ef4536ab0b3b2d851d4774b9e488f32`. Vercel production `dpl_4B9ywFqsNTtrLtR5vv8krNmo3JgD` READY with yourgiftsmith.com/www aliases. Preview and live browser signup succeeded, live readback confirmed `gift-smith-live-qa@example.com` with launch-only consent. Full song playback verified in deployed preview. Runtime error/fatal scan clean (smoke check only). Final documentation follow-up contains no app changes.
- **Remaining:** Connect sending email before launch announcement; music/payment automation remains mocked. Turnaround is explicitly unconfirmed. Public FAQs describe planned link/MP3 delivery, not completed integration.

## Prior Session (production merge)

- **When:** 2026-09-28 UTC / September 27 evening, New York
- **Who:** Clay
- **Platform:** ChatGPT Work Mode, GitHub/Vercel connectors and browser
- **Request:** “Merge everything”; Clay is securing Suno API access and wants the remaining path to a functional paid funnel and custom domain.
- **Authorization:** Explicit owner approval to merge the pending work into main and deploy it to production. This does not authorize provider purchases, ad spend or arbitrary future production changes.
- **Merged:** PR #5 into foundation, then PR #4 into main. PR #6 was already merged. Production code commit `bdc95db2100c6c5deb9f52c5a679333096388344`.
- **Verified:** Vercel production deployment `dpl_AbPFsq2TVMWs1bSKeKT7huXC3W1S` READY. Production home -> Your Song -> intake routing and validation checked in browser. `/api/health` returned HTTP 200, database OK, mock music and demo checkout. No error/fatal logs found for this deployment in the one-hour scan; that is a smoke check, not evidence under customer load. Full demo flow and desktop/mobile screenshots were verified in the preceding redesign session.
- **Production URL:** https://digital-gifts-vert.vercel.app
- **Launch status:** Website deployed; paid fulfillment not ready. No custom domain selected at that time. Current domain is www.yourgiftsmith.com (Hostinger DNS). No music/payment/email secrets changed. No database schema/data changes in this merge session.
- **Audit:** `docs/LAUNCH-READINESS.md` records the exact missing components, domain steps, owner inputs and acceptance gates. Notable blockers: placeholder Suno adapter, demo payment mutation, no async completion handling, placeholder audio, no email/admin; current checkout requests a second unrelated full generation instead of unlocking the previewed track.
- **Next:** Implement the paid funnel with a simulated provider while Clay secures exact API docs/access. Move privileged mutations behind backend authorization before enabling billable generation. Connect real provider and verify end to end before ads.

## Prior Session (2026-09-28 UTC, redesign)

- **When:** 2026-09-28
- **Who:** Clay
- **Platform:** ChatGPT Work Mode, local checkout plus connected GitHub/Vercel and rendered browser tools.
- **Request:** Recover the stuck website redesign, apply Marketing-Hub guidance and proper research, integrate imagery and the selected parent name The Gift Smith.
- **Branch:** `clay/gift-smith-redesign`, stacked on `clay/digital-gifts-parent-site`.
- **Changed:** Photo-led Gift Smith homepage; distinct Your Song product page; shared navigation/wordmark/footer; working mobile menu, story-example selector and three-image framed concept gallery; numbered native FAQs; coordinated intake/private-flow styling and accessible labels; honest demo copy; retry handling for revision network errors. Added four optimized WebP images and pinned self-hosted fonts. Committed a package lock.
- **Research:** Used canonical Marketing-Hub website-system and direct-response calibration. Inspected Wonderbly, Songfinch, Flower Dose, Superpower and a live 21st accordion; separated static-gallery evidence from observed interaction. Decisions and exact URLs are in `docs/website-brief.md`.
- **Verification:** Local lint/type and production build pass. Chromium rendered 1440x900 and 390x844 screenshots; 320px and 768px overflow checks also pass. Gallery, story selectors, menu, FAQ, intake validation/back-retention and failed-submit retry passed with no browser runtime errors. See `docs/qa/`.
- **Deploy status:** Redesign preview for code commit `c2ba9022` reached READY and was inspected in the cloud browser. The deployed intake -> private preview -> demo unlock -> gift page -> revision -> reload journey passed. A follow-up fix prevents premature validation when advancing to the final intake step; its local regression check passed. Work is delivered through PR #6 into the parent feature branch. Use its latest Vercel preview; production remains unchanged.
- **Database:** No schema changes. Existing target remains Digital Enterprise / Digital Gifts (`hyjmlkowbhftisynztui`). One clearly marked test intake for recipient `Gift Smith QA`, email `gift-smith-qa@example.com`, was created through the UI and retained, with demo order and revision. No real payment or email was sent.
- **Production:** Unchanged. Explicit Clay approval is still required before any merge that reaches `main`.

## Prior Session (2026-09-27, parent architecture)

- **When:** 2026-09-27
- **Who:** Clay
- **Platform:** ChatGPT with connected GitHub and Vercel tools, branch `clay/digital-gifts-parent-site` stacked on `clay/v1-app-foundation`
- **Request:** Make Digital Gifts the single-page parent brand/site and turn the existing Your Song landing page/funnel into the first product extension so the business can add additional gift services later.
- **Changed:** Replaced `/` with the Digital Gifts parent page; moved the existing song landing experience to `/your-song`; kept `/create`, private preview and delivery routes intact; connected Your Song navigation back to the parent brand; added a parent-level product shelf, personalization method, occasion routing and closing handoff into Your Song. Added Framed Song Gift as an explicitly in-development concept and reserved the rest of the product space without inventing live offers. Updated metadata, README, architecture, product decisions, website brief, roadmap and AGENTS project context.
- **Design direction:** Reused the warm paper/ink/rust premium-editorial language so Your Song feels like a product of Digital Gifts rather than a separate site. Parent hero uses a framed-memory concept, song card and gift tag. Wonderbly was used as current structural evidence for how a parent personalization brand can route into specific products/occasions; no live browser interaction behavior was claimed from that research.
- **Verification:** Vercel successfully built the final branch head `569042f` to READY after the parent-site and handoff changes. This platform still does not expose a usable browser/screenshot runner for the protected preview, so desktop/mobile visual QA remains incomplete.
- **Database:** No schema/data changes this session. Existing Digital Gifts Supabase target remains `hyjmlkowbhftisynztui`.
- **Production:** unchanged. Do not merge to `main` without Clay's explicit production approval.
- **Next:** Review the protected Digital Gifts preview. Confirm the parent-brand direction and mobile/desktop rendering. Then continue Your Song provider/payment integration or refine parent-site copy/visuals from review.

## Prior Session (2026-09-23, Your Song V1 foundation)

- **Request:** Build the first personalized-song V1 foundation with real Supabase persistence, mock music provider, guided intake, preview, $29 demo checkout boundary, private delivery page and one revision.
- **Changed:** Next.js/React app, Marketing-Hub-informed Your Song UI, raw-language-preserving intake, provider abstraction, private preview/delivery, demo checkout, one revision, health endpoint and V1 Supabase schema/RPC layer.
- **Verification:** Live Supabase transaction proved intake -> preview -> paid -> full -> revision -> readback and rolled back the test data. Migration `personalized_song_v1` is registered. Vercel preview reached READY.
- **Status:** `clay/v1-app-foundation` remains open in PR #4 and unmerged because `main` auto-deploys production.

## Where We Are

All application/design work is now merged to main and deployed. The requested visual redesign is implemented and verified locally and on Vercel. The Gift Smith is the consumer parent name; Your Song is the first product. Repository, Vercel and Supabase identifiers remain Digital Gifts.

Real Kie generation, revisions, MP3 storage, selected gift sharing and media uploads are connected and previously accepted live. Payments and delivery email remain unconnected. Framed Song Gift remains a concept and cannot be ordered. These are existing product limitations, not visual-redesign omissions.

## Platform capability notes (2026-09-28)

- Local install, lint, TypeScript and production build work. A lockfile is now present.
- Browser QA works using Chromium against the production build in the same execution session. Separate execution sessions have isolated loopback networking. Cloud browser works for reference research and Vercel previews.
- Normal Git push lacks credentials in this checkout. Connected GitHub Git Data operations support text and binary commits, branches and PRs.
- Vercel project verified: `prj_naAJ6e1cVre7JrijE52Ox8tM60Jr`, team `team_K0quIbtPFw7RIl9M7bG54yTE` / Pride Family Realty. Protected preview links can be issued through the Vercel connector.

## Recovery checkpoints

- Canonical application: `main`. PR #4 is merged.
- Parent-site PR #5 is merged.
- Redesign PR #6 is merged.
- Parent route `/`; product `/your-song`; funnel `/create`, `/preview/[id]`, `/song/[id]`.
- Research: `docs/website-brief.md`; assets: `brand/assets.md`; screenshot evidence: `docs/qa/`.
