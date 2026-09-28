# HANDOFF

Read both blocks below before starting work. Doctrine item 12 in `AGENTS.md` explains what to do with them: same operator, same platform, within 24 hours, pick up silently; anything else, read the Last Session block back and get acknowledgment before working.

Every session ends by updating this file, committing, and pushing. Not committed means the session did not happen.

## Last Session

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

Music generation, payments and email are still unconnected. Framed Song Gift remains a concept and cannot be ordered. These are existing product limitations, not visual-redesign omissions.

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
