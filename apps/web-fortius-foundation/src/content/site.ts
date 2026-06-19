export const FOUNDATION_QUOTES = [
  "Servimos a quienes han elegido servir.",
  "Trabajamos con quienes entienden el liderazgo como servicio, no como privilegio.",
  "No acompañamos a quienes hacen carrera de una causa. Acompañamos a quienes asumen el deber de defenderla.",
  "Las mejores causas merecen mejores estrategas.",
];

export const FOUNDATION_NAV_LINKS = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Incubadora", href: "/incubadora" },
  { label: "Ayudas", href: "/ayudas" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
] as const;

export const LEGAL_LINKS = [
  { label: "Aviso Legal", href: "/legal" },
  { label: "Política de Privacidad", href: "/privacidad" },
  { label: "Política de Cookies", href: "/cookies" },
] as const;

export const FOUNDATION_SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/fundacion-fortius/" },
  { label: "X", href: "https://x.com/F_Fortius" },
] as const;

export const ABOUT_SECTIONS = [
  {
    kicker: "Quiénes somos",
    title: "Impulsamos a quienes entienden el liderazgo como servicio.",
    body: [
      "Fundación Fortius fortalece personas, organizaciones e iniciativas que quieren servir con seriedad, criterio y vocación de legado.",
      "Creemos que las grandes causas necesitan instituciones fuertes, equipos bien preparados y una estructura capaz de sostenerlas en el tiempo.",
    ],
  },
  {
    kicker: "Nuestra filosofía",
    title: "Trabajamos para que las ideas correctas transformen la sociedad.",
    body: [
      "Las ideas solo cambian la historia cuando encuentran personas e instituciones capaces de encarnarlas, defenderlas y proyectarlas con excelencia.",
      "Por eso trabajamos allí donde hacen falta formación, estructura, comunidad y visión de largo plazo.",
    ],
  },
  {
    kicker: "A quién servimos",
    title: "Trabajamos con quienes aspiran a construir legado.",
    body: [
      "Apoyamos a fundaciones, think tanks, iniciativas educativas, líderes emergentes, emprendedores sociales y actores cívicos comprometidos con la renovación cultural e institucional.",
      "Trabajamos con quienes quieren construir legado, no solo presencia.",
    ],
  },
  {
    kicker: "Nuestro enfoque",
    title: "Mucho más que respaldo pasivo.",
    body: [
      "No nos limitamos a financiar. Actuamos como plataforma de articulación, impulso y acompañamiento estratégico.",
      "Conectamos talento, recursos, ideas y oportunidades para que los proyectos serios ganen consistencia, escala e impacto.",
    ],
  },
];

export const FOUNDATION_TIMELINE = [
  { year: "2023", label: "Nace Fundación Fortius España", place: "Madrid" },
  { year: "2025", label: "Nace Fortius Foundation United States", place: "Houston, Texas" },
];

export const FOUNDATION_TIMELINE_COPY = [
  "Llevamos años acompañando a organizaciones e instituciones en Europa, América y África.",
  "Ese recorrido nos ha permitido construir una red de aliados, proyectos y responsables institucionales con los que compartimos exigencia, criterio y vocación de servicio.",
];

export const FOUNDATION_ENTITIES = {
  spain: {
    name: "Fundación Fortius España",
    codeLabel: "NIF",
    code: "G56299100",
    address: "Calle Zurbano 71, Oficina 9, 28010, Madrid, Reino de España",
  },
  usa: {
    name: "Fortius Foundation United States",
    codeLabel: "EIN",
    code: "37-2229546",
    address: "1417 Oak Tree Dr., 77055, Houston, Texas, Estados Unidos de América",
  },
} as const;

export const STRATEGIC_PARTNERS = [
  {
    name: "TrustBridge",
    href: "https://www.trustbridgeglobal.com/",
    logoSrc: "/entradas/images/trus.svg",
    copy: "TrustBridge es un centro con sede en Suiza para una plataforma global de pagos filantrópicos e inversión de impacto. Como parte de esta red, Fundación Fortius España permite a los donantes en España realizar donaciones internacionales con plena confianza y con los correspondientes certificados de desgravación fiscal.",
  },
  {
    name: "Together.eu",
    href: "https://together.europarl.europa.eu/es/",
    logoSrc: "/entradas/images/togethes.svg",
    copy: "Together.eu, iniciativa del Parlamento Europeo, es una plataforma paneuropea de participación cívica orientada a fortalecer la democracia y la implicación de la sociedad civil en la vida pública europea. Esta colaboración refuerza nuestra vocación de contribuir a una ciudadanía más formada, libre y comprometida con el futuro de Europa.",
  },
];

export const DONOR_BENEFITS = [
  "Evaluación profesional de proyectos y beneficiarios.",
  "Diseño y estructuración estratégica de ayudas.",
  "Supervisión y rendición de cuentas.",
  "Vocación de impacto medible.",
  "Fortalecimiento institucional de beneficiarios.",
  "Área privada de donante.",
];

export const BENEFICIARY_BENEFITS = [
  "Financiación estructurada y orientada a impacto.",
  "Acompañamiento estratégico y profesionalización.",
  "Transferencia de capacidades y know-how.",
  "Acceso a una red de alto valor.",
  "Área privada de beneficiarios.",
];

export const EXPERIENCE_COPY = [
  "Fundación Fortius y su ecosistema acumulan años de experiencia trabajando junto a fundaciones, think tanks, instituciones educativas, plataformas cívicas y organizaciones de impacto en España y en el ámbito internacional.",
  "Nuestra combinación de experiencia operativa, criterio estratégico y conocimiento institucional nos permite identificar proyectos con verdadero potencial transformador y acompañarlos con estándares profesionales de primer nivel.",
];

export const FOUNDATION_CONTACT = {
  email: "info@fundacionfortius.org",
  spain: FOUNDATION_ENTITIES.spain.address,
  usa: FOUNDATION_ENTITIES.usa.address,
};