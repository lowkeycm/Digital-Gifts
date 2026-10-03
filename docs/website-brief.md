# Website brief: V1

## Customer-ready presentation, October 2 evening New York

Owner request: remove all free-test, first-song-free and launch-signup messaging. The product should present like the normal customer experience while payment remains off. Scoped copy/conversion maintenance, not a redesign.

Before-build decisions: remove shared announcement banners and both launch signup sections; remove the unavailable framed-gift teaser from the storefront. Keep current parent/product identity, Black family homepage hero, product listening hero, full-song samples, dimensional styling and responsive navigation. Restore the owner-established $29 / full song + one revision offer. Keep Start your song and Create my song actions. FAQ answers explain delivery, download, sharing and revision behavior without launch framing. Keep AI/provider disclosure and permission consent; record a new consent version for the changed notice. Retain existing generation quotas, token access, selected gift, uploads, revision and feedback. No checkout/paywall, email promise, provider call, environment or database change.

Marketing Hub 05fe2d3421819644678754eea9dd4ebfe442d3a3 website-system and visual-contract, design-research, design-router, conversion-architecture, copy-and-claims, website-qa and editorial calibration anchors loaded from the canonical repository this session. Shared context manually resolved: only brand/assets.md is present; other declared profiles/marketing preferences absent. Current product/source, prior rendered research and owner instructions govern. Reuse established art direction/research for maintenance. React/Next guidance applies to preserving existing server/client boundaries, accessible labels and request behavior.

Acceptance: render homepage, product, complete intake and private song flow on desktop/mobile; no launch/free/test promotional copy; $29 offer consistent; mobile navigation works; intake still submits directly to generation without payment; private owner/selected-recipient sharing and playback unchanged; all API errors remain truthful without test framing; no horizontal overflow or browser errors. Use local synthetic provider/database fixtures for journey checks, no generation credits required. Existing full-site baseline retained.

Scoped rendered review: visual PASS, removed announcement bars leave clean brand headers; established editorial hero, arched photo/paper depth, record carousel and offer surface remain intact at 1440/390. Conversion PASS, no free/launch/test promotion on homepage/product/intake; $29 offer consistent; FAQ provides exact delivery/share steps; four-step form and consent lead directly to the private song page. Technical PASS, lint/type/build, real route-handler intake through synthetic database fixture, unchanged raw wording, new consent version, mobile navigation, selected-version preview/recipient isolation, playback and share fallback/cancel, no checkout requests, no runtime errors and 320/768 overflow checks. Evidence: `qa/customer-ready-{home,product,intake,songs}-*.jpg`, `qa/customer-ready-offer-*.jpg`, `qa/customer-ready-checks.json`. Database/provider fixtures are local and synthetic; no new real Kie generation or native OS message delivery is claimed. Existing owner studio/legacy demo notices remain truthful and are outside the active customer journey. React review: no new state/effects/dependencies, server/client boundaries and form labels retained; unused launch imports removed. Original full-site baseline is unchanged.


## Scoped product-brand and sharing correction, 2026-10-02

Owner direction: The Gift Smith remains the multi-product storefront. Your Song is the primary name throughout its product funnel, with parent attribution in the footer. Sender previews need a clear way to send the correct recipient link.

Scope: maintenance of established editorial/record-player design, plus utility sharing flow. Reuse the inspected project research and current typography, paper surfaces, album motif, occasion scenery, full photo frame and record motion. No new marketing redesign or claim of fresh gallery research. Hub revision 05fe2d3421819644678754eea9dd4ebfe442d3a3; loaded website-system, visual-contract, design-research, design-router, conversion-architecture, copy-and-claims, website-qa and editorial calibration. Shared profiles resolved manually: only brand/assets.md exists; current owner direction supplies the brand hierarchy.

Before-build decisions:
- Storefront / keeps The Gift Smith identity. /your-song, /create and private song/gift routes use a coordinated Your Song wordmark linking to /your-song; quiet parent attribution links home.
- Owner studio retains all versions and explicit selection. Its preview opens a new owner-authenticated /song/[id]/preview route, showing the actual selected gift plus a visible sender toolbar.
- Toolbar clearly labels private preview, offers return to editing and Send your gift. Native sharing uses only the recipient URL; copy and selectable-link fallback work without native sharing. No automatic email delivery or sent confirmation.
- Recipient /gift/[id] stays clean, showing only the chosen track/photo. A recipient token never unlocks the owner preview. Never infer sender rights from a query flag, cookie or browser storage.
- Acceptance: desktop/mobile identity and hierarchy; full-image/player regression; selected version, recipient-only share payloads, clipboard failure, native-share cancellation, missing selection, invalid/recipient credentials and unchanged parent home. No paid generation needed.


Scoped acceptance (2026-10-02): desktop/mobile screenshots in docs/qa/your-song-{brand,preview,recipient}-*.jpg inspected. Visual gate: coordinated record/serif product mark, clear cream sender toolbar over existing occasion world, full photo retained. Conversion gate: named Send your gift action, return to editing and recipient-link alternatives; no claim that opening a share sheet delivers a message. Technical gate: build/type/lint plus synthetic production-build flow, selected-track isolation, invalid-key rejection, clipboard fallback, native sharing/cancel, playback and overflow pass. See qa/your-song-sharing-checks.json for actual observations and fixture limits. This scoped maintenance review does not replace or rewrite the historical full-site contract/baseline below.

Measured 2026-09-23.

## Business objective
Turn a curious gift buyer into a completed story intake, then let the personalized preview do the selling.

## Desired perception
Personal, warm and gift-worthy. More like opening a keepsake than using an AI utility. The interface should feel crafted without making a simple purchase feel complicated.

