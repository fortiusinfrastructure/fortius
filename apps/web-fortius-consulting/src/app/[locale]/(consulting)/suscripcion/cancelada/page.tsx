import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getConsultingBillingPlan } from "@/lib/billing/plans";

interface Props {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ plan?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "suscripcion" });
    return { title: t("meta-title-cancelled"), robots: { index: false, follow: false } };
}

export default async function SuscripcionCanceladaPage({ params, searchParams }: Props) {
    const { locale } = await params;
    const { plan: planKey } = await searchParams;
    const plan = planKey ? getConsultingBillingPlan(planKey) : null;
    const retryHref = plan ? `/suscribirse?plan=${plan.key}` : "/contacto";

    const t = await getTranslations({ locale, namespace: "suscripcion" });

    return (
        <main id="main-content" className="pt-[var(--nav-height)]">
            <section className="border-t border-[var(--border-subtle)] py-20 md:py-28">
                <div className="mx-auto max-w-3xl px-[var(--container-px)] text-center space-y-5">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                        {t("cancelled-kicker")}
                    </p>
                    <h1 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-light tracking-tight text-[var(--text-primary)]">
                        {plan ? t("cancelled-h1-plan", { plan: plan.displayName }) : t("cancelled-h1")}.
                    </h1>
                    <p className="text-[1rem] leading-relaxed text-[var(--text-secondary)]">
                        {t("cancelled-body")}
                    </p>
                    <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row sm:justify-center">
                        <a href={retryHref}
                            className="inline-flex items-center justify-center px-5 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] bg-[var(--color-accent-500)] text-white hover:bg-[var(--color-accent-400)] transition-colors">
                            {t("retry")}
                        </a>
                        <Link href="/contacto"
                            className="inline-flex items-center justify-center px-5 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors">
                            {t("contact")}
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
