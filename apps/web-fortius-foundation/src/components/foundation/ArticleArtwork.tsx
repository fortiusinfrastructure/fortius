import fs from "fs";
import path from "path";
import Image from "next/image";
import type { FoundationArticle } from "@/content/articles";
import { getArticleAbstract, getArticleVisual } from "@/lib/articles";

export function ArticleArtwork({ article, compact = false, className = "" }: { article: FoundationArticle; compact?: boolean; className?: string }) {
  const visual = getArticleVisual(article);
  const abstract = getArticleAbstract(article, compact ? 90 : 140);

  const relativeImagePath = `/entradas/images/${article.slug}.png`;
  const hasImage = fs.existsSync(
    path.join(process.cwd(), "public", relativeImagePath)
  );

  return (
    <div
      className={`relative overflow-hidden border border-[var(--border-subtle)] ${className}`}
      style={hasImage ? undefined : { backgroundColor: "var(--surface-brand)" }}
    >
      {hasImage && (
        <Image
          src={relativeImagePath}
          alt={article.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className={`absolute right-3 ${compact ? "bottom-2 text-[4rem]" : "bottom-4 text-[6rem] md:text-[7rem]"} font-display italic leading-none text-white/10`}>
        FF
      </div>
      <div className={`relative ${compact ? "p-5" : "p-7 md:p-8"}`}>
        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-white/75">{visual.eyebrow}</p>
        <p className={`mt-4 font-display font-light leading-[1.05] text-white ${compact ? "text-[1.45rem]" : "text-[2rem] md:text-[2.4rem]"}`}>{visual.label}</p>
        <p className={`mt-3 text-white/78 ${compact ? "text-[0.82rem] leading-5" : "max-w-md text-[0.96rem] leading-relaxed"}`}>{visual.motif}</p>
        {!compact && !hasImage && <p className="mt-8 max-w-lg text-[0.92rem] leading-relaxed text-white/70">{abstract}</p>}
      </div>
    </div>
  );
}