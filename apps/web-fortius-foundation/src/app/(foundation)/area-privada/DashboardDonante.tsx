"use client";

import { motion } from "framer-motion";
import { CreditCard, ArrowUpRight } from "lucide-react";
import { Bracketed } from "@/components/system/Bracketed";
import type { FoundationPrivateUser } from "@/lib/private/auth";
import type { DonationRecord } from "@/lib/private/queries";
import { signOut } from "@/lib/auth/actions";

const ease = [0.22, 0.61, 0.36, 1] as const;

function formatAmount(cents: number, currency: string) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function statusLabel(status: string) {
  const map: Record<string, string> = {
    succeeded: "Completado",
    pending: "Pendiente",
    failed: "Error",
    refunded: "Reembolsado",
  };
  return map[status] ?? status;
}

function statusColor(status: string): string {
  if (status === "succeeded") return "#16a34a";
  if (status === "pending") return "#ca8a04";
  if (status === "failed" || status === "refunded") return "#dc2626";
  return "var(--text-tertiary)";
}

interface Props {
  user: FoundationPrivateUser;
  donations: DonationRecord[];
}

export function DashboardDonante({ user, donations }: Props) {
  const greeting = user.fullName?.split(" ")[0] ?? user.email ?? "Donante";

  const totalDonated = donations
    .filter((d) => d.status === "succeeded")
    .reduce((acc, d) => acc + d.amountCents, 0);

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
          <div className="flex items-start justify-between gap-4">
            <Bracketed variant="kicker">Área privada · Donante</Bracketed>
            <form action={signOut}>
              <button
                type="submit"
                className="text-[0.7rem] uppercase tracking-[0.18em] transition-colors"
                style={{ color: "var(--text-tertiary)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-tertiary)")}
              >
                Cerrar sesión
              </button>
            </form>
          </div>
          <h1 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.6rem)] font-light leading-tight text-[var(--text-primary)]">
            Bienvenido/a,{" "}
            <span className="italic" style={{ color: "var(--color-accent-400)" }}>
              {greeting}
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
            Gracias por tu apoyo a Fundación Fortius. Aquí puedes consultar el historial de tus donaciones.
          </p>

          {/* Summary card */}
          {donations.length > 0 && (
            <div
              className="mt-8 inline-flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 border"
              style={{
                borderColor: "var(--border-default)",
                background: "var(--surface-secondary)",
              }}
            >
              <CreditCard size={20} style={{ color: "var(--color-accent-400)" }} className="shrink-0" />
              <div>
                <p
                  className="text-[0.75rem] uppercase tracking-[0.16em]"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Total donado
                </p>
                <p
                  className="mt-1 font-display text-[1.4rem]"
                  style={{ color: "var(--text-primary)" }}
                >
                  {formatAmount(totalDonated, donations[0]?.currency ?? "eur")}
                </p>
              </div>
              <div
                className="h-px w-full sm:h-10 sm:w-px"
                style={{ background: "var(--border-subtle)" }}
              />
              <div>
                <p
                  className="text-[0.75rem] uppercase tracking-[0.16em]"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Donaciones realizadas
                </p>
                <p
                  className="mt-1 font-display text-[1.4rem]"
                  style={{ color: "var(--text-primary)" }}
                >
                  {donations.filter((d) => d.status === "succeeded").length}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </header>

      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 space-y-16">
        {/* Donation history */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <Bracketed variant="tag">Historial de donaciones</Bracketed>
            <div className="mt-8">
              {donations.length > 0 ? (
                <div className="space-y-3">
                  {/* Table header */}
                  <div
                    className="hidden md:grid grid-cols-[1fr_140px_120px_100px] gap-4 px-6 py-3 text-[0.65rem] uppercase tracking-[0.16em]"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    <span>Descripción</span>
                    <span>Fecha</span>
                    <span className="text-right">Importe</span>
                    <span className="text-right">Estado</span>
                  </div>

                  {donations.map((donation) => (
                    <div
                      key={donation.id}
                      className="grid grid-cols-1 md:grid-cols-[1fr_140px_120px_100px] gap-2 md:gap-4 border px-6 py-5 transition-colors"
                      style={{
                        borderColor: "var(--border-subtle)",
                        background: "var(--surface-secondary)",
                      }}
                    >
                      <div>
                        <p
                          className="text-[0.95rem] leading-snug"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {donation.description ?? "Donación a Fundación Fortius"}
                        </p>
                      </div>
                      <p
                        className="text-[0.85rem] md:mt-0.5"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        {formatDate(donation.createdAt)}
                      </p>
                      <p
                        className="text-[0.95rem] font-semibold md:text-right"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {formatAmount(donation.amountCents, donation.currency)}
                      </p>
                      <p
                        className="text-[0.78rem] font-semibold md:text-right"
                        style={{ color: statusColor(donation.status) }}
                      >
                        {statusLabel(donation.status)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="p-8 border text-center"
                  style={{
                    borderColor: "var(--border-subtle)",
                    background: "var(--surface-secondary)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <p className="text-[0.95rem] mb-4">
                    Todavía no tienes donaciones registradas en tu cuenta.
                  </p>
                  <a
                    href="/donaciones"
                    className="inline-flex items-center gap-2 text-[0.8rem] font-semibold uppercase tracking-[0.14em] transition-colors"
                    style={{ color: "var(--color-accent-400)" }}
                  >
                    Realizar una donación <ArrowUpRight size={14} />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </section>

        {/* Contact */}
        <section
          className="border p-8"
          style={{ borderColor: "var(--border-subtle)", background: "var(--surface-secondary)" }}
        >
          <p
            className="text-[0.7rem] uppercase tracking-[0.16em] mb-3"
            style={{ color: "var(--text-tertiary)" }}
          >
            ¿Necesitas un certificado o tienes alguna pregunta?
          </p>
          <p className="text-[0.9rem] leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            Podemos emitir certificados de donación para deducciones fiscales en España o Estados Unidos.
            Escríbenos y te ayudamos.
          </p>
          <a
            href="mailto:info@fundacionfortius.org?subject=Certificado%20de%20donación"
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
