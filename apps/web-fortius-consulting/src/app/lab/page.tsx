"use client";

import { useState } from "react";
import { LabSidebar, type SectionId } from "@/components/lab/LabSidebar";
import { ProposalViewer } from "@/components/lab/ProposalViewer";
import { EvaluationCard } from "@/components/lab/EvaluationCard";
import { HeroA } from "@/components/proposals/hero/HeroA";
import { HeroB } from "@/components/proposals/hero/HeroB";
import { HeroC } from "@/components/proposals/hero/HeroC";

/* ------------------------------------------------------------------ */
/*  Proposal Registry                                                  */
/*  Add new proposals here as you create them.                        */
/* ------------------------------------------------------------------ */

type ProposalDef = {
  id: string;
  label: string;
  description: string;
  component: React.ReactNode;
};

const proposalsBySection: Record<SectionId, ProposalDef[]> = {
  hero: [
    {
      id: "hero-a",
      label: "A — Cinematic Reveal",
      description:
        "Reveal dramático con línea horizontal animada. Headline staggered, métricas con counter. Máximo impacto visual, mínimos elementos.",
      component: <HeroA />,
    },
    {
      id: "hero-b",
      label: "B — Grid Intelligence",
      description:
        "Layout asimétrico con micro-tarjetas de capabilities. Grid sutil de fondo. Comunica amplitud de servicios desde el primer momento.",
      component: <HeroB />,
    },
    {
      id: "hero-c",
      label: "C — Editorial Split",
      description:
        "Split vertical editorial (Monocle/Foreign Affairs). Tipografía pura a la izquierda, composición abstracta animada a la derecha. Cursor-follower sutil.",
      component: <HeroC />,
    },
  ],
  navigation: [],
  services: [],
  cards: [],
  team: [],
  "data-display": [],
  footer: [],
};

/* ------------------------------------------------------------------ */

function EmptyState({ section }: { section: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="w-12 h-12 rounded-xl bg-[var(--surface-tertiary)] border border-[var(--border-default)] flex items-center justify-center mb-4">
        <span className="text-lg text-[var(--text-tertiary)]">+</span>
      </div>
      <p className="text-sm font-semibold text-[var(--text-secondary)]">
        Sin propuestas aún
      </p>
      <p className="text-xs text-[var(--text-tertiary)] mt-1 max-w-xs">
        Las propuestas para <span className="capitalize">{section}</span> aparecerán
        aquí cuando se creen.
      </p>
    </div>
  );
}

export default function LabPage() {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");

  const proposals = proposalsBySection[activeSection];

  return (
    <div className="min-h-screen bg-[var(--surface-primary)]">
      <LabSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main content — offset by sidebar */}
      <main className="ml-[240px] p-8">
        {proposals.length > 0 ? (
          <div className="space-y-8">
            <ProposalViewer
              sectionTitle={activeSection}
              proposals={proposals}
            />

            {/* Evaluation cards for each proposal */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                Evaluaciones
              </h3>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {proposals.map((p) => (
                  <EvaluationCard
                    key={p.id}
                    proposalId={p.id}
                    proposalLabel={p.label}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <EmptyState section={activeSection} />
        )}
      </main>
    </div>
  );
}
