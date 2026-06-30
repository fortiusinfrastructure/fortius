"use client";

import { useRouter } from "next/navigation";
import {
    ConsultingArticleEditor,
    type ConsultingArticleFormData,
} from "@/components/admin/ConsultingArticleEditor";
import { updateArticleAction, deleteArticleAction } from "@/lib/admin/article-actions";

interface Props {
    articleId: string;
    initialData: Partial<ConsultingArticleFormData>;
    supabaseUrl: string;
    supabaseAnonKey: string;
}

export function EditArticleForm({ articleId, initialData, supabaseUrl, supabaseAnonKey }: Props) {
    const router = useRouter();

    async function handleSave(data: ConsultingArticleFormData) {
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
        <ConsultingArticleEditor
            initialData={initialData}
            onSave={handleSave}
            onDelete={handleDelete}
            supabaseUrl={supabaseUrl}
            supabaseAnonKey={supabaseAnonKey}
        />
    );
}