## Research notes
- Songfinch currently positions the category around a memorable personalized gift and uses guided story collection and a dedicated song experience. Useful pattern: make the finished song feel like a destination, not a file download.
- Songfinch's current low-price instant tier validates a low-friction option alongside higher-touch products. Useful pattern: keep the entry offer simple and obvious.
- Wonderbly frames personalization as a meaningful gift made quickly and previews the personalized object before purchase. Useful pattern: show the created thing before asking for the final purchase.
- Awwwards storytelling references support strong typography, deliberate pacing and audio/storytelling as experience tools, but gallery evidence is visual inspiration rather than conversion proof.
- Direct Godly and 21st.dev examples were not reliably surfaced through the available search path in this session, so no interaction behavior from those libraries is claimed as inspected.

## Selected visual execution
**Family:** Premium/editorial with conversion-first structure.
**Interaction:** Subtle motion only.
**Scope:** Whole V1 flow.

### Composition
A two-part hero: direct emotional promise on the left and a tactile record-sleeve object on the right. The landing page then moves through a dark three-step strip, a specificity before/after explanation and one strong closing CTA. The intake switches to a focused split layout: guidance on the left, form on the right.

### Surfaces and depth
Warm paper texture, physical sleeve/card layers, slight rotations and restrained shadows. Dark ink sections create contrast. No generic glass cards or gradient wallpaper.

### Components
Pill CTAs are dimensional but familiar. The record sleeve, story slip and private song player are the signature components. Forms remain conventional and readable.

### Motion
Only hover lift and progress movement. Reduced-motion disables nonessential transitions. No scroll theater in V1.

### Distinctive decisions
The design uses the physical language of giving music: sleeve, record, story-slip energy and a private listening page. The generic-answer-versus-specific-detail section teaches customers how to give better source material and doubles as conversion education.

## Conversion journey
1. Understand: this is a song built from their real details.
2. Believe: they do not need writing skill, but specificity matters.
3. Act: complete four guided steps.
4. Experience: reach a private preview.
5. Decide: unlock for $29.
6. Recover: correct one missed detail through the included revision.

## QA target
Desktop 1440x900 and mobile 390x844. Verify home, create, preview, delivery, form submission, demo checkout, revision persistence, no horizontal overflow, focus states and reduced-motion behavior.


---

## Parent-brand extension — 2026-09-27

### Business objective
Make Digital Gifts the durable consumer brand while keeping Your Song as a focused conversion product. The parent site must explain the broader idea quickly, route visitors into the live/first product, and create honest space for future gift formats without turning into a catalog of placeholders.

### Page jobs
- **Digital Gifts /**: explain the parent idea, show the product architecture, route into Your Song.
- **/your-song**: retain the focused personalized-song sales experience.
- **/create** and private preview/delivery routes: stay product-specific and visibly connected back to Digital Gifts.

### Research evidence
- **Wonderbly homepage, inspected 2026-09-27 via current public page content:** organizes a parent personalization brand around multiple products and recipient/occasion paths, while keeping the personalization process simple and gift-outcome-led. Useful adaptation: Digital Gifts should own the broader emotional/category idea while each product keeps its own conversion page. Evidence: https://www.wonderbly.com/
- Existing personalized-song recon continues to support keeping the song product focused on the recipient reaction and specific memories rather than explaining generation technology.
- Browser-rendered interaction research was not available in this ChatGPT session. These observations are structural/content evidence, not claims about animation or live interaction behavior.

### Selected visual execution
**Family:** premium/editorial parent brand with product/demonstration moments.
**Interaction:** subtle motion only.
**Scope:** Digital Gifts parent page plus inherited Your Song visual system.

#### Composition
Parent hero pairs a direct brand promise with a layered gift still-life: framed memory concept, song card and gift tag. The page then moves through a three-product architecture, a universal personalization method, a specificity demonstration, occasion routing and a final handoff into Your Song.

#### Surfaces and depth
Reuse the warm paper/ink/rust palette so Your Song feels native to the parent brand. The parent page adds framed-object and stacked-card forms rather than inventing a second visual language.

#### Components
- Digital Gifts parent navigation
- product shelf with explicit status labels
- framed-QR concept shown as in development
- universal three-step personalization method
- Your Song retains record sleeve / listening motifs

#### Motion
Hover and small state movement only. No scroll-craft or 3D is needed for this parent page at this stage. The job is brand clarity and product routing.

#### Honesty / conversion guardrails
- Your Song is the first product but its real Suno/Stripe integrations are still incomplete.
- Framed Song Gift is labeled in development.
- Future formats are described as product space, not fabricated available offers.
- Memorial/funeral B2B positioning stays off the consumer parent page until separately decided.

### Parent-site QA target
- Root clearly reads as Digital Gifts, not Your Song renamed.
- Your Song at /your-song still reads as a focused product page.
- /create, preview and delivery remain connected to Your Song and Digital Gifts.
- No future product is presented as purchasable before it exists.
- Desktop and mobile rendered review remains required.

## The Gift Smith redesign · 2026-09-27

### Authorized direction and context
Clay rejected the earlier visual execution and requested proper Marketing-Hub research, emotional imagery integrated into the website, and the parent name The Gift Smith. Your Song remains the first product. The $29 price, one revision, raw-language intake and existing preview/delivery path come from PRODUCT.md. Music and checkout remain demo-only; framed gifts are in development. No customer reviews, sales counts or delivery promises exist to substantiate claims.

Hub loaded: root README, website-system/SKILL.md, design research/router, conversion architecture, copy/claims, website QA and direct-response editorial calibration anchors. Shared context resolved manually under the Hub's allowed fallback because a private Hub clone was unavailable: only brand/assets.md exists; positioning, culture, voice, audience, VoC, creative-kit, learnings, MARKETING.md and preferences.md are absent. Existing product docs and explicit user direction govern. No invented approved brand profile.

### Research board
Inspected live on 2026-09-27 in a rendered cloud browser. Observations are design evidence, not conversion-performance evidence.

