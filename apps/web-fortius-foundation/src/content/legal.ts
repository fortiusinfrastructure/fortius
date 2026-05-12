import { FOUNDATION_CONTACT } from "@/content/site";

export interface LegalDocumentContent {
  kicker: string;
  title: string;
  intro: string;
  sections: Array<{ title: string; body: string[] }>;
}

export const LEGAL_NOTICE_CONTENT: LegalDocumentContent = {
  kicker: "Legal",
  title: "Aviso legal",
  intro:
    "Este sitio web pertenece a Fundación Fortius y ofrece información institucional sobre su actividad, su incubadora, sus ayudas, su blog y sus formas de colaboración.",
  sections: [
    {
      title: "Titular del sitio",
      body: [
        `Canal general de contacto: ${FOUNDATION_CONTACT.email}.`,
        `Dirección en España: ${FOUNDATION_CONTACT.spain}.`,
        `Presencia en Estados Unidos: ${FOUNDATION_CONTACT.usa}.`,
      ],
    },
    {
      title: "Uso del sitio web",
      body: [
        "El acceso a este sitio implica la aceptación de un uso lícito, responsable y respetuoso con la finalidad informativa e institucional de la Fundación.",
        "No está permitido utilizar los contenidos del sitio para actividades contrarias a la ley, a la buena fe o que puedan perjudicar la imagen, el funcionamiento o los derechos de la Fundación o de terceros.",
      ],
    },
    {
      title: "Propiedad intelectual y responsabilidad",
      body: [
        "Los textos, diseños, marcas, logotipos y demás contenidos del sitio están protegidos por la normativa aplicable y no podrán reutilizarse sin autorización, salvo cuando la ley lo permita expresamente.",
        "La Fundación procura que la información publicada sea correcta y esté actualizada, pero no garantiza la ausencia total de errores ni responde de decisiones adoptadas exclusivamente a partir de la información disponible en esta web.",
      ],
    },
  ],
};

export const PRIVACY_CONTENT: LegalDocumentContent = {
  kicker: "Legal",
  title: "Política de privacidad",
  intro:
    "Fundación Fortius trata los datos personales que el usuario facilite de forma voluntaria a través del correo electrónico u otros canales de contacto vinculados al sitio.",
  sections: [
    {
      title: "Qué datos podemos tratar",
      body: [
        "Podemos tratar datos identificativos y de contacto, así como la información que el usuario decida incluir en sus mensajes, solicitudes de información, propuestas de colaboración o alta en el boletín.",
        "No solicitamos más datos de los necesarios para atender cada consulta o relación institucional.",
      ],
    },
    {
      title: "Finalidad y base jurídica",
      body: [
        "Utilizamos los datos para responder consultas, gestionar relaciones con donantes, beneficiarios, colaboradores o suscriptores, y mantener comunicaciones vinculadas a la actividad propia de la Fundación.",
        "La base jurídica del tratamiento será normalmente el consentimiento del interesado, la aplicación de medidas precontractuales o el interés legítimo en el marco de la relación institucional generada.",
      ],
    },
    {
      title: "Conservación y derechos",
      body: [
        "Conservaremos los datos durante el tiempo necesario para atender la finalidad para la que fueron recabados y durante los plazos legales que resulten aplicables.",
        `El usuario puede ejercer sus derechos de acceso, rectificación, supresión, oposición o limitación escribiendo a ${FOUNDATION_CONTACT.email}.`,
      ],
    },
  ],
};

export const COOKIES_CONTENT: LegalDocumentContent = {
  kicker: "Legal",
  title: "Política de cookies",
  intro:
    "Este sitio puede utilizar cookies técnicas o de medición básicas necesarias para su funcionamiento, navegación y mejora del servicio.",
  sections: [
    {
      title: "Qué son las cookies",
      body: [
        "Las cookies son pequeños archivos que se almacenan en el navegador del usuario y permiten recordar información sobre su visita o facilitar determinadas funciones del sitio.",
      ],
    },
    {
      title: "Tipos de cookies",
      body: [
        "Las cookies técnicas permiten el funcionamiento básico del sitio y no requieren una acción compleja por parte del usuario para navegar correctamente.",
        "En caso de incorporar herramientas de analítica o servicios de terceros, esta política deberá actualizarse para reflejar de forma más detallada el tipo de cookies empleadas y su finalidad concreta.",
      ],
    },
    {
      title: "Gestión de cookies",
      body: [
        "El usuario puede configurar su navegador para bloquear o eliminar cookies. Debe tener en cuenta que esa configuración puede afectar al funcionamiento normal de algunas partes del sitio.",
        `Si necesitas más información, puedes escribir a ${FOUNDATION_CONTACT.email}.`,
      ],
    },
  ],
};