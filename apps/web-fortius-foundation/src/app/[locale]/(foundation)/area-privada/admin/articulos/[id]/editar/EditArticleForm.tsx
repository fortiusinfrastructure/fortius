"use client";

import { useRouter } from "next/navigation";
import {
    FoundationArticleEditor,
    type FoundationArticleFormData,
} from "@/components/admin/FoundationArticleEditor";
import { updateArticleAction, deleteArticleAction } from "@/lib/admin/article-actions";

interface Props {
    articleId: string;
    initialData: Partial<FoundationArticleFormData>;
    supabaseUrl: string;
    supabaseAnonKey: string;
}

export function EditArticleForm({ articleId, initialData, supabaseUrl, supabaseAnonKey }: Props) {
    const router = useRouter();

    async function handleSave(data: FoundationArticleFormData) {
        await updateArticleAction(articleId, data);
        router.push("/area-privada/admin/articulos");
        router.refresh();
    }

    async function handleDelete() {
        await deleteArticleAction(articleId);
        router.push("/area-privada/admin/articulos");
        router.refresh();
    }

    return (
        <FoundationArticleEditor
            initialData={initialData}
            onSave={handleSave}
            onDelete={handleDelete}
            supabaseUrl={supabaseUrl}
            supabaseAnonKey={supabaseAnonKey}
        />
    );
}
