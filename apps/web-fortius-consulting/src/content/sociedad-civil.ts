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
    href?: string;
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
};

export async function getSociedadCivilIntro(locale: string) {
    if (locale === "en") {
        const { SOCIEDAD_CIVIL_INTRO_EN } = await import("./sociedad-civil.en");
        return SOCIEDAD_CIVIL_INTRO_EN;
    }
    return SOCIEDAD_CIVIL_INTRO;
}

export async function getSociedadCivilTiers(locale: string): Promise<MembershipTier[]> {
    if (locale === "en") {
        const { MEMBERSHIP_TIERS_EN } = await import("./sociedad-civil.en");
        return MEMBERSHIP_TIERS_EN;
    }
    return MEMBERSHIP_TIERS;
}

export const MEMBERSHIP_TIERS: MembershipTier[] = [
    {
        id: "basica",
        name: "Básico",
        tagline:
            "Para organizaciones que necesitan inteligencia estratégica continua.",
        priceMonthly: 1000,
        priceAnnual: 12000,
        ctaLabel: "Acceder al plan básico",
        href: "/area-privada",
        benefits: [
            {
                title: "Acceso al Área clientes",
                description:
                    "Biblioteca completa de informes, briefings y diagnósticos de Sociedad Civil.",
            },
            {
                title: "Newsletter mensual",
                description:
                    "Lectura estratégica con análisis de coyuntura, casos y benchmarks.",
            },
            {
                title: "Webinars cerrados",
                description:
                    "Dos sesiones anuales con expertos del equipo y voces invitadas.",
            },
            {
                title: "Consulta mensual",
                description:
                    "Sesión breve (30 min) mensual para revisar prioridades.",
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
        priceMonthly: 2000,
        priceAnnual: 24000,
        featured: true,
        ctaLabel: "Acceder al plan Premium",
        href: "/area-privada",
        benefits: [
            {
                title: "Todo lo incluido en el Plan Básico",
            },
            {
                title: "Informes premium y briefings confidenciales",
                description:
                    "Lecturas reservadas con escenarios prospectivos y recomendaciones operativas.",
            },
            {
                title: "Sesión quincenal con el equipo Fortius",
                description:
                    "60 minutos cada quincena con uno de los responsables del área para trabajar tu agenda.",
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
