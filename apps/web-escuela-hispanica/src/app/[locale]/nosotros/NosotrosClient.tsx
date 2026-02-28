'use client';

import { useState } from 'react';
import { Navbar, Footer } from '@/components/sections';
import { Link } from '@/i18n/routing';
import { BookOpen, Calendar, Rocket, Shield, Star, Award } from 'lucide-react';
import { teamData } from '@/lib/mock-data/team';
import { MemberBioModal, type TeamMemberWithBio } from '@/components/ui/MemberBioModal';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

const team = teamData;

const academicMembers = [
    { name: "Adelaida Sagarra Gamazo", university: "Universidad de Burgos y Universidad de Valladolid", country: "España" },
    { name: "Alejandro Tello", university: "Fundación Jaime Guzmán", country: "Chile" },
    { name: "Alicia Galván López", university: "Fundación Patria Unida", country: "México" },
    { name: "Alvino-Mario Fantini", university: "The European Conservative", country: "Austria" },
    { name: "Ana Milena Zambrano", university: "Universidad de la Sabana", country: "Colombia" },
    { name: "Ángel Carrión-Tavárez", university: "Instituto de Libertad Económica", country: "Puerto Rico" },
    { name: "Ángel Manuel García Carmona", university: "Universidad CEU San Pablo", country: "España" },
    { name: "Antonio Sosa", university: "University of Texas at Austin", country: "Estados Unidos de América" },
    { name: "Bruno Macciotta Pulisci", university: "Universidad Pontificia de Salamanca", country: "Perú" },
    { name: "Camilo Bello", university: "Instituto Fe y Libertad", country: "Guatemala" },
    { name: "Claudio Arqueros", university: "Fundación Jaime Guzmán", country: "Chile" },
    { name: "Carlos Dávila Núñez", university: "Universidad Nacional de San Antonio Abad del Cusco", country: "Perú" },
    { name: "Carlos Jiménez de Parga Bernal-Quirós", university: "Universidad Nacional de Educación a Distancia", country: "España" },
    { name: "Carroll Rios de Rodríguez", university: "Instituto Fe y Libertad", country: "Guatemala" },
    { name: "Daniel Garza", university: "The Libre Initiative", country: "Estados Unidos de América" },
    { name: "Daniela Silva", university: "Universidade Católica Portuguesa", country: "Portugal" },
    { name: "David Torrijos Castrillejo", university: "Universidad Eclesiástica San Dámaso", country: "España" },
    { name: "Diogo Pacheco de Amorim", university: "", country: "Portugal" },
    { name: "Eduardo Fernández Luiña", university: "Universidad Francisco Marroquín", country: "España" },
    { name: "Eduardo Salas", university: "Libres en Movimiento", country: "Bolivia" },
    { name: "Enrique Pallarés", university: "University of Pennsylvania", country: "Estados Unidos de América" },
    { name: "Eric-Clifford Graf", info: "Estados Unidos de América" },
    { name: "Felipe Mosquera Blanco", university: "Catholic University of America", country: "Estados Unidos de América" },
    { name: "Francisco Mendes Correia", university: "Universidade de Lisboa", country: "Portugal" },
    { name: "Francisco José Contreras Peláez", university: "Universidad de Sevilla", country: "España" },
    { name: "Gustavo Garduño Domínguez", university: "Universidad Panamericana", country: "México" },
    { name: "Germán Scalzo", university: "Universidad Panamericana", country: "México" },
    { name: "Homero Mendizábal", university: "Libres en Movimiento", country: "Bolivia" },
    { name: "Humberto López Vega", university: "Fundación Patria Unida", country: "México" },
    { name: "Izan Chalen Paredes", university: "University of Illinois", country: "Estados Unidos de América" },
    { name: "Jaime Nogueira Pinto", university: "Crítica XXI", country: "Portugal" },
    { name: "Jessica Paduán", university: "Instituto Fe y Libertad", country: "Guatemala" },
    { name: "Jorge Jaraquemada", university: "Fundación Jaime Guzmán", country: "Chile" },
    { name: "Jorge Luis Rodríguez", university: "Instituto de Libertad Económica", country: "Puerto Rico" },
    { name: "Jorge Velarde Rosso", university: "Libera", country: "Bolivia" },
    { name: "José Amengual Soria", university: "Centro Diego de Covarrubias", country: "España" },
    { name: "José Bento da Silva", university: "Warwick Business School", country: "Reino Unido" },
    { name: "D. José Carlos Martín de la Hoz", university: "", country: "España" },
    { name: "José Manuel Castro", university: "Vértice", country: "Chile" },
    { name: "José Maria Cortes", university: "Universidade de Lisboa", country: "Portugal" },
    { name: "José Ignacio Palma", university: "Fundación Jaime Guzmán", country: "Chile" },
    { name: "José Saenz Crespo", university: "Intercollegiate Studies Institute", country: "Estados Unidos de América" },
    { name: "Joshua Treviño", university: "Texas Public Policy Foundation", country: "Estados Unidos de América" },
    { name: "Juan Cruz Isetta", university: "Fundación Rioplatense de Estudios", country: "Argentina" },
    { name: "Juan José Jiménez Lema", university: "In Altum Program", country: "Colombia" },
    { name: "Juan Pablo Andrade Rojas", university: "Universidad Panamericana", country: "México" },
    { name: "Juan Pablo Chamón Saucedo", university: "Libera", country: "Bolivia" },
    { name: "Leonardo Siles Porto", university: "Libera", country: "Bolivia" },
    { name: "Leonor Durão Barroso", university: "Universidade Católica Portuguesa", country: "Portugal" },
    { name: "Lorenzo Montanari", university: "Tholos Foundation", country: "Estados Unidos de América" },
    { name: "Luís Vaz de Campos Moreira Tourinho", university: "Universidade Presbiteriana Mackenzie", country: "Brasil" },
    { name: "Manuel Llamas", university: "Instituto Juan de Mariana", country: "España" },
    { name: "Marcus Boeira", university: "Universidade Federal do Rio Grande do Sul", country: "Brasil" },
    { name: "Mariana Grazioso", university: "Instituto Fe y Libertad", country: "Guatemala" },
    { name: "María Muñoz Sanz-Agero", university: "Universidad Nacional de Educación a Distancia", country: "España" },
    { name: "Mario Silar", university: "Universidad de Deusto", country: "España" },
    { name: "Mateo Rosales Leygue", university: "Libres en Movimiento", country: "Bolivia" },
    { name: "Noah J. Torres", university: "Texas Public Policy Foundation", country: "Estados Unidos de América" },
    { name: "Óscar Miguel Escalante", university: "CREO", country: "Perú" },
    { name: "Pablo Viana", university: "Fundación Rioplatense de Estudios", country: "Uruguay" },
    { name: "Paolo Franco", university: "CREO", country: "Perú" },
    { name: "Reginaldo Menene Oluy Anguesomo", university: "Universidad Francisco de Vitoria", country: "España" },
    { name: "D. Ricardo Rovira Reich Von Häussler", university: "", country: "España" },
    { name: "Robert Tyler", university: "", country: "Reino Unido" },
    { name: "Rubén Manso Olivar", university: "Centro Diego de Covarrubias", country: "España" },
    { name: "Segundo Carafí", university: "Centro de Estudios Cruz del Sur", country: "Argentina" },
    { name: "Santiago de Navascués", university: "Universidad de Navarra", country: "España" },
    { name: "Teresa Nogueira Pinto", university: "Universidade Lusófona", country: "Portugal" },
    { name: "Tiago Cabral Barreira", university: "Universidad Santiago de Compostela", country: "España" },
    { name: "Vanya Thais", university: "", country: "Perú" },
    { name: "Vicente Boceta Álvarez", university: "Centro Diego de Covarrubias", country: "España" },
    { name: "Virginia Boceta Rodríguez", university: "Centro Diego de Covarrubias", country: "España" },
    { name: "Yuriko de la Torre", university: "CREO", country: "Perú" }
];

