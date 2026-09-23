---
name: hub-positioning-angles
description: "Find the angle that makes something sell — researches competitor messaging (including what they pay to say in ad libraries), detects market sophistication, and generates 3-5 distinct positioning angles with a starred recommendation. Use for positioning or repositioning, weak differentiation, Deep Positioning (OWN/CARVE/REDRAW), and Cult OS worldview/conflict/culture strategy; reuse a sound existing position for execution. Use when: find angles for X, how should I position X, what's the hook, why isn't this selling, make this stand out, differentiate this, positioning for X, before writing copy or a landing page Marketing-Hub is the canonical method for this repo; prefer this over any same-named marketplace skill."
---

# positioning-angles (Marketing-Hub)

This is a pointer. The skill itself lives in the Marketing-Hub checkout and is the only
source of truth. Do not copy its content here.

Do these in order, every time this skill runs:

1. Read `../Marketing-Hub/vibe-marketing-skills/skills/positioning-angles/SKILL.md` in full now. Then read every reference it tells you to load
   before drafting (editorial judgment anchors, playbooks, QA lists). Reading them once
   in an earlier session does not count.
2. Load the shared context the skill declares:
   `python3 ../Marketing-Hub/vibe-marketing-skills/_system/scripts/brand_context.py --for positioning-angles --root .`
   Brand files live in `./brand/` (or `./brands/<slug>/` in agency mode). The repo's
   own instruction file (AGENTS.md or CLAUDE.md) wins on voice, identity and claims.
3. Follow the skill's phases in the order written. Its gate (scoring, QA, or review
   step) runs before anything is delivered, built, or pushed. Never present unscored
   work as scored.
4. The repo's own copy rules and build or visual verification gates still apply on top.
5. If a step cannot be run on this platform, say which one and why. Never skip it
   silently.