| Reference | Evidence and observation | Adaptation |
| --- | --- | --- |
| https://www.wonderbly.com/ | Rendered hero and recipient carousel, page DOM and navigation click. Close human/product photography shares space with a concise emotional proposition; recipients and specific products provide distinct paths. | Photo-led home hero; one primary product destination; stop giving future products equal sales weight. |
| https://www.songfinch.com/ | Rendered homepage, current product language and artist cards. A prominent song CTA follows a clear explanation of what the buyer contributes and receives. Hero carousel changes the message; not needed for our single first product. | Keep one stable promise, explain story input and digital song output. Do not borrow musician-production claims, reviews or prices. |
| https://www.awwwards.com/sites/flower-dose | Search-discovered award entry; gallery record identifies the actual boutique site. | Discovery source, not claimed as a live animation inspection. |
| https://flowerdose.com.au/ | Live rendered page after scroll, navigation and full page DOM. Photography-led occasion paths and centered brand mark make a small catalog feel like a boutique. The large intro paragraph is too long for our page job. | Clear wordmark, generous image treatment and short gift-oriented labels; remove business-roadmap copy. |
| https://godly.design/website/superpower/ | Inspected full desktop/mobile gallery capture. Portrait focal points are recropped on mobile; photographic sections are offset by smaller process panels. Static gallery cannot prove animation. | Art-direct photo crop per breakpoint; alternate large image moments with compact useful guidance. |
| https://superpower.com/ | Live rendered hero and page DOM. Full photographic stage, tightly grouped main CTA and explanatory offer; photo provides dominant hierarchy. | A distinct wide photographic product hero; no health messaging or layout copied. |
| https://21st.dev/@designali-in/components/accordion-01-1 | Rendered component iframe; clicked first row and verified expanded state/answer. Numbered rows, fine rules and clear controls keep dense information scannable. | Native, keyboard-operable FAQ details with a clear plus/minus state; no package/code copied. |

Reference mobile evidence: Godly's recorded mobile layout was inspected; live mobile resizing is not exposed by the cloud browser. Our own mobile pages will be rendered locally if browser runtime succeeds, otherwise marked incomplete.

### Page jobs and journey
- `/`: help a thoughtful gift buyer recognize the idea, see Your Song as the first product, understand why specific details matter, then explore Your Song. Frame concept is secondary and explicitly unavailable.
- `/your-song`: explain the song, price/included revision, story process, demo limitation and next step into intake.
- `/create`: keep attention on the recipient and their real details, with accessible labels and clear progress; preserve the existing backend contract.
- Private preview/delivery: preserve secure links and functionality; inherit the refreshed typography and brand navigation.

### Selected execution (agent-selected under delegated redesign)
**Look:** warm editorial gift boutique. Ivory paper, deep olive, oxblood CTA and brass details; Cormorant Garamond headings with readable DM Sans body.
**Interaction:** restrained entrance motion, meaningful recipient/story example switching, concept-photo gallery and simple FAQs. No autoplay media, fake playback, scroll hijacking or 3D placeholders.
**Scope:** parent homepage, product page, shared nav/footer and intake styling/accessibility.
**Composition:** asymmetric photo-led parent hero; olive product feature; interactive handwritten-style story note; wide concept gallery; concise close. Product route uses a wide cinematic photograph, linear process and a price/FAQ decision area. No repeated generic three-card catalog.
**Depth:** inset fine borders, offset photo mat, paper note overlap and subtle material texture. Avoid gratuitous rotations, excessive shadows and checkerboard backgrounds.
**Buttons:** solid oxblood rounded rectangles, separate circular arrow detail, pressed/focus feedback; consistent high contrast. Mobile navigation exposes links via a working menu.
**Assets:** three user-requested generated frame scenes retained in an explicitly labeled concept gallery; one new generated listening scene depicts the digital gift's emotional intent. Illustrative scenes are not presented as customer testimonials. Source files are converted to WebP for delivery without altering their depicted content.
**Motion fallback:** content always server-rendered and visible; reduced-motion disables entrances and smooth scrolling. Mobile stacks copy before the photo and repositions the note to prevent face/CTA overlap.
**Alternatives considered:** a bold music-label look would shrink the parent into its first product; an immersive 3D unboxing would over-promote an unready physical product and raise asset/runtime cost. Chosen direction expresses a broader personal-gift brand with less purchase friction.

### Measure and QA
Proposed measure after a real launch: homepage-to-product click-through and intake completion; no performance uplift claimed. Check visual, conversion and technical gates independently. Inspect 1440x900 and 390x844, gallery/story/menu/FAQ states, reduced motion, overflow, images, metadata and intake progression. Build and type/lint gates required. Preview deploy only; production approval remains separate under AGENTS.md 2.7.

### Local QA results · 2026-09-28
- Visual: inspected real Chromium renders at 1440x900 and 390x844. Corrected the initial collection grid and a 320px ribbon overflow. Images are intentionally recropped on mobile; the listening faces, note and CTA remain distinct.
- Conversion: one primary route to Your Song; framing is a separate in-development concept; intended launch price and one revision are visible; demo limits are explicit above the fold and near the offer. No fabricated reviews, urgency, sales counts or performance claims.
- Interaction: story examples, gallery thumbnails, mobile navigation and native FAQ all work. Intake validates missing fields, preserves answers when going back and allows retry after server failure. Inputs have programmatic labels; errors are announced.
- Technical: lint, TypeScript and production build pass. No browser runtime errors. No horizontal overflow at 320, 390, 768 or 1440 pixels on home, product or intake. Self-hosted variable fonts and responsive WebP delivery.
- Evidence: `docs/qa/*-desktop.jpg`, `*-mobile.jpg` and `local-checks.json`. Deployed persistence was also verified, as recorded below.

### Deployed QA results · 2026-09-28
The Vercel preview for commit `c2ba9022` reached READY. Rendered home and product matched local screenshots. Through the actual UI, a synthetic story for Gift Smith QA reached its saved private preview, demo unlock, private gift page, revision request and persisted revision confirmation after reload. No real payment or email was sent. The same saved private routes were rendered locally against the existing database at 1440x900 and 390x844, with no horizontal overflow. Screenshots: `preview-*.jpg` and `song-*.jpg`.

