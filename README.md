# The Gift Smith

The Gift Smith is the parent consumer brand for personalized gifts built from real stories and specific personal details.

The first product is **Your Song**, a personalized-song experience.

## Site structure

- `/` — The Gift Smith parent brand
- `/your-song` — Your Song product landing page
- `/create` — guided song intake
- `/preview/[id]` — private preview
- `/song/[id]` — private delivery/revision page

The parent site also shows the **Framed Song Gift** as an in-development concept so the brand can expand beyond one digital format without pretending unfinished products are available.

## Current Your Song milestone

The customer journey currently includes:

- a guided four-step intake that preserves raw customer language
- real persistence in the dedicated Digital Gifts Supabase project
- a mock music-provider adapter
- a private capability-link preview page
- a clearly labeled demo $29 checkout boundary
- a private full-song delivery page
- one persisted revision request

Suno and Stripe are deliberately not faked. They plug into existing provider/payment boundaries once official access and credentials are available.

## Local development

```bash
npm ci
npm run dev
```

The verified Digital Gifts Supabase project URL and publishable key have safe built-in fallbacks for this protected V1 flow. Secret keys never belong in source code.

## Build gate

```bash
npm run check
npm run build
```

See `AGENTS.md`, `HANDOFF.md`, `ROADMAP.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, and `docs/website-brief.md` before changing product behavior.

## Website redesign

The Gift Smith is Clay’s selected consumer name. The GitHub, Vercel and Supabase project identifiers remain Digital Gifts. The photo-led parent page routes into Your Song, with framed gifts explicitly marked in development.

Research and design decisions: `docs/website-brief.md`. Rendered desktop/mobile captures and verification notes: `docs/qa/`.
