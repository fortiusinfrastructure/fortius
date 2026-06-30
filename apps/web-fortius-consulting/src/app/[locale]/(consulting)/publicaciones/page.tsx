import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { InsightsGrid } from "@/components/consulting-v2/InsightsGrid";
import { Bracketed } from "@/components/system/Bracketed";
import { fetchArticles } from "@/lib/articles-db";

export const revalidate = 600;

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "publicaciones" });
    return { title: t("meta-title"), description: t("meta-desc") };
}

export default async function PublicacionesPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "publicaciones" });
    const articles = await fetchArticles();

    return (
        <main id="main-content" className="pt-[var(--nav-height)]">
            {/* Page header */}
            <section className="border-b border-[var(--border-subtle)] py-16 md:py-24">
                <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
                    <Bracketed variant="kicker">{t("kicker")}</Bracketed>
                    <h1 className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.1] tracking-tight text-[var(--text-primary)]">
                        {t("h1")}
                    </h1>
                    <p className="mt-4 max-w-2xl text-[1rem] text-[var(--text-secondary)] leading-relaxed">
                        {t("desc-pre")}{" "}
                        <span className="inline-flex items-center gap-1 font-semibold text-[var(--text-primary)]">
                            🔒 {t("locked-label")}
                        </span>{" "}
                        {t("desc-post")}
                    </p>

                    {/* Legend */}
                    <div className="mt-8 flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2.5">
                            <span className="inline-block w-3 h-3 rounded-full bg-[var(--color-accent-500)]" />
                            <span className="text-[0.75rem] uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                                {t("open-label")}
                            </span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <span className="inline-block w-3 h-3 rounded-full bg-[var(--text-tertiary)] opacity-50" />
                            <span className="text-[0.75rem] uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                                {t("members-label")}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <InsightsGrid
                articles={articles}
                includePrivate
                kicker={t("all-kicker")}
                title={t("all-title")}
            />
        </main>
    );
}
