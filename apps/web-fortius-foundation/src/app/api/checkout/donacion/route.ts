import { NextResponse } from "next/server";
import { createServerClient, createAdminClient } from "@fortius/database";
import { createDonationCheckoutSession } from "@/lib/stripe/checkout";

const ORG_DOMAIN = "fundacionfortius.org";
const ORG_SLUG = process.env.NEXT_PUBLIC_ORG_SLUG ?? "fortius-foundation";

async function getOrgId(): Promise<string | null> {
  const admin = createAdminClient();
  const { data } = await admin
    .from("organizations")
    .select("id")
    .or(`domain.eq.${ORG_DOMAIN},slug.eq.${ORG_SLUG}`)
    .limit(1)
    .maybeSingle();
  return (data as { id: string } | null)?.id ?? null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as { amount?: number };
    const amount = Number(body.amount);

    if (!amount || amount < 1 || amount > 100_000) {
      return NextResponse.json(
        { error: "Importe inválido. Mínimo 1 €, máximo 100.000 €." },
        { status: 400 },
      );
    }

    const amountCents = Math.round(amount * 100);

    const orgId = await getOrgId();
    if (!orgId) {
      return NextResponse.json(
        { error: "Organización no encontrada." },
        { status: 500 },
      );
    }

    // Optional: read authenticated user session
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    const session = await createDonationCheckoutSession({
      amountCents,
      orgId,
      userId: user?.id,
      email: user?.email,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout/donacion]", err);
    return NextResponse.json(
      { error: "No se pudo crear la sesión de pago." },
      { status: 500 },
    );
  }
}
