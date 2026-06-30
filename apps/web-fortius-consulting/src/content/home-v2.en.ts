import type { VerticalDef } from "./home-v2";

export const VERTICALS_EN: VerticalDef[] = [
    {
        id: "civil",
        number: "01",
        label: "Civil Society",
        href: "/sociedad-civil",
        kicker: "Work area 01",
        headline: "We strengthen those who defend",
        headlineItalic: "principles in society.",
        description:
            "We support think tanks, foundations, NGOs and civic platforms in designing and implementing strategies that maximise the impact of their values.",
        services: [
            {
                title: "Organisational design and structuring",
                description:
                    "We create solid, scalable and growth-ready organisations with professional governance structures, processes and institutional architecture.",
                icon: "users",
            },
            {
                title: "Positioning and impact strategy",
                description:
                    "We define strategic plans to maximise public influence, institutional relevance and the transformative capacity of each organisation.",
                icon: "network",
            },
            {
                title: "Institutional relations and public affairs",
                description:
                    "We connect organisations with the public and private stakeholders relevant to their strategic objectives.",
                icon: "fileText",
            },
            {
                title: "Impact measurement and evaluation",
                description:
                    "We design indicator systems and evaluation frameworks to measure the real impact of institutional activity and guide decision-making.",
                icon: "search",
            },
            {
                title: "Strategic research and reports",
                description:
                    "We produce studies, reports and applied analyses to support strategic decisions and strengthen the intellectual positioning of the organisation.",
                icon: "bookOpen",
            },
            {
                title: "Strategic communications and campaigns",
                description:
                    "We design narratives, campaigns and communication strategies aimed at amplifying influence, visibility and mobilisation capacity.",
                icon: "megaphone",
            },
            {
                title: "Social mobilisation and coalition-building",
                description:
                    "We articulate networks, alliances and collaborative platforms to multiply advocacy capacity.",
                icon: "handshake",
            },
            {
                title: "Talent selection and development",
                description:
                    "We identify and attract key profiles aligned with the mission, culture and strategic needs of the organisation.",
                icon: "userCheck",
            },
            {
                title: "Digital systems and community management",
                description:
                    "We design the digital infrastructure needed to professionalise operations, fundraising, communications and relationships with support communities.",
                icon: "monitor",
            },
        ],
        insights: [
            {
                slug: "sociedad-civil-horizonte-2030",
                category: "Strategy",
                title: "The 2030 horizon for principle-driven organisations",
                excerpt:
                    "How foundations and civic platforms are reshaping their agenda under regulatory pressure.",
                date: "24 Mar 2026",
                readTime: "12 min",
                featured: true,
            },
            {
                slug: "think-tanks-impacto",
                category: "Measurement",
                title: "How think tanks measure the real impact of their work today",
                excerpt: "Metrics that matter beyond reach and mentions.",
                date: "11 Mar 2026",
                readTime: "6 min",
            },
            {
                slug: "fundaciones-gobernanza",
                category: "Governance",
                title: "Governance in foundations: five signs of maturity",
                excerpt: "What separates sustainable organisations from those that don't survive succession.",
                date: "02 Mar 2026",
                readTime: "7 min",
            },
        ],
        lockedArticle: {
            category: "Premium Report",
            title: "Institutional maturity: closed diagnostic for European foundations",
            excerpt:
                "Internal benchmark with governance, fundraising and reputation metrics from 32 reference foundations. Access reserved for organisations with a framework agreement.",
            readTime: "22 min",
            publishedAt: "April 2026",
        },
        experts: [
            { name: "Dídac Sánchez Olaya", role: "Public Affairs Director" },
            { name: "Alexia Cosmello Guisande", role: "Public Affairs" },
            { name: "Calli Pacheco Muñoz", role: "Communications" },
            { name: "Javier Soto Gómez", role: "Legal & Accounting" },
        ],
        testimonials: [
            {
                quote:
                    "Fortius helped us redesign our impact framework with a clarity we had not achieved internally.",
                author: "Director General",
                role: "International Think Tank",
            },
        ],
        clients: ["Acton Institute", "Universidad de Navarra", "The LEX Fellowship", "ACI Prensa", "Chapel & York", "Principios"],
        privateArea: {
            title: "Private Area — Civil Society",
            description:
                "Access to frameworks, templates and diagnostics for advised organisations.",
            ctaLabel: "Request access",
        },
    },
    {
        id: "intelligence",
        number: "02",
        label: "Policy",
        href: "/politica",
        kicker: "Work area 02",
        headline: "Precise intelligence for",
        headlineItalic: "high-stakes decisions.",
        description:
            "Political intelligence and geopolitical risk analysis for leaders who need context before acting. Periodic reports, continuous monitoring and reputational due diligence.",
        services: [
            {
                title: "Political and legislative intelligence",
                description:
                    "Monitoring, interpretation and anticipation of political, parliamentary, regulatory and institutional dynamics.",
                icon: "activity",
            },
            {
                title: "Situation reports and executive analysis",
                description:
                    "We produce periodic analyses and synthesis documents for decision-makers who require clear, actionable context.",
                icon: "bookOpen",
            },
            {
                title: "Reputational and key-actor assessment",
                description:
                    "We analyse profiles, potential partners, allies, adversaries and associated reputational risks.",
                icon: "shieldCheck",
            },
            {
                title: "Power mapping and institutional ecosystems",
                description:
                    "We identify actors, influence networks, incentives and structural relationships in complex environments.",
                icon: "network",
            },
            {
                title: "Geopolitical risk analysis",
                description:
                    "We assess international scenarios, regional trends and strategic threats with potential political or reputational impact.",
                icon: "globe",
            },
            {
                title: "Strategic foresight and scenario analysis",
                description:
                    "We build plausible future scenarios to anticipate risks, opportunities and inflection points.",
                icon: "search",
            },
        ],
        insights: [
            {
                slug: "elecciones-europeas-riesgo",
                category: "Geopolitics",
                title: "European elections: risk map for institutional actors",
                excerpt:
                    "A reading of probable scenarios and blind spots worth monitoring.",
                date: "18 Mar 2026",
                readTime: "8 min",
                featured: true,
            },
            {
                slug: "sahel-dinamicas-2026",
                category: "North Africa & Sahel",
                title: "Power dynamics in the Sahel: three vectors to watch in 2026",
                excerpt: "Actors, alliances and red lines that deserve close attention.",
                date: "04 Mar 2026",
                readTime: "10 min",
            },
            {
                slug: "latinoamerica-2026",
                category: "Americas",
                title: "Latin America 2026: electoral cycles and elite transitions",
                excerpt: "What to expect in the next semester and where the real risk lies.",
                date: "25 Feb 2026",
                readTime: "9 min",
            },
        ],
        lockedArticle: {
            category: "Confidential Briefing",
            title: "Geopolitical risk map Q2 2026: critical vectors for decision-makers",
            excerpt:
                "Reserved reading with forward-looking scenarios on the Sahel, Latin America and EU dynamics. Includes windows of opportunity and red lines identified by our analysts.",
            readTime: "30 min",
            publishedAt: "April 2026",
        },
        experts: [
            { name: "Beatriz de León Cobo", role: "Political Intelligence", area: "North Africa & Sahel" },
            { name: "Tasnim Idriss", role: "Political Intelligence", area: "North Africa & Sahel" },
            { name: "Juan Pablo Chamón Saucedo", role: "Political Intelligence", area: "Americas" },
            { name: "Alberto Andrés Rodríguez", role: "Of-Counsel Digital" },
        ],
        testimonials: [
            {
                quote:
                    "Fortius reports became required reading before every strategic board decision.",
                author: "Chief Strategy Officer",
                role: "European institutional group",
            },
        ],
        clients: ["Axioma", "ISI", "International Cooperation", "Acton Institute"],
        privateArea: {
            title: "Private Area — Policy",
            description:
                "Exclusive access to reports, monitoring dashboards and political intelligence briefs.",
            ctaLabel: "Request access",
        },
    },
];
