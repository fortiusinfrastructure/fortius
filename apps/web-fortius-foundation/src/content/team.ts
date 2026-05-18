/* ============================================================
   FORTIUS FOUNDATION — Team, Patronato, Consejo Asesor
   ============================================================ */

export type BoardChapter = "espana" | "usa";

export const BOARD_CHAPTER_LABEL: Record<BoardChapter, string> = {
    espana: "Fundación Fortius España",
    usa: "Fortius Foundation United States",
};

export interface BoardMember {
    slug: string;
    name: string;
    role: string;
    chapter: BoardChapter;
    bio: string;
    email?: string;
    linkedin?: string;
    photo?: string;
}

export interface AdvisoryMember {
    slug: string;
    name: string;
    bio: string;
    linkedin?: string;
    photo?: string;
}

export type TeamArea = "fundacion" | "escuela-hispanica" | "ieam";

export const TEAM_AREA_LABEL: Record<TeamArea, string> = {
    fundacion: "Fundación Fortius",
    "escuela-hispanica": "Escuela Hispánica",
    ieam: "Instituto Español de Análisis Migratorio",
};

export type TeamGroup = "gerencia" | "direccion" | "equipo";

export const TEAM_GROUP_LABEL: Record<TeamGroup, string> = {
    gerencia: "Gerencia",
    direccion: "Directores de proyecto",
    equipo: "Equipo",
};

export interface TeamMember {
    slug: string;
    name: string;
    role: string;
    area: TeamArea;
    group: TeamGroup;
    isDirector: boolean;
    bio: string;
    email?: string;
    linkedin?: string;
    photo?: string;
}

export const PATRONATO: BoardMember[] = [
    {
        slug: "juan-angel-soto",
        name: "Juan Ángel Soto Gómez",
        role: "Presidente",
        chapter: "espana",
        bio: "Juan Ángel Soto (Murcia, 1992), es graduado en Administración y Dirección de Empresas y en Derecho por la Universidad de Navarra, así como en Ciencias Políticas y de la Administración por la UNED. Cuenta con un máster en Teoría Política y Jurídica por University College London (UCL) y es doctorando en Ciencia Política en St. Mary’s University de Londres. Es fundador y CEO de Fortius, una firma de consultoría estratégica especializada en think tanks, inteligencia y riesgos geopolíticos que opera en Europa, América y África. Asimismo, ha ocupado distintos cargos ejecutivos en varios centros de pensamiento, siendo director ejecutivo de la Fundación Civismo (2018–2021) y director internacional de la Fundación Disenso (2021–2023). Es emprendedor social y ha fundado numerosas organizaciones cívicas, como la Fundación Fortius y Principios, de las que es presidente; y ha impulsado iniciativas como el Instituto Español de Análisis Migratorio o Escuela Hispánica. Colabora de forma habitual en medios de comunicación españoles e internacionales. Como académico, es profesor de teoría política en la Universidad de Navarra. Es Visiting Fellow del Danube Institute de Budapest y de la Universidad Ludovika, e imparte clases en diferentes universidades europeas y escuelas de negocios, como la Universidad de las Hespérides.",
        linkedin: "https://www.linkedin.com/in/juanangelsoto/",
    },
    {
        slug: "belen-navarro-rubio-es",
        name: "Belén Navarro-Rubio Coello de Portugal",
        role: "Vicepresidente",
        chapter: "espana",
        bio: "Madrid (España), 1993. Graduada en Medicina por la Universidad Francisco de Vitoria, Máster en Oncología Radioterápica por la Technological University y doctora en Medicina por la Universidad CEU San Pablo. Ha realizado numerosas estancias en EE. UU. de entre las que destaca su experiencia en neurocirugía en el Harrington Program de la University of Miami. Ha sido investigadora en el Diabetes Research Institute (DRI) de Miami (2018-2019) y es especialista en Oncología Radioterápica por la Clínica Universidad de Navarra. Es fellow de oncología en el MD Anderson Cancer Center de Houston, Estados Unidos.",
        linkedin: "https://www.linkedin.com/in/belennavarrorubio/",
    },
    {
        slug: "javier-garcia-martinez-artero",
        name: "Javier García Martínez-Artero",
        role: "Vicepresidente",
        chapter: "espana",
        bio: "Murcia (España), 1992. Graduado en Derecho por la Universidad de Murcia, incluyendo una estancia en la Universitat de València por medio del Programa de Movilidad SICUE. Trabajó como abogado en Noguera Abogados&Asesores. Está especializado en función pública y derecho administrativo. Ha realizado tareas de asesoramiento jurídico a asociaciones de vecinos. Trabaja como preparador de opositores para el acceso al empleo público de la Administración autonómica y en la Administración General del Estado. Ha cursado estudios en guitarra española y eléctrica, en especial, en música moderna, formando parte de varias formaciones musicales. Actualmente se encuentra grabando el cuarto álbum de estudio de la banda de rock a la que pertenece como guitarra.",
    },
    {
        slug: "sonsoles-queipo-de-llano-hevia",
        name: "Sonsoles Queipo de Llano Hevia",
        role: "Patrono",
        chapter: "espana",
        bio: "Asturias (España), 1995. Graduada en Economía por la Universidad Carlos III de Madrid y en Psicología por la UNED. Educación ejecutiva en liderazgo en la Universidad de Harvard, en emprendimiento social en The Social MBA, y máster en coaching en Innerkey. Su carrera profesional comenzó con 19 años como consultora financiera, ocupando su primer puesto de dirección y liderazgo con 20 años. Ha emprendido en el mundo hípico y financiero. Actualmente, es empresaria, consultora y conferenciante especializada en impacto social, alianzas y relaciones estratégicas. Coordinadora de iniciativas en multitud de organizaciones nacionales e internacionales con impacto social. Entre numerosas responsabilidades, es directora del área social de la primera asociación de mujeres de España, «La Real e Ilustre Junta de Damas de Honor y Mérito», es cofundadora y tesorera de «101 Magos», y coordinadora de asuntos sociales de «Talento para el Futuro». Apasionada de la política, el emprendimiento y la transformación social, así como de la hípica, del flamenco y la lectura.",
        linkedin: "https://www.linkedin.com/in/sonsolesqll/",
    },
    {
        slug: "juan-angel-soto-us",
        name: "Juan Ángel Soto Gómez",
        role: "Presidente",
        chapter: "usa",
        bio: "Juan Ángel Soto (Murcia, 1992), es graduado en Administración y Dirección de Empresas y en Derecho por la Universidad de Navarra, así como en Ciencias Políticas y de la Administración por la UNED. Cuenta con un máster en Teoría Política y Jurídica por University College London (UCL) y es doctorando en Ciencia Política en St. Mary’s University de Londres. Es fundador y CEO de Fortius, una firma de consultoría estratégica especializada en think tanks, inteligencia y riesgos geopolíticos que opera en Europa, América y África. Asimismo, ha ocupado distintos cargos ejecutivos en varios centros de pensamiento, siendo director ejecutivo de la Fundación Civismo (2018–2021) y director internacional de la Fundación Disenso (2021–2023). Es emprendedor social y ha fundado numerosas organizaciones cívicas, como la Fundación Fortius y Principios, de las que es presidente; y ha impulsado iniciativas como el Instituto Español de Análisis Migratorio o Escuela Hispánica. Colabora de forma habitual en medios de comunicación españoles e internacionales. Como académico, es profesor de teoría política en la Universidad de Navarra. Es Visiting Fellow del Danube Institute de Budapest y de la Universidad Ludovika, e imparte clases en diferentes universidades europeas y escuelas de negocios, como la Universidad de las Hespérides.",
        linkedin: "https://www.linkedin.com/in/juanangelsoto/",
    },
    {
        slug: "joseph-prudhomme",
        name: "Joseph Prud’homme",
        role: "Vicepresidente",
        chapter: "usa",
        bio: "Joseph Prud’homme es Burton Family Chair en Religión, Política y Cultura y profesor asociado de Ciencia Política en Washington College, donde además dirige el Institute for Religion, Politics, and Culture, del que es fundador. Doctor por Princeton University, ha sido fellow en Harvard University y en la University of Oxford. Su investigación se centra en filosofía política, teoría jurídica, historia intelectual y religión en la vida pública. Es autor y editor de numerosas publicaciones académicas sobre religión, política, derecho constitucional y educación, y participa habitualmente como conferenciante en foros nacionales e internacionales.",
        linkedin: "https://www.linkedin.com/in/joseph-prud-homme-b1324463/",
    },
    {
        slug: "belen-navarro-rubio-us",
        name: "Belén Navarro-Rubio Coello de Portugal",
        role: "Vicepresidente",
        chapter: "usa",
        bio: "Madrid (España), 1993. Graduada en Medicina por la Universidad Francisco de Vitoria, Máster en Oncología Radioterápica por la Technological University y doctora en Medicina por la Universidad CEU San Pablo. Ha realizado numerosas estancias en EE. UU. de entre las que destaca su experiencia en neurocirugía en el Harrington Program de la University of Miami. Ha sido investigadora en el Diabetes Research Institute (DRI) de Miami (2018-2019) y es especialista en Oncología Radioterápica por la Clínica Universidad de Navarra. Es fellow de oncología en el MD Anderson Cancer Center de Houston, Estados Unidos.",
        linkedin: "https://www.linkedin.com/in/belennavarrorubio/",
    },
];

export const CONSEJO_ASESOR: AdvisoryMember[] = [
    {
        slug: "carlos-andreu-pintado",
        name: "Carlos Andreu Pintado",
        bio: "Pamplona (España), 1972. Carlos Andreu es Máster en Dirección y Administración de Empresas (MBA) por el IESE – Universidad de Navarra. Previamente se había licenciado en Derecho por la Universidad de Zaragoza. Es profesor habitual de Universidades españolas como la de Navarra, el CEU, la Antonio de Nebrija y de Escuelas de Negocios como IESE-IRCO, Instituto Internacional San Telmo, El Centro de Ibercaja… Además es profesor visitante de otras Universidades como la Universidad de los Andes en Chile, la Iberoamericana en México… En el inicio de su carrera profesional ocupó puestos directivos comerciales en empresas de distribución de suministros industriales, y en una empresa líder en el sector del vending. Tras siete años en Iter Consultores, actualmente dirige su propia empresa de consultoría, formación y desarrollo. Es autor del best seller “Del Ataúd a la Cometa” (Ed. Planeta) del que se han publicado ya 9 ediciones.",
        linkedin: "https://www.linkedin.com/in/carlosandreu/",
    },
    {
        slug: "ramsi-jazmati-akili",
        name: "Ramsi Jazmati Akili",
        bio: "El Dr. Ramsi Jazmati Akili es investigador no residente en la Escuela de Gobierno Mohammed Bin Rashid, investigador en el Instituto de Cultura y Sociedad y posee un doctorado en Liderazgo de Mujeres Emiratíes en el departamento de Empresa y Humanismo de la Universidad de Navarra. Tiene una maestría en Bioética y un MBDU de la escuela de negocios ESADE, además de un diploma en Alta Dirección de la escuela de negocios IESE. Adicionalmente, posee un programa de especialización en gobernanza y diplomacia cultural de la Academia de Diplomacia Cultural de Berlín, Alemania. Es subdirector del Instituto Choiseul España, un centro de pensamiento con especial énfasis en geoeconomía y el impacto de las relaciones internacionales en la economía española. Es miembro del Observatorio de Equidad de Mujeres en la Fundación Promoción Social en Madrid. Ha ocupado el cargo de Patrono en el Patronato de la Fundación Promoción Social. Fue Director de Proyectos de la agencia para la competitividad empresarial del Gobierno Regional de Cataluña en la Región del Golfo, donde fue responsable de expandir la presencia de empresas catalanas en el Golfo con el fin de atraer capital y establecer relaciones institucionales entre el gobierno regional de Cataluña y las entidades institucionales en la región del Golfo. Es conferenciante en foros internacionales sobre el liderazgo de las mujeres árabes, profesor visitante en diferentes universidades en España y ha publicado diversos artículos en el Centro de Estudios Estratégicos en Madrid. Es columnista regular sobre las relaciones entre España y el mundo árabe. Habla el árabe, inglés y español, y su experiencia se centra en Liderazgo de Mujeres, Diplomacia Cultural y Geoeconomía.",
        linkedin: "https://www.linkedin.com/in/ramzi-jazmati-akili-4a958a2b2/",
    },
    {
        slug: "federico-aznar-fernandez-montesinos",
        name: "Federico Aznar Fernández-Montesinos",
        bio: "Cartagena (España), 1964. Analista principal del Instituto Español de Estudios Estratégicos (IEEE), profesor del Centro Superior de Estudios de la defensa Nacional (CESEDEN), Capitán de Fragata de la Armada, Licenciado (UNED) y Doctor (UCM) en Ciencias Políticas y de la Administración, especialista en religión, cultura y civilización islámica y en relaciones de España con el Norte de África, Diplomado de Estado Mayor, Diplomado por el colegio de la OTAN, especialista en submarinos y comunicaciones, autor de más de ciento cincuenta artículos académicos principalmente sobre temas relacionados con teoría de la guerra, liderazgo estratégico, terrorismo, polemología y sociología. Profesor en diferentes másteres y otros títulos académicos sobre estos aspectos. Autor de varios libros, de entre los que destacan Repensando el liderazgo estratégico (2018) y La guerra: teoría para los conflictos del siglo XXI (2024).",
        linkedin: "https://www.linkedin.com/in/federicoaznar/",
    },
    {
        slug: "jose-ballesteros-de-la-puerta",
        name: "José Ballesteros de la Puerta",
        bio: "Licenciado en Derecho por la Universidad de Granada, MBA por las Universidades de Boston y Libre de Bruselas, es actualmente cofundador de VESP (Vías para la Evolución y Superación Personal), firma de formación especializada en desarrollo personal, comunicación, relaciones humanas, trabajo en equipo, liderazgo y ventas. Profesor invitado de algunas de las más prestigiosas escuelas de negocios y universidades. Conferenciante muy solicitado nacional e internacionalmente de la mano de BCC Speakers, está catalogado como uno de los más destacados en el campo de la automotivación. Ha impartido más de mil seminarios, talleres y conferencias para empresas e instituciones. Antes de crear VESP, desarrolló una muy exitosa carrera en el mundo corporativo, llegando a ser el directivo más joven del mundo en una de las corporaciones estadounidenses donde trabajó. Posee un alto bagaje internacional y una gran experiencia en la gestión, motivación y desarrollo de equipos. Autor de decenas de artículos, ha publicado cuatro títulos.",
        linkedin: "https://www.linkedin.com/in/joseballesteros1/",
    },
    {
        slug: "alejandro-chafuen",
        name: "Alejandro Chafuen",
        bio: "Alejandro A. Chafuen es Senior Executive Fellow en el Acton Institute. Fue presidente y director ejecutivo de Atlas Network entre 1991 y 2018, y actualmente es presidente de la junta de la Chase Foundation of Virginia. Graduado en Grove City College y en la Universidad Católica Argentina de Buenos Aires, posee además un doctorado en Economía, obtenido bajo la tutoría del Dr. Hans Sennholz, discípulo de Ludwig von Mises. Es un comentarista habitual en temas de economía, seguridad y amenazas estratégicas en América Latina, así como sobre la relación entre economía y ética. Chafuen es colaborador de Forbes.com y autor de Faith and Liberty, obra publicada en varios idiomas y en distintas ediciones en español, esloveno, chino, checo, italiano y portugués. Es uno de los principales especialistas del mundo en el pensamiento económico de los autores tomistas y escolásticos tardíos. Fue presidente de la Philadelphia Society (2017-2018) y, desde 1980, es miembro de la Mont Pèlerin Society.",
        linkedin: "https://www.linkedin.com/in/alex-chafuen-4558296/",
    },
    {
        slug: "carlos-casares",
        name: "Carlos Casares",
        bio: "Carlos Casares (Uruguay) lleva décadas acompañando a empresarios, familias empresarias y consejos de administración en procesos complejos de estrategia, gobierno y relaciones humanas, en múltiples países y contextos culturales. Discípulo de Juan Antonio Pérez López, combina una mirada antropológica con un enfoque socrático, convencido de que entender a las personas es tan importante como el análisis técnico. Ha participado en procesos de crecimiento, profesionalización y venta de compañías, integrando directorios y consejos en cuatro continentes, y ha desarrollado una extensa trayectoria académica en Iberoamérica y Europa, donde es Catedrático Emérito. Cree que la verdadera formación ocurre en el trabajo con personas, en los errores y en las crisis — y que todos vivimos \"en construcción\" hasta el final. Reside entre Europa, Estados Unidos y el Río de la Plata.",
        linkedin: "https://www.linkedin.com/in/carloscasares/",
    },
];

