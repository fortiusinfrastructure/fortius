import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Bracketed } from "@/components/system/Bracketed";
import {
  BENEFICIARY_BENEFITS,
  DONOR_BENEFITS,
  EXPERIENCE_COPY,
} from "@/content/site";

interface Props {
  params: Promise<{ locale: string }>;
}

const PROCESS_ES = [
  "Evaluamos la causa, el proyecto y la estructura del beneficiario.",
  "Diseñamos la ayuda, el seguimiento y los criterios de impacto.",
  "Acompañamos la ejecución con visión de largo plazo y rendición de cuentas.",
];

const PROCESS_EN = [
  "We assess the cause, the project and the grantee's structure.",
  "We design the grant, the oversight framework and the impact criteria.",
  "We support execution with a long-term vision and full accountability.",
];

function AidBox({
  id,
  kicker,
  title,
  benefits,
  ctaHref,
  ctaLabel,
  ctaVariant,
}: {
  id: string;
  kicker: string;
  title: string;
  benefits: string[];
  ctaHref: string;
  ctaLabel: string;
  ctaVariant: "solid" | "outline";
}) {
  return (
    <div className="space-y-4">
      <section
        id={id}
        className="overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface-primary)]"
      >
        <div className="border-b border-[var(--border-subtle)] bg-[var(--surface-brand)] px-8 py-7">
          <Bracketed variant="kicker">{kicker}</Bracketed>
          <p className="mt-4 max-w-xl font-display text-[1.95rem] font-light leading-[1.08] text-white">
            {title}
          </p>
        </div>

        <div className="p-8">
          <div className="grid gap-3">
            {benefits.map((item, index) => (
              <article
                key={item}
                className="grid grid-cols-[auto_1fr] gap-4 border border-[var(--border-subtle)] bg-[var(--surface-secondary)] px-4 py-4"
              >
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-300)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-[0.96rem] leading-relaxed text-[var(--text-secondary)]">
                  {item}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Link
        href={ctaHref as "/"}
        className={`inline-flex items-center gap-2 px-6 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
          ctaVariant === "solid"
            ? "bg-[var(--color-accent-500)] text-white"
            : "border border-[var(--color-accent-400)] text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]"
        }`}
      >
        {ctaLabel}
        <ArrowUpRight size={14} />
      </Link>
    </div>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ayudas" });
  return {
    title: t("meta-title"),
    description: t("meta-desc"),
  };
}

export default async function AyudasPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ayudas" });
  const isEn = locale === "en";
  const process = isEn ? PROCESS_EN : PROCESS_ES;

  return (
    <main id="main-content" className="pt-[var(--nav-height)]">
      <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-24 md:py-32">
        <Bracketed variant="tag">{t("tag")}</Bracketed>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,5.5vw,4.8rem)] font-light leading-[1.03] tracking-tight text-[var(--text-primary)]">
          {t("h1")}
        </h1>
        <p className="mt-8 max-w-3xl leading-relaxed text-[var(--text-secondary)]">
          {t("p")}
        </p>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <AidBox
            id="donantes"
            kicker={t("donantes-kicker")}
            title={t("donantes-title")}
            benefits={DONOR_BENEFITS}
            ctaHref="/donaciones"
            ctaLabel={t("donantes-cta")}
            ctaVariant="solid"
          />

          <AidBox
            id="beneficiarios"
            kicker={t("beneficiarios-kicker")}
            title={t("beneficiarios-title")}
            benefits={BENEFICIARY_BENEFITS}
            ctaHref="/registro"
            ctaLabel={t("beneficiarios-cta")}
            ctaVariant="outline"
          />
        </div>

        <section className="mt-16 border-t border-[var(--border-subtle)] pt-10">
          <Bracketed variant="kicker">{t("proceso-kicker")}</Bracketed>
          <div className="mt-6 grid gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)] md:grid-cols-3">
            {process.map((step, index) => (
              <article key={step} className="bg-[var(--surface-primary)] p-6">
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                  {t("proceso-step")} {index + 1}
                </p>
                <p className="mt-4 text-[0.96rem] leading-relaxed text-[var(--text-secondary)]">
                  {step}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-[var(--border-subtle)] pt-10">
          <Bracketed variant="kicker">{t("experiencia-kicker")}</Bracketed>
          <div className="mt-6 space-y-4 max-w-3xl">
            {EXPERIENCE_COPY.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-[var(--text-secondary)]">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
