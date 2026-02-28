import type { Project, TimelineEvent } from '@/types';

export const projects: Project[] = [
    {
        id: '1776',
        slug: '1776',
        title: {
            es: 'PROYECTO 1776',
            en: 'PROJECT 1776',
            pt: 'PROJETO 1776'
        },
        subtitle: {
            es: 'La tradición de la escolástica hispánica en la Declaración de Independencia de los Estados Unidos.',
            en: 'The tradition of Hispanic scholasticism in the United States Declaration of Independence.',
            pt: 'A tradição da escolástica hispânica na Declaração de Independência dos Estados Unidos.'
        },
        description: {
            es: 'Un trabajo de investigación orientado a ordenar evidencias, autores e ideas, y a presentarlas de forma accesible mediante una narrativa histórica e intelectual.',
            en: 'A research work oriented to order evidence, authors and ideas, and to present them in an accessible way through a historical and intellectual narrative.',
            pt: 'Um trabalho de pesquisa orientado para ordenar evidências, autores e ideias, e apresentá-las de forma acessível através de uma narrativa histórica e intelectual.'
        },
        image: '/images/proyectos/proyecto-1776.jpg',
        status: 'active'
    },
    {
        id: 'instituto-pensamiento-iberico',
        slug: 'instituto-pensamiento-iberico',
        title: {
            es: 'Instituto de Pensamiento Ibérico',
            en: 'Iberian Thought Institute',
            pt: 'Instituto de Pensamento Ibérico'
        },
        subtitle: {
            es: 'Centro de Investigación y Difusión',
            en: 'Research and Dissemination Center',
            pt: 'Centro de Pesquisa e Difusão'
        },
        description: {
            es: 'Un espacio dedicado al estudio, conservación y difusión del legado intelectual de la tradición hispánica y lusitana.',
            en: 'A space dedicated to the study, preservation and dissemination of the intellectual legacy of the Hispanic and Lusitanian tradition.',
            pt: 'Um espaço dedicado ao estudo, conservação e difusão do legado intelectual da tradição hispânica e lusitana.'
        },
        image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1200',
        status: 'upcoming'
    }
];

