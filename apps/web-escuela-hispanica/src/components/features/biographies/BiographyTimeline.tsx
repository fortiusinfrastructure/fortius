'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { BiographyCard } from './BiographyCard';
import { biographyIds } from '@/data/biographies-list';

export const BiographyTimeline: React.FC = () => {
    const t = useTranslations('Biografias.authors');

    return (
        <div className="relative w-full py-20">
            {/* The continuous vertical line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#c5a059]/30 to-transparent" />
            
            <div className="space-y-32">
                {biographyIds.map((id, index) => (
                    <BiographyCard
                        key={id}
                        index={index}
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
