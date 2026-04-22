import type { VerticalId } from "@/content/home-v2";

export type Department =
    | "direccion"
    | "asuntos-publicos"
    | "inteligencia-politica"
    | "digital"
    | "legal-contable";

export const DEPARTMENT_LABEL: Record<Department, string> = {
    direccion: "Dirección",
    "asuntos-publicos": "Asuntos Públicos",
    "inteligencia-politica": "Inteligencia Política",
    digital: "Digital",
    "legal-contable": "Legal y Contable",
};

export const DEPARTMENT_ORDER: Department[] = [
    "direccion",
    "asuntos-publicos",
    "inteligencia-politica",
    "digital",
    "legal-contable",
];

export interface TeamMember {
    slug: string;
    name: string;
    role: string;
    department: Department;
    verticals: VerticalId[];
    area?: string;
    bio: string;
    email?: string;
    linkedin?: string;
    twitter?: string;
    photo?: string;
}

export interface ExternalExpert {
    slug: string;
    name: string;
    role: string;
    vertical: VerticalId;
    bio: string;
}

export const TEAM: TeamMember[] = [
    {
        slug: "juan-angel-soto",
        name: "Juan Ángel Soto Gómez",
        role: "Founder & CEO",
        department: "direccion",
        verticals: ["civil", "intelligence"],
        bio: "Fundador de Fortius Consulting. Más de quince años acompañando a organizaciones con principios en su estrategia institucional, comunicación y relaciones con decisores públicos. Conferenciante habitual en foros sobre sociedad civil, valores y política.",
        email: "juan.soto@fortiusconsulting.com",
        linkedin: "https://www.linkedin.com/in/juan-angel-soto",
    },
    {
        slug: "didac-sanchez-olaya",
        name: "Dídac Sánchez Olaya",
        role: "Director de Asuntos Públicos",
        department: "asuntos-publicos",
        verticals: ["civil"],
        bio: "Lidera la práctica de asuntos públicos de Fortius. Diseño y ejecución de campañas de incidencia, mapeo de stakeholders y estrategia de relación con instituciones europeas y nacionales.",
        email: "didac.sanchez@fortiusconsulting.com",
        linkedin: "https://www.linkedin.com/in/didac-sanchez-olaya",
    },
    {
        slug: "alexia-cosmello-guisande",
        name: "Alexia Cosmello Guisande",
        role: "Asuntos Públicos",
        department: "asuntos-publicos",
        verticals: ["civil"],
        bio: "Analista y ejecutora de campañas de asuntos públicos. Especializada en el seguimiento legislativo y la elaboración de documentos de posición para clientes del tercer sector.",
        email: "alexia.cosmello@fortiusconsulting.com",
        linkedin: "https://www.linkedin.com/in/alexia-cosmello",
    },
    {
        slug: "calli-pacheco-munoz",
        name: "Calli Pacheco Muñoz",
        role: "Asistente de Comunicación",
        department: "asuntos-publicos",
        verticals: ["civil"],
        bio: "Apoya la ejecución de campañas de comunicación y contenidos editoriales para clientes de sociedad civil. Coordinación de redes, piezas gráficas y newsletters.",
        email: "calli.pacheco@fortiusconsulting.com",
    },
    {
        slug: "beatriz-de-leon-cobo",
        name: "Beatriz de León Cobo",
        role: "Inteligencia Política",
        department: "inteligencia-politica",
        verticals: ["intelligence"],
        area: "Norte de África y Sahel",
        bio: "Analista senior de la región Norte de África y Sahel. Seguimiento de dinámicas de poder, actores armados y escenarios de riesgo para clientes institucionales y corporativos.",
        email: "beatriz.deleon@fortiusconsulting.com",
        linkedin: "https://www.linkedin.com/in/beatriz-de-leon-cobo",
    },
    {
        slug: "tasnim-idriss",
        name: "Tasnim Idriss",
        role: "Inteligencia Política",
        department: "inteligencia-politica",
        verticals: ["intelligence"],
        area: "Norte de África y Sahel",
        bio: "Investigadora en dinámicas sociopolíticas del Magreb. Conecta fuentes primarias sobre el terreno con análisis aplicado a decisiones estratégicas.",
        email: "tasnim.idriss@fortiusconsulting.com",
    },
    {
        slug: "juan-pablo-chamon-saucedo",
        name: "Juan Pablo Chamón Saucedo",
        role: "Inteligencia Política",
        department: "inteligencia-politica",
        verticals: ["intelligence"],
        area: "América",
        bio: "Analista de ciclos electorales y transición de élites en América Latina. Seguimiento de procesos constituyentes, riesgo regulatorio y dinámicas hemisféricas.",
        email: "juan.chamon@fortiusconsulting.com",
        linkedin: "https://www.linkedin.com/in/juan-pablo-chamon",
    },
    {
        slug: "alberto-andres-rodriguez",
        name: "Alberto Andrés Rodríguez",
        role: "Of-Counsel Digital",
        department: "digital",
        verticals: ["intelligence"],
        bio: "Asesor externo para estrategia digital, reputación online y monitorización de ecosistemas de información. Puente entre inteligencia política y presencia digital.",
        email: "alberto.andres@fortiusconsulting.com",
        linkedin: "https://www.linkedin.com/in/alberto-andres-rodriguez",
    },
    {
        slug: "diego-salazar-ramirez",
        name: "Diego Salazar Ramírez",
        role: "CTO",
        department: "digital",
        verticals: ["intelligence"],
        bio: "Responsable de tecnología y producto en Fortius. Diseña las plataformas internas de análisis, dashboards de monitorización y áreas privadas para clientes.",
        email: "diego.salazar@fortiusconsulting.com",
        linkedin: "https://www.linkedin.com/in/diego-salazar-ramirez",
    },
    {
        slug: "javier-soto-gomez",
        name: "Javier Soto Gómez",
        role: "Legal y Contable",
        department: "legal-contable",
        verticals: ["civil"],
        bio: "Responsable del área legal y contable. Constitución y gobierno de entidades, cumplimiento normativo y acompañamiento fiscal a fundaciones y asociaciones.",
        email: "javier.soto@fortiusconsulting.com",
    },
];