export const timelineEvents: TimelineEvent[] = [
    {
        id: 'vitoria-de-indis',
        year: 1539,
        title: {
            es: 'Relectio de Indis',
            en: 'Relectio de Indis',
            pt: 'Relectio de Indis'
        },
        description: {
            es: 'Francisco de Vitoria imparte su famosa lección sobre los derechos de los pueblos indígenas, sentando las bases del derecho internacional.',
            en: 'Francisco de Vitoria gives his famous lecture on the rights of indigenous peoples, laying the foundations of international law.',
            pt: 'Francisco de Vitoria dá a sua famosa lição sobre os direitos dos povos indígenas, lançando as bases do direito internacional.'
        },
        category: 'intellectual',
        author: 'Francisco de Vitoria',
        work: 'De Indis',
        significance: {
            es: 'Estableció los fundamentos del derecho de gentes y la dignidad universal de todos los pueblos.',
            en: 'Established the foundations of the law of nations and the universal dignity of all peoples.',
            pt: 'Estabeleceu os fundamentos do direito das gentes e a dignidade universal de todos os povos.'
        }
    },
    {
        id: 'suarez-de-legibus',
        year: 1612,
        title: {
            es: 'De Legibus ac Deo Legislatore',
            en: 'De Legibus ac Deo Legislatore',
            pt: 'De Legibus ac Deo Legislatore'
        },
        description: {
            es: 'Suárez publica su tratado sobre las leyes, desarrollando la teoría de la soberanía popular y el derecho natural.',
            en: 'Suarez publishes his treatise on laws, developing the theory of popular sovereignty and natural law.',
            pt: 'Suarez publica o seu tratado sobre as leis, desenvolvendo a teoria da soberania popular e do direito natural.'
        },
        category: 'intellectual',
        author: 'Francisco Suárez',
        work: 'De Legibus',
        significance: {
            es: 'Influyó directamente en Locke, Grotius y los pensadores políticos de la Ilustración.',
            en: 'Directly influenced Locke, Grotius and the political thinkers of the Enlightenment.',
            pt: 'Influenciou directamente Locke, Grotius e os pensadores políticos do Iluminismo.'
        }
    },
    {
        id: 'mariana-de-rege',
        year: 1599,
        title: {
            es: 'De Rege et Regis Institutione',
            en: 'De Rege et Regis Institutione',
            pt: 'De Rege et Regis Institutione'
        },
        description: {
            es: 'Juan de Mariana publica su controvertida obra sobre los límites del poder real y la legitimidad del tiranicidio.',
            en: 'Juan de Mariana publishes his controversial work on the limits of royal power and the legitimacy of tyrannicide.',
            pt: 'Juan de Mariana publica a sua controversa obra sobre os limites do poder real e a legitimidade do tiranicídio.'
        },
        category: 'political',
        author: 'Juan de Mariana',
        work: 'De Rege',
        significance: {
            es: 'Estableció límites morales al absolutismo y fue citado por los revolucionarios americanos.',
            en: 'Established moral limits to absolutism and was cited by American revolutionaries.',
            pt: 'Estabeleceu limites morais ao absolutismo e foi citado pelos revolucionários americanos.'
        }
    },
    {
        id: 'declaration-independence',
        year: 1776,
        title: {
            es: 'Declaración de Independencia',
            en: 'Declaration of Independence',
            pt: 'Declaração de Independência'
        },
        description: {
            es: 'Los Padres Fundadores proclaman la independencia de Estados Unidos, incorporando principios de la tradición hispánica.',
            en: 'The Founding Fathers proclaim the independence of the United States, incorporating principles of the Hispanic tradition.',
            pt: 'Os Pais Fundadores proclamam a independência dos Estados Unidos, incorporando princípios da tradição hispânica.'
        },
        category: 'milestone',
        significance: {
            es: 'Conceptos como el consentimiento de los gobernados y los derechos inalienables tienen raíces en Suárez, Vitoria y Mariana.',
            en: 'Concepts such as the consent of the governed and inalienable rights have roots in Suárez, Vitoria and Mariana.',
            pt: 'Conceitos como o consentimento dos governados e os direitos inalienáveis têm raízes em Suárez, Vitoria e Mariana.'
        }
    },
    {
        id: 'soto-de-iustitia',
        year: 1553,
        title: {
            es: 'De Iustitia et Iure',
            en: 'De Iustitia et Iure',
            pt: 'De Iustitia et Iure'
        },
        description: {
            es: 'Domingo de Soto publica su magna obra sobre la justicia, el derecho y la economía moral.',
            en: 'Domingo de Soto publishes his great work on justice, law and moral economy.',
            pt: 'Domingo de Soto publica a sua grande obra sobre a justiça, o direito e a economia moral.'
        },
        category: 'intellectual',
        author: 'Domingo de Soto',
        work: 'De Iustitia et Iure',
        significance: {
            es: 'Desarrolló teorías del valor y el precio justo que anticiparon la economía moderna.',
            en: 'Developed theories of value and just price that anticipated modern economics.',
            pt: 'Desenvolveu teorias de valor e preço justo que anteciparam a economia moderna.'
        }
    },
    {
        id: 'valladolid-debate',
        year: 1550,
        title: {
            es: 'Controversia de Valladolid',
            en: 'Valladolid Debate',
            pt: 'Controvérsia de Valladolid'
        },
        description: {
            es: 'El histórico debate entre Bartolomé de las Casas y Juan Ginés de Sepúlveda sobre la naturaleza y derechos de los indígenas.',
            en: 'The historic debate between Bartolomé de las Casas and Juan Ginés de Sepúlveda about the nature and rights of indigenous people.',
            pt: 'O histórico debate entre Bartolomé de las Casas e Juan Ginés de Sepúlveda sobre a natureza e direitos dos indígenas.'
        },
        category: 'political',
        significance: {
            es: 'Primer debate formal sobre derechos humanos universales en la historia de Occidente.',
            en: 'First formal debate on universal human rights in Western history.',
            pt: 'Primeiro debate formal sobre direitos humanos universais na história do Ocidente.'
        }
    }
];

export function getProjectById(id: string): Project | undefined {
    return projects.find(project => project.id === id);
}

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find(project => project.slug === slug);
}

export function getTimelineEventsByCategory(category: TimelineEvent['category']): TimelineEvent[] {
    return timelineEvents.filter(event => event.category === category);
}

export function getTimelineEventsChronological(): TimelineEvent[] {
    return [...timelineEvents].sort((a, b) => a.year - b.year);
}
