---
name: hub-ai-search
description: "AEO/GEO for being found and cited by ChatGPT, Perplexity, Claude, and Google AI Overviews — runs a 'share of model' audit (who the AI surfaces cite for your money queries, you vs competitors), executes the fixes (llms.txt, answer-block retrofits, entity schema, citable assets, IndexNow), and monitors citation churn over time. Use when you want to know whether AI assistants recommend you, why competitors get cited instead, or to make your existing pages citable. Use when: ai search audit, am I cited by ChatGPT, AI Overviews visibility, share of model, AEO, GEO, generative engine optimization, why does Perplexity recommend my competitor, llms.txt, get cited by AI, AI citation monitoring, answer engine optimization Marketing-Hub is the canonical method for this repo; prefer this over any same-named marketplace skill."
---

# ai-search (Marketing-Hub)

This is a pointer. The skill itself lives in the Marketing-Hub checkout and is the only
source of truth. Do not copy its content here.

Do these in order, every time this skill runs:

1. Read `../Marketing-Hub/vibe-marketing-skills/skills/ai-search/SKILL.md` in full now. Then read every reference it tells you to load
   before drafting (editorial judgment anchors, playbooks, QA lists). Reading them once
   in an earlier session does not count.
2. Load the shared context the skill declares:
   `python3 ../Marketing-Hub/vibe-marketing-skills/_system/scripts/brand_context.py --for ai-search --root .`
   Brand files live in `./brand/` (or `./brands/<slug>/` in agency mode). The repo's
   own instruction file (AGENTS.md or CLAUDE.md) wins on voice, identity and claims.
3. Follow the skill's phases in the order written. Its gate (scoring, QA, or review
   step) runs before anything is delivered, built, or pushed. Never present unscored
   work as scored.
4. The repo's own copy rules and build or visual verification gates still apply on top.
5. If a step cannot be run on this platform, say which one and why. Never skip it
   silently.
