import type { VerticalId } from "@/content/home-v2";

export type Department =
    | "direccion"
    | "asuntos-publicos"
    | "inteligencia-politica"
    | "digital"
    | "legal-contable";

export const DEPARTMENT_LABEL: Record<Department, string> = {
    direccion: "Dirección",
    "asuntos-publicos": "Asuntos Públicos",
    "inteligencia-politica": "Inteligencia Política",
    digital: "Digital",
    "legal-contable": "Legal y Contable",
};

export const DEPARTMENT_ORDER: Department[] = [
    "direccion",
    "asuntos-publicos",
    "inteligencia-politica",
    "digital",
    "legal-contable",
];

export interface TeamMember {
    slug: string;
    name: string;
    role: string;
    country?: string;
    department: Department;
    verticals: VerticalId[];
    area?: string;
    bio: string;
    linkedin?: string;
    twitter?: string;
    photo?: string | string[];
}

export interface ExternalExpert {
    slug: string;
    name: string;
    role: string;
    country?: string;
    vertical: VerticalId;
    bio: string;
    linkedin?: string;
    photo?: string | string[];
}

export interface TeamMapPin {
    id: string;
    name: string;
    coordinates: [number, number];
    description: string;
}

export const TEAM: TeamMember[] = [
    {
        slug: "juan-angel-soto",
        name: "Juan Ángel Soto Gómez",
        role: "Founder & CEO",
        department: "direccion",
        verticals: ["civil", "intelligence"],
        bio: "Juan Ángel Soto (Murcia, 1992), es graduado en Administración y Dirección de Empresas y en Derecho por la Universidad de Navarra, así como en Ciencias Políticas y de la Administración por la UNED. Cuenta con un máster en Teoría Política y Jurídica por University College London (UCL) y es doctorando en Ciencia Política en St. Mary’s University de Londres. Es fundador y CEO de Fortius, una firma de consultoría estratégica especializada en think tanks, inteligencia y riesgos geopolíticos que opera en Europa, América y África. Asimismo, ha ocupado distintos cargos ejecutivos en varios centros de pensamiento, siendo director ejecutivo de la Fundación Civismo (2018–2021) y director internacional de la Fundación Disenso (2021–2023). Es emprendedor social y ha fundado numerosas organizaciones cívicas, como la Fundación Fortius y Principios, de las que es presidente; y ha impulsado iniciativas como el Instituto Español de Análisis Migratorio o Escuela Hispánica. Colabora de forma habitual en medios de comunicación españoles e internacionales. Como académico, es profesor de teoría política en la Universidad de Navarra. Es Visiting Fellow del Danube Institute de Budapest y de la Universidad Ludovika, e imparte clases en diferentes universidades europeas y escuelas de negocios, como la Universidad de las Hespérides.",
        linkedin: "https://www.linkedin.com/in/juanangelsoto/",
    },
    {
        slug: "didac-sanchez-olaya",
        name: "Dídac Sánchez Olaya",
        role: "Director de Asuntos Públicos",
        department: "asuntos-publicos",
        verticals: ["civil"],
        bio: "Lidera la práctica de asuntos públicos de Fortius. Diseño y ejecución de campañas de incidencia, mapeo de stakeholders y estrategia de relación con instituciones europeas y nacionales.",
        linkedin: "https://www.linkedin.com/in/didac-sanchez-olaya",
    },
    {
        slug: "alexia-cosmello-guisande",
        name: "Alexia Cosmello Guisande",
        role: "Asuntos Públicos",
        department: "asuntos-publicos",
        verticals: ["civil"],
        bio: "Analista y ejecutora de campañas de asuntos públicos. Especializada en el seguimiento legislativo y la elaboración de documentos de posición para clientes del tercer sector.",
        linkedin: "https://www.linkedin.com/in/alexia-cosmello",
    },
    {
        slug: "calli-pacheco-munoz",
        name: "Calli Pacheco Muñoz",
        role: "Asistente de Comunicación",
        department: "asuntos-publicos",
        verticals: ["civil"],
        bio: "Ciudad de México (México). Estudiante de Comunicación Audiovisual en la Universidad Complutense de Madrid. Con formación en liderazgo y vida pública. Ha participado en programas formativos centrados en el pensamiento político y el compromiso social, formando parte de la primera promoción de la Escuela de Líderes \"Patria Unida\".\n\nCuenta con experiencia en creación de contenido en el ámbito del marketing. Actualmente es asistente de comunicación en Fortius, centrada en proyectos vinculados a la comunicación y el marketing digital.",
        linkedin: "https://www.linkedin.com/in/calli-pacheco-mu%C3%B1oz-2b5390323/",
    },
    {
        slug: "beatriz-de-leon-cobo",
        name: "Beatriz de León Cobo",
        role: "Inteligencia Política",
        department: "inteligencia-politica",
        verticals: ["intelligence"],
        area: "Norte de África y Sahel",
        bio: "Madrid (España). Beatriz de León Cobo es especialista en Norte de África y el Sahel, con amplia experiencia en análisis de riesgos geopolíticos, seguridad, migración y dinámicas de conflicto en África Occidental. Colabora como consultora e investigadora con gobiernos, organizaciones internacionales, think tanks y entidades del tercer sector en el diseño de estrategias y análisis sobre estabilidad regional, radicalización violenta y gestión migratoria.\n\nEs doctoranda en Sociología por la Universidad de la Sorbona, profesora del Máster de Acción Política de la Universidad Francisco de Vitoria y analista en su Centro de Seguridad Internacional, donde dirige el Foro de Diálogo Sahel Europe. Asimismo, es investigadora asociada (Fellow) del Royal United Services Institute y cuenta con un máster en Defensa, Seguridad y Gestión de Crisis por el Institut de Relations Internationales et Stratégiques.\n\nCompagina su labor académica y analítica con la dirección del Instituto Español de Análisis Migratorio (IEAM) y de su plataforma empresarial, Mediterranean Dialogue.",
        linkedin: "https://www.linkedin.com/in/beatriz-de-leon-cobo/",
    },
    {
        slug: "tasnim-idriss",
        name: "Tasnim Idriss",
        role: "Inteligencia Política",
        department: "inteligencia-politica",
        verticals: ["intelligence"],
        area: "Norte de África y Sahel",
        bio: "Túnez (Túnez). Tasnim es especialista en Norte de África y mundo árabe, con experiencia en análisis político, gobernanza y dinámicas socioculturales en sociedades de mayoría musulmana. Su trabajo se centra en el estudio de procesos políticos, evolución institucional y transformación sociopolítica en la región MENA, con especial atención al Magreb.\n\nActualmente coordina el proyecto Diálogo Mediterráneo del Instituto Español de Análisis Migratorio (IEAM) y es profesora en la Universidad de Túnez El Manar. Anteriormente fue subdirectora de Islam & Liberty Network, iniciativa internacional centrada en la promoción de la libertad económica y política en países de mayoría musulmana.\n\nCuenta con amplia experiencia en gobernanza, procesos electorales y desarrollo institucional, habiendo colaborado con organizaciones internacionales como Initiatives of Change Foundation y Atlas Network. Es licenciada en Literatura Angloamericana por la École Normale Supérieure de Túnez, máster en Estudios Culturales por la Universidad de Cartago, y actualmente doctoranda en Ciencia Política en la Universidad de la Civilización de Estambul.",
        linkedin: "https://www.linkedin.com/in/tasnim-idriss-a44775b3/",
    },
    {
        slug: "juan-pablo-chamon-saucedo",
        name: "Juan Pablo Chamón Saucedo",
        role: "Inteligencia Política",
        department: "inteligencia-politica",
        verticals: ["intelligence"],
        area: "América",
        bio: "Analista de ciclos electorales y transición de élites en América Latina. Seguimiento de procesos constituyentes, riesgo regulatorio y dinámicas hemisféricas.",
    },
    {
        slug: "segundo-carafi",
        name: "Segundo Carafí",
        role: "Inteligencia Política",
        department: "inteligencia-politica",
        verticals: ["intelligence"],
        area: "América",
        bio: "Analista especializado en América. Seguimiento de dinámicas políticas, actores institucionales y escenarios de riesgo en la región.",
    },
    {
        slug: "matthaus-konradsheim",
        name: "Matthäus Konradsheim",
        role: "Inteligencia Política",
        department: "inteligencia-politica",
        verticals: ["intelligence"],
        area: "Europa",
        bio: "Analista especializado en Europa. Seguimiento de procesos políticos, marcos regulatorios y dinámicas institucionales en el entorno europeo.",
    },
    {
        slug: "jose-maria-cortes",
        name: "José María Cortés",
        role: "Inteligencia Política",
        department: "inteligencia-politica",
        verticals: ["intelligence"],
        area: "Europa",
        bio: "Analista especializado en Europa. Cobertura de actores políticos, tendencias legislativas y escenarios de riesgo en el ámbito europeo.",
    },
    {
        slug: "jose-manuel-perez-ariza",
        name: "José Manuel Pérez Ariza",
        role: "CTO",
        department: "digital",
        verticals: ["civil", "intelligence"],
        bio: "Director de Tecnología de Fortius. Lidera la arquitectura digital, la infraestructura de análisis y las plataformas internas al servicio de los equipos de inteligencia y asuntos públicos.",
    },
    {
        slug: "alberto-andres-rodriguez",
        name: "Alberto Andrés Rodríguez",
        role: "Of-Counsel Digital",
        department: "digital",
        verticals: ["intelligence"],
        bio: "Asesor externo para estrategia digital, reputación online y monitorización de ecosistemas de información. Puente entre inteligencia política y presencia digital.",
    },
    {
        slug: "diego-salazar-ramirez",
        name: "Diego Salazar Ramírez",
        role: "Arquitecto de productos digitales",
        department: "digital",
        verticals: ["intelligence"],
        bio: "Responsable del diseño y desarrollo de las plataformas digitales de Fortius. Construye las herramientas internas de análisis, dashboards de monitorización y áreas privadas para clientes.",
    },
    {
        slug: "javier-soto-gomez",
        name: "Javier Soto Gómez",
        role: "Legal y Contable",
        department: "legal-contable",
        verticals: ["civil"],
        bio: "Murcia (España), 2002. Graduado en Derecho y Economía por la Universidad de Navarra. Ha trabajado anteriormente para despachos como GES Abogados y Vicente Ortega Abogados, donde adquirió experiencia en el ámbito jurídico, especializándose en áreas relacionadas con el asesoramiento laboral, contable y jurídico, participando en el apoyo a clientes y en la gestión de distintas cuestiones administrativas y normativas. En particular, en el ámbito de las organizaciones sin ánimo de lucro, como fundaciones y asociaciones. Es responsable del departamento legal y contable de Fortius.",
        linkedin: "https://www.linkedin.com/in/javier-soto-g%C3%B3mez-2b60b218a/",
    },
];

