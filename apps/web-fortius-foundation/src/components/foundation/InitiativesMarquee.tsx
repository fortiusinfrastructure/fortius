import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { Bracketed } from "@/components/system/Bracketed";

const ALL_INITIATIVES = [
  {
    logoSrc: "/logos/ieam-green-399C6E.png",
    alt: "Instituto Español de Análisis Migratorio",
    href: "https://ieam.es/",
    external: true,
  },
  {
    logoSrc: "/logos/escuela-hispanica-green-troquelado.png",
    alt: "Escuela Hispánica",
    href: "https://escuelahispanica.org/",
    external: true,
  },
  {
    logoSrc: "/logos/principios-green.png",
    alt: "Principios",
    href: "https://www.principios.org/",
    external: true,
  },
  {
    logoSrc: "/logos/free-press-forum-green-2.png",
    alt: "Free Press Forum",
    href: "https://freepressforum.org/",
    external: true,
  },
  {
    logoSrc: "/logos/transatlantic-fellowship-green.png",
    alt: "Transatlantic Fellowship",
    href: "/programas/transatlantic-fellowship",
    external: false,
  },
  {
    logoSrc: "/logos/md.png",
    alt: "Mediterranean Dialogue",
    href: "https://ieam.es/",
    external: true,
  },
] as const;

export async function InitiativesMarquee() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "marquee" });

  return (
    <section
      aria-label={t("kicker")}
      className="relative py-20 md:py-24 border-t border-[var(--border-subtle)]"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <Bracketed variant="kicker">{t("kicker")}</Bracketed>
        <h2 className="mt-4 max-w-3xl font-display text-[clamp(1.6rem,3vw,2.6rem)] font-light leading-[1.1] tracking-tight text-[var(--text-primary)]">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--text-secondary)] leading-relaxed">
          {t("description")}
        </p>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-px border border-[var(--border-default)] bg-[var(--border-default)]">
          {ALL_INITIATIVES.map((item) => (
            <a
              key={item.alt}
              href={item.href}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="relative overflow-hidden flex min-h-[150px] items-center justify-center bg-[var(--surface-brand)] p-8 transition-colors hover:bg-[var(--surface-primary)] group"
            >
              <div
                className="absolute inset-0 opacity-40 transition-opacity group-hover:opacity-60"
                style={{
                  background:
                    "radial-gradient(ellipse at top right, rgba(134,239,172,0.12) 0%, transparent 48%)",
                }}
              />
              <div className="relative h-16 w-[220px] sm:h-20 sm:w-[240px]">
                <Image
                  src={item.logoSrc}
                  alt={item.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 220px, 240px"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
