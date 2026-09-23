---
name: hub-email-sequences
description: "Design platform-neutral email sequences for inquiries, welcome, nurture, sales, launch, re-engagement and post-purchase. Produce copy, recipient and timing logic, relevant exits or branches, and success measures; load delivery or ESP handoff instructions only when requested. Use when: write welcome emails, email sequence for, nurture sequence, convert my list, onboarding emails, launch sequence, drip campaign, email funnel, welcome series, follow-up emails, autoresponder, cart abandonment emails, check my email deliverability, push this sequence to Kit, push to Beehiiv Marketing-Hub is the canonical method for this repo; prefer this over any same-named marketplace skill."
---

# email-sequences (Marketing-Hub)

This is a pointer. The skill itself lives in the Marketing-Hub checkout and is the only
source of truth. Do not copy its content here.

Do these in order, every time this skill runs:

1. Read `../Marketing-Hub/vibe-marketing-skills/skills/email-sequences/SKILL.md` in full now. Then read every reference it tells you to load
   before drafting (editorial judgment anchors, playbooks, QA lists). Reading them once
   in an earlier session does not count.
2. Load the shared context the skill declares:
   `python3 ../Marketing-Hub/vibe-marketing-skills/_system/scripts/brand_context.py --for email-sequences --root .`
   Brand files live in `./brand/` (or `./brands/<slug>/` in agency mode). The repo's
   own instruction file (AGENTS.md or CLAUDE.md) wins on voice, identity and claims.
3. Follow the skill's phases in the order written. Its gate (scoring, QA, or review
   step) runs before anything is delivered, built, or pushed. Never present unscored
   work as scored.
4. The repo's own copy rules and build or visual verification gates still apply on top.
5. If a step cannot be run on this platform, say which one and why. Never skip it
   silently.
