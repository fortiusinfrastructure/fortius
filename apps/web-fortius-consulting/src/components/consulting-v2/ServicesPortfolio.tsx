"use client";

import { motion } from "framer-motion";
import {
    Search,
    FileText,
    Megaphone,
    Users,
    Network,
    UserCheck,
    BookOpen,
    Handshake,
    Monitor,
    Globe,
    Activity,
    ShieldCheck,
} from "lucide-react";
import { Bracketed } from "@/components/system/Bracketed";
import type { ServiceIcon, ServiceItem } from "@/content/home-v2";

const ICONS: Record<ServiceIcon, typeof Search> = {
    search: Search,
    fileText: FileText,
    megaphone: Megaphone,
    users: Users,
    network: Network,
    userCheck: UserCheck,
    bookOpen: BookOpen,
    handshake: Handshake,
    monitor: Monitor,
    globe: Globe,
    activity: Activity,
    shieldCheck: ShieldCheck,
};

const ease = [0.22, 0.61, 0.36, 1] as const;

interface ServicesPortfolioProps {
    title: string;
    kicker: string;
    services: ServiceItem[];
    description?: string;
}

export function ServicesPortfolio({
    title,
    kicker,
    services,
    description,
}: ServicesPortfolioProps) {
    return (
        <section
            aria-labelledby="services-portfolio-title"
            className="relative border-t border-[var(--border-subtle)] py-24 md:py-32"
        >
            <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 items-end">
                    <div className="lg:col-span-7 space-y-5">
                        <Bracketed variant="kicker">{kicker}</Bracketed>
                        <h2
                            id="services-portfolio-title"
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border-default)] border border-[var(--border-default)]">
                    {services.map((s, i) => {
                        const Icon = ICONS[s.icon];
                        return (
                            <motion.div
                                key={s.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.45, delay: (i % 3) * 0.06, ease }}
                                className="bg-[var(--surface-primary)] p-6 hover:bg-[var(--surface-secondary)] transition-colors duration-300 flex flex-col gap-5"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="inline-flex items-center justify-center w-11 h-11 border border-[var(--color-accent-500)]/30 text-[var(--color-accent-500)]">
                                        <Icon size={20} strokeWidth={1.5} aria-hidden />
                                    </span>
                                    <span className="font-display text-[0.85rem] tracking-[0.18em] uppercase text-[var(--text-tertiary)]">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-medium text-[var(--text-primary)] text-[0.98rem] leading-snug">
                                        {s.title}
                                    </h3>
                                    <p className="text-[0.875rem] text-[var(--text-secondary)] leading-relaxed">
                                        {s.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
