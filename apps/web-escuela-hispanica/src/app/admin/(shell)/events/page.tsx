import { MetricCard } from '@/components/admin/MetricCard';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { requireAdminUser } from '@/lib/admin/auth';
import { getEventDashboard } from '@/lib/admin/event-queries';
import { updateAttendanceAction } from '@/lib/admin/event-registration-actions';

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
    const { totals, metricsByEvent, registrations } = await getEventDashboard(filters);

    return (
        <div className="p-6 space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Gestión de eventos</h1>
                <p className="text-sm text-slate-500 mt-1">Inscritos por actividad, pagos procesados y control básico de asistencia.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <MetricCard label="Actividades" value={totals.activities} tone="slate" />
                <MetricCard label="Inscripciones" value={totals.registrations} tone="blue" />
                <MetricCard label="Pagos procesados" value={totals.paid} tone="green" />
                <MetricCard label="Asistencias marcadas" value={totals.attended} tone="gold" />
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.1fr_1.4fr]">
                <section className="bg-white rounded-2xl border border-slate-200 p-5 overflow-x-auto">
                    <h2 className="font-semibold text-slate-900 mb-4">Resumen por actividad</h2>
                    <table className="min-w-full text-sm">
                        <thead className="text-slate-500">
                            <tr>
                                <th className="pb-3 text-left">Actividad</th>
                                <th className="pb-3 text-left">Fecha</th>
                                <th className="pb-3 text-left">Inscritos</th>
                                <th className="pb-3 text-left">Pagos</th>
                                <th className="pb-3 text-left">Asistencia</th>
                            </tr>
                        </thead>
                        <tbody>
                            {metricsByEvent.map((event) => (
                                <tr key={event.slug} className="border-t border-slate-100">
                                    <td className="py-3 pr-4">
                                        <a href={hrefWith({ ...filters, event: event.slug })} className="font-medium text-slate-900 hover:underline">{event.title}</a>
                                    </td>
                                    <td className="py-3 pr-4 text-slate-600">{event.date}</td>
                                    <td className="py-3 pr-4 text-slate-600">{event.registrations}</td>
                                    <td className="py-3 pr-4 text-slate-600">{event.paid}</td>
                                    <td className="py-3 text-slate-600">{event.attended}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className="bg-white rounded-2xl border border-slate-200 p-5 overflow-x-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {['all', 'pending', 'paid', 'cancelled'].map((status) => (
                            <a key={status} href={hrefWith({ ...filters, status })} className={`rounded-full px-3 py-1.5 text-sm ${filters.status === status || (!filters.status && status === 'all') ? 'bg-[#050a14] text-white' : 'bg-slate-50 text-slate-600'}`}>{status}</a>
                        ))}
                        {['all', 'unconfirmed', 'attended', 'absent'].map((attendance) => (
                            <a key={attendance} href={hrefWith({ ...filters, attendance })} className={`rounded-full px-3 py-1.5 text-sm ${filters.attendance === attendance || (!filters.attendance && attendance === 'all') ? 'bg-[#c5a059] text-[#050a14]' : 'bg-slate-50 text-slate-600'}`}>{attendance}</a>
                        ))}
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
                            {registrations.map((registration) => (
                                <tr key={registration.id} className="border-t border-slate-100 align-top">
                                    <td className="py-3 pr-4">
                                        <p className="font-medium text-slate-900">{registration.first_name} {registration.last_name}</p>
                                        <p className="text-slate-500">{registration.email}</p>
                                        <p className="text-xs text-slate-400 mt-1">{registration.event_slug}</p>
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
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
}