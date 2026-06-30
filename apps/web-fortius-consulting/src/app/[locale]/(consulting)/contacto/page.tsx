import type { Metadata } from "next";
import { Mail, MapPin, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Bracketed } from "@/components/system/Bracketed";
import { ContactForm } from "@/components/consulting-v2/ContactForm";

interface ContactoPageProps {
    searchParams: Promise<{
        subject?: string;
        plan?: string;
        vertical?: string;
    }>;
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactoPageProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "contact" });
    return {
        title: `${t("tag")} | Fortius Consulting`,
        description: t("sub"),
    };
}

export default async function ContactoPage({ searchParams }: ContactoPageProps) {
    const t = await getTranslations("contact");
    const params = await searchParams;

    return (
        <main id="main-content" className="pt-[var(--nav-height)]">
            <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-24 md:py-36">
                <Bracketed variant="tag">{t("tag")}</Bracketed>
                <h1 className="mt-6 font-display text-[clamp(2.4rem,5.5vw,4.8rem)] font-light leading-[1.03] tracking-tight text-[var(--text-primary)] max-w-3xl">
                    {t("h1")}{" "}
                    <span className="italic text-[var(--color-accent-400)]">
                        {t("h1italic")}
                    </span>
                </h1>
                <p className="mt-8 text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                    {t("sub")}
                </p>

                <div className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-12">
                    <div className="col-span-1 lg:col-span-7">
                        <ContactForm
                            initialSubject={params.subject ?? ""}
                            contextPlan={params.plan ?? ""}
                            contextVertical={params.vertical ?? ""}
                        />
                    </div>

                    <aside className="col-span-1 lg:col-span-5 space-y-8">
                        <div className="space-y-2">
                            <Bracketed variant="kicker">{t("channel-kicker")}</Bracketed>
                            <p className="mt-4 flex items-start gap-3 font-display text-xl text-[var(--text-primary)]">
                                <Mail
                                    size={18}
                                    className="mt-1.5 shrink-0 text-[var(--color-accent-500)]"
                                    aria-hidden
                                />
                                info@fortiusconsulting.org
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Bracketed variant="kicker">{t("offices-kicker")}</Bracketed>
                            <p className="mt-4 flex items-start gap-3 font-display text-xl text-[var(--text-primary)]">
                                <MapPin
                                    size={18}
                                    className="mt-1.5 shrink-0 text-[var(--color-accent-500)]"
                                    aria-hidden
                                />
                                {t("offices-location")}
                            </p>
                            <p className="pl-7 text-[0.85rem] leading-relaxed text-[var(--text-secondary)]">
                                {t("offices-sub")}
                            </p>
                        </div>

                        <div className="pt-8 border-t border-[var(--border-subtle)]">
                            <Bracketed variant="kicker">{t("commitment-kicker")}</Bracketed>
                            <p className="mt-4 flex items-start gap-3 text-[0.85rem] leading-relaxed text-[var(--text-secondary)]">
                                <ShieldCheck
                                    size={18}
                                    className="mt-0.5 shrink-0 text-[var(--color-accent-500)]"
                                    aria-hidden
                                />
                                {t("commitment-text")}
                            </p>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}
