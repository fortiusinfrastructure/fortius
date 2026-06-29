"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { Bracketed } from "@/components/system/Bracketed";
import type { FoundationPrivateUser } from "@/lib/private/auth";
import { AYUDAS } from "@/content/ayudas";

const ease = [0.22, 0.61, 0.36, 1] as const;

interface Props {
  user: FoundationPrivateUser;
}

export function DashboardBeneficiario({ user }: Props) {
  const greeting = user.fullName?.split(" ")[0] ?? user.email ?? "Beneficiario";
  const openAyudas = AYUDAS.filter((a) => a.status === "open");
  const upcomingAyudas = AYUDAS.filter((a) => a.status === "upcoming");
  const closedAyudas = AYUDAS.filter((a) => a.status === "closed");

  return (
    <div
      className="pt-[var(--nav-height)] pb-24 md:pb-36 min-h-screen"
      style={{ background: "var(--surface-primary)" }}
    >
      <header
        className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 pb-12"
        style={{ borderBottom: "1px solid var(--border-subtle)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <Bracketed variant="kicker">Área privada · Beneficiario</Bracketed>
          <h1 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.6rem)] font-light leading-tight text-[var(--text-primary)]">
            Bienvenido/a,{" "}
            <span className="italic" style={{ color: "var(--color-accent-400)" }}>
              {greeting}
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
            Aquí puedes consultar las convocatorias de ayuda disponibles y presentar tu solicitud
            directamente desde esta plataforma.
          </p>
        </motion.div>
      </header>

      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 space-y-16">
        {/* Open grants */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <Bracketed variant="tag">Convocatorias abiertas</Bracketed>
            <div className="mt-8 space-y-4">
              {openAyudas.length > 0 ? (
                openAyudas.map((ayuda) => (
                  <div
                    key={ayuda.slug}
                    className="border p-6 transition-colors"
                    style={{
                      borderColor: "rgba(22,163,74,0.35)",
                      background: "rgba(22,163,74,0.05)",
                    }}
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <FileText
                            size={16}
                            style={{ color: "var(--color-accent-400)" }}
                          />
                          <span
                            className="text-[0.65rem] uppercase tracking-widest"
                            style={{ color: "var(--color-accent-400)" }}
                          >
                            Convocatoria abierta
                          </span>
                        </div>
                        <h3
                          className="font-display text-[1.5rem] font-light leading-tight mb-2"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {ayuda.title}
                        </h3>
                        <p
                          className="text-[0.9rem] leading-relaxed mb-4"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {ayuda.summary}
                        </p>
                        <p
                          className="flex items-center gap-2 text-[0.8rem]"
                          style={{ color: "var(--text-tertiary)" }}
                        >
                          <Clock size={13} />
                          Fecha límite: <strong style={{ color: "var(--text-primary)" }}>{ayuda.deadline}</strong>
                        </p>
                      </div>
                      <div className="shrink-0 flex flex-col gap-3">
                        <Link
                          href={`/area-privada/ayudas/${ayuda.slug}`}
                          className="inline-flex items-center gap-2 px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-90"
                          style={{ background: "var(--color-accent-500)" }}
                        >
                          Ver convocatoria <ArrowRight size={14} />
                        </Link>
                        <Link
                          href={`/area-privada/ayudas/${ayuda.slug}#solicitar`}
                          className="inline-flex items-center gap-2 border px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.16em] transition-colors hover:bg-[var(--surface-secondary)]"
                          style={{
                            borderColor: "var(--color-accent-400)",
                            color: "var(--text-primary)",
                          }}
                        >
                          Solicitar ayuda →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  className="p-6 border text-[0.9rem]"
                  style={{
                    borderColor: "var(--border-subtle)",
                    background: "var(--surface-secondary)",
                    color: "var(--text-secondary)",
                  }}
                >
                  No hay convocatorias abiertas en este momento. Te notificaremos cuando se publiquen nuevas ayudas.
                </div>
              )}
            </div>
          </motion.div>
        </section>

        {/* Upcoming */}
        {upcomingAyudas.length > 0 && (
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <Bracketed variant="tag">Próximas convocatorias</Bracketed>
              <div className="mt-8 space-y-3">
                {upcomingAyudas.map((ayuda) => (
                  <div
                    key={ayuda.slug}
                    className="border p-5"
                    style={{
                      borderColor: "var(--border-subtle)",
                      background: "var(--surface-secondary)",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0"
                        style={{ color: "var(--text-tertiary)" }}
                      />
                      <div>
                        <h4
                          className="font-display text-[1.15rem] font-light mb-1"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {ayuda.title}
                        </h4>
                        <p className="text-[0.85rem]" style={{ color: "var(--text-tertiary)" }}>
                          Próximamente
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* Closed */}
        {closedAyudas.length > 0 && (
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <Bracketed variant="tag">Convocatorias cerradas</Bracketed>
              <div className="mt-8 space-y-3">
                {closedAyudas.map((ayuda) => (
                  <div
                    key={ayuda.slug}
                    className="border p-5 opacity-60"
                    style={{
                      borderColor: "var(--border-subtle)",
                      background: "var(--surface-secondary)",
                    }}
                  >
                    <h4
                      className="font-display text-[1.1rem] font-light mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {ayuda.title}
                    </h4>
                    <p className="text-[0.8rem]" style={{ color: "var(--text-tertiary)" }}>
                      Plazo cerrado · {ayuda.deadline}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* Contact nudge */}
        <section
          className="border p-8"
          style={{ borderColor: "var(--border-subtle)", background: "var(--surface-secondary)" }}
        >
          <p
            className="text-[0.7rem] uppercase tracking-[0.16em] mb-3"
            style={{ color: "var(--text-tertiary)" }}
          >
            ¿Tienes alguna pregunta?
          </p>
          <p className="text-[0.9rem] leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            El equipo de Fundación Fortius está disponible para orientarte en cualquier proceso de solicitud.
          </p>
          <a
            href="mailto:info@fundacionfortius.org"
            className="text-[0.85rem] font-semibold transition-colors"
            style={{ color: "var(--color-accent-400)" }}
          >
            info@fundacionfortius.org →
          </a>
        </section>
      </div>
    </div>
  );
}
