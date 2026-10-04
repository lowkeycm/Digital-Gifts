# Premium song studio review

The redesigned private studio keeps one active audio player beside the current gift task. Desktop uses an ink listening room and ivory workbench; mobile stacks them and scrolls to the selected task. The revision form appears only during melody selection. Sharing reveals a reaction/feedback reminder and a persistent return link near the top of the studio, without claiming delivery. Choosing a version does not discard other recordings.

At the owner’s explicit October 4 direction, the offer shows $59 struck through beside a highlighted $29 Introductory price. It retains both original full songs, three revision rounds and the personal gift page. The optional $9 lyric print has its own preview, checkout and verified entitlement; the core gift remains complete without it.

My songs remembers up to 16 valid private links in an HttpOnly cookie on the current browser. A downloaded private access file works on another device. Email recovery is implemented but hidden until RESEND_API_KEY and SONG_EMAIL_FROM are configured with a verified sending identity. No email was sent during verification. Live email delivery is still a launch dependency.

The visual walkthrough at /studio-preview is available only outside the Vercel production environment and uses supplied public sample recordings and fictional copy. Its checkout transition is simulated and labeled. The functional tests exercise the actual application routes using synthetic database/storage transport. Existing base-payment signature checks and new keepsake checks use the real Stripe SDK with controlled provider transport. No new hosted keepsake payment was completed during this work.

The additive database migration was applied only to the verified Digital Gifts project. A real rolled-back PostgreSQL transaction verified paid/selection gates, replay-safe order reservation, fixed price and note length. Browser/client roles cannot read or mutate the new purchase table or execute its reservation function. The existing advisory categories remain; the additional RLS-without-policy information is expected for a backend-only table.

An actual rasterized PDF revealed that variable WOFF2 embedding produced missing glyphs. A static regular TrueType instance of the same licensed face now powers both preview and PDF. The 8 × 10 inch export is rendered and text-checked, and the font is included in deployment tracing. Unsupported lettering or oversized content is rejected before checkout.

Verification covers desktop 1440×900, mobile 390×844, overflow at 320 and 768 pixels, playback/seek/version switching, reduced motion, persisted gift choice/note, recipient privacy, later feedback, return access, print entitlement and preview walkthrough. Browser screenshots and check outputs sit beside this review. The agent-browser CLI could not start its daemon in this environment; the actual production build was rendered and exercised in bundled Chromium through Playwright instead.

React review: native audio events drive playback state; one player remounts for version/access changes; timers and object URLs are cleaned up; server-only payment/email/PDF logic stays out of client bundles; request gates are enforced at server boundaries. Recipient templates have scoped selectors; the public sample player remains separate.

Release boundary: this is a review preview. Production rollout needs Clay's visual approval under people/clay.md and AGENTS.md section 2.7. Public checkout remains free. Paid launch is a separate decision.


## October 4 review corrections

Removed the requested filler and the manual payment-check button. The checkout CTA is “Unlock their song · $29”; both recordings are described as melodies of the same lyrics. Melody selection requests playback in the existing single player. Step two offers Photo, Record and Letter styles and places the $9 print before Continue to sharing. Revisions are absent after step one.

The previous design preview used local component state, object URLs and a static recipient sample. The updated preview uses one IndexedDB-backed draft across the studio, print detour and recipient page, including the photo Blob. Navigation flushes pending writes. The real owner flow continues to persist through its existing authenticated API, now including an allowlisted template and a sharing-reminder timestamp. Recipient media still uses the recipient capability and only the selected photo.

Three rendered gift layouts use the exact note, recipient name and chosen song title without generic relationship commentary. Photos use contain sizing; the record layout places the record beside the photo without covering it. Record rotation follows actual playback and respects reduced motion. The demo uses existing sample recordings, not newly generated matched-melody audio.

Production-build Chromium checks cover the reported photo/note detour plus full reload, template persistence, all three recipient layouts at 1440 and 390 pixels and overflow at 320/768, autoplay, revision disappearance and post-share return access. Actual owner/recipient routes use synthetic REST/storage transport, with a ready photo fixture and decoded image. Original deployed source was rebuilt separately: its static gift view omitted the chosen photo and note; the before-state observations are in studio-review-reproduction.json. The independent base-payment, keepsake and customer-access scripts also pass.

Database migration gift_templates_and_share_reminder is registered as 20261004023221 in the verified Digital Gifts project. A real rollback transaction confirmed template/timestamp persistence and rejection of unsupported template values. RLS remains enabled, with no anon SELECT or authenticated UPDATE privilege. Security advisory categories are unchanged: 14 backend-only RLS/no-policy informational findings, six existing definer warnings and the existing leaked-password-protection warning.

Visual review found an unreadable dark brand mark and cramped text on the small record. Removed the extra recipient header and the repeated name from the small record label. The gift now opens directly with For [name]. The only remaining non-personal content is functional player/download/lyrics controls and a small footer attribution.


## Record-player restoration after owner rejection

The owner rejected the flattened templates. Functional correctness did not make them a suitable replacement for the original dimensional record page. This correction restores the original cabinet, plinth, grooved vinyl, continuous metal tonearm, sleeve and lighting from 9d1609a. All three options use that player, with an occasion-colored record room, a brass photo frame or layered stationery. The photo stays fully visible outside the player. No generic relationship commentary returns. Template thumbnails are captures of the actual recipient layouts.

The final renders were compared to the original record page on desktop and mobile. The record, frame, paper and control surfaces retain coherent materials and cast shadows; the long note expands the paper instead of hiding customer content. The player remains complete without a photo or note. Custom brass play/seek controls replace the disconnected native bar. A global input border initially surrounded the seek track; corrected and verified in the final build.

`npm run check` and production build pass. The existing full browser suite passes all 15 checks, including real private routes under controlled transport, upload/note persistence through the print detour and reload, recipient-only access, mobile step navigation and sharing reminders. Added checks verify actual record playback, continuous arm movement/return, pause, keyboard seek and reduced-motion playback in all three styles. `verify-gift-restoration.mjs` captures the final recipient and picker layouts, checks nonoverlapping image/player bounds at 1440/390/320/768, plus a tall photo, 600-character note and empty optional content. Final renders: gift-record/portrait/letter, gift-picker, gift-record-no-photo and gift-letter-long-note. Test fixture photos/copy are only sample content.

React review: one audio element, playback state from media events, native labeled range input, accessible play/pause names, per-instance SVG gradient IDs, no new runtime dependencies or API changes. Motion-off keeps physical depth and working controls. Database, payment settings and public checkout mode were not changed by this correction. This remains a review preview; technical and rendered checks do not substitute for Clay's visual acceptance.


## Three independent experiences

Owner expansion now adds Teddy Bear and Equalizer beside the preserved Record Player. Each offers Note, Card and Letter. Full visual, playback and persistence evidence is in [gift-experiences-notes.md](gift-experiences-notes.md). This supersedes the earlier rule that every experience must use a record player, while retaining that exact player in all three Record Player presentations.
