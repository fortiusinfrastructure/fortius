import type { Metadata } from 'next';
import { Navbar, Footer } from '@/components/sections';
import { Link } from '@/i18n/routing';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Timeline, TimelineItem } from '@/components/ui/Timeline';
import { getLocalizedValue } from '@/lib/i18n/localize';
import { getTranslations } from 'next-intl/server';

interface Props {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const t = await getTranslations('Proyecto1776.Meta');
    return {
        title: t('title'),
        description: t('description'),
    };
}

const TIMELINE_DATA: TimelineItem[] = [
    {
        id: '1',
        year: '1550–1600',
        title: {
            es: 'Red universitaria ibérica',
            en: 'Iberian university network',
            pt: 'Rede universitária ibérica'
        },
        description: {
            es: 'Desarrollo de una reflexión sistemática sobre economía, derecho y política en universidades como Salamanca y Alcalá.',
            en: 'Development of a systematic reflection on economics, law, and politics in universities such as Salamanca and Alcalá.',
            pt: 'Desenvolvimento de uma reflexão sistemática sobre economia, direito e política em universidades como Salamanca e Alcalá.'
        },
        type: 'philosophical',
    },
    {
        id: '2',
        year: '1539',
        title: {
            es: 'Francisco de Vitoria: Relectio de Indis',
            en: 'Francisco de Vitoria: Relectio de Indis',
            pt: 'Francisco de Vitoria: Relectio de Indis'
        },
        description: {
            es: 'Establece la igualdad natural de todos los hombres y formula el derecho de gentes, base del derecho internacional moderno.',
            en: 'Establishes the natural equality of all men and formulates the law of nations, the basis of modern international law.',
            pt: 'Estabelece a igualdade natural de todos os homens e formula o direito das gentes, base do direito internacional moderno.'
        },
        type: 'philosophical',
    },
    {
        id: '3',
        year: '1553–1569',
        title: {
            es: 'Domingo de Soto: precio justo',
            en: 'Domingo de Soto: just price',
            pt: 'Domingo de Soto: preço justo'
        },
        description: {
            es: 'Sostiene que el precio justo lo fija la estimación común del mercado y no la autoridad.',
            en: 'Argues that the just price is set by the common estimation of the market and not by authority.',
            pt: 'Sustenta que o preço justo é fixado pela estimativa comum do mercado e não pela autoridade.'
        },
        type: 'philosophical',
    },
    {
        id: '4',
        year: '1556',
        title: {
            es: 'Martín de Azpilcueta: teoría monetaria',
            en: 'Martín de Azpilcueta: monetary theory',
            pt: 'Martín de Azpilcueta: teoria monetária'
        },
        description: {
            es: 'Formula una temprana teoría cuantitativa del dinero: su valor depende de su escasez relativa. Sus intuiciones sobre inflación y estabilidad monetaria reaparecerán en los debates de los federalistas americanos.',
            en: 'Formulates an early quantitative theory of money: its value depends on its relative scarcity. His insights on inflation and monetary stability will reappear in the federalist debates.',
            pt: 'Formula uma teoria quantitativa precoce do dinheiro: seu valor depende de sua escassez relativa. Suas intuições sobre inflação e estabilidade monetária reaparecerão nos debates federalistas.'
        },
        type: 'philosophical',
    },
    {
        id: '5',
        year: '1571',
        title: {
            es: 'Tomás de Mercado: comercio y crédito',
            en: 'Tomás de Mercado: trade and credit',
            pt: 'Tomás de Mercado: comércio e crédito'
        },
        description: {
            es: 'Estudia el comercio internacional y defiende la legitimidad moral de la actividad mercantil, describiendo el mercado como un sistema de intercambios voluntarios.',
            en: 'Studies international trade and defends the moral legitimacy of mercantile activity, describing the market as a system of voluntary exchanges.',
            pt: 'Estuda o comércio internacional e defende a legitimidade moral da atividade mercantil, descrevendo o mercado como um sistema de trocas voluntárias.'
        },
        type: 'philosophical',
    },
    {
        id: '6',
        year: '1599',
        title: {
            es: 'Juan de Mariana: De Rege',
            en: 'Juan de Mariana: De Rege',
            pt: 'Juan de Mariana: De Rege'
        },
        description: {
            es: 'Sostiene que el poder reside en el pueblo y se delega en el gobernante. Sus tesis sobre el consentimiento para impuestos y el derecho de resistencia influyeron directamente en John Locke.',
            en: 'Argues that power resides in the people and is delegated to the ruler. His theses on consent for taxes and the right of resistance directly influenced John Locke.',
            pt: 'Sustenta que o poder reside no povo e é delegado ao governante. Suas teses sobre o consentimento para impostos e o direito de resistência influenciaram diretamente John Locke.'
        },
        type: 'philosophical',
    },
    {
        id: '7',
        year: '1609–1610',
        title: {
            es: 'El proceso contra Mariana',
            en: 'The case against Mariana',
            pt: 'O processo contra Mariana'
        },
        description: {
            es: 'Mariana afirma que la manipulación monetaria es un impuesto encubierto y que la fiscalidad sin representación es robo. Precedente del lema "No taxation without representation".',
            en: 'Mariana states that monetary manipulation is a hidden tax and that taxation without representation is theft. Precedent for the slogan "No taxation without representation".',
            pt: 'Mariana afirma que a manipulação monetária é um imposto oculto e que a fiscalidade sem representação é roubo. Precedente do lema "No taxation without representation".'
        },
        type: 'historical',
    },
    {
        id: '8',
        year: '1610–1614',
        title: {
            es: 'Roberto Belarmino: De Laicis',
            en: 'Robert Bellarmine: De Laicis',
            pt: 'Roberto Belarmino: De Laicis'
        },
        description: {
            es: 'Sistematiza que la autoridad política reside originariamente en la comunidad. Sus argumentos fueron citados extensamente por Robert Filmer en la polémica que Jefferson anotó en su ejemplar de "Patriarcha".',
            en: 'Systematizes that political authority resides originally in the community. His arguments were extensively cited by Robert Filmer in the controversy that Jefferson noted in his copy of "Patriarcha".',
            pt: 'Sistematiza que a autoridade política reside originariamente na comunidade. Seus argumentos foram citados extensivamente por Robert Filmer na polêmica que Jefferson anotou em seu exemplar de "Patriarcha".'
        },
        type: 'philosophical',
    },
    {
        id: '9',
        year: '1613',
        title: {
            es: 'Francisco Suárez: Defensio Fidei',
            en: 'Francisco Suárez: Defensio Fidei',
            pt: 'Francisco Suárez: Defensio Fidei'
        },
        description: {
            es: 'Sistematiza que la autoridad reside en la comunidad ("populum consentientem"). Su obra fue clave en los debates ingleses que configuraron la tradición constitucional británica que heredará la Revolución Americana.',
            en: 'Systematizes that authority resides in the community ("populum consentientem"). His work was key in the English debates that shaped the British constitutional tradition inherited by the American Revolution.',
            pt: 'Sistematiza que a autoridade reside na comunidade ("populum consentientem"). Sua obra foi fundamental nos debates ingleses que configuraram a tradição constitucional britânica herdada pela Revolução Americana.'
        },
        type: 'philosophical',
    },
    {
        id: '10',
        year: '1654',
        title: {
            es: 'Marchamont Nedham',
            en: 'Marchamont Nedham',
            pt: 'Marchamont Nedham'
        },
        description: {
            es: 'En la Inglaterra republicana, defiende que la soberanía reside en el pueblo, integrando argumentos de la escolástica que serán citados por John Adams al tratar la separación de poderes.',
            en: 'In republican England, he defends that sovereignty resides in the people, integrating scholastic arguments that would be cited by John Adams when discussing the separation of powers.',
            pt: 'Na Inglaterra republicana, defende que a soberania reside no povo, integrando argumentos da escolástica que seriam citados por John Adams ao tratar a separação de poderes.'
        },
        type: 'historical',
    },
    {
        id: '11',
        year: '1680',
        title: {
            es: 'Robert Filmer: Patriarcha',
            en: 'Robert Filmer: Patriarcha',
            pt: 'Robert Filmer: Patriarcha'
        },
        description: {
            es: 'Al atacar a Belarmino, Filmer introduce en el mundo anglosajón la doctrina de la soberanía popular. Jefferson poseía y anotó un ejemplar de este texto.',
            en: 'By attacking Bellarmine, Filmer introduces the doctrine of popular sovereignty into the Anglo-Saxon world. Jefferson owned and annotated a copy of this text.',
            pt: 'Ao atacar Belarmino, Filmer introduz no mundo anglo-saxão a doutrina da soberania popular. Jefferson possuía e anotou um exemplar deste texto.'
        },
        type: 'historical',
    },
    {
        id: '12',
        year: '1688–1689',
        title: {
            es: 'John Locke: Two Treatises',
            en: 'John Locke: Two Treatises',
            pt: 'John Locke: Two Treatises'
        },
        description: {
            es: 'Formula la teoría del poder fiduciario y el derecho de resistencia con paralelismos notables con Juan de Mariana, cuyas obras Locke poseía y recomendaba.',
            en: 'Formulates the theory of fiduciary power and the right of resistance with notable parallels to Juan de Mariana, whose works Locke owned and recommended.',
            pt: 'Formula a teoria do poder fiduciário e o direito de resistência com paralelismos notáveis com Juan de Mariana, cujas obras Locke possuía e recomendava.'
        },
        type: 'historical',
    },
    {
        id: '13',
        year: '1639',
        title: {
            es: 'Fundamental Orders of Connecticut',
            en: 'Fundamental Orders of Connecticut',
            pt: 'Fundamental Orders of Connecticut'
        },
        description: {
            es: 'Uno de los primeros textos constitucionales basados en el consentimiento y la limitación del poder, reflejando la tradición anti-absolutista europea impregnada de tesis escolásticas.',
            en: 'One of the first constitutional texts based on consent and the limitation of power, reflecting the European anti-absolutist tradition soaked in scholastic theses.',
            pt: 'Um dos primeiros textos constitucionais baseados no consentimento e na limitação do poder, refletindo a tradição anti-absolutista europeia impregnada de teses escolásticas.'
        },
        type: 'historical',
    },
    {
        id: '14',
        year: 'S. XVIII–XIX',
        title: {
            es: 'Recepción estadounidense',
            en: 'American reception',
            pt: 'Receção estadunidense'
        },
        description: {
            es: 'Jefferson y Adams buscaban y poseían obras de Mariana, cuya defensa de la limitación del poder dialogó con el pensamiento de Locke en la cultura política colonial.',
            en: 'Jefferson and Adams sought out and owned Mariana\'s works, whose defense of limited power dialogued with Locke\'s thought in colonial political culture.',
            pt: 'Jefferson e Adams procuravam e possuíam obras de Mariana, cuja defesa da limitação do poder dialogou com o pensamento de Locke na cultura política colonial.'
        },
        type: 'historical',
    },
    {
        id: '15',
        year: '1776',
        title: {
            es: 'Declaración de Independencia',
            en: 'Declaration of Independence',
            pt: 'Declaração de Independência'
        },
        description: {
            es: 'El principio de derechos naturales y consentimiento refleja la doctrina de Vitoria sobre igualdad y la de Suárez sobre autoridad delegada por la comunidad.',
            en: 'The principle of natural rights and consent reflects Vitoria\'s doctrine on equality and Suárez\'s on authority delegated by the community.',
            pt: 'O princípio dos direitos naturais e do consentimento reflete a doutrina de Vitoria sobre a igualdade e a de Suárez sobre a autoridade delegada pela comunidade.'
        },
        type: 'historical',
    },
    {
        id: '16',
        year: '1776',
        title: {
            es: 'Virginia Declaration of Rights',
            en: 'Virginia Declaration of Rights',
            pt: 'Virginia Declaration of Rights'
        },
        description: {
            es: 'George Mason formula la soberanía popular en términos que reproducen la doctrina de Suárez. La crítica a la tributación sin representación tiene raíces salmantinas del siglo XVI.',
            en: 'George Mason formulates popular sovereignty in terms that reproduce Suárez\'s doctrine. The critique of taxation without representation has 16th-century Salmantine roots.',
            pt: 'George Mason formula a soberania popular em termos que reproduzem a doutrina de Suárez. A crítica à tributação sem representação tem raízes salmantinas do século XVI.'
        },
        type: 'historical',
    },
    {
        id: '17',
        year: '1787',
        title: {
            es: 'Constitución de EE. UU.',
            en: 'US Constitution',
            pt: 'Constituição dos EUA'
        },
        description: {
            es: 'La separación de poderes y el gobierno sujeto a límites institucionales reflejan la concepción de Suárez y Belarmino del poder delegado orientado al bien común.',
            en: 'The separation of powers and government subject to institutional limits reflect Suárez and Bellarmine\'s conception of delegated power oriented to the common good.',
            pt: 'A separação de poderes e o governo sujeito a limites institucionais refletem a conceção de Suárez e Belarmino do poder delegado orientado ao bem comum.'
        },
        type: 'historical',
    },
    {
        id: '18',
        year: '1789',
        title: {
            es: 'Bill of Rights',
            en: 'Bill of Rights',
            pt: 'Bill of Rights'
        },
        description: {
            es: 'La protección de la propiedad y libertades individuales se relaciona con la defensa de los derechos naturales de Vitoria y la inviolabilidad de la propiedad en Mariana.',
            en: 'The protection of property and individual liberties relates to Vitoria\'s defense of natural rights and Mariana\'s on the inviolability of property.',
            pt: 'A proteção da propriedade e das liberdades individuais relaciona-se com a defesa dos direitos naturais de Vitoria e a inviolabilidade da propriedade em Mariana.'
        },
        type: 'historical',
    },
];

