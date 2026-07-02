import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe/index";
import { createAdminClient } from "@fortius/database";
import { sendEmail } from "@/lib/email/index";

const ORG_DOMAIN = "fundacionfortius.org";
const ORG_SLUG = process.env.NEXT_PUBLIC_ORG_SLUG ?? "fortius-foundation";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fundacionfortius.org";

// ─── Org resolution (cached per invocation) ──────────────────────────────────

let cachedOrgId: string | null | undefined;

async function getOrgId(): Promise<string | null> {
  if (cachedOrgId !== undefined) return cachedOrgId;
  const admin = createAdminClient();
  const { data } = await admin
    .from("organizations")
    .select("id")
    .or(`domain.eq.${ORG_DOMAIN},slug.eq.${ORG_SLUG}`)
    .limit(1)
    .maybeSingle();
  cachedOrgId = (data as { id: string } | null)?.id ?? null;
  return cachedOrgId;
}

// ─── Idempotency ─────────────────────────────────────────────────────────────

async function recordStripeEvent(
  eventId: string,
  eventType: string,
  organizationId: string,
): Promise<boolean> {
  const admin = createAdminClient();
  const { error } = await admin
    .from("stripe_events")
    .insert({ event_id: eventId, event_type: eventType, organization_id: organizationId });

  if (error) {
    if (error.code === "23505") return false; // duplicate — already processed
    throw error;
  }
  return true;
}

async function deleteStripeEvent(eventId: string) {
  const admin = createAdminClient();
  await admin.from("stripe_events").delete().eq("event_id", eventId);
}

// ─── User resolution ─────────────────────────────────────────────────────────

async function resolveOrInviteUser(
  email: string,
  fullName: string | null,
): Promise<string | null> {
  const admin = createAdminClient();

  // Paginate auth.users to find by email
  let page = 1;
  const perPage = 1000;
  while (true) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) break;
    const found = data.users.find((u) => u.email === email);
    if (found) return found.id;
    if (data.users.length < perPage) break;
    page++;
  }

  // Not found — invite
  const { data: invited, error: inviteError } = await admin.auth.admin.inviteUserByEmail(
    email,
    {
      redirectTo: `${SITE_URL}/area-privada`,
      data: fullName ? { full_name: fullName } : {},
    },
  );
  if (inviteError) {
    console.error("[webhook] invite error:", inviteError);
    return null;
  }
  return invited.user?.id ?? null;
}

// ─── DB writes ────────────────────────────────────────────────────────────────

async function insertPaymentHistory({
  userId,
  orgId,
  paymentIntentId,
  amountCents,
  currency,
  description,
}: {
  userId: string;
  orgId: string;
  paymentIntentId: string | null;
  amountCents: number;
  currency: string;
  description: string;
}) {
  const admin = createAdminClient();
  await admin.from("payment_history").insert({
    user_id: userId,
    organization_id: orgId,
    stripe_payment_intent_id: paymentIntentId,
    amount_cents: amountCents,
    currency: currency.toUpperCase(),
    status: "succeeded",
    description,
  });
}

async function upsertDonanteRole(userId: string, orgId: string) {
  const admin = createAdminClient();

  const { data: existing } = await admin
    .from("user_memberships")
    .select("id, role")
    .eq("user_id", userId)
    .eq("organization_id", orgId)
    .maybeSingle();

  if (existing) {
    // Only upgrade to donante — never downgrade
    if (existing.role !== "donante" && existing.role !== "admin" && existing.role !== "super_admin") {
      await admin
        .from("user_memberships")
        .update({ role: "donante", status: "active" })
        .eq("id", existing.id);
    }
  } else {
    await admin.from("user_memberships").insert({
      user_id: userId,
      organization_id: orgId,
      role: "donante",
      status: "active",
      joined_at: new Date().toISOString(),
    });
  }
}

// ─── Email ────────────────────────────────────────────────────────────────────

async function sendDonationThankYou(email: string, amountCents: number, currency: string) {
  const amount = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amountCents / 100);

  await sendEmail({
    to: email,
    subject: "Gracias por tu donación a Fundación Fortius",
    kind: "donation_thank_you",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <p style="font-size:0.85rem;text-transform:uppercase;letter-spacing:0.16em;color:#6b7280">
          Fundación Fortius
        </p>
        <h1 style="font-size:1.8rem;font-weight:300;margin-top:8px">
          Gracias por tu donación de ${amount}
        </h1>
        <p style="color:#4b5563;line-height:1.7">
          Tu apoyo nos permite reforzar organizaciones, incubar nuevas iniciativas
          y acompañar proyectos con visión de largo plazo.
        </p>
        <p style="color:#4b5563;line-height:1.7">
          Si tienes cuenta en nuestra plataforma, puedes ver el historial de tus
          donaciones en tu <a href="${SITE_URL}/area-privada" style="color:#164735">área privada</a>.
        </p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0" />
        <p style="font-size:0.8rem;color:#9ca3af">
          Fundación Fortius · <a href="${SITE_URL}" style="color:#9ca3af">${SITE_URL}</a>
        </p>
      </div>
    `,
    relatedTable: "payment_history",
  });
}

// ─── Main handler ─────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  const rawBody = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("[webhook] signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const orgId = await getOrgId();
  if (!orgId) {
    console.error("[webhook] Foundation org not found");
    return NextResponse.json({ error: "Org not found" }, { status: 500 });
  }

  // Idempotency check
  const isNew = await recordStripeEvent(event.id, event.type, orgId);
  if (!isNew) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const meta = (session.metadata ?? {}) as Record<string, string>;

      if (meta.paymentType !== "donation") {
        // Not a Foundation donation — ignore gracefully
        return NextResponse.json({ received: true, skipped: true });
      }

      const email = session.customer_details?.email ?? null;
      const fullName = session.customer_details?.name ?? null;
      const amountCents = session.amount_total ?? 0;
      const currency = session.currency ?? "eur";
      const paymentIntentId =
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : (session.payment_intent?.id ?? null);

      // Resolve user
      let userId: string | null = meta.userId ?? null;
      if (!userId && email) {
        userId = await resolveOrInviteUser(email, fullName);
      }

      if (!userId) {
        console.warn("[webhook] could not resolve user for session", session.id);
        return NextResponse.json({ received: true, warning: "no_user" });
      }

      await Promise.all([
        insertPaymentHistory({
          userId,
          orgId,
          paymentIntentId,
          amountCents,
          currency,
          description: "Donación a Fundación Fortius",
        }),
        upsertDonanteRole(userId, orgId),
      ]);

      if (email) {
        // Fire-and-forget — don't let email failure fail the webhook
        sendDonationThankYou(email, amountCents, currency).catch((err) =>
          console.error("[webhook] thank-you email failed:", err),
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[webhook] handler error:", err);
    // Delete so Stripe retries
    await deleteStripeEvent(event.id);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }
}
