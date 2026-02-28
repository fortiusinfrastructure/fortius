import type { Metadata } from 'next';
import { Navbar, Footer } from '@/components/sections';
import { getLocale, getTranslations } from 'next-intl/server';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('AvisoLegal.Meta');
    return {
        title: t('title'),
        description: t('description'),
    };
}

const content = {
    es: {
        title: 'Aviso Legal',
        intro: 'En cumplimiento de lo previsto en la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSICE), se informa que el titular del sitio web es:',
        sections: [
            {
                title: '1. Titularidad',
                body: (
                    <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li><strong>Entidad:</strong> FUNDACIÓN FORTIUS ESPAÑA (en adelante "FUNDACIÓN FORTIUS"), titular de www.ieam.es.</li>
                        <li><strong>NIF:</strong> G56299100</li>
                        <li><strong>Domicilio Social:</strong> Calle Zurbano 71, oficina 9, 28010, Madrid.</li>
                        <li><strong>Dirección Postal:</strong> Calle Zurbano 71, oficina 9, 28010, Madrid</li>
                        <li><strong>Email:</strong> info@fundacionfortius.org</li>
                        <li><strong>Teléfono:</strong> 910053959</li>
                    </ul>
                )
            },
            {
                title: '2. Condiciones de uso',
                body: <p>Los Usuarios se obligan a usar el sitio conforme a la Ley y este Aviso Legal. Se prohíbe cualquier uso que dañe o inutilice redes, servidores o aplicaciones de FUNDACIÓN FORTIUS o terceros.</p>
            },
            {
                title: '3. Propiedad Industrial e Intelectual',
                body: <p>La Web y sus contenidos son propiedad de FUNDACIÓN FORTIUS o licenciantes. No se ceden derechos de explotación; queda prohibida la reproducción o modificación salvo para la navegación o casos autorizados.</p>
            },
            {
                title: '4. Exclusión de responsabilidad',
                body: <p>Se suministra "tal cual", sin garantía sobre disponibilidad o ausencia de errores. FUNDACIÓN FORTIUS no responde de fallos de terceros, seguridad de redes abiertas ni de los contenidos de sitios enlazados (art. 17 LSSICE).</p>
            },
            {
                title: '5. Comunicación de actividades ilícitas o inadecuadas',
                body: <p>Si detectas contenidos ilícitos en sitios enlazados, contacta indicando datos personales, descripción de hechos y documentación que acredite derechos afectados. La comunicación no implica conocimiento efectivo según LSSICE.</p>
            },
            {
                title: '6. Protección de datos y cookies',
                body: <p>Consulta la Política de Privacidad y la Política de Cookies para conocer los tratamientos y tecnologías usadas en la Web.</p>
            },
            {
                title: '7. Vigencia y terminación',
                body: <p>El Aviso Legal rige mientras esté publicado; las modificaciones se comunicarán por el mismo medio. FUNDACIÓN FORTIUS puede suspender el acceso sin preaviso.</p>
            },
            {
                title: '8. Legislación aplicable',
                body: <p>Se rige exclusivamente por la legislación española.</p>
            }
        ]
    },
    en: {
        title: 'Legal Notice',
        intro: 'In compliance with the provisions of Law 34/2002, of July 11, on Information Society Services and Electronic Commerce (LSSICE), you are informed that the owner of the website is:',
        sections: [
            {
                title: '1. Ownership',
                body: (
                    <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li><strong>Entity:</strong> FUNDACIÓN FORTIUS ESPAÑA (hereinafter "FUNDACIÓN FORTIUS"), owner of www.ieam.es.</li>
                        <li><strong>VAT Number:</strong> G56299100</li>
                        <li><strong>Registered Office:</strong> Calle Zurbano 71, office 9, 28010, Madrid, Spain.</li>
                        <li><strong>Postal Address:</strong> Calle Zurbano 71, office 9, 28010, Madrid, Spain</li>
                        <li><strong>Email:</strong> info@fundacionfortius.org</li>
                        <li><strong>Phone:</strong> +34 910053959</li>
                    </ul>
                )
            },
            {
                title: '2. Terms of Use',
                body: <p>Users agree to use the site in accordance with the Law and this Legal Notice. Any use that damages or disables networks, servers, or applications belonging to FUNDACIÓN FORTIUS or third parties is prohibited.</p>
            },
            {
                title: '3. Intellectual and Industrial Property',
                body: <p>The Website and its contents are the property of FUNDACIÓN FORTIUS or its licensors. No exploitation rights are transferred; reproduction or modification is prohibited except for navigation or authorized cases.</p>
            },
            {
                title: '4. Exclusion of Liability',
                body: <p>The site is provided "as is", without warranty regarding availability or absence of errors. FUNDACIÓN FORTIUS is not liable for third-party failures, the security of open networks, or the contents of linked sites (art. 17 LSSICE).</p>
            },
            {
                title: '5. Reporting Illegal or Inappropriate Activities',
                body: <p>If you detect illegal content on linked sites, please contact us indicating relevant personal details, a description of the facts, and documentation proving the affected rights. Reporting does not imply effective knowledge under the LSSICE.</p>
            },
            {
                title: '6. Data Protection and Cookies',
                body: <p>Refer to the Privacy Policy and Cookie Policy to learn about data processing and the technologies used on the Website.</p>
            },
            {
                title: '7. Validity and Termination',
                body: <p>The Legal Notice is valid as long as it is published; modifications will be communicated through the same medium. FUNDACIÓN FORTIUS may suspend access without prior notice.</p>
            },
            {
                title: '8. Applicable Law',
                body: <p>Governed exclusively by Spanish legislation.</p>
            }
        ]
    },
    pt: {
        title: 'Aviso Legal',
        intro: 'Em conformidade com a Lei 34/2002, de 11 de julho, de Serviços da Sociedade da Informação e de Comércio Eletrônico (LSSICE) da Espanha, informa-se que o titular do site é:',
        sections: [
            {
                title: '1. Titularidade',
                body: (
                    <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li><strong>Entidade:</strong> FUNDACIÓN FORTIUS ESPAÑA (doravante "FUNDACIÓN FORTIUS"), titular de www.ieam.es.</li>
                        <li><strong>NIF:</strong> G56299100</li>
                        <li><strong>Sede:</strong> Calle Zurbano 71, oficina 9, 28010, Madrid, Espanha.</li>
                        <li><strong>Endereço Postal:</strong> Calle Zurbano 71, oficina 9, 28010, Madrid, Espanha</li>
                        <li><strong>Email:</strong> info@fundacionfortius.org</li>
                        <li><strong>Telefone:</strong> +34 910053959</li>
                    </ul>
                )
            },
            {
                title: '2. Condições de uso',
                body: <p>Os Usuários comprometem-se a utilizar o site em conformidade com a Lei e este Aviso Legal. É proibido qualquer uso que danifique ou inutilize redes, servidores ou aplicações da FUNDACIÓN FORTIUS ou de terceiros.</p>
            },
            {
                title: '3. Propriedade Intelectual e Industrial',
                body: <p>O Site e seus conteúdos são propriedade da FUNDACIÓN FORTIUS ou de seus licenciadores. Não são cedidos direitos de exploração; a reprodução ou modificação é proibida, exceto para navegação ou casos autorizados.</p>
            },
            {
                title: '4. Exclusão de Responsabilidade',
                body: <p>O site é fornecido "como está", sem garantia quanto à disponibilidade ou ausência de erros. A FUNDACIÓN FORTIUS não se responsabiliza por falhas de terceiros, pela segurança de redes abertas ou pelos conteúdos de sites vinculados (art. 17 LSSICE).</p>
            },
            {
                title: '5. Comunicação de Atividades Ilícitas ou Inadequadas',
                body: <p>Se você detectar conteúdo ilícito em sites vinculados, entre em contato informando seus dados pessoais, uma descrição dos fatos e documentação comprovando os direitos afetados. A comunicação não implica conhecimento efetivo segundo a LSSICE.</p>
            },
            {
                title: '6. Proteção de Dados e Cookies',
                body: <p>Consulte a Política de Privacidade e a Política de Cookies para conhecer os tratamentos de dados e as tecnologias utilizadas no Site.</p>
            },
            {
                title: '7. Vigência e Rescisão',
                body: <p>O Aviso Legal é válido enquanto estiver publicado; modificações serão comunicadas pelo mesmo meio. A FUNDACIÓN FORTIUS poderá suspender o acesso sem aviso prévio.</p>
            },
            {
                title: '8. Legislação Aplicável',
                body: <p>Rige-se exclusivamente pela legislação espanhola.</p>
            }
        ]
    }
};

export default async function AvisoLegalPage() {
    const locale = await getLocale();
    const lc = content[locale as keyof typeof content] || content.es;

    return (
        <>
            <Navbar />
            <main className="flex-grow bg-[#050a14] min-h-screen pt-48 pb-24 text-white/80 font-light">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="font-serif text-4xl text-white mb-8 border-b border-[#c5a059]/30 pb-4 uppercase tracking-wider">{lc.title}</h1>

                    <div className="space-y-8 text-sm md:text-base leading-relaxed">
                        {lc.intro && <p>{lc.intro}</p>}

                        {lc.sections.map((section, idx) => (
                            <section key={idx}>
                                <h2 className="font-cinzel text-xl text-[#c5a059] mb-4">{section.title}</h2>
                                {section.body}
                            </section>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
