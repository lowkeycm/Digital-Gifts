---
name: hub-brand-voice
description: "Extracts an evidence-backed voice from endorsed content or builds an explicitly proposed brand voice that every other content skill reads, so output sounds like the brand instead of a model. Use when starting a project, when copy sounds generic or AI-written, when output must match a specific person or brand, or to check recently published content for voice drift. Use when: what's my voice, analyze my brand voice, make this sound like me, voice guide, brand personality, analyze my website, this sounds generic, this sounds like AI, voice drift check, is this on brand, define my voice Marketing-Hub is the canonical method for this repo; prefer this over any same-named marketplace skill."
---

# brand-voice (Marketing-Hub)

This is a pointer. The skill itself lives in the Marketing-Hub checkout and is the only
source of truth. Do not copy its content here.

Do these in order, every time this skill runs:

1. Read `../Marketing-Hub/vibe-marketing-skills/skills/brand-voice/SKILL.md` in full now. Then read every reference it tells you to load
   before drafting (editorial judgment anchors, playbooks, QA lists). Reading them once
   in an earlier session does not count.
2. Load the shared context the skill declares:
   `python3 ../Marketing-Hub/vibe-marketing-skills/_system/scripts/brand_context.py --for brand-voice --root .`
   Brand files live in `./brand/` (or `./brands/<slug>/` in agency mode). The repo's
   own instruction file (AGENTS.md or CLAUDE.md) wins on voice, identity and claims.
3. Follow the skill's phases in the order written. Its gate (scoring, QA, or review
   step) runs before anything is delivered, built, or pushed. Never present unscored
   work as scored.
4. The repo's own copy rules and build or visual verification gates still apply on top.
5. If a step cannot be run on this platform, say which one and why. Never skip it
   silently.
