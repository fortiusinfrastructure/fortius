/* ============================================================
   FORTIUS FOUNDATION — Team, Patronato, Consejo Asesor
   ============================================================ */

export type BoardChapter = "espana" | "usa";

export const BOARD_CHAPTER_LABEL: Record<BoardChapter, string> = {
    espana: "Fundación Fortius España",
    usa: "Fortius Foundation U.S.A.",
};

export interface BoardMember {
    slug: string;
    name: string;
    role: string;
    chapter: BoardChapter;
    bio: string;
    email?: string;
    linkedin?: string;
    photo?: string;
}

export interface AdvisoryMember {
    slug: string;
    name: string;
    bio: string;
    photo?: string;
}

export type TeamArea = "escuela-hispanica" | "ieam";

export const TEAM_AREA_LABEL: Record<TeamArea, string> = {
    "escuela-hispanica": "Escuela Hispánica",
    ieam: "IEAM",
};

export interface TeamMember {
    slug: string;
    name: string;
    role: string;
    area: TeamArea;
    isDirector: boolean;
    bio: string;
    email?: string;
    linkedin?: string;
    photo?: string;
}

export const PATRONATO: BoardMember[] = [
    {
        slug: "juan-angel-soto",
        name: "Juan Ángel Soto Gómez",
        role: "Presidente",
        chapter: "espana",
        bio: "Fundador y presidente de la Fundación Fortius. Impulsa la estrategia global de la fundación y sus relaciones institucionales.",
        email: "juan.soto@fortiusfoundation.org",
        linkedin: "https://www.linkedin.com/in/juan-angel-soto",
    },
    {
        slug: "belen-navarro-rubio-es",
        name: "Belén Navarro-Rubio Coello de Portugal",
        role: "Vicepresidente",
        chapter: "espana",
        bio: "Vicepresidente del patronato. Acompaña la supervisión estratégica y la gobernanza de los programas de la fundación en España.",
    },
    {
        slug: "javier-garcia-martinez-artero",
        name: "Javier García Martínez-Artero",
        role: "Vicepresidente",
        chapter: "espana",
        bio: "Vicepresidente del patronato. Supervisa la alineación de los proyectos con la misión y los valores de la fundación.",
    },
    {
        slug: "sonsoles-queipo-de-llano-hevia",
        name: "Sonsoles Queipo de Llano Hevia",
        role: "Patrono",
        chapter: "espana",
        bio: "Patrono de la Fundación Fortius España. Aporta experiencia en gobernanza y mecenazgo cultural.",
    },
    {
        slug: "juan-angel-soto-us",
        name: "Juan Ángel Soto Gómez",
        role: "Presidente",
        chapter: "usa",
        bio: "Presidente de Fortius Foundation U.S.A. Articula la presencia de la fundación en Estados Unidos y sus alianzas internacionales.",
        email: "juan.soto@fortiusfoundation.org",
    },
    {
        slug: "joseph-prudhomme",
        name: "Joseph Prud’homme",
        role: "Vicepresidente",
        chapter: "usa",
        bio: "Vicepresidente de Fortius Foundation U.S.A. Académico especializado en filosofía política y religión y sociedades libres.",
    },
    {
        slug: "belen-navarro-rubio-us",
        name: "Belén Navarro-Rubio Coello de Portugal",
        role: "Vicepresidente",
        chapter: "usa",
        bio: "Vicepresidente de Fortius Foundation U.S.A. Puente entre las operaciones de la fundación en Europa y Norteamérica.",
    },
];

export const CONSEJO_ASESOR: AdvisoryMember[] = [
    {
        slug: "carlos-andreu-pintado",
        name: "Carlos Andreu Pintado",
        bio: "Miembro del Consejo Asesor. Aporta visión estratégica sobre liderazgo, cultura organizacional y desarrollo humano.",
    },
    {
        slug: "ramsi-jazmati-akili",
        name: "Ramsi Jazmati Akili",
        bio: "Miembro del Consejo Asesor. Experto en diplomacia, Oriente Medio y diálogo intercultural.",
    },
    {
        slug: "federico-aznar-fernandez-montesinos",
        name: "Federico Aznar Fernández-Montesinos",
        bio: "Miembro del Consejo Asesor. Analista en seguridad internacional, geopolítica y estudios estratégicos.",
    },
    {
        slug: "jose-ballesteros-de-la-puerta",
        name: "José Ballesteros de la Puerta",
        bio: "Miembro del Consejo Asesor. Trayectoria en el sector jurídico y en el acompañamiento de fundaciones.",
    },
    {
        slug: "alejandro-chafuen",
        name: "Alejandro Chafuen",
        bio: "Miembro del Consejo Asesor. Referente internacional en economía de la libertad y think tanks globales.",
    },
];

export const TEAM: TeamMember[] = [
    {
        slug: "jorge-machin-mezher",
        name: "Jorge Machín Mezher",
        role: "Director de Escuela Hispánica",
        area: "escuela-hispanica",
        isDirector: true,
        bio: "Director del proyecto Escuela Hispánica. Coordina la línea editorial, los programas académicos y las alianzas institucionales.",
        email: "jorge.machin@fortiusfoundation.org",
    },
    {
        slug: "beatriz-de-leon-cobo-ieam",
        name: "Beatriz de León Cobo",
        role: "Directora de IEAM",
        area: "ieam",
        isDirector: true,
        bio: "Directora del Instituto de Estudios sobre África Mediterránea. Lidera la agenda de investigación y las publicaciones del instituto.",
        email: "beatriz.deleon@fortiusfoundation.org",
    },
    {
        slug: "juliana-montoya-padilla",
        name: "Juliana Montoya Padilla",
        role: "Asistente de comunicación — Escuela Hispánica",
        area: "escuela-hispanica",
        isDirector: false,
        bio: "Apoya la comunicación y las campañas editoriales de Escuela Hispánica. Coordinación de redes sociales, piezas gráficas y newsletters.",
    },
    {
        slug: "camille-dock",
        name: "Camille Dock",
        role: "Asistente de investigación — IEAM",
        area: "ieam",
        isDirector: false,
        bio: "Apoya las líneas de investigación del IEAM. Seguimiento de publicaciones, eventos y gestión de contenidos.",
        email: "camille.dock@ieam.es",
    },
];

export function getBoardByChapter(chapter: BoardChapter): BoardMember[] {
    return PATRONATO.filter((m) => m.chapter === chapter);
}

export function getTeamByArea(area: TeamArea): TeamMember[] {
    return TEAM.filter((m) => m.area === area);
}

export function getInitials(name: string): string {
    const parts = name.split(" ").filter(Boolean);
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
    return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}
