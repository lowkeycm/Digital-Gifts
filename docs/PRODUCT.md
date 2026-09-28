# The Gift Smith product architecture

## Parent brand

**The Gift Smith** is the parent brand for personalized gifts built from real stories, memories, photos and specific personal details.

Products should be able to share the same underlying personalization infrastructure without forcing every offer to look or sound like the same product.

## Product 1: Your Song

**Your Song** is the first The Gift Smith product.

### Core promise
Tell us the real story. Hear a personalized preview. Unlock the full song for $29.

### Product rules
1. Preserve customer specificity. Do not pre-polish their story into generic AI language.
2. The music-specialized provider is the songwriter/composer. A general LLM is not the default final lyric writer.
3. Intake should pull concrete details, not literary prose.
4. V1 uses a short guided questionnaire. Adaptive follow-up questioning is V2.
5. The customer is the primary QA layer. V1 includes one simple revision rather than elaborate automated QA.
6. One revision is included with the $29 purchase.
7. Clay selected The Gift Smith as the parent consumer name. The visual identity is a preview proposal. Legal language and exact upsells remain unapproved.

### Funnel
The Gift Smith parent site -> Your Song product page -> guided intake -> preview generation -> private preview page -> $29 checkout -> full generation -> private song page -> optional revision.

### Current integration state
- Supabase: live and dedicated to Digital Gifts.
- Music: mock provider.
- Checkout: demo boundary, clearly labeled. No money is collected.
- Email: not connected.

## Product 2 concept: Framed Song Gift

Status: **in development, not a live offer.**

Working concept:
- customer photo or designed print
- discreet QR code / private URL
- scan opens the song experience
- intended to create a physical unboxing/reveal moment around the digital song

Open work:
- actual frame/print format
- fulfillment partner and sample quality
- packaging/unboxing quality
- pricing and margin
- permanent QR/link architecture
- whether it is an upsell inside Your Song or a separate The Gift Smith product

Do not advertise it as available until fulfillment is proven.

## Future The Gift Smith rule

New products belong under The Gift Smith only when they share the core idea: the recipient should recognize themselves in the gift because of details the giver supplied.

Do not create product cards merely to make the parent site look full. The website should label unreleased formats honestly and add them only when there is a real product behind them.

## Separate-channel concept

Memorial/funeral personalization is a potentially separate B2B brand/channel using some of the same infrastructure. Do not place funeral-home positioning on the main The Gift Smith consumer site without a separate product/brand decision.

## Explicitly deferred
- dynamic AI interviewer
- automatic lyric QA/scoring
- customer voice cloning
- automated physical fulfillment
- buyer accounts/dashboard
- multi-provider genre routing
