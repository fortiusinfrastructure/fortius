import { ReactNode } from 'react';

export interface Author {
    name: string;
    name_en?: string;
    role: string;
    role_en?: string;
    image: string;
    bio: string;
    bio_en?: string;
}

export interface RelatedArticle {
    id: string;
    title: string;
    title_en?: string;
    image: string;
    badge: string;
    metadata: {
        date: string;
        readTime: string;
    };
    subtitle?: string;
    subtitle_en?: string;
}

export interface Article {
    slug: string;
    type: 'Análisis' | 'Informe' | 'Entrevista' | 'Policy Brief' | 'Infografía' | 'Nota de prensa' | 'Reseña de evento';
    type_en?: string;
    contentKind: 'analisis' | 'policy' | 'infografia' | 'reseña-evento' | 'entrevista' | 'nota-prensa';
    category: string;
    category_en?: string;
    title: string;
    title_en?: string;
    subtitle: string;
    subtitle_en?: string;
    heroImage: string;
    heroImage_en?: string;
    mainImage: string;
    mainImage_en?: string;
    mainImageCaption: string;
    mainImageCaption_en?: string;
    publishDate: string;
    readTime: string;
    author: Author;
    authors?: Author[]; // Optional array for multiple authors
    content: string; // HTML string for simplicity and portability
    content_en?: string; // Optional English content
    pullQuote?: string; // Optional highlighted quote
    pullQuote_en?: string;
    materialUrl?: string; // Optional downloadable material
    materialLabel?: string;
    materials?: { label: string; label_en?: string; url: string }[];
    relatedArticles: RelatedArticle[];
}

