export type ProjectStage = "exito" | "incubacion";

export interface FoundationProject {
  slug: string;
  name: string;
  name_en: string;
  stage: ProjectStage;
  title: string;
  summary: string;
  summary_en: string;
  details: string[];
  details_en: string[];
  logoSrc: string;
  siteUrl: string;
  ctaLabel: string;
  ctaLabel_en: string;
}

export const PROJECTS: FoundationProject[] = [
  {
    slug: "ieam",
    name: "ANÁLISIS MIGRATORIO",
    name_en: "MIGRATION ANALYSIS",
    stage: "exito",
    title: "Instituto Español de Análisis Migratorio",
    summary:
      "Nacido en 2025, el Instituto Español de Análisis Migratorio es el primer centro de análisis en España dedicado específicamente al estudio integral del fenómeno migratorio desde una perspectiva multidisciplinar, rigurosa y orientada a políticas públicas.",
    summary_en:
      "Founded in 2025, the Instituto Español de Análisis Migratorio is the first analysis centre in Spain dedicated specifically to the comprehensive study of migration from a multidisciplinary, rigorous and public-policy-oriented perspective.",
    details: [
      "Creado para elevar el nivel del debate migratorio en España, IEAM produce investigación, datos, análisis comparado y recomendaciones estratégicas sobre migración, integración, demografía, asilo y seguridad fronteriza.",
      "Su misión es aportar seriedad analítica y profundidad técnica a uno de los debates más decisivos para el futuro de Europa.",
      "A su vez, el IEAM cuenta con Mediterranean Dialogue, una plataforma de análisis, diálogo y generación de propuestas sobre los grandes desafíos geopolíticos, migratorios y de seguridad que afectan al Mediterráneo y su área de influencia.",
    ],
    details_en: [
      "Created to raise the standard of the migration debate in Spain, IEAM produces research, data, comparative analysis and strategic recommendations on migration, integration, demography, asylum and border security.",
      "Its mission is to bring analytical rigour and technical depth to one of the most decisive debates for the future of Europe.",
      "IEAM also encompasses Mediterranean Dialogue, a platform for analysis, dialogue and policy proposals addressing the major geopolitical, migratory and security challenges affecting the Mediterranean and its sphere of influence.",
    ],
    logoSrc: "https://ieam.es/ieam-logo-new.png",
    siteUrl: "https://ieam.es/",
    ctaLabel: "Ir a la web del IEAM",
    ctaLabel_en: "Visit IEAM website",
  },
  {
    slug: "escuela-hispanica",
    name: "TRADICIÓN HISPÁNICA DE LA LIBERTAD",
    name_en: "HISPANIC TRADITION OF LIBERTY",
    stage: "exito",
    title: "Escuela Hispánica",
    summary:
      "Escuela Hispánica es una iniciativa de formación, pensamiento y comunidad orientada a la revitalización y difusión de la tradición intelectual hispánica y al fortalecimiento de una conciencia cultural compartida en el espacio hispánico.",
    summary_en:
      "Escuela Hispánica is an educational, intellectual and community initiative aimed at revitalising and disseminating the Hispanic intellectual tradition and strengthening a shared cultural identity across the Hispanic world.",
    details: [
      "Nacida en septiembre de 2023, busca recuperar, actualizar y proyectar el legado político, filosófico e histórico de la tradición hispánica de la libertad, conectándolo con los desafíos contemporáneos del mundo occidental.",
      "A través de seminarios, publicaciones, encuentros y programas formativos, articula una red creciente de académicos, estudiantes, profesionales y líderes comprometidos con la defensa y actualización del pensamiento hispánico.",
    ],
    details_en: [
      "Founded in September 2023, it seeks to recover, update and project the political, philosophical and historical legacy of the Hispanic tradition of liberty, connecting it to the contemporary challenges facing the Western world.",
      "Through seminars, publications, gatherings and training programmes, it builds a growing network of academics, students, professionals and leaders committed to defending and renewing Hispanic thought.",
    ],
    logoSrc: "https://escuelahispanica.org/recursos/logo.svg",
    siteUrl: "https://escuelahispanica.org/",
    ctaLabel: "Ir a la web de Escuela Hispánica",
    ctaLabel_en: "Visit Escuela Hispánica website",
  },
  {
    slug: "principios",
    name: "Vínculos, Trabajo y Civismo",
    name_en: "Bonds, Work and Civic Life",
    stage: "exito",
    title: "Principios",
    summary:
      "Principios es una asociación independiente española nacida en 2014 con el compromiso de contribuir a la regeneración cultural, institucional y política de España.",
    summary_en:
      "Principios is an independent Spanish association founded in 2014 with a commitment to contributing to the cultural, institutional and political renewal of Spain.",
    details: [
      "Tras un periodo de inactividad desde 2019, Principios inició en 2022 una nueva etapa al integrarse en el ecosistema de la Fundación Fortius, con el objetivo de dotarse de una estructura más profesional y redefinir su misión a la luz de los nuevos desafíos políticos, sociales y culturales que enfrenta España.",
      "Hoy constituye uno de los proyectos embrionarios del ecosistema Fortius, centrado en la formación de jóvenes líderes y en la articulación de propuestas de política pública vinculadas a los vínculos sociales, el trabajo y el civismo.",
      "Su actividad combina formación intelectual, comunidad, mentoría y generación de espacios de encuentro para jóvenes con vocación de servicio público y transformación social.",
    ],
    details_en: [
      "After a period of inactivity since 2019, Principios began a new phase in 2022 by joining the Fortius Foundation ecosystem, with the aim of developing a more professional structure and redefining its mission in light of the new political, social and cultural challenges facing Spain.",
      "Today it is one of the embryonic projects of the Fortius ecosystem, focused on training young leaders and developing public policy proposals linked to social bonds, work and civic life.",
      "Its activities combine intellectual formation, community, mentoring and the creation of meeting spaces for young people with a vocation for public service and social transformation.",
    ],
    logoSrc: "https://fundacionfortius.org/wp-content/uploads/2024/02/branding-Principios-def_logo_sobre-verde-scaled-e1737136366622.jpg",
    siteUrl: "https://www.principios.org/",
    ctaLabel: "Ir a la web de Principios",
    ctaLabel_en: "Visit Principios website",
  },
  {
    slug: "free-press-forum",
    name: "LIBERTAD DE EXPRESIÓN",
    name_en: "FREEDOM OF EXPRESSION",
    stage: "incubacion",
    title: "Free Press Forum",
    summary:
      "Con sede en Bruselas e impulsado desde septiembre de 2024, Free Press Forum es una iniciativa actualmente incubada por la Fundación Fortius dedicada a la defensa de la libertad de expresión, la libertad de prensa y el pluralismo en el debate público.",
    summary_en:
      "Based in Brussels and launched in September 2024, Free Press Forum is an initiative currently incubated by Fortius Foundation, dedicated to the defence of freedom of expression, press freedom and pluralism in public debate.",
    details: [
      "Creado como respuesta al creciente deterioro de la libertad discursiva en Occidente, reúne a periodistas, académicos, intelectuales y líderes de opinión para analizar y confrontar las nuevas amenazas a la libertad de pensamiento y de expresión.",
      "Bajo este sello, Fundación Fortius impulsa conferencias, debates, publicaciones y alianzas internacionales centradas en la defensa de una esfera pública verdaderamente libre y plural.",
    ],
    details_en: [
      "Created in response to the growing deterioration of discursive freedom in the West, it brings together journalists, academics, intellectuals and opinion leaders to analyse and confront the new threats to freedom of thought and expression.",
      "Under this banner, Fortius Foundation drives conferences, debates, publications and international alliances focused on defending a truly free and pluralistic public sphere.",
    ],
    logoSrc: "https://fundacionfortius.org/wp-content/uploads/2024/04/Logos_FREE.jpg",
    siteUrl: "https://freepressforum.org/",
    ctaLabel: "Ir a la web de Free Press Forum",
    ctaLabel_en: "Visit Free Press Forum website",
  },
  {
    slug: "transatlantic-fellowship",
    name: "LIDERAZGO Y SOCIEDAD",
    name_en: "LEADERSHIP AND SOCIETY",
    stage: "incubacion",
    title: "Transatlantic Fellowship",
    summary:
      "Transatlantic Fellowship es un programa de formación y conexión entre futuros líderes europeos y americanos, enfocado en el intercambio de ideas y el fortalecimiento de la sociedad civil a ambos lados del Atlántico.",
    summary_en:
      "Transatlantic Fellowship is a training and connection programme for future European and American leaders, focused on the exchange of ideas and the strengthening of civil society on both sides of the Atlantic.",
    details: [
      "A través de seminarios inmersivos, encuentros y proyectos compartidos, buscamos construir una red sólida de jóvenes profesionales comprometidos con los valores de la libertad y el humanismo.",
      "Los participantes colaboran en propuestas tangibles, estableciendo vínculos que superan fronteras y promueven una visión constructiva para Occidente.",
    ],
    details_en: [
      "Through immersive seminars, meetings and shared projects, we seek to build a solid network of young professionals committed to the values of freedom and humanism.",
      "Participants collaborate on tangible proposals, establishing ties that transcend borders and promote a constructive vision for the West.",
    ],
    logoSrc: "https://fundacionfortius.org/wp-content/uploads/2024/04/Logos_FREE.jpg",
    siteUrl: "/incubadora/transatlantic-fellowship",
    ctaLabel: "Ver detalles de incubación",
    ctaLabel_en: "View incubation details",
  },
];

export function getProjectsByStage(stage: ProjectStage): FoundationProject[] {
  return PROJECTS.filter((project) => project.stage === stage);
}
