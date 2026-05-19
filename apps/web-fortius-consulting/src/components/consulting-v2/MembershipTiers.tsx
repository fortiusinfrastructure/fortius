"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Bracketed } from "@/components/system/Bracketed";
import type { MembershipTier } from "@/content/sociedad-civil";

interface MembershipTiersProps {
    kicker?: string;
    title: string;
    description?: string;
    tiers: MembershipTier[];
    contactVertical?: string;
}

const ease = [0.22, 0.61, 0.36, 1] as const;

const formatEUR = (value: number) =>
    new Intl.NumberFormat("es-ES").format(value);

const getCheckoutPlanKey = (contactVertical: string | undefined, tierId: MembershipTier["id"]) => {
    if (contactVertical === "Sociedad Civil") return `sociedad-civil-${tierId}`;
    if (contactVertical === "Política") return `politica-${tierId}`;
    return null;
};

export function MembershipTiers({
    kicker = "Darse de Alta",
    title,
    description,
    tiers,
    contactVertical,
}: MembershipTiersProps) {
    const formatPlanLabel = (tier: MembershipTier) =>
        tier.id === "basica" ? "básico" : tier.id;

    const getTierHref = (tier: MembershipTier) => {
        const checkoutPlanKey = getCheckoutPlanKey(contactVertical, tier.id);
        if (checkoutPlanKey) return `/suscribirse?plan=${checkoutPlanKey}`;

        if (tier.href) return tier.href;

        const params = new URLSearchParams({
            subject: "Servicios",
            plan: tier.id,
        });

        if (contactVertical) {
            params.set("vertical", contactVertical);
        }

        return `/contacto?${params.toString()}`;
    };

    return (
        <section
            id="membresias"
            aria-labelledby="membership-title"
            className="relative border-t border-[var(--border-subtle)] py-24 md:py-32"
        >
            <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-14">
                    <div className="lg:col-span-7 space-y-5">
                        <Bracketed variant="kicker">{kicker}</Bracketed>
                        <h2
                            id="membership-title"
                            className="font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.08] tracking-tight text-[var(--text-primary)]"
                        >
                            {title}
                        </h2>
                    </div>
                    {description && (
                        <p className="lg:col-span-5 text-[var(--text-secondary)] leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {tiers.map((tier, i) => (
                        <motion.article
                            key={tier.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.55, delay: i * 0.1, ease }}
                            className={`relative flex flex-col p-8 lg:p-10 bg-[var(--surface-primary)] transition-colors ${
                                tier.featured
                                    ? "border-2 border-[var(--color-accent-500)]"
                                    : "border border-[var(--border-default)] hover:border-[var(--border-strong)]"
                            }`}
                        >
                            {tier.featured && (
                                <span className="absolute -top-3 left-8 inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--color-accent-500)] text-white text-[0.65rem] font-semibold uppercase tracking-[0.2em]">
                                    <Sparkles size={11} strokeWidth={2} aria-hidden />
                                    Recomendado
                                </span>
                            )}

                            <header className="space-y-3 pb-6 border-b border-[var(--border-subtle)]">
                                <div className="flex items-baseline gap-3">
                                    <h3 className="font-display text-[1.6rem] font-light tracking-tight text-[var(--text-primary)]">
                                        {tier.name}
                                    </h3>
                                    <span className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                                        Plan {formatPlanLabel(tier)}
                                    </span>
                                </div>
                                <p className="text-[0.9rem] text-[var(--text-secondary)] leading-relaxed">
                                    {tier.tagline}
                                </p>
                            </header>

                            <div className="py-6 border-b border-[var(--border-subtle)] space-y-2">
                                <div className="flex items-baseline gap-2">
                                    <span className="font-display text-[clamp(2.4rem,4vw,3.2rem)] font-light leading-none text-[var(--text-primary)]">
                                        {formatEUR(tier.priceMonthly)}€
                                    </span>
                                    <span className="text-[0.85rem] text-[var(--text-tertiary)]">
                                        / mes
                                    </span>
                                </div>
                                <p className="text-[0.8rem] uppercase tracking-[0.15em] text-[var(--color-accent-400)]">
                                    {formatEUR(tier.priceAnnual)}€ / año
                                </p>
                            </div>

                            <ul className="py-6 space-y-3 flex-1">
                                {tier.benefits.map((b) => (
                                    <li key={b.title} className="flex gap-3">
                                        <Check
                                            size={16}
                                            strokeWidth={2}
                                            className="text-[var(--color-accent-500)] shrink-0 mt-0.5"
                                            aria-hidden
                                        />
                                        <div className="space-y-0.5">
                                            <p className="text-[0.9rem] text-[var(--text-primary)] leading-snug">
                                                {b.title}
                                            </p>
                                            {b.description && (
                                                <p className="text-[0.8rem] text-[var(--text-tertiary)] leading-relaxed">
                                                    {b.description}
                                                </p>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href={getTierHref(tier)}
                                className={`mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
                                    tier.featured
                                        ? "bg-[var(--color-accent-500)] text-white hover:bg-[var(--color-accent-400)]"
                                        : "border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]"
                                }`}
                            >
                                {tier.ctaLabel}
                            </a>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