This run exposed a pre-existing React button-reuse issue: Continue on step 3 could become the submit button during the same event, showing a premature validation message on step 4. Distinct Continue/Submit keys fix it; Enter on earlier steps now advances through validation. The regression check confirms arrival at step 4 has no error, then failed submission keeps answers and permits retry. No backend contract changed.


## Launch signup and sample refinement (2026-09-28)

Clay requested email capture, supplied three sample MP3s, fewer repeated disclaimers, a compact framed-gift teaser, practical delivery FAQs and AI disclosure. Reuse the rendered reference research above and the established cream/olive/oxblood editorial system; this is a focused conversion improvement, not a new visual direction. Read the current Marketing-Hub root, website-system, all five website references and editorial calibration. Shared context was loaded manually from the project's available brand assets and product/website documents; no complete brand profiles exist.

Page jobs: home explains personal gifts, offers audible evidence and captures launch interest; Your Song lets a gift buyer hear examples, understand the $29 planned offer and join the launch list. Primary action is launch signup; demo is secondary and labeled where entered. Preserve distinctive story examples.

Execution: cream listening section with three numbered track rows, actual full-length songs and native accessible audio controls, no autoplay; one track plays at a time. Place below the hero/product introduction, close to an oxblood signup panel with one email field and explicit launch-email consent. Compact single-line framed-gift teaser replaces the large concept gallery. Mobile stacks the introduction and track list, full-width form and touch targets. No new motion or image assets needed.

Claims: supplied music is sample work, not testimonials or proof of automated fulfillment. No inferred genre, customer story or fictional attribution. Original files stay unchanged; distribute full-length copies as explicitly approved. One top status banner and one ordering FAQ answer on marketing surfaces. Keep demo-boundary notices inside the actual demo. AI is explained once in the product FAQ. Delivery link/download are described as planned; turnaround remains unconfirmed until provider testing. No invented deadline, refund terms or scarcity.

Signup intent: permission for the launch announcement only; persist normalized email, consent version/time and entry page in the Digital Gifts database. No email is sent by signup. No ads pixels or story data are introduced. Success means persisted entry, not confirmed delivery. Measure real signup conversion after launch; no conversion uplift claimed here.

### Rendered review and copy calibration

Visual pass: compared home and product desktop/mobile renders with the established editorial direction. The three track rows carry proof without fake album art; oxblood signup panel provides a distinct conversion stop; framed-gift teaser no longer dominates. Original photo hero, olive story block and cream offer remain coherent. Desktop 1440x900 and mobile 390x844 screenshots: `docs/qa/launch-*`. Layout checks at 320/390/768/1440 passed.

Conversion pass: sample action near the hero; launch signup directly after samples; one email field, clear announcement consent, retained input on error, confirmed saved state. Demo secondary. Planned deliverables and unknown turnaround distinguished in FAQ. No urgency or customer testimonial fabricated.

Copy calibration (self-review, not performance data): Clarity 9 (hear a sample / launch signup); Specificity 8 (three actual named songs, full-length audio, $29 + revision); Voice 8 (retains specific memories and restrained emotional headings); Desire 8 (audible product and recognizable recipient); Proof 8 (real supplied music, untested delivery disclosed); Urgency 7 (honest launch reminder only); Flow 8 (hear, sign up, understand). Total 56/70. No dimensions below 7. The absence of a measured turnaround is a product limitation, not something to polish away.

Technical pass: lint/typecheck/build; playback and pause-on-other-track; actual database persistence, duplicate handling and privacy grants; invalid/oversized/cross-origin submissions; failure/retry; menu/FAQ and zero runtime errors. React review: small client islands, native media controls, no effects/fetch waterfalls or new dependencies. Clay resolved the publication blocker by explicitly approving publication and requested full songs instead of excerpts. Full-length media verification and release status are recorded in HANDOFF.

## Supplied logo integration (2026-09-28)

Clay supplied the navy/gold gift-and-music logo and asked for background removal and site integration. Reuse the established editorial direction and reference research; this is an asset replacement, not a redesign. Current Hub website-system and its five references were consulted through GitHub; shared context resolved manually from brand/assets.md and this brief because the local Hub checkout is absent. No page copy or conversion architecture changes.

Use a transparent, tightly framed WebP at 210px desktop and 150px phone widths so the entire mark remains readable alongside the signup CTA and menu. Preserve navy/gold artwork and cream/olive page surfaces. Shared header/footer carry consistent identity across the funnel. No new motion.

Visual gate: actual desktop/mobile header and footer renders inspected, transparency blends cleanly into both surfaces. Conversion gate: launch action remains visible and mobile navigation works. Technical gate: check/build pass; loaded logos, no overflow at 320/390/768/1440 on home/product/intake, home link works, zero browser runtime errors. Evidence in docs/qa/logo-*. No performance uplift claimed.

## Album carousel (2026-09-28)

Clay chose a physically scrollable 3D song selector resembling music-service thumbnails, with three explicit relationship labels. Apply the loaded Marketing-Hub website-system guidance and existing researched editorial direction; this is a scoped product-demonstration section, not a site-wide redesign or freely explored 3D scene. Keep cream typography outside, use the supplied logo's midnight navy and gold for the listening room. No WebGL or new animation library is needed for album sleeves.

Page job: let gift buyers recognize a relevant relationship, browse examples by touch/drag, and hear a complete song before joining the launch list. Native audio controls retain seeking, volume and download behavior. Selected album title, relationship and static total duration sit beside the player; inactive audio pauses. The three full files stay unchanged.

