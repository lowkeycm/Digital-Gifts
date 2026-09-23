---
name: hub-creative
description: "AI creative production engine — product photos, product video, social graphics, talking heads, and ad creative through one tiered pipeline with a vision-QA loop that scores every asset before you see it. Use whenever visual assets need to be generated, edited, or batch-produced for a brand or campaign. Use when: generate an image, product shot, product video, hero video, social graphic, YouTube thumbnail, talking head, UGC video, lip sync, ad creative, edit my product photo, animate this image, make visuals for this campaign Marketing-Hub is the canonical method for this repo; prefer this over any same-named marketplace skill."
---

# creative (Marketing-Hub)

This is a pointer. The skill itself lives in the Marketing-Hub checkout and is the only
source of truth. Do not copy its content here.

Do these in order, every time this skill runs:

1. Read `../Marketing-Hub/vibe-marketing-skills/skills/creative/SKILL.md` in full now. Then read every reference it tells you to load
   before drafting (editorial judgment anchors, playbooks, QA lists). Reading them once
   in an earlier session does not count.
2. Load the shared context the skill declares:
   `python3 ../Marketing-Hub/vibe-marketing-skills/_system/scripts/brand_context.py --for creative --root .`
   Brand files live in `./brand/` (or `./brands/<slug>/` in agency mode). The repo's
   own instruction file (AGENTS.md or CLAUDE.md) wins on voice, identity and claims.
3. Follow the skill's phases in the order written. Its gate (scoring, QA, or review
   step) runs before anything is delivered, built, or pushed. Never present unscored
   work as scored.
4. The repo's own copy rules and build or visual verification gates still apply on top.
5. If a step cannot be run on this platform, say which one and why. Never skip it
   silently.
