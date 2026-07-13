/**
 * Structured, bilingual content for event/opportunity articles.
 *
 * The generic `getEventArticleData` parser in `lib/article-display.ts` derives
 * packages heuristically from docx-flattened markdown, which mis-pairs
 * label/value cells and garbles prices (the "€" bug). For curated
 * opportunities we author the data here instead — clean packages, correct
 * prices, per-package CTAs — keyed by the article `slug`. `EventArticleBlocks`
 * prefers this when present and falls back to the parser otherwise.
 */

export interface OpportunityPackage {
    name: string;
    name_en: string;
    /** Numeric price with currency, e.g. "2.000 €". Null hides the price chip. */
    price: string | null;
    /** Optional qualifier shown before the price, e.g. "Suplemento" / "Supplement". */
    priceLabel?: string;
    priceLabel_en?: string;
    description?: string;
    description_en?: string;
    includes?: string[];
    includes_en?: string[];
    note?: string;
    note_en?: string;
    featured?: boolean;
    /**
     * Optional direct-payment link for this package (Stripe payment link / route).
     * When absent, only the "I'm interested" contact CTA is shown.
     */
    checkoutUrl?: string;
}

export interface OpportunityContent {
    date: string;
    date_en: string;
    location: string;
    location_en: string;
    organizer: string;
    intro?: string;
    intro_en?: string;
    packages: OpportunityPackage[];
    /** Contact address surfaced under the packages. */
    contactEmail?: string;
}

