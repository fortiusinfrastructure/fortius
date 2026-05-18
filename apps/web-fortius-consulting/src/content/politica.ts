import type { MembershipTier } from "./sociedad-civil";

export interface Subvertical {
    title: string;
    description: string;
}

export const POLITICA_INTRO = {
    kicker: "Política",
    hero: "Inteligencia política para quienes asumen la responsabilidad de decidir y de servir.",
    subcopy: [
        "Asesoramos a líderes políticos, institucionales y organizaciones estratégicas que necesitan contexto, anticipación y criterio para actuar en entornos complejos.",
        "Combinamos inteligencia política, análisis de riesgos y lectura geopolítica para convertir incertidumbre en ventaja estratégica.",
    ],
    description: [
        "La política de alto nivel exige algo más que información. Exige contexto, interpretación y capacidad de anticipación.",
        "Fortius proporciona inteligencia estratégica a quienes toman decisiones en escenarios de alta complejidad política, regulatoria o reputacional.",
        "Ayudamos a comprender actores, incentivos, riesgos y dinámicas de poder antes de que se materialicen.",
    ],
};

export const POLITICA_SUBVERTICALS: Subvertical[] = [
    {
        title: "Inteligencia Política",
        description:
            "Monitorización, análisis y anticipación de dinámicas políticas, legislativas e institucionales.",
    },
    {
        title: "Riesgo Geopolítico",
        description:
            "Evaluación estratégica de amenazas, tendencias y escenarios internacionales con impacto sobre intereses políticos, reputacionales o empresariales.",
    },
];

export const POLITICA_MEMBERSHIP_TIERS: MembershipTier[] = [
    {
        id: "basica",
        name: "Básico",
        tagline:
            "Para equipos que necesitan inteligencia política continua y contexto accionable.",
        priceMonthly: 1500,
        priceAnnual: 18000,
        ctaLabel: "Empezar plan Básico",
        benefits: [
            {
                title: "Acceso al Área clientes",
                description:
                    "Biblioteca completa de informes, briefings y dashboards de inteligencia política.",
            },
            {
                title: "Newsletter mensual",
                description:
                    "Lectura estratégica con coyuntura política, legislativa y geopolítica.",
            },
            {
                title: "Webinars cerrados",
                description:
                    "Dos sesiones anuales con analistas del equipo y voces invitadas.",
            },
            {
                title: "Consulta mensual",
                description:
                    "Sesión breve (30 min) mensual para revisar prioridades y riesgos.",
            },
            {
                title: "Descuentos en eventos",
                description:
                    "Acceso preferente y 10% de descuento en encuentros presenciales.",
            },
        ],
    },
    {
        id: "premium",
        name: "Premium",
        tagline:
            "Para liderazgos que requieren acompañamiento experto, confidencial y bajo demanda.",
        priceMonthly: 3000,
        priceAnnual: 36000,
        featured: true,
        ctaLabel: "Solicitar plan Premium",
        benefits: [
            {
                title: "Todo lo incluido en el Plan Básico",
            },
            {
                title: "Briefings confidenciales y prospectiva a medida",
                description:
                    "Lecturas reservadas con escenarios, riesgos y recomendaciones operativas para tu agenda.",
            },
            {
                title: "Sesión quincenal con el equipo Fortius",
                description:
                    "60 minutos cada quincena con un analista senior para trabajar tu contexto.",
            },
            {
                title: "Cartografía de poder personalizada",
                description:
                    "Mapeo de actores, incentivos y relaciones estructurales en tu ecosistema clave.",
            },
            {
                title: "Acceso prioritario a foros y networking",
                description:
                    "Plazas reservadas en encuentros privados con líderes y referentes.",
            },
            {
                title: "Soporte directo",
                description:
                    "Canal dedicado por email y mensajería para consultas estratégicas.",
            },
        ],
    },
];
