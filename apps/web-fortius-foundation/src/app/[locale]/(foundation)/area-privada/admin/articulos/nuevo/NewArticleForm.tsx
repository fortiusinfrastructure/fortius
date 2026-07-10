"use client";

import { useRouter } from "next/navigation";
import {
    FoundationArticleEditor,
    type FoundationArticleFormData,
} from "@/components/admin/FoundationArticleEditor";
import { createArticleAction } from "@/lib/admin/article-actions";

interface Props {
    supabaseUrl: string;
    supabaseAnonKey: string;
}

export function NewArticleForm({ supabaseUrl, supabaseAnonKey }: Props) {
    const router = useRouter();

    async function handleSave(data: FoundationArticleFormData) {
        await createArticleAction(data);
        router.push("/area-privada/admin/articulos");
        router.refresh();
    }

    return (
        <FoundationArticleEditor
            onSave={handleSave}
            supabaseUrl={supabaseUrl}
            supabaseAnonKey={supabaseAnonKey}
        />
    );
}
