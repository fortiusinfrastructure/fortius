"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";

interface Criterion {
  id: string;
  label: string;
  description: string;
}

const CRITERIA: Criterion[] = [
  {
    id: "visual-impact",
    label: "Impacto Visual",
    description: "Primera impresión, wow factor, memorabilidad",
  },
  {
    id: "usability",
    label: "Usabilidad",
    description: "Claridad, jerarquía, facilidad de lectura",
  },
  {
    id: "performance",
    label: "Performance",
    description: "Complejidad de animación, peso de assets, renderizado",
  },
  {
    id: "brand-coherence",
    label: "Coherencia de Marca",
    description: "Alineación con valores Fortius, tono institucional",
  },
  {
    id: "innovation",
    label: "Innovación",
    description: "Diferenciación vs competidores, originalidad",
  },
];

interface Scores {
  [criterionId: string]: number;
}

interface EvaluationCardProps {
  proposalId: string;
  proposalLabel: string;
}

function RatingDots({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          className="group relative"
        >
          <motion.div
            className={`w-3 h-3 rounded-full border transition-colors duration-150
              ${
                n <= value
                  ? "bg-[var(--color-accent-500)] border-[var(--color-accent-400)]"
                  : "bg-transparent border-[var(--border-strong)] group-hover:border-[var(--color-accent-300)]"
              }
            `}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          />
        </button>
      ))}
    </div>
  );
}

export function EvaluationCard({ proposalId, proposalLabel }: EvaluationCardProps) {
  const [scores, setScores] = useState<Scores>({});
  const [notes, setNotes] = useState("");
  const [expanded, setExpanded] = useState(true);

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const maxScore = CRITERIA.length * 5;
  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
  const rated = Object.keys(scores).length;

  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-secondary)] overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-4
                   hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-150"
      >
        <div className="flex items-center gap-3">
          <Star size={14} className="text-[var(--color-accent-400)]" />
          <span className="text-sm font-semibold text-[var(--text-primary)]">
            Evaluar: {proposalLabel}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {rated > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 rounded-full bg-[var(--surface-tertiary)] overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-[var(--color-accent-500)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
                />
              </div>
              <span className="text-xs font-mono text-[var(--text-tertiary)]">
                {totalScore}/{maxScore}
              </span>
            </div>
          )}
          {expanded ? (
            <ChevronUp size={14} className="text-[var(--text-tertiary)]" />
          ) : (
            <ChevronDown size={14} className="text-[var(--text-tertiary)]" />
          )}
        </div>
      </button>

      {/* Body */}
      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
          className="border-t border-[var(--border-subtle)]"
        >
          <div className="px-5 py-4 space-y-4">
            {CRITERIA.map((criterion) => (
              <div
                key={criterion.id}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[var(--text-primary)]">
                    {criterion.label}
                  </p>
                  <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">
                    {criterion.description}
                  </p>
                </div>
                <RatingDots
                  value={scores[criterion.id] || 0}
                  onChange={(v) =>
                    setScores((prev) => ({ ...prev, [criterion.id]: v }))
                  }
                />
              </div>
            ))}

            {/* Notes */}
            <div className="pt-3 border-t border-[var(--border-subtle)]">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare size={12} className="text-[var(--text-tertiary)]" />
                <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
                  Notas
                </span>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Observaciones sobre esta propuesta..."
                rows={3}
                className="w-full bg-[var(--surface-tertiary)] border border-[var(--border-default)]
                           rounded-lg px-3 py-2 text-xs text-[var(--text-primary)]
                           placeholder:text-[var(--text-tertiary)]
                           focus:border-[var(--color-accent-500)] focus:outline-none
                           focus:ring-1 focus:ring-[rgba(233,71,72,0.3)]
                           resize-none transition-colors duration-150"
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
