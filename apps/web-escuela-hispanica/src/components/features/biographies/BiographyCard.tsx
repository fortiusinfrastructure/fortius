'use client';

import React, { useRef } from 'react';
import { User, ChevronDown, ChevronUp, Quote } from 'lucide-react';
import { RichText } from '@/components/ui/RichText';

interface BiographyCardProps {
    name: string;
    period: string;
    nationality: string;
    shortBio: string;
    contribution: string;
    index: number;
    id: string;
    image: string | null;
    isExpanded: boolean;
    onToggle: () => void;
}

export const BiographyCard: React.FC<BiographyCardProps> = ({
    name,
    period,
    nationality,
    shortBio,
    contribution,
    index,
    id,
    image,
    isExpanded,
    onToggle,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isEven = index % 2 === 0;

    const handleClick = () => {
        const el = cardRef.current;
        if (el) {
            const prevTop = el.getBoundingClientRect().top;
            const prevScrollY = window.scrollY;
            onToggle();
            requestAnimationFrame(() => {
                const newTop = el.getBoundingClientRect().top;
                window.scrollTo({ top: prevScrollY + (newTop - prevTop), behavior: 'instant' as ScrollBehavior });
            });
        } else {
            onToggle();
        }
    };

    return (
        <div ref={cardRef} className={`relative flex flex-col md:flex-row items-center w-full ${isEven ? 'md:justify-start' : 'md:justify-end'} pl-12 md:pl-0`}>
            {/* Dot on the timeline */}
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-10 md:top-1/2 md:-translate-y-1/2 w-3 h-3 rounded-full bg-[#c5a059] z-10 shadow-[0_0_10px_rgba(197,160,89,0.5)]" />

            {/* Connecting line on desktop */}
            <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-px bg-[#c5a059]/30 w-12 ${isEven ? 'right-[50%] translate-x-1/2 mr-6' : 'left-[50%] -translate-x-1/2 ml-6'}`} />

            <div
                onClick={handleClick}
                className={`w-full md:w-[calc(50%-3rem)] cursor-pointer bg-[#0a111e]/40 border border-white/5 hover:border-[#c5a059]/30 transition-all duration-500 rounded-sm overflow-hidden group ${isExpanded ? 'shadow-[0_0_40px_rgba(0,0,0,0.4)] border-[#c5a059]/20' : ''}`}
            >
                {/* Minimal State */}
                <div className="p-6 md:p-8 flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#050a14] border border-[#c5a059]/20 flex items-center justify-center group-hover:border-[#c5a059]/50 transition-colors duration-500 overflow-hidden">
                        {image ? (
                            <img src={`/images/biografias/${image}`} alt={name} className="w-full h-full object-cover" />
                        ) : (
                            <User size={24} className="text-[#c5a059]/60 group-hover:text-[#c5a059] transition-colors" />
                        )}
                    </div>

                    <div className="flex-grow">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="font-cinzel text-[10px] tracking-[0.2em] text-[#c5a059] block mb-1">
                                    {period}
                                </span>
                                <h3 className="font-serif text-xl md:text-2xl text-white group-hover:text-[#c5a059] transition-colors duration-500">
                                    {name}
                                </h3>
                                <span className="font-serif text-xs text-white/40 italic">
                                    {nationality}
                                </span>
                            </div>
                            <div className="text-[#c5a059]/40 group-hover:text-[#c5a059] transition-colors">
                                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Expanded State */}
                <div
                    className={`transition-all duration-700 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                    <div className="px-8 pb-8 pt-2 md:px-12 md:pb-12 border-t border-white/5">
                        <div className="space-y-8">
                            <div>
                                <h4 className="font-cinzel text-[10px] tracking-[0.3em] text-[#c5a059] mb-4 uppercase">
                                    Biografía
                                </h4>
                                <div className="font-serif text-white/70 leading-relaxed font-light text-base md:text-lg text-pretty space-y-4">
                                    {shortBio.split("\n").filter(p => p.trim()).map((para, i) => (
                                        <p key={i}><RichText text={para} /></p>
                                    ))}
                                </div>
                            </div>

                            <div className="relative">
                                <Quote size={40} className="absolute -left-6 -top-4 text-[#c5a059]/10" />
                                <h4 className="font-cinzel text-[10px] tracking-[0.3em] text-[#c5a059] mb-4 uppercase">
                                    Aportación Filosófica
                                </h4>
                                <p className="font-serif text-white/80 leading-relaxed text-base md:text-lg text-pretty">
                                    <RichText text={contribution} />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
