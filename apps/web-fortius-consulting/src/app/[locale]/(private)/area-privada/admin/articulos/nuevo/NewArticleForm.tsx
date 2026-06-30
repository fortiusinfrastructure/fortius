"use client";

import { useRouter } from "next/navigation";
import {
    ConsultingArticleEditor,
    type ConsultingArticleFormData,
} from "@/components/admin/ConsultingArticleEditor";
import { createArticleAction } from "@/lib/admin/article-actions";

interface Props {
    supabaseUrl: string;
    supabaseAnonKey: string;
}

export function NewArticleForm({ supabaseUrl, supabaseAnonKey }: Props) {
    const router = useRouter();

    async function handleSave(data: ConsultingArticleFormData) {
        await createArticleAction(data);
        router.push("/area-privada/admin/articulos");
        router.refresh();
    }

    return (
        <ConsultingArticleEditor
            onSave={handleSave}
            supabaseUrl={supabaseUrl}
            supabaseAnonKey={supabaseAnonKey}
        />
    );
}
