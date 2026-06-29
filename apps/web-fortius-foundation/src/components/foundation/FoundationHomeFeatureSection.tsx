import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Bracketed } from "@/components/system/Bracketed";

interface FeatureCard {
  label: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
}

interface FeatureItem {
  label: string;
  title: string;
  description: string;
  href: string;
  meta?: string;
}

interface FoundationHomeFeatureSectionProps {
  kicker: string;
  title: string;
  linkLabel: string;
  linkHref: string;
  feature: FeatureCard;
  items: FeatureItem[];
}

export function FoundationHomeFeatureSection({
  kicker,
  title,
  linkLabel,
  linkHref,
  feature,
  items,
}: FoundationHomeFeatureSectionProps) {
  return (
    <section className="border-t border-[var(--border-subtle)] py-20 md:py-28">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <Bracketed variant="kicker">{kicker}</Bracketed>
            <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.2vw,3.6rem)] font-light leading-[1.05] tracking-tight text-[var(--text-primary)]">
              {title}
            </h2>
          </div>
          <Link
            href={linkHref}
            className="hidden items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] md:inline-flex"
          >
            {linkLabel}
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <Link
            href={feature.href}
            className="group block border border-[var(--border-subtle)] bg-[var(--surface-primary)] p-8 transition-colors hover:bg-[var(--surface-secondary)] lg:col-span-7 lg:p-10"
          >
            <Bracketed variant="tag">{feature.label}</Bracketed>
            <h3 className="mt-6 font-display text-[clamp(1.8rem,3vw,2.8rem)] font-light leading-[1.08] tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--color-accent-300)]">
              {feature.title}
            </h3>
            <p className="mt-5 max-w-2xl leading-relaxed text-[var(--text-secondary)]">
              {feature.description}
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)] transition-colors group-hover:text-[var(--text-primary)]">
              {feature.ctaLabel}
              <ArrowUpRight size={14} />
            </span>
          </Link>

          <div className="flex flex-col divide-y divide-[var(--border-subtle)] lg:col-span-5">
            {items.map((item) => (
              <Link
                key={`${item.href}-${item.title}`}
                href={item.href}
                className="group py-5 first:pt-0"
              >
                <div className="space-y-2">
                  <Bracketed variant="tag">{item.label}</Bracketed>
                  {item.meta && (
                    <p className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                      {item.meta}
                    </p>
                  )}
                  <h3 className="font-display text-[1.25rem] font-light leading-[1.18] text-[var(--text-primary)] transition-colors group-hover:text-[var(--color-accent-300)]">
                    {item.title}
                  </h3>
                  <p className="text-[0.92rem] leading-relaxed text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}