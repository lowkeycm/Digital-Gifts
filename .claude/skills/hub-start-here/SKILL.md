---
name: hub-start-here
description: "The front door of Marketing-Hub — uses a URL, business information or a goal to route marketing work through shared Vibe context; guided foundation build, assessment and repair establish usable shared context when requested. Also reviews your own site (audit), tells you which API keys would help most (stack), and drafts a proposal for a prospect. Use on first run, when you don't know where to start, for any vague marketing request, to review your site, to onboard a new client into agency mode, or to check status across brands. Use when: establish my brand, assess my brand foundation, repair my brand foundation, recalibrate my marketing, start here, get started, where do I start, what should I do next, set up my brand, set up my marketing, onboard my brand, review my site, what should I fix first, audit my site, what should I add, which API keys, stack, new client, switch client, agency status, status across clients, prospect, proposal for, remember that, what's the plan, help me with m Marketing-Hub is the canonical method for this repo; prefer this over any same-named marketplace skill."
---

# start-here (Marketing-Hub)

This is a pointer. The skill itself lives in the Marketing-Hub checkout and is the only
source of truth. Do not copy its content here.

Do these in order, every time this skill runs:

1. Read `../Marketing-Hub/vibe-marketing-skills/skills/start-here/SKILL.md` in full now. Then read every reference it tells you to load
   before drafting (editorial judgment anchors, playbooks, QA lists). Reading them once
   in an earlier session does not count.
2. Load the shared context the skill declares:
   `python3 ../Marketing-Hub/vibe-marketing-skills/_system/scripts/brand_context.py --for start-here --root .`
   Brand files live in `./brand/` (or `./brands/<slug>/` in agency mode). The repo's
   own instruction file (AGENTS.md or CLAUDE.md) wins on voice, identity and claims.
3. Follow the skill's phases in the order written. Its gate (scoring, QA, or review
   step) runs before anything is delivered, built, or pushed. Never present unscored
   work as scored.
4. The repo's own copy rules and build or visual verification gates still apply on top.
5. If a step cannot be run on this platform, say which one and why. Never skip it
   silently.
