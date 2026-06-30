import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getConsultingBillingPlan } from "@/lib/billing/plans";

export const robots = { index: false, follow: false };

interface Props {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ plan?: string; error?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "suscripcion" });
    return { title: t("meta-title-subscribe"), robots: { index: false, follow: false } };
}

export default async function SuscribirsePage({ params, searchParams }: Props) {
    const { locale } = await params;
    const { plan: planKey, error } = await searchParams;
    const plan = planKey ? getConsultingBillingPlan(planKey) : null;

    if (!plan) notFound();

    const t = await getTranslations({ locale, namespace: "suscripcion" });

    return (
        <main id="main-content" className="pt-[var(--nav-height)]">
            <section className="border-t border-[var(--border-subtle)] py-20 md:py-28">
                <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
                    <div className="max-w-3xl space-y-5">
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-500)]">
                            {t("kicker")}
                        </p>
                        <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.05] tracking-tight text-[var(--text-primary)]">
                            {plan.displayName}
                        </h1>
                        <p className="text-[1rem] leading-relaxed text-[var(--text-secondary)]">
                            {plan.description}
                        </p>
                        <p className="text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
                            {t("stripe-desc")}
                        </p>
                    </div>

                    {error === "checkout" && (
                        <div className="mt-8 border border-amber-500/30 bg-amber-50 px-5 py-4 text-[0.92rem] text-amber-900">
                            {t("error-checkout")}
                        </div>
                    )}

                    <div className="mt-12 grid gap-6 md:grid-cols-2">
                        {(["monthly", "annual"] as const).map((interval) => (
                            <article key={interval} className="border border-[var(--border-default)] bg-[var(--surface-primary)] p-8">
                                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                                    {interval === "monthly" ? t("monthly") : t("annual")}
                                </p>
                                <h2 className="mt-4 font-display text-[2.2rem] font-light tracking-tight text-[var(--text-primary)]">
                                    {plan.prices[interval].label}
                                </h2>
                                <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
                                    {interval === "monthly" ? t("monthly-desc") : t("annual-desc")}
                                </p>

                                <form action="/api/checkout/subscription" method="post" className="mt-8">
                                    <input type="hidden" name="plan" value={plan.key} />
                                    <input type="hidden" name="interval" value={interval} />
                                    <button
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center px-5 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] bg-[var(--color-accent-500)] text-white hover:bg-[var(--color-accent-400)] transition-colors"
                                    >
                                        {t("cta-stripe")}
                                    </button>
                                </form>
                            </article>
                        ))}
                    </div>

                    <div className="mt-10 max-w-3xl space-y-3 text-[0.92rem] leading-relaxed text-[var(--text-secondary)]">
                        <p>
                            {t("support-pre")} <Link className="underline" href="/contacto">{t("support-link")}</Link>.
                        </p>
                        <p>{t("access-note")}</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
