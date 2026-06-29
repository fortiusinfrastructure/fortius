import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Download, CheckCircle2, Clock } from "lucide-react";
import { Bracketed } from "@/components/system/Bracketed";
import { requireFoundationPrivateUser } from "@/lib/private/auth";
import { getAyuda } from "@/content/ayudas";
import { GrantApplicationForm } from "./GrantApplicationForm";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function GrantDetailPage({ params }: Props) {
  const { slug } = await params;
  await requireFoundationPrivateUser();

  const ayuda = getAyuda(slug);
  if (!ayuda) notFound();

  const isOpen = ayuda.status === "open";

  return (
    <main id="main-content" className="pt-[var(--nav-height)]">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-16 md:py-24">
        <Link
          href="/area-privada"
          className="inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.14em] text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-secondary)] mb-12"
        >
          <ArrowLeft size={14} /> Volver al área privada
        </Link>

        {ayuda.imageUrl && (
          <div className="relative mb-10 h-64 md:h-80 w-full overflow-hidden">
            <Image
              src={ayuda.imageUrl}
              alt={ayuda.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        )}

        <Bracketed variant="kicker">{ayuda.kicker}</Bracketed>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2rem,4.5vw,3.8rem)] font-light leading-[1.05] tracking-tight text-[var(--text-primary)]">
          {ayuda.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-6 text-[0.8rem] text-[var(--text-secondary)]">
          <span className="flex items-center gap-2">
            <Clock size={14} className="text-[var(--color-accent-400)]" />
            Fecha límite: <strong className="text-[var(--text-primary)]">{ayuda.deadline}</strong>
          </span>
          {ayuda.maxAmount && (
            <span>
              Importe: <strong className="text-[var(--text-primary)]">{ayuda.maxAmount}</strong>
            </span>
          )}
          <span
            className="flex items-center gap-1.5 px-2.5 py-1 text-[0.65rem] uppercase tracking-widest border"
            style={
              isOpen
                ? {
                    color: "#16a34a",
                    borderColor: "rgba(22,163,74,0.4)",
                    background: "rgba(22,163,74,0.08)",
                  }
                : {
                    color: "var(--text-tertiary)",
                    borderColor: "var(--border-subtle)",
                    background: "transparent",
                  }
            }
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: isOpen ? "#16a34a" : "currentColor" }}
            />
            {isOpen ? "Abierta" : ayuda.status === "upcoming" ? "Próximamente" : "Cerrada"}
          </span>
        </div>

        <div className="mt-16 grid gap-16 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-12">
            {/* Description */}
            <section className="space-y-4">
              {ayuda.description.map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-[var(--text-secondary)]">
                  {paragraph}
                </p>
              ))}
            </section>

            {/* Eligibility */}
            <section>
              <Bracketed variant="tag">Quién puede solicitar</Bracketed>
              <ul className="mt-6 space-y-3">
                {ayuda.eligibility.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-[var(--color-accent-400)]"
                    />
                    <span className="text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Requirements */}
            <section>
              <Bracketed variant="tag">Documentación requerida</Bracketed>
              <ul className="mt-6 space-y-3">
                {ayuda.requirements.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 border border-[var(--border-subtle)] bg-[var(--surface-secondary)] px-5 py-4"
                  >
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-400)] mt-0.5 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.93rem] leading-relaxed text-[var(--text-secondary)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Application form */}
            {isOpen && (
              <section id="solicitar" className="border-t border-[var(--border-subtle)] pt-12">
                <Bracketed variant="kicker">Formulario de solicitud</Bracketed>
                <h2 className="mt-4 mb-8 font-display text-[1.9rem] font-light text-[var(--text-primary)]">
                  Solicitar esta ayuda
                </h2>
                <GrantApplicationForm ayuda={ayuda} />
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-[calc(var(--nav-height)+2rem)] self-start">
            {ayuda.pdfUrl && (
              <div className="border border-[var(--border-subtle)] bg-[var(--surface-primary)] p-6">
                <p className="text-[0.7rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)] mb-4">
                  Convocatoria completa
                </p>
                <p className="text-[0.9rem] text-[var(--text-secondary)] mb-5 leading-relaxed">
                  Descarga el documento oficial con todos los términos, condiciones y criterios de evaluación.
                </p>
                <a
                  href={ayuda.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-[var(--color-accent-400)] px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-secondary)]"
                >
                  <Download size={14} /> Descargar PDF
                </a>
              </div>
            )}

            <div className="border border-[var(--border-subtle)] bg-[var(--surface-secondary)] p-6">
              <p className="text-[0.7rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)] mb-3">
                ¿Tienes dudas?
              </p>
              <p className="text-[0.88rem] text-[var(--text-secondary)] leading-relaxed mb-4">
                Escríbenos y te orientamos antes de enviar tu solicitud.
              </p>
              <a
                href="mailto:info@fundacionfortius.org?subject=Consulta%20sobre%20convocatoria"
                className="text-[0.8rem] font-semibold text-[var(--color-accent-400)] hover:text-[var(--color-accent-300)] transition-colors"
              >
                info@fundacionfortius.org →
              </a>
            </div>

            {isOpen && (
              <a
                href="#solicitar"
                className="flex items-center justify-center gap-2 bg-[var(--color-accent-500)] px-6 py-4 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-90"
              >
                Solicitar esta ayuda →
              </a>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
