# Architecture

## Stack
- Next.js App Router on Vercel
- Supabase Postgres through a narrow public RPC surface
- MusicProvider adapter with mock and official-Suno placeholder
- Stripe boundary reserved for the production payment milestone

## Data path
1. `/create` posts raw customer answers to a server Route Handler.
2. Server validates with Zod and calls the constrained `create_song_intake` RPC.
3. `buildMusicBrief()` labels and guards facts but does not summarize the memories through an LLM.
4. The music provider creates a preview and the server records it through a token-checked RPC.
5. Preview and delivery pages read only the limited view returned by `get_song_session`, using an unguessable access token in the private URL.
6. Demo checkout marks the order paid and creates the mock full generation.
7. One token-checked revision request can be stored after payment.

## Supabase security model
The browser never receives direct table access. Public-schema tables have RLS enabled and table privileges are revoked from `anon` and `authenticated`. The preview app uses a publishable key to call a small set of `SECURITY DEFINER` RPC functions with explicit `anon` grants. Read and mutation functions require the per-song capability token, except initial intake creation and health check.

The Supabase security advisor warns that anonymous callers can execute these `SECURITY DEFINER` functions. That is intentional for this protected V1 preview and is documented, not ignored. Before public launch, server-only mutations such as provider generation and payment completion must move behind backend credentials/rate limits.

## Why this shape
It gives the preview deployment real persistence without waiting for server secret provisioning in Vercel. When Stripe, Suno or authenticated admin access is added, server secrets can be introduced without changing the buyer data model.
