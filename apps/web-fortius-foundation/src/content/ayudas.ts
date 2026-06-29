export interface Ayuda {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  description: string[];
  deadline: string;
  pdfUrl: string | null;
  imageUrl: string | null;
  maxAmount: string | null;
  eligibility: string[];
  requirements: string[];
  status: "open" | "closed" | "upcoming";
}

export const AYUDAS: Ayuda[] = [
  {
    slug: "familia-fortius-2026",
    title: "Convocatoria Familia Fortius 2026",
    kicker: "Convocatoria abierta",
    summary:
      "Programa de apoyo para familias y organizaciones que trabajan en el fortalecimiento del tejido familiar.",
    description: [
      "La Convocatoria Familia Fortius 2026 tiene como objetivo apoyar económica y estratégicamente a familias y organizaciones que promuevan valores de unidad, responsabilidad y compromiso en el entorno familiar.",
      "Esta convocatoria está dirigida tanto a familias en situación de necesidad acreditada como a organizaciones sin ánimo de lucro que desarrollen proyectos de acompañamiento, formación o apoyo a la institución familiar.",
      "La Fundación evaluará cada solicitud atendiendo al impacto esperado, la solidez del proyecto y la capacidad del beneficiario para rendir cuentas del destino de los fondos.",
    ],
    deadline: "30 de septiembre de 2026",
    pdfUrl: "/ayudas/convocatoria_familia_fortius_2026.pdf",
    imageUrl: "/ayudas/convocatoria_familia_fortius_2026.png",
    maxAmount: "Según proyecto",
    eligibility: [
      "Familias en situación de necesidad acreditada.",
      "Organizaciones sin ánimo de lucro con actividad en el ámbito familiar.",
      "Proyectos con sede o actividad principal en España o Estados Unidos.",
    ],
    requirements: [
      "Descripción detallada del proyecto o situación.",
      "Importe solicitado y justificación del uso de fondos.",
      "Documentación acreditativa (disponible para revisión).",
      "Compromiso de rendición de cuentas ante la Fundación.",
    ],
    status: "open",
  },
  {
    slug: "libertad-expresion-fortius-2026",
    title: "Convocatoria Libertad de Expresión Fortius 2026",
    kicker: "Convocatoria abierta",
    summary:
      "Apoyo a periodistas, medios y organizaciones comprometidas con la libertad de prensa y el derecho a la información.",
    description: [
      "La Convocatoria Libertad de Expresión Fortius 2026 tiene como objetivo respaldar a periodistas, medios independientes y organizaciones de la sociedad civil que defienden la libertad de prensa, combaten la desinformación y promueven el acceso libre a la información.",
      "La convocatoria está abierta a proyectos en España, Estados Unidos y el ámbito hispanohablante en general. Se valorarán especialmente iniciativas con impacto transatlántico y compromiso con los estándares deontológicos del periodismo.",
      "La Fundación acompañará los proyectos seleccionados no solo con financiación, sino también con acceso a su red de expertos, visibilidad institucional y apoyo estratégico.",
    ],
    deadline: "31 de octubre de 2026",
    pdfUrl: "/ayudas/convocatoria_libertad_expresion_fortius_2026.pdf",
    imageUrl: "/ayudas/convocatoria_libertad_expresion_fortius_2026.png",
    maxAmount: "Según proyecto",
    eligibility: [
      "Periodistas independientes o en activo en medios de comunicación.",
      "Medios de comunicación digitales o impresos sin ánimo de lucro.",
      "Organizaciones de la sociedad civil dedicadas a la libertad de prensa.",
      "Proyectos con sede o actividad en España, EE.UU. o el mundo hispanohablante.",
    ],
    requirements: [
      "Descripción del proyecto editorial o de defensa de la libertad de prensa.",
      "Trayectoria del solicitante o del medio (portfolio, publicaciones, premios).",
      "Presupuesto detallado y justificación del importe solicitado.",
      "Compromiso de rendición de cuentas ante la Fundación.",
    ],
    status: "open",
  },
];

export function getAyuda(slug: string): Ayuda | undefined {
  return AYUDAS.find((a) => a.slug === slug);
}
