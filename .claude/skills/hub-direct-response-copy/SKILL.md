---
name: hub-direct-response-copy
description: "Write copy that converts — landing pages, sales pages, emails, ads, headlines, CTAs — built on voice-of-customer language and gated by a built-in 7-dimension score-and-rewrite loop; approved landing-page copy hands off to /landing-page for architecture, build, and ship. Use when the user wants to sell something in writing, score existing copy, or punch up copy that isn't converting. Use when: write copy for, write a landing page, make this convert, help me sell, punch this up, sales page, headline variants, score this copy, rewrite this email Marketing-Hub is the canonical method for this repo; prefer this over any same-named marketplace skill."
---

# direct-response-copy (Marketing-Hub)

This is a pointer. The skill itself lives in the Marketing-Hub checkout and is the only
source of truth. Do not copy its content here.

Do these in order, every time this skill runs:

1. Read `../Marketing-Hub/vibe-marketing-skills/skills/direct-response-copy/SKILL.md` in full now. Then read every reference it tells you to load
   before drafting (editorial judgment anchors, playbooks, QA lists). Reading them once
   in an earlier session does not count.
2. Load the shared context the skill declares:
   `python3 ../Marketing-Hub/vibe-marketing-skills/_system/scripts/brand_context.py --for direct-response-copy --root .`
   Brand files live in `./brand/` (or `./brands/<slug>/` in agency mode). The repo's
   own instruction file (AGENTS.md or CLAUDE.md) wins on voice, identity and claims.
3. Follow the skill's phases in the order written. Its gate (scoring, QA, or review
   step) runs before anything is delivered, built, or pushed. Never present unscored
   work as scored.
4. The repo's own copy rules and build or visual verification gates still apply on top.
5. If a step cannot be run on this platform, say which one and why. Never skip it
   silently.
