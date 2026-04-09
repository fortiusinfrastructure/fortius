'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { BiographyCard } from './BiographyCard';
import { biographyIds, biographyImages } from '@/data/biographies-list';

export const BiographyTimeline: React.FC = () => {
    const t = useTranslations('Biografias.authors');
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="relative w-full py-20">
            {/* The continuous vertical line */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#c5a059]/30 to-transparent" />
            
            <div className="space-y-16 md:space-y-32">
                {biographyIds.map((id, index) => (
                    <BiographyCard
                        key={id}
                        index={index}
                        id={id}
                        image={biographyImages[id]}
                        isExpanded={openIndex === index}
                        onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                        name={t(`${id}.name`)}
                        period={t(`${id}.period`)}
                        nationality={t(`${id}.nationality`)}
                        shortBio={t(`${id}.shortBio`)}
                        contribution={t(`${id}.contribution`)}
                    />
                ))}
            </div>
        </div>
    );
};
