# ROADMAP

Ordered product milestones. HANDOFF.md owns current status and the next task.
This file owns outcomes, dependencies and completion criteria, not session history.
Read AGENTS.md and respect the existing acknowledgment and authorization rules.

## 1. Working personalized-song V1
- Status: foundation built on `clay/v1-app-foundation`; real music and payment integrations remain.
- Result for the user: A customer can give specific personal story details, hear a personalized song preview, purchase the full song, receive it on a private delivery page and request one simple revision.
- Done when: the full intake -> generation -> preview -> payment -> delivery -> revision path works end to end on a verified Vercel preview; customer raw language is preserved into the music-generation input; data is stored only in the dedicated Digital Gifts database; failure states are visible and recoverable.
- Current proof: dedicated Supabase persistence, private preview/delivery links, mock preview/full generation, demo checkout and one persisted revision work at the data layer; Vercel preview build is READY. Rendered visual QA remains incomplete.
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
