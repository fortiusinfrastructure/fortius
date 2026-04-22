'use client';

import { useRouter } from 'next/navigation';
import { EventEditor, type EventFormData } from '@fortius/admin-ui';
import { createEventAction } from '@/lib/admin/event-actions';
import { ArrowLeft } from 'lucide-react';

export default function NewEventPage() {
    const router = useRouter();

    async function handleSave(data: EventFormData) {
        await createEventAction(data);
        router.push('/admin/events');
        router.refresh();
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center gap-3">
                <a
                    href="/admin/events"
                    className="text-slate-500 hover:text-slate-900 transition-colors"
                >
                    <ArrowLeft size={18} />
                </a>
                <h1 className="text-2xl font-bold text-slate-900">Nuevo evento</h1>
            </div>

            <EventEditor
                onSave={handleSave}
                supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL!}
                supabaseAnonKey={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}
            />
        </div>
    );
}
