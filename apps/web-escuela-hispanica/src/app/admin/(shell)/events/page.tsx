import { MetricCard } from '@/components/admin/MetricCard';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { requireAdminUser } from '@/lib/admin/auth';
import { getEventDashboard } from '@/lib/admin/event-queries';
import { updateAttendanceAction } from '@/lib/admin/event-registration-actions';

const SOURCE_LABELS = {
    database: 'Base de datos',
    mock: 'Catálogo público',
    registrations: 'Solo registros',
} as const;

const SOURCE_STYLES = {
    database: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    mock: 'bg-sky-50 text-sky-700 border-sky-200',
    registrations: 'bg-violet-50 text-violet-700 border-violet-200',
} as const;

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

function hrefWith(filters: { event?: string; status?: string; attendance?: string; q?: string }) {
    const params = new URLSearchParams();
    if (filters.event) params.set('event', filters.event);
    if (filters.status) params.set('status', filters.status);
    if (filters.attendance) params.set('attendance', filters.attendance);
    if (filters.q) params.set('q', filters.q);
    const query = params.toString();
    return query ? `/admin/events?${query}` : '/admin/events';
}

export default async function EventsPage({
    searchParams,
}: {
    searchParams: Promise<{ event?: string; status?: string; attendance?: string; q?: string }>;
}) {
    await requireAdminUser();
    const filters = await searchParams;
    const { totals, metricsByEvent, registrations, selectedEvent } = await getEventDashboard(filters);
    const eventMeta = new Map(metricsByEvent.map((event) => [event.slug, event]));

    return (
        <div className="p-6 space-y-8 bg-slate-50 min-h-full">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Gestión de eventos</h1>
                    <p className="text-sm text-slate-500 mt-1 max-w-3xl">Centro de verificación de actividades, personas inscritas, pagos y control de asistencia.</p>
                </div>
                <a href="/admin/events" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 self-start lg:self-auto">
                    Restablecer panel
                </a>
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

            <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 space-y-5">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Filtros operativos</p>
                    <h2 className="mt-2 text-lg font-semibold text-slate-900">Busca personas inscritas o acota el evento</h2>
                </div>
                <form className="grid gap-4 lg:grid-cols-[2fr,1.2fr,1fr,1fr,auto] items-end">
                    <label className="space-y-2">
                        <span className="text-sm font-medium text-slate-700">Buscar por nombre, email o institución</span>
                        <input
                            type="text"
                            name="q"
                            defaultValue={filters.q ?? ''}
                            placeholder="Ej. Juan, universidad, correo@dominio.com"
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20"
                        />
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-medium text-slate-700">Evento</span>
                        <select name="event" defaultValue={filters.event ?? 'all'} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20">
                            <option value="all">Todos los eventos</option>
                            {metricsByEvent.map((event) => (
                                <option key={event.slug} value={event.slug}>{event.title}</option>
                            ))}
                        </select>
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-medium text-slate-700">Pago</span>
                        <select name="status" defaultValue={filters.status ?? 'all'} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20">
                            {PAYMENT_FILTERS.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
                        </select>
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-medium text-slate-700">Asistencia</span>
                        <select name="attendance" defaultValue={filters.attendance ?? 'all'} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20">
                            {ATTENDANCE_FILTERS.map((attendance) => <option key={attendance.value} value={attendance.value}>{attendance.label}</option>)}
                        </select>
                    </label>
                    <div className="flex gap-2">
                        <button className="rounded-xl bg-[#050a14] px-4 py-3 text-sm font-medium text-white hover:bg-slate-800">Aplicar</button>
                        <a href="/admin/events" className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">Limpiar</a>
                    </div>
                </form>
            </section>

            <section className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">Eventos disponibles</h2>
                        <p className="text-sm text-slate-500">Vista rápida por evento para validar catálogo, fuente, pagos e inscritos.</p>
                    </div>
                    <p className="text-sm text-slate-500">{metricsByEvent.length} eventos visibles</p>
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
                                    href={hrefWith({ event: event.slug, status: filters.status, attendance: filters.attendance, q: filters.q })}
                                    className={`rounded-2xl border p-5 transition-colors ${isSelected ? 'border-[#c5a059] bg-amber-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="font-semibold text-slate-900">{event.title}</p>
                                            <p className="mt-1 text-xs text-slate-500">{event.date} · {event.location || 'Sin ubicación'}</p>
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium ${SOURCE_STYLES[event.source]}`}>
                                                    {SOURCE_LABELS[event.source]}
                                                </span>
                                            </div>
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

            <section className="space-y-6">
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                    {selectedEvent ? (
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Evento seleccionado</p>
                            <h2 className="mt-2 text-xl font-semibold text-slate-900">{selectedEvent.title}</h2>
                            <p className="mt-1 text-sm text-slate-500">{selectedEvent.date} · {selectedEvent.location || 'Sin ubicación'}</p>
                        </div>
                    ) : (
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Todas las inscripciones</p>
                            <h2 className="mt-2 text-xl font-semibold text-slate-900">Listado general de personas inscritas</h2>
                            <p className="mt-1 text-sm text-slate-500">Revisa pago, importe, asistencia y datos de contacto sin depender de una selección previa.</p>
                        </div>
                    )}
                    <div className="text-right">
                        <p className="text-2xl font-semibold text-slate-900">{registrations.length}</p>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">inscripciones visibles</p>
                    </div>
                </div>

                {selectedEvent && (
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        <MetricCard label="Inscritos" value={selectedEvent.registrations} tone="blue" />
                        <MetricCard label="Pagos confirmados" value={selectedEvent.paid} tone="green" />
                        <MetricCard label="Pendientes de pago" value={selectedEvent.pending} tone="gold" />
                        <MetricCard label="Asistencias marcadas" value={selectedEvent.attended} tone="slate" />
                    </div>
                )}

                <section className="bg-white rounded-2xl border border-slate-200 p-5 overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="text-slate-500">
                            <tr>
                                <th className="pb-3 text-left">Persona inscrita</th>
                                <th className="pb-3 text-left">Evento</th>
                                <th className="pb-3 text-left">Pago</th>
                                <th className="pb-3 text-left">Importe</th>
                                <th className="pb-3 text-left">Asistencia</th>
                                <th className="pb-3 text-left">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrations.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-8 text-center text-slate-500">
                                        No hay registros que coincidan con los filtros actuales.
                                    </td>
                                </tr>
                            ) : (
                                registrations.map((registration) => (
                                    <tr key={registration.id} className="border-t border-slate-100 align-top">
                                        <td className="py-3 pr-4">
                                            <p className="font-medium text-slate-900">{registration.first_name} {registration.last_name}</p>
                                            <p className="text-slate-500">{registration.email}</p>
                                            {registration.institution && <p className="text-xs text-slate-500 mt-1">{registration.institution}</p>}
                                            {registration.message && <p className="text-xs text-slate-400 mt-1 line-clamp-2">Nota: {registration.message}</p>}
                                            <p className="text-xs text-slate-400 mt-1">{registration.created_at ? new Date(registration.created_at).toLocaleString('es-ES') : registration.event_slug}</p>
                                        </td>
                                        <td className="py-3 pr-4">
                                            <p className="font-medium text-slate-900">{eventMeta.get(registration.event_slug)?.title ?? registration.event_slug}</p>
                                            <p className="text-xs text-slate-500 mt-1">{registration.event_slug}</p>
                                        </td>
                                        <td className="py-3 pr-4">
                                            <div className="space-y-2">
                                                <StatusBadge value={registration.status} />
                                                {registration.stripe_session_id && <p className="text-xs text-slate-400 break-all">{registration.stripe_session_id}</p>}
                                            </div>
                                        </td>
                                        <td className="py-3 pr-4">
                                            <p className="font-medium text-slate-900">{formatAmount(registration.amount, registration.currency)}</p>
                                        </td>
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
        </div>
    );
}

function formatAmount(amount: number | null, currency: string | null) {
    if (!amount || amount <= 0) return 'Gratis / no registrado';
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: (currency || 'EUR').toUpperCase(),
        maximumFractionDigits: 0,
    }).format(amount);
}