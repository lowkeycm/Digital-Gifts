# HANDOFF

Read both blocks below before starting work. Doctrine item 12 in `AGENTS.md` explains what to do with them: same operator, same platform, within 24 hours, pick up silently; anything else, read the Last Session block back and get acknowledgment before working.

Every session ends by updating this file, committing, and pushing. Not committed means the session did not happen.

## Last Session

- **When:** 2026-09-23
- **Who:** Clay; authenticated GitHub account `lowkeycm` was visible on this platform.
- **Platform:** ChatGPT with connected GitHub, Supabase and Vercel tools, branch `clay/agent-scaffolding`
- **Request:** Bootstrap this empty repo from `lowkeycm/clay-config/templates/` on the same cadence as Clay's other projects, install Marketing-Hub pointers, merge the scaffolding PR, update the central project map, then stop before product implementation.
- **Changed:** Added the shared cross-platform agent doctrine, operator profile, handoff, roadmap, Claude Code settings/hook and Marketing-Hub skill pointers. No product application code, database schema or runtime integration was added.
- **Verification:** Fetched the source templates directly from `clay-config` main and Marketing-Hub installation instructions from Marketing-Hub main. Verified the GitHub target is `lowkeycm/Digital-Gifts`; verified Vercel exposes project `digital-gifts`, is Git-linked to this repo, and created READY deployments for both the scaffolding branch and the `main` seed; tested deployment URLs redirect to Vercel Authentication. Listed the connected Supabase projects and found no Digital Gifts database. GitHub branch, PR and merge were verified through the connected GitHub API. There is no application build, local server, public live app or test suite to verify yet.
- **Status:** merged
- **Next:** First real build session should bring in the V1 personalized-song application foundation, establish the actual package/build commands, confirm or provision a dedicated Supabase target, and produce the first Vercel preview before any production work.

## Prior Session

No prior repository sessions. This was the bootstrap.

## Where We Are

**What works.** Cross-platform agent scaffolding is installed. The repo has one canonical instruction file, Clay's operator profile, a durable handoff, a product roadmap, Claude Code bootstrap settings and committed Marketing-Hub pointers.

**What is in progress.** Nothing. This bootstrap intentionally stops before application implementation.

**What is broken or unresolved.** No application code or package tooling exists yet. Clay confirmed the intended database is Supabase **Digital Enterprise → Digital Gifts**, but the current connector exposes only RelevAint, so the exact project ref and live connectivity remain unverified here. Official music-generation API access, payment integration and customer delivery infrastructure are not configured in this repo.

**What could not be determined from here.** Vercel project-detail lookup failed through one connector path, but deployment listing independently verified Git linkage and auto-deploy behavior. Framework settings and runtime environment remain UNVERIFIED because no application exists. The deployment URLs are protected, so there is no public live application to inspect.

**Open owner actions.** When database work begins, use only the owner-confirmed **Digital Enterprise → Digital Gifts** Supabase target and verify its exact ref once that organization is visible to the connector. Obtain or confirm official music-provider API access before the generation integration is implemented.

**Next concrete step.** Import or rebuild the agreed V1 application foundation in this repo, then verify the actual stack end to end on a Vercel preview.

## Platform capability notes

These are dated observations, not permanent truths. Retest any "cannot" older than its date before relying on it, and update when reality changes (doctrine 15).

### ChatGPT connected tools, measured 2026-09-23

| Capability | Result |
| --- | --- |
| Build gate | File-content checks available. Intended `git diff --check` could not be run because the container could not resolve GitHub for a checkout; no application build exists yet |
| Screenshot a local dev server | No app/server exists yet, so not testable |
| Reach the live site | Vercel deployments are reachable but redirect to Vercel Authentication; no public application is live |
| Query the database | Supabase connector is reachable, but only the RelevAint organization is visible; owner-confirmed target is Digital Enterprise → Digital Gifts |
| Run the test suite | No suite exists yet |
| Push and open a PR | Yes, through the connected GitHub API |

Bootstrap checklist notes:
1. Handoff source template read before writing this file.
2. Operator identified as Clay from the active conversation; GitHub `lowkeycm` is connected.
3. This platform writes commits through the authenticated GitHub connector; local `git config` does not govern connector commits. GitHub resolves the commits to user `lowkeycm` with `nerdsandbots@gmail.com`, which Clay confirmed is his GitHub email. The shared scaffold still sets the noreply address for normal local Git sessions.
4. Required branch `clay/agent-scaffolding` created after the empty-repo seed.
5. Repository began with no branches containing work other than the one-time seed on `main`.
6. Full repository contents were verified through GitHub API reads; there was no sparse application checkout to recover.
7. No dependencies exist yet.
8. No application build exists yet. Documentation contents were verified through the GitHub API; `git diff --check` could not be run because the container could not resolve GitHub for a checkout.
9. Browser rendering cannot be meaningfully tested because there is no application surface; Vercel URL fetches were tested separately.
10. Vercel deployments exist and return a redirect to Vercel Authentication. No public application is live.
11. Supabase connector works, but no dedicated database target exists for this repo.
12. GitHub read/write, branching, PR and merge access are available.

## Recovery checkpoints

Push meaningful work to the branch during long sessions, not only at the end.
Label incomplete checkpoints honestly. Track separately: local save, remote push
(with SHA), merge (PR), deployment (URL and code SHA), and verification evidence.
A later documentation commit does not imply the deployed application changed.
Keep doctrine 12's acknowledgment rule intact so work by other operators is visible.
