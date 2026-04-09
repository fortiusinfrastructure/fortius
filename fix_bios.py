import json
import os

def update_json(lang, authors_data):
    file_path = f"apps/web-escuela-hispanica/src/messages/{lang}.json"
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    for key, val in authors_data.items():
        data["Biografias"]["authors"][key] = val
        
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

# Correct Spanish content from MD
es_data = {
    "nogueira": {
        "name": "Jaime Nogueira Pinto",
        "period": "1946–",
        "nationality": "Portugal",
        "shortBio": "Jaime Nogueira Pinto nació en Lisboa en 1946. Es uno de los ensayistas, historiadores de las ideas y analistas políticos portugueses más influyentes de la segunda mitad del siglo XX y comienzos del XXI. Licenciado en Derecho por la Universidade de Lisboa, desarrolló una intensa actividad intelectual como profesor, conferenciante y director de instituciones culturales, destacando su papel como director del Instituto de Estudos Políticos de la Universidade Católica Portuguesa durante varios años.\nSu obra se sitúa en la tradición del conservadurismo europeo, pero con una fuerte conciencia de la especificidad histórica luso-hispánica. A diferencia de los conservadurismos puramente nacional-estatales del siglo XX, Nogueira Pinto ha defendido una concepción histórica y civilizacional de Portugal inscrita en un marco atlántico y peninsular más amplio.\nEntre sus obras más destacadas se encuentran *Ideologia e Razão de Estado* (1976), *Portugal Contemporâneo* (1985), *A Direita e as Direitas* (1996) y *Novos Portugueses* (2009). También es autor de *Nação e Defesa* y de numerosos ensayos sobre historia política, geopolítica e identidad europea.\nFilosóficamente, su pensamiento gira en torno a una distinción clásica entre poder y legitimidad. Para Nogueira Pinto, el Estado moderno tiende a absolutizar la soberanía y a desvincularla de cualquier orden moral previo. Frente a ello, reivindica una concepción histórica del poder como realidad limitada por tradiciones, cuerpos intermedios, comunidad cultural y herencia jurídica. Esta perspectiva lo aproxima indirectamente a la tradición escolástica ibérica, en la que el poder no es fuente de derecho sino instrumento subordinado a un orden moral objetivo.",
        "contribution": "Reivindica una concepción histórica del poder limitado por tradiciones y cuerpos intermedios frente al estatismo moderno, conectando la identidad luso-hispánica con la tradición del derecho natural objetivo."
    },
    "huerta": {
        "name": "Jesús Huerta de Soto",
        "period": "1956–",
        "nationality": "España",
        "shortBio": "Jesús Huerta de Soto nació en Madrid en 1956 y es catedrático de Economía Política en la Universidad Rey Juan Carlos. Discípulo intelectual de la Escuela Austriaca de Economía, especialmente de Mises y Hayek, su contribución principal ha sido mostrar que muchas de las tesis consideradas características del liberalismo moderno ya estaban formuladas por la escolástica hispánica.\nEn *Money, Bank Credit and Economic Cycles* (1998) y en numerosos estudios históricos sostiene que autores de la Escuela de Salamanca habían desarrollado una teoría monetaria y bancaria sorprendentemente sofisticada: la inflación como impuesto oculto, la ilegitimidad de la manipulación monetaria y la función moral de la propiedad privada. Para Huerta de Soto, el mercado no es un mecanismo técnico, sino un proceso social espontáneo derivado de la libertad humana, exactamente como lo entendían los juristas salmantinos.\nSu tesis central es histórica y filosófica a la vez: el liberalismo no nace contra la tradición católica europea, sino dentro de ella. El constitucionalismo limitado y la economía de mercado serían la secularización institucional de principios previamente elaborados por el derecho natural escolástico.",
        "contribution": "Demuestra la genealogía hispánica del liberalismo económico, vinculando la Escuela Austriaca con la Escuela de Salamanca, especialmente en la defensa del mercado como orden espontáneo y la crítica a la inflación como violación de la justicia."
    },
    "olavo": {
        "name": "Olavo de Carvalho",
        "period": "1947–2022",
        "nationality": "Brasil",
        "shortBio": "Olavo Luiz Pimentel de Carvalho nació en Campinas (Brasil) el 29 de abril de 1947 y murió en Richmond (Virginia, EE. UU.) el 24 de enero de 2022. Periodista, ensayista y autodidacta en filosofía, desarrolló la mayor parte de su obra fuera de la universidad, pero ejerció una influencia cultural considerable en Brasil y en sectores del debate político iberoamericano contemporáneo.\nSu obra central, *O Jardim das Aflições* (1995), ya contiene la intuición que recorrerá toda su producción: la modernidad política ha separado la vida intelectual de la experiencia moral y ha convertido la política en técnica de poder. En textos posteriores como *O Imbecil Coletivo* (1996) y *O Mínimo que você precisa saber para no ser un idiota* (2013), defendió que la cultura occidental sólo puede sostener la libertad si mantiene una noción objetiva de verdad.\nAunque Olavo no se presentó como escolástico, su pensamiento se sitúa dentro de una misma estructura intelectual. Su crítica al positivismo reproduce la distinción clásica entre legalidad y legitimidad desarrollada por la tradición del derecho natural ibérico. La política, para él, no crea el orden moral; debe reconocerlo. Su insistencia en que la conciencia personal y la verdad objetiva preceden a cualquier orden político recuerda la doctrina según la cual el poder es fiduciario.",
        "contribution": "Recuperó en el debate público contemporáneo la distinción clásica entre legalidad y legitimidad, defendiendo que la libertad política depende de una cultura filosófica que reconozca límites morales objetivos al poder."
    },
    "scott": {
        "name": "James Brown Scott",
        "period": "1866–1943",
        "nationality": "Estados Unidos",
        "shortBio": "El jurista norteamericano James Brown Scott fue el primer gran académico anglosajón en recuperar sistemáticamente a Francisco de Vitoria. En *The Spanish Origin of International Law: Francisco de Vitoria and His Law of Nations* (1934) y *The Catholic Conception of International Law* (1934), defendió que el derecho internacional no nace con Grocio sino con la Escuela de Salamanca.",
        "contribution": "Identificó a la Escuela de Salamanca como el verdadero origen del derecho internacional moderno, influyendo decisivamente en la historiografía jurídica angloamericana."
    },
    "schmitt": {
        "name": "Carl Schmitt",
        "period": "1888–1985",
        "nationality": "Alemania",
        "shortBio": "En *Politische Theologie* (1922) y *Der Nomos der Erde* (1950), Schmitt critica la ficción moderna de la soberanía ilimitada del Estado. Reconoce que el orden político europeo premoderno no funcionaba sobre soberanía absoluta, sino sobre jurisdicciones, fueros y autoridad limitada, modelo que coincide con la teoría escolástica del poder delegado.",
        "contribution": "Confirmó históricamente la existencia de un orden jurídico clásico europeo donde el poder no era originario ni ilimitado, reconociendo la relevancia de la arquitectura política de la Monarquía Hispánica."
    },
    "rommen": {
        "name": "Heinrich Rommen",
        "period": "1897–1967",
        "nationality": "Alemania",
        "shortBio": "El jurista alemán Heinrich A. Rommen situó a Suárez y Vitoria en el origen del constitucionalismo occidental en *The Natural Law* (1936). Enseñó en universidades estadounidenses y su manual formó a generaciones de juristas, explicando que la soberanía popular limitada y el poder delegado fueron desarrollados por la escolástica.",
        "contribution": "Fue clave para introducir la tradición de Salamanca en la teoría jurídica norteamericana del siglo XX como raíz del constitucionalismo de poder limitado."
    },
    "hayek": {
        "name": "Friedrich A. Hayek",
        "period": "1899–1992",
        "nationality": "Austria / Reino Unido",
        "shortBio": "En *The Road to Serfdom* (1944) y *Law, Legislation and Liberty* (1973), Hayek desarrolla la teoría del orden espontáneo. Su concepción del derecho como descubrimiento y no como creación del legislador coincide con la tradición jurídica escolástica: la ley justa deriva de un orden moral previo y no de la voluntad soberana del gobernante.",
        "contribution": "Contribuyó indirectamente a redescubrir a los escolásticos como antecedentes del constitucionalismo limitado y de la economía basada en normas generales abstractas."
    },
    "voegelin": {
        "name": "Eric Voegelin",
        "period": "1901–1985",
        "nationality": "Alemania / Estados Unidos",
        "shortBio": "En *The New Science of Politics* (1952) y *Order and History*, Voegelin sostiene que la comunidad política no crea la verdad moral, sino que participa de un orden previo. Su concepción del poder como realidad limitada por la verdad coincide con la doctrina escolástica del poder fiduciario y la autoridad subordinada al bien común.",
        "contribution": "Proporcionó el marco conceptual para reinterpretar la relevancia de Salamanca en la historia política de Occidente como institucionalización de un orden moral previo al Estado."
    },
    "schumpeter": {
        "name": "Joseph Schumpeter",
        "period": "1883–1950",
        "nationality": "Austria / Estados Unidos",
        "shortBio": "En *History of Economic Analysis* (1954), Schumpeter identifica a los escolásticos españoles como los primeros economistas científicos. Reconoce que formularon antes que la economía clásica teorías sobre el valor subjetivo, el precio de mercado y la naturaleza del dinero, cambiando la genealogía intelectual del liberalismo económico.",
        "contribution": "Restituyó la importancia de los escolásticos españoles como fundadores de la ciencia económica moderna, reconociendo su prioridad sobre la economía clásica británica."
    },
    "murray": {
        "name": "John Courtney Murray",
        "period": "1904–1967",
        "nationality": "Estados Unidos",
        "shortBio": "En *We Hold These Truths* (1960), Murray interpreta la Primera Enmienda estadounidense a la luz del derecho natural y reconoce la herencia de Suárez y Belarmino. Argumenta que el experimento americano funciona porque institucionaliza principios clásicos: autoridad derivada y ley moral superior al Estado.",
        "contribution": "Vinculó el constitucionalismo americano con la tradición escolástica de la soberanía popular limitada y la subordinación del poder a la ley natural."
    },
    "villey": {
        "name": "Michel Villey",
        "period": "1914–1988",
        "nationality": "Francia",
        "shortBio": "El filósofo del derecho francés Michel Villey estudió la Segunda Escolástica en *La formation de la pensée juridique moderne*. Sostiene que la noción moderna de derecho subjetivo nace en la escolástica tardía, introduciendo a Salamanca en el debate filosófico contemporáneo sobre los derechos humanos.",
        "contribution": "Introdujo a la Escuela de Salamanca en el debate jurídico europeo moderno, identificándola como la cuna de los derechos subjetivos."
    },
    "rothbard": {
        "name": "Murray Rothbard",
        "period": "1926–1995",
        "nationality": "Estados Unidos",
        "shortBio": "En *Economic Thought Before Adam Smith* (1995), Rothbard identifica a Mariana, Azpilcueta y Mercado como precursores directos del liberalismo político y económico. Subraya su profunda influencia sobre Locke y la posterior tradición constitucional americana.",
        "contribution": "Popularizó la Escuela de Salamanca en el mundo liberal anglosajón contemporáneo, situándola como el origen radical de la teoría de la libertad y el derecho de propiedad."
    }
}

