# Digital Gifts

V1 of a consumer digital-gifts platform, starting with personalized songs.

## Current milestone

The customer journey is real end to end with:

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
npm install
npm run dev
```

The verified Digital Gifts Supabase project URL and publishable key have safe built-in fallbacks for this public V1 flow. Secret keys never belong in source code.

## Build gate

```bash
npm run check
npm run build
```

See `AGENTS.md`, `HANDOFF.md`, `ROADMAP.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, and `docs/website-brief.md` before changing product behavior.