export const EXPERTS: ExternalExpert[] = [
    {
        slug: "carlos-andreu-pintado",
        name: "Carlos Andreu Pintado",
        role: "Liderazgo y Desarrollo Organizativo",
        vertical: "civil",
        bio: "Carlos Andreu es experto en liderazgo, formación de directivos y desarrollo organizativo, con una consolidada trayectoria como formador, conferenciante y asesor de empresas e instituciones.\n\nLicenciado en Derecho por la Universidad de Zaragoza y MBA por IESE Business School – Universidad de Navarra, combina una sólida formación académica con una amplia experiencia práctica en dirección, consultoría y desarrollo empresarial.\n\nHa ejercido como directivo en compañías de distintos sectores antes de dedicarse plenamente a la consultoría y formación ejecutiva, ámbito en el que acumula una extensa experiencia asesorando y formando a directivos, equipos de liderazgo y organizaciones en procesos de mejora del desempeño, cultura corporativa y desarrollo del talento.\n\nEs profesor habitual en universidades y escuelas de negocio de referencia en España y América Latina, incluyendo la Universidad de Navarra, Universidad CEU San Pablo, Universidad Nebrija, Instituto Internacional San Telmo y diversas instituciones internacionales.\n\nAutor del bestseller Del Ataúd a la Cometa (Editorial Planeta), obra de referencia en liderazgo y desarrollo personal con múltiples ediciones publicadas, es uno de los conferenciantes más reconocidos en España en materia de liderazgo, actitud y transformación de equipos.",
        linkedin: "https://www.linkedin.com/in/carlosandreu/",
    },
    {
        slug: "ramsi-jazmati-akili",
        name: "Ramsi Jazmati Akili",
        role: "Mundo árabe, Geoeconomía y Diplomacia Cultural",
        vertical: "intelligence",
        bio: "Dr. Ramsi Jazmati Akili es experto en mundo árabe, relaciones hispano-árabes, geoeconomía y diplomacia cultural, con una sólida trayectoria académica e institucional especializada en la región del Golfo y Oriente Medio.\n\nEs investigador no residente en la Mohammed Bin Rashid School of Government e investigador en el Instituto de Cultura y Sociedad de la Universidad de Navarra, donde obtuvo su doctorado con una investigación centrada en el liderazgo de las mujeres emiratíes. Cuenta además con formación de posgrado en bioética, dirección de empresas y alta dirección por instituciones como ESADE y IESE Business School, así como especialización en gobernanza y diplomacia cultural por la Academia de Diplomacia Cultural de Berlín.\n\nHa desarrollado buena parte de su trayectoria profesional en la intersección entre empresa, instituciones y mundo árabe, destacando su labor como Director de Proyectos para la agencia de competitividad empresarial del Gobierno de Cataluña en la región del Golfo, donde lideró la expansión institucional y comercial de empresas españolas en Oriente Medio.\n\nActualmente es subdirector de Instituto Choiseul España y colabora regularmente en análisis sobre geoeconomía, relaciones internacionales y vínculos entre España y el mundo árabe.",
        linkedin: "https://www.linkedin.com/in/ramzi-jazmati-akili-4a958a2b2/",
    },
    {
        slug: "victor-gonzalez-coello-de-portugal",
        name: "Víctor González-Coello de Portugal",
        role: "Estrategia Empresarial y Asuntos Públicos Internacionales",
        vertical: "intelligence",
        bio: "Víctor Guido González Coello de Portugal es empresario, exdiputado en el Congreso de los Diputados y experto en estrategia empresarial, finanzas corporativas y asuntos públicos internacionales.\n\nPosee una doble licenciatura en Administración y Dirección de Empresas, un Bachelor of Arts with Honors in European Business por la University of Portsmouth, un Máster en Finanzas por CUNEF y un Executive MBA por IESE Business School.\n\nCuenta con más de veinte años de experiencia en alta dirección, banca de inversión, desarrollo corporativo y reestructuración empresarial, habiendo liderado operaciones de fusiones y adquisiciones por valor superior a 3.000 millones de dólares. Inició su carrera en UBS y ocupó posteriormente posiciones de responsabilidad en BBVA y Ebro Foods. Actualmente es Executive Director en MPR.\n\nEn el ámbito público, fue diputado por Salamanca y vicepresidente de VOX, desempeñando funciones de liderazgo en áreas como economía, asuntos exteriores, defensa y seguridad nacional.",
        linkedin: "https://www.linkedin.com/in/v%C3%ADctor-gonz%C3%A1lez-coello-de-portugal/",
    },
    {
        slug: "carlos-casares",
        name: "Carlos Casares",
        role: "Experto Vinculado",
        vertical: "civil",
        bio: "Carlos Casares (Uruguay) lleva décadas acompañando a empresarios, familias empresarias y consejos de administración en procesos complejos de estrategia, gobierno y relaciones humanas, en múltiples países y contextos culturales. Discípulo de Juan Antonio Pérez López, combina una mirada antropológica con un enfoque socrático, convencido de que entender a las personas es tan importante como el análisis técnico. Ha participado en procesos de crecimiento, profesionalización y venta de compañías, integrando directorios y consejos en cuatro continentes, y ha desarrollado una extensa trayectoria académica en Iberoamérica y Europa, donde es Catedrático Emérito. Cree que la verdadera formación ocurre en el trabajo con personas, en los errores y en las crisis — y que todos vivimos \"en construcción\" hasta el final. Reside entre Europa, Estados Unidos y el Río de la Plata.",
        linkedin: "https://www.linkedin.com/in/carloscasares/",
    },
];

