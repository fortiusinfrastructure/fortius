import type { Metadata } from "next";
import { requireFoundationPrivateUser } from "@/lib/private/auth";
import { getDonationHistory, getFoundationAdminData } from "@/lib/private/queries";
import { DashboardBeneficiario } from "./DashboardBeneficiario";
import { DashboardDonante } from "./DashboardDonante";
import { DashboardAdmin } from "./DashboardAdmin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Área Privada — Fundación Fortius",
  description:
    "Acceso privado para colaboradores, donantes y beneficiarios de Fundación Fortius.",
  robots: { index: false, follow: false },
};

const ADMIN_ROLES = ["admin", "super_admin"] as const;

export default async function AreaPrivadaPage() {
  const user = await requireFoundationPrivateUser();

  // Admin / super_admin → management panel
  if (ADMIN_ROLES.includes(user.role as (typeof ADMIN_ROLES)[number])) {
    const data = await getFoundationAdminData(user.orgId);
    return <DashboardAdmin user={user} data={data} />;
  }

  // Donante → donation history
  if (user.role === "donante") {
    const donations = await getDonationHistory(user.id, user.orgId);
    return <DashboardDonante user={user} donations={donations} />;
  }

  // beneficiario / member / any other role → grants dashboard
  return <DashboardBeneficiario user={user} />;
}
