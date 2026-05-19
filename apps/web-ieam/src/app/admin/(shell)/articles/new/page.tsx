'use client';

import { useRouter } from 'next/navigation';
import { ArticleEditor, type ArticleFormData } from '@fortius/admin-ui';
import { createArticleAction } from '@/lib/admin/article-actions';
import { coreTeam, researchFellows } from '@/lib/mock-data/team';
import { ArrowLeft } from 'lucide-react';

const TEAM_MEMBERS = [
    {
        name: 'Equipo IEAM',
        name_en: 'IEAM Team',
        role_es: 'Investigación',
        role_en: 'Research',
        bio_es: 'Unidad de datos y análisis del IEAM.',
        bio_en: 'IEAM Data and Analysis Unit.',
        image_url: '/favicon-new.png',
        linkedin: '',
        email: '',
    },
    ...[...coreTeam, ...researchFellows].map((m) => ({
        name: m.name,
        name_en: m.name,
        role_es: m.role,
        role_en: m.role_en ?? '',
        bio_es: m.bio,
        bio_en: m.bio_en ?? '',
        image_url: m.img,
        linkedin: m.linkedin ?? '',
        email: m.email ?? '',
    })),
];

export default function NewArticlePage() {
    const router = useRouter();

    async function handleSave(data: ArticleFormData) {
        await createArticleAction(data);
        router.push('/admin/articles');
        router.refresh();
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center gap-3">
                <a
                    href="/admin/articles"
                    className="text-slate-500 hover:text-slate-900 transition-colors"
                >
                    <ArrowLeft size={18} />
                </a>
                <h1 className="text-2xl font-bold text-slate-900">Nuevo artículo</h1>
            </div>

            <ArticleEditor
                onSave={handleSave}
                supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL!}
                supabaseAnonKey={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}
                teamMembers={TEAM_MEMBERS}
            />
        </div>
    );
}
