'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Plus, X, Globe, Twitter, BookOpen } from 'lucide-react';
import type { TeamMember } from '@/lib/mock-data';

type Variant = 'core' | 'fellow';

type Props = {
  coreTeam: TeamMember[];
  fellows: TeamMember[];
  bioLabel: string;
};

export default function TeamGrid({ coreTeam, fellows, bioLabel }: Props) {
  const [selectedBio, setSelectedBio] = useState<TeamMember | null>(null);

  return (
    <>
      {/* Core Team Grid */}
      <div className="grid md:grid-cols-3 gap-12 mb-20 max-w-5xl mx-auto">
        {coreTeam.map((member, index) => (
          <MemberCard
            key={`core-${index}`}
            member={member}
            variant="core"
            bioLabel={bioLabel}
            onOpenBio={() => setSelectedBio(member)}
          />
        ))}
      </div>

      <div className="w-full h-px bg-slate-200 mb-16"></div>

      {/* Research Fellows Grid */}
      <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8">
        {fellows.map((member, index) => (
          <MemberCard
            key={`fellow-${index}`}
            member={member}
            variant="fellow"
            bioLabel={bioLabel}
            onOpenBio={() => setSelectedBio(member)}
          />
        ))}
      </div>

      {/* Premium Bio Modal */}
      <AnimatePresence>
        {selectedBio && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBio(null)}
              className="absolute inset-0 bg-[#0A2540]/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedBio(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-[#D4212A]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full md:w-2/5 h-64 md:h-auto relative bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedBio.img}
                  alt={selectedBio.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/80 to-transparent md:hidden" />
                <div className="absolute bottom-4 left-4 text-white md:hidden">
                  <h3 className="text-2xl font-serif font-bold">{selectedBio.name}</h3>
                  <p className="text-sm opacity-90 uppercase tracking-wider">{selectedBio.role}</p>
                </div>
              </div>

              <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto bg-white flex flex-col">
                <div className="hidden md:block mb-8">
                  <h3 className="text-3xl font-serif font-bold text-[#0A2540] mb-2">{selectedBio.name}</h3>
                  <p className="text-sm font-bold uppercase tracking-widest text-[#D4212A]">{selectedBio.role}</p>
                </div>

                <SocialLinks member={selectedBio} large />

                <div className="prose prose-slate prose-sm md:prose-base font-light text-slate-600 leading-loose text-justify">
                  {selectedBio.bio}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function MemberCard({
  member,
  variant,
  bioLabel,
  onOpenBio,
}: {
  member: TeamMember;
  variant: Variant;
  bioLabel: string;
  onOpenBio: () => void;
}) {
  const isCore = variant === 'core';
  const imgSize = isCore ? 'w-48 h-48' : 'w-32 h-32';
  const imgBorder = isCore ? 'border-4 border-white shadow-lg' : 'border-2 border-slate-100 shadow-md';
  const nameSize = isCore ? 'text-xl' : 'text-lg';
  const roleClass = isCore
    ? 'text-sm font-bold uppercase tracking-wider text-[#D4212A] mb-4'
    : 'text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-3';

  return (
    <div className="group text-center flex flex-col items-center">
      <div className={`relative mb-${isCore ? '6' : '4'} ${imgSize} rounded-full overflow-hidden ${imgBorder}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={member.img}
          alt={member.name}
          className={`w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ${isCore ? 'scale-100 group-hover:scale-110' : ''}`}
          loading="lazy"
          decoding="async"
        />
      </div>
      <h3 className={`${nameSize} font-serif font-bold text-[#0A2540] mb-1`}>{member.name}</h3>
      <p className={roleClass}>{member.role}</p>

      <div className={isCore ? 'flex gap-3 justify-center mb-3' : 'flex flex-col items-center gap-2 mt-2'}>
        <SocialLinks member={member} stacked={!isCore} />
        <button
          onClick={onOpenBio}
          className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-[#D4212A] hover:text-[#0A2540] transition-colors"
        >
          <Plus className="w-3 h-3 mr-1" />
          {bioLabel}
        </button>
      </div>
    </div>
  );
}

function SocialLinks({ member, stacked, large }: { member: TeamMember; stacked?: boolean; large?: boolean }) {
  if (large) {
    const baseLink = 'flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors';
    const badge = 'w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center';
    return (
      <div className="flex gap-4 mb-8 flex-wrap">
        {member.linkedin && member.linkedin !== '#' && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className={`${baseLink} hover:text-[#0077b5]`}>
            <div className={badge}><Linkedin className="w-4 h-4" /></div><span>LinkedIn</span>
          </a>
        )}
        {member.twitter && member.twitter !== '#' && (
          <a href={member.twitter} target="_blank" rel="noopener noreferrer" className={`${baseLink} hover:text-black`}>
            <div className={badge}><Twitter className="w-4 h-4" /></div><span>Twitter</span>
          </a>
        )}
        {member.scholar && member.scholar !== '#' && (
          <a href={member.scholar} target="_blank" rel="noopener noreferrer" className={`${baseLink} hover:text-blue-700`}>
            <div className={badge}><BookOpen className="w-4 h-4" /></div><span>Scholar</span>
          </a>
        )}
        {member.website && member.website !== '#' && (
          <a href={member.website} target="_blank" rel="noopener noreferrer" className={`${baseLink} hover:text-[#D4212A]`}>
            <div className={badge}><Globe className="w-4 h-4" /></div><span>Web</span>
          </a>
        )}
        {member.email && (
          <a href={`mailto:${member.email}`} className={`${baseLink} hover:text-[#D4212A]`}>
            <div className={badge}><MailIcon /></div><span>Email</span>
          </a>
        )}
      </div>
    );
  }

  const itemClass = 'w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 text-[#0A2540] transition-colors' + (stacked ? ' mb-1' : '');
  return (
    <>
      {member.linkedin && member.linkedin !== '#' && (
        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className={`${itemClass} hover:bg-[#0077b5] hover:text-white`}>
          <Linkedin className="w-4 h-4" />
        </a>
      )}
      {member.twitter && member.twitter !== '#' && (
        <a href={member.twitter} target="_blank" rel="noopener noreferrer" className={`${itemClass} hover:bg-black hover:text-white`}>
          <Twitter className="w-4 h-4" />
        </a>
      )}
      {member.scholar && member.scholar !== '#' && (
        <a href={member.scholar} target="_blank" rel="noopener noreferrer" className={`${itemClass} hover:bg-blue-700 hover:text-white`}>
          <BookOpen className="w-4 h-4" />
        </a>
      )}
      {member.website && member.website !== '#' && (
        <a href={member.website} target="_blank" rel="noopener noreferrer" className={`${itemClass} hover:bg-[#D4212A] hover:text-white`}>
          <Globe className="w-4 h-4" />
        </a>
      )}
      {member.email && (
        <a href={`mailto:${member.email}`} className={`${itemClass} hover:bg-[#D4212A] hover:text-white`}>
          <MailIcon />
        </a>
      )}
    </>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
