'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Trash2 } from 'lucide-react';
import { deleteEventAction } from '@/lib/admin/event-actions';

export function DeleteEventButton({ eventId }: { eventId: string }) {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    function handleClick() {
        if (!confirm('¿Eliminar este evento? Esta acción no se puede deshacer.')) return;
        startTransition(async () => {
            await deleteEventAction(eventId);
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