Visual execution: three square illustrated photographic album covers, HTML title overlays, subtle sleeve edges, perspective rotation and depth driven by actual horizontal scroll. Middle album initially centered so both neighboring covers are visible on desktop; phone has smaller overlapping sleeves peeking at its edges. Native scroll snap, drag, arrows and keyboard share the same scroll position. No autoplay, idle animation or scroll trapping. Reduced-motion shows flat covers and instant selection. Cover images are fictional artwork, explicitly described as illustrative rather than customer photographs.

Prototype acceptance: the final single-section prototype demonstrated native phone touch swipe in Chromium emulation, mouse drag, reverse/keyboard navigation and selection boundaries before publication. Native vertical page scrolling remains available. Three full tracks decode, seek beyond 45 seconds and remain mutually exclusive; error offers the direct full file. No overflow at 320/390/768/1440. Actual physical-device performance is unmeasured.

QA gates: visual desktop/mobile renders compared to the chosen perspective-sleeve design, with the center cover visibly forward and phone neighbors discoverable. Conversion: relationship labels, song titles, whole-song durations and familiar player are visible; next launch action remains after this section. Technical: check/build, image loads, reduced motion, pointer/keyboard/touch tests and no browser runtime errors. React review: one component, native scroll plus passive listener, rAF-coalesced transforms in refs, small state only for selected/playing track, cleaned-up observer/listener, no external dependencies or data requests beyond existing media/images. Evidence: docs/qa/carousel-room-* and carousel-checks.json.

### Thumbnail playback correction (2026-09-28)
Clay correctly identified that a music-service thumbnail should play the song directly. Whole-cover click/tap and keyboard activation now toggle play/pause; a visible gold 48px control replaces the ambiguous arrow. Selected cover and playing state are separate, and the native timeline remains available. Side-cover playback centers instantly so intermediate scroll selection cannot stop the new track. Dragging and arrow browsing do not autoplay. Rendered desktop/mobile review and focused interaction regression checks pass; evidence in docs/qa/thumbnail-*.


## Personal gift listening room, 2026-09-30

Scoped continuation of the existing funnel, not a replacement marketing homepage. Reuses the project’s previously inspected Flowerdose occasion-led warmth, Godly editorial composition, and 21st.dev accessible disclosure behavior documented above. No new conversion claim or testimonial is introduced. The record is a CSS-built dimensional object, so playback remains native and usable without WebGL. Photo is optional; authored sleeve art is the finished fallback. Contract recorded after the initial implementation and before rendered review; no claim of a pre-build gate.

