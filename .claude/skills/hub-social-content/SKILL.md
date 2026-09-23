---
name: hub-social-content
description: "Original-content system for X and LinkedIn — builds a per-user pattern library from what actually works in their niche plus a personal canon from their own best posts, then drafts, scores 0-100 against a calibrated rubric (≥70 ships), generates quote-tweet/reply angles, and runs a weekly cadence. Use for writing original social posts; for repurposing existing long-form content use /content-atomizer instead. Use when: write me a tweet, draft an X post, write a LinkedIn post, set up my content system, what should I post, score this post, score this tweet, quote tweet this, QT this, reply to this post, weekly content plan, social posts for this week, build my social canon Marketing-Hub is the canonical method for this repo; prefer this over any same-named marketplace skill."
---

# social-content (Marketing-Hub)

This is a pointer. The skill itself lives in the Marketing-Hub checkout and is the only
source of truth. Do not copy its content here.

Do these in order, every time this skill runs:

1. Read `../Marketing-Hub/vibe-marketing-skills/skills/social-content/SKILL.md` in full now. Then read every reference it tells you to load
   before drafting (editorial judgment anchors, playbooks, QA lists). Reading them once
   in an earlier session does not count.
2. Load the shared context the skill declares:
   `python3 ../Marketing-Hub/vibe-marketing-skills/_system/scripts/brand_context.py --for social-content --root .`
   Brand files live in `./brand/` (or `./brands/<slug>/` in agency mode). The repo's
   own instruction file (AGENTS.md or CLAUDE.md) wins on voice, identity and claims.
3. Follow the skill's phases in the order written. Its gate (scoring, QA, or review
   step) runs before anything is delivered, built, or pushed. Never present unscored
   work as scored.
4. The repo's own copy rules and build or visual verification gates still apply on top.
5. If a step cannot be run on this platform, say which one and why. Never skip it
   silently.
