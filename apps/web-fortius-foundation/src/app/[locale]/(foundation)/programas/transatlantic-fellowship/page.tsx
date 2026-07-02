import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Bracketed } from "@/components/system/Bracketed";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  return {
    title: isEn
      ? "Transatlantic Fellowship — Fortius Foundation"
      : "Transatlantic Fellowship — Fundación Fortius",
    description: isEn
      ? "A programme for the next generation of transatlantic leaders. Research fellowships, institutional visits, parliamentary traineeships and leadership seminars across Europe and the United States."
      : "Un programa para la próxima generación de líderes transatlánticos. Fellowships de investigación, visitas institucionales, prácticas parlamentarias y seminarios a ambos lados del Atlántico.",
  };
}

const PROGRAMME_TYPES = [
  {
    num: "01",
    en: { title: "Academic Exchange", desc: "Exchange programmes between European and American universities." },
    es: { title: "Intercambio académico", desc: "Programas de intercambio entre universidades europeas y americanas." },
  },
  {
    num: "02",
    en: { title: "Research Fellowships", desc: "Placements hosted by universities and research centres." },
    es: { title: "Fellowships de investigación", desc: "Estancias acogidas por universidades y centros de investigación." },
  },
  {
    num: "03",
    en: { title: "Institutional Study Visits", desc: "Intensive visits to European and American institutions." },
    es: { title: "Visitas institucionales", desc: "Visitas intensivas a instituciones europeas y americanas." },
  },
  {
    num: "04",
    en: { title: "Parliamentary Traineeships", desc: "Placements within national parliaments and public institutions." },
    es: { title: "Prácticas parlamentarias", desc: "Prácticas en parlamentos nacionales e instituciones públicas." },
  },
  {
    num: "05",
    en: { title: "Think Tank Immersion", desc: "Sustained engagement with leading research institutes." },
    es: { title: "Inmersión en think tanks", desc: "Trabajo sostenido con los principales institutos de investigación." },
  },
  {
    num: "06",
    en: { title: "Public Affairs & Diplomacy", desc: "Direct exposure to diplomatic and public-affairs practice." },
    es: { title: "Asuntos públicos y diplomacia", desc: "Contacto directo con la práctica diplomática y de asuntos públicos." },
  },
  {
    num: "07",
    en: { title: "Media & Communication", desc: "Visits to newsrooms and political communication settings." },
    es: { title: "Medios y comunicación", desc: "Visitas a redacciones y entornos de comunicación política." },
  },
  {
    num: "08",
    en: { title: "Leadership Seminars", desc: "Policy workshops and leadership formation." },
    es: { title: "Seminarios de liderazgo", desc: "Talleres de política pública y formación de líderes." },
  },
  {
    num: "09",
    en: { title: "Institutional Networking", desc: "Encounters with policymakers, academics and practitioners." },
    es: { title: "Red institucional", desc: "Encuentros con responsables públicos, académicos y profesionales." },
  },
] as const;

const PROGRAMMES = [
  {
    type: { en: "RESEARCH", es: "INVESTIGACIÓN" },
    title: { en: "Research Fellowships", es: "Fellowships de Investigación" },
    desc: {
      en: "Research placements hosted by universities and academic institutions, allowing participants to work alongside researchers while developing projects in international affairs, political science, public policy and transatlantic relations.",
      es: "Estancias de investigación acogidas por universidades e instituciones académicas, donde los participantes trabajan junto a investigadores desarrollando proyectos de relaciones internacionales, ciencias políticas, políticas públicas y relaciones transatlánticas.",
    },
    completed: {
      en: "University of Navarra, Spain (November 2025). James Thomas Anderson V (Washington College, magna cum laude, History & Political Science) completed a one-month research fellowship under Dr Santiago de Navascués, researching Spain's democratisation in the twentieth century.",
      es: "Universidad de Navarra, España (noviembre 2025). James Thomas Anderson V (Washington College, magna cum laude, Historia y Ciencias Políticas) completó un fellowship de investigación de un mes bajo la dirección del Dr. Santiago de Navascués, estudiando el proceso de democratización español en el siglo XX.",
    },
  },
  {
    type: { en: "INSTITUTIONS", es: "INSTITUCIONES" },
    title: { en: "Institutional Study Visits", es: "Visitas Institucionales" },
    desc: {
      en: "Short, intensive programmes introducing participants to the institutional architecture of Europe and the United States through direct meetings with policymakers, diplomats, academics, journalists and practitioners.",
      es: "Programas cortos e intensivos que introducen a los participantes en la arquitectura institucional de Europa y Estados Unidos a través de encuentros directos con responsables públicos, diplomáticos, académicos, periodistas y profesionales.",
    },
    completed: {
      en: "Brussels & Bruges (June 2026). A week-long study visit across the European policymaking ecosystem. See the featured programme below.",
      es: "Bruselas y Brujas (junio 2026). Una visita de estudio de una semana por el ecosistema institucional europeo. Ver el programa destacado más abajo.",
    },
  },
  {
    type: { en: "IDEAS", es: "IDEAS" },
    title: { en: "Think Tank Immersion", es: "Inmersión en Think Tanks" },
    desc: {
      en: "Participants spend several days engaging with leading think tanks, research institutes and policy organisations, learning how ideas travel into public policy and democratic debate on both sides of the Atlantic.",
      es: "Los participantes pasan varios días en contacto con los principales think tanks, institutos de investigación y organizaciones de política pública, aprendiendo cómo las ideas se traducen en políticas públicas y debate democrático a ambos lados del Atlántico.",
    },
    completed: null,
  },
  {
    type: { en: "LEGISLATURES", es: "LEGISLATURAS" },
    title: { en: "Parliamentary Traineeships", es: "Prácticas Parlamentarias" },
    desc: {
      en: "Professional placements within national legislatures, giving participants practical experience of parliamentary work, legislative procedure and democratic governance.",
      es: "Prácticas profesionales en legislaturas nacionales, que ofrecen a los participantes experiencia directa del trabajo parlamentario, los procedimientos legislativos y la gobernanza democrática.",
    },
    completed: {
      en: "Romanian Parliament (Summer 2026). Francesco Bertolini (Washington College, B.A. in Economics and French) completed a one-month traineeship working directly under a member of parliament.",
      es: "Parlamento rumano (verano 2026). Francesco Bertolini (Washington College, economía y francés) realizó unas prácticas de un mes trabajando directamente con un miembro del parlamento.",
    },
  },
] as const;