```website-contract
{
  "version": 1,
  "surface": "funnel",
  "request": "Reaction videos must be uploads. The buyer chooses one version to send and keeps all versions. The gift page should show a 3D spinning record, an occasion background, and an optional uploaded image.",
  "hub_revision": "9fe5b4cdef6bf66b3c455d257e8fec4eb9676d04",
  "pages": [
    {
      "route": "/gift/[id]",
      "kind": "utility",
      "sections": [
        "dedication",
        "record",
        "player"
      ],
      "job": "Give the recipient one personal song in a memorable listening room."
    },
    {
      "route": "/song/[id]",
      "kind": "funnel",
      "sections": [
        "versions",
        "gift preparation",
        "reaction upload"
      ],
      "job": "Choose the gift version, add a photo and upload private feedback."
    },
    {
      "route": "/studio",
      "kind": "utility",
      "sections": [
        "sessions",
        "reaction review"
      ],
      "job": "Let the owner privately review uploaded reactions."
    }
  ],
  "requirements": [
    {
      "id": "selected",
      "route": "/gift/[id]",
      "category": "components",
      "sections": [
        "player"
      ],
      "source": "user",
      "acceptance": "Only the chosen version appears and can be fetched with the gift key.",
      "implementation": "Server selection and audio authorization.",
      "status": "pass",
      "observation": "Actual rendered browser flow passed; see gift-flow-checks.json. Desktop/mobile inspected; no horizontal overflow at 320, 390, 768 and 1440 pixels.",
      "evidence": [
        {
          "path": "qa/gift-recipient-1440.jpg",
          "viewport": "desktop",
          "kind": "screenshot",
          "revision": "gift-source-6dee1750b6f1d91d"
        },
        {
          "path": "qa/gift-recipient-390.jpg",
          "viewport": "mobile",
          "kind": "screenshot",
          "revision": "gift-source-6dee1750b6f1d91d"
        },
        {
          "path": "qa/gift-flow-checks.json",
          "viewport": "desktop",
          "kind": "browser-log",
          "revision": "gift-source-6dee1750b6f1d91d"
        }
      ]
    },
    {
      "id": "record",
      "route": "/gift/[id]",
      "category": "3d",
      "sections": [
        "record"
      ],
      "source": "user",
      "acceptance": "A dimensional record spins on play, stops on pause, and respects reduced motion.",
      "implementation": "CSS perspective, layered plinth, vinyl grooves, state linked to native audio.",
      "status": "pass",
      "observation": "Actual rendered browser flow passed; see gift-flow-checks.json. Desktop/mobile inspected; no horizontal overflow at 320, 390, 768 and 1440 pixels.",
      "evidence": [
        {
          "path": "qa/gift-recipient-1440.jpg",
          "viewport": "desktop",
          "kind": "screenshot",
          "revision": "gift-source-6dee1750b6f1d91d"
        },
        {
          "path": "qa/gift-recipient-390.jpg",
          "viewport": "mobile",
          "kind": "screenshot",
          "revision": "gift-source-6dee1750b6f1d91d"
        },
        {
          "path": "qa/gift-flow-checks.json",
          "viewport": "desktop",
          "kind": "browser-log",
          "revision": "gift-source-6dee1750b6f1d91d"
        },
        {
          "path": "qa/gift-reduced-motion.jpg",
          "viewport": "reduced-motion",
          "kind": "screenshot",
          "revision": "gift-source-6dee1750b6f1d91d"
        },
        {
          "path": "qa/gift-flow-checks.json",
          "viewport": "reduced-motion",
          "kind": "browser-log",
          "revision": "gift-source-6dee1750b6f1d91d"
        }
      ]
    },
    {
      "id": "occasion",
      "route": "/gift/[id]",
      "category": "imagery",
      "sections": [
        "dedication",
        "record"
      ],
      "source": "user",
      "acceptance": "Birthday, anniversary, wedding, reconnection, and just-because have distinct treatments. Optional uploaded photo appears as sleeve art.",
      "implementation": "Six authored themes and private photo URL.",
      "status": "pass",
      "observation": "Actual rendered browser flow passed; see gift-flow-checks.json. Desktop/mobile inspected; no horizontal overflow at 320, 390, 768 and 1440 pixels.",
      "evidence": [
        {
          "path": "qa/gift-recipient-1440.jpg",
          "viewport": "desktop",
          "kind": "screenshot",
          "revision": "gift-source-6dee1750b6f1d91d"
        },
        {
          "path": "qa/gift-recipient-390.jpg",
          "viewport": "mobile",
          "kind": "screenshot",
          "revision": "gift-source-6dee1750b6f1d91d"
        },
        {
          "path": "qa/gift-flow-checks.json",
          "viewport": "desktop",
          "kind": "browser-log",
          "revision": "gift-source-6dee1750b6f1d91d"
        }
      ]
    },
    {
      "id": "selection",
      "route": "/song/[id]",
      "category": "components",
      "sections": [
        "versions",
        "gift preparation"
      ],
      "source": "user",
      "acceptance": "Buyer chooses one version before sharing and retains every original and revision.",
      "implementation": "Explicit version selection and preview link.",
      "status": "pass",
      "observation": "Actual rendered browser flow passed; see gift-flow-checks.json. Desktop/mobile inspected; no horizontal overflow at 320, 390, 768 and 1440 pixels.",
      "evidence": [
        {
          "path": "qa/gift-owner-1440.jpg",
          "viewport": "desktop",
          "kind": "screenshot",
          "revision": "gift-source-6dee1750b6f1d91d"
        },
        {
          "path": "qa/gift-owner-390.jpg",
          "viewport": "mobile",
          "kind": "screenshot",
          "revision": "gift-source-6dee1750b6f1d91d"
        },
        {
          "path": "qa/gift-flow-checks.json",
          "viewport": "desktop",
          "kind": "browser-log",
          "revision": "gift-source-6dee1750b6f1d91d"
        }
      ]
    },
    {
      "id": "upload",
      "route": "/song/[id]",
      "category": "components",
      "sections": [
        "reaction upload",
        "gift preparation"
      ],
      "source": "user",
      "acceptance": "Files upload with consent, progress and retry. Photos up to 8 MB and reaction videos up to 50 MB.",
      "implementation": "Signed resumable private Storage uploads and server verification.",
      "status": "pass",
      "observation": "Actual rendered browser flow passed; see gift-flow-checks.json. Desktop/mobile inspected; no horizontal overflow at 320, 390, 768 and 1440 pixels.",
      "evidence": [
        {
          "path": "qa/gift-owner-1440.jpg",
          "viewport": "desktop",
          "kind": "screenshot",
          "revision": "gift-source-6dee1750b6f1d91d"
        },
        {
          "path": "qa/gift-owner-390.jpg",
          "viewport": "mobile",
          "kind": "screenshot",
          "revision": "gift-source-6dee1750b6f1d91d"
        },
        {
          "path": "qa/gift-flow-checks.json",
          "viewport": "desktop",
          "kind": "browser-log",
          "revision": "gift-source-6dee1750b6f1d91d"
        }
      ]
    },
    {
      "id": "private",
      "route": "/studio",
      "category": "components",
      "sections": [
        "reaction review"
      ],
      "source": "user",
      "acceptance": "Owner can view and download uploaded videos; gift recipient cannot fetch them.",
      "implementation": "Owner studio cookie or buyer key, never gift key.",
      "status": "pass",
      "observation": "Actual rendered browser flow passed; see gift-flow-checks.json. Desktop/mobile inspected; no horizontal overflow at 320, 390, 768 and 1440 pixels.",
      "evidence": [
        {
          "path": "qa/gift-studio-1440.jpg",
          "viewport": "desktop",
          "kind": "screenshot",
          "revision": "gift-source-6dee1750b6f1d91d"
        },
        {
          "path": "qa/gift-studio-390.jpg",
          "viewport": "mobile",
          "kind": "screenshot",
          "revision": "gift-source-6dee1750b6f1d91d"
        },
        {
          "path": "qa/gift-flow-checks.json",
          "viewport": "desktop",
          "kind": "browser-log",
          "revision": "gift-source-6dee1750b6f1d91d"
        }
      ]
    }
  ],
  "limitations": [],
  "build_revision": "gift-source-6dee1750b6f1d91d",
  "reviews": [
    {
      "route": "/gift/[id]",
      "status": "pass",
      "observation": "Rendered and visually inspected. The recipient record and sleeve preserve depth on phones; occasion palette and native controls remain legible. Owner selection and upload controls are usable; studio shows private video review.",
      "evidence": [
        {
          "path": "qa/gift-recipient-1440.jpg",
          "viewport": "desktop",
          "kind": "screenshot",
          "revision": "gift-source-6dee1750b6f1d91d"
        },
        {
          "path": "qa/gift-recipient-390.jpg",
          "viewport": "mobile",
          "kind": "screenshot",
          "revision": "gift-source-6dee1750b6f1d91d"
        }
      ]
    },
    {
      "route": "/song/[id]",
      "status": "pass",
      "observation": "Rendered and visually inspected. The recipient record and sleeve preserve depth on phones; occasion palette and native controls remain legible. Owner selection and upload controls are usable; studio shows private video review.",
      "evidence": [
        {
          "path": "qa/gift-owner-1440.jpg",
          "viewport": "desktop",
          "kind": "screenshot",
          "revision": "gift-source-6dee1750b6f1d91d"
        },
        {
          "path": "qa/gift-owner-390.jpg",
          "viewport": "mobile",
          "kind": "screenshot",
          "revision": "gift-source-6dee1750b6f1d91d"
        }
      ]
    },
    {
      "route": "/studio",
      "status": "pass",
      "observation": "Rendered and visually inspected. The recipient record and sleeve preserve depth on phones; occasion palette and native controls remain legible. Owner selection and upload controls are usable; studio shows private video review.",
      "evidence": [
        {
          "path": "qa/gift-studio-1440.jpg",
          "viewport": "desktop",
          "kind": "screenshot",
          "revision": "gift-source-6dee1750b6f1d91d"
        },
        {
          "path": "qa/gift-studio-390.jpg",
          "viewport": "mobile",
          "kind": "screenshot",
          "revision": "gift-source-6dee1750b6f1d91d"
        }
      ]
    }
  ]
}
```


