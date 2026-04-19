export interface TeamMember {
    img: string;
    name: string;
    role: string;
    role_en?: string;
    bio: string;
    bio_en?: string;
    linkedin?: string;
    email?: string;
    twitter?: string;
    scholar?: string;
    website?: string;
}

export const coreTeam: TeamMember[] = [
    {
        img: "/team/member-2.jpg",
        name: "Beatriz de León",
        role: "Directora Ejecutiva",
        role_en: "Executive Director",
        linkedin: "https://www.linkedin.com/in/beatrizdeleoncobo/",
        email: "beatriz.deleoncobo@ieam.es",
        bio: "Madrid (España). Beatriz de León Cobo es consultora, investigadora y analista especializada en seguridad, migración, dinámica de conflictos y radicalización violenta en África Occidental y el Sahel. Trabaja como consultora independiente para gobiernos, ONGs, organizaciones internacionales y think tanks. También es doctoranda en sociología por la Universidad de la Sorbona. Beatriz es profesora del master de Acción Política de la Universidad Francisco de Vitoria y analista en el Centro de Seguridad Internacional de la UFV, donde dirige el «Foro de Diálogo Sahel Europe». Es investigadora asociada (Fellow) del think tank RUSI (Royal United Services Institute). Beatriz tiene un máster en Defensa, Seguridad y Gestión de Crisis por el Institut de Relations Internationales Strátegiques (IRIS).",
        bio_en: "Madrid (Spain). Beatriz de León Cobo is a consultant, researcher, and analyst specializing in security, migration, conflict dynamics, and violent radicalization in West Africa and the Sahel. She works as an independent consultant for governments, NGOs, international organizations, and think tanks. She is also a PhD candidate in sociology at the Sorbonne University. Beatriz is a professor in the Master of Political Action at the Francisco de Vitoria University and an analyst at the UFV International Security Center, where she directs the 'Sahel Europe Dialogue Forum'. She is an Associate Fellow at the RUSI (Royal United Services Institute) think tank. Beatriz holds a Master's in Defense, Security, and Crisis Management from the Institut de Relations Internationales Strátegiques (IRIS)."
    },
    {
        img: "/team/member-1.jpg",
        name: "Tasnim Idriss",
        role: "Coordinadora para el Norte de África",
        role_en: "North Africa Coordinator",
        linkedin: "#",
        email: "tasnim@mediterraneandialogue.org",
        bio: "Túnez. Especialista en ciencia política y estudios culturales. Coordinadora del proyecto Diálogo Mediterráneo del IEAM y profesora en la Universidad de Túnez El Manar. Anteriormente fue subdirectora de Islam & Liberty Network, centrado en libertad económica y política en países de mayoría musulmana. Licenciada en literatura angloamericana por la École Normale Supérieure de Túnez y máster en Estudios Culturales por la Universidad de Cartago. Actualmente cursa un doctorado en Ciencia Política en la Universidad de la Civilización de Estambul. Con amplia experiencia en gobernanza y procesos electorales, ha colaborado con organizaciones internacionales como la Initiatives of Change Foundation y Atlas Network.",
        bio_en: "Tunis. Specialist in political science and cultural studies. Coordinator of the Mediterranean Dialogue project at IEAM and professor at the University of Tunis El Manar. Previously, she was deputy director of the Islam & Liberty Network, focused on economic and political freedom in Muslim-majority countries. She holds a degree in Anglo-American literature from the École Normale Supérieure de Tunis and a Master's in Cultural Studies from the University of Carthage. She is currently pursuing a PhD in Political Science at Istanbul Medeniyet University. With extensive experience in governance and electoral processes, she has collaborated with international organizations such as the Initiatives of Change Foundation and Atlas Network."
    },
    {
        img: "/team/camille.jpeg",
        name: "Camille Dock",
        role: "Asistente de Investigación",
        role_en: "Research Assistant",
        linkedin: "#",
        bio: "París (Francia). Estudiante de Máster en Estudios Africanos en la Universidad de Ginebra, se especializa en el análisis geopolítico de las dinámicas políticas, económicas y de seguridad en el África subsahariana. Tras una estancia académica en la Universidad Paris 1 Panthéon-Sorbonne, se incorporó al Instituto Español de Análisis Migratorio en el marco de sus prácticas de fin de carrera. Allí redacta principalmente notas de análisis destinadas a esclarecer el impacto de los fenómenos políticos y de seguridad en las dinámicas migratorias, y realiza un seguimiento estratégico de los flujos migratorios entre África, España y Europa. Previamente trabajó en la misión permanente de Madagascar en la Oficina de Naciones Unidas en Ginebra así como en el Parlamento Europeo.",
        bio_en: "Paris (France). Master's student in African Studies at the University of Geneva, specializing in the geopolitical analysis of political, economic, and security dynamics in sub-Saharan Africa. After an academic stay at the University Paris 1 Panthéon-Sorbonne, she joined the Spanish Institute for Migration Analysis as part of her final degree internship. There, she mainly drafts analysis notes intended to clarify the impact of political and security phenomena on migratory dynamics, and carries out strategic monitoring of migratory flows between Africa, Spain, and Europe. Previously, she worked at the permanent mission of Madagascar to the United Nations Office in Geneva as well as at the European Parliament."
    }
];

