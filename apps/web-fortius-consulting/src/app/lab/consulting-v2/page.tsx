import type { Metadata } from "next";
import { NavV2 } from "@/components/consulting-v2/NavV2";
import { HeroEditorial } from "@/components/consulting-v2/HeroEditorial";
import { VerticalSection } from "@/components/consulting-v2/VerticalSection";
import { IdeasMarquee } from "@/components/consulting-v2/IdeasMarquee";
import { FoundationBridge } from "@/components/consulting-v2/FoundationBridge";
import { NewsletterCTA } from "@/components/consulting-v2/NewsletterCTA";
import { VERTICALS } from "@/content/home-v2";

export const metadata: Metadata = {
    title: "Fortius Consulting — v2 preview",
    robots: { index: false, follow: false },
};

export default function ConsultingV2Preview() {
    const [civil, intelligence] = VERTICALS;

    return (
        <div className="bg-[var(--surface-primary)] min-h-screen">
            <NavV2 />
            <main>
                <HeroEditorial />
                <VerticalSection vertical={civil} accentSide="left" />
                <VerticalSection vertical={intelligence} accentSide="right" />
                <IdeasMarquee />
                <FoundationBridge />
                <NewsletterCTA />
            </main>
            <footer className="py-12 border-t border-[var(--border-subtle)]">
                <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-1">
                        <span className="text-[var(--color-accent-500)] text-lg font-light">[</span>
                        <span className="flex flex-col items-center leading-none -space-y-0.5 px-1">
                            <span className="font-sans font-normal tracking-[0.22em] text-[var(--text-primary)] uppercase text-[0.95rem]">
                                Fortius
                            </span>
                            <span className="font-display tracking-[0.18em] text-[0.58rem] text-[var(--text-secondary)] uppercase">
                                Consulting
                            </span>
                        </span>
                        <span className="text-[var(--color-accent-500)] text-lg font-light">]</span>
                    </div>
                    <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                        Prototipo v2 — /lab/consulting-v2
                    </p>
                </div>
            </footer>
        </div>
    );
}
