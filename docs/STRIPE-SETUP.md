# Your Song Stripe setup

The site is prepared for a $29 USD one-time purchase with three revisions. Public generation remains available without payment. The Stripe ChatGPT app is installed and the owner reported connecting it; website payment acceptance and the connected account identity remain unverified. See [the integration plan and review](STRIPE-INTEGRATION-PLAN.md) for launch findings and Invoicing recommendations.

## Account

Create a separate ordinary **The Gift Smith** Stripe account through the account switcher in the existing login. Use **RelevAInt, LLC** as the legal entity, its actual tax information and the intended payout bank. Use **yourgiftsmith.com** as the website, with Gift Smith public contact information, branding and a recognizable statement descriptor. Owner completes account onboarding and agreements directly.

This store sells its own product; Stripe Connect is unnecessary. Stripe documents separate accounts for independently operated websites and permits multiple accounts under one legal entity and bank: https://docs.stripe.com/get-started/account/multiple-accounts.

## Sandbox first

1. In the new account's sandbox, create an event destination for **https://www.yourgiftsmith.com/api/webhooks/stripe/test**. Select `checkout.session.completed` and `checkout.session.async_payment_succeeded`.
2. Prefer a minimally scoped restricted sandbox API key. Save it as `STRIPE_TEST_SECRET_KEY` and the endpoint signing secret as `STRIPE_TEST_WEBHOOK_SECRET`, directly in sensitive Vercel environment variables for **digital-gifts** in **Pride Family Realty**, Production environment. Never paste keys in chat. Keep `CHECKOUT_MODE=free`; set `STRIPE_SITE_URL=https://www.yourgiftsmith.com`.
3. Redeploy after setting variables. Log into the private `/studio`; its sandbox status should show ready. Use **Test Stripe checkout**, which opens `/create?checkout=test`. Public `/create` stays without payment.
4. Complete the questionnaire, then use Stripe's test card `4242 4242 4242 4242`, future expiry and any valid CVC. Sandbox payment takes no money; successful music generation still consumes real Kie credits.
5. Confirm one saved paid order, one original generation job and two returned versions. Check that cancel/decline leaves the story saved with no music request, and duplicate webhook delivery does not generate again. Refresh the private song link to confirm recovery when the return page was closed. Verify three revisions and selected recipient sharing.

The backend creates the fixed product/price inside each Checkout Session. No manual product or payment link is required. Test and live credentials are isolated. Private story text and owner access keys are never sent to Stripe; only email and opaque order/song identifiers are included. Returning from Stripe uses an HttpOnly owner cookie in the same browser. If that cookie is unavailable, reopen the original private song link to reconcile the payment.

## Paid launch later

Complete activation, public support/refund information and applicable tax configuration before charging customers. Configure a live event destination at **https://www.yourgiftsmith.com/api/webhooks/stripe/live** with the same events. Save `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` for this exact Vercel project. After sandbox acceptance and owner approval to start charging, set `CHECKOUT_MODE=live` and redeploy. Existing free songs retain their original access and revisions; new public intakes require verified payment before generation.

Live payment acceptance has not been tested. Do not claim payments are connected until a hosted checkout and signed webhook succeed against this account. Email sending is also not configured; customers currently retain their private song link in the browser and share the selected gift link themselves.

## Verification evidence

`scripts/verify-stripe.mjs` exercises real source modules and the actual Stripe SDK with controlled transport. `docs/qa/stripe-server-checks.json` records signature rejection, exact amount/currency/mode/order validation, replay, expiry renewal, cookie return boundary and cross-origin rejection. It is not a substitute for the hosted sandbox acceptance above.

Sources checked October 3, 2026: https://docs.stripe.com/checkout/fulfillment, https://docs.stripe.com/webhooks, https://docs.stripe.com/api/checkout/sessions/create.
