/* ============================================================
   FORTIUS FOUNDATION — Projects (Incubadora + Casos de éxito)
   ============================================================ */

export type ProjectStage = "incubacion" | "exito";

export interface FoundationProject {
    slug: string;
    name: string;
    stage: ProjectStage;
    tagline: string;
    summary: string;
    href: string;
    externalUrl?: string;
    accent?: "neutral" | "sibling";
}

export const PROJECTS: FoundationProject[] = [
    {
        slug: "free-press-forum",
        name: "Free Press Forum",
        stage: "incubacion",
        tagline: "Libertad de prensa e información de calidad",
        summary:
            "Plataforma internacional para la defensa de la prensa libre. En fase de incubación: buscamos partners y financiación para su lanzamiento.",
        href: "/incubadora/free-press-forum",
    },
    {
        slug: "principios",
        name: "Principios",
        stage: "incubacion",
        tagline: "Formación cívica y pensamiento con principios",
        summary:
            "Proyecto editorial y formativo para difundir el pensamiento con principios en la esfera pública. En fase de incubación.",
        href: "/incubadora/principios",
    },
    {
        slug: "ieam",
        name: "IEAM",
        stage: "exito",
        tagline: "Instituto de Estudios sobre África Mediterránea",
        summary:
            "Think tank especializado en el Mediterráneo y el Sahel. Nacido del programa Mediterranean Dialogue, hoy opera como entidad de referencia.",
        href: "/incubadora/ieam",
        externalUrl: "https://ieam.es",
    },
    {
        slug: "escuela-hispanica",
        name: "Escuela Hispánica",
        stage: "exito",
        tagline: "Cultura, pensamiento y tradición hispánica",
        summary:
            "Proyecto cultural y editorial que recupera y difunde el legado intelectual hispánico. Programa de mecenazgo activo.",
        href: "/incubadora/escuela-hispanica",
        externalUrl: "https://escuelahispanica.com",
    },
];

export function getProjectsByStage(stage: ProjectStage): FoundationProject[] {
    return PROJECTS.filter((p) => p.stage === stage);
}
