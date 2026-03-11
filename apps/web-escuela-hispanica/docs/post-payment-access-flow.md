# Post-payment access flow

## Goal

Close the full loop with the least code possible:

1. Stripe confirms the checkout
2. the backend records the payment and ensures the member exists
3. the success page offers immediate access activation
4. email remains the fallback if the browser flow is interrupted

## Current flow

### 1. Checkout routes

- `POST /api/checkout/amigo`
- `POST /api/checkout/mecenas`
- `GET /api/admin/approve` (Académico payment link)

All success URLs now include `session_id={CHECKOUT_SESSION_ID}` so the success page can verify the completed checkout server-side.

### 2. Success page

- route: `/colabora/exito`
- reads `tier`, `session_id`, and `access`
- checks the current Supabase session

Behavior:

- if the user is already signed in, show direct continuation
- if there is a `session_id`, show the activation CTA
- if payment confirmation is still pending, explain that and keep email as fallback
- if direct activation is not available, instruct the user to use the email link

### 3. Direct activation route

- route: `/api/post-payment-access`

This route:

1. retrieves the Stripe Checkout Session
2. requires `payment_status = paid`
3. ensures the auth user exists
4. generates a Supabase magic link
5. redirects to the existing `/api/auth/callback`
6. returns the user to `/colabora/exito?access=ready`

## Responsibility split

- webhook = source of truth for payment + membership
- success page = immediate guided handoff after payment
- email = recovery path if the browser flow is interrupted

## Why this is the smallest safe design

- no new auth system
- reuses Supabase magic links
- reuses the existing auth callback
- keeps payment validation on the server
- avoids depending only on frontend state after checkout