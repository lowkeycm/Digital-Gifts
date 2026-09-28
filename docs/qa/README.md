# Website verification, 2026-09-28

## Environment
Production Next.js build in Chromium, desktop 1440x900 and mobile 390x844. Home, product and intake also checked for overflow at 320px and 768px. Supplied/generated imagery is illustrative.

## Passed
- `npm ci`, `npm run check`, `npm run build`.
- Home and product CTA routes; gallery photo/caption state; story examples; mobile menu open/navigate/close; native FAQ expansion.
- Four-step intake validation and retained answers when navigating backward; final-step transition does not trigger submission; server-error state permits retry.
- No browser runtime errors in local interaction checks.
- Live Vercel journey: synthetic story saved -> private preview -> demo unlock -> private gift page -> revision saved -> confirmation persists after reload.
- Private preview and gift pages rendered at desktop/mobile with no overflow.

## Limits
Music generation, payments and email remain unconnected. This verifies the existing mock/demo flow, not those integrations. Framed gifts cannot be ordered. No conversion-rate or user-research result is claimed.

## Evidence
The JPG files are full-page screenshots. `local-checks.json` records the local functional checks. Research provenance and design rationale are in `../website-brief.md`.

## Launch signup refinement

`launch-*.jpg` show home/product at 1440x900 and 390x844, the samples, signup and success state. `launch-checks.json` records 320/390/768/1440 overflow, playable full-length media and seeking beyond 30 seconds, exclusive playback and signup validation. Browser submit persisted the synthetic example.com QA row, confirmed by SQL; repeat with uppercase retained one row and initial source. Simulated HTTP 503 preserved input and retry succeeded. No email sent.
