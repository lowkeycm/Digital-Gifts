# AGENTS.md

This is the canonical instruction file for this repository. Every agent and every human working here reads it, on every platform.

Claude Code reads `CLAUDE.md`, which contains a single line pointing at this file. Codex reads `AGENTS.md` natively. Perplexity Computer and anything else should be pointed here directly. There is one set of rules, in one place, so a rule learned on one platform is not lost when the work moves to another.

Section 1 is universal doctrine and is shared verbatim across projects. Do not edit it here. Section 2 is specific to this repository.

---

## Section 1: Working Doctrine

Fifteen rules. Every agent, every platform, every operator. Nothing in `people/` or anywhere else relaxes them. Project facts live in Section 2; current state lives in `HANDOFF.md`; how to communicate with the operator lives in `people/`.

1. **Think with the end in mind.** Before changing anything, answer: what is this for, who uses it and in what moment, what must they walk away with. Hold the result to those answers, not to "it compiles" or "the ticket is closed."

2. **Verify before declaring done.** UI work: render the actual surface and look at it. Data work: validate against live data. Bug fixes: reproduce first, then prove the fix kills that exact reproduction. If your platform cannot do the needed verification, item 15 applies.

3. **Root cause over patches.** If two symptoms share one cause, name it and fix it once. Never ship a workaround dressed as a fix.

4. **No half-builds.** If the work is bigger than the session, stop and propose it as a scoped follow-up instead of leaving something that looks finished and is not.

5. **Do not reintroduce fixed bugs.** Read `HANDOFF.md` and recent history for the area before working in it.

6. **Git discipline.** Set identity at session start, before any commit: `lowkeycm` / `lowkeycm@users.noreply.github.com`. Never commit to `main`. Branch `clay/what-it-does`. Open a PR with a conventional-commit title, merge it yourself once checks pass, delete the branch. Do not ask the operator to merge.

7. **Verify deploys.** Confirm what actually shipped rather than assuming a green build shipped the right thing.

8. **Secrets stay out of chat, commits, and logs.** Read them only from the locations in the Section 2 secrets map. A value you cannot read is not a value that is missing.

9. **Data isolation between businesses.** One business's data never touches another's database, CRM, or webhooks. Where two products share one database, the same rule applies between the products: touch only the tables and functions this repo owns (Section 2 lists them).

