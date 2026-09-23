---
name: hub-paid-ads
description: "Develop ad concepts, platform copy, creative briefs and destination-page congruence, then interpret supplied results to improve marketing. Account operation, bidding and budget pacing belong to the caller; provide operator context only when explicitly requested. Use when: write my ads, paid ads, launch a campaign, Meta ads, Google ads, LinkedIn ads, TikTok ads, ad copy for X, turn the matrix into ads, RSA headlines, will this ad get rejected, policy check my ads, review my ad results, kill or scale, what should my ad budget be Marketing-Hub is the canonical method for this repo; prefer this over any same-named marketplace skill."
---

# paid-ads (Marketing-Hub)

This is a pointer. The skill itself lives in the Marketing-Hub checkout and is the only
source of truth. Do not copy its content here.

Do these in order, every time this skill runs:

1. Read `../Marketing-Hub/vibe-marketing-skills/skills/paid-ads/SKILL.md` in full now. Then read every reference it tells you to load
   before drafting (editorial judgment anchors, playbooks, QA lists). Reading them once
   in an earlier session does not count.
2. Load the shared context the skill declares:
   `python3 ../Marketing-Hub/vibe-marketing-skills/_system/scripts/brand_context.py --for paid-ads --root .`
   Brand files live in `./brand/` (or `./brands/<slug>/` in agency mode). The repo's
   own instruction file (AGENTS.md or CLAUDE.md) wins on voice, identity and claims.
3. Follow the skill's phases in the order written. Its gate (scoring, QA, or review
   step) runs before anything is delivered, built, or pushed. Never present unscored
   work as scored.
4. The repo's own copy rules and build or visual verification gates still apply on top.
5. If a step cannot be run on this platform, say which one and why. Never skip it
   silently.
