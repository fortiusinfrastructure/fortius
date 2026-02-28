import type { Author, BiblioItem, MultimediaItem } from '@/types';

export const authors: Author[] = [
    {
        id: 'suarez',
        name: 'Francisco Suárez',
        period: '1548–1617',
        description: {
            es: 'El Doctor Eximius. Metafísica y filosofía del derecho.',
            en: 'The Doctor Eximius. Metaphysics and philosophy of law.',
            pt: 'O Doctor Eximius. Metafísica e filosofia do direito.'
        },
        region: 'España',
        biography: {
            es: 'Francisco Suárez fue un teólogo, filósofo y jurista jesuita español, considerado uno de los más grandes metafísicos de todos los tiempos. Su obra Disputationes Metaphysicae influenció profundamente la filosofía moderna.',
            en: 'Francisco Suárez was a Spanish Jesuit theologian, philosopher and jurist, considered one of the greatest metaphysicians of all time. His work Disputationes Metaphysicae profoundly influenced modern philosophy.',
            pt: 'Francisco Suárez foi um teólogo, filósofo e jurista jesuíta espanhol, considerado um dos maiores metafísicos de todos os tempos. Sua obra Disputationes Metaphysicae influenciou profundamente a filosofia moderna.'
        },
        works: ['Disputationes Metaphysicae', 'De Legibus', 'Defensio Fidei']
    },
    {
        id: 'vitoria',
        name: 'Francisco de Vitoria',
        period: '1483–1546',
        description: {
            es: 'Fundador de la Escuela de Salamanca y el Derecho de Gentes.',
            en: 'Founder of the School of Salamanca and the Law of Nations.',
            pt: 'Fundador da Escola de Salamanca e o Direito das Gentes.'
        },
        region: 'España',
        biography: {
            es: 'Francisco de Vitoria fue un fraile dominico español, teólogo y jurista. Es considerado el fundador del derecho internacional moderno y uno de los primeros defensores de los derechos de los pueblos indígenas.',
            en: 'Francisco de Vitoria was a Spanish Dominican friar, theologian and jurist. He is considered the founder of modern international law and one of the first defenders of the rights of indigenous peoples.',
            pt: 'Francisco de Vitoria foi um frade dominicano espanhol, teólogo e jurista. É considerado o fundador do direito internacional moderno e um dos primeiros defensores dos direitos dos povos indígenas.'
        },
        works: ['De Indis', 'De Potestate Civili', 'De Iure Belli']
    },
    {
        id: 'mariana',
        name: 'Juan de Mariana',
        period: '1536–1624',
        description: {
            es: 'Teoría monetaria, historia y límites del poder real.',
            en: 'Monetary theory, history and limits of royal power.',
            pt: 'Teoria monetária, história e limites do poder real.'
        },
        region: 'España',
        biography: {
            es: 'Juan de Mariana fue un sacerdote jesuita, historiador y pensador político español. Su obra De Rege et Regis Institutione sobre los límites del poder real y el tiranicidio tuvo enorme influencia.',
            en: 'Juan de Mariana was a Spanish Jesuit priest, historian and political thinker. His work De Rege et Regis Institutione on the limits of royal power and tyrannicide had enormous influence.',
            pt: 'Juan de Mariana foi um sacerdote jesuíta, historiador e pensador político espanhol. Sua obra De Rege et Regis Institutione sobre os limites do poder real e o tiranicídio teve enorme influência.'
        },
        works: ['De Rege et Regis Institutione', 'De Monetae Mutatione', 'Historia General de España']
    },
    {
        id: 'soto',
        name: 'Domingo de Soto',
        period: '1494–1560',
        description: {
            es: 'Física, derecho y economía. Confesor de Carlos V.',
            en: 'Physics, law and economics. Confessor of Charles V.',
            pt: 'Física, direito e economia. Confessor de Carlos V.'
        },
        region: 'España',
        biography: {
            es: 'Domingo de Soto fue un fraile dominico español, teólogo y jurista. Fue confesor del emperador Carlos V y participó en el Concilio de Trento. Destacó por sus contribuciones a la física y la economía.',
            en: 'Domingo de Soto was a Spanish Dominican friar, theologian and jurist. He was confessor of Emperor Charles V and participated in the Council of Trent. He stood out for his contributions to physics and economics.',
            pt: 'Domingo de Soto foi um frade dominicano espanhol, teólogo e jurista. Foi confessor do imperador Carlos V e participou do Concílio de Trento. Destacou-se pelas suas contribuições para a física e a economia.'
        },
        works: ['De Iustitia et Iure', 'De Natura et Gratia']
    },
    {
        id: 'molina',
        name: 'Luis de Molina',
        period: '1535–1600',
        description: {
            es: 'Concordia, libre albedrío y teoría económica.',
            en: 'Concordia, free will and economic theory.',
            pt: 'Concordia, livre-arbítrio e teoria económica.'
        },
        region: 'España/Portugal',
        biography: {
            es: 'Luis de Molina fue un teólogo jesuita español que desarrolló la doctrina del molinismo sobre la gracia y el libre albedrío. También contribuyó significativamente a la teoría económica.',
            en: 'Luis de Molina was a Spanish Jesuit theologian who developed the doctrine of Molinism on grace and free will. He also contributed significantly to economic theory.',
            pt: 'Luis de Molina foi um teólogo jesuíta espanhol que desenvolveu a doutrina do molinismo sobre a graça e o livre-arbítrio. Também contribuiu significativamente para a teoria económica.'
        },
        works: ['Concordia liberi arbitrii', 'De Iustitia et Iure']
    },
    {
        id: 'cruz',
        name: 'Sor Juana Inés de la Cruz',
        period: '1648–1695',
        description: {
            es: 'Literatura, teología y defensa del intelecto femenino.',
            en: 'Literature, theology and defense of the female intellect.',
            pt: 'Literatura, teologia e defesa do intelecto feminino.'
        },
        region: 'Hispanoamérica',
        biography: {
            es: 'Juana Inés de Asbaje y Ramírez de Santillana, conocida como Sor Juana Inés de la Cruz, fue una religiosa jerónima y escritora novohispana. Destacó por su defensa del derecho de las mujeres a la educación.',
            en: 'Juana Inés de Asbaje y Ramírez de Santillana, known as Sor Juana Inés de la Cruz, was a Hieronymite nun and New Spanish writer. She stood out for her defense of women\'s right to education.',
            pt: 'Juana Inés de Asbaje y Ramírez de Santillana, conhecida como Sor Juana Inés de la Cruz, foi uma religiosa hieronimita e escritora nova-hispana. Destacou-se pela sua defesa do direito das mulheres à educação.'
        },
        works: ['Primero sueño', 'Respuesta a Sor Filotea', 'Los empeños de una casa']
    }
];

