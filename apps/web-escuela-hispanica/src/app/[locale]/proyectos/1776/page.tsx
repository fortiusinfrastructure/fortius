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
        year: 'SIGLO XVI',
        title: {
            es: 'Escuela de Salamanca',
            en: 'School of Salamanca',
            pt: 'Escola de Salamanca'
        },
        description: {
            es: 'Teólogos y juristas desarrollan en las universidades ibéricas una reflexión sistemática sobre el derecho, la economía y el poder político.',
            en: 'Theologians and jurists develop a systematic reflection on law, economics, and political power in Iberian universities.',
            pt: 'Teólogos e juristas desenvolvem nas universidades ibéricas uma reflexão sistemática sobre o direito, a economia e o poder político.'
        },
        type: 'philosophical',
    },
    {
        id: '2',
        year: '1539',
        title: {
            es: 'Francisco de Vitoria',
            en: 'Francisco de Vitoria',
            pt: 'Francisco de Vitoria'
        },
        description: {
            es: 'En "Relectio de Indis", establece la igualdad natural de todos los hombres y los límites del poder soberano, sentando las bases del derecho de gentes contemporáneo.',
            en: 'In "Relectio de Indis", establishes the natural equality of all men and the limits of sovereign power, laying the foundations of contemporary law of nations.',
            pt: 'Em "Relectio de Indis", estabelece a igualdade natural de todos os homens e os limites do poder soberano, lançando as bases do direito das gentes contemporâneo.'
        },
        type: 'philosophical',
    },
    {
        id: '3',
        year: '1599',
        title: {
            es: 'Juan de Mariana',
            en: 'Juan de Mariana',
            pt: 'Juan de Mariana'
        },
        description: {
            es: 'En "De Rege", sostiene que el poder reside originariamente en el pueblo. Justifica el tiranicidio y establece que la sumisión fiscal debe ser consentida ("no taxation without representation").',
            en: 'In "De Rege", argues that power resides originally in the people. Justifies tyrannicide and establishes that tax submission must be consented ("no taxation without representation").',
            pt: 'Em "De Rege", argumenta que o poder reside originariamente no povo. Justifica o tiranicídio e estabelece que a submissão fiscal deve ser consentida ("no taxation without representation").'
        },
        type: 'philosophical',
    },
    {
        id: '4',
        year: '1610',
        title: {
            es: 'Roberto Belarmino',
            en: 'Robert Bellarmine',
            pt: 'Roberto Belarmino'
        },
        description: {
            es: 'Sistematiza la distinción entre autoridad terrenal y divina y afirma que la autoridad política reside en la comunidad.',
            en: 'Systematizes the distinction between earthly and divine authority and affirms that political authority resides in the community.',
            pt: 'Sistematiza a distinção entre autoridade terrena e divina e afirma que a autoridade política reside na comunidade.'
        },
        type: 'philosophical',
    },
    {
        id: '5',
        year: '1613',
        title: {
            es: 'Francisco Suárez',
            en: 'Francisco Suárez',
            pt: 'Francisco Suárez'
        },
        description: {
            es: 'En "Defensio Fidei", consolida la idea de que la autoridad proviene de Dios, pero es conferida al pueblo ("populum consentientem"), estableciendo el consentimiento como base del gobierno.',
            en: 'In "Defensio Fidei", consolidates the idea that authority comes from God but is conferred to the people ("populum consentientem"), establishing consent as the basis of government.',
            pt: 'Em "Defensio Fidei", consolida a ideia de que a autoridade provém de Deus, mas é conferida ao povo ("populum consentientem"), estabelecendo o consentimento como base do governo.'
        },
        type: 'philosophical',
    },
    {
        id: 'h-1',
        year: 'TRANSMISIÓN',
        title: { es: 'La Europa Protestante', en: 'Protestant Europe', pt: 'Europa Protestante' },
        description: { es: '', en: '', pt: '' },
        type: 'section_header'
    },
    {
        id: '6',
        year: '1603',
        title: {
            es: 'Johannes Althusius',
            en: 'Johannes Althusius',
            pt: 'Johannes Althusius'
        },
        description: {
            es: 'Publica "Politica", donde integra el pensamiento asociativo hispánico e ideas suarecianas en el ámbito calvinista.',
            en: 'Publishes "Politica", where he integrates Hispanic associative thought and Suarean ideas into the Calvinist sphere.',
            pt: 'Publica "Politica", onde integra o pensamento associativo hispânico e ideias suarezianas na esfera calvinista.'
        },
        type: 'historical',
    },
    {
        id: '7',
        year: '1625',
        title: {
            es: 'Hugo Grocio',
            en: 'Hugo Grotius',
            pt: 'Hugo Grotius'
        },
        description: {
            es: 'Pública "De jure belli ac pacis". En esta obra clave del derecho internacional, Grocio apoya sus argumentos con múltiples referencias a Vitoria, Suárez y Vásquez de Menchaca.',
            en: 'Publishes "De jure belli ac pacis". In this key work of international law, Grotius supports his arguments with multiple references to Vitoria, Suárez, and Vásquez de Menchaca.',
            pt: 'Publica "De jure belli ac pacis". Nesta obra fundamental do direito internacional, Grotius apoia os seus argumentos com múltiplas referências a Vitoria, Suárez e Vásquez de Menchaca.'
        },
        type: 'historical',
    },
    {
        id: '8',
        year: '1680',
        title: {
            es: 'Robert Filmer',
            en: 'Robert Filmer',
            pt: 'Robert Filmer'
        },
        description: {
            es: 'Critica ferozmente las ideas de poder limitado en "Patriarcha", paradójicamente sirviendo para darlas a conocer en el mundo aglosajón. El propio Jefferson poseía un ejemplar muy anotado de su obra.',
            en: 'Fiercely criticizes the ideas of limited power in "Patriarcha", paradoxically serving to make them known in the Anglo-Saxon world. Jefferson himself owned a heavily annotated copy of his work.',
            pt: 'Critica ferozmente as ideias de poder limitado em "Patriarcha", paradoxalmente servindo para dá-las a conhecer no mundo anglo-saxão. O próprio Jefferson possuía um exemplar amplamente anotado da sua obra.'
        },
        type: 'historical',
    },
    {
        id: '9',
        year: '1689',
        title: {
            es: 'John Locke',
            en: 'John Locke',
            pt: 'John Locke'
        },
        description: {
            es: 'Se publican los "Dos Tratados sobre el Gobierno Civil". Locke conoció, leyó y recomendó activamente los escritos de Juan de Mariana, cuya visión del consentimiento y el derecho de resistencia reflejan paralelismos notables.',
            en: 'The "Two Treatises of Government" are published. Locke actively knew, read, and recommended the writings of Juan de Mariana, whose vision of consent and the right of resistance reflect notable parallels.',
            pt: 'São publicados os "Dois Tratados sobre o Governo Civil". Locke conheceu, leu e recomendou ativamente os escritos de Juan de Mariana, cuja visão do consentimento e do direito de resistência reflete paralelismos notáveis.'
        },
        type: 'historical',
    },
    {
        id: '10',
        year: '1762',
        title: {
            es: 'Surgimiento de la Revolución Americana',
            en: 'Emergence of the American Revolution',
            pt: 'Surgimento da Revolução Americana'
        },
        description: {
            es: 'En el debate sobre la tributación ("Stamp Act", "Townshend Acts"), los colonos esgrimen los mismos argumentos desarrollados por Mariana en "De monetae mutatione" contra los impuestos sin representación.',
            en: 'In the debate on taxation ("Stamp Act", "Townshend Acts"), colonists use the same arguments developed by Mariana in "De monetae mutatione" against taxation without representation.',
            pt: 'No debate sobre a tributação ("Stamp Act", "Townshend Acts"), os colonos utilizam os mesmos argumentos desenvolvidos por Mariana em "De monetae mutatione" contra os impostos sem representação.'
        },
        type: 'historical',
    },
    {
        id: 'h-2',
        year: 'AMÉRICA',
        title: { es: 'Conexión Atlántica', en: 'Atlantic Connection', pt: 'Conexão Atlântica' },
        description: { es: '', en: '', pt: '' },
        type: 'section_header'
    },
    {
        id: '11',
        year: '1776',
        title: {
            es: 'Declaración de Derechos de Virginia',
            en: 'Virginia Declaration of Rights',
            pt: 'Declaração de Direitos da Virgínia'
        },
        description: {
            es: 'Redactada por George Mason (junio 1776), formula sistemáticamente la soberanía popular y los derechos naturales inherentes.',
            en: 'Drafted by George Mason (June 1776), systematically formulates popular sovereignty and inherent natural rights.',
            pt: 'Redigida por George Mason (junho de 1776), formula sistematicamente a soberania popular e os direitos naturais inerentes.'
        },
        type: 'historical',
    },
    {
        id: '12',
        year: '1776',
        title: {
            es: 'Declaración de Independencia',
            en: 'Declaration of Independence',
            pt: 'Declaração de Independência'
        },
        description: {
            es: 'Thomas Jefferson redacta el documento fundacional. El principio de "Consent of the Governed" recoge la concepción madurada desde Suárez pasando por Locke.',
            en: 'Thomas Jefferson drafts the founding document. The principle of "Consent of the Governed" gathers the conception matured from Suárez through Locke.',
            pt: 'Thomas Jefferson redige o documento fundacional. O princípio do "Consentimento dos Governados" reúne a conceção amadurecida desde Suárez passando por Locke.'
        },
        type: 'historical',
    },
    {
        id: '13',
        year: '1787',
        title: {
            es: 'Constitución de los EE. UU.',
            en: 'US Constitution',
            pt: 'Constituição dos EUA'
        },
        description: {
            es: 'Fijación institucional del poder delegado, equilibrado y sujeto al bien común, reflejando materialmente las cautelas escolásticas frente al absolutismo estatal.',
            en: 'Institutional fixation of delegated power, balanced and subject to the common good, materially reflecting scholastic cautions against state absolutism.',
            pt: 'Fixação institucional do poder delegado, equilibrado e sujeito ao bem comum, refletindo materialmente as cautelas escolásticas face ao absolutismo estatal.'
        },
        type: 'historical',
    },
    {
        id: '14',
        year: '1787–1788',
        title: {
            es: 'El Federalista',
            en: 'The Federalist Papers',
            pt: 'Os Artigos Federalistas'
        },
        description: {
            es: 'Hamilton, Madison y Jay justifican la ratificación de la constitución esgrimiendo argumentos contractualistas sobre la separación de poderes y el gobierno limitado.',
            en: 'Hamilton, Madison, and Jay justify the ratification of the constitution by using contractual arguments on the separation of powers and limited government.',
            pt: 'Hamilton, Madison e Jay justificam a ratificação da constituição utilizando argumentos contratualistas sobre a separação de poderes e o governo limitado.'
        },
        type: 'historical',
    },
    {
        id: '15',
        year: '1789',
        title: {
            es: 'Carta de Derechos (Bill of Rights)',
            en: 'Bill of Rights',
            pt: 'Carta de Direitos'
        },
        description: {
            es: 'Las enmiendas consagran libertades individuales. Su fundamentación conecta indirectamente con el iusnaturalismo de raíz ibérica transmitida por autores protestantes al mundo colonial.',
            en: 'The amendments consecrate individual liberties. Their foundation indirectly connects with the natural law of Iberian root transmitted by Protestant authors to the colonial world.',
            pt: 'As emendas consagram liberdades individuais. A sua fundamentação liga-se indiretamente com o jusnaturalismo de raiz ibérica transmitido por autores protestantes ao mundo colonial.'
        },
        type: 'historical',
    },
    {
        id: 'h-3',
        year: 'RECEPCIÓN',
        title: { es: 'Recuperación Histórica', en: 'Historical Recovery', pt: 'Recuperação Histórica' },
        description: { es: '', en: '', pt: '' },
        type: 'section_header'
    },
    {
        id: '16',
        year: '1947',
        title: {
            es: 'H. A. Rommen: "The Natural Law"',
            en: 'H. A. Rommen: "The Natural Law"',
            pt: 'H. A. Rommen: "The Natural Law"'
        },
        description: {
            es: 'Sistematiza el redescubrimiento moderno, postulando que la Declaración de Independencia es un producto del pensamiento iusnaturalista clásico y de los escolásticos españoles.',
            en: 'Systematizes modern rediscovery, postulating that the Declaration of Independence is a product of classical natural law thought and the Spanish scholastics.',
            pt: 'Sistematiza o redescobrimento moderno, postulando que a Declaração de Independência é um produto do pensamento jusnaturalista clássico e dos escolásticos espanhóis.'
        },
        type: 'historical',
    },
    {
        id: '17',
        year: '1960',
        title: {
            es: 'John Courtney Murray: "We Hold These Truths"',
            en: 'John Courtney Murray: "We Hold These Truths"',
            pt: 'John Courtney Murray: "We Hold These Truths"'
        },
        description: {
            es: 'Demuestra cómo la Primera Enmienda a la Constitución puede entenderse a la luz del desarrollo jurídico legado por figuras como Suárez o Belarmino frente a la monarquía absoluta.',
            en: 'Shows how the First Amendment to the Constitution can be understood in light of the legal development left by figures such as Suárez or Bellarmine against absolute monarchy.',
            pt: 'Demonstra como a Primeira Emenda à Constituição pode ser entendida à luz do desenvolvimento jurídico legado por figuras como Suárez ou Belarmino face à monarquia absoluta.'
        },
        type: 'historical',
    },
    {
        id: '18',
        year: '2016',
        title: {
            es: 'Institución del Día del Legado Hispánico',
            en: 'Institution of Hispanic Heritage Day',
            pt: 'Instituição do Dia do Patrimônio Hispânico'
        },
        description: {
            es: 'Un reconocimiento creciente que empuja las fronteras de los estudios coloniales y exige reconsiderar los fundamentos ideológicos estadounidenses.',
            en: 'A growing recognition that pushes the boundaries of colonial studies and demands reconsidering ideological foundations of the US.',
            pt: 'Um reconhecimento crescente que alarga as fronteiras dos estudos coloniais e exige repensar os fundamentos ideológicos estadunidenses.'
        },
        type: 'historical',
    }
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
                ? 'El segundo presidente y gran estudioso de la teoría política y sistemas de gobierno, John Adams dedicó tres volúmenes al análisis constitucional donde expone la importancia de la separación de poderes para evitar la tiranía. Al igual que James Madison u otros fundadores ingleses, Adams recurrió de nuevo y citó directamente a Juan de Mariana («Del Rey y de la Institución Real», 1599) integrándolo en su reflexión general al tratar la importancia de los parlamentos o en cómo limitar el poder para evitar que degenere. De hecho, fue un ávido lector de Cervantes (aprendió castellano expresamente para leerlo) y admiraba la libertad ibérica medieval descrita en el Quijote, reflejando así un diálogo directo con el pensamiento hispánico temprano.'
                : locale === 'en'
                    ? 'The second president and great student of political theory and government systems, John Adams dedicated three volumes to constitutional analysis where he exposes the importance of the separation of powers to prevent tyranny. Like James Madison or other English founders, Adams returned to and directly cited Juan de Mariana ("De Rege et Regis Institutione", 1599) integrating him into his general reflection when addressing the importance of parliaments or how to limit power to prevent it from degenerating. In fact, he was an avid reader of Cervantes (he learned Spanish expressly to read it) and admired the medieval Iberian freedom described in Quixote, thus reflecting a direct dialogue with early Hispanic thought.'
                    : 'O segundo presidente e grande estudioso da teoria política e sistemas de governo, John Adams dedicou três volumes à análise constitucional onde expõe a importância da separação de poderes para evitar a tirania. Tal como James Madison ou outros fundadores ingleses, Adams recorreu novamente e citou diretamente a Juan de Mariana ("Do Rei e da Instituição Real", 1599) integrando-o na sua reflexão geral ao tratar da importância dos parlamentos ou em como limitar o poder para evitar que degenere. De facto, foi um ávido leitor de Cervantes (aprendeu castelhano expressamente para o ler) e admirava a liberdade ibérica medieval descrita no Quixote, refletindo assim um diálogo direto com o pensamento hispânico inicial.'
        },
        {
            name: 'Thomas Jefferson',
            img: '/images/proyectos/1776/thomasjefferson.jpg',
            text: locale === 'es'
                ? 'Thomas Jefferson mostró un profundo y sostenido interés a lo largo de su vida por la cultura y el pensamiento de filiación hispánica (aprendió a leerlo pero recomendó incansablemente su estudio debido a las historias conectadas del continente). Adquirió obras fundamentales como las de Juan de Palafox y otras relativas a la historia de América y España. Si bien se discute su lectura directa previa a la independencia, Jefferson construyó una biblioteca que permitiera indagar en los autores hispánicos. Estuvo expuesto a las matrices de pensamiento heredadas de la escolástica —como la noción de soberanía popular y los frenos al poder—. Particularmente revelador es que poseyera su copia fuertemente anotada de la obra de Robert Filmer, «Patriarcha», puesto que este libro surge como crítica a Roberto Belarmino con extensas citas literales del jesuita sobre la autoridad de la comunidad; a través de su refutación, Belarmino y su exposición de que «el poder recae primeramente sobre el pueblo» entraron de lleno en el hogar de Jefferson.'
                : locale === 'en'
                    ? 'Thomas Jefferson showed a deep and sustained interest throughout his life in culture and thought of Hispanic affiliation (he learned to read it but tirelessly recommended its study due to the connected histories of the continent). He acquired fundamental works such as those of Juan de Palafox and others related to the history of America and Spain. Although his direct reading prior to independence is debated, Jefferson built a library that allowed investigating Hispanic authors. He was exposed to the matrices of thought inherited from scholasticism—such as the notion of popular sovereignty and checks on power—. Particularly revealing is that he possessed a heavily annotated copy of Robert Filmer\'s work, "Patriarcha", since this book arises as a critique of Robert Bellarmine with extensive literal quotes from the Jesuit on the authority of the community; through its refutation, Bellarmine and his exposition that "power first falls upon the people" entered fully into Jefferson\'s home.'
                    : 'Thomas Jefferson mostrou um profundo e sustentado interesse ao longo da sua vida pela cultura e pensamento de filiação hispânica (aprendeu a lê-lo, mas recomendou incansavelmente o seu estudo devido às histórias conectadas do continente). Adquiriu obras fundamentais como as de Juan de Palafox e outras relativas à história da América e Espanha. Embora se discuta a sua leitura direta anterior à independência, Jefferson construiu uma biblioteca que permitisse investigar os autores hispânicos. Esteve exposto às matrizes de pensamento herdadas da escolástica —como a noção de soberania popular e os freios ao poder—. Particularmente revelador é que possuísse a sua cópia fortemente anotada da obra de Robert Filmer, «Patriarcha», dado que este livro surge como crítica a Roberto Belarmino com extensas citações literais do jesuíta sobre a autoridade da comunidade; através da sua refutação, Belarmino e a sua exposição de que «o poder recai primeiramente sobre o povo» entraram em cheio no lar de Jefferson.'
        },
        {
            name: 'James Madison',
            img: '/images/proyectos/1776/jamesmadison.jpg',
            text: locale === 'es'
                ? 'Padre de la Constitución estadounidense, James Madison elaboró un entramado institucional diseñado para salvaguardar la libertad individual frente a los excesos del poder concentrado. En ensayos como «El Federalista No. 10» y «No. 51», expuso la necesidad de construir instituciones equilibradas acordes a la naturaleza falible del ser humano. En sus razonamientos asoman ecos que emulan los debates hispánicos sobre la limitación del poder; cuando Mariana se preguntaba «¿por qué medios se puede contener» a quien concentra tanto poder, o advertía sobre los peligros del monopolio representativo, señalaba problemáticas que Madison recogerá más tarde al articular teóricamente que «la ambición debe contrarrestar a la ambición».'
                : locale === 'en'
                    ? 'Father of the American Constitution, James Madison elaborated an institutional framework designed to safeguard individual freedom against the excesses of concentrated power. In essays such as "The Federalist No. 10" and "No. 51", he exposed the need to build balanced institutions in accordance with the fallible nature of the human being. In his reasoning, echoes appear that emulate Hispanic debates on the limitation of power; when Mariana asked "by what means can one contain" whoever concentrates so much power, or warned about the dangers of representative monopoly, he pointed out problems that Madison would later collect when theoretically articulating that "ambition must counteract ambition".'
                    : 'Pai da Constituição estadunidense, James Madison elaborou um quadro institucional concebido para salvaguardar a liberdade individual face aos excessos do poder concentrado. Em ensaios como "O Federalista Não. 10" e "Não. 51", expôs a necessidade de construir instituições equilibradas de acordo com a natureza falível do ser humano. Nos seus raciocínios surgem ecos que emulam os debates hispânicos sobre a limitação do poder; quando Mariana se perguntava "por que meios se pode conter" quem concentra tanto poder, ou advertia sobre os perigos do monopólio representativo, assinalava problemas que Madison recolheria mais tarde ao articular teoricamente que "a ambição deve contrabalançar a ambição".'
        },
        {
            name: 'Alexander Hamilton',
            img: '/images/proyectos/1776/alexander madison.jpg',
            text: locale === 'es'
                ? 'Alexander Hamilton, artífice del primer sistema financiero estadounidense y firme defensor de un gobierno federal enérgico, reconoció que la libertad política requería irremediablemente de la estabilidad fiscal y monetaria. Su entendimiento de que la manipulación de la moneda o la deuda excesiva destruiría la confianza pública y subyugaría materialmente al ciudadano conecta con el corazón del realismo económico de Juan de Mariana. Aquel jesuita de Talavera de la Reina, siglos antes y desde contextos distintos, ya había denunciado sin ambages que alterar la moneda sin el consentimiento popular no es otra cosa que confiscar de modo ilegítimo la propiedad («un impuesto encubierto», decía) y, en fin, una tiranía. Una de las primeras exigencias de Hamilton y del resto de padres fundacionales será que el Congreso monopolizara el control de la emisión monetaria, desvinculándola de motivaciones partidistas.'
                : locale === 'en'
                    ? 'Alexander Hamilton, architect of the first American financial system and a staunch defender of an energetic federal government, recognized that political freedom inevitably required fiscal and monetary stability. His understanding that currency manipulation or excessive debt would destroy public trust and materially subjugate the citizen connects to the heart of Juan de Mariana\'s economic realism. That Jesuit from Talavera de la Reina, centuries earlier and from different contexts, had already unambiguously denounced that altering currency without popular consent is nothing else than illegitimately confiscating property ("a hidden tax", he said) and, ultimately, a tyranny. One of the first demands of Hamilton and the rest of the founding fathers will be that Congress monopolize the control of monetary emission, detaching it from partisan motivations.'
                    : 'Alexander Hamilton, artífice do primeiro sistema financeiro estadunidense e fervoroso defensor de um governo federal enérgico, reconheceu que a liberdade política requeria irremediavelmente a estabilidade fiscal e monetária. O seu entendimento de que a manipulação da moeda ou a dívida excessiva destruiria a confiança pública e subjugaria materialmente o cidadão liga-se ao coração do realismo económico de Juan de Mariana. Esse jesuíta de Talavera de la Reina, séculos antes e a partir de contextos diferentes, já tinha denunciado sem rodeios que alterar a moeda sem o consentimento popular não é outra coisa senão confiscar ilegitimamente a propriedade ("um imposto encapuçado", dizia) e, no fundo, uma tirania. Uma das primeiras exigências de Hamilton e do resto dos pais fundadores será que o Congresso monopolizasse o controlo da emissão monetária, desvinculando-a de motivações partidárias.'
        }
    ];

    const thinkers = [
        {
            name: 'Orestes Brownson',
            title: locale === 'es' ? '1803–1876' : '1803–1876',
            text: locale === 'es'
                ? 'Enseñó que el proyecto americano y los Padres Fundadores habían importado e implementado sin percatarse —pero con firmeza— las conclusiones propias de teólogos hispánicos (notablemente Suárez), afirmando la soberanía de la comunidad moral.'
                : locale === 'en'
                    ? 'Taught that the American project and the Founding Fathers had unwittingly—but firmly—imported and implemented the conclusions of Hispanic theologians (notably Suárez), affirming the sovereignty of the moral community.'
                    : 'Ensinou que o projeto americano e os Pais Fundadores tinham importado e implementado sem se aperceberem —mas com firmeza— as conclusões próprias de teólogos hispânicos (nomeadamente Suárez), afirmando a soberania da comunidade moral.'
        },
        {
            name: 'John Courtney Murray',
            title: locale === 'es' ? '1904–1967' : '1904–1967',
            text: locale === 'es'
                ? 'Reivindicó que la Primera Enmienda, la separación de esferas y el límite al Estado absoluto que encarnaron figuras como el jesuita Roberto Belarmino encuentran su realización práctica en el diseño constitucional estadounidense.'
                : locale === 'en'
                    ? 'Claimed that the First Amendment, the separation of spheres, and the limit to the absolute State embodied by figures like the Jesuit Robert Bellarmine find their practical realization in the American constitutional design.'
                    : 'Reivindicou que a Primeira Emenda, a separação de esferas e o limite ao Estado absoluto que encarnaram figuras como o jesuíta Roberto Belarmino encontram a sua realização prática no desenho constitucional estadunidense.'
        },
        {
            name: 'Heinrich A. Rommen',
            title: locale === 'es' ? '1897–1967' : '1897–1967',
            text: locale === 'es'
                ? 'A través de obras como "The Natural Law", se esforzó en recordar a la academia y la opinión norteamericana que los cimientos sobre los que descansaba ese país procedían innegablemente de las fuentes hispanas de la Segunda Escolástica.'
                : locale === 'en'
                    ? 'Through works like "The Natural Law", he strove to remind North American academia and opinion that the foundations upon which that country rested undeniably came from Hispanic sources of the Second Scholasticism.'
                    : 'Através de obras como "The Natural Law", esforçou-se por lembrar à academia e à opinião norte-americana que os alicerces sobre os quais descansava esse país procediam inegavelmente das fontes hispanas da Segunda Escolástica.'
        },
        {
            name: 'Carlos Stoetzer',
            title: locale === 'es' ? '1920–2011' : '1920–2011',
            text: locale === 'es'
                ? 'Desde Washington y otros enclaves, documentó meticulosamente cómo autores hispánicos intervinieron, se importaron o dialogaron en la gestación de los cimientos constitucionales frente a la tiranía.'
                : locale === 'en'
                    ? 'From Washington and other enclaves, he meticulously documented how Hispanic authors intervened, were imported, or dialogued in the gestation of constitutional foundations against tyranny.'
                    : 'Desde Washington e outros enclaves, documentou meticulosamente como autores hispânicos intervieram, foram importados ou dialogaram na gestação das bases constitucionais face à tirania.'
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
