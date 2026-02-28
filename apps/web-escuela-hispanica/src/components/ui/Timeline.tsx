import React from 'react';
import { BookOpen, Milestone } from 'lucide-react';
import { LocalizedText } from '@/types';
import { getLocalizedValue } from '@/lib/i18n/localize';

export type TimelineItemType = 'historical' | 'philosophical';

export interface TimelineItem {
    id: string;
    year: string;
    title: string | LocalizedText;
    description: string | LocalizedText;
    type: TimelineItemType;
}

interface TimelineProps {
    items: TimelineItem[];
    locale: string;
}

export const Timeline: React.FC<TimelineProps> = ({ items, locale }) => {
    return (
        <div className="relative w-full max-w-6xl mx-auto py-20 px-6">
            {/* Central Line (Desktop) / Left Line (Mobile) */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#c5a059]/40 to-transparent transform md:-translate-x-1/2" />

            <div className="space-y-20">
                {items.map((item, index) => {
                    const isEven = index % 2 === 0;
                    const isPhilosophical = item.type === 'philosophical';

                    return (
                        <div key={item.id} className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''}`}>

                            {/* Content Side */}
                            <div className={`md:w-1/2 mb-8 md:mb-0 pl-20 md:pl-0 ${isEven ? 'md:pl-24 pr-4' : 'md:pr-24 pl-4'}`}>
                                <div className={`flex flex-col relative group/card p-6 md:p-8 rounded-sm bg-[#0a111e]/20 border border-white/5 hover:border-[#c5a059]/20 transition-all duration-500 ${isEven ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}>

                                    {/* Decorative corner accent */}
                                    <div className={`absolute top-0 w-2 h-2 border-t border-[#c5a059]/40 transition-all duration-500 group-hover/card:w-full ${isEven ? 'left-0 border-l' : 'right-0 border-r'}`} />

                                    <span className={`font-cinzel text-xs tracking-[0.2em] mb-3 block ${isPhilosophical ? 'text-[#c5a059]' : 'text-white/40'}`}>
                                        {item.year}
                                    </span>
                                    <h3 className={`font-serif text-2xl md:text-3xl mb-4 leading-tight ${isPhilosophical ? 'text-white' : 'text-white/80'}`}>
                                        {getLocalizedValue(item.title, locale)}
                                    </h3>
                                    <p className="font-serif text-base text-white/50 leading-relaxed font-light">
                                        {getLocalizedValue(item.description, locale)}
                                    </p>
                                </div>
                            </div>

                            {/* Marker */}
                            <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 top-0 md:top-8 flex items-center justify-center z-10">
                                <div className="absolute w-3 h-3 bg-[#050a14] rounded-full" /> {/* Mask for line behind marker */}
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center border bg-[#050a14] transition-all duration-500 relative z-20 shadow-[0_0_20px_-5px_rgba(0,0,0,0.8)] ${isPhilosophical
                                    ? 'border-[#c5a059] text-[#c5a059] shadow-[#c5a059]/10'
                                    : 'border-white/10 text-white/30'
                                    }`}>
                                    {isPhilosophical ? <BookOpen size={16} strokeWidth={1.5} /> : <Milestone size={16} strokeWidth={1.5} />}
                                </div>
                            </div>

                            {/* Empty Side (for balancing the layout) */}
                            <div className="hidden md:block md:w-1/2" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