const TEAM_COUNTRY_OVERRIDES: Record<string, string> = {
    "calli-pacheco-munoz": "México",
    "tasnim-idriss": "Túnez",
    "juan-pablo-chamon-saucedo": "Bolivia",
    "segundo-carafi": "Argentina",
    "matthaus-konradsheim": "Austria",
    "jose-maria-cortes": "Portugal",
    "diego-salazar-ramirez": "Ecuador",
};

const EXPERT_COUNTRY_OVERRIDES: Record<string, string> = {
    "ramsi-jazmati-akili": "Siria",
    "carlos-casares": "Uruguay",
};

const COUNTRY_TO_MAP_LOCATION: Record<string, Omit<TeamMapPin, "id" | "description">> = {
    España: { name: "Madrid", coordinates: [-3.7038, 40.4168] },
    México: { name: "Ciudad de México", coordinates: [-99.1332, 19.4326] },
    Túnez: { name: "Túnez", coordinates: [10.1815, 36.8065] },
    Bolivia: { name: "La Paz", coordinates: [-68.1193, -16.4897] },
    Argentina: { name: "Buenos Aires", coordinates: [-58.3816, -34.6037] },
    Austria: { name: "Viena", coordinates: [16.3738, 48.2082] },
    Portugal: { name: "Lisboa", coordinates: [-9.1393, 38.7223] },
    Ecuador: { name: "Quito", coordinates: [-78.4678, -0.1807] },
    Siria: { name: "Damasco", coordinates: [36.2765, 33.5138] },
    Uruguay: { name: "Montevideo", coordinates: [-56.1645, -34.9011] },
};

