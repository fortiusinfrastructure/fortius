import type { Metadata } from 'next';
import { Navbar, Footer } from '@/components/sections';
import { getLocale, getTranslations } from 'next-intl/server';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('PoliticaCookies.Meta');
    return {
        title: t('title'),
        description: t('description'),
    };
}

const content = {
    es: {
        title: 'Política de Cookies',
        sections: [
            {
                title: '1. ¿Qué son las cookies?',
                body: <p>Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información que contengan y de la forma en que utilice su equipo, pueden utilizarse para reconocer al usuario.</p>
            },
            {
                title: '2. ¿Qué tipos de cookies utiliza esta página web?',
                body: (
                    <ul className="list-disc pl-6 space-y-4">
                        <li><strong>Cookies técnicas:</strong> Son aquellas que permiten al usuario la navegación a través de una página web, plataforma o aplicación y la utilización de las diferentes opciones o servicios que en ella existan.</li>
                        <li><strong>Cookies de personalización:</strong> Son aquellas que permiten al usuario acceder al servicio con algunas características de carácter general predefinidas en función de una serie de criterios en el terminal del usuario como por ejemplo serian el idioma, el tipo de navegador a través del cual accede al servicio, etc.</li>
                        <li><strong>Cookies de análisis:</strong> Son aquellas que bien tratadas por nosotros o por terceros, nos permiten cuantificar el número de usuarios y así realizar la medición y análisis estadístico de la utilización que hacen los usuarios del servicio ofertado. Para ello se analiza su navegación en nuestra página web con el fin de mejorar la oferta de productos o servicios que le ofrecemos.</li>
                    </ul>
                )
            },
            {
                title: '3. Revocación y eliminación de cookies',
                body: (
                    <>
                        <p>Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de las opciones del navegador instalado en tu ordenador. En los siguientes enlaces encontrarás información adicional sobre las opciones de configuración de las cookies en los distintos navegadores:</p>
                        <ul className="list-disc pl-6 mt-4 space-y-2 text-[#c5a059]">
                            <li>Google Chrome</li>
                            <li>Mozilla Firefox</li>
                            <li>Safari</li>
                            <li>Microsoft Edge</li>
                        </ul>
                    </>
                )
            }
        ]
    },
    en: {
        title: 'Cookie Policy',
        sections: [
            {
                title: '1. What are cookies?',
                body: <p>A cookie is a file downloaded to your computer when accessing certain web pages. Cookies allow a web page, among other things, to store and retrieve information about a user's or their equipment's browsing habits and, depending on the information they contain and how the equipment is used, they can be utilized to recognize the user.</p>
            },
            {
                title: '2. What types of cookies does this website use?',
                body: (
                    <ul className="list-disc pl-6 space-y-4">
                        <li><strong>Technical cookies:</strong> Those that allow the user to navigate through a website, platform, or application and use the different options or services existing on it.</li>
                        <li><strong>Personalization cookies:</strong> Those that allow the user to access the service with some predefined general characteristics based on a series of criteria in the user's terminal, such as language, type of browser, etc.</li>
                        <li><strong>Analysis cookies:</strong> Those that, whether processed by us or third parties, allow us to quantify the number of users and thus carry out measurement and statistical analysis of the use made by users of the offered service. To do this, browsing on our website is analyzed to improve our offer of products or services.</li>
                    </ul>
                )
            },
            {
                title: '3. Revocation and deletion of cookies',
                body: (
                    <>
                        <p>You can allow, block, or delete cookies installed on your equipment by configuring the options of the browser installed on your computer. Through the following links, you will find additional information on the configuration options for cookies in the various browsers:</p>
                        <ul className="list-disc pl-6 mt-4 space-y-2 text-[#c5a059]">
                            <li>Google Chrome</li>
                            <li>Mozilla Firefox</li>
                            <li>Safari</li>
                            <li>Microsoft Edge</li>
                        </ul>
                    </>
                )
            }
        ]
    },
    pt: {
        title: 'Política de Cookies',
        sections: [
            {
                title: '1. O que são cookies?',
                body: <p>Um cookie é um ficheiro que é descarregado no seu computador ao aceder a determinadas páginas da web. Os cookies permitem a uma página web, entre outras coisas, armazenar e recuperar informações sobre os hábitos de navegação de um utilizador ou do seu equipamento e, dependendo das informações que contêm e da forma como o equipamento é utilizado, podem ser utilizados para reconhecer o utilizador.</p>
            },
            {
                title: '2. Que tipos de cookies são utilizados neste site?',
                body: (
                    <ul className="list-disc pl-6 space-y-4">
                        <li><strong>Cookies técnicos:</strong> São aqueles que permitem ao utilizador a navegação através de uma página web, plataforma ou aplicação e a utilização das diferentes opções ou serviços que nela existam.</li>
                        <li><strong>Cookies de personalização:</strong> São aqueles que permitem ao utilizador aceder ao serviço com algumas características de carácter geral predefinidas com base num conjunto de critérios no terminal do utilizador, tais como o idioma, o tipo de navegador, etc.</li>
                        <li><strong>Cookies de análise:</strong> São aqueles que, tratados por nós ou por terceiros, nos permitem quantificar o número de utilizadores e, assim, realizar a medição e análise estatística da utilização que os utilizadores fazem do serviço oferecido. Para o efeito, analisa-se a sua navegação na nossa página web, a fim de melhorar a oferta de produtos ou serviços que disponibilizamos.</li>
                    </ul>
                )
            },
            {
                title: '3. Revogação e eliminação de cookies',
                body: (
                    <>
                        <p>Pode permitir, bloquear ou eliminar os cookies instalados no seu computador configurando as opções do navegador instalado no seu computador. Nos seguintes links encontrará informações adicionais sobre as opções de configuração de cookies para os vários navegadores:</p>
                        <ul className="list-disc pl-6 mt-4 space-y-2 text-[#c5a059]">
                            <li>Google Chrome</li>
                            <li>Mozilla Firefox</li>
                            <li>Safari</li>
                            <li>Microsoft Edge</li>
                        </ul>
                    </>
                )
            }
        ]
    }
};

export default async function PoliticaCookiesPage() {
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