export const OPPORTUNITIES: Record<string, OpportunityContent> = {
    "2026-09-15-geopolitical-summit-2026": {
        date: "15 – 17 de septiembre de 2026",
        date_en: "15 – 17 September 2026",
        location: "Budapest, Hungría",
        location_en: "Budapest, Hungary",
        organizer: "Danube Institute",
        intro:
            "Fortius ha diseñado dos paquetes de participación exclusivos para maximizar tu impacto y presencia durante la conferencia. Ambos incluyen una agenda de reuniones coordinada previamente por nuestro equipo para asegurar interacciones productivas con los stakeholders clave.",
        intro_en:
            "Fortius has designed two exclusive participation packages to maximise your impact and presence during the conference. Both include a meeting agenda coordinated in advance by our team to secure productive interactions with key stakeholders.",
        contactEmail: "info@fortiusconsulting.org",
        packages: [
            {
                name: "Paquete Mínimo",
                name_en: "Standard Package",
                price: "2.000 €",
                description:
                    "Diseñado para garantizar una inmersión productiva entre los stakeholders clave del evento.",
                description_en:
                    "Designed to guarantee a productive immersion among the event's key stakeholders.",
                includes: [
                    "Agenda de reuniones con actores políticos y del ecosistema conservador de think tanks y organizaciones de la sociedad civil europeo e internacional.",
                    "Al menos 10 reuniones garantizadas con stakeholders relevantes.",
                    "Soporte Fortius: briefing previo, contacto directo con stakeholders y debriefing posterior.",
                ],
                includes_en: [
                    "Meeting agenda with political actors and the conservative ecosystem of think tanks and civil-society organisations, both European and international.",
                    "At least 10 guaranteed meetings with relevant stakeholders.",
                    "Fortius support: prior briefing, direct contact with stakeholders and follow-up debriefing.",
                ],
            },
            {
                name: "Paquete Premium",
                name_en: "Premium Package",
                price: "3.500 €",
                featured: true,
                description:
                    "Para quienes buscan una presencia y un acompañamiento más intensivos, con cobertura ampliada y soporte personalizado sobre el terreno.",
                description_en:
                    "For those seeking a more intensive presence and support, with expanded coverage and personalised on-the-ground assistance.",
                includes: [
                    "Agenda ampliada con actores políticos y del ecosistema conservador de think tanks y organizaciones de la sociedad civil europeo e internacional.",
                    "15 reuniones garantizadas con stakeholders relevantes.",
                    "Soporte Fortius: briefing previo, contacto directo con stakeholders y debriefing posterior.",
                    "Un miembro del equipo de Fortius sobre el terreno durante los 3 días de la conferencia, acompañando al cliente para facilitar interacciones y logística.",
                ],
                includes_en: [
                    "Expanded agenda with political actors and the conservative ecosystem of think tanks and civil-society organisations, both European and international.",
                    "15 guaranteed meetings with relevant stakeholders.",
                    "Fortius support: prior briefing, direct contact with stakeholders and follow-up debriefing.",
                    "A Fortius team member on the ground throughout the 3-day conference, accompanying the client to facilitate interactions and logistics.",
                ],
                note:
                    "El coste de logística (viajes, alojamiento, manutención) del miembro del equipo Fortius que acompaña al cliente no está incluido en el precio del Paquete Premium.",
                note_en:
                    "The logistics cost (travel, accommodation, meals) of the Fortius team member accompanying the client is not included in the Premium Package price.",
            },
        ],
    },

    "2026-09-19-patriots-network-madrid-2026": {
        date: "19 de septiembre de 2026",
        date_en: "19 September 2026",
        location: "Madrid, España",
        location_en: "Madrid, Spain",
        organizer: "Patriots Network",
        intro:
            "Foro político internacional de alto nivel que reunirá en Madrid a líderes políticos, representantes institucionales, directivos empresariales, think tanks, académicos y medios comprometidos con la libertad, la soberanía y la responsabilidad institucional. La jornada combina paneles de alto nivel, encuentros privados, networking y una cena de gala con invitados internacionales.",
        intro_en:
            "A high-level international political forum bringing together in Madrid political leaders, institutional representatives, business executives, think tanks, academics and media committed to freedom, sovereignty and institutional responsibility. The day combines high-level panels, private meetings, networking and a gala dinner with international guests.",
        contactEmail: "info@fortiusconsulting.org",
        packages: [
            {
                name: "Patrocinador Estándar",
                name_en: "Standard Sponsor",
                price: "2.000 €",
                includes: [
                    "Presencia de marca en la imagen oficial del evento.",
                    "Inclusión del logotipo en materiales impresos y digitales.",
                    "Mención en el programa y comunicaciones oficiales.",
                    "Dos invitaciones completas al evento, incluida la cena de gala.",
                    "Visibilidad en las comunicaciones previas y posteriores al encuentro.",
                ],
                includes_en: [
                    "Brand presence in the event's official imagery.",
                    "Logo inclusion in printed and digital materials.",
                    "Mention in the programme and official communications.",
                    "Two full invitations to the event, including the gala dinner.",
                    "Visibility in communications before and after the forum.",
                ],
            },
            {
                name: "Patrocinador Premium",
                name_en: "Premium Sponsor",
                price: "5.000 €",
                featured: true,
                description:
                    "Incluye todas las ventajas del patrocinio estándar, además de:",
                description_en:
                    "Includes all the benefits of standard sponsorship, plus:",
                includes: [
                    "Máxima visibilidad durante todo el evento.",
                    "Tres invitaciones VIP.",
                    "Posibilidad de intervenir como ponente en uno de los paneles temáticos.",
                    "Acciones de posicionamiento mediático.",
                    "Alojamiento y hospitalidad para los ponentes cuando corresponda.",
                ],
                includes_en: [
                    "Maximum visibility throughout the event.",
                    "Three VIP invitations.",
                    "Option to speak as a panellist in one of the thematic panels.",
                    "Media positioning actions.",
                    "Accommodation and hospitality for speakers where applicable.",
                ],
            },
            {
                name: "Participación como ponente",
                name_en: "Speaker Participation",
                price: "2.500 €",
                description:
                    "Dirigido a organizaciones, empresas e instituciones que deseen presentar su actividad ante una audiencia altamente cualificada.",
                description_en:
                    "Aimed at organisations, companies and institutions wishing to present their work before a highly qualified audience.",
                includes: [
                    "Participación en un panel temático o mesa redonda.",
                    "Dos noches de alojamiento.",
                    "Cobertura y entrevistas con medios colaboradores.",
                    "Grabación audiovisual profesional de la intervención.",
                    "Invitación a la cena de gala junto al resto de ponentes e invitados institucionales.",
                ],
                includes_en: [
                    "Participation in a thematic panel or round table.",
                    "Two nights' accommodation.",
                    "Coverage and interviews with partner media.",
                    "Professional audiovisual recording of the intervention.",
                    "Invitation to the gala dinner alongside other speakers and institutional guests.",
                ],
            },
            {
                name: "Agenda institucional privada en Madrid",
                name_en: "Private Institutional Agenda in Madrid",
                price: "2.000 €",
                priceLabel: "Suplemento",
                priceLabel_en: "Supplement",
                description:
                    "Opcional. Fortius Consulting diseña una agenda personalizada para maximizar el impacto de la visita a Madrid, con reuniones organizadas y coordinadas íntegramente por nuestro equipo.",
                description_en:
                    "Optional. Fortius Consulting designs a tailored agenda to maximise the impact of the Madrid visit, with meetings organised and coordinated entirely by our team.",
                includes: [
                    "Ministerios.",
                    "Grupos parlamentarios.",
                    "Think tanks de referencia.",
                    "Medios de comunicación.",
                    "Instituciones académicas y organizaciones de la sociedad civil.",
                ],
                includes_en: [
                    "Ministries.",
                    "Parliamentary groups.",
                    "Leading think tanks.",
                    "Media outlets.",
                    "Academic institutions and civil-society organisations.",
                ],
            },
        ],
    },
};

export function getOpportunity(slug: string): OpportunityContent | null {
    return OPPORTUNITIES[slug] ?? null;
}
