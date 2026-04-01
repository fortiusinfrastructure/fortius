"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  Sparkles,
  CreditCard,
  Navigation,
  FootprintsIcon,
  BarChart3,
  Users,
  ChevronRight,
  FlaskConical,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

export type SectionId =
  | "hero"
  | "services"
  | "cards"
  | "navigation"
  | "footer"
  | "data-display"
  | "team";

interface LabSidebarProps {
  activeSection: SectionId;
  onSectionChange: (section: SectionId) => void;
}

const sections: { id: SectionId; label: string; icon: React.ReactNode }[] = [
  { id: "hero", label: "Hero", icon: <Sparkles size={16} /> },
  { id: "navigation", label: "Navigation", icon: <Navigation size={16} /> },
  { id: "services", label: "Services", icon: <LayoutGrid size={16} /> },
  { id: "cards", label: "Cards", icon: <CreditCard size={16} /> },
  { id: "team", label: "Team", icon: <Users size={16} /> },
  { id: "data-display", label: "Data Display", icon: <BarChart3 size={16} /> },
  { id: "footer", label: "Footer", icon: <FootprintsIcon size={16} /> },
];

export function LabSidebar({
  activeSection,
  onSectionChange,
}: LabSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 56 : 240 }}
      transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
      className="fixed left-0 top-0 h-screen z-40 flex flex-col
                 bg-[var(--surface-secondary)] border-r border-[var(--border-default)]"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-14 border-b border-[var(--border-default)]">
        <FlaskConical size={18} className="text-[var(--color-accent-400)] shrink-0" />
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm font-semibold tracking-wide text-[var(--text-primary)] whitespace-nowrap"
            >
              Design Lab
            </motion.span>
          )}
        </AnimatePresence>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-[var(--text-tertiary)] hover:text-[var(--text-primary)]
                     transition-colors duration-150 shrink-0"
        >
          {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      {/* Sections */}
      <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
        <div className="px-2 mb-3">
          {!collapsed && (
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
              Sections
            </span>
          )}
        </div>
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm
                transition-all duration-150 relative group
                ${
                  isActive
                    ? "bg-[rgba(233,71,72,0.12)] text-[var(--color-accent-400)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.04)]"
                }
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="active-section"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-[var(--color-accent-500)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="shrink-0">{section.icon}</span>
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="whitespace-nowrap"
                  >
                    {section.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {!collapsed && isActive && (
                <ChevronRight size={14} className="ml-auto opacity-50" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Status bar */}
      <div className="px-4 py-3 border-t border-[var(--border-default)]">
        {!collapsed && (
          <p className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">
            Fortius Consulting
          </p>
        )}
      </div>
    </motion.aside>
  );
}
