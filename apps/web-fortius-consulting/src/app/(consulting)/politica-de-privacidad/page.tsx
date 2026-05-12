import type { Metadata } from "next";
import { Bracketed } from "@/components/system/Bracketed";
import { LegalSection } from "@/components/consulting-v2/LegalSection";

export const metadata: Metadata = {
    title: "Política de Privacidad — Fortius Consulting",
    description:
        "Política de privacidad de Fortius Strategies SL: responsable, finalidades, conservación, derechos del usuario y procedencia de los datos.",
};

const PRIVACY_ITEMS = [
    {
        id: "responsable",
        number: "01",
        title: "Responsable",
        content: (
            <>
                <ul className="space-y-1 list-none">
                    <li><strong>Identidad Empresa:</strong> Fortius Strategies SL</li>
                    <li><strong>NIF:</strong> B72443567</li>
                    <li><strong>Dir. Postal:</strong> C/ Cabo De La Estaca De Bares 30 (Las Rozas de Madrid)</li>
                    <li><strong>CP:</strong> 28290</li>
                    <li><strong>E-Mail:</strong> <a href="mailto:info@fortiusconsulting.org" className="underline hover:text-[var(--color-accent-400)] transition-colors">info@fortiusconsulting.org</a></li>
                </ul>
                <p>Datos de contacto del delegado en protección de datos: No se dispone de Delegado.</p>
            </>
        ),
    },
    {
        id: "finalidades",
        number: "02",
        title: "Finalidades",
        content: (
            <p>
                Descripción ampliada de la finalidad/es del tratamiento:
                Trataremos sus datos para la gestión administrativa y contable.
            </p>
        ),
    },
    {
        id: "conservacion",
        number: "03",
        title: "Conservación",
        content: (
            <p>
                Plazos o criterios de conservación de los datos: Los datos personales
                proporcionados se conservarán mientras se mantenga la relación con la entidad
                y no se solicite su supresión por el interesado, serán conservados conforme a
                los plazos legales establecidos en materia fiscal y contable, tomando como
                referencia la última comunicación.
            </p>
        ),
    },
    {
        id: "decisiones",
        number: "04",
        title: "Decisiones",
        content: (
            <p>
                Decisiones automatizadas, perfiles y lógica aplicada: La empresa NO tomará
                decisiones automatizadas, perfiles o lógica aplicada a sus datos.
            </p>
        ),
    },
    {
        id: "legitimacion",
        number: "05",
        title: "Legitimación",
        content: (
            <p>
                Legitimación por ejecución de un contrato: Debido a que el tratamiento es
                necesario para la ejecución de un contrato mercantil, en el que usted es parte,
                se hace constar que el tipo de contrato de que se trata, es el citado contrato
                mercantil o la relación precontractual. Como la comunicación de datos
                personales es un requisito legal o contractual y un requisito necesario para
                suscribir el citado contrato, se informa al interesado que está obligado a
                facilitar los datos personales, y así mismo que las consecuencias de no
                hacerlo pueden suponer la no prestación del servicio solicitado.
            </p>
        ),
    },
    {
        id: "destinatarios",
        number: "06",
        title: "Destinatarios",
        content: (
            <p>
                Durante el periodo de duración del tratamiento, Fortius Strategies SL no
                realizará ninguna cesión, salvo obligación legal, ni tampoco transferencia alguna.
            </p>
        ),
    },
    {
        id: "derechos",
        number: "07",
        title: "Derechos",
        content: (
            <>
                <p>El usuario tiene los siguientes derechos:</p>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Derecho a solicitar el acceso a sus datos personales.</li>
                    <li>Derecho a solicitar su rectificación o supresión.</li>
                    <li>Derecho a solicitar la limitación de su tratamiento.</li>
                    <li>Derecho a oponerse al tratamiento.</li>
                    <li>Derecho a la portabilidad de los datos.</li>
                    <li>Derecho a retirar el consentimiento prestado.</li>
                </ul>
                <p>
                    Cualquier persona tiene derecho a obtener confirmación sobre si en la
                    Entidad estamos tratando datos personales que les conciernan, o no. Las
                    personas interesadas tienen derecho a acceder a sus datos personales, así como
                    a solicitar la rectificación de los datos inexactos o, en su caso, solicitar
                    su supresión cuando, entre otros motivos, los datos ya no sean necesarios
                    para los fines que fueron recogidos.
                </p>
                <p>
                    En determinadas circunstancias, los interesados podrán solicitar la
                    limitación del tratamiento de sus datos, en cuyo caso únicamente los
                    conservaremos para el ejercicio o la defensa de reclamaciones. En determinadas
                    circunstancias y por motivos relacionados con su situación particular, los
                    interesados podrán oponerse al tratamiento de sus datos. En este caso, la
                    entidad, dejará de tratar los datos, salvo por motivos legítimos imperiosos,
                    o el ejercicio o la defensa de posibles reclamaciones.
                </p>
                <p>
                    Si ha otorgado su consentimiento para alguna finalidad concreta, tiene
                    derecho a retirar el consentimiento otorgado en cualquier momento, sin que
                    ello afecte a la licitud del tratamiento basado en el consentimiento previo a
                    su retirada. Para ello podrá emplear los formularios habilitados por la
                    empresa, o bien dirigir un escrito a Fortius Strategies SL – C/ Cabo De La
                    Estaca De Bares 30 (Las Rozas de Madrid) – CP: 28290. También puede enviar
                    un email a:{" "}
                    <a
                        href="mailto:info@fortiusconsulting.org"
                        className="underline hover:text-[var(--color-accent-400)] transition-colors"
                    >
                        info@fortiusconsulting.org
                    </a>
                </p>
                <p>
                    En caso de que sienta vulnerados sus derechos en lo concerniente a la
                    protección de sus datos personales, especialmente cuando no haya obtenido
                    satisfacción en el ejercicio de sus derechos, puede presentar una reclamación
                    ante la Autoridad de Control en materia de Protección de Datos competente a
                    través de su sitio web:{" "}
                    <a
                        href="https://www.aepd.es"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-[var(--color-accent-400)] transition-colors"
                    >
                        www.aepd.es
                    </a>
                    . En cumplimiento de lo prevenido en el artículo 21 de la Ley 34/2002 de
                    servicios de la sociedad de la información y comercio electrónico, si usted
                    no desea recibir más información sobre nuestros servicios, puede darse de
                    baja en la siguiente dirección de correo electrónico de la entidad,
                    indicando en el asunto «No enviar correos».
                </p>
            </>
        ),
    },
    {
        id: "procedencia",
        number: "08",
        title: "Procedencia de los datos",
        content: (
            <>
                <p>
                    Los datos personales que tratamos en Fortius Strategies SL proceden
                    directamente de usted. Las categorías de datos que se tratan son:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Datos de identificación</li>
                    <li>Códigos o claves de identificación</li>
                    <li>Direcciones postales o electrónicas</li>
                    <li>Información comercial</li>
                    <li>Datos económicos</li>
                    <li>El origen étnico o racial</li>
                    <li>Las opiniones políticas</li>
                    <li>Las convicciones religiosas o filosóficas</li>
                    <li>La afiliación sindical</li>
                    <li>Datos genéticos</li>
                    <li>Datos biométricos dirigidos a identificar de manera unívoca a una persona física</li>
                    <li>Datos relativos a la salud</li>
                    <li>Datos relativos a la vida sexual o la orientación sexual de una persona física</li>
                </ul>
            </>
        ),
    },
];

export default function PoliticaPrivacidadPage() {
    return (
        <main id="main-content" className="pt-[var(--nav-height)]">
            <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-24 md:py-36">
                <Bracketed variant="tag">Política de Privacidad</Bracketed>
                <h1 className="mt-6 font-display text-[clamp(2.4rem,5.5vw,4.8rem)] font-light leading-[1.03] tracking-tight text-[var(--text-primary)] max-w-3xl">
                    Fortius Strategies SL{" "}
                    <span className="italic text-[var(--color-accent-400)]">
                        Protección de datos personales.
                    </span>
                </h1>
                <p className="mt-8 text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                    A continuación le ofrecemos la información relativa al tratamiento de
                    datos personales que realizamos en nuestra empresa conforme al Reglamento
                    General de Protección de Datos y a la normativa vigente en materia de
                    privacidad.
                </p>

                <div className="mt-20">
                    <LegalSection items={PRIVACY_ITEMS} />
                </div>
            </section>
        </main>
    );
}
