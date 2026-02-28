'use client';

import React, { useState, useMemo } from 'react';
import { Search, BookOpen, FileText, ExternalLink, Globe } from 'lucide-react';
import { resources, searchResources } from '@/lib/mock-data/resources';
import type { Resource } from '@/types';

type CategoryKey = 'all' | 'libro' | 'articulo' | 'otro';

const categories: { key: CategoryKey; label: string; icon: React.ReactNode }[] = [
    { key: 'all', label: 'Todos', icon: <Search className="w-4 h-4" /> },
    { key: 'libro', label: 'Libros de referencia', icon: <BookOpen className="w-4 h-4" /> },
    { key: 'articulo', label: 'Artículos recomendados', icon: <FileText className="w-4 h-4" /> },
    { key: 'otro', label: 'Otros', icon: <Globe className="w-4 h-4" /> },
];

function ResourceCard({ resource }: { resource: Resource }) {
    return (
        <div className="group py-5 border-b border-white/5 last:border-b-0">
            <p className="text-white/80 font-light text-[15px] leading-relaxed">
                {resource.citation}
                {resource.url && (
                    <>
                        {' '}
                        <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[#c5a059] hover:text-white transition-colors text-sm"
                        >
                            Disponible aquí
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    </>
                )}
            </p>
        </div>
    );
}

function CategorySection({ title, icon, items }: { title: string; icon: React.ReactNode; items: Resource[] }) {
    if (items.length === 0) return null;

    return (
        <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
                <span className="text-[#c5a059]">{icon}</span>
                <h2 className="font-cinzel text-lg md:text-xl text-white tracking-[0.15em] uppercase">
                    {title}
                </h2>
                <span className="text-[10px] font-cinzel text-white/30 border border-white/10 px-2 py-0.5">
                    {items.length}
                </span>
            </div>
            <div className="border-t border-[#c5a059]/20">
                {items.map(r => (
                    <ResourceCard key={r.id} resource={r} />
                ))}
            </div>
        </section>
    );
}

export default function ResourcesContent() {
    const [query, setQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');

    const filtered = useMemo(() => {
        let results = query.trim() ? searchResources(query) : resources;
        if (activeCategory !== 'all') {
            results = results.filter(r => r.category === activeCategory);
        }
        return results;
    }, [query, activeCategory]);

    const libros = useMemo(() => filtered.filter(r => r.category === 'libro'), [filtered]);
    const articulos = useMemo(() => filtered.filter(r => r.category === 'articulo'), [filtered]);
    const otros = useMemo(() => filtered.filter(r => r.category === 'otro'), [filtered]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">

            {/* ── Biografias Banner ───────────────────────────────────── */}
            <div className="mb-16 border border-[#c5a059]/30 bg-[#c5a059]/5 p-8 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c5a059]/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <h3 className="font-serif text-2xl text-white mb-3">Historia de la Escuela Hispánica</h3>
                <p className="font-light text-white/60 mb-6 max-w-lg mx-auto text-sm">Explora las biografías y el legado de los autores que conforman nuestra tradición a lo largo de los siglos.</p>
                <a href="/recursos/biografias" className="inline-block border border-[#c5a059] text-[#c5a059] px-6 py-2 text-xs font-cinzel tracking-widest hover:bg-[#c5a059] hover:text-[#050a14] transition-colors">
                    VER BIOGRAFÍAS
                </a>
            </div>

            {/* ── Search ─────────────────────────────────────────── */}
            <div className="relative mb-12">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Buscar por autor, título, editorial…"
                    className="w-full bg-[#08101f] border border-white/10 text-white placeholder:text-white/30 py-4 pl-12 pr-4 font-light text-sm focus:outline-none focus:border-[#c5a059]/50 transition-colors"
                />
            </div>

            {/* ── Category Tabs ───────────────────────────────────── */}
            <div className="flex flex-wrap gap-2 mb-12">
                {categories.map(cat => (
                    <button
                        key={cat.key}
                        onClick={() => setActiveCategory(cat.key)}
                        className={`flex items-center gap-2 px-4 py-2 text-[11px] font-cinzel tracking-widest uppercase transition-all border ${activeCategory === cat.key
                            ? 'bg-[#c5a059] text-[#050a14] border-[#c5a059]'
                            : 'bg-transparent text-white/50 border-white/10 hover:border-[#c5a059]/50 hover:text-white'
                            }`}
                    >
                        {cat.icon}
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* ── Content ─────────────────────────────────────────── */}
            {filtered.length === 0 ? (
                <div className="text-center py-20">
                    <Search className="w-10 h-10 text-white/10 mx-auto mb-4" />
                    <p className="text-white/40 font-light">
                        No se encontraron resultados para &ldquo;{query}&rdquo;
                    </p>
                </div>
            ) : activeCategory === 'all' ? (
                <>
                    <CategorySection title="Libros de referencia" icon={<BookOpen className="w-5 h-5" />} items={libros} />
                    <CategorySection title="Artículos recomendados" icon={<FileText className="w-5 h-5" />} items={articulos} />
                    <CategorySection title="Otros" icon={<Globe className="w-5 h-5" />} items={otros} />
                </>
            ) : (
                <div className="border-t border-[#c5a059]/20">
                    {filtered.map(r => (
                        <ResourceCard key={r.id} resource={r} />
                    ))}
                </div>
            )}
        </div>
    );
}
