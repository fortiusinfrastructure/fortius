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
        bio: "Dídac es profesional de asuntos públicos y estrategia política, especializado en incidencia institucional, movilización social y diseño de estrategias de posicionamiento para organizaciones del tercer sector y actores con impacto público.\n\nEs graduado en Derecho y Ciencias Políticas con mención en Relaciones Internacionales por la Universitat Abat Oliba CEU y posee un Máster en Derecho Parlamentario, Elecciones y Estudios Legislativos por la Complutense University of Madrid. Cuenta además con formación especializada en asuntos públicos por la Universidad Autónoma de Madrid y cursa actualmente el Máster de Acceso a la Abogacía en la Universitat Oberta de Catalunya.\n\nActualmente ejerce como responsable de Asuntos Públicos en Fortius, donde lidera proyectos de incidencia pública y consultoría estratégica en ámbitos como vivienda, tecnología y cultura. Dirige asimismo la plataforma cívica Principios, desde donde impulsa estrategias de posicionamiento institucional, movilización de base social y elaboración de informes sobre retos sociales contemporáneos. Previamente trabajó en asuntos públicos en Grayling España para sectores como tecnología, salud, alimentación y vivienda, desarrollando estrategias de advocacy, stakeholder engagement y seguimiento regulatorio. También colaboró como asistente de investigación en la Universitat Internacional de Catalunya en un proyecto financiado por la Fundación BBVA sobre gestión ética del riesgo y salud humana.",        linkedin: "https://www.linkedin.com/in/didac-sanchez-olaya",
    },
    {
        slug: "alexia-cosmello-guisande",
        name: "Alexia Cosmello Guisande",
        role: "Asuntos Públicos",
        department: "asuntos-publicos",
        verticals: ["civil"],
        bio: "Alexia es profesional de asuntos públicos, estrategia y comunicación institucional, especializada en instituciones de la Unión Europea, comunicación de políticas públicas, relaciones institucionales y posicionamiento estratégico.\n\nEs graduada en Relaciones Internacionales por la University of Navarra, posee un Máster en Marketing y Comunicación Institucional por LUISS Guido Carli University y un Online Master's en Branding por Masterbrand.\n\nActualmente ejerce como responsable de Asuntos Públicos en Bruselas en Fortius, donde lidera estrategias de interlocución institucional y posicionamiento ante el ecosistema europeo. Previamente fue Policy Manager for Member State Outreach en DIGITALEUROPE, coordinando la relación con asociaciones nacionales de toda Europa y liderando campañas y eventos vinculados a la toma de decisiones europeas, y desarrolló estrategias de incidencia y comunicación en FIPRA Public Affairs para clientes internacionales en políticas digitales, competencia, transporte y sostenibilidad. Es asimismo socia de la Asociación de Profesionales de las Relaciones Institucionales (APRI) y miembro de APRI Bruselas.",        linkedin: "https://www.linkedin.com/in/alexia-cosmello",
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
        bio: "La Paz (Bolivia). Es un profesional boliviano especializado en think tanks, inteligencia política, liderazgo institucional y estrategia para organizaciones de la sociedad civil, con una trayectoria centrada en el diseño y fortalecimiento de iniciativas de impacto público, producción de ideas y desarrollo institucional en América Latina.\n\nCursó estudios en Ciencia Política en la Universidad Católica Boliviana, donde desarrolló la investigación Christianity and Cultural Interaction. The Ratzingerian Concept of Duplication, distinguida con honores por la universidad. Posteriormente obtuvo un Máster en Ciencia Política por la Universidad de los Andes, profundizando en teoría política, instituciones y gobernanza contemporánea.\n\nActualmente forma parte de Fortius, donde trabaja principalmente en las áreas de inteligencia política y desarrollo estratégico de think tanks, acompañando a organizaciones, fundaciones e instituciones en procesos de posicionamiento, crecimiento organizacional, generación de influencia y análisis del entorno político. Es asimismo director ejecutivo de LIBERA Bolivia, organización en la que ha desarrollado gran parte de su trayectoria profesional durante más de una década, habiendo ocupado previamente el cargo de Director de Proyectos. Desde 2022 ejerce además como presidente del consejo y director del Centro de Estudios Jurídicos Santo Tomás Moro, impulsando espacios de reflexión jurídica, política y cultural inspirados en la tradición humanista cristiana.",
        linkedin: "https://www.linkedin.com/in/juan-pablo-chamon-saucedo/",
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
        bio: "Viena (Austria). Es un profesional austríaco especializado en desarrollo institucional, estrategia organizacional y fortalecimiento del ecosistema de sociedad civil y pensamiento estratégico en Europa Central y Occidental.\n\nEstudió Business, Economics and Social Sciences en la WU Vienna University of Economics and Business y completó su formación internacional en el IESE Business School.\n\nEn Fortius trabaja en el área de asociaciones cívicas y think tanks en Alemania y Austria, acompañando a organizaciones de la sociedad civil, plataformas de ideas e instituciones con propósito en procesos de crecimiento, posicionamiento estratégico y generación de impacto público. Previamente desarrolló actividad independiente en desarrollo de negocio y reestructuración organizacional, asesorando a pymes y organizaciones europeas en estrategia, posicionamiento y crecimiento institucional en sectores como cultura, automoción y medios de comunicación. Entre 2022 y 2024 presidió el Uni Management Club, una de las principales redes de captación y desarrollo para estudiantes de empresa en Austria, habiendo ejercido anteriormente como responsable de relaciones corporativas en la misma organización. También trabajó como asistente parlamentario en el Austrian Parliament y es cofundador de WizHub, una iniciativa educativa centrada en formación integral y emprendimiento digital.",    },
    {
        slug: "jose-maria-cortes",
        name: "José María Cortes",
        role: "Inteligencia Política",
        department: "asuntos-publicos",
        verticals: ["civil"],
        area: "Europa",
        bio: "Lisboa (Portugal). Es abogado y académico, graduado en Derecho por la Facultad de Derecho de la Universidad de Lisboa, donde ejerce actualmente como profesor asistente invitado e investigador doctoral en Derecho Privado.\n\nEspecializado en litigación civil y mercantil, arbitraje, derecho contractual, derecho societario y filosofía del derecho, ha desarrollado su carrera en despachos de abogados de primer nivel y en el sector público, y es autor de diversas publicaciones académicas en el ámbito del derecho privado.\n\nEn Fortius trabaja en el área de organizaciones de la sociedad civil e impacto social en Portugal, acompañando a fundaciones, asociaciones, think tanks e iniciativas con propósito en procesos de fortalecimiento institucional, estrategia y posicionamiento. Es asimismo asesor de la Fundação Gaudium Magnum y fundador de SALL – Só a Liberdade.",
    },
    {
        slug: "jose-manuel-perez-ariza",
        name: "José Manuel Pérez Ariza",
        role: "CTO",
        department: "digital",
        verticals: ["civil", "intelligence"],
        bio: "Barcelona (España). José Manuel Pérez Ariza es Director de Tecnología (CTO) de Fortius y asesor senior en estrategia, transformación y tecnología, con más de 35 años de experiencia liderando procesos de innovación, operaciones y transformación digital en grandes instituciones financieras de Europa y América Latina.\n\nA lo largo de su trayectoria ha ocupado posiciones ejecutivas y de alta dirección en entidades como Banco Santander, Santander España, Banesto, Banistmo (Grupo Bancolombia), CaixaBank y Fundación \"la Caixa\", formando parte de múltiples comités de dirección y juntas directivas con responsabilidad sobre tecnología, operaciones, transformación empresarial, gobierno del dato, ciberseguridad y fraude.\n\nEn la actualidad compagina su actividad como asesor estratégico y miembro de consejos asesores en compañías de los sectores financiero, asegurador y tecnológico. En Fortius lidera la visión tecnológica y el desarrollo de soluciones digitales avanzadas para organizaciones públicas y privadas.",
    },
    {
        slug: "alberto-andres-rodriguez",
        name: "Alberto Andrés Rodríguez",
        role: "Of-Counsel Digital",
        department: "digital",
        verticals: ["intelligence"],
        bio: "Pamplona (España). Acompaña a organizaciones en procesos de transformación digital, estrategia tecnológica y modernización de sus modelos operativos. Su trayectoria combina arquitectura cloud, gobierno de plataformas, seguridad, automatización, optimización de costes e inteligencia artificial, con una visión orientada a conectar las necesidades de negocio con soluciones tecnológicas realistas y sostenibles. Ha participado en proyectos de adopción cloud, diseño de arquitecturas empresariales, modelos de operación y mejora de capacidades digitales, trabajando tanto con equipos técnicos como con perfiles directivos. En Fortius Consulting aporta una mirada estratégica y práctica sobre el uso de la tecnología como palanca de eficiencia, crecimiento y fortalecimiento institucional. Cree que la tecnología solo genera verdadero valor cuando está bien alineada con las personas, los procesos y el propósito de cada organización.",    
    },
    {
        slug: "diego-salazar-ramirez",
        name: "Diego Salazar Ramírez",
        role: "Arquitecto de productos digitales",
        department: "digital",
        verticals: ["intelligence"],
        bio: "Quito (Ecuador). Es un profesional especializado en transformación digital, estrategia tecnológica e innovación de procesos, con experiencia internacional en dirección de operaciones, automatización y desarrollo de soluciones tecnológicas para organizaciones en entornos complejos y de gran escala.\n\nEs graduado en Ingeniería en Diseño Industrial por la Universidad Central del Ecuador y posee un Máster en Business & Technology por Collective Academy. Actualmente complementa su formación con estudios de Filosofía en la Universidad de Navarra.\n\nEn Fortius es responsable del diseño y desarrollo de las plataformas digitales de la firma, liderando la construcción de herramientas internas de análisis, sistemas de inteligencia y entornos tecnológicos orientados a mejorar la capacidad operativa y estratégica de la organización. Anteriormente fue Leader Technology Transformation and Processes HISPAM en Telefónica, donde lideró iniciativas regionales de transformación tecnológica e innovación de procesos en los mercados hispanoamericanos del grupo, incluyendo Ecuador, Colombia, México, Perú, Chile, Uruguay y Argentina.",    
    },
    {
        slug: "javier-soto-gomez",
        name: "Javier Soto Gómez",
        role: "Legal y Contable",
        department: "legal-contable",
        verticals: ["civil"],
        bio: "Murcia (España). Es graduado en Derecho y Economía por la Universidad de Navarra, especializado en asesoramiento jurídico, gestión contable y acompañamiento institucional a organizaciones con propósito.\n\nActualmente es responsable del departamento legal y contable de Fortius Consulting, donde supervisa la estructura jurídica y financiera de la organización y acompaña a clientes en materias de gobierno corporativo, cumplimiento normativo y diseño de estructuras organizativas. Previamente trabajó en GES Abogados y Vicente Ortega Abogados, donde desarrolló experiencia jurídica con especial foco en fundaciones y asociaciones, acompañando a organizaciones sin ánimo de lucro en procesos de constitución, adaptación normativa y cumplimiento de obligaciones legales y contables.",        linkedin: "https://www.linkedin.com/in/javier-soto-g%C3%B3mez-2b60b218a/",
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
        bio: "Madrid (España). Es empresario, inversor y exdiputado español, con una trayectoria que combina alta dirección, finanzas corporativas, liderazgo político e implicación internacional en asuntos económicos y geopolíticos.\n\nCuenta con una doble licenciatura en Administración y Dirección de Empresas por universidades públicas de Madrid y un Bachelor of Arts with Honors in European Business por la University of Portsmouth. Complementó su formación en la London School of Economics and Political Science y en la University of California San Diego, cursó un Máster en Finanzas en CUNEF Universidad y completó un Executive MBA en el IESE Business School.\n\nAcumula más de veinte años de experiencia en banca de inversión, desarrollo corporativo y dirección ejecutiva. Inició su carrera en UBS en el área de Corporate Finance y ocupó posteriormente posiciones de responsabilidad en BBVA y Ebro Foods, habiendo participado y liderado operaciones de fusiones y adquisiciones por un valor agregado superior a 3.000 millones de dólares. Desarrolló asimismo una trayectoria empresarial propia especializada en adquisición, transformación y recuperación de compañías en procesos de sucesión generacional o dificultades operativas. Actualmente ejerce como director ejecutivo en MPR. En el ámbito público, fue diputado nacional de Vox en el Congreso de los Diputados, donde desempeñó funciones de liderazgo en comisiones relacionadas con Economía, Asuntos Exteriores, Defensa y Seguridad Nacional. Es además autor de artículos y tribunas publicados en medios como Expansión, Vozpópuli, El Economista, El Confidencial y Libertad Digital.",
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
    "juan-angel-soto": "/images/nosotros/Juan Angel Soto Gomez.png",
    "didac-sanchez-olaya": "/images/nosotros/didac-sanchez-olaya.png",
    "alexia-cosmello-guisande": "/images/nosotros/Alexia Cosmello.png",
    "calli-pacheco-munoz": "/images/nosotros/Calli Munoz.png",
    "beatriz-de-leon-cobo": "/images/nosotros/Beatriz de Leon Cobo.png",
    "juan-pablo-chamon-saucedo": "/images/nosotros/Juan Pablo Chamon.png",
    "segundo-carafi": "/images/nosotros/Segundo Carafi.png",
    "matthaus-konradsheim": "/images/nosotros/Matthaus Konradsheim.png",
    "jose-maria-cortes": "/images/nosotros/jose-maria-cortes.png",
    "jose-manuel-perez-ariza": "/images/nosotros/Jose Manuel Perez Ariza.png",
    "alberto-andres-rodriguez": "/images/nosotros/Alberto A.png",
    "diego-salazar-ramirez": "/images/nosotros/Diego Salazar.png",
    "javier-soto-gomez": "/images/nosotros/Javier Soto.png",
    "victor-gonzalez-coello-de-portugal": "/images/nosotros/Victor Gonzalez Coello de Portugal.png",
    "carlos-andreu-pintado": "/images/nosotros/Carlos Andreu Pintado.png",
    "ramsi-jazmati-akili": "/images/nosotros/Ramsi Jazmati Akili.png",
    "carlos-casares": "/images/nosotros/Carlos Casares.png",
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

    expert.country = EXPERT_COUNTRY_OVERRIDES[expert.slug] ?? "España";
    if (verifiedPhoto) {
        expert.photo = [verifiedPhoto];
    }
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
