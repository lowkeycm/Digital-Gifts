---
name: hub-competitive-intel
description: "Tear down 3-6 competitors with parallel research agents — homepage messaging, pricing, ads they pay to run, lead magnets, launches, AI-citation presence — and synthesize the exploitable gaps into ./brand/competitors.md. Use when you need to know what competitors actually say and sell before positioning, pricing, or writing copy; also runs a non-interactive diff mode for scheduled competitor watching and an ad-recon mode for paid-ads counter-positioning. Use when: competitor analysis, tear down my competitors, who am I up against, what are competitors charging, competitor watch, what changed with competitors, spy on competitor ads, ad recon, competitive landscape, why is competitor X winning, competitor teardown Marketing-Hub is the canonical method for this repo; prefer this over any same-named marketplace skill."
---

# competitive-intel (Marketing-Hub)

This is a pointer. The skill itself lives in the Marketing-Hub checkout and is the only
source of truth. Do not copy its content here.

Do these in order, every time this skill runs:

1. Read `../Marketing-Hub/vibe-marketing-skills/skills/competitive-intel/SKILL.md` in full now. Then read every reference it tells you to load
   before drafting (editorial judgment anchors, playbooks, QA lists). Reading them once
   in an earlier session does not count.
2. Load the shared context the skill declares:
   `python3 ../Marketing-Hub/vibe-marketing-skills/_system/scripts/brand_context.py --for competitive-intel --root .`
   Brand files live in `./brand/` (or `./brands/<slug>/` in agency mode). The repo's
   own instruction file (AGENTS.md or CLAUDE.md) wins on voice, identity and claims.
3. Follow the skill's phases in the order written. Its gate (scoring, QA, or review
   step) runs before anything is delivered, built, or pushed. Never present unscored
   work as scored.
4. The repo's own copy rules and build or visual verification gates still apply on top.
5. If a step cannot be run on this platform, say which one and why. Never skip it
   silently.
