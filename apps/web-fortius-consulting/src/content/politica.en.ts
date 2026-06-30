import type { MembershipTier } from "./sociedad-civil";
import type { Subvertical } from "./politica";

export const POLITICA_INTRO_EN = {
    kicker: "Policy",
    hero: "Political intelligence for those who take responsibility for deciding and serving.",
    subcopy: [
        "We advise political leaders, parties and institutions that need context, anticipation and judgement to act in complex environments. We combine political intelligence, risk analysis and geopolitical reading to turn uncertainty into strategic advantage.",
    ],
    description: [
        "High-level politics requires more than information. It requires interpretation and the capacity to anticipate. At Fortius we help understand actors, incentives and power dynamics before they materialise — so that decision-makers act with clarity and courage.",
    ],
};

export const POLITICA_SUBVERTICALS_EN: Subvertical[] = [
    {
        title: "Political Intelligence",
        description: "Monitoring, analysis and anticipation of political, legislative and institutional dynamics.",
    },
    {
        title: "Geopolitical Risk",
        description:
            "Strategic assessment of threats, trends and international scenarios with impact on political, reputational or business interests.",
    },
];

export const POLITICA_MEMBERSHIP_TIERS_EN: MembershipTier[] = [
    {
        id: "basica",
        name: "Basic",
        tagline: "For teams that need continuous political intelligence and actionable context.",
        priceMonthly: 1500,
        priceAnnual: 18000,
        ctaLabel: "Access the basic plan",
        href: "/area-privada",
        benefits: [
            {
                title: "Access to the Client Area",
                description: "Complete library of political intelligence reports, briefings and dashboards.",
            },
            {
                title: "Monthly newsletter",
                description: "Strategic reading with political, legislative and geopolitical context.",
            },
            {
                title: "Closed webinars",
                description: "Two annual sessions with team analysts and invited speakers.",
            },
            {
                title: "Monthly consultation",
                description: "Brief (30 min) monthly session to review priorities and risks.",
            },
            {
                title: "Event discounts",
                description: "Priority access and 10% discount on in-person events.",
            },
        ],
    },
    {
        id: "premium",
        name: "Premium",
        tagline: "For leadership teams requiring expert, confidential and on-demand accompaniment.",
        priceMonthly: 3000,
        priceAnnual: 36000,
        featured: true,
        ctaLabel: "Access the Premium plan",
        href: "/area-privada",
        benefits: [
            { title: "Everything in the Basic Plan" },
            {
                title: "Confidential briefings and bespoke foresight",
                description: "Reserved readings with scenarios, risks and operational recommendations for your agenda.",
            },
            {
                title: "Bi-weekly session with the Fortius team",
                description: "60 minutes every fortnight with a senior analyst to work on your context.",
            },
            {
                title: "Personalised power mapping",
                description: "Mapping of actors, incentives and structural relationships in your key ecosystem.",
            },
            {
                title: "Priority access to forums and networking",
                description: "Reserved places at private events with leaders and key figures.",
            },
            {
                title: "Direct support",
                description: "Dedicated email and messaging channel for strategic consultations.",
            },
        ],
    },
];
