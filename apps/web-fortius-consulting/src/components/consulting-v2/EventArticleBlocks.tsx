import { getLocale, getTranslations } from "next-intl/server";
import { Check, CreditCard, Lock, MessageSquare } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Bracketed } from "@/components/system/Bracketed";
import type { Article } from "@/lib/articles";
import { getEventArticleData } from "@/lib/article-display";
import { getOpportunity, type OpportunityContent, type OpportunityPackage } from "@/content/opportunities";

type ArticleT = Awaited<ReturnType<typeof getTranslations<"article">>>;

export async function EventArticleBlocks({ article, membersOnly = false }: { article: Article; membersOnly?: boolean }) {
    const t = await getTranslations("article");
    const locale = await getLocale();

    const opportunity = getOpportunity(article.slug);
    if (opportunity) {
        return (
            <OpportunityBlocks
                opportunity={opportunity}
                eventTitle={article.title}
                locale={locale}
                t={t}
            />
        );
    }

    // Fallback: derive the event sheet from the article markdown (best-effort).
    const data = getEventArticleData(article);
    if (!data) return null;

    return (
        <section className="space-y-6">
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-6 md:p-7">
                <Bracketed variant="kicker">{t("event-sheet")}</Bracketed>
                <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InfoCard label={t("event-dates")} value={data.date ?? t("event-tbd")} />
                    <InfoCard label={t("event-location")} value={data.location ?? t("event-tbd")} />
                    <InfoCard label={t("event-organizer")} value={data.organizer ?? t("event-tbd")} />
                </div>
            </div>

            {data.packages.length > 0 && !membersOnly && (
                <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-primary)] p-6 md:p-7">
                    <Bracketed variant="kicker">{t("event-options")}</Bracketed>
                    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.packages.map((pkg) => (
                            <article key={pkg.name} className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-secondary)] p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <h3 className="font-display text-[1.2rem] font-light text-[var(--text-primary)]">
                                        {pkg.name}
                                    </h3>
                                    {pkg.price && (
                                        <span className="text-[0.8rem] uppercase tracking-[0.14em] text-[var(--color-accent-400)]">
                                            {pkg.price}
                                        </span>
                                    )}
                                </div>
                                <p className="mt-3 text-[0.92rem] leading-relaxed text-[var(--text-secondary)]">
                                    {pkg.summary ?? t("event-pkg-fallback")}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            )}

            {data.packages.length > 0 && membersOnly && (
                <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-primary)] p-6 md:p-7">
                    <Bracketed variant="kicker">{t("event-client-access")}</Bracketed>
                    <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
                        {t("event-client-desc")}
                    </p>
                </div>
            )}
        </section>
    );
}

function OpportunityBlocks({
    opportunity,
    eventTitle,
    locale,
    t,
}: {
    opportunity: OpportunityContent;
    eventTitle: string;
    locale: string;
    t: ArticleT;
}) {
    const isEn = locale === "en";
    const date = isEn ? opportunity.date_en : opportunity.date;
    const location = isEn ? opportunity.location_en : opportunity.location;
    const intro = isEn ? opportunity.intro_en : opportunity.intro;

    return (
        <section className="space-y-6">
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-6 md:p-7">
                <Bracketed variant="kicker">{t("event-sheet")}</Bracketed>
                <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InfoCard label={t("event-dates")} value={date} />
                    <InfoCard label={t("event-location")} value={location} />
                    <InfoCard label={t("event-organizer")} value={opportunity.organizer} />
                </div>
            </div>

            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-primary)] p-6 md:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <Bracketed variant="kicker">{t("event-options")}</Bracketed>
                    <span className="inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.16em] text-[var(--color-accent-400)]">
                        <Lock size={12} /> {t("clients-badge")}
                    </span>
                </div>

                <p className="mt-4 flex items-start gap-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-secondary)] px-4 py-3 text-[0.86rem] leading-relaxed text-[var(--text-secondary)]">
                    <Lock size={15} className="mt-0.5 shrink-0 text-[var(--color-accent-400)]" aria-hidden />
                    {t("event-exclusive-note")}
                </p>

                {intro && (
                    <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">{intro}</p>
                )}

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {opportunity.packages.map((pkg) => (
                        <PackageCard
                            key={pkg.name}
                            pkg={pkg}
                            eventTitle={eventTitle}
                            isEn={isEn}
                            t={t}
                        />
                    ))}
                </div>

                {opportunity.contactEmail && (
                    <p className="mt-6 text-[0.85rem] text-[var(--text-tertiary)]">
                        {t("event-contact-prefix")}{" "}
                        <a
                            href={`mailto:${opportunity.contactEmail}`}
                            className="text-[var(--color-accent-400)] underline underline-offset-4"
                        >
                            {opportunity.contactEmail}
                        </a>
                    </p>
                )}
            </div>
        </section>
    );
}

