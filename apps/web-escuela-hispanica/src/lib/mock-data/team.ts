import type { LocalizedText } from '@/types';

export interface TeamMember {
    name: string;
    role: string | LocalizedText;
    country?: string;
    image: string;
    bio?: string;
    institution?: string;
}

export const teamData = {
    junta: [
        {
            name: 'Alejandro Chafuen',
            role: { es: 'PRESIDENTE DE HONOR', en: 'HONORARY PRESIDENT', pt: 'PRESIDENTE DE HONRA' },
            country: 'Argentina',
            image: '/images/team/Alejandro-Chafuen.webp',
            bio: 'Alejandro A. Chafuen es Senior Executive Fellow en el Acton Institute. Fue presidente y director ejecutivo de Atlas Network entre 1991 y 2018, y actualmente es presidente de la junta de la Chase Foundation of Virginia. Graduado en Grove City College y en la Universidad Católica Argentina de Buenos Aires, posee además un doctorado en Economía, obtenido bajo la tutoría del Dr. Hans Sennholz, discípulo de Ludwig von Mises. Es un comentarista habitual en temas de economía, seguridad y amenazas estratégicas en América Latina, así como sobre la relación entre economía y ética. Chafuen es colaborador de Forbes.com y autor de Faith and Liberty, obra publicada en varios idiomas y en distintas ediciones en español, esloveno, chino, checo, italiano y portugués. Es uno de los principales especialistas del mundo en el pensamiento económico de los autores tomistas y escolásticos tardíos. Fue presidente de la Philadelphia Society (2017-2018) y, desde 1980, es miembro de la Mont Pèlerin Society.',
        },
        {
            name: 'Juan Ángel Soto Gómez',
            role: { es: 'SECRETARIO GENERAL', en: 'SECRETARY GENERAL', pt: 'SECRETÁRIO GERAL' },
            country: 'España',
            image: '/images/team/Juan-Angel-Soto-Gomez.webp',
            bio: 'Murcia (España), 1992. Es graduado en Administración y Dirección de Empresas y Derecho por la Universidad de Navarra, y en Ciencia Política y de la Administración por la UNED. Tiene un máster en Teoría Política y Legal por la University College London (UCL) y actualmente está haciendo su tesis doctoral en ciencias políticas en St. Mary\'s University, Twickenham, London. En 2015 fundó Fortius Consulting, una empresa de consultoría estratégica centrada en el Tercer Sector y que opera tanto en España como en diferentes países europeos, América y África, y está especializada en think tanks. Ha ocupado diferentes puestos directivos, siendo director ejecutivo de la Fundación Civismo (2018-2021) y director internacional de la Fundación Disenso (2021-2023). A su vez, es un emprendedor social y ha fundado numerosas organizaciones estudiantiles y cívicas, entre las que destacan la Fundación Fortius y la Fundación Principios, de las que es presidente. Ha publicado más de 200 artículos en prensa y en distintas revistas especializadas e imparte clases en la Universidad de Navarra.',
        },
        {
            name: 'André Azevedo Alves',
            role: { es: 'VICEPRESIDENTE ACADÉMICO', en: 'ACADEMIC VICE-PRESIDENT', pt: 'VICE-PRESIDENTE ACADÉMICO' },
            country: 'Portugal',
            image: '/images/team/Andre-Azevedo-Alves.webp',
            institution: 'Universidade Católica Portuguesa · St Mary\'s University, Londres',
            bio: 'André Azevedo Alves es catedrático en la Universidade Católica Portuguesa, donde coordina el Centro de Investigación del Instituto de Estudios Políticos en Lisboa y participa en los programas de Grado, Máster y Doctorado en Ciencia Política y Relaciones Internacionales. Es también Reader en Economía, Economía Política y Políticas Públicas en la St Mary\'s University de Londres, y forma parte del Benedict XVI Centre for the Study of Religion and Society. Es licenciado en Economía por la Facultad de Economía de Oporto, máster en Ciencia Política por el IEP-UCP y doctor en Government por la London School of Economics and Political Science. Ha impartido clases en diversas instituciones portuguesas e internacionales y fue director del Centro de Estudios y Encuestas de Opinión (CESOP-UCP). Miembro de la Mont Pèlerin Society, forma parte de los consejos editoriales de Economic Affairs (Reino Unido) y MISES (Brasil), y ha publicado numerosos trabajos en los campos de economía política, políticas públicas, filosofía política y ética.',
        },
        {
            name: 'Mª Idoya Zorroza Huarte',
            role: { es: 'VICEPRESIDENTA ACADÉMICA', en: 'ACADEMIC VICE-PRESIDENT', pt: 'VICE-PRESIDENTE ACADÉMICA' },
            country: 'España',
            image: '/images/team/Idoya-Zorroza-Huarte.webp',
            institution: 'Universidad Pontificia de Salamanca, España',
            bio: 'María Idoya Zorroza Huarte es profesora titular en la Universidad Pontificia de Salamanca, donde también dirige el Instituto de Pensamiento Iberoamericano. Doctora en Filosofía por la Universidad de Navarra (2001), está acreditada por ANECA y especializada en historia de la filosofía española (contemporánea y clásica, especialmente la Escuela de Salamanca). Su investigación se centra en la antropología de la justicia y el pensamiento de figuras como Francisco de Vitoria y Francisco Suárez. Ha coordinado obras colectivas, participado en proyectos nacionales e internacionales (incluyendo uno del MICINN), y ha sido profesora visitante en universidades de Perú y Kenia.',
        },
        {
            name: 'León Gómez Rivas',
            role: { es: 'VICEPRESIDENTE ACADÉMICO', en: 'ACADEMIC VICE-PRESIDENT', pt: 'VICE-PRESIDENTE ACADÉMICO' },
            country: 'España',
            image: '/images/team/Leon-Gomez-Rivas.webp',
            institution: 'Universidad Europea de Madrid, España',
            bio: 'León Gómez Rivas es profesor titular en el Departamento de Economía de la Universidad Europea de Madrid, donde imparte asignaturas de Historia y Pensamiento Económico desde 1991. Es doctor en Historia Moderna por la Universidad Complutense de Madrid, con una tesis sobre «El virrey del Perú don Francisco de Toledo» (1990), y doctor en Economía y Empresa por la misma universidad, con una tesis titulada «La Escuela de Salamanca, Hugo Grocio y el liberalismo económico en Gran Bretaña» (2004). Sus temas de investigación se centran en el pensamiento político y económico de la segunda escolástica española, especialmente en la Escuela de Salamanca. Es miembro de la Mont Pelerin Society, del Centro Diego de Covarrubias y de varias asociaciones académicas. Ha colaborado con la Universidad Francisco Marroquín de Guatemala en el Sitio Escolástico y ha publicado obras como «Don Diego de Covarrubias» (Unión Editorial, 2022).',
        },
        {
            name: 'Carroll Ríos de Rodríguez',
            role: { es: 'VICEPRESIDENTA ACADÉMICA', en: 'ACADEMIC VICE-PRESIDENT', pt: 'VICE-PRESIDENTE ACADÉMICA' },
            country: 'Guatemala',
            image: '/images/team/Carroll-Rios-de-Rodriguez.webp',
            institution: 'Instituto Fe y Libertad, Guatemala',
            bio: 'Carroll Ríos de Rodríguez es economista y profesora universitaria guatemalteca, especializada en análisis económico de la política, desarrollo económico e historia. Obtuvo una maestría en Estudios Latinoamericanos de la Universidad de Georgetown, en Washington, D.C., Estados Unidos. Es profesora de elección pública en el Instituto de Estudios Políticos y Relaciones Internacionales de la Universidad Francisco Marroquín (UFM). Además, es co-fundadora y presidenta del Instituto Fe y Libertad, una organización cuya misión es promover el florecimiento humano mediante la libertad individual y los principios judeocristianos. Su investigación se centra en temas como la política comparada, la historia y el desarrollo económico. Ha publicado el libro Crisis financiera, populismo y el camino a la prosperidad en América Latina. Es miembro del Consejo Directivo del Centro de Estudios Económico-Sociales (CEES), de la Asociación Familia, Desarrollo y Población (FADEP) y de la Sociedad Mont Pelerin.',
        },
    ],
    consejo: [
        {
            name: 'Rita Seabra Brito',
            role: { es: 'CONSEJERA', en: 'COUNCIL MEMBER', pt: 'CONSELHEIRA' },
            country: 'Portugal',
            image: '/images/team/Rita-Seabra-Brito.webp',
            bio: 'Rita Seabra Brito es directora del Estoril Political Forum – The International Annual Meetings in Political Studies del Instituto de Estudios Políticos de la Universidad Católica Portuguesa (IEP-UCP), en Lisboa. Es máster en Ciencia Política, con una tesis titulada "La sociedad libre y virtuosa en el pensamiento de Juan Pablo II", y fue estudiante visitante en la Universidad de Oxford (St. Antony\'s College) a través del programa de intercambio del IEP-UCP, con una beca de la Fundación Calouste Gulbenkian. Es investigadora asociada del CIEP y, desde 2010, asistente docente, colaborando con el profesor Manuel Braga da Cruz en las asignaturas de Grado "Sistemas y regímenes políticos" y "Partidos políticos". En 2006 asistió en Cracovia (Polonia) al seminario de un mes "Tertio Millennio Seminar on the Free Society", organizado por el Ethics and Public Policy Center de Washington D.C. Sus principales áreas de investigación incluyen la doctrina social de la Iglesia, los regímenes y sistemas políticos, con especial atención a los partidos políticos. Es miembro del Consejo de Patronos del Instituto +Liberdade.',
        },
        {
            name: 'José Manuel Moreira',
            role: { es: 'CONSEJERO', en: 'COUNCIL MEMBER', pt: 'CONSELHEIRO' },
            country: 'Portugal',
            image: '/images/team/Jose-Manuel-Moreira.webp',
            bio: 'Licenciado y doctor en Economía y Filosofía. Catedrático jubilado de Ciencias Sociales y Políticas en la Universidade de Aveiro. Fue director del Máster en Administración Pública (Master in Public Administration), un programa conjunto entre la Universidade Católica Portuguesa (UCP) y la Universidade de Aveiro (UA). Ha contribuido a la redescubierta y divulgación en Portugal de cuatro grandes áreas: ética económica y empresarial, tradición austriaca de la economía, análisis económico de la política y gobernanza y políticas públicas. Desarrolla su actividad como columnista y conferenciante, y colabora además con el Instituto de Estudos Políticos de la Universidade Católica Portuguesa (IEP-UCP) y con la Ordem dos Engenheiros (Região Sul), en el curso de Ética y Deontología. Es autor de más de ciento cincuenta libros y artículos, publicados en revistas nacionales y extranjeras. Miembro de la Mont Pèlerin Society, del Consejo de Patronos del Instituto +Liberdade y, en el pasado, de los órganos sociales de la Associação Portuguesa de Ciência Política.',
        },
        {
            name: 'Fernán Altuve-Febres Lores',
            role: { es: 'CONSEJERO', en: 'COUNCIL MEMBER', pt: 'CONSELHEIRO' },
            country: 'Perú',
            image: '/images/team/Fernan-Altuve-Febres-Lores.webp',
            bio: 'Fernán Altuve-Febres Lores (Lima, 1968) es un jurista, historiador y político peruano. Es Académico de Honor de la Real Academia de Jurisprudencia y Legislación de España y miembro correspondiente de la Real Academia de Ciencias Morales y Políticas de Madrid. Desde 2015 preside la Sociedad Peruana de Historia y la Fundación Ugarte del Pino. Licenciado en Derecho por la Universidad de Lima, con maestría y doctorado en Filosofía por la UNMSM, ha sido catedrático en universidades y escuelas militares. Ejerce como abogado desde 1993 y es uno de los árbitros más destacados del Perú. Fue congresista (2000–2001) y regidor de Lima (2010–2014). Autor de obras como La monarquía sin corona y Los conservadores, es reconocido por su pensamiento político conservador.',
        },
        {
            name: 'Pedro López Arriba',
            role: { es: 'CONSEJERO', en: 'COUNCIL MEMBER', pt: 'CONSELHEIRO' },
            country: 'España',
            image: '/images/team/Pedro-Lopez-Arriba.webp',
            bio: 'Pedro López Arriba, nacido en Madrid en 1956, es licenciado en Derecho y en Filosofía por la Universidad Autónoma de Madrid y ha desempeñado diversos cargos de responsabilidad en la Junta de Gobierno del Ateneo de Madrid. Actualmente es Socio Bibliotecario de la Junta de Gobierno del Ateneo Científico, Literario y Artístico de Madrid, un cargo que ocupa desde 2023. Ha sido también Contador (2008-2012) y Vicepresidente 1º (2012-2016) de la Junta de Gobierno. Además, ha presidido la Sección de Ciencias Jurídicas y Políticas del Ateneo en múltiples ocasiones entre 2009 y 2020. Ha colaborado habitualmente con medios como Entreletras.eu y El Catoblepas. En 2023, fue elegido como socio bibliotecario en la renovación de la Junta de Gobierno, junto con el nuevo presidente Luis Arroyo.',
        },
    ],
    comiteEmpresarial: [
        {
            name: 'Víctor González Coello de Portugal',
            role: { es: 'COMITÉ EMPRESARIAL', en: 'BUSINESS COMMITTEE', pt: 'COMITÉ EMPRESARIAL' },
            country: 'España',
            image: '/images/team/Victor-Gonzalez-Coello-de-Portugal.webp',
            bio: 'Víctor González Coello de Portugal es un empresario español con una trayectoria ligada al sector privado antes de su entrada en la política. Fundador de la consultora de gestión Management Productive Resources SL, ha desarrollado su carrera en el ámbito de los negocios y las finanzas, con experiencia en la dirección de empresas locales. Entre sus actividades empresariales destaca la copropiedad de una empresa de taxis junto a Louis Alphonse de Bourbon. Graduado en European Business por la Universidad de Portsmouth y con un máster en finanzas por la Universidad Complutense de Madrid, su perfil se ha caracterizado por una formación académica enfocada en economía y gestión empresarial.',
        },
    ],
    equipo: [
        {
            name: 'Jorge Machín Mezher',
            role: { es: 'DIRECTOR ESCUELA HISPÁNICA', en: 'DIRECTOR, HISPANIC SCHOOL', pt: 'DIRETOR, ESCOLA HISPÂNICA' },
            country: 'Venezuela',
            image: '/images/team/Jorge-Machin-Mezher.webp',
            bio: 'Jorge Alejandro Machín Mezher (1997) es doctor en Derecho por la Universidad de Navarra (Sobresaliente Cum Laude, Mención Internacional), donde se desempeña como profesor del área de Filosofía del Derecho y director adjunto del Máster en Derechos Humanos. Se graduó en Derecho (Cum Laude) en Venezuela y completó en la Universidad de Navarra el Máster en Derechos Humanos y un Diploma en Teología Moral. Su trabajo académico se sitúa en la intersección entre teoría constitucional, filosofía moral y tradición jurídica clásica, con especial atención a la proporcionalidad, el principio del doble efecto y los debates contemporáneos sobre los conflictos entre derechos. Es autor de El debate sobre los conflictos entre derechos (Tirant lo Blanch, 2025) y ha desarrollado investigaciones sobre la racionalidad de la ponderación, la ética de la acción humana y la fundamentación del juicio jurídico. Ha realizado estancias de investigación en la Universidad de Notre Dame (Estados Unidos) y en la Pontificia Universidad de la Santa Cruz (Roma), y es miembro del comité científico evaluador de la revista jurídica Persona y Derecho.',
        },
        {
            name: 'Ángel Carrión Tavárez',
            role: { es: 'DIRECTOR ACADÉMICO', en: 'ACADEMIC DIRECTOR', pt: 'DIRETOR ACADÉMICO' },
            country: 'Puerto Rico',
            image: '/images/team/Angel-Carrion-Tavarez.webp',
            bio: 'Ángel Carrión-Tavárez es editor, educador e investigador multidisciplinario. Fue fundador y editor de la revista de economía y política pública Panorama 21 (publicada en español, inglés y portugués); director del semanario de negocios Caribbean Business; y editor-jefe y presidente de la Junta Editora de la revista arbitrada Fórum Empresarial. Recibió el "Premio Especial Teodoro Moscoso al Periodismo de Negocios" del Overseas Press Club en 2006 y la "Medalla de Excelencia en Periodismo" de la Unesco en 2005. Ha sido coordinador académico del Certificado en Edición y Artes Editoriales, profesor de Geografía Empresarial y Regional; y director del Centro de Investigaciones Comerciales e Iniciativas Académicas, en la Universidad de Puerto Rico. Tiene un doctorado en Integración y Desarrollo Económico y Territorial de la Universidad de León (España), una Maestría en Humanidades de California State University y un bachillerato en Ciencias Sociales de la Universidad de Puerto Rico.',
        },
        {
            name: 'Gonçalo Nabeiro',
            role: { es: 'COORDINADOR EN PORTUGAL', en: 'COORDINATOR IN PORTUGAL', pt: 'COORDENADOR EM PORTUGAL' },
            country: 'Portugal',
            image: '/images/team/Goncalo-Nabeiro.webp',
            bio: 'Campo Maior (Portugal), 2001. Licenciado en Ciencia Política y Relaciones Internacionales por la Facultad de Ciencias Sociales y Humanas de la Universidad Nova de Lisboa, es actualmente editor de la sección internacional del periódico Nascer do SOL, donde publica semanalmente una columna y varios artículos periodísticos, y está finalizando el Máster en Economía Internacional y Estudios Europeos en el ISEG, Universidad de Lisboa. Colabora ocasionalmente en la columna de la Oficina da Liberdade publicada en Observador.',
        },
        {
            name: 'David Cruz de la Torre',
            role: { es: 'COORDINADOR EN EE.UU.', en: 'COORDINATOR IN THE U.S.', pt: 'COORDENADOR NOS EUA' },
            country: 'Puerto Rico',
            image: '/images/team/David-Cruz-de-la-Torre.webp',
            bio: 'Puerto Rico. Especialista en Política Pública con una perspectiva transatlántica y un compromiso con la promoción de la libertad y la dignidad humana. Formado en la Harris School of Public Policy de la Universidad de Chicago y en la Universidad de California, Los Ángeles (UCLA), David tiene experiencia en análisis de datos, evaluación de programas y gestión operativa en el ámbito de la economía del comportamiento. Inspirado por su herencia puertorriqueña y sus valores intelectuales, busca contribuir al fortalecimiento del legado hispánico mediante iniciativas que fomenten el progreso y la cooperación internacional.',
        },
    ]
};

export const allTeamMembers = [
    ...teamData.junta,
    ...teamData.consejo,
    ...teamData.comiteEmpresarial,
    ...teamData.equipo
];

export function getTeamMemberByName(name: string) {
    return allTeamMembers.find(member => member.name.toLowerCase() === name.toLowerCase());
}
