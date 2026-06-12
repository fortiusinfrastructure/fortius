import React from "react";
import { redirect } from "next/navigation";
import { requirePrivateUser } from "@/lib/auth";

/**
 * Admin-only gate for /herramientas.
 * requirePrivateUser() already redirects to /login when there is no session
 * or no active membership; here we additionally require role 'admin'.
 */
export default async function HerramientasLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await requirePrivateUser();
    if (user.role !== "admin") redirect("/area-privada");

    return <>{children}</>;
}