const BRUSSELS_PHOTOS = [
  { src: "/programas/transatlantic-fellowship/brussels-01.png", caption: { en: "Brussels visit", es: "Visita a Bruselas" } },
  { src: "/programas/transatlantic-fellowship/brussels-02.png", caption: { en: "Brussels visit", es: "Visita a Bruselas" } },
  { src: "/programas/transatlantic-fellowship/brussels-03.png", caption: { en: "Brussels visit", es: "Visita a Bruselas" } },
  { src: "/programas/transatlantic-fellowship/brussels-04.png", caption: { en: "Brussels visit", es: "Visita a Bruselas" } },
  { src: "/programas/transatlantic-fellowship/brussels-05.png", caption: { en: "Brussels visit", es: "Visita a Bruselas" } },
  { src: "/programas/transatlantic-fellowship/brussels-06.png", caption: { en: "Brussels visit", es: "Visita a Bruselas" } },
  { src: "/programas/transatlantic-fellowship/brussels-07.png", caption: { en: "Brussels visit", es: "Visita a Bruselas" } },
  { src: "/programas/transatlantic-fellowship/brussels-08.png", caption: { en: "Brussels visit", es: "Visita a Bruselas" } },
  { src: "/programas/transatlantic-fellowship/brussels-09.png", caption: { en: "Brussels visit", es: "Visita a Bruselas" } },
] as const;

const BRUSSELS_BLOCKS = [
  {
    title: { en: "Understanding Europe — History & policy ecosystem", es: "Entender Europa — historia y ecosistema de política pública" },
    body: {
      en: "The programme opened with the historical foundations of European integration and the policy ecosystem around EU decision-making, including a visit to the House of European History and a meeting with Susana Garayoa (Head of European Institutional Relations at Zabala Innovation) on innovation policy, public funding and differences between lobbying at EU and member-state level.",
      es: "El programa comenzó con las bases históricas de la integración europea y el ecosistema de política pública en torno a la toma de decisiones de la UE, incluyendo una visita a la Casa de la Historia Europea y una reunión con Susana Garayoa (responsable de relaciones institucionales europeas en Zabala Innovation) sobre política de innovación, financiación pública y diferencias entre el lobby a nivel europeo y estatal.",
    },
  },
  {
    title: { en: "Media, intelligence & public affairs", es: "Medios, inteligencia y asuntos públicos" },
    body: {
      en: "At Euronews, participants attended a live broadcast of Europe Today and discussed media ecosystems, journalism in the digital age, political communication and public trust. A session with Marc Berruezo, Director of Intelligence at BeBarlet, explored how intelligence gathering, stakeholder mapping and strategic analysis support decision-making in complex regulatory environments.",
      es: "En Euronews, los participantes asistieron a una emisión en directo de Europe Today y debatieron sobre ecosistemas mediáticos, periodismo en la era digital, comunicación política y confianza pública. Una sesión con Marc Berruezo, Director de Inteligencia en BeBarlet, exploró cómo la recopilación de inteligencia, el mapeo de actores y el análisis estratégico apoyan la toma de decisiones en entornos regulatorios complejos.",
    },
  },
  {
    title: { en: "European governance & migration policy", es: "Gobernanza europea y política migratoria" },
    body: {
      en: "A tour of the European Parliament and a discussion with MEP Nora Junco (ECR, ES) on contemporary political challenges, governance and institutional decision-making, followed by attendance at a parliamentary event dedicated to migration policy — one of the most consequential debates shaping the European agenda.",
      es: "Una visita al Parlamento Europeo y un encuentro con la eurodiputada Nora Junco (ECR, España) sobre desafíos políticos contemporáneos, gobernanza y toma de decisiones institucional, seguido de la asistencia a un evento parlamentario dedicado a la política migratoria, uno de los debates más decisivos de la agenda europea.",
    },
  },
  {
    title: { en: "European Commission & the European project", es: "Comisión Europea y el proyecto europeo" },
    body: {
      en: "A private tour of the European Commission and a one-to-one meeting with José Limão, Policy Officer at the Secretariat-General, on EU law, European integration and the project's rationale and present-day challenges, complemented by a guided cultural tour of Brussels as both Belgian and European capital.",
      es: "Una visita privada a la Comisión Europea y una reunión individual con José Limão, responsable de política en la Secretaría General, sobre derecho de la UE, integración europea y los fundamentos y desafíos actuales del proyecto, complementada con una visita cultural guiada a Bruselas como capital belga y europea.",
    },
  },
  {
    title: { en: "Bruges & the academic dimension of Europe", es: "Brujas y la dimensión académica de Europa" },
    body: {
      en: "A study visit to the College of Europe in Bruges, including a meeting with Michele Chang, Director of the Transatlantic Programme, on the future of transatlantic relations, European leadership development, international cooperation and public-policy education.",
      es: "Una visita académica al Colegio de Europa en Brujas, con una reunión con Michele Chang, directora del Programa Transatlántico, sobre el futuro de las relaciones transatlánticas, el desarrollo del liderazgo europeo, la cooperación internacional y la educación en política pública.",
    },
  },
  {
    title: { en: "Security & transatlantic cooperation", es: "Seguridad y cooperación transatlántica" },
    body: {
      en: "At NATO Headquarters, participants explored the Alliance's mission, structure and strategic priorities with officials including Alexia Gelé (Current Operations), Camilla Nicoletti (Euro-Atlantic Disaster Response Coordination Centre) and Sara Sampaio (Operations Division).",
      es: "En la sede de la OTAN, los participantes exploraron la misión, estructura y prioridades estratégicas de la Alianza con responsables como Alexia Gelé (Operaciones Actuales), Camilla Nicoletti (Centro de Coordinación Euro-Atlántica de Respuesta a Desastres) y Sara Sampaio (División de Operaciones).",
    },
  },
  {
    title: { en: "Diplomacy & EU–US relations", es: "Diplomacia y relaciones UE-EE.UU." },
    body: {
      en: "A diplomatic perspective on the EU–US relationship with Seth Oppenheim, Foreign Service Officer at the U.S. Department of Commerce (U.S. Mission to the EU), and a session at POLITICO Europe with journalist Max Griera and Tommaso Anselmi (Business Development) on the contrast between European and American political reporting.",
      es: "Una perspectiva diplomática sobre la relación UE-EE.UU. con Seth Oppenheim, funcionario del Servicio Exterior del Departamento de Comercio de EE.UU. (Misión de EE.UU. ante la UE), y una sesión en POLITICO Europe con el periodista Max Griera y Tommaso Anselmi (Desarrollo de Negocio) sobre el contraste entre el periodismo político europeo y americano.",
    },
  },
] as const;

const COHORTS = [
  {
    date: { en: "November 2025", es: "Noviembre 2025" },
    type: { en: "Research Fellowship", es: "Fellowship de Investigación" },
    place: { en: "University of Navarra · Pamplona, Spain", es: "Universidad de Navarra · Pamplona, España" },
    body: {
      en: "James Thomas Anderson V, a magna cum laude graduate of Washington College (B.A. in History and Political Science), completed a one-month research fellowship at the University of Navarra under Dr Santiago de Navascués, researching Spain's process of democratisation in the twentieth century.",
      es: "James Thomas Anderson V, licenciado magna cum laude en Washington College (doble grado en Historia y Ciencias Políticas), completó un fellowship de investigación de un mes en la Universidad de Navarra bajo la dirección del Dr. Santiago de Navascués, investigando el proceso de democratización de España en el siglo XX.",
    },
  },
  {
    date: { en: "June 2026", es: "Junio 2026" },
    type: { en: "Institutional Study Visit", es: "Visita Institucional" },
    place: { en: "Brussels & Bruges · Belgium", es: "Bruselas y Brujas · Bélgica" },
    body: {
      en: "A week-long programme across the European policymaking ecosystem — European Parliament, European Commission, NATO, the U.S. Mission to the EU, the College of Europe, Euronews and POLITICO Europe.",
      es: "Un programa de una semana por el ecosistema de política pública europeo: Parlamento Europeo, Comisión Europea, OTAN, Misión de EE.UU. ante la UE, Colegio de Europa, Euronews y POLITICO Europe.",
    },
  },
  {
    date: { en: "Summer 2026", es: "Verano 2026" },
    type: { en: "Parliamentary Traineeship", es: "Práctica Parlamentaria" },
    place: { en: "Romanian Parliament · Bucharest, Romania", es: "Parlamento rumano · Bucarest, Rumanía" },
    body: {
      en: "Francesco Bertolini (Washington College, B.A. in Economics and French) completed a one-month traineeship in the Romanian Parliament, working directly under a member of parliament and gaining hands-on experience of legislative work.",
      es: "Francesco Bertolini (Washington College, economía y francés) realizó unas prácticas de un mes en el Parlamento rumano, trabajando directamente con un miembro del parlamento y adquiriendo experiencia práctica del trabajo legislativo.",
    },
  },
] as const;

