import type { Metadata } from "next";
import { requireFoundationPrivateUser } from "@/lib/private/auth";
import { getDonationHistory } from "@/lib/private/queries";
import { DashboardBeneficiario } from "./DashboardBeneficiario";
import { DashboardDonante } from "./DashboardDonante";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Área Privada — Fundación Fortius",
  description:
    "Acceso privado para colaboradores, donantes y beneficiarios de Fundación Fortius.",
  robots: { index: false, follow: false },
};

export default async function AreaPrivadaPage() {
  const user = await requireFoundationPrivateUser();

  if (user.role === "donante") {
    const donations = await getDonationHistory(user.id);
    return <DashboardDonante user={user} donations={donations} />;
  }

  // beneficiario, member, or any other role → grants dashboard
  return <DashboardBeneficiario user={user} />;
}
