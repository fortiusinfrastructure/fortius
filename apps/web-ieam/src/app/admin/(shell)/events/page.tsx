import { requireAdminUser } from '@/lib/admin/auth';
import { getActivitiesForAdmin } from '@fortius/database';
import { Plus, Pencil } from 'lucide-react';
import { DeleteEventButton } from './_components/DeleteEventButton';

const ORG_SLUG = 'ieam';

const STATUS_STYLES: Record<string, string> = {
    published: 'bg-green-100 text-green-700',
    draft: 'bg-amber-100 text-amber-700',
    archived: 'bg-slate-100 text-slate-500',
};
const STATUS_LABELS: Record<string, string> = {
    published: 'Publicado',
    draft: 'Borrador',
    archived: 'Archivado',
};

export default async function EventsListPage() {
    await requireAdminUser();
    const events = await getActivitiesForAdmin(ORG_SLUG);

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Eventos</h1>
                    <p className="text-slate-500 text-sm mt-1">{events.length} eventos totales</p>
                </div>
                <a
                    href="/admin/events/new"
                    className="flex items-center gap-2 bg-[#0A2540] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1a3a5c] transition-colors"
                >
                    <Plus size={16} />
                    Nuevo evento
                </a>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50">
                            <th className="text-left px-4 py-3 font-medium text-slate-600">
                                Título
                            </th>
                            <th className="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">
                                Fecha
                            </th>
                            <th className="text-left px-4 py-3 font-medium text-slate-600 hidden lg:table-cell">
                                Lugar
                            </th>
                            <th className="text-left px-4 py-3 font-medium text-slate-600">
                                Estado
                            </th>
                            <th className="px-4 py-3" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {events.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                                    No hay eventos todavía.{' '}
                                    <a href="/admin/events/new" className="text-blue-600 underline">
                                        Crear el primero
                                    </a>
                                </td>
                            </tr>
                        ) : (
                            events.map((event) => (
                                <tr
                                    key={event.id}
                                    className="hover:bg-slate-50 transition-colors"
                                >
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="font-medium text-slate-900 line-clamp-1">
                                                {event.title_es}
                                            </p>
                                            <p className="text-xs text-slate-400 mt-0.5">
                                                /{event.slug}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 hidden md:table-cell text-slate-600">
                                        {new Date(event.event_date).toLocaleDateString('es-ES', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </td>
                                    <td className="px-4 py-3 hidden lg:table-cell text-slate-500">
                                        {event.location ?? '—'}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[event.status ?? 'draft'] ?? STATUS_STYLES.draft}`}
                                        >
                                            {STATUS_LABELS[event.status ?? 'draft']}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2 justify-end">
                                            <a
                                                href={`/admin/events/${event.id}/edit`}
                                                className="text-slate-500 hover:text-slate-900 transition-colors"
                                                title="Editar"
                                            >
                                                <Pencil size={15} />
                                            </a>
                                            <DeleteEventButton eventId={event.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
