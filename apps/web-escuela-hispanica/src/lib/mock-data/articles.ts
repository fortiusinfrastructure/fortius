import type { Article } from '@/types';

export const articles: Article[] = [
  {
    id: 1,
    slug: 'ecos-de-salamanca',
    title: {
      es: 'Eco de Salamanca',
      en: 'Echo of Salamanca',
      pt: 'Eco de Salamanca'
    },
    author: 'Juan Pablo Gramajo Castro',
    date: '30/10/2025',
    category: {
      es: 'Actualidad',
      en: 'Current Affairs',
      pt: 'Actualidade'
    },
    excerpt: {
      es: 'Del 12 al 15 de octubre se celebró en La Antigua Guatemala el coloquio «Eco de Salamanca», organizado por el Instituto Fe y Libertad, un encuentro académico internacional dedicado a reflexionar sobre la vigencia histórica e intelectual de la Escuela de Salamanca.',
      en: 'From October 12 to 15, the "Echo of Salamanca" colloquium was held in La Antigua Guatemala, organized by the Fe y Libertad Institute, an international academic meeting dedicated to reflecting on the historical and intellectual relevance of the School of Salamanca.',
      pt: 'De 12 a 15 de outubro, realizou-se em La Antigua Guatemala o colóquio «Eco de Salamanca», organizado pelo Instituto Fé e Liberdade, um encontro académico internacional dedicado a refletir sobre a atualidade histórica e intelectual da Escola de Salamanca.'
    },
    content: {
      es: `
        <div style="background-color: rgba(197, 160, 89, 0.05); border-left: 3px solid #c5a059; padding: 1.5rem; margin-bottom: 2.5rem; font-family: var(--font-cinzel);">
          <p style="margin: 0; font-size: 0.8rem; letter-spacing: 0.1em; color: rgba(255,255,255,0.6);">
            <strong style="color: #c5a059;">Organizador:</strong> Instituto Fe y Libertad (Guatemala)<br/>
            <strong style="color: #c5a059;">Colaborador:</strong> Escuela Hispánica<br/>
            <strong style="color: #c5a059;">Fechas:</strong> 12-15 de octubre de 2025<br/>
            <strong style="color: #c5a059;">Lugar:</strong> La Antigua, Guatemala
          </p>
        </div>

        <p>Del 12 al 15 de octubre se celebró en La Antigua Guatemala el coloquio «Eco de Salamanca», organizado por el Instituto Fe y Libertad, un encuentro académico internacional dedicado a reflexionar sobre la vigencia histórica e intelectual de la Escuela de Salamanca y su aportación al pensamiento occidental contemporáneo. El evento reunió a investigadores de diversas disciplinas —filosofía, derecho, economía, teología e historia— en un diálogo marcado por el rigor académico y la pluralidad de enfoques.</p>

        <p>Entre los participantes estuvieron figuras vinculadas a Escuela Hispánica, como su presidente de honor, Alejandro Chafuen, y dos de sus vicepresidentes académicos: Carroll Ríos, presidenta del Instituto Fe y Libertad e impulsora directa de la conferencia, y León Gómez Rivas. La presencia de estos ponentes contribuyó a articular el coloquio dentro de un esfuerzo intelectual más amplio por recuperar la tradición hispánica en el debate contemporáneo.</p>

        <figure>
          <img src="/images/publications/ecos-de-salamanca.jpg" alt="Participantes en Eco de Salamanca" />
          <figcaption style="font-family: var(--font-cinzel); font-size: 0.7rem; color: #c5a059; text-align: center; margin-top: -3.5rem; margin-bottom: 4rem; letter-spacing: 0.1em; opacity: 0.8;">
            De izquierda a derecha: Alejandro Chafuen (Presidente de Honor de EH), Carroll Ríos (presidenta del Instituto de Fe y Libertad, Guatemala, y vicepresidente de EH), y León Gómez Rivas (catedrático de la Universidad Europea y vicepresidente de EH).
          </figcaption>
        </figure>

        <p>Las sesiones giraron en torno al legado de los escolásticos del siglo XVI y XVII, cuyo punto de partida se sitúa en la cátedra de Francisco de Vitoria en Salamanca (1526), dentro de la tradición tomista inspirada en Santo Tomás de Aquino. Los ponentes subrayaron cómo estos autores integraron fe y razón al recuperar la filosofía aristotélica, permitiendo el uso sistemático de la lógica en la reflexión moral y jurídica cristiana. Lejos de ser meramente especulativos, los escolásticos respondieron a problemas concretos de su tiempo: la humanidad y los derechos de los indígenas tras el descubrimiento de América, la legitimidad del poder político, la propiedad privada, la justicia de los precios, la inflación causada por la llegada masiva de plata americana o los límites fiscales del Estado.</p>

        <p>Especial atención se prestó a la figura de Vitoria como precursor del derecho internacional y de la noción moderna de derechos humanos, así como a Juan de Mariana —defensor del origen popular del poder político y crítico de la manipulación monetaria— y a Diego de Covarrubias, cuya teoría del valor subjetivo anticipó siglos antes desarrollos posteriores de la economía. Se recordó igualmente el contexto histórico: desde las preocupaciones de Isabel la Católica por el trato a los indígenas hasta los debates de Valladolid, mostrando cómo la tradición salmantina nació del intento de responder moralmente a una realidad inédita.</p>

        <p>Más allá del contenido histórico, el coloquio enfatizó tres rasgos intelectuales de la escuela: su actitud abierta a los problemas concretos del tiempo, su capacidad de síntesis —el “et… et…” católico frente al exclusivismo ideológico— y su defensa de la dignidad humana como límite permanente del poder. En ese sentido, se insistió en que la tradición salmantina no constituye una reliquia erudita, sino un marco útil para pensar cuestiones actuales: desde la legitimidad política y la justicia económica hasta la relación entre libertad, cultura y responsabilidad moral.</p>

        <p>El encuentro se vinculó además al proyecto editorial del Instituto Fe y Libertad sobre Occidente en crisis (volumen 8), del que participas como editor invitado, integrando así el coloquio en un programa de investigación más amplio orientado a recuperar el humanismo hispánico sin caer ni en la leyenda negra ni en la idealización.</p>

        <div style="margin: 4rem 0; border: 1px solid rgba(197, 160, 89, 0.2); padding: 2rem; background: rgba(0,0,0,0.2);">
          <p style="font-family: var(--font-cinzel); font-size: 0.9rem; color: #c5a059; margin-bottom: 1.5rem; text-align: center; letter-spacing: 0.1em;">Coloquio Destacado</p>
          <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin-bottom: 1rem;">
            <iframe 
              src="https://www.youtube.com/embed/FNmH9fII29A" 
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
            ></iframe>
          </div>
          <p style="font-family: var(--font-serif); font-size: 0.85rem; color: rgba(255,255,255,0.7); text-align: center; font-style: italic;">
            Encuentro entre León Gómez Rivas y Alejandro Chafuen
          </p>
        </div>

        <p>El cierre dejó una conclusión compartida: la Escuela de Salamanca no fue solo un episodio histórico, sino un método intelectual —realista, moral y abierto— que puede seguir iluminando los debates del siglo XXI.</p>

        <p>Eco de Salamanca volverá a celebrarse este año en La Antigua Guatemala, consolidándose como un foro periódico de reflexión sobre la tradición intelectual hispánica y su proyección contemporánea.</p>

        <div style="margin: 4rem 0; border: 1px solid rgba(197, 160, 89, 0.2); padding: 2rem; background: rgba(0,0,0,0.2);">
          <p style="font-family: var(--font-cinzel); font-size: 0.9rem; color: #c5a059; margin-bottom: 1.5rem; text-align: center; letter-spacing: 0.1em;">Conferencia Destacada</p>
          <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin-bottom: 1rem;">
            <iframe 
              src="https://www.youtube.com/embed/1L4F7R7Mpg8" 
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
            ></iframe>
          </div>
          <p style="font-family: var(--font-serif); font-size: 0.85rem; color: rgba(255,255,255,0.7); text-align: center; font-style: italic;">
            Alejandro Chafuen sobre el legado hispánico
          </p>
        </div>
      `,
      en: `
        <div style="background-color: rgba(197, 160, 89, 0.05); border-left: 3px solid #c5a059; padding: 1.5rem; margin-bottom: 2.5rem; font-family: var(--font-cinzel);">
          <p style="margin: 0; font-size: 0.8rem; letter-spacing: 0.1em; color: rgba(255,255,255,0.6);">
            <strong style="color: #c5a059;">Organizer:</strong> Fe y Libertad Institute (Guatemala)<br/>
            <strong style="color: #c5a059;">Collaborator:</strong> Escuela Hispánica<br/>
            <strong style="color: #c5a059;">Dates:</strong> October 12-15, 2025<br/>
            <strong style="color: #c5a059;">Location:</strong> La Antigua, Guatemala
          </p>
        </div>

        <p>From October 12 to 15, the "Echo of Salamanca" colloquium was held in La Antigua Guatemala, organized by the Fe y Libertad Institute, an international academic meeting dedicated to reflecting on the historical and intellectual relevance of the School of Salamanca and its contribution to contemporary Western thought. The event brought together researchers from various disciplines—philosophy, law, economics, theology, and history—in a dialogue marked by academic rigor and a plurality of approaches.</p>

        <p>Among the participants were figures linked to Escuela Hispánica, such as its honorary president, Alejandro Chafuen, and two of its academic vice presidents: Carroll Ríos, president of the Fe y Libertad Institute and direct promoter of the conference, and León Gómez Rivas. The presence of these speakers helped to articulate the colloquium within a broader intellectual effort to recover the Hispanic tradition in the contemporary debate.</p>

        <figure>
          <img src="/images/publications/ecos-de-salamanca.jpg" alt="Participants in Echo of Salamanca" />
          <figcaption style="font-family: var(--font-cinzel); font-size: 0.7rem; color: #c5a059; text-align: center; margin-top: -3.5rem; margin-bottom: 4rem; letter-spacing: 0.1em; opacity: 0.8;">
            From left to right: Alejandro Chafuen (Honorary President of EH), Carroll Ríos (President of the Fe y Libertad Institute, Guatemala, and Vice President of EH), and León Gómez Rivas (Professor at the European University and Vice President of EH).
          </figcaption>
        </figure>

        <p>The sessions revolved around the legacy of the scholastics of the 16th and 17th centuries, whose starting point is located in Francisco de Vitoria's chair in Salamanca (1526), within the Thomistic tradition inspired by Saint Thomas Aquinas. The speakers underscored how these authors integrated faith and reason by recovering Aristotelian philosophy, allowing the systematic use of logic in Christian moral and legal reflection. Far from being merely speculative, the scholastics responded to concrete problems of their time: the humanity and rights of indigenous people after the discovery of America, the legitimacy of political power, private property, price justice, inflation caused by the massive arrival of American silver, or the fiscal limits of the State.</p>

        <p>Special attention was paid to the figure of Vitoria as a precursor of international law and the modern notion of human rights, as well as to Juan de Mariana—defender of the popular origin of political power and critic of monetary manipulation—and Diego de Covarrubias, whose theory of subjective value anticipated developments in economics centuries later. The historical context was also recalled: from Isabella the Catholic's concerns for the treatment of indigenous people to the debates of Valladolid, showing how the Salamancan tradition was born from the attempt to respond morally to an unprecedented reality.</p>

        <p>Beyond the historical content, the colloquium emphasized three intellectual features of the school: its open attitude to the concrete problems of the time, its capacity for synthesis—the Catholic "et... et..." versus ideological exclusivism—and its defense of human dignity as a permanent limit of power. In this sense, it was insisted that the Salamancan tradition does not constitute a scholarly relic, but a useful framework for thinking about current issues: from political legitimacy and economic justice to the relationship between freedom, culture, and moral responsibility.</p>

        <p>The meeting was also linked to the Fe y Libertad Institute's editorial project on the West in Crisis (volume 8), in which you participate as a guest editor, thus integrating the colloquium into a broader research program oriented towards recovering Hispanic humanism without falling into either the black legend or idealization.</p>

        <p>The closing left a shared conclusion: the School of Salamanca was not just a historical episode, but an intellectual method—realistic, moral, and open—that can continue to illuminate the debates of the 21st century.</p>

        <p>Echo of Salamanca will take place again this year in La Antigua Guatemala, consolidating itself as a periodic forum for reflection on the Hispanic intellectual tradition and its contemporary projection.</p>
      `,
      pt: `
        <div style="background-color: rgba(197, 160, 89, 0.05); border-left: 3px solid #c5a059; padding: 1.5rem; margin-bottom: 2.5rem; font-family: var(--font-cinzel);">
          <p style="margin: 0; font-size: 0.8rem; letter-spacing: 0.1em; color: rgba(255,255,255,0.6);">
            <strong style="color: #c5a059;">Organizador:</strong> Instituto Fé e Liberdade (Guatemala)<br/>
            <strong style="color: #c5a059;">Colaborador:</strong> Escuela Hispánica<br/>
            <strong style="color: #c5a059;">Datas:</strong> 12-15 de outubro de 2025<br/>
            <strong style="color: #c5a059;">Local:</strong> La Antigua, Guatemala
          </p>
        </div>

        <p>De 12 a 15 de outubro, realizou-se em La Antigua Guatemala o colóquio «Eco de Salamanca», organizado pelo Instituto Fé e Liberdade, um encontro académico internacional dedicado a refletir sobre a atualidade histórica e intelectual da Escola de Salamanca e a sua contribuição para o pensamento ocidental contemporâneo. O evento reuniu investigadores de diversas áreas — filosofia, direito, economia, teologia e história — num diálogo marcado pelo rigor académico e pela pluralidade de abordagens.</p>

        <p>Entre os participantes estiveram figuras ligadas à Escuela Hispánica, como o seu presidente honorário, Alejandro Chafuen, e dois dos seus vice-presidentes académicos: Carroll Ríos, presidente do Instituto Fé e Liberdade e principal promotora da conferência, e León Gómez Rivas. A presença destes oradores contribuiu para articular o colóquio num esforço intelectual mais amplo de recuperação da tradição hispânica no debate contemporâneo.</p>

        <figure>
          <img src="/images/publications/ecos-de-salamanca.jpg" alt="Participantes no Eco de Salamanca" />
          <figcaption style="font-family: var(--font-cinzel); font-size: 0.7rem; color: #c5a059; text-align: center; margin-top: -3.5rem; margin-bottom: 4rem; letter-spacing: 0.1em; opacity: 0.8;">
            Da esquerda para a direita: Alejandro Chafuen (Presidente Honorário da EH), Carroll Ríos (presidente do Instituto de Fé e Liberdade, Guatemala, e vice-presidente da EH), e León Gómez Rivas (catedrático da Universidade Europeia e vice-presidente da EH).
          </figcaption>
        </figure>

        <p>As sessões centraram-se no legado dos escolásticos dos séculos XVI e XVII, cujo ponto de partida se situa na cátedra de Francisco de Vitoria em Salamanca (1526), inserida na tradição tomista inspirada em São Tomás de Aquino. Os oradores destacaram como estes autores integraram fé e razão ao recuperarem a filosofia aristotélica, permitindo a utilização sistemática da lógica na reflexão moral e jurídica cristã. Longe de serem meramente especulativos, os escolásticos responderam a problemas concretos do seu tempo: a humanidade e os direitos dos indígenas após a descoberta da América, a legitimidade do poder político, a propriedade privada, a justiça dos preços, a inflação causada pela chegada massiva de prata americana ou os limites fiscais do Estado.</p>

        <p>Foi dada especial atenção à figura de Vitoria como precursor do direito internacional e da noção moderna de direitos humanos, assim como a Juan de Mariana — defensor da origem popular do poder político e crítico da manipulação monetária — e a Diego de Covarrubias, cuja teoria do valor subjetivo antecipou em séculos os desenvolvimentos posteriores da economia. Recordou-se também o contexto histórico: desde as preocupações de Isabel a Católica com o tratamento dos indígenas até aos debates de Valladolid, mostrando como a tradição salmantina nasceu da tentativa de responder moralmente a uma realidade inédita.</p>

        <p>Para além do conteúdo histórico, o colóquio enfatizou três características intelectuais da escola: a sua atitude aberta aos problemas concretos do tempo, a sua capacidade de síntese — o “et… et…” católico face ao exclusivismo ideológico — e a sua defesa da dignidade humana como limite permanente do poder. Nesse sentido, insistiu-se que a tradição salmantina não constitui uma relíquia erudita, mas sim um quadro útil para pensar questões atuais: da legitimidade política e justiça económica à relação entre liberdade, cultura e responsabilidade moral.</p>

        <p>O encontro esteve também ligado ao projeto editorial do Instituto Fé e Liberdade sobre o Ocidente em Crise (volume 8), no qual participa como editor convidado, integrando assim o colóquio num programa de investigação mais amplo orientado para a recuperação do humanismo hispânico sem cair nem na legenda negra nem na idealização.</p>

        <p>O encerramento deixou uma conclusão partilhada: a Escola de Salamanca não foi apenas um episódio histórico, mas um método intelectual — realista, moral e aberto — que pode continuar a iluminar os debates do século XXI.</p>

        <p>O Eco de Salamanca voltará a realizar-se este ano em La Antigua Guatemala, consolidando-se como um fórum periódico de reflexão sobre a tradição intelectual hispânica e a sua projeção contemporânea.</p>
      `
    },
    image: '/images/publications/ecos-de-salamanca.jpg',
    isFeatured: true
  },
  {
    id: 2,
    slug: 'en-defensa-de-hispanoamerica',
    title: {
      es: 'En defensa de Hispanoamérica',
      en: 'In Defense of Hispanic America',
      pt: 'Em defesa da América Hispânica'
    },
    author: 'Juan Ángel Soto Gómez',
    authorImage: '/images/team/Juan-Angel-Soto-Gomez.webp',
    date: '16/06/2025',
    category: {
      es: 'Historia',
      en: 'History',
      pt: 'História'
    },
    excerpt: {
      es: 'América Hispánica frente a América Latina: una revisión histórica y cultural del término revela cómo España y Portugal forjaron la identidad de la región. Este análisis cuestiona la imprecisión del concepto "América Latina" y propone alternativas que reflejan fielmente el legado ibérico.',
      en: 'Hispanic America vs. Latin America: A historical and cultural review of the term reveals how Spain and Portugal forged the region\'s identity. This analysis questions the imprecision of the "Latin America" concept and proposes alternatives that faithfully reflect the Iberian legacy.',
      pt: 'América Hispânica vs. América Latina: uma revisão histórica e cultural do termo revela como Espanha e Portugal forjaram a identidade da região. Esta análise questiona a imprecisão do conceito "América Latina" e propõe alternativas que refletem fielmente o legado ibérico.'
    },
    content: {
      es: `
      <p>
        El término América Latina se originó en el siglo XIX, principalmente como un constructo geopolítico para distinguir a las naciones del continente americano que hablaban lenguas romances de aquellas dentro de la esfera angloamericana. Fueron intelectuales y estrategas políticos franceses quienes popularizaron el término, con el fin de enfatizar los lazos lingüísticos y culturales entre Francia y los antiguos territorios españoles y portugueses.
      </p>

      <p>
        Sin embargo, el término conlleva una carga ideológica, ya que minimiza implícitamente el legado español y portugués al agrupar a la región bajo una identidad "latina" más amplia que incluye influencias no ibéricas. Más aún, el término América Latina fue diseñado explícitamente para socavar la autoridad y el protagonismo de España en el descubrimiento y construcción del Nuevo Mundo. Esta intención fue impulsada por Francia y alimentada por el Reino Unido.
      </p>

      <p>
        Definir el concepto de América Latina es altamente controvertido y complejo. A pesar de su uso común en la actualidad, se presentan dificultades significativas cuando se reflexiona sobre el término como concepto, junto con su significado e importancia.
      </p>

      <p>
        Hoy, lo que comúnmente se conoce como América Latina —o América Latina y el Caribe— es un sustantivo compuesto que hace referencia a la parte del continente americano que se extiende desde Tierra del Fuego (Chile y Argentina) en el sur hasta el Río Bravo en la frontera entre México y Estados Unidos. Incluye las islas del Caribe y las regiones sur y central del continente. En términos políticos y sociales, se refiere a los países del continente que difieren de lo que se conoce como América del Norte —excluyendo a México. Desde un punto de vista lingüístico, se refiere al grupo de países donde se habla una lengua latina o romance, en este caso, el español o el portugués.
      </p>

      <p>
        No obstante, como se mencionó anteriormente, el término "América Latina" significa esto y mucho más. Es el resultado de contextos y situaciones socio-político-económico-geográfico-culturales muy complejos y de larga data, por citar a Fernand Braudel. Al menos, la idea y el concepto de "América Latina" fueron moldeados tanto a pesar de como gracias al expansionismo norteamericano; y fue también un proyecto para crear un imperio en suelo americano promovido y apoyado por Francia y Napoleón III.
      </p>

      <figure>
        <img src="/images/publications/defensa-hispanoamerica.jpg" alt="Michel Chevalier" />
        <figcaption style="font-family: var(--font-cinzel); font-size: 0.7rem; color: #c5a059; text-align: center; margin-top: -3.5rem; margin-bottom: 4rem; letter-spacing: 0.1em; opacity: 0.8;">
          Retrato de Michel Chevalier (1806-1879), economista francés, ilustración de la revista The Illustrated London News, volumen XLVIII, 27 de enero de 1866.
        </figcaption>
      </figure>

      <p>
        Se considera que los ideólogos de Napoleón III, y más específicamente Michel Chevalier, son los creadores y arquitectos del concepto de América Latina. Se hace referencia a Chevalier por su libro <i>Des intérêts matériels en France</i> (1838), donde enfatiza la importancia de establecer una "América Latina" como contrapeso al término anteriormente más aceptado y difundido de "América Hispánica" o "América Española", utilizado desde el inicio de la colonización del Nuevo Mundo hasta casi finales del siglo XIX e incluso entrado el siglo XX. Esta fue una novedad incluso en Francia, donde hasta la década de 1910 los periódicos y libros se referían constantemente a <i>les pays hispano-américains</i>, <i>les hispano-américains</i> o <i>l'Amérique espagnole</i>.
      </p>

      <p>
        En realidad, Chevalier usó por primera vez el término América Latina en 1836, en la introducción a <i>Lettres sur l'Amérique du Nord</i>. En este texto, el autor comienza a esbozar su idea de "América Latina". Aun así, no es sino hasta <i>Des intérêts matériels en France</i> cuando surge un concepto más elaborado. En esta obra, Chevalier argumenta que la "Civilización" moderna tiene una raíz dual, tanto complementaria como contradictoria: la tradición romana y la tradición germánica. Así, el futuro de la sociedad y de la "Civilización" vuelve a estar en juego, ahora en un nuevo espacio llamado "América", donde ambas tradiciones coexisten y vuelven a chocar.
      </p>

      <p>
        Para Chevalier, el continente americano alberga dos "civilizaciones" o culturas, complementarias pero opuestas. Una es sajona y protestante: laboriosa, blanca, apegada y respetuosa de las instituciones que crea, pero discriminatoria, desdeñosa de lo distinto, impulsada por un destino manifiesto claro. La otra América es latina, católica, mestiza, tanto europea como bárbara, con escaso reconocimiento o respeto hacia las instituciones en formación, pero sin temor al otro, deseosa de encontrarse, confrontarse, enseñar y aprender. Esto refleja una visión altamente romantizada de la latinidad frente a una visión muy pragmática del mundo sajón.
      </p>

      <p>
        Además de Chevalier, un comerciante y autor llamado Benjamin Poucel reflexionó hacia 1850 sobre la idea de América Latina en dos de sus obras: <i>De las emigraciones europeas en la América del Sur</i> y <i>Estudios de los intereses recíprocos de la Europa y la América, Francia y la América del Sur</i>. Poucel hizo un llamado de política internacional para que Francia estableciera una presencia más sustancial en las Américas y contrarrestara la creciente influencia de Estados Unidos sobre las naciones emergentes del continente. Con este fin, invocó la idea de la latinidad, intentando mostrar que las naciones del sur del continente tenían mucho más en común con Francia que con Estados Unidos.
      </p>

      <p>
        Junto a estos dos autores franceses, varios autores americanos también se comprometieron con el concepto de América Latina. Entre ellos se encuentran el dominicano Francisco Muñoz del Monte y el colombiano José María Torres Caicedo; este último considerado a menudo como el primer hispanoamericano con una conciencia histórica del pensamiento latino.
      </p>

      <figure>
        <img src="/images/publications/defensa-hispanoamerica_Jose_Maria_Torres.png" alt="José María Torres Caicedo" />
        <figcaption style="font-family: var(--font-cinzel); font-size: 0.7rem; color: #c5a059; text-align: center; margin-top: -3.5rem; margin-bottom: 4rem; letter-spacing: 0.1em; opacity: 0.8;">
          El dominicano Francisco Muñoz del Monte y el colombiano José María Torres Caicedo.
        </figcaption>
      </figure>

      <p>
        El chileno Francisco Bilbao también contribuyó a esta trayectoria. En 1856, siguiendo a Torres Caicedo, Bilbao publicó un poema titulado <i>Las dos Américas</i>, donde distingue clara e inequívocamente entre dos Américas: una sajona y otra latina.
      </p>

      <figure>
        <img src="/images/publications/defensa-hispanoamerica_Francisco_Bilbao.png" alt="Francisco Bilbao" />
        <figcaption style="font-family: var(--font-cinzel); font-size: 0.7rem; color: #c5a059; text-align: center; margin-top: -3.5rem; margin-bottom: 4rem; letter-spacing: 0.1em; opacity: 0.8;">
          El chileno Francisco Bilbao contribuyó significativamente a la distinción entre las dos Américas.
        </figcaption>
      </figure>

      <p>
        La obra de Bilbao refleja la influencia de otro pensador francés, el abate Félicité de Lamennais, quien también exploró la idea del panlatinismo desde una perspectiva europea, bajo circunstancias y lógicas diferentes.
      </p>

      <figure>
        <img src="/images/publications/defensa-hispanoamerica_Lancome.jpg" alt="Lancome" />
      </figure>

      <p>
        En una conferencia pronunciada en París en 1856 titulada <i>Iniciativa de las Américas: Idea de un Congreso Federal de Repúblicas</i>, Bilbao articuló la visión dominante entre las élites hispanoamericanas: la existencia de dos razas, dos culturas y dos civilizaciones, cada una buscando dominar el mundo a su manera. Una representaba la cultura sajona/materialista, mientras que la otra simbolizaba la cultura latina y más espiritual.
      </p>

      <p>
        Desde 1860 en adelante —y prácticamente hasta hoy—, el término América Latina ha sido considerado una invención francesa, creada y promovida por los ideólogos imperialistas de Napoleón III para justificar su interés en establecer un imperio en suelo mexicano. Como ya se mencionó, el uso de América Latina pretendía borrar o disminuir la idea de una "América Hispánica" o "América Española", ofreciendo una identidad común que no tuviera fuertes lazos ni con la potencia colonial anterior ni con el nuevo gigante del norte. Esto también explica por qué términos como "Iberoamérica" e "Hispanoamérica" siguen siendo comunes en España, así como el rechazo por parte de países latinoamericanos a llamar a Estados Unidos simplemente "América", como suele hacerse en EE.UU.
      </p>

      <p>
        Debido a los rápidos y tumultuosos acontecimientos políticos y sociales desde la década de 1860 en adelante en las Américas, dos términos ganaron protagonismo. El término inglés <i>America</i> pasó a referirse a la tradición sajona y a las regiones del continente bajo esa influencia, mientras que <i>Latin America</i> describía las partes del continente fuera del mundo sajón.
      </p>

      <h3>El caso de la América Hispánica o Hispanoamérica</h3>

      <p>
        El término América Hispánica es más cultural e históricamente preciso que América Latina para describir esa parte del mundo, ya que resalta el patrimonio español compartido por la región. Refleja la centralidad de la lengua española, las tradiciones católicas y los valores culturales traídos por España durante el período colonial. Esta terminología reafirma la unidad de naciones unidas por una historia y una identidad lingüística comunes, al tiempo que evita las connotaciones más amplias y a menudo diluidas del término América Latina.
      </p>

      <p>
        España trasplantó su propia civilización completa a estos países sin ninguna ayuda externa. Una vez crecidos y maduros, estos países hispánicos siguieron el ejemplo de Estados Unidos y se separaron de su Madre Patria, España, preservando naturalmente su idioma, leyes, costumbres y tradiciones, tal como lo hacían antes. También imitaron a Estados Unidos en este sentido, conservando su lengua nativa inglesa, el Common Law, y las leyes, costumbres y tradiciones inglesas, a pesar de la diversidad y gran número de inmigrantes que admitieron.
      </p>

      <p>
        Además de la mayoría de los países de la región, que son repúblicas de habla hispana, está Brasil, creado por Portugal, donde se habla portugués y prevalecen las leyes, costumbres y tradiciones portuguesas. Sin embargo, este país también es hispánico, porque <i>Hispania</i>, al igual que <i>Iberia</i>, incluía tanto a Portugal como a España. Por tanto, el término América Hispánica abarca todo lo derivado de Portugal y España. El nombre de la <i>Hispanic Society of America</i> en Nueva York, fundada en 1904 para estudiar la historia americana vinculada a España y Portugal, no es una coincidencia. Se eligió sobre <i>Latin Society of America</i>, ya que esta última habría sido engañosa, falsa y groseramente errónea, al igual que aplicar el término latino a las naciones hispanohablantes, españolas y portuguesas que no descienden ni de Francia ni de Italia.
      </p>

      <p>
        La influencia de Francia en las Américas nunca se extendió a los países hispánicos; solo aplicó a territorios que ahora forman parte de Estados Unidos o Canadá. En rigor, como resultado, si queremos usar el término latino para los países de habla española, también deberíamos llamar a las colonias francesas e italianas —como Argelia, la República Democrática del Congo o Senegal— colonias latinas, lo cual Francia con razón rechazaría. Si el criterio es la herencia lingüística, entonces Estados Unidos y Canadá deberían llamarse América Teutónica por sus orígenes lingüísticos y poblaciones de ascendencia teutónica. Así, tendríamos dos Américas: latina y teutónica. Por lo tanto, la designación justa y lógica sigue siendo el estándar universal: América inglesa o británica y América hispánica, y nada más, ya que los pequeños territorios de lenguas europeas en las Américas son matemáticamente insignificantes, como indican las siguientes cifras:
      </p>

      <blockquote>
        <p>
          <strong>Número de hablantes por idioma en América Hispánica (2023):</strong><br />
          • Inglés: 6,6 millones<br />
          • Francés: 11,7 millones<br />
          • Portugués: 216,4 millones<br />
          • Español: 426,5 millones<br />
          <small>Fuente: Banco Mundial (2023)</small>
        </p>
      </blockquote>

      <p>
        Hoy, cerca de 430 millones de personas en América Hispánica hablan español. Alrededor de 216 millones hablan portugués. Los hablantes de francés e inglés representan solo el 2% del total regional. Como resultado, estas son personas hispánicas o españolas, no "latinos". Llamar América Teutónica a la América inglesa sería tan exacto como llamar América Latina a la América Central y del Sur. Estados Unidos tiene más alemanes, suecos, noruegos y holandeses que franceses, italianos o rumanos hay en América Hispánica.
      </p>

      <p>
        Estados Unidos representa la civilización anglosajona y habla inglés, mientras que al sur del Río Bravo predomina la civilización española y se habla español y portugués. Por tanto, no hay justificación para el uso del término América Latina ni de sus derivados. La precisión histórica exige el rechazo de estos términos, y España —y Portugal, en menor medida— merecen reconocimiento por su legado, que no debe ser oscurecido por una terminología engañosa.
      </p>

      <p>
        En cuanto a España y Portugal, estos cargan con la culpa de una fascinante falta de aprecio por el valor y los métodos de autopromoción en el escenario internacional. Las naciones más comerciales dan enorme importancia y saben el valor de eclipsar o suprimir la promoción de sus competidores. Cada vez que se imprime o pronuncia América Española, América Hispánica o Repúblicas Hispánicas, se menciona con justicia el nombre de España. En cambio, cada vez que se usa América Latina o sus variantes, se anuncian errónea e injustamente los nombres de Francia e Italia, ya que ni Francia ni Italia jugaron papel alguno en la creación de esas naciones. Incluso si hoy ninguna nación se beneficia directamente del uso del término América Latina, el reconocimiento legítimo de España está siendo constantemente ignorado y borrado.
      </p>
      <p>
        El uso del término América Latina carece de justificación histórica, cultural y lógica. Las naciones de América Hispánica deben su fundación, lengua y civilización a España y Portugal, no a ningún supuesto legado latino o romano relacionado con Francia o Italia. La justicia y la verdad histórica exigen que se corrijan estas inexactitudes y se preserve el justo reconocimiento del legado español en las Américas.
      </p>

      <p>
        Adoptar el término América Hispánica desplaza el énfasis hacia el orgullo cultural, la historia común y la preservación de las tradiciones que han moldeado el pensamiento conservador en la región. También subraya el rol de España como puente entre Europa y las Américas, posicionando a la diplomacia cultural como una herramienta clave para fortalecer las relaciones.
      </p>

      <p>
        Una segunda mejor alternativa es la del término Iberoamérica, que amplía este concepto al incorporar la influencia portuguesa en Brasil, el país más grande de la región. Resalta la península ibérica como el punto de origen histórico y cultural de la identidad compartida de la región. Iberoamérica enfatiza el rol unificador de la cultura ibérica, aunque, como se ha visto, etimológicamente hispánico es un marco tan inclusivo como ibérico, ya que también reconoce las contribuciones tanto españolas como portuguesas.
      </p>

      <p>
        Más allá de hacer justicia a la identidad histórica, cultural y lingüística de la región, América Hispánica también resulta conveniente como término desde el punto de vista geopolítico. Este término ofrece un marco para que Europa se posicione como socio natural del área, basado en lazos culturales genuinos y un patrimonio común. Y también establece un hilo conductor fiel para todos los países del continente americano —excepto dos: Estados Unidos y Canadá— que los ayudaría a alcanzar acuerdos regionales y operar como bloque, lo cual beneficiaría el diálogo transatlántico con la UE.
      </p>

      <p>
        Que este excursus etimológico contribuya a abandonar la terminología imprecisa de América Latina, para fomentar una mayor unidad dentro de la región y mayor claridad en el diálogo transatlántico, enfatizando la importancia de los lazos culturales y espirituales.
      </p>

      <p>
        Cierro este apunte terminológico recordando que, en las elecciones presidenciales de 2024 —en un mitin de campaña en Albuquerque, Nuevo México— Donald J. Trump preguntó al público si preferían ser llamados "latinos" o "hispanos". La respuesta del público fue abrumadoramente favorable a lo segundo, lo cual confirma la tesis de que América Latina es un término impuesto desde fuera y no uno elegido por sus propios pueblos. Un interesante baño de realidad desde el segundo país del mundo —después de México— con el mayor número de hispanohablantes: los Estados Unidos de América.
      </p>
    `,
      en: `
      <p>
        El término América Latina se originó en el siglo XIX, principalmente como un constructo geopolítico para distinguir a las naciones del continente americano que hablaban lenguas romances de aquellas dentro de la esfera angloamericana. Fueron intelectuales y estrategas políticos franceses quienes popularizaron el término, con el fin de enfatizar los lazos lingüísticos y culturales entre Francia y los antiguos territorios españoles y portugueses.
      </p>

      <p>
        Sin embargo, el término conlleva una carga ideológica, ya que minimiza implícitamente el legado español y portugués al agrupar a la región bajo una identidad "latina" más amplia que incluye influencias no ibéricas. Más aún, el término América Latina fue diseñado explícitamente para socavar la autoridad y el protagonismo de España en el descubrimiento y construcción del Nuevo Mundo. Esta intención fue impulsada por Francia y alimentada por el Reino Unido.
      </p>

      <p>
        Definir el concepto de América Latina es altamente controvertido y complejo. A pesar de su uso común en la actualidad, se presentan dificultades significativas cuando se reflexiona sobre el término como concepto, junto con su significado e importancia.
      </p>

      <p>
        Hoy, lo que comúnmente se conoce como América Latina —o América Latina y el Caribe— es un sustantivo compuesto que hace referencia a la parte del continente americano que se extiende desde Tierra del Fuego (Chile y Argentina) en el sur hasta el Río Bravo en la frontera entre México y Estados Unidos. Incluye las islas del Caribe y las regiones sur y central del continente. En términos políticos y sociales, se refiere a los países del continente que difieren de lo que se conoce como América del Norte —excluyendo a México. Desde un punto de vista lingüístico, se refiere al grupo de países donde se habla una lengua latina o romance, en este caso, el español o el portugués.
      </p>

      <p>
        No obstante, como se mencionó anteriormente, el término "América Latina" significa esto y mucho más. Es el resultado de contextos y situaciones socio-político-económico-geográfico-culturales muy complejos y de larga data, por citar a Fernand Braudel. Al menos, la idea y el concepto de "América Latina" fueron moldeados tanto a pesar de como gracias al expansionismo norteamericano; y fue también un proyecto para crear un imperio en suelo americano promovido y apoyado por Francia y Napoleón III.
      </p>

      <figure>
        <img src="/images/publications/defensa-hispanoamerica.jpg" alt="Michel Chevalier" />
        <figcaption style="font-family: var(--font-cinzel); font-size: 0.7rem; color: #c5a059; text-align: center; margin-top: -3.5rem; margin-bottom: 4rem; letter-spacing: 0.1em; opacity: 0.8;">
          Retrato de Michel Chevalier (1806-1879), economista francés, ilustración de la revista The Illustrated London News, volumen XLVIII, 27 de enero de 1866.
        </figcaption>
      </figure>

      <p>
        Se considera que los ideólogos de Napoleón III, y más específicamente Michel Chevalier, son los creadores y arquitectos del concepto de América Latina. Se hace referencia a Chevalier por su libro <i>Des intérêts matériels en France</i> (1838), donde enfatiza la importancia de establecer una "América Latina" como contrapeso al término anteriormente más aceptado y difundido de "América Hispánica" o "América Española", utilizado desde el inicio de la colonización del Nuevo Mundo hasta casi finales del siglo XIX e incluso entrado el siglo XX. Esta fue una novedad incluso en Francia, donde hasta la década de 1910 los periódicos y libros se referían constantemente a <i>les pays hispano-américains</i>, <i>les hispano-américains</i> o <i>l'Amérique espagnole</i>.
      </p>

      <p>
        En realidad, Chevalier usó por primera vez el término América Latina en 1836, en la introducción a <i>Lettres sur l'Amérique du Nord</i>. En este texto, el autor comienza a esbozar su idea de "América Latina". Aun así, no es sino hasta <i>Des intérêts matériels en France</i> cuando surge un concepto más elaborado. En esta obra, Chevalier argumenta que la "Civilización" moderna tiene una raíz dual, tanto complementaria como contradictoria: la tradición romana y la tradición germánica. Así, el futuro de la sociedad y de la "Civilización" vuelve a estar en juego, ahora en un nuevo espacio llamado "América", donde ambas tradiciones coexisten y vuelven a chocar.
      </p>

      <p>
        Para Chevalier, el continente americano alberga dos "civilizaciones" o culturas, complementarias pero opuestas. Una es sajona y protestante: laboriosa, blanca, apegada y respetuosa de las instituciones que crea, pero discriminatoria, desdeñosa de lo distinto, impulsada por un destino manifiesto claro. La otra América es latina, católica, mestiza, tanto europea como bárbara, con escaso reconocimiento o respeto hacia las instituciones en formación, pero sin temor al otro, deseosa de encontrarse, confrontarse, enseñar y aprender. Esto refleja una visión altamente romantizada de la latinidad frente a una visión muy pragmática del mundo sajón.
      </p>

      <p>
        Además de Chevalier, un comerciante y autor llamado Benjamin Poucel reflexionó hacia 1850 sobre la idea de América Latina en dos de sus obras: <i>De las emigraciones europeas en la América del Sur</i> y <i>Estudios de los intereses recíprocos de la Europa y la América, Francia y la América del Sur</i>. Poucel hizo un llamado de política internacional para que Francia estableciera una presencia más sustancial en las Américas y contrarrestara la creciente influencia de Estados Unidos sobre las naciones emergentes del continente. Con este fin, invocó la idea de la latinidad, intentando mostrar que las naciones del sur del continente tenían mucho más en común con Francia que con Estados Unidos.
      </p>

      <p>
        Junto a estos dos autores franceses, varios autores americanos también se comprometieron con el concepto de América Latina. Entre ellos se encuentran el dominicano Francisco Muñoz del Monte y el colombiano José María Torres Caicedo; este último considerado a menudo como el primer hispanoamericano con una conciencia histórica del pensamiento latino.
      </p>

      <figure>
        <img src="/images/publications/defensa-hispanoamerica_Jose_Maria_Torres.png" alt="José María Torres Caicedo" />
        <figcaption style="font-family: var(--font-cinzel); font-size: 0.7rem; color: #c5a059; text-align: center; margin-top: -3.5rem; margin-bottom: 4rem; letter-spacing: 0.1em; opacity: 0.8;">
          El dominicano Francisco Muñoz del Monte y el colombiano José María Torres Caicedo.
        </figcaption>
      </figure>

      <p>
        El chileno Francisco Bilbao también contribuyó a esta trayectoria. En 1856, siguiendo a Torres Caicedo, Bilbao publicó un poema titulado <i>Las dos Américas</i>, donde distingue clara e inequívocamente entre dos Américas: una sajona y otra latina.
      </p>

      <figure>
        <img src="/images/publications/defensa-hispanoamerica_Francisco_Bilbao.png" alt="Francisco Bilbao" />
        <figcaption style="font-family: var(--font-cinzel); font-size: 0.7rem; color: #c5a059; text-align: center; margin-top: -3.5rem; margin-bottom: 4rem; letter-spacing: 0.1em; opacity: 0.8;">
          El chileno Francisco Bilbao contribuyó significativamente a la distinción entre las dos Américas.
        </figcaption>
      </figure>

      <p>
        La obra de Bilbao refleja la influencia de otro pensador francés, el abate Félicité de Lamennais, quien también exploró la idea del panlatinismo desde una perspectiva europea, bajo circunstancias y lógicas diferentes.
      </p>

      <figure>
        <img src="/images/publications/defensa-hispanoamerica_Lancome.jpg" alt="Lancome" />
      </figure>

      <p>
        En una conferencia pronunciada en París en 1856 titulada <i>Iniciativa de las Américas: Idea de un Congreso Federal de Repúblicas</i>, Bilbao articuló la visión dominante entre las élites hispanoamericanas: la existencia de dos razas, dos culturas y dos civilizaciones, cada una buscando dominar el mundo a su manera. Una representaba la cultura sajona/materialista, mientras que la otra simbolizaba la cultura latina y más espiritual.
      </p>

      <p>
        Desde 1860 en adelante —y prácticamente hasta hoy—, el término América Latina ha sido considerado una invención francesa, creada y promovida por los ideólogos imperialistas de Napoleón III para justificar su interés en establecer un imperio en suelo mexicano. Como ya se mencionó, el uso de América Latina pretendía borrar o disminuir la idea de una "América Hispánica" o "América Española", ofreciendo una identidad común que no tuviera fuertes lazos ni con la potencia colonial anterior ni con el nuevo gigante del norte. Esto también explica por qué términos como "Iberoamérica" e "Hispanoamérica" siguen siendo comunes en España, así como el rechazo por parte de países latinoamericanos a llamar a Estados Unidos simplemente "América", como suele hacerse en EE.UU.
      </p>

      <p>
        Debido a los rápidos y tumultuosos acontecimientos políticos y sociales desde la década de 1860 en adelante en las Américas, dos términos ganaron protagonismo. El término inglés <i>America</i> pasó a referirse a la tradición sajona y a las regiones del continente bajo esa influencia, mientras que <i>Latin America</i> describía las partes del continente fuera del mundo sajón.
      </p>

      <h3>El caso de la América Hispánica o Hispanoamérica</h3>

      <p>
        El término América Hispánica es más cultural e históricamente preciso que América Latina para describir esa parte del mundo, ya que resalta el patrimonio español compartido por la región. Refleja la centralidad de la lengua española, las tradiciones católicas y los valores culturales traídos por España durante el período colonial. Esta terminología reafirma la unidad de naciones unidas por una historia y una identidad lingüística comunes, al tiempo que evita las connotaciones más amplias y a menudo diluidas del término América Latina.
      </p>

      <p>
        España trasplantó su propia civilización completa a estos países sin ninguna ayuda externa. Una vez crecidos y maduros, estos países hispánicos siguieron el ejemplo de Estados Unidos y se separaron de su Madre Patria, España, preservando naturalmente su idioma, leyes, costumbres y tradiciones, tal como lo hacían antes. También imitaron a Estados Unidos en este sentido, conservando su lengua nativa inglesa, el Common Law, y las leyes, costumbres y tradiciones inglesas, a pesar de la diversidad y gran número de inmigrantes que admitieron.
      </p>

      <p>
        Además de la mayoría de los países de la región, que son repúblicas de habla hispana, está Brasil, creado por Portugal, donde se habla portugués y prevalecen las leyes, costumbres y tradiciones portuguesas. Sin embargo, este país también es hispánico, porque <i>Hispania</i>, al igual que <i>Iberia</i>, incluía tanto a Portugal como a España. Por tanto, el término América Hispánica abarca todo lo derivado de Portugal y España. El nombre de la <i>Hispanic Society of America</i> en Nueva York, fundada en 1904 para estudiar la historia americana vinculada a España y Portugal, no es una coincidencia. Se eligió sobre <i>Latin Society of America</i>, ya que esta última habría sido engañosa, falsa y groseramente errónea, al igual que aplicar el término latino a las naciones hispanohablantes, españolas y portuguesas que no descienden ni de Francia ni de Italia.
      </p>

      <p>
        La influencia de Francia en las Américas nunca se extendió a los países hispánicos; solo aplicó a territorios que ahora forman parte de Estados Unidos o Canadá. En rigor, como resultado, si queremos usar el término latino para los países de habla española, también deberíamos llamar a las colonias francesas e italianas —como Argelia, la República Democrática del Congo o Senegal— colonias latinas, lo cual Francia con razón rechazaría. Si el criterio es la herencia lingüística, entonces Estados Unidos y Canadá deberían llamarse América Teutónica por sus orígenes lingüísticos y poblaciones de ascendencia teutónica. Así, tendríamos dos Américas: latina y teutónica. Por lo tanto, la designación justa y lógica sigue siendo el estándar universal: América inglesa o británica y América hispánica, y nada más, ya que los pequeños territorios de lenguas europeas en las Américas son matemáticamente insignificantes, como indican las siguientes cifras:
      </p>

      <blockquote>
        <p>
          <strong>Número de hablantes por idioma en América Hispánica (2023):</strong><br />
          • Inglés: 6,6 millones<br />
          • Francés: 11,7 millones<br />
          • Portugués: 216,4 millones<br />
          • Español: 426,5 millones<br />
          <small>Fuente: Banco Mundial (2023)</small>
        </p>
      </blockquote>

      <p>
        Hoy, cerca de 430 millones de personas en América Hispánica hablan español. Alrededor de 216 millones hablan portugués. Los hablantes de francés e inglés representan solo el 2% del total regional. Como resultado, estas son personas hispánicas o españolas, no "latinos". Llamar América Teutónica a la América inglesa sería tan exacto como llamar América Latina a la América Central y del Sur. Estados Unidos tiene más alemanes, suecos, noruegos y holandeses que franceses, italianos o rumanos hay en América Hispánica.
      </p>

      <p>
        Estados Unidos representa la civilización anglosajona y habla inglés, mientras que al sur del Río Bravo predomina la civilización española y se habla español y portugués. Por tanto, no hay justificación para el uso del término América Latina ni de sus derivados. La precisión histórica exige el rechazo de estos términos, y España —y Portugal, en menor medida— merecen reconocimiento por su legado, que no debe ser oscurecido por una terminología engañosa.
      </p>

      <p>
        En cuanto a España y Portugal, estos cargan con la culpa de una fascinante falta de aprecio por el valor y los métodos de autopromoción en el escenario internacional. Las naciones más comerciales dan enorme importancia y saben el valor de eclipsar o suprimir la promoción de sus competidores. Cada vez que se imprime o pronuncia América Española, América Hispánica o Repúblicas Hispánicas, se menciona con justicia el nombre de España. En cambio, cada vez que se usa América Latina o sus variantes, se anuncian errónea e injustamente los nombres de Francia e Italia, ya que ni Francia ni Italia jugaron papel alguno en la creación de esas naciones. Incluso si hoy ninguna nación se beneficia directamente del uso del término América Latina, el reconocimiento legítimo de España está siendo constantemente ignorado y borrado.
      </p>
      <p>
        El uso del término América Latina carece de justificación histórica, cultural y lógica. Las naciones de América Hispánica deben su fundación, lengua y civilización a España y Portugal, no a ningún supuesto legado latino o romano relacionado con Francia o Italia. La justicia y la verdad histórica exigen que se corrijan estas inexactitudes y se preserve el justo reconocimiento del legado español en las Américas.
      </p>

      <p>
        Adoptar el término América Hispánica desplaza el énfasis hacia el orgullo cultural, la historia común y la preservación de las tradiciones que han moldeado el pensamiento conservador en la región. También subraya el rol de España como puente entre Europa y las Américas, posicionando a la diplomacia cultural como una herramienta clave para fortalecer las relaciones.
      </p>

      <p>
        Una segunda mejor alternativa es la del término Iberoamérica, que amplía este concepto al incorporar la influencia portuguesa en Brasil, el país más grande de la región. Resalta la península ibérica como el punto de origen histórico y cultural de la identidad compartida de la región. Iberoamérica enfatiza el rol unificador de la cultura ibérica, aunque, como se ha visto, etimológicamente hispánico es un marco tan inclusivo como ibérico, ya que también reconoce las contribuciones tanto españolas como portuguesas.
      </p>

      <p>
        Más allá de hacer justicia a la identidad histórica, cultural y lingüística de la región, América Hispánica también resulta conveniente como término desde el punto de vista geopolítico. Este término ofrece un marco para que Europa se posicione como socio natural del área, basado en lazos culturales genuinos y un patrimonio común. Y también establece un hilo conductor fiel para todos los países del continente americano —excepto dos: Estados Unidos y Canadá— que los ayudaría a alcanzar acuerdos regionales y operar como bloque, lo cual beneficiaría el diálogo transatlántico con la UE.
      </p>

      <p>
        Que este excursus etimológico contribuya a abandonar la terminología imprecisa de América Latina, para fomentar una mayor unidad dentro de la región y mayor claridad en el diálogo transatlántico, enfatizando la importancia de los lazos culturales y espirituales.
      </p>

      <p>
        Cierro este apunte terminológico recordando que, en las elecciones presidenciales de 2024 —en un mitin de campaña en Albuquerque, Nuevo México— Donald J. Trump preguntó al público si preferían ser llamados "latinos" o "hispanos". La respuesta del público fue abrumadoramente favorable a lo segundo, lo cual confirma la tesis de que América Latina es un término impuesto desde fuera y no uno elegido por sus propios pueblos. Un interesante baño de realidad desde el segundo país del mundo —después de México— con el mayor número de hispanohablantes: los Estados Unidos de América.
      </p>
    `,
      pt: `
      <p>
        El término América Latina se originó en el siglo XIX, principalmente como un constructo geopolítico para distinguir a las naciones del continente americano que hablaban lenguas romances de aquellas dentro de la esfera angloamericana. Fueron intelectuales y estrategas políticos franceses quienes popularizaron el término, con el fin de enfatizar los lazos lingüísticos y culturales entre Francia y los antiguos territorios españoles y portugueses.
      </p>

      <p>
        Sin embargo, el término conlleva una carga ideológica, ya que minimiza implícitamente el legado español y portugués al agrupar a la región bajo una identidad "latina" más amplia que incluye influencias no ibéricas. Más aún, el término América Latina fue diseñado explícitamente para socavar la autoridad y el protagonismo de España en el descubrimiento y construcción del Nuevo Mundo. Esta intención fue impulsada por Francia y alimentada por el Reino Unido.
      </p>

      <p>
        Definir el concepto de América Latina es altamente controvertido y complejo. A pesar de su uso común en la actualidad, se presentan dificultades significativas cuando se reflexiona sobre el término como concepto, junto con su significado e importancia.
      </p>

      <p>
        Hoy, lo que comúnmente se conoce como América Latina —o América Latina y el Caribe— es un sustantivo compuesto que hace referencia a la parte del continente americano que se extiende desde Tierra del Fuego (Chile y Argentina) en el sur hasta el Río Bravo en la frontera entre México y Estados Unidos. Incluye las islas del Caribe y las regiones sur y central del continente. En términos políticos y sociales, se refiere a los países del continente que difieren de lo que se conoce como América del Norte —excluyendo a México. Desde un punto de vista lingüístico, se refiere al grupo de países donde se habla una lengua latina o romance, en este caso, el español o el portugués.
      </p>

      <p>
        No obstante, como se mencionó anteriormente, el término "América Latina" significa esto y mucho más. Es el resultado de contextos y situaciones socio-político-económico-geográfico-culturales muy complejos y de larga data, por citar a Fernand Braudel. Al menos, la idea y el concepto de "América Latina" fueron moldeados tanto a pesar de como gracias al expansionismo norteamericano; y fue también un proyecto para crear un imperio en suelo americano promovido y apoyado por Francia y Napoleón III.
      </p>

      <figure>
        <img src="/images/publications/defensa-hispanoamerica.jpg" alt="Michel Chevalier" />
        <figcaption style="font-family: var(--font-cinzel); font-size: 0.7rem; color: #c5a059; text-align: center; margin-top: -3.5rem; margin-bottom: 4rem; letter-spacing: 0.1em; opacity: 0.8;">
          Retrato de Michel Chevalier (1806-1879), economista francés, ilustración de la revista The Illustrated London News, volumen XLVIII, 27 de enero de 1866.
        </figcaption>
      </figure>

      <p>
        Se considera que los ideólogos de Napoleón III, y más específicamente Michel Chevalier, son los creadores y arquitectos del concepto de América Latina. Se hace referencia a Chevalier por su libro <i>Des intérêts matériels en France</i> (1838), donde enfatiza la importancia de establecer una "América Latina" como contrapeso al término anteriormente más aceptado y difundido de "América Hispánica" o "América Española", utilizado desde el inicio de la colonización del Nuevo Mundo hasta casi finales del siglo XIX e incluso entrado el siglo XX. Esta fue una novedad incluso en Francia, donde hasta la década de 1910 los periódicos y libros se referían constantemente a <i>les pays hispano-américains</i>, <i>les hispano-américains</i> o <i>l'Amérique espagnole</i>.
      </p>

      <p>
        En realidad, Chevalier usó por primera vez el término América Latina en 1836, en la introducción a <i>Lettres sur l'Amérique du Nord</i>. En este texto, el autor comienza a esbozar su idea de "América Latina". Aun así, no es sino hasta <i>Des intérêts matériels en France</i> cuando surge un concepto más elaborado. En esta obra, Chevalier argumenta que la "Civilización" moderna tiene una raíz dual, tanto complementaria como contradictoria: la tradición romana y la tradición germánica. Así, el futuro de la sociedad y de la "Civilización" vuelve a estar en juego, ahora en un nuevo espacio llamado "América", donde ambas tradiciones coexisten y vuelven a chocar.
      </p>

      <p>
        Para Chevalier, el continente americano alberga dos "civilizaciones" o culturas, complementarias pero opuestas. Una es sajona y protestante: laboriosa, blanca, apegada y respetuosa de las instituciones que crea, pero discriminatoria, desdeñosa de lo distinto, impulsada por un destino manifiesto claro. La otra América es latina, católica, mestiza, tanto europea como bárbara, con escaso reconocimiento o respeto hacia las instituciones en formación, pero sin temor al otro, deseosa de encontrarse, confrontarse, enseñar y aprender. Esto refleja una visión altamente romantizada de la latinidad frente a una visión muy pragmática del mundo sajón.
      </p>

      <p>
        Además de Chevalier, un comerciante y autor llamado Benjamin Poucel reflexionó hacia 1850 sobre la idea de América Latina en dos de sus obras: <i>De las emigraciones europeas en la América del Sur</i> y <i>Estudios de los intereses recíprocos de la Europa y la América, Francia y la América del Sur</i>. Poucel hizo un llamado de política internacional para que Francia estableciera una presencia más sustancial en las Américas y contrarrestara la creciente influencia de Estados Unidos sobre las naciones emergentes del continente. Con este fin, invocó la idea de la latinidad, intentando mostrar que las naciones del sur del continente tenían mucho más en común con Francia que con Estados Unidos.
      </p>

      <p>
        Junto a estos dos autores franceses, varios autores americanos también se comprometieron con el concepto de América Latina. Entre ellos se encuentran el dominicano Francisco Muñoz del Monte y el colombiano José María Torres Caicedo; este último considerado a menudo como el primer hispanoamericano con una conciencia histórica del pensamiento latino.
      </p>

      <figure>
        <img src="/images/publications/defensa-hispanoamerica_Jose_Maria_Torres.png" alt="José María Torres Caicedo" />
        <figcaption style="font-family: var(--font-cinzel); font-size: 0.7rem; color: #c5a059; text-align: center; margin-top: -3.5rem; margin-bottom: 4rem; letter-spacing: 0.1em; opacity: 0.8;">
          El dominicano Francisco Muñoz del Monte y el colombiano José María Torres Caicedo.
        </figcaption>
      </figure>

      <p>
        El chileno Francisco Bilbao también contribuyó a esta trayectoria. En 1856, siguiendo a Torres Caicedo, Bilbao publicó un poema titulado <i>Las dos Américas</i>, donde distingue clara e inequívocamente entre dos Américas: una sajona y otra latina.
      </p>

      <figure>
        <img src="/images/publications/defensa-hispanoamerica_Francisco_Bilbao.png" alt="Francisco Bilbao" />
        <figcaption style="font-family: var(--font-cinzel); font-size: 0.7rem; color: #c5a059; text-align: center; margin-top: -3.5rem; margin-bottom: 4rem; letter-spacing: 0.1em; opacity: 0.8;">
          El chileno Francisco Bilbao contribuyó significativamente a la distinción entre las dos Américas.
        </figcaption>
      </figure>

      <p>
        La obra de Bilbao refleja la influencia de otro pensador francés, el abate Félicité de Lamennais, quien también exploró la idea del panlatinismo desde una perspectiva europea, bajo circunstancias y lógicas diferentes.
      </p>

      <figure>
        <img src="/images/publications/defensa-hispanoamerica_Lancome.jpg" alt="Lancome" />
      </figure>

      <p>
        En una conferencia pronunciada en París en 1856 titulada <i>Iniciativa de las Américas: Idea de un Congreso Federal de Repúblicas</i>, Bilbao articuló la visión dominante entre las élites hispanoamericanas: la existencia de dos razas, dos culturas y dos civilizaciones, cada una buscando dominar el mundo a su manera. Una representaba la cultura sajona/materialista, mientras que la otra simbolizaba la cultura latina y más espiritual.
      </p>

      <p>
        Desde 1860 en adelante —y prácticamente hasta hoy—, el término América Latina ha sido considerado una invención francesa, creada y promovida por los ideólogos imperialistas de Napoleón III para justificar su interés en establecer un imperio en suelo mexicano. Como ya se mencionó, el uso de América Latina pretendía borrar o disminuir la idea de una "América Hispánica" o "América Española", ofreciendo una identidad común que no tuviera fuertes lazos ni con la potencia colonial anterior ni con el nuevo gigante del norte. Esto también explica por qué términos como "Iberoamérica" e "Hispanoamérica" siguen siendo comunes en España, así como el rechazo por parte de países latinoamericanos a llamar a Estados Unidos simplemente "América", como suele hacerse en EE.UU.
      </p>

      <p>
        Debido a los rápidos y tumultuosos acontecimientos políticos y sociales desde la década de 1860 en adelante en las Américas, dos términos ganaron protagonismo. El término inglés <i>America</i> pasó a referirse a la tradición sajona y a las regiones del continente bajo esa influencia, mientras que <i>Latin America</i> describía las partes del continente fuera del mundo sajón.
      </p>

      <h3>El caso de la América Hispánica o Hispanoamérica</h3>

      <p>
        El término América Hispánica es más cultural e históricamente preciso que América Latina para describir esa parte del mundo, ya que resalta el patrimonio español compartido por la región. Refleja la centralidad de la lengua española, las tradiciones católicas y los valores culturales traídos por España durante el período colonial. Esta terminología reafirma la unidad de naciones unidas por una historia y una identidad lingüística comunes, al tiempo que evita las connotaciones más amplias y a menudo diluidas del término América Latina.
      </p>

      <p>
        España trasplantó su propia civilización completa a estos países sin ninguna ayuda externa. Una vez crecidos y maduros, estos países hispánicos siguieron el ejemplo de Estados Unidos y se separaron de su Madre Patria, España, preservando naturalmente su idioma, leyes, costumbres y tradiciones, tal como lo hacían antes. También imitaron a Estados Unidos en este sentido, conservando su lengua nativa inglesa, el Common Law, y las leyes, costumbres y tradiciones inglesas, a pesar de la diversidad y gran número de inmigrantes que admitieron.
      </p>

      <p>
        Además de la mayoría de los países de la región, que son repúblicas de habla hispana, está Brasil, creado por Portugal, donde se habla portugués y prevalecen las leyes, costumbres y tradiciones portuguesas. Sin embargo, este país también es hispánico, porque <i>Hispania</i>, al igual que <i>Iberia</i>, incluía tanto a Portugal como a España. Por tanto, el término América Hispánica abarca todo lo derivado de Portugal y España. El nombre de la <i>Hispanic Society of America</i> en Nueva York, fundada en 1904 para estudiar la historia americana vinculada a España y Portugal, no es una coincidencia. Se eligió sobre <i>Latin Society of America</i>, ya que esta última habría sido engañosa, falsa y groseramente errónea, al igual que aplicar el término latino a las naciones hispanohablantes, españolas y portuguesas que no descienden ni de Francia ni de Italia.
      </p>

      <p>
        La influencia de Francia en las Américas nunca se extendió a los países hispánicos; solo aplicó a territorios que ahora forman parte de Estados Unidos o Canadá. En rigor, como resultado, si queremos usar el término latino para los países de habla española, también deberíamos llamar a las colonias francesas e italianas —como Argelia, la República Democrática del Congo o Senegal— colonias latinas, lo cual Francia con razón rechazaría. Si el criterio es la herencia lingüística, entonces Estados Unidos y Canadá deberían llamarse América Teutónica por sus orígenes lingüísticos y poblaciones de ascendencia teutónica. Así, tendríamos dos Américas: latina y teutónica. Por lo tanto, la designación justa y lógica sigue siendo el estándar universal: América inglesa o británica y América hispánica, y nada más, ya que los pequeños territorios de lenguas europeas en las Américas son matemáticamente insignificantes, como indican las siguientes cifras:
      </p>

      <blockquote>
        <p>
          <strong>Número de hablantes por idioma en América Hispánica (2023):</strong><br />
          • Inglés: 6,6 millones<br />
          • Francés: 11,7 millones<br />
          • Portugués: 216,4 millones<br />
          • Español: 426,5 millones<br />
          <small>Fuente: Banco Mundial (2023)</small>
        </p>
      </blockquote>

      <p>
        Hoy, cerca de 430 millones de personas en América Hispánica hablan español. Alrededor de 216 millones hablan portugués. Los hablantes de francés e inglés representan solo el 2% del total regional. Como resultado, estas son personas hispánicas o españolas, no "latinos". Llamar América Teutónica a la América inglesa sería tan exacto como llamar América Latina a la América Central y del Sur. Estados Unidos tiene más alemanes, suecos, noruegos y holandeses que franceses, italianos o rumanos hay en América Hispánica.
      </p>

      <p>
        Estados Unidos representa la civilización anglosajona y habla inglés, mientras que al sur del Río Bravo predomina la civilización española y se habla español y portugués. Por tanto, no hay justificación para el uso del término América Latina ni de sus derivados. La precisión histórica exige el rechazo de estos términos, y España —y Portugal, en menor medida— merecen reconocimiento por su legado, que no debe ser oscurecido por una terminología engañosa.
      </p>

      <p>
        En cuanto a España y Portugal, estos cargan con la culpa de una fascinante falta de aprecio por el valor y los métodos de autopromoción en el escenario internacional. Las naciones más comerciales dan enorme importancia y saben el valor de eclipsar o suprimir la promoción de sus competidores. Cada vez que se imprime o pronuncia América Española, América Hispánica o Repúblicas Hispánicas, se menciona con justicia el nombre de España. En cambio, cada vez que se usa América Latina o sus variantes, se anuncian errónea e injustamente los nombres de Francia e Italia, ya que ni Francia ni Italia jugaron papel alguno en la creación de esas naciones. Incluso si hoy ninguna nación se beneficia directamente del uso del término América Latina, el reconocimiento legítimo de España está siendo constantemente ignorado y borrado.
      </p>
      <p>
        El uso del término América Latina carece de justificación histórica, cultural y lógica. Las naciones de América Hispánica deben su fundación, lengua y civilización a España y Portugal, no a ningún supuesto legado latino o romano relacionado con Francia o Italia. La justicia y la verdad histórica exigen que se corrijan estas inexactitudes y se preserve el justo reconocimiento del legado español en las Américas.
      </p>

      <p>
        Adoptar el término América Hispánica desplaza el énfasis hacia el orgullo cultural, la historia común y la preservación de las tradiciones que han moldeado el pensamiento conservador en la región. También subraya el rol de España como puente entre Europa y las Américas, posicionando a la diplomacia cultural como una herramienta clave para fortalecer las relaciones.
      </p>

      <p>
        Una segunda mejor alternativa es la del término Iberoamérica, que amplía este concepto al incorporar la influencia portuguesa en Brasil, el país más grande de la región. Resalta la península ibérica como el punto de origen histórico y cultural de la identidad compartida de la región. Iberoamérica enfatiza el rol unificador de la cultura ibérica, aunque, como se ha visto, etimológicamente hispánico es un marco tan inclusivo como ibérico, ya que también reconoce las contribuciones tanto españolas como portuguesas.
      </p>

      <p>
        Más allá de hacer justicia a la identidad histórica, cultural y lingüística de la región, América Hispánica también resulta conveniente como término desde el punto de vista geopolítico. Este término ofrece un marco para que Europa se posicione como socio natural del área, basado en lazos culturales genuinos y un patrimonio común. Y también establece un hilo conductor fiel para todos los países del continente americano —excepto dos: Estados Unidos y Canadá— que los ayudaría a alcanzar acuerdos regionales y operar como bloque, lo cual beneficiaría el diálogo transatlántico con la UE.
      </p>

      <p>
        Que este excursus etimológico contribuya a abandonar la terminología imprecisa de América Latina, para fomentar una mayor unidad dentro de la región y mayor claridad en el diálogo transatlántico, enfatizando la importancia de los lazos culturales y espirituales.
      </p>

      <p>
        Cierro este apunte terminológico recordando que, en las elecciones presidenciales de 2024 —en un mitin de campaña en Albuquerque, Nuevo México— Donald J. Trump preguntó al público si preferían ser llamados "latinos" o "hispanos". La respuesta del público fue abrumadoramente favorable a lo segundo, lo cual confirma la tesis de que América Latina es un término impuesto desde fuera y no uno elegido por sus propios pueblos. Un interesante baño de realidad desde el segundo país del mundo —después de México— con el mayor número de hispanohablantes: los Estados Unidos de América.
      </p>
    `
    },
    image: '/images/publications/defensa-hispanoamerica.jpg',
    isFeatured: true
  },
  {
    id: 3,
    slug: 'sobre-puerto-rico-y-su-vinculacion-con-la-escuela-de-salamanca',
    title: {
      es: 'Sobre Puerto Rico y su vinculación con la Escuela de Salamanca',
      en: 'On Puerto Rico and its Connection to the School of Salamanca',
      pt: 'Sobre Porto Rico e a sua ligação com a Escola de Salamanca'
    },
    author: 'David Cruz de la Torre',
    authorImage: '/images/team/David-Cruz-de-la-Torre.webp',
    date: '15/06/2025',
    category: {
      es: 'Historia',
      en: 'History',
      pt: 'História'
    },
    excerpt: {
      es: 'Descubre los vínculos históricos entre Puerto Rico y la Escuela de Salamanca. Desde el legado del papado hasta la influencia en la educación superior y la identidad hispánica de la isla.',
      en: 'Discover the historical links between Puerto Rico and the School of Salamanca. From the legacy of the papacy to the influence on higher education and the island\'s Hispanic identity.',
      pt: 'Descubra os laços históricos entre Porto Rico e a Escola de Salamanca. Do legado do papado à influência no ensino superior e na identidade hispânica da ilha.'
    },
    content: {
      es: `
      <p>
        La elección del Papa León XIV evocó inmediatamente la figura de León XIII, especialmente entre los católicos conscientes de la historia intelectual de la Iglesia. Fue precisamente León XIII quien, con la encíclica Rerum Novarum, inauguró un frente doctrinal contra los errores del socialismo y el desprecio por el orden natural. Considerada la primera encíclica social, esta constituyó un punto de inflexión para los católicos deseosos de articular una respuesta firme y coherente a los desafíos de la modernidad.
      </p>

      <p>
        Hoy, con el ascenso de León XIV, muchos observadores han señalado que Roma parece reanudar aquella misma batalla cultural e intelectual: el combate iniciado por León XIII no ha concluido. Persisten algunos de los desafíos entonces planteados, como la confrontación con el comunismo y sus ideologías afines —ahora enmascaradas en nuevas modas culturales—, el avance de tecnologías disruptivas (como la inteligencia artificial) y los riesgos para la paz y la prosperidad global. Frente a tales realidades, es imperativo recordar que el mundo continúa su curso y que, en ese movimiento, se requiere una balanza sostenida por los principios de la paz y la fraternidad universal. En ese sentido, podría afirmarse que, si de la paz se cosechan frutos, entonces —en términos morales— estamos también en presencia de una forma superior de mercado libre.
      </p>

      <p>
        Desde una perspectiva cristiana y humanista, se vuelve indispensable recurrir a una mirada más profunda, dotada de clarividencia, que permita reconocer los fundamentos intelectuales que legitiman la defensa del mercado libre. Tal es el legado de la Escuela de Salamanca, verdadero crisol de pensamiento jurídico, económico y moral en los albores de la modernidad. En esta institución se elaboraron los primeros conceptos modernos de derecho natural, comercio justo y soberanía, con una influencia decisiva en la configuración del orden político y jurídico internacional. Su huella se proyecta tanto en la formación de los Estados Unidos como —de forma menos conocida pero igualmente significativa— en la configuración histórico-cultural de Puerto Rico.
      </p>

      <p>
        En efecto, Puerto Rico mantiene vínculos directos con este legado a través del Convento de Santo Tomás de Aquino, fundado por frailes dominicos como Fray Antonio de Montesinos y Fray Luis Cáncer. En 1532, el breve In splendide die del Papa Clemente VII otorgó reconocimiento apostólico al Estudio General de los conventos de San Juan y Santo Domingo. A través de este desarrollo, es posible afirmar con razonable certeza que profesores formados en la Universidad de Salamanca participaron en los orígenes de la educación superior en América, particularmente en la isla La Española.
      </p>

      <p>
        Tras el año 1898, Puerto Rico se convirtió en un caso singular dentro del ámbito hispanoamericano: una sociedad católica e hispánica bajo la autoridad de una potencia anglosajona y protestante. Son pocos los casos comparables en el mundo —quizás Gibraltar, aunque con diferencias sustanciales. Ante esta circunstancia, León XIII tomó una decisión que resulta fundamental, aunque escasamente reconocida hoy. En 1903, mediante el breve apostólico Actum Praeclare, dispuso que la Provincia Eclesiástica de San Juan de Puerto Rico quedara directamente subordinada a la Santa Sede, preservando así su identidad eclesial hispánica frente a la influencia eclesiástica de los Estados Unidos. Esta medida no fue meramente simbólica: constituyó una afirmación estratégica de la pertenencia cultural, jurídica y espiritual de Puerto Rico al mundo hispánico.
      </p>

      <p>
        Durante el siglo XX, especialmente en el contexto de la Guerra Fría, la isla ofreció refugio económico y cultural a numerosos exiliados provenientes de Cuba, República Dominicana, Venezuela y España. En todos estos casos, Puerto Rico fue percibido como un espacio de libertad económica, estabilidad institucional y valores familiares. No obstante, persiste una paradoja: a pesar de su resistencia cultural al socialismo, la isla enfrenta hoy una economía debilitada, fuertemente dependiente de recursos federales, y una administración consciente de su propia fragilidad.
      </p>

      <p>
        Mucho se ha escrito sobre esta situación, pero se ha prestado poca atención a la perdurabilidad de los vínculos establecidos por León XIII entre Puerto Rico y Roma. Dichos lazos permiten afirmar que el desarrollo de Puerto Rico como territorio estadounidense ha transcurrido bajo una alianza —podría decirse “nupcial”— con la hispanidad, bendecida por León XIII. Esta unión, de carácter jurídico, cultural y espiritual, no fue una casualidad, sino una afirmación deliberada de identidad dentro de una nueva estructura política.
      </p>

      <p>
        Frente a los retos contemporáneos que el Papa León XIV comienza a señalar —la deshumanización de la economía, la fragilidad institucional, el vacío moral—, los principios que animaron a la Escuela de Salamanca y forjaron la tradición hispánica de la libertad siguen vigentes. Estos valores, que influyeron tanto en el constitucionalismo estadounidense como en el ethos puertorriqueño, podrían sustentar una nueva etapa de integración inteligente y estratégica entre Puerto Rico y el mundo. Dicha etapa exigiría una revitalización del tejido productivo local, el fomento de exportaciones y una participación más activa en los flujos económicos del Atlántico hispánico, preferentemente a través de alianzas público-privadas.
      </p>

      <p>
        En efecto, durante más de un siglo, Puerto Rico ha constituido —con sus dificultades y contradicciones— un refugio para quienes han buscado prosperar y vivir en paz, incluso en los momentos más críticos de la historia occidental contemporánea. Los problemas más acuciantes que enfrenta hoy —más allá de los apagones, aunque en parte vinculados a ellos— son análogos a los que atraviesan muchas otras sociedades occidentales. En este sentido, la experiencia puertorriqueña puede y debe ser comprendida desde una perspectiva más amplia, en la cual sus raíces hispánicas y su proyección atlántica desempeñan un papel central.
      </p>
    `,
      en: `
      <p>
        La elección del Papa León XIV evocó inmediatamente la figura de León XIII, especialmente entre los católicos conscientes de la historia intelectual de la Iglesia. Fue precisamente León XIII quien, con la encíclica Rerum Novarum, inauguró un frente doctrinal contra los errores del socialismo y el desprecio por el orden natural. Considerada la primera encíclica social, esta constituyó un punto de inflexión para los católicos deseosos de articular una respuesta firme y coherente a los desafíos de la modernidad.
      </p>

      <p>
        Hoy, con el ascenso de León XIV, muchos observadores han señalado que Roma parece reanudar aquella misma batalla cultural e intelectual: el combate iniciado por León XIII no ha concluido. Persisten algunos de los desafíos entonces planteados, como la confrontación con el comunismo y sus ideologías afines —ahora enmascaradas en nuevas modas culturales—, el avance de tecnologías disruptivas (como la inteligencia artificial) y los riesgos para la paz y la prosperidad global. Frente a tales realidades, es imperativo recordar que el mundo continúa su curso y que, en ese movimiento, se requiere una balanza sostenida por los principios de la paz y la fraternidad universal. En ese sentido, podría afirmarse que, si de la paz se cosechan frutos, entonces —en términos morales— estamos también en presencia de una forma superior de mercado libre.
      </p>

      <p>
        Desde una perspectiva cristiana y humanista, se vuelve indispensable recurrir a una mirada más profunda, dotada de clarividencia, que permita reconocer los fundamentos intelectuales que legitiman la defensa del mercado libre. Tal es el legado de la Escuela de Salamanca, verdadero crisol de pensamiento jurídico, económico y moral en los albores de la modernidad. En esta institución se elaboraron los primeros conceptos modernos de derecho natural, comercio justo y soberanía, con una influencia decisiva en la configuración del orden político y jurídico internacional. Su huella se proyecta tanto en la formación de los Estados Unidos como —de forma menos conocida pero igualmente significativa— en la configuración histórico-cultural de Puerto Rico.
      </p>

      <p>
        En efecto, Puerto Rico mantiene vínculos directos con este legado a través del Convento de Santo Tomás de Aquino, fundado por frailes dominicos como Fray Antonio de Montesinos y Fray Luis Cáncer. En 1532, el breve In splendide die del Papa Clemente VII otorgó reconocimiento apostólico al Estudio General de los conventos de San Juan y Santo Domingo. A través de este desarrollo, es posible afirmar con razonable certeza que profesores formados en la Universidad de Salamanca participaron en los orígenes de la educación superior en América, particularmente en la isla La Española.
      </p>

      <p>
        Tras el año 1898, Puerto Rico se convirtió en un caso singular dentro del ámbito hispanoamericano: una sociedad católica e hispánica bajo la autoridad de una potencia anglosajona y protestante. Son pocos los casos comparables en el mundo —quizás Gibraltar, aunque con diferencias sustanciales. Ante esta circunstancia, León XIII tomó una decisión que resulta fundamental, aunque escasamente reconocida hoy. En 1903, mediante el breve apostólico Actum Praeclare, dispuso que la Provincia Eclesiástica de San Juan de Puerto Rico quedara directamente subordinada a la Santa Sede, preservando así su identidad eclesial hispánica frente a la influencia eclesiástica de los Estados Unidos. Esta medida no fue meramente simbólica: constituyó una afirmación estratégica de la pertenencia cultural, jurídica y espiritual de Puerto Rico al mundo hispánico.
      </p>

      <p>
        Durante el siglo XX, especialmente en el contexto de la Guerra Fría, la isla ofreció refugio económico y cultural a numerosos exiliados provenientes de Cuba, República Dominicana, Venezuela y España. En todos estos casos, Puerto Rico fue percibido como un espacio de libertad económica, estabilidad institucional y valores familiares. No obstante, persiste una paradoja: a pesar de su resistencia cultural al socialismo, la isla enfrenta hoy una economía debilitada, fuertemente dependiente de recursos federales, y una administración consciente de su propia fragilidad.
      </p>

      <p>
        Mucho se ha escrito sobre esta situación, pero se ha prestado poca atención a la perdurabilidad de los vínculos establecidos por León XIII entre Puerto Rico y Roma. Dichos lazos permiten afirmar que el desarrollo de Puerto Rico como territorio estadounidense ha transcurrido bajo una alianza —podría decirse “nupcial”— con la hispanidad, bendecida por León XIII. Esta unión, de carácter jurídico, cultural y espiritual, no fue una casualidad, sino una afirmación deliberada de identidad dentro de una nueva estructura política.
      </p>

      <p>
        Frente a los retos contemporáneos que el Papa León XIV comienza a señalar —la deshumanización de la economía, la fragilidad institucional, el vacío moral—, los principios que animaron a la Escuela de Salamanca y forjaron la tradición hispánica de la libertad siguen vigentes. Estos valores, que influyeron tanto en el constitucionalismo estadounidense como en el ethos puertorriqueño, podrían sustentar una nueva etapa de integración inteligente y estratégica entre Puerto Rico y el mundo. Dicha etapa exigiría una revitalización del tejido productivo local, el fomento de exportaciones y una participación más activa en los flujos económicos del Atlántico hispánico, preferentemente a través de alianzas público-privadas.
      </p>

      <p>
        En efecto, durante más de un siglo, Puerto Rico ha constituido —con sus dificultades y contradicciones— un refugio para quienes han buscado prosperar y vivir en paz, incluso en los momentos más críticos de la historia occidental contemporánea. Los problemas más acuciantes que enfrenta hoy —más allá de los apagones, aunque en parte vinculados a ellos— son análogos a los que atraviesan muchas otras sociedades occidentales. En este sentido, la experiencia puertorriqueña puede y debe ser comprendida desde una perspectiva más amplia, en la cual sus raíces hispánicas y su proyección atlántica desempeñan un papel central.
      </p>
    `,
      pt: `
      <p>
        La elección del Papa León XIV evocó inmediatamente la figura de León XIII, especialmente entre los católicos conscientes de la historia intelectual de la Iglesia. Fue precisamente León XIII quien, con la encíclica Rerum Novarum, inauguró un frente doctrinal contra los errores del socialismo y el desprecio por el orden natural. Considerada la primera encíclica social, esta constituyó un punto de inflexión para los católicos deseosos de articular una respuesta firme y coherente a los desafíos de la modernidad.
      </p>

      <p>
        Hoy, con el ascenso de León XIV, muchos observadores han señalado que Roma parece reanudar aquella misma batalla cultural e intelectual: el combate iniciado por León XIII no ha concluido. Persisten algunos de los desafíos entonces planteados, como la confrontación con el comunismo y sus ideologías afines —ahora enmascaradas en nuevas modas culturales—, el avance de tecnologías disruptivas (como la inteligencia artificial) y los riesgos para la paz y la prosperidad global. Frente a tales realidades, es imperativo recordar que el mundo continúa su curso y que, en ese movimiento, se requiere una balanza sostenida por los principios de la paz y la fraternidad universal. En ese sentido, podría afirmarse que, si de la paz se cosechan frutos, entonces —en términos morales— estamos también en presencia de una forma superior de mercado libre.
      </p>

      <p>
        Desde una perspectiva cristiana y humanista, se vuelve indispensable recurrir a una mirada más profunda, dotada de clarividencia, que permita reconocer los fundamentos intelectuales que legitiman la defensa del mercado libre. Tal es el legado de la Escuela de Salamanca, verdadero crisol de pensamiento jurídico, económico y moral en los albores de la modernidad. En esta institución se elaboraron los primeros conceptos modernos de derecho natural, comercio justo y soberanía, con una influencia decisiva en la configuración del orden político y jurídico internacional. Su huella se proyecta tanto en la formación de los Estados Unidos como —de forma menos conocida pero igualmente significativa— en la configuración histórico-cultural de Puerto Rico.
      </p>

      <p>
        En efecto, Puerto Rico mantiene vínculos directos con este legado a través del Convento de Santo Tomás de Aquino, fundado por frailes dominicos como Fray Antonio de Montesinos y Fray Luis Cáncer. En 1532, el breve In splendide die del Papa Clemente VII otorgó reconocimiento apostólico al Estudio General de los conventos de San Juan y Santo Domingo. A través de este desarrollo, es posible afirmar con razonable certeza que profesores formados en la Universidad de Salamanca participaron en los orígenes de la educación superior en América, particularmente en la isla La Española.
      </p>

      <p>
        Tras el año 1898, Puerto Rico se convirtió en un caso singular dentro del ámbito hispanoamericano: una sociedad católica e hispánica bajo la autoridad de una potencia anglosajona y protestante. Son pocos los casos comparables en el mundo —quizás Gibraltar, aunque con diferencias sustanciales. Ante esta circunstancia, León XIII tomó una decisión que resulta fundamental, aunque escasamente reconocida hoy. En 1903, mediante el breve apostólico Actum Praeclare, dispuso que la Provincia Eclesiástica de San Juan de Puerto Rico quedara directamente subordinada a la Santa Sede, preservando así su identidad eclesial hispánica frente a la influencia eclesiástica de los Estados Unidos. Esta medida no fue meramente simbólica: constituyó una afirmación estratégica de la pertenencia cultural, jurídica y espiritual de Puerto Rico al mundo hispánico.
      </p>

      <p>
        Durante el siglo XX, especialmente en el contexto de la Guerra Fría, la isla ofreció refugio económico y cultural a numerosos exiliados provenientes de Cuba, República Dominicana, Venezuela y España. En todos estos casos, Puerto Rico fue percibido como un espacio de libertad económica, estabilidad institucional y valores familiares. No obstante, persiste una paradoja: a pesar de su resistencia cultural al socialismo, la isla enfrenta hoy una economía debilitada, fuertemente dependiente de recursos federales, y una administración consciente de su propia fragilidad.
      </p>

      <p>
        Mucho se ha escrito sobre esta situación, pero se ha prestado poca atención a la perdurabilidad de los vínculos establecidos por León XIII entre Puerto Rico y Roma. Dichos lazos permiten afirmar que el desarrollo de Puerto Rico como territorio estadounidense ha transcurrido bajo una alianza —podría decirse “nupcial”— con la hispanidad, bendecida por León XIII. Esta unión, de carácter jurídico, cultural y espiritual, no fue una casualidad, sino una afirmación deliberada de identidad dentro de una nueva estructura política.
      </p>

      <p>
        Frente a los retos contemporáneos que el Papa León XIV comienza a señalar —la deshumanización de la economía, la fragilidad institucional, el vacío moral—, los principios que animaron a la Escuela de Salamanca y forjaron la tradición hispánica de la libertad siguen vigentes. Estos valores, que influyeron tanto en el constitucionalismo estadounidense como en el ethos puertorriqueño, podrían sustentar una nueva etapa de integración inteligente y estratégica entre Puerto Rico y el mundo. Dicha etapa exigiría una revitalización del tejido productivo local, el fomento de exportaciones y una participación más activa en los flujos económicos del Atlántico hispánico, preferentemente a través de alianzas público-privadas.
      </p>

      <p>
        En efecto, durante más de un siglo, Puerto Rico ha constituido —con sus dificultades y contradicciones— un refugio para quienes han buscado prosperar y vivir en paz, incluso en los momentos más críticos de la historia occidental contemporánea. Los problemas más acuciantes que enfrenta hoy —más allá de los apagones, aunque en parte vinculados a ellos— son análogos a los que atraviesan muchas otras sociedades occidentales. En este sentido, la experiencia puertorriqueña puede y debe ser comprendida desde una perspectiva más amplia, en la cual sus raíces hispánicas y su proyección atlántica desempeñan un papel central.
      </p>
    `
    },
    image: '/images/publications/puerto-rico.jpeg',
    isFeatured: true
  },
  {
    id: 4,
    slug: 'crecer-con-vargas-llosa',
    title: {
      es: 'Crecer con Vargas Llosa',
      en: 'Growing up with Vargas Llosa',
      pt: 'Crescer com Vargas Llosa'
    },
    author: 'Santiago Carranza-Vélez Chirinos',
    date: '16/04/2024',
    category: {
      es: 'Literatura',
      en: 'Literature',
      pt: 'Literatura'
    },
    excerpt: {
      es: '¿En qué momento se jodió el Perú? Un análisis sobre el impacto literario, intelectual y político de Mario Vargas Llosa y su legado en la construcción de una identidad mestiza e inclusiva.',
      en: 'When did Peru get messed up? An analysis of the literary, intellectual, and political impact of Mario Vargas Llosa and his legacy in building a mestizo and inclusive identity.',
      pt: 'Em que momento se estragou o Peru? Uma análise sobre o impacto literário, intelectual e político de Mario Vargas Llosa e o seu legado na construção de uma identidade mestiça e inclusiva.'
    },
    content: {
      es: `
      <p>
        «¿En qué momento se jodió el Perú?», se preguntaba Santiago Zavala en la primera página de la novela <i>Conversación en la Catedral</i>. Una pregunta hechizante, melancólica, de hastío existencial peruano, el <i>spleen</i> en palabras de Baudelaire, que Vargas Llosa imprimió en esa novela monumental y, sobre todo, clavó cual estaca en el pecho de todo peruano interesado en el porvenir de su país. Una pregunta sin respuesta definitiva, que ondea en la mente colectiva y resurge con frecuencia en la prensa, la cultura y la conversación. Una pregunta que será tan inmortal como su autor.
      </p>

      <blockquote>
        <p>“¡Si te sigues comportando así te voy a cambiar al Leoncio Prado!”</p>
      </blockquote>

      <p>
        Esta frase, de efecto neutralizador e inmediato, se escuchaba en mi familia y en muchas otras de Lima como una amenaza para los niños inquietos. Su verdadero peso se comprendía mejor cuando, ya en secundaria y por mandato del plan lector, leíamos <i>La ciudad y los perros</i>. Un libro duro, apasionante para un adolescente, que convertía aquella amenaza en narración: los dramas, la violencia, la traición, el autoritarismo y el despertar emocional dentro de un colegio militar. Vargas Llosa lograba algo singular: anticipar, a través de la ficción, los conflictos reales de nuestra adolescencia limeña.
      </p>

      <p>
        A medida que uno crecía, se abría el abanico de referencias, muchas con tonos más pícaros o perturbadores: <i>Pantaleón y las visitadoras</i>, <i>La casa verde</i>, <i>La tía Julia y el escribidor</i>. La literatura de Vargas Llosa estaba, por supuesto, inspirada en el Perú; pero lo más notable era que el Perú, país en el que la mitad de la población no lee un libro al año, había interiorizado su obra. No era raro escuchar alusiones a Lituma, al Zambo Ambrosio, a la niña mala o a Pies Dorados en conversaciones cotidianas. Vargas Llosa había narrado nuestro país con tanta precisión que lo había vuelto parte del habla.
      </p>

      <p>
        De niño vivía en Miraflores, ese distrito limeño colindante con el mar, perpetuamente cubierto de neblina, donde transcurren muchas escenas de la obra de Vargas Llosa. Me sorprendía que historias tan crudas —y para mí, tan cotidianas— despertaran interés en públicos internacionales. ¿Por qué Vargas Llosa, y no otros escritores que también retrataron Lima, Piura, la selva o el centro histórico, alcanzaba esa resonancia global?
      </p>

      <p>
        Las razones son muchas y, sin duda, incluyen su talento literario. Pero tengo una hipótesis: Vargas Llosa diseccionó la experiencia peruana de tal forma que la volvió universal. Capturó nuestras contradicciones y las proyectó al mundo con rigor narrativo y lucidez crítica. Supo ver más de lo que veíamos los peruanos comunes. Y esa, me parece, fue una de sus primeras lecciones: que desde el Perú también se puede tocar lo universal.
      </p>

      <p>
        Pero Vargas Llosa no se quedó en la literatura. Quiso transformar lo que había comprendido. Por eso fue también un intelectual público y, por un breve y turbulento periodo, político. Su evolución ideológica —de un socialcristianismo juvenil a un socialismo comprometido, y luego al liberalismo— ha sido objeto de críticas y elogios. Se le ha acusado de vehemencia, de elitismo, de inconsecuencia. Pero si algo se puede rescatar, es su inusual transparencia: Vargas Llosa fue uno de los pocos intelectuales peruanos que expuso sus ideas con claridad, sin medias tintas, sin máscaras. Y lo hizo, creo yo, siempre desde la convicción de que el Perú podía ser un país más libre y más justo.
      </p>

      <p>
        Su incursión en la política fue breve, idealista, y terminó con una derrota. Vargas Llosa propuso una utopía liberal en un entorno político dominado por el miedo, la corrupción y la desinformación. Perdió las elecciones, y su derrota abrió el paso a un régimen autoritario. Sin embargo, las ideas que defendió durante su campaña no se extinguieron: ayudaron a moldear el rumbo económico del país durante la década siguiente. La economía se liberalizó y, posteriormente, la política se redemocratizó. Ese era su proyecto: una democracia moderna con libertad económica, en un país históricamente estatista y autoritario. Aunque no lo eligieron, su influencia intelectual sobrevivió.
      </p>

      <p>
        Esa es la segunda lección que nos deja: la importancia de las ideas. Vargas Llosa entendió que, antes que las políticas públicas, vienen las conviciones. Y que un país que apuesta por la democracia liberal tiene mayores posibilidades de prosperar que uno que cae en el autoritarismo populista. Su legado político, más allá de sus errores, fue haber defendido ese principio con coherencia.
      </p>

      <p>
        La tercera gran lección fue la de la reconciliación nacional. En un Perú atravesado por heridas coloniales, raciales y culturales, Vargas Llosa defendió una identidad mestiza e inclusiva. Rechazó el indigenismo esencialista, no por negar al indígena, sino por negarse a congelarlo en el pasado. Y defendió el hispanismo no como imposición, sino como parte constitutiva de nuestra historia. Fue una postura polémica, sí, pero también valiente: apostó por un país que no tuviera que escoger entre sus raíces. Donde el quechua y Cervantes, la modernidad y la tradición, pudieran convivir.
      </p>

      <p>
        Esa visión, impopular en ciertos círculos, fue su apuesta por una nación más completa. Vargas Llosa nos dejó muchas lecciones, pero tres destacan con fuerza en su legado: la posibilidad de la universalidad desde la experiencia peruana, la defensa firme de una democracia liberal como base del desarrollo y, quizá la más profunda, una apuesta por la reconciliación nacional basada en el reconocimiento de nuestra complejidad histórica. Supo convertir nuestras tensiones —entre lo indígena y lo hispano, lo autoritario y lo democrático, lo local y lo universal— en materia literaria y reflexión política.
      </p>

      <p>
        Nos enseñó que el Perú podía ser pensado con libertad, sin nostalgias paralizantes ni rencores heredados, y que podíamos aspirar a un país donde la cultura fuera más fuerte que la exclusión. Crecer con Vargas Llosa fue, en el fondo, aprender que la crítica es una forma de amor, y que escribir sobre el Perú, con todas sus heridas abiertas, también puede ser un acto de esperanza.
      </p>
    `,
      en: `
      <p>
        «¿En qué momento se jodió el Perú?», se preguntaba Santiago Zavala en la primera página de la novela <i>Conversación en la Catedral</i>. Una pregunta hechizante, melancólica, de hastío existencial peruano, el <i>spleen</i> en palabras de Baudelaire, que Vargas Llosa imprimió en esa novela monumental y, sobre todo, clavó cual estaca en el pecho de todo peruano interesado en el porvenir de su país. Una pregunta sin respuesta definitiva, que ondea en la mente colectiva y resurge con frecuencia en la prensa, la cultura y la conversación. Una pregunta que será tan inmortal como su autor.
      </p>

      <blockquote>
        <p>“¡Si te sigues comportando así te voy a cambiar al Leoncio Prado!”</p>
      </blockquote>

      <p>
        Esta frase, de efecto neutralizador e inmediato, se escuchaba en mi familia y en muchas otras de Lima como una amenaza para los niños inquietos. Su verdadero peso se comprendía mejor cuando, ya en secundaria y por mandato del plan lector, leíamos <i>La ciudad y los perros</i>. Un libro duro, apasionante para un adolescente, que convertía aquella amenaza en narración: los dramas, la violencia, la traición, el autoritarismo y el despertar emocional dentro de un colegio militar. Vargas Llosa lograba algo singular: anticipar, a través de la ficción, los conflictos reales de nuestra adolescencia limeña.
      </p>

      <p>
        A medida que uno crecía, se abría el abanico de referencias, muchas con tonos más pícaros o perturbadores: <i>Pantaleón y las visitadoras</i>, <i>La casa verde</i>, <i>La tía Julia y el escribidor</i>. La literatura de Vargas Llosa estaba, por supuesto, inspirada en el Perú; pero lo más notable era que el Perú, país en el que la mitad de la población no lee un libro al año, había interiorizado su obra. No era raro escuchar alusiones a Lituma, al Zambo Ambrosio, a la niña mala o a Pies Dorados en conversaciones cotidianas. Vargas Llosa había narrado nuestro país con tanta precisión que lo había vuelto parte del habla.
      </p>

      <p>
        De niño vivía en Miraflores, ese distrito limeño colindante con el mar, perpetuamente cubierto de neblina, donde transcurren muchas escenas de la obra de Vargas Llosa. Me sorprendía que historias tan crudas —y para mí, tan cotidianas— despertaran interés en públicos internacionales. ¿Por qué Vargas Llosa, y no otros escritores que también retrataron Lima, Piura, la selva o el centro histórico, alcanzaba esa resonancia global?
      </p>

      <p>
        Las razones son muchas y, sin duda, incluyen su talento literario. Pero tengo una hipótesis: Vargas Llosa diseccionó la experiencia peruana de tal forma que la volvió universal. Capturó nuestras contradicciones y las proyectó al mundo con rigor narrativo y lucidez crítica. Supo ver más de lo que veíamos los peruanos comunes. Y esa, me parece, fue una de sus primeras lecciones: que desde el Perú también se puede tocar lo universal.
      </p>

      <p>
        Pero Vargas Llosa no se quedó en la literatura. Quiso transformar lo que había comprendido. Por eso fue también un intelectual público y, por un breve y turbulento periodo, político. Su evolución ideológica —de un socialcristianismo juvenil a un socialismo comprometido, y luego al liberalismo— ha sido objeto de críticas y elogios. Se le ha acusado de vehemencia, de elitismo, de inconsecuencia. Pero si algo se puede rescatar, es su inusual transparencia: Vargas Llosa fue uno de los pocos intelectuales peruanos que expuso sus ideas con claridad, sin medias tintas, sin máscaras. Y lo hizo, creo yo, siempre desde la convicción de que el Perú podía ser un país más libre y más justo.
      </p>

      <p>
        Su incursión en la política fue breve, idealista, y terminó con una derrota. Vargas Llosa propuso una utopía liberal en un entorno político dominado por el miedo, la corrupción y la desinformación. Perdió las elecciones, y su derrota abrió el paso a un régimen autoritario. Sin embargo, las ideas que defendió durante su campaña no se extinguieron: ayudaron a moldear el rumbo económico del país durante la década siguiente. La economía se liberalizó y, posteriormente, la política se redemocratizó. Ese era su proyecto: una democracia moderna con libertad económica, en un país históricamente estatista y autoritario. Aunque no lo eligieron, su influencia intelectual sobrevivió.
      </p>

      <p>
        Esa es la segunda lección que nos deja: la importancia de las ideas. Vargas Llosa entendió que, antes que las políticas públicas, vienen las conviciones. Y que un país que apuesta por la democracia liberal tiene mayores posibilidades de prosperar que uno que cae en el autoritarismo populista. Su legado político, más allá de sus errores, fue haber defendido ese principio con coherencia.
      </p>

      <p>
        La tercera gran lección fue la de la reconciliación nacional. En un Perú atravesado por heridas coloniales, raciales y culturales, Vargas Llosa defendió una identidad mestiza e inclusiva. Rechazó el indigenismo esencialista, no por negar al indígena, sino por negarse a congelarlo en el pasado. Y defendió el hispanismo no como imposición, sino como parte constitutiva de nuestra historia. Fue una postura polémica, sí, pero también valiente: apostó por un país que no tuviera que escoger entre sus raíces. Donde el quechua y Cervantes, la modernidad y la tradición, pudieran convivir.
      </p>

      <p>
        Esa visión, impopular en ciertos círculos, fue su apuesta por una nación más completa. Vargas Llosa nos dejó muchas lecciones, pero tres destacan con fuerza en su legado: la posibilidad de la universalidad desde la experiencia peruana, la defensa firme de una democracia liberal como base del desarrollo y, quizá la más profunda, una apuesta por la reconciliación nacional basada en el reconocimiento de nuestra complejidad histórica. Supo convertir nuestras tensiones —entre lo indígena y lo hispano, lo autoritario y lo democrático, lo local y lo universal— en materia literaria y reflexión política.
      </p>

      <p>
        Nos enseñó que el Perú podía ser pensado con libertad, sin nostalgias paralizantes ni rencores heredados, y que podíamos aspirar a un país donde la cultura fuera más fuerte que la exclusión. Crecer con Vargas Llosa fue, en el fondo, aprender que la crítica es una forma de amor, y que escribir sobre el Perú, con todas sus heridas abiertas, también puede ser un acto de esperanza.
      </p>
    `,
      pt: `
      <p>
        «¿En qué momento se jodió el Perú?», se preguntaba Santiago Zavala en la primera página de la novela <i>Conversación en la Catedral</i>. Una pregunta hechizante, melancólica, de hastío existencial peruano, el <i>spleen</i> en palabras de Baudelaire, que Vargas Llosa imprimió en esa novela monumental y, sobre todo, clavó cual estaca en el pecho de todo peruano interesado en el porvenir de su país. Una pregunta sin respuesta definitiva, que ondea en la mente colectiva y resurge con frecuencia en la prensa, la cultura y la conversación. Una pregunta que será tan inmortal como su autor.
      </p>

      <blockquote>
        <p>“¡Si te sigues comportando así te voy a cambiar al Leoncio Prado!”</p>
      </blockquote>

      <p>
        Esta frase, de efecto neutralizador e inmediato, se escuchaba en mi familia y en muchas otras de Lima como una amenaza para los niños inquietos. Su verdadero peso se comprendía mejor cuando, ya en secundaria y por mandato del plan lector, leíamos <i>La ciudad y los perros</i>. Un libro duro, apasionante para un adolescente, que convertía aquella amenaza en narración: los dramas, la violencia, la traición, el autoritarismo y el despertar emocional dentro de un colegio militar. Vargas Llosa lograba algo singular: anticipar, a través de la ficción, los conflictos reales de nuestra adolescencia limeña.
      </p>

      <p>
        A medida que uno crecía, se abría el abanico de referencias, muchas con tonos más pícaros o perturbadores: <i>Pantaleón y las visitadoras</i>, <i>La casa verde</i>, <i>La tía Julia y el escribidor</i>. La literatura de Vargas Llosa estaba, por supuesto, inspirada en el Perú; pero lo más notable era que el Perú, país en el que la mitad de la población no lee un libro al año, había interiorizado su obra. No era raro escuchar alusiones a Lituma, al Zambo Ambrosio, a la niña mala o a Pies Dorados en conversaciones cotidianas. Vargas Llosa había narrado nuestro país con tanta precisión que lo había vuelto parte del habla.
      </p>

      <p>
        De niño vivía en Miraflores, ese distrito limeño colindante con el mar, perpetuamente cubierto de neblina, donde transcurren muchas escenas de la obra de Vargas Llosa. Me sorprendía que historias tan crudas —y para mí, tan cotidianas— despertaran interés en públicos internacionales. ¿Por qué Vargas Llosa, y no otros escritores que también retrataron Lima, Piura, la selva o el centro histórico, alcanzaba esa resonancia global?
      </p>

      <p>
        Las razones son muchas y, sin duda, incluyen su talento literario. Pero tengo una hipótesis: Vargas Llosa diseccionó la experiencia peruana de tal forma que la volvió universal. Capturó nuestras contradicciones y las proyectó al mundo con rigor narrativo y lucidez crítica. Supo ver más de lo que veíamos los peruanos comunes. Y esa, me parece, fue una de sus primeras lecciones: que desde el Perú también se puede tocar lo universal.
      </p>

      <p>
        Pero Vargas Llosa no se quedó en la literatura. Quiso transformar lo que había comprendido. Por eso fue también un intelectual público y, por un breve y turbulento periodo, político. Su evolución ideológica —de un socialcristianismo juvenil a un socialismo comprometido, y luego al liberalismo— ha sido objeto de críticas y elogios. Se le ha acusado de vehemencia, de elitismo, de inconsecuencia. Pero si algo se puede rescatar, es su inusual transparencia: Vargas Llosa fue uno de los pocos intelectuales peruanos que expuso sus ideas con claridad, sin medias tintas, sin máscaras. Y lo hizo, creo yo, siempre desde la convicción de que el Perú podía ser un país más libre y más justo.
      </p>

      <p>
        Su incursión en la política fue breve, idealista, y terminó con una derrota. Vargas Llosa propuso una utopía liberal en un entorno político dominado por el miedo, la corrupción y la desinformación. Perdió las elecciones, y su derrota abrió el paso a un régimen autoritario. Sin embargo, las ideas que defendió durante su campaña no se extinguieron: ayudaron a moldear el rumbo económico del país durante la década siguiente. La economía se liberalizó y, posteriormente, la política se redemocratizó. Ese era su proyecto: una democracia moderna con libertad económica, en un país históricamente estatista y autoritario. Aunque no lo eligieron, su influencia intelectual sobrevivió.
      </p>

      <p>
        Esa es la segunda lección que nos deja: la importancia de las ideas. Vargas Llosa entendió que, antes que las políticas públicas, vienen las conviciones. Y que un país que apuesta por la democracia liberal tiene mayores posibilidades de prosperar que uno que cae en el autoritarismo populista. Su legado político, más allá de sus errores, fue haber defendido ese principio con coherencia.
      </p>

      <p>
        La tercera gran lección fue la de la reconciliación nacional. En un Perú atravesado por heridas coloniales, raciales y culturales, Vargas Llosa defendió una identidad mestiza e inclusiva. Rechazó el indigenismo esencialista, no por negar al indígena, sino por negarse a congelarlo en el pasado. Y defendió el hispanismo no como imposición, sino como parte constitutiva de nuestra historia. Fue una postura polémica, sí, pero también valiente: apostó por un país que no tuviera que escoger entre sus raíces. Donde el quechua y Cervantes, la modernidad y la tradición, pudieran convivir.
      </p>

      <p>
        Esa visión, impopular en ciertos círculos, fue su apuesta por una nación más completa. Vargas Llosa nos dejó muchas lecciones, pero tres destacan con fuerza en su legado: la posibilidad de la universalidad desde la experiencia peruana, la defensa firme de una democracia liberal como base del desarrollo y, quizá la más profunda, una apuesta por la reconciliación nacional basada en el reconocimiento de nuestra complejidad histórica. Supo convertir nuestras tensiones —entre lo indígena y lo hispano, lo autoritario y lo democrático, lo local y lo universal— en materia literaria y reflexión política.
      </p>

      <p>
        Nos enseñó que el Perú podía ser pensado con libertad, sin nostalgias paralizantes ni rencores heredados, y que podíamos aspirar a un país donde la cultura fuera más fuerte que la exclusión. Crecer con Vargas Llosa fue, en el fondo, aprender que la crítica es una forma de amor, y que escribir sobre el Perú, con todas sus heridas abiertas, también puede ser un acto de esperanza.
      </p>
    `
    },
    image: '/images/publications/vargas-llosa.jpg',
    isFeatured: false
  },
  {
    id: 5,
    slug: 'la-agitada-hispana',
    title: {
      es: 'La agitada hispana',
      en: 'The Agitated Hispanic Soul',
      pt: 'A agitada alma hispânica'
    },
    author: 'Manuel Lucena Giraldo',
    date: '23/12/2023',
    category: {
      es: 'Historia',
      en: 'History',
      pt: 'História'
    },
    excerpt: {
      es: 'Un ensayo de Manuel Lucena Giraldo que reflexiona sobre la memoria histórica, la herencia cultural y los desafíos contemporáneos del mundo hispánico.',
      en: 'An essay by Manuel Lucena Giraldo reflecting on historical memory, cultural heritage, and the contemporary challenges of the Hispanic world.',
      pt: 'Um ensaio de Manuel Lucena Giraldo que reflete sobre a memória histórica, a herança cultural e os desafios contemporâneos do mundo hispânico.'
    },
    content: {
      es: `
      <p>
        Dicen los que saben de conmemoraciones y celebraciones que, si una sociedad es ignorante respecto a su pasado, sustituye la historia, que sirve para restaurar la complejidad y alumbrar opciones de libertad, presentes y futuras, por una memoria mítica. Es decir, un relato ficcional que responde a intereses particulares, partitocráticos, demagógicos y populistas. La economía moral de este razonamiento no disimula la virtud momentánea que puede poseer la ficción: textual, en imágenes, en 3D, o producida por inteligencia artificial.
      </p>

      <p>
        En efecto, las virtudes del consumo cultural de este placebo son indiscutibles. El hecho de mirar para otro lado puede, hasta debe, resultar muy reconfortante. Sin embargo, tanto el efecto de purga que posee –la imaginación no resuelve los problemas, pero, mientras, nos tiene entretenidos–, como el relegamiento moral que implica, –pues la ficcionalización desarma vidas y haciendas, además de descomponer la meritocracia–, aumentan la zozobra.
      </p>

      <p>
        Ésta no desaparece nunca. «Lo que ocurre con nosotros (los hispanos) es que no sabemos lo que nos pasa», podríamos señalar, al tiempo que intentamos entender, es decir, ensayar, al modo de Montaigne y Ortega, algún punto de vista que alumbre algo distinto. Como se puede observar en los escritos que siguen, hay ciertos consensos entre los autores que llaman la atención.
      </p>

      <p>
        El primero tiene que ver con la evidencia de que en el pasado hubo algo que se hizo bien, que hicimos bien, a nivel global. La monarquía hispana de la primera globalización tuvo su dosis de milagro. En términos políticos y culturales funcionó. Por más que los mantras decimonónicos se empeñaran en acusarla de toda clase de desatinos, el destilado barroco en el que se concretó logró una cuadratura del círculo virtuosa y flexible. Lo suficiente para ir asimilando desde el siglo ilustrado componentes de jerarquía y orden no irreversibles, en el sentido de no ser constitucionalmente contradictorios. O si se quiere, con suficiente capacidad de autocorrección y reconversión. Esa modernidad, para entendernos, tan napolitana e iluminista, representó un proyecto imperial e ilustrado posible, convincente y operativo, dentro de lo real y no sólo de lo imaginedo. Sus élites de etnicidades diversas contaron con un arsenal de ideas capaz de disimular las rigideces, de asimilar que expresaban una voluntad divina y hasta de definir una forma de ser nación española europea y americana anterior a la que dictaron los nacionalismos etnicistas del siglo XIX.
      </p>

      <p>
        Duró hasta que llegó Napoleón y sus soldados mercenarios franceses, que liquidaron mediante una invasión destructiva la fábrica de la España imperial europea. Luego, la obligada y tortuosa independencia disgregadora en dos fases, de la América continental hasta 1825, de las provincias ultramarinas insulares en 1898, se verificó en un contexto guerracivilista inducido que expresó no el fracaso, sino la fragmentación previa de las élites imperiales españolas, irresponsables y cortoplacistas. Resulta fascinante, éste es otro argumento crucial que se evidencia en las líneas que siguen, que los nacionalismos fundacionales hispanos fueran tan convergentes. Tanto quienes diseñaron la España del siglo XIX, como los que fabricaron «del aire» las repúblicas de Chile o Venezuela, o el Imperio de México, partieron de materiales similares. Empeñados en parecer diferentes, en el atroz mundo competitivo de los imperialismos británico, francés, belga, estadounidense o alemán, optaron por la mímesis, la carrera supuestamente virtuosa para parecerse en algo automutilándose a modelos invencibles de capitalismo global competitivo. Estos han acabado por durar menos que el propio Imperio español. Al menos en su capacidad de representar una globalización ecuménica y no –tan– incendiaria.
      </p>

      <p>
        Al fin, debemos preguntarnos por los desarrollos recientes de tanta agitación hispana. El gran contraste entre la densidad y fortaleza de los vínculos históricos y culturales y la debilidad de las relaciones políticas, económicas y hasta simbólicas, apunta, sin novela que lo remedie, a un problema, que somos nosotros. A los términos de nuestra conversación y presencia globales. Somos comunidad, pero no sabemos cómo.
      </p>
    `,
      en: `
      <p>
        Dicen los que saben de conmemoraciones y celebraciones que, si una sociedad es ignorante respecto a su pasado, sustituye la historia, que sirve para restaurar la complejidad y alumbrar opciones de libertad, presentes y futuras, por una memoria mítica. Es decir, un relato ficcional que responde a intereses particulares, partitocráticos, demagógicos y populistas. La economía moral de este razonamiento no disimula la virtud momentánea que puede poseer la ficción: textual, en imágenes, en 3D, o producida por inteligencia artificial.
      </p>

      <p>
        En efecto, las virtudes del consumo cultural de este placebo son indiscutibles. El hecho de mirar para otro lado puede, hasta debe, resultar muy reconfortante. Sin embargo, tanto el efecto de purga que posee –la imaginación no resuelve los problemas, pero, mientras, nos tiene entretenidos–, como el relegamiento moral que implica, –pues la ficcionalización desarma vidas y haciendas, además de descomponer la meritocracia–, aumentan la zozobra.
      </p>

      <p>
        Ésta no desaparece nunca. «Lo que ocurre con nosotros (los hispanos) es que no sabemos lo que nos pasa», podríamos señalar, al tiempo que intentamos entender, es decir, ensayar, al modo de Montaigne y Ortega, algún punto de vista que alumbre algo distinto. Como se puede observar en los escritos que siguen, hay ciertos consensos entre los autores que llaman la atención.
      </p>

      <p>
        El primero tiene que ver con la evidencia de que en el pasado hubo algo que se hizo bien, que hicimos bien, a nivel global. La monarquía hispana de la primera globalización tuvo su dosis de milagro. En términos políticos y culturales funcionó. Por más que los mantras decimonónicos se empeñaran en acusarla de toda clase de desatinos, el destilado barroco en el que se concretó logró una cuadratura del círculo virtuosa y flexible. Lo suficiente para ir asimilando desde el siglo ilustrado componentes de jerarquía y orden no irreversibles, en el sentido de no ser constitucionalmente contradictorios. O si se quiere, con suficiente capacidad de autocorrección y reconversión. Esa modernidad, para entendernos, tan napolitana e iluminista, representó un proyecto imperial e ilustrado posible, convincente y operativo, dentro de lo real y no sólo de lo imaginedo. Sus élites de etnicidades diversas contaron con un arsenal de ideas capaz de disimular las rigideces, de asimilar que expresaban una voluntad divina y hasta de definir una forma de ser nación española europea y americana anterior a la que dictaron los nacionalismos etnicistas del siglo XIX.
      </p>

      <p>
        Duró hasta que llegó Napoleón y sus soldados mercenarios franceses, que liquidaron mediante una invasión destructiva la fábrica de la España imperial europea. Luego, la obligada y tortuosa independencia disgregadora en dos fases, de la América continental hasta 1825, de las provincias ultramarinas insulares en 1898, se verificó en un contexto guerracivilista inducido que expresó no el fracaso, sino la fragmentación previa de las élites imperiales españolas, irresponsables y cortoplacistas. Resulta fascinante, éste es otro argumento crucial que se evidencia en las líneas que siguen, que los nacionalismos fundacionales hispanos fueran tan convergentes. Tanto quienes diseñaron la España del siglo XIX, como los que fabricaron «del aire» las repúblicas de Chile o Venezuela, o el Imperio de México, partieron de materiales similares. Empeñados en parecer diferentes, en el atroz mundo competitivo de los imperialismos británico, francés, belga, estadounidense o alemán, optaron por la mímesis, la carrera supuestamente virtuosa para parecerse en algo automutilándose a modelos invencibles de capitalismo global competitivo. Estos han acabado por durar menos que el propio Imperio español. Al menos en su capacidad de representar una globalización ecuménica y no –tan– incendiaria.
      </p>

      <p>
        Al fin, debemos preguntarnos por los desarrollos recientes de tanta agitación hispana. El gran contraste entre la densidad y fortaleza de los vínculos históricos y culturales y la debilidad de las relaciones políticas, económicas y hasta simbólicas, apunta, sin novela que lo remedie, a un problema, que somos nosotros. A los términos de nuestra conversación y presencia globales. Somos comunidad, pero no sabemos cómo.
      </p>
    `,
      pt: `
      <p>
        Dicen los que saben de conmemoraciones y celebraciones que, si una sociedad es ignorante respecto a su pasado, sustituye la historia, que sirve para restaurar la complejidad y alumbrar opciones de libertad, presentes y futuras, por una memoria mítica. Es decir, un relato ficcional que responde a intereses particulares, partitocráticos, demagógicos y populistas. La economía moral de este razonamiento no disimula la virtud momentánea que puede poseer la ficción: textual, en imágenes, en 3D, o producida por inteligencia artificial.
      </p>

      <p>
        En efecto, las virtudes del consumo cultural de este placebo son indiscutibles. El hecho de mirar para otro lado puede, hasta debe, resultar muy reconfortante. Sin embargo, tanto el efecto de purga que posee –la imaginación no resuelve los problemas, pero, mientras, nos tiene entretenidos–, como el relegamiento moral que implica, –pues la ficcionalización desarma vidas y haciendas, además de descomponer la meritocracia–, aumentan la zozobra.
      </p>

      <p>
        Ésta no desaparece nunca. «Lo que ocurre con nosotros (los hispanos) es que no sabemos lo que nos pasa», podríamos señalar, al tiempo que intentamos entender, es decir, ensayar, al modo de Montaigne y Ortega, algún punto de vista que alumbre algo distinto. Como se puede observar en los escritos que siguen, hay ciertos consensos entre los autores que llaman la atención.
      </p>

      <p>
        El primero tiene que ver con la evidencia de que en el pasado hubo algo que se hizo bien, que hicimos bien, a nivel global. La monarquía hispana de la primera globalización tuvo su dosis de milagro. En términos políticos y culturales funcionó. Por más que los mantras decimonónicos se empeñaran en acusarla de toda clase de desatinos, el destilado barroco en el que se concretó logró una cuadratura del círculo virtuosa y flexible. Lo suficiente para ir asimilando desde el siglo ilustrado componentes de jerarquía y orden no irreversibles, en el sentido de no ser constitucionalmente contradictorios. O si se quiere, con suficiente capacidad de autocorrección y reconversión. Esa modernidad, para entendernos, tan napolitana e iluminista, representó un proyecto imperial e ilustrado posible, convincente y operativo, dentro de lo real y no sólo de lo imaginedo. Sus élites de etnicidades diversas contaron con un arsenal de ideas capaz de disimular las rigideces, de asimilar que expresaban una voluntad divina y hasta de definir una forma de ser nación española europea y americana anterior a la que dictaron los nacionalismos etnicistas del siglo XIX.
      </p>

      <p>
        Duró hasta que llegó Napoleón y sus soldados mercenarios franceses, que liquidaron mediante una invasión destructiva la fábrica de la España imperial europea. Luego, la obligada y tortuosa independencia disgregadora en dos fases, de la América continental hasta 1825, de las provincias ultramarinas insulares en 1898, se verificó en un contexto guerracivilista inducido que expresó no el fracaso, sino la fragmentación previa de las élites imperiales españolas, irresponsables y cortoplacistas. Resulta fascinante, éste es otro argumento crucial que se evidencia en las líneas que siguen, que los nacionalismos fundacionales hispanos fueran tan convergentes. Tanto quienes diseñaron la España del siglo XIX, como los que fabricaron «del aire» las repúblicas de Chile o Venezuela, o el Imperio de México, partieron de materiales similares. Empeñados en parecer diferentes, en el atroz mundo competitivo de los imperialismos británico, francés, belga, estadounidense o alemán, optaron por la mímesis, la carrera supuestamente virtuosa para parecerse en algo automutilándose a modelos invencibles de capitalismo global competitivo. Estos han acabado por durar menos que el propio Imperio español. Al menos en su capacidad de representar una globalización ecuménica y no –tan– incendiaria.
      </p>

      <p>
        Al fin, debemos preguntarnos por los desarrollos recientes de tanta agitación hispana. El gran contraste entre la densidad y fortaleza de los vínculos históricos y culturales y la debilidad de las relaciones políticas, económicas y hasta simbólicas, apunta, sin novela que lo remedie, a un problema, que somos nosotros. A los términos de nuestra conversación y presencia globales. Somos comunidad, pero no sabemos cómo.
      </p>
    `
    },
    image: '/images/publications/agitacion-hispana.jpg',
    isFeatured: false
  },
  {
    id: 6,
    slug: 'salamanca-y-el-nuevo-humanismo',
    title: {
      es: 'Salamanca y el nuevo humanismo',
      en: 'Salamanca and the New Humanism',
      pt: 'Salamanca e o novo humanismo'
    },
    author: 'Prof. Dr. D. José Carlos Martín de la Hoz',
    date: '05/12/2023',
    category: {
      es: 'Filosofía',
      en: 'Philosophy',
      pt: 'Filosofia'
    },
    excerpt: {
      es: 'Una reflexión profunda sobre el legado de la Escuela de Salamanca, Domingo de Soto y Francisco de Vitoria frente a los desafíos de la dignidad humana.',
      en: 'A profound reflection on the legacy of the School of Salamanca, Domingo de Soto, and Francisco de Vitoria in the face of human dignity challenges.',
      pt: 'Uma reflexão profunda sobre o legado da Escola de Salamanca, Domingo de Soto e Francisco de Vitoria face aos desafios da dignidade humana.'
    },
    content: {
      es: `
      <p>
        La presentación del reciente documento del Dicasterio de la Doctrina de la fe, “Dignitas infinita sobre la dignidad de la persona humana” (Roma, 8 de abril de 2024), ha puesto encima de la mesa del debate público el firme compromiso del pensamiento teológico con la dignidad de la persona humana como imagen y semejanza de Dios.
      </p>

      <p>
        El Prefecto del Dicasterio, el argentino cardenal Víctor Manuel Fernández, ha recordado en la presentación del documento, que el compromiso de la Iglesia incluye todos los hombres sin distinción de edad, país, clase, lengua, raza o religión. Es un compromiso eterno y lo seguirá siendo puesto que se trata de verdades perennes que sostienen la entera sociedad humana y la propia Iglesia.
      </p>

      <p>
        Precisamente, acabamos de celebrar los 75 años de la declaración universal de los derechos humanos (1948), redactada al término de dos guerras mundiales y de dos bombas atómicas en Nagasaki e Hiroshima y la dignidad de la persona humana se ha consolidado como base y fundamento de esos derechos y el camino para el discernimiento de nuevos derechos y para dirimir conflictos.
      </p>

      <p>
        Es interesante reparar en los sólidos fundamentos en los que se apoya esta declaración del magisterio ordinario de la Iglesia: la Sagrada Escritura, la Tradición de la Iglesia, la continuidad del Magisterio desde los orígenes hasta el papa Francisco y finalmente los argumentos teológicos y antropológicos que se han ido vertiendo en nuestro tiempo.
      </p>

      <p>
        Especialmente, vale la pena referirse a la Relección de Domingo de Soto pronunciada en 1555 que lleva por título “An liceat civitates infidelium seu gentilium expugnare ob idolatriam?”. En ella, el primer sucesor de Francisco de Vitoria en la Cátedra de Prima de Teología en la Universidad de Salamanca quien, exponía y desarrollaba la doctrina de Vitoria sobre la libertad de los indios como súbditos de la Corona de Castilla. Los argumentos de Domingo de Soto se complementan con los argumentos de Vitoria sobre la capacidad de gobernar y organizar sus tierras según las Leyes de indias como cualquier otro ciudadano del Imperio.
      </p>

      <p>
        Ante la insistencia del magisterio reciente de la Iglesia para denunciar todas las violaciones de la dignidad humana en un mundo globalizado, resuena fuerte en nuestros oídos las enseñanzas de Domingo de Soto sobre la libertad de los hombres para viajar por el mundo y asentarse en cualquier lugar de la creación y ejercer el dominio de las cosas creadas con dominio análogo al del Creador. Lógicamente, esto ahora tiene su complejidad.
      </p>

      <p>
        Asimismo, Domingo de Soto y los demás miembros de la Escuela de Salamanca, lucharán denodadamente con los impuestos reales y de los alcaldes y concejos de los reinos de Castilla por la sencilla razón de que eran conscientes de la penuria económica de los tiempos en que vivían. Cada impuesto que se concretaba en las Cortes era ampliamente debatido y acotado. Evidentemente, aquellos pensadores salmantinos veían también que había que poner límites al poder real y a su voracidad recaudatoria. Lógicamente, estas cuestiones cobraron realce con la llegada del metal americano.
      </p>

      <blockquote>
        <p>“la gracia no destruye la naturaleza, sino que la supone, las sana y la eleva” (Santo Tomás, Suma teológica, I-II, q. 110, a. 1).</p>
      </blockquote>

      <p>
        Inmediatamente, hemos de resaltar el sentido optimista que mostraban los salmantinos en todos sus escritos acerca de la naturaleza humana. Este era un asunto clave puesto que el ataque de Lutero a las buenas obras procedía del marcado carácter voluntarista y semipelagiano con el que algunos autores subrayaban el concepto de virtud, como si los hombres nos mereceríamos algo con nuestras pobres obras. Para lo cual bastaría con recordar las palabras de la Escritura: “siervos inútiles somos, solo hemos hecho lo que teníamos que hacer” (Lc 17, 10).
      </p>

      <p>
        Los apuntes de Francisco de Vitoria en sus Relecciones sobre los indios iban más allá de consideraciones piadosas respecto a los derechos de los indios, minoría de edad y necesidad de protección en derechos laborales, para, en cambio, ahondar en la dignidad de la persona humana.
      </p>

      <p>
        Precisamente, el tratado de Domingo de Soto “De natura et gratia” (Venecia 1545), resultó capital para dilucidar la cuestión. De hecho, la Sesión VI del Concilio recogida en el Decreto “De iustificatione”, remarca la misma relación entre naturaleza y gracia que había establecido Domingo de Soto casi con las mismas palabras y hace referencia al don de Dios de las bienaventuranzas y de la santidad.
      </p>

      <p>
        Lo que subrayarán los salmantinos no es tanto el esfuerzo personal, la lucha denodada por la santidad, como si la santidad fuera una cuestión de puños, sino que santo Tomás había puesto el acento en la palabra “habitus” y “habito operativo bueno”. Es decir, como fruto intrínseco en el alma, así como la ley sería extrínseca (Santo Tomás, Suma Teológica, I-II, q. 5, a. 5).
      </p>

      <p>
        Finalmente, el concepto de libertad de la Escuela de Salamanca en general y de Domingo de Soto en particular, resulta de una gran actualidad. Nuestro maestro recuerda que la libertad humana es creada, limitada en cuanto al ejercicio del libre albedrio y la capacidad de elegir, pero resulta infinita en cuanto a la fuerza de poner los medios en orden al último fin. Es decir, la energía de la libertad para amar a Dios y a los demás y construir una sociedad justa y solidaria.
      </p>

      <p>
        Es interesante caer en la cuenta de cómo ese concepto de libertad es propio de un nuevo humanismo, muy superior al humanismo renacentista que había comenzado poniendo al hombre en el centro de la costelación del pensamiento, como imagen y semejanza de Dios, para terminar haciendo de él un hombre, en la práctica, destinado a los placeres de la vida, a la contemplación del arte y la belleza y en definitiva a quedar abotargado por placeres sensibles que le distraían de la visión de eternidad y trascendencia.
      </p>

      <p>
        Efectivamente, Vitoria y la Escuela de Salamanca así como Erasmo de Rotterdam y Luis Vives, se alejaron de Lutero en cuanto este negó el concepto de libertad en su tratado “de servo arbitrio”. Todos los partidarios de la verdad, caminaron juntos a favor de lo que denominaba santo Tomás “la fuerza de la libertad”: “vis electiva mediorum servata ordine finis” (Santo Tomás, Suma Teológica I, q. 19, a. 10): la fuerza de elegir los medios en orden al último fin”.
      </p>

      <p>
        La autodeterminación al bien, es de tal energía y fuerza que Juan Pablo II en la Encíclica “Veritatis Splendor” (6.VIII.1993) nos hablará de la verdad como conformadora de la libertad. San Josemaría dará un paso más y denominará a la fuerza de la libertad la energía de la libertad. Finalmente, recogeremos el concepto de Edith Stein en su “teología crucis” cuando denominará a la libertad como el coraje de la libertad. Para amar a Dios y cambiar el mundo para iluminarlo desde dentro hace falta coraje y humildad.
      </p>

      <p>
        Si observamos el fin de la civilización del estado bienestar comprobaremos que se tambalea ya muy próximo al derrumbe, y destacaremos la injusta ineficacia de los agobiantes impuestos y la creciente pérdida de libertad en un mundo cada vez más desequilibrado. Al igual que la pérdida de la libertad derivó en el despotismo ilustrado que paralizó Europa, también nosotros padeceremos el zarpazo de las revoluciones sociales a no ser que derroquemos al estado absolutista que nos oprime y demos de nuevo aire a la iniciativa privada.
      </p>
    `,
      en: `
      <p>
        La presentación del reciente documento del Dicasterio de la Doctrina de la fe, “Dignitas infinita sobre la dignidad de la persona humana” (Roma, 8 de abril de 2024), ha puesto encima de la mesa del debate público el firme compromiso del pensamiento teológico con la dignidad de la persona humana como imagen y semejanza de Dios.
      </p>

      <p>
        El Prefecto del Dicasterio, el argentino cardenal Víctor Manuel Fernández, ha recordado en la presentación del documento, que el compromiso de la Iglesia incluye todos los hombres sin distinción de edad, país, clase, lengua, raza o religión. Es un compromiso eterno y lo seguirá siendo puesto que se trata de verdades perennes que sostienen la entera sociedad humana y la propia Iglesia.
      </p>

      <p>
        Precisamente, acabamos de celebrar los 75 años de la declaración universal de los derechos humanos (1948), redactada al término de dos guerras mundiales y de dos bombas atómicas en Nagasaki e Hiroshima y la dignidad de la persona humana se ha consolidado como base y fundamento de esos derechos y el camino para el discernimiento de nuevos derechos y para dirimir conflictos.
      </p>

      <p>
        Es interesante reparar en los sólidos fundamentos en los que se apoya esta declaración del magisterio ordinario de la Iglesia: la Sagrada Escritura, la Tradición de la Iglesia, la continuidad del Magisterio desde los orígenes hasta el papa Francisco y finalmente los argumentos teológicos y antropológicos que se han ido vertiendo en nuestro tiempo.
      </p>

      <p>
        Especialmente, vale la pena referirse a la Relección de Domingo de Soto pronunciada en 1555 que lleva por título “An liceat civitates infidelium seu gentilium expugnare ob idolatriam?”. En ella, el primer sucesor de Francisco de Vitoria en la Cátedra de Prima de Teología en la Universidad de Salamanca quien, exponía y desarrollaba la doctrina de Vitoria sobre la libertad de los indios como súbditos de la Corona de Castilla. Los argumentos de Domingo de Soto se complementan con los argumentos de Vitoria sobre la capacidad de gobernar y organizar sus tierras según las Leyes de indias como cualquier otro ciudadano del Imperio.
      </p>

      <p>
        Ante la insistencia del magisterio reciente de la Iglesia para denunciar todas las violaciones de la dignidad humana en un mundo globalizado, resuena fuerte en nuestros oídos las enseñanzas de Domingo de Soto sobre la libertad de los hombres para viajar por el mundo y asentarse en cualquier lugar de la creación y ejercer el dominio de las cosas creadas con dominio análogo al del Creador. Lógicamente, esto ahora tiene su complejidad.
      </p>

      <p>
        Asimismo, Domingo de Soto y los demás miembros de la Escuela de Salamanca, lucharán denodadamente con los impuestos reales y de los alcaldes y concejos de los reinos de Castilla por la sencilla razón de que eran conscientes de la penuria económica de los tiempos en que vivían. Cada impuesto que se concretaba en las Cortes era ampliamente debatido y acotado. Evidentemente, aquellos pensadores salmantinos veían también que había que poner límites al poder real y a su voracidad recaudatoria. Lógicamente, estas cuestiones cobraron realce con la llegada del metal americano.
      </p>

      <blockquote>
        <p>“la gracia no destruye la naturaleza, sino que la supone, las sana y la eleva” (Santo Tomás, Suma teológica, I-II, q. 110, a. 1).</p>
      </blockquote>

      <p>
        Inmediatamente, hemos de resaltar el sentido optimista que mostraban los salmantinos en todos sus escritos acerca de la naturaleza humana. Este era un asunto clave puesto que el ataque de Lutero a las buenas obras procedía del marcado carácter voluntarista y semipelagiano con el que algunos autores subrayaban el concepto de virtud, como si los hombres nos mereceríamos algo con nuestras pobres obras. Para lo cual bastaría con recordar las palabras de la Escritura: “siervos inútiles somos, solo hemos hecho lo que teníamos que hacer” (Lc 17, 10).
      </p>

      <p>
        Los apuntes de Francisco de Vitoria en sus Relecciones sobre los indios iban más allá de consideraciones piadosas respecto a los derechos de los indios, minoría de edad y necesidad de protección en derechos laborales, para, en cambio, ahondar en la dignidad de la persona humana.
      </p>

      <p>
        Precisamente, el tratado de Domingo de Soto “De natura et gratia” (Venecia 1545), resultó capital para dilucidar la cuestión. De hecho, la Sesión VI del Concilio recogida en el Decreto “De iustificatione”, remarca la misma relación entre naturaleza y gracia que había establecido Domingo de Soto casi con las mismas palabras y hace referencia al don de Dios de las bienaventuranzas y de la santidad.
      </p>

      <p>
        Lo que subrayarán los salmantinos no es tanto el esfuerzo personal, la lucha denodada por la santidad, como si la santidad fuera una cuestión de puños, sino que santo Tomás había puesto el acento en la palabra “habitus” y “habito operativo bueno”. Es decir, como fruto intrínseco en el alma, así como la ley sería extrínseca (Santo Tomás, Suma Teológica, I-II, q. 5, a. 5).
      </p>

      <p>
        Finalmente, el concepto de libertad de la Escuela de Salamanca en general y de Domingo de Soto en particular, resulta de una gran actualidad. Nuestro maestro recuerda que la libertad humana es creada, limitada en cuanto al ejercicio del libre albedrio y la capacidad de elegir, pero resulta infinita en cuanto a la fuerza de poner los medios en orden al último fin. Es decir, la energía de la libertad para amar a Dios y a los demás y construir una sociedad justa y solidaria.
      </p>

      <p>
        Es interesante caer en la cuenta de cómo ese concepto de libertad es propio de un nuevo humanismo, muy superior al humanismo renacentista que había comenzado poniendo al hombre en el centro de la costelación del pensamiento, como imagen y semejanza de Dios, para terminar haciendo de él un hombre, en la práctica, destinado a los placeres de la vida, a la contemplación del arte y la belleza y en definitiva a quedar abotargado por placeres sensibles que le distraían de la visión de eternidad y trascendencia.
      </p>

      <p>
        Efectivamente, Vitoria y la Escuela de Salamanca así como Erasmo de Rotterdam y Luis Vives, se alejaron de Lutero en cuanto este negó el concepto de libertad en su tratado “de servo arbitrio”. Todos los partidarios de la verdad, caminaron juntos a favor de lo que denominaba santo Tomás “la fuerza de la libertad”: “vis electiva mediorum servata ordine finis” (Santo Tomás, Suma Teológica I, q. 19, a. 10): la fuerza de elegir los medios en orden al último fin”.
      </p>

      <p>
        La autodeterminación al bien, es de tal energía y fuerza que Juan Pablo II en la Encíclica “Veritatis Splendor” (6.VIII.1993) nos hablará de la verdad como conformadora de la libertad. San Josemaría dará un paso más y denominará a la fuerza de la libertad la energía de la libertad. Finalmente, recogeremos el concepto de Edith Stein en su “teología crucis” cuando denominará a la libertad como el coraje de la libertad. Para amar a Dios y cambiar el mundo para iluminarlo desde dentro hace falta coraje y humildad.
      </p>

      <p>
        Si observamos el fin de la civilización del estado bienestar comprobaremos que se tambalea ya muy próximo al derrumbe, y destacaremos la injusta ineficacia de los agobiantes impuestos y la creciente pérdida de libertad en un mundo cada vez más desequilibrado. Al igual que la pérdida de la libertad derivó en el despotismo ilustrado que paralizó Europa, también nosotros padeceremos el zarpazo de las revoluciones sociales a no ser que derroquemos al estado absolutista que nos oprime y demos de nuevo aire a la iniciativa privada.
      </p>
    `,
      pt: `
      <p>
        La presentación del reciente documento del Dicasterio de la Doctrina de la fe, “Dignitas infinita sobre la dignidad de la persona humana” (Roma, 8 de abril de 2024), ha puesto encima de la mesa del debate público el firme compromiso del pensamiento teológico con la dignidad de la persona humana como imagen y semejanza de Dios.
      </p>

      <p>
        El Prefecto del Dicasterio, el argentino cardenal Víctor Manuel Fernández, ha recordado en la presentación del documento, que el compromiso de la Iglesia incluye todos los hombres sin distinción de edad, país, clase, lengua, raza o religión. Es un compromiso eterno y lo seguirá siendo puesto que se trata de verdades perennes que sostienen la entera sociedad humana y la propia Iglesia.
      </p>

      <p>
        Precisamente, acabamos de celebrar los 75 años de la declaración universal de los derechos humanos (1948), redactada al término de dos guerras mundiales y de dos bombas atómicas en Nagasaki e Hiroshima y la dignidad de la persona humana se ha consolidado como base y fundamento de esos derechos y el camino para el discernimiento de nuevos derechos y para dirimir conflictos.
      </p>

      <p>
        Es interesante reparar en los sólidos fundamentos en los que se apoya esta declaración del magisterio ordinario de la Iglesia: la Sagrada Escritura, la Tradición de la Iglesia, la continuidad del Magisterio desde los orígenes hasta el papa Francisco y finalmente los argumentos teológicos y antropológicos que se han ido vertiendo en nuestro tiempo.
      </p>

      <p>
        Especialmente, vale la pena referirse a la Relección de Domingo de Soto pronunciada en 1555 que lleva por título “An liceat civitates infidelium seu gentilium expugnare ob idolatriam?”. En ella, el primer sucesor de Francisco de Vitoria en la Cátedra de Prima de Teología en la Universidad de Salamanca quien, exponía y desarrollaba la doctrina de Vitoria sobre la libertad de los indios como súbditos de la Corona de Castilla. Los argumentos de Domingo de Soto se complementan con los argumentos de Vitoria sobre la capacidad de gobernar y organizar sus tierras según las Leyes de indias como cualquier otro ciudadano del Imperio.
      </p>

      <p>
        Ante la insistencia del magisterio reciente de la Iglesia para denunciar todas las violaciones de la dignidad humana en un mundo globalizado, resuena fuerte en nuestros oídos las enseñanzas de Domingo de Soto sobre la libertad de los hombres para viajar por el mundo y asentarse en cualquier lugar de la creación y ejercer el dominio de las cosas creadas con dominio análogo al del Creador. Lógicamente, esto ahora tiene su complejidad.
      </p>

      <p>
        Asimismo, Domingo de Soto y los demás miembros de la Escuela de Salamanca, lucharán denodadamente con los impuestos reales y de los alcaldes y concejos de los reinos de Castilla por la sencilla razón de que eran conscientes de la penuria económica de los tiempos en que vivían. Cada impuesto que se concretaba en las Cortes era ampliamente debatido y acotado. Evidentemente, aquellos pensadores salmantinos veían también que había que poner límites al poder real y a su voracidad recaudatoria. Lógicamente, estas cuestiones cobraron realce con la llegada del metal americano.
      </p>

      <blockquote>
        <p>“la gracia no destruye la naturaleza, sino que la supone, las sana y la eleva” (Santo Tomás, Suma teológica, I-II, q. 110, a. 1).</p>
      </blockquote>

      <p>
        Inmediatamente, hemos de resaltar el sentido optimista que mostraban los salmantinos en todos sus escritos acerca de la naturaleza humana. Este era un asunto clave puesto que el ataque de Lutero a las buenas obras procedía del marcado carácter voluntarista y semipelagiano con el que algunos autores subrayaban el concepto de virtud, como si los hombres nos mereceríamos algo con nuestras pobres obras. Para lo cual bastaría con recordar las palabras de la Escritura: “siervos inútiles somos, solo hemos hecho lo que teníamos que hacer” (Lc 17, 10).
      </p>

      <p>
        Los apuntes de Francisco de Vitoria en sus Relecciones sobre los indios iban más allá de consideraciones piadosas respecto a los derechos de los indios, minoría de edad y necesidad de protección en derechos laborales, para, en cambio, ahondar en la dignidad de la persona humana.
      </p>

      <p>
        Precisamente, el tratado de Domingo de Soto “De natura et gratia” (Venecia 1545), resultó capital para dilucidar la cuestión. De hecho, la Sesión VI del Concilio recogida en el Decreto “De iustificatione”, remarca la misma relación entre naturaleza y gracia que había establecido Domingo de Soto casi con las mismas palabras y hace referencia al don de Dios de las bienaventuranzas y de la santidad.
      </p>

      <p>
        Lo que subrayarán los salmantinos no es tanto el esfuerzo personal, la lucha denodada por la santidad, como si la santidad fuera una cuestión de puños, sino que santo Tomás había puesto el acento en la palabra “habitus” y “habito operativo bueno”. Es decir, como fruto intrínseco en el alma, así como la ley sería extrínseca (Santo Tomás, Suma Teológica, I-II, q. 5, a. 5).
      </p>

      <p>
        Finalmente, el concepto de libertad de la Escuela de Salamanca en general y de Domingo de Soto en particular, resulta de una gran actualidad. Nuestro maestro recuerda que la libertad humana es creada, limitada en cuanto al ejercicio del libre albedrio y la capacidad de elegir, pero resulta infinita en cuanto a la fuerza de poner los medios en orden al último fin. Es decir, la energía de la libertad para amar a Dios y a los demás y construir una sociedad justa y solidaria.
      </p>

      <p>
        Es interesante caer en la cuenta de cómo ese concepto de libertad es propio de un nuevo humanismo, muy superior al humanismo renacentista que había comenzado poniendo al hombre en el centro de la costelación del pensamiento, como imagen y semejanza de Dios, para terminar haciendo de él un hombre, en la práctica, destinado a los placeres de la vida, a la contemplación del arte y la belleza y en definitiva a quedar abotargado por placeres sensibles que le distraían de la visión de eternidad y trascendencia.
      </p>

      <p>
        Efectivamente, Vitoria y la Escuela de Salamanca así como Erasmo de Rotterdam y Luis Vives, se alejaron de Lutero en cuanto este negó el concepto de libertad en su tratado “de servo arbitrio”. Todos los partidarios de la verdad, caminaron juntos a favor de lo que denominaba santo Tomás “la fuerza de la libertad”: “vis electiva mediorum servata ordine finis” (Santo Tomás, Suma Teológica I, q. 19, a. 10): la fuerza de elegir los medios en orden al último fin”.
      </p>

      <p>
        La autodeterminación al bien, es de tal energía y fuerza que Juan Pablo II en la Encíclica “Veritatis Splendor” (6.VIII.1993) nos hablará de la verdad como conformadora de la libertad. San Josemaría dará un paso más y denominará a la fuerza de la libertad la energía de la libertad. Finalmente, recogeremos el concepto de Edith Stein en su “teología crucis” cuando denominará a la libertad como el coraje de la libertad. Para amar a Dios y cambiar el mundo para iluminarlo desde dentro hace falta coraje y humildad.
      </p>

      <p>
        Si observamos el fin de la civilización del estado bienestar comprobaremos que se tambalea ya muy próximo al derrumbe, y destacaremos la injusta ineficacia de los agobiantes impuestos y la creciente pérdida de libertad en un mundo cada vez más desequilibrado. Al igual que la pérdida de la libertad derivó en el despotismo ilustrado que paralizó Europa, también nosotros padeceremos el zarpazo de las revoluciones sociales a no ser que derroquemos al estado absolutista que nos oprime y demos de nuevo aire a la iniciativa privada.
      </p>
    `
    },
    image: '/images/publications/salamanca-humanismo.jpg',
    isFeatured: false
  },
  {
    id: 7,
    slug: 'la-mano-invisible-de-la-escuela-de-salamanca-thomas-jefferson-y-la-democracia-cervantina',
    title: {
      es: 'La mano invisible de la Escuela de Salamanca: Thomas Jefferson y la democracia cervantina',
      en: 'The Invisible Hand of the School of Salamanca: Thomas Jefferson and Cervantine Democracy',
      pt: 'A mão invisível da Escola de Salamanca: Thomas Jefferson e a democracia cervantina'
    },
    author: 'Eric-Clifford Graf',
    date: '25/10/2023',
    category: {
      es: 'Historia',
      en: 'History',
      pt: 'História'
    },
    excerpt: {
      es: 'La influencia de la Escuela de Salamanca y de Cervantes en Thomas Jefferson revela cómo el pensamiento hispánico moldeó los cimientos de la democracia norteamericana.',
      en: 'The influence of the School of Salamanca and Cervantes on Thomas Jefferson reveals how Hispanic thought shaped the foundations of American democracy.',
      pt: 'A influência da Escola de Salamanca e de Cervantes em Thomas Jefferson revela como o pensamento hispânico moldou os alicerces da democracia norte-americana.'
    },
    content: {
      es: `
      <p>
        La influencia de la Escuela de Salamanca y de Cervantes en Thomas Jefferson revela cómo la literatura y el pensamiento hispánico moldearon los cimientos de la democracia norteamericana.
      </p>

      <blockquote>
        <p>«Creo que con el tiempo mereceremos no tener gobiernos».</p>
        <cite>— Jorge Luis Borges</cite>
      </blockquote>

      <p>
        Me ratifico de nuevo. La novela de Miguel de Cervantes sigue ofreciéndonos la más simple y elegante manera de demostrar la influencia global de la Escuela de Salamanca. No obstante, sólo me puedo permitir decir eso porque el Fundador de EE. UU., Thomas Jefferson, también fue el mayor hispanista del país más libre de la historia de la humanidad. Y basta ya de chauvinismos. La trayectoria democrática que presento aquí es recíproca, transatlántica y transnacional. Es decir, Cervantes anticipó la esencia de Jefferson; y Jefferson reconoció la esencia de Cervantes.
      </p>

      <p>
        El legado estético de Jefferson—amante y artista romántico a la vez que estatista y jurista ilustrado—nos señala que la novela de Cervantes es la principal inspiración de su visión del futuro de EE. UU., un futuro que reconoció como inevitablemente hispanoamericano. Sin duda, escritores como Montesquieu y Montaigne fueron importantes para él y sus mejores amigos fueron francófilos y miembros de la aristocracia francesa liberal; pero Jefferson también nos señaló que Montesquieu tenía ciertos problemas teóricos y hemos de admitir que el mismo escepticismo de los ensayos de Montaigne se puede apreciar perfectamente en las novelas de Cervantes.
      </p>

      <p>
        Efectivamente, tanto en sus cartas personales como en su obra arquitectónica y en sus <i>Notas sobre el Estado de Virginia</i> (1787), las alusiones que el Fundador de la primera república americana hace al autor de la primera novela moderna no son casuales; son profundas y significativas.
      </p>

      <p>
        A lo largo de los últimos dos siglos la periódica resucitación y reivindicación de la Escuela de Salamanca ha sido una responsabilidad concedida mayormente a politólogos y economistas: Carl Menger, Joseph Schumpeter, Friedrich Hayek, Murray Rothbard y Marjorie Grice-Hutchinson, entre otros. El punto ciego de esa actividad siempre ha sido la historia de la novela. Ese potente conjunto de teólogos, economistas y políticos reformistas de los siglos XVI y XVII—tales luminarios como Vitoria, Las Casas, Azpilcueta, Molina, Mariana, Suárez y Palafox—son imprescindibles para entender que la temática y los principios de múltiples generaciones de pensadores católicos mediterráneos influyeron en la Ilustración escocesa de los siglos XVII y XVIII tanto como en la Escuela austríaca de los XIX y XX.
      </p>

      <p>
        Sin embargo, apuesto que novelistas como Fernando de Rojas (<i>La Celestina</i>, c. 1499), Diego Hurtado de Mendoza (<i>Lazarillo de Tormes</i>, c. 1554), Miguel de Cervantes (<i>Don Quijote de la Mancha</i>, 1605/15 y <i>Novelas ejemplares</i>, 1613) y María de Zayas (<i>Novelas amorosas</i>, 1637 y <i>Desengaños amorosos</i>, 1647) siempre serán más útiles para demostrar el alcance de las ideas charras.
      </p>

      <p>
        ¿Por qué insisto en la utilidad del arte por encima de la teoría económica y política? Dos razones: (1) La incertidumbre. En la medida en que, a toda diferencia de los economistas y politólogos positivistas, los liberales enfatizan la importancia de las soluciones independientes y espontáneas a los problemas de la vida por encima de las centralizadas bajo el mando de moralistas o tecnócratas, la novela es preferible a los tratados de economía política. (2) Realismo demográfico. Las ideas de los genios técnicos no suelen convencer a las masas comunes sin que haya algún matiz creativo. Si hemos de convencer al público y ganar la batalla cultural contra el colectivismo y el victimismo, deberíamos atender al lema horaciano de «docere delectando».
      </p>

      <p>
        Ahora bien, en la obra narrativa de Cervantes se lee una larga serie de reflexiones casuísticas sobre temas morales, políticos y económicos, reflexiones que se hacen eco de los juristas de la Escuela de Salamanca del Renacimiento ibérico a la vez que anticipan los principios del liberalismo clásico de los siglos XVIII y XIX. Unos pocos ejemplos: el comercio puede resolver los conflictos internacionales (<i>La española inglesa</i>), la raza no debería impactar en la política de una república moderna (<i>El coloquio de los perros</i>) y el valor material con frecuencia es algo íntimamente subjetivo (<i>Don Quijote</i>).
      </p>

      <p>
        Las cartas de Jefferson están llenas de referencias a <i>Don Quijote</i> (once en total, además de ocho cartas al respecto escritas por parte de miembros de su familia y otros conocidos). Incluso puede ser su obra literaria favorita. En unos casos, la alusión es metafórica, aunque no sin significado político. Así es, por ejemplo, el caso de su carta del 19 de julio de 1822 dirigida a Benjamin Waterhouse, en la que alude a la Primera Enmienda a la Constitución: «Don Quijote emprendió a reparar los errores corporales del mundo, pero la reparación de los caprichos mentales sería un trabajo más que quijotesco».
      </p>

      <p>
        En cuanto a su casa personal en Monticello, Cervantes hace alusión al laberinto metafórico de Sierra Morena en los episodios melodramáticos de la primera parte de Don Quijote. La estatua de Ariadne/Cleopatra en la entrada de la casa, el motivo de la cabeza de buey en la habitación principal y finalmente su estilo imperial mixto y asimétrico, todos esos detalles son indicaciones de que Jefferson, al igual que Cervantes, tenía en mente el laberinto de Creta como un símbolo del mestizaje entre Europa y África que quería fomentar en su propio país.
      </p>

      <p>
        Jefferson vio que los mundos mediterráneo, caribeño y latinoamericano nos modelan el mestizaje, es decir, nos ofrecen la perspectiva adecuada para desarticular una de las manías más destructivas de nuestra cultura. Si tengo razón, el hombre más responsable por el constitucionalismo norteamericano buscaba su alma en España, que no Francia. La democracia según Jefferson consiste en aprender del pasado y mirar hacia el futuro, y eso implica que Cervantes y tras él los moralistas, políticos y economistas de Salamanca son las fuentes de su pensamiento que más urgentemente nos quedan por desvelar.
      </p>

      <p>
        Es hora de salir de esa falsa realidad afrancesada, que además de ser fantasía anticuada es poco democrática, y sustituirla por el estudio del español, y no sólo como idioma de uso pragmático sino de valor filosófico, histórico y cultural. El español es parte integral de la actualidad y del futuro que vamos a vivir juntos en el mundo atlántico, y las grandes obras de Cervantes, Jefferson y Borges nos pueden ayudar a hacer realidad ese giro académico.
      </p>

      <hr />
      <h3>Obras citadas</h3>
      <ul class="biblio-list">
        <li>Cervantes, Miguel de. <i>Don Quijote de la Mancha</i>. Ed. Francisco Rico. Barcelona: Crítica, 1998.</li>
        <li>Graf, Eric-Clifford. <i>Anatomy of Liberty in Don Quijote de la Mancha</i>. Lanham, MD: Lexington Books, 2021.</li>
        <li>Herrero, Javier. “Sierra Morena as Labyrinth: From Wildness to Christian Knighthood.”<i>Critical Essays on Cervantes</i>. Ed. Ruth El Saffar. Boston: G. K. Hall, 1986. 67–80.</li>
        <li>Jefferson, Thomas. <i>Writings</i>. New York: Library of America, 2011.</li>
        <li>Escritos políticos. Ed. Antonio Escohotado. Madrid: Tecnos, 2014.</li>
        <li>Liggio, Leonard P. 1990. “The Hispanic Tradition of Liberty: The Road Not Taken in Latin America.” Lecture, Mont Pelerin Society Regional Meeting, Jan. 12, 1990, Antigua, Guatemala.</li>
      </ul>
    `,
      en: `
      <p>
        La influencia de la Escuela de Salamanca y de Cervantes en Thomas Jefferson revela cómo la literatura y el pensamiento hispánico moldearon los cimientos de la democracia norteamericana.
      </p>

      <blockquote>
        <p>«Creo que con el tiempo mereceremos no tener gobiernos».</p>
        <cite>— Jorge Luis Borges</cite>
      </blockquote>

      <p>
        Me ratifico de nuevo. La novela de Miguel de Cervantes sigue ofreciéndonos la más simple y elegante manera de demostrar la influencia global de la Escuela de Salamanca. No obstante, sólo me puedo permitir decir eso porque el Fundador de EE. UU., Thomas Jefferson, también fue el mayor hispanista del país más libre de la historia de la humanidad. Y basta ya de chauvinismos. La trayectoria democrática que presento aquí es recíproca, transatlántica y transnacional. Es decir, Cervantes anticipó la esencia de Jefferson; y Jefferson reconoció la esencia de Cervantes.
      </p>

      <p>
        El legado estético de Jefferson—amante y artista romántico a la vez que estatista y jurista ilustrado—nos señala que la novela de Cervantes es la principal inspiración de su visión del futuro de EE. UU., un futuro que reconoció como inevitablemente hispanoamericano. Sin duda, escritores como Montesquieu y Montaigne fueron importantes para él y sus mejores amigos fueron francófilos y miembros de la aristocracia francesa liberal; pero Jefferson también nos señaló que Montesquieu tenía ciertos problemas teóricos y hemos de admitir que el mismo escepticismo de los ensayos de Montaigne se puede apreciar perfectamente en las novelas de Cervantes.
      </p>

      <p>
        Efectivamente, tanto en sus cartas personales como en su obra arquitectónica y en sus <i>Notas sobre el Estado de Virginia</i> (1787), las alusiones que el Fundador de la primera república americana hace al autor de la primera novela moderna no son casuales; son profundas y significativas.
      </p>

      <p>
        A lo largo de los últimos dos siglos la periódica resucitación y reivindicación de la Escuela de Salamanca ha sido una responsabilidad concedida mayormente a politólogos y economistas: Carl Menger, Joseph Schumpeter, Friedrich Hayek, Murray Rothbard y Marjorie Grice-Hutchinson, entre otros. El punto ciego de esa actividad siempre ha sido la historia de la novela. Ese potente conjunto de teólogos, economistas y políticos reformistas de los siglos XVI y XVII—tales luminarios como Vitoria, Las Casas, Azpilcueta, Molina, Mariana, Suárez y Palafox—son imprescindibles para entender que la temática y los principios de múltiples generaciones de pensadores católicos mediterráneos influyeron en la Ilustración escocesa de los siglos XVII y XVIII tanto como en la Escuela austríaca de los XIX y XX.
      </p>

      <p>
        Sin embargo, apuesto que novelistas como Fernando de Rojas (<i>La Celestina</i>, c. 1499), Diego Hurtado de Mendoza (<i>Lazarillo de Tormes</i>, c. 1554), Miguel de Cervantes (<i>Don Quijote de la Mancha</i>, 1605/15 y <i>Novelas ejemplares</i>, 1613) y María de Zayas (<i>Novelas amorosas</i>, 1637 y <i>Desengaños amorosos</i>, 1647) siempre serán más útiles para demostrar el alcance de las ideas charras.
      </p>

      <p>
        ¿Por qué insisto en la utilidad del arte por encima de la teoría económica y política? Dos razones: (1) La incertidumbre. En la medida en que, a toda diferencia de los economistas y politólogos positivistas, los liberales enfatizan la importancia de las soluciones independientes y espontáneas a los problemas de la vida por encima de las centralizadas bajo el mando de moralistas o tecnócratas, la novela es preferible a los tratados de economía política. (2) Realismo demográfico. Las ideas de los genios técnicos no suelen convencer a las masas comunes sin que haya algún matiz creativo. Si hemos de convencer al público y ganar la batalla cultural contra el colectivismo y el victimismo, deberíamos atender al lema horaciano de «docere delectando».
      </p>

      <p>
        Ahora bien, en la obra narrativa de Cervantes se lee una larga serie de reflexiones casuísticas sobre temas morales, políticos y económicos, reflexiones que se hacen eco de los juristas de la Escuela de Salamanca del Renacimiento ibérico a la vez que anticipan los principios del liberalismo clásico de los siglos XVIII y XIX. Unos pocos ejemplos: el comercio puede resolver los conflictos internacionales (<i>La española inglesa</i>), la raza no debería impactar en la política de una república moderna (<i>El coloquio de los perros</i>) y el valor material con frecuencia es algo íntimamente subjetivo (<i>Don Quijote</i>).
      </p>

      <p>
        Las cartas de Jefferson están llenas de referencias a <i>Don Quijote</i> (once en total, además de ocho cartas al respecto escritas por parte de miembros de su familia y otros conocidos). Incluso puede ser su obra literaria favorita. En unos casos, la alusión es metafórica, aunque no sin significado político. Así es, por ejemplo, el caso de su carta del 19 de julio de 1822 dirigida a Benjamin Waterhouse, en la que alude a la Primera Enmienda a la Constitución: «Don Quijote emprendió a reparar los errores corporales del mundo, pero la reparación de los caprichos mentales sería un trabajo más que quijotesco».
      </p>

      <p>
        En cuanto a su casa personal en Monticello, Cervantes hace alusión al laberinto metafórico de Sierra Morena en los episodios melodramáticos de la primera parte de Don Quijote. La estatua de Ariadne/Cleopatra en la entrada de la casa, el motivo de la cabeza de buey en la habitación principal y finalmente su estilo imperial mixto y asimétrico, todos esos detalles son indicaciones de que Jefferson, al igual que Cervantes, tenía en mente el laberinto de Creta como un símbolo del mestizaje entre Europa y África que quería fomentar en su propio país.
      </p>

      <p>
        Jefferson vio que los mundos mediterráneo, caribeño y latinoamericano nos modelan el mestizaje, es decir, nos ofrecen la perspectiva adecuada para desarticular una de las manías más destructivas de nuestra cultura. Si tengo razón, el hombre más responsable por el constitucionalismo norteamericano buscaba su alma en España, que no Francia. La democracia según Jefferson consiste en aprender del pasado y mirar hacia el futuro, y eso implica que Cervantes y tras él los moralistas, políticos y economistas de Salamanca son las fuentes de su pensamiento que más urgentemente nos quedan por desvelar.
      </p>

      <p>
        Es hora de salir de esa falsa realidad afrancesada, que además de ser fantasía anticuada es poco democrática, y sustituirla por el estudio del español, y no sólo como idioma de uso pragmático sino de valor filosófico, histórico y cultural. El español es parte integral de la actualidad y del futuro que vamos a vivir juntos en el mundo atlántico, y las grandes obras de Cervantes, Jefferson y Borges nos pueden ayudar a hacer realidad ese giro académico.
      </p>

      <hr />
      <h3>Obras citadas</h3>
      <ul class="biblio-list">
        <li>Cervantes, Miguel de. <i>Don Quijote de la Mancha</i>. Ed. Francisco Rico. Barcelona: Crítica, 1998.</li>
        <li>Graf, Eric-Clifford. <i>Anatomy of Liberty in Don Quijote de la Mancha</i>. Lanham, MD: Lexington Books, 2021.</li>
        <li>Herrero, Javier. “Sierra Morena as Labyrinth: From Wildness to Christian Knighthood.”<i>Critical Essays on Cervantes</i>. Ed. Ruth El Saffar. Boston: G. K. Hall, 1986. 67–80.</li>
        <li>Jefferson, Thomas. <i>Writings</i>. New York: Library of America, 2011.</li>
        <li>Escritos políticos. Ed. Antonio Escohotado. Madrid: Tecnos, 2014.</li>
        <li>Liggio, Leonard P. 1990. “The Hispanic Tradition of Liberty: The Road Not Taken in Latin America.” Lecture, Mont Pelerin Society Regional Meeting, Jan. 12, 1990, Antigua, Guatemala.</li>
      </ul>
    `,
      pt: `
      <p>
        La influencia de la Escuela de Salamanca y de Cervantes en Thomas Jefferson revela cómo la literatura y el pensamiento hispánico moldearon los cimientos de la democracia norteamericana.
      </p>

      <blockquote>
        <p>«Creo que con el tiempo mereceremos no tener gobiernos».</p>
        <cite>— Jorge Luis Borges</cite>
      </blockquote>

      <p>
        Me ratifico de nuevo. La novela de Miguel de Cervantes sigue ofreciéndonos la más simple y elegante manera de demostrar la influencia global de la Escuela de Salamanca. No obstante, sólo me puedo permitir decir eso porque el Fundador de EE. UU., Thomas Jefferson, también fue el mayor hispanista del país más libre de la historia de la humanidad. Y basta ya de chauvinismos. La trayectoria democrática que presento aquí es recíproca, transatlántica y transnacional. Es decir, Cervantes anticipó la esencia de Jefferson; y Jefferson reconoció la esencia de Cervantes.
      </p>

      <p>
        El legado estético de Jefferson—amante y artista romántico a la vez que estatista y jurista ilustrado—nos señala que la novela de Cervantes es la principal inspiración de su visión del futuro de EE. UU., un futuro que reconoció como inevitablemente hispanoamericano. Sin duda, escritores como Montesquieu y Montaigne fueron importantes para él y sus mejores amigos fueron francófilos y miembros de la aristocracia francesa liberal; pero Jefferson también nos señaló que Montesquieu tenía ciertos problemas teóricos y hemos de admitir que el mismo escepticismo de los ensayos de Montaigne se puede apreciar perfectamente en las novelas de Cervantes.
      </p>

      <p>
        Efectivamente, tanto en sus cartas personales como en su obra arquitectónica y en sus <i>Notas sobre el Estado de Virginia</i> (1787), las alusiones que el Fundador de la primera república americana hace al autor de la primera novela moderna no son casuales; son profundas y significativas.
      </p>

      <p>
        A lo largo de los últimos dos siglos la periódica resucitación y reivindicación de la Escuela de Salamanca ha sido una responsabilidad concedida mayormente a politólogos y economistas: Carl Menger, Joseph Schumpeter, Friedrich Hayek, Murray Rothbard y Marjorie Grice-Hutchinson, entre otros. El punto ciego de esa actividad siempre ha sido la historia de la novela. Ese potente conjunto de teólogos, economistas y políticos reformistas de los siglos XVI y XVII—tales luminarios como Vitoria, Las Casas, Azpilcueta, Molina, Mariana, Suárez y Palafox—son imprescindibles para entender que la temática y los principios de múltiples generaciones de pensadores católicos mediterráneos influyeron en la Ilustración escocesa de los siglos XVII y XVIII tanto como en la Escuela austríaca de los XIX y XX.
      </p>

      <p>
        Sin embargo, apuesto que novelistas como Fernando de Rojas (<i>La Celestina</i>, c. 1499), Diego Hurtado de Mendoza (<i>Lazarillo de Tormes</i>, c. 1554), Miguel de Cervantes (<i>Don Quijote de la Mancha</i>, 1605/15 y <i>Novelas ejemplares</i>, 1613) y María de Zayas (<i>Novelas amorosas</i>, 1637 y <i>Desengaños amorosos</i>, 1647) siempre serán más útiles para demostrar el alcance de las ideas charras.
      </p>

      <p>
        ¿Por qué insisto en la utilidad del arte por encima de la teoría económica y política? Dos razones: (1) La incertidumbre. En la medida en que, a toda diferencia de los economistas y politólogos positivistas, los liberales enfatizan la importancia de las soluciones independientes y espontáneas a los problemas de la vida por encima de las centralizadas bajo el mando de moralistas o tecnócratas, la novela es preferible a los tratados de economía política. (2) Realismo demográfico. Las ideas de los genios técnicos no suelen convencer a las masas comunes sin que haya algún matiz creativo. Si hemos de convencer al público y ganar la batalla cultural contra el colectivismo y el victimismo, deberíamos atender al lema horaciano de «docere delectando».
      </p>

      <p>
        Ahora bien, en la obra narrativa de Cervantes se lee una larga serie de reflexiones casuísticas sobre temas morales, políticos y económicos, reflexiones que se hacen eco de los juristas de la Escuela de Salamanca del Renacimiento ibérico a la vez que anticipan los principios del liberalismo clásico de los siglos XVIII y XIX. Unos pocos ejemplos: el comercio puede resolver los conflictos internacionales (<i>La española inglesa</i>), la raza no debería impactar en la política de una república moderna (<i>El coloquio de los perros</i>) y el valor material con frecuencia es algo íntimamente subjetivo (<i>Don Quijote</i>).
      </p>

      <p>
        Las cartas de Jefferson están llenas de referencias a <i>Don Quijote</i> (once en total, además de ocho cartas al respecto escritas por parte de miembros de su familia y otros conocidos). Incluso puede ser su obra literaria favorita. En unos casos, la alusión es metafórica, aunque no sin significado político. Así es, por ejemplo, el caso de su carta del 19 de julio de 1822 dirigida a Benjamin Waterhouse, en la que alude a la Primera Enmienda a la Constitución: «Don Quijote emprendió a reparar los errores corporales del mundo, pero la reparación de los caprichos mentales sería un trabajo más que quijotesco».
      </p>

      <p>
        En cuanto a su casa personal en Monticello, Cervantes hace alusión al laberinto metafórico de Sierra Morena en los episodios melodramáticos de la primera parte de Don Quijote. La estatua de Ariadne/Cleopatra en la entrada de la casa, el motivo de la cabeza de buey en la habitación principal y finalmente su estilo imperial mixto y asimétrico, todos esos detalles son indicaciones de que Jefferson, al igual que Cervantes, tenía en mente el laberinto de Creta como un símbolo del mestizaje entre Europa y África que quería fomentar en su propio país.
      </p>

      <p>
        Jefferson vio que los mundos mediterráneo, caribeño y latinoamericano nos modelan el mestizaje, es decir, nos ofrecen la perspectiva adecuada para desarticular una de las manías más destructivas de nuestra cultura. Si tengo razón, el hombre más responsable por el constitucionalismo norteamericano buscaba su alma en España, que no Francia. La democracia según Jefferson consiste en aprender del pasado y mirar hacia el futuro, y eso implica que Cervantes y tras él los moralistas, políticos y economistas de Salamanca son las fuentes de su pensamiento que más urgentemente nos quedan por desvelar.
      </p>

      <p>
        Es hora de salir de esa falsa realidad afrancesada, que además de ser fantasía anticuada es poco democrática, y sustituirla por el estudio del español, y no sólo como idioma de uso pragmático sino de valor filosófico, histórico y cultural. El español es parte integral de la actualidad y del futuro que vamos a vivir juntos en el mundo atlántico, y las grandes obras de Cervantes, Jefferson y Borges nos pueden ayudar a hacer realidad ese giro académico.
      </p>

      <hr />
      <h3>Obras citadas</h3>
      <ul class="biblio-list">
        <li>Cervantes, Miguel de. <i>Don Quijote de la Mancha</i>. Ed. Francisco Rico. Barcelona: Crítica, 1998.</li>
        <li>Graf, Eric-Clifford. <i>Anatomy of Liberty in Don Quijote de la Mancha</i>. Lanham, MD: Lexington Books, 2021.</li>
        <li>Herrero, Javier. “Sierra Morena as Labyrinth: From Wildness to Christian Knighthood.”<i>Critical Essays on Cervantes</i>. Ed. Ruth El Saffar. Boston: G. K. Hall, 1986. 67–80.</li>
        <li>Jefferson, Thomas. <i>Writings</i>. New York: Library of America, 2011.</li>
        <li>Escritos políticos. Ed. Antonio Escohotado. Madrid: Tecnos, 2014.</li>
        <li>Liggio, Leonard P. 1990. “The Hispanic Tradition of Liberty: The Road Not Taken in Latin America.” Lecture, Mont Pelerin Society Regional Meeting, Jan. 12, 1990, Antigua, Guatemala.</li>
      </ul>
    `
    },
    image: '/images/publications/mano_invisible.jpg',
    isFeatured: false
  },
  {
    id: 8,
    slug: 'vigencia-contenido-hispanidad',
    title: {
      es: 'Vigencia y conexión de la Hispanidad',
      en: 'Relevance and Connection of Hispanicity',
      pt: 'Vigência e conexão da Hispanidade'
    },
    author: 'Gonzalo Vial Correa',
    date: '25/07/2023',
    category: {
      es: 'Actualidad',
      en: 'Current Affairs',
      pt: 'Atualidade'
    },
    excerpt: {
      es: 'El artículo analiza la vigencia de la Hispanidad según Ramiro de Maeztu y su legado espiritual y sus ideales de libertad.',
      en: 'The article analyzes the relevance of Hispanicity according to Ramiro de Maeztu and his spiritual legacy and ideals of liberty.',
      pt: 'O artigo analisa a vigência da Hispanidade segundo Ramiro de Maeztu e o seu legado espiritual e ideais de liberdade.'
    },
    content: {
      es: `
      <p>
        El próximo año se cumplirá un siglo del nacimiento de Ramiro de Maeztu (retratado en la imagen de esta publicación). Maeztu, asesinado en Madrid durante la guerra civil, en 1936, era un notable escritor vasco, algunos de cuyos ensayos —como el análisis y paralelo de don Juan, el Quijote y la Celestina— han llegado a ser clásicos en la literatura española del siglo XX.
      </p>

      <p>
        Siguiendo una línea casi invariable de los grandes vascos —desde San Ignacio hasta Unamuno— Maeztu, sin perder el amor extrañable hacia la patria chica, se identificó también espiritualmente con la patria grande. Como a don Miguel, “le dolió España”. Y de ella ascendió a un plano todavía más amplio, el de la Hispanidad.
      </p>

      <p>
        Por ésta entendía Maeztu la comunidad de los pueblos que habían recibido de España su forma de concebir la vida, o sea, una tradición de valores. Para el escritor vasco, España había construido “imago mundi” sintiendo, apasionadamente, la necesidad de juntar la fe y las obras. “La fe sin obras es fe muerta”, había escrito precisamente Santiago, el Apóstol de España.
      </p>

      <p>
        A través de los siglos, los españoles harían constante eco de esta afirmación. Hasta el momento en que se rompiera la Cristiandad con la Reforma. Y Maeztu recalaba que entonces había sido un teólogo español, Diego Laínez, el más ardiente defensor de la importancia de las obras para la salvación. La intervención de Laínez en tal sentido, en Trento, selló la neta diferencia doctrinaria con los protestantes en esta materia básica.
      </p>

      <p>
        Tan fuerte valoración de las obras conduce, unida a otras ideas también de raigambre cristiana, a afirmar en seguida la igualdad esencial y solidaridad permanente del género humano, de todos los hombres, cualesquiera que sean la raza, la nacionalidad o la condición social… “la unidad de las flores en el cuerpo de Cristo”, con las palabras de otro español de este siglo, el poeta Rosales.
      </p>

      <p>
        Y como la igualdad de los hombres supone, en cada uno de ellos, un tesoro de atributos que le son propios y exclusivos, y que por ende ningún otro hombre tiene derecho a violar, los pueblos hispánicos elaboran la teoría y el sistema de las libertades personales, que garantizan la preservación de aquellos atributos.
      </p>

      <p>
        Tales libertades deben ser respetadas, asimismo, por la autoridad. La sujeción de ésta —y de todos— a la ley, o sea el estado de derecho, forma igualmente parte, por ende, de esa “imago mundi” hispánica expresándose en el aforismo que se prolonga desde San Isidoro de Sevilla hasta el teatro del Siglo de Oro: “Rey serás si facieres derecho e si non facieres derecho non seras Rey”.
      </p>

      <p>
        En una etapa final de maduración, pensadores como Suárez y Vitoria traspasarían los conceptos anteriores desde el mundo de las personas individuales hasta el mundo de las naciones. Se incorporaría así al acervo de la Hispanidad la concepción de una comunidad internacional regida por normas éticas. Maeztu vació estas y otras ideas en un libro ensayo, “Defensa de la Hispanidad”, que tuvo un éxito instantáneo en todos los países de habla castellana.
      </p>

      <p>
        Por eso Jaime Eyzaguirre —que reconocía y respetaba la herencia espiritual de Maeztu— agregaba que él no era hispanista, sino “hispano”. “Ser hispanista es actitud del extraño que admira desde fuera los rasgos de la cultura ibérica. Ser hispano, para el chileno, es signo de filiación, no postura servil e imitativa”.
      </p>

      <p>
        Es imposible ser totalitario —sea marxista leninista, sea de los otros totalitarismos de raíz puramente hegeliana— y adherir a la Hispanidad. Porque esos totalitarismos tienen su propia “imago mundi” radicalmente anticristiana. Y ya hemos visto qué aquélla es, en esencia, tradición y acentuación de algunas ideas cristianas básicas. No faltan, tampoco, quienes creen ver en la Hispanidad un elemento étnico, hasta racista. No hay tal. Es una tradición espiritual: hombres de cualquiera raza pueden asumirla.
      </p>

      <p>
        ¿Vive hoy? ¿Cuál es su futuro? Por lo mismo que la Hispanidad es una realidad espiritual, sus ideales parecen, a veces, ser fantasmagorías. Sin embargo, si volvemos los ojos al momento histórico en que apareció “Defensa de la Hispanidad”, de Maeztu, comprobaremos la extraña fortaleza de esa “imago mundi”. Ha pasado casi medio siglo. Y podemos preguntarnos: ¿Qué se hizo el confiado optimismo yanki? “The american way of life”, el milenio nazi… ¿qué se hicieron?
      </p>

      <p>
        Al revés, muchos ideales de la Hispanidad —la igualdad racial, la comunidad de naciones basada en esa igualdad, la primacía de la libertad nacional y personal— cobran hoy extraordinaria fuerza. Los ejemplos de España y Brasil se presentan de inmediato a la mente. El porvenir de la Hispanidad está aquí: en progresar materialmente, pero dentro de su tradición de valores, de probada justicia; en conciliar la realidad temporal que se atraviesa con la realidad eterna que se espera.
      </p>
    `,
      en: `
      <p>
        El próximo año se cumplirá un siglo del nacimiento de Ramiro de Maeztu (retratado en la imagen de esta publicación). Maeztu, asesinado en Madrid durante la guerra civil, en 1936, era un notable escritor vasco, algunos de cuyos ensayos —como el análisis y paralelo de don Juan, el Quijote y la Celestina— han llegado a ser clásicos en la literatura española del siglo XX.
      </p>

      <p>
        Siguiendo una línea casi invariable de los grandes vascos —desde San Ignacio hasta Unamuno— Maeztu, sin perder el amor extrañable hacia la patria chica, se identificó también espiritualmente con la patria grande. Como a don Miguel, “le dolió España”. Y de ella ascendió a un plano todavía más amplio, el de la Hispanidad.
      </p>

      <p>
        Por ésta entendía Maeztu la comunidad de los pueblos que habían recibido de España su forma de concebir la vida, o sea, una tradición de valores. Para el escritor vasco, España había construido “imago mundi” sintiendo, apasionadamente, la necesidad de juntar la fe y las obras. “La fe sin obras es fe muerta”, había escrito precisamente Santiago, el Apóstol de España.
      </p>

      <p>
        A través de los siglos, los españoles harían constante eco de esta afirmación. Hasta el momento en que se rompiera la Cristiandad con la Reforma. Y Maeztu recalaba que entonces había sido un teólogo español, Diego Laínez, el más ardiente defensor de la importancia de las obras para la salvación. La intervención de Laínez en tal sentido, en Trento, selló la neta diferencia doctrinaria con los protestantes en esta materia básica.
      </p>

      <p>
        Tan fuerte valoración de las obras conduce, unida a otras ideas también de raigambre cristiana, a afirmar en seguida la igualdad esencial y solidaridad permanente del género humano, de todos los hombres, cualesquiera que sean la raza, la nacionalidad o la condición social… “la unidad de las flores en el cuerpo de Cristo”, con las palabras de otro español de este siglo, el poeta Rosales.
      </p>

      <p>
        Y como la igualdad de los hombres supone, en cada uno de ellos, un tesoro de atributos que le son propios y exclusivos, y que por ende ningún otro hombre tiene derecho a violar, los pueblos hispánicos elaboran la teoría y el sistema de las libertades personales, que garantizan la preservación de aquellos atributos.
      </p>

      <p>
        Tales libertades deben ser respetadas, asimismo, por la autoridad. La sujeción de ésta —y de todos— a la ley, o sea el estado de derecho, forma igualmente parte, por ende, de esa “imago mundi” hispánica expresándose en el aforismo que se prolonga desde San Isidoro de Sevilla hasta el teatro del Siglo de Oro: “Rey serás si facieres derecho e si non facieres derecho non seras Rey”.
      </p>

      <p>
        En una etapa final de maduración, pensadores como Suárez y Vitoria traspasarían los conceptos anteriores desde el mundo de las personas individuales hasta el mundo de las naciones. Se incorporaría así al acervo de la Hispanidad la concepción de una comunidad internacional regida por normas éticas. Maeztu vació estas y otras ideas en un libro ensayo, “Defensa de la Hispanidad”, que tuvo un éxito instantáneo en todos los países de habla castellana.
      </p>

      <p>
        Por eso Jaime Eyzaguirre —que reconocía y respetaba la herencia espiritual de Maeztu— agregaba que él no era hispanista, sino “hispano”. “Ser hispanista es actitud del extraño que admira desde fuera los rasgos de la cultura ibérica. Ser hispano, para el chileno, es signo de filiación, no postura servil e imitativa”.
      </p>

      <p>
        Es imposible ser totalitario —sea marxista leninista, sea de los otros totalitarismos de raíz puramente hegeliana— y adherir a la Hispanidad. Porque esos totalitarismos tienen su propia “imago mundi” radicalmente anticristiana. Y ya hemos visto qué aquélla es, en esencia, tradición y acentuación de algunas ideas cristianas básicas. No faltan, tampoco, quienes creen ver en la Hispanidad un elemento étnico, hasta racista. No hay tal. Es una tradición espiritual: hombres de cualquiera raza pueden asumirla.
      </p>

      <p>
        ¿Vive hoy? ¿Cuál es su futuro? Por lo mismo que la Hispanidad es una realidad espiritual, sus ideales parecen, a veces, ser fantasmagorías. Sin embargo, si volvemos los ojos al momento histórico en que apareció “Defensa de la Hispanidad”, de Maeztu, comprobaremos la extraña fortaleza de esa “imago mundi”. Ha pasado casi medio siglo. Y podemos preguntarnos: ¿Qué se hizo el confiado optimismo yanki? “The american way of life”, el milenio nazi… ¿qué se hicieron?
      </p>

      <p>
        Al revés, muchos ideales de la Hispanidad —la igualdad racial, la comunidad de naciones basada en esa igualdad, la primacía de la libertad nacional y personal— cobran hoy extraordinaria fuerza. Los ejemplos de España y Brasil se presentan de inmediato a la mente. El porvenir de la Hispanidad está aquí: en progresar materialmente, pero dentro de su tradición de valores, de probada justicia; en conciliar la realidad temporal que se atraviesa con la realidad eterna que se espera.
      </p>
    `,
      pt: `
      <p>
        El próximo año se cumplirá un siglo del nacimiento de Ramiro de Maeztu (retratado en la imagen de esta publicación). Maeztu, asesinado en Madrid durante la guerra civil, en 1936, era un notable escritor vasco, algunos de cuyos ensayos —como el análisis y paralelo de don Juan, el Quijote y la Celestina— han llegado a ser clásicos en la literatura española del siglo XX.
      </p>

      <p>
        Siguiendo una línea casi invariable de los grandes vascos —desde San Ignacio hasta Unamuno— Maeztu, sin perder el amor extrañable hacia la patria chica, se identificó también espiritualmente con la patria grande. Como a don Miguel, “le dolió España”. Y de ella ascendió a un plano todavía más amplio, el de la Hispanidad.
      </p>

      <p>
        Por ésta entendía Maeztu la comunidad de los pueblos que habían recibido de España su forma de concebir la vida, o sea, una tradición de valores. Para el escritor vasco, España había construido “imago mundi” sintiendo, apasionadamente, la necesidad de juntar la fe y las obras. “La fe sin obras es fe muerta”, había escrito precisamente Santiago, el Apóstol de España.
      </p>

      <p>
        A través de los siglos, los españoles harían constante eco de esta afirmación. Hasta el momento en que se rompiera la Cristiandad con la Reforma. Y Maeztu recalaba que entonces había sido un teólogo español, Diego Laínez, el más ardiente defensor de la importancia de las obras para la salvación. La intervención de Laínez en tal sentido, en Trento, selló la neta diferencia doctrinaria con los protestantes en esta materia básica.
      </p>

      <p>
        Tan fuerte valoración de las obras conduce, unida a otras ideas también de raigambre cristiana, a afirmar en seguida la igualdad esencial y solidaridad permanente del género humano, de todos los hombres, cualesquiera que sean la raza, la nacionalidad o la condición social… “la unidad de las flores en el cuerpo de Cristo”, con las palabras de otro español de este siglo, el poeta Rosales.
      </p>

      <p>
        Y como la igualdad de los hombres supone, en cada uno de ellos, un tesoro de atributos que le son propios y exclusivos, y que por ende ningún otro hombre tiene derecho a violar, los pueblos hispánicos elaboran la teoría y el sistema de las libertades personales, que garantizan la preservación de aquellos atributos.
      </p>

      <p>
        Tales libertades deben ser respetadas, asimismo, por la autoridad. La sujeción de ésta —y de todos— a la ley, o sea el estado de derecho, forma igualmente parte, por ende, de esa “imago mundi” hispánica expresándose en el aforismo que se prolonga desde San Isidoro de Sevilla hasta el teatro del Siglo de Oro: “Rey serás si facieres derecho e si non facieres derecho non seras Rey”.
      </p>

      <p>
        En una etapa final de maduración, pensadores como Suárez y Vitoria traspasarían los conceptos anteriores desde el mundo de las personas individuales hasta el mundo de las naciones. Se incorporaría así al acervo de la Hispanidad la concepción de una comunidad internacional regida por normas éticas. Maeztu vació estas y otras ideas en un libro ensayo, “Defensa de la Hispanidad”, que tuvo un éxito instantáneo en todos los países de habla castellana.
      </p>

      <p>
        Por eso Jaime Eyzaguirre —que reconocía y respetaba la herencia espiritual de Maeztu— agregaba que él no era hispanista, sino “hispano”. “Ser hispanista es actitud del extraño que admira desde fuera los rasgos de la cultura ibérica. Ser hispano, para el chileno, es signo de filiación, no postura servil e imitativa”.
      </p>

      <p>
        Es imposible ser totalitario —sea marxista leninista, sea de los otros totalitarismos de raíz puramente hegeliana— y adherir a la Hispanidad. Porque esos totalitarismos tienen su propia “imago mundi” radicalmente anticristiana. Y ya hemos visto qué aquélla es, en esencia, tradición y acentuación de algunas ideas cristianas básicas. No faltan, tampoco, quienes creen ver en la Hispanidad un elemento étnico, hasta racista. No hay tal. Es una tradición espiritual: hombres de cualquiera raza pueden asumirla.
      </p>

      <p>
        ¿Vive hoy? ¿Cuál es su futuro? Por lo mismo que la Hispanidad es una realidad espiritual, sus ideales parecen, a veces, ser fantasmagorías. Sin embargo, si volvemos los ojos al momento histórico en que apareció “Defensa de la Hispanidad”, de Maeztu, comprobaremos la extraña fortaleza de esa “imago mundi”. Ha pasado casi medio siglo. Y podemos preguntarnos: ¿Qué se hizo el confiado optimismo yanki? “The american way of life”, el milenio nazi… ¿qué se hicieron?
      </p>

      <p>
        Al revés, muchos ideales de la Hispanidad —la igualdad racial, la comunidad de naciones basada en esa igualdad, la primacía de la libertad nacional y personal— cobran hoy extraordinaria fuerza. Los ejemplos de España y Brasil se presentan de inmediato a la mente. El porvenir de la Hispanidad está aquí: en progresar materialmente, pero dentro de su tradición de valores, de probada justicia; en conciliar la realidad temporal que se atraviesa con la realidad eterna que se espera.
      </p>
    `
    },
    image: '/images/publications/vigencia-conexion-ramiromaeztu.jpg',
    isFeatured: false
  },
  {
    id: 9,
    slug: 'nace-la-escuela-hispanica',
    title: {
      es: 'Nace la Escuela Hispánica',
      en: 'The Hispanic School is Born',
      pt: 'Nasce a Escola Hispânica'
    },
    author: 'Juan Ángel Soto Gómez',
    authorImage: '/images/team/Juan-Angel-Soto-Gomez.webp',
    date: '01/05/2023',
    category: {
      es: 'Institucional',
      en: 'Institutional',
      pt: 'Institucional'
    },
    excerpt: {
      es: 'La Escuela Hispánica nace como una comunidad intelectual dedicada al redescubrimiento y actualización del legado de pensamiento compartido.',
      en: 'The Hispanic School is born as an intellectual community dedicated to the rediscovery and updating of the shared heritage of thought.',
      pt: 'A Escola Hispânica nasce como uma comunidade intelectual dedicada à redescoberta e atualização do legado de pensamento partilhado.'
    },
    content: {
      es: `
      <p>
        La Escuela Hispánica es una comunidad intelectual que contribuye al redescubrimiento de un legado de pensamiento del que España, Portugal e Iberoamérica son herederos. Nace de nuestra convicción en que el examen y comprensión de nuestro pasado y linaje intelectual comunes, con la mirada puesta en el futuro, contribuirá a un acercamiento entre nuestros países y aportará un gran valor al discurso político, al diálogo social y cultural, y al desarrollo de políticas públicas.
      </p>

      <p>
        Los que desde España, Portugal e Iberoamérica compartimos una visión humanista, hemos estado unidos desde hace mucho tiempo en nuestra oposición a las ideas contrarias a la libertad y el progreso de los pueblos. En particular, nos hemos enfrentado al comunismo, principal lacra de nuestra civilización.
      </p>

      <p>
        Sin embargo, nuestra defensa de la libertad, la vida y la dignidad de la persona; la búsqueda del florecimiento de nuestra civilización debe cimentarse sobre pilares más sólidos. Unos fundamentos que no consistan meramente en la oposición a un enemigo común, sino que esté arraigada en todo lo que compartimos.
      </p>

      <p>
        La historia, la tradición y la fe son algunos de estos pilares, pero también lo es un linaje de pensamiento político que, no siendo lineal ni ininterrumpido, queremos explorar y actualizar con el fin de que esta tradición esté también al servicio de nuestras sociedades y de la clase política. Se trata de un legado intelectual del que portugueses, españoles y las naciones de Iberoamérica somos herederos y que tiene un valor tan incalculable como desconocido, eclipsado por el predominio de la tradición anglosajona y de una Leyenda Negra que tanto daño y división ha causado.
      </p>

      <p>
        Para lograr que nuestra visión se materialice necesitamos contar con organizaciones y personas que destacan por su defensa de esta visión y su trabajo en este campo. Es por esto por lo que te invitamos a que te sumes a la Escuela Hispánica.
      </p>
    `,
      en: `
      <p>
        La Escuela Hispánica es una comunidad intelectual que contribuye al redescubrimiento de un legado de pensamiento del que España, Portugal e Iberoamérica son herederos. Nace de nuestra convicción en que el examen y comprensión de nuestro pasado y linaje intelectual comunes, con la mirada puesta en el futuro, contribuirá a un acercamiento entre nuestros países y aportará un gran valor al discurso político, al diálogo social y cultural, y al desarrollo de políticas públicas.
      </p>

      <p>
        Los que desde España, Portugal e Iberoamérica compartimos una visión humanista, hemos estado unidos desde hace mucho tiempo en nuestra oposición a las ideas contrarias a la libertad y el progreso de los pueblos. En particular, nos hemos enfrentado al comunismo, principal lacra de nuestra civilización.
      </p>

      <p>
        Sin embargo, nuestra defensa de la libertad, la vida y la dignidad de la persona; la búsqueda del florecimiento de nuestra civilización debe cimentarse sobre pilares más sólidos. Unos fundamentos que no consistan meramente en la oposición a un enemigo común, sino que esté arraigada en todo lo que compartimos.
      </p>

      <p>
        La historia, la tradición y la fe son algunos de estos pilares, pero también lo es un linaje de pensamiento político que, no siendo lineal ni ininterrumpido, queremos explorar y actualizar con el fin de que esta tradición esté también al servicio de nuestras sociedades y de la clase política. Se trata de un legado intelectual del que portugueses, españoles y las naciones de Iberoamérica somos herederos y que tiene un valor tan incalculable como desconocido, eclipsado por el predominio de la tradición anglosajona y de una Leyenda Negra que tanto daño y división ha causado.
      </p>

      <p>
        Para lograr que nuestra visión se materialice necesitamos contar con organizaciones y personas que destacan por su defensa de esta visión y su trabajo en este campo. Es por esto por lo que te invitamos a que te sumes a la Escuela Hispánica.
      </p>
    `,
      pt: `
      <p>
        La Escuela Hispánica es una comunidad intelectual que contribuye al redescubrimiento de un legado de pensamiento del que España, Portugal e Iberoamérica son herederos. Nace de nuestra convicción en que el examen y comprensión de nuestro pasado y linaje intelectual comunes, con la mirada puesta en el futuro, contribuirá a un acercamiento entre nuestros países y aportará un gran valor al discurso político, al diálogo social y cultural, y al desarrollo de políticas públicas.
      </p>

      <p>
        Los que desde España, Portugal e Iberoamérica compartimos una visión humanista, hemos estado unidos desde hace mucho tiempo en nuestra oposición a las ideas contrarias a la libertad y el progreso de los pueblos. En particular, nos hemos enfrentado al comunismo, principal lacra de nuestra civilización.
      </p>

      <p>
        Sin embargo, nuestra defensa de la libertad, la vida y la dignidad de la persona; la búsqueda del florecimiento de nuestra civilización debe cimentarse sobre pilares más sólidos. Unos fundamentos que no consistan meramente en la oposición a un enemigo común, sino que esté arraigada en todo lo que compartimos.
      </p>

      <p>
        La historia, la tradición y la fe son algunos de estos pilares, pero también lo es un linaje de pensamiento político que, no siendo lineal ni ininterrumpido, queremos explorar y actualizar con el fin de que esta tradición esté también al servicio de nuestras sociedades y de la clase política. Se trata de un legado intelectual del que portugueses, españoles y las naciones de Iberoamérica somos herederos y que tiene un valor tan incalculable como desconocido, eclipsado por el predominio de la tradición anglosajona y de una Leyenda Negra que tanto daño y división ha causado.
      </p>

      <p>
        Para lograr que nuestra visión se materialice necesitamos contar con organizaciones y personas que destacan por su defensa de esta visión y su trabajo en este campo. Es por esto por lo que te invitamos a que te sumes a la Escuela Hispánica.
      </p>
    `
    },
    image: '/images/publications/escuela_hispanica.png',
    isFeatured: false
  }
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug);
}

export function getArticleById(id: number): Article | undefined {
  return articles.find(article => article.id === id);
}

export function getArticlesByCategory(category: string): Article[] {
  // Use 'es' for comparison with the incoming category string
  return articles.filter(article => {
    if (typeof article.category === 'string') {
      return article.category === category;
    }
    return article.category.es === category;
  });
}

export function getFeaturedArticles(): Article[] {
  return articles.filter(article => article.isFeatured);
}

export function getLatestArticles(count: number = 4): Article[] {
  // Sort by date (most recent first) - assuming DD/MM/YYYY format
  const sorted = [...articles].sort((a, b) => {
    const parseDate = (dateStr: string) => {
      const [day, month, year] = dateStr.split('/').map(Number);
      return new Date(year, month - 1, day).getTime();
    };
    return parseDate(b.date) - parseDate(a.date);
  });
  return sorted.slice(0, count);
}
