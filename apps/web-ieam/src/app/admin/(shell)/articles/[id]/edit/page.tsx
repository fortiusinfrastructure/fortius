import { notFound } from 'next/navigation';
import { requireAdminUser } from '@/lib/admin/auth';
import { getArticleById } from '@/lib/admin/article-queries';
import { EditArticleForm } from './EditArticleForm';

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: Props) {
    await requireAdminUser();
    const { id } = await params;
    const initialData = await getArticleById(id);

    if (!initialData) notFound();

    return (
        <EditArticleForm
            articleId={id}
            initialData={initialData}
            supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL!}
            supabaseAnonKey={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}
        />
    );
}
