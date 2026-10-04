# Premium song studio review

The redesigned private studio keeps one active audio player beside the current gift task. Desktop uses an ink listening room and ivory workbench; mobile stacks them and scrolls to the selected task. The revision form is collapsed, and feedback/reaction uploads appear after an explicit gift-given action. Choosing a version does not discard other recordings.

The $29 offer uses introductory pricing without an invented former price. It retains both original full songs, three revision rounds and the personal gift page. The optional $9 lyric print has its own preview, checkout and verified entitlement; the core gift remains complete without it.

My songs remembers up to 16 valid private links in an HttpOnly cookie on the current browser. A downloaded private access file works on another device. Email recovery is implemented but hidden until RESEND_API_KEY and SONG_EMAIL_FROM are configured with a verified sending identity. No email was sent during verification. Live email delivery is still a launch dependency.

The visual walkthrough at /studio-preview is available only outside the Vercel production environment and uses supplied public sample recordings and fictional copy. Its checkout transition is simulated and labeled. The functional tests exercise the actual application routes using synthetic database/storage transport. Existing base-payment signature checks and new keepsake checks use the real Stripe SDK with controlled provider transport. No new hosted keepsake payment was completed during this work.

The additive database migration was applied only to the verified Digital Gifts project. A real rolled-back PostgreSQL transaction verified paid/selection gates, replay-safe order reservation, fixed price and note length. Browser/client roles cannot read or mutate the new purchase table or execute its reservation function. The existing advisory categories remain; the additional RLS-without-policy information is expected for a backend-only table.

An actual rasterized PDF revealed that variable WOFF2 embedding produced missing glyphs. A static regular TrueType instance of the same licensed face now powers both preview and PDF. The 8 × 10 inch export is rendered and text-checked, and the font is included in deployment tracing. Unsupported lettering or oversized content is rejected before checkout.

Verification covers desktop 1440×900, mobile 390×844, overflow at 320 and 768 pixels, playback/seek/version switching, reduced motion, persisted gift choice/note, recipient privacy, later feedback, return access, print entitlement and preview walkthrough. Browser screenshots and check outputs sit beside this review. The agent-browser CLI could not start its daemon in this environment; the actual production build was rendered and exercised in bundled Chromium through Playwright instead.

React review: native audio events drive playback state; one player remounts for version/access changes; timers and object URLs are cleaned up; server-only payment/email/PDF logic stays out of client bundles; request gates are enforced at server boundaries. Updated styles use unique player/sleeve/label selectors to avoid altering the existing public sample player or recipient turntable.

Release boundary: this is a review preview. Production rollout needs Clay's visual approval under people/clay.md and AGENTS.md section 2.7. Public checkout remains free. Paid launch is a separate decision.