### Live acceptance follow-up

The visual contract above records the original rendered UI revision. Subsequent transport-only fixes left its layouts and styles unchanged. Final production commit d7e8efec549d6aa8006bdd6c659f361effc84606 was inspected in the live cloud browser with a real uploaded photo, one selected revision, and successful playback/pause. `qa/gift-live-recipient.jpg` shows that production state; `qa/gift-live-checks.json` records actual photo and multi-chunk video acceptance. The live failure and corrected signed-upload endpoint are documented in the release notes, not hidden by the earlier local pass.


### Needle and full-photo correction, September 30

User's screenshots exposed a real stacking bug: the platter was raised 12px but the arm remained on the board plane; detached CSS parts also made the cartridge look disconnected. The corrected connected SVG assembly pivots at its bearing, stays 32px above the board and visibly lands on the vinyl grooves. Actual hit-testing verifies the stylus above the record during playback and outside the record when resting, on desktop and mobile. Play/pause, native player events, end and reduced motion are covered in `qa/tonearm-checks.json`.

The user's follow-up explicitly replaces the earlier overlapping photo-sleeve treatment: the complete uploaded picture must be visible. It now has a separate framed position beside the player on desktop and above it on phones, with `object-fit: contain` and a full-size view link. Its geometry does not intersect the player. No-photo gifts keep the illustrated sleeve. This is a correction to the existing gift surface, preserving its occasion palettes, typography and dimensional styling. Current scoped visual evidence: `qa/tonearm-playing-1440.jpg`, `qa/tonearm-playing-390.jpg`, and `qa/tonearm-resting.jpg`.

## 2026-10-02: distinct parent homepage hero

Scoped image maintenance reuses the established editorial photography, cream/olive palette, arched photo, paper overlap, CTA hierarchy and prior reference research. Homepage job remains explaining personal gifts and routing to Your Song. Marketing-Hub 05fe2d3421819644678754eea9dd4ebfe442d3a3 website-system and visual-contract/design-research/QA guidance applied; prior baseline remains intact.

New original illustrative image: `../public/images/personal-gift-moment.webp`, built-in image generation, not a customer photo/testimonial. Source 1122x1402, optimized WebP 157,620 bytes. Your Song's original listening image is unchanged.

Rendered review: visual PASS, warm mother/daughter exchange with faces unobscured in desktop/mobile crops and preserved paper/photo depth. Conversion PASS, Discover Your Song remains legible and reaches the product page. Technical PASS, lint/type/build, image decode, no overflow or page errors at 1440/390. Evidence: `qa/gift-smith-hero-1440.jpg`, `qa/gift-smith-hero-390.jpg`, `qa/gift-smith-hero-mobile-crop.jpg`, `qa/gift-smith-hero-checks.json`. Hub completion evidence command passed. No broad redesign or fresh gallery-research claim.

Generation prompt (built-in image tool):

Use case: photorealistic-natural. Asset: The Gift Smith personalized-gift homepage hero, a new original image, portrait 4:5 composition. A candid intimate moment between an adult daughter in her early 30s and her mother in her 60s with silver-streaked brown hair, sitting close at a wooden kitchen table. Mother holds a small cream folded personal note near her heart and smiles with moist eyes; daughter leans in beside her with a tender, delighted smile, one hand lightly on mother's upper arm. Warm late-afternoon window light, quiet real home, soft linen, ivory and muted olive clothing, honey wood, subtle film grain, natural skin texture and believable hands, premium editorial lifestyle photography. Both faces clearly visible in the upper central half, generous breathing room above heads and around shoulders for responsive cropping; lower third mostly table and soft neutral detail so overlay card will not obscure the emotion. Emotion is feeling known and loved by a thoughtful personal gift. No headphones, no phone screen, no merchandise, no frames, no gift boxes, no written text, no logos, no watermark. Unposed and understated, not exaggerated stock-photo laughter.

## 2026-10-02: parent-brand message hierarchy

Owner-confirmed direction: The Gift Smith is the broader personal-gift brand. Your Song is its first available product and leads its own funnel. Homepage job: explain gifts made from personal stories, introduce the first real offer, then route to its product page. No fictional product catalog or expanded email consent.

Maintenance within the existing researched visual system: preserve photography, arched hero, paper overlaps, green product reveal, dimensional listening room and responsive hierarchy. Hero and parent navigation lead with personal gifts. Product reveal explicitly names Your Song under Our first gift, with attributable samples immediately afterward. Existing supplied-song proof, testing offer and launch consent remain.

Marketing-Hub 05fe2d3421819644678754eea9dd4ebfe442d3a3 README, website-system, copy-and-claims, conversion-architecture and editorial calibration anchors applied alongside the established visual-contract/research/QA guidance. Shared assets reviewed manually; other brand profiles absent. This implements the user's chosen hierarchy, not a new positioning research claim.

