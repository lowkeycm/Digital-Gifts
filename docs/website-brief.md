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
- Evidence: `docs/qa/*-desktop.jpg`, `*-mobile.jpg` and `local-checks.json`. Preview/delivery persistence must also be checked on the deployed preview before calling the session complete.