export const biblioItems: BiblioItem[] = [
    { id: 1, type: 'Libro', title: 'De Indis', author: 'Francisco de Vitoria', year: '1539', tag: 'Derecho Internacional' },
    { id: 2, type: 'Libro', title: 'Defensio Fidei', author: 'Francisco Suárez', year: '1613', tag: 'Soberanía' },
    { id: 3, type: 'Artículo', title: 'La teoría del valor en la Escuela de Salamanca', author: 'Marjorie Grice-Hutchinson', year: '1952', tag: 'Economía' },
    { id: 4, type: 'Libro', title: 'De monetae mutatione', author: 'Juan de Mariana', year: '1609', tag: 'Economía' },
    { id: 5, type: 'Vídeo', title: 'El legado de Salamanca en la Constitución de EEUU', author: 'Conferencia EH', year: '2024', tag: 'Proyecto 1776' },
];

export const multimediaItems: MultimediaItem[] = [
    { id: 1, type: 'Vídeo', title: 'Francisco Suárez y la Modernidad', duration: '45 min', source: 'Youtube', author: 'Prof. Ángel Carrión' },
    { id: 2, type: 'Audio', title: 'El Tiranicidio en Juan de Mariana', duration: '28 min', source: 'Podcast EH', author: 'Entrevista' },
    { id: 3, type: 'Vídeo', title: 'Las Casas vs Sepúlveda: La Controversia de Valladolid', duration: '60 min', source: 'Clase Magistral', author: 'Dr. Ruiz' },
    { id: 4, type: 'Documento', title: 'Esquema: Genealogía de la Libertad', duration: 'PDF', source: 'Material Didáctico', author: 'Escuela Hispánica' },
];

export function getAuthorById(id: string): Author | undefined {
    return authors.find(author => author.id === id);
}

export function getAuthorsByRegion(region: string): Author[] {
    if (region === 'Todos') return authors;
    return authors.filter(author => author.region.includes(region));
}

export function getBiblioByType(type: string): BiblioItem[] {
    if (type === 'Todos') return biblioItems;
    return biblioItems.filter(item => item.type === type);
}

export const authorRegions = ['Todos', 'España', 'Hispanoamérica'];
export const biblioTypes = ['Todos', 'Libro', 'Artículo', 'Vídeo'];
