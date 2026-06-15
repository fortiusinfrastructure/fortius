import Link from 'next/link';
import { requireAdminUser } from '@/lib/admin/auth';
import { getMembershipDashboard } from '@/lib/admin/membership-queries';
import { getEventDashboard } from '@/lib/admin/event-queries';
import { getCommunicationDashboard } from '@/lib/admin/communication-queries';
import { MetricCard } from '@/components/admin/MetricCard';
import { StatusBadge } from '@/components/admin/StatusBadge';

export default async function AdminDashboardPage() {
    const user = await requireAdminUser();
    const [members, events, communications] = await Promise.all([
        getMembershipDashboard(),
        getEventDashboard(),
        getCommunicationDashboard(),
    ]);

    return (
        <div className="p-6 space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Panel EH</h1>
                <p className="text-sm text-slate-500 mt-1">Bienvenido, {user.email} · Rol: {user.role}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <MetricCard label="Miembros activos" value={members.summary.active} tone="green" />
                <MetricCard label="Miembros pendientes/aprobados" value={members.summary.pending + members.summary.approved} tone="gold" />
                <MetricCard label="Inscripciones a eventos" value={events.totals.registrations} tone="blue" />
                <MetricCard label="Emails enviados" value={communications.logSummary.sent} tone="slate" />
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
                <section className="bg-white rounded-2xl border border-slate-200 p-5 xl:col-span-1">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-slate-900">Miembros recientes</h2>
                        <Link href="/admin/members" className="text-sm text-amber-700 hover:underline">Ver todo</Link>
                    </div>
                    <div className="space-y-3">
                        {members.records.slice(0, 5).map((record) => (
                            <div key={record.id} className="rounded-xl border border-slate-100 p-3">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="font-medium text-slate-900">{record.fullName}</p>
                                        <p className="text-xs text-slate-500">{record.email}</p>
                                    </div>
                                    <StatusBadge value={record.displayStatus} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-white rounded-2xl border border-slate-200 p-5 xl:col-span-1">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-slate-900">Eventos</h2>
                        <Link href="/admin/events" className="text-sm text-amber-700 hover:underline">Ver detalle</Link>
                    </div>
                    <div className="space-y-3">
                        {events.metricsByEvent.slice(0, 5).map((event) => (
                            <div key={event.slug} className="rounded-xl border border-slate-100 p-3">
                                <p className="font-medium text-slate-900">{event.title}</p>
                                <p className="text-xs text-slate-500 mt-1">{event.date} · {event.location || 'Sin ubicación'}</p>
                                <p className="text-xs text-slate-600 mt-2">{event.registrations} inscritos · {event.paid} pagos · {event.attended} asistencias</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-white rounded-2xl border border-slate-200 p-5 xl:col-span-1">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-slate-900">Comunicaciones</h2>
                        <Link href="/admin/communications" className="text-sm text-amber-700 hover:underline">Ver log</Link>
                    </div>
                    <div className="space-y-3">
                        {communications.logs.slice(0, 5).map((log) => (
                            <div key={log.id} className="rounded-xl border border-slate-100 p-3">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="font-medium text-slate-900">{log.subject}</p>
                                        <p className="text-xs text-slate-500">{log.recipient_email}</p>
                                    </div>
                                    <StatusBadge value={log.status} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}