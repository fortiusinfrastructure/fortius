'use client';

import { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import type { LocalizedText } from '@/types';

export interface TeamMemberWithBio {
    name: string;
    role: string | LocalizedText;
    image: string;
    country?: string;
    bio?: string;
    institution?: string;
}

interface MemberBioModalProps {
    member: TeamMemberWithBio | null;
    onClose: () => void;
}

export function MemberBioModal({ member, onClose }: MemberBioModalProps) {
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        },
        [onClose]
    );

    useEffect(() => {
        if (!member) return;
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [member, handleKeyDown]);

    if (!member) return null;

    return (
        /* Backdrop */
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
            aria-label={`Biografía de ${member.name}`}
        >
            {/* Blurred dark overlay */}
            <div className="absolute inset-0 bg-[#020610]/85 backdrop-blur-md" />

            {/* Panel */}
            <div
                className="relative z-10 max-w-2xl w-full bg-[#08101f] border border-[#c5a059]/20 shadow-2xl animate-modal-in overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Gold top accent line */}
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#c5a059] to-transparent" />

                <div className="flex flex-col md:flex-row gap-0">
                    {/* Photo column */}
                    <div className="md:w-48 flex-shrink-0 bg-[#050a14] flex items-start justify-center p-8 md:p-10 border-b md:border-b-0 md:border-r border-[#c5a059]/10">
                        <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border border-[#c5a059]/20 p-[3px] bg-[#050a14]">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover rounded-full grayscale"
                            />
                        </div>
                    </div>

                    {/* Content column */}
                    <div className="flex-1 p-8 md:p-10 overflow-y-auto max-h-[70vh] md:max-h-[80vh]">
                        {/* Header */}
                        <div className="mb-6">
                            {member.institution && (
                                <p className="text-[#c5a059] font-cinzel text-[9px] tracking-[0.35em] uppercase mb-3">
                                    {member.institution}
                                </p>
                            )}
                            <h2 className="text-white font-serif text-2xl md:text-3xl leading-tight mb-2">
                                {member.name}
                            </h2>
                            <div className="flex items-center gap-3 mt-3">
                                <div className="w-6 h-[1px] bg-[#c5a059]" />
                                <span className="text-white/30 font-cinzel text-[9px] tracking-[0.3em] uppercase">
                                    {typeof member.role === 'string' ? member.role : member.role.es}
                                </span>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-[1px] bg-white/5 mb-6" />

                        {/* Bio */}
                        {member.bio ? (
                            <p className="text-white/60 font-serif text-sm leading-[1.9] tracking-wide">
                                {member.bio}
                            </p>
                        ) : (
                            <p className="text-white/20 font-serif text-sm italic">
                                Biografía próximamente.
                            </p>
                        )}
                    </div>
                </div>

                {/* Gold bottom accent */}
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#c5a059]/40 to-transparent" />

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-white/10 hover:border-[#c5a059]/50 hover:text-[#c5a059] text-white/30 transition-all duration-300 group"
                    aria-label="Cerrar"
                >
                    <X className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
}