export const researchFellows: TeamMember[] = [
    {
        img: "/team/member-3.jpg",
        name: "Bréma Ely Dicko",
        role: "Investigador asociado",
        role_en: "Associate Researcher",
        linkedin: "https://www.linkedin.com/in/dr-br%C3%A9ma-ely-dicko-7a07b7a/?originalSubdomain=ml",
        bio: "Bamako (Mali). Bréma Ely Dicko es doctor en Sociología de las Migraciones y de las Relaciones Interétnicas por la Universidad Paris 7 Denis Diderot y profesor en la Universidad de Letras y Ciencias Humanas de Bamako (ULSHB). Ha sido consejero especial de dos primeros ministros de la transición en Mali en materias de desplazados internos y refugiados, migraciones, esclavitud y retorno del Estado en las regiones del centro del país. Además, integró el equipo redactor del anteproyecto de la nueva Constitución y dirigió la Unidad de Investigaciones de la Comisión Verdad, Justicia y Reconciliación (CVJR), de cuyo informe final fue coautor. Caballero de la Orden Nacional de Mali, sus líneas de investigación abarcan las migraciones malienses, las relaciones interétnicas, la gobernanza de la movilidad y el extremismo violento, campos en los que ha publicado numerosos libros y artículos académicos.",
        bio_en: "Bamako (Mali). Bréma Ely Dicko holds a PhD in Sociology of Migration and Interethnic Relations from Paris 7 Denis Diderot University and is a professor at the University of Letters and Human Sciences of Bamako (ULSHB). He has served as a special advisor to two transitional prime ministers in Mali on issues related to internally displaced persons, refugees, migration, slavery, and state return in the central regions of the country. Additionally, he was part of the drafting team for the new Constitution and headed the Research Unit of the Truth, Justice and Reconciliation Commission (CVJR), co-authoring its final report. A Knight of the National Order of Mali, his research focuses on Malian migrations, interethnic relations, mobility governance, and violent extremism, fields in which he has published numerous books and academic articles."
    },
    {
        img: "/team/martial_zongo.jpg",
        name: "Martial Zongo",
        role: "Investigador asociado",
        role_en: "Associate Researcher",
        linkedin: "#",
        bio: "Profesor Martial Zongo. Ouagadougou (Burkina Faso). Relwendé Louis Martial Zongo es doctor en Derecho por la Universidad de Ginebra y profesor titular de Derecho público en la Universidad Thomas Sankara (UTS), donde se desempeña como director adjunto de la Escuela de Doctorado. Especialista en derecho comunitario, derecho constitucional, derecho internacional y derecho de las organizaciones internacionales, es además el Director Ejecutivo del Centro de Estudios Regionales Africanos (CERA). Desde 2024 forma parte de la lista de árbitros de la Corte Permanente de Arbitraje de La Haya en representación de Burkina Faso. Sus trabajos se centran en la integración regional africana y el derecho comunitario de la UEMOA. Es presidente de la Sociedad burkinesa de Derecho Constitucional, portavoz de la Sociedad burkinesa de Derecho Internacional, miembro de la Academia Africana de Práctica del Derecho Internacional, miembro fundador de la Sociedad Africana de Derecho Comunitario e integrante de diversas redes y comités científicos africanos y europeos.",
        bio_en: "Professor Martial Zongo. Ouagadougou (Burkina Faso). Relwendé Louis Martial Zongo holds a PhD in Law from the University of Geneva and is a full professor of Public Law at Thomas Sankara University (UTS), where he serves as deputy director of the Doctoral School. A specialist in community law, constitutional law, international law, and law of international organizations, he is also the Executive Director of the Center for African Regional Studies (CERA). Since 2024, he has been on the list of arbitrators of the Permanent Court of Arbitration in The Hague representing Burkina Faso. His work focuses on African regional integration and UEMOA community law. He is president of the Burkinabe Society of Constitutional Law, spokesman for the Burkinabe Society of International Law, member of the African Academy of International Law Practice, founding member of the African Society of Community Law, and member of various African and European scientific networks and committees."
    },
    {
        img: "/team/romeo_gbaguidi.jpg",
        name: "Roméo Gbaguidi",
        role: "Investigador asociado",
        role_en: "Associate Researcher",
        linkedin: "#",
        bio: "Pr. Roméo Gbaguidi. Roméo Gbaguidi es doctor en Humanidades por la Universidad Carlos III de Madrid, filólogo hispanista y mediador intercultural originario de Benín. Es profesor en la Universidad Antonio de Nebrija y en otras universidades españolas, y presidente y director de investigaciones del Laboratorio de Estudio de las Migraciones Africanas – LemAfriQ. Ha sido mediador intercultural y director del Centro de Participación e Integración (CEPI) Hispano-Africano de la Comunidad de Madrid. Sus ámbitos de especialización incluyen las migraciones internacionales entre África y Europa, la mediación social e intercultural y el estudio de las diásporas africanas, sobre los que ha impartido numerosos cursos y conferencias y publicado diversos trabajos académicos y de divulgación.",
        bio_en: "Prof. Roméo Gbaguidi. Roméo Gbaguidi holds a PhD in Humanities from Carlos III University of Madrid, is a Hispanic philologist, and an intercultural mediator originally from Benin. He is a professor at Antonio de Nebrija University and other Spanish universities, and president and research director of the Laboratory for the Study of African Migrations – LemAfriQ. He has been an intercultural mediator and director of the Hispanic-African Center for Participation and Integration (CEPI) of the Community of Madrid. His areas of specialization include international migration between Africa and Europe, social and intercultural mediation, and the study of African diasporas, on which he has taught numerous courses and conferences and published various academic and dissemination works."
    },
    {
        img: "/team/soraya_aybar.jpg",
        name: "Soraya Aybar",
        role: "Investigadora asociada",
        role_en: "Associate Researcher",
        linkedin: "#",
        bio: "Soraya Aybar es politóloga, periodista y directora de África Mundi, un medio especializado en el continente africano y en las relaciones entre África y Europa. Coordina LISA News, y escribe como freelance para varios medios de comunicación nacionales e internacionales. Graduada en Ciencias Políticas por la Universitat de València y con masters en derechos humanos, paz y desarrollo sostenible, comunicación y relaciones internacionales y periodismo, ha trabajado en consultoría política, en temáticas como migraciones, participación pública o geopolítica. Es profesora en el Grado de Relaciones Internacionales de la Universidad Camilo José Cela. Sus principales áreas de interés son la geopolítica africana, las dinámicas migratorias y fronterizas en el espacio euro-mediterráneo-africano y las narrativas mediáticas sobre el continente, temas que aborda combinando análisis, trabajo de campo en África y proyectos de comunicación.",
        bio_en: "Soraya Aybar is a political scientist, journalist, and director of África Mundi, a media outlet specialized in the African continent and relations between Africa and Europe. She coordinates LISA News and writes as a freelancer for various national and international media outlets. Graduated in Political Science from the University of Valencia and holding master's degrees in human rights, peace and sustainable development, communication and international relations, and journalism, she has worked in political consulting on topics such as migration, public participation, or geopolitics. She is a professor in the International Relations Degree at Camilo José Cela University. Her main areas of interest are African geopolitics, migration and border dynamics in the Euro-Mediterranean-African space, and media narratives about the continent, topics she addresses by combining analysis, field work in Africa, and communication projects."
    },
    {
        img: "/team/Aimara-Pujadas.jpeg",
        name: "Aimara Pujadas",
        role: "Investigadora asociada",
        role_en: "Associate Researcher",
        linkedin: "#",
        bio: "Ginebra (Suiza). Aimara es consultora internacional especializada en gobernanza de la migración, derechos humanos y políticas públicas. Actualmente trabaja en la Organización Internacional para las Migraciones (OIM-ONU Migración), en la implementación del Pacto Mundial para una Migración Segura, Ordenada y Regular, centrada en el diálogo con actores institucionales y en procesos de consulta para fortalecer marcos de gestión migratoria. Es cofundadora y coordinadora de proyectos de derechos humanos en Mujeres-Migrantes, donde ha trabajado en políticas de protección y planes de igualdad vinculados a infancia, inclusión, migración y desarrollo. Anteriormente ha colaborado con el Geneva International Centre for Justice, la Fundación Ayuda en Acción y la Comisión Interamericana de Derechos Humanos, elaborando informes temáticos y jurídicos sobre desapariciones forzadas, protección de refugiados, niñez en contextos de conflicto y personas migrantes. Es máster en Gobernanza y Derechos Humanos por la Universidad Autónoma de Madrid.",
        bio_en: "Geneva (Switzerland). Aimara is an international consultant specializing in migration governance, human rights, and public policy. She currently works at the International Organization for Migration (IOM-UN Migration), on the implementation of the Global Compact for Safe, Orderly and Regular Migration, focusing on dialogue with institutional actors and consultation processes to strengthen migration management frameworks. She is co-founder and project coordinator for human rights at Mujeres-Migrantes, where she has worked on protection policies and equality plans linked to childhood, inclusion, migration, and development. Previously, she has collaborated with the Geneva International Centre for Justice, Ayuda en Acción Foundation, and the Inter-American Commission on Human Rights, preparing thematic and legal reports on enforced disappearances, refugee protection, childhood in conflict contexts, and migrants. She holds a Master's in Governance and Human Rights from the Autonomous University of Madrid."
    },
    {
        img: "/team/member6.jpg",
        name: "Luigi Limone",
        role: "Investigador asociado",
        role_en: "Associate Researcher",
        linkedin: "https://www.linkedin.com/in/luigilimone/",
        bio: "Luigi Limone es un profesional internacional con más de ocho años de experiencia, incluyendo dentro del sistema de las Naciones Unidas, especializado en gobernanza migratoria, trata de personas, tráfico de migrantes y protección de los derechos humanos. Su trabajo se centra en contextos frágiles y afectados por conflictos, con especial experiencia en el Sahel y en África Occidental y Central. Desde enero de 2020, trabaja con la Oficina de las Naciones Unidas contra la Droga y el Delito (UNODC), primero en Níger y luego en Dakar como Oficial Asociado de Programas. Ha diseñado, implementado y monitoreado programas nacionales y regionales destinados a prevenir la trata de personas y el tráfico de migrantes, fortalecer las respuestas de las fuerzas del orden y de la justicia penal, y garantizar el cumplimiento de las normas internacionales de derechos humanos. Luigi cuenta con amplia experiencia en asistencia legislativa y promoción de políticas, habiendo apoyado la alineación de los marcos legales nacionales con las convenciones y protocolos internacionales.",
        bio_en: "Luigi Limone is an international professional with over eight years of experience, including within the United Nations system, specializing in migration governance, human trafficking, and migrant smuggling, and human rights protection. His work focuses on fragile and conflict-affected contexts, with particular expertise in the Sahel and West and Central Africa. Since January 2020, he has been working with the United Nations Office on Drugs and Crime (UNODC), first in Niger and later in Dakar as Associate Programme Officer. He has designed, implemented, and monitored national and regional programmes aimed at preventing human trafficking and migrant smuggling, strengthening law enforcement and criminal justice responses, and ensuring compliance with international human rights standards. Luigi has extensive experience in legislative assistance and policy advocacy, having supported the alignment of national legal frameworks with international conventions and protocols."
    },
    {
        img: "/team/ehameye.png",
        name: "Ehameye Ag Mohamedoun",
        role: "Investigador asociado",
        role_en: "Associate Researcher",
        bio: "Bamako (Malí). Ehameye Ag Mohamedoun posee un Executive Master en Reconstrucción del Estado en Contextos Postconflicto por el Instituto de Estudios Políticos de Grenoble (UGA) y un Máster Profesional en Mantenimiento de la Paz por la Escuela de Mantenimiento de la Paz Alioune Blondin Beye (EMP-ABB) en Bamako. Se desempeñó como asesor especial del Gobernador de la región de Tombuctú, brindando orientación estratégica sobre Reforma del Sector de Seguridad (RSS), Desarme, Desmovilización y Reintegración (DDR), así como mediación comunitaria. También ha trabajado como consultor-formador en la firma de consultoría Turban Consulting-SARL. Actualmente es Presidente y cofundador de la ONG Sahel Solidaire (ASS), activa en iniciativas humanitarias, de desarrollo y fortalecimiento de la resiliencia comunitaria en el Sahel. Su investigación y trabajo profesional se centran en las dinámicas de seguridad en el Sahel, los grupos armados y los procesos de estabilización en contextos de crisis y postconflicto.",
        bio_en: "Bamako (Mali). Ehameye Ag Mohamedoun holds an Executive Master in State Reconstruction in Post-Conflict Contexts from the Institute of Political Studies of Grenoble (UGA) and a professional Master's in Peacekeeping from the Alioune Blondin Beye Peacekeeping School (EMP-ABB) in Bamako. He served as special advisor to the Governor of Timbuktu region, providing strategic guidance on Security Sector Reform (SSR), Disarmament, Demobilization, and Reintegration (DDR), as well as community mediation. He has also worked as a consultant-trainer at consulting firm Turban Consulting-SARL. He is currently President and co-founder of the NGO Sahel Solidaire (ASS), which is active in humanitarian, development, and community resilience initiatives in the Sahel. His research and professional work focus on Sahelian security dynamics, armed groups, and stabilization processes in crisis and post-conflict contexts."
    },
    {
        img: "/team/ValentinaBenincasa.webp",
        name: "Valentina Benincasa",
        role: "Investigadora asociada",
        role_en: "Associate Researcher",
        linkedin: "https://www.linkedin.com/in/valentina-benincasa-8b1bb375/",
        bio: "Valentina Benincasa es antropóloga, graduada en Cooperación Internacional para el Desarrollo por la Università La Sapienza de Roma. Cuenta con un máster en Estudios Avanzados en Antropología Social y Cultural y un doctorado en Antropología Social por la Universidad Complutense de Madrid. Sus líneas de investigación se centran en la relación entre ayuda humanitaria y política migratoria, así como en el análisis del asilo y de la acogida a solicitantes de asilo y refugiados desde un enfoque de género, en España y México. Ha colaborado como investigadora en proyectos de investigación nacionales e internacionales sobre migraciones y género y ha participado como docente en programas formativos universitarios tanto nacionales como internacionales. Asimismo, ha presentado su trabajo en numerosos congresos internacionales sobre estudios humanitarios y migraciones. Actualmente es co-coordinadora de The Anthropology of Humanitarianism Network (AHN) de la European Association of Social Anthropologists (EASA).",
        bio_en: "Valentina Benincasa is an anthropologist, graduated in International Cooperation for Development from Università La Sapienza. She holds a master's degree in Advanced Studies in Social and Cultural Anthropology and a PhD in Social Anthropology from Universidad Complutense de Madrid. Her research focuses on the relationship between humanitarian aid and migration policy, as well as the analysis of asylum and the reception of asylum seekers and refugees from a gender perspective in Spain and Mexico. She has collaborated as a researcher on national and international projects on migration and gender and has taught in university training programs both nationally and internationally. She has also presented her work at numerous international conferences on humanitarian studies and migration. She is currently co-coordinator of The Anthropology of Humanitarianism Network (AHN) of the European Association of Social Anthropologists."
    },
    {
        img: "/team/fannycuret.png",
        name: "Fanny CURET",
        role: "Investigadora asociada",
        role_en: "Associate Researcher",
        bio: "Fanny CURET. Politóloga y jurista francesa, actualmente residente en España. Tras varios años de trabajo y de vida en Marruecos y Senegal, coordina actualmente el RAEMH (Réseau Afrique-Europe pour les Mobilités Humaines), una red transnacional dedicada a los desafíos relacionados con las movilidades humanas, las políticas migratorias y la protección de los derechos de las personas migrantes y refugiadas. Su trayectoria combina experiencia de terreno, expertise jurídico y análisis político, así como la gestión y coordinación de programas y asociaciones internacionales. Cuenta con experiencia en el ámbito de las movilidades humanas, en particular desde la perspectiva del acompañamiento y la protección de las personas en movilidad, la protección de la infancia, así como la gobernanza de las migraciones.",
        bio_en: "Fanny CURET. A French political scientist and legal expert, currently based in Spain. After several years of working and living in Morocco and Senegal, she now coordinates the RAEMH (Réseau Afrique Europe pour les Mobilités Humaines), a transnational network dedicated to issues related to human mobility, migration policies, and the protection of the rights of migrants and refugees. Her professional background combines field experience, legal expertise, and policy analysis, as well as the management and coordination of international programmes and partnerships. She has developed expertise in the field of human mobility, particularly in supporting and protecting people on the move, child protection, and migration governance."
    }
];
