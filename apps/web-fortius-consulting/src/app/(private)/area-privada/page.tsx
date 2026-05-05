import { requireClientUser } from "@/lib/auth";
import { DashboardClient } from "./DashboardClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Área Privada — Fortius Consulting",
    description: "Dashboard exclusivo para clientes de Fortius Consulting.",
};

export default async function AreaPrivadaPage() {
    const user = await requireClientUser();
    
    // In a real scenario, we would fetch data from Supabase based on the user ID
    // using the created clients or admin clients, e.g.:
    // const projects = await getProjectsForUser(user.id);
    
    return <DashboardClient user={user} />;
}
