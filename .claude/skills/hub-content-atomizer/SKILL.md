---
name: hub-content-atomizer
description: "Turns one piece of finished content (blog post, newsletter, podcast, video) into platform-native social assets for the 2-3 platforms the brand actually operates — depth on a few platforms instead of rephrased spray across eight. Use when source content exists and needs distribution, when a post's comments need ranked reply drafts, or when a week of posts should be planned from one source. Use when: repurpose this, atomize this content, turn this into social posts, LinkedIn post from this, X post from this, thread from this, draft replies to these comments, reply to my comments, content calendar from this, schedule this across platforms Marketing-Hub is the canonical method for this repo; prefer this over any same-named marketplace skill."
---

# content-atomizer (Marketing-Hub)

This is a pointer. The skill itself lives in the Marketing-Hub checkout and is the only
source of truth. Do not copy its content here.

Do these in order, every time this skill runs:

1. Read `../Marketing-Hub/vibe-marketing-skills/skills/content-atomizer/SKILL.md` in full now. Then read every reference it tells you to load
   before drafting (editorial judgment anchors, playbooks, QA lists). Reading them once
   in an earlier session does not count.
2. Load the shared context the skill declares:
   `python3 ../Marketing-Hub/vibe-marketing-skills/_system/scripts/brand_context.py --for content-atomizer --root .`
   Brand files live in `./brand/` (or `./brands/<slug>/` in agency mode). The repo's
   own instruction file (AGENTS.md or CLAUDE.md) wins on voice, identity and claims.
3. Follow the skill's phases in the order written. Its gate (scoring, QA, or review
   step) runs before anything is delivered, built, or pushed. Never present unscored
   work as scored.
4. The repo's own copy rules and build or visual verification gates still apply on top.
5. If a step cannot be run on this platform, say which one and why. Never skip it
   silently.