update_json("es", es_data)
print("Updated ES bios.")

# Define English content (translated from Spanish/Instructions)
en_data = {
    "nogueira": {
        "name": "Jaime Nogueira Pinto",
        "period": "1946–",
        "nationality": "Portugal",
        "shortBio": "Jaime Nogueira Pinto was born in Lisbon in 1946. He is one of the most influential Portuguese essayists, historians of ideas, and political analysts of the second half of the 20th and early 21st centuries. With a degree in Law from the University of Lisbon, he developed intense intellectual activity as a professor, lecturer, and director of cultural institutions, notably as director of the Institute for Political Studies at the Catholic University of Portugal.\nHis work is situated within the tradition of European conservatism, with a strong awareness of Lusitanian-Hispanic historical specificity. Unlike the purely national-state conservatisms of the 20th century, Nogueira Pinto has defended a historical and civilizational conception of Portugal within a broader Atlantic and Peninsular framework.\nHis most prominent works include *Ideologia e Razão de Estado* (1976), *Portugal Contemporâneo* (1985), *A Direita e as Direitas* (1996), and *Novos Portugueses* (2009). He is also the author of *Nação e Defesa* and numerous essays on political history, geopolitics, and European identity.\nPhilosophically, his thought centers on a classic distinction between power and legitimacy. For Nogueira Pinto, the modern State tends to absolutize sovereignty and decouple it from any prior moral order. In response, he claims a historical conception of power as a reality limited by traditions, intermediate bodies, cultural community, and legal heritage. This perspective brings him indirectly closer to the Iberian scholastic tradition, where power is not the source of law but an instrument subordinated to an objective moral order.",
        "contribution": "He claims a historical conception of power limited by traditions and intermediate bodies against modern statism, connecting Lusitanian-Hispanic identity with the tradition of objective natural law."
    },
    "huerta": {
        "name": "Jesús Huerta de Soto",
        "period": "1956–",
        "nationality": "Spain",
        "shortBio": "Jesús Huerta de Soto was born in Madrid in 1956 and is a professor of Political Economy at Rey Juan Carlos University. An intellectual disciple of the Austrian School of Economics, especially Mises and Hayek, his main contribution has been to show that many of the theses considered characteristic of modern liberalism were already formulated by Hispanic scholastics.\nIn *Money, Bank Credit and Economic Cycles* (1998) and in numerous historical studies, he maintains that authors of the Salamanca School had developed a surprisingly sophisticated monetary and banking theory: inflation as a hidden tax, the illegitimacy of monetary manipulation, and the moral function of private property. For Huerta de Soto, the market is not a technical mechanism, but a spontaneous social process derived from human freedom, exactly as understood by the Salamancan jurists.\nHis central thesis is both historical and philosophical: liberalism was not born against the European Catholic tradition, but within it. Limited constitutionalism and the market economy are the institutional secularization of principles previously elaborated by scholastic natural law.",
        "contribution": "He demonstrates the Hispanic genealogy of economic liberalism, linking the Austrian School with the Salamanca School, especially in the defense of the market as a spontaneous order and the critique of inflation as a violation of justice."
    },
    "olavo": {
        "name": "Olavo de Carvalho",
        "period": "1947–2022",
        "nationality": "Brazil",
        "shortBio": "Olavo Luiz Pimentel de Carvalho was born in Campinas (Brazil) on April 29, 1947, and died in Richmond (Virginia, USA) on January 24, 2022. A journalist, essayist, and self-taught philosopher, he developed most of his work outside the university but exercised considerable cultural influence in Brazil and in sectors of the contemporary Ibero-American political debate.\nHis central work, *The Garden of Afflictions* (1995), already contains the intuition that runs through all his production: political modernity has separated intellectual life from moral experience and turned politics into a technique of power. In later texts such as *The Collective Imbecile* (1996) and *The Minimum You Need to Know Not to Be an Idiot* (2013), he argued that Western culture can only sustain freedom if it maintains an objective notion of truth.\nAlthough Olavo did not present himself as a scholastic, his thought is situated within the same intellectual structure. His critique of positivism reproduces the classical distinction between legality and legitimacy developed by the Iberian natural law tradition. Politics, for him, does not create the moral order; it must recognize it. His insistence that personal conscience and objective truth precede any political order recalls the doctrine according to which power is fiduciary.",
        "contribution": "He recovered the classical distinction between legality and legitimacy in contemporary public debate, arguing that political freedom depends on a philosophical culture that recognizes objective moral limits to power."
    },
    "scott": {
        "name": "James Brown Scott",
        "period": "1866–1943",
        "nationality": "United States",
        "shortBio": "American jurist James Brown Scott was the first major Anglo-Saxon scholar to systematically recover Francisco de Vitoria. In *The Spanish Origin of International Law: Francisco de Vitoria and His Law of Nations* (1934) and *The Catholic Conception of International Law* (1934), he argued that international law was not born with Grotius but with the Salamanca School.",
        "contribution": "He identified the Salamanca School as the true origin of modern international law, decisively influencing Anglo-American legal historiography."
    },
    "schmitt": {
        "name": "Carl Schmitt",
        "period": "1888–1985",
        "nationality": "Germany",
        "shortBio": "In *Political Theology* (1922) and *The Nomos of the Earth* (1950), Schmitt criticizes the modern fiction of the State's unlimited sovereignty. He recognizes that the pre-modern European political order did not function on absolute sovereignty but on jurisdictions, charters, and limited authority—a model that coincides with the scholastic theory of delegated power.",
        "contribution": "He historically confirmed the existence of a classical European legal order where power was not original or unlimited, recognizing the relevance of the political architecture of the Hispanic Monarchy."
    },
    "rommen": {
        "name": "Heinrich Rommen",
        "period": "1897–1967",
        "nationality": "Germany",
        "shortBio": "German jurist Heinrich A. Rommen placed Suarez and Vitoria at the origin of Western constitutionalism in *The Natural Law* (1936). He taught at American universities and his manual formed generations of jurists, explaining that limited popular sovereignty and delegated power were developed by the scholastics.",
        "contribution": "He was key in introducing the Salamanca tradition into 20th-century American legal theory as a root of limited power constitutionalism."
    },
    "hayek": {
        "name": "Friedrich A. Hayek",
        "period": "1899–1992",
        "nationality": "Austria / United Kingdom",
        "shortBio": "In *The Road to Serfdom* (1944) and *Law, Legislation and Liberty* (1973), Hayek develops the theory of spontaneous order. His conception of law as discovery and not as creation by the legislator coincides with the scholastic legal tradition: just law derives from a prior moral order and not from the sovereign will of the ruler.",
        "contribution": "He contributed indirectly to rediscovering the scholastics as antecedents of limited constitutionalism and an economy based on general abstract rules."
    },
    "voegelin": {
        "name": "Eric Voegelin",
        "period": "1901–1985",
        "nationality": "Germany / United States",
        "shortBio": "In *The New Science of Politics* (1952) and *Order and History*, Voegelin argues that the political community does not create moral truth but participates in a prior order. His conception of power as a reality limited by truth coincides with the scholastic doctrine of fiduciary power and authority subordinated to the common good.",
        "contribution": "He provided the conceptual framework to reinterpret the relevance of Salamanca in Western political history as the institutionalization of a moral order prior to the State."
    },
    "schumpeter": {
        "name": "Joseph Schumpeter",
        "period": "1883–1950",
        "nationality": "Austria / United States",
        "shortBio": "In *History of Economic Analysis* (1954), Schumpeter identifies the Spanish scholastics as the first scientific economists. He recognized that they formulated, before classical economics, theories on subjective value, market price, and the nature of money, changing the intellectual genealogy of economic liberalism.",
        "contribution": "He restored the importance of Spanish scholastics as founders of modern economic science, recognizing their priority over British classical economics."
    },
    "murray": {
        "name": "John Courtney Murray",
        "period": "1904–1967",
        "nationality": "United States",
        "shortBio": "In *We Hold These Truths* (1960), Murray interprets the American First Amendment in light of natural law and recognizes the heritage of Suarez and Bellarmine. He argues that the American experiment works because it institutionalizes classical principles: derived authority and a moral law superior to the State.",
        "contribution": "He linked American constitutionalism with the scholastic tradition of limited popular sovereignty and the subordination of power to natural law."
    },
    "villey": {
        "name": "Michel Villey",
        "period": "1914–1988",
        "nationality": "France",
        "shortBio": "French legal philosopher Michel Villey studied the Second Scholasticism in *La formation de la pensée juridique moderne*. He maintains that the modern notion of subjective right was born in late scholasticism, introducing Salamanca to the contemporary philosophical debate on human rights.",
        "contribution": "He introduced the Salamanca School into the modern European legal debate, identifying it as the cradle of subjective rights."
    },
    "rothbard": {
        "name": "Murray Rothbard",
        "period": "1926–1995",
        "nationality": "United States",
        "shortBio": "In *Economic Thought Before Adam Smith* (1995), Rothbard identifies Mariana, Azpilcueta, and Mercado as direct precursors of political and economic liberalism. He underlines their deep influence on Locke and the subsequent American constitutional tradition.",
        "contribution": "He popularized the Salamanca School in the contemporary Anglo-Saxon liberal world, placing it as the radical origin of the theory of liberty and property rights."
    }
}

