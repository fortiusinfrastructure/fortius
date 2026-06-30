import { Bracketed } from "@/components/system/Bracketed";
import type { FoundationPrivateUser } from "@/lib/private/auth";
import type { FoundationAdminData, FoundationMemberRecord } from "@/lib/private/queries";
import { signOut } from "@/lib/auth/actions";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function roleLabel(role: string | null) {
  const map: Record<string, string> = {
    beneficiario: "Beneficiario",
    donante: "Donante",
    admin: "Admin",
    super_admin: "Super admin",
    member: "Miembro",
    consultant: "Consultor",
    editor: "Editor",
  };
  return role ? (map[role] ?? role) : "—";
}

function roleColor(role: string | null): { color: string; background: string; borderColor: string } {
  if (role === "donante")
    return {
      color: "#16a34a",
      background: "rgba(22,163,74,0.08)",
      borderColor: "rgba(22,163,74,0.3)",
    };
  if (role === "admin" || role === "super_admin")
    return {
      color: "#ca8a04",
      background: "rgba(202,138,4,0.08)",
      borderColor: "rgba(202,138,4,0.3)",
    };
  return {
    color: "var(--text-tertiary)",
    background: "rgba(107,114,128,0.08)",
    borderColor: "rgba(107,114,128,0.2)",
  };
}

function MemberRow({ member }: { member: FoundationMemberRecord }) {
  const nameOrEmail = member.fullName ?? member.email;
  const colors = roleColor(member.role);
  return (
    <tr className="border-b" style={{ borderColor: "var(--border-subtle)" }}>
      <td className="py-4 pr-6">
        <p className="font-display text-[1rem]" style={{ color: "var(--text-primary)" }}>
          {nameOrEmail}
        </p>
        <p className="text-[0.72rem] mt-0.5" style={{ color: "var(--text-tertiary)" }}>
          {member.email}
        </p>
      </td>
      <td className="py-4 pr-6">
        <span
          className="inline-flex items-center gap-1.5 px-2 py-1 text-[0.65rem] uppercase tracking-widest border"
          style={colors}
        >
          {roleLabel(member.role)}
        </span>
      </td>
      <td className="py-4 pr-6">
        <span
          className="inline-flex items-center gap-1.5 text-[0.75rem]"
          style={{ color: member.status === "active" ? "#16a34a" : "var(--text-tertiary)" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: "currentColor" }}
          />
          {member.status === "active" ? "Activo" : (member.status ?? "—")}
        </span>
      </td>
      <td className="py-4 text-[0.8rem]" style={{ color: "var(--text-tertiary)" }}>
        {formatDate(member.joinedAt)}
      </td>
    </tr>
  );
}

interface Props {
  user: FoundationPrivateUser;
  data: FoundationAdminData;
}

export function DashboardAdmin({ user, data }: Props) {
  const greeting = user.fullName?.split(" ")[0] ?? user.email ?? "Admin";

  return (
    <div
      className="pt-[var(--nav-height)] pb-24 min-h-screen"
      style={{ background: "var(--surface-primary)" }}
    >
      <header
        className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 pb-12 border-b"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        <div className="flex items-start justify-between gap-4">
          <Bracketed variant="kicker">Panel de administración</Bracketed>
          <form action={signOut}>
            <button
              type="submit"
              className="text-[0.7rem] uppercase tracking-[0.18em] transition-colors text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
        <h1
          className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] font-light leading-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Bienvenido/a,{" "}
          <span className="italic" style={{ color: "var(--color-accent-400)" }}>
            {greeting}
          </span>
        </h1>
        <p className="mt-3 text-[0.9rem]" style={{ color: "var(--text-secondary)" }}>
          Panel de administración de Fundación Fortius.
        </p>
      </header>

      <div
        className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-14 space-y-20"
      >
        {/* Metrics */}
        <section>
          <Bracketed variant="tag">Resumen</Bracketed>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Beneficiarios activos", value: data.totalBeneficiarios },
              { label: "Donantes activos", value: data.totalDonantes },
              { label: "Total membresías activas", value: data.totalActive },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="p-8 border"
                style={{
                  background: "var(--surface-secondary)",
                  borderColor: "var(--border-default)",
                }}
              >
                <p
                  className="font-display text-[3rem] font-light leading-none"
                  style={{ color: "var(--color-accent-400)" }}
                >
                  {value}
                </p>
                <p
                  className="mt-3 text-[0.72rem] uppercase tracking-[0.18em]"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Members table */}
        <section>
          <Bracketed variant="tag">Usuarios registrados</Bracketed>
          <p className="mt-3 text-[0.82rem]" style={{ color: "var(--text-tertiary)" }}>
            Para cambiar roles o gestionar accesos, usa el panel de Supabase o escribe a{" "}
            <a
              href="mailto:info@fundacionfortius.org"
              style={{ color: "var(--color-accent-400)" }}
            >
              info@fundacionfortius.org
            </a>
            .
          </p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr
                  className="border-b"
                  style={{ borderColor: "var(--border-strong)" }}
                >
                  {["Usuario", "Rol", "Estado", "Alta"].map((h) => (
                    <th
                      key={h}
                      className="pb-4 pr-6 text-[0.65rem] uppercase tracking-[0.18em]"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.members.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-8 text-[0.9rem]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      No hay usuarios registrados todavía.
                    </td>
                  </tr>
                ) : (
                  data.members.map((m) => <MemberRow key={m.userId} member={m} />)
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
