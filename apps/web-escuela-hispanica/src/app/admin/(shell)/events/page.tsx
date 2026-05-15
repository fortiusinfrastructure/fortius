import { MetricCard } from '@/components/admin/MetricCard';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { requireAdminUser } from '@/lib/admin/auth';
import { getEventDashboard } from '@/lib/admin/event-queries';
import { updateAttendanceAction } from '@/lib/admin/event-registration-actions';

const PAYMENT_FILTERS = [
    { value: 'all', label: 'Todos los pagos' },
    { value: 'pending', label: 'Pendientes' },
    { value: 'paid', label: 'Pagados' },
    { value: 'cancelled', label: 'Cancelados' },
] as const;

const ATTENDANCE_FILTERS = [
    { value: 'all', label: 'Toda la asistencia' },
    { value: 'unconfirmed', label: 'Sin confirmar' },
    { value: 'attended', label: 'Asistieron' },
    { value: 'absent', label: 'Ausentes' },
] as const;

function hrefWith(filters: { event?: string; status?: string; attendance?: string }) {
    const params = new URLSearchParams();
    if (filters.event) params.set('event', filters.event);
    if (filters.status) params.set('status', filters.status);
    if (filters.attendance) params.set('attendance', filters.attendance);
    const query = params.toString();
    return query ? `/admin/events?${query}` : '/admin/events';
}

