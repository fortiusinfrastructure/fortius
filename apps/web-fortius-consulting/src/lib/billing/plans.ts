export type BillingInterval = "monthly" | "annual";

export type ConsultingPlanKey =
    | "sociedad-civil-basica"
    | "sociedad-civil-premium"
    | "politica-basica"
    | "politica-premium";

interface BillingPrice {
    amountEuros: number;
    label: string;
    envVar: string;
}

export interface ConsultingBillingPlan {
    key: ConsultingPlanKey;
    vertical: "sociedad-civil" | "politica";
    verticalLabel: string;
    tier: "basica" | "premium";
    tierLabel: string;
    displayName: string;
    description: string;
    prices: Record<BillingInterval, BillingPrice>;
}

export const CONSULTING_ORG_SLUG = process.env.NEXT_PUBLIC_ORG_SLUG || "fortius-consulting";

export const CONSULTING_BILLING_PLANS: ConsultingBillingPlan[] = [
    {
        key: "sociedad-civil-basica",
        vertical: "sociedad-civil",
        verticalLabel: "Sociedad Civil",
        tier: "basica",
        tierLabel: "Básico",
        displayName: "Sociedad Civil — Básico",
        description: "Para organizaciones que necesitan inteligencia estratégica continua.",
        prices: {
            monthly: { amountEuros: 1000, label: "1.000€ / mes", envVar: "STRIPE_PRICE_CONSULTING_SOCIEDAD_CIVIL_BASICA_MONTHLY" },
            annual: { amountEuros: 12000, label: "12.000€ / año", envVar: "STRIPE_PRICE_CONSULTING_SOCIEDAD_CIVIL_BASICA_ANNUAL" },
        },
    },
    {
        key: "sociedad-civil-premium",
        vertical: "sociedad-civil",
        verticalLabel: "Sociedad Civil",
        tier: "premium",
        tierLabel: "Premium",
        displayName: "Sociedad Civil — Premium",
        description: "Para liderazgos que requieren acompañamiento experto y confidencial.",
        prices: {
            monthly: { amountEuros: 2000, label: "2.000€ / mes", envVar: "STRIPE_PRICE_CONSULTING_SOCIEDAD_CIVIL_PREMIUM_MONTHLY" },
            annual: { amountEuros: 24000, label: "24.000€ / año", envVar: "STRIPE_PRICE_CONSULTING_SOCIEDAD_CIVIL_PREMIUM_ANNUAL" },
        },
    },
    {
        key: "politica-basica",
        vertical: "politica",
        verticalLabel: "Política",
        tier: "basica",
        tierLabel: "Básico",
        displayName: "Política — Básico",
        description: "Para equipos que necesitan inteligencia política continua y contexto accionable.",
        prices: {
            monthly: { amountEuros: 1500, label: "1.500€ / mes", envVar: "STRIPE_PRICE_CONSULTING_POLITICA_BASICA_MONTHLY" },
            annual: { amountEuros: 18000, label: "18.000€ / año", envVar: "STRIPE_PRICE_CONSULTING_POLITICA_BASICA_ANNUAL" },
        },
    },
    {
        key: "politica-premium",
        vertical: "politica",
        verticalLabel: "Política",
        tier: "premium",
        tierLabel: "Premium",
        displayName: "Política — Premium",
        description: "Para liderazgos que requieren acompañamiento experto, confidencial y bajo demanda.",
        prices: {
            monthly: { amountEuros: 3000, label: "3.000€ / mes", envVar: "STRIPE_PRICE_CONSULTING_POLITICA_PREMIUM_MONTHLY" },
            annual: { amountEuros: 36000, label: "36.000€ / año", envVar: "STRIPE_PRICE_CONSULTING_POLITICA_PREMIUM_ANNUAL" },
        },
    },
];

export function getConsultingBillingPlan(planKey: string) {
    return CONSULTING_BILLING_PLANS.find((plan) => plan.key === planKey);
}

export function getConsultingPriceId(plan: ConsultingBillingPlan, interval: BillingInterval) {
    const envVar = plan.prices[interval].envVar;
    const priceId = process.env[envVar];

    if (!priceId) {
        throw new Error(`Falta configurar ${envVar}`);
    }

    return priceId;
}