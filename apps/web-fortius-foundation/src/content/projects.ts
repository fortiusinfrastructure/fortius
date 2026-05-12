export type ProjectStage = "exito" | "incubacion";

export interface FoundationProject {
  slug: string;
  name: string;
  stage: ProjectStage;
  title: string;
  summary: string;
  details: string[];
  logoSrc: string;
  siteUrl: string;
  ctaLabel: string;
}

export const PROJECTS: FoundationProject[] = [
  {
    slug: "ieam",
    name: "IEAM",
    stage: "exito",
    title: "Instituto Español de Análisis Migratorio",
    summary:
      "Nacido en 2025, el Instituto Español de Análisis Migratorio es el primer centro de análisis en España dedicado específicamente al estudio integral del fenómeno migratorio desde una perspectiva multidisciplinar, rigurosa y orientada a políticas públicas.",
    details: [
      "Creado para elevar el nivel del debate migratorio en España, IEAM produce investigación, datos, análisis comparado y recomendaciones estratégicas sobre migración, integración, demografía, asilo y seguridad fronteriza.",
      "Su misión es aportar seriedad analítica y profundidad técnica a uno de los debates más decisivos para el futuro de Europa.",
      "A su vez, el IEAM cuenta con Mediterranean Dialogue, una plataforma de análisis, diálogo y generación de propuestas sobre los grandes desafíos geopolíticos, migratorios y de seguridad que afectan al Mediterráneo y su área de influencia.",
    ],
    logoSrc: "https://ieam.es/ieam-logo-new.png",
    siteUrl: "https://ieam.es/",
    ctaLabel: "Ir a la web del IEAM",
  },
  {
    slug: "escuela-hispanica",
    name: "Escuela Hispánica",
    stage: "exito",
    title: "Formación, pensamiento y comunidad en el espacio hispánico",
    summary:
      "Escuela Hispánica es una iniciativa de formación, pensamiento y comunidad orientada a la revitalización y difusión de la tradición intelectual hispánica y al fortalecimiento de una conciencia cultural compartida en el espacio hispánico.",
    details: [
      "Nacida en septiembre de 2023, busca recuperar, actualizar y proyectar el legado político, filosófico e histórico de la tradición hispánica de la libertad, conectándolo con los desafíos contemporáneos del mundo occidental.",
      "A través de seminarios, publicaciones, encuentros y programas formativos, articula una red creciente de académicos, estudiantes, profesionales y líderes comprometidos con la defensa y actualización del pensamiento hispánico.",
    ],
    logoSrc: "https://escuelahispanica.org/recursos/logo.svg",
    siteUrl: "https://escuelahispanica.org/",
    ctaLabel: "Ir a la web de Escuela Hispánica",
  },
  {
    slug: "principios",
    name: "Principios",
    stage: "exito",
    title: "Formación de jóvenes líderes con vocación de impacto",
    summary:
      "Principios es una asociación independiente española nacida en 2014 con el compromiso de contribuir a la regeneración cultural, institucional y política de España.",
    details: [
      "Tras un periodo de inactividad desde 2019, Principios inició en 2022 una nueva etapa al integrarse en el ecosistema de la Fundación Fortius, con el objetivo de dotarse de una estructura más profesional y redefinir su misión a la luz de los nuevos desafíos políticos, sociales y culturales que enfrenta España.",
      "Hoy constituye uno de los proyectos embrionarios del ecosistema Fortius, centrado en la formación de jóvenes líderes y en la articulación de propuestas de política pública vinculadas a los vínculos sociales, el trabajo y el civismo.",
      "Su actividad combina formación intelectual, comunidad, mentoría y generación de espacios de encuentro para jóvenes con vocación de servicio público y transformación social.",
    ],
    logoSrc: "https://fundacionfortius.org/wp-content/uploads/2024/02/branding-Principios-def_logo_sobre-verde-scaled-e1737136366622.jpg",
    siteUrl: "https://www.principios.org/",
    ctaLabel: "Ir a la web de Principios",
  },
  {
    slug: "free-press-forum",
    name: "Free Press Forum",
    stage: "incubacion",
    title: "Defensa de la libertad de expresión y del pluralismo",
    summary:
      "Con sede en Bruselas e impulsado desde septiembre de 2024, Free Press Forum es una iniciativa actualmente incubada por la Fundación Fortius dedicada a la defensa de la libertad de expresión, la libertad de prensa y el pluralismo en el debate público.",
    details: [
      "Creado como respuesta al creciente deterioro de la libertad discursiva en Occidente, reúne a periodistas, académicos, intelectuales y líderes de opinión para analizar y confrontar las nuevas amenazas a la libertad de pensamiento y de expresión.",
      "Bajo este sello, Fundación Fortius impulsa conferencias, debates, publicaciones y alianzas internacionales centradas en la defensa de una esfera pública verdaderamente libre y plural.",
    ],
    logoSrc: "https://fundacionfortius.org/wp-content/uploads/2024/04/Logos_FREE.jpg",
    siteUrl: "https://freepressforum.org/",
    ctaLabel: "Ir a la web de Free Press Forum",
  },
];

export function getProjectsByStage(stage: ProjectStage): FoundationProject[] {
  return PROJECTS.filter((project) => project.stage === stage);
}