export default async function EventsPage({
    searchParams,
}: {
    searchParams: Promise<{ event?: string; status?: string; attendance?: string }>;
}) {
    await requireAdminUser();
    const filters = await searchParams;
    const { totals, metricsByEvent, registrations, selectedEvent } = await getEventDashboard(filters);

    return (
        <div className="p-6 space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Gestión de eventos</h1>
                <p className="text-sm text-slate-500 mt-1">Inscritos por actividad, pagos procesados y control básico de asistencia.</p>
            </div>

            <section className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">Cómo se refrescan estos datos</p>
                <p className="mt-2">
                    Esta vista se vuelve a calcular en el servidor al entrar o recargar la página. Las cifras salen de
                    <code className="mx-1 rounded bg-white px-1.5 py-0.5 text-xs">event_registrations</code>
                    y se sincronizan cuando Stripe llama al webhook y este marca pagos completados en la base de datos.
                </p>
                <p className="mt-2">
                    Para que el centro de verificación sea útil mientras EH termina la migración, el listado combina
                    eventos de base de datos con el catálogo público actual. Si un evento solo existe en el catálogo público,
                    también aparecerá aquí y se podrá contrastar con sus inscripciones por <code className="mx-1 rounded bg-white px-1.5 py-0.5 text-xs">event_slug</code>.
                </p>
            </section>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <MetricCard label="Actividades" value={totals.activities} tone="slate" />
                <MetricCard label="Inscripciones" value={totals.registrations} tone="blue" />
                <MetricCard label="Pagos procesados" value={totals.paid} tone="green" />
                <MetricCard label="Asistencias marcadas" value={totals.attended} tone="gold" />
            </div>

            <section className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">1. Selecciona un evento</h2>
                        <p className="text-sm text-slate-500">Elige una actividad para ver sus métricas y sus registros en detalle.</p>
                    </div>
                    <a href="/admin/events" className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
                        Ver todos
                    </a>
                </div>

                {metricsByEvent.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
                        No se encontraron eventos ni en base de datos ni en el catálogo público actual.
                    </div>
                ) : (
                    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                        {metricsByEvent.map((event) => {
                            const isSelected = selectedEvent?.slug === event.slug;
                            return (
                                <a
                                    key={event.slug}
                                    href={hrefWith({ event: event.slug })}
                                    className={`rounded-2xl border p-5 transition-colors ${isSelected ? 'border-[#c5a059] bg-amber-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="font-semibold text-slate-900">{event.title}</p>
                                            <p className="mt-1 text-xs text-slate-500">{event.date} · {event.location || 'Sin ubicación'}</p>
                                            <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-slate-400">
                                                Fuente: {event.source === 'database' ? 'Base de datos' : event.source === 'mock' ? 'Catálogo público' : 'Registros'}
                                            </p>
                                        </div>
                                        <StatusBadge value={event.publishedStatus} />
                                    </div>
                                    <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-slate-600">
                                        <div>
                                            <p className="font-semibold text-slate-900">{event.registrations}</p>
                                            <p>Inscritos</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">{event.paid}</p>
                                            <p>Pagados</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">{event.attended}</p>
                                            <p>Asistencias</p>
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                )}
            </section>

            {selectedEvent ? (
                <section className="space-y-6">
                    <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">2. Evento seleccionado</p>
                            <h2 className="mt-2 text-xl font-semibold text-slate-900">{selectedEvent.title}</h2>
                            <p className="mt-1 text-sm text-slate-500">{selectedEvent.date} · {selectedEvent.location || 'Sin ubicación'}</p>
                        </div>
                        <a href="/admin/events" className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100">
                            Limpiar selección
                        </a>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        <MetricCard label="Inscritos" value={selectedEvent.registrations} tone="blue" />
                        <MetricCard label="Pagos confirmados" value={selectedEvent.paid} tone="green" />
                        <MetricCard label="Pendientes de pago" value={selectedEvent.pending} tone="gold" />
                        <MetricCard label="Asistencias marcadas" value={selectedEvent.attended} tone="slate" />
                    </div>

                    <section className="bg-white rounded-2xl border border-slate-200 p-5 overflow-x-auto">
                        <div className="space-y-4 mb-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Filtro por pago</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {PAYMENT_FILTERS.map((status) => (
                                        <a key={status.value} href={hrefWith({ ...filters, status: status.value, event: selectedEvent.slug })} className={`rounded-full px-3 py-1.5 text-sm ${filters.status === status.value || (!filters.status && status.value === 'all') ? 'bg-[#050a14] text-white' : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'}`}>
                                            {status.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Filtro por asistencia</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {ATTENDANCE_FILTERS.map((attendance) => (
                                        <a key={attendance.value} href={hrefWith({ ...filters, attendance: attendance.value, event: selectedEvent.slug })} className={`rounded-full px-3 py-1.5 text-sm ${filters.attendance === attendance.value || (!filters.attendance && attendance.value === 'all') ? 'bg-[#c5a059] text-[#050a14]' : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'}`}>
                                            {attendance.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <table className="min-w-full text-sm">
                            <thead className="text-slate-500">
                                <tr>
                                    <th className="pb-3 text-left">Inscripción</th>
                                    <th className="pb-3 text-left">Pago</th>
                                    <th className="pb-3 text-left">Asistencia</th>
                                    <th className="pb-3 text-left">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registrations.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="py-8 text-center text-slate-500">
                                            No hay registros que coincidan con los filtros para este evento.
                                        </td>
                                    </tr>
                                ) : (
                                    registrations.map((registration) => (
                                        <tr key={registration.id} className="border-t border-slate-100 align-top">
                                            <td className="py-3 pr-4">
                                                <p className="font-medium text-slate-900">{registration.first_name} {registration.last_name}</p>
                                                <p className="text-slate-500">{registration.email}</p>
                                                <p className="text-xs text-slate-400 mt-1">{registration.created_at ? new Date(registration.created_at).toLocaleString('es-ES') : selectedEvent.slug}</p>
                                            </td>
                                            <td className="py-3 pr-4"><StatusBadge value={registration.status} /></td>
                                            <td className="py-3 pr-4"><StatusBadge value={registration.attendance_status} /></td>
                                            <td className="py-3">
                                                <div className="flex gap-2">
                                                    <form action={updateAttendanceAction}>
                                                        <input type="hidden" name="registrationId" value={registration.id} />
                                                        <input type="hidden" name="attendanceStatus" value="attended" />
                                                        <button className="rounded-lg bg-emerald-50 px-3 py-1 text-xs text-emerald-700">Marcar asistió</button>
                                                    </form>
                                                    <form action={updateAttendanceAction}>
                                                        <input type="hidden" name="registrationId" value={registration.id} />
                                                        <input type="hidden" name="attendanceStatus" value="absent" />
                                                        <button className="rounded-lg bg-rose-50 px-3 py-1 text-xs text-rose-700">Marcar ausencia</button>
                                                    </form>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </section>
                </section>
            ) : (
                <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
                    Selecciona un evento para ver sus métricas específicas y la tabla detallada de inscritos.
                </section>
            )}
        </div>
    );
}