# ROADMAP

Ordered product milestones. HANDOFF.md owns current status and the next task.
This file owns outcomes, dependencies and completion criteria, not session history.
Read AGENTS.md and respect the existing acknowledgment and authorization rules.

## 0. Digital Gifts parent brand
- Status: The Gift Smith redesign merged to main and deployed; desktop/mobile visual QA passed.
- Result for the user: Digital Gifts is the parent consumer brand, with Your Song as the first focused product and honest space for future personalized digital/physical gift formats.
- Done when: `/` explains Digital Gifts, `/your-song` preserves the song conversion page, existing funnel routes remain intact, unreleased products are labeled honestly, and desktop/mobile preview is visually verified.
- Current proof: Next.js/Vercel build succeeds on the stacked feature branch. Parent/product routing is implemented.
- Dependencies / owner decisions: custom domain. Clay selected The Gift Smith and authorized this production merge.

## 1. Working personalized-song V1
- Status: foundation merged to main; real music, payment, audio delivery, email and production protection work remain.
- Result for the user: A customer can give specific personal story details, hear a personalized song preview, purchase the full song, receive it on a private delivery page and request one simple revision.
- Done when: the full intake -> generation -> preview -> payment -> delivery -> revision path works end to end on a verified Vercel preview; customer raw language is preserved into the music-generation input; data is stored only in the dedicated Digital Gifts database; failure states are visible and recoverable.
- Current proof: dedicated Supabase persistence, private preview/delivery links, mock preview/full generation, demo checkout and one persisted revision work at the data layer; Vercel preview build is READY. Rendered visual QA and the complete demo journey now pass.
- Dependencies / owner decisions: official music-generation API access, Stripe test mode, and explicit production approval after visual preview review.

## 2. Conversion and operating polish
- Status: not started.
- Result for the user: The buying experience is trustworthy, emotionally strong and easy to finish without manual handholding.
- Done when: representative sample songs, customer-facing FAQ/policies, funnel analytics, abandoned-flow recovery where appropriate, admin order visibility and a clean revision experience are verified.
- Dependencies / owner decisions: V1 usage data and approved brand/offer direction.

## 3. Smarter intake V2
- Status: not started.
- Result for the user: Thin or generic answers trigger targeted follow-up questions that pull out specific memories without rewriting the customer's voice.
- Done when: adaptive follow-ups improve source-detail quality while preserving raw wording, and the change is validated against real generation outcomes rather than subjective prompt complexity.
- Dependencies / owner decisions: enough V1 orders and revisions to identify the actual intake failure patterns.

## Current launch plan

See `docs/LAUNCH-READINESS.md` for the audited gap list and acceptance gates. Production deployment is not equivalent to paid-funnel readiness. Clay is arranging API access; preserve raw customer detail and unlock the same song that was previewed.
