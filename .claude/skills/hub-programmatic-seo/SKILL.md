---
name: hub-programmatic-seo
description: "Validate, build, and ship a programmatic SEO library — one template × one dataset → 50-500 pages that each earn their existence with unique data. Use when a keyword pattern repeats across a modifier set (x for [industry], [city] x, x vs y, x alternatives, x integrations) and pages should be generated from data instead of written one at a time. Use when: programmatic seo, pseo, generate pages from data, build 100 landing pages, integration pages, comparison pages, location pages, alternatives pages, glossary pages, a page for every city, template pages, scale seo pages Marketing-Hub is the canonical method for this repo; prefer this over any same-named marketplace skill."
---

# programmatic-seo (Marketing-Hub)

This is a pointer. The skill itself lives in the Marketing-Hub checkout and is the only
source of truth. Do not copy its content here.

Do these in order, every time this skill runs:

1. Read `../Marketing-Hub/vibe-marketing-skills/skills/programmatic-seo/SKILL.md` in full now. Then read every reference it tells you to load
   before drafting (editorial judgment anchors, playbooks, QA lists). Reading them once
   in an earlier session does not count.
2. Load the shared context the skill declares:
   `python3 ../Marketing-Hub/vibe-marketing-skills/_system/scripts/brand_context.py --for programmatic-seo --root .`
   Brand files live in `./brand/` (or `./brands/<slug>/` in agency mode). The repo's
   own instruction file (AGENTS.md or CLAUDE.md) wins on voice, identity and claims.
3. Follow the skill's phases in the order written. Its gate (scoring, QA, or review
   step) runs before anything is delivered, built, or pushed. Never present unscored
   work as scored.
4. The repo's own copy rules and build or visual verification gates still apply on top.
5. If a step cannot be run on this platform, say which one and why. Never skip it
   silently.
