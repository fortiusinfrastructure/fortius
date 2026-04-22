'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Trash2 } from 'lucide-react';
import { deleteArticleAction } from '@/lib/admin/article-actions';

export function DeleteArticleButton({ articleId }: { articleId: string }) {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    function handleClick() {
        if (!confirm('¿Eliminar este artículo? Esta acción no se puede deshacer.')) return;
        startTransition(async () => {
            await deleteArticleAction(articleId);
            router.refresh();
        });
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={pending}
            className="text-slate-400 hover:text-red-600 transition-colors disabled:opacity-40"
            title="Eliminar"
        >
            <Trash2 size={15} />
        </button>
    );
}
