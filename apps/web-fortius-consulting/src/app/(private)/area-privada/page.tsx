import type { Metadata } from "next";
import { requirePrivateUser } from "@/lib/auth";
import {
    getMemberDashboardData,
    getAdminDashboardData,
    getMyClientProjects,
} from "@/lib/private/queries";
import { fetchArticles } from "@/lib/articles-db";
import { DashboardClient } from "./DashboardClient";
import { DashboardAdmin } from "./DashboardAdmin";

export const metadata: Metadata = {
    title: "Área Privada | Fortius Consulting",
    description: "Acceso exclusivo para clientes y equipo de Fortius Consulting.",
    robots: { index: false, follow: false },
};

export default async function AreaPrivadaPage() {
    // Redirects to /login if not authenticated or no active membership
    const user = await requirePrivateUser();

    // CEO / admin view
    if (user.role === "admin") {
        const data = await getAdminDashboardData(user.orgId);
        return <DashboardAdmin user={user} data={data} />;
    }

    // Member / client view
    const [data, articles, projects] = await Promise.all([
        getMemberDashboardData(user.id, user.orgId),
        fetchArticles(),
        getMyClientProjects(user.orgId),
    ]);
    return (
        <DashboardClient user={user} data={data} articles={articles} projects={projects} />
    );
}
