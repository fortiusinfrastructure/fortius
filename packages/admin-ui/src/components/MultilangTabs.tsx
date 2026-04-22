'use client';

import React, { useState } from 'react';

type Locale = 'es' | 'en' | 'pt';

interface LangTab {
    locale: Locale;
    label: string;
    required?: boolean;
}

const DEFAULT_TABS: LangTab[] = [
    { locale: 'es', label: 'Español', required: true },
    { locale: 'en', label: 'English' },
];

interface MultilangTabsProps {
    tabs?: LangTab[];
    children: (locale: Locale) => React.ReactNode;
    className?: string;
}

export function MultilangTabs({ tabs = DEFAULT_TABS, children, className }: MultilangTabsProps) {
    const [active, setActive] = useState<Locale>(tabs[0].locale);

    return (
        <div className={className}>
            {/* Tab headers */}
            <div className="flex gap-1 border-b border-slate-200 mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.locale}
                        type="button"
                        onClick={() => setActive(tab.locale)}
                        className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors -mb-px border border-transparent ${
                            active === tab.locale
                                ? 'bg-white border-slate-200 border-b-white text-slate-900'
                                : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        {tab.label}
                        {tab.required && (
                            <span className="ml-1 text-red-500 text-xs">*</span>
                        )}
                    </button>
                ))}
            </div>

            {/* Active tab content */}
            <div>{children(active)}</div>
        </div>
    );
}
