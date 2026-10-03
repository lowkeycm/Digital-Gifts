# Your Song owner access

The studio uses Supabase Auth email/password accounts. Human passwords are stored and verified by Auth, not deployment variables. Website server credentials still belong in Vercel.

## Owner setup

Owner identity is the recorded Clay account in people/clay.md, authorized in the backend-only song_studio_owners table. Visit /studio, choose Set up my account, enter that email and a password of at least 12 characters, then confirm the emailed link in the same browser. Subsequent logins use email/password. Forgot password sends a PKCE recovery link; /studio/password changes a password without a deploy. No other email can create a studio owner through the site.

## Provider configuration

Exact project: Digital Enterprise / Digital Gifts / hyjmlkowbhftisynztui.

Auth URL Configuration:
- Site URL: https://www.yourgiftsmith.com
- Allowed redirect: https://www.yourgiftsmith.com/studio/confirm
- Allowed recovery redirect: https://www.yourgiftsmith.com/studio/confirm?next=password

The confirmation and recovery APIs may append an sb_flow_id parameter when the provider enables concurrent PKCE flows. If enabled, allow the exact callback path with query parameters, never an unrestricted external domain. Standard ConfirmationURL email templates already work with PKCE; links must return to /studio/confirm with code.

Owner-only emails can use the default Supabase mailer only when the owner email belongs to the project organization team. Otherwise configure custom SMTP in this exact project before claiming setup/recovery work. Do not disable email verification to work around delivery. A dashboard sign-in is needed for provider URL/template/SMTP settings because the currently exposed connector has no auth-configuration operation.

## Security and verification

All account mutations require same-origin JSON. New passwords require 12 characters with matching confirmation. Eight auth requests per email/IP in a five-minute atomic window; raw email/IP never stored in attempt logs. Authenticated, confirmed provider identity is checked server-side; the first verified owner binds the allowed email to a specific Auth ID. Membership and limiter tables/RPCs are service-only and have RLS. Role claims in user_metadata, legacy gift-studio cookies, customer sessions and unconfirmed emails grant no studio access. Session refresh preserves secure HttpOnly cookies and private no-store cache headers. Logout revokes the local refresh session; password changes also revoke other refresh sessions. As with standard Supabase sessions, previously issued access tokens last until provider expiry.

Controlled integration evidence: docs/qa/studio-checks.json and studio-*.jpg. Actual production build and real Supabase SDK/SSR clients exercise signup/PKCE/login/password/recovery/logout/refresh, access denial and sandbox entry against synthetic Auth/REST transport. These do not prove real SMTP delivery or the owner's password. Real owner signup/email/login and hosted Stripe checkout remain acceptance steps after provider configuration.

Sources checked October 3, 2026: https://supabase.com/docs/guides/auth/passwords, https://supabase.com/docs/guides/auth/server-side/creating-a-client, https://supabase.com/docs/guides/auth/auth-smtp, https://supabase.com/docs/reference/javascript/auth-exchangecodeforsession.
