import React from 'react';
import { Link } from '@/i18n/routing';

interface HeroProps {
  onExplore?: () => void;
  onProjects?: () => void;
}

const Hero: React.FC<HeroProps> = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 opacity-30 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000')"
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050a14]/60 via-[#050a14]/80 to-[#050a14] z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <p className="gold-text font-cinzel tracking-[0.3em] text-xs mb-6 animate-fade-in">
          TRADICIÓN INTELECTUAL DEL MUNDO HISPÁNICO
        </p>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight animate-fade-in">
          Escuela<br />
          <span className="gold-text">Hispánica</span>
        </h1>

        <div className="w-24 h-[1px] bg-[#c5a059] mx-auto mb-8" />

        <p className="text-xl md:text-2xl text-white/70 font-light max-w-2xl mx-auto mb-12 leading-relaxed font-serif italic animate-fade-in">
          Un espacio de conocimiento y cultura dedicado a estudiar, preservar y difundir
          el legado intelectual del mundo hispánico.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Link
            href="/publicaciones"
            className="bg-[#c5a059] text-[#050a14] px-8 py-4 font-cinzel text-sm tracking-widest hover:bg-white transition-all shadow-lg"
          >
            EXPLORAR EL ARCHIVO
          </Link>
          <Link
            href="/proyectos/1776"
            className="border border-white/20 text-white px-8 py-4 font-cinzel text-sm tracking-widest hover:border-[#c5a059] hover:text-[#c5a059] transition-all"
          >
            PROYECTO 1776
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#c5a059] to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
