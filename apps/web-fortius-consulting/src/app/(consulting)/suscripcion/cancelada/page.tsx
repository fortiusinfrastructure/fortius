import type { Metadata } from "next";
import { getConsultingBillingPlan } from "@/lib/billing/plans";

export const metadata: Metadata = {
    title: "Suscripción cancelada — Fortius Consulting",
    robots: { index: false, follow: false },
};

interface PageProps {
    searchParams: Promise<{ plan?: string }>;
}

export default async function SuscripcionCanceladaPage({ searchParams }: PageProps) {
    const { plan: planKey } = await searchParams;
    const plan = planKey ? getConsultingBillingPlan(planKey) : null;
    const retryHref = plan ? `/suscribirse?plan=${plan.key}` : "/contacto";

    return (
        <main id="main-content" className="pt-[var(--nav-height)]">
            <section className="border-t border-[var(--border-subtle)] py-20 md:py-28">
                <div className="mx-auto max-w-3xl px-[var(--container-px)] text-center space-y-5">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Suscripción cancelada</p>
                    <h1 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-light tracking-tight text-[var(--text-primary)]">
                        No se completó el checkout{plan ? ` de ${plan.displayName}` : ""}.
                    </h1>
                    <p className="text-[1rem] leading-relaxed text-[var(--text-secondary)]">
                        No se ha realizado ningún cargo. Si quieres, puedes volver a intentarlo o escribirnos para ayudarte a cerrar el alta.
                    </p>
                    <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row sm:justify-center">
                        <a href={retryHref} className="inline-flex items-center justify-center px-5 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] bg-[var(--color-accent-500)] text-white hover:bg-[var(--color-accent-400)] transition-colors">Volver a intentarlo</a>
                        <a href="/contacto" className="inline-flex items-center justify-center px-5 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors">Escríbenos</a>
                    </div>
                </div>
            </section>
        </main>
    );
}