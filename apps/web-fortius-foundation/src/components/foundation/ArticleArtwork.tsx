import type { FoundationArticle } from "@/content/articles";
import { getArticleAbstract, getArticleVisual } from "@/lib/articles";

const THEME_STYLES = {
  emerald: {
    background: "linear-gradient(135deg, #0f3d2f 0%, #14532d 45%, #166534 100%)",
    pattern: "radial-gradient(circle at 20% 20%, rgba(187,247,208,0.20), transparent 30%), repeating-linear-gradient(135deg, rgba(187,247,208,0.08) 0, rgba(187,247,208,0.08) 2px, transparent 2px, transparent 18px)",
  },
  forest: {
    background: "linear-gradient(135deg, #052e16 0%, #14532d 55%, #1b5e20 100%)",
    pattern: "radial-gradient(circle at 80% 20%, rgba(220,252,231,0.16), transparent 28%), repeating-linear-gradient(45deg, rgba(134,239,172,0.08) 0, rgba(134,239,172,0.08) 1px, transparent 1px, transparent 14px)",
  },
  gold: {
    background: "linear-gradient(135deg, #3f2a10 0%, #6b4f1d 45%, #8a6a28 100%)",
    pattern: "radial-gradient(circle at 80% 20%, rgba(253,230,138,0.22), transparent 30%), repeating-linear-gradient(135deg, rgba(253,230,138,0.08) 0, rgba(253,230,138,0.08) 2px, transparent 2px, transparent 16px)",
  },
  navy: {
    background: "linear-gradient(135deg, #10263d 0%, #16334f 48%, #1f4a73 100%)",
    pattern: "radial-gradient(circle at 15% 25%, rgba(191,219,254,0.18), transparent 30%), repeating-linear-gradient(45deg, rgba(191,219,254,0.07) 0, rgba(191,219,254,0.07) 1px, transparent 1px, transparent 15px)",
  },
  plum: {
    background: "linear-gradient(135deg, #32183d 0%, #4c1d5a 48%, #6b2178 100%)",
    pattern: "radial-gradient(circle at 80% 20%, rgba(233,213,255,0.18), transparent 28%), repeating-linear-gradient(135deg, rgba(233,213,255,0.08) 0, rgba(233,213,255,0.08) 2px, transparent 2px, transparent 18px)",
  },
  stone: {
    background: "linear-gradient(135deg, #2a3036 0%, #3f4750 50%, #4b5563 100%)",
    pattern: "radial-gradient(circle at 20% 20%, rgba(229,231,235,0.18), transparent 30%), repeating-linear-gradient(45deg, rgba(209,213,219,0.07) 0, rgba(209,213,219,0.07) 1px, transparent 1px, transparent 14px)",
  },
} as const;

export function ArticleArtwork({ article, compact = false, className = "" }: { article: FoundationArticle; compact?: boolean; className?: string }) {
  const visual = getArticleVisual(article);
  const theme = THEME_STYLES[visual.theme];
  const abstract = getArticleAbstract(article, compact ? 90 : 140);

  return (
    <div className={`relative overflow-hidden border border-[var(--border-subtle)] ${className}`} style={{ background: theme.background }}>
      <div className="absolute inset-0 opacity-80" style={{ backgroundImage: theme.pattern }} />
      <div className={`absolute right-3 ${compact ? "bottom-2 text-[4rem]" : "bottom-4 text-[6rem] md:text-[7rem]"} font-display italic leading-none text-white/10`}>
        FF
      </div>
      <div className={`relative ${compact ? "p-5" : "p-7 md:p-8"}`}>
        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-white/75">{visual.eyebrow}</p>
        <p className={`mt-4 font-display font-light leading-[1.05] text-white ${compact ? "text-[1.45rem]" : "text-[2rem] md:text-[2.4rem]"}`}>{visual.label}</p>
        <p className={`mt-3 text-white/78 ${compact ? "text-[0.82rem] leading-5" : "max-w-md text-[0.96rem] leading-relaxed"}`}>{visual.motif}</p>
        {!compact && <p className="mt-8 max-w-lg text-[0.92rem] leading-relaxed text-white/70">{abstract}</p>}
      </div>
    </div>
  );
}