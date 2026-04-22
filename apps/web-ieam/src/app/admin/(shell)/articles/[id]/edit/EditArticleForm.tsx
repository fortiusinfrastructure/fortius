'use client';

import { useRouter } from 'next/navigation';
import { ArticleEditor, type ArticleFormData } from '@fortius/admin-ui';
import { updateArticleAction } from '@/lib/admin/article-actions';
import { ArrowLeft } from 'lucide-react';

interface EditArticleFormProps {
    articleId: string;
    initialData: Partial<ArticleFormData>;
    supabaseUrl: string;
    supabaseAnonKey: string;
}

export function EditArticleForm({ articleId, initialData, supabaseUrl, supabaseAnonKey }: EditArticleFormProps) {
    const router = useRouter();

    async function handleSave(data: ArticleFormData) {
        await updateArticleAction(articleId, data);
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
                <h1 className="text-2xl font-bold text-slate-900">Editar artículo</h1>
            </div>
            <ArticleEditor
                initialData={initialData}
                onSave={handleSave}
                supabaseUrl={supabaseUrl}
                supabaseAnonKey={supabaseAnonKey}
            />
        </div>
    );
}
