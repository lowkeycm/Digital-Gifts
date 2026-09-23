---
name: hub-newsletter
description: "Write publication-ready newsletter editions — roundup, deep-dive, personal essay, curated links, news briefing, or hybrid — in the brand's voice, sourced from live pages, and informed by the list's own click data when an ESP key exists. Use it to draft an edition, pick a format, or answer newsletter strategy questions (platform, growth, monetization). Use when: write my newsletter, newsletter edition about X, weekly roundup, news briefing on X, curated links edition, draft this week's edition, newsletter format, newsletter strategy, newsletter monetization, which newsletter platform Marketing-Hub is the canonical method for this repo; prefer this over any same-named marketplace skill."
---

# newsletter (Marketing-Hub)

This is a pointer. The skill itself lives in the Marketing-Hub checkout and is the only
source of truth. Do not copy its content here.

Do these in order, every time this skill runs:

1. Read `../Marketing-Hub/vibe-marketing-skills/skills/newsletter/SKILL.md` in full now. Then read every reference it tells you to load
   before drafting (editorial judgment anchors, playbooks, QA lists). Reading them once
   in an earlier session does not count.
2. Load the shared context the skill declares:
   `python3 ../Marketing-Hub/vibe-marketing-skills/_system/scripts/brand_context.py --for newsletter --root .`
   Brand files live in `./brand/` (or `./brands/<slug>/` in agency mode). The repo's
   own instruction file (AGENTS.md or CLAUDE.md) wins on voice, identity and claims.
3. Follow the skill's phases in the order written. Its gate (scoring, QA, or review
   step) runs before anything is delivered, built, or pushed. Never present unscored
   work as scored.
4. The repo's own copy rules and build or visual verification gates still apply on top.
5. If a step cannot be run on this platform, say which one and why. Never skip it
   silently.
