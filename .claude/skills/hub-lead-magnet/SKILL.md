---
name: hub-lead-magnet
description: "Generate lead magnet concepts grounded in live competitor research, then BUILD the selected one — including guides, expertise/trust assets, sales enablement and interactive tools when requested. Use when someone wants to grow their email list, needs top-of-funnel ideas, asks what to give away for free, or requests Silent Selling / value-first educational assets. Use when: lead magnet ideas for X, grow my email list, what freebie should I create, top of funnel for X, opt-in ideas, create a lead magnet, build my quiz, build a calculator, build an audit tool, write a guide, build my checklist Marketing-Hub is the canonical method for this repo; prefer this over any same-named marketplace skill."
---

# lead-magnet (Marketing-Hub)

This is a pointer. The skill itself lives in the Marketing-Hub checkout and is the only
source of truth. Do not copy its content here.

Do these in order, every time this skill runs:

1. Read `../Marketing-Hub/vibe-marketing-skills/skills/lead-magnet/SKILL.md` in full now. Then read every reference it tells you to load
   before drafting (editorial judgment anchors, playbooks, QA lists). Reading them once
   in an earlier session does not count.
2. Load the shared context the skill declares:
   `python3 ../Marketing-Hub/vibe-marketing-skills/_system/scripts/brand_context.py --for lead-magnet --root .`
   Brand files live in `./brand/` (or `./brands/<slug>/` in agency mode). The repo's
   own instruction file (AGENTS.md or CLAUDE.md) wins on voice, identity and claims.
3. Follow the skill's phases in the order written. Its gate (scoring, QA, or review
   step) runs before anything is delivered, built, or pushed. Never present unscored
   work as scored.
4. The repo's own copy rules and build or visual verification gates still apply on top.
5. If a step cannot be run on this platform, say which one and why. Never skip it
   silently.
