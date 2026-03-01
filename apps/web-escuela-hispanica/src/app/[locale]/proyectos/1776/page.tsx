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
        title: { es: 'Red universitaria ibérica y nacimiento de la economía moderna', en: 'Red universitaria ibérica y nacimiento de la economía moderna', pt: 'Red universitaria ibérica y nacimiento de la economía moderna' },
        description: { es: 'En las universidades de Salamanca, Alcalá, Valladolid, Coimbra y Évora se desarrolla una reflexión sistemática sobre economía, derecho y política en el contexto de la expansión atlántica. Esta red académica explora conceptos teológicos y filosóficos fundamentales —como la dignidad de la persona, la soberanía social o los derechos naturales— y describe el mercado como un orden espontáneo surgido de la interacción humana libre. Sus análisis sobre propiedad, valor, intercambio y moneda contribuirán al nacimiento de la propia ciencia económica. Esta filiación intelectual fue reconocida posteriormente por la Escuela Austriaca de Economía: Joseph Schumpeter, en History of Economic Analysis (1954), calificó a los doctores escolásticos como fundadores de la economía científica; Friedrich Hayek, en Law, Legislation and Liberty (1973-1979) y Studies in Philosophy, Politics and Economics (1967), señaló que anticiparon la teoría del orden espontáneo del mercado; y Murray Rothbard, en Economic Thought Before Adam Smith (1995), los presentó como precursores directos del liberalismo económico moderno.', en: 'In the universities of Salamanca, Alcalá, Valladolid, Coimbra, and Évora, a systematic reflection on economics, law, and politics develops in the context of Atlantic expansion. This academic network explores fundamental theological and philosophical concepts—such as human dignity, social sovereignty, or natural rights—and describes the market as a spontaneous order arising from free human interaction. Their analyses of property, value, exchange, and currency will contribute to the birth of economic science itself. This intellectual affiliation was later recognized by the Austrian School of Economics: Joseph Schumpeter, in History of Economic Analysis (1954), described the scholastic doctors as founders of scientific economics; Friedrich Hayek, in Law, Legislation and Liberty (1973-1979) and Studies in Philosophy, Politics and Economics (1967), pointed out that they anticipated the theory of the spontaneous order of the market; and Murray Rothbard, in Economic Thought Before Adam Smith (1995), presented them as direct precursors of modern economic liberalism.', pt: 'Nas universidades de Salamanca, Alcalá, Valladolid, Coimbra e Évora, desenvolve-se uma reflexão sistemática sobre economia, direito e política no contexto da expansão atlântica. Esta rede académica explora conceitos teológicos e filosóficos fundamentais — como a dignidade da pessoa, a soberania social ou os direitos naturais — e descreve o mercado como uma ordem espontânea decorrente da interação humana livre. As suas análises sobre propriedade, valor, troca e moeda contribuirão para o nascimento da própria ciência económica. Esta filiação intelectual foi posteriormente reconhecida pela Escola Austríaca de Economia: Joseph Schumpeter qualificou os doutores escolásticos como fundadores da economia científica; Friedrich Hayek assinalou que anteciparam a teoria da ordem espontânea do mercado; e Murray Rothbard apresentou-os como precursores diretos do liberalismo económico moderno.' },
        type: 'philosophical'
    },
    {
        id: '2',
        year: '1539',
        title: { es: 'Francisco de Vitoria: Relectio de Indis', en: 'Francisco de Vitoria: Relectio de Indis', pt: 'Francisco de Vitoria: Relectio de Indis' },
        description: { es: 'Vitoria afirma la igualdad natural de todos los hombres y formula el derecho de gentes, base del derecho internacional moderno. Niega la legitimidad del dominio basado únicamente en la fuerza y establece principios universales de justicia entre pueblos. Estas ideas serán desarrolladas posteriormente por la segunda escolástica —especialmente por Juan de Mariana— y pasarán al mundo protestante a través de autores como Hugo Grocio, quien sistematizará en el siglo XVII el derecho internacional moderno tomando como referencia el pensamiento jurídico-moral surgido en las universidades ibéricas.', en: 'Vitoria affirms the natural equality of all men and formulates the law of nations, the basis of modern international law. He denies the legitimacy of dominion based solely on force and establishes universal principles of justice among peoples. These ideas would be developed later by the Second Scholasticism—especially by Juan de Mariana—and would pass to the Protestant world through authors like Hugo Grotius, who systemized modern international law in the 17th century taking the juridical-moral thought born in the Iberian universities as a reference.', pt: 'Vitoria afirma a igualdade natural de todos os homens e formula o direito das gentes, base do direito internacional moderno. Nega a legitimidade do domínio baseado apenas na força e estabelece princípios universais de justiça entre os povos. Estas ideias serão desenvolvidas posteriormente pela segunda escolástica — especialmente por Juan de Mariana — e passarão ao mundo protestante através de autores como Hugo Grócio, que sistematizará no século XVII o direito internacional moderno tomando como referência o pensamento jurídico-moral surgido nas universidades ibéricas.' },
        type: 'philosophical'
    },
    {
        id: '3',
        year: '1553–1569',
        title: { es: 'Domingo de Soto: precio justo y mercado', en: 'Domingo de Soto: precio justo y mercado', pt: 'Domingo de Soto: precio justo y mercado' },
        description: { es: 'En De Iustitia et Iure (1553–1554), De Soto sostiene que el precio justo no lo fija la autoridad sino el mercado, resultado de la estimación común de compradores y vendedores. Con ello legitima el comercio competitivo y limita la intervención política en la economía. Esta noción anticipa la teoría de la formación espontánea de precios que siglos después sistematizará Adam Smith en la economía clásica, integrándola en su explicación del orden económico basado en la interacción libre de los individuos.', en: 'In De Iustitia et Iure (1553–1554), De Soto argues that the just price is not fixed by authority but by the market, as a result of the common estimation of buyers and sellers. With this he legitimizes competitive commerce and limits political intervention in the economy. This notion anticipates the theory of spontaneous price formation that Adam Smith would systemize centuries later in classical economics, integrating it into his explanation of the economic order based on the free interaction of individuals.', pt: 'Em De Iustitia et Iure (1553–1554), De Soto defende que o preço justo não é fixado pela autoridade, mas sim pelo mercado, como resultado da estimativa comum de compradores e vendedores. Com isso legitima o comércio competitivo e limita a intervenção política na economia. Esta noção antecipa a teoria da formação espontânea de preços que séculos depois Adam Smith sistematizará na economia clássica, integrando-a na sua explicação da ordem económica baseada na interação livre dos indivíduos.' },
        type: 'philosophical'
    },
    {
        id: '4',
        year: '1556',
        title: { es: 'Martín de Azpilcueta: teoría cuantitativa del dinero', en: 'Martín de Azpilcueta: teoría cuantitativa del dinero', pt: 'Martín de Azpilcueta: teoría cuantitativa del dinero' },
        description: { es: 'En su Comentario resolutorio de cambios, Azpilcueta observa que la abundancia de metales procedentes de América provoca inflación y formula una temprana teoría cuantitativa: el valor de la moneda depende de su escasez relativa. Esta explicación del poder adquisitivo anticipa la teoría monetaria moderna y llegará a la economía política europea, influyendo indirectamente en los debates monetarios del mundo anglosajón. Sus intuiciones sobre inflación, devaluación y estabilidad monetaria reaparecerán en discusiones posteriores en Estados Unidos, especialmente en las controversias entre los federalistas de Hamilton —favorables a instituciones financieras fuertes— y posiciones más recelosas del poder monetario, presentes en autores como John Adams.', en: 'In his Comentario resolutorio de cambios, Azpilcueta observes that the abundance of metals from the Americas causes inflation and formulates an early quantity theory of money: the value of currency depends on its relative scarcity. This explanation of purchasing power anticipates modern monetary theory and will reach European political economy, indirectly influencing the monetary debates of the Anglo-Saxon world. His insights into inflation, devaluation, and monetary stability would reappear in later discussions in the United States, especially in the controversies between Hamilton’s Federalists—who favored strong financial institutions—and positions more suspicious of monetary power, present in authors like John Adams.', pt: 'No seu Comentario resolutorio de cambios, Azpilcueta observa que a abundância de metais procedentes da América provoca inflação e formula uma precoce teoria quantitativa da moeda: o valor da moeda depende da sua escassez relativa. Esta explicação do poder de compra antecipa a teoria monetária moderna e chegará à economia política europeia, influenciando indiretamente os debates monetários do mundo anglo-saxónico. As suas intuições sobre inflação, desvalorização e estabilidade monetária reaparecerão em discussões posteriores nos Estados Unidos, especialmente nas controvérsias entre os federalistas de Hamilton — favoráveis a instituições financeiras fortes — e posições mais receosas do poder monetário, presentes em autores como John Adams.' },
        type: 'philosophical'
    },
    {
        id: '5',
        year: '1571',
        title: { es: 'Tomás de Mercado: comercio y crédito', en: 'Tomás de Mercado: comercio y crédito', pt: 'Tomás de Mercado: comercio y crédito' },
        description: { es: 'En su Suma de tratos y contratos, Mercado estudia el comercio internacional, la banca y el crédito en una economía global emergente. Defiende la legitimidad moral de la actividad mercantil y describe el mercado como un sistema complejo de intercambios voluntarios. Sus análisis sobre comercio, riesgo y circulación monetaria anticipan elementos fundamentales de la economía política moderna y del mundo comercial que heredarán tanto la economía clásica británica como las instituciones financieras del nuevo Estado norteamericano.', en: 'In his Suma de tratos y contratos, Mercado studies international commerce, banking, and credit in an emerging global economy. He defends the moral legitimacy of mercantile activity and describes the market as a complex system of voluntary exchanges. His analyses of commerce, risk, and currency circulation anticipate fundamental elements of modern political economy and the commercial world that both British classical economics and the financial institutions of the young American state would inherit.', pt: 'Na sua Suma de tratos y contratos, Mercado estuda o comércio internacional, a banca e o crédito numa economia global emergente. Defende a legitimidade moral da atividade mercantil e descreve o mercado como um sistema complexo de trocas voluntárias. As suas análises sobre comércio, risco e circulação monetária antecipam elementos fundamentais da economia política moderna e do mundo comercial que herdarão tanto a economia clássica britânica como as instituições financeiras do novo Estado norte-americano.' },
        type: 'philosophical'
    },
    {
        id: '6',
        year: '1599',
        title: { es: 'Juan de Mariana: De Rege et Regis Institutione', en: 'Juan de Mariana: De Rege et Regis Institutione', pt: 'Juan de Mariana: De Rege et Regis Institutione' },
        description: { es: 'Mariana sostiene que el poder pertenece originalmente al pueblo y se delega en el gobernante. Defiende el consentimiento para los impuestos, la limitación del poder político y la legitimidad de resistir al tirano, anticipando el constitucionalismo liberal. Sus tesis circularon ampliamente en Europa protestante y fueron conocidas por autores como Grocio, Pufendorf y especialmente John Locke, cuyas formulaciones sobre propiedad, consentimiento fiscal y derecho de rebelión presentan paralelos casi literales con la obra del jesuita español. A través de Locke estas ideas pasarán al mundo atlántico: John Adams poseía y buscó activamente la obra de Mariana, Jefferson la difundió entre sus allegados y varios Founding Fathers compartían sus libros. Incluso desde una perspectiva anglo-americana más amplia, resulta difícil explicar la tradición liberal exclusivamente como fruto británico: si Adam Smith pasó años en Francia en contacto con los fisiócratas —en un ambiente intelectual donde Mariana era ampliamente conocido tras haber enseñado en la Sorbona— resulta improbable que ignorase su pensamiento político-económico. No es casual que la propia alegoría republicana francesa reciba el nombre de “Marianne” y que aparezca representada en La Libertad guiando al pueblo de Eugène Delacroix, reflejo cultural de una tradición europea de soberanía popular anterior a la Ilustración escocesa.', en: 'Mariana argues that power originally belongs to the people and is delegated to the ruler. He defends consent for taxation, the limitation of political power, and the legitimacy of resisting a tyrant, anticipating liberal constitutionalism. His theses circulated widely in Protestant Europe and were known by authors such as Grotius, Pufendorf, and especially John Locke, whose formulations on property, fiscal consent, and the right to rebellion present almost literal parallels with the work of the Spanish Jesuit. Through Locke, these ideas would pass to the Atlantic world: John Adams owned and actively sought Mariana’s work, Jefferson shared it with friends, and several Founding Fathers shared his books. Even from a broader Anglo-American perspective, it is difficult to explain the liberal tradition exclusively as a British product: if Adam Smith spent years in France in contact with the physiocrats—in an intellectual environment where Mariana was widely known after having taught at the Sorbonne—it is unlikely that he ignored his political-economic thought. It is no coincidence that the French republican allegory itself is named "Marianne" and appears represented in Eugène Delacroix\'s Liberty Leading the People, reflecting a European tradition of popular sovereignty prior to the Scottish Enlightenment.', pt: 'Mariana defende que o poder pertence originalmente ao povo e é delegado ao governante. Defende o consentimento para os impostos, a limitação do poder político e a legitimidade de resistir ao tirano, antecipando o constitucionalismo liberal. As suas teses circularam amplamente na Europa protestante e foram conhecidas por autores como Grócio, Pufendorf e especialmente John Locke, cujas formulações sobre propriedade, consentimento fiscal e direito de rebelião apresentam paralelismos quase literais com a obra do jesuíta espanhol. Através de Locke estas ideias passarão ao mundo atlântico: John Adams possuía e procurou ativamente a obra de Mariana, Jefferson difundiu-a entre os seus conhecidos e vários Pais Fundadores partilhavam os seus livros. É difícil explicar a tradição liberal exclusivamente como fruto britânico: se Adam Smith passou anos em França em contacto com os fisiocratas — num ambiente onde Mariana era conhecido — é improvável que ignorasse o seu pensamento. Não é por acaso que a própria alegoria republicana francesa recebe o nome de "Marianne".' },
        type: 'philosophical'
    },
    {
        id: '7',
        year: '1609–1610',
        title: { es: 'El proceso contra Juan de Mariana: dinero, impuestos y tiranía', en: 'El proceso contra Juan de Mariana: dinero, impuestos y tiranía', pt: 'El proceso contra Juan de Mariana: dinero, impuestos y tiranía' },
        description: { es: 'Tras publicar De Monetae Mutatione, Mariana es acusado de traición por afirmar que la manipulación monetaria equivale a un impuesto encubierto y que el rey no puede apropiarse de la propiedad de sus súbditos sin consentimiento. Defiende que la ley natural es superior al poder del Estado y que la fiscalidad sin representación constituye una forma de robo. Sus tesis —inflación como impuesto, soberanía popular y derecho de resistencia— anticipan formulaciones que aparecerán más tarde en el lema de la Revolución Americana: No taxation without representation.', en: 'After publishing De Monetae Mutatione, Mariana is accused of treason for stating that monetary manipulation equals a hidden tax and that the king cannot appropriate the property of his subjects without consent. He defends that natural law is superior to the power of the State and that taxation without representation constitutes a form of theft. His theses—inflation as a tax, popular sovereignty, and the right of resistance—anticipate formulations that would appear later in the motto of the American Revolution: "No taxation without representation".', pt: 'Após publicar De Monetae Mutatione, Mariana é acusado de traição por afirmar que a manipulação monetária equivale a um imposto encoberto e que o rei não pode apropriar-se da propriedade dos seus súbditos sem consentimento. Defende que a lei natural é superior ao poder do Estado e que a tributação sem representação constitui uma forma de roubo. As suas teses — inflação como imposto, soberania popular e direito de resistência — antecipam formulações que aparecerão mais tarde no lema da Revolução Americana: "No taxation without representation".' },
        type: 'philosophical'
    },
    {
        id: '8',
        year: '1610–1614',
        title: { es: 'Roberto Belarmino: De Laicis', en: 'Roberto Belarmino: De Laicis', pt: 'Roberto Belarmino: De Laicis' },
        description: { es: 'Belarmino, formado en el mismo ambiente intelectual de la segunda escolástica y en diálogo directo con los teólogos y juristas de la tradición hispánica, desarrolla y sistematiza principios ya presentes en las universidades ibéricas sobre origen social del poder político. Formula que la autoridad proviene de Dios pero reside originariamente en la comunidad política, que decide a quién delegarla. Rechaza así el derecho divino absoluto de los reyes y sostiene que el poder civil existe para el bien común y puede cambiar de forma si deja de cumplir ese fin. Estas tesis circularon en el debate europeo a través de sus críticos —especialmente Robert Filmer—, cuyas refutaciones pusieron en primer plano la doctrina de la soberanía popular ante lectores ingleses. Thomas Jefferson poseía y anotó Patriarcha, donde se citan extensamente los argumentos de Belarmino, y la polémica contribuyó a trasladar al mundo anglosajón la idea de que el poder deriva del consentimiento de los gobernados. De este modo, principios presentes en la Virginia Declaration of Rights y en la Declaration of Independence —igualdad natural, poder del pueblo y derecho a alterar el gobierno— reproducen formulaciones desarrolladas por el cardenal dos siglos antes.', en: 'Bellarmine, formed in the intellectual environment of the Second Scholasticism and in direct dialogue with the theologians and jurists of the Hispanic tradition, develops and systematizes principles already present in the Iberian universities on the social origin of political power. He formulates that authority comes from God but resides originally in the political community, which decides to whom to delegate it. He thus rejects the absolute divine right of kings and maintains that civil power exists for the common good and can change forms if it ceases to fulfill that end. These theses circulated in European debate through his critics—especially Robert Filmer—whose refutations brought the doctrine of popular sovereignty to the forefront for English readers. Thomas Jefferson owned and annotated Patriarcha, where Bellarmine’s arguments are quoted extensively, and the controversy helped transfer to the Anglo-Saxon world the idea that power derives from the consent of the governed. In this way, principles present in the Virginia Declaration of Rights and the Declaration of Independence reproduce formulations developed by the cardinal two centuries earlier.', pt: 'Belarmino, formado no ambiente intelectual da Segunda Escolástica e em diálogo direto com a tradição hispânica, desenvolve princípios já presentes nas universidades ibéricas. Formula que a autoridade provém de Deus mas reside originalmente na comunidade política, que decide a quem delegá-la. Rejeita assim o direito divino absoluto dos reis e defende que o poder civil existe para o bem comum. Estas teses circularam no debate europeu através dos seus críticos — especialmente Robert Filmer — cujas refutações colocaram em primeiro plano a doutrina da soberania popular perante os leitores ingleses. Thomas Jefferson possuía e anotou Patriarcha, onde se citam os argumentos de Belarmino, contribuindo para transferir ao mundo anglo-saxónico a ideia de consentimento dos governados.' },
        type: 'philosophical'
    },
    {
        id: '9',
        year: '1613',
        title: { es: 'Francisco Suárez: Defensio Fidei', en: 'Francisco Suárez: Defensio Fidei', pt: 'Francisco Suárez: Defensio Fidei' },
        description: { es: 'Suárez, figura central de la segunda escolástica, sistematiza la doctrina del origen social del poder político: la autoridad procede de Dios en cuanto principio último del orden natural, pero reside primero en la comunidad y sólo se transmite al gobernante por el consentimiento del pueblo (populum consentientem). Con ello rechaza el derecho divino absoluto de los reyes y fundamenta la legitimidad de limitar o deponer a un gobernante injusto. Su obra fue leída y discutida en Inglaterra en el contexto de las controversias sobre la monarquía de los Estuardo, donde autores anglicanos y parlamentarios debatieron precisamente la relación entre soberanía, ley y consentimiento. Estas ideas pasarán al pensamiento político inglés y aparecerán posteriormente sistematizadas en Locke —sociedad previa al Estado, poder fiduciario del gobierno y derecho de resistencia—, configurando así una de las bases intelectuales de la tradición constitucional británica que más tarde heredará la Ilustración escocesa y, a través de ella, la Revolución Americana.', en: 'Suárez, a central figure of the Second Scholasticism, systematizes the doctrine of the social origin of political power: authority proceeds from God as the ultimate principle of the natural order, but resides first in the community and is only transmitted to the ruler by the consent of the people (populum consentientem). With this, he rejects the absolute divine right of kings and grounds the legitimacy of limiting or deposing an unjust ruler. His work was read and discussed in England in the context of the controversies over the Stuart monarchy, where Anglican and parliamentary authors debated precisely the relationship between sovereignty, law, and consent. These ideas would pass into English political thought and later appear systematized in Locke, conforming one of the intellectual bases of the British constitutional tradition.', pt: 'Suárez sistematiza a doutrina da origem social do poder político: a autoridade procede de Deus, mas reside primeiro na comunidade e só se transmite ao governante pelo consentimento do povo (populum consentientem). Com isso rejeita o direito divino absoluto dos reis e fundamenta a legitimidade de limitar um governante injusto. A sua obra foi discutida em Inglaterra no contexto das controvérsias da monarquia dos Stuart. Estas ideias passarão ao pensamento político inglês e aparecerão sistematizadas em Locke — sociedade prévia ao Estado, poder fiduciário do governo e direito de resistência — configurando uma das bases da tradição constitucional britânica.' },
        type: 'philosophical'
    },
    {
        id: 'h-1',
        year: 'TRANSMISIÓN A LA EUROPA PROTESTANTE',
        title: { es: 'Transmisión', en: 'Transmisión', pt: 'Transmisión' },
        description: { es: '', en: '', pt: '' },
        type: 'section_header'
    },
    {
        id: '10',
        year: '1654',
        title: { es: 'Marchamont Nedham: The Excellencie of a Free-State', en: 'Marchamont Nedham: The Excellencie of a Free-State', pt: 'Marchamont Nedham: The Excellencie of a Free-State' },
        description: { es: 'En la Inglaterra republicana posterior a la Guerra Civil, Nedham defiende que la soberanía reside en el pueblo y que el poder político debe estar permanentemente limitado por instituciones representativas. Su obra forma parte de la tradición parlamentaria anti-absolutista que había incorporado previamente argumentos de la segunda escolástica —transmitidos en Inglaterra a través de las controversias contra el derecho divino de los reyes—. A través de esta literatura republicana, principios formulados por autores como Suárez, Belarmino o Mariana llegan al pensamiento político anglosajón y serán conocidos por los autores americanos: John Adams citará a Nedham al tratar la separación de poderes y la resistencia frente al poder arbitrario, integrando así esa tradición en el constitucionalismo estadounidense.', en: 'In the republican England following the Civil War, Nedham defends that sovereignty resides in the people and that political power must be permanently limited by representative institutions. His work is part of the anti-absolutist parliamentary tradition that had previously incorporated arguments from the Second Scholasticism. Through this republican literature, principles formulated by authors like Suárez, Bellarmine, or Mariana arrive at Anglo-Saxon political thought: John Adams would cite Nedham when discussing the separation of powers and resistance against arbitrary power.', pt: 'Na Inglaterra republicana posterior à Guerra Civil, Nedham defende que a soberania reside no povo e que o poder deve ser limitado por instituições representativas. A sua obra faz parte da tradição parlamentar antiabsolutista que incorporara previamente argumentos da Segunda Escolástica. Através desta literatura republicana, princípios formulados por Suárez, Belarmino ou Mariana chegam ao pensamento anglo-saxónico: John Adams citará Nedham ao tratar da separação de poderes.' },
        type: 'historical'
    },
    {
        id: '11',
        year: '1680',
        title: { es: 'Robert Filmer: Patriarcha', en: 'Robert Filmer: Patriarcha', pt: 'Robert Filmer: Patriarcha' },
        description: { es: 'Filmer escribe Patriarcha como defensa del derecho divino de los reyes frente a la tradición anti-absolutista europea. Para refutarla, dedica sus primeras páginas a atacar directamente a Roberto Belarmino y, con él, a la segunda escolástica, citando extensamente la tesis de que la autoridad civil reside originalmente en la comunidad y se delega por consentimiento. La obra fue muy leída en Inglaterra y posteriormente en las colonias americanas —Thomas Jefferson poseía y anotó un ejemplar—, de modo que la polémica contribuyó a introducir en el mundo anglosajón precisamente las ideas que pretendía combatir. Así, el debate sobre el origen del poder político trasladó indirectamente al pensamiento inglés la doctrina de la soberanía popular, que después sería sistematizada por Locke y terminaría influyendo en la teoría política de la Revolución Americana.', en: 'Filmer writes Patriarcha as a defense of the divine right of kings against the European anti-absolutist tradition. To refute it, he dedicates his first pages to directly attacking Robert Bellarmine and the Second Scholasticism, extensively quoting the thesis that civil authority resides originally in the community and is delegated by consent. The work was widely read in England and later in the American colonies—Thomas Jefferson owned and annotated a copy—so the controversy contributed to introducing into the Anglo-Saxon world precisely the ideas he sought to combat.', pt: 'Filmer escreve Patriarcha como defesa do direito divino dos reis. Para refutá-la, dedica as primeiras páginas a atacar Roberto Belarmino e a Segunda Escolástica, citando a tese de que a autoridade civil reside na comunidade e se delega por consentimento. A obra foi lida nas colónias americanas — Thomas Jefferson possuía um exemplar — e a polémica contribuiu para introduzir no mundo anglo-saxónico precisamente as ideias que pretendia combater.' },
        type: 'historical'
    },
    {
        id: '12',
        year: '1688–1689',
        title: { es: 'Revolución Gloriosa y John Locke: Two Treatises of Government', en: 'Revolución Gloriosa y John Locke: Two Treatises of Government', pt: 'Revolución Gloriosa y John Locke: Two Treatises of Government' },
        description: { es: 'En el contexto de la Revolución Gloriosa, Locke formula la teoría política que legitima el parlamentarismo inglés: la sociedad es anterior al Estado, el gobierno es un poder fiduciario delegado por los ciudadanos, la propiedad constituye un derecho natural y la tributación exige consentimiento. También defiende el derecho de resistencia cuando el gobernante viola ese mandato. Estos planteamientos presentan paralelismos notables con la tradición escolástica hispánica —especialmente con Juan de Mariana—: ambos sostienen que el poder pertenece originalmente al pueblo, que el gobernante no puede imponer impuestos sin consentimiento y que la violación de la propiedad justifica la rebelión.\n\nLejos de ser una mera coincidencia doctrinal, existen indicios de transmisión intelectual: Locke conocía y recomendaba obras de Mariana, poseía textos suyos en su biblioteca y compartía con él tesis sobre el origen de la sociedad, la naturaleza de la propiedad y la limitación del poder político. Así, el pensamiento que suele considerarse núcleo de la tradición liberal inglesa se configura también como etapa intermedia de una corriente intelectual previa, que pasará desde el constitucionalismo británico a la teoría política de la Revolución Americana y a los documentos fundacionales de los Estados Unidos.', en: 'In the context of the Glorious Revolution, Locke formulates the political theory that legitimizes English parliamentarianism. These approaches present notable parallels with the Hispanic scholastic tradition—especially with Juan de Mariana. Evidence of intellectual transmission exists: Locke knew and recommended works by Mariana, possessed his texts in his library, and shared with him theses on the origin of society, the nature of property, and the limitation of political power.', pt: 'No contexto da Revolução Gloriosa, Locke formula a teoria política que legitima o parlamentarismo inglês. Estes pressupostos apresentam notáveis paralelismos com a tradição escolástica hispânica — especialmente com Juan de Mariana. Existem indícios de transmissão intelectual: Locke conhecia e recomendava obras de Mariana, possuía textos seus na sua biblioteca, partilhando teses sobre a limitação do poder político e o consentimento.' },
        type: 'historical'
    },
    {
        id: 'h-2',
        year: 'HACIA AMÉRICA',
        title: { es: 'Hacia América', en: 'Hacia América', pt: 'Hacia América' },
        description: { es: '', en: '', pt: '' },
        type: 'section_header'
    },
    {
        id: '13',
        year: '1639',
        title: { es: 'Fundamental Orders of Connecticut', en: 'Fundamental Orders of Connecticut', pt: 'Fundamental Orders of Connecticut' },
        description: { es: 'Considerado uno de los primeros textos constitucionales del mundo moderno, establece un gobierno basado en el consentimiento de la comunidad política y en la limitación institucional del poder. La autoridad no deriva de un monarca ni de un derecho divino personal, sino del acuerdo de los miembros de la sociedad que eligen a sus magistrados y fijan reglas comunes. Este planteamiento refleja la tradición constitucional inglesa posterior a las controversias anti-absolutistas del siglo XVII, en la que ya se habían incorporado las tesis escolásticas sobre soberanía popular, poder delegado y legitimidad del gobierno orientado al bien común. Así, el constitucionalismo colonial americano aparece como una aplicación práctica temprana de principios elaborados previamente en el debate político europeo y transmitidos al mundo anglosajón antes incluso de la independencia.', en: 'Considered one of the first constitutional texts of the modern world, it establishes a government based on the consent of the political community and the institutional limitation of power. This approach reflects the English constitutional tradition after the anti-absolutist controversies of the 17th century, in which scholastic theses on popular sovereignty had already been incorporated.', pt: 'Considerado um dos primeiros textos constitucionais do mundo moderno, estabelece um governo baseado no consentimento da comunidade e na limitação institucional do poder. Reflete a tradição constitucional inglesa posterior às controvérsias antiabsolutistas do século XVII, nas quais já tinham sido incorporadas as teses escolásticas.' },
        type: 'historical'
    },
    {
        id: '14',
        year: 'Siglos XVIII–XIX',
        title: { es: 'Recepción estadounidense del pensamiento escolástico', en: 'Recepción estadounidense del pensamiento escolástico', pt: 'Recepción estadounidense del pensamiento escolástico' },
        description: { es: 'Las obras de Juan de Mariana circularon ampliamente en Inglaterra y en las colonias americanas. Su defensa del consentimiento político, la limitación del poder, la propiedad inviolable y el derecho a deponer gobernantes injustos dialogó con el pensamiento de Locke y pasó a la cultura política colonial. Locke recomendaba su lectura y lo citaba, evidenciando la circulación atlántica de estas ideas.\n\nThomas Jefferson descubrió a Mariana e incluso regaló ejemplares de una de sus obras a amigos; y el segundo presidente de Estados Unidos, John Adams, incluyó al menos dos obras de Mariana en su biblioteca, entre ellas De rege et regis institutione (1598).', en: 'The works of Juan de Mariana circulated widely in England and the American colonies. His defense of political consent, limited power, and inviolable property dialogued with Locke\'s thought and passed into colonial political culture. Thomas Jefferson discovered Mariana and even gifted copies of his work, and John Adams included at least two of his works in his library.', pt: 'As obras de Juan de Mariana circularam amplamente em Inglaterra e nas colónias americanas. A sua defesa do consentimento, do poder limitado e da propriedade passou à cultura política colonial americana. Jefferson descobriu Mariana e até ofereceu os seus livros a amigos; John Adams possuía pelo menos duas obras suas na biblioteca.' },
        type: 'historical'
    },
    {
        id: 'h-3',
        year: 'FUNDACIÓN DE LOS ESTADOS UNIDOS',
        title: { es: 'Fundación', en: 'Fundación', pt: 'Fundación' },
        description: { es: '', en: '', pt: '' },
        type: 'section_header'
    },
    {
        id: '15',
        year: '1776',
        title: { es: 'Declaración de Independencia', en: 'Declaración de Independencia', pt: 'Declaración de Independencia' },
        description: { es: 'El principio de derechos naturales otorgados por el Creador y el consentimiento del gobernado refleja la doctrina desarrollada por Francisco de Vitoria en sus Relectiones (1539) sobre la igualdad natural de todos los hombres y por Francisco Suárez en Defensio Fidei (1613), donde el poder político se entiende como autoridad delegada por la comunidad. La idea de que un gobierno pierde legitimidad cuando viola esos derechos coincide además con la formulación de Juan de Mariana en De Rege et Regis Institutione (1599) sobre la legitimidad de resistir al tirano.', en: 'The principle of natural rights granted by the Creator and the consent of the governed reflects the doctrine developed by Francisco de Vitoria and Francisco Suárez, where political power is understood as delegated authority. The idea that an unjust government loses legitimacy coincides with Juan de Mariana\'s formulation on the legitimacy of resisting the tyrant.', pt: 'O princípio dos direitos naturais e do consentimento dos governados reflete a doutrina desenvolvida por Francisco de Vitoria e Francisco Suárez. A ideia de que um governo injusto perde a legitimidade coincide com a formulação de Juan de Mariana sobre o direito de resistir ao tirano.' },
        type: 'historical'
    },
    {
        id: '16',
        year: '1776',
        title: { es: 'Virginia Declaration of Rights', en: 'Virginia Declaration of Rights', pt: 'Virginia Declaration of Rights' },
        description: { es: 'El derecho a alterar un gobierno injusto y la soberanía popular encuentran precedentes directos en De Rege et Regis Institutione (1599) de Juan de Mariana y en Defensio Fidei (1613) de Francisco Suárez, que sostiene que el poder reside originariamente en la comunidad y sólo se delega al gobernante por consentimiento. La crítica colonial a la tributación sin representación reproduce además el argumento escolástico contra los impuestos sin consentimiento desarrollado en la tradición salmantina desde finales del siglo XVI.\n\nGeorge Mason, autor principal de la Virginia Declaration of Rights (1776), fue probablemente el fundador norteamericano que formuló de manera más pura —y menos "filosófica" que Jefferson— el lenguaje jurídico del constitucionalismo. Su texto inaugura una serie de principios que después pasarán casi literalmente a la Declaración de Independencia y al Bill of Rights: igualdad natural, soberanía popular, derecho de resistencia y limitación del poder político.\n\nLa conexión con la tradición hispánica no es directa en forma de cita, sino genealógica e intelectual. Mason bebe del derecho natural inglés (Locke, tradición commonwealth), pero ese mismo lenguaje había sido previamente estructurado por la escolástica ibérica. La afirmación central de su artículo 2 —"all power is vested in, and consequently derived from, the people"— reproduce casi literalmente la doctrina de Francisco Suárez en Defensio Fidei (1613): el poder procede de Dios pero reside inmediatamente en la comunidad política que lo delega. Del mismo modo, el artículo 3 —derecho a reformar o abolir el gobierno— coincide con la tesis de Juan de Mariana en De Rege et Regis Institutione (1599) sobre la legitimidad de deponer al tirano.\n\nAdemás, la polémica fiscal que atraviesa la revolución americana ("no taxation without representation") se entiende mejor a la luz de la tradición escolástica transmitida al mundo anglosajón: la imposición sin consentimiento era considerada injusta por la teología moral salmantina y formulada explícitamente por Mariana en su crítica al poder tributario arbitrario. Mason transforma ese argumento moral en norma constitucional: el gobierno existe para el common benefit y pierde legitimidad cuando actúa contra la propiedad y la libertad. Así, principios previamente formulados en la teoría política escolástica —soberanía social, poder fiduciario y legitimidad condicionada— pasan del debate teológico-jurídico europeo al constitucionalismo moderno americano, convirtiéndose por primera vez en normas jurídicas operativas dentro de un orden político concreto.', en: 'The right to alter an unjust government and popular sovereignty find direct precedents in Mariana and Suárez. The colonial critique of taxation without representation also reproduces the scholastic argument against taxes without consent developed in the Salamancan tradition.', pt: 'O direito de alterar um governo injusto e a soberania popular encontram precedentes diretos em Mariana e Suárez. A crítica colonial à tributação sem representação reproduz também o argumento escolástico contra os impostos sem consentimento.' },
        type: 'historical'
    },
    {
        id: '17',
        year: '1787',
        title: { es: 'Constitución de Estados Unidos', en: 'Constitución de Estados Unidos', pt: 'Constitución de Estados Unidos' },
        description: { es: 'El establecimiento de un gobierno limitado con separación de poderes y soberanía popular refleja la tradición jurídica desarrollada por Francisco Suárez en Defensio Fidei (1613) y por Roberto Belarmino en De Laicis (1610–1614), donde la autoridad política se concibe como poder delegado orientado al bien común y sujeto a límites institucionales. La idea de un poder dividido y no absoluto deriva de la concepción escolástica del gobierno mixto y de la primacía de la comunidad política sobre el gobernante.', en: 'The establishment of a limited government with separation of powers and popular sovereignty reflects the juridical tradition developed by Suárez and Bellarmine, where political authority is conceived as delegated power oriented to the common good.', pt: 'O estabelecimento de um governo limitado com separação de poderes reflete a tradição jurídica desenvolvida por Suárez e Belarmino, onde a autoridade política se concebe como poder delegado orientado ao bem comum sujeito a limites institucionais.' },
        type: 'historical'
    },
    {
        id: '18',
        year: '1789',
        title: { es: 'Bill of Rights', en: 'Bill of Rights', pt: 'Bill of Rights' },
        description: { es: 'La garantía de libertades individuales y la protección de la propiedad privada se relacionan con la defensa de los derechos naturales formulada por Francisco de Vitoria en las Relectiones (1539) y con la doctrina de la inviolabilidad de la propiedad en Juan de Mariana en De Rege et Regis Institutione (1599). La limitación del poder estatal y la subordinación de la ley positiva a la ley natural siguen el marco teórico desarrollado por la segunda escolástica entre los siglos XVI y XVII.', en: 'The guarantee of individual liberties and the protection of private property relate to the defense of natural rights formulated by Vitoria and the inviolability of property in Mariana. The limitation of state power follows the theoretical framework developed by the Second Scholasticism.', pt: 'A garantia de liberdades individuais e a proteção da propriedade privadarelacionam-se com a defesa dos direitos naturais formulada por Vitoria e Mariana. A limitação do poder estatal subordina a lei positiva à lei natural seguindo a escolástica ibérica.' },
        type: 'historical'
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
        image: '/images/colabora/john-adams.webp',
        description: {
            es: 'Adams leyó y citó a Juan de Mariana, especialmente De Rege et Regis Institutione (1599), integrándolo en su reflexión constitucional junto a la tradición republicana inglesa. En 1787 publicó A Defence of the Constitutions of Government of the United States, donde cita a Marchamont Nedham (The Excellencie of a Free-State, 1654) dentro de una genealogía política en la que sitúa también a Mariana; en 1788 recibió un ejemplar de la obra del jesuita español y, décadas después, en su carta a John Taylor del 14 de diciembre de 1814, volvió a mencionarlo explícitamente como autoridad política. A través de estas lecturas y referencias, Adams asumió la legitimidad de deponer gobiernos injustos y la superioridad de la ley natural sobre el poder arbitrario, incorporando al pensamiento constitucional americano la idea de un poder fiduciario, limitado y subordinado al bien común, propia de la escolástica ibérica transmitida al mundo anglosajón.',
            en: 'Adams read and cited Juan de Mariana, incorporating him into his constitutional reflection alongside the English republican tradition. Through these readings, Adams assumed the superiority of natural law over arbitrary power, incorporating into American thought the idea of a fiduciary power, limited and subordinated to the common good, typical of Iberian scholasticism.',
            pt: 'Adams leu e citou Juan de Mariana, integrando-o na sua reflexão constitucional junto à tradição republicana inglesa. Assumiu a legitimidade de depor governos injustos e a superioridade da lei natural sobre o poder arbitrário, incorporando no pensamento americano a ideia de poder limitado e subordinado ao bem comum, própria da escolástica ibérica.'
        }
    },
    {
        name: 'Thomas Jefferson',
        image: '/images/colabora/thomas-jefferson.webp',
        description: {
            es: 'Jefferson mostró un interés sostenido por la cultura y el pensamiento hispánico: en la década de 1760–1770 adquirió y leyó Don Quijote de la Mancha (1605–1615) de Miguel de Cervantes como parte de su formación intelectual. Al redactar la Declaración de Independencia en 1776 formuló políticamente principios de derechos naturales y soberanía popular que dialogaban con esa tradición europea previa. Durante su estancia diplomática en Europa entre 1785 y 1789 amplió su biblioteca política —incluyendo obras de Juan de Mariana— y posteriormente reorganizó su colección en 1815, manteniendo textos hispánicos entre sus referencias.\n\nSu interés alcanzó también a Juan de Palafox y Mendoza (1600–1659), obispo de Puebla de los Ángeles y virrey interino de Nueva España, protagonista de los grandes conflictos jurisdiccionales del siglo XVII entre poder político, Iglesia y corporaciones. En escritos como sus Cartas pastorales y memoriales sobre jurisdicción y gobierno (décadas de 1640–1650) defendió que la autoridad debía someterse a la ley moral y al bien común, rechazando tanto el absolutismo político como los privilegios corporativos que anulaban la responsabilidad pública. Esta defensa de un poder limitado por normas superiores —no por mera voluntad— se aproxima al principio jeffersoniano de derechos previos al Estado. Así, en la biblioteca y correspondencia de Jefferson aparece una mirada hacia España no sólo literaria sino también política, donde ley natural, dignidad humana y limitación del poder dialogan con su concepción del republicanismo americano.',
            en: 'Jefferson showed a sustained interest in Hispanic culture: he acquired and read Don Quixote. During his diplomatic stay in Europe, he expanded his political library—including works by Juan de Mariana—and also took interest in Juan de Palafox y Mendoza. In Jefferson\'s library, there is a look toward Spain not only literary but also political, connecting natural law, human dignity, and the limitation of power with American republicanism.',
            pt: 'Jefferson demonstrou um interesse sustentado na cultura e no pensamento hispânico: leu e adquiriu obras de Cervantes. Durante a sua estada diplomática na Europa, incluiu obras de Juan de Mariana na sua biblioteca. O seu interesse alcançou também autores como Juan de Palafox y Mendoza, ligando a defesa clássica de uma autoridade submetida à lei moral e ao bem comum aos ideais da revolução.'
        }
    },
    {
        name: 'James Madison',
        image: '/images/colabora/james-madison.webp',
        description: {
            es: 'En The Federalist Papers (1787–1788), especialmente en los ensayos nº 10 y nº 51, Madison desarrolla la idea de que la soberanía reside en el pueblo pero debe ejercerse a través de instituciones que canalicen y limiten el poder político. Su defensa del gobierno representativo, de la separación de poderes y del equilibrio entre facciones reproduce —aunque sin cita explícita— la tradición escolástica formulada por Francisco Suárez en Defensio Fidei (1613) y por Juan de Mariana en De Rege et Regis Institutione (1599): el poder es originariamente comunitario, se delega fiduciariamente y debe estructurarse para impedir la tiranía. La famosa tesis madisoniana según la cual "la ambición debe contrarrestar la ambición" traduce en lenguaje constitucional la antropología política escolástica, que partía de la imperfección humana para justificar un orden mixto y prudencial. Así, la Constitución aparece no como creación de la soberanía popular, sino como su forma institucional estable, heredera indirecta de la teoría política ibérica transmitida al mundo anglosajón.',
            en: 'In The Federalist Papers, Madison develops the idea that sovereignty resides in the people but must be exercised through institutions that channel and limit political power. His defense of representative government reproduces—although without explicit citation—the scholastic tradition of a prudential mixed order. The Constitution appears as the stable institutional form of popular sovereignty, an indirect heir to Iberian political theory.',
            pt: 'Em Os Artigos Federalistas, Madison desenvolve a ideia de que a soberania reside no povo mas deve ser exercida através de instituições que limitem o poder político. A sua defesa do governo representativo, se bem que sem citação explícita, reproduz a antropologia política escolástica.'
        }
    },
    {
        name: 'Alexander Hamilton',
        image: '/images/colabora/alexander-hamilton.webp',
        description: {
            es: 'En el Report on Public Credit (1790) y el Report on a National Bank (1790), Hamilton vincula estabilidad monetaria, confianza pública y libertad política, afirmando que el orden constitucional requiere un sistema financiero capaz de evitar arbitrariedades fiscales. Esta preocupación conecta con la crítica de Juan de Mariana en De Monetae Mutatione (1609), donde la manipulación de la moneda se describe como un impuesto encubierto contrario al consentimiento político. Aunque Hamilton adopta soluciones institucionales distintas —la creación de un banco nacional y un crédito público sólido— comparte la premisa escolástica de que la legitimidad del poder depende de respetar la propiedad y evitar formas indirectas de exacción. La arquitectura económica de la joven república traduce así al plano práctico un problema ya formulado en la escolástica hispánica: la relación entre moneda, tributación y soberanía, incorporando a la experiencia constitucional americana debates originados dos siglos antes en la teoría moral y jurídica ibérica.',
            en: 'Hamilton links monetary stability, public trust, and political liberty. This concern connects with Juan de Mariana\'s critique in De Monetae Mutatione (1609), where currency manipulation is described as a hidden tax contrary to political consent. The economic architecture of the young republic incorporated debates originated two centuries earlier in Iberian moral theory.',
            pt: 'Hamilton liga estabilidade monetária, confiança pública e liberdade política. Esta preocupação conecta-se com a crítica de Juan de Mariana em De Monetae Mutatione (1609), onde a manipulação de moeda é descrita como imposto encoberto.'
        }
    }
];

    const thinkers = [
    {
        name: 'Orestes Brownson',
        period: '(1803–1876)',
        description: {
            es: 'El pensador político católico norteamericano defendió que la Constitución no es un contrato artificial sino la forma jurídica de una comunidad política previa. En The American Republic (1865) sostiene que la soberanía pertenece al pueblo en cuanto comunidad moral y no a individuos aislados, una formulación extraordinariamente cercana a Francisco Suárez, Defensio Fidei (1613).\n\nBrownson cita expresamente la tradición escolástica —especialmente tomista y suareciana— para criticar el individualismo contractualista puro. Para él, Estados Unidos funciona porque sin saberlo conserva una concepción clásica (pre-liberal) del poder político: autoridad derivada, limitada y orientada al bien común.',
            en: 'The American Catholic political thinker defended that the Constitution is not an artificial contract but the juridical form of a prior political community. In The American Republic (1865) he maintains that sovereignty belongs to the people as a moral community and not to isolated individuals, a formulation extraordinarily close to Francisco Suárez.',
            pt: 'O pensador político católico norte-americano defendeu que a Constituição não é um contrato artificial, mas a forma jurídica de uma comunidade política prévia. Em The American Republic (1865), afirma que a soberania pertence ao povo enquanto comunidade moral e não a indivíduos isolados, uma formulação muito próxima de Francisco Suárez.'
        }
    },
    {
        name: 'John Courtney Murray',
        period: '1960',
        description: {
            es: 'En We Hold These Truths (1960), Murray interpreta la Primera Enmienda estadounidense a la luz de la tradición del derecho natural y reconoce la herencia de Suárez y Belarmino en la soberanía popular limitada. Argumenta que el experimento americano funciona porque institucionaliza principios clásicos previos al liberalismo ilustrado: autoridad derivada, ley moral superior al Estado y legitimidad condicionada del poder político.',
            en: 'In We Hold These Truths (1960), Murray interprets the First Amendment in light of the natural law tradition and recognizes the heritage of Suárez and Bellarmine in limited popular sovereignty.',
            pt: 'Em We Hold These Truths (1960), Murray interpreta a Primeira Emenda à luz da tradição do direito natural e reconhece a herança de Suárez e Belarmino na noção de soberania popular limitada.'
        }
    },
    {
        name: 'Heinrich A. Rommen',
        period: '1967',
        description: {
            es: 'En The Natural Law (1947, ediciones difundidas en EE. UU. en la posguerra), Rommen presenta la Escuela de Salamanca como origen del constitucionalismo moderno. Su obra se convierte en manual en facultades de derecho americanas y reintroduce explícitamente la tradición escolástica en la teoría jurídica contemporánea estadounidense.',
            en: 'In The Natural Law (1947), Rommen presents the School of Salamanca as the origin of modern constitutionalism. His work becomes a manual in American law schools.',
            pt: 'Em The Natural Law (1947), Rommen apresenta a Escola de Salamanca como origem do constitucionalismo moderno. A sua obra converte-se em manual nas faculdades de direito americanas.'
        }
    },
    {
        name: 'Carlos Stoetzer',
        period: '1986',
        description: {
            es: 'En The Scholastic Roots of the American Constitution (1986), Stoetzer documenta sistemáticamente la influencia de Vitoria, Suárez y Mariana en la formación intelectual del constitucionalismo norteamericano, mostrando cómo la doctrina de soberanía popular, poder delegado y derecho de resistencia circuló por el mundo atlántico antes de 1776. Amplía esta tesis en El pensamiento político en la América española durante el período de la emancipación (1789–1825) y en Raíces escolásticas de la emancipación de la América española, donde demuestra que las revoluciones hispanoamericanas utilizaron las mismas categorías jurídicas —comunidad política previa al rey, retroversión de la soberanía y legitimidad condicionada del poder— para justificar la independencia. De este modo, tanto la revolución estadounidense como la hispanoamericana aparecen como expresiones de una misma tradición jurídico-política nacida en la segunda escolástica, y no como fenómenos exclusivamente derivados de la Ilustración anglosajona.',
            en: 'In The Scholastic Roots of the American Constitution (1986), Stoetzer systematically documents the influence of Vitoria, Suárez, and Mariana on the intellectual formation of American constitutionalism.',
            pt: 'Em The Scholastic Roots of the American Constitution (1986), Stoetzer documenta sistematicamente a influência de Vitoria, Suárez e Mariana na formação intelectual do constitucionalismo norte-americano.'
        }
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
                                <div className="prose-hispana space-y-6">
                                    <p>{t('Content.introParagraph1')}</p>
                                    <p>{t('Content.introParagraph2')}</p>
                                    <p>{t('Content.introParagraph3')}</p>
                                    <p>{t('Content.introParagraph4')}</p>
                                    <p>{t('Content.introParagraph5')}</p>
                                    
                                    <div className="my-10 pl-8 border-l-2 border-[#c5a059] py-2">
                                        <p className="text-[#c5a059] font-serif italic text-xl mb-3">
                                            {t('Content.introQuote')}
                                        </p>
                                        <span className="font-cinzel text-xs text-white/40 tracking-wider">
                                            {t('Content.introQuoteSource')}
                                        </span>
                                    </div>

                                    <p>{t('Content.introParagraph6')}</p>
                                    <p>{t('Content.introParagraph7')}</p>
                                    <p>{t('Content.introParagraph8')}</p>
                                    <p>{t('Content.introParagraph9')}</p>
                                    <p>{t('Content.introParagraph10')}</p>
                                    <p>{t('Content.introParagraph11')}</p>
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
                                                    src={founder.image}
                                                    alt={founder.name}
                                                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100"
                                                />
                                            </div>
                                            <h3 className="font-cinzel text-[#c5a059] text-xl tracking-widest mb-6">{founder.name}</h3>
                                            <p className="text-white/50 font-serif text-sm leading-relaxed group-hover:text-white/70 transition-colors whitespace-pre-line">
                                                {founder.description[locale as 'es' | 'en' | 'pt']}
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
                                            <h5 className="font-serif text-xl text-white italic">{item.period}</h5>
                                            <p className="text-white/50 font-serif text-sm leading-relaxed whitespace-pre-line">
                                                {item.description[locale as 'es' | 'en' | 'pt']}
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
