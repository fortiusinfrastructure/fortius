import { stripe } from "./index";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fundacionfortius.org";

export interface DonationCheckoutParams {
  amountCents: number;
  orgId: string;
  userId?: string;
  email?: string;
  successUrl?: string;
  cancelUrl?: string;
}

export async function createDonationCheckoutSession({
  amountCents,
  orgId,
  userId,
  email,
  successUrl = `${SITE_URL}/donaciones/exito?session_id={CHECKOUT_SESSION_ID}`,
  cancelUrl = `${SITE_URL}/donaciones`,
}: DonationCheckoutParams) {
  const metadata: Record<string, string> = {
    paymentType: "donation",
    orgSlug: "fortius-foundation",
    orgId,
    source: "web-fortius-foundation",
  };
  if (userId) metadata.userId = userId;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: amountCents,
          product_data: {
            name: "Donación a Fundación Fortius",
            description:
              "Tu apoyo nos permite reforzar organizaciones y acompañar proyectos con visión de largo plazo.",
          },
        },
      },
    ],
    ...(email ? { customer_email: email } : {}),
    payment_intent_data: { metadata },
    metadata,
    success_url: successUrl,
    cancel_url: cancelUrl,
    locale: "es",
    billing_address_collection: "auto",
    submit_type: "donate",
  });

  return session;
}