10. **Copy standards.** In anything customer-facing (site and app copy, marketing email and SMS, social posts, ad copy, anything an assistant says to a customer): no em dashes, no emojis, plain language, no filler, no corporate hedging. Internal docs, commit messages, PR bodies, and code comments are exempt from the punctuation ban but keep the plain-language bar. Legal text is precision, not marketing: do not restyle it unprompted. Never address a person by a name inferred from an email address. For tone and depth when talking to the operator, follow their file in `people/` (Clay's bans em dashes in messages to him).

11. **Ask before large or ambiguous changes.** When scope grows past what was agreed or the answer needs a product decision, stop and check. Non-owners cannot approve scope changes (see the Operator section).

12. **Handoff hygiene.** At session start read `HANDOFF.md`. Same operator, same platform, within 24 hours: pick up silently. Anything else: read the Last Session block back and get acknowledgment before working. At session end update `HANDOFF.md`, commit, push. Not committed means the session did not happen.

13. **Durable learnings go in the repo, not platform memory.** Platform memory does not travel. Rules and corrections belong in this file, current state in `HANDOFF.md`, operator preferences in `people/`.

14. **Confirm the target before infrastructure operations.** Before any deploy, migration, or secrets change, state which project you are targeting and check it against Section 2. The deploy credential reaches every project on the account, across separate businesses.

15. **Capability honesty.** If you cannot perform a required verification from your platform, say so plainly and hand that part back. Never skip it silently, never substitute a weaker check and present it as the real one. Capability notes recorded in `HANDOFF.md` go stale: retest any "cannot" before relying on it, and update the note when reality has changed.

## Section 2 - Project specifics

### 2.1 Identity

| Field | Value |
| --- | --- |
| What it is | Consumer digital-gifts product, starting with guided personalized songs built from a customer's own memories and raw story details. V1 foundation is implemented on `clay/v1-app-foundation` with real Supabase persistence, mock music generation and demo checkout. |
| Business | UNVERIFIED. No legal entity or DBA is established in the repository. |
| Live URL | Production remains unchanged. A protected Vercel preview for `clay/v1-app-foundation` is READY; use the current branch alias/share link from Vercel for review. |
| Repo | github.com/lowkeycm/Digital-Gifts |
| Hosting | Vercel team `Pride Family Realty`, project `digital-gifts` (`prj_naAJ6e1cVre7JrijE52Ox8tM60Jr`). The team account is shared across other businesses; confirm this exact project before any hosting operation. |
| Database | Supabase organization **Digital Enterprise**, project **Digital Gifts**, project ref `hyjmlkowbhftisynztui`, region `us-west-2`. Verified ACTIVE_HEALTHY on 2026-09-23. Do not use another existing project as a substitute. |
| Other systems | Marketing-Hub is the canonical marketing methodology. Supabase is live. Music generation is intentionally mocked behind `MusicProvider`; checkout is a clearly labeled demo boundary. Stripe, official Suno and delivery email are not configured yet. |
| Owner | Clay. See `people/clay.md`. |

No compliance-sensitive identity strings are established yet. If they are added later, create one canonical source file and reference it rather than duplicating values.

### 2.2 Git identity and workflow

- Commits are authored as `lowkeycm` / `lowkeycm@users.noreply.github.com`. Set this during session bootstrap, before any work, not at commit time:
  ```
  git config user.name "lowkeycm"
  git config user.email "lowkeycm@users.noreply.github.com"
  ```
- **Never commit to `main`.** Every session opens its own branch.
- Branch naming: `clay/what-it-does`. Platform-generated names do not meet this. Rename before opening a PR.
- Open a pull request with a conventional-commit title. Merge it yourself once CI is green. Do not ask the owner to click merge. Delete the branch after merge.
- At session start, run `git branch -r --sort=-committerdate | head` and check whether another open branch is already touching the area you are about to work in.
- Pushes route through a proxy and occasionally fail with HTTP 407. Wait a few seconds and retry.

### 2.3 Operator

The operator is the person directing this session. It is not the commit account. That is always `lowkeycm` regardless of who is working, so it identifies nobody. Never infer the operator from git config, a commit email, or any address you find in the repo.

Profiles live in `people/`. Each begins with the person's name, role, and the account they work from.

**If `people/` contains exactly one profile, that person is the operator. Use it and do not ask.**

**If it contains more than one:**

1. Use the platform's authenticated account if you can see it, matched against the account listed in the profile header.
2. If the platform does not expose it, ask once, then continue.
3. If a person states who they are in the conversation, that overrides everything else.

Record the operator in the Last Session block of `HANDOFF.md`.

**Authority.** Clay is the owner and can approve product decisions, scope changes, and changes of direction. Other operators cannot. If a non-owner requests something that changes agreed scope, do it only if it clearly sits inside the existing plan. Otherwise say plainly that it needs Clay's sign off, and never treat silence as approval.

**Scope limit.** Profiles govern communication, context, and authority only. They never modify quality standards. Doctrine items 1 through 15 apply identically to every operator.

**Related.** `github.com/lowkeycm/clay-config` holds cross-project preferences and the project map. It is often unreachable from a single-repo session, which is why `people/clay.md` lives here. Nothing in this repo depends on reaching it.

### 2.4 Stack

- Frontend: Next.js 16.3.6 App Router, React 19.3, TypeScript.
- Backend: Next.js Route Handlers on Vercel.
- Data: Supabase **Digital Enterprise → Digital Gifts**, project ref `hyjmlkowbhftisynztui`, region `us-west-2`. Four V1 tables plus constrained RPCs are live.
- Hosting: Vercel team `Pride Family Realty`, project `digital-gifts` (`prj_naAJ6e1cVre7JrijE52Ox8tM60Jr`). Git branch pushes create protected previews. A repo-level `vercel.json` forces the correct Next.js framework/build output because the project was previously configured as a static site.
- Package manager: npm. Dependencies are pinned in `package.json`; no lockfile exists yet because package installation could not complete in this session's container.
- Validation: Zod at API boundaries.
- Marketing/design: Marketing-Hub pointers plus `docs/website-brief.md`.

### 2.5 Secrets map

**Locations only. Never record a value here, in a commit, in a PR body, or in chat.**

| Name | Where it lives | Used by |
| --- | --- | --- |
| `SUPABASE_URL` | Vercel project env when configured; verified project URL also has a source fallback | `src/lib/supabase.ts` |
| `SUPABASE_PUBLISHABLE_KEY` | Vercel project env when configured; public publishable key also has a source fallback | `src/lib/supabase.ts` |
| `MUSIC_PROVIDER` | Vercel project env / default `mock` | `src/lib/music/index.ts` |
| `DEMO_CHECKOUT` | Vercel project env / default demo unless explicitly set to `false` | `src/app/api/checkout/route.ts` |
| `SUNO_API_KEY` | Future Vercel project secret env; not configured | future official Suno adapter |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_ID` | Future Vercel project secret env; not configured | future Stripe integration |

The Supabase publishable key is intentionally public and low privilege. Secret/service-role credentials are not used by the current buyer flow.

Rules:
- Anything prefixed `VITE_` or `NEXT_PUBLIC_` is compiled into the browser bundle and is public by definition. Never put a secret behind such a name.
- `.env` and `.env.*` are gitignored once an application scaffold adds the project ignore rules. Do not add a real `.env` to the repo.

**Known gotcha, do not relearn this the hard way:** the Supabase Management API `GET /v1/projects/*/secrets` endpoint returns SHA-256 hashes, not values. Never conclude a key is fake, empty, or a placeholder from that endpoint. Check the store that actually holds the value.

**Blast radius:** the Supabase access token (`SUPABASE_ACCESS_TOKEN`) is account-wide. It reaches every Supabase project on the account, across separate businesses. Before any infrastructure operation, list the projects, confirm the ref matches 2.1, and say out loud which project you are targeting. The Supabase MCP connector may be scoped to a different organization than this project; if it cannot see this project's ref, do not reach for the closest available project.

### 2.6 Build and verification commands

Run everything from the repo root.

| Command | What it does | Verified |
| --- | --- | --- |
| `npm install` | installs pinned dependencies; use `npm ci` once a lockfile is committed | Vercel install/build succeeded 2026-09-23; local container install was unavailable |
| `npm run check` | ESLint plus TypeScript no-emit check | UNVERIFIED locally on 2026-09-23 |
| `npm run build` | production Next.js build | Verified by READY Vercel preview for commit `876941f` on 2026-09-23 |
| Test suite | none yet | no suite |

**Build gate:** `npm run check` and `npm run build`, plus rendered desktop/mobile verification for UI work. In the 2026-09-23 build session, Vercel proved the production build but the platform did not expose a usable protected-preview browser runner, so visual QA remains explicitly incomplete.

### 2.7 Deploy process

- Vercel project: `digital-gifts` in team `Pride Family Realty`.
- Branch pushes create protected preview deployments automatically.
- `main` creates a production-target deployment automatically. Because production changes require owner approval, do not merge a feature PR merely because checks pass; get Clay's explicit production approval first.
- Repo-level `vercel.json` sets the Next.js framework, build command and `.next` output because the project had previously been configured to expect a static `public` build directory.
- Supabase migrations are committed under `supabase/migrations/`. The V1 migration is registered in the live project as `personalized_song_v1`.
- After every deployment, verify the actual preview/live surface and buyer flow. A READY build alone does not satisfy UI verification.

### 2.8 UI and design standards

**Visual verification is required for any UI change, before committing.** Load the affected page, screenshot desktop at 1440x900 and mobile at 390x844, confirm the change and that nothing else broke. If your platform cannot render a browser, say so and hand the verification back (doctrine 15).

The current provisional visual direction is documented in `docs/website-brief.md`: premium/editorial with conversion-first structure, warm paper surfaces, tactile record-sleeve language and subtle motion. It is a V1 direction, not a locked brand identity. For future website/landing-page changes, use Marketing-Hub's `hub-website-system` skill.

### 2.9 Copy doctrine

Doctrine item 10 applies. In addition for this project:

- Marketing-Hub is the canonical marketing and conversion methodology. Use the committed `hub-` skill pointers in `.claude/skills/`.
- No brand voice profile is approved yet. Treat positioning, naming, tone and claims as proposed until Clay confirms them.
- In the personalized-song product, the customer's raw story details are source material. Preserve specific language and details rather than rewriting them into generic, polished summaries before music generation.
- When an answer is too vague to support a personalized result, get more specific source material from the customer rather than inventing details.

### 2.11 Scope

Default posture on this repo is active build.

**Pre-approved:** work needed to build a feature Clay asked for, including schema migrations, new pinned packages, preview settings and preview deploys, in this project's own database and hosting only. A roadmap is not a feature request.

**In scope, just do it:**
- Maintain the cross-platform agent scaffolding and handoff files.
- Build and verify features Clay explicitly requests for Digital Gifts.
- Use preview infrastructure belonging specifically to this repo once its targets are verified.
- Keep product-specific marketing context in this repo and use Marketing-Hub as reference intelligence.

**Always ask first**, even inside a requested feature:
- Deleting real data, touching production (the live domain, production deploys or production settings), emailing or messaging anyone other than Clay, spending money, rotating secrets, editing identity strings, or starting a feature Clay has not asked for.
- Creating another Supabase project, changing organizations, or selecting any project other than the owner-confirmed **Digital Enterprise → Digital Gifts** target.
- Choosing a music provider, payment account, legal terms, refund policy or public brand name when Clay has not already decided it.

Never allowed: anything touching another business's data (doctrine 9).

The project `.claude/settings.json` lets Supabase and Vercel tools run without prompts, except irreversible or costly ones (purchases, domains, promotions, rollbacks, protection and firewall changes, project pause or creation, database branches). None of this relaxes Section 1 or confirming the target before infrastructure work (doctrine 14).

### 2.12 Bootstrap capability checklist

Run this at session start, before real work. Report anything on this list you cannot do (doctrine 15).

1. **Handoff read.** Read `HANDOFF.md`, both blocks. Apply doctrine item 12.
2. **Operator identified.** Resolve per 2.3.
3. **Git identity set.** `git config user.name` returns `lowkeycm`.
4. **Branch created.** On a `clay/...` branch, not `main`.
5. **Other branches checked.** `git branch -r --sort=-committerdate | head`.
6. **Full working tree present.** Some environments hand you a sparse checkout. If folders are missing, run `git sparse-checkout disable` before concluding anything.
7. **Dependencies installed.**
8. **Build gate runnable.** The commands in 2.6 complete.
9. **Browser rendering available.** Can you load a page and take a screenshot? Test it, do not infer it from the platform name.
10. **Live site reachable.** Separate from rendering; test it on its own.
11. **Database reachable.** Most sessions do not need it. Say so if a task depends on it.
12. **GitHub reachable.** Can you push and open a PR? Retry once on a proxy 407.

If items 8, 9, or 10 fail, you can still do useful work. You cannot describe that work as verified.

### 2.13 Repo map

```
AGENTS.md                    canonical instructions for every platform
CLAUDE.md                    one-line pointer to AGENTS.md
HANDOFF.md                   current state, last session and platform capability notes
ROADMAP.md                   ordered product outcomes
README.md                    local run/build and current milestone
docs/PRODUCT.md              confirmed V1 product rules and deferred scope
docs/ARCHITECTURE.md         runtime/data/security design
docs/website-brief.md        provisional V1 design research and visual execution
src/app/                     Next.js pages and API route handlers
src/components/              buyer-flow UI components
src/lib/intake.ts            intake validation and raw-language music brief
src/lib/music/               provider abstraction, mock and official-Suno placeholder
src/lib/song-repository.ts   constrained Supabase RPC repository
src/lib/supabase.ts          low-privilege Supabase client
supabase/migrations/         committed database schema/RPC migration
vercel.json                  repo-level Next.js deployment override
people/clay.md               operator profile
.claude/                     Claude settings, hook and Marketing-Hub pointers
```

### 2.14 Gotchas

- **2026-09-23:** The repository was completely empty. GitHub requires a root commit before a branch can exist, so bootstrap used a one-time neutral `main` seed commit solely to create `clay/agent-scaffolding`. All actual scaffolding changes were made on the branch.
- **2026-09-23:** Vercel exposes project `digital-gifts` under team `Pride Family Realty`, Git-linked to this repo with automatic branch previews and `main` production deploys. Tested deployment URLs are protected by Vercel Authentication. Confirm that exact project before any hosting operation because the account also contains unrelated businesses.
- **2026-09-23:** Verified **Digital Enterprise → Digital Gifts** at project ref `hyjmlkowbhftisynztui` in `us-west-2`, status ACTIVE_HEALTHY, on 2026-09-23. Do not reuse Heritage, Pride Family Realty, RelevAint or any other database as a shortcut.
- **2026-09-23:** GitHub connector-authored commits use `nerdsandbots@gmail.com`; Clay confirmed that is his GitHub email. The shared scaffold still specifies the noreply address for normal local Git sessions.
- **2026-09-23:** For personalized songs, earlier testing showed that over-structured LLM rewriting made the music result more generic. Preserve raw customer language and improve intake specificity instead.
- **2026-09-23:** Vercel project settings were inherited as a static-site build expecting `public`. V1 initially failed with `STATIC_BUILD_NO_OUT_DIR`; `vercel.json` now forces the Next.js framework/build output.
- **2026-09-23:** The V1 accountless preview uses anonymous `SECURITY DEFINER` RPCs protected by per-song UUID capability tokens while direct table privileges remain revoked. Supabase advisor warns about anonymous executable definer functions by design. Before public launch, provider generation/payment mutations must move behind backend credentials and rate limits.
- **2026-09-23:** No npm lockfile is committed yet because dependency installation timed out in this platform container. Vercel successfully built pinned package versions, but create and commit a lockfile when a normal package environment is available.

### 2.15 Marketing work and Marketing-Hub

For marketing, copywriting, SEO, website strategy, landing pages, social, email, SMS, ads, positioning, brand, or conversion work, use Marketing-Hub as the canonical marketing methodology. It is the sibling repository `github.com/lowkeycm/Marketing-Hub`, normally checked out at `../Marketing-Hub`. If it is unavailable, do not silently substitute generic marketing methodology. Report that the canonical marketing brain is unavailable.

Read Marketing-Hub's root `README.md` first and load only the skills relevant to the task. Every Hub skill has a pointer in this repo under `.claude/skills/hub-<name>/`; invoke the `hub-` skill for the job rather than reading the Hub as a folder, and prefer it over any same-named marketplace skill. The pointers are generated by `Marketing-Hub/install/hub-skills.mjs` and refreshed by `.claude/hooks/session-start.sh`.

Marketing-Hub is reference intelligence. Do not modify it while working on this project unless explicitly instructed. Client-specific facts, decisions, brand context, and learnings belong to this project in `brand/` and `docs/canonical/`, never in the Hub. Anything marked proposed or provisional in `brand/` is not confirmed direction until Clay says so.
