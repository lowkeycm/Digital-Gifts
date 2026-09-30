# Test release

Clay requested a functional Kie/Suno flow without payment on 2026-09-29. Traffic is invited testers, not paid ads. Reuse the established website design and Marketing-Hub landing-page guidance. Hub README and landing-page skill/build reference read through GitHub; context currently consists of docs/website-brief.md, AGENTS.md and Clay's explicit instructions. No new brand or offer claims.

Flow: /create (four guided steps) -> /song/[id] (status, full tracks, download, share, revision, feedback). /gift/[id] is read-only recipient access. /preview forwards beta sessions to full delivery. No checkout, payment records or fake paid state. Existing legacy demo links remain identifiable.

Preserve raw story wording. Kie's non-custom description has a 3,000-character limit; show a shared story budget and reject excess without silently summarizing or truncating. Relation-neutral questions work for siblings and parents as well as couples. Existing approved visual assets and typography remain.

One primary action per state: write story, wait, listen, then optionally revise/share. Feedback and a reaction-video URL are optional, with explicit permission separate from submitting a link. No email-delivery promise before a mail provider is configured. No voice-cloning claim in the core test release; that optional add-on requires its own verified workflow.

Backend: private beta tables and storage; server key only; random owner/read-only gift tokens; per-email/IP and global generation limits; atomic reservations; idempotent submissions; durable callbacks and polling fallback. Full generation once, no unlock-generation mismatch. Revision is a clearly labeled new rendition preserving original story and original recording.

QA gates: build/types/lint; provider contract and error/race tests; DB privileges and reservation checks; desktop/mobile rendered intake/delivery/gift; actual Kie round trip once credentials are configured. Never label simulated audio as a live provider test.