Review: visual PASS at 1440/390, hero and product text readable with existing depth and image crop. Conversion PASS, brand promise precedes named first product, anchors and product links work, full songs play. Technical PASS, lint/type/build, no overflow/page errors, mobile navigation closes and reaches correct anchor; Your Song retains its original header/hero/sample text. Evidence `qa/gift-smith-positioning-{1440,390}.jpg`, `qa/gift-smith-positioning-product-{1440,390}.jpg`, `qa/gift-smith-positioning-checks.json`. Hub completion evidence gate passed without changing baseline. Success measure: visitor can distinguish parent brand from product; no measured conversion lift claimed.

## 2026-10-02 evening: Black family homepage hero

Owner-requested image edit in established visual direction. Built-in image generation edits the fictional mother/daughter scene to feature a Black family, preserving light, pose, composition, setting and warm mood. Asset: `../public/images/personal-gift-moment-black-family.webp`, 161,938 bytes. Not customer proof. Original asset retained; Your Song hero unchanged.

Scoped review: visual PASS, both faces and note visible at 1440/390 with retained arched/paper layering. Conversion PASS, brand/product hierarchy and product navigation retained. Technical PASS, lint/type/build, image decode, no overflow/page errors, product hero preserved. Evidence: `qa/gift-smith-black-family-1440.jpg`, `qa/gift-smith-black-family-390.jpg`, `qa/gift-smith-black-family-mobile-crop.jpg`, `qa/gift-smith-black-family-checks.json`. Routine asset maintenance reuses previous Marketing-Hub art direction and research.

Built-in image-edit prompt:

Edit the supplied fictional generated homepage lifestyle photo. Replace the two women with a Black adult daughter in her early 30s and her Black mother in her 60s. Both have warm deep brown skin, natural textured hair; daughter has a loose natural curly updo, mother has shoulder-length silver-streaked natural curls. Keep the same tender mother-and-daughter relationship, candid expressions, gaze, pose and interaction: mother holds a cream personal note near her heart, daughter gently touches her arm. Preserve composition, portrait aspect ratio, warm late-afternoon window light, understated emotional mood, ivory and olive clothes, wooden kitchen table and quiet home setting. Photorealistic editorial photography with natural skin texture and believable hands. Keep faces in upper central half with breathing room for homepage crops. No text, logos, headphones or added objects.


## 2026-10-03: optional custom music direction

Requested outcome: Customers can describe their desired sound, mood, energy, vocals, instruments, references and exclusions in ordinary language; a backend LLM translates those musical preferences into Suno direction. Their personal memories remain verbatim.

Scope: `/create` funnel utility and private owner `/studio`; routine addition to the existing ivory/olive paper form, type, buttons, responsive rows and four-step journey. An optional collapsed “Make the sound more yours” section after basic genre/vocal choices keeps the simple path intact. Expand by keyboard/tap, stack fields on mobile, short everyday examples, no technical tags in customer flow. No new marketing page, visual family, gallery research or product capability claim. Success measure: both simple and customized submissions reach real generation with saved preferences, original words and correct style/exclusions; no measured lift claimed.

Marketing-Hub 05fe2d3421819644678754eea9dd4ebfe442d3a3 website-system applied with visual-contract, design-research, design-router, conversion-architecture, copy-and-claims, website-qa and editorial judgment anchors. Existing design/reference evidence reused, baseline retained. Shared assets reviewed manually because sibling/helper is unavailable; other brand profiles absent.

Provider research checked October 3: [user-supplied Musicful guidance](https://www.musicful.ai/music-tips/suno-prompts/) is directional, not the API contract. [Suno v6 FAQ](https://help.suno.com/en/articles/13924481) describes detailed natural-language instructions; [Kie music API](https://docs.kie.ai/suno-api/generate-music/) documents V6 non-custom prompt 3000, style 1000 and negative_tags. Keep non-custom mode so Suno writes lyrics from raw story; never put songwriting instructions in a custom-mode lyrics box. [Kie Gemini 3.8 Flash chat](https://docs.kie.ai/market/gemini/gemini-3-8-flash-openai) provides text translation using the existing server key, separate from music generation. Musical guidance can describe short intro/early hook, singable phrasing and structure, but timing, exact vocal character and artist imitation are not guarantees. Artist/song references become musical attributes; no cloned voices promised.

Build plan: optional bounded schema fields; server-only validated structured translator with timeout and no tools; pass only musical fields, never names/email/memories. Save direction/model/version/usage against the already-reserved private job before submitting music. Replays cannot multiply translator/music requests; retries reuse saved matching direction. Failure before music is safely retryable. Existing style-related revisions update direction; factual/lyric corrections retain original raw instructions and existing sound. Additive nullable job JSON column, existing RLS/private access unchanged. Verify payloads, failure/retry/replay, raw words, old sessions, and rendered desktop/mobile optional states before release.

Rendered review: visual PASS at 1440x900 and 390x844. Optional section has a distinct olive paper surface, readable labels and focus states, desktop paired selections and mobile stacking; primary Continue action remains clear. Conversion PASS: collapsed by default, all fields optional, keyboard expansion, back/forward retention and empty/custom intake paths complete the same four steps without checkout. Technical PASS: lint/type/build, real production-build browser with local Supabase/storage fixture, preserved raw inputs/consent, no overflow at 320/390/768/1440 or runtime errors. Existing selected-song preview/share/playback boundaries pass. Owner-only saved direction view inspected. Evidence `qa/custom-sound-{collapsed,expanded,intake,owner}-{1440,390}.jpg`, `qa/custom-sound-checks.json`; actual source-module provider/reservation tests in `qa/music-direction-checks.json`. Supabase nullable column applied and queried successfully; pre-existing advisories unchanged (private RLS tables deliberately have no public policies, legacy demo RPC warnings are outside this change). Live provider acceptance is recorded in the PR after publication.

React review: isolated optional controlled component with functional nested state updates, native accessible details/select controls and associated labels; server-only translator is outside the client import graph. Saved output is visible only after existing owner authentication; no raw provider errors, credentials or thoughts returned to public clients. No new dependencies or payment changes.
