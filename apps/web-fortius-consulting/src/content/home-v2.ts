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
        kicker: "Vertical 01",
        headline: "Fortalecemos a quienes defienden",
        headlineItalic: "principios en la sociedad.",
        description:
            "Acompañamos a think tanks, fundaciones, ONGs y plataformas ciudadanas en el diseño e implementación de estrategias que maximicen el impacto de sus valores.",
        services: [
            {
                title: "Análisis y medición de impacto",
                description: "Medimos lo que importa para que tomes las mejores decisiones.",
                icon: "search",
            },
            {
                title: "Asuntos públicos",
                description: "Conectamos tu voz con quienes toman decisiones clave.",
                icon: "fileText",
            },
            {
                title: "Comunicación y campañas",
                description: "Damos vida a tu marca y la conectamos con tu público ideal.",
                icon: "megaphone",
            },
            {
                title: "Constitución y desarrollo de organizaciones",
                description: "Te ayudamos a construir una organización fuerte y preparada para crecer.",
                icon: "users",
            },
            {
                title: "Diseño y gestión de proyectos",
                description: "Hacemos que tus ideas cobren vida con planificación y resultados reales.",
                icon: "network",
            },
            {
                title: "Headhunting y desarrollo de talento",
                description: "Encontramos el talento que tu organización necesita para triunfar.",
                icon: "userCheck",
            },
            {
                title: "Investigaciones e informes",
                description: "Transformamos datos en información que impulsa tus decisiones.",
                icon: "bookOpen",
            },
            {
                title: "Movilización social y alianzas",
                description: "Creamos conexiones estratégicas que generan cambios reales.",
                icon: "handshake",
            },
            {
                title: "Comunicación, diseño y audiovisuales",
                description: "Diseñamos y optimizamos tu presencia online para destacar en el mundo digital.",
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
            title: "Área privada — Sociedad Civil",
            description:
                "Acceso a frameworks, plantillas y diagnósticos para organizaciones asesoradas.",
            ctaLabel: "Solicitar acceso",
        },
    },
    {
        id: "intelligence",
        number: "02",
        label: "Inteligencia",
        href: "/inteligencia",
        kicker: "Vertical 02",
        headline: "Información precisa para decisiones de",
        headlineItalic: "alto impacto.",
        description:
            "Inteligencia política y análisis de riesgos geopolíticos para líderes que necesitan contexto antes de actuar. Informes periódicos, monitorización continua y due diligence reputacional.",
        services: [
            {
                title: "Geopolitical & Intelligence Reports",
                description:
                    "Informes periódicos sobre riesgos geopolíticos que afectan a tu sector y geografías de interés.",
                icon: "globe",
            },
            {
                title: "Monitorización política y legislativa",
                description:
                    "Seguimiento en tiempo real de iniciativas legislativas, nombramientos y cambios regulatorios.",
                icon: "activity",
            },
            {
                title: "Due diligence reputacional",
                description:
                    "Análisis exhaustivo del perfil público y riesgos reputacionales de personas, organizaciones y socios.",
                icon: "shieldCheck",
            },
            {
                title: "Investigación de ecosistemas institucionales",
                description:
                    "Mapeo de actores clave, relaciones de poder y dinámicas de influencia en ecosistemas complejos.",
                icon: "network",
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
            title: "Área privada — Intelligence",
            description:
                "Acceso exclusivo a informes, monitorizaciones y dashboards de inteligencia.",
            ctaLabel: "Solicitar acceso",
        },
    },
];

export const RADICAL_IDEAS = [
    "Gobernanza con principios",
    "Inteligencia aplicada",
    "Impacto medible",
    "Sociedades fuertes",
    "Análisis riguroso",
    "Decisión informada",
    "Estrategia con valores",
    "Contexto antes que ruido",
];
