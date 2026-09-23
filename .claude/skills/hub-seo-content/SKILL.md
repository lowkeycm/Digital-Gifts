---
name: hub-seo-content
description: "Write publication-ready articles that earn classic rankings AND AI-surface citations (AI Overviews, ChatGPT search, Perplexity) while reading like a human expert wrote them. Use when turning a keyword or content brief into an actual piece — it scrapes the live SERP with parallel agents, captures who the AI surfaces cite and why, drafts in your voice, humanizes, optimizes on two tracks (on-page + GEO), and ships valid 2026 schema. Refresh mode diffs both the SERP and the AI-citation set against your published article. Use when: write SEO content for X, create article for keyword, write blog post about X, SEO article, content for keyword cluster, refresh article, update blog post, why am I not cited in AI Overviews Marketing-Hub is the canonical method for this repo; prefer this over any same-named marketplace skill."
---

# seo-content (Marketing-Hub)

This is a pointer. The skill itself lives in the Marketing-Hub checkout and is the only
source of truth. Do not copy its content here.

Do these in order, every time this skill runs:

1. Read `../Marketing-Hub/vibe-marketing-skills/skills/seo-content/SKILL.md` in full now. Then read every reference it tells you to load
   before drafting (editorial judgment anchors, playbooks, QA lists). Reading them once
   in an earlier session does not count.
2. Load the shared context the skill declares:
   `python3 ../Marketing-Hub/vibe-marketing-skills/_system/scripts/brand_context.py --for seo-content --root .`
   Brand files live in `./brand/` (or `./brands/<slug>/` in agency mode). The repo's
   own instruction file (AGENTS.md or CLAUDE.md) wins on voice, identity and claims.
3. Follow the skill's phases in the order written. Its gate (scoring, QA, or review
   step) runs before anything is delivered, built, or pushed. Never present unscored
   work as scored.
4. The repo's own copy rules and build or visual verification gates still apply on top.
5. If a step cannot be run on this platform, say which one and why. Never skip it
   silently.
