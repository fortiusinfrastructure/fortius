import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Bracketed } from "@/components/system/Bracketed";
import { AYUDAS } from "@/content/ayudas";

export async function AyudasSneak() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "ayudas" });
  const open = AYUDAS.filter((a) => a.status === "open");
  if (!open.length) return null;

  return (
    <section className="border-t border-[var(--border-subtle)] py-24 md:py-32">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div className="space-y-4">
            <Bracketed variant="kicker">{t("beneficiarios-cta")}</Bracketed>
            <h2 className="max-w-2xl font-display text-[clamp(1.9rem,3.8vw,3.2rem)] font-light leading-[1.06] tracking-tight text-[var(--text-primary)]">
              {t("beneficiarios-title")}
            </h2>
          </div>
          <Link
            href="/registro"
            className="hidden md:inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shrink-0"
          >
            {locale === "en" ? "Request access" : "Solicitar acceso"}
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)] sm:grid-cols-2">
          {open.map((ayuda) => (
            <Link
              key={ayuda.slug}
              href="/registro"
              className="group block overflow-hidden bg-[var(--surface-primary)] transition-colors hover:bg-[var(--surface-secondary)]"
            >
              {ayuda.imageUrl && (
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={ayuda.imageUrl}
                    alt={ayuda.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  <span className="absolute bottom-4 left-4 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white/80">
                    {ayuda.kicker}
                  </span>
                </div>
              )}
              <div className="p-6">
                <h3 className="mb-2 font-display text-[1.25rem] font-light leading-snug text-[var(--text-primary)] transition-colors group-hover:text-[var(--color-accent-300)]">
                  {ayuda.title}
                </h3>
                <p className="mb-5 text-[0.88rem] leading-relaxed text-[var(--text-secondary)]">
                  {ayuda.summary}
                </p>
                <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
                  <span className="flex items-center gap-1.5 text-[0.72rem] text-[var(--text-tertiary)]">
                    <Clock size={12} /> {ayuda.deadline}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-400)] transition-all group-hover:gap-2">
                    {locale === "en" ? "Apply" : "Solicitar"}
                    <ArrowUpRight size={11} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-5 text-[0.78rem] leading-relaxed text-[var(--text-tertiary)]">
          {locale === "en"
            ? "To access the full terms and submit your application, register or sign in to the private area."
            : "Para acceder a las bases completas y presentar solicitud, regístrate o inicia sesión en el área privada."}
        </p>
      </div>
    </section>
  );
}
