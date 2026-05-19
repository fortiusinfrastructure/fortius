import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY && process.env.NODE_ENV !== "production") {
    console.warn("⚠️ STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_dummy_key_for_build", {
    typescript: true,
});