export type VerticalId = "civil" | "intelligence";

export interface Insight {
    slug: string;
    category: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    featured?: boolean;
}

export interface Expert {
    name: string;
    role: string;
    area?: string;
}

export type ServiceIcon =
    | "search"
    | "fileText"
    | "megaphone"
    | "users"
    | "network"
    | "userCheck"
    | "bookOpen"
    | "handshake"
    | "monitor"
    | "globe"
    | "activity"
    | "shieldCheck";

export interface ServiceItem {
    title: string;
    description: string;
    icon: ServiceIcon;
}

export interface Testimonial {
    quote: string;
    author: string;
    role: string;
}

export interface LockedArticle {
    category: string;
    title: string;
    excerpt: string;
    readTime: string;
    publishedAt: string;
}

export interface VerticalDef {
    id: VerticalId;
    number: string;
    label: string;
    href: string;
    kicker: string;
    headline: string;
    headlineItalic: string;
    description: string;
    services: ServiceItem[];
    insights: Insight[];
    lockedArticle: LockedArticle;
    experts: Expert[];
    testimonials: Testimonial[];
    clients: string[];
    privateArea: {
        title: string;
        description: string;
        ctaLabel: string;
    };
}

export const VERTICALS: VerticalDef[] = [
    {
        id: "civil",
        number: "01",
        label: "Sociedad Civil",
        href: "/sociedad-civil",
        kicker: "Área de trabajo 01",
        headline: "Fortalecemos a quienes defienden",
        headlineItalic: "principios en la sociedad.",
        description:
            "Acompañamos a think tanks, fundaciones, ONGs y plataformas ciudadanas en el diseño e implementación de estrategias que maximicen el impacto de sus valores.",
        services: [
            {
                title: "Diseño y estructuración de organizaciones",
                description:
                    "Creamos organizaciones sólidas, escalables y preparadas para crecer, con estructuras de gobernanza, procesos y arquitectura institucional profesionalizados.",
                icon: "users",
            },
            {
                title: "Estrategia de posicionamiento e impacto",
                description:
                    "Definimos planes estratégicos para maximizar la influencia pública, la relevancia institucional y la capacidad transformadora de cada organización.",
                icon: "network",
            },
            {
                title: "Relaciones institucionales y asuntos públicos",
                description:
                    "Conectamos a las organizaciones con los actores públicos y privados relevantes para sus objetivos estratégicos.",
                icon: "fileText",
            },
            {
                title: "Medición y evaluación de impacto",
                description:
                    "Diseñamos sistemas de indicadores y evaluación para medir el impacto real de la actividad institucional y orientar la toma de decisiones.",
                icon: "search",
            },
            {
                title: "Investigación estratégica e informes",
                description:
                    "Elaboramos estudios, informes y análisis aplicados para apoyar decisiones estratégicas y fortalecer el posicionamiento intelectual de la organización.",
                icon: "bookOpen",
            },
            {
                title: "Comunicación estratégica y campañas",
                description:
                    "Diseñamos narrativas, campañas y estrategias de comunicación orientadas a amplificar influencia, notoriedad y capacidad de movilización.",
                icon: "megaphone",
            },
            {
                title: "Movilización social y construcción de alianzas",
                description:
                    "Articulamos redes, alianzas y plataformas de colaboración para multiplicar la capacidad de incidencia.",
                icon: "handshake",
            },
            {
                title: "Selección y desarrollo de talento",
                description:
                    "Identificamos y atraemos perfiles clave alineados con la misión, cultura y necesidades estratégicas de la organización.",
                icon: "userCheck",
            },
            {
                title: "Sistemas digitales y gestión de comunidades",
                description:
                    "Diseñamos la infraestructura digital necesaria para profesionalizar operaciones, captación, comunicación y relación con comunidades de apoyo.",
                icon: "monitor",
            },
        ],
        insights: [
            {
                slug: "sociedad-civil-horizonte-2030",
                category: "Estrategia",
                title: "El horizonte 2030 para las organizaciones con principios",
                excerpt:
                    "Cómo las fundaciones y plataformas ciudadanas están reconfigurando su agenda ante la presión regulatoria.",
                date: "24 Mar 2026",
                readTime: "12 min",
                featured: true,
            },
            {
                slug: "think-tanks-impacto",
                category: "Medición",
                title: "Cómo los think tanks miden hoy el impacto real de su trabajo",
                excerpt: "Métricas que importan más allá del alcance y menciones.",
                date: "11 Mar 2026",
                readTime: "6 min",
            },
            {
                slug: "fundaciones-gobernanza",
                category: "Gobernanza",
                title: "Gobernanza en fundaciones: cinco señales de madurez",
                excerpt: "Qué separa a las organizaciones sostenibles de las que no sobreviven al relevo.",
                date: "02 Mar 2026",
                readTime: "7 min",
            },
        ],
        lockedArticle: {
            category: "Informe Premium",
            title: "Madurez institucional: diagnóstico cerrado para fundaciones europeas",
            excerpt:
                "Benchmark interno con métricas de gobernanza, captación y reputación de 32 fundaciones de referencia. Acceso reservado a organizaciones con convenio.",
            readTime: "22 min",
            publishedAt: "Abril 2026",
        },
        experts: [
            { name: "Dídac Sánchez Olaya", role: "Director Asuntos Públicos" },
            { name: "Alexia Cosmello Guisande", role: "Asuntos Públicos" },
            { name: "Calli Pacheco Muñoz", role: "Comunicación" },
            { name: "Javier Soto Gómez", role: "Legal y Contable" },
        ],
        testimonials: [
            {
                quote:
                    "Fortius nos ayudó a rediseñar nuestro marco de impacto con una claridad que no habíamos logrado internamente.",
                author: "Directora General",
                role: "Think Tank internacional",
            },
        ],
        clients: ["Acton Institute", "Universidad de Navarra", "The LEX Fellowship", "ACI Prensa", "Chapel & York", "Principios"],
        privateArea: {
            title: "Área Privada — Sociedad Civil",
            description:
                "Acceso a frameworks, plantillas y diagnósticos para organizaciones asesoradas.",
            ctaLabel: "Solicitar acceso",
        },
    },
    {
        id: "intelligence",
        number: "02",
        label: "Política",
        href: "/politica",
        kicker: "Área de trabajo 02",
        headline: "Información precisa para decisiones de",
        headlineItalic: "alto impacto.",
        description:
            "Inteligencia política y análisis de riesgos geopolíticos para líderes que necesitan contexto antes de actuar. Informes periódicos, monitorización continua y due diligence reputacional.",
        services: [
            {
                title: "Inteligencia política y legislativa",
                description:
                    "Seguimiento, interpretación y anticipación de dinámicas políticas, parlamentarias, regulatorias e institucionales.",
                icon: "activity",
            },
            {
                title: "Informes de coyuntura y análisis ejecutivo",
                description:
                    "Elaboramos análisis periódicos y documentos de síntesis para decisores que requieren contexto claro y útil para la acción.",
                icon: "bookOpen",
            },
            {
                title: "Evaluación reputacional y de actores clave",
                description:
                    "Analizamos perfiles, socios potenciales, aliados, adversarios y riesgos reputacionales asociados.",
                icon: "shieldCheck",
            },
            {
                title: "Cartografía de poder y ecosistemas institucionales",
                description:
                    "Identificamos actores, redes de influencia, incentivos y relaciones estructurales en entornos complejos.",
                icon: "network",
            },
            {
                title: "Análisis de riesgo geopolítico",
                description:
                    "Evaluamos escenarios internacionales, tendencias regionales y amenazas estratégicas con potencial impacto político o reputacional.",
                icon: "globe",
            },
            {
                title: "Prospectiva estratégica y análisis de escenarios",
                description:
                    "Construimos escenarios futuros plausibles para anticipar riesgos, oportunidades y puntos de inflexión.",
                icon: "search",
            },
        ],
        insights: [
            {
                slug: "elecciones-europeas-riesgo",
                category: "Geopolítica",
                title: "Elecciones europeas: mapa de riesgo para actores institucionales",
                excerpt:
                    "Lectura de los escenarios probables y puntos ciegos que conviene monitorizar.",
                date: "18 Mar 2026",
                readTime: "8 min",
                featured: true,
            },
            {
                slug: "sahel-dinamicas-2026",
                category: "Norte de África y Sahel",
                title: "Dinámicas de poder en el Sahel: tres vectores a seguir en 2026",
                excerpt: "Actores, alianzas y líneas rojas que conviene observar con atención.",
                date: "04 Mar 2026",
                readTime: "10 min",
            },
            {
                slug: "latinoamerica-2026",
                category: "América",
                title: "Latinoamérica 2026: ciclos electorales y transición de élites",
                excerpt: "Qué esperar del próximo semestre y dónde está el verdadero riesgo.",
                date: "25 Feb 2026",
                readTime: "9 min",
            },
        ],
        lockedArticle: {
            category: "Briefing Confidencial",
            title: "Mapa de riesgo geopolítico Q2 2026: vectores críticos para tomadores de decisión",
            excerpt:
                "Lectura reservada con escenarios prospectivos sobre Sahel, Latinoamérica y dinámicas en la UE. Incluye ventanas de oportunidad y líneas rojas detectadas por nuestros analistas.",
            readTime: "30 min",
            publishedAt: "Abril 2026",
        },
        experts: [
            { name: "Beatriz de León Cobo", role: "Inteligencia Política", area: "Norte de África y Sahel" },
            { name: "Tasnim Idriss", role: "Inteligencia Política", area: "Norte de África y Sahel" },
            { name: "Juan Pablo Chamón Saucedo", role: "Inteligencia Política", area: "América" },
            { name: "Alberto Andrés Rodríguez", role: "Of-Counsel Digital" },
        ],
        testimonials: [
            {
                quote:
                    "Los informes de Fortius se convirtieron en lectura obligada antes de cada decisión estratégica del consejo.",
                author: "Chief Strategy Officer",
                role: "Grupo institucional europeo",
            },
        ],
        clients: ["Axioma", "ISI", "Cooperación Internacional", "Acton Institute"],
        privateArea: {
            title: "Área Privada — Política",
            description:
                "Acceso exclusivo a informes, monitorizaciones y dashboards de inteligencia política.",
            ctaLabel: "Solicitar acceso",
        },
    },
];

export interface Ally {
    name: string;
    logo?: string;
}

export const ALLIES: Ally[] = [
    { name: "Universidad de Navarra", logo: "/images/aliados/unav-fortius-red.png" },
    { name: "The Lex Fellowship", logo: "/images/aliados/lex-fellowship-fortius-red.png" },
    { name: "ACI Prensa", logo: "/images/aliados/aceprensa-fortius-red.png" },
    { name: "Chapel & York", logo: "/images/aliados/chapel-york-fortius-red-2.png" },
    { name: "Axioma", logo: "/images/aliados/axioma-fortius-red.png" },
    { name: "Open Doors", logo: "/images/aliados/opendoors-fortius-red.png" },
    { name: "Universidad Francisco de Vitoria", logo: "/images/aliados/ufv-fortius-red.png" },
    { name: "World Youth Alliance", logo: "/images/aliados/wya-fortius-red.png" },
    { name: "ADF", logo: "/images/aliados/adf-fortius-red.png" },
    { name: "Civismo", logo: "/images/aliados/civismo-fortius-red.png" },
    { name: "Disenso", logo: "/images/aliados/disenso-fortius-red.png" },
    { name: "ECR", logo: "/images/aliados/ecr-fortius-red.png" },
    { name: "Fe y Libertad", logo: "/images/aliados/fe-libertad-fortius-red.png" },
    { name: "Hespérides", logo: "/images/aliados/hesperides-fortius-final.png" },
    { name: "Ludovika", logo: "/images/aliados/ludovika-ups-fortius-red.png" },
    { name: "MKI", logo: "/images/aliados/mki-fortius-red.png" },
    { name: "New Direction", logo: "/images/aliados/newdirection-fortius-red.png" },
    { name: "PHSU", logo: "/images/aliados/phsu-fortius-red.png" },
    { name: "Cruz del Sur", logo: "/images/aliados/Cruz -del-Sur.png" },
    { name: "Navarra Confidencial", logo: "/images/aliados/Navarra-Confidencial.png" },
];
