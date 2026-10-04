# Gift experiences review, October 4

## Mobile picker and wind-up follow-up

Owner accepted the visual direction and reported that tapping Add image on mobile did not open a file manager. The original desktop label did produce a filechooser event; the physical Android/in-app failure could not be reproduced in this environment. Replaced the small native file button/wrapping label with a shared 48px native-input hit area, covering the visible button directly. No asynchronous or synthetic click is needed. Photo inputs request image/*; validation still rejects unsupported MIME types and oversize files. Preview and actual private upload use the same component, including same-file reselection and keyboard focus. This is a compatibility fix with physical-device acceptance still pending.

The existing brass wind-up key is separated with complementary CSS clipping and turns around the axle while music plays. Static body/axle, nameplate and original texture remain. Both bow and key freeze on pause/buffering/end and reduced motion. No new artwork or animation dependency. The first rendered cut included a sliver of cabinet; tightened the clip to keep the cabinet stationary.

`scripts/verify-mobile-picker-teddy.mjs` verifies actual chooser events from center/edge touchscreen taps, photo persistence through reload and gift page, exact note, changing/frozen key transforms, reduced-motion playback, no overflow and no browser errors. New 390px and 1440px renders inspected. Lint/types and build pass. Shared React review: semantic labeled native input, focus indicator, disabled state, no per-frame React updates, no extra media elements. Existing Marketing-Hub visual direction/research retained under its maintenance scope; six references and calibration anchors read through the GitHub connector because only the validator was present in the local Hub directory. No copy or offer redesign.

Three independent experiences: Record Player, Teddy Bear and Equalizer. Each offers Note, Card and Letter. Internal presentation IDs remain record, portrait and letter so existing gifts retain their selection. Existing gifts default to the original record experience. No checkout or public payment settings changed.

## Visual production

Six owner-supplied references guided this extension. The original record player source remains intact. The teddy uses a transparent 1774×887 two-tile atlas: textured plush bear, polished upright string instrument, walnut music box and blank brass plaque in tile one; articulated forearm, paw and bow in tile two. CSS overlays the forearm at the shoulder and moves it across the strings. This is a playback-driven music-box gesture, not instrument-specific transcription of the recording. The recipient name is live text and scales for longer names.

The equalizer uses a transparent 1100×1100 walnut/brass cabinet, with empty black glass and ivory plaque. Ten live segmented DOM bands occupy the glass, with logarithmic frequency centers from 32Hz to16kHz. The recipient name is live text. No simulated/random frequency motion. A single AudioContext/AnalyserNode uses the same audio element as play, pause and seek; it starts on a user gesture. Media waiting/pause/end stops animation. Reduced motion freezes decorative motion while retaining playback.

The two optimized artwork assets total 287,964 bytes. Created using built-in image generation from Clay’s supplied bear/equalizer images, then compressed with Sharp. No paid external generation API. Thumbnails are captures of the actual nine recipient layouts.

Generation brief for bear: preserve the supplied photoreal plush bear/instrument/walnut music box; transparent atlas with equal square tiles; complete body with a blank nameplate in the left tile, detached bowing arm/paw/bow in the right tile; no room, typography or sleeve. Generation brief for cabinet: isolate the reference walnut and brass hi-fi unit; straight-on front elevation and substantial realistic materials; blank rectangular black display and illuminated ivory nameplate for runtime overlays; no text, bars or background. Generated artwork is decorative product UI, not customer proof.

## Verification

- Lint, TypeScript and production build pass.
- All nine combinations rendered at 1440 and390 pixels, with bounds checks at320 and768. Complete photo does not overlap the musical object; exact note retained. All nine desktop/mobile renders visually reviewed, including contact sheets.
- Bear’s actual arm transform changes during playback and remains fixed after pause in all presentations. Reduced motion disables the animation and leaves the music working.
- Controlled 125Hz audio lights the125Hz band at0.833 and no other band. Controlled4kHz audio lights the4kHz band at0.833 and no other band. Pause zeroes the display; reduced motion keeps it still with audio playing. Checks use real Web Audio analysis of WAV fixtures, not mocked spectrum output.
- Existing full private-route browser suite passes, including saved Equalizer+Letter through recipient sharing, nonzero spectrum after the authenticated307 storage redirect, invalid-scene rejection and recipient-edit denial. The synthetic storage fixture sends the same permissive CORS header observed from this project’s actual Supabase Storage gateway. Real customer audio was not fetched for this check.
- Demo photo, note and scene survive print detour/reload. Existing record play/arm/seek checks still pass. Optional empty content and a600-character note with tall image remain usable.
- One media element, no new runtime package, no per-frame React state updates, RAF cancellation, AudioContext close and reduced-motion listener cleanup reviewed with the React best-practices skill.

Database: Digital Enterprise / Digital Gifts, hyjmlkowbhftisynztui, verified ACTIVE_HEALTHY. Additive gift_experiences migration registered20261004041130; local source filename matches observed remote registration. Existing table remains RLS-enabled and service-role-only. Real PostgreSQL synthetic transaction tested record default, independent teddy/equalizer choice with letter retained, and invalid scene rejection, then rolled back. Security advisory categories remain the existing backend RLS/no-policy information, existing executable definer functions and leaked-password-protection warning. No customer records modified. Existing advisory remediation references: https://supabase.com/docs/guides/database/database-linter and https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection .

Supabase October4 changelog reviewed: September25 Postgres minor-update warning concerns ltree/btree_gist/legacy encrypted data; this feature only adds constrained text and uses none of those operations. Primary Web Audio references: https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode and https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaElementSource .

This remains PR42’s review preview. No production rollout or paid launch. Browser coverage is Chromium desktop/mobile emulation; no physical-device Safari acceptance claimed.
