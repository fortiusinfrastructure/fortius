"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Minimize2, Eye } from "lucide-react";

interface Proposal {
  id: string;
  label: string;
  description: string;
  component: React.ReactNode;
}

interface ProposalViewerProps {
  sectionTitle: string;
  proposals: Proposal[];
}

export function ProposalViewer({ sectionTitle, proposals }: ProposalViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const active = proposals[activeIndex];

  return (
    <div className={`${fullscreen ? "fixed inset-0 z-50 bg-[var(--surface-primary)]" : ""}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[var(--text-tertiary)]">
            [ {sectionTitle} ]
          </span>
          <h2 className="font-display text-2xl text-[var(--text-primary)] mt-1">
            Proposals
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Variant Tabs */}
          <div className="flex bg-[var(--surface-tertiary)] rounded-lg p-1 gap-1">
            {proposals.map((proposal, index) => (
              <button
                key={proposal.id}
                onClick={() => setActiveIndex(index)}
                className={`
                  relative px-4 py-1.5 text-xs font-semibold tracking-wide rounded-md
                  transition-colors duration-150
                  ${
                    index === activeIndex
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
                  }
                `}
              >
                {index === activeIndex && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-[var(--surface-elevated)] rounded-md"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{proposal.label}</span>
              </button>
            ))}
          </div>

          {/* Fullscreen toggle */}
          <button
            onClick={() => setFullscreen(!fullscreen)}
            className="p-2 rounded-md text-[var(--text-tertiary)] hover:text-[var(--text-primary)]
                       hover:bg-[rgba(255,255,255,0.04)] transition-colors duration-150"
          >
            {fullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      {/* Proposal Description */}
      <div className="flex items-start gap-2 mb-6 px-4 py-3 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-subtle)]">
        <Eye size={14} className="text-[var(--text-tertiary)] mt-0.5 shrink-0" />
        <div>
          <p className="text-xs font-semibold text-[var(--text-secondary)]">
            {active?.label}
          </p>
          <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
            {active?.description}
          </p>
        </div>
      </div>

      {/* Viewport */}
      <div
        className="relative rounded-xl border border-[var(--border-default)] overflow-hidden"
        style={{ minHeight: fullscreen ? "calc(100vh - 180px)" : "70vh" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active?.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {active?.component}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