const VERIFIED_PHOTOS: Record<string, string> = {
    "juan-angel-soto": "/images/nosotros/Juan Angel Soto Gómez.png",
    "didac-sanchez-olaya": "/images/nosotros/Dídac Sanchéz.png",
    "alexia-cosmello-guisande": "/images/nosotros/Alexia Cosmello.png",
    "calli-pacheco-munoz": "/images/nosotros/Calli Muñoz.png",
    "beatriz-de-leon-cobo": "/images/nosotros/Beatriz de León Cobo.png",
    "juan-pablo-chamon-saucedo": "/images/nosotros/Juan Pablo Chamón.png",
    "matthaus-konradsheim": "/images/nosotros/Matthaus Konradsheim.png",
    "jose-maria-cortes": "/images/nosotros/Jose Maria Cortes.png",
    "jose-manuel-perez-ariza": "/images/nosotros/Jose Manuel Perez Ariza.png",
    "alberto-andres-rodriguez": "/images/nosotros/Alberto A.png",
    "diego-salazar-ramirez": "/images/nosotros/Diego Salazar.png",
    "javier-soto-gomez": "/images/nosotros/Javier Soto.png",
};

for (let index = TEAM.length - 1; index >= 0; index -= 1) {
    const member = TEAM[index]!;
    const verifiedPhoto = VERIFIED_PHOTOS[member.slug];

    if (!verifiedPhoto) {
        TEAM.splice(index, 1);
        continue;
    }

    member.country = TEAM_COUNTRY_OVERRIDES[member.slug] ?? "España";
    member.photo = [verifiedPhoto];
}