export default async function Proyecto1776Page({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations('Proyecto1776');

    const TOC_LINKS = [
        { id: 'introduccion', label: t('Sidebar.introduccion') },
        { id: 'hitos', label: t('Sidebar.hitos') },
        { id: 'fundadores', label: t('Sidebar.fundadores') },
        { id: 'otros', label: t('Sidebar.otros') },
        { id: 'ejes', label: t('Sidebar.ejes') },
        { id: 'vision', label: t('Sidebar.vision') },
        { id: 'bibliografia', label: t('Sidebar.bibliografia') },
    ];

    const refs = [
        { author: 'Gómez Rivas, L.', year: '2026', title: 'Orígenes escolásticos de la libertad individual en los EE. UU. en el aniversario de la Declaración de Independencia (1776-2026)', source: 'Instituto Fe y Libertad' },
        { author: 'Graf, E.-C.', year: '2019', title: 'Escolásticos: Francisco Suárez, Juan de Mariana y las revoluciones en América. Bicentenario de la independencia 1810-30', source: 'Credencial Historia, Bogotá, pp. 42-51' },
        { author: 'Gómez Rivas, L.', year: '2017', title: '¿Conoció George Mason a los escolásticos españoles?', source: 'Instituto Juan de Mariana' },
        { author: 'Gómez Rivas, L.', year: '2021', title: 'Escolástica e independencia: Las bibliotecas jesuitas al tiempo de la emancipación', source: '' },
        { author: 'Rager, J.C.', year: '1925', title: "The Blessed Cardinal Bellarmine's Defense of Popular Government in the Sixteenth Century", source: 'The Catholic Historical Review, Vol. 10, No. 4' },
        { author: 'Stoetzer, C.', year: '1981', title: 'Las raíces escolásticas de la Revolución Americana', source: 'Ponencia en las XV Jornadas de la Asociación Argentina de Estudios Americanos' },
        { author: 'Stoetzer, C.', year: '1986', title: 'The Scholastic Roots of the American Constitution', source: 'Washington D.C.' },
        { author: 'Termes, R.', year: '2000', title: 'Francisco Suárez y The Fundamental Orders de Connecticut', source: 'Cuadernos de Ciencias Económicas y Empresariales, 37 pp. 161-168' },
        { author: 'Termes, R.', year: '2005', title: 'La tradición hispana de libertad', source: 'Conferencia en el Instituto Acton, Orlando' },
    ];

    const founders = [
        {
            name: 'John Adams',
            img: '/images/proyectos/1776/johnadams.jpg',
            text: locale === 'es'
                ? 'Adams leyó y citó a Juan de Mariana, especialmente De Rege et Regis Institutione (1599), integrándolo en su reflexión constitucional junto a la tradición republicana inglesa.'
                : locale === 'en'
                    ? 'Adams read and cited Juan de Mariana, especially De Rege et Regis Institutione (1599), integrating it into his constitutional reflection alongside the English republican tradition.'
                    : 'Adams leu e citou Juan de Mariana, especialmente De Rege et Regis Institutione (1599), integrando-o na sua reflexão constitucional ao lado da tradição republicana inglesa.'
        },
        {
            name: 'Thomas Jefferson',
            img: '/images/proyectos/1776/thomasjefferson.jpg',
            text: locale === 'es'
                ? 'Jefferson mostró un interés sostenido por el pensamiento hispánico, adquiriendo obras de Juan de Mariana y Juan de Palafox. Al redactar la Declaración de Independencia, formuló principios que dialogaban con la ley natural.'
                : locale === 'en'
                    ? 'Jefferson showed a sustained interest in Hispanic thought, acquiring works by Juan de Mariana and Juan de Palafox. When drafting the Declaration of Independence, he formulated principles that dialogued with natural law.'
                    : 'Jefferson mostrou um interesse sustentado pelo pensamento hispânico, adquirindo obras de Juan de Mariana e Juan de Palafox. Ao redigir a Declaração de Independência, formulou princípios que dialogavam com a lei natural.'
        },
        {
            name: 'James Madison',
            img: '/images/proyectos/1776/jamesmadison.jpg',
            text: locale === 'es'
                ? 'En The Federalist Papers, Madison desarrolla el gobierno representativo y la separación de poderes, reproduciendo la tesis escolástica de que el poder es originariamente comunitario.'
                : locale === 'en'
                    ? 'In The Federalist Papers, Madison develops representative government and the separation of powers, reproducing the scholastic thesis that power is originally communal.'
                    : 'Em The Federalist Papers, Madison desenvolve o governo representativo e a separação de poderes, reproduzindo a tese escolástica de que o poder é originariamente comunitário.'
        },
        {
            name: 'Alexander Hamilton',
            img: '/images/proyectos/1776/alexander madison.jpg',
            text: locale === 'es'
                ? 'Hamilton vincula la estabilidad monetaria y la confianza pública con la libertad política, compartiendo la premisa de Mariana de que la manipulación de la moneda es un impuesto encubierto.'
                : locale === 'en'
                    ? 'Hamilton links monetary stability and public trust with political freedom, sharing Mariana\'s premise that currency manipulation is a disguised tax.'
                    : 'Hamilton associa a estabilidade monetária e a confiança pública à liberdade política, partilhando a premissa de Mariana de que a manipulação da moeda é um imposto dissimulado.'
        }
    ];

    const thinkers = [
        {
            name: 'Orestes Brownson',
            title: locale === 'es' ? 'Constitucionalismo Orgánico (1803–1876)' : 'Organic Constitutionalism (1803–1876)',
            text: locale === 'es'
                ? 'Defendió que la soberanía pertenece al pueblo como comunidad moral, citando expresamente la tradición tomista y suareciana.'
                : locale === 'en'
                    ? 'Argued that sovereignty belongs to the people as a moral community, specifically citing the Thomist and Suarean tradition.'
                    : 'Defendeu que a soberania pertence ao povo como comunidade moral, citando expressamente a tradição tomista e suareziana.'
        },
        {
            name: 'John Courtney Murray',
            title: locale === 'es' ? 'Libertad Religiosa (1960)' : 'Religious Freedom (1960)',
            text: locale === 'es'
                ? 'Interpretó la Primera Enmienda a la luz del derecho natural, reconociendo la herencia de Suárez y Belarmino.'
                : locale === 'en'
                    ? 'Interpreted the First Amendment in light of natural law, recognizing the heritage of Suárez and Bellarmine.'
                    : 'Interpretou a Primeira Emenda à luz do direito natural, reconhecendo a herança de Suárez e Belarmino.'
        },
        {
            name: 'Heinrich A. Rommen',
            title: locale === 'es' ? 'The Natural Law (1947)' : 'The Natural Law (1947)',
            text: locale === 'es'
                ? 'Presentó la Escuela de Salamanca como el origen del constitucionalismo moderno en manuales estadounidenses.'
                : locale === 'en'
                    ? 'Presented the School of Salamanca as the origin of modern constitutionalism in American manuals.'
                    : 'Apresentou a Escola de Salamanca como a origem do constitucionalismo moderno em manuais americanos.'
        },
        {
            name: 'Carlos Stoetzer',
            title: locale === 'es' ? 'Investigación Sistemática (1986)' : 'Systematic Research (1986)',
            text: locale === 'es'
                ? 'Documentó la influencia de Vitoria, Suárez y Mariana en la formación intelectual del constitucionalismo norteamericano.'
                : locale === 'en'
                    ? 'Documented the influence of Vitoria, Suárez, and Mariana on the intellectual formation of North American constitutionalism.'
                    : 'Documentou a influência de Vitoria, Suárez e Mariana na formação intelectual do constitucionalismo norte-americano.'
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#050a14] text-white selection:bg-[#c5a059]/30">
            <Navbar />

            <main className="flex-grow pt-20">
                {/* Hero Section */}
                <section className="relative py-32 md:py-48 px-4 overflow-hidden border-b border-white/5">
                    <div
                        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
                        style={{ backgroundImage: "url('/images/proyectos/1776/hero-bg.jpg')" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050a14] via-[#050a14]/90 to-transparent z-0" />

                    <div className="relative z-10 max-w-7xl mx-auto">
                        <div className="max-w-3xl">
                            <h1 className="font-serif text-6xl md:text-8xl text-white mb-6 tracking-tight">
                                {t('Hero.title')} <span className="italic text-[#c5a059]">1776</span>
                            </h1>
                            <h2 className="text-2xl md:text-3xl font-serif text-white/90 mb-12 leading-relaxed max-w-2xl">
                                {t('Hero.subtitle')}
                            </h2>

                            <div className="bg-[#0a111e]/80 backdrop-blur-sm border-l-2 border-[#c5a059] p-8 md:p-10 mb-12 max-w-2xl">
                                <p className="text-white/70 font-serif text-lg leading-relaxed italic">
                                    {t('Hero.researchNote')}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-6">
                                <a
                                    href="#introduccion"
                                    className="bg-[#c5a059] text-[#050a14] px-10 py-4 font-cinzel text-[10px] tracking-[0.2em] font-bold hover:bg-white transition-all shadow-2xl"
                                >
                                    {t('Hero.readIntro')}
                                </a>
                                <Link
                                    href="/colabora"
                                    className="border border-white/20 text-white px-10 py-4 font-cinzel text-[10px] tracking-[0.2em] hover:border-[#c5a059] hover:text-[#c5a059] transition-all"
                                >
                                    {t('Hero.collaborate')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content with Sidebar */}
                <div className="max-w-7xl mx-auto px-4 py-24 md:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-20">

                        {/* Sticky Sidebar */}
                        <aside className="hidden lg:block">
                            <div className="sticky top-32 space-y-12">
                                <div>
                                    <h3 className="font-cinzel text-[#c5a059] text-[10px] tracking-[0.4em] mb-8 border-b border-white/5 pb-4">{t('Sidebar.contents')}</h3>
                                    <nav className="flex flex-col gap-4">
                                        {TOC_LINKS.map(link => (
                                            <a
                                                key={link.id}
                                                href={`#${link.id}`}
                                                className="text-[#E7E5E4]/40 hover:text-[#c5a059] font-cinzel text-[10px] tracking-[0.2em] transition-all flex items-center group"
                                            >
                                                <span className="w-0 group-hover:w-4 overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100">
                                                    <ChevronRight className="w-3 h-3 text-[#c5a059]" />
                                                </span>
                                                {link.label}
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </aside>

                        {/* Article Content */}
                        <article className="space-y-24">

                            {/* INTRODUCCIÓN */}
                            <section id="introduccion" className="scroll-mt-32">
                                <h2 className="font-serif text-4xl text-white mb-12 tracking-tight uppercase">
                                    {t('Content.introTitle')}
                                </h2>
                                <div className="prose-hispana space-y-8">
                                    <p>{t('Content.introText1')}</p>
                                    <p>{t('Content.introText2')}</p>
                                    <p className="text-[#c5a059] border-t border-white/5 pt-8 font-serif italic text-xl">
                                        {t('Content.introHighlight')}
                                    </p>
                                </div>
                            </section>

                            {/* PAINTING 1: LA MARCHA DE GÁLVEZ */}
                            <section className="space-y-12">
                                <div className="relative aspect-[16/9] overflow-hidden border border-white/5">
                                    <img
                                        src="/images/proyectos/1776/marcha-galvez.jpg"
                                        alt={t('Paintings.galvezMarch')}
                                        className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                    />
                                </div>
                                <div className="max-w-2xl border-l border-[#c5a059]/20 pl-8">
                                    <h4 className="text-[#c5a059] font-cinzel text-[10px] tracking-widest mb-4">
                                        {t('Paintings.galvezMarch')}
                                    </h4>
                                    <p className="text-sm text-white/50 leading-relaxed italic">
                                        {t('Paintings.galvezMarchDesc')}
                                    </p>
                                </div>
                            </section>

                            <section id="hitos" className="scroll-mt-32 relative">
                                <h2 className="font-serif text-4xl text-white mb-6 tracking-tight uppercase text-center">
                                    {t('Content.milestonesTitle')}
                                </h2>
                                <Timeline items={TIMELINE_DATA} locale={locale} />
                            </section>

                            {/* PADRES FUNDADORES */}
                            <section id="fundadores" className="scroll-mt-32 space-y-16">
                                <div className="text-center max-w-3xl mx-auto">
                                    <h2 className="font-serif text-4xl text-white mb-6 tracking-tight uppercase">
                                        {t('Content.foundersTitle')}
                                    </h2>
                                    <p className="text-white/60 font-serif text-lg">
                                        {t('Content.foundersSubtitle')}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
                                    {founders.map((founder) => (
                                        <div key={founder.name} className="group bg-[#050a14] p-8 md:p-12 hover:bg-[#0a111e] transition-all duration-500">
                                            <div className="aspect-[4/5] overflow-hidden mb-8 border border-white/5 ring-1 ring-white/10 ring-inset">
                                                <img
                                                    src={founder.img}
                                                    alt={founder.name}
                                                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100"
                                                />
                                            </div>
                                            <h3 className="font-cinzel text-[#c5a059] text-xl tracking-widest mb-6">{founder.name}</h3>
                                            <p className="text-white/50 font-serif text-sm leading-relaxed group-hover:text-white/70 transition-colors">
                                                {founder.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* OTROS PENSADORES */}
                            <section id="otros" className="scroll-mt-32 border-y border-white/5 py-24">
                                <h2 className="font-serif text-4xl text-white mb-16 tracking-tight uppercase text-center">
                                    {t('Content.receptionTitle')}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                                    {thinkers.map((item) => (
                                        <div key={item.name} className="space-y-4">
                                            <h4 className="font-cinzel text-[#c5a059] text-[10px] tracking-[0.3em] font-bold">{item.name}</h4>
                                            <h5 className="font-serif text-xl text-white italic">{item.title}</h5>
                                            <p className="text-white/50 font-serif text-sm leading-relaxed">
                                                {item.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* EJES DEL PROYECTO */}
                            <section id="ejes" className="scroll-mt-32">
                                <h2 className="font-serif text-4xl text-white mb-12 tracking-tight uppercase">
                                    {t('Axes.title')}
                                </h2>
                                <div className="prose-hispana">
                                    <p className="mb-12">
                                        {t('Axes.description')}
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        {['01', '02', '03', '04'].map((num) => (
                                            <div key={num} className="flex gap-6 items-start p-8 bg-[#0a111e]/50 border border-white/5 hover:border-[#c5a059]/20 transition-all group">
                                                <div className="w-10 h-10 rounded-full border border-[#c5a059]/20 flex items-center justify-center shrink-0 text-[#c5a059] font-cinzel text-xs group-hover:bg-[#c5a059] group-hover:text-[#050a14] transition-all">{num}</div>
                                                <p className="text-sm leading-relaxed text-white/70">
                                                    {t(`Axes.${num}` as any)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* PAINTING 2: POR ESPAÑA Y POR EL REY */}
                            <section className="space-y-12">
                                <div className="relative aspect-[16/9] overflow-hidden border border-white/5">
                                    <img
                                        src="/images/proyectos/1776/galvez-america.jpg"
                                        alt={t('Paintings.forSpain')}
                                        className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                    />
                                </div>
                                <div className="max-w-2xl border-l border-[#c5a059]/20 pl-8">
                                    <h4 className="text-[#c5a059] font-cinzel text-[10px] tracking-widest mb-4">
                                        {t('Paintings.forSpain')}
                                    </h4>
                                    <p className="text-sm text-white/50 leading-relaxed italic">
                                        {t('Paintings.forSpainDesc')}
                                    </p>
                                </div>
                            </section>

                            {/* VISIÓN Y CIMIENTOS */}
                            <section id="vision" className="scroll-mt-32">
                                <h2 className="font-serif text-4xl text-white mb-12 tracking-tight uppercase">
                                    {t('Vision.title')}
                                </h2>
                                <div className="prose-hispana space-y-8">
                                    <p>{t('Vision.text')}</p>
                                </div>
                            </section>

                            {/* PAINTING 3: PABELLONES HERMANOS */}
                            <section className="space-y-12">
                                <div className="relative aspect-[16/9] overflow-hidden border border-white/5">
                                    <img
                                        src="/images/proyectos/1776/pabellones-hermanos.jpg"
                                        alt={t('Paintings.sisterFlags')}
                                        className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                    />
                                </div>
                                <div className="max-w-2xl border-l border-[#c5a059]/20 pl-8">
                                    <h4 className="text-[#c5a059] font-cinzel text-[10px] tracking-widest mb-4">
                                        {t('Paintings.sisterFlags')}
                                    </h4>
                                    <p className="text-sm text-white/50 leading-relaxed italic">
                                        {t('Paintings.sisterFlagsDesc')}
                                    </p>
                                </div>
                            </section>

                            {/* BIBLIOGRAFÍA */}
                            <section id="bibliografia" className="scroll-mt-32 pb-20 border-t border-white/5 pt-20">
                                <h2 className="font-serif text-4xl text-white mb-12 tracking-tight uppercase">
                                    {t('Bibliography.title')}
                                </h2>
                                <div className="space-y-6">
                                    {refs.map((ref, i) => (
                                        <div key={ref.title} className="group">
                                            <p className="text-white/60 font-serif text-sm leading-relaxed group-hover:text-white transition-colors">
                                                <span className="text-[#c5a059]">{ref.author} ({ref.year}).</span> <span className="italic">‘{ref.title}’</span>. {ref.source}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* PARTICIPAR */}
                            <section id="participar" className="scroll-mt-32 pb-40">
                                <div className="bg-[#0a111e] border border-white/5 p-12 md:p-20 text-center relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-64 h-64 bg-[#c5a059]/5 blur-[100px] rounded-full -ml-32 -mt-32" />

                                    <h2 className="font-serif text-4xl text-white mb-8 relative z-10">
                                        {t('Participate.title')}
                                    </h2>
                                    <p className="text-white/60 font-serif text-lg max-w-2xl mx-auto mb-12 relative z-10">
                                        {t('Participate.description')}
                                    </p>

                                    <div className="flex justify-center gap-6 relative z-10">
                                        <Link
                                            href="/contacto"
                                            className="bg-[#c5a059] text-[#050a14] px-12 py-4 font-cinzel text-[10px] tracking-[0.2em] font-bold hover:bg-white transition-all"
                                        >
                                            {t('Participate.button')}
                                        </Link>
                                    </div>
                                </div>
                            </section>

                        </article>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
