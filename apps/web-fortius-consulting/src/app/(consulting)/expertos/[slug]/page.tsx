import { TEAM, EXPERTS } from "@/content/team";
import { notFound, redirect } from "next/navigation";
import { ExpertClient } from "./ExpertClient";
import type { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const slug = (await params).slug;
    const teamMember = TEAM.find((m) => m.slug === slug);
    const expertMember = EXPERTS.find((e) => e.slug === slug);
    
    const member = teamMember || expertMember;
    
    if (!member) {
        return { title: "No encontrado — Fortius Consulting" };
    }

    return {
        title: `${member.name} — Fortius Consulting`,
        description: member.bio.slice(0, 160) + "...",
    };
}

export default async function ExpertPage({
    params,
}: {
    params: { slug: string };
}) {
    const slug = (await params).slug;
    if (slug === "juan-angel-soto") {
        redirect("/juan-A-soto");
    }
    const teamMember = TEAM.find((m) => m.slug === slug);
    const expertMember = EXPERTS.find((e) => e.slug === slug);
    
    const member = teamMember || expertMember;
    
    if (!member) {
        notFound();
    }

    return <ExpertClient member={member} />;
}
