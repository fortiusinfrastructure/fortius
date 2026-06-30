/**
 * DashboardAdmin — Vista exclusiva del CEO / admin.
 * Server Component: sin 'use client', sin framer-motion.
 * Muestra métricas globales + lista de clientes activos.
 */

import type { PrivateUser } from "@/lib/auth";
import type { AdminDashboardData, AdminMemberRecord } from "@/lib/private/queries";
import { TEAM } from "@/content/team";
import { Bracketed } from "@/components/system/Bracketed";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatTier(tier: string | null) {
    if (!tier) return "—";
    return tier
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
}

function formatDate(iso: string | null) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
}

function StatusBadge({ status }: { status: string | null }) {
    const isActive = status === "active";
    return (
        <span
            className="inline-flex items-center gap-1.5 px-2 py-1 text-[0.65rem] uppercase tracking-widest border"
            style={{
                background: isActive ? "rgba(16,185,129,0.1)" : "rgba(107,114,128,0.1)",
                borderColor: isActive ? "rgba(16,185,129,0.3)" : "rgba(107,114,128,0.3)",
                color: isActive ? "#10b981" : "#9ca3af",
            }}
        >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "currentColor" }} />
            {isActive ? "Activa" : status ?? "—"}
        </span>
    );
}

function MemberRow({ member }: { member: AdminMemberRecord }) {
    const displayName = member.fullName ?? member.email;
    return (
        <tr className="border-b" style={{ borderColor: "var(--border-subtle)" }}>
            <td className="py-4 pr-6">
                <p className="font-display text-[1rem]" style={{ color: "var(--text-primary)" }}>
                    {displayName}
                </p>
                <p className="text-[0.75rem] mt-0.5" style={{ color: "var(--text-tertiary)" }}>
                    {member.email}
                </p>
            </td>
            <td className="py-4 pr-6">
                <span className="text-[0.8rem]" style={{ color: "var(--text-secondary)" }}>
                    {formatTier(member.tier)}
                </span>
            </td>
            <td className="py-4 pr-6">
                <StatusBadge status={member.status} />
            </td>
            <td className="py-4 text-[0.8rem]" style={{ color: "var(--text-tertiary)" }}>
                {formatDate(member.joinedAt)}
            </td>
        </tr>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
    user: PrivateUser;
    data: AdminDashboardData;
}

export function DashboardAdmin({ user, data }: Props) {
    const greeting = user.fullName?.split(" ")[0] ?? user.email ?? "CEO";
    const coreTeam = TEAM.filter((m) => m.department === "direccion").slice(0, 4);

    return (
        <div
            className="pt-[var(--nav-height)] pb-24 min-h-screen"
            style={{ background: "var(--surface-primary)" }}
        >
            {/* Header */}
            <header
                className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 pb-12 border-b"
                style={{ borderColor: "var(--border-subtle)" }}
            >
                <Bracketed variant="kicker">Panel de dirección</Bracketed>
                <h1 className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] font-light leading-tight" style={{ color: "var(--text-primary)" }}>
                    Bienvenido, <span className="italic" style={{ color: "var(--color-accent-400)" }}>{greeting}</span>
                </h1>
                <p className="mt-3 text-[0.9rem]" style={{ color: "var(--text-secondary)" }}>
                    Vista exclusiva para administración de Fortius Consulting.
                </p>
            </header>

            <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-14 space-y-20">

                {/* ─── Métricas globales ─── */}
                <section>
                    <Bracketed variant="tag">Métricas globales</Bracketed>
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { label: "Clientes activos", value: data.totalClients },
                            { label: "Total membresías", value: data.totalActive },
                            { label: "Equipo directivo", value: coreTeam.length },
                        ].map(({ label, value }) => (
                            <div
                                key={label}
                                className="p-8 border"
                                style={{ background: "var(--surface-secondary)", borderColor: "var(--border-default)" }}
                            >
                                <p className="font-display text-[3rem] font-light leading-none" style={{ color: "var(--color-accent-400)" }}>
                                    {value}
                                </p>
                                <p className="mt-3 text-[0.72rem] uppercase tracking-[0.18em]" style={{ color: "var(--text-tertiary)" }}>
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ─── Tabla de clientes ─── */}
                <section>
                    <Bracketed variant="tag">Clientes y membresías</Bracketed>
                    <div className="mt-8 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b" style={{ borderColor: "var(--border-strong)" }}>
                                    {["Cliente", "Plan", "Estado", "Alta"].map((h) => (
                                        <th key={h} className="pb-4 pr-6 text-[0.65rem] uppercase tracking-[0.18em]" style={{ color: "var(--text-tertiary)" }}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.members.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="py-8 text-[0.9rem]" style={{ color: "var(--text-secondary)" }}>
                                            No hay membresías registradas todavía.
                                        </td>
                                    </tr>
                                ) : (
                                    data.members.map((m) => (
                                        <MemberRow key={m.userId} member={m} />
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* ─── Equipo directivo ─── */}
                <section>
                    <Bracketed variant="tag">Equipo directivo</Bracketed>
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {coreTeam.map((member) => (
                            <div
                                key={member.slug}
                                className="p-6 border"
                                style={{ background: "var(--surface-secondary)", borderColor: "var(--border-default)" }}
                            >
                                <p className="font-display text-[1.1rem]" style={{ color: "var(--text-primary)" }}>
                                    {member.name}
                                </p>
                                <p className="mt-1 text-[0.72rem] uppercase tracking-wider" style={{ color: "var(--color-accent-400)" }}>
                                    {member.role}
                                </p>
                                {member.country && (
                                    <p className="mt-3 text-[0.78rem]" style={{ color: "var(--text-tertiary)" }}>
                                        {member.country}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}