export const articles: Article[] = [
    {
        slug: 'vias-legales-creibles-2026',
        type: 'Policy Brief',
        type_en: 'Policy Brief',
        contentKind: 'policy',
        category: 'Migración · Movilidad',
        category_en: 'Migration · Mobility',
        title: 'Vías legales creíbles: Entre la promesa política y la capacidad real',
        title_en: 'Credible legal pathways: Between political promise and actual capacity',
        subtitle: 'Orientaciones estratégicas para convertir las vías legales en mecanismos eficaces y sostenibles.',
        subtitle_en: 'Strategic guidelines to turn legal pathways into effective and sustainable mechanisms.',
        heroImage: '/images/informe-4-2026-ES.png',
        heroImage_en: '/images/informe-4-2026-EN.png',
        mainImage: '/images/informe-4-2026-ES.png',
        mainImage_en: '/images/informe-4-2026-EN.png',
        mainImageCaption: 'Vías legales creíbles: movilidad euroafricana.',
        mainImageCaption_en: 'Credible legal pathways: Euro-African mobility.',
        publishDate: '14 Abr 2026',
        readTime: '12 min',
        author: {
            name: 'Equipo IEAM',
            name_en: 'IEAM Team',
            role: 'Investigación',
            role_en: 'Research',
            image: '/favicon-new.png',
            bio: 'Unidad de investigación del IEAM.',
            bio_en: 'IEAM Research Unit.'
        },
        content: `
            <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Resumen ejecutivo</h3>
            <p>El presente Policy Paper propone orientaciones estratégicas destinadas a convertir las vías legales de migración en mecanismos más creíbles, eficaces y sostenibles para la gestionar la movilidad entre la Unión Europea y sus socios africanos. El objetivo es superar centrado en las necesidades de visibilidad política a corto plazo y avanzar hacia una arquitectura operativa coherente, basada en las realidades económicas y territoriales.</p>
            <p>Este documento se inscribe en la continuidad de los trabajos del Instituto Español de Análisis Migratorio (IEAM) y es el resultado de un taller de inteligencia colectiva organizado en Roma por el IEAM y el centro de investigación independiente italiano AMIStaDeS.</p>
            <p>El taller reunió a una amplia gama de actores clave, entre los que se encontraban representantes de agencias de las Naciones Unidas, instituciones europeas, representantes ministeriales, organizaciones humanitarias y de la sociedad civil, empresas, así como expertos africanos. Esta diversidad de actores permitió intercambiar perspectivas institucionales, operativas y analíticas sobre las dinámicas de la movilidad euroafricana. También contribuyó a identificar las tensiones estructurales que limitan la eficacia de los dispositivos existentes y a esbozar líneas de acción para transformar los programas piloto en mecanismos estructurales creíbles y adaptados a las capacidades y prioridades de los socios africanos.</p>
            <p>El análisis de este Policy Paper se inscribe en un contexto marcado por la paradoja de las vías legales: aunque son políticamente visibles, siguen siendo estructuralmente periféricas. Los programas de movilidad circular pueden generar resultados positivos a nivel individual, pero no cambian de forma significativa las dinámicas de fondo del sistema. Esta tensión se explica por tres desajustes persistentes: la distancia entre la escala real de los programas y la presión demográfica, la falta de confianza en los procedimientos, agravada por la opacidad consular, y la débil integración de estos dispositivos en las estrategias locales de formación, empleo y reintegración. A estas limitaciones se suman una creciente presión demográfica africana, una capacidad de absorción europea limitada por los ciclos políticos y una sostenibilidad financiera que sigue dependiendo en exceso de la financiación externa a corto plazo.</p>

            <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Mensajes estratégicos</h3>
            <ul class="list-disc pl-6 mb-4 space-y-4">
                <li><strong>Hacer que la credibilidad pueda medirse:</strong> publicar de manera armonizada indicadores consulares – plazos de tramitación, tasas de aceptación y motivos de denegación – con el fin de transformar los anuncios políticos en compromisos verificables, reducir la incertidumbre sistémica y limitar el recurso a la intermediación informal.</li>
                <li><strong>Garantizar la accesibilidad social de los procedimientos:</strong> simplificar los requisitos documentales, adaptar las condiciones financieras a los niveles de ingresos de los países socios y establecer mecanismos de asistencia administrativa local certificada, con el fin de corregir las distorsiones de acceso que orientan estructuralmente las vías legales hacia los candidatos con mayores recursos, en detrimento de los perfiles buscados por los sectores.</li>
                <li><strong>Estructurar el ciclo completo de la movilidad circular:</strong> condicionar todo programa a una arquitectura coherente que integre la preparación previa a la partida, la adecuación entre empleo y competencias, la protección durante la estancia y un retorno estructurado que ofrezca perspectivas reales de reincorporación, basado en diagnósticos sectoriales documentados y un reconocimiento mutuo de las cualificaciones.</li>
                <li><strong>Territorializar la reintegración:</strong> ir más allá de los dispositivos individuales a corto plazo para integrar los retornos en dinámicas económicas locales, apoyando proyectos colectivos, condicionando los dispositivos de ayuda a la reintegración a una inserción en sectores identificados y orientando la financiación hacia una lógica de inversión territorial plurianual.</li>
                <li><strong>Estructurar el papel de las diásporas:</strong> ir más allá de su invocación política para crear interfaces institucionales claras con las administraciones locales, garantizar los instrumentos financieros y alinear los proyectos de inversión con las estrategias territoriales, sin convertir por ello a la diáspora en un sustituto de las políticas públicas.</li>
                <li><strong>Garantizar la sostenibilidad financiera:</strong> salir del modelo de dependencia de los donantes movilizando financiaciones mixtas que combinen presupuestos nacionales, administraciones locales, sector privado, diásporas y apoyo europeo específico, e integrando la movilidad legal en las estrategias de empleo y desarrollo territorial de los países socios, condición esencial para la corresponsabilidad y la viabilidad a largo plazo.</li>
            </ul>
        `,
        content_en: `
            <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Executive Summary</h3>
            <p>This Policy Paper proposes strategic guidelines aimed at making legal migration channels more credible, effective and sustainable mechanisms for managing mobility between the European Union and its African partners. The objective is to move beyond a focus on short-term political visibility and progress towards a coherent operational framework, based on economic and territorial realities.</p>
            <p>This document forms part of the ongoing work of the Spanish Institute for Migration Analysis (IEAM) and is the result of a collective intelligence workshop organised in Rome by the IEAM and the independent Italian research centre AMIStaDeS.</p>
            <p>The workshop brought together a wide range of key stakeholders, including representatives from United Nations agencies, European institutions, ministries, humanitarian and civil society organisations, businesses, as well as African experts. This diversity of stakeholders enabled the exchange of institutional, operational and analytical perspectives on the dynamics of Euro-African mobility. It also helped to identify the structural tensions that limit the effectiveness of existing mechanisms and to outline courses of action for transforming pilot programmes into credible structural mechanisms tailored to the capacities and priorities of African partners.</p>
            <p>The analysis in this Policy Paper is set against a backdrop marked by the paradox of legal channels: although they are politically visible, they remain structurally peripheral. Circular mobility programmes can generate positive outcomes at the individual level, but they do not significantly alter the underlying dynamics of the system. This tension stems from three persistent mismatches: the gap between the actual scale of the programmes and demographic pressure; a lack of trust in procedures, exacerbated by consular opacity; and the weak integration of these mechanisms into local strategies for training, employment and reintegration. Added to these limitations are growing demographic pressure from Africa, a European absorption capacity limited by political cycles, and financial sustainability that remains overly dependent on short-term external funding.</p>

            <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Strategic Messages</h3>
            <ul class="list-disc pl-6 mb-4 space-y-4">
                <li><strong>Making credibility measurable:</strong> publish harmonised consular indicators – processing times, acceptance rates and grounds for refusal – in order to transform political announcements into verifiable commitments, reduce systemic uncertainty and limit the use of informal intermediation.</li>
                <li><strong>Ensure the social accessibility of procedures:</strong> simplify documentary requirements, adapt financial conditions to the income levels of partner countries, and establish mechanisms for certified local administrative assistance, with the aim of correcting the access distortions that structurally steer legal channels towards candidates with greater resources, to the detriment of the profiles sought by the sectors.</li>
                <li><strong>Structure the entire cycle of circular mobility:</strong> make all programmes subject to a coherent framework that integrates pre-departure preparation, the matching of jobs and skills, protection during the stay, and a structured return offering real prospects for reintegration, based on documented sectoral assessments and mutual recognition of qualifications.</li>
                <li><strong>Territorialise reintegration:</strong> go beyond short-term individual schemes to integrate returns into local economic dynamics, supporting collective projects, making reintegration support schemes conditional on integration into identified sectors, and directing funding towards a multi-annual territorial investment approach.</li>
                <li><strong>Structuring the role of diasporas:</strong> moving beyond their political invocation to create clear institutional interfaces with local authorities, securing financial instruments and aligning investment projects with territorial strategies, without thereby turning the diaspora into a substitute for public policies.</li>
                <li><strong>Ensuring financial sustainability:</strong> moving away from the model of donor dependency by mobilising blended finance that combines national budgets, local authorities, the private sector, diasporas and specific European support, and integrating legal mobility into partner countries’ employment and territorial development strategies, an essential condition for shared responsibility and long-term viability.</li>
            </ul>
        `,
        materials: [
            {
                label: 'Descargar Policy Paper (ES)',
                label_en: 'Download Policy Paper (ES)',
                url: '/docs/IEAM-2026-004-ES_vas-legales-crebles.pdf'
            },
            {
                label: 'Download Policy Paper (EN)',
                label_en: 'Download Policy Paper (EN)',
                url: '/docs/IEAM-2026-004-EN_credible-legal-pathways.pdf'
            },
            {
                label: 'Télécharger le document (FR)',
                label_en: 'Download Policy Paper (FR)',
                url: '/docs/IEAM-2026-004-FR_voies-lgales-crdibles.pdf'
            }
        ],
        relatedArticles: [
            {
                id: 'enfoque-por-rutas-2026',
                title: 'Enfoque por rutas',
                title_en: 'Route-based approach',
                image: '/images/informe-3-2026-ES.jpg',
                badge: 'Policy Brief',
                metadata: { date: '10 Abr 2026', readTime: '10 min' }
            },
            {
                id: 'diplomacia-migratoria-2026',
                title: 'Diplomacia migratoria euroafricana',
                title_en: 'Euro-African migration diplomacy',
                image: '/images/informe-2-2026-ES.png',
                badge: 'Policy Brief',
                metadata: { date: '08 Abr 2026', readTime: '12 min' }
            }
        ]
    },

    {
        slug: 'enfoque-por-rutas-2026',
        type: 'Policy Brief',
        type_en: 'Policy Brief',
        contentKind: 'policy',
        category: 'Migración · Seguridad',
        category_en: 'Migration · Security',
        title: 'Enfoque por rutas: ¿Reducir los flujos visibles o reducir las vulnerabilidades?',
        title_en: 'Route-based approach: Reducing visible flows or reducing vulnerabilities?',
        subtitle: 'Hacia una estrategia coherente de protección y lucha contra las economías criminales.',
        subtitle_en: 'Towards a coherent strategy for protection and the fight against criminal economies.',
        heroImage: '/images/informe-3-2026-ES.jpg',
        heroImage_en: '/images/informe-3-2026-EN.jpg',
        mainImage: '/images/informe-3-2026-ES.jpg',
        mainImage_en: '/images/informe-3-2026-EN.jpg',
        mainImageCaption: 'Enfoque por rutas: vulnerabilidades y economías criminales en corredores migratorios.',
        mainImageCaption_en: 'Route-based approach: vulnerabilities and criminal economies in migration corridors.',
        publishDate: '10 Abr 2026',
        readTime: '10 min',
        author: {
            name: 'Equipo IEAM',
            name_en: 'IEAM Team',
            role: 'Investigación',
            role_en: 'Research',
            image: '/favicon-new.png',
            bio: 'Unidad de investigación del IEAM.',
            bio_en: 'IEAM Research Unit.'
        },
        content: `
            <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Resumen ejecutivo</h3>
            <p>El presente Policy Paper propone orientaciones estratégicas destinadas a reducir las vulnerabilidades a lo largo de las rutas migratorias y a debilitar las economías criminales que las estructuran, superando un enfoque centrado únicamente en la reducción de los flujos visibles. El objetivo es promover una estrategia coherente que combine la protección de las personas migrantes con la lucha contra los mecanismos de explotación.</p>
            <p>Este documento se inscribe en la continuidad de los trabajos del Instituto Español de Análisis Migratorio (IEAM) y constituye el resultado de un taller de inteligencia colectiva organizado en Roma, conjuntamente por el IEAM y el centro de investigación independiente italiano AMIStaDeS.</p>
            <p>El taller reunió a un amplio abanico de actores clave, incluidos representantes de agencias de las Naciones Unidas, instituciones europeas, representantes ministeriales, organizaciones humanitarias y de la sociedad civil, empresas, así como expertos africanos. Esta diversidad permitió cruzar perspectivas institucionales, operacionales y analíticas sobre las dinámicas de los corredores migratorios euroafricanos. También contribuyó a identificar puntos de convergencia, formular recomendaciones y esbozar las primeras líneas de acción orientadas a reforzar la coherencia entre las políticas de seguridad, humanitarias y de desarrollo.</p>
            <p>El análisis de este Policy Paper se enmarca en un contexto en el que las rutas migratorias funcionan como un sistema regional integrado, estructurado por movimientos mixtos, tanto regulares como irregulares. Las políticas basadas en un control puntual de seguridad tienden a producir efectos de desplazamiento de los corredores, a incrementar los costes de tránsito y a trasladar los riesgos hacia segmentos menos vigilados, sin reducir los incentivos económicos subyacentes.</p>
            <p>A esta dinámica de desplazamiento se suma una vulnerabilidad acumulativa creciente: a medida que los trayectos se prolongan, las personas en situación de movilidad quedan expuestas a un deterioro progresivo de su salud física y mental. Asimismo, se enfrentan a un endeudamiento coercitivo con respecto a las redes de facilitación, así como a formas de explotación diferenciadas en función del género.</p>
            <p>Por otra parte, las economías del tránsito aglutinan una pluralidad de actores – desde redes criminales hasta ciertos segmentos paraestatales –, cuya rentabilidad tiende a consolidarse cuando la presión securitaria se intensifica.</p>

            <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Mensajes estratégicos</h3>
            <ul class="list-disc pl-6 mb-4 space-y-4">
                <li><strong>Reducir la porosidad institucional en las zonas de tránsito:</strong> reforzar las capacidades operativas de los pasos fronterizos, instaurar mecanismos de supervisión interna independiente, formar a los agentes en los estándares internacionales de protección, y promover alternativas económicas focalizadas para reducir la dependencia local de los ingresos vinculados a la facilitación migratoria.</li>
                <li><strong>Actuar sobre la rentabilidad de las economías de facilitación y no solo sobre los flujos visibles:</strong> estructurar investigaciones financieras coordinadas por corredor, mejorar la trazabilidad de los pagos transnacionales, identificar a los intermediarios logísticos y a los beneficiarios reales, más allá de los simples puntos de interceptación.</li>
                <li><strong>Garantizar una continuidad protectora a lo largo de los corredores:</strong> superar la perspectiva de un único Estado para cubrir la totalidad del trayecto – desde el origen hasta el destino – mediante mecanismos de denuncia accesibles y seguros, acompañamiento psicosocial y asistencia jurídica, así como una coordinación transnacional del seguimiento de casos.</li>
                <li><strong>Integrar la demanda estructural de mano de obra en la estrategia migratoria:</strong> articular las políticas migratorias y laborales, establecer dispositivos focalizados de movilidad legal en los sectores de alta demanda, y colaborar con las redes de diáspora para proporcionar información fiable y prevenir riesgos, con el fin de reducir la dependencia de las cadenas informales.</li>
                <li><strong>Alinear la coordinación operativa con la realidad transnacional de las rutas:</strong> crear plataformas técnicas para el intercambio de información y el seguimiento longitudinal de las dinámicas de los corredores, en las que participen organizaciones internacionales y Estados africanos socios, para garantizar la apropiación y la sostenibilidad de los dispositivos desplegados.</li>
            </ul>
        `,
        content_en: `
            <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Executive Summary</h3>
            <p>This Policy Paper proposes strategic guidelines aimed at reducing vulnerabilities along migration routes and undermining the criminal economies that structure them, moving beyond an approach focused solely on reducing visible flows. The aim is to promote a coherent strategy that combines the protection of migrants with the fight against mechanisms of exploitation.</p>
            <p>This document forms part of the ongoing work of the Spanish Institute for Migration Analysis (IEAM) and is the result of a collective intelligence workshop organised in Rome jointly by the IEAM and the independent Italian research centre AMIStaDeS.</p>
            <p>The workshop brought together a wide range of key stakeholders, including representatives from United Nations agencies, European institutions, government ministries, humanitarian and civil society organisations, businesses, as well as African experts. This diversity enabled the exchange of institutional, operational and analytical perspectives on the dynamics of Euro-African migration corridors. It also helped to identify points of convergence, formulate recommendations and outline initial lines of action aimed at strengthening coherence between security, humanitarian and development policies.</p>
            <p>The analysis in this Policy Paper is set against a backdrop in which migration routes function as an integrated regional system, structured by mixed movements, both regular and irregular. Policies based on ad hoc security controls tend to displace migration corridors, increase transit costs and shift risks to less monitored segments, without reducing the underlying economic incentives.</p>
            <p>Added to this displacement dynamic is a growing cumulative vulnerability: as journeys are prolonged, people on the move are exposed to a progressive deterioration in their physical and mental health. Furthermore, they face coercive indebtedness to facilitation networks, as well as forms of exploitation that differ according to gender.</p>
            <p>Furthermore, transit economies bring together a diverse range of actors – from criminal networks to certain parastatal entities – whose profitability tends to increase as security pressures intensify.</p>

            <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Strategic Messages</h3>
            <ul class="list-disc pl-6 mb-4 space-y-4">
                <li><strong>Reduce institutional porosity in transit zones:</strong> strengthen the operational capacities of border crossings, establish independent internal oversight mechanisms, train officials in international protection standards, and promote targeted economic alternatives to reduce local dependence on income linked to migration facilitation.</li>
                <li><strong>Address the profitability of facilitation economies and not just visible flows:</strong> structure coordinated financial investigations by corridor, improve the traceability of transnational payments, and identify logistical intermediaries and beneficial owners, going beyond mere interception points.</li>
                <li><strong>Ensure protective continuity along the corridors:</strong> move beyond the perspective of a single state to cover the entire journey – from origin to destination – through accessible and secure reporting mechanisms, psychosocial support and legal assistance, as well as transnational coordination of case follow-up.</li>
                <li><strong>Integrate the structural demand for labour into the migration strategy:</strong> align migration and labour policies, establish targeted legal mobility schemes in high-demand sectors, and collaborate with diaspora networks to provide reliable information and prevent risks, with the aim of reducing dependence on informal networks.</li>
                <li><strong>Align operational coordination with the transnational reality of the routes:</strong> create technical platforms for information exchange and the longitudinal monitoring of corridor dynamics, involving international organisations and partner African states, to ensure ownership and the sustainability of the mechanisms deployed.</li>
            </ul>
        `,
        materials: [
            {
                label: 'Descargar Policy Paper (ES)',
                label_en: 'Download Policy Paper (ES)',
                url: '/docs/IEAM-2026-003-ES_enfoque-por-rutas.pdf'
            },
            {
                label: 'Download Policy Paper (EN)',
                label_en: 'Download Policy Paper (EN)',
                url: '/docs/IEAM-2026-003-EN_route-based-approach.pdf'
            },
            {
                label: 'Télécharger le document (FR)',
                label_en: 'Download Policy Paper (FR)',
                url: '/docs/IEAM-2026-003-FR_approche-par-routes.pdf'
            }
        ],
        relatedArticles: [
            {
                id: 'diplomacia-migratoria-2026',
                title: 'Diplomacia migratoria euroafricana',
                title_en: 'Euro-African migration diplomacy',
                image: '/images/informe-2-2026-ES.jpg',
                badge: 'Policy Brief',
                metadata: { date: '08 Abr 2026', readTime: '12 min' }
            },
            {
                id: 'movilidad-africa-occidental',
                title: 'Reformar la gobernanza de la movilidad en África Occidental',
                title_en: 'Reforming Mobility Governance in West Africa',
                image: '/images/informeafricaes.jpg',
                badge: 'Informe',
                metadata: { date: '23 Dec 2025', readTime: '15 min' }
            }
        ]
    },
    {
        slug: 'diplomacia-migratoria-2026',
        type: 'Policy Brief',
        type_en: 'Policy Brief',
        contentKind: 'policy',
        category: 'Migración · Diplomacia',
        category_en: 'Migration · Diplomacy',
        title: 'Diplomacia migratoria UE–África',
        title_en: 'EU–Africa Migration Diplomacy',
        subtitle: 'De la gestión de los flujos a la coherencia estratégica',
        subtitle_en: 'From Flow Management to Strategic Coherence',
        heroImage: '/images/informe-2-2026-ES.png',
        heroImage_en: '/images/informe-2-2026-EN.png',
        mainImage: '/images/informe-2-2026-ES.png',
        mainImage_en: '/images/informe-2-2026-EN.png',
        mainImageCaption: 'Diplomacia migratoria UE–África.',
        mainImageCaption_en: 'EU–Africa Migration Diplomacy',
        publishDate: '08 Abr 2026',
        readTime: '12 min',
        author: {
            name: 'Equipo IEAM',
            name_en: 'IEAM Team',
            role: 'Investigación',
            role_en: 'Research',
            image: '/favicon-new.png',
            bio: 'Unidad de investigación del IEAM.',
            bio_en: 'IEAM Research Unit.'
        },
        content: `
            <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Resumen ejecutivo</h3>
            <p>El presente Policy Paper propone orientaciones estratégicas para reforzar la coherencia de la diplomacia migratoria entre la Unión Europea y sus socios africanos, superando un enfoque centrado únicamente en la gestión de flujos, con el fin de promover una visión más integrada y sostenible de la movilidad.</p>
            <p>Este documento se inscribe en la continuidad de los trabajos del Instituto Español de Análisis Migratorio (IEAM) y constituye el resultado de un taller de inteligencia colectiva organizado en Roma, conjuntamente por el IEAM y el centro de investigación independiente italiano AMIStaDeS.</p>
            <p>El taller reunió a un amplio grupo de actores clave, incluidos representantes de agencias de la ONU, instituciones europeas, representantes ministeriales, organizaciones humanitarias, empresas y de la sociedad civil, así como expertos africanos. Esta diversidad de actores permitió compartir perspectivas institucionales, operativas y analíticas sobre las dinámicas de movilidad euroafricana. Asimismo, contribuyó a identificar puntos de convergencia, formular recomendaciones y esbozar líneas de acción destinadas a reforzar la coherencia estratégica entre las políticas migratorias, de desarrollo y de cooperación internacional.</p>
            <p>El análisis de este Policy Paper se sitúa en un contexto de profunda recomposición de la diplomacia migratoria euroafricana, marcado por la implementación del Pacto Europeo sobre Migración y Asilo, la multiplicación de iniciativas bilaterales, así como la reconfiguración geopolítica del Sahel y sus rutas migratorias. En este contexto, la gobernanza de la movilidad adolece menos de la falta de instrumentos que de un déficit de articulación estratégica: las iniciativas se acumulan sin una arquitectura integrada, generando fragmentación, dinámicas de desplazamiento de rutas e inestabilidad en las relaciones UE–África. A esta fragmentación se suma una discrepancia estructural entre las decisiones políticas a corto plazo – dictadas por los ciclos electorales y la presión mediática – y el tiempo necesario a largo plazo de los mecanismos estructurales, como el empleo, la formación, la movilidad legal y la gobernanza.</p>
            
            <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Mensajes estratégicos</h3>
            <ul class="list-disc pl-6 mb-4 space-y-4">
                <li><strong>Aclarar la doctrina pública de la diplomacia migratoria:</strong> definiendo de forma explícita los objetivos perseguidos y los instrumentos movilizados, precisando la articulación entre seguridad, movilidad legal y desarrollo, jerarquizando las prioridades operativas y alineando la comunicación pública con esa doctrina de manera coherente y continua, con independencia de las coyunturas electorales.</li>
                <li><strong>Reducir la fragmentación mediante una coordinación regional mínima:</strong> inscribiendo los acuerdos bilaterales en un marco regional que permita anticipar los efectos de desplazamiento y limitar las consecuencias negativas en los corredores vecinos, integrando de forma sistemática la dimensión humanitaria y los riesgos añadidos para las personas migrantes durante las reorientaciones de rutas.</li>
                <li><strong>Garantizar la previsibilidad de los compromisos:</strong> mediante marcos financieros y jurídicos plurianuales, una mayor continuidad normativa y el mantenimiento de los mecanismos más allá de los ciclos políticos, como condición esencial para la credibilidad de las asociaciones.</li>
                <li><strong>Construir una reciprocidad efectiva:</strong> adaptando las estrategias a los contextos nacionales africanos, promoviendo un codesarrollo con efectos medibles sobre el terreno y garantizando un acceso real a las vías legales de movilidad.</li>
                <li><strong>Reforzar la rendición de cuentas:</strong> mediante una evaluación independiente que integre indicadores sistémicos – como el desplazamiento de rutas, los impactos regionales y la protección internacional –, elaborados conjuntamente con los socios africanos y hechos públicos para convertir los compromisos políticos en marcos operativos verificables.</li>
            </ul>
        `,
        content_en: `
            <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Executive Summary</h3>
            <p>This Policy Paper proposes strategic guidance to strengthen the coherence of migration diplomacy between the European Union and its African partners, moving beyond an approach focused solely on flow management to promote a more integrated and sustainable vision of mobility.</p>
            <p>Building on the work of the Spanish Institute for Migration Analysis (IEAM), this document is the result of a collective intelligence workshop organized in Rome, jointly by the IEAM and the independent Italian research center AMIStaDeS.</p>
            <p>The workshop brought together a broad group of key stakeholders, including representatives from UN agencies, European institutions, national ministries, humanitarian and civil society organizations, as well as African experts. This diversity of participants enabled the exchange of institutional, operational, and analytical perspectives on Euro-African mobility dynamics. It also helped identify areas of convergence, formulate recommendations, and outline courses of action aimed at strengthening strategic coherence across migration, development, and international cooperation policies.</p>
            <p>The analysis presented in this Policy Paper takes place within a context of profound reconfiguration of Euro-African migration diplomacy, marked by the implementation of the European Pact on Migration and Asylum, the proliferation of bilateral initiatives, and the geopolitical reshaping of the Sahel and its migration routes. In this context, mobility governance suffers less from a lack of instruments than from a deficit of strategic coordination: initiatives accumulate without an integrated framework, generating fragmentation, route-shifting dynamics, and instability in EU–Africa relations. This fragmentation is further compounded by a structural mismatch between short-term political decisions – driven by electoral cycles and media pressure – and the time needed to act on structural levers such as employment, training, legal mobility, and governance.</p>
            
            <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Strategic Messages</h3>
            <ul class="list-disc pl-6 mb-4 space-y-4">
                <li><strong>Clarify the public doctrine of migration diplomacy:</strong> explicitly define the objectives pursued and the instruments deployed, clarify the links between security, legal mobility, and development, prioritize operational objectives, and align public communication with this doctrine in a coherent and consistent manner, regardless of electoral or political cycles.</li>
                <li><strong>Reduce fragmentation through minimal regional coordination:</strong> embed bilateral agreements within a regional framework that allows anticipating displacement effects and limiting negative consequences on neighboring corridors, while systematically integrating the humanitarian dimension and the increased risks for migrants during route diversions.</li>
                <li><strong>Ensure the predictability of commitments:</strong> establish multiannual financial and legal frameworks, strengthen regulatory continuity, and maintain mechanisms beyond political cycles, a condition essential to the credibility of partnerships.</li>
                <li><strong>Build effective reciprocity:</strong> adapt strategies to African national contexts, promote co-development with measurable impacts on the ground, and ensure genuine access to legal mobility pathways.</li>
                <li><strong>Strengthen accountability:</strong> establish an independent evaluation integrating systemic indicators – such as route shifts, regional impacts, and international protection – developed jointly with African partners and made public, in order to transform political commitments into verifiable operational frameworks.</li>
            </ul>
        `,
        materials: [
            {
                label: 'Descargar Policy Paper (ES)',
                label_en: 'Download Policy Paper (ES)',
                url: '/docs/IEAM-2026-002-ES_diplomacia-migratoria.pdf'
            },
            {
                label: 'Download Policy Paper (EN)',
                label_en: 'Download Policy Paper (EN)',
                url: '/docs/IEAM-2026-002-EN_migration-diplomacy.pdf'
            },
            {
                label: 'Télécharger le document (FR)',
                label_en: 'Download Policy Paper (FR)',
                url: '/docs/IEAM-2026-002-FR_diplomatie-migratoire.pdf'
            }
        ],
        relatedArticles: []
    },
    {
        slug: 'informe-rutas-migratorias-2026-parte-2',
        type: 'Informe',
        type_en: 'Report',
        contentKind: 'policy',
        category: 'Migración · Fronteras',
        category_en: 'Migration · Borders',
        title: 'Migraciones y migrantes. ¿Cómo estudiar la irregularidad en los procesos migratorios? España: un estudio de caso (Parte II)',
        title_en: 'Migration and Migrants: How to Study Irregularity in Migration Processes? Spain: A Case Study (Part II)',
        subtitle: 'Análisis de los procesos de regularización, características de los migrantes en situación irregular y los desafíos administrativos y humanitarios en España.',
        subtitle_en: 'Analysis of regularization processes, characteristics of irregular migrants, and administrative and humanitarian challenges in Spain.',
        heroImage: '/images/informe-es-rutasmigratorias2.png',
        heroImage_en: '/images/informe-en-rutasmigratorias2.png',
        mainImage: '/images/informe-es-rutasmigratorias2.png',
        mainImage_en: '/images/informe-en-rutasmigratorias2.png',
        mainImageCaption: 'Portada del informe: Migraciones y Migrantes (Parte II).',
        mainImageCaption_en: 'Report cover: Migrations and Migrants (Part II).',
        publishDate: '10 Mar 2026',
        readTime: '25 min',
        author: {
            name: 'Dolores López',
            role: 'Investigadora asociada',
            role_en: 'Associate Researcher',
            image: '/team/member-5.jpg',
            bio: 'Pamplona (España). Dolores López es licenciada en Geografía e Historia y doctora en Geografía por nuestra Universidad, además de contar con un Máster en Demografía por la London School of Economics (LSE). Es catedrática de Geografía Humana en la Facultad de Filosofía y Letras. Sus líneas de investigación se enmarcan en los estudios de familia, mortalidad y migraciones.',
            bio_en: 'Pamplona (Spain). Dolores López holds a degree in Geography and History and a PhD in Geography, in addition to a Master\'s in Demography from the London School of Economics (LSE). She is a Professor of Human Geography. Her research focuses on family studies, mortality, and migrations.'
        },
        content: `
      <p>Las migraciones irregulares hacia Europa y hacia España han experimentado transformaciones profundas en la última década, con cambios en la intensidad de los flujos, reconfiguración de las rutas y una presión sostenida sobre determinados territorios fronterizos. En paralelo, se han consolidado respuestas institucionales cada vez más apoyadas en el control fronterizo y la cooperación con países de origen y tránsito, mientras persisten desafíos humanitarios y limitaciones para medir con precisión el fenómeno, especialmente en lo relativo a muertes y desapariciones.</p>
      <p>Este informe se ha compuesto de dos partes, la primera, publicada en diciembre de 2025, analizó la evolución de la migración irregular hacia España en el marco europeo, examinando tendencias y flujos, rutas utilizadas y desafíos asociados a los sistemas de acogida y protección internacional, con especial atención a la centralidad de la ruta atlántica y la presión sobre Canarias La segunda parte analiza los procesos de regularización, las características de los migrantes en situación irregular y los desafíos administrativos y humanitarios relacionados con su integración. Se repasa, en particular, la evolución de las políticas españolas desde la década de 1980, poniendo el énfasis en los procesos de arraigo (familiar, social, profesional o formativo). Se incorpora el contexto histórico de una España que fue durante décadas un país de emigración y que desarrolló su marco normativo y su sistema estadístico “en paralelo” al aumento de la inmigración, con lagunas de información que aún afectan al seguimiento de algunos procedimientos administrativos. Se presta especial atención a los menores extranjeros no acompañados (MENA) y a las dinámicas territoriales de su distribución. Por último, se examinan los procedimientos de repatriación, revelando las tensiones entre el marco legal, las realidades migratorias y las capacidades institucionales.</p>
      <p>España se consolidó como país receptor de migración antes de disponer de una política migratoria plenamente desarrollada, lo que dio lugar a sucesivos procesos de regularización extraordinaria para otorgar permisos a personas ya residentes en el país. Desde 1985 se han sucedido múltiples regularizaciones (ocho procesos extraordinarios previos al aprobado el 27 de enero de 2026). Estos procesos han configurado un régimen migratorio que combina vías ordinarias con mecanismos de regularización posterior, especialmente a través del arraigo.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Conclusiones principales</h3>

      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">1. El arraigo como palanca de regularización</h4>
      <p>Desde 2025, España ha institucionalizado los procesos de regularización de la población extranjera en situación irregular por motivo de arraigo, reemplazando progresivamente las regularizaciones extraordinarias.</p>
      <p>Los datos muestran un fuerte aumento de los permisos de residencia concedidos por arraigo familiar (65 % de los casos), con una predominancia de ciudadanos peruanos y cubanos. El arraigo por formación representa alrededor del 20% y el arraigo social cerca del 13%, mientras que el arraigo laboral es residual (≈1%). En el perfil por edad, predominan los grupos de 25–34 y 35–44 años; en el arraigo familiar hay mayor presencia femenina, mientras que el arraigo laboral y el arraigo por formación muestran mayor presencia masculina.</p>
      <p>Este enfoque también incluye una simplificación de los criterios para poder presentar una solicitud de regularización, con la reducción a dos años del tiempo de residencia en España requerido.</p>

      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">2. Una evolución del perfil demográfico de las personas migrantes</h4>
      <p>Los datos sobre las personas titulares de un permiso de residencia por motivo de arraigo revelan que la nacionalidad de los beneficiarios refleja el origen de los flujos irregulares recientes o de situaciones de irregularidad vinculadas a la expiración de autorizaciones previas.</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Colombia, Marruecos y Perú</strong> se encuentran entre las principales nacionalidades afectadas, siendo los colombianos los que ocupan actualmente el primer lugar, y su presencia ha aumentado significativamente en los últimos meses.</li>
        <li>Entre las 20 principales nacionalidades, la mayoría procede de América Latina, complementada por algunos países africanos (Marruecos, Senegal, Argelia), un país asiático (Pakistán) y un país europeo (Rusia).</li>
      </ul>
      <p>Esta diversidad refleja una mutación del perfil migratorio, con un notable incremento de los ciudadanos latinoamericanos entre las personas regularizadas por arraigo, en comparación con la década anterior, cuando la composición nacional era muy diferente.</p>

      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">3. Los MENA: un desafío humanitario y logístico</h4>
      <p>El número de menores extranjeros no acompañados (MENA) ha aumentado considerablemente en los últimos años. La gran mayoría de los menores son niños, especialmente entre los africanos (95 % de los marroquíes, 97 % de los argelinos y senegaleses, 98 % de los gambianos), mientras que entre los menores procedentes de América, las niñas son más numerosas que los niños.</p>
      <p>La distribución territorial de los MENA sigue siendo desigual a pesar de los mecanismos de solidaridad entre comunidades autónomas. Algunas regiones, como Canarias, están fuertemente solicitadas con más de 5 800 MENA, seguidas por Cataluña (2 242), Andalucía (1 376), el País Vasco (900) y la ciudad autónoma de Ceuta (450), mientras que otras comunidades cuentan con capacidades excedentes. La armonización de los datos relativos a la presencia de los MENA es esencial para organizar una distribución solidaria entre los territorios.</p>
      <p>Los MENA residen en centros de acogida para menores, pudiendo convivir o no con menores españoles colocados en familias de acogida. Estudios recientes sobre estos centros muestran que la saturación de las estructuras limita la capacidad de acogida y pone de relieve las tensiones entre las necesidades humanitarias, los recursos logísticos y los sistemas de protección infantil.</p>

      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">4. Expulsiones poco frecuentes y selectivas</h4>
      <p>A pesar de un marco legal estricto (la irregularidad documental se considera una infracción grave), las órdenes de expulsión efectivas siguen siendo marginales: en 2024, solo representaron el 2,8 % de las órdenes de expulsión dictadas. Esta brecha debe entenderse también a la luz de la jurisprudencia: la Sentencia del Tribunal Supremo nº 366/2021 (siguiendo doctrina del TJUE) reduce el automatismo entre estancia irregular y expulsión, reforzando el principio de proporcionalidad y la necesidad de circunstancias agravantes para aplicar la expulsión frente a la multa.</p>
      <p>Los obstáculos incluyen la dificultad de notificar o localizar a la persona afectada por la orden de expulsión, los procedimientos judiciales que interrumpen su ejecución (recursos, solicitudes de protección internacional o de asilo), la negativa o las restricciones de los países de origen para acoger a sus ciudadanos, así como la falta de recursos del Estado para tramitar un número elevado de expedientes de expulsión. Hay dos elementos operativos a tener en cuenta: (i) la diferencia institucional entre quienes dictan órdenes (delegados/subdelegados del Gobierno) y quienes las ejecutan (Fuerzas y Cuerpos de Seguridad), y (ii) la posibilidad de que una solicitud de arraigo (si se cumplen requisitos y no hay delitos graves) conlleve la revocación de la orden. También se subraya el papel de la cooperación consular y de las relaciones bilaterales (incluyendo casos de bloqueo) en la viabilidad de los retornos.</p>

      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">5. Un sistema en tensión entre control e integración</h4>
      <p>La legislación española se caracteriza por una oscilación entre la rigidez en el control de la inmigración irregular (la irregularidad administrativa se considera una infracción grave) y el pragmatismo en materia de integración (especialmente a través de los procesos de regularización por arraigo). Esta tensión se ve acentuada por el aumento de las solicitudes de asilo y de protección internacional, que, aunque no se refieren estrictamente a la migración irregular, se inscriben en el mismo marco de trayectorias migratorias complejas.</p>
      <p>A pesar de un aumento considerable en el número de solicitudes de protección internacional, con una presencia significativa de nacionales de Venezuela, Colombia y Malí entre los principales países de origen, la tasa de reconocimiento efectivo permanece relativamente baja, ya que una parte importante de las solicitudes es denegada, archivada o recibe una decisión desfavorable. Además, la elevada carga de trabajo y la falta de personal suficientemente capacitado para tramitar estos expedientes prolonga los plazos y da lugar a una categoría de personas en «espera de admisión», cuya vulnerabilidad sigue siendo alta.</p>
      <p>Paralelamente, el éxito limitado de las expulsiones efectivas pone de relieve las limitaciones de la aplicación estricta del control migratorio. Frente a estas limitaciones, España ha adoptado progresivamente enfoques más integradores. La generalización del recurso al arraigo permite regularizar las migraciones anteriores irregulares o derivadas de la pérdida de estatus. Estas dinámicas reflejan un sistema migratorio en tensión permanente entre objetivos de regulación/disuasión y necesidades de integración social y económica, que recae sobre las administraciones, los servicios sociales y los actores locales encargados de la acogida y el acompañamiento de las personas migrantes.</p>
      <p>La segunda parte del informe muestra que España se ha convertido en un destino migratorio importante, donde las políticas migratorias buscan conciliar el control de los flujos con la integración de los migrantes ya presentes. Los procesos de arraigo, aunque criticados por su selectividad, ofrecen una vía de regularización masiva, mientras que los desafíos humanitarios, en particular los relacionados con los MENA, y los desafíos administrativos, especialmente las expulsiones, persisten. La cooperación interterritorial y la reforma de los procedimientos aparecen como palancas esenciales para reforzar la eficacia de la gobernanza migratoria. De esta segunda parte se desprenden tres necesidades transversales: mejorar la comparabilidad y disponibilidad de datos administrativos (incluidos retornos), reforzar capacidades de acogida y protección infantil para menores y jóvenes extutelados, y ajustar recursos y procedimientos para reducir cuellos de botella (asilo/retorno) sin debilitar las garantías jurídicas.</p>
    `,
        content_en: `
      <p>Irregular migration to Europe and Spain has undergone profound transformations over the past decade, with changes in flow intensity, route reconfiguration, and sustained pressure on specific border areas. At the same time, institutional responses have increasingly relied on border control and cooperation with countries of origin and transit, while humanitarian challenges and limitations in accurately measuring the phenomenon persist, particularly regarding deaths and disappearances.</p>
      <p>This report is divided into two parts. The first part, published in December 2025, analyzed the evolution of irregular migration to Spain within the European context, examining trends and flows, routes used, and challenges related to reception and international protection systems, with particular attention to the centrality of the Atlantic route and pressure on the Canary Islands. The second part examines regularization processes, the characteristics of migrants in irregular status, and the administrative and humanitarian challenges associated with their integration. It reviews the evolution of Spanish policies since the 1980s, with a focus on arraigo (roots procedure). The report also considers the historical context of Spain as a country of emigration for decades, developing its regulatory framework and statistical system “in parallel” with increasing immigration, leaving gaps that still affect the monitoring of some administrative procedures. Special attention is given to unaccompanied foreign minors (UAMs) and the territorial dynamics of their distribution. Finally, repatriation procedures are examined, highlighting tensions between legal frameworks, migration realities, and institutional capacities.</p>
      <p>Spain became a receiving country before having a fully developed migration policy, which led to successive extraordinary regularization processes granting residence permits to people already living in the country. Since 1985, multiple regularizations have taken place (eight extraordinary processes prior to the one approved on 27 January 2026). These processes created a migration regime combining ordinary channels with subsequent regularization mechanisms, especially through arraigo.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Main Findings</h3>

      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">1. Arraigo as a tool for regularization</h4>
      <p>Since 2025, Spain has institutionalized regularization processes for irregular migrants based on arraigo, progressively replacing extraordinary regularizations.</p>
      <p>Data shows a strong increase in residence permits granted for family arraigo (65% of cases), predominantly to Peruvian and Cuban nationals. Educational arraigo accounts for around 20%, social arraigo approximately 13%, while labor arraigo is residual (~1%). Age groups 25–34 and 35–44 predominate; family arraigo has a higher female presence, whereas labor and educational arraigo are mostly male.</p>
      <p>The approach also simplifies criteria for submitting a regularization application, reducing the required residence period in Spain to two years.</p>

      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">2. Evolution of the demographic profile of migrants</h4>
      <p>Data on residence permits granted through arraigo shows that beneficiaries’ nationalities reflect recent irregular flows or situations of irregularity linked to the expiration of previous authorizations.</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Colombia, Morocco, and Peru</strong> are among the main nationalities affected, with Colombians currently in first place and a significant recent increase in their numbers.</li>
        <li>Among the top 20 nationalities, most come from Latin America, supplemented by some African countries (Morocco, Senegal, Algeria), one Asian country (Pakistan), and one European country (Russia).</li>
      </ul>
      <p>This diversity reflects a transformation of the migrant profile, with a notable increase in Latin American citizens among those regularized through arraigo, compared to the previous decade when the national composition was very different.</p>

      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">3. Unaccompanied minors (UAMs): a humanitarian and logistical challenge</h4>
      <p>The number of unaccompanied foreign minors (UAMs) has increased considerably in recent years. The vast majority are boys, particularly among African nationals (95% of Moroccans, 97% of Algerians and Senegalese, 98% of Gambians), while among minors from the Americas, girls are more numerous.</p>
      <p>The territorial distribution of UAMs remains unequal despite solidarity mechanisms between autonomous regions. Some regions, such as the Canary Islands, are heavily impacted with over 5,800 UAMs, followed by Catalonia (2,242), Andalusia (1,376), the Basque Country (900), and the autonomous city of Ceuta (450), while other regions have surplus capacity. Harmonizing UAM presence data is essential to organize equitable distribution.</p>
      <p>UAMs reside in reception centers and may live with Spanish minors placed in foster families. Recent studies show that overcrowding limits reception capacity and highlights tensions between humanitarian needs, logistical resources, and child protection systems.</p>

      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">4. Expulsions remain rare and selective</h4>
      <p>Despite a strict legal framework (document irregularity is considered a serious offense), effective expulsion orders remain marginal: in 2024, they accounted for only 2.8% of all issued expulsion orders. This gap is also explained by jurisprudence: Supreme Court Ruling No. 366/2021 (following CJEU doctrine) reduces the automatic link between irregular stay and expulsion, reinforcing proportionality and requiring aggravating circumstances for expulsion over fines.</h4>
      <p>Obstacles include difficulty notifying or locating the affected person, judicial proceedings interrupting enforcement (appeals, international protection or asylum requests), refusal or limitations from countries of origin to accept their citizens, and insufficient state resources to process a high number of cases. Two operational factors are relevant: (i) the institutional difference between those issuing orders (government delegates/subdelegates) and those executing them (security forces), and (ii) the possibility that an arraigo request (if requirements are met and no serious crimes are involved) may revoke an expulsion order. Consular cooperation and bilateral relations (including blocked cases) are also crucial for feasible returns.</p>

      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">5. A system balancing control and integration</h4>
      <p>Spanish legislation oscillates between strict control of irregular migration (administrative irregularity is a serious offense) and pragmatism regarding integration (particularly through arraigo regularizations). This tension is heightened by increasing asylum and international protection applications, which, while not strictly irregular migration, fall within the same complex migration trajectory framework.</p>
      <p>Despite a significant rise in international protection applications, with Venezuelans, Colombians, and Malians among the main origin countries, recognition rates remain relatively low, as many applications are rejected, archived, or receive an unfavorable decision. High workload and lack of trained staff also prolong processing times, creating a category of people “awaiting admission,” whose vulnerability remains high.</p>
      <p>Similarly, the limited success of effective expulsions highlights constraints in strict enforcement. Spain has gradually adopted more integrative approaches. The widespread use of arraigo allows for the regularization of previous irregularities or those arising from loss of status. These dynamics reflect a migration system in constant tension between regulation/deterrence objectives and social/economic integration needs, which falls on administrations, social services, and local actors managing reception and support for migrants.</p>
      <p>The second part of the report shows that Spain has become a major migration destination, where policies aim to reconcile flow control with integration of existing migrants. Arraigo processes, while selective, provide a pathway for large-scale regularization, while humanitarian challenges, particularly regarding UAMs, and administrative challenges, especially expulsions, persist. Interterritorial cooperation and procedural reform emerge as essential levers to strengthen migration governance effectiveness. Three cross-cutting needs are identified: improving comparability and availability of administrative data (including returns), reinforcing child and youth protection capacities, and adjusting resources and procedures to reduce bottlenecks (asylum/return) without weakening legal safeguards.</p>
    `,
        materials: [
            { label: 'Descargar Informe', label_en: 'Download Report', url: '/docs/IEAM-2026-001-ES_rutas-migratorias_2.pdf' }
        ],
        relatedArticles: [
            {
                id: 'informe-rutas-migratorias-2025',
                title: 'Migraciones y migrantes (I)',
                title_en: 'Migration and Migrants (I)',
                image: '/images/informe-es-rutasmigratorias.jpg',
                badge: 'Informe',
                metadata: {
                    date: '22 Dec 2025',
                    readTime: '25 min'
                }
            }
        ]
    },
    {
        slug: 'eeuu-75-paises-excluidos',
        type: 'Infografía',
        type_en: 'Infographic',
        contentKind: 'infografia',
        category: 'Migración · EEUU',
        category_en: 'Migration · USA',
        title: '75 países excluidos de la inmigración legal permanente a Estados Unidos',
        title_en: '75 countries excluded from permanent legal immigration to the United States',
        subtitle: 'El anuncio de la administración Trump de una pausa prevista en la emisión de visados permanentes podría modificar significativamente los patrones de inmigración legal permanente.',
        subtitle_en: 'The announcement by the Trump administration of a planned pause on the issuance of permanent visas could significantly reshape patterns of permanent legal immigration.',
        heroImage: '/images/infografía-75paísesexcluidos_ES.png',
        heroImage_en: '/images/Infographic_75countriesexcluded_EN.png',
        mainImage: '/images/infografía-75paísesexcluidos_ES.png',
        mainImage_en: '/images/Infographic_75countriesexcluded_EN.png',
        mainImageCaption: 'Impacto de la pausa administrativa en visados de inmigrante (FY 2024).',
        mainImageCaption_en: 'Impact of the administrative pause on immigrant visas (FY 2024).',
        publishDate: '26 Feb 2026',
        readTime: '6 min',
        author: {
            name: 'Equipo IEAM',
            name_en: 'IEAM Team',
            role: 'Investigación',
            role_en: 'Research',
            image: '/favicon-new.png',
            bio: 'Unidad de datos y análisis del IEAM.',
            bio_en: 'IEAM Data and Analysis Unit.'
        },
        materials: [
            {
                label: 'Descargar Infografía (ES)',
                label_en: 'Download Infographic (ES)',
                url: '/docs/infografía-75paísesexcluidos_ES.pdf'
            },
            {
                label: 'Download Infographic (EN)',
                label_en: 'Download Infographic (EN)',
                url: '/docs/Infographic_75countriesexcluded_EN.pdf'
            }
        ],
        content: `
      <p>El anuncio de la administración Trump de una pausa prevista en la emisión de visados permanentes para posibles inmigrantes procedentes de 75 países podría modificar significativamente los patrones de inmigración legal permanente hacia los Estados Unidos. Al suspender temporalmente la tramitación de visados de inmigrante para un amplio grupo de países, la medida tiene el potencial de afectar a una parte considerable de los solicitantes que buscan la residencia permanente legal. Este análisis del Instituto Español de Análisis de la Migración (IEAM) examina el alcance de estos posibles impactos basándose en los datos sobre visados de inmigrante publicados por el Departamento de Estado de Estados Unidos para el año fiscal 2024.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Proporción de visados de inmigrante de Estados Unidos afectados por la suspensión (año fiscal 2024)</h3>
      <p>En el año fiscal 2024, Estados Unidos emitió un total de 612.258 visados de inmigrante (visados permanentes que permiten a ciudadanos extranjeros entrar en el país y obtener una green card). De ellos, 280.015 visados – casi el 46 % de todos los visados permanentes emitidos ese año – fueron concedidos a nacionales de los 75 países actualmente sujetos a la pausa administrativa. Además, 287.950 visados fueron otorgados a nacionales de países afectados tanto por la pausa como por las prohibiciones o restricciones de viaje previstas para 2025. Estas cifras ponen de relieve la proporción de visados de inmigrante afectados por la suspensión y las restricciones relacionadas, demostrando el impacto significativo sobre los solicitantes.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Países más afectados</h3>
      <p>Los países más afectados por la pausa administrativa son Afganistán, Cuba, Pakistán, Jamaica, Bangladés y Colombia. Según se informa, la pausa tiene como objetivo dar tiempo a la administración para desarrollar nuevos métodos de evaluación destinados a identificar a las personas con probabilidades de convertirse en una «carga pública». Sin embargo, en el año fiscal 2024, solo 1.008 personas de todas las nacionalidades – no únicamente de los 75 países afectados – vieron denegado un visado de inmigrante por este motivo, lo que sugiere que la medida constituye una respuesta política de gran alcance frente a un problema limitado.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Visados de inmigrante emitidos a nacionales de países de África Occidental y del Sahel (año fiscal 2024)</h3>
      <p>En el año fiscal 2024, se emitieron visados de inmigrante a nacionales de varios países de África Occidental y del Sahel. Senegal recibió 1.119 visados y Gambia 792, ambos afectados tanto por la pausa administrativa de los 75 países como por las prohibiciones o restricciones de viaje. En contraste, Mali recibió 275 visados, Níger 155 y Mauritania 128, todos sujetos únicamente a prohibiciones o restricciones de viaje. Estas cifras ilustran el impacto desigual de la pausa administrativa y de las restricciones relacionadas en la región.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Contexto más amplio</h3>
      <p>La lista de los 75 países elaborada por el Departamento de Estado no afecta a las personas que ingresan a Estados Unidos con visados de turista, de trabajo temporal o de estudiante. Tampoco se aplica a quienes ya se encuentran en el país y han solicitado, o solicitarán, una green card. Muchos inmigrantes renuncian a beneficios para los que son elegibles debido a preocupaciones administrativas o por temor a que su uso pueda afectar una futura solicitud de inmigración. Además, las investigaciones muestran de manera consistente que los inmigrantes utilizan los beneficios públicos en menor medida que los estadounidenses nacidos en el país, en parte porque muchos no ciudadanos no son elegibles para la asistencia federal. Este enfoque pasa por alto las contribuciones más amplias de los inmigrantes en términos de capital humano, creación de empleo y emprendimiento.</p>
    `,
        content_en: `
      <p>The announcement by the Trump administration of a planned pause on the issuance of permanent visas for would-be immigrants from 75 countries could significantly reshape patterns of permanent legal immigration to the United States. By temporarily suspending immigrant visa processing for a large group of countries, the measure has the potential to affect a substantial share of applicants seeking lawful permanent residence. This analysis by the Spanish Institute for Migration Analysis (IEAM) examines the scope of these potential impacts based on immigrant visa data published by the U.S. State Department for fiscal year 2024.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Share of U.S. Immigrant Visas Affected by the Suspension (FY 2024)</h3>
      <p>In fiscal year 2024, the United States issued a total of 612,258 immigrant visas (permanent visas that allow foreign nationals to enter the country and obtain a green card). Of these, 280,015 visas – nearly 46% of all permanent visas issued that year – were granted to nationals of the 75 countries now subject to the administrative pause. Additionally, 287,950 visas were issued to nationals of countries impacted by both the pause and the 2025 travel bans or restrictions. These figures highlight the share of immigrant visas affected by the suspension and related restrictions, demonstrating the significant effect on applicants.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Most Affected Countries</h3>
      <p>The countries most affected by the administrative pause are Afghanistan, Cuba, Pakistan, Jamaica, Bangladesh, and Colombia. The pause is reportedly intended to give the administration time to develop new screening methods for individuals likely to become a “public charge.” However, in fiscal year 2024, only 1,008 individuals of all nationalities – not only those from the 75 affected countries – were denied an immigrant visa on these grounds, suggesting that the measure represents a sweeping policy response to a limited problem.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Immigrant Visas Issued to Nationals of West African and Sahel Countries (FY 2024)</h3>
      <p>In fiscal year 2024, immigrant visas were issued to nationals of several West African and Sahel countries. Senegal received 1,119 visas and Gambia 792, both affected by the 75-country pause as well as travel bans or restrictions. In contrast, Mali received 275 visas, Niger 155, and Mauritania 128, all subject only to travel bans or restrictions. These figures illustrate the uneven impact of the administrative pause and related restrictions across the region.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Broader Context</h3>
      <p>The State Department’s listing of the 75 countries does not affect individuals entering the United States on tourist, temporary work, or student visas. It also does not apply to individuals already in the country who have applied for, or will apply for, a green card. Many immigrants forgo benefits for which they are eligible due to administrative concerns or fear that using them could affect a future immigration application. Moreover, research consistently shows that immigrants use public benefits at lower rates than native-born Americans, in part because many noncitizens are ineligible for federal assistance. This approach overlooks the broader contributions immigrants make in terms of human capital, job creation, and entrepreneurship.</p>
    `,
        relatedArticles: []
    },
    {
        slug: 'atlas-migraciones-2025',
        type: 'Infografía',
        type_en: 'Infographic',
        contentKind: 'infografia',
        category: 'Migración · UE',
        category_en: 'Migration · EU',
        title: 'Atlas de las Migraciones, 2025',
        title_en: 'Atlas of Migration, 2025',
        subtitle: 'El Atlas de las Migraciones profundiza en los complejos vínculos entre conflictos y desplazamientos de población.',
        subtitle_en: 'The Atlas of Migration explores the complex links between conflicts and population displacement.',
        heroImage: '/images/Migration_Atlas_2025_-_ES.png',
        heroImage_en: '/images/Migration_Atlas_2025_-_EN.png',
        mainImage: '/images/Migration_Atlas_2025_-_ES.png',
        mainImage_en: '/images/Migration_Atlas_2025_-_EN.png',
        mainImageCaption: 'Atlas de las Migraciones, 2025: Infografía destacada.',
        mainImageCaption_en: 'Atlas of Migration, 2025: Featured infographic.',
        publishDate: '20 Feb 2026',
        readTime: '7 min',
        author: {
            name: 'Equipo IEAM',
            name_en: 'IEAM Team',
            role: 'Investigación',
            role_en: 'Research',
            image: '/favicon-new.png',
            bio: 'Unidad de datos y análisis del IEAM.',
            bio_en: 'IEAM Data and Analysis Unit.'
        },
        pullQuote: 'Más de 51 millones de personas necesitaban protección internacional a finales de 2024.',
        pullQuote_en: 'Over 51 million people were in need of international protection at the end of 2024.',
        materials: [
            {
                label: 'Descargar Atlas (ES)',
                label_en: 'Download Atlas (ES)',
                url: '/docs/Migration_Atlas_2025_-_ES.pdf'
            },
            {
                label: 'Descargar Atlas (EN)',
                label_en: 'Download Atlas (EN)',
                url: '/docs/Migration_Atlas_2025_-_EN.pdf'
            }
        ],
        content: `
      <p>El Atlas de las Migraciones, publicado por la Oficina de Publicaciones de la Unión Europea, es una obra de referencia que ofrece una visión general de las migraciones y una base de conocimientos destinada a los responsables políticos, partes interesadas, empresas, investigadores y al público en general.</p>
      <p>La edición 2025 ofrece un análisis basado en los datos de los movimientos migratorios en los 27 Estados miembros de la UE y en 171 países y territorios de todo el mundo.</p>
      <p>Esta edición profundiza especialmente en los complejos vínculos entre conflictos y desplazamientos de población.</p>
      <p>En el marco de esta publicación, el Instituto Español de Análisis Migratorio (IEAM) ha analizado los principales datos referentes a España e Italia.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Desplazamientos forzados en fuerte aumento a nivel mundial</h3>
      <p>El número de personas desplazadas de forma forzosa ha experimentado un aumento espectacular en los últimos 15 años. Según las Naciones Unidas, más de 51 millones de personas necesitaban protección internacional a finales de 2024.</p>
      <p>Al mismo tiempo, el número de conflictos armados también ha aumentado, alcanzando más de 180 en 2024. Ambos fenómenos suelen estar arraigados en la fragilidad de los Estados y tienden a exacerbarla.</p>
      <p>Los desplazamientos forzados tienen múltiples implicaciones: sociales, medioambientales y de seguridad. Los conflictos, a su vez, se traducen en víctimas humanas, destrucción de infraestructuras y colapso institucional.</p>
      <p>Comprender la naturaleza multidimensional de estos fenómenos y su papel en la fragilidad de los Estados es esencial para desarrollar políticas eficaces y adaptadas a estos desafíos globales.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Flujos migratorios anuales hacia y desde España e Italia</h3>
      <p>En 2023, España registró un volumen elevado de flujos migratorios. El país recibió 1.251.000 inmigrantes, de los cuales el 72 % procedía de países terceros (fuera de la UE) y el 28 % de otros Estados miembros. Al mismo tiempo, 609.000 personas abandonaron España, de las cuales el 65 % se dirigió a países fuera de la UE y el 35 % a otros Estados miembros.</p>
      <p>Italia presenta un patrón similar, pero con flujos menores. Recibió 440.000 inmigrantes, de los cuales el 76 % procedía de países fuera de la UE y el 24 % de otros Estados miembros, mientras que 158.000 personas emigraron, con una distribución casi equilibrada entre destinos extraeuropeos (51 %) e intraeuropeos (49 %).</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Solicitudes de asilo: un aumento continuo</h3>
      <p>El número de personas que presentaron una primera solicitud de asilo aumentó en ambos países entre 2023 y 2024.</p>
      <p>En España, el número de primeras solicitudes pasó de 160.470 a 165.465, lo que supone un aumento de casi el 3 %. Los hombres siguieron siendo mayoría, representando el 53 % en 2023 y el 58 % en 2024, mientras que las mujeres representaban el 47 % y el 42 %, respectivamente.</p>
      <p>En Italia, el aumento fue más pronunciado, con 130.565 primeras solicitudes en 2023 y 151.120 en 2024, un incremento de aproximadamente el 16 %. Los hombres representaron una proporción aún mayor de los solicitantes: 84 % en 2023 y 81 % en 2024, frente al 16 % y 19 % de mujeres, respectivamente.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Inclusión social: desigualdades persistentes según el origen</h3>
      <p>Los datos sobre inclusión social revelan desigualdades significativas entre nacionales y poblaciones migrantes.</p>
      <p>En España, el 20,6 % de los españoles están en riesgo de pobreza o exclusión social, frente al 35,0 % de los ciudadanos de otros Estados miembros de la UE y al 53,4 % de los nacionales de terceros países. La diferencia es notable: los nacionales de terceros países están más de dos veces y media más expuestos a este riesgo que los españoles.</p>
      <p>En Italia, la situación sigue una tendencia comparable. El riesgo de pobreza o exclusión social afecta al 21,1 % de los italianos, al 36,3 % de los ciudadanos de otros Estados miembros de la UE y al 37,0 % de los nacionales de terceros países.</p>
      <p>Estas cifras ponen de relieve la persistencia de vulnerabilidades específicas de las poblaciones migrantes, lo que requiere políticas de integración reforzadas, específicas y eficaces.</p>
    `,
        content_en: `
      <p>The Atlas of Migration, published by the Publications Office of the European Union, is a reference work providing an overview of migration and a knowledge base for policymakers, stakeholders, businesses, researchers, and the general public.</p>
      <p>The 2025 edition offers an analysis based on data on migration movements in the 27 EU Member States and in 171 countries and territories worldwide.</p>
      <p>This edition particularly explores the complex links between conflicts and population displacement.</p>
      <p>Within the framework of this publication, the Spanish Institute for Migration Analysis (IEAM) has analyzed the main data concerning Spain and Italy.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Forced Displacement on the Rise Worldwide</h3>
      <p>The number of forcibly displaced people has risen sharply over the past 15 years. According to the United Nations, over 51 million people were in need of international protection at the end of 2024.</p>
      <p>At the same time, the number of armed conflicts has also increased, reaching over 180 in 2024. Both phenomena are often rooted in state fragility.</p>
      <p>Forced displacement has multiple implications: social, environmental, and security-related. Conflicts, in turn, result in human casualties, infrastructure destruction, and institutional breakdown.</p>
      <p>Understanding the multidimensional nature of these phenomena and their role in state fragility is essential for designing effective and targeted policies to address these global challenges.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Annual Migration Flows to and from Spain and Italy</h3>
      <p>In 2023, Spain recorded a high volume of migration flows. The country received 1,251,000 immigrants, of whom 72% came from third countries (outside the EU) and 28% from other Member States. At the same time, 609,000 people left Spain, with 65% moving to countries outside the EU and 35% to other Member States.</p>
      <p>Italy shows a similar pattern, but with lower flows. It received 440,000 immigrants, of whom 76% came from countries outside the EU and 24% from other Member States, while 158,000 people emigrated, with an almost balanced distribution between extra-European (51%) and intra-European (49%) destinations.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Asylum Applications: A Continuous Increase</h3>
      <p>The number of people submitting a first asylum application increased in both countries between 2023 and 2024.</p>
      <p>In Spain, the number of first applications rose from 160,470 to 165,465, an increase of nearly 3%. Men remained the majority, accounting for 53% in 2023 and 58% in 2024, while women represented 47% and 42%, respectively.</p>
      <p>In Italy, the increase was more pronounced, with 130,565 first applications in 2023 and 151,120 in 2024, an increase of about 16%. Men accounted for an even larger share of applicants, representing 84% in 2023 and 81% in 2024, compared with 16% and 19% for women, respectively.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Social Inclusion: Persistent Inequalities by Origin</h3>
      <p>Data on social inclusion reveal significant inequalities between nationals and migrant populations.</p>
      <p>In Spain, 20.6% of Spaniards are at risk of poverty or social exclusion, compared with 35.0% of nationals from other EU Member States and 53.4% of third-country nationals. The gap is striking: third-country nationals are more than two and a half times more exposed to this risk than Spaniards.</p>
      <p>In Italy, the situation shows a similar trend. The risk of poverty or social exclusion affects 21.1% of Italians, 36.3% of nationals from other EU Member States, and 37.0% of third-country nationals.</p>
      <p>These figures highlight the persistence of vulnerabilities specific to migrant populations, calling for strengthened, targeted, and effective integration policies.</p>
    `,
        relatedArticles: []
    },
    {
        slug: 'movilidad-africa-occidental',
        type: 'Informe',
        type_en: 'Report',
        contentKind: 'policy',
        category: 'Migración · África Occidental',
        category_en: 'Migration · West Africa',
        title: 'Reformar la gobernanza de la movilidad en África Occidental',
        title_en: 'Reforming Mobility Governance in West Africa',
        subtitle: 'Un marco de acción común para integrar la dignidad humana, las realidades económicas y las necesidades de protección.',
        subtitle_en: 'A common action framework to integrate human dignity, economic realities, and protection needs.',
        heroImage: '/images/informeafricaes.jpg',
        heroImage_en: '/images/informeafricaen.jpg',
        mainImage: '/images/informeafricaes.jpg',
        mainImage_en: '/images/informeafricaen.jpg',
        mainImageCaption: 'Portada del informe: Movilidad África Occidental.',
        mainImageCaption_en: 'Report cover: West Africa Mobility.',
        publishDate: '23 Dec 2025',
        readTime: '15 min',
        author: {
            name: 'Beatriz de León',
            role: 'Directora Ejecutiva',
            role_en: 'Executive Director',
            image: '/team/member-2.jpg',
            bio: 'Directora Ejecutiva del IEAM.',
            bio_en: 'Executive Director of IEAM.'
        },
        materials: [
            {
                label: 'Descargar informe (ES)',
                label_en: 'Download report (ES)',
                url: '/docs/IEAM-2025-003-ES_movilidad-africaoccidental.pdf'
            },
            {
                label: 'Download report (EN)',
                label_en: 'Download report (EN)',
                url: '/docs/IEAM-2025-003-EN_mobility-westafrica.pdf'
            },
            {
                label: 'Rapport complet (FR)',
                label_en: 'Full Report (FR)',
                url: '/docs/IEAM-2025-003-FR_movilidad-africaoccidenta.pdf'
            }
        ],
        content: `
            <h2 class="text-2xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-4">RESUMEN EJECUTIVO</h2>
            <p>El objetivo de este policy paper es proponer un marco de acción común para transformar la migración irregular en movilidad ordenada a lo largo del eje Senegal-Mali-Mauritania-Europa, integrando en su enfoque de la dignidad humana, las realidades económicas y las necesidades de protección. El documento forma parte de una serie de trabajos del Instituto Español de Análisis Migratorio (IEAM) y es el resultado de un taller de inteligencia colectiva celebrado en Dakar, que reunió a investigadores, representantes gubernamentales, organizaciones internacionales y humanitarias, actores comunitarios, el sector privado y las diásporas. El objetivo del ejercicio era consolidar un diagnóstico compartido, identificar los puntos de vigilancia a corto plazo y formular recomendaciones y proyectos piloto operativos.</p>
            <p>El diagnóstico se inscribe en un contexto de reactivación de la ruta atlántica como vía de acceso principal a la UE, con un repunte de las llegadas a las Canarias desde 2023-2024 y una diversificación de los perfiles (jóvenes, mujeres, niños, nuevos países de origen). No obstante, en 2025, la preeminencia de las salidas de Argelia hacia España sigue siendo, no obstante, significativa. En este panorama en recomposición, la gobernanza de la movilidad adolece menos de una falta de textos que de un déficit de coherencia en la aplicación, de un bilateralismo fragmentador y de efectos de desplazamiento que desvían las rutas hacia otras zonas —a veces más peligrosas— sin reducir los factores estructurales de las salidas.</p>
            
            <h2 class="text-2xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-4">MENSAJES ESTRATÉGICOS</h2>
            <ul class="list-disc ml-6 space-y-4 text-slate-700">
                <li><strong>Soberanía mediante la coherencia regional:</strong> establecer una coordinación pragmática centrada en los efectos transfronterizos, con el fin de preservar la buena vecindad, las economías fronterizas y la estabilidad local; centrarse prioritariamente en las redes delictivas (y no en las personas) mediante una cooperación judicial reforzada, y reducir la extorsión en los puestos de control como condición para la eficacia.</li>
                <li><strong>La diáspora y el arraigo comunitario como puente de confianza:</strong> conectar a las asociaciones de la diáspora, los municipios y los actores comunitarios en las zonas de origen para difundir información fiable, apoyar la tutoría y la inversión, reforzar las alternativas locales y fomentar los retornos sostenibles respaldadospor el entorno socioeconómico.</li>
                <li><strong>Anclar la implementación a nivel territorial:</strong> articular mejor la oferta y la demanda a través de empresas, ayuntamientos y servicios descentralizados, para alinear perfiles, puestos, requisitos consulares y trayectorias viables.</li>
                <li><strong>Hacer que la movilidad regular sea creíble y accesible:</strong> reformar las prácticas consulares (previsibilidad, transparencia, comunicación, reducción de plazos) y reducir el espacio que se deja a los intermediarios fraudulentos.</li>
                <li><strong>Datos para tomar decisiones realistas y anticipar las rutas:</strong> institucionalizar una triangulación sistemática y crear un mecanismo de seguimiento ligero con informes periódicos compartidas entre los países de la región.</li>
            </ul>
        `,
        content_en: `
            <h2 class="text-2xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-4">EXECUTIVE SUMMARY</h2>
            <p>The objective of this policy paper is to propose a common framework for action to transform irregular migration into orderly mobility along the Senegal-Mali-Mauritania-Europe axis, integrating human dignity, economic realities, and protection needs into its approach. The document is part of a series of works by the Spanish Institute for Migration Analysis (IEAM) and is the result of a collective intelligence workshop held in Dakar, which brought together researchers, government representatives, international and humanitarian organizations, community actors, the private sector, and diasporas. The aim of the exercise was to consolidate a shared diagnosis, identify short-term vigilance points, and formulate recommendations and operational pilot projects.</p>
            <p>The diagnosis takes place in a context of reactivation of the Atlantic route as a main access route to the EU, with a rebound in arrivals to the Canary Islands since 2023-2024 and a diversification of profiles (youth, women, children, new countries of origin). However, in 2025, the preeminence of departures from Algeria to Spain remains significant. In this recomposing landscape, mobility governance suffers less from a lack of texts than from a deficit of coherence in implementation, fragmenting bilateralism, and displacement effects that divert routes to other areas—sometimes more dangerous—without reducing the structural factors of departures.</p>
            
            <h2 class="text-2xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-4">STRATEGIC MESSAGES</h2>
            <ul class="list-disc ml-6 space-y-4 text-slate-700">
                <li><strong>Sovereignty through regional coherence:</strong> establish pragmatic coordination focused on cross-border effects, in order to preserve good neighborliness, border economies, and local stability; focus primarily on criminal networks (and not on people) through reinforced judicial cooperation, and reduce extortion at checkpoints as a condition for effectiveness.</li>
                <li><strong>The diaspora and community rooting as a bridge of trust:</strong> connect diaspora associations, municipalities, and community actors in areas of origin to disseminate reliable information, support mentoring and investment, reinforce local alternatives, and promote sustainable returns backed by the socio-economic environment.</li>
                <li><strong>Anchor implementation at the territorial level:</strong> better articulate supply and demand through companies, municipalities, and decentralized services, to align profiles, positions, consular requirements, and viable pathways.</li>
                <li><strong>Make regular mobility credible and accessible:</strong> reform consular practices (predictability, transparency, communication, reduction of deadlines) and reduce the space left to fraudulent intermediaries.</li>
                <li><strong>Data for realistic decision-making and anticipating routes:</strong> institutionalize systematic triangulation and create a light monitoring mechanism with periodic reports shared among the countries of the region.</li>
            </ul>
        `,
        relatedArticles: []
    },
    {
        slug: 'informe-rutas-migratorias-2025',
        type: 'Informe',
        type_en: 'Report',
        contentKind: 'policy',
        category: 'Migración · Fronteras',
        category_en: 'Migration · Borders',
        title: 'Migraciones y migrantes. ¿Cómo estudiar la irregularidad en los procesos migratorios?. España, un estudio de caso (I)',
        title_en: 'Migration and Migrants: How to Study Irregularity in Migration Processes?. Spain: A Case Study (Part I)',
        subtitle: 'Un análisis exhaustivo sobre la evolución, dinámicas y desafíos de la migración irregular hacia España en el contexto europeo (2015-2025).',
        subtitle_en: 'A comprehensive analysis of the evolution, dynamics, and challenges of irregular migration to Spain within the European context (2015-2025).',
        heroImage: '/images/informe-es-rutasmigratorias.png',
        heroImage_en: '/images/informe-en-rutasmigratorias.png',
        mainImage: '/images/informe-es-rutasmigratorias.png',
        mainImage_en: '/images/informe-en-rutasmigratorias.png',
        mainImageCaption: 'Portada del informe: Migraciones y Migrantes.',
        mainImageCaption_en: 'Report cover: Migrations and Migrants.',
        publishDate: '22 Dec 2025',
        readTime: '25 min',
        author: {
            name: 'Dolores López',
            role: 'Investigadora asociada',
            role_en: 'Associate Researcher',
            image: '/team/member-5.jpg',
            bio: 'Pamplona (España). Dolores López es licenciada en Geografía e Historia y doctora en Geografía por nuestra Universidad, además de contar con un Máster en Demografía por la London School of Economics (LSE). Es catedrática de Geografía Humana en la Facultad de Filosofía y Letras. Sus líneas de investigación se enmarcan en los estudios de familia, mortalidad y migraciones.',
            bio_en: 'Pamplona (Spain). Dolores López holds a degree in Geography and History and a PhD in Geography, in addition to a Master\'s in Demography from the London School of Economics (LSE). She is a Professor of Human Geography. Her research focuses on family studies, mortality, and migrations.'
        },
        content: `
      <p>Las migraciones irregulares hacia Europa han experimentado transformaciones profundas en las últimas décadas. España, en particular, se ha consolidado como uno de los principales países receptores de llegadas irregulares dentro del espacio europeo, en un contexto marcado por la inestabilidad en África occidental, la presión sostenida en las rutas Atlántica y Mediterránea, y la creciente externalización de fronteras por parte de la Unión Europea. En 2025, estas dos rutas que conectan con Canarias y la Península representaron conjuntamente el 22 % del total de llegadas irregulares a la UE. Comprender estas dinámicas resulta esencial para interpretar la evolución reciente del fenómeno y sus implicaciones.</p>
      <p>El propósito de este informe es analizar la evolución de la migración irregular hacia España en la última década, situándola en el marco europeo y examinando sus principales manifestaciones a partir de fuentes oficiales y humanitarias. El estudio ofrece una visión integrada de tendencias y flujos migratorios, rutas utilizadas y desafíos asociados a los sistemas de acogida y protección, subrayando su complejidad, carácter estructural y evolución en el tiempo. Para ello, se estructura en tres ejes: i) migraciones irregulares en el contexto europeo, a partir de los datos de Frontex; ii) migraciones irregulares en España, basadas en información del INE, el Observatorio Permanente de la Inmigración, la OIM y Caminando Fronteras; y iii) procesos de protección internacional, con datos del Ministerio del Interior y CEAR.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Principales hallazgos</h3>
      
      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">1. La migración irregular hacia Europa presenta una dinámica estructural y sostenida en el tiempo</h4>
      <p>La migración irregular hacia Europa constituye un fenómeno persistente y estructural, con variaciones en intensidad y localización asociadas a coyunturas políticas, conflictos armados y cambios en los mecanismos de control fronterizo. Entre 2015 y 2025, más de cuatro millones de personas cruzaron de manera irregular las fronteras exteriores de la Unión Europea.</p>
      <p>Los años 2015 y 2016 concentraron más de la mitad de estas entradas, en relación con la guerra de Siria, mientras que el periodo 2021–2025 muestra un nuevo ciclo de incremento tras el descenso registrado durante la pandemia de COVID-19. En 2025 (hasta agosto), las rutas con mayor peso fueron el Mediterráneo Central (37 %) y el Mediterráneo Oriental (28 %), mientras que las rutas con entrada por España (la Atlántica y la del Mediterráneo Occidental), representaron conjuntamente en torno al 22 % del total de las llegadas irregulares a la UE. La evolución histórica evidencia que el refuerzo del control en determinadas rutas no elimina los flujos, sino que tiende a provocar su reorientación geográfica.</p>
      <p>Los datos de Frontex muestran asimismo una elevada diversidad en los países de origen. En 2025, las principales nacionalidades de las personas que llegaron de forma irregular a Europa fueron Bangladés (13.927 personas), Egipto (11.026), Afganistán (8.935), Mali (6.129), Sudán (5.959) y Eritrea (5.957), entre otras, con patrones de entrada diferenciados según proximidad geográfica y rutas utilizadas.</p>

      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">2. La migración irregular hacia España presenta patrones territoriales y temporales heterogéneos</h4>
      <p>En términos cuantitativos, las llegadas irregulares por vía marítima y terrestre representan solo una parte minoritaria del conjunto de la migración internacional hacia España, e incluso del total de personas en situación administrativa irregular. El informe subraya que una proporción significativa de la población extranjera en situación irregular ha accedido al territorio español por vías regulares y ha pasado posteriormente a una situación de irregularidad sobrevenida por la caducidad de visados o permisos de residencia.</p>
      <p>No obstante, las llegadas irregulares por mar y por las fronteras terrestres de Ceuta y Melilla concentran una elevada atención mediática y política. Los datos del Ministerio del Interior muestran oscilaciones significativas desde comienzos del siglo XXI, con un primer pico destacado en 2006, cuando cerca de 40.000 personas llegaron de manera irregular, el 81 % de ellas a través del archipiélago canario. En la actualidad, la procedencia de las personas que llegan en embarcaciones a Canarias incluye principalmente Marruecos, Mauritania, Senegal y Gambia.</p>
      <p>Tras una década de cifras relativamente contenidas, a partir de 2016 se inicia un incremento progresivo y sostenido de las llegadas por vía marítima, que culmina en máximos históricos en 2019 y, de nuevo, en 2023 y 2024, superando en estos últimos años los niveles registrados en 2006. El año 2024 marca el valor más alto de toda la serie histórica analizada. Los datos provisionales de 2025, hasta mediados de septiembre, muestran cifras inferiores a las de 2024 en la misma fecha, aunque superiores a las de 2023, lo que introduce incertidumbre sobre la evolución final del año.</p>
      <p>Desde el punto de vista territorial, el informe identifica un cambio estructural en la distribución geográfica de las llegadas. Mientras que en los primeros años del periodo analizado la Península y Baleares concentraban la mayor parte de las entradas marítimas, a partir de 2020 se produce una inflexión clara que sitúa a Canarias como principal puerta de entrada, superando el 70 % del total de llegadas marítimas a España desde 2023. Esta concentración se mantiene durante 2024 y buena parte de 2025, si bien en los meses de verano de este último año se observa un repunte relativo de las llegadas a la Península y Baleares y una ligera desaceleración en Canarias.</p>
      <p>Las diferencias territoriales también se reflejan en las vías de entrada y los perfiles de llegada. En Ceuta y Melilla predomina la entrada por vía terrestre, con periodos de mayor presión entre 2017 y 2019, cuando se superaron las 6.000 llegadas anuales. En la actualidad, Ceuta registra un mayor número de entradas que Melilla.</p>

      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">3. Centralidad de la ruta atlántica y presión sobre Canarias</h4>
      <p>La presión migratoria sobre Canarias se mantiene elevada desde 2020 y se intensifica especialmente a partir de 2023. El informe muestra que el archipiélago se ha convertido en la principal puerta de llegada de población migrante en situación irregular a España, impulsada por dinámicas estructurales como las salidas desde la fachada atlántica africana, las variaciones en los controles en Marruecos y Mauritania y la percepción de esta ruta como alternativa al Mediterráneo occidental. En 2024, Canarias registró más de 60.000 llegadas, representando más del 70 % del total de llegadas al país.</p>
      <p>Este incremento confirma la persistencia de una de las rutas más peligrosas del mundo, en la que se siguen registrando elevados niveles de muertes y desapariciones. Asimismo, las islas soportan de forma desproporcionada la presión inicial de las llegadas, lo que genera saturación en los dispositivos de primera acogida y dificulta los procesos de derivación hacia la Península.</p>

      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">4. Un sistema de gestión y regularización en transformación</h4>
      <p>España se consolidó como país receptor de migración antes de disponer de una política migratoria plenamente desarrollada, lo que dio lugar a sucesivos procesos de regularización extraordinaria para otorgar permisos a personas ya residentes en el país. Estos procesos han configurado un régimen migratorio que combina vías ordinarias con mecanismos de regularización posterior, especialmente a través del arraigo.</p>
      <p>En 2025, más de 328.000 personas residían en España bajo distintas modalidades de arraigo (social, laboral, familiar o formativo), procedentes mayoritariamente de Colombia (25 %), Marruecos (17 %) y Perú (8 %). La introducción del arraigo por formación en 2022 ha abierto nuevos itinerarios de inserción laboral en sectores con déficit de mano de obra, aunque su alcance sigue siendo limitado en relación con el volumen total de personas en situación irregular.</p>

      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">5. Cooperación internacional y externalización del control migratorio</h4>
      <p>Las respuestas institucionales a la migración irregular dependen en gran medida de la cooperación internacional. La externalización del control fronterizo constituye un pilar central de la política migratoria española y europea, basada en acuerdos de vigilancia, control y readmisión con países de origen y tránsito. Estos mecanismos han contribuido a una reconfiguración espacial y temporal de los flujos, sin que ello se traduzca necesariamente en un descenso sostenido de las llegadas. En 2023, por ejemplo, Marruecos había recibido más de 500 millones de euros en financiación europea destinada a este ámbito.</p>

      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">6. Dificultades estructurales de medición y dimensión humanitaria</h4>
      <p>El informe pone de relieve las dificultades estructurales para cuantificar con precisión la migración irregular, especialmente en lo relativo a las muertes y desapariciones en las rutas hacia España. Asimismo, destaca la estrecha relación entre migración irregular y protección internacional, ya que una parte relevante de las personas que llegan por vías irregulares procede de países en conflicto o con graves situaciones de inestabilidad y potencialmente cumple los requisitos para solicitar asilo.</p>
      <p>Desde 2015 se ha producido un crecimiento significativo de las solicitudes de protección internacional en España, que pasaron de 3.422 en 2011 a 167.366 in 2024. Del total de solicitudes, el 69 % llega a ser admitido a trámite y, de estas, más del 60 % finaliza con una resolución desfavorable. En 2024 y 2025, las principales nacionalidades solicitantes en España fueron Venezuela, Colombia y Perú, junto con Mali y Senegal.</p>
      <p>En paralelo, el análisis de los datos del Programa Migrantes Desaparecidos de la OIM y de organizaciones especializadas como Caminando Fronteras muestra que la ruta atlántica concentra un número particularmente elevado de víctimas mortales, en un contexto marcado por travesías más largas, condiciones marítimas adversas y el uso de embarcaciones precarias. No obstante, el informe subraya que las cifras disponibles probablemente infraestiman la magnitud real del fenómeno debido a las limitaciones de los sistemas de registro.</p>
      <p>En conjunto, el informe pone de relieve la complejidad y persistencia de la migración irregular hacia España y su estrecha vinculación con las dinámicas migratorias europeas y globales. Los resultados muestran un fenómeno cambiante en sus manifestaciones territoriales y temporales, pero estructural en su continuidad, marcado por fuertes desigualdades entre regiones de origen, tránsito y destino, y por una elevada presión sobre determinados territorios fronterizos. En este contexto, España aparece como un espacio central de observación, tanto por su posición geográfica como por su papel en los sistemas europeos de control fronterizo, acogida y protección. La experiencia española, analizada en detalle, permite identificar patrones, tensiones y desafíos que trascienden el ámbito nacional y remiten a la necesidad de comprender la migración irregular como un fenómeno complejo, interdependiente y profundamente condicionado por factores internacionales.</p>
    `,
        content_en: `
      <p>Irregular migration to Europe has undergone profound transformations in recent decades. Spain, in particular, has consolidated its position as one of the main receiving countries for irregular arrivals within the European area, in a context marked by instability in West Africa, sustained pressure along the Atlantic and Mediterranean routes, and the growing externalization of borders by the European Union. In 2025, these two routes connecting to the Canary Islands and the Iberian Peninsula accounted for 22% of the total irregular arrivals to the EU. Understanding these dynamics is essential to interpreting recent trends and their implications.</p>
      <p>The purpose of this report is to analyze the evolution of irregular migration to Spain over the last decade, situating it within the European context and examining its main manifestations using official and humanitarian sources. The study provides an integrated view of migration trends and flows, routes used, and challenges related to reception and protection systems, highlighting their complexity, structural nature, and evolution over time. The report is structured around three axes: i) irregular migration in the European context, based on Frontex data; ii) irregular migration in Spain, drawing on information from the INE, the Permanent Observatory on Immigration, the IOM, and Caminando Fronteras; and iii) international protection processes, with data from the Ministry of Interior and CEAR.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Key Findings</h3>
      
      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">1. Irregular migration to Europe shows a structural and sustained dynamic</h4>
            <p>Irregular migration to Europe constitutes a persistent and structural phenomenon, with variations in intensity and location associated with political conjunctures, armed conflicts, and changes in border control mechanisms. Between 2015 and 2025, more than four million people crossed the external borders of the European Union irregularly.</p>
            <p>The years 2015 and 2016 concentrated more than half of these entries, in relation to the war in Syria, while the 2021–2025 period shows a new cycle of increase following the decrease recorded during the COVID-19 pandemic. In 2025 (until August), the routes with the greatest weight were the Central Mediterranean (37%) and the Eastern Mediterranean (28%), while the routes entering through Spain (the Atlantic and Western Mediterranean) jointly represented around 22% of total irregular arrivals to the EU. Historical evolution shows that reinforcing control on certain routes does not eliminate flows but tends to cause their geographical reorientation.</p>
            <p>Frontex data also show high diversity in countries of origin. In 2025, the main nationalities of people arriving irregularly in Europe were Bangladesh (13,927 people), Egypt (11,026), Afghanistan (8,935), Mali (6,129), Sudan (5,959), and Eritrea (5,957), among others, with differentiated entry patterns according to geographical proximity and routes used.</p>

      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">2. Irregular migration to Spain shows heterogeneous territorial and temporal patterns</h4>
      <p>Quantitatively, irregular arrivals by sea and land represent only a minor portion of total international migration to Spain, and even of the total population in irregular administrative status. A significant share of the irregular population has entered Spain through regular channels and later become irregular due to visa or residence permit expiration.</p>
      <p>Nevertheless, irregular arrivals by sea and through the land borders of Ceuta and Melilla attract considerable media and political attention. Data from the Ministry of Interior shows significant fluctuations since the early 21st century, with a first major peak in 2006, when nearly 40,000 people arrived irregularly, 81% of them via the Canary Islands. Currently, arrivals by boat to the Canaries mainly come from Morocco, Mauritania, Senegal, and Gambia.</p>
      <p>After a decade of relatively contained numbers, from 2016 onward there was a progressive and sustained increase in maritime arrivals, reaching historic peaks in 2019, and again in 2023 and 2024, surpassing the levels recorded in 2006. The year 2024 marked the highest value in the entire historical series analyzed. Provisional data for 2025, up to mid-September, show numbers lower than in 2024 for the same period but higher than in 2023, creating uncertainty about the final evolution for the year.</p>
      <p>Territorially, the report identifies a structural change in the geographic distribution of arrivals. While in the early years of the period analyzed the Iberian Peninsula and Balearic Islands concentrated most maritime arrivals, from 2020 a clear inflection point positioned the Canary Islands as the main entry point, surpassing 70% of total maritime arrivals to Spain since 2023. This concentration remained through 2024 and much of 2025, although in the summer months of 2025 there was a relative increase in arrivals to the Peninsula and Balearic Islands and a slight slowdown in the Canaries.</p>
      <p>Territorial differences are also reflected in entry routes and arrival profiles. In Ceuta and Melilla, land entries predominate, with peak periods between 2017 and 2019, when annual arrivals exceeded 6,000. Currently, Ceuta records a higher number of arrivals than Melilla.</p>

      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">3. Centrality of the Atlantic route and pressure on the Canary Islands</h4>
      <p>Migration pressure on the Canaries has remained high since 2020 and intensified from 2023 onward. The report shows that the archipelago has become the main entry point for irregular migrants to Spain, driven by structural dynamics such as departures from the West African Atlantic coast, variations in controls in Morocco and Mauritania, and the perception of this route as an alternative to the Western Mediterranean. In 2024, the Canaries recorded over 60,000 arrivals, representing more than 70% of total arrivals to Spain.</p>
      <p>This increase confirms the persistence of one of the most dangerous routes in the world, with high levels of deaths and disappearances. Moreover, the islands bear a disproportionate share of the initial arrival pressure, causing saturation in reception facilities and complicating transfer to the mainland.</p>

      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">4. A transforming management and regularization system</h4>
      <p>Spain became a receiving country before having a fully developed migration policy, resulting in successive extraordinary regularization processes for residents already in the country. These processes created a migration regime combining regular channels with later regularization mechanisms, especially through arraigo (roots procedure).</p>
      <p>In 2025, over 328,000 people resided in Spain under various arraigo schemes (social, labor, family, or educational), mainly from Colombia (25%), Morocco (17%), and Peru (8%). The introduction of educational arraigo in 2022 opened new labor insertion pathways in sectors with labor shortages, although its reach remains limited relative to the total irregular population.</p>

      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">5. International cooperation and externalization of border control</h4>
      <p>Institutional responses to irregular migration largely depend on international cooperation. The externalization of border control is a central pillar of Spanish and European migration policy, based on monitoring, control, and readmission agreements with countries of origin and transit. These mechanisms have contributed to a spatial and temporal reconfiguration of flows, without necessarily resulting in a sustained decline in arrivals. In 2023, for example, Morocco received over €500 million in European funding for this area.</p>

      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">6. Structural measurement challenges and humanitarian dimension</h4>
      <p>The report highlights structural difficulties in accurately quantifying irregular migration, particularly regarding deaths and disappearances along routes to Spain. It also emphasizes the close link between irregular migration and international protection, as a significant portion of arrivals come from conflict-affected or highly unstable countries and may meet the criteria to request asylum.</p>
      <p>Since 2015, there has been a significant increase in international protection applications in Spain, rising from 3,422 in 2011 to 167,366 in 2024. Of all applications, 69% are accepted for processing, and of these, over 60% end with an unfavorable decision. In 2024 and 2025, the main nationalities applying for protection in Spain were Venezuela, Colombia, and Peru, along with Mali and Senegal.</p>
      <p>Parallel analysis of data from the IOM’s Missing Migrants Programme and specialized organizations such as Caminando Fronteras shows that the Atlantic route accounts for a particularly high number of fatalities, in a context of longer crossings, adverse maritime conditions, and precarious vessels. However, the report notes that available figures likely underestimate the true magnitude of the phenomenon due to registration limitations.</p>
      <p>Overall, the report highlights the complexity and persistence of irregular migration to Spain and its close connection to European and global migration dynamics. Findings show a changing phenomenon in its territorial and temporal manifestations, but structural in continuity, marked by strong inequalities among origin, transit, and destination regions, and by high pressure on certain border territories. In this context, Spain appears as a central observation point, both for its geographic position and for its role in European border control, reception, and protection systems. The Spanish experience, analyzed in detail, allows the identification of patterns, tensions, and challenges that transcend the national level and underscore the need to understand irregular migration as a complex, interdependent, and internationally conditioned phenomenon.</p>
    `,
        materials: [
            { label: 'Descargar Informe', label_en: 'Download Report', url: '/docs/IEAM-2025-002-ES_rutas-migratorias_1.pdf' }
        ],
        relatedArticles: [
            {
                id: 'informe-rutas-migratorias-2026-parte-2',
                title: 'Migraciones y migrantes (II)',
                title_en: 'Migration and Migrants (II)',
                image: '/images/informe-es-rutasmigratorias2.png',
                badge: 'Informe',
                metadata: {
                    date: '10 Mar 2026',
                    readTime: '25 min'
                }
            }
        ]
    },

    {
        slug: 'movilidad-africa-europa',
        type: 'Informe',
        type_en: 'Report',
        contentKind: 'policy',
        category: 'Migración · Mediterráneo',
        category_en: 'Migration · Mediterranean',
        title: 'Repensar la movilidad entre Mali y Europa',
        title_en: 'Rethinking Mobility Between Mali and Europe',
        subtitle: 'Un marco para ordenar la movilidad, reducir los costes humanos y crear beneficios compartidos para países de origen, tránsito y destino.',
        subtitle_en: 'A framework to organize mobility, reduce human costs, and create shared benefits for countries of origin, transit, and destination.',
        heroImage: '/images/informemalies.jpg',
        heroImage_en: '/images/informemalien.jpg',
        mainImage: '/images/informemalies.jpg',
        mainImage_en: '/images/informemalien.jpg',
        mainImageCaption: 'Trayectos de movilidad regulada entre Bamako, Dakar y Madrid.',
        mainImageCaption_en: 'Regulated mobility routes between Bamako, Dakar, and Madrid.',
        publishDate: '14 Nov 2025',
        readTime: '12 min',
        author: {
            name: 'Beatriz de León',
            role: 'Directora Ejecutiva',
            role_en: 'Executive Director',
            image: '/team/member-2.jpg',
            bio: 'Directora Ejecutiva del IEAM.',
            bio_en: 'Executive Director of IEAM.'
        },
        authors: [
            {
                name: 'Beatriz de León',
                role: 'Directora Ejecutiva',
                role_en: 'Executive Director',
                image: '/team/member-2.jpg',
                bio: 'Directora Ejecutiva del IEAM.',
                bio_en: 'Executive Director of IEAM.'
            },
            {
                name: 'Bréma Ely Dicko',
                role: 'Investigador asociado',
                role_en: 'Associate Researcher',
                image: '/team/member-3.jpg',
                bio: 'Investigador asociado del IEAM.',
                bio_en: 'Associate Researcher at IEAM.'
            }
        ],
        pullQuote: 'La movilidad es inevitable; la diferencia está entre gestionarla con reglas claras o asumir sus costes en la irregularidad.',
        pullQuote_en: 'Mobility is inevitable; the difference lies between managing it with clear rules or assuming its costs in irregularity.',
        materials: [
            {
                label: 'Informe completo (ES)',
                label_en: 'Full Report (ES)',
                url: '/docs/IEAM-2025-001-ES_movilidad-mali.pdf'
            },
            {
                label: 'Full Report (EN)',
                label_en: 'Full Report (EN)',
                url: '/docs/IEAM-2025-001-EN_mobility-mali.pdf'
            },
            {
                label: 'Rapport complet (FR)',
                label_en: 'Full Report (FR)',
                url: '/docs/IEAM-2025-001-FR_mobilite-mali.pdf'
            }
        ],
        content: `
      <h2 class="text-2xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-4">RESUMEN EJECUTIVO</h2>
      <p>El objetivo de este policy paper es proponer un marco de acciones concretas para la movilidad legal y circular, la reintegración de las personas que retornan y la gobernanza regional de las rutas migratorias entre Mali, su subregión y Europa. El documento forma parte de una serie de trabajos del Instituto Español de Análisis Migratorio (IEAM) y es el resultado de un taller de inteligencia colectiva celebrado en Bamako con actores institucionales, académicos e investigadores especializados en migraciones, asociaciones, técnicos y economistas, orientado a identificar prioridades comunes y proponer mecanismos operativos.</p>
      <p>Para España y, en general, para Europa, la dinámica reciente en la ruta atlántica —donde los malienses se encuentran entre las nacionalidades más presentes en la ruta hacia Canarias— invita a ir más allá de la gestión de emergencias para construir soluciones estructurales.</p>
      
      <h2 class="text-2xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-4">MENSAJES ESTRATÉGICOS</h2>
      
      <ul class="list-disc ml-6 space-y-4 text-slate-700">
        <li><strong>Es esencial contar con un compromiso colectivo y un enfoque multiactor:</strong> los Estados, las entidades locales, la diáspora y los socios internacionales deben construir conjuntamente los dispositivos, poner en común la financiación y definir indicadores comunes.</li>
        
        <li><strong>Una reintegración satisfactoria pasa por el arraigo comunitario, si inclusión económica y el seguimiento local,</strong> favoreciendo los enfoques colectivos y la financiación mixta.</li>
        
        <li><strong>La movilidad legal y circular debe tratarse como una prioridad estratégica,</strong> con acuerdos multilaterales bien estructurados y procedimientos claros y flexibles.</li>
        
        <li><strong>La consolidación de los mecanismos regionales (CEDEAO, UA, AES, bilaterales) es indispensable</strong> y debe ser más pragmática y garantizar una mejor protección de las personas con estatus migratorios cambiantes.</li>
        
        <li><strong>La coordinación interestatal y la gestión local de los flujos deben evolucionar hacia comités e indicadores comunes,</strong> arraigados en el terreno.</li>
        
        <li><strong>La protección de las mujeres y los niños debe convertirse en un eje transversal importante,</strong> con dispositivos adaptados y respaldados por la recopilación de indicadores cualitativos (seguridad, salud, acceso a los derechos). Se invita a los donantes y diplomáticos a dar prioridad a este aspecto para cubrir el vacío existente en las respuestas operativas.</li>
        
        <li><strong>La sostenibilidad y la mutualización de la financiación:</strong> es urgente integrar los recursos locales, la inversión de la diáspora y un enfoque de cofinanciación inicial para superar el modelo dependiente de los donantes y asegurar la continuidad.</li>
        
        <li><strong>El seguimiento, la transparencia y la adaptación continua son la clave del éxito:</strong> cada acción, cada programa debe ser objeto de seguimiento, documentación y evaluación para poder corregirlo, ampliarlo o detenerlo en función de los resultados medidos.</li>
      </ul>
      
      <p class="mt-6 text-sm text-slate-600">Basado en el Policy Paper «Repensar la movilidad entre Mali y Europa», elaborado por Beatriz de León Cobo y el Pr. Bréma Ely Dicko.</p>
    `,
        content_en: `
      <h2 class="text-2xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-4">EXECUTIVE SUMMARY</h2>
      <p>The objective of this policy paper is to propose a framework of concrete actions for legal and circular mobility, the reintegration of returnees, and the regional governance of migratory routes between Mali, its sub-region, and Europe. This document is part of a series of works by the Spanish Institute for Migration Analysis (IEAM) and is the result of a collective intelligence workshop held in Bamako with institutional actors, academics, migration researchers, associations, technicians, and economists, aimed at identifying common priorities and proposing operational mechanisms.</p>
      <p>For Spain and, in general, for Europe, the recent dynamics in the Atlantic route—where Malians are among the most present nationalities on the route to the Canary Islands—call for going beyond emergency management to build structural solutions.</p>
      
      <h2 class="text-2xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-4">STRATEGIC MESSAGES</h2>
      
      <ul class="list-disc ml-6 space-y-4 text-slate-700">
        <li><strong>Collective commitment and a multi-stakeholder approach are essential:</strong> States, local entities, the diaspora, and international partners must jointly build the mechanisms, pool funding, and define common indicators.</li>
        
        <li><strong>Successful reintegration relies on community roots, economic inclusion, and local monitoring,</strong> favoring collective approaches and mixed financing.</li>
        
        <li><strong>Legal and circular mobility must be treated as a strategic priority,</strong> with well-structured multilateral agreements and clear, flexible procedures.</li>
        
        <li><strong>Consolidation of regional mechanisms (ECOWAS, AU, AES, bilateral) is indispensable</strong> and must be more pragmatic, guaranteeing better protection for people with changing migratory statuses.</li>
        
        <li><strong>Interstate coordination and local flow management must evolve towards common committees and indicators,</strong> rooted in the field.</li>
        
        <li><strong>Protection of women and children must become a major transversal axis,</strong> with adapted mechanisms backed by the collection of qualitative indicators (safety, health, access to rights). Donors and diplomats are invited to prioritize this aspect to fill the existing gap in operational responses.</li>
        
        <li><strong>Sustainability and mutualization of funding:</strong> It is urgent to integrate local resources, diaspora investment, and an initial co-financing approach to overcome the donor-dependent model and ensure continuity.</li>
        
        <li><strong>Monitoring, transparency, and continuous adaptation are key to success:</strong> Every action, every program must be subject to monitoring, documentation, and evaluation to be corrected, expanded, or stopped based on measured results.</li>
      </ul>
      
      <p class="mt-6 text-sm text-slate-600">Based on the Policy Paper "Rethinking Mobility Between Mali and Europe", prepared by Beatriz de León Cobo and Prof. Bréma Ely Dicko.</p>
    `,
        relatedArticles: [
            {
                id: 'rutas-migratorias-2026',
                title: "Rutas migratorias en 2026: Proyecciones y tendencias",
                title_en: "Migratory Routes in 2026: Projections and Trends",
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
                badge: "Análisis",
                metadata: { date: "08 Dic 2025", readTime: "8 min" }
            },
            {
                id: 'visados-humanitarios',
                title: "Policy Brief: Visados humanitarios",
                title_en: "Policy Brief: Humanitarian Visas",
                image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
                badge: "Policy Brief",
                metadata: { date: "01 Dic 2025", readTime: "6 min" }
            },
            {
                id: 'entrevista-migracion-circular',
                title: "Entrevista: 'La migración circular es el futuro de la cooperación'",
                title_en: "Interview: 'Circular migration is the future of cooperation'",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2788&auto=format&fit=crop",
                badge: "Entrevista",
                metadata: { date: "01 Dic 2025", readTime: "10 min" }
            }
        ]
    },
    {
        slug: 'comparativa-llegadas-espana-2025',
        type: 'Infografía',
        type_en: 'Infographic',
        contentKind: 'infografia',
        category: 'Flujos · España',
        category_en: 'Flows · Spain',
        title: 'Comparativa de llegadas migratorias a España por vía terrestre y marítima (2024-2025)',
        title_en: 'Comparison of migratory arrivals to Spain by land and sea (2024-2025)',
        subtitle: 'El flujo migratorio hacia España desciende 31% interanual, con fuertes diferencias territoriales entre rutas marítimas y terrestres.',
        subtitle_en: 'Migratory flow to Spain drops 31% year-on-year, with strong territorial differences between maritime and land routes.',
        heroImage: '/images/infografia-comparativamigratorias-es.jpg',
        heroImage_en: '/images/infografia-comparativamigratorias-en.jpg',
        mainImage: '/images/infografia-comparativamigratorias-es.jpg',
        mainImage_en: '/images/infografia-comparativamigratorias-en.jpg',
        mainImageCaption: 'Patrulla marítima en la ruta atlántica hacia Canarias (2024-2025).',
        mainImageCaption_en: 'Maritime patrol on the Atlantic route to the Canary Islands (2024-2025).',
        publishDate: '15 Sep 2025',
        readTime: '8 min',
        author: {
            name: 'Equipo IEAM',
            name_en: 'IEAM Team',
            role: 'Investigación',
            role_en: 'Research',
            image: '/favicon-new.png',
            bio: 'Unidad de datos y análisis territorial del IEAM.',
            bio_en: 'IEAM Data and Territorial Analysis Unit.'
        },
        pullQuote: 'La presión migratoria persiste y las rutas se adaptan al control fronterizo y a la cooperación internacional.',
        pullQuote_en: 'Migration pressure persists and routes are adapting to border control and international cooperation.',
        materials: [
            {
                label: 'Descargar infografía (ES)',
                label_en: 'Download infographic (ES)',
                url: '/docs/IEAM-2025-004-ES_llegadas-sep.pdf'
            },
            {
                label: 'Descargar infografía (EN)',
                label_en: 'Download infographic (EN)',
                url: '/docs/IEAM-2025-004-EN_arrivals-sep.pdf'
            }
        ],
        content: `
      <p>Según los últimos datos del Ministerio del Interior, el flujo migratorio hacia España cayó 31% entre el 1 de enero y el 15 de septiembre de 2025 frente al mismo periodo de 2024: 26.211 personas vs. 37.970.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Descenso general, con diferencias territoriales</h3>
      <p>Las llegadas por mar bajan 34% (35.882 a 23.583). Canarias concentra la caída: 26.758 a 12.487 (-53,3%). Ceuta desciende 68,4% y Melilla sube 19%. Baleares sube 70,9%, señal de desplazamiento parcial de rutas al Mediterráneo central. Embarcaciones interceptadas: -17,9% (1.122 a 921).</p>
      <p>Por vía terrestre, tendencia contraria: Ceuta +18,5% (2.026 a 2.401) y Melilla +266% (62 a 227), apuntando a reactivación de intentos fronterizos, sobre todo en Melilla.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Factores que explican el descenso</h3>
      <ul class="list-disc ml-6 space-y-1 text-slate-700">
        <li>Patrullas mixtas Mauritania-España refuerzan vigilancia atlántica.</li>
        <li>Controles más estrictos en Mauritania y aumento de detenciones/expulsiones hacia Mali y Senegal.</li>
        <li>Cooperación con Senegal y Mauritania para contener rutas.</li>
      </ul>
      <p>Aun así, aumentan salidas desde Guinea Conakry y Guinea-Bissau, lo que sugiere que el descenso puede ser coyuntural.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Conclusión</h3>
      <p>El balance provisional 2025 muestra menor flujo por mar, pero la presión continúa y las rutas se adaptan. El seguimiento constante es clave para anticipar repuntes y diseñar políticas eficaces y sostenibles.</p>
    `,
        content_en: `
      <p>According to the latest data from the Ministry of the Interior, the flow of migrants to Spain fell by 31% between 1 January and 15 September 2025 compared to the same period in 2024: 26,211 people vs. 37,970.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Overall decline, with regional differences</h3>
      <p>Arrivals by sea fell by 34% (35,882 to 23,583). The Canary Islands accounted for most of the decline: 26,758 to 12,487 (-53.3%). Ceuta fell by 68.4% and Melilla rose by 19%. The Balearic Islands rose by 70.9%, a sign of a partial shift of routes to the central Mediterranean. Intercepted boats: -17.9% (1,122 to 921).</p>
      <p>By land, the trend is the opposite: Ceuta +18.5% (2,026 to 2,401) and Melilla +266% (62 to 227), pointing to a resurgence of border attempts, especially in Melilla.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Factors explaining the decline</h3>
      <ul class="list-disc ml-6 space-y-1 text-slate-700">
        <li>Joint Mauritania-Spain patrols reinforce Atlantic surveillance.</li>
        <li>Stricter controls in Mauritania and an increase in detentions/expulsions to Mali and Senegal.</li>
        <li>Cooperation with Senegal and Mauritania to contain routes.</li>
      </ul>
      <p>Even so, departures from Guinea Conakry and Guinea-Bissau are increasing, suggesting that the decline may be temporary.</p>

      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Conclusion</h3>
      <p>The provisional balance for 2025 shows a lower flow by sea, but pressure continues and routes are adapting. Constant monitoring is key to anticipating upturns and designing effective and sustainable policies.</p>
    `,
        relatedArticles: []
    },
    {
        slug: 'comparativa-partidos-politicos-2024',
        type: 'Infografía',
        type_en: 'Infographic',
        contentKind: 'infografia',
        category: 'Política · España',
        category_en: 'Politics · Spain',
        title: 'Comparativa de partidos políticos ante el Pacto Migratorio',
        title_en: 'Comparison of political parties on the Migration Pact',
        subtitle: 'Síntesis comparada de las propuestas en materia de inmigración de los principales partidos políticos en España (2025).',
        subtitle_en: 'Comparative overview of immigration proposals from Spain\'s main political parties (2025).',
        heroImage: "/images/infografia-partidospoliticoses.png",
        heroImage_en: "/images/infografia-partidospoliticosen.png",
        mainImage: "/images/infografia-partidospoliticoses.png",
        mainImage_en: "/images/infografia-partidospoliticosen.png",
        mainImageCaption: 'Comparativa de propuestas migratorias de partidos políticos en España.',
        mainImageCaption_en: 'Comparison of migration proposals from political parties in Spain.',
        publishDate: '20 Oct 2025',
        readTime: '6 min',
        author: {
            name: 'Equipo IEAM',
            name_en: 'IEAM Team',
            role: 'Investigación',
            role_en: 'Research',
            image: '/favicon-new.png',
            bio: 'Investigación y análisis de políticas públicas.',
            bio_en: 'Research and analysis of public policies.'
        },
        pullQuote: 'El consenso político se fractura en los detalles de implementación del Pacto.',
        pullQuote_en: 'The political consensus is fractured on the details of the Pact\'s implementation.',
        materials: [
            {
                label: 'Descargar infografía (ES)',
                label_en: 'Download infographic (ES)',
                url: '/docs/IEAM-2025-005-ES_partidos-pacto.pdf'
            },
            {
                label: 'Descargar infografía (EN)',
                label_en: 'Download infographic (EN)',
                url: '/docs/IEAM-2025-005-EN_parties-pact.pdf'
            }
        ],
        content: `
      <p>En IEAM – Instituto Español de Análisis Migratorio presentamos una síntesis comparada de las propuestas en materia de inmigración incluidas en los programas nacionales (2025) de los principales partidos políticos en España. La infografía identifica diferencias claras en modelo, prioridades y enfoque regulatorio que previsiblemente marcarán el debate migratorio en los próximos meses.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Cuatro enfoques, cuatro lógicas de política migratoria</h3>
      
      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">1) PSOE: ordenación, vías legales e integración con reformas</h4>
      <p>El programa socialista se articula en torno a una migración ordenada, segura y humanitaria, con énfasis en derechos humanos y cooperación internacional. Plantea reforzar la contratación en origen, avanzar en la reforma del Reglamento de Extranjería (arraigo laboral, residencia por formación) y desplegar un Plan Estatal de Integración y Convivencia con recursos para CCAA y ayuntamientos. Incluye, además, el cierre progresivo de los CIE, sustituyéndolos por alternativas de acogida.</p>
      
      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">2) PP: control, coordinación institucional y visado por puntos</h4>
      <p>El Partido Popular propone un enfoque de gobernanza y control, con la creación de una autoridad única para coordinar la política migratoria. Sitúa el empleo como vía principal de entrada, introduciendo un visado por puntos basado en mérito e integración, y rechaza regularizaciones masivas. También refuerza el control de fronteras (medios, tecnología y cooperación europea), y vincula ayudas sociales a residencia legal y “esfuerzo” de integración.</p>
      
      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">3) Sumar: regularización amplia y garantías de derechos</h4>
      <p>Sumar plantea una agenda centrada en regularización e integración, con una regularización extraordinaria inmediata de alrededor de 500.000 personas y una reforma integral del marco legal para habilitar un procedimiento de regularización permanente y simplificar trámites. Defiende el cierre de los CIE y apuesta por medidas de inclusión (incluida la dimensión digital y de accesibilidad administrativa).</p>
      
      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">4) VOX: expulsiones, restricción de ayudas y endurecimiento del sistema</h4>
      <p>VOX adopta un enfoque de máxima disuasión: expulsión inmediata de quienes entren irregularmente y prioridad para expulsar también a residentes legales que cometan delitos graves o reincidan. Rechaza regularizaciones, propone suprimir ayudas a personas en situación irregular y eliminar subvenciones a ONG vinculadas (según su planteamiento) al rescate o asistencia migratoria. Incluye medidas específicas sobre MENAs y condiciona cooperación al desarrollo a la colaboración en devoluciones y control fronterizo.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Ejes que estructuran el debate</h3>
      <p>Mirado en conjunto, la comparación permite identificar cuatro ejes que separan propuestas:</p>
      <ul class="list-disc ml-6 space-y-2 text-slate-700">
        <li>Vías legales vs. disuasión/expulsión (y el peso del empleo como puerta de entrada).</li>
        <li>Regularización (extraordinaria o permanente) vs. rechazo total de regularizaciones.</li>
        <li>Integración y recursos públicos (planes, educación y empleo) vs. condicionalidad estricta de ayudas.</li>
        <li>Modelo institucional y de control (autoridad única, refuerzo fronterizo, papel europeo y Frontex, CIE sí/no).</li>
      </ul>
      <p class="mt-6">En IEAM seguiremos actualizando este análisis comparado para contribuir a un debate público más informado y útil para la toma de decisiones.</p>
    `,
        content_en: `
      <p>At IEAM – Spanish Institute for Migration Analysis, we present a comparative summary of the immigration proposals included in the national programs (2025) of the main political parties in Spain. The infographic identifies clear differences in model, priorities, and regulatory approach that are likely to shape the migration debate in the coming months.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Four approaches, four migration policy rationales</h3>
      
      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">1) PSOE: order, legal channels, and integration with reforms</h4>
      <p>The socialist program is structured around orderly, safe, and humanitarian migration, with an emphasis on human rights and international cooperation. It proposes strengthening recruitment at source, advancing the reform of the Immigration Regulations (work permits, residence for training) and deploying a State Plan for Integration and Coexistence with resources for autonomous communities and local councils. It also includes the progressive closure of the CIE, replacing them with reception alternatives.</p>
      
      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">2) PP: control, institutional coordination, and points-based visas</h4>
      <p>The Popular Party proposes an approach based on governance and control, with the creation of a single authority to coordinate migration policy. It places employment as the main route of entry, introducing a points-based visa system based on merit and integration, and rejects mass regularizations. It also strengthens border control (resources, technology, and European cooperation) and links social assistance to legal residence and “efforts” at integration.</p>
      
      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">3) Sumar: broad regularization and guarantees of rights</h4>
      <p>Sumar proposes an agenda focused on regularization and integration, with immediate extraordinary regularization of around 500,000 people and a comprehensive reform of the legal framework to enable a permanent regularization procedure and simplify procedures. It advocates the closure of the CIE (Immigrant Detention Centers) and is committed to inclusion measures (including the digital dimension and administrative accessibility).</p>
      
      <h4 class="text-lg font-bold text-slate-800 mt-6 mb-2">4) VOX: expulsions, restriction of aid, and tightening of the system</h4>
      <p>VOX adopts an approach of maximum deterrence: immediate expulsion of those who enter irregularly and priority for the expulsion of legal residents who commit serious crimes or are repeat offenders. It rejects regularization, proposes abolishing aid to people in an irregular situation, and eliminating subsidies to NGOs linked (according to its approach) to rescue or migration assistance. It includes specific measures on unaccompanied foreign minors and makes development cooperation conditional on collaboration in returns and border control.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Axis structuring the debate</h3>
      <p>Taken together, the comparison allows us to identify four axes that separate the proposals:</p>
      <ul class="list-disc ml-6 space-y-2 text-slate-700">
        <li>Legal channels vs. deterrence/expulsion (and the importance of employment as a gateway).</li>
        <li>Regularization (extraordinary or permanent) vs. total rejection of regularizations.</li>
        <li>Integration and public resources (plans, education, and employment) vs. strict conditionality of aid.</li>
        <li>Institutional and control model (single authority, border reinforcement, European role and Frontex, CIE yes/no).</li>
      </ul>
      <p class="mt-6">At IEAM, we will continue to update this comparative analysis to contribute to a more informed and useful public debate for decision-making.</p>
    `,
        relatedArticles: []
    },
    {
        slug: 'comparativa-frontex-2024',
        type: 'Infografía',
        contentKind: 'infografia',
        category: 'Seguridad · Fronteras',
        title: 'Comparativa: La evolución del mandato de Frontex',
        title_en: 'Comparison: The evolution of the Frontex mandate',
        subtitle: 'Cómo ha cambiado la agencia de fronteras europea en la última década.',
        subtitle_en: 'How the European border agency has changed over the last decade.',
        heroImage: "/images/infografia-frontexes.jpg",
        heroImage_en: "/images/infografia-frontexen.jpg",
        mainImage: "/images/infografia-frontexes.jpg",
        mainImage_en: "/images/infografia-frontexen.jpg",
        mainImageCaption: 'Operación conjunta en el Mediterráneo.',
        publishDate: '05 Nov 2024',
        readTime: '8 min',
        author: {
            name: 'Equipo IEAM',
            name_en: 'IEAM Team',
            role: 'Investigación',
            role_en: 'Research',
            image: '/favicon-new.png',
            bio: 'Unidad de investigación IEAM.',
            bio_en: 'IEAM Research Unit.'
        },
        materials: [
            {
                label: 'Infografía (ES)',
                label_en: 'Infographic (ES)',
                url: '/docs/IEAM-2024-001-ES_frontex-mandato.pdf'
            },
            {
                label: 'Descargar infografía (EN)',
                label_en: 'Download infographic (EN)',
                url: '/docs/IEAM-2024-001-EN_frontex-mandate.pdf'
            }
        ],
        pullQuote: 'Un sistema de retorno creíble debe basarse en la confianza, la transparencia y el respeto a los derechos humanos.',
        pullQuote_en: 'A credible return system must be based on trust, transparency, and respect for human rights.',
        content: `
      <p>Desde IEAM Instituto Español de Análisis Migratorio, destacamos la reciente reunión organizada por Frontex los días 5 y 6 de noviembre de 2025 en Varsovia, centrada en el desarrollo de un sistema integrado de monitoreo de retornos en la UE.</p>
      <p>El encuentro reunió a representantes de la Oficina de Derechos Fundamentales (FRO) de Frontex para debatir cómo fortalecer un sistema de retorno humano, seguro y respetuoso con los derechos fundamentales.</p>
      <p>El monitoreo de retornos es una herramienta esencial para garantizar que toda operación respete la legalidad y la dignidad de las personas retornadas, mediante criterios objetivos y transparentes que favorezcan la coherencia, la rendición de cuentas y la identificación de buenas prácticas.</p>
      <p>Durante las sesiones, los participantes subrayaron la necesidad de una cooperación estructurada entre los niveles europeo y nacional, y coincidieron en que un sistema de retorno creíble debe basarse en la confianza, la transparencia y el respeto a los derechos humanos.</p>
    `,
        content_en: `
      <p>From IEAM Instituto Español de Análisis Migratorio, we highlight the recent meeting held by Frontex on 5–6 November 2025 in Warsaw, dedicated to advancing an EU integrated monitoring system of returns.</p>
      <p>The event brought together forced-return monitors and members of Frontex's Fundamental Rights Office (FRO) to discuss how to strengthen a return system that is humane, safe and respectful of fundamental rights.</p>
      <p>Return monitoring is a key mechanism ensuring that all operations uphold legality, dignity and accountability, based on objective and transparent criteria that promote fairness and best practices across Member States.</p>
      <p>Participants stressed the need for structured cooperation between EU and national levels, reaffirming that a credible return system must rest on trust, transparency and a shared commitment to human rights.</p>
    `,
        relatedArticles: []
    },

    {
        slug: 'entrevista-beatriz-mauritania-canarias',
        type: 'Entrevista',
        type_en: 'Interview',
        contentKind: 'entrevista',
        category: 'Entrevista · Flujos Atlánticos',
        category_en: 'Interview · Atlantic Flows',
        title: 'Sahel–España: cómo se transforman las rutas hacia Canarias, la península y las islas',
        title_en: 'Sahel–Spain: how routes to the Canary Islands, the Peninsula and the islands are changing',
        subtitle: 'La directora del IEAM analiza cómo la presión a Mauritania y la inestabilidad del Sahel influyen en los flujos hacia Canarias.',
        subtitle_en: 'The Director of IEAM analyses how pressure on Mauritania and instability in the Sahel are influencing migration flows toward the Canary Islands.',
        heroImage: '/images/prensa-diciembre2025.jpg',
        mainImage: '/images/prensa-diciembre2025.jpg',
        mainImageCaption: 'Beatriz de León Cobo durante la jornada sobre Sahel y ruta hacia Canarias.',
        mainImageCaption_en: 'Beatriz de León Cobo during the session on the Sahel and the route to the Canary Islands.',
        publishDate: '20 Sep 2025',
        readTime: '7 min',
        author: {
            name: 'Beatriz de León Cobo',
            role: 'Directora IEAM',
            role_en: 'IEAM Director',
            image: '/team/member-2.jpg',
            bio: 'Directora del IEAM y consultora en Sic Transit Advisory; profesora en la Universidad Francisco de Vitoria.',
            bio_en: 'Director of IEAM and consultant at Sic Transit Advisory; professor at the Universidad Francisco de Vitoria.'
        },
        pullQuote: 'La presión ejercida por el Gobierno de Mauritania ha intensificado el control tras el aumento de salidas desde Senegal y Mali.',
        pullQuote_en: 'Pressure from the Government of Mauritania has led to intensified control following the increase in departures from Senegal and Mali.',
        content: `
      <p>Beatriz de León Cobo, directora del Instituto Español de Análisis Migratorio (IEAM), participó en una jornada organizada por el Gobierno de Canarias sobre la geopolítica del Sahel y su impacto en la ruta migratoria hacia el Archipiélago. En esta entrevista para "La Provincia", analiza los factores que explican las dinámicas actuales.</p>
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">¿Cómo influye la inestabilidad del Sahel en los flujos hacia Canarias?</h3>
      <p>Tres factores explican el incremento: la crisis de gobernanza en el Sahel (prioridad al terrorismo sobre servicios y gestión migratoria), la crisis económica y de seguridad, y factores estructurales como la crisis climática. La mayoría de perfiles son migrantes económicos, especialmente de Mali.</p>
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">¿Es suficiente reforzar Frontex?</h3>
      <p>Útil en emergencia, pero insuficiente por sí sola. Se requiere estrategia integral en origen y tránsito, combinando apoyo operativo, coordinación internacional y desarrollo. Existen marcos UE-Mauritania y España-Senegal, pero deben ampliarse.</p>
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">¿Respuesta limitada de la UE?</h3>
      <p>La UE refleja prioridades diversas (Ucrania, Oriente Medio, ayuda internacional). Europa se rearma y redefine prioridades; la presión ciudadana y mediática en cada Estado miembro es clave para mantener el Sahel en la agenda.</p>
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">¿Por qué no hay estabilidad pese a misiones ONU/UE?</h3>
      <p>Más que fracaso, resultados limitados: sin sostenibilidad ni apropiación local, el impacto no perdura al retirarse el donante. Los programas deben consolidarse para que continúen cuando la atención se desplace.</p>
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">¿El yihadismo en el Sahel amenaza a Canarias?</h3>
      <p>No: las organizaciones han declarado no querer atacar Europa tras la retirada internacional; se concentran en la región y expansión hacia el sur (Benín, Ghana, Togo).</p>
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">¿Por qué bajan las llegadas a Canarias?</h3>
      <p>Por la presión del Gobierno de Mauritania ante el aumento de salidas desde Senegal y Mali. La ruta argelina es muy peligrosa y las redes han buscado alternativas. Es pronto para saber si se mantendrá la tendencia.</p>
    `,
        content_en: `
      <p>Beatriz de León Cobo, Director of the Spanish Institute for Migration Analysis (IEAM), took part in a session organised by the Government of the Canary Islands on the geopolitics of the Sahel and its impact on the migration route toward the archipelago. In this interview for La Provincia, she analyses the factors that explain current dynamics.</p>
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">How does instability in the Sahel influence migration flows toward the Canary Islands?</h3>
      <p>Three factors explain the increase: the governance crisis in the Sahel, where counterterrorism takes precedence over public services and migration management; the economic and security crisis; and structural factors such as the climate crisis. The majority of profiles are economic migrants, particularly from Mali.</p>
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Is strengthening Frontex enough?</h3>
      <p>Useful in emergencies, but insufficient on its own. A comprehensive strategy is needed at the origin and transit stages, combining operational support, international coordination, and development. EU–Mauritania and Spain–Senegal frameworks exist, but they need to be expanded.</p>
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Limited response from the EU?</h3>
      <p>The EU reflects diverse priorities (Ukraine, the Middle East, international aid). Europe is rearming and redefining its priorities; public and media pressure in each Member State is key to keeping the Sahel on the agenda.</p>
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Why is there no stability despite UN/EU missions?</h3>
      <p>Rather than a failure, the results are limited: without sustainability or local ownership, the impact does not last once the donor withdraws. Programs need to be consolidated so they can continue when attention shifts elsewhere.</p>
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Does jihadism in the Sahel threaten the Canary Islands?</h3>
      <p>No: the organisations have stated that they do not intend to attack Europe following the international withdrawal; they are focused on the region and expansion southward (Benin, Ghana, Togo).</p>
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Why are arrivals in the Canary Islands decreasing?</h3>
      <p>Due to pressure from the Government of Mauritania in response to the increase in departures from Senegal and Mali. The Algerian route is very dangerous, and trafficking networks have sought alternatives. It is too early to know whether this trend will continue.</p>
    `,
        relatedArticles: []
    },
    {
        slug: 'reseña-presentacion-informe-mediterraneo-2024',
        type: 'Reseña de evento',
        contentKind: 'reseña-evento',
        category: 'Mediterráneo · Política migratoria',
        title: 'Presentación del informe sobre la migración irregular en el Mediterráneo',
        subtitle: 'Un nuevo enfoque sobre los flujos migratorios que afectan al Mediterráneo.',
        heroImage: '/images/evento-mesaredonda.jpg',
        mainImage: '/images/evento-mesaredonda-interna.jpg',
        mainImageCaption: 'Mesa redonda sobre migración en el Mediterráneo con actores del sur de Europa y norte de África.',
        publishDate: '24 Sep 2024',
        readTime: '9 min',
        author: {
            name: 'Equipo IEAM',
            role: 'Reseña de eventos',
            image: '/favicon-new.png',
            bio: 'Unidad de análisis y cobertura de eventos estratégicos del IEAM.'
        },
        pullQuote: 'La migración no es una crisis puntual: requiere cooperación a largo plazo y vías legales que acompañen la seguridad y el desarrollo.',
        content: `
      <p>El 24 de septiembre de 2024, la Oficina del Parlamento Europeo y la Comisión Europea en Madrid acogió un encuentro para debatir retos y oportunidades de la migración mediterránea. Organizado por Fundación Fortius y Principios, reunió voces del sur de Europa y el norte de África para fomentar el diálogo sobre flujos migratorios.</p>
      <p>Juan Ángel Soto (Fortius) y Jorge Aguado (Principios) destacaron la cooperación transfronteriza y el rol del Diálogo Mediterráneo, que ya conecta a más de 20 organizaciones de 12 países.</p>
      <p>Se presentó un libro blanco que analiza migración informal y políticas actuales, insistiendo en que seguridad y control fronterizo son necesarios pero insuficientes sin desarrollo, vías legales y reducción de desigualdades.</p>
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Mesas redondas</h3>
      <p><strong>Mesa 1: Sur de Europa</strong> – España, Italia y Portugal subrayaron colaboración y solidaridad. Participaron Irune Ariño, Karina Kozhakhmet, Gonçalo Torres; moderó Mark Vargha.</p>
      <p><strong>Mesa 2: Perspectiva norteafricana</strong> – Loubna El Hassouni, Dr. Mohamed Wounouki y Malak Darwish abordaron dinámicas de origen y tránsito; moderó Tasnim Idriss.</p>
      <p><strong>Mesa 3: Cooperación y desarrollo</strong> – Rafael Herráiz, Iñaki Díaz y Miguel Rico discutieron inversión en origen y vías legales; moderó Liskel Álvarez Domínguez.</p>
      <p>Las conclusiones: la migración es estructural, requiere cooperación sostenida y políticas adaptadas por región, combinando control, integración y desarrollo en origen.</p>
    `,
        relatedArticles: [
            { id: 'cumbre-hungria-crisis-migratoria-2025', title: 'Hungría acoge una cumbre internacional sobre la crisis migratoria europea', image: '/images/evento-hungria.webp', badge: 'Cumbre', metadata: { date: '24-25 Sep 2025', readTime: '—' } }
        ]
    },
    {
        slug: 'reseña-migracion-irregular-marruecos-2024',
        type: 'Reseña de evento',
        contentKind: 'reseña-evento',
        category: 'Marruecos · Mediterráneo',
        title: 'Migración irregular en Marruecos',
        subtitle: 'Diálogo Mediterráneo en Rabat: factores, impacto y respuestas regionales.',
        heroImage: '/images/evento-debateintegral.jpg',
        mainImage: '/images/evento-debateintegralinterno.jpeg',
        mainImageCaption: 'Debate en UIR Rabat Business School sobre migración irregular en Marruecos.',
        publishDate: '17 Oct 2024',
        readTime: '8 min',
        author: {
            name: 'Equipo IEAM',
            role: 'Reseña de eventos',
            image: '/favicon-new.png',
            bio: 'Unidad de análisis y cobertura de eventos estratégicos del IEAM.'
        },
        pullQuote: 'La migración no es una crisis; es un fenómeno estructural que exige cooperación y políticas adaptadas a cada orilla.',
        content: `
      <p>Diálogo Mediterráneo, red de think tanks comprometida con la libertad y el bienestar humano, organizó en Rabat (UIR Business School) un debate integral sobre migración irregular en Marruecos y su impacto en el Mediterráneo, acogido por AMSED.</p>
      <p>Participaron expertos, responsables políticos y líderes de sociedad civil, con la presencia de Juan Ángel Soto Gómez (Fundación Fortius) y Tasnim Idriss (coordinación de Diálogo Mediterráneo).</p>
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Mesa 1: Factores e impacto</h3>
      <p>Analizó los impulsores económicos, políticos y ambientales de la migración irregular desde y a través de Marruecos, y su efecto en mercados laborales, estructuras sociales y dinámicas políticas.</p>
      <p>Ponentes: Reybet-Degat Francois (ACNUR), Mohammed OUALI ALAMI (AMSED), Maftaha Benchlikha (OIM), Abderrahman Benyahya (Droits et Justice), Abdeslam Sbatri (Organisation des Jeunes Africains).</p>
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Mesa 2: Respuestas y cooperación</h3>
      <p>Evaluó políticas migratorias marroquíes y cooperación regional, brechas de implementación y alineación con marcos internacionales. Ponentes: Ivan Martin (Policy Center for the New South), Aurélie Eragne (CNDH), Norman Sempijja (UM6P), Alicia Tintelin (Hijra Legal Clinic).</p>
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Informe nacional e iniciativas</h3>
      <p>Se presentó la nota país sobre migración irregular en Marruecos y un informe mediterráneo basado en 12 notas país, además de próximas iniciativas estratégicas, incluido el análisis de las elecciones europeas 2024.</p>
      <p>El evento concluyó subrayando que la migración es estructural y requiere diálogo y cooperación sostenidos para abordarla desde origen y destino.</p>
    `,
        relatedArticles: [
            { id: 'presentacion-informe-mediterraneo', title: 'Presentación del informe sobre la migración irregular en el Mediterráneo', image: '/images/evento-mesaredonda.jpg', badge: 'Presentación', metadata: { date: '24 Sep 2024', readTime: '—' } }
        ]
    },
    {
        slug: 'comparativa-llegadas-espana-nov-2025',
        type: 'Infografía',
        type_en: 'Infographic',
        contentKind: 'infografia',
        category: 'Flujos · España',
        category_en: 'Flows · Spain',
        title: 'Comparativa de llegadas migratorias a España por vía terrestre y marítima (2024-2025) Actualización Noviembre',
        title_en: 'Comparison of migratory arrivals to Spain by land and sea (2024-2025) November Update',
        subtitle: 'El flujo migratorio hacia España desciende 41% hasta mediados de noviembre, con una reconfiguración de rutas hacia el Mediterráneo.',
        subtitle_en: 'Migratory flow to Spain drops 41% by mid-November, with a reconfiguration of routes towards the Mediterranean.',
        heroImage: '/images/infografia-comparativamigratorias-es-nov2025.jpg',
        heroImage_en: '/images/infografia-comparativamigratorias-en-nov2025.jpg',
        mainImage: '/images/infografia-comparativamigratorias-es-nov2025.jpg',
        mainImage_en: '/images/infografia-comparativamigratorias-en-nov2025.jpg',
        mainImageCaption: 'Evolución de llegadas migratorias a España (Ene-Nov 2025).',
        mainImageCaption_en: 'Evolution of migratory arrivals to Spain (Jan-Nov 2025).',
        publishDate: '25 Nov 2025',
        readTime: '5 min',
        author: {
            name: 'Equipo IEAM',
            name_en: 'IEAM Team',
            role: 'Investigación',
            role_en: 'Research',
            image: '/favicon-new.png',
            bio: 'Unidad de datos y análisis territorial del IEAM.',
            bio_en: 'IEAM Data and Territorial Analysis Unit.'
        },
        pullQuote: 'Baja el flujo total, pero las rutas se ajustan: el Mediterráneo gana peso y la presión se redistribuye.',
        pullQuote_en: 'The total flow is decreasing, but the routes are adjusting: the Mediterranean is gaining weight and the pressure is being redistributed.',
        materials: [
            {
                label: 'Descargar infografía (ES)',
                label_en: 'Download infographic (ES)',
                url: '/docs/IEAM-2025-006-ES_llegadas-nov.pdf'
            },
            {
                label: 'Descargar infografía (EN)',
                label_en: 'Download infographic (EN)',
                url: '/docs/IEAM-2025-006-EN_arrivals-nov.pdf'
            }
        ],
        content: `
      <p>Según los últimos datos del Ministerio del Interior, el flujo migratorio hacia España cayó un 41% entre el 1 de enero y el 15 de noviembre de 2025 frente al mismo periodo de 2024: 31.742 personas vs. 54.216 (22.474 menos).</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Descenso general, con cambios claros por ruta</h3>
      <p>Por vía marítima, las llegadas bajan en torno a un 45%: 51.849 → 28.362. La caída se explica sobre todo por Canarias, que pasa de 39.713 → 14.690 (-63%).</p>
      <p>A la vez, se confirma un desplazamiento relativo hacia el Mediterráneo:</p>
      <ul class="list-disc ml-6 space-y-1 text-slate-700">
        <li><strong>Península:</strong> 7.408 → 6.929 (descenso leve).</li>
        <li><strong>Baleares:</strong> 4.717 → 6.683 (+41,7%), señal de mayor peso de la ruta mediterránea.</li>
        <li><strong>Ceuta (marítima):</strong> 28 → 5 (-82,1%).</li>
        <li><strong>Melilla (marítima):</strong> 21 → 25 (+19%).</li>
      </ul>
      <p>Además, disminuye el número total de embarcaciones: 1.539 → 1.122 (-27,1%).</p>
      <p>Por vía terrestre, la foto es mixta: Ceuta: 3.101 → 2.281 (descenso). Melilla: 86 → 279 (+224%), repunte muy significativo.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Claves para entender la reconfiguración</h3>
      <p>La infografía apunta a varios elementos que ayudan a interpretar el cambio:</p>
      <ul class="list-disc ml-6 space-y-1 text-slate-700">
        <li>Aumentan las llegadas de somalíes a las costas españolas (posible indicador de nuevos enlaces de tránsito).</li>
        <li>El punto de partida más habitual desde el Sahel se desplaza a Argelia, reforzando el papel del Mediterráneo.</li>
        <li>Más presión en el corredor Mali–Mauritania por restricciones y expulsiones, mientras el Mediterráneo se refuerza como principal vía de entrada.</li>
      </ul>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Conclusión</h3>
      <p>El balance provisional hasta el 15 de noviembre de 2025 refleja una reducción fuerte del total, pero también una adaptación de rutas: menos Canarias, más señales de Mediterráneo y un repunte terrestre en Melilla que conviene vigilar de cerca.</p>
    `,
        content_en: `
      <p>According to the latest data from the Ministry of the Interior, the flow of migrants to Spain fell by 41% between January 1 and November 15, 2025, compared to the same period in 2024: 31,742 people vs. 54,216 (22,474 fewer).</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Overall decline, with clear changes by route</h3>
      <p>By sea, arrivals fell by around 45%: 51,849 → 28,362. The decline is mainly explained by the Canary Islands, which went from 39,713 → 14,690 (-63%).</p>
      <p>At the same time, a relative shift towards the Mediterranean is confirmed:</p>
      <ul class="list-disc ml-6 space-y-1 text-slate-700">
        <li><strong>Peninsula:</strong> 7,408 → 6,929 (slight decrease).</li>
        <li><strong>Balearic Islands:</strong> 4,717 → 6,683 (+41.7%), a sign of the greater importance of the Mediterranean route.</li>
        <li><strong>Ceuta (maritime):</strong> 28 → 5 (-82.1%).</li>
        <li><strong>Melilla (maritime):</strong> 21 → 25 (+19%).</li>
      </ul>
      <p>In addition, the total number of vessels has decreased: 1,539 → 1,122 (-27.1%).</p>
      <p>By land, the picture is mixed: Ceuta: 3,101 → 2,281 (decrease). Melilla: 86 → 279 (+224%), a very significant increase.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Keys to understanding the reconfiguration</h3>
      <p>The infographic points to several elements that help to interpret the change:</p>
      <ul class="list-disc ml-6 space-y-1 text-slate-700">
        <li>There has been an increase in the number of Somalis arriving on Spanish shores (a possible indicator of new transit links).</li>
        <li>The most common point of departure from the Sahel has shifted to Algeria, reinforcing the role of the Mediterranean.</li>
        <li>There is more pressure on the Mali-Mauritania corridor due to restrictions and expulsions, while the Mediterranean is becoming the main route of entry.</li>
      </ul>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Conclusion</h3>
      <p>The provisional balance up to November 15, 2025, reflects a sharp reduction in the total, but also an adaptation of routes: fewer Canary Islands, more signs of the Mediterranean, and a land-based upturn in Melilla that should be closely monitored.</p>
    `,
        relatedArticles: []
    },
    {
        slug: 'perspectivas-migracion-internacional-2025',
        type: 'Infografía',
        type_en: 'Infographic',
        contentKind: 'infografia',
        category: 'Migración · OCDE',
        category_en: 'Migration · OECD',
        title: 'Perspectivas de la migración internacional, 2025',
        title_en: 'International Migration Outlook, 2025',
        subtitle: 'Análisis del informe de la OCDE sobre la migración permanente y la población nacida en el extranjero en países europeos.',
        subtitle_en: 'Analysis of the OECD report on permanent migration and the foreign-born population in European countries.',
        heroImage: '/images/internationalmigrationoutlook_ES.png',
        heroImage_en: '/images/internationalmigrationoutlook_EN.png',
        mainImage: '/images/internationalmigrationoutlook_ES.png',
        mainImage_en: '/images/internationalmigrationoutlook_EN.png',
        mainImageCaption: 'Infografía: Perspectivas de la migración internacional, 2025.',
        mainImageCaption_en: 'Infographic: International Migration Outlook, 2025.',
        publishDate: '29 Jan 2026',
        readTime: '6 min',
        author: {
            name: 'Equipo IEAM',
            name_en: 'IEAM Team',
            role: 'Investigación',
            role_en: 'Research',
            image: '/favicon-new.png',
            bio: 'Unidad de datos y análisis del IEAM.',
            bio_en: 'IEAM Data and Analysis Unit.'
        },
        pullQuote: 'A pesar de una disminución del 4%, el número total de nuevos inmigrantes permanentes sigue siendo históricamente alto, alcanzando los 6,2 millones de personas.',
        pullQuote_en: 'Despite a 4% decrease, the total number of new permanent immigrants remains historically high, reaching 6.2 million people.',
        materials: [
            {
                label: 'Descargar infografía (ES)',
                label_en: 'Download infographic (ES)',
                url: '/docs/IEAM-2026-007-ES-internationalmigrationoutlook.pdf'
            },
            {
                label: 'Descargar infografía (EN)',
                label_en: 'Download infographic (EN)',
                url: '/docs/IEAM-2026-007-EN-internationalmigrationoutlook.pdf'
            }
        ],
        content: `
      <p>La edición de 2025 de International Migration Outlook destaca un ligero descenso de la inmigración permanente a los países de la OCDE en 2024. A pesar de una disminución del 4 %, el número total de nuevos inmigrantes permanentes sigue siendo históricamente alto, alcanzando los 6,2 millones de personas, lo que representa un aumento del 15 % en comparación con los niveles registrados en 2019, antes de la pandemia.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Porcentaje de población nacida en el extranjero en cuatro países europeos, 2024</h3>
      <p>Entre la información presentada en el informe, el IEAM analizó el porcentaje de población nacida en el extranjero en cuatro países europeos especialmente afectados por estas dinámicas migratorias: España, Italia, Alemania y Francia.</p>
      <ul class="list-disc ml-6 space-y-2 text-slate-700">
        <li><strong>España</strong> cuenta con 8,8 millones de residentes nacidos en el extranjero, lo que representa el 18,4 % de su población total. Esta proporción ha aumentado un 48 % desde 2014.</li>
        <li><strong>Italia</strong> cuenta con 6,7 millones de residentes nacidos en el extranjero, lo que representa el 11,2 % de su población total. Esta proporción ha aumentado un 16 % desde 2014.</li>
        <li><strong>Alemania</strong> cuenta con 16,2 millones de residentes nacidos en el extranjero, lo que representa el 19,1 % de su población total. Esta proporción ha aumentado un 55 % desde 2014.</li>
        <li><strong>Francia</strong> cuenta con 9,3 millones de residentes nacidos en el extranjero, lo que representa el 14 % de su población total. Esta proporción ha aumentado un 21 % desde 2014.</li>
      </ul>
      <p>Estos cambios reflejan una dinámica migratoria sostenida, impulsada en gran medida por motivos familiares, económicos y humanitarios.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Principales motivos de la migración permanente a los países de la OCDE</h3>
      <p>La reunificación familiar sigue siendo el principal motivo de la migración permanente a los países de la OCDE. La migración laboral, tras un aumento continuo desde 2020, ha disminuido ligeramente. Al mismo tiempo, la migración humanitaria está aumentando, en relación con el elevado número de solicitudes de asilo.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Principales avances en las políticas de migración e integración</h3>
      <p>En respuesta a los importantes flujos migratorios, las políticas de migración e integración de varios países de la OCDE han sido objeto de importantes reformas. Las políticas de migración laboral se centran en atraer talento y satisfacer las necesidades específicas del mercado laboral. Al mismo tiempo, muchos países han endurecido sus sistemas de asilo, introduciendo procedimientos acelerados, reduciendo las prestaciones y aplicando nuevas restricciones a la reunificación familiar. El acceso a los programas de integración también se ha regulado más y va acompañado de mayores obligaciones para los recién llegados.</p>
      <p>No obstante, este endurecimiento de las políticas va acompañado de una ampliación del apoyo específico, en particular para las mujeres migrantes.</p>
    `,
        content_en: `
      <p>The 2025 edition of the International Migration Outlook highlights a slight decline in permanent immigration to OECD countries in 2024. Despite a 4% decrease, the total number of new permanent immigrants remains historically high, reaching 6.2 million people, which represents a 15% increase compared with levels recorded in 2019, before the pandemic.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Share of the Foreign-Born Population in Four European Countries, 2024</h3>
      <p>Among the information presented in the report, the IEAM analyzed the share of the foreign-born population in four European countries particularly affected by these migration dynamics: Spain, Italy, Germany, and France.</p>
      <ul class="list-disc ml-6 space-y-2 text-slate-700">
        <li><strong>Spain</strong> has 8.8 million foreign-born residents, representing 18.4% of its total population. This share has increased by 48% since 2014.</li>
        <li><strong>Italy</strong> has 6.7 million foreign-born residents, representing 11.2% of its total population. This share has increased by 16% since 2014.</li>
        <li><strong>Germany</strong> has 16.2 million foreign-born residents, representing 19.1% of its total population. This share has increased by 55% since 2014.</li>
        <li><strong>France</strong> has 9.3 million foreign-born residents, representing 14% of its total population. This share has increased by 21% since 2014.</li>
      </ul>
      <p>These changes reflect a sustained migration dynamic, largely driven by family, economic, and humanitarian motives.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Main Reasons for Permanent Migration to OECD Countries</h3>
      <p>Family reunification remains the primary reason for permanent migration to OECD countries. Labor migration, after a continuous increase since 2020, has slightly declined. At the same time, humanitarian migration is on the rise, linked to the high number of asylum applications.</p>
      
      <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Major Developments in Migration and Integration Policies</h3>
      <p>In response to significant migration flows, migration and integration policies in several OECD countries have undergone major reforms. Labor migration policies focus on attracting talent and meeting specific labor market needs. At the same time, many countries have tightened their asylum systems, introducing accelerated procedures, reduced benefits, and new restrictions on family reunification. Access to integration programs has also become more regulated and is accompanied by increased obligations for new arrivals.</p>
      <p>Nevertheless, this tightening of policies is accompanied by an expansion of targeted support, particularly for migrant women.</p>
    `,
        relatedArticles: []
    },
    {
        slug: 'ieam-ganador-foessa-2025',
        type: 'Nota de prensa',
        type_en: 'Press Release',
        contentKind: 'nota-prensa',
        category: 'Investigación · Premios',
        category_en: 'Research · Awards',
        title: 'IEAM, ganador del Concurso de Proyectos de Investigación FOESSA 2025',
        title_en: 'IEAM, winner of the FOESSA Foundation 2025 Research Project Competition',
        subtitle: 'El proyecto “Puentes y muros: itinerarios de inclusión de las personas migrantes en España” ha sido seleccionado como ganador.',
        subtitle_en: 'The project “Bridges and Walls: Pathways to the Inclusion of Migrants in Spain” has been selected as the winner.',
        heroImage: '/images/ieam_ganador.jpg',
        mainImage: '/images/ieam_ganador.jpg',
        mainImageCaption: 'IEAM galardonado por la Fundación FOESSA.',
        mainImageCaption_en: 'IEAM awarded by the FOESSA Foundation.',
        publishDate: '05 Feb 2026',
        readTime: '5 min',
        author: {
            name: 'Beatriz de León Cobo',
            role: 'Directora IEAM',
            role_en: 'IEAM Director',
            image: '/team/member-2.jpg',
            bio: 'Directora del IEAM y consultora en Sic Transit Advisory; profesora en la Universidad Francisco de Vitoria.',
            bio_en: 'Director of IEAM and consultant at Sic Transit Advisory; professor at the Universidad Francisco de Vitoria.'
        },
        content: `
            <p>El Instituto Español de Análisis Migratorio (IEAM) ha sido seleccionado como ganador del Concurso de Proyectos de Investigación 2025 de la Fundación FOESSA, con el proyecto “Puentes y muros: itinerarios de inclusión de las personas migrantes en España”. El jurado ha destacado su capacidad para aportar una mirada rigurosa y conectada con la realidad social sobre uno de los grandes retos de la España actual: la inclusión social de las personas migrantes.</p>

            <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Un punto de partida claro: la inclusión no es automática</h3>
            <p>El proyecto parte de una idea central alineada con el enfoque FOESSA: la inclusión no es un estado al que se llega de forma automática, sino un proceso dinámico con avances, bloqueos y retrocesos. Desde esta perspectiva, la investigación analiza cómo interactúan la situación administrativa, el acceso al empleo y las relaciones sociales en las trayectorias vitales de las personas migrantes, y qué factores facilitan o dificultan su participación plena en la sociedad.</p>

            <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Metodología: enfoque cualitativo, participativo y territorial</h3>
            <p>Para capturar esa dinámica con precisión, el estudio combinará una metodología cualitativa y participativa, basada en:</p>
            <ul class="list-disc ml-6 space-y-2 text-slate-700">
                <li><strong>Entrevistas en profundidad</strong> con personas migrantes y con actores clave (administraciones públicas, entidades sociales y profesionales del ámbito laboral).</li>
                <li><strong>Talleres de inteligencia colectiva</strong>, orientados a contrastar experiencias, identificar cuellos de botella institucionales y aterrizar recomendaciones operativas.</li>
                <li><strong>Análisis comparado</strong> de contextos territoriales con realidades y presiones distintas: Islas Canarias, Andalucía y Madrid.</li>
            </ul>
            <p>Este diseño permite reconstruir itinerarios concretos de inclusión, entender dónde se producen las “fracturas” del proceso y cómo las políticas y prácticas existentes se traducen en experiencias reales.</p>

            <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Objetivo: conocimiento útil y propuestas operativas</h3>
            <p>Bajo la dirección de Beatriz de León Cobo, el equipo del IEAM busca identificar qué elementos no están funcionando en los procesos de inclusión —por ejemplo, barreras administrativas, dificultades de empleabilidad o ausencia de redes sociales— y transformar ese diagnóstico en soluciones operativas útiles para administraciones públicas y organizaciones sociales.</p>

            <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Próximos pasos</h3>
            <p>En los próximos meses, el IEAM iniciará el trabajo de campo y la programación de los talleres, con el compromiso de producir resultados aplicables y con valor para la acción pública y social. Agradecemos a la Fundación FOESSA su confianza y la oportunidad de contribuir a una comprensión más fina y realista de las trayectorias de inclusión de las personas migrantes en España.</p>
        `,
        content_en: `
            <p>The Spanish Institute of Migration Analysis (IEAM) has been selected as the winner of the FOESSA Foundation’s 2025 Research Project Competition with its project “Bridges and Walls: Pathways to the Inclusion of Migrants in Spain.” The jury highlighted the project’s ability to provide a rigorous perspective closely connected to social realities on one of today’s major challenges in Spain: the social inclusion of migrants.</p>

            <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">A clear starting point: inclusion is not automatic</h3>
            <p>The project is based on a central idea aligned with the FOESSA approach: inclusion is not a state that is reached automatically, but a dynamic process with advances, blockages, and setbacks. From this perspective, the research examines how administrative status, access to employment, and social relationships interact in the life trajectories of migrants, and which factors facilitate or hinder their full participation in society.</p>

            <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Methodology: qualitative, participatory, and territorial approach</h3>
            <p>To capture this dynamic accurately, the study will combine a qualitative and participatory methodology, based on:</p>
            <ul class="list-disc ml-6 space-y-2 text-slate-700">
                <li><strong>In-depth interviews</strong> with migrants and key stakeholders (public administrations, social organizations, and labor professionals).</li>
                <li><strong>Collective intelligence workshops</strong> aimed at comparing experiences, identifying institutional bottlenecks, and developing operational recommendations.</li>
                <li><strong>Comparative analysis</strong> of territorial contexts with different realities and pressures: the Canary Islands, Andalusia, and Madrid.</li>
            </ul>
            <p>This design allows for the reconstruction of concrete inclusion pathways, understanding where “fractures” in the process occur, and how existing policies and practices translate into real-life experiences.</p>

            <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Objective: actionable knowledge and operational proposals</h3>
            <p>Under the direction of Beatriz de León Cobo, the IEAM team seeks to identify which elements are not working in inclusion processes – such as administrative barriers, employment difficulties, or the absence of social networks – and to turn this diagnosis into actionable solutions for public administrations and social organizations.</p>

            <h3 class="text-xl font-serif font-bold text-[var(--color-text-primary)] mt-8 mb-3">Next steps</h3>
            <p>In the coming months, IEAM will begin fieldwork and the organization of workshops, with a commitment to produce actionable results that are valuable for public and social action. We are grateful to the FOESSA Foundation for their trust and for the opportunity to contribute to a deeper and more realistic understanding of migrants’ inclusion pathways in Spain.</p>
        `,
        relatedArticles: []
    }
];

export const getArticleBySlug = (slug: string): Article | undefined => {
    return articles.find(article => article.slug === slug);
};
