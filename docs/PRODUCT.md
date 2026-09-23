# Product decisions: personalized-song V1

## Core promise
Tell us the real story. Hear a personalized preview. Unlock the full song for $29.

## Product rules
1. Preserve customer specificity. Do not pre-polish their story into generic AI language.
2. The music-specialized provider is the songwriter/composer. A general LLM is not the default final lyric writer.
3. Intake should pull concrete details, not literary prose.
4. V1 uses a short guided questionnaire. Adaptive follow-up questioning is V2.
5. The customer is the primary QA layer. V1 includes one simple revision rather than elaborate automated QA.
6. One revision is included with the $29 purchase.
7. Brand name, logo, legal language and exact upsells remain provisional until the funnel is validated.

## V1 funnel
Landing page -> guided intake -> preview generation -> private preview page -> $29 checkout -> full generation -> private song page -> optional revision.

## Current integration state
- Supabase: live and dedicated to Digital Gifts.
- Music: mock provider.
- Checkout: demo boundary, clearly labeled. No money is collected.
- Email: not connected.

## Explicitly deferred
- dynamic AI interviewer
- automatic lyric QA/scoring
- customer voice cloning
- physical products
- buyer accounts/dashboard
- multi-provider genre routing
