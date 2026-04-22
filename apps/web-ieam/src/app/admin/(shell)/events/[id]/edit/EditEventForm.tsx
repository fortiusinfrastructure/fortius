'use client';

import { useRouter } from 'next/navigation';
import { EventEditor, type EventFormData } from '@fortius/admin-ui';
import { updateEventAction } from '@/lib/admin/event-actions';
import { ArrowLeft } from 'lucide-react';

interface EditEventFormProps {
    eventId: string;
    initialData: Partial<EventFormData>;
    supabaseUrl: string;
    supabaseAnonKey: string;
}

export function EditEventForm({ eventId, initialData, supabaseUrl, supabaseAnonKey }: EditEventFormProps) {
    const router = useRouter();

    async function handleSave(data: EventFormData) {
        await updateEventAction(eventId, data);
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
                <h1 className="text-2xl font-bold text-slate-900">Editar evento</h1>
            </div>
            <EventEditor
                initialData={initialData}
                onSave={handleSave}
                supabaseUrl={supabaseUrl}
                supabaseAnonKey={supabaseAnonKey}
            />
        </div>
    );
}