function PackageCard({
    pkg,
    eventTitle,
    isEn,
    t,
}: {
    pkg: OpportunityPackage;
    eventTitle: string;
    isEn: boolean;
    t: ArticleT;
}) {
    const name = isEn ? pkg.name_en : pkg.name;
    const description = isEn ? pkg.description_en : pkg.description;
    const includes = (isEn ? pkg.includes_en : pkg.includes) ?? [];
    const note = isEn ? pkg.note_en : pkg.note;
    const priceLabel = isEn ? pkg.priceLabel_en : pkg.priceLabel;

    const interestMessage = t("event-interest-message", { package: name, event: eventTitle });
    const interestHref =
        `/contacto?subject=${encodeURIComponent(t("event-interest-subject"))}` +
        `&plan=${encodeURIComponent(`${eventTitle} — ${name}`)}` +
        `&message=${encodeURIComponent(interestMessage)}`;

    return (
        <article
            className={`flex flex-col rounded-2xl border bg-[var(--surface-secondary)] p-5 ${
                pkg.featured ? "border-[var(--color-accent-500)]" : "border-[var(--border-subtle)]"
            }`}
        >
            <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-[1.2rem] font-light text-[var(--text-primary)]">{name}</h3>
                {pkg.price && (
                    <span className="shrink-0 whitespace-nowrap rounded-sm border border-[var(--color-accent-500)]/40 px-2.5 py-1 text-[0.78rem] font-medium text-[var(--color-accent-300)]">
                        {priceLabel ? `${priceLabel} · ${pkg.price}` : pkg.price}
                    </span>
                )}
            </div>

            {description && (
                <p className="mt-3 text-[0.9rem] leading-relaxed text-[var(--text-secondary)]">{description}</p>
            )}

            {includes.length > 0 && (
                <div className="mt-4">
                    <p className="text-[0.66rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                        {t("event-pkg-includes")}
                    </p>
                    <ul className="mt-2 space-y-1.5">
                        {includes.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-[0.88rem] leading-snug text-[var(--text-secondary)]">
                                <Check size={14} className="mt-0.5 shrink-0 text-[var(--color-accent-500)]" aria-hidden />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {note && (
                <p className="mt-3 text-[0.78rem] italic leading-relaxed text-[var(--text-tertiary)]">{note}</p>
            )}

            <div className="mt-5 flex flex-wrap gap-2.5 pt-1">
                <Link
                    href={interestHref}
                    className="inline-flex items-center gap-2 rounded-sm bg-[var(--color-accent-500)] px-4 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[var(--color-accent-400)]"
                >
                    <MessageSquare size={14} /> {t("event-cta-interested")}
                </Link>
                {pkg.checkoutUrl && (
                    <a
                        href={pkg.checkoutUrl}
                        className="inline-flex items-center gap-2 rounded-sm border border-[var(--border-strong)] px-4 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-[var(--text-primary)] transition-colors hover:border-[var(--color-accent-500)]"
                    >
                        <CreditCard size={14} /> {t("event-cta-pay")}
                    </a>
                )}
            </div>
        </article>
    );
}

function InfoCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] p-5">
            <p className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">{label}</p>
            <p className="mt-2 text-[1rem] leading-snug text-[var(--text-primary)]">{value}</p>
        </div>
    );
}
