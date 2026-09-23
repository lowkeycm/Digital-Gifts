---
name: hub-performance-review
description: "Turn real performance data — pasted CSV exports, dashboard screenshots, or read-only API pulls from GSC/GA4/PostHog/Beehiiv/Kit — into an honest diagnosis, structured priors written to learnings.md, and 3-5 ranked next actions mapped to concrete skill invocations. Use after anything ships and has numbers (a campaign, a content batch, a sequence, an ad test), or on a monthly schedule; this is the skill that closes the loop — every generator skill reads the priors it writes. Use when: how did it perform, review my numbers, analyze these results, here's my GSC export, read this dashboard screenshot, what's working, did the campaign work, performance review, monthly review, what should I do next based on results, which variant won, close the loop Marketing-Hub is the canonical method for this repo; prefer this over any same-named marketplace skill."
---

# performance-review (Marketing-Hub)

This is a pointer. The skill itself lives in the Marketing-Hub checkout and is the only
source of truth. Do not copy its content here.

Do these in order, every time this skill runs:

1. Read `../Marketing-Hub/vibe-marketing-skills/skills/performance-review/SKILL.md` in full now. Then read every reference it tells you to load
   before drafting (editorial judgment anchors, playbooks, QA lists). Reading them once
   in an earlier session does not count.
2. Load the shared context the skill declares:
   `python3 ../Marketing-Hub/vibe-marketing-skills/_system/scripts/brand_context.py --for performance-review --root .`
   Brand files live in `./brand/` (or `./brands/<slug>/` in agency mode). The repo's
   own instruction file (AGENTS.md or CLAUDE.md) wins on voice, identity and claims.
3. Follow the skill's phases in the order written. Its gate (scoring, QA, or review
   step) runs before anything is delivered, built, or pushed. Never present unscored
   work as scored.
4. The repo's own copy rules and build or visual verification gates still apply on top.
5. If a step cannot be run on this platform, say which one and why. Never skip it
   silently.
