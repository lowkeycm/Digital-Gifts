# HANDOFF

Read both blocks below before starting work. Doctrine item 12 in `AGENTS.md` explains what to do with them: same operator, same platform, within 24 hours, pick up silently; anything else, read the Last Session block back and get acknowledgment before working.

Every session ends by updating this file, committing, and pushing. Not committed means the session did not happen.

## Last Session

- **When:** 2026-09-28
- **Who:** Clay
- **Platform:** ChatGPT Work Mode, local checkout plus connected GitHub/Vercel and rendered browser tools.
- **Request:** Recover the stuck website redesign, apply Marketing-Hub guidance and proper research, integrate imagery and the selected parent name The Gift Smith.
- **Branch:** `clay/gift-smith-redesign`, stacked on `clay/digital-gifts-parent-site`.
- **Changed:** Photo-led Gift Smith homepage; distinct Your Song product page; shared navigation/wordmark/footer; working mobile menu, story-example selector and three-image framed concept gallery; numbered native FAQs; coordinated intake/private-flow styling and accessible labels; honest demo copy; retry handling for revision network errors. Added four optimized WebP images and pinned self-hosted fonts. Committed a package lock.
- **Research:** Used canonical Marketing-Hub website-system and direct-response calibration. Inspected Wonderbly, Songfinch, Flower Dose, Superpower and a live 21st accordion; separated static-gallery evidence from observed interaction. Decisions and exact URLs are in `docs/website-brief.md`.
- **Verification:** Local lint/type and production build pass. Chromium rendered 1440x900 and 390x844 screenshots; 320px and 768px overflow checks also pass. Gallery, story selectors, menu, FAQ, intake validation/back-retention and failed-submit retry passed with no browser runtime errors. See `docs/qa/`.
- **Deploy status:** Preview publication and deployed-flow verification in progress; update this block after checks.
- **Database:** No schema changes. Existing target remains Digital Enterprise / Digital Gifts (`hyjmlkowbhftisynztui`).
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

The requested visual redesign is implemented and locally verified. The Gift Smith is the consumer parent name; Your Song is the first product. Repository, Vercel and Supabase identifiers remain Digital Gifts.

Music generation, payments and email are still unconnected. Framed Song Gift remains a concept and cannot be ordered. These are existing product limitations, not visual-redesign omissions.

## Platform capability notes (2026-09-28)

- Local install, lint, TypeScript and production build work. A lockfile is now present.
- Browser QA works using Chromium against the production build in the same execution session. Separate execution sessions have isolated loopback networking. Cloud browser works for reference research and Vercel previews.
- Normal Git push lacks credentials in this checkout. Connected GitHub Git Data operations support text and binary commits, branches and PRs.
- Vercel project verified: `prj_naAJ6e1cVre7JrijE52Ox8tM60Jr`, team `team_K0quIbtPFw7RIl9M7bG54yTE` / Pride Family Realty. Protected preview links can be issued through the Vercel connector.

## Recovery checkpoints

- Base product branch: `clay/v1-app-foundation`, PR #4, unmerged to main.
- Parent branch: `clay/digital-gifts-parent-site`, PR #5, stacked on foundation.
- Redesign: `clay/gift-smith-redesign`, stacked on parent.
- Parent route `/`; product `/your-song`; funnel `/create`, `/preview/[id]`, `/song/[id]`.
- Research: `docs/website-brief.md`; assets: `brand/assets.md`; screenshot evidence: `docs/qa/`.