for (let index = EXPERTS.length - 1; index >= 0; index -= 1) {
    const expert = EXPERTS[index]!;
    const verifiedPhoto = VERIFIED_PHOTOS[expert.slug];

    if (!verifiedPhoto) {
        EXPERTS.splice(index, 1);
        continue;
    }

    expert.country = EXPERT_COUNTRY_OVERRIDES[expert.slug] ?? "España";
    expert.photo = [verifiedPhoto];
}

export function getTeamByVertical(vertical: VerticalId): TeamMember[] {
    return TEAM.filter((m) => m.verticals.includes(vertical));
}

export function getExpertsByVertical(vertical: VerticalId): ExternalExpert[] {
    return EXPERTS.filter((e) => e.vertical === vertical);
}

export function getTeamByDepartment(department: Department): TeamMember[] {
    return TEAM.filter((m) => m.department === department);
}

export function getInitials(name: string): string {
    const parts = name.split(" ").filter(Boolean);
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
    return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

export function getPeopleMapPins(): TeamMapPin[] {
    const countries = new Set<string>();

    [...TEAM, ...EXPERTS].forEach((person) => {
        if (person.country) countries.add(person.country);
    });

    return [...countries]
        .map((country) => {
            const location = COUNTRY_TO_MAP_LOCATION[country];
            if (!location) return null;

            return {
                id: `eq-${country.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/[^a-z0-9]+/g, "-")}`,
                name: location.name,
                coordinates: location.coordinates,
                description: country,
            } satisfies TeamMapPin;
        })
        .filter((pin): pin is TeamMapPin => pin !== null);
}
