import type { LocalizedText } from '@/types';

export interface TeamMember {
    name: string;
    role: string | LocalizedText;
    country?: string;
    image: string;
    bio?: string | LocalizedText;
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
            bio: {
                es: `Víctor Guido González Coello de Portugal es un distinguido empresario español y exdiputado del Congreso de los Diputados, nacido en Madrid en 1975. Su formación internacional —habiendo vivido en Francia, el Reino Unido, Irlanda, Sudáfrica y Estados Unidos— le ha proporcionado una amplia perspectiva global y una profunda conciencia geopolítica.
Posee una doble licenciatura en Administración y Dirección de Empresas por universidades públicas de Madrid y un Bachelor of Arts with Honors in European Business por la University of Portsmouth. Su perfil académico se ve además reforzado por estudios en la London School of Economics (LSE) y en la University of California San Diego (UCSD), así como por un Máster en Finanzas por CUNEF, institución en la que presidió la asociación de antiguos alumnos hasta 2008. Posteriormente cursó un Executive MBA de dos años en IESE Business School (promoción de 2004).
Antes de iniciar su carrera profesional, realizó el servicio militar en la Brigada Paracaidista del Ejército español (BRIPAC), tras haber recibido formación en Culver Military Academy (EE. UU.) durante sus años escolares y veranos.
En el ámbito profesional, González Coello de Portugal cuenta con más de 20 años de experiencia en alta dirección, con una trayectoria en banca de inversión y desarrollo corporativo en empresas multinacionales. Inició su carrera en UBS en el área de Corporate Finance y ocupó posteriormente posiciones relevantes en Argentaria/BBVA y Ebro Foods. Ha liderado operaciones de fusiones y adquisiciones por un valor superior a 3.000 millones de dólares. Más tarde, como empresario, se especializó en la adquisición y reestructuración de empresas que afrontaban procesos de sucesión generacional y dificultades operativas, desarrollando una sólida experiencia práctica en gestión de crisis y recuperación empresarial. Actualmente es Executive Director en MPR y mantiene inversiones estratégicas en el sector del petróleo y el gas tanto en Europa como en Estados Unidos.
Ha ofrecido presentaciones en los principales centros financieros del mundo, entre ellos Nueva York, Londres, Frankfurt, Ginebra, Singapur, Boston y Chicago, interactuando directamente con algunos de los mayores fondos de inversión internacionales.
En el ámbito público, González Coello de Portugal fue diputado en el Congreso de los Diputados por VOX, representando a la circunscripción de Salamanca. Ha ocupado cargos de liderazgo como vicepresidente de VOX y portavoz en comisiones parlamentarias clave como Economía, Asuntos Exteriores, Defensa y Seguridad Nacional. Su trabajo legislativo ha sido relevante para la definición de las posiciones estratégicas del partido en materia económica e internacional.
A nivel internacional, ha intervenido en parlamentos y congresos como el Parlamento de Rumanía, los Congresos de Guatemala y Perú, el Senado de México, el Parlamento Latinoamericano y el Senado de los Estados Unidos. Su compromiso con los valores democráticos y los derechos humanos le ha llevado a mantener encuentros pacíficos con líderes de la oposición perseguidos por regímenes autoritarios. Como consecuencia de estas actividades, ha sido expulsado oficialmente de Bolivia, con prohibición de entrada durante tres años; detenido e interrogado en Venezuela; y denegada su entrada en Nicaragua y Cuba. Estas medidas fueron adoptadas en respuesta directa a su apoyo público y a sus reuniones pacíficas con miembros de la oposición democrática en dichos países.
Más allá de la política y los negocios, González Coello de Portugal mantiene un firme compromiso con causas humanitarias, ofreciendo mentoría y apoyo a luchadores por la libertad y a cristianos perseguidos en distintas partes del mundo.
Casado y padre de nueve hijos, su familia constituye el eje central de su vida personal y política, inspirando su compromiso con la construcción de una España más libre, próspera y soberana.
Ha escrito y publicado artículos en medios de referencia como Expansión, Vozpópuli, El Economista, El Confidencial y Libertad Digital en España; El Expreso en Ecuador y Perú; así como en diversas publicaciones de Panamá, Colombia y otros países. Asimismo, ha mantenido encuentros y relaciones cercanas con líderes conservadores, especialmente en el continente americano —desde Canadá hasta Argentina— y en Europa.
El Sr. Víctor González Coello de Portugal posee inversiones significativas en campos de gas natural en Texas y en operaciones de petróleo crudo en el estado de Luisiana.`,
                en: `Víctor Guido González Coello of Portugal is a distinguished Spanish businessman and former member of the Congress of Deputies, born in Madrid in 1975. His international training – having lived in France, the United Kingdom, Ireland, South Africa and the United States – has provided him with a broad global perspective and deep geopolitical awareness.
He has a double degree in Business Administration and Management from public universities in Madrid and a Bachelor of Arts with Honors in European Business from the University of Portsmouth. His academic profile is also reinforced by studies at the London School of Economics (LSE) and the University of California San Diego (UCSD), as well as a Master's Degree in Finance from CUNEF, an institution where he chaired the alumni association until 2008. He subsequently completed a two-year Executive MBA at IESE Business School (class of 2004).
Before starting his professional career, he performed military service in the Parachute Brigade of the Spanish Army (BRIPAC), after having received training at Culver Military Academy (USA) during his school years and summers.
In the professional field, González Coello from Portugal has more than 20 years of experience in senior management, with a track record in investment banking and corporate development in multinational companies. He began his career at UBS in the Corporate Finance area and subsequently held relevant positions at Argentaria/BBVA and Ebro Foods. He has led mergers and acquisitions transactions worth more than $3 billion. Later, as an entrepreneur, he specialized in the acquisition and restructuring of companies facing generational succession processes and operational difficulties, developing solid practical experience in crisis management and business recovery. He is currently Executive Director at MPR and maintains strategic investments in the oil and gas sector in both Europe and the United States.
He has given presentations in the main financial centers of the world, including New York, London, Frankfurt, Geneva, Singapore, Boston and Chicago, interacting directly with some of the largest international investment funds.
In the public sphere, González Coello from Portugal was a deputy in the Congress of Deputies for VOX, representing the Salamanca constituency. He has held leadership positions as vice president of VOX and spokesperson on key parliamentary committees such as Economy, Foreign Affairs, Defense and National Security. His legislative work has been relevant to the definition of the party's strategic positions in economic and international matters.
At the international level, he has spoken in parliaments and congresses such as the Parliament of Romania, the Congresses of Guatemala and Peru, the Senate of Mexico, the Latin American Parliament and the Senate of the United States. His commitment to democratic values ​​and human rights has led him to hold peaceful meetings with opposition leaders persecuted by authoritarian regimes. As a consequence of these activities, he has been officially expelled from Bolivia, with an entry ban for three years; detained and interrogated in Venezuela; and denied entry into Nicaragua and Cuba. These measures were adopted in direct response to his public support and his peaceful meetings with members of the democratic opposition in those countries.
Beyond politics and business, González Coello of Portugal maintains a strong commitment to humanitarian causes, offering mentoring and support to freedom fighters and persecuted Christians in different parts of the world.
Married and father of nine children, his family constitutes the central axis of his personal and political life, inspiring his commitment to building a freer, more prosperous and sovereign Spain.
He has written and published articles in leading media such as Expansión, Vozpópuli, El Economista, El Confidencial and Libertad Digital in Spain; El Expreso in Ecuador and Peru; as well as in various publications from Panama, Colombia and other countries. Likewise, he has maintained meetings and close relationships with conservative leaders, especially in the American continent—from Canada to Argentina—and in Europe.
Mr. Víctor González Coello of Portugal has significant investments in natural gas fields in Texas and in crude oil operations in the state of Louisiana.`,
                pt: `Víctor Guido González Coello, de Portugal, é um ilustre empresário espanhol e antigo membro do Congresso dos Deputados, nascido em Madrid em 1975. A sua formação internacional – tendo vivido em França, no Reino Unido, na Irlanda, na África do Sul e nos Estados Unidos – proporcionou-lhe uma ampla perspectiva global e uma profunda consciência geopolítica.
Possui dupla graduação em Administração e Gestão de Empresas pelas universidades públicas de Madri e bacharelado com distinção em Negócios Europeus pela Universidade de Portsmouth. O seu perfil académico é também reforçado por estudos na London School of Economics (LSE) e na University of California San Diego (UCSD), bem como um mestrado em Finanças pela CUNEF, instituição onde presidiu a associação de ex-alunos até 2008. Posteriormente, concluiu um MBA Executivo de dois anos na IESE Business School (turma de 2004).
Antes de iniciar a sua carreira profissional, prestou serviço militar na Brigada Paraquedista do Exército Espanhol (BRIPAC), após ter recebido formação na Academia Militar de Culver (EUA) durante os anos escolares e verões.
Na área profissional, González Coello, de Portugal, tem mais de 20 anos de experiência em gestão de topo, com experiência em banca de investimento e desenvolvimento corporativo em empresas multinacionais. Iniciou sua carreira no UBS na área de Corporate Finance e posteriormente ocupou cargos relevantes na Argentaria/BBVA e Ebro Foods. Ele liderarou transações de fusões e aquisições no valor de mais de US$ 3 bilhões. Posteriormente, como empresário, especializou-se na aquisição e reestruturação de empresas que enfrentavam processos de sucessão geracional e dificuldades operacionais, desenvolvendo sólida experiência prática em gestão de crises e recuperação empresarial. Atualmente é Diretor Executivo da MPR e mantém investimentos estratégicos no setor de petróleo e gás na Europa e nos Estados Unidos.
Fez apresentações nos principais centros financeiros do mundo, incluindo Nova Iorque, Londres, Frankfurt, Genebra, Singapura, Boston e Chicago, interagindo diretamente com alguns dos maiores fundos de investimento internacionais.
Na esfera pública, González Coello, de Portugal, foi deputado no Congresso dos Deputados pela VOX, em representação do círculo eleitoral de Salamanca. Ocupou cargos de liderança como vice-presidente da VOX e porta-voz em comissões parlamentarias importantes, como Economia, Relações Exteriores, Defesa e Segurança Nacional. O seu trabalho legislativo tem sido relevante para a definição das posições estratégicas do partido em questões económicas e internacionais.
A nível internacional, falou em parlamentos e congressos como o Parlamento da Roménia, os Congressos da Guatemala e do Peru, o Senado do México, o Parlamento Latino-Americano e o Senado dos Estados Unidos. O seu compromisso com os valores democráticos e os direitos humanos levou-o a realizar reuniões pacíficas com líderes da oposição perseguidos por regimes autoritários. Como consequência destas atividades, foi oficialmente expulso da Bolívia, com proibição de entrada durante três anos; detido e interrogado na Venezuela; e negada a entrada na Nicarágua e em Cuba. Estas medidas foram adoptadas em resposta directa ao seu apoio público e às suas reuniões pacíficas com membros da oposição democrática nesses países.
Para além da política e dos negócios, González Coello, de Portugal, mantém um forte compromisso com as causas humanitárias, oferecendo orientação e apoio aos combatentes pela liberdade e aos cristãos perseguidos em diferentes partes do mundo.
Casado e pai de nove filhos, a sua família constitui o eixo central da sua vida pessoal e política, inspirando o seu compromisso com a construção de uma Espanha mais livre, próspera e soberana.
Escreveu e publicou artigos em meios de comunicação de referência como Expansión, Vozpópuli, El Economista, El Confidencial e Libertad Digital em Espanha; El Expreso no Equador e no Peru; bem como em diversas publicações do Panamá, Colômbia e outros países. Da mesma forma, manteve reuniões e relações estreitas com líderes conservadores, especialmente no continente americano – do Canadá à Argentina – e na Europa.
O Sr. Víctor González Coello, de Portugal, tem investimentos significativos em campos de gás natural no Texas e em operações de petróleo bruto no estado de Louisiana.`
            },
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
            bio: {
    es: 'Campo Maior (Portugal), 2001. Licenciado en Ciencia Política y Relaciones Internacionales por la Facultad de Ciencias Sociales y Humanas de la Universidad Nova de Lisboa, es actualmente editor de la sección internacional del periódico Nascer do SOL, donde publica semanalmente una columna y varios artículos periodísticos, y es Máster en Economía Internacional y Estudios Europeos por el ISEG, Universidad de Lisboa. Colabora ocasionalmente en la columna de la Oficina da Liberdade publicada en Observador.',
    en: 'Campo Maior (Portugal), 2001. Graduate in Political Science and International Relations from the Faculty of Social and Human Sciences at Nova University of Lisbon, he is currently editor of the international section of the newspaper Nascer do SOL, where he publishes a weekly column and several journalistic articles, and holds a Master\'s degree in International Economics and European Studies from ISEG, University of Lisbon. He occasionally collaborates on the Oficina da Liberdade column published in Observador.',
    pt: 'Campo Maior (Portugal), 2001. Licenciado em Ciência Política e Relações Internacionais pela Faculdade de Ciências Sociais e Humanas da Universidade Nova de Lisboa, é atualmente editor da secção internacional do jornal Nascer do SOL, onde publica semanalmente uma coluna e vários artigos jornalísticos, e é Mestre em Economia Internacional e Estudos Europeus pelo ISEG, Universidade de Lisboa. Colabora ocasionalmente na coluna da Oficina da Liberdade publicada no Observador.'
},
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