update_json("en", en_data)
print("Updated EN bios.")

# Portuguese content (omitted here for brevity in the script, but I should probably do it too)
# Actually, I will do it to be professional.
pt_data = {
    "nogueira": {
        "name": "Jaime Nogueira Pinto",
        "period": "1946–",
        "nationality": "Portugal",
        "shortBio": "Jaime Nogueira Pinto nasceu em Lisboa em 1946. É um dos ensaístas, historiadores de ideias e analistas políticos portugueses mais influentes da segunda metade do século XX e início do século XXI. Licenciado em Direito pela Universidade de Lisboa, desenvolveu uma intensa atividade intelectual como professor, conferencista e diretor de instituições culturais, destacando-se como diretor do Instituto de Estudos Políticos da Universidade Católica Portuguesa.\nA sua obra situa-se na tradição do conservadorismo europeu, com uma forte consciência da especificidade histórica luso-hispânica. Ao contrário dos conservadorismos puramente nacional-estatais do século XX, Nogueira Pinto defendeu uma conceção histórica e civilizacional de Portugal inscrita num quadro atlântico e peninsular mais amplo.\nAs suas obras mais destacadas incluem *Ideologia e Razão de Estado* (1976), *Portugal Contemporâneo* (1985), *A Direita e as Direitas* (1996) e *Novos Portugueses* (2009). É também autor de *Nação e Defesa* e de numerosos ensaios sobre história política, geopolítica e identidade europeia.\nFilosoficamente, o seu pensamento gira em torno de uma distinção clássica entre poder e legitimidade. Para Nogueira Pinto, o Estado moderno tende a absolutizar a soberania e a desvinculá-la de qualquer ordem moral prévia. Em resposta, reivindica uma conceção histórica do poder como realidade limitada por tradições, corpos intermédios, comunidade cultural e herança jurídica. Esta perspetiva aproxima-o indiretamente da tradição escolástica ibérica, na qual el poder não é fonte de direito mas um instrumento subordinado a uma ordem moral objetiva.",
        "contribution": "Reivindica uma conceção histórica do poder limitado por tradições e corpos intermédios contra o estatismo moderno, ligando a identidade luso-hispânica à tradição do direito natural objetivo."
    },
    "huerta": {
        "name": "Jesús Huerta de Soto",
        "period": "1956–",
        "nationality": "Espanha",
        "shortBio": "Jesús Huerta de Soto nasceu em Madrid em 1956 e é catedrático de Economia Política na Universidade Rey Juan Carlos. Discípulo intelectual da Escola Austríaca de Economia, especialmente de Mises e Hayek, a sua principal contribuição tem sido mostrar que muitas das teses consideradas características do liberalismo moderno já estavam formuladas pela escolástica hispânica.\nEm *Money, Bank Credit and Economic Cycles* (1998) e em numerosos estudos históricos, sustenta que autores da Escola de Salamanca tinham desenvolvido uma teoria monetária e bancária surpreendentemente sofisticada: a inflação como imposto oculto, a ilegitimidade da manipulação monetária e a função moral da propriedade privada. Para Huerta de Soto, o mercado não é um mecanismo técnico, mas um processo social espontâneo derivado da liberdade humana, exatamente como entendido pelos juristas salmantinos.\nA sua tese central é histórica e filosófica ao mesmo tempo: o liberalismo não nasceu contra a tradição católica europeia, mas dentro dela. O constitucionalismo limitado e a economia de mercado seriam a secularização institucional de princípios previamente elaborados pelo direito natural escolástico.",
        "contribution": "Demonstra a genealogia hispânica do liberalismo económico, ligando a Escola Austríaca à Escola de Salamanca, especialmente na defesa do mercado como ordem espontânea e na crítica à inflação como violação da justiça."
    },
    "olavo": {
        "name": "Olavo de Carvalho",
        "period": "1947–2022",
        "nationality": "Brasil",
        "shortBio": "Olavo Luiz Pimentel de Carvalho nasceu em Campinas (Brasil) a 29 de abril de 1947 e morreu em Richmond (Virgínia, EUA) a 24 de janeiro de 2022. Jornalista, ensaísta e filósofo autodidata, desenvolveu a maior parte da sua obra fora da universidade, mas exerceu uma influência cultural considerável no Brasil e em setores do debate político ibero-americano contemporâneo.\nA sua obra central, *O Jardim das Aflições* (1995), já contém a intuição que percorrerá toda a sua produção: a modernidade política separou a vida intelectual da experiência moral e converteu a política em técnica de poder. Em textos posteriores como *O Imbecil Coletivo* (1996) e *O Mínimo que você precisa saber para não ser um idiota* (2013), defendeu que a cultura ocidental só pode sustentar a liberdade se mantiver uma noção objetiva de verdade.\nEmbora Olavo não se tenha apresentado como escolástico, o seu pensamento situa-se dentro de uma mesma estrutura intelectual. A sua crítica ao positivismo reproduz a distinção clássica entre legalidade e legitimidade desenvolvida pela tradição do direito natural ibérico. A política, para ele, não cria a ordem moral; deve reconhecê-la. A sua insistência em que a consciência pessoal e a verdade objetiva precedem qualquer ordem política recorda a doutrina segundo a qual o poder é fiduciário.",
        "contribution": "Recuperou no debate público contemporâneo a distinção clássica entre legalidade e legitimidade, defendendo que a liberdade política depende de uma cultura filosófica que reconheça limites morais objetivos ao poder."
    },
    "scott": {
        "name": "James Brown Scott",
        "period": "1866–1943",
        "nationality": "Estados Unidos",
        "shortBio": "O jurista norte-americano James Brown Scott foi o primeiro grande académico anglo-saxão a recuperar sistematicamente Francisco de Vitoria. Em *The Spanish Origin of International Law: Francisco de Vitoria and His Law of Nations* (1934) e *The Catholic Conception of International Law* (1934), defendeu que o direito internacional não nasce com Grócio, mas com a Escola de Salamanca.",
        "contribution": "Identificou a Escola de Salamanca como a verdadeira origem do direito internacional moderno, influenciando decisivamente a historiografia jurídica anglo-americana."
    },
    "schmitt": {
        "name": "Carl Schmitt",
        "period": "1888–1985",
        "nationality": "Alemanha",
        "shortBio": "Em *Politische Theologie* (1922) e *Der Nomos der Erde* (1950), Schmitt critica a ficção moderna da soberania ilimitada do Estado. Reconhece que a ordem política europeia pré-moderna não funcionava sob soberania absoluta, mas sobre jurisdições, forais e autoridade limitada, modelo que coincide com a teoria escolástica do poder delegado.",
        "contribution": "Confirmou historicamente a existência de uma ordem jurídica clássica europeia onde o poder não era originário nem ilimitado, reconhecendo a relevância da arquitetura política da Monarquia Hispânica."
    },
    "rommen": {
        "name": "Heinrich Rommen",
        "period": "1897–1967",
        "nationality": "Alemanha",
        "shortBio": "O jurista alemão Heinrich A. Rommen situou Suárez e Vitoria na origem do constitucionalismo ocidental em *The Natural Law* (1936). Lecionou em universidades americanas e o seu manual formou gerações de juristas, explicando que a soberania popular limitada e el poder delegado foram desenvolvidos pela escolástica.",
        "contribution": "Foi fundamental para introduzir a tradição de Salamanca na teoria jurídica norte-americana do século XX como raiz del constitucionalismo de poder limitado."
    },
    "hayek": {
        "name": "Friedrich A. Hayek",
        "period": "1899–1992",
        "nationality": "Áustria / Reino Unido",
        "shortBio": "En *The Road to Serfdom* (1944) e *Law, Legislation and Liberty* (1973), Hayek desenvolve a teoria da ordem espontânea. A sua conceção do direito como descoberta e não como criação pelo legislador coincide com a tradição jurídica escolástica: a lei justa deriva de uma ordem moral prévia e não da vontade soberana do governante.",
        "contribution": "Contribuiu indiretamente para redescobrir os escolásticos como antecedentes do constitucionalismo limitado e de uma economia baseada em normas gerais abstratas."
    },
    "voegelin": {
        "name": "Eric Voegelin",
        "period": "1901–1985",
        "nationality": "Alemanha / Estados Unidos",
        "shortBio": "En *The New Science of Politics* (1952) e *Order and History*, Voegelin sustenta que a comunidade política não cria a verdade moral, mas participa de uma ordem prévia. A sua conceção do poder como realidade limitada pela verdade coincide com a doutrina escolástica do poder fiduciário e a autoridade subordinada ao bem comum.",
        "contribution": "Proporcionou o quadro concetual para reinterpretar a relevância de Salamanca na história política do Ocidente como institucionalização de uma ordem moral prévia ao Estado."
    },
    "schumpeter": {
        "name": "Joseph Schumpeter",
        "period": "1883–1950",
        "nationality": "Áustria / Estados Unidos",
        "shortBio": "En *History of Economic Analysis* (1954), Schumpeter identifica os escolásticos espanhóis como os primeiros economistas científicos. Reconhece que formularam antes da economia clássica teorias sobre valor subjetivo, preço de mercado e a natureza do dinheiro, mudando a genealogia intelectual do liberalismo económico.",
        "contribution": "Restituiu a importância dos escolásticos espanhóis como fundadores da ciência económica moderna, reconhecendo a sua prioridade sobre a economia clássica britânica."
    },
    "murray": {
        "name": "John Courtney Murray",
        "period": "1904–1967",
        "nationality": "Estados Unidos",
        "shortBio": "En *We Hold These Truths* (1960), Murray interpreta a Primeira Emenda americana à luz do direito natural e reconhece a herança de Suárez e Belarmino. Argumenta que la experiência americana funciona porque institucionaliza princípios clássicos: autoridade derivada e lei moral superior ao Estado.",
        "contribution": "Ligou o constitucionalismo americano à tradição escolástica da soberanía popular limitada e à subordinação del poder à lei natural."
    },
    "villey": {
        "name": "Michel Villey",
        "period": "1914–1988",
        "nationality": "França",
        "shortBio": "O filósofo do direito francês Michel Villey estudou a Segunda Escolástica em *La formation de la pensée juridique moderne*. Sustenta que a noção moderna de direito subjetivo nasce na escolástica tardia, introduzindo Salamanca no debate filosófico contemporâneo sobre os direitos humanos.",
        "contribution": "Introduziu a Escola de Salamanca no debate jurídico europeu moderno, identificando-a como o berço dos direitos subjetivos."
    },
    "rothbard": {
        "name": "Murray Rothbard",
        "period": "1926–1995",
        "nationality": "Estados Unidos",
        "shortBio": "En *Economic Thought Before Adam Smith* (1995), Rothbard identifica Mariana, Azpilcueta e Mercado como precursores diretos do liberalismo político e económico. Sublinha a sua profunda influência sobre Locke e a posterior tradição constitucional americana.",
        "contribution": "Popularizou a Escola de Salamanca no mundo liberal anglo-saxão contemporâneo, situando-a como a origem radical da teoría da liberdade e do direito de propriedade."
    }
}

update_json("pt", pt_data)
print("Updated PT bios.")
