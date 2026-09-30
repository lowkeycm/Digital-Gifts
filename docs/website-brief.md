# Website brief: V1

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