const HORIZON_TAGS = [
  { en: "University exchanges (EU–US)", es: "Intercambios universitarios (UE-EE.UU.)" },
  { en: "Joint research fellowships", es: "Fellowships de investigación conjunta" },
  { en: "Visiting scholar programmes", es: "Programas de profesores visitantes" },
  { en: "Congressional & parliamentary placements", es: "Prácticas en el Congreso y parlamentos" },
  { en: "Transatlantic policy seminars", es: "Seminarios de política transatlántica" },
  { en: "Executive study visits", es: "Visitas de estudio ejecutivas" },
  { en: "Summer schools", es: "Escuelas de verano" },
  { en: "Think tank residencies", es: "Residencias en think tanks" },
  { en: "Alumni network", es: "Red de alumni" },
] as const;

const TEAM = [
  {
    role: { en: "Vice-President · Fortius Foundation US", es: "Vicepresidente · Fortius Foundation US" },
    name: "Prof. Joseph Prud'homme",
    bio: {
      en: "Burton Family Chair in Religion, Politics and Culture and Associate Professor of Political Science at Washington College, where he is founding Director of the Institute for Religion, Politics and Culture. He holds a doctorate from Princeton University and has held fellowships at Harvard University and the University of Oxford.",
      es: "Cátedra Burton de Religión, Política y Cultura y Profesor Asociado de Ciencias Políticas en Washington College, donde es Director Fundador del Instituto de Religión, Política y Cultura. Es doctor por la Universidad de Princeton y ha sido fellow en Harvard y Oxford.",
    },
  },
  {
    role: { en: "Head of Training · Fortius Foundation", es: "Responsable de Formación · Fortius Foundation" },
    name: "Alexia Cosmello",
    bio: {
      en: "A public-affairs and EU-policy specialist based in Brussels, where she leads engagement with national associations on EU policy, digital transformation and transatlantic relations. She holds a degree in International Relations from the University of Navarra and a master's in political and institutional communication from LUISS Guido Carli, with further study in Jerusalem, Washington D.C. and Shanghai.",
      es: "Especialista en asuntos públicos y política europea con sede en Bruselas, donde dirige el trabajo con asociaciones nacionales sobre política de la UE, transformación digital y relaciones transatlánticas. Licenciada en Relaciones Internacionales por la Universidad de Navarra y máster en comunicación política e institucional por la LUISS Guido Carli, con estudios adicionales en Jerusalén, Washington D.C. y Shanghái.",
    },
  },
] as const;

const VISITED_INSTITUTIONS = [
  "University of Navarra",
  "Romanian Parliament",
  "College of Europe",
  "European Parliament",
  "European Commission",
  "NATO",
  "U.S. Mission to the EU",
  "Euronews",
  "POLITICO Europe",
  "House of European History",
  "Zabala Innovation",
] as const;

const WHY_TAGS = [
  { en: "Universities", es: "Universidades" },
  { en: "Think tanks", es: "Think tanks" },
  { en: "National parliaments", es: "Parlamentos nacionales" },
  { en: "European institutions", es: "Instituciones europeas" },
  { en: "Government officials", es: "Funcionarios públicos" },
  { en: "Diplomats", es: "Diplomáticos" },
  { en: "Journalists", es: "Periodistas" },
  { en: "Public affairs professionals", es: "Profesionales de asuntos públicos" },
  { en: "Security institutions", es: "Instituciones de seguridad" },
  { en: "Civil-society leaders", es: "Líderes de la sociedad civil" },
] as const;

