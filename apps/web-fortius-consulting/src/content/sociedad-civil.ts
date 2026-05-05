export interface MembershipBenefit {
    title: string;
    description?: string;
}

export interface MembershipTier {
    id: "basica" | "premium";
    name: string;
    tagline: string;
    priceMonthly: number;
    priceAnnual: number;
    annualDiscountLabel?: string;
    benefits: MembershipBenefit[];
    featured?: boolean;
    ctaLabel: string;
}

export const SOCIEDAD_CIVIL_INTRO = {
    kicker: "Sociedad Civil",
    hero: "Fortalecemos a quienes defienden principios en la sociedad.",
    subcopy: [
        "Trabajamos con fundaciones, think tanks, asociaciones, plataformas ciudadanas, líderes y emprendedores institucionales que buscan transformar la sociedad desde las ideas, la cultura y la acción organizada.",
        "No acompañamos causas vacías ni estructuras burocráticas.",
        "Trabajamos con quienes tienen una visión clara, principios firmes y voluntad real de impacto.",
    ],
    description: [
        "La sociedad civil no cambia por inercia. Cambia cuando organizaciones serias, bien dirigidas y estratégicamente estructuradas convierten convicciones en influencia.",
        "En Fortius ayudamos a construir, profesionalizar y escalar organizaciones e iniciativas capaces de moldear el debate público, influir en instituciones y generar cambio cultural sostenido.",
        "Desde el diseño organizativo hasta la ejecución operativa, acompañamos a quienes entienden que las ideas solo importan cuando logran traducirse en poder social.",
    ],
    claim: {
        primary: "Ideas con estructura.",
        secondary: "Principios con impacto.",
    },
};

export const MEMBERSHIP_TIERS: MembershipTier[] = [
    {
        id: "basica",
        name: "Básica",
        tagline:
            "Para organizaciones que necesitan inteligencia estratégica continua.",
        priceMonthly: 250,
        priceAnnual: 3000,
        ctaLabel: "Empezar plan Básica",
        benefits: [
            {
                title: "Acceso al Área Privada",
                description:
                    "Biblioteca completa de informes, briefings y diagnósticos de Sociedad Civil.",
            },
            {
                title: "Newsletter quincenal",
                description:
                    "Lectura estratégica con análisis de coyuntura, casos y benchmarks.",
            },
            {
                title: "Webinars cerrados",
                description:
                    "Dos sesiones anuales con expertos del equipo y voces invitadas.",
            },
            {
                title: "Consulta trimestral",
                description:
                    "Sesión breve (30 min) por trimestre para revisar prioridades.",
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
            "Para liderazgos que requieren acompañamiento experto y confidencial.",
        priceMonthly: 1000,
        priceAnnual: 12000,
        featured: true,
        ctaLabel: "Solicitar plan Premium",
        benefits: [
            {
                title: "Todo lo incluido en el plan Básica",
            },
            {
                title: "Informes premium y briefings confidenciales",
                description:
                    "Lecturas reservadas con escenarios prospectivos y recomendaciones operativas.",
            },
            {
                title: "Sesión mensual con el equipo Fortius",
                description:
                    "60 minutos al mes con uno de los responsables del área para trabajar tu agenda.",
            },
            {
                title: "Briefing trimestral a medida",
                description:
                    "Diagnóstico ejecutivo sobre tu organización y su contexto institucional.",
            },
            {
                title: "Acceso prioritario a foros y networking",
                description:
                    "Plazas reservadas en encuentros privados con líderes y donantes.",
            },
            {
                title: "Soporte directo",
                description:
                    "Canal dedicado por email y mensajería para consultas estratégicas.",
            },
        ],
    },
];
