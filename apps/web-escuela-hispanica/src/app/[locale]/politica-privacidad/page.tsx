import type { Metadata } from 'next';
import { Navbar, Footer } from '@/components/sections';
import { getLocale, getTranslations } from 'next-intl/server';
import React from 'react';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations('PoliticaPrivacidad.Meta');
    return {
        title: t('title'),
        description: t('description'),
    };
}

const content = {
    es: {
        title: 'Política de Privacidad',
        sections: [
            {
                title: '1. Identidad del responsable',
                body: (
                    <>
                        <p>Esta política de privacidad tiene por objeto informarle sobre cómo la <strong>Escuela Hispánica</strong> recoge, trata y protege los datos de carácter personal de quienes acceden y utilizan la presente página web, en cumplimiento del Reglamento (UE) 2016/679 (RGPD) y de la Ley Orgánica 3/2018 (LOPDGDD).</p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li><strong>Responsable:</strong> Escuela Hispánica</li>
                            <li><strong>Dirección:</strong> Calle Zurbano 71, Oficina 9, 28010, Madrid, España</li>
                            <li><strong>Email:</strong> info@escuelahispanica.org</li>
                        </ul>
                    </>
                )
            },
            {
                title: '2. Finalidades del tratamiento',
                body: (
                    <>
                        <p>Trataremos sus datos personales para las siguientes finalidades:</p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>Atender, gestionar y resolver sus consultas o solicitudes formuladas a través de nuestro formulario de contacto o registro de eventos.</li>
                            <li>Gestión de membresías y donaciones (información, facturación, comunicaciones institucionales).</li>
                            <li>Enviar comunicaciones electrónicas informativas relativas a nuestra actividad, proyectos y eventos, siempre que haya dado su consentimiento expreso.</li>
                        </ul>
                    </>
                )
            },
            {
                title: '3. Plazo de conservación',
                body: <p>Los datos personales proporcionados se conservarán mientras se mantenga la relación (resolución de consulta, mantenimiento de membresía) o hasta que usted solicite su supresión. Posteriormente, los datos serán bloqueados durante los años necesarios para cumplir con las obligaciones legales.</p>
            },
            {
                title: '4. Legitimación para el tratamiento de datos',
                body: <p>La base legal para el tratamiento de sus datos radica en el <strong>consentimiento expreso</strong> prestado por el usuario al proporcionar sus datos a través de los formularios de la web, así como la <strong>ejecución de un contrato</strong> en el caso de la gestión de membresías.</p>
            },
            {
                title: '5. Derechos que le asisten',
                body: (
                    <>
                        <p>Usted tiene derecho a obtener confirmación sobre si en la Escuela Hispánica estamos tratando datos personales que le conciernen, o no. Asimismo, tiene derecho a:</p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>Acceder a sus datos personales.</li>
                            <li>Solicitar la rectificación de los datos inexactos.</li>
                            <li>Solicitar su supresión cuando, entre otros motivos, los datos ya no sean necesarios para los fines que fueron recogidos.</li>
                            <li>Oponerse al tratamiento de los mismos.</li>
                        </ul>
                        <p className="mt-4">Podrá ejercer tales derechos dirigiendo una comunicación por escrito al correo electrónico info@escuelahispanica.org adjuntando una copia de su documento de identidad u otro equivalente.</p>
                    </>
                )
            }
        ]
    },
    en: {
        title: 'Privacy Policy',
        sections: [
            {
                title: '1. Identity of the Data Controller',
                body: (
                    <>
                        <p>This privacy policy aims to inform you about how the <strong>Escuela Hispánica</strong> collects, processes, and protects the personal data of those who access and use this website, in compliance with Regulation (EU) 2016/679 (GDPR) and Organic Law 3/2018 (LOPDGDD).</p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li><strong>Controller:</strong> Escuela Hispánica</li>
                            <li><strong>Address:</strong> Calle Zurbano 71, Office 9, 28010, Madrid, Spain</li>
                            <li><strong>Email:</strong> info@escuelahispanica.org</li>
                        </ul>
                    </>
                )
            },
            {
                title: '2. Purposes of Data Processing',
                body: (
                    <>
                        <p>We process your personal data for the following purposes:</p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>Attending to, managing, and resolving queries or requests made through our contact or event registration forms.</li>
                            <li>Managing memberships and donations (information, billing, institutional communications).</li>
                            <li>Sending informative electronic communications regarding our activities, projects, and events, provided you have given your express consent.</li>
                        </ul>
                    </>
                )
            },
            {
                title: '3. Data Retention Period',
                body: <p>The personal data provided will be kept as long as the relationship is maintained (resolution of query, maintenance of membership) or until you request its deletion. Subsequently, the data will be blocked for the years necessary to comply with legal obligations.</p>
            },
            {
                title: '4. Legal Basis for Processing',
                body: <p>The legal basis for the processing of your data is the <strong>express consent</strong> provided by the user when submitting their data through the website's forms, as well as the <strong>performance of a contract</strong> in the case of membership management.</p>
            },
            {
                title: '5. Your Rights',
                body: (
                    <>
                        <p>You have the right to obtain confirmation on whether or not the Escuela Hispánica is processing personal data concerning you. Additionally, you have the right to:</p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>Access your personal data.</li>
                            <li>Request the rectification of inaccurate data.</li>
                            <li>Request its deletion when, among other reasons, the data is no longer necessary for the purposes for which it was collected.</li>
                            <li>Object to the processing thereof.</li>
                        </ul>
                        <p className="mt-4">You may exercise these rights by sending a written communication to the email address info@escuelahispanica.org, attaching a copy of your ID card or an equivalent document.</p>
                    </>
                )
            }
        ]
    },
    pt: {
        title: 'Política de Privacidade',
        sections: [
            {
                title: '1. Identidade do Controlador de Dados',
                body: (
                    <>
                        <p>Esta política de privacidade tem como objetivo informar sobre como a <strong>Escola Hispânica</strong> (Escuela Hispánica) recolhe, trata e protege os dados pessoais de todos aqueles que acessam e utilizam este site, em conformidade com o Regulamento (UE) 2016/679 (RGPD) e a Lei Orgânica 3/2018 (LOPDGDD).</p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li><strong>Controlador:</strong> Escola Hispânica</li>
                            <li><strong>Endereço:</strong> Calle Zurbano 71, Oficina 9, 28010, Madrid, Espanha</li>
                            <li><strong>Email:</strong> info@escuelahispanica.org</li>
                        </ul>
                    </>
                )
            },
            {
                title: '2. Finalidades do Tratamento',
                body: (
                    <>
                        <p>Trataremos os seus dados pessoais para as seguintes finalidades:</p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>Atender, gerir e resolver as suas consultas ou pedidos realizados através do nosso formulário de contacto ou de inscrição em eventos.</li>
                            <li>Gestão de assinaturas / adesões e doações (informações, faturação, comunicações institucionais).</li>
                            <li>Envio de comunicações eletrónicas informativas referentes à nossa atividade, projetos e eventos, desde que tenha dado o seu consentimento expresso.</li>
                        </ul>
                    </>
                )
            },
            {
                title: '3. Prazo de Conservação',
                body: <p>Os dados pessoais fornecidos serão mantidos enquanto a relação subsistir (resolução da consulta, manutenção da membresia) ou até que solicite a sua eliminação. Posteriormente, os dados serão bloqueados durante os anos necessários para cumprir com as obrigações legais.</p>
            },
            {
                title: '4. Base Legal para o Tratamento',
                body: <p>A base legal para o tratamento dos seus dados reside no <strong>consentimento expresso</strong> fornecido pelo usuário ao submeter os seus dados através dos formulários do site, bem como a <strong>execução de um contrato</strong> no caso da gestão de assinaturas.</p>
            },
            {
                title: '5. Os Seus Direitos',
                body: (
                    <>
                        <p>Tem o direito a obter a confirmação sobre se na Escola Hispânica estamos a processar dados pessoais que lhe digam respeito ou não. Além disso, tem o direito a:</p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>Acessar os seus dados pessoais.</li>
                            <li>Solicitar a retificação de dados incorretos.</li>
                            <li>Solicitar a sua eliminação quando, entre outros motivos, os dados já não forem mais necessários para as finalidades para as quais foram recolhidos.</li>
                            <li>Opor-se ao tratamento dos mesmos.</li>
                        </ul>
                        <p className="mt-4">Pode exercer estes direitos enviando uma comunicação por escrito para o e-mail info@escuelahispanica.org, anexando cópia do seu Cartão de Cidadão, Passaporte ou documento equivalente.</p>
                    </>
                )
            }
        ]
    }
};

export default async function PoliticaPrivacidadPage() {
    const locale = await getLocale();
    const lc = content[locale as keyof typeof content] || content.es;

    return (
        <>
            <Navbar />
            <main className="flex-grow bg-[#050a14] min-h-screen pt-48 pb-24 text-white/80 font-light">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="font-serif text-4xl text-white mb-8 border-b border-[#c5a059]/30 pb-4 uppercase tracking-wider">{lc.title}</h1>

                    <div className="space-y-8 text-sm md:text-base leading-relaxed">
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
