import Stripe from "stripe";

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_dummy_key_for_build",
  { typescript: true },
);