export default async function TransatlanticFellowshipProgramPage({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === "en";
  const t = (obj: { en: string; es: string }) => (isEn ? obj.en : obj.es);

  return (
    <main className="pb-32">
      {/* ─── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32 border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <Bracketed variant="kicker">
                {isEn ? "Programmes · Transatlantic Fellowship" : "Programas · Transatlantic Fellowship"}
              </Bracketed>
              <Image
                src="/logos/transatlantic-fellowship-green.png"
                alt="Transatlantic Fellowship"
                width={260}
                height={56}
                className="mt-6 object-contain max-h-14 w-auto"
              />
              <h1 className="mt-8 font-display text-[clamp(2.4rem,5vw,4.4rem)] font-light leading-[1.03] tracking-tight text-[var(--text-primary)]">
                {isEn
                  ? "Building the next generation of transatlantic leaders."
                  : "Formando a la próxima generación de líderes transatlánticos."}
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-[var(--text-secondary)]">
                {isEn
                  ? "The strength of the transatlantic relationship has never been more important — or more fragile. We cultivate leaders who understand both shores of the Atlantic from the inside."
                  : "La fortaleza de la relación transatlántica nunca ha sido más importante, ni más frágil. Cultivamos líderes que conocen ambas orillas del Atlántico desde dentro."}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 bg-[var(--color-accent-500)] px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-90"
                >
                  {isEn ? "Apply & get involved" : "Solicitar participación"}
                  <ArrowUpRight size={14} />
                </Link>
                <a
                  href="#programas"
                  className="inline-flex items-center gap-2 border border-[var(--border-default)] px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                >
                  {isEn ? "Explore the programmes" : "Ver los programas"}
                </a>
              </div>
            </div>
            <div className="hidden lg:col-span-4 lg:flex lg:items-start lg:justify-end lg:pt-6">
              <div className="text-right space-y-1">
                <p className="text-[0.65rem] uppercase tracking-[0.22em] text-[var(--text-tertiary)]">An initiative of</p>
                <p className="font-display text-[1.1rem] font-light text-[var(--text-secondary)]">Fortius Foundation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 01 Mission ───────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <Bracketed variant="kicker">01 · {isEn ? "Mission" : "Misión"}</Bracketed>
          <blockquote className="mt-8 max-w-4xl font-display text-[clamp(1.5rem,2.8vw,2.4rem)] font-light leading-[1.15] tracking-tight text-[var(--text-primary)]">
            &ldquo;{isEn
              ? "For more than eighty years, the partnership between Europe and the United States has been the cornerstone of the democratic world."
              : "Durante más de ochenta años, la alianza entre Europa y Estados Unidos ha sido la piedra angular del mundo democrático."}&rdquo;
          </blockquote>
          <div className="mt-10 max-w-3xl space-y-5 leading-relaxed text-[var(--text-secondary)]">
            <p>
              {isEn
                ? "That partnership has promoted peace, prosperity, innovation and the defence of freedom. Yet geopolitical competition, political polarisation, strategic divergence and generational change increasingly threaten the mutual understanding that has historically sustained the alliance."
                : "Esa alianza ha promovido la paz, la prosperidad, la innovación y la defensa de la libertad. Sin embargo, la competencia geopolítica, la polarización política, la divergencia estratégica y el cambio generacional amenazan cada vez más el entendimiento mutuo que históricamente ha sostenido la alianza."}
            </p>
            <p>
              {isEn
                ? "The Transatlantic Fellowship was created to help bridge that gap. Our mission is to cultivate a new generation of leaders with a deep understanding of both sides of the Atlantic — fostering the personal relationships, intellectual exchange and institutional cooperation that will strengthen the transatlantic community for decades to come. Rather than confining exchange to the classroom, we immerse participants in the institutions, organisations and people who shape public life in Europe and the United States."
                : "El Transatlantic Fellowship nació para ayudar a cerrar esa brecha. Nuestra misión es cultivar una nueva generación de líderes con un profundo conocimiento de ambas orillas del Atlántico, fomentando las relaciones personales, el intercambio intelectual y la cooperación institucional que reforzarán la comunidad transatlántica durante las próximas décadas. Lejos de limitar el intercambio al aula, sumergimos a los participantes en las instituciones, organizaciones y personas que dan forma a la vida pública en Europa y Estados Unidos."}
            </p>
          </div>
        </div>
      </section>

      {/* ─── 02 What We Do ────────────────────────────────────────────────────── */}
      <section id="programas" className="py-20 md:py-28 border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <Bracketed variant="kicker">02 · {isEn ? "What We Do" : "Qué Hacemos"}</Bracketed>
          <div className="mt-8 grid lg:grid-cols-2 gap-10">
            <div>
              <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-light leading-[1.1] tracking-tight text-[var(--text-primary)]">
                {isEn ? "Not an exchange in the ordinary sense. And not purely academic." : "No un intercambio en el sentido convencional. Tampoco puramente académico."}
              </h2>
              <p className="mt-5 leading-relaxed text-[var(--text-secondary)]">
                {isEn
                  ? "The Fellowship develops tailored programmes for undergraduates, graduate students, young professionals and emerging leaders, through partnerships with universities, think tanks, public institutions and civil-society organisations. Its distinctive value lies in combining academia, policymaking, think tanks, diplomacy, media and public leadership in a single immersive experience."
                  : "El Fellowship desarrolla programas a medida para estudiantes de grado y posgrado, jóvenes profesionales y líderes emergentes, a través de asociaciones con universidades, think tanks, instituciones públicas y organizaciones de la sociedad civil. Su valor distintivo reside en combinar academia, elaboración de políticas, think tanks, diplomacia, medios y liderazgo público en una única experiencia inmersiva."}
              </p>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px border border-[var(--border-default)] bg-[var(--border-default)]">
            {PROGRAMME_TYPES.map((type) => (
              <div
                key={type.num}
                className="bg-[var(--surface-primary)] p-6 hover:bg-[var(--surface-secondary)] transition-colors"
              >
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-400)]">
                  {type.num}
                </span>
                <h3 className="mt-2 font-display text-[1.1rem] font-light text-[var(--text-primary)]">
                  {t(type.en.title !== undefined ? { en: type.en.title, es: type.es.title } : { en: "", es: "" })}
                </h3>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-[var(--text-secondary)]">
                  {t({ en: type.en.desc, es: type.es.desc })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 03 Why It Matters ────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <Bracketed variant="kicker">03 · {isEn ? "Why It Matters" : "Por Qué Importa"}</Bracketed>
          <div className="mt-8 grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <p className="leading-relaxed text-[var(--text-secondary)]">
                {isEn
                  ? "Understanding another political system cannot be achieved through books alone. The Fellowship allows participants to experience first-hand how institutions function, how public policy is designed, how democratic debate unfolds and how strategic decisions are made."
                  : "Comprender otro sistema político no puede lograrse solo a través de los libros. El Fellowship permite a los participantes experimentar de primera mano cómo funcionan las instituciones, cómo se diseñan las políticas públicas, cómo se desarrolla el debate democrático y cómo se toman las decisiones estratégicas."}
              </p>
              <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
                {isEn
                  ? "The objective is not to advance a particular political position, but to encourage informed leadership, intellectual curiosity, institutional understanding and lasting cooperation between Europe and the United States."
                  : "El objetivo no es promover una posición política concreta, sino fomentar el liderazgo informado, la curiosidad intelectual, la comprensión institucional y la cooperación duradera entre Europa y Estados Unidos."}
              </p>
            </div>
          </div>
          <div className="mt-10">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[var(--text-tertiary)] mb-4">
              {isEn ? "Participants engage directly with" : "Los participantes se relacionan directamente con"}
            </p>
            <div className="flex flex-wrap gap-2">
              {WHY_TAGS.map((tag) => (
                <span
                  key={tag.en}
                  className="border border-[var(--border-default)] px-3 py-1.5 text-[0.78rem] text-[var(--text-secondary)]"
                >
                  {t(tag)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 04 Programmes ────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <Bracketed variant="kicker">04 · {isEn ? "Programmes" : "Programas"}</Bracketed>
          <h2 className="mt-6 max-w-2xl font-display text-[clamp(1.6rem,2.8vw,2.4rem)] font-light leading-[1.1] tracking-tight text-[var(--text-primary)]">
            {isEn ? "Four formats, one mission." : "Cuatro formatos, una misión."}
          </h2>
          <div className="mt-10 space-y-px">
            {PROGRAMMES.map((prog) => (
              <div
                key={prog.type.en}
                className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[var(--border-subtle)] bg-[var(--surface-primary)]"
              >
                <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)] p-6 flex flex-col justify-between">
                  <Bracketed variant="tag">{t(prog.type)}</Bracketed>
                  <h3 className="mt-4 font-display text-[1.2rem] font-light text-[var(--text-primary)]">
                    {t(prog.title)}
                  </h3>
                </div>
                <div className="lg:col-span-9 p-6 lg:p-8 space-y-4">
                  <p className="leading-relaxed text-[var(--text-secondary)]">{t(prog.desc)}</p>
                  {prog.completed && (
                    <div className="border-l-2 border-[var(--color-accent-500)] pl-4">
                      <p className="text-[0.8rem] leading-relaxed text-[var(--text-tertiary)]">{t(prog.completed)}</p>
                    </div>
                  )}
                  {!prog.completed && (
                    <p className="text-[0.78rem] italic text-[var(--text-tertiary)]">
                      {isEn ? "First cohort in development." : "Primera cohorte en desarrollo."}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 05 Featured Programme — Brussels & Bruges ────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <Bracketed variant="kicker">05 · {isEn ? "Featured Programme" : "Programa Destacado"}</Bracketed>

          {/* Programme header */}
          <div className="mt-8 bg-[var(--surface-brand)] p-8 md:p-12">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-300)]">
              1–5 June 2026 · Brussels & Bruges
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,3.2vw,2.8rem)] font-light leading-[1.1] tracking-tight text-[var(--text-primary)]">
              {isEn
                ? "Brussels & Bruges Transatlantic Study Visit"
                : "Visita de Estudio Transatlántica — Bruselas y Brujas"}
            </h2>
            <p className="mt-5 max-w-3xl leading-relaxed text-[var(--text-secondary)]">
              {isEn
                ? "A week-long academic and institutional programme introducing participants to the European policymaking ecosystem through direct engagement with European institutions, NATO, diplomats, journalists, universities and public-affairs professionals."
                : "Un programa académico e institucional de una semana que introdujo a los participantes en el ecosistema de política pública europea a través del contacto directo con instituciones europeas, la OTAN, diplomáticos, periodistas, universidades y profesionales de los asuntos públicos."}
            </p>

            {/* Institutions visited tags */}
            <div className="mt-8">
              <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-3">
                {isEn ? "Institutions visited" : "Instituciones visitadas"}
              </p>
              <div className="flex flex-wrap gap-2">
                {["European Parliament", "European Commission", "NATO HQ", "U.S. Mission to the EU", "College of Europe", "Euronews", "POLITICO Europe", "House of European History"].map((inst) => (
                  <span key={inst} className="border border-[var(--border-default)] px-3 py-1 text-[0.75rem] text-[var(--text-secondary)]">
                    {inst}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Photo grid */}
          <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-px bg-[var(--border-default)]">
            {BRUSSELS_PHOTOS.map((photo, i) => (
              <div key={photo.src} className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-brand)]">
                <Image
                  src={photo.src}
                  alt={`${t(photo.caption)} ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(min-width: 768px) 33vw, 50vw"
                />
              </div>
            ))}
          </div>

          {/* Thematic blocks */}
          <div className="mt-12 space-y-8">
            {BRUSSELS_BLOCKS.map((block) => (
              <div key={block.title.en} className="grid lg:grid-cols-12 gap-6">
                <h3 className="lg:col-span-4 font-display text-[1rem] font-light leading-[1.3] text-[var(--text-primary)]">
                  {t(block.title)}
                </h3>
                <p className="lg:col-span-8 leading-relaxed text-[var(--text-secondary)]">
                  {t(block.body)}
                </p>
              </div>
            ))}
          </div>

          {/* Topics explored */}
          <div className="mt-10 border-t border-[var(--border-subtle)] pt-8">
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-3">
              {isEn ? "Topics explored" : "Temas abordados"}
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { en: "European governance", es: "Gobernanza europea" },
                { en: "EU decision-making", es: "Toma de decisiones en la UE" },
                { en: "Transatlantic relations", es: "Relaciones transatlánticas" },
                { en: "Security & defence", es: "Seguridad y defensa" },
                { en: "Migration policy", es: "Política migratoria" },
                { en: "Diplomacy", es: "Diplomacia" },
                { en: "Media & political communication", es: "Medios y comunicación política" },
                { en: "Public affairs", es: "Asuntos públicos" },
                { en: "European integration", es: "Integración europea" },
                { en: "International cooperation", es: "Cooperación internacional" },
              ].map((tag) => (
                <span key={tag.en} className="border border-[var(--border-default)] px-3 py-1 text-[0.75rem] text-[var(--text-secondary)]">
                  {t(tag)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 06 Cohorts ───────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <Bracketed variant="kicker">06 · {isEn ? "Cohorts" : "Cohortes"}</Bracketed>
          <p className="mt-4 font-display text-[clamp(1.4rem,2.5vw,2rem)] font-light text-[var(--text-secondary)]">
            {isEn ? "A growing record of delivery." : "Un historial de ejecución en crecimiento."}
          </p>
          <div className="mt-10 grid gap-px sm:grid-cols-3 border border-[var(--border-subtle)] bg-[var(--border-default)]">
            {COHORTS.map((cohort) => (
              <div key={cohort.date.en} className="bg-[var(--surface-primary)] p-7">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-400)]">
                  {t(cohort.date)}
                </p>
                <p className="mt-1 text-[0.72rem] uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
                  {t(cohort.type)}
                </p>
                <p className="mt-3 font-display text-[1rem] font-light text-[var(--text-primary)]">
                  {t(cohort.place)}
                </p>
                <p className="mt-4 text-[0.88rem] leading-relaxed text-[var(--text-secondary)]">
                  {t(cohort.body)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 07 Vision ────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <Bracketed variant="kicker">07 · {isEn ? "Vision" : "Visión"}</Bracketed>
          <blockquote className="mt-8 max-w-4xl font-display text-[clamp(1.5rem,2.8vw,2.4rem)] font-light leading-[1.15] tracking-tight text-[var(--text-primary)]">
            &ldquo;{isEn
              ? "The future of the Atlantic community will depend not only on governments, but on the relationships built between its future leaders."
              : "El futuro de la comunidad atlántica dependerá no solo de los gobiernos, sino de las relaciones que construyan sus futuros líderes."}&rdquo;
          </blockquote>
          <p className="mt-8 max-w-3xl leading-relaxed text-[var(--text-secondary)]">
            {isEn
              ? "By connecting students, researchers, policymakers, journalists, academics and practitioners across both sides of the Atlantic, the Transatlantic Fellowship seeks to strengthen mutual understanding, encourage democratic cooperation and prepare the next generation to address the strategic challenges of the twenty-first century together."
              : "Conectando estudiantes, investigadores, responsables políticos, periodistas, académicos y profesionales a ambos lados del Atlántico, el Transatlantic Fellowship busca fortalecer el entendimiento mutuo, fomentar la cooperación democrática y preparar a la próxima generación para afrontar juntos los desafíos estratégicos del siglo XXI."}
          </p>
        </div>
      </section>

      {/* ─── 08 On the Horizon ────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <Bracketed variant="kicker">08 · {isEn ? "On the Horizon" : "Próximamente"}</Bracketed>
          <p className="mt-6 max-w-2xl leading-relaxed text-[var(--text-secondary)]">
            {isEn
              ? "The Fellowship is conceived as a permanent platform. The formats below are under development for forthcoming cycles."
              : "El Fellowship está concebido como una plataforma permanente. Los formatos siguientes están en desarrollo para próximas ediciones."}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {HORIZON_TAGS.map((tag) => (
              <span
                key={tag.en}
                className="border border-[var(--border-default)] bg-[var(--surface-primary)] px-4 py-2 text-[0.8rem] text-[var(--text-secondary)]"
              >
                {t(tag)}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 09 Visited Institutions ──────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <Bracketed variant="kicker">09 · {isEn ? "Visited Institutions" : "Instituciones Visitadas"}</Bracketed>
          <p className="mt-5 max-w-xl leading-relaxed text-[var(--text-secondary)]">
            {isEn
              ? "A growing list of universities, institutions and organisations visited and engaged with by Fellowship participants across our programmes."
              : "Una lista creciente de universidades, instituciones y organizaciones visitadas por los participantes del Fellowship a lo largo de nuestros programas."}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {VISITED_INSTITUTIONS.map((inst) => (
              <span
                key={inst}
                className="border border-[var(--color-accent-800)] bg-[var(--surface-brand)] px-4 py-2 text-[0.82rem] font-medium text-[var(--text-secondary)]"
              >
                {inst}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 10 Team ──────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <Bracketed variant="kicker">10 · {isEn ? "Programme Team" : "Equipo del Programa"}</Bracketed>
          <p className="mt-4 font-display text-[clamp(1.2rem,2vw,1.8rem)] font-light text-[var(--text-secondary)]">
            {isEn ? "The people behind the Fellowship." : "Las personas detrás del Fellowship."}
          </p>
          <div className="mt-10 grid gap-px sm:grid-cols-2 border border-[var(--border-subtle)] bg-[var(--border-default)]">
            {TEAM.map((member) => (
              <div key={member.name} className="bg-[var(--surface-primary)] p-8">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-400)]">
                  {t(member.role)}
                </p>
                <h3 className="mt-3 font-display text-[1.3rem] font-light text-[var(--text-primary)]">
                  {member.name}
                </h3>
                <p className="mt-4 text-[0.9rem] leading-relaxed text-[var(--text-secondary)]">
                  {t(member.bio)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 11 Get Involved ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <Bracketed variant="kicker">11 · {isEn ? "Get Involved" : "Participar"}</Bracketed>
          <div className="mt-10 grid gap-px sm:grid-cols-2 border border-[var(--border-subtle)] bg-[var(--border-default)]">
            {/* For participants */}
            <div className="bg-[var(--surface-brand)] p-8 md:p-12">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-300)]">
                {isEn ? "For participants" : "Para participantes"}
              </p>
              <h3 className="mt-4 font-display text-[1.4rem] font-light text-[var(--text-primary)]">
                {isEn ? "Apply & request information" : "Solicitar participación"}
              </h3>
              <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
                {isEn
                  ? "Undergraduates, graduate students, young professionals and emerging leaders interested in joining a forthcoming cohort can register their interest and receive details of open opportunities."
                  : "Estudiantes de grado y posgrado, jóvenes profesionales y líderes emergentes interesados en unirse a una próxima cohorte pueden registrar su interés y recibir información sobre las oportunidades abiertas."}
              </p>
              <Link
                href="/contacto"
                className="mt-8 inline-flex items-center gap-2 border border-[var(--color-accent-500)] px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-primary)] transition-colors hover:bg-[var(--color-accent-500)]/10"
              >
                {isEn ? "Apply & get involved" : "Solicitar participación"}
                <ArrowUpRight size={13} />
              </Link>
            </div>

            {/* For institutions */}
            <div className="bg-[var(--surface-primary)] p-8 md:p-12">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                {isEn ? "For institutions & partners" : "Para instituciones y socios"}
              </p>
              <h3 className="mt-4 font-display text-[1.4rem] font-light text-[var(--text-primary)]">
                {isEn ? "Partner with us" : "Convertirse en socio"}
              </h3>
              <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
                {isEn
                  ? "Universities, think tanks, parliaments and organisations wishing to host participants or develop a joint programme are invited to explore a partnership with the Fortius Foundation."
                  : "Universidades, think tanks, parlamentos y organizaciones que deseen acoger participantes o desarrollar un programa conjunto están invitados a explorar una colaboración con la Fundación Fortius."}
              </p>
              <Link
                href="/contacto"
                className="mt-8 inline-flex items-center gap-2 border border-[var(--border-default)] px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] hover:border-[var(--border-default)]"
              >
                {isEn ? "Partner with us" : "Hablar con el equipo"}
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
