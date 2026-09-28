# HANDOFF

Read both blocks below before starting work. Doctrine item 12 in `AGENTS.md` explains what to do with them: same operator, same platform, within 24 hours, pick up silently; anything else, read the Last Session block back and get acknowledgment before working.

Every session ends by updating this file, committing, and pushing. Not committed means the session did not happen.

## Last Session

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

**What works.** Digital Gifts now has a parent/product information architecture on the stacked feature branch. Your Song remains the first conversion product and the existing V1 data flow is unchanged.

**What is in progress.** Visual review of the Digital Gifts parent page and Your Song route hierarchy. Production remains unchanged.

**What is broken or unresolved.** Music is mocked; Stripe is not connected; email delivery is not connected; no authenticated admin exists; no npm lockfile is committed. Framed Song Gift is only a concept and must not be sold until fulfillment is proven.

**What could not be determined from here.** Rendered desktop/mobile fidelity and interaction behavior could not be inspected because this ChatGPT session has no browser runner that can authenticate into the protected Vercel preview.

**Open owner actions.** Review the protected preview. Continue official music-provider evaluation/access. Approve production only after the UI and product hierarchy are acceptable.

**Next concrete step.** Visually review `/` and `/your-song`, then fix any design/copy issues before considering merge.

## Platform capability notes

These are dated observations, not permanent truths. Retest any "cannot" older than its date before relying on it, and update when reality changes.

### ChatGPT connected tools, measured 2026-09-27

| Capability | Result |
| --- | --- |
| Vercel build gate | Final branch head `569042f` reached READY on Vercel |
| Screenshot protected preview | No usable authenticated browser runner exposed in this session |
| Reach Vercel deploy status | Yes; protected preview/share links available |
| Database | Existing Digital Gifts Supabase remains available; not modified this session |
| GitHub branching/PR | Yes |
| Production | unchanged |

## Recovery checkpoints

- Base product branch: `clay/v1-app-foundation`, PR #4.
- Parent-site branch: `clay/digital-gifts-parent-site`.
- Parent route: `/`.
- Your Song route: `/your-song`.
- Existing funnel routes: `/create`, `/preview/[id]`, `/song/[id]`.
- Production: unchanged from `main`.
