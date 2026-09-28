# Launch interest and sample songs

The marketing pages now support a prelaunch audience: listen to real supplied samples, then sign up for the launch announcement. This does not enable paid ordering or music generation.

## Audio

Clay supplied Ebony, I Love You; The Way I See You; and Traci, My Rock. Clay explicitly approved publication after requesting complete songs. The public files are full-length 128 kbps MP3 copies with metadata removed. Originals are unchanged. No genre or backstory was inferred, and these are not presented as customer testimonials. Playback is tested technically; no subjective editorial listening review is claimed. Native controls provide keyboard seeking, volume and play/pause; no autoplay and only one track plays at a time. Load failure offers a direct file link. The native players can play and download the complete example songs.

## Signup storage and consent

- Supabase: Digital Enterprise / Digital Gifts (`hyjmlkowbhftisynztui`).
- Table: `public.song_launch_signups`, RLS enabled, no public SELECT/INSERT/UPDATE/DELETE privileges.
- `register_song_launch_interest` is intentionally callable anonymously as a tightly constrained signup endpoint. It accepts only a valid email, either marketing entry page and affirmative launch-announcement consent. No list reads or membership result.
- Duplicate case/whitespace variants keep the original consent record and return the same success response.
- Stored: email, entry page, consent version (`launch-announcement-v1`), consent timestamp, creation timestamp. No IP address or raw referrer retained.
- Route validates body size (4 KiB), email, consent, entry page, same-origin requests and honeypot. Database validation protects direct RPC calls as well.
- Global 200 new rows/hour limit is enforced under an advisory transaction lock, including direct RPC calls. This bounds growth; it is not sophisticated abuse protection. Review the cap before meaningful paid traffic and add verified bot controls if needed.
- Consent is only for the launch announcement, not a newsletter or general marketing. No email is automatically sent. Only an authorized admin/service role can export the list; exclude example.com synthetic QA entries before sending. Sending still requires an email provider and sender setup.

## Security advisor

The RLS-with-no-policies advisory is intentional: all direct public access is denied. The anonymous SECURITY DEFINER warning is also intentional for this public append-only signup function; privileges are revoked from PUBLIC and authenticated, then granted specifically to anon and service_role. Empty search_path and fully qualified table names are used. No existing RPC permissions were expanded. See [Supabase's advisory](https://supabase.com/docs/guides/database/database-linter?lint=0028_anon_security_definer_function_executable).

The connector's SQL runner is read-only and cannot switch to anon or execute the signup function. Actual public-key behavior was tested through the application HTTP route and verified by read-only database queries. This is not an untested SQL-only migration.

## Remaining launch work

Sending email, Stripe fulfillment, async music jobs, durable full-song storage/unlock/download and revision execution remain separate paid-funnel work. Delivery timing must be measured before publishing a promise. The shared top banner and ordering FAQ explain availability; actual demo routes retain necessary demo warnings.
