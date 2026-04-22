'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/UnifiedCard';

export type ResearchCategoryId = 'reports' | 'infographics' | 'press';

export type ResearchCardData = {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  type: string;
  publishDate: string;
  authorName: string;
  category: ResearchCategoryId;
};

type Props = {
  articles: ResearchCardData[];
  categories: { id: ResearchCategoryId; label: string }[];
  noResults: string;
  locale: 'es' | 'en';
};

export default function ResearchTabs({ articles, categories, noResults, locale }: Props) {
  const [activeTab, setActiveTab] = useState<ResearchCategoryId>('reports');

  const filtered = useMemo(
    () => articles.filter((a) => a.category === activeTab),
    [activeTab, articles],
  );

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-12 border-b border-slate-200 pb-1">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveTab(c.id)}
            className={`px-6 py-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${
              activeTab === c.id
                ? 'border-[#D4212A] text-[#0A2540]'
                : 'border-transparent text-slate-500 hover:text-[#0A2540] hover:border-slate-300'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="space-y-10">
          <Card
            variant="featured"
            title={filtered[0].title}
            summary={filtered[0].subtitle}
            image={filtered[0].image}
            badge={filtered[0].type}
            metadata={{ date: filtered[0].publishDate, author: filtered[0].authorName }}
            ctaLink={`/analisis/${filtered[0].slug}`}
            className="w-full"
            locale={locale}
          />

          {filtered.length > 1 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.slice(1).map((a) => (
                <Card
                  key={a.slug}
                  variant="standard"
                  title={a.title}
                  summary={a.subtitle}
                  image={a.image}
                  badge={a.type}
                  metadata={{ date: a.publishDate, author: a.authorName }}
                  ctaLink={`/analisis/${a.slug}`}
                  className="h-full"
                  locale={locale}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-sm">
          <p className="text-slate-500 text-lg">{noResults}</p>
        </div>
      )}
    </>
  );
}
