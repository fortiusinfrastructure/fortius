import type { Metadata } from "next";
import { getConsultingBillingPlan } from "@/lib/billing/plans";

export const metadata: Metadata = {
    title: "Suscripción confirmada — Fortius Consulting",
    robots: { index: false, follow: false },
};

interface PageProps {
    searchParams: Promise<{ plan?: string }>;
}

export default async function SuscripcionExitoPage({ searchParams }: PageProps) {
    const { plan: planKey } = await searchParams;
    const plan = planKey ? getConsultingBillingPlan(planKey) : null;

    return (
        <main id="main-content" className="pt-[var(--nav-height)]">
            <section className="border-t border-[var(--border-subtle)] py-20 md:py-28">
                <div className="mx-auto max-w-3xl px-[var(--container-px)] text-center space-y-5">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-500)]">Suscripción confirmada</p>
                    <h1 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-light tracking-tight text-[var(--text-primary)]">
                        Gracias por suscribirte{plan ? ` a ${plan.displayName}` : ""}.
                    </h1>
                    <p className="text-[1rem] leading-relaxed text-[var(--text-secondary)]">
                        Stripe te enviará la confirmación y el recibo correspondiente. Si necesitas soporte comercial o coordinación de acceso, escríbenos.
                    </p>
                    <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row sm:justify-center">
                        <a href="/contacto" className="inline-flex items-center justify-center px-5 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] bg-[var(--color-accent-500)] text-white hover:bg-[var(--color-accent-400)] transition-colors">Contacto</a>
                        <a href="/" className="inline-flex items-center justify-center px-5 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors">Volver al inicio</a>
                    </div>
                </div>
            </section>
        </main>
    );
}