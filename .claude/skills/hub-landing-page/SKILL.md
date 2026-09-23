---
name: hub-landing-page
description: "Turn an offer into a shipped landing page — section architecture chosen by offer type and awareness level, a deployable build (single-file HTML or Next.js) with A/B variant routes, and an optional deploy; includes a teardown mode that scores any live page section-by-section into a prioritized rewrite plan (the conversion-audit capability). Use when the user wants a page built, has approved copy that needs to become a working page, or has a live page that isn't converting. Use when: build me a landing page, landing page for X, turn this copy into a page, ship a page, page isn't converting, tear down my landing page, landing page teardown, audit my landing page Marketing-Hub is the canonical method for this repo; prefer this over any same-named marketplace skill."
---

# landing-page (Marketing-Hub)

This is a pointer. The skill itself lives in the Marketing-Hub checkout and is the only
source of truth. Do not copy its content here.

Do these in order, every time this skill runs:

1. Read `../Marketing-Hub/vibe-marketing-skills/skills/landing-page/SKILL.md` in full now. Then read every reference it tells you to load
   before drafting (editorial judgment anchors, playbooks, QA lists). Reading them once
   in an earlier session does not count.
2. Load the shared context the skill declares:
   `python3 ../Marketing-Hub/vibe-marketing-skills/_system/scripts/brand_context.py --for landing-page --root .`
   Brand files live in `./brand/` (or `./brands/<slug>/` in agency mode). The repo's
   own instruction file (AGENTS.md or CLAUDE.md) wins on voice, identity and claims.
3. Follow the skill's phases in the order written. Its gate (scoring, QA, or review
   step) runs before anything is delivered, built, or pushed. Never present unscored
   work as scored.
4. The repo's own copy rules and build or visual verification gates still apply on top.
5. If a step cannot be run on this platform, say which one and why. Never skip it
   silently.
