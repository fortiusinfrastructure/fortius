/**
 * /area-privada/cuenta — Ajustes básicos de la cuenta del cliente.
 * Server Component: identidad, plan y entrada al Stripe Customer Portal.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CreditCard, Mail, UserRound, ExternalLink } from "lucide-react";
import { requirePrivateUser } from "@/lib/auth";
import { getMemberDashboardData } from "@/lib/private/queries";
import { Bracketed } from "@/components/system/Bracketed";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Ajustes de cuenta — Fortius Consulting",
    robots: { index: false, follow: false },
};

function formatTierLabel(tier: string | null) {
    if (!tier) return "Sin plan";
    return tier.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function formatDate(iso: string | null) {
    if (!iso) return null;
    return new Date(iso).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" });
}

const ERROR_MESSAGES: Record<string, string> = {
    "sin-suscripcion": "No encontramos una suscripción de Stripe asociada a tu cuenta. Si crees que es un error, escríbenos a info@fortiusconsulting.org.",
    portal: "No se pudo abrir el portal de facturación. Inténtalo de nuevo en unos minutos.",
};

export default async function CuentaPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    const [user, { error }] = await Promise.all([requirePrivateUser(), searchParams]);
    const data = await getMemberDashboardData(user.id, user.orgId);

    const isActive = (data.subscription?.stripeStatus ?? data.status) === "active";
    const renewalDate = formatDate(data.subscription?.currentPeriodEnd ?? null);
    const willCancel = data.subscription?.cancelAtPeriodEnd;
    const errorMessage = error ? ERROR_MESSAGES[error] : null;

    return (
        <div className="pt-[var(--nav-height)] pb-24 min-h-screen bg-[var(--color-neutral-1000,#0a111e)]">
            <div className="mx-auto max-w-3xl px-[var(--container-px)] pt-16 md:pt-24">
                <Link
                    href="/area-privada"
                    className="inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.15em] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                >
                    <ArrowLeft size={13} aria-hidden /> Volver al área privada
                </Link>

                <div className="mt-8">
                    <Bracketed variant="kicker">Ajustes de cuenta</Bracketed>
                    <h1 className="mt-4 font-display text-[clamp(1.8rem,3vw,2.6rem)] font-light text-[var(--text-primary)]">
                        Tu cuenta
                    </h1>
                </div>

                {errorMessage && (
                    <p className="mt-6 border border-[var(--color-accent-500)] bg-[rgba(233,71,72,0.08)] p-4 text-[0.85rem] text-[var(--text-primary)]">
                        {errorMessage}
                    </p>
                )}

                {/* Perfil */}
                <section className="mt-10 border border-[var(--border-default)] bg-[var(--color-neutral-900)] p-6">
                    <h2 className="flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                        <UserRound size={14} aria-hidden /> Perfil
                    </h2>
                    <dl className="mt-4 space-y-3 text-[0.9rem]">
                        <div className="flex flex-col sm:flex-row sm:gap-4">
                            <dt className="w-40 shrink-0 text-[var(--text-tertiary)]">Nombre</dt>
                            <dd className="text-[var(--text-primary)]">{user.fullName ?? "—"}</dd>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:gap-4">
                            <dt className="w-40 shrink-0 text-[var(--text-tertiary)]">Email</dt>
                            <dd className="text-[var(--text-primary)]">{user.email}</dd>
                        </div>
                    </dl>
                    <p className="mt-4 text-[0.78rem] text-[var(--text-tertiary)]">
                        Para cambiar tu nombre o email, escríbenos a{" "}
                        <a href="mailto:info@fortiusconsulting.org" className="text-[var(--color-accent-400)] hover:opacity-80">
                            info@fortiusconsulting.org
                        </a>.
                    </p>
                </section>

                {/* Suscripción */}
                <section id="suscripcion" className="mt-8 border border-[var(--border-default)] bg-[var(--color-neutral-900)] p-6 scroll-mt-[calc(var(--nav-height)+16px)]">
                    <h2 className="flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                        <CreditCard size={14} aria-hidden /> Suscripción
                    </h2>
                    <dl className="mt-4 space-y-3 text-[0.9rem]">
                        <div className="flex flex-col sm:flex-row sm:gap-4">
                            <dt className="w-40 shrink-0 text-[var(--text-tertiary)]">Plan</dt>
                            <dd className="text-[var(--text-primary)]">{formatTierLabel(data.tier ?? user.tier)}</dd>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:gap-4">
                            <dt className="w-40 shrink-0 text-[var(--text-tertiary)]">Estado</dt>
                            <dd style={{ color: isActive ? "#10b981" : "#9ca3af" }}>{isActive ? "Activa" : "Inactiva"}</dd>
                        </div>
                        {renewalDate && (
                            <div className="flex flex-col sm:flex-row sm:gap-4">
                                <dt className="w-40 shrink-0 text-[var(--text-tertiary)]">
                                    {willCancel ? "Expira el" : "Próxima renovación"}
                                </dt>
                                <dd className="text-[var(--text-primary)]">{renewalDate}</dd>
                            </div>
                        )}
                    </dl>

                    {data.subscription ? (
                        <form method="POST" action="/api/billing/portal" className="mt-6">
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 px-5 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.15em] bg-[var(--color-accent-500)] text-white hover:bg-[var(--color-accent-400)] transition-colors"
                            >
                                Gestionar suscripción <ExternalLink size={13} aria-hidden />
                            </button>
                            <p className="mt-3 text-[0.78rem] text-[var(--text-tertiary)]">
                                Se abrirá el portal seguro de Stripe: método de pago, facturas y cancelación.
                            </p>
                        </form>
                    ) : (
                        <p className="mt-6 text-[0.85rem] text-[var(--text-tertiary)]">
                            Tu acceso no está vinculado a una suscripción de Stripe.
                            {user.role === "admin" ? " Las cuentas de administrador no tienen suscripción." : ""}
                        </p>
                    )}
                </section>

                {/* Soporte */}
                <section className="mt-8 border border-[var(--border-subtle)] p-6">
                    <h2 className="flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                        <Mail size={14} aria-hidden /> Soporte
                    </h2>
                    <p className="mt-3 text-[0.85rem] text-[var(--text-secondary)]">
                        ¿Dudas sobre tu plan o tu relación con Fortius? Contacta con coordinación en{" "}
                        <a href="mailto:info@fortiusconsulting.org" className="text-[var(--color-accent-400)] hover:opacity-80">
                            info@fortiusconsulting.org
                        </a>.
                    </p>
                </section>
            </div>
        </div>
    );
}
