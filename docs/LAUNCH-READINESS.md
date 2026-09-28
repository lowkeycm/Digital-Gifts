# The Gift Smith: paid-funnel launch readiness

Recorded 2026-09-28 UTC (September 27 evening in New York). This is an implementation plan, not a claim that the paid product is complete.

## Current state

Clay explicitly authorized all pending merges and production deployment. PR #6 was already merged into the parent branch; PR #5 is now merged into foundation; PR #4 is now merged into main. Production code commit: `bdc95db2100c6c5deb9f52c5a679333096388344`.

Production: https://digital-gifts-vert.vercel.app
Hosting: Vercel / Pride Family Realty / digital-gifts (`prj_naAJ6e1cVre7JrijE52Ox8tM60Jr`). Database: Digital Enterprise / Digital Gifts (`hyjmlkowbhftisynztui`).

The site, raw-story intake, persistence, private links and saved revision requests exist. The production health check returns database OK, musicProvider mock, checkout demo. The Suno adapter throws a not-configured error; this is not a turnkey API-key integration yet. Stripe, audio delivery, email and admin are not implemented. The framed gift stays unavailable.

## Minimum launch journey

Ad -> focused Your Song page -> email and story -> generation status -> playable preview -> verified payment -> same full song -> private gift page and email -> one supported revision.

Capture email early enough to recover an interrupted flow. Keep marketing permission separate from service delivery. No buyer account or full CRM is required for V1; private, recoverable links plus a small protected order console are sufficient.

## Work that must be completed

| Area | Current code/evidence | Completion requirement |
| --- | --- | --- |
| Music adapter and jobs | `src/lib/music/suno.ts` throws; intake awaits one generate call | Implement against the selected provider's actual docs; durable job IDs, status polling or authenticated callbacks, timeouts, bounded retries and resumable UI. Preserve raw customer wording. |
| Same song before/after payment | Checkout makes another generate call with only recipient/genre | Generate and retain the intended full track, serve a separate short preview, and unlock that exact full track after payment. Do not assume a second generation reproduces the preview. Confirm provider capabilities before finalizing implementation. |
| Audio storage/player | Private pages display placeholders | Copy provider output to durable private storage; create a preview clip; playable preview/full player; authorized downloads; stable recipient link. Do not expose the full audio URL before purchase. |
| Payment | `completeDemoCheckout` marks demo order paid | Stripe Checkout, server-owned price, verified payment events, duplicate-safe processing, cancellations/refunds and separate test/live setup. Return-page navigation is not proof of payment. |
| Database protection and cost limits | Anonymous grants exist for generation and demo payment RPCs | Remove public access to privileged mutations; require backend authorization and real payment checks. Restrict generation, verify requesters, rate-limit requests, cap retries/spend, and keep secrets server-side. This must precede enabling a billable API. |
| Revision execution | `/api/revisions` only stores notes | Validate entitlement, execute a supported provider revision or a defined fallback, preserve original audio, and notify the buyer when the replacement is ready. Do not promise precise edits the provider cannot perform. |
| Email and recovery | Email is collected, nothing is sent | Verified sending domain, receipt/status and song-ready messages, private-link recovery, delivery failure handling and appropriately consented follow-up. |
| Operator controls | No admin routes | Protected order list with generation/payment/delivery status, retry/resend/revision handling and useful failure alerts. |
| Attribution | No funnel measurement integration | Persist campaign/UTM attribution, record intake/preview/checkout/paid/delivery events, connect the chosen ad platform's purchase reporting, avoid sending story text to analytics. |
| Offer and launch QA | Demo promises only | Real sample songs, approved delivery/revision/refund/support terms and privacy disclosures, production configuration, and one complete real-provider transaction plus failure/retry tests. |

## Provider details needed from Clay

The exact provider name, documentation URL and approved access plan. Confirm authentication, generation/completion interfaces, output retention, revision capabilities and permitted commercial use from that provider's documentation/agreement. Put secrets directly into the project's secret environment settings, not chat or GitHub.

The adapter can be built only against a concrete provider contract. The rest of the funnel can be implemented and tested with simulated completed/failed jobs while API access is pending, then verified with the real provider before launch.

## Domain connection

1. Provide the owned domain and registrar/DNS host. No domain has been selected or purchased in this session.
2. In Vercel choose Pride Family Realty -> digital-gifts -> Settings -> Domains -> Add Domain. Add the apex and www names, attached to production.
3. At the DNS host, set the exact A/CNAME records Vercel displays for this project. Preserve existing MX and TXT records used for email and verification; a nameserver transfer is unnecessary for a normal website connection.
4. Set one name as primary and redirect the other; verify DNS, HTTPS and access from a signed-out browser.
5. Use the final domain for application links, payment callbacks, email links and page metadata. Add the chosen email service's domain-verification records separately.

## Owner inputs and execution order

Owner inputs: domain/DNS host, correct business Stripe account, sending/support email, exact music-provider docs/access, and offer policies. Ads account IDs are needed when attribution is connected.

Recommended order: harden server/database boundaries -> generation jobs and audio lifecycle -> payment/unlock -> delivery/revisions/admin -> attribution and sample content -> real-provider acceptance test -> enable paid funnel and ads. DNS can be connected separately; connecting it does not make the demo capable of fulfillment.

Launch acceptance: raw details survive; a real song plays; the paid song matches its preview; failed/delayed jobs recover; invalid/duplicate payment callbacks cannot unlock or double-fulfill; full audio is unavailable to unpaid visitors; delivery links and emails work; the included revision completes; conversion reporting matches one purchase; abuse cannot create unlimited billable generations. No new product scope, ads, provider purchases or payment configuration was executed in this merge session.

## References checked

- Vercel domain setup: https://vercel.com/docs/domains/working-with-domains/add-a-domain
- Stripe fulfillment: https://docs.stripe.com/checkout/fulfillment
- Actual repository routes, provider adapter and migration grants inspected during this audit.
