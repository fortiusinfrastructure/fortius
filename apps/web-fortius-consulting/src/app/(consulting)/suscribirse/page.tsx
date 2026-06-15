import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getConsultingBillingPlan } from "@/lib/billing/plans";

export const metadata: Metadata = {
    title: "Suscribirse | Fortius Consulting",
    robots: { index: false, follow: false },
};

interface PageProps {
    searchParams: Promise<{ plan?: string; error?: string }>;
}

export default async function SuscribirsePage({ searchParams }: PageProps) {
    const { plan: planKey, error } = await searchParams;
    const plan = planKey ? getConsultingBillingPlan(planKey) : null;

    if (!plan) notFound();

    return (
        <main id="main-content" className="pt-[var(--nav-height)]">
            <section className="border-t border-[var(--border-subtle)] py-20 md:py-28">
                <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
                    <div className="max-w-3xl space-y-5">
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-500)]">
                            Suscripción
                        </p>
                        <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.05] tracking-tight text-[var(--text-primary)]">
                            {plan.displayName}
                        </h1>
                        <p className="text-[1rem] leading-relaxed text-[var(--text-secondary)]">
                            {plan.description}
                        </p>
                        <p className="text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
                            El pago y la gestión de la suscripción se harán en Stripe. Allí se te pedirán los datos de facturación y de pago.
                        </p>
                    </div>

                    {error === "checkout" && (
                        <div className="mt-8 border border-amber-500/30 bg-amber-50 px-5 py-4 text-[0.92rem] text-amber-900">
                            No se pudo abrir el checkout. Revisa la configuración del precio en Stripe o escríbenos desde contacto.
                        </div>
                    )}

                    <div className="mt-12 grid gap-6 md:grid-cols-2">
                        {(["monthly", "annual"] as const).map((interval) => (
                            <article key={interval} className="border border-[var(--border-default)] bg-[var(--surface-primary)] p-8">
                                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                                    {interval === "monthly" ? "Mensual" : "Anual"}
                                </p>
                                <h2 className="mt-4 font-display text-[2.2rem] font-light tracking-tight text-[var(--text-primary)]">
                                    {plan.prices[interval].label}
                                </h2>
                                <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
                                    {interval === "monthly"
                                        ? "Ideal si prefieres empezar con una cuota recurrente mensual."
                                        : "Ideal si prefieres dejar resuelta la suscripción del año completo desde el inicio."}
                                </p>

                                <form action="/api/checkout/subscription" method="post" className="mt-8">
                                    <input type="hidden" name="plan" value={plan.key} />
                                    <input type="hidden" name="interval" value={interval} />
                                    <button
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center px-5 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] bg-[var(--color-accent-500)] text-white hover:bg-[var(--color-accent-400)] transition-colors"
                                    >
                                        Continuar en Stripe
                                    </button>
                                </form>
                            </article>
                        ))}
                    </div>

                    <div className="mt-10 max-w-3xl space-y-3 text-[0.92rem] leading-relaxed text-[var(--text-secondary)]">
                        <p>
                            Si necesitas coordinación de acceso, factura o soporte comercial, puedes escribirnos desde <a className="underline" href="/contacto">Contacto</a>.
                        </p>
                        <p>
                            El acceso al Área Privada todavía se está conectando con el sistema de suscripciones. Por ahora, el alta económica puede cerrarse ya en Stripe de forma real y segura.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}