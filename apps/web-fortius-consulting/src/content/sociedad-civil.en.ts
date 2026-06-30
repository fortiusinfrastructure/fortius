import type { MembershipTier } from "./sociedad-civil";

export const SOCIEDAD_CIVIL_INTRO_EN = {
    kicker: "Civil Society",
    hero: "We strengthen those who defend principles in society.",
    subcopy: [
        "We work with foundations, think tanks, associations, civic platforms, leaders and institutional entrepreneurs who seek to transform society through ideas, culture and organised action.",
        "We do not support empty causes or bureaucratic structures.",
        "We work with those who have a clear vision, firm principles and a genuine will for impact.",
    ],
    description: [
        "Civil society does not change by inertia. It changes when serious, well-led and strategically structured organisations turn conviction into influence.",
        "At Fortius we help build, professionalise and scale organisations and initiatives capable of shaping public debate, influencing institutions and generating sustained cultural change.",
        "From organisational design to operational execution, we support those who understand that ideas only matter when they succeed in translating into social power.",
    ],
};

export const MEMBERSHIP_TIERS_EN: MembershipTier[] = [
    {
        id: "basica",
        name: "Basic",
        tagline: "For organisations that need continuous strategic intelligence.",
        priceMonthly: 1000,
        priceAnnual: 12000,
        ctaLabel: "Access the basic plan",
        href: "/area-privada",
        benefits: [
            {
                title: "Access to the Client Area",
                description: "Complete library of Civil Society reports, briefings and diagnostics.",
            },
            {
                title: "Monthly newsletter",
                description: "Strategic reading with situation analysis, case studies and benchmarks.",
            },
            {
                title: "Closed webinars",
                description: "Two annual sessions with team experts and invited speakers.",
            },
            {
                title: "Monthly consultation",
                description: "Brief (30 min) monthly session to review priorities.",
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
        tagline: "For leadership teams requiring expert, confidential accompaniment.",
        priceMonthly: 2000,
        priceAnnual: 24000,
        featured: true,
        ctaLabel: "Access the Premium plan",
        href: "/area-privada",
        benefits: [
            { title: "Everything in the Basic Plan" },
            {
                title: "Premium reports and confidential briefings",
                description: "Reserved readings with forward-looking scenarios and operational recommendations.",
            },
            {
                title: "Bi-weekly session with the Fortius team",
                description: "60 minutes every fortnight with one of the area leads to work on your agenda.",
            },
            {
                title: "Quarterly bespoke briefing",
                description: "Executive diagnostic on your organisation and its institutional context.",
            },
            {
                title: "Priority access to forums and networking",
                description: "Reserved places at private events with leaders and donors.",
            },
            {
                title: "Direct support",
                description: "Dedicated email and messaging channel for strategic consultations.",
            },
        ],
    },
];