function MemberCard({
    member,
    onBioClick,
    readBioLabel,
    locale,
}: {
    member: TeamMemberWithBio;
    onBioClick: (m: TeamMemberWithBio) => void;
    readBioLabel: string;
    locale: string;
}) {
    return (
        <div className="flex flex-col items-center group text-center">
            <div className="w-32 h-32 md:w-40 md:h-40 overflow-hidden mb-6 grayscale group-hover:grayscale-0 transition-all duration-700">
                <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full border border-white/10 p-1 bg-[#050a14]"
                />
            </div>
            <h6 className="text-white font-serif text-lg leading-none mb-2">{member.name}</h6>
            <span className="text-white/30 text-[9px] font-cinzel tracking-widest uppercase">
                {typeof member.role === 'string' ? member.role : (member.role[locale as keyof typeof member.role] || member.role.es)}
            </span>
            {member.country && (
                <span className="block text-[#c5a059] text-[10px] font-cinzel tracking-widest uppercase mt-2">{member.country}</span>
            )}
            {member.bio && (
                <button
                    onClick={() => onBioClick(member)}
                    className="mt-3 text-[#c5a059]/40 hover:text-[#c5a059] font-cinzel text-[8px] tracking-[0.3em] uppercase transition-colors duration-200 border-b border-[#c5a059]/20 hover:border-[#c5a059]/60 pb-px"
                >
                    {readBioLabel}
                </button>
            )}
        </div>
    );
}

export default function NosotrosClient() {
    const t = useTranslations('Nosotros');
    const params = useParams();
    const locale = (params?.locale as string) || 'es';
    const [activeMember, setActiveMember] = useState<TeamMemberWithBio | null>(null);
    const [activeAcademic, setActiveAcademic] = useState<string | null>(null);

    return (
        <>
            <Navbar />
            <main className="flex-grow bg-[#050a14] min-h-screen pt-20 animate-fade-in text-white">

                {/* Hero */}
                <section className="relative py-32 md:py-48 px-4 text-center border-b border-white/5 overflow-hidden">
                    <div
                        className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=2000')" }}
                    />
                    <div className="absolute inset-0 bg-[#050a14]/90 z-0" />
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <p className="gold-text font-cinzel tracking-[0.3em] text-xs mb-4 uppercase">{t('Hero.label')}</p>
                        <h1 className="font-serif text-5xl md:text-6xl text-white mb-6 tracking-tight">{t('Hero.title')}</h1>
                        <div className="w-24 h-[1px] bg-[#c5a059] mx-auto mb-8" />
                        <p className="text-white/60 font-light max-w-3xl mx-auto leading-relaxed text-base md:text-lg">
                            {t('Hero.description')}
                        </p>
                    </div>
                </section>

                {/* Misión & Visión */}
                <section className="py-24 px-4 border-t border-white/5 bg-[#050a14]">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                            <div className="relative">
                                <h3 className="text-[#c5a059] font-cinzel text-xs tracking-[0.3em] mb-8 uppercase">{t('MisionVision.misionLabel')}</h3>
                                <div className="w-12 h-[1px] bg-[#c5a059] mb-8" />
                                <p className="text-white/70 font-serif text-lg leading-relaxed">{t('MisionVision.mision')}</p>
                            </div>
                            <div className="relative">
                                <h3 className="text-[#c5a059] font-cinzel text-xs tracking-[0.3em] mb-8 uppercase">{t('MisionVision.visionLabel')}</h3>
                                <div className="w-12 h-[1px] bg-[#c5a059] mb-8" />
                                <p className="text-white/70 font-serif text-lg leading-relaxed">{t('MisionVision.vision')}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Valores */}
                <section className="py-32 px-4 bg-[#08101f] relative">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-24">
                            <p className="text-[#c5a059] font-cinzel text-[10px] tracking-[0.4em] mb-4 uppercase">{t('Valores.label')}</p>
                            <h2 className="text-white font-serif text-4xl md:text-5xl uppercase tracking-widest italic">{t('Valores.title')}</h2>
                            <div className="w-16 h-[1px] bg-[#c5a059] mx-auto mt-8" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="text-center px-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 border border-[#c5a059]/20 mb-8 transform rotate-45">
                                    <Shield className="w-6 h-6 text-[#c5a059] -rotate-45" />
                                </div>
                                <h4 className="text-white font-cinzel text-sm tracking-[0.2em] mb-4 uppercase">{t('Valores.v1')}</h4>
                            </div>
                            <div className="text-center px-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 border border-[#c5a059]/20 mb-8 transform rotate-45">
                                    <Star className="w-6 h-6 text-[#c5a059] -rotate-45" />
                                </div>
                                <h4 className="text-white font-cinzel text-sm tracking-[0.2em] mb-4 uppercase">{t('Valores.v2')}</h4>
                            </div>
                            <div className="text-center px-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 border border-[#c5a059]/20 mb-8 transform rotate-45">
                                    <Award className="w-6 h-6 text-[#c5a059] -rotate-45" />
                                </div>
                                <h4 className="text-white font-cinzel text-sm tracking-[0.2em] mb-4 uppercase">{t('Valores.v3')}</h4>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Qué Hacemos */}
                <section className="py-32 px-4 bg-[#050a14]">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-24">
                            <h2 className="text-white font-serif text-4xl md:text-5xl uppercase tracking-[0.2em]">{t('WhatWeDo.title')}</h2>
                            <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto mt-8" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/5">
                            <div className="bg-[#050a14] p-12 text-center border border-white/5">
                                <BookOpen className="w-8 h-8 text-[#c5a059] mx-auto mb-8 opacity-50" />
                                <h5 className="font-cinzel text-xs tracking-widest text-[#c5a059] mb-4 uppercase">{t('WhatWeDo.pub.title')}</h5>
                                <p className="text-white/50 text-xs leading-relaxed mb-8">{t('WhatWeDo.pub.desc')}</p>
                                <Link href="/publicaciones" className="text-white/30 hover:text-[#c5a059] text-[9px] font-cinzel tracking-widest uppercase transition-colors">{t('WhatWeDo.pub.link')}</Link>
                            </div>
                            <div className="bg-[#050a14] p-12 text-center border border-white/5">
                                <Calendar className="w-8 h-8 text-[#c5a059] mx-auto mb-8 opacity-50" />
                                <h5 className="font-cinzel text-xs tracking-widest text-[#c5a059] mb-4 uppercase">{t('WhatWeDo.act.title')}</h5>
                                <p className="text-white/50 text-xs leading-relaxed mb-8">{t('WhatWeDo.act.desc')}</p>
                                <Link href="/actividades" className="text-white/30 hover:text-[#c5a059] text-[9px] font-cinzel tracking-widest uppercase transition-colors">{t('WhatWeDo.act.link')}</Link>
                            </div>
                            <div className="bg-[#050a14] p-12 text-center border border-white/5">
                                <Rocket className="w-8 h-8 text-[#c5a059] mx-auto mb-8 opacity-50" />
                                <h5 className="font-cinzel text-xs tracking-widest text-[#c5a059] mb-4 uppercase">{t('WhatWeDo.proj.title')}</h5>
                                <p className="text-white/50 text-xs leading-relaxed mb-8">{t('WhatWeDo.proj.desc')}</p>
                                <Link href="/proyectos" className="text-white/30 hover:text-[#c5a059] text-[9px] font-cinzel tracking-widest uppercase transition-colors">{t('WhatWeDo.proj.link')}</Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quiénes Somos - Team */}
                <section className="py-32 px-4 bg-[#08101f]">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-32">
                            <h2 className="text-white font-serif text-4xl md:text-5xl uppercase tracking-[0.2em] mb-6">{t('Team.title')}</h2>
                        </div>

                        <div className="mb-40">
                            <h4 className="text-[#c5a059] font-cinzel text-[10px] tracking-[0.5em] text-center mb-20 uppercase">{t('Team.junta')}</h4>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-8">
                                {team.junta.map((member, i) => (
                                    <MemberCard key={i} member={member} onBioClick={setActiveMember} readBioLabel={t('Team.readBio')} locale={locale} />
                                ))}
                            </div>
                        </div>

                        <div className="mb-40 border-t border-white/5 pt-32">
                            <h4 className="text-[#c5a059] font-cinzel text-[10px] tracking-[0.5em] text-center mb-20 uppercase">{t('Team.consejo')}</h4>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-8">
                                {team.consejo.map((member, i) => (
                                    <MemberCard key={i} member={member} onBioClick={setActiveMember} readBioLabel={t('Team.readBio')} locale={locale} />
                                ))}
                            </div>
                        </div>

                        <div className="border-t border-white/5 pt-32 mb-40">
                            <h4 className="text-[#c5a059] font-cinzel text-[10px] tracking-[0.5em] text-center mb-20 uppercase">{t('Team.comiteEmpresarial')}</h4>
                            <div className="flex justify-center">
                                <MemberCard member={team.comiteEmpresarial[0]} onBioClick={setActiveMember} readBioLabel={t('Team.readBio')} locale={locale} />
                            </div>
                        </div>

                        <div className="border-t border-white/5 pt-32">
                            <h4 className="text-[#c5a059] font-cinzel text-[10px] tracking-[0.5em] text-center mb-20 uppercase">{t('Team.equipo')}</h4>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-8">
                                {team.equipo.map((member, i) => (
                                    <MemberCard key={i} member={member} onBioClick={setActiveMember} readBioLabel={t('Team.readBio')} locale={locale} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Academic Members */}
                <section className="py-32 px-4 bg-[#050a14] border-t border-white/5">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-20">
                            <h3 className="text-white font-serif text-3xl md:text-5xl mb-4 uppercase tracking-tight">{t('Academic.title')}</h3>
                            <p className="text-white/80 font-serif text-lg mb-2">{t('Academic.subtitle')}</p>
                            <p className="text-[#c5a059] font-cinzel text-[10px] tracking-[0.4em] uppercase">{t('Academic.updated')}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-0 border-t border-white/5 pt-12 text-left">
                            {academicMembers.map((member, i) => {
                                const isActive = activeAcademic === member.name;
                                return (
                                    <div key={i}
                                        className={`group flex items-start gap-4 py-4 border-b border-white/5 hover:border-[#c5a059]/30 transition-colors cursor-pointer ${isActive ? 'bg-[#c5a059]/5 border-[#c5a059]/30' : ''}`}
                                        onClick={() => setActiveAcademic(isActive ? null : member.name)}
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 transition-opacity ${isActive ? 'bg-[#c5a059] opacity-100' : 'bg-[#c5a059] opacity-40 group-hover:opacity-100'}`} />
                                        <div className="flex flex-col w-full">
                                            <span className={`font-serif text-sm tracking-wide transition-colors ${isActive ? 'text-[#c5a059]' : 'text-white group-hover:text-[#c5a059]'}`}>
                                                {member.name}
                                            </span>
                                            <div className={`overflow-hidden transition-all duration-300 ${isActive ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                                {member.university && (
                                                    <span className="block text-white/50 text-xs font-light mb-2">{member.university}</span>
                                                )}
                                                {member.country && (
                                                    <span className="inline-block px-2 py-0.5 border border-[#c5a059]/30 text-[#c5a059] text-[9px] font-cinzel tracking-widest uppercase">
                                                        {member.country}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Colabora CTA */}
                <section className="py-32 px-4 bg-black relative">
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-white font-serif text-4xl md:text-5xl uppercase tracking-[0.3em] mb-8">{t('Colabora.title')}</h2>
                            <p className="text-white/50 font-light text-sm max-w-2xl mx-auto">{t('Colabora.subtitle')}</p>
                        </div>
                        <div className="bg-[#050a14]/80 backdrop-blur-sm border border-[#c5a059]/20 p-12 md:p-16 text-center flex flex-col items-center">
                            <h4 className="text-white font-cinzel text-xl md:text-2xl tracking-[0.2em] mb-6 uppercase">{t('Colabora.ctaTitle')}</h4>
                            <p className="text-white/60 text-sm md:text-base leading-relaxed mb-10 max-w-2xl text-center">
                                {t('Colabora.ctaDesc')}
                            </p>
                            <Link href="/colabora" className="border border-[#c5a059] text-[#050a14] bg-[#c5a059] px-10 py-4 font-cinzel text-xs tracking-[0.2em] hover:bg-transparent hover:text-[#c5a059] transition-all uppercase">
                                {t('Colabora.ctaBtn')}
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />

            <MemberBioModal member={activeMember} onClose={() => setActiveMember(null)} />
        </>
    );
}
