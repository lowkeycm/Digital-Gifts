# The Gift Smith Stripe integration plan

Reviewed October 3, 2026 against main `ddc01642d8aa8c1a2e206170a6a61d3543b5f04c`.

## Goal and current status

Sell personalized digital gifts through yourgiftsmith.com. Your Song currently offers a $29 USD one-time purchase, two original versions, three revisions, downloads and a recipient page containing the selected version. RelevAInt, LLC is the owner-provided legal entity; account identity and activation have not been verified through Stripe.

The installed Stripe app's implementation planner was run October 3, 2026 against TheGiftSmith sandbox (`acct_1UMJrORblVwGH16G`, test mode), using this business context. Guide `iguide_61VVyGl3Gm1NfmGzd41RblVwGH16G` accepted `out_of_box_hosted`: hosted Checkout, web origin. The connected app also exposes TheGiftSmith test-mode account (`acct_1UMJrFDKtoosbyUS`). The website key's actual account still needs hosted verification; never substitute accounts silently.

The existing website integration now generates two 60-second previews before checkout. A verified one-time $29 payment unlocks the same originals, MP3 downloads, three revisions and selected-version gifting. No second song generation runs in the payment webhook. Public generation remains free until the owner authorizes paid launch. Separate private sandbox entry remains owner-authenticated.

## Recommended product setup

| Need | Recommendation | Implementation status |
| --- | --- | --- |
| Standard song purchases | Stripe-hosted Checkout, one-time payment | Implemented; real sandbox acceptance pending |
| Payment receipts | Enable successful-payment receipts in the account's customer email settings | Account setting unverified |
| Custom or business orders | Stripe Invoicing from the Dashboard, initially with manual fulfillment | No invoice automation implemented |
| Paid invoice PDF after each checkout | Optional; review extra pricing before enabling | Not enabled |
| Other personalized gifts | Add catalog products/prices when their offers are defined | Future product work |

The existing checkout creates its product and price inline. A manual Payment Link or catalog product is not required for the current flow. A standalone invoice paid in Stripe does not currently unlock a song automatically; do not route funnel buyers to invoices expecting automatic generation. Future invoice automation needs its own saved order association and replay-safe fulfillment.

Stripe documents post-payment invoice creation separately from Invoicing. The public support page currently states 0.4% of the transaction, capped at $2 USD per invoice, in addition to payment processing. For $29, that calculation is $0.116, approximately 12 cents. Verify the account's actual pricing before enabling it. Ordinary receipts meet the basic proof-of-payment need without choosing this optional invoice feature.

## Review of existing integration

| Area | Finding | Action |
| --- | --- | --- |
| API and SDK | Instance-based Stripe 23.0.0; installed SDK uses `2026-09-30.endive` | Retain pinned SDK; match webhook event version when configuring destination |
| Price and entitlement | Backend owns 2900 USD cents and three revisions | Retain; client cannot choose price |
| Privacy | Stripe receives email and opaque IDs, not memories or private song keys | Retain |
| Credentials | Separate test/live variables; restricted and secret key prefixes supported | Prefer a minimally scoped restricted key in sensitive Vercel variables |
| Payment verification | Exact checkout ID, order/song IDs, mode, currency, amount and paid status checked | Retain |
| Webhook authenticity | Actual SDK verifies raw-body signatures and mode | Retain; configure real endpoint secret |
| Replay | Checkout idempotency, saved paid state and atomic generation reservation | Retain; verify concurrent real deliveries |
| Return-page recovery | Server reconciliation exists; webhook can fulfill without browser return | Retain; validate closed-return and missing-cookie cases |
| Long-running work | Music begins before purchase; payment webhook only validates and persists access | Generation retains existing claim/callback/reconciliation recovery; no music work in webhook |
| Payment methods | Dashboard-managed dynamic methods; completed and async success events verified | Async payment failure/retry UX remains a paid-launch acceptance item if delayed methods are enabled |
| Checkout tracking | Stable `your-song-preview-qmzlfnra` label | Implemented with eight-letter suffix |
| Receipt and invoice emails | No account settings verified; no automatic invoice creation | Configure receipts; choose optional invoice PDFs separately |
| Refunds and disputes | No app lifecycle handling | Define owner workflow and record status; do not automatically revoke gifts or refund without a product decision |
| Song delivery email | Private link retained in browser; no automated delivery email | Add reliable owner-link delivery and recovery before broad paid traffic |
| Taxes and discounts | Current verifier requires exact $29 total | Any tax/discount implementation must validate line-item subtotal and authorized total separately; confirm registrations before enabling automatic tax |

The durable-worker change must preserve the existing claim protections and uncertain-submission handling. Never blindly retry a music submission whose provider outcome is unknown. An in-process callback alone is not a durable recovery mechanism.

## Connection sequence