export const TEAM: TeamMember[] = [
    {
        slug: "javier-soto-gomez",
        name: "Javier Soto Gómez",
        role: "Gerente",
        area: "fundacion",
        group: "gerencia",
        isDirector: false,
        bio: "Murcia (España), 2002. Graduado en Derecho y Economía por la Universidad de Navarra. Ha desarrollado su trayectoria profesional en despachos como GES Abogados y Vicente Ortega Abogados, donde adquirió experiencia en asesoramiento jurídico, laboral y contable, con especial atención al acompañamiento de entidades y clientes en cuestiones administrativas, regulatorias y de cumplimiento normativo. Cuenta con experiencia específica en el ámbito de las organizaciones sin ánimo de lucro, incluyendo fundaciones y asociaciones. Actualmente ejerce como Gerente de la Fundación Fortius, desde donde supervisa la gestión operativa, legal y administrativa de la entidad, así como la coordinación de sus áreas jurídica y financiera.",
        linkedin: "https://www.linkedin.com/in/javier-soto-g%C3%B3mez-2b60b218a/",
    },
    {
        slug: "jorge-machin-mezher",
        name: "Jorge Machín Mezher",
        role: "Director de Escuela Hispánica",
        area: "escuela-hispanica",
        group: "direccion",
        isDirector: true,
        bio: "Venezuela (1997) es doctor en Derecho por la Universidad de Navarra (Sobresaliente Cum Laude, Mención Internacional), donde se desempeña como profesor del área de Filosofía del Derecho y director adjunto del Máster en Derechos Humanos. Se graduó en Derecho (Cum Laude) en Venezuela y completó en la Universidad de Navarra el Máster en Derechos Humanos y un Diploma en Teología Moral. Su trabajo académico se sitúa en la intersección entre teoría constitucional, filosofía moral y tradición jurídica clásica, con especial atención a la proporcionalidad, el principio del doble efecto y los debates contemporáneos sobre los conflictos entre derechos. Es autor de El debate sobre los conflictos entre derechos (Tirant lo Blanch, 2025) y ha desarrollado investigaciones sobre la racionalidad de la ponderación, la ética de la acción humana y la fundamentación del juicio jurídico. Ha realizado estancias de investigación en la Universidad de Notre Dame (Estados Unidos) y en la Pontificia Universidad de la Santa Cruz (Roma), y es miembro del comité científico evaluador de la revista jurídica Persona y Derecho. Es director de Escuela Hispánica.",
        email: "jmachinmezh@escuelahispanica.org",
        linkedin: "https://www.linkedin.com/in/jorge-mach%C3%ADn-mezher-57566a1b9/",
    },
    {
        slug: "beatriz-de-leon-cobo-ieam",
        name: "Beatriz de León Cobo",
        role: "Directora del Instituto Español de Análisis Migratorio",
        area: "ieam",
        group: "direccion",
        isDirector: true,
        bio: "Madrid (España). Beatriz de León Cobo es consultora, investigadora y analista especializada en seguridad, migración, dinámica de conflictos y radicalización violenta en África Occidental y el Sahel. Trabaja como consultora independiente para gobiernos, ONGs, organizaciones internacionales y think tanks. También es doctoranda en sociología por la Universidad de la Sorbona. Beatriz es profesora del máster de Acción Política de la Universidad Francisco de Vitoria y analista en el Centro de Seguridad Internacional de la UFV, donde dirige el «Foro de Diálogo Sahel Europe». Es investigadora asociada (Fellow) del think tank RUSI (Royal United Services Institute). Beatriz tiene un máster en Defensa, Seguridad y Gestión de Crisis por el Institut de Relations Internationales Strátegiques (IRIS). Es directora del Instituto Español de Análisis Migratorio y de su foro empresarial, Mediterranean Dialogue.",
        email: "beatriz.deleoncobo@ieam.es",
        linkedin: "https://www.linkedin.com/in/beatriz-de-leon-cobo/",
    },
    {
        slug: "juliana-montoya-padilla",
        name: "Juliana Montoya Padilla",
        role: "Asistente de comunicación — Escuela Hispánica",
        area: "escuela-hispanica",
        group: "equipo",
        isDirector: false,
        bio: "San Salvador (El Salvador), 2005. Estudiante de Administración y Dirección de Empresas en la Universidad de Navarra. Sus intereses se centran en la estrategia empresarial, la consultoría y la innovación, así como en el papel de la empresa en la sociedad. Interesada en la realidad del mundo hispano, colabora en iniciativas de formación y reflexión sobre su realidad económica y social.",
    },
    {
        slug: "camille-dock",
        name: "Camille Dock",
        role: "Asistente de investigación — Instituto Español de Análisis Migratorio",
        area: "ieam",
        group: "equipo",
        isDirector: false,
        bio: "París (Francia). Estudiante de Máster en Estudios Africanos en la Universidad de Ginebra, se especializa en el análisis geopolítico de las dinámicas políticas, económicas y de seguridad en el África subsahariana. Tras una estancia académica en la Universidad Paris 1 Panthéon-Sorbonne, se incorporó al Instituto Español de Análisis Migratorio en el marco de sus prácticas de fin de carrera. Allí redacta principalmente notas de análisis destinadas a esclarecer el impacto de los fenómenos políticos y de seguridad en las dinámicas migratorias, y realiza un seguimiento estratégico de los flujos migratorios entre África, España y Europa. Previamente trabajó en la misión permanente de Madagascar en la Oficina de Naciones Unidas en Ginebra así como en el Parlamento Europeo.",
        email: "camille.dock@ieam.es",
        linkedin: "https://www.linkedin.com/in/camille-dock-746266250/",
    },
];

export function getBoardByChapter(chapter: BoardChapter): BoardMember[] {
    return PATRONATO.filter((m) => m.chapter === chapter);
}

export function getTeamByArea(area: TeamArea): TeamMember[] {
    return TEAM.filter((m) => m.area === area);
}

export function getInitials(name: string): string {
    const parts = name.split(" ").filter(Boolean);
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
    return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}
