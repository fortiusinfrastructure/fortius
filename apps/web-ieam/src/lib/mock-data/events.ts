export interface EventAgendaItem {
  time?: string;
  title: string;
  title_en?: string;
  speaker?: string;
  speaker_en?: string;
}

export interface EventSpeaker {
  name: string;
  role: string;
  role_en?: string;
  group?: string;
  group_en?: string;
}

export interface EventAttachment {
  label: string;
  label_en?: string;
  url: string;
}

export interface EventItem {
  slug: string;
  title: string;
  title_en?: string;
  subtitle: string;
  subtitle_en?: string;
  category: string;
  category_en?: string;
  date: string;
  location: string;
  location_en?: string;
  format: string;
  format_en?: string;
  agendaTitle?: string;
  agendaTitle_en?: string;
  heroImage: string;
  heroImage_en?: string;
  highlightImage?: string;
  summary: string;
  summary_en?: string;
  content?: string;
  content_en?: string;
  agenda: EventAgendaItem[];
  speakers: EventSpeaker[];
  gallery?: string[];
  attachments?: EventAttachment[];
}

export const events: EventItem[] = [
  {
    slug: "workshop-rome-2026",
    title: "Taller de Inteligencia Colectiva en Roma",
    title_en: "Collective Intelligence Workshop in Rome",
    subtitle: "Gobernanza de la movilidad: enfoques de Italia, España y la UE.",
    subtitle_en: "Mobility governance: Italian, Spanish, and EU approaches.",
    category: "Taller",
    category_en: "Workshop",
    date: "06 Feb 2026",
    location: "Roma, Italia",
    location_en: "Rome, Italy",
    format: "Chatham House",
    format_en: "Chatham House",
    agendaTitle: "Programa del taller",
    agendaTitle_en: "Workshop Programme",
    heroImage: "/images/workshop-es-rome.jpg",
    heroImage_en: "/images/workshop-en-rome.jpg",
    summary: "El IEAM organizó en Roma un taller de inteligencia colectiva para comparar los enfoques italianos y españoles sobre gobernanza de la movilidad y evaluar su percepción por los socios africanos.",
    summary_en: "IEAM organised a collective intelligence workshop in Rome to compare Italian and Spanish mobility governance approaches and assess their perception by African partners.",
    content: `
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Resumen del Taller</h3>
      <p>El Instituto Español de Análisis Migratorio (IEAM), en colaboración con AMIStaDeS, organizó un taller de inteligencia colectiva el viernes 6 de febrero. El evento brindó la oportunidad de comparar los enfoques italiano y español dentro del marco más amplio de la UE, examinar cómo estas políticas son percibidas y experimentadas por socios y profesionales africanos, y identificar áreas donde la cooperación podría ser más realista, operativa y alineada con los imperativos de protección y los objetivos políticos generales.</p>
      <p>La reunión se llevó a cabo a puertas cerradas en la <b>Università Niccolò Cusano</b> de 9:30 a.m. a 4:30 p.m., reuniendo a alrededor de cuarenta participantes bajo la Regla de Chatham House, lo que garantizó que las contribuciones permanecieran confidenciales para fomentar un debate abierto y sincero.</p>
      
      <img src="/images/eventoromaimagen.jpg" alt="Taller en Roma" class="w-full h-auto rounded-lg my-8 shadow-md" />
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Participantes</h3>
      <p>El taller reunió a una amplia variedad de actores, incluyendo agencias de la ONU (UNODC, UNHCR), agencias gubernamentales regionales (Islas Canarias), el NATO Southern Hub, instituciones europeas (EEAS, EUSR), ministerios nacionales (Italia, España, Francia), organizaciones humanitarias (MSF), organizaciones religiosas y de la sociedad civil (Sant'Egidio), think tanks, instituciones de investigación y expertos africanos.</p>
      <p>Esta diversidad permitió contar con perspectivas transversales institucionales, operativas y analíticas sobre los problemas de movilidad euro-africana.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Objetivos del Taller</h3>
      <p>Este taller de inteligencia colectiva tuvo como objetivo establecer un entendimiento compartido sobre cómo Italia, España, la UE y sus socios africanos definen e implementan la gobernanza de la movilidad. También buscó fortalecer el análisis conjunto de las dinámicas en curso a lo largo de las rutas del Mediterráneo Central, Mediterráneo Occidental y Atlántico.</p>
      <p>Además, el taller examinó los marcos de cooperación con los Estados africanos, evaluando sus efectos en la práctica, y proporcionó un espacio para discutir las economías de tránsito, el crimen organizado y las respuestas contra el tráfico de migrantes, prestando especial atención a las consecuencias no deseadas y alternativas de reducción de daños.</p>
      <p>Finalmente, el taller tuvo como objetivo identificar opciones prácticas de seguimiento y vías operativas para mejorar la cooperación entre Italia, España, la UE y los socios africanos.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Temas Tratados</h3>
      <p>El taller se estructuró en varias sesiones clave:</p>
      
      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Sesión de apertura – Italia, España, la UE y África: ¿Hacia una visión común de la movilidad?</h4>
      <p>Esta sesión alineó perspectivas sobre la gobernanza de la movilidad e identificó las áreas donde los enfoques de la UE y de África convergen o divergen.</p>
      
      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Sesión de trabajo 1 – Cambios en las rutas: Mediterráneo Central, Mediterráneo Occidental y Atlántico</h4>
      <p>Esta sesión analizó los cambios en los flujos y rutas migratorias, el papel de los países de tránsito y cómo las medidas de la UE y nacionales influyen en la dinámica de las rutas y en los resultados de protección.</p>
      
      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Sesión de trabajo 2 – Asociaciones con Estados africanos: "paquetes" de seguridad, desarrollo y movilidad</h4>
      <p>Esta sesión examinó cómo se diseñan e implementan los marcos de cooperación, evaluó sus efectos en la práctica y exploró cómo los socios africanos perciben su legitimidad y sostenibilidad.</p>
      
      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Sesión de trabajo 3 – Economías de tránsito, crimen organizado y lucha contra el tráfico de migrantes</h4>
      <p>Esta sesión analizó la lógica de las redes de facilitación y las economías de tránsito y exploró cómo debilitar las redes criminales sin aumentar los riesgos para los migrantes ni perjudicar a las comunidades locales.</p>
      
      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Conclusiones finales</h4>
      <p>Esta sesión consolidó los principales hallazgos, los tradujo en recomendaciones operativas e identificó vías de seguimiento.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Resultados</h3>
      <p>A partir de las discusiones del taller, IEAM publicará en los próximos meses una serie de Policy Papers, resumiendo los hallazgos clave y proporcionando recomendaciones prácticas.</p>
      <p>El taller también fortaleció la red de actores de Italia–España–UE–África en materia de migración y movilidad, e identificó un conjunto de iniciativas de seguimiento alineadas con los intereses de los actores y las restricciones institucionales.</p>
    `,
    content_en: `
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Workshop Overview</h3>
      <p>The Spanish Institute for Migration Analysis (IEAM), in collaboration with AMIStaDeS, organised a collective intelligence workshop on Friday, 6 February. The event provided an opportunity to compare Italian and Spanish approaches within the broader EU framework, to examine how these policies are perceived and experienced by African partners and practitioners, and to identify areas where cooperation could be made more realistic, operational, and aligned with both protection imperatives and broader policy objectives.</p>
      <p>The meeting was held behind closed doors at <b>Università Niccolò Cusano</b> from 9:30 a.m. to 4:30 p.m., bringing together around forty participants under the Chatham House Rule, ensuring that contributions remained confidential in order to foster open and frank discussion.</p>
      
      <img src="/images/eventoromaimagen.jpg" alt="Workshop in Rome" class="w-full h-auto rounded-lg my-8 shadow-md" />
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Participants</h3>
      <p>The workshop brought together a diverse range of stakeholders, including UN agencies (UNODC, UNHCR), regional government agencies (Canary Islands), the NATO Southern Hub, European institutions (EEAS, EUSR), national ministries (Italy, Spain, France), humanitarian organisations (MSF), faith-based and civil society organisations (Sant'Egidio), think tanks, research institutions, and African experts.</p>
      <p>This diversity enabled cross-cutting institutional, operational, and analytical perspectives on Euro-African mobility issues.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Workshop Objectives</h3>
      <p>This collective intelligence workshop aimed to establish a shared understanding of how Italy, Spain, the EU, and their African partners define and implement mobility governance. It also sought to strengthen joint analysis of ongoing dynamics along the Central Mediterranean, Western Mediterranean, and Atlantic routes.</p>
      <p>In addition, the workshop examined cooperation frameworks with African states, assessing their real-world effects, and provided space to discuss transit economies, organised crime, and anti-smuggling responses, with particular attention to unintended consequences and harm-reduction alternatives.</p>
      <p>Finally, it aimed to identify practical follow-up options and operational pathways to enhance cooperation between Italy, Spain, the EU, and African partners.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Themes Discussed</h3>
      <p>The workshop was structured around several key sessions:</p>
      
      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Opening session – Italy, Spain, the EU and Africa: Toward a common vision of mobility?</h4>
      <p>This session aligned perspectives on mobility governance and identified areas where EU and African approaches converge or diverge.</p>
      
      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Working session 1 – Changing routes: Central Mediterranean, Western Mediterranean and Atlantic</h4>
      <p>This session analysed shifts in migration flows and routes, the role of transit countries, and how EU and national measures influence route dynamics and protection outcomes.</p>
      
      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Working session 2 – Partnerships with African states: Security, development and mobility "packages"</h4>
      <p>This session examined how cooperation frameworks are designed and implemented, assessed their real-world effects, and explored how African partners perceive their legitimacy and sustainability.</p>
      
      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Working session 3 – Transit economies, organised crime and the fight against migrant smuggling</h4>
      <p>This session examined the logics underpinning facilitation networks and transit economies and explored how to weaken criminal networks without increasing risks for migrants or harming local communities.</p>
      
      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Closing remarks</h4>
      <p>This session consolidated the main insights, translated them into operational recommendations, and identified follow-up avenues.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Outputs</h3>
      <p>Building on the workshop discussions, IEAM will publish a series of Policy Papers in the coming months, summarising key findings and providing practical recommendations.</p>
      <p>The workshop also strengthened the Italy–Spain–EU–Africa network of stakeholders on migration and mobility and identified a set of follow-up initiatives aligned with stakeholder interests and institutional constraints.</p>
    `,
    agenda: [
    ],
    speakers: []
  },
  {
    slug: "cumbre-szeged-2025",
    title: "Cumbre MCC-MRI 2025: Gobernanza de la Movilidad Humana",
    title_en: "MCC-MRI Summit 2025: Governance of Human Mobility",
    subtitle: "Evaluación europea, perspectivas globales y dinámicas regionales.",
    subtitle_en: "European assessment, global perspectives, and regional dynamics.",
    category: "Cumbre",
    category_en: "Summit",
    date: "24 Sep 2025",
    location: "Szeged, Hungría",
    location_en: "Szeged, Hungary",
    format: "Presencial",
    format_en: "In-person",
    heroImage: "/images/event-es-mcc.jpg",
    heroImage_en: "/images/event-en-mcc.jpg",
    summary: "La conferencia MCC/MRI reunió a responsables políticos e investigadores para evaluar la crisis migratoria de 2015 y proponer soluciones sostenibles.",
    summary_en: "The MCC/MRI conference brought together policymakers and researchers to evaluate the 2015 migration crisis and propose sustainable solutions.",
    content: `
      <p>Szeged (Hungría), 24 y 25 de septiembre – La conferencia MCC/MRI reunió a responsables políticos, investigadores y representantes de organizaciones europeas y estadounidenses, así como a líderes políticos africanos, con el fin de examinar la gobernanza de la movilidad humana.</p>
      <p>El programa se estructuró en torno a tres pilares clave:</p>
      <ul class="list-disc pl-5 space-y-2 mb-6 text-slate-700">
        <li>La evaluación europea tras la crisis migratoria de 2015 y la necesidad de una mejor coordinación entre los Estados;</li>
        <li>La perspectiva de Estados Unidos sobre el cambio de prioridades y los marcos regulatorios;</li>
        <li>Las dinámicas regionales en el Sahel, el Cuerno de África y Oriente Medio, con un enfoque en soluciones que combinen seguridad, desarrollo e inversión.</li>
      </ul>
      <p>El objetivo común fue identificar respuestas prácticas y sostenibles para reducir la migración irregular, proteger a las personas y reforzar la estabilidad.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Primer día de debates – Comparación de los enfoques europeos</h3>
      <p>Los debates celebrados durante el primer día pusieron de relieve y compararon los distintos enfoques europeos. Se abordaron temas como la cooperación operativa, el apoyo a los Estados fronterizos, la lucha contra las redes de tráfico y la garantía de los retornos.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Segundo día de debates - Dinámicas regionales</h3>
      <p>El segundo día estuvo dedicado a las dinámicas regionales. La fragilidad estatal, la inseguridad, la corrupción y el desempleo juvenil se vincularon a expectativas no satisfechas. A continuación, se compartieron recomendaciones operativas para hacer frente a estos desafíos: programas de educación y formación profesional vinculados a empleos reales, apoyo a las start-ups y a las cadenas de valor agrícolas, proyectos de energías renovables que generen empleo local y mecanismos que involucren a las diásporas para movilizar inversión y mentoría.</p>
      <p>Nuestra directora ejecutiva, <b>Beatriz de León Cobo</b>, intervino sobre la región del Sahel como estudio de caso, subrayando que el único camino sostenible consiste en ofrecer opciones efectivas en el pueblo o país de origen, así como en los centros regionales donde las personas puedan formarse, emprender y trabajar.</p>
      <p>Asimismo, se recordó que muchos posibles candidatos a la migración irregular se enfrentan a obstáculos prácticos, ya que no tienen acceso a vías legales debido a barreras administrativas y a la falta de documentos básicos como el pasaporte. En este contexto, es esencial adaptar los programas de migración regular a las realidades de las personas y reforzar la preparación europea mediante la cooperación operativa y el intercambio de información.</p>
    `,
    content_en: `
      <p>Szeged (Hungary), 24-25 September – The MCC/MRI conference brought together policymakers, researchers, and representatives of European and American organizations, as well as African political leaders, to examine the governance of human mobility.</p>
      <p>The program was structured around three key pillars:</p>
      <ul class="list-disc pl-5 space-y-2 mb-6 text-slate-700">
        <li>The European assessment following the 2015 migration crisis and the need for improved coordination among states;</li>
        <li>The U.S. perspective on shifting priorities and regulatory frameworks;</li>
        <li>Regional dynamics in the Sahel, the Horn of Africa, and the Middle East, with a focus on solutions combining security, development, and investment.</li>
      </ul>
      <p>The shared objective was to identify practical and sustainable responses to reduce irregular migration, protect individuals, and strengthen stability.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">First Day of Discussions – Comparison of European Approaches</h3>
      <p>The discussions held on the first day highlighted and compared the different European approaches. Topics such as operational cooperation, support for border states, the fight against trafficking networks, and guaranteed returns were addressed.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Second Day of Discussions – Regional Dynamics</h3>
      <p>The second day was dedicated to regional dynamics. State fragility, insecurity, corruption, and youth unemployment were linked to unmet expectations. Operational recommendations were then shared to address these challenges: vocational education and training programs connected to real jobs, support for start-ups and agricultural value chains, renewable energy projects generating local employment, and mechanisms involving diasporas to mobilize investment and mentorship.</p>
      <p>Our executive director, <b>Beatriz de León Cobo</b>, spoke about the Sahel region as a case study, emphasizing that the only sustainable path is to offer effective options in the village or country of origin, as well as in regional hubs where people can train, start businesses, and work.</p>
      <p>It was also recalled that many potential candidates for irregular migration face practical obstacles, as they do not have access to legal pathways due to administrative barriers and the lack of basic documents such as a passport. In this context, it is essential to adapt regular migration programs to the realities of individuals and to strengthen European preparedness through operational cooperation and information sharing.</p>
    `,
    agenda: [],
    speakers: [
      { name: "Viktor Mársai", role: "Migration Research Institute (Anfitrión)", role_en: "Migration Research Institute (Host)" },
      { name: "Beatriz de León", role: "Directora Ejecutiva IEAM", role_en: "Executive Director IEAM" },
      { name: "Balázs Orbán", role: "Director Político PM Hungría" },
      { name: "Rocío de Meer", role: "Congreso de los Diputados (España)" }
    ]
  },
  {
    slug: "workshop-dakar-2025",
    title: "Políticas regionales, personas desplazadas y migrantes",
    title_en: "Regional Policies, Displaced Persons and Migrants",
    subtitle: "Taller de inteligencia colectiva (Senegal-Malí-Mauritania ↔ Europa).",
    subtitle_en: "Collective intelligence workshop (Senegal-Mali-Mauritania ↔ Europe).",
    category: "Taller",
    category_en: "Workshop",
    date: "23 Sep 2025",
    location: "Dakar, Senegal",
    location_en: "Dakar, Senegal",
    format: "Chatham House",
    format_en: "Chatham House",
    heroImage: "/images/workshop-es-dakar.jpg",
    heroImage_en: "/images/workshop-en-dakar.jpg",
    summary: "Taller de inteligencia colectiva en Dakar para diagnosticar dinámicas de movilidad en el eje Senegal-Malí-Mauritania-Europa y formular recomendaciones.",
    summary_en: "Collective intelligence workshop in Dakar to diagnose mobility dynamics in the Senegal-Mali-Mauritania-Europe axis and formulate recommendations.",
    content: `
      <p>El 23 de septiembre, la ciudad de Dakar (Senegal) acogió el taller de inteligencia colectiva “Políticas regionales, personas desplazadas y migrantes (Senegal-Mali-Mauritania ↔ Europa)”. La reunión a puerta cerrada, que tuvo una duración de dos horas, reunió a un pequeño grupo de actores estratégicos – investigadores, representantes institucionales, agencias internacionales, organizaciones de la sociedad civil, grupos humanitarios y miembros de la diáspora – con el objetivo de generar un espacio de reflexión y co-construcción.</p>
      <p>La iniciativa tuvo como objetivo elaborar un diagnóstico actualizado de las dinámicas de movilidad a lo largo del eje Senegal-Mali-Mauritania–Europa, identificar los principales factores de riesgo y formular recomendaciones operativas dirigidas a organizaciones no gubernamentales, organismos internacionales, autoridades locales y nacionales, así como a los socios europeos más directamente involucrados, incluyendo la Unión Europea y España.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Contexto</h3>
      <p>La ruta atlántica de África Occidental ha recuperado una posición central en los flujos migratorios hacia la Unión Europea en los últimos años, con un aumento sostenido de las llegadas a las Islas Canarias desde 2023–2024 y una mayor diversificación de los perfiles migratorios, incluyendo jóvenes, mujeres, niños y nuevos países de origen. Las costas de Senegal y Mauritania representan actualmente una gran parte de las salidas, mientras que la población maliense constituye uno de los grupos más representados.</p>
      <p>Estos procesos están condicionados por transformaciones regionales vinculadas a los reajustes de seguridad en el Sahel, la recomposición de los marcos de integración y los acuerdos operativos bilaterales. Estos factores afectan directamente la libertad de movimiento intrarregional, las economías locales y la dinámica de las redes de tráfico.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Contenidos y Resultados</h3>
      <p>El taller abordó aspectos prioritarios como la situación de las personas desplazadas internas y los refugiados, los efectos de la reestructuración regional sobre la movilidad y la protección, las prácticas de cooperación entre Estados y los elementos que favorecen una movilidad ordenada y segura.</p>
      <p>Como resultado, se elaboró un documento de política, reuniendo conclusiones y propuestas concretas diferenciadas según el tipo de actor: autoridades nacionales y locales, organizaciones internacionales, ONG, la Unión Europea, España, el sector privado, las diásporas y las comunidades locales.</p>
      <p>La reunión se celebró bajo la Regla de Chatham House, garantizando un marco de intercambio seguro y constructivo que permitió avanzar en recomendaciones compartidas.</p>
    `,
    content_en: `
      <p>On September 23, the city of Dakar (Senegal) hosted the collective intelligence workshop “Regional Policies, Displaced Persons and Migrants (Senegal-Mali-Mauritania ↔ Europe)”. The closed-door meeting, which lasted two hours, brought together a small group of strategic actors – researchers, institutional representatives, international agencies, civil society organizations, humanitarian groups, and members of the diaspora – to create a space for reflection and co-construction.</p>
      <p>The initiative aimed to develop an updated diagnosis of mobility dynamics along the Senegal-Mali-Mauritania–Europe axis, identify key risk factors, and formulate operational recommendations for non-governmental organizations, international bodies, local and national authorities, as well as the most directly involved European partners, including the European Union and Spain.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Context</h3>
      <p>The West African Atlantic route has regained a central position in migratory flows towards the European Union in recent years, with a sustained increase in arrivals to the Canary Islands since 2023–2024 and greater diversification of migratory profiles, including youth, women, children, and new countries of origin. The coasts of Senegal and Mauritania currently account for a large portion of departures, while the Malian population constitutes one of the most represented groups.</p>
      <p>These processes are shaped by regional transformations linked to security realignments in the Sahel, the recomposition of integration frameworks, and bilateral operational agreements. These factors directly affect intra-regional freedom of movement, local economies, and the dynamics of trafficking networks.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Contents and Results</h3>
      <p>The workshop addressed priority aspects such as the situation of internally displaced persons and refugees, the effects of regional restructuring on mobility and protection, cooperation practices between States, and elements that favor orderly and safe mobility.</p>
      <p>As a result, a policy paper was produced, gathering conclusions and concrete proposals differentiated by type of actor: national and local authorities, international organizations, NGOs, the European Union, Spain, the private sector, diasporas, and local communities.</p>
      <p>The meeting was held under the Chatham House Rule, guaranteeing a safe and constructive exchange framework that allowed for progress on shared recommendations.</p>
    `,
    agenda: [],
    speakers: []
  },
  {
    slug: "taller-bamako-2025",
    title: "Taller de Inteligencia Colectiva en Bamako",
    title_en: "Collective Intelligence Workshop in Bamako",
    subtitle: "Movilidad legal, reintegración comunitaria y gobernanza en Malí.",
    subtitle_en: "Legal mobility, community reintegration, and governance in Mali.",
    category: "Taller",
    category_en: "Workshop",
    date: "19 Sep 2025",
    location: "Bamako, Malí",
    location_en: "Bamako, Mali",
    format: "Chatham House",
    format_en: "Chatham House",
    heroImage: "/images/workshop-es-bamako.jpg",
    heroImage_en: "/images/workshop-en-bamako.jpg",
    summary: "El Instituto Español de Análisis Migratorio (IEAM) celebró un taller de inteligencia colectiva centrado en la movilidad legal, la reintegración comunitaria y la gobernanza de las rutas migratorias en Malí.",
    summary_en: "The Spanish Institute for Migration Analysis (IEAM) held a collective intelligence workshop focusing on legal mobility, community reintegration, and the governance of migration routes in Mali.",
    content: `
      <p>Bamako (Malí), 19 de septiembre de 2025 – El Instituto Español de Análisis Migratorio (IEAM) celebró un taller de inteligencia colectiva centrado en la movilidad legal, la reintegración comunitaria y la gobernanza de las rutas migratorias en Malí.</p>
      <p>La reunión, que se llevó a cabo en la capital maliense de 10:00 a 12:30, reunió a un pequeño grupo de expertos, autoridades y representantes de la sociedad civil bajo la Regla de Chatham House, garantizando la confidencialidad de las intervenciones y fomentando un debate abierto.</p>
      <p>El objetivo fue co-construir un diagnóstico compartido sobre las dinámicas de movilidad en Malí y definir recomendaciones prácticas para los horizontes de seis y doce meses, dirigidas a autoridades locales y nacionales, socios internacionales, ONG y actores económicos.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Tres ejes de trabajo</h3>
      <p>El taller se estructuró en torno a tres líneas de debate:</p>
      <ul class="list-disc pl-5 space-y-2 mb-6">
        <li><b>Movilidad legal y circular:</b> Los participantes analizaron los modelos existentes, los obstáculos, los proyectos piloto sectoriales, el papel de las diásporas y los mecanismos para el seguimiento de los “viajes de ida y vuelta”.</li>
        <li><b>Reintegración de jóvenes y retornados:</b> Se debatieron los umbrales de apoyo, los paquetes de servicios y modelos colectivos como cooperativas o proyectos agrícolas.</li>
        <li><b>Coordinación local y gestión regional:</b> Se examinaron alternativas a la migración irregular, opciones económicas, estrategias específicas y la gestión de retornos en la subregión.</li>
      </ul>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Resultados</h3>
      <p>Como producto final, se elaboró un documento de política de 10 a 12 páginas, que contenía recomendaciones diferenciadas para gobiernos, organizaciones internacionales, sociedad civil, sector privado y diásporas.</p>
      <p>El IEAM invitó a investigadores, funcionarios ministeriales, agencias internacionales y líderes comunitarios a aportar datos y experiencias de campo, garantizando que las directrices fueran realistas y aplicables.</p>
    `,
    content_en: `
      <p>Bamako (Mali), September 19, 2025 – The Spanish Institute for Migration Analysis (IEAM) held a collective intelligence workshop focusing on legal mobility, community reintegration, and the governance of migration routes in Mali.</p>
      <p>The meeting, which took place in the Malian capital from 10:00 to 12:30, gathered a small group of experts, authorities, and civil society representatives under the Chatham House Rule, ensuring the confidentiality of interventions and fostering open debate.</p>
      <p>The objective was to co-construct a shared diagnosis of mobility dynamics in Mali and to define practical recommendations for the six- and twelve-month horizons, directed at local and national authorities, international partners, NGOs, and economic actors.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Three Work Axes</h3>
      <p>The workshop was structured around three lines of debate:</p>
      <ul class="list-disc pl-5 space-y-2 mb-6">
        <li><b>Legal and Circular Mobility:</b> Participants analyzed existing models, obstacles, sectoral pilots, the role of diasporas, and mechanisms for tracking “round trips.”</li>
        <li><b>Reintegration of Youth and Returnees:</b> Discussions addressed support thresholds, service packages, and collective models such as cooperatives or agricultural projects.</li>
        <li><b>Local Coordination and Regional Management:</b> Alternatives to irregular migration, economic options, targeted strategies, and return management in the sub-region were examined.</li>
      </ul>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Outcome</h3>
      <p>As a final product, a 10- to 12-page policy paper was produced, containing differentiated recommendations for governments, international organizations, civil society, the private sector, and diasporas.</p>
      <p>IEAM invited researchers, ministerial officials, international agencies, and community leaders to contribute data and field experiences, ensuring that the guidelines were realistic and applicable.</p>
    `,
    agenda: [],
    speakers: []
  },
  {
    slug: "dialogo-mediterraneo-rabat",
    title: "Foro de Diálogo Mediterráneo 2025",
    title_en: "Mediterranean Dialogue Forum 2025",
    subtitle: "Desafíos y respuestas desde la perspectiva norteafricana.",
    subtitle_en: "Challenges and responses from the North African perspective.",
    category: "Foro",
    category_en: "Forum",
    date: "Jan 2025",
    location: "Rabat Business School, UIR",
    location_en: "Rabat Business School, UIR",
    format: "Presencial",
    format_en: "In-person",
    heroImage: "/images/mdmarruecoses.jpg",
    heroImage_en: "/images/mdmarruecosen.jpg",
    summary: "El Foro de Diálogo Mediterráneo 2025 inauguró el año en Rabat con un encuentro de alto nivel centrado en la migración irregular.",
    summary_en: "The Mediterranean Dialogue Forum 2025 opened the year in Rabat with a high-level gathering focused on irregular migration.",
    content: `
      <p>El Foro de Diálogo Mediterráneo 2025 inauguró el año en Rabat con un encuentro de alto nivel centrado en uno de los desafíos más urgentes para el norte de África y el Mediterráneo en general: la migración irregular. Celebrado en la Rabat Business School de la Universidad Internacional de Rabat (UIR), el foro reunió a expertos internacionales, responsables políticos, académicos y actores de la sociedad civil, reforzando el papel de Rabat como un centro emergente para el diálogo estratégico sobre la gobernanza mediterránea.</p>
      
      <p>Organizado por Diálogo Mediterráneo en colaboración con EDEN Maroc y AMSED, el foro atrajo una fuerte participación desde temprano, llenando el recinto con especialistas deseosos de explorar las complejidades de la migración en la región.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Panel 1 – Comprendiendo los impulsores y el impacto de la migración irregular en Marruecos en el contexto mediterráneo</h3>
      <p>El panel de apertura ofreció una visión integral de los factores que impulsan la migración irregular y sus implicaciones más amplias para Marruecos y la cuenca mediterránea.</p>
      <p><b>Ponentes destacados:</b></p>
      <ul class="list-disc pl-5 space-y-2 mb-6">
      <li><b>Sra. Salma Agnaou (ACNUR)</b>, quien enfatizó el perfil cambiante de los flujos migratorios mixtos y la necesidad de respuestas humanitarias adaptables.</li>
      <li><b>Sr. Mohamed El Ouali Alami (AMSED)</b>, quien analizó las dimensiones sociopolíticas de la movilidad juvenil y las vulnerabilidades subyacentes.</li>
      <li><b>Sra. Maftatha Benchlikha (OIM – ONU Migración)</b>, quien presentó datos actualizados sobre rutas, riesgos y dinámicas cambiantes en el Sahel y el Magreb.</li>
      <li><b>Sr. Abderrahman Benyaha (Droits et Justice)</b>, quien destacó los desafíos legales clave y las brechas en el acceso a derechos para los migrantes.</li>
      <li><b>Sr. Abdeslam Sbatri (Organisation des Jeunes Africains)</b>, quien ofreció una perspectiva generacional sobre las aspiraciones, la influencia digital y las motivaciones que impulsan a los jóvenes migrantes.</li>
      </ul>
      
      <img src="/images/rabat2.jpg" alt="Panel de expertos en Rabat" class="w-full h-auto rounded-lg my-8 shadow-md" />

      <p>El panel subrayó que Marruecos es simultáneamente un país de origen, tránsito y destino, lo que requiere políticas coordinadas que integren factores económicos, climáticos, sociales y de seguridad.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Panel 2 – Respuestas políticas y cooperación regional para abordar la migración irregular en Marruecos y el Mediterráneo</h3>
      <p>El segundo panel se centró en la gobernanza, el diseño de políticas y la cooperación regional, marcado por recomendaciones prácticas y análisis basados en evidencia.</p>
      <p><b>Ponentes destacados:</b></p>
      <ul class="list-disc pl-5 space-y-2 mb-6">
      <li><b>Sr. Ivan Martin (Policy Center for the New South)</b>, quien abogó por políticas migratorias basadas en datos y evaluaciones de impacto a largo plazo.</li>
      <li><b>Sra. Aurélie Eragne (Consejo Nacional de Derechos Humanos – CNDH)</b>, quien describió el progreso institucional de Marruecos y los desafíos de protección restantes.</li>
      <li><b>Dr. Norman Sempija (Universidad Politécnica Mohammed VI)</b>, quien enfatizó la necesidad de una arquitectura de cooperación mediterránea coherente.</li>
      <li><b>Sra. Alicia Tintelín (Hijra Legal Clinic Marruecos)</b>, quien presentó estudios de caso que ilustran los obstáculos para la justicia y la integración a nivel local.</li>
      </ul>
      <p>Surgió una conclusión central: una gobernanza migratoria efectiva debe equilibrar la seguridad, los derechos, el desarrollo y la diplomacia. Los ponentes coincidieron en que Marruecos ocupa una posición fundamental para ayudar a dar forma a un marco renovado de cooperación mediterránea.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Presentación de la Nota de País sobre Migración Irregular en Marruecos</h3>
      <p>El foro también contó con la presentación de una Nota de País actualizada que resume las tendencias clave, vulnerabilidades y recomendaciones de políticas. El documento fue bien recibido como un recurso valioso para investigadores y tomadores de decisiones que trabajan en la gobernanza migratoria.</p>

      <img src="/images/rabat3.jpg" alt="Participantes en el foro de Rabat" class="w-full h-auto rounded-lg my-8 shadow-md" />

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Observaciones finales y perspectivas</h3>
      <p>El Foro de Diálogo Mediterráneo 2025 concluyó con un mensaje claro: abordar la migración irregular requiere un diálogo sostenido, una investigación rigurosa y asociaciones regionales más fuertes. El foro posicionó con éxito a Marruecos —y a Rabat en particular— como una plataforma central para la reflexión política mediterránea.</p>
      <p>La jornada finalizó con debates informales y networking entre los participantes, abriendo la puerta a futuras colaboraciones en toda la región.</p>
      
      <div class="mt-12 p-8 bg-[var(--color-paper-warm)] border border-[var(--color-navy-900)]/10 text-center rounded-lg">
        <h3 class="text-2xl font-serif font-bold text-[var(--color-navy-900)] mb-4">¿Quieres saber más?</h3>
        <p class="text-slate-700 mb-6 max-w-2xl mx-auto">Descubre más sobre nuestras iniciativas y únete a la conversación en la plataforma oficial del Diálogo Mediterráneo.</p>
        <a href="https://mediterraneandialogue.org/" target="_blank" rel="noopener noreferrer" class="inline-block px-8 py-3 bg-[var(--color-navy-900)] text-white font-bold uppercase tracking-wider hover:bg-[var(--color-accent-blue)] transition-colors">
          Ir a Diálogo Mediterráneo
        </a>
      </div>
    `,
    content_en: `
      <p>The Mediterranean Dialogue Forum 2025 opened the year in Rabat with a high-level gathering focused on one of the most pressing challenges for North Africa and the wider Mediterranean: irregular migration. Held at the Rabat Business School of the International University of Rabat (UIR), the forum brought together international experts, policymakers, academics, and civil-society actors, reinforcing Rabat’s role as an emerging hub for strategic dialogue on Mediterranean governance.</p>
      
      <p>Organised by Mediterranean Dialogue in partnership with EDEN Maroc and AMSED, the forum attracted strong participation from early in the morning, filling the venue with specialists eager to explore the complexities of migration in the region.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Panel 1 – Understanding the Drivers and Impact of Irregular Migration in Morocco within the Mediterranean Context</h3>
      <p>The opening panel provided a comprehensive overview of the factors pushing irregular migration and its broader implications for Morocco and the Mediterranean basin.</p>
      <p><b>Speakers included:</b></p>
      <ul class="list-disc pl-5 space-y-2 mb-6">
      <li><b>Ms. Salma Agnaou (UNHCR)</b>, who emphasized the evolving profile of mixed migration flows and the need for adaptable humanitarian responses.</li>
      <li><b>Mr. Mohamed El Ouali Alami (AMSED)</b>, who analysed the sociopolitical dimensions of youth mobility and underlying vulnerabilities.</li>
      <li><b>Ms. Maftatha Benchlikha (IOM – UN Migration)</b>, who presented updated data on routes, risks, and shifting dynamics across the Sahel and Maghreb.</li>
      <li><b>Mr. Abderrahman Benyaha (Droits et Justice)</b>, who highlighted key legal challenges and gaps in access to rights for migrants.</li>
      <li><b>Mr. Abdeslam Sbatri (Organisation des Jeunes Africains)</b>, who offered a generational perspective on aspirations, digital influence, and the motivations driving young migrants.</li>
      </ul>

      <img src="/images/rabat2.jpg" alt="Expert panel in Rabat" class="w-full h-auto rounded-lg my-8 shadow-md" />

      <p>The panel underscored that Morocco is simultaneously a country of origin, transit, and destination, necessitating coordinated policies that integrate economic, climatic, social, and security-related factors.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Panel 2 – Policy Responses and Regional Cooperation to Address Irregular Migration in Morocco and the Mediterranean</h3>
      <p>The second panel shifted towards governance, policy design, and regional cooperation. It was marked by practical recommendations and evidence-based analysis.</p>
      <p><b>Speakers included:</b></p>
      <ul class="list-disc pl-5 space-y-2 mb-6">
      <li><b>Mr. Ivan Martin (Policy Center for the New South)</b>, who advocated for migration policies rooted in data and long-term impact assessments.</li>
      <li><b>Ms. Aurélie Eragne (National Human Rights Council – CNDH)</b>, who outlined Morocco’s institutional progress and remaining protection challenges.</li>
      <li><b>Dr. Norman Sempija (Mohammed VI Polytechnic University)</b>, who stressed the need for a coherent Mediterranean architecture of cooperation.</li>
      <li><b>Ms. Alicia Tintelín (Hijra Legal Clinic Morocco)</b>, who presented case studies illustrating obstacles to justice and integration at the local level.</li>
      </ul>
      <p>A central conclusion emerged: effective migration governance must balance security, rights, development, and diplomacy. Speakers agreed that Morocco occupies a pivotal position to help shape a renewed Mediterranean cooperation framework.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Presentation of the Country Note on Irregular Migration in Morocco</h3>
      <p>The forum also featured the presentation of an updated Country Note summarising key trends, vulnerabilities, and policy recommendations. The document was well received as a valuable resource for researchers and decision-makers working on migration governance.</p>

      <img src="/images/rabat3.jpg" alt="Participants at the Rabat forum" class="w-full h-auto rounded-lg my-8 shadow-md" />

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Closing Remarks & Outlook</h3>
      <p>The Mediterranean Dialogue Forum 2025 concluded with a clear message: addressing irregular migration requires sustained dialogue, rigorous research, and stronger regional partnerships. The forum successfully positioned Morocco—and Rabat in particular—as a central platform for Mediterranean policy reflection.</p>
      <p>The day ended with informal discussions and networking among participants, opening the door to future collaborations across the region.</p>

      <div class="mt-12 p-8 bg-[var(--color-paper-warm)] border border-[var(--color-navy-900)]/10 text-center rounded-lg">
        <h3 class="text-2xl font-serif font-bold text-[var(--color-navy-900)] mb-4">Want to know more?</h3>
        <p class="text-slate-700 mb-6 max-w-2xl mx-auto">Discover more about our initiatives and join the conversation on the official Mediterranean Dialogue platform.</p>
        <a href="https://mediterraneandialogue.org/" target="_blank" rel="noopener noreferrer" class="inline-block px-8 py-3 bg-[var(--color-navy-900)] text-white font-bold uppercase tracking-wider hover:bg-[var(--color-accent-blue)] transition-colors">
          Go to Mediterranean Dialogue
        </a>
      </div>
    `,
    agenda: [],
    speakers: [
      { name: "Salma Agnaou", role: "ACNUR / UNHCR" },
      { name: "Mohamed El Ouali Alami", role: "AMSED" },
      { name: "Maftatha Benchlikha", role: "OIM / IOM" },
      { name: "Ivan Martin", role: "Policy Center for the New South" }
    ]
  },
  {
    slug: "foro-bruselas-2024",
    title: "Foro de Diálogo Mediterráneo 2024",
    title_en: "Mediterranean Dialogue Forum 2024",
    subtitle: "Un debate en tres etapas sobre la migración informal entre Madrid y Bruselas.",
    subtitle_en: "A Three-Stage Debate on Informal Migration Across Madrid and Brussels.",
    category: "Foro",
    category_en: "Forum",
    date: "20 Sep 2024",
    location: "Madrid & Bruselas",
    location_en: "Madrid & Brussels",
    format: "Presencial",
    format_en: "In-person",
    heroImage: "/images/mdbruselases.jpg",
    heroImage_en: "/images/mdbruselasen.jpg",
    summary: "El Foro de Diálogo Mediterráneo 2024 se desarrolló a lo largo de dos días entre Madrid y Bruselas, reuniendo a responsables políticos, investigadores y líderes de la sociedad civil.",
    summary_en: "The Mediterranean Dialogue Forum 2024 unfolded over two days between Madrid and Brussels, bringing together policymakers, researchers, and civil-society leaders.",
    content: `
      <p>El Foro de Diálogo Mediterráneo 2024 se desarrolló a lo largo de dos días entre Madrid y Bruselas, reuniendo a responsables políticos, investigadores y líderes de la sociedad civil para analizar el panorama cambiante de la migración informal en el Mediterráneo. Con sesiones celebradas en el Parlamento Europeo tanto en España como en Bélgica, el Foro fomentó un espacio inusual de intercambio entre grupos políticos y entre las dos orillas de la cuenca mediterránea.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Sesión en Madrid</h3>
      
      <img src="/images/bruselas1.jpg" alt="Sesión Madrid" class="w-full h-auto rounded-lg my-8 shadow-md" />

      <p>El Foro se inauguró en la Oficina del Parlamento Europeo en España, en Madrid, con palabras de bienvenida que subrayaron la urgencia de abordar la migración informal como un desafío estructural a largo plazo, en lugar de una crisis cíclica.</p>
      <p>Un discurso principal a cargo de la <b>Dra. Amparo González Ferrer</b>, Científica Titular del Consejo Superior de Investigaciones Científicas (CSIC), marcó el tono analítico, describiendo las tendencias demográficas, las demandas laborales y las redes informales que configuran la movilidad en la región.</p>

      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Perspectivas del Sur de Europa</h4>
      <p>El primer panel exploró las experiencias de España, Italia y Portugal en la gestión de entradas irregulares, las presiones sobre los servicios públicos y la fragmentación de la gobernanza de la UE. Los ponentes incluyeron a <b>Irune Ariño</b>, <b>Karina Kozhakhmet</b> y <b>Gonçalo Torres</b>, bajo la moderación de <b>Mark Vargha</b>, del Migration Research Institute con sede en Budapest.</p>

      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Realidades del Norte de África y Levante</h4>
      <p>El segundo panel se centró en las perspectivas de los países de origen y tránsito, con la participación de:</p>
      <ul class="list-disc pl-5 space-y-1 mb-4">
        <li><b>Loubna El Hassouni</b> (Marruecos)</li>
        <li><b>Dr. Mohamed Wounouki</b> (Argelia)</li>
        <li><b>Malak Darwish</b> (Líbano)</li>
      </ul>
      <p>Moderada por <b>Tasnim Idriss</b>, la conversación destacó las presiones económicas, las rutas de tráfico, los desafíos de gobernanza y las limitadas herramientas políticas disponibles para los vecinos del sur de la UE.</p>

      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Cooperación, Desarrollo y Gobernanza Migratoria</h4>
      <p>Una sesión final en Madrid reunió a profesionales de los sectores de desarrollo y humanitario para evaluar los vínculos entre los instrumentos de cooperación y los resultados migratorios. La sesión se cerró con reflexiones sobre la necesidad de marcos compartidos a largo plazo entre Europa y África.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Sesión en Bruselas</h3>

      <img src="/images/bruselas2.jpeg" alt="Sesión Bruselas" class="w-full h-auto rounded-lg my-8 shadow-md" />
      
      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Sesión de Mañana – A cargo del Eurodiputado López Aguilar (Grupo S&D)</h4>
      <p>El programa de Bruselas comenzó por la mañana con palabras de apertura del eurodiputado <b>Juan Fernando López Aguilar</b>, una de las voces más influyentes del Parlamento en justicia y asuntos de interior. Subrayó la necesidad de una acción coordinada de la UE, equilibrada entre las obligaciones humanitarias y la gobernanza fronteriza.</p>
      <p>El panel contó con los principales expertos del Foro en el Mediterráneo: <b>Loubna El Hassouni</b> (Marruecos), <b>Dr. Mohamed Wounouki</b> (Argelia), <b>Malak Darwish</b> (Líbano), <b>Gonçalo Torres</b> (Portugal) y <b>Karina Kozhakhmet</b> (Italia). Sus contribuciones ofrecieron una visión transmediterránea de la migración informal, abordando los cambios demográficos, las dinámicas de seguridad y las presiones políticas sentidas en ambas orillas. La eurodiputada <b>Cecilia Strada</b> pronunció las palabras de clausura, advirtiendo que la migración irregular no puede tratarse únicamente como un problema de seguridad e instando a un compromiso más profundo de la UE en las regiones vecinas.</p>

      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Sesión de Tarde – A cargo del Eurodiputado Nicola Procaccini (Grupo ECR)</h4>
      <p>Por la tarde, la atención se centró en una perspectiva centrada en la seguridad bajo el patrocinio del eurodiputado <b>Nicola Procaccini</b>, copresidente del Grupo ECR. Procaccini destacó la importancia de restaurar la capacidad de control fronterizo europeo, combatir las redes de tráfico de personas y desarrollar herramientas políticas impulsadas por la soberanía.</p>
      <p>Los mismos panelistas del Diálogo Mediterráneo presentaron ideas actualizadas adaptadas a una audiencia parlamentaria más orientada a la seguridad. Las discusiones se centraron en la geopolítica de las rutas de tránsito, el auge de los intermediarios criminales y las vulnerabilidades de los estados europeos y norteafricanos.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Cena de Fortalecimiento de Alianzas – Organizada por New Direction Foundation</h3>
      <p>La jornada concluyó con una cena de creación de coaliciones organizada por la New Direction Foundation, reuniendo a parlamentarios, expertos y representantes de organizaciones asociadas. La cena proporcionó un entorno confidencial para conversaciones estratégicas sobre la cooperación a largo plazo entre socios europeos y mediterráneos, explorando iniciativas de investigación conjuntas, coordinación parlamentaria y futuras ediciones del Foro de Diálogo Mediterráneo.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Una conversación entre partidos y orillas</h3>
      <p>El Foro de Diálogo Mediterráneo 2024 logró reunir a dos importantes grupos políticos del Parlamento Europeo —S&D y ECR— junto con expertos de Marruecos, Argelia, Líbano, Portugal e Italia. La participación activa de los eurodiputados López Aguilar, Cecilia Strada y Nicola Procaccini otorgó al Foro un peso institucional significativo.</p>
      <p>A pesar de las diferencias ideológicas, surgió un mensaje compartido: el Mediterráneo requiere una cooperación sostenida, pensamiento a largo plazo y una comprensión más integrada de los impulsores detrás de la migración informal.</p>
      
      <img src="/images/bruselas3.jpeg" alt="Participantes Foro Bruselas" class="w-full h-auto rounded-lg my-8 shadow-md" />

      <div class="mt-12 p-8 bg-[var(--color-paper-warm)] border border-[var(--color-navy-900)]/10 text-center rounded-lg">
        <h3 class="text-2xl font-serif font-bold text-[var(--color-navy-900)] mb-4">¿Quieres saber más?</h3>
        <p class="text-slate-700 mb-6 max-w-2xl mx-auto">Descubre más sobre nuestras iniciativas y únete a la conversación en la plataforma oficial del Diálogo Mediterráneo.</p>
        <a href="https://mediterraneandialogue.org/" target="_blank" rel="noopener noreferrer" class="inline-block px-8 py-3 bg-[var(--color-navy-900)] text-white font-bold uppercase tracking-wider hover:bg-[var(--color-accent-blue)] transition-colors">
          Ir a Diálogo Mediterráneo
        </a>
      </div>
    `,
    content_en: `
      <p>The Mediterranean Dialogue Forum 2024 unfolded over two days between Madrid and Brussels, bringing together policymakers, researchers, and civil-society leaders to analyse the evolving landscape of informal migration in the Mediterranean. With sessions hosted at the European Parliament in both Spain and Belgium, the Forum fostered an uncommon space for exchange across political groups and across the two shores of the Mediterranean basin.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Madrid Session</h3>

      <img src="/images/bruselas1.jpg" alt="Madrid Session" class="w-full h-auto rounded-lg my-8 shadow-md" />

      <p>The Forum opened at the European Parliament’s Spain Office in Madrid with welcoming remarks that underlined the urgency of addressing informal migration as a long-term structural challenge, rather than a cyclical crisis.</p>
      <p>A keynote by <b>Dr Amparo González Ferrer</b>, Senior Scientist at the Spanish National Research Council (CSIC), set the analytical tone, outlining demographic trends, labour demands, and the informal networks shaping mobility across the region.</p>

      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Southern European Perspectives</h4>
      <p>The first panel explored the experiences of Spain, Italy, and Portugal in managing irregular entries, pressures on public services, and the fragmentation of EU governance. Speakers included <b>Irune Ariño</b>, <b>Karina Kozhakhmet</b>, and <b>Gonçalo Torres</b>, under the moderation of <b>Mark Vargha</b>, from the Budapest-based Migration Research Institute.</p>

      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">North African & Levantine Realities</h4>
      <p>The second panel turned to perspectives from origin and transit countries, featuring:</p>
      <ul class="list-disc pl-5 space-y-1 mb-4">
        <li><b>Loubna El Hassouni</b> (Morocco)</li>
        <li><b>Dr Mohamed Wounouki</b> (Algeria)</li>
        <li><b>Malak Darwish</b> (Lebanon)</li>
      </ul>
      <p>Moderated by <b>Tasnim Idriss</b>, the conversation highlighted economic pressures, smuggling routes, governance challenges, and the limited policy tools available to Southern neighbours of the EU.</p>

      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Cooperation, Development, and Migration Governance</h4>
      <p>A final Madrid session gathered practitioners from development and humanitarian sectors to assess the links between cooperation instruments and migration outcomes. The session closed with reflections on the need for long-term, shared frameworks between Europe and Africa.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Brussels Session</h3>
      
      <img src="/images/bruselas2.jpeg" alt="Brussels Session" class="w-full h-auto rounded-lg my-8 shadow-md" />

      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Morning Session – Hosted by MEP López Aguilar (S&D Group)</h4>
      <p>The Brussels programme began in the morning with opening remarks from MEP <b>Juan Fernando López Aguilar</b>, one of the Parliament’s most influential voices on justice and home affairs. He underscored the need for coordinated EU action, balanced between humanitarian obligations and border governance.</p>
      <p>The panel featured the Forum’s main Mediterranean experts: <b>Loubna El Hassouni</b> (Morocco), <b>Dr Mohamed Wounouki</b> (Algeria), <b>Malak Darwish</b> (Lebanon), <b>Gonçalo Torres</b> (Portugal), and <b>Karina Kozhakhmet</b> (Italy). Their contributions offered a cross-Mediterranean view of informal migration, touching on demographic shifts, security dynamics, and the political pressures felt on both shores. MEP <b>Cecilia Strada</b> delivered closing remarks, warning that irregular migration cannot be treated solely as a security issue and urging deeper EU engagement in neighbouring regions.</p>

      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Afternoon Session – Hosted by MEP Nicola Procaccini (ECR Group)</h4>
      <p>In the afternoon, attention shifted to a security-centred perspective under the patronage of MEP <b>Nicola Procaccini</b>, Co-Chairman of the ECR Group. Procaccini stressed the importance of restoring European border control capacity, combating human-smuggling networks, and developing sovereignty-driven policy tools.</p>
      <p>The same Mediterranean Dialogue panelists—El Hassouni, Wounouki, Darwish, Torres, and Kozhakhmet—presented updated insights tailored to a more security-oriented parliamentary audience. Discussions centred on the geopolitics of transit routes, the rise of criminal intermediaries, and the vulnerabilities of both European and North African states.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Coalition-Building Dinner – Hosted by New Direction Foundation</h3>
      <p>The day concluded with a coalition-building dinner hosted by the New Direction Foundation, gathering parliamentarians, experts, and representatives from partner organisations. The dinner provided a confidential setting for strategic conversations on long-term cooperation between European and Mediterranean partners, exploring joint research initiatives, parliamentary coordination, and future editions of the Mediterranean Dialogue Forum.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">A Cross-Party, Cross-Shore Conversation</h3>
      <p>The Mediterranean Dialogue Forum 2024 succeeded in bringing together two major political groups of the European Parliament—S&D and ECR—alongside experts from Morocco, Algeria, Lebanon, Portugal, and Italy. The active involvement of MEP López Aguilar, MEP Cecilia Strada, and MEP Nicola Procaccini gave the Forum significant institutional weight.</p>
      <p>Despite ideological differences, a shared message emerged: the Mediterranean requires sustained cooperation, long-term thinking, and a more integrated understanding of the drivers behind informal migration.</p>

      <img src="/images/bruselas3.jpeg" alt="Brussels Forum Participants" class="w-full h-auto rounded-lg my-8 shadow-md" />

      <div class="mt-12 p-8 bg-[var(--color-paper-warm)] border border-[var(--color-navy-900)]/10 text-center rounded-lg">
        <h3 class="text-2xl font-serif font-bold text-[var(--color-navy-900)] mb-4">Want to know more?</h3>
        <p class="text-slate-700 mb-6 max-w-2xl mx-auto">Discover more about our initiatives and join the conversation on the official Mediterranean Dialogue platform.</p>
        <a href="https://mediterraneandialogue.org/" target="_blank" rel="noopener noreferrer" class="inline-block px-8 py-3 bg-[var(--color-navy-900)] text-white font-bold uppercase tracking-wider hover:bg-[var(--color-accent-blue)] transition-colors">
          Go to Mediterranean Dialogue
        </a>
      </div>
    `,
    agenda: [],
    speakers: [
      // Madrid Session
      { name: "Dr. Amparo González Ferrer", role: "CSIC", group: "Sesión en Madrid", group_en: "Madrid Session" },
      { name: "Irune Ariño", role: "", group: "Sesión en Madrid", group_en: "Madrid Session" },
      { name: "Karina Kozhakhmet", role: "", group: "Sesión en Madrid", group_en: "Madrid Session" },
      { name: "Gonçalo Torres", role: "", group: "Sesión en Madrid", group_en: "Madrid Session" },
      { name: "Mark Vargha", role: "Migration Research Institute", group: "Sesión en Madrid", group_en: "Madrid Session" },
      { name: "Loubna El Hassouni", role: "", group: "Sesión en Madrid", group_en: "Madrid Session" },
      { name: "Dr. Mohamed Wounouki", role: "", group: "Sesión en Madrid", group_en: "Madrid Session" },
      { name: "Malak Darwish", role: "", group: "Sesión en Madrid", group_en: "Madrid Session" },
      { name: "Tasnim Idriss", role: "Coordinadora del Norte de África", role_en: "North Africa Coordinator", group: "Sesión en Madrid", group_en: "Madrid Session" },
      // Brussels Session
      { name: "Juan Fernando López Aguilar", role: "MEP (S&D)", group: "Sesión en Bruselas", group_en: "Brussels Session" },
      { name: "Cecilia Strada", role: "MEP (S&D)", group: "Sesión en Bruselas", group_en: "Brussels Session" },
      { name: "Nicola Procaccini", role: "MEP (ECR)", group: "Sesión en Bruselas", group_en: "Brussels Session" },
      { name: "Loubna El Hassouni", role: "", group: "Sesión en Bruselas", group_en: "Brussels Session" },
      { name: "Dr. Mohamed Wounouki", role: "", group: "Sesión en Bruselas", group_en: "Brussels Session" },
      { name: "Malak Darwish", role: "", group: "Sesión en Bruselas", group_en: "Brussels Session" },
      { name: "Gonçalo Torres", role: "", group: "Sesión en Bruselas", group_en: "Brussels Session" },
      { name: "Karina Kozhakhmet", role: "", group: "Sesión en Bruselas", group_en: "Brussels Session" }
    ]

  },
  {
    slug: "jornada-canarias-sahel",
    title: "Jornada de análisis: El Sahel y su impacto en los flujos migratorios hacia Canarias",
    title_en: "Webinar: The Sahel and its impact on migratory flows to the Canary Islands",
    subtitle: "Análisis de las rutas atlánticas y la seguridad regional.",
    subtitle_en: "Analysis of Atlantic routes and regional security.",
    category: "Jornada",
    category_en: "Webinar",
    date: "03 Sep 2025",
    location: "Las Palmas, Canarias",
    location_en: "Las Palmas, Canary Islands",
    format: "Híbrido",
    format_en: "Hybrid",
    heroImage: "/images/event-es-sahel.jpg",
    heroImage_en: "/images/event-en-sahel.jpg",
    summary: "La iniciativa Innovación para la gestión migratoria (IRLab) organizó una sesión para analizar los movimientos geopolíticos en el Sahel y sus repercusiones para las Islas Canarias.",
    summary_en: "The Innovation for Migration Management initiative (IRLab) organized a session to examine geopolitical movements in the Sahel and their repercussions for the Canary Islands.",
    content: `
      <p>La iniciativa Innovación para la gestión migratoria (IRLab) organizó una sesión para analizar los movimientos geopolíticos en el Sahel y sus repercusiones para las Islas Canarias.</p>
      <p>El Gobierno de Canarias celebró, el miércoles 3 de septiembre, un webinar de análisis sobre la situación geopolítica en el Sahel y su impacto en los flujos migratorios hacia el archipiélago, abierto a todas las personas interesadas.</p>
      <p>La sesión contó con la intervención de la doctora Beatriz Mesa, experta en Ciencias Políticas; Beatriz de León Cobo, directora del Instituto Español de Análisis Migratorio (IEAM); y el periodista José Naranjo, quienes abordaron distintos aspectos de la coyuntura actual, desde el deterioro político y de seguridad en la región hasta el impacto en la salida de embarcaciones hacia Canarias. La sesión virtual fue presentada por Octavio Caraballo, viceconsejero del Gabinete del Presidente, y Claudia Pérez, coordinadora de Innovación para la Gestión Migratoria.</p>
      <p>El presidente de Canarias, Fernando Clavijo, había expresado en varias ocasiones su preocupación por la falta de respuesta de la Unión Europea (UE) ante la situación, que también afecta a los flujos migratorios, y reclamó políticas de cooperación para que los países de la región puedan alcanzar un desarrollo y una convivencia pacífica.</p>
      <p>La expansión de la violencia yihadista, los déficits estructurales en desarrollo económico y gobernanza, y las repercusiones del cambio climático generan una situación de inestabilidad cada vez más creciente, que puede afectar no solo a los países de esta zona del continente africano, sino también al entorno circundante.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Rutas y riesgos</h3>
      <p>De hecho, la reducción en la llegada de migrantes a las costas canarias en los últimos meses no significa que la migración haya cesado; más bien, los puntos de partida se están desplazando hacia el sur, hacia zonas menos vigiladas, lo que conlleva un mayor riesgo para los viajeros.</p>
      <p>El cierre de fronteras en Mauritania y Senegal ha obligado a las redes de tráfico a desplazarse hacia el sur y buscar puntos de salida en Guinea-Bisáu y Guinea-Conakry. De esta manera, esquivan los controles reforzados en África Occidental. La distancia entre Conakry y El Hierro supera los 2.200 kilómetros, unos 750 kilómetros más que desde Senegal o Gambia.</p>
      <p>A esto se suma la alta natalidad en los países de esta región. El 60 % de la población del Sahel tiene menos de 25 años y, según las proyecciones estadísticas, para 2050 habrán 500 millones de personas habitando estos países. Esta circunstancia requiere generar oportunidades para la población en sus respectivos países como alternativa a la emigración.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Conclusiones</h3>
      <p>La migración no ha cesado: las rutas se adaptan a los controles. Se requiere cooperación entre la UE y África, oportunidades en los países de origen y un seguimiento constante de las dinámicas regionales.</p>
    `,
    content_en: `
      <p>The Innovation for Migration Management initiative (IRLab) organized a session to examine geopolitical movements in the Sahel and their repercussions for the Canary Islands.</p>
      <p>The Government of the Canary Islands held, on Wednesday, September 3, a webinar analyzing the geopolitical situation in the Sahel and its impact on migration flows to the archipelago, which was open to all interested participants.</p>
      <p>The session featured interventions by Dr. Beatriz Mesa, Political Science expert; Beatriz de León Cobo, Director of the Spanish Institute for Migration Analysis (IEAM); and journalist José Naranjo, who addressed various aspects of the current situation, from political and security deterioration in the region to the impact on departures of boats toward the Canary Islands. The virtual session was presented by Octavio Caraballo, Deputy Counselor of the President’s Office, and Claudia Pérez, Coordinator of Innovation for Migration Management.</p>
      <p>The President of the Canary Islands, Fernando Clavijo, had repeatedly expressed his concern over the lack of response from the European Union (EU) to the situation, which also affects migratory flows, and called for cooperation policies to enable countries in the region to achieve development and peaceful coexistence.</p>
      <p>The expansion of jihadist violence, structural deficits in economic development and governance, and the repercussions of climate change create an increasingly unstable situation, which can affect not only the countries in this part of the African continent but also the surrounding region.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Routes and Risks</h3>
      <p>Indeed, the reduction in the arrival of migrants on the coasts of the Canary Islands in recent months does not mean that migration has ceased; rather, the points of departure are shifting southward, to less monitored areas, which entails greater risk for travelers.</p>
      <p>The closure of borders in Mauritania and Senegal has forced trafficking networks to move further south and seek departure points in Guinea-Bissau and Guinea-Conakry. In this way, they evade the reinforced controls in West Africa. The distance between Conakry and El Hierro exceeds 2,200 kilometers, about 750 kilometers more than from Senegal or Gambia.</p>
      <p>Added to this is the high birth rate in the countries of this region. 60% of the population of the Sahel is under 25 years old, and according to statistical projections, by 2050, 500 million people will inhabit these countries. This situation requires the creation of opportunities for the population in their respective countries as an alternative to emigration.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Conclusions</h3>
      <p>Migration has not ceased: routes adapt to controls. Cooperation between the EU and Africa, opportunities in countries of origin, and continuous monitoring of regional dynamics are required.</p>
    `,
    agenda: [],
    speakers: [
      {
        name: "Beatriz Mesa",
        role: "Doctora en Ciencias Políticas",
        role_en: "Political Science expert"
      },
      {
        name: "Beatriz de León Cobo",
        role: "Directora Ejecutiva IEAM",
        role_en: "Executive Director, IEAM"
      },
      {
        name: "José Naranjo",
        role: "Periodista",
        role_en: "Journalist"
      }
    ]
  },
  {
    slug: "conferencia-budapest-2026",
    title: "Conferencia: “Hacia horizontes más prometedores – y regreso: Una perspectiva global sobre la migración”",
    title_en: "Conference: “To Greener Pastures – and Back: A Global Outlook on Migration”",
    subtitle: "El enfoque bilateral español: resultados alentadores, viabilidad a largo plazo incierta y factores económicos.",
    subtitle_en: "The Spanish bilateral approach: encouraging results, long-term viability uncertain, and economic factors.",
    category: "Conferencia",
    category_en: "Conference",
    date: "24 Mar 2026",
    location: "Budapest, Hungría",
    location_en: "Budapest, Hungary",
    format: "Presencial",
    format_en: "In-person",
    heroImage: "/images/evento-hungria-es.png",
    heroImage_en: "/images/evento-hungria-en.png",
    summary: "Participación de Beatriz de León Cobo, Directora Ejecutiva del IEAM, en un panel internacional sobre migración organizado por el Danube Institute.",
    summary_en: "Participation of Beatriz de León Cobo, Executive Director of IEAM, in an international migration panel organized by the Danube Institute.",
    content: `
      <p>Budapest, 24 de marzo de 2026 – Beatriz de León Cobo, Directora Ejecutiva del Instituto Español de Análisis Migratorio (IEAM), participó en un panel internacional titulado “To Greener Pastures – and Back: A Global Outlook on Migration”, organizado por el Danube Institute.</p>
      <p>La discusión, que reunió a expertos de diversos ámbitos, se centró en varios temas clave:</p>
      <ul class="list-disc pl-5 space-y-2 mb-6">
        <li>El posible impacto de la inestabilidad geopolítica en los flujos migratorios;</li>
        <li>Cambios en el marco de asilo de la UE, especialmente la ampliación de los conceptos de “país de origen seguro” y “tercer país seguro”;</li>
        <li>Desarrollos recientes en la política migratoria española.</li>
      </ul>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">El enfoque bilateral español: resultados alentadores, viabilidad a largo plazo incierta</h3>
      <p>En esta ocasión, Beatriz de León Cobo presentó un análisis de la evolución de la estrategia española de gestión de la migración. Destacó el desarrollo de acuerdos bilaterales con varios países africanos, incluido Senegal, que van más allá de las simples políticas de retorno.</p>
      <p>Estos acuerdos incluyen cooperación entre autoridades de seguridad y marítimas, así como iniciativas destinadas a abordar las causas estructurales de la migración irregular. Aunque los primeros resultados observados en las rutas hacia las Islas Canarias parecen prometedores, ella señaló que todavía es demasiado pronto para evaluar la viabilidad a largo plazo de estas medidas.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Factores económicos en el centro de las dinámicas migratorias</h3>
      <p>De manera más amplia, la Directora Ejecutiva del IEAM destacó que los factores económicos constituyen el principal motor de la migración irregular desde África. Tomando como ejemplo Senegal, donde cerca de 100,000 jóvenes ingresan cada año al mercado laboral con perspectivas limitadas de empleo, señaló que la falta de oportunidades locales constituye un incentivo estructural a la emigración – un desafío que requiere soluciones de fondo, más allá de las políticas de control fronterizo.</p>
    `,
    content_en: `
      <p>Budapest, March 24, 2026 – Beatriz de León Cobo, Executive Director of the Spanish Institute for Migration Analysis (IEAM), participated in an international panel entitled “To Greener Pastures – and Back: A Global Outlook on Migration”, organized by the Danube Institute.</p>
      <p>The discussion, which brought together experts from diverse backgrounds, focused on several key issues:</p>
      <ul class="list-disc pl-5 space-y-2 mb-6">
        <li>The potential impact of geopolitical instability on migration flows;</li>
        <li>Changes in the EU asylum framework, notably the expansion of the notions of “safe country of origin” and “safe third country”;</li>
        <li>Recent developments in Spanish migration policy.</li>
      </ul>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">The Spanish bilateral approach: encouraging results, long-term viability uncertain</h3>
      <p>On this occasion, Beatriz de León Cobo presented an analysis of the evolution of Spain’s migration management strategy. She highlighted the development of bilateral agreements with several African countries, including Senegal, which go beyond simple return policies.</p>
      <p>These agreements include cooperation between security and maritime authorities, as well as initiatives aimed at addressing the root causes of irregular migration. While early results on the routes to the Canary Islands appear promising, she noted that it is still too early to assess the long-term viability of these measures.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Economic factors at the heart of migration dynamics</h3>
      <p>More broadly, the Executive Director of IEAM emphasized that economic factors are the main driver of irregular migration from Africa. Using Senegal as an example, where nearly 100,000 young people enter the labor market each year with limited employment prospects, she highlighted that the lack of local opportunities constitutes a structural incentive for emigration – a challenge that requires long-term solutions beyond border control policies alone.</p>
    `,
    agenda: [],
    speakers: [
      {
        name: "Beatriz de León Cobo",
        role: "Directora Ejecutiva IEAM",
        role_en: "Executive Director, IEAM"
      }
    ]
  },
  {
    slug: "lanzamiento-oficial-ieam",
    title: "Evento de presentación del IEAM La cuestión migratoria entre África y Europa: desafíos estratégicos y respuestas compartidas",
    title_en: "IEAM Launch Event The migration issue between Africa and Europe: strategic challenges and shared responses",
    subtitle: "El Instituto Español de Análisis Migratorio presenta en Madrid sus primeros trabajos y reivindica un debate más riguroso, estratégico y de largo plazo sobre migración.",
    subtitle_en: "The Spanish Institute for Migration Analysis presents its first work in Madrid and calls for a more rigorous, strategic, and long-term debate on migration.",
    category: "Evento de Lanzamiento",
    category_en: "Launch Event",
    date: "16 Abr 2026",
    location: "Madrid, España",
    location_en: "Madrid, Spain",
    format: "Presencial",
    format_en: "In-person",
    heroImage: "/images/lanzamiento-ieam-es.png",
    heroImage_en: "/images/lanzamiento-ieam-en.png",
    summary: "El IEAM celebró su acto de lanzamiento oficial en la Oficina del Parlamento Europeo en Madrid, reuniendo a expertos y representantes institucionales para analizar los retos migratorios.",
    summary_en: "The IEAM held its official launch event at the European Parliament Office in Madrid, bringing together experts and institutional representatives to analyze migration challenges.",
    content: `
      <p>El Instituto Español de Análisis Migratorio presenta en Madrid sus primeros trabajos y reivindica un debate más riguroso, estratégico y de largo plazo sobre migración.</p>
      <p>El acto de lanzamiento del IEAM, celebrado en la Oficina del Parlamento Europeo en Madrid, reunió a representantes institucionales, expertos, organismos internacionales y socios africanos y europeos para analizar los principales retos migratorios entre África y Europa.</p>
      <p>Madrid, 16 de abril de 2026. El Instituto Español de Análisis Migratorio (IEAM) celebró este miércoles en la Oficina del Parlamento Europeo en Madrid su acto de lanzamiento oficial, una jornada que sirvió para presentar sus primeros resultados de investigación, compartir su metodología de trabajo y abrir un espacio de reflexión plural sobre uno de los grandes asuntos estructurales de nuestro tiempo: la migración. Dirigido por Beatriz de León Cobo, el IEAM arrancó su actividad en septiembre de 2025 con la vocación de ofrecer análisis riguroso, proponer políticas innovadoras y generar espacios de diálogo que permitan anticipar y gestionar la migración africana de manera sostenible, humana y útil para ambas regiones. La jornada permitió visibilizar un trabajo ya avanzado. En apenas seis meses, el Instituto ha elaborado informes técnicos, policy papers, infografías y actividades de diálogo estratégico en distintos puntos de Europa y África, con talleres celebrados en Bamako, Dakar y Roma. Su metodología combina diálogo estratégico, investigación e influencia pública, reuniendo a gobiernos, investigadores, sociedad civil, diásporas y sector privado para producir análisis aplicados y recomendaciones útiles para la toma de decisiones.</p>
      <p>La directora ejecutiva del Instituto, Beatriz de León Cobo, recordó que el IEAM es una iniciativa que se puso en marcha hace seis meses, en septiembre de 2025, en un contexto internacional marcado por la aceleración de la información, la polarización del debate y la dificultad de construir políticas migratorias eficaces, humanas y con una visión a largo plazo. En su intervención, explicó que el Instituto quiere generar espacios donde puedan escucharse opiniones diversas, incluso discrepantes, con el fin de mejorar la calidad de las políticas públicas. También subrayó que África Occidental y el Sahel ocupan un lugar prioritario en esta primera fase del Instituto, tanto por la relevancia geopolítica de la región como por la necesidad de integrar las perspectivas africanas en el debate europeo.</p>

      <img src="/images/eventoieam1.webp" alt="Lanzamiento IEAM - Presentación" class="w-full h-auto rounded-lg my-8 shadow-md" />

      <p>El evento comenzó con la intervención del eurodiputado Javier Zarzalejos, quien defendió una aproximación integral al fenómeno migratorio y advirtió, además, de que con frecuencia se confunden los problemas de integración con los problemas específicos de la inmigración y reclamó una respuesta que combine gestión eficaz, cooperación, integración y respeto a los valores democráticos. A su juicio, Europa se encuentra en “un punto de inflexión” en su estrategia migratoria, con el nuevo Pacto sobre Migración y Asilo como marco de referencia, pero ese esfuerzo de eficacia debe mantenerse dentro de un sistema de garantías suficientes que preserve los derechos y la dignidad de las personas.</p>
      <p>La primera mesa de presentación de resultados estuvo moderada por Soraya Aybar, directora de África Mundi, y reunió a Valentina Benincasa, profesora del máster “Género, Migración y Derechos Humanos” de la Universidad Complutense de Madrid; Roméo Gbaguidi, presidente y director de investigación del Laboratorio para el Estudio de las Migraciones Africanas (LemAfriQ); y Ángel Losada, diplomático español y exrepresentante especial de la Unión Europea para el Sahel. La sesión permitió aterrizar tres grandes ejes del trabajo del Instituto: la migración irregular en España, la gobernanza de la movilidad en África Occidental y la dimensión europea de las políticas migratorias.</p>
      <p>Entre sus conclusiones destacan la importancia de la irregularidad sobrevenida y la situación de los menores no acompañados. Ángel Losada advirtió de que uno de los principales obstáculos para construir una política europea eficaz hacia el Sahel sigue siendo la falta de unidad entre los propios Estados miembros. También se refirió a Irán para subrayar la importancia de anticiparse a las crisis regionales antes de que se conviertan en presiones migratorias mayores sobre Europa, y recordó que la migración no puede abordarse solo desde el control de fronteras, sino desde una estrategia más amplia de asociación, prevención y corresponsabilidad.</p>

      <img src="/images/eventoieam2.webp" alt="Lanzamiento IEAM - Primera mesa" class="w-full h-auto rounded-lg my-8 shadow-md" />

      <p>La segunda gran mesa de la jornada, centrada en “La migración entre África y Europa: retos estratégicos y respuestas comunes”, reunió a Ana Hernández Rodríguez, asesora ministerial del Ministerio de Inclusión, Seguridad Social y Migraciones; Francisco de Borja Morate Martín, subdirector general para África Occidental del Ministerio de Asuntos Exteriores, Unión Europea y Cooperación; Agustín Mussini, responsable de políticas y enlace de la Oficina de la Organización Internacional para las Migraciones en España; y Javier Albaladejo, excomisario principal de la Policía Nacional.</p>
      <p>En relación con el proceso extraordinario de regularización, Hernández Rodríguez insistió en que se trata de una medida orientada a personas que ya están en España, no a nuevas llegadas. “No se está regalando dinero, se les está regalando la posibilidad de ser personas con derechos y obligaciones”, afirmó. Para la representante del Ministerio, el debate ha estado muy condicionado por la difusión de versiones incorrectas del texto y por una ola de bulos que han distorsionado el sentido de la medida. Desde el Ministerio de Asuntos Exteriores, Borja Morate Martín destacó que la estrategia España-África 2025-2028 refleja la importancia creciente que España concede a su política africana y, en particular, a África Occidental como región prioritaria. Morate Martín puso además el foco en Senegal como uno de los socios estratégicos más relevantes para España en África Occidental y destacó la reciente elevación de las relaciones bilaterales al nivel de asociación estratégica.</p>
      <p>Por parte de la OIM, Agustín Mussini recordó que en un país como España la migración “no es ni marginal ni excepcional”, sino “una dimensión estructural de la vida social, política, económica, laboral y demográfica del país. En sus palabras, una política migratoria madura “no se limita a gestionar entradas, ordena trayectorias, reduce vulnerabilidades y amplía oportunidades”. La mirada de seguridad la aportó Javier Albaladejo, quien recordó que la lucha contra las redes de crimen organizado que trafican con personas y explotan la trata sigue siendo una prioridad constante en la agenda europea. Defendió, más bien, que muchas veces la clave está en la persecución real de las estructuras financieras y organizativas detrás de las redes criminales.</p>

      <img src="/images/eventoieam3.webp" alt="Lanzamiento IEAM - Segunda mesa" class="w-full h-auto rounded-lg my-8 shadow-md" />

      <p>En el cierre de la jornada, Beatriz de León Cobo quiso resumir el espíritu del acto en tres ideas. La primera, que la migración es un asunto extraordinariamente complejo, técnico y transversal, que debe tratarse con respeto y con ambición analítica. La segunda, que el debate migratorio no puede reducirse a una sola dimensión, sino que debe integrar seguridad, demografía, empleo, cohesión social, política exterior y conocimiento del terreno. Y la tercera, que las respuestas verdaderamente eficaces exigen tiempo, previsibilidad y visión estratégica, porque no es posible resolver en una sola legislatura problemas y dinámicas que se construyen a lo largo de décadas. Con este lanzamiento, el Instituto Español de Análisis Migratorio consolida una etapa inicial especialmente activa y se posiciona como un nuevo espacio de referencia para el análisis migratorio en España. Su apuesta pasa por tender puentes entre investigación, instituciones, terreno y sociedad civil, y por contribuir a una conversación pública más honesta, más informada y más útil sobre uno de los temas que más marcarán el futuro de Europa y África.</p>

      <img src="/images/eventoieam4.webp" alt="Lanzamiento IEAM - Conclusión" class="w-full h-auto rounded-lg my-8 shadow-md" />

      <p>&nbsp;</p>
      <p><b>Programa del evento</b></p>
      <p><b>18:30 – 18:45 | Presentación institucional del IEAM</b><br />
      Palabras de bienvenida y presentación institucional del Instituto Español de Análisis Migratorio.<br />
      <b>Beatriz de León Cobo</b>, Directora ejecutiva del IEAM.<br />
      <b>Javier Zarzalejos</b>, eurodiputado.</p>

      <p><b>18:45 – 19:30 | Presentación de los trabajos del instituto</b><br />
      <b>Moderadora:</b> <b>Soraya Aybar</b>, investigadora del IEAM y directora de África Mundi, medio especializado en el continente africano y en las relaciones entre África y Europa.<br />
      • Migraciones y migrantes. ¿Cómo estudiar la irregularidad en los procesos migratorios? España: un estudio de caso<br />
      <b>Valentina Benincasa</b>, investigadora asociada del IEAM, docente en el Máster de Género, Migraciones y Derechos Humanos (Universidad Complutense de Madrid) y doctora en Antropología Social, especializada en humanitarismo y políticas de fronteras.<br />
      • Repensar la movilidad entre Mali y Europa: movilidad legal y circular, reintegración con un enfoque comunitario y gobernanza regional<br />
      • Reformar la gobernanza de la movilidad en África Occidental<br />
      <b>Roméo Gbaguidi</b>, investigador asociado del IEAM y presidente del think tank LemAfriQ, especializado en migraciones entre África y Europa, así como en las diásporas africanas.<br />
      • Diplomacia migratoria UE–África: de la gestión de los flujos a la coherencia estratégica<br />
      • Enfoque por rutas: ¿reducir los flujos o las vulnerabilidades? Hacia una estrategia coherente de protección y lucha contra las economías criminales<br />
      • Vías legales creíbles: entre promesa política y capacidad real - Estructurar la movilidad circular, el arraigo local y el papel de las diásporas<br />
      <b>Ángel Losada</b>, diplomático español, embajador de España en Irán (2021–2024) y antiguo representante especial de la Unión Europea para el Sahel (2015–2021).</p>

      <p><b>19:30 – 20:20 | La cuestión migratoria entre África y Europa: desafíos estratégicos y respuestas compartidas</b><br />
      <b>Moderadora:</b> <b>Beatriz de León Cobo</b>, directora ejecutiva del IEAM.<br />
      <b>Francisco de Borja Morate Martín</b>, subdirector general de la Subdirección General para África Occidental, Dirección General para África, Ministerio de Asuntos Exteriores, Unión Europea y Cooperación.<br />
      <b>Ana Hernández Rodríguez</b>, asesora de gabinete del Ministerio de Inclusión, Seguridad Social y Migraciones de España.<br />
      <b>Agustín Mussini</b>, oficial de política y enlace de la Oficina de la Organización Internacional para las Migraciones (OIM) en España.<br />
      <b>Javier Albaladejo</b>, Comisario Principal de la Policía Nacional (r).</p>

      <p><b>20:20 – 20:30 | Conclusión y clausura</b></p>
      <p><b>20:30 – 21:15 | Vino español</b></p>
    `,
    content_en: `
      <p>The Spanish Institute for Migration Analysis presents its first work in Madrid and calls for a more rigorous, strategic, and long-term debate on migration.</p>
      <p>The IEAM launch event, held at the European Parliament Office in Madrid, brought together institutional representatives, experts, international organizations, as well as African and European partners to analyze the main migration challenges between Africa and Europe.</p>
      <p>Madrid, April 16, 2026. The Spanish Institute for Migration Analysis (IEAM) held its official launch event this Wednesday at the European Parliament Office in Madrid. The event served to present its first research findings, share its working methodology, and open a space for plural reflection on one of the major structural issues of our time: migration.</p>
      <p>Led by Beatriz de León Cobo, IEAM began its activities in September 2025 with the aim of providing rigorous analysis, proposing innovative policies, and creating dialogue spaces to anticipate and manage African migration in a sustainable, humane, and mutually beneficial way.</p>

      <img src="/images/eventoieam1.webp" alt="IEAM Launch - Presentation" class="w-full h-auto rounded-lg my-8 shadow-md" />

      <p>The event highlighted work that is already well advanced. In just six months, the Institute has produced technical reports, policy papers, infographics, and strategic dialogue activities across Europe and Africa, including workshops in Bamako, Dakar, and Rome. Its methodology combines strategic dialogue, research, and public influence, bringing together governments, researchers, civil society, diasporas, and the private sector to generate applied analysis and practical recommendations for decision-making.</p>
      <p>The Institute’s Executive Director, Beatriz de León Cobo, recalled that IEAM was launched six months ago in a global context marked by rapid information flows, polarized debate, and the difficulty of building effective, humane, and long-term migration policies. She emphasized the Institute’s goal of creating spaces where diverse – even conflicting – views can be heard in order to improve public policy. She also highlighted West Africa and the Sahel as priority regions in this initial phase, due to their geopolitical importance and the need to incorporate African perspectives into the European debate.</p>
      <p>The event opened with remarks by MEP Javier Zarzalejos, who advocated for a comprehensive approach to migration and warned against conflating integration issues with immigration-specific challenges. He called for a response combining effective management, cooperation, integration, and respect for democratic values. In his view, Europe is at a “turning point” in its migration strategy, with the new Pact on Migration and Asylum as a reference framework, while stressing the need to preserve rights and human dignity.</p>

      <img src="/images/eventoieam2.webp" alt="IEAM Launch - First panel" class="w-full h-auto rounded-lg my-8 shadow-md" />

      <p>The first panel, moderated by Soraya Aybar, Director of África Mundi, brought together Valentina Benincasa, professor at the Complutense University of Madrid; Roméo Gbaguidi, President and Research Director of LemAfriQ; and Ángel Losada, Spanish diplomat and former EU Special Representative for the Sahel. The discussion focused on three key areas: irregular migration in Spain, the governance of mobility in West Africa, and the European dimension of migration policies.</p>
      <p>Key conclusions included the importance of transitions into irregular status and the situation of unaccompanied minors. Ángel Losada pointed to the lack of unity among EU member states as a major obstacle to an effective Sahel policy. He also referred to Iran to highlight the need to anticipate regional crises before they result in increased migration pressures on Europe, emphasizing that migration cannot be addressed solely through border control.</p>

      <img src="/images/eventoieam3.webp" alt="IEAM Launch - Second panel" class="w-full h-auto rounded-lg my-8 shadow-md" />

      <p>The second panel, titled “Migration between Africa and Europe: strategic challenges and common responses,” brought together Ana Hernández Rodríguez, ministerial advisor; Francisco de Borja Morate Martín, Deputy Director-General for West Africa; Agustín Mussini, representative of the International Organization for Migration in Spain; and Javier Albaladejo, former senior commissioner of the Spanish National Police.</p>
      <p>Regarding the extraordinary regularization process, Hernández Rodríguez emphasized that it targets people already in Spain, not new arrivals: “It is not about giving money, but about giving the possibility to be individuals with rights and obligations”. She also noted that the debate has been heavily influenced by the spread of incorrect versions of the text and by a wave of misinformation that has distorted the meaning of the measure.</p>
      <p>From the Ministry of Foreign Affairs, Borja Morate Martín highlighted that the Spain–Africa Strategy 2025–2028 reflects the growing importance Spain attaches to its African policy and, in particular, to West Africa as a priority region. He also emphasized Senegal as one of the most relevant strategic partners for Spain in West Africa and highlighted the recent upgrading of bilateral relations to the level of a strategic partnership.</p>
      <p>From the International Organization for Migration (IOM), Agustín Mussini recalled that in a country like Spain, migration is “neither marginal nor exceptional”, but a structural dimension of social, political, economic, labour, and demographic life. He added that a mature migration policy “does not merely manage entries; it organizes trajectories, reduces vulnerabilities, and expands opportunities”.</p>
      <p>The security perspective was provided by Javier Albaladejo, who stressed that the fight against organized crime networks involved in human trafficking remains a constant priority on the European agenda. He underlined that the key often lies in effectively targeting the financial and organizational structures behind these networks.</p>

      <img src="/images/eventoieam4.webp" alt="IEAM Launch - Conclusion" class="w-full h-auto rounded-lg my-8 shadow-md" />

      <p>In closing, Beatriz de León Cobo summarized the event in three ideas. First, that migration is an extraordinarily complex, technical, and cross-cutting issue that must be addressed with both respect and analytical ambition. Second, that the migration debate cannot be reduced to a single dimension, but must integrate security, demography, employment, social cohesion, foreign policy, and field-based knowledge. And third, that truly effective responses require time, predictability, and strategic vision, as it is not possible to resolve within a single legislative term problems and dynamics that have been built over decades. With this launch, the Spanish Institute for Migration Analysis consolidates a particularly active initial phase and positions itself as a new reference space for migration analysis in Spain. Its approach is based on building bridges between research, institutions, field realities, and civil society, and on contributing to a more honest, better-informed, and more useful public conversation on one of the issues that will most shape the future of Europe and Africa.</p>

      <p><b>Event Program</b></p>
      <p><b>18:30 – 18:45 | Institutional presentation of IEAM</b><br />
      Welcome remarks and institutional presentation of the Spanish Institute for Migration Analysis.<br />
      <b>Beatriz de León Cobo</b>, Executive Director of IEAM.<br />
      <b>Javier Zarzalejos</b>, MEP.</p>

      <p><b>18:45 – 19:30 | Presentation of the Institute’s Work</b><br />
      <b>Moderator:</b> <b>Soraya Aybar</b>, Associate Researcher at IEAM and Director of África Mundi, a media outlet specialized in the African continent and Africa–Europe relations.<br />
      • Migration and migrants. How can we study irregularity in migration processes? Spain: a case study<br />
      <b>Valentina Benincasa</b>, Associate Researcher at IEAM, lecturer in the Master’s program in Gender, Migration and Human Rights (Complutense University of Madrid), and PhD in Social Anthropology, specializing in humanitarianism and border policies.<br />
      • Rethinking mobility between Mali and Europe: legal and circular mobility, reintegration with a community-based approach, and regional governance<br />
      • Reforming mobility governance in West Africa<br />
      <b>Roméo Gbaguidi</b>, Associate Researcher at IEAM and President of the think tank LemAfriQ, specializing in migration between Africa and Europe, as well as African diasporas.<br />
      • EU–Africa migration diplomacy: from flow management to strategic coherence<br />
      • Route-based approach: reducing flows or vulnerabilities? Towards a coherent strategy for protection and the fight against criminal economies<br />
      • Credible legal pathways: between political promise and real capacity – structuring circular mobility, local rootedness, and the role of diaspers<br />
      <b>Ángel Losada</b>, Spanish diplomat, Ambassador of Spain to Iran (2021–2024) and former EU Special Representative for the Sahel (2015–2021).</p>

      <p><b>19:30 – 20:20 | The migration issue between Africa and Europe: strategic challenges and shared responses</b><br />
      <b>Moderator:</b> <b>Beatriz de León Cobo</b>, Executive Director of IEAM.<br />
      <b>Francisco de Borja Morate Martín</b>, Deputy Director-General for West Africa, Directorate-General for Africa, Ministry of Foreign Affairs, European Union and Cooperation.<br />
      <b>Ana Hernández Rodríguez</b>, advisor in the office of the Ministry of Inclusion, Social Security and Migration of Spain.<br />
      <b>Agustín Mussini</b>, Policy and Liaison Officer at the International Organization for Migration (IOM) Office in Spain.<br />
      <b>Javier Albaladejo</b>, Chief Commissioner of the National Police (ret.).</p>

      <p><b>20:20 – 20:30 | Conclusion and closing remarks</b></p>
      <p><b>20:30 – 21:15 | Spanish wine reception</b></p>
    `,
    agenda: [
      { time: "18:30 – 18:45", title: "Presentación institucional del IEAM", title_en: "Institutional presentation of IEAM", speaker: "Beatriz de León Cobo · Javier Zarzalejos", speaker_en: "Beatriz de León Cobo · Javier Zarzalejos" },
      { time: "18:45 – 19:30", title: "Presentación de los trabajos del instituto", title_en: "Presentation of the Institute’s Work", speaker: "Soraya Aybar · Valentina Benincasa · Roméo Gbaguidi · Ángel Losada", speaker_en: "Soraya Aybar · Valentina Benincasa · Roméo Gbaguidi · Ángel Losada" },
      { time: "19:30 – 20:20", title: "La cuestión migratoria entre África y Europa: desafíos estratégicos y respuestas compartidas", title_en: "The migration issue between Africa and Europe: strategic challenges and shared responses", speaker: "Beatriz de León Cobo · Francisco de Borja Morate Martín · Ana Hernández Rodríguez · Agustín Mussini · Javier Albaladejo", speaker_en: "Beatriz de León Cobo · Francisco de Borja Morate Martín · Ana Hernández Rodríguez · Agustín Mussini · Javier Albaladejo" },
      { time: "20:20 – 20:30", title: "Conclusión y clausura", title_en: "Conclusion and closing remarks" },
      { time: "20:30 – 21:15", title: "Vino español", title_en: "Spanish wine reception" }
    ],
    gallery: [
      "/images/eventoieam1.webp",
      "/images/eventoieam2.webp",
      "/images/eventoieam3.webp",
      "/images/eventoieam4.webp"
    ],
    attachments: [
      { label: "Comunicado de prensa (ES)", label_en: "Comunicado de prensa (ES)", url: "/docs/Communiqu_de_presse_-_ES.pdf" },
      { label: "Press release (EN)", label_en: "Press release (EN)", url: "/docs/Communiqu_de_presse_-_EN.pdf" }
    ],
    speakers: [
      { name: "Beatriz de León Cobo", role: "Directora Ejecutiva del IEAM", role_en: "Executive Director of IEAM" },
      { name: "Javier Zarzalejos", role: "Eurodiputado", role_en: "Member of the European Parliament" },
      { name: "Valentina Benincasa", role: "Investigadora asociada IEAM, UCM", role_en: "Associate researcher IEAM, UCM" },
      { name: "Roméo Gbaguidi", role: "Investigador asociado IEAM, presidente LemAfriQ", role_en: "Associate researcher IEAM, president of LemAfriQ" },
      { name: "Soraya Aybar", role: "Investigadora asociada IEAM, directora de África Mundi", role_en: "Associate researcher IEAM, director of África Mundi" },
      { name: "Ángel Losada", role: "Diplomático, ex Embajador de España en Irán y ex Representante Especial UE para el Sahel", role_en: "Diplomat, former Ambassador of Spain to Iran and former EU Special Representative for the Sahel" },
      { name: "Francisco de Borja Morate Martín", role: "Subdirector General para África Occidental, MAEUEC", role_en: "Deputy Director-General for West Africa, Ministry of Foreign Affairs" },
      { name: "Ana Hernández Rodríguez", role: "Asesora de gabinete, Ministerio de Inclusión, SS y Migraciones", role_en: "Cabinet Advisor, Ministry of Inclusion, Social Security and Migration" },
      { name: "Agustín Mussini", role: "Oficial de política y enlace de la OIM en España", role_en: "Policy and Liaison Officer at IOM Spain" },
      { name: "Javier Albaladejo", role: "Comisario Principal de la Policía Nacional (r.)", role_en: "Principal Commissioner of the National Police (r.)" }
    ]
  },
  {
    slug: "workshop-gran-canaria-2026",
    title: "Taller de inteligencia colectiva en Gran Canaria",
    title_en: "Collective Intelligence Workshop in Gran Canaria",
    subtitle: "Ruta atlántica, Sahel y Canarias: anticipar las dinámicas migratorias, reducir vulnerabilidades y reforzar la cooperación.",
    subtitle_en: "Atlantic Route, Sahel and Canary Islands: anticipating migration dynamics, reducing vulnerabilities, and strengthening cooperation.",
    category: "Taller",
    category_en: "Workshop",
    date: "09 Jun 2026",
    location: "Gran Canaria, España",
    location_en: "Gran Canaria, Spain",
    format: "Chatham House",
    format_en: "Chatham House",
    heroImage: "/images/evento-grancanariaES.png",
    heroImage_en: "/images/evento-grancanariaEN.png",
    summary: "El IEAM organizó en Gran Canaria, en colaboración con el Gobierno de Canarias, un taller de inteligencia colectiva para analizar las relaciones entre la inestabilidad en el Sahel, las transformaciones en África Occidental y las dinámicas migratorias hacia Canarias.",
    summary_en: "IEAM organised in Gran Canaria, in collaboration with the Government of the Canary Islands, a collective intelligence workshop to analyse the links between instability in the Sahel, transformations in West Africa, and migration dynamics towards the Canary Islands.",
    content: `
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Resumen del taller</h3>
      <p>El Instituto Español de Análisis Migratorio —IEAM— organizó en Gran Canaria, en colaboración con el Gobierno de Canarias, un taller de inteligencia colectiva dedicado a analizar las relaciones entre la inestabilidad en el Sahel, las transformaciones políticas y socioeconómicas en África Occidental y las dinámicas migratorias hacia Canarias.</p>
      <p>El encuentro reunió a un grupo diverso de actores institucionales, operativos, humanitarios, académicos y de sociedad civil. La sesión se desarrolló bajo las reglas de Chatham House, con el objetivo de favorecer un diálogo abierto, franco y constructivo entre los participantes.</p>
      <p>El taller partió de una premisa compartida: la ruta atlántica hacia Canarias no puede entenderse como un fenómeno exclusivamente marítimo ni como un desafío únicamente canario. Forma parte de un sistema regional de movilidad mucho más amplio, atravesado por dinámicas de conflicto, inseguridad, pobreza, aspiraciones juveniles, redes familiares, diásporas, políticas de control, movilidad intraafricana, vías legales insuficientes y economías de facilitación cada vez más adaptativas.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Participantes</h3>
      <p>El taller reunió a representantes del Gobierno de Canarias, Policía Nacional, Guardia Civil, Fiscalía, organizaciones internacionales, entidades humanitarias, ONG, sociedad civil, academia, representantes europeos, analistas especializados y expertos con experiencia directa en el Sahel, África Occidental y la ruta atlántica.</p>
      <p>Esta diversidad permitió cruzar perspectivas institucionales, operativas, humanitarias, académicas y de terreno, generando un debate especialmente rico sobre los factores que explican la evolución de la ruta atlántica y sobre las posibles respuestas públicas.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Objetivos del taller</h3>
      <p>El taller tuvo como objetivo construir un diagnóstico compartido sobre las dinámicas actuales de movilidad hacia Canarias y formular recomendaciones útiles para las instituciones implicadas.</p>
      <p>En particular, buscó:</p>
      <ul class="list-disc pl-5 space-y-2 mb-6 text-slate-700">
        <li>Analizar cómo la inestabilidad en el Sahel y África Occidental influye en las rutas migratorias hacia Canarias.</li>
        <li>Comprender los efectos de las políticas de control, cooperación y externalización sobre la reorganización de las rutas.</li>
        <li>Identificar señales tempranas que permitan pasar de una lógica reactiva a una lógica de anticipación.</li>
        <li>Debatir sobre la profesionalización de ciertas redes de facilitación y sobre cómo reducir su rentabilidad sin aumentar los riesgos para las personas migrantes.</li>
        <li>Examinar las necesidades de protección de mujeres, menores y personas en situación de especial vulnerabilidad.</li>
        <li>Explorar alternativas vinculadas a la formación, el empleo, la movilidad circular, las vías legales y la cooperación territorializada.</li>
      </ul>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Temas discutidos</h3>
      <p>El taller se estructuró en dos grandes bloques: un primer bloque de análisis y diagnóstico, y un segundo bloque centrado en recomendaciones y respuestas operativas.</p>
      <p>Entre los principales temas discutidos destacaron:</p>

      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">La ruta atlántica como sistema regional</h4>
      <p>Los participantes subrayaron que la ruta hacia Canarias no puede analizarse de forma aislada. Está conectada con las dinámicas de movilidad intraafricana, las rutas transaharianas, el Mediterráneo occidental y central, los países de tránsito y las políticas europeas de control.</p>

      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Contención, suspensión e invisibilización de la ruta</h4>
      <p>Se debatió si la reducción reciente de llegadas visibles refleja una disminución real de la presión migratoria o, más bien, una combinación de mayor control, interceptaciones, espera en territorios de tránsito y desplazamiento hacia otros puntos de salida.</p>

      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">El impacto de Mali y del Sahel</h4>
      <p>La situación de seguridad en Mali y en otras zonas del Sahel fue analizada como un factor clave para comprender los desplazamientos internos, las decisiones familiares de migrar, la presión sobre los jóvenes y la evolución de las rutas hacia África Occidental y Canarias.</p>

      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Redes de facilitación, economías ilícitas y profesionalización</h4>
      <p>Uno de los debates centrales giró en torno a la adaptación de las redes de facilitación. Se discutieron indicadores como la reducción de tiempos de espera, el uso de grupos cerrados de mensajería, los pagos por fases, el dinero móvil, la fragmentación logística, la escasez de capitanes experimentados y el desplazamiento de puntos de salida hacia zonas menos controladas.</p>

      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Protección, mujeres y menores</h4>
      <p>Varias intervenciones destacaron la creciente preocupación por la feminización de algunas llegadas, los riesgos de trata, explotación y matrimonios forzados, así como la situación de niños, niñas y adolescentes migrantes, tanto acompañados como no acompañados.</p>

      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Retorno, reintegración y familias</h4>
      <p>El taller abordó la necesidad de repensar el retorno no como una operación administrativa, sino como un proceso familiar, comunitario, económico y psicosocial. Se insistió en que la reintegración debe tener en cuenta la presión familiar, las deudas, las expectativas comunitarias y la necesidad de generar medios de vida reales.</p>

      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Vías legales, movilidad circular y desarrollo territorial</h4>
      <p>Los participantes señalaron la importancia de hacer creíbles y accesibles las vías legales, mejorar los procedimientos de visado, ampliar programas de movilidad regular y circular, y conectar la formación profesional con necesidades económicas reales en los territorios de origen y tránsito.</p>

      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Anticipación y efectos no deseados</h4>
      <p>Una de las ideas más repetidas fue la necesidad de anticipar los efectos no intencionados de las políticas migratorias. El cierre de una ruta puede desplazar los flujos, aumentar los costes del viaje, reforzar la dependencia de intermediarios y trasladar los riesgos hacia tramos menos visibles y más peligrosos.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Resultados y próximos pasos</h3>
      <p>El taller permitió consolidar una serie de mensajes estratégicos y recomendaciones preliminares para avanzar hacia una gobernanza más coherente de la ruta atlántica.</p>
      <p>Entre las principales líneas de trabajo identificadas destacan:</p>
      <ul class="list-disc pl-5 space-y-2 mb-6 text-slate-700">
        <li>Pasar de una lógica de reacción a una lógica de anticipación.</li>
        <li>Fortalecer la capacidad de análisis sobre rutas, precios, perfiles, redes, puntos de salida y señales tempranas.</li>
        <li>Reducir la rentabilidad de las redes de facilitación, priorizando investigaciones financieras y cooperación judicial.</li>
        <li>Reforzar la protección de mujeres, menores y personas vulnerables a lo largo de los corredores.</li>
        <li>Hacer que las vías legales, la movilidad circular y la formación profesional sean alternativas reales y no meramente simbólicas.</li>
        <li>Territorializar la cooperación, conectando proyectos con necesidades locales, sector privado, comunidades y diásporas.</li>
        <li>Evaluar los efectos no deseados de los acuerdos migratorios y de las políticas de control.</li>
      </ul>
      <p>A partir de los intercambios del taller, el IEAM elaborará un Policy Paper que recogerá los principales hallazgos y recomendaciones. El documento será compartido con los participantes y con las instituciones interesadas en las próximas semanas.</p>
      <p>El taller de Gran Canaria forma parte de la línea de trabajo del IEAM dedicada a construir espacios de diálogo estratégico entre Europa, África y el Mediterráneo, con el objetivo de traducir el conocimiento de terreno y la inteligencia colectiva en propuestas de política pública útiles, realistas y basadas en derechos.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-10 mb-4">Apariciones en prensa</h3>
      <ul class="space-y-2 text-slate-700">
        <li><a href="#" class="text-[var(--color-accent-blue)] hover:underline font-medium">Gobierno de Canarias</a> — Canarias pide tener voz en el Pacto Europeo de Migración y Asilo "por responsabilidad, no como un privilegio"</li>
        <li><a href="#" class="text-[var(--color-accent-blue)] hover:underline font-medium">Europa Press</a> — Canarias exige una "voz real" en la aplicación del Pacto Europeo de Migración y Asilo</li>
        <li><a href="#" class="text-[var(--color-accent-blue)] hover:underline font-medium">Teleprensa</a> — Canarias exige una "voz real" en la aplicación del Pacto Europeo de Migración y Asilo</li>
        <li><a href="#" class="text-[var(--color-accent-blue)] hover:underline font-medium">Diario Siglo XXI</a> — Canarias exige una "voz real" en la aplicación del Pacto Europeo de Migración y Asilo</li>
        <li><a href="#" class="text-[var(--color-accent-blue)] hover:underline font-medium">Canarias7</a> — Canarias pide tener voz en el pacto de migración por responsabilidad</li>
        <li><a href="#" class="text-[var(--color-accent-blue)] hover:underline font-medium">Maspalomas Ahora</a> — Canarias reclama voz propia en la aplicación del pacto migratorio europeo</li>
        <li><a href="#" class="text-[var(--color-accent-blue)] hover:underline font-medium">Canarias en Pleno</a> — Canarias no recibe información y exige una voz real en el Pacto de migración</li>
        <li><a href="#" class="text-[var(--color-accent-blue)] hover:underline font-medium">La Gaceta de Canarias</a> — El Gobierno canario reclama participar en la aplicación del nuevo Pacto Europeo de Migración</li>
      </ul>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-10 mb-4">Imágenes del taller</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <img src="/images/evento-grancanaria1.jpg" alt="Taller de inteligencia colectiva en Gran Canaria" class="w-full h-auto rounded-lg shadow-md object-cover" loading="lazy" decoding="async" />
        <img src="/images/evento-grancanaria2.jpeg" alt="Participantes del taller en Gran Canaria" class="w-full h-auto rounded-lg shadow-md object-cover" loading="lazy" decoding="async" />
      </div>
    `,
    content_en: `
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Workshop Overview</h3>
      <p>The Spanish Institute for Migration Analysis — IEAM — organised in Gran Canaria, in collaboration with the Government of the Canary Islands, a collective intelligence workshop dedicated to analysing the links between instability in the Sahel, political and socio-economic transformations in West Africa, and migration dynamics towards the Canary Islands.</p>
      <p>The workshop brought together a diverse group of institutional, operational, humanitarian, academic, and civil society actors. The session was held under the Chatham House Rule, with the aim of fostering an open, frank, and constructive dialogue among participants.</p>
      <p>The workshop was based on a shared premise: the Atlantic route to the Canary Islands cannot be understood as a purely maritime phenomenon or as a challenge affecting only the Canary Islands. It forms part of a much broader regional mobility system, shaped by conflict dynamics, insecurity, poverty, youth aspirations, family strategies, diasporas, control policies, intra-African mobility, insufficient legal pathways, and increasingly adaptive facilitation economies.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Participants</h3>
      <p>The workshop brought together representatives from the Government of the Canary Islands, the Spanish National Police, Guardia Civil, the Prosecutor's Office, international organisations, humanitarian actors, NGOs, civil society, academia, European representatives, specialised analysts, and experts with direct experience in the Sahel, West Africa, and the Atlantic route.</p>
      <p>This diversity made it possible to bring together institutional, operational, humanitarian, academic, and field-based perspectives, generating a particularly rich debate on the factors shaping the evolution of the Atlantic route and on possible public policy responses.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Workshop Objectives</h3>
      <p>The workshop aimed to build a shared diagnosis of current mobility dynamics towards the Canary Islands and to formulate useful recommendations for the institutions involved.</p>
      <p>More specifically, it sought to:</p>
      <ul class="list-disc pl-5 space-y-2 mb-6 text-slate-700">
        <li>Analyse how instability in the Sahel and West Africa influences migration routes towards the Canary Islands.</li>
        <li>Understand the effects of control, cooperation, and externalisation policies on the reorganisation of routes.</li>
        <li>Identify early-warning signals that could help move from a reactive logic to an anticipatory one.</li>
        <li>Discuss the professionalisation of certain facilitation networks and how to reduce their profitability without increasing risks for migrants.</li>
        <li>Examine the protection needs of women, minors, and people in situations of particular vulnerability.</li>
        <li>Explore alternatives linked to training, employment, circular mobility, legal pathways, and territorialised cooperation.</li>
      </ul>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Themes Discussed</h3>
      <p>The workshop was structured around two main blocks: a first block focused on analysis and diagnosis, and a second block focused on recommendations and operational responses.</p>
      <p>Key themes included:</p>

      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">The Atlantic route as a regional system</h4>
      <p>Participants underlined that the route to the Canary Islands cannot be analysed in isolation. It is connected to intra-African mobility dynamics, trans-Saharan routes, the Western and Central Mediterranean, countries of transit, and European control policies.</p>

      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Containment, suspension, and invisibilisation of the route</h4>
      <p>Participants discussed whether the recent decrease in visible arrivals reflects a real reduction in migration pressure or rather a combination of stronger controls, interceptions, waiting periods in transit areas, and displacement towards other departure points.</p>

      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">The impact of Mali and the Sahel</h4>
      <p>The security situation in Mali and other parts of the Sahel was analysed as a key factor for understanding internal displacement, family decisions to migrate, youth pressures, and the evolution of routes towards West Africa and the Canary Islands.</p>

      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Facilitation networks, illicit economies, and professionalisation</h4>
      <p>One of the central discussions focused on the adaptation of facilitation networks. Indicators discussed included shorter waiting times, the use of closed messaging groups, staged payments, mobile money, logistical fragmentation, the shortage of experienced captains, and the displacement of departure points towards less controlled areas.</p>

      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Protection, women, and minors</h4>
      <p>Several contributions highlighted growing concern over the feminisation of some arrivals, risks of trafficking, exploitation and forced marriage, as well as the situation of migrant children and adolescents, both accompanied and unaccompanied.</p>

      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Return, reintegration, and families</h4>
      <p>The workshop addressed the need to rethink return not as an administrative operation, but as a family, community, economic, and psychosocial process. Participants stressed that reintegration must take into account family pressure, debts, community expectations, and the need to generate real livelihoods.</p>

      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Legal pathways, circular mobility, and territorial development</h4>
      <p>Participants underlined the importance of making legal pathways credible and accessible, improving visa procedures, expanding regular and circular mobility programmes, and connecting vocational training with real economic needs in countries and territories of origin and transit.</p>

      <h4 class="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">Anticipation and unintended effects</h4>
      <p>One of the most repeated ideas was the need to anticipate the unintended effects of migration policies. Closing one route can displace flows, increase the cost of the journey, reinforce dependence on intermediaries, and transfer risks to less visible and more dangerous segments.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Outputs and Next Steps</h3>
      <p>The workshop helped consolidate a set of strategic messages and preliminary recommendations for moving towards a more coherent governance of the Atlantic route.</p>
      <p>Key lines of work identified include:</p>
      <ul class="list-disc pl-5 space-y-2 mb-6 text-slate-700">
        <li>Moving from a reactive logic to an anticipatory one.</li>
        <li>Strengthening analytical capacity on routes, prices, profiles, networks, departure points, and early-warning signals.</li>
        <li>Reducing the profitability of facilitation networks, with a particular focus on financial investigations and judicial cooperation.</li>
        <li>Reinforcing the protection of women, minors, and vulnerable people along migration corridors.</li>
        <li>Ensuring that legal pathways, circular mobility, and vocational training become real alternatives rather than symbolic mechanisms.</li>
        <li>Territorialising cooperation by connecting projects with local needs, the private sector, communities, and diasporas.</li>
        <li>Evaluating the unintended effects of migration agreements and control policies.</li>
      </ul>
      <p>Building on the workshop discussions, IEAM will prepare a Policy Paper bringing together the main findings and recommendations. The document will be shared with participants and interested institutions in the coming weeks.</p>
      <p>The Gran Canaria workshop forms part of IEAM's broader line of work dedicated to building spaces for strategic dialogue between Europe, Africa, and the Mediterranean, with the aim of translating field knowledge and collective intelligence into useful, realistic, and rights-based public policy proposals.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-10 mb-4">Press Coverage</h3>
      <ul class="space-y-2 text-slate-700">
        <li><a href="#" class="text-[var(--color-accent-blue)] hover:underline font-medium">Gobierno de Canarias</a> — Canarias pide tener voz en el Pacto Europeo de Migración y Asilo "por responsabilidad, no como un privilegio"</li>
        <li><a href="#" class="text-[var(--color-accent-blue)] hover:underline font-medium">Europa Press</a> — Canarias exige una "voz real" en la aplicación del Pacto Europeo de Migración y Asilo</li>
        <li><a href="#" class="text-[var(--color-accent-blue)] hover:underline font-medium">Teleprensa</a> — Canarias exige una "voz real" en la aplicación del Pacto Europeo de Migración y Asilo</li>
        <li><a href="#" class="text-[var(--color-accent-blue)] hover:underline font-medium">Diario Siglo XXI</a> — Canarias exige una "voz real" en la aplicación del Pacto Europeo de Migración y Asilo</li>
        <li><a href="#" class="text-[var(--color-accent-blue)] hover:underline font-medium">Canarias7</a> — Canarias pide tener voz en el pacto de migración por responsabilidad</li>
        <li><a href="#" class="text-[var(--color-accent-blue)] hover:underline font-medium">Maspalomas Ahora</a> — Canarias reclama voz propia en la aplicación del pacto migratorio europeo</li>
        <li><a href="#" class="text-[var(--color-accent-blue)] hover:underline font-medium">Canarias en Pleno</a> — Canarias no recibe información y exige una voz real en el Pacto de migración</li>
        <li><a href="#" class="text-[var(--color-accent-blue)] hover:underline font-medium">La Gaceta de Canarias</a> — El Gobierno canario reclama participar en la aplicación del nuevo Pacto Europeo de Migración</li>
      </ul>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-10 mb-4">Workshop Photos</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <img src="/images/evento-grancanaria1.jpg" alt="Collective intelligence workshop in Gran Canaria" class="w-full h-auto rounded-lg shadow-md object-cover" loading="lazy" decoding="async" />
        <img src="/images/evento-grancanaria2.jpeg" alt="Workshop participants in Gran Canaria" class="w-full h-auto rounded-lg shadow-md object-cover" loading="lazy" decoding="async" />
      </div>
    `,
    agenda: [],
    speakers: [
      {
        name: "Beatriz de León Cobo",
        role: "Directora Ejecutiva del Instituto Español de Análisis Migratorio",
        role_en: "Executive Director of the Spanish Institute for Migration Analysis"
      },
      {
        name: "Moctar Dan Yaye",
        role: "Responsable de Alarme Phone Sahara (Níger/Mauritania)",
        role_en: "Head of Alarme Phone Sahara (Niger/Mauritania)"
      },
      {
        name: "Mohamed Ag Albachar",
        role: "Jefe de Gabinete del Ministerio de Comunicación, Economía Digital y Modernización de la Administración de Mali; ex Jefe de Gabinete del Ministerio de Malienses en el Exterior (Mali)",
        role_en: "Chief of Staff at the Ministry of Communication, Digital Economy, and Administrative Modernization of Mali; former Chief of Staff at the Ministry of Malians Abroad (Mali)"
      },
      {
        name: "Mohamed Djigo",
        role: "Experto de enlace de la Alianza Sahel en Mauritania (Mauritania)",
        role_en: "Liaison Expert for the Sahel Alliance in Mauritania (Mauritania)"
      },
      {
        name: "Lucía Bird",
        role: "Directora del Observatorio de África Occidental de Global Initiative Against Transnational Organized Crime (Senegal)",
        role_en: "Director of the West Africa Observatory of the Global Initiative Against Transnational Organized Crime (Senegal)"
      }
    ]
  }
];

export const getEventBySlug = (slug: string): EventItem | undefined =>
  events.find((event) => event.slug === slug);