const LOREM =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.";

export const EXPERTS: ExternalExpert[] = [
    {
        slug: "experto-civil-1",
        name: "Experto vinculado · 01",
        role: "Gobernanza de fundaciones",
        vertical: "civil",
        bio: LOREM,
    },
    {
        slug: "experto-civil-2",
        name: "Experto vinculado · 02",
        role: "Medición de impacto social",
        vertical: "civil",
        bio: LOREM,
    },
    {
        slug: "experto-civil-3",
        name: "Experto vinculado · 03",
        role: "Filantropía estratégica",
        vertical: "civil",
        bio: LOREM,
    },
    {
        slug: "experto-intel-1",
        name: "Experto vinculado · 01",
        role: "Riesgo geopolítico Europa",
        vertical: "intelligence",
        bio: LOREM,
    },
    {
        slug: "experto-intel-2",
        name: "Experto vinculado · 02",
        role: "Análisis Indo-Pacífico",
        vertical: "intelligence",
        bio: LOREM,
    },
    {
        slug: "experto-intel-3",
        name: "Experto vinculado · 03",
        role: "Due diligence reputacional",
        vertical: "intelligence",
        bio: LOREM,
    },
];

export function getTeamByVertical(vertical: VerticalId): TeamMember[] {
    return TEAM.filter((m) => m.verticals.includes(vertical));
}

export function getExpertsByVertical(vertical: VerticalId): ExternalExpert[] {
    return EXPERTS.filter((e) => e.vertical === vertical);
}

export function getTeamByDepartment(department: Department): TeamMember[] {
    return TEAM.filter((m) => m.department === department);
}

export function getInitials(name: string): string {
    const parts = name.split(" ").filter(Boolean);
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
    return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}