Target only **digital-gifts** (`prj_naAJ6e1cVre7JrijE52Ox8tM60Jr`) in Vercel **Pride Family Realty**, serving **www.yourgiftsmith.com**. Database remains Digital Enterprise / Digital Gifts (`hyjmlkowbhftisynztui`).

1. Confirm the intended Stripe account's public brand, legal entity, payout bank, support information and activation in the Dashboard. Use a separate sandbox for integration testing.
2. Create a restricted sandbox key. Start with Checkout Sessions read/write and the resources required by inline product/price creation; use actual sandbox request logs to identify additional permissions. Do not grant payouts, transfers, refunds or account administration to the website key. Successful creation and retrieval with this key are the acceptance test, not prefix validation.
3. Create a sandbox event destination at `https://www.yourgiftsmith.com/api/webhooks/stripe/test` for `checkout.session.completed` and `checkout.session.async_payment_succeeded`. Use the installed API version and copy this destination's signing secret.
4. Save the key in `STRIPE_TEST_SECRET_KEY` and signing secret in `STRIPE_TEST_WEBHOOK_SECRET`, as sensitive Production environment variables for the exact Vercel project. Set `STRIPE_SITE_URL=https://www.yourgiftsmith.com`; retain `CHECKOUT_MODE=free`. No publishable key is needed for this redirect-based integration. Never put secrets in chat or source code.
5. Redeploy, then use the private `/studio` sandbox checkout link. Its readiness indicator checks configuration format, not Stripe permissions or delivery. Complete an actual hosted sandbox checkout.
6. Record acceptance evidence below. Address the launch findings, then configure separate live credentials and `/api/webhooks/stripe/live`. Enable `CHECKOUT_MODE=live` only after owner authorization to charge customers.

Access policies must match the application's actual egress. Do not restrict a dynamic Vercel deployment to a guessed fixed IP.

## Required hosted sandbox acceptance

- Successful $29 checkout saves payment and unlocks the existing previewed originals, even if the buyer closes the return page.
- Cancellation and a declined payment preserve previews and do not unlock full songs.
- Duplicate and concurrent webhook deliveries do not repeat provider spend; wrong mode, signature, amount or order cannot grant access.
- Interrupted processing recovers from saved paid state; ambiguous provider outcomes never cause blind resubmission.
- Buyer retains both versions, can use all three revisions and shares only the selected version. Recipient cannot access owner controls.
- Key permissions, webhook delivery and customer receipt behavior are checked against this account. Stripe does not automatically send sandbox receipts; test their delivery manually.

Sandbox payments do not charge money. The current music backend still uses real Kie generation credits.

## Evidence and limits

`node scripts/verify-stripe.mjs` was rerun successfully: nine checks against actual payment modules and real Stripe SDK signature validation, with controlled database and Stripe transport. These verify local behavior, not hosted Stripe acceptance. This review made no runtime or customer-facing changes.

## Official sources

- Agent skills and fallback installation: https://docs.stripe.com/skills.md
- Checkout fulfillment: https://docs.stripe.com/checkout/fulfillment.md?payment-ui=stripe-hosted
- Fast webhook acknowledgement: https://docs.stripe.com/webhooks/quickstart
- Dynamic payment methods: https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods
- Key permissions, environments and access policies: https://docs.stripe.com/keys
- Receipts and optional paid invoices: https://docs.stripe.com/receipts
- Invoicing: https://docs.stripe.com/invoicing
- Post-payment invoice pricing: https://support.stripe.com/questions/pricing-for-post-payment-invoices-for-one-time-purchases-via-checkout-and-payment-links

## Account-default Checkout compatibility (October 3, 2026)

The actual sandbox account defaults new Checkout Sessions to Managed Payments. Its product-tax-code requirement blocked this ordinary direct-sale Checkout integration. Session creation explicitly sets `managed_payments: { enabled: false }`, retaining the accepted hosted Checkout plan and $29 USD price. This is a per-session setting; it does not alter account-wide configuration. Dashboard-managed payment methods remain enabled. Merchant tax obligations and live launch acceptance remain separate launch decisions.

Official reference: https://docs.stripe.com/payments/managed-payments/update-checkout

Hosted creation acceptance: PR40/main `424938f8f128fdf9a3bdd3f715541d833eb93870`, production `dpl_5LcmJdrHBN9ojuPJF3YVLqa1NaPT`. Actual saved request shows both 60-second previews, and its Unlock button opens Stripe-hosted Your Song/$29 sandbox checkout. Stripe confirms one open/unpaid test session with Managed Payments explicitly disabled, on the planner's GiftSmith sandbox account. Saved database order is bound, with one original job and two tracks/two clips. No sandbox payment submitted yet; webhook/full-song unlock acceptance remains for the owner. No real charge or public paid-launch setting changed.
