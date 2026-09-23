---
name: hub-keyword-research
description: "Strategic keyword research that expands seeds with the 6 Circles Method, validates pillars against live autocomplete + SERP + AI-surface data, and outputs a prioritized content backlog with ready-to-write briefs. Use when planning content strategy, choosing what to write about, finding content gaps, or building an SEO/AEO plan. Use when: keyword research for X, content strategy for X, what should I write about, what topics should I cover, SEO strategy, topic clusters, content gaps, competitor keywords, content plan Marketing-Hub is the canonical method for this repo; prefer this over any same-named marketplace skill."
---

# keyword-research (Marketing-Hub)

This is a pointer. The skill itself lives in the Marketing-Hub checkout and is the only
source of truth. Do not copy its content here.

Do these in order, every time this skill runs:

1. Read `../Marketing-Hub/vibe-marketing-skills/skills/keyword-research/SKILL.md` in full now. Then read every reference it tells you to load
   before drafting (editorial judgment anchors, playbooks, QA lists). Reading them once
   in an earlier session does not count.
2. Load the shared context the skill declares:
   `python3 ../Marketing-Hub/vibe-marketing-skills/_system/scripts/brand_context.py --for keyword-research --root .`
   Brand files live in `./brand/` (or `./brands/<slug>/` in agency mode). The repo's
   own instruction file (AGENTS.md or CLAUDE.md) wins on voice, identity and claims.
3. Follow the skill's phases in the order written. Its gate (scoring, QA, or review
   step) runs before anything is delivered, built, or pushed. Never present unscored
   work as scored.
4. The repo's own copy rules and build or visual verification gates still apply on top.
5. If a step cannot be run on this platform, say which one and why. Never skip it
   silently.
