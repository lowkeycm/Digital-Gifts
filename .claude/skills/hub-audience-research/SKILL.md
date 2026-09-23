---
name: hub-audience-research
description: "Mine where your audience actually talks (reviews, Reddit, YouTube comments, communities) and produce two brand files — audience.md (segments, awareness, jobs-to-be-done, watering holes) and voc.md (verbatim pain/desire/objection language with sources). Use it before positioning or copy work, when launching into a new market, or when copy keeps missing because nobody knows how customers actually describe the problem. Use when: research my audience, who is my audience, voice of customer, what do customers say, mine reviews, customer language, refresh my audience research, why isn't my copy landing, audience for X Marketing-Hub is the canonical method for this repo; prefer this over any same-named marketplace skill."
---

# audience-research (Marketing-Hub)

This is a pointer. The skill itself lives in the Marketing-Hub checkout and is the only
source of truth. Do not copy its content here.

Do these in order, every time this skill runs:

1. Read `../Marketing-Hub/vibe-marketing-skills/skills/audience-research/SKILL.md` in full now. Then read every reference it tells you to load
   before drafting (editorial judgment anchors, playbooks, QA lists). Reading them once
   in an earlier session does not count.
2. Load the shared context the skill declares:
   `python3 ../Marketing-Hub/vibe-marketing-skills/_system/scripts/brand_context.py --for audience-research --root .`
   Brand files live in `./brand/` (or `./brands/<slug>/` in agency mode). The repo's
   own instruction file (AGENTS.md or CLAUDE.md) wins on voice, identity and claims.
3. Follow the skill's phases in the order written. Its gate (scoring, QA, or review
   step) runs before anything is delivered, built, or pushed. Never present unscored
   work as scored.
4. The repo's own copy rules and build or visual verification gates still apply on top.
5. If a step cannot be run on this platform, say which one and why. Never skip it
   silently.
