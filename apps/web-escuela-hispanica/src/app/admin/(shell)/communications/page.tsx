import { MetricCard } from '@/components/admin/MetricCard';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { requireAdminUser } from '@/lib/admin/auth';
import { getCommunicationDashboard } from '@/lib/admin/communication-queries';

function hrefWith(filters: { kind?: string; status?: string }) {
    const params = new URLSearchParams();
    if (filters.kind) params.set('kind', filters.kind);
    if (filters.status) params.set('status', filters.status);
    const query = params.toString();
    return query ? `/admin/communications?${query}` : '/admin/communications';
}

export default async function CommunicationsPage({
    searchParams,
}: {
    searchParams: Promise<{ kind?: string; status?: string }>;
}) {
    await requireAdminUser();
    const filters = await searchParams;
    const { logs, stripeEvents, syncIssues, logSummary, stripeSummary, syncSummary } = await getCommunicationDashboard(filters);

    return (
        <div className="p-6 space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Trazabilidad de comunicaciones</h1>
                <p className="text-sm text-slate-500 mt-1">Log de emails enviados y eventos relevantes de Stripe.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                <MetricCard label="Emails enviados" value={logSummary.sent} tone="green" />
                <MetricCard label="Emails fallidos" value={logSummary.failed} tone="slate" />
                <MetricCard label="Sesiones completadas" value={stripeSummary.completed} tone="blue" />
                <MetricCard label="Sesiones expiradas" value={stripeSummary.expired} tone="gold" />
                <MetricCard label="Incidencias Stripe sin resolver" value={syncSummary.unresolved} tone="slate" />
            </div>

            {syncSummary.unresolved > 0 ? (
                <section className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-slate-700">
                    <p className="font-semibold text-slate-900">Hay incidencias de conciliación Stripe pendientes</p>
                    <p className="mt-2">
                        Estas incidencias aparecen cuando el webhook recibe una suscripción o un cobro que no puede enlazar de forma determinista con una membership.
                        Revisa la tabla inferior antes de asumir que el dashboard y Stripe están totalmente alineados.
                    </p>
                </section>
            ) : null}

            <div className="flex flex-wrap gap-2">
                {['all', 'notification', 'confirmation', 'reminder', 'receipt', 'failure'].map((kind) => (
                    <a key={kind} href={hrefWith({ kind, status: filters.status })} className={`rounded-full px-3 py-1.5 text-sm ${filters.kind === kind || (!filters.kind && kind === 'all') ? 'bg-[#050a14] text-white' : 'bg-white border border-slate-200 text-slate-600'}`}>{kind}</a>
                ))}
                {['all', 'sent', 'failed'].map((status) => (
                    <a key={status} href={hrefWith({ kind: filters.kind, status })} className={`rounded-full px-3 py-1.5 text-sm ${filters.status === status || (!filters.status && status === 'all') ? 'bg-[#c5a059] text-[#050a14]' : 'bg-white border border-slate-200 text-slate-600'}`}>{status}</a>
                ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                <section className="bg-white rounded-2xl border border-slate-200 p-5 overflow-x-auto">
                    <h2 className="font-semibold text-slate-900 mb-4">Emails</h2>
                    <table className="min-w-full text-sm">
                        <thead className="text-slate-500">
                            <tr>
                                <th className="pb-3 text-left">Asunto</th>
                                <th className="pb-3 text-left">Tipo</th>
                                <th className="pb-3 text-left">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log) => (
                                <tr key={log.id} className="border-t border-slate-100 align-top">
                                    <td className="py-3 pr-4">
                                        <p className="font-medium text-slate-900">{log.subject}</p>
                                        <p className="text-slate-500">{log.recipient_email}</p>
                                    </td>
                                    <td className="py-3 pr-4"><StatusBadge value={log.kind} /></td>
                                    <td className="py-3"><StatusBadge value={log.status} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className="bg-white rounded-2xl border border-slate-200 p-5 overflow-x-auto">
                    <h2 className="font-semibold text-slate-900 mb-4">Stripe</h2>
                    <table className="min-w-full text-sm">
                        <thead className="text-slate-500">
                            <tr>
                                <th className="pb-3 text-left">Evento</th>
                                <th className="pb-3 text-left">Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stripeEvents.map((event) => (
                                <tr key={event.id} className="border-t border-slate-100">
                                    <td className="py-3 pr-4 text-slate-900">{event.event_type}</td>
                                    <td className="py-3 text-slate-600">{event.processed_at ? new Date(event.processed_at).toLocaleString('es-ES') : '—'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>

            <section className="bg-white rounded-2xl border border-slate-200 p-5 overflow-x-auto">
                <div className="flex items-center justify-between gap-4 mb-4">
                    <div>
                        <h2 className="font-semibold text-slate-900">Incidencias de conciliación Stripe</h2>
                        <p className="text-sm text-slate-500 mt-1">Solo se registran cuando el sistema no puede reconciliar una suscripción o corrige una falta menor de metadata.</p>
                    </div>
                    <div className="text-sm text-slate-500">
                        {syncSummary.errors} errores · {syncSummary.warnings} avisos
                    </div>
                </div>

                <table className="min-w-full text-sm">
                    <thead className="text-slate-500">
                        <tr>
                            <th className="pb-3 text-left">Tipo</th>
                            <th className="pb-3 text-left">Severidad</th>
                            <th className="pb-3 text-left">Detalle</th>
                            <th className="pb-3 text-left">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {syncIssues.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-8 text-center text-slate-500">
                                    No hay incidencias Stripe registradas.
                                </td>
                            </tr>
                        ) : (
                            syncIssues.map((issue) => (
                                <tr key={issue.id} className="border-t border-slate-100 align-top">
                                    <td className="py-3 pr-4 text-slate-900">{issue.issue_type}</td>
                                    <td className="py-3 pr-4"><StatusBadge value={issue.severity} /></td>
                                    <td className="py-3 pr-4">
                                        <p className="text-slate-900">{issue.message}</p>
                                        {issue.stripe_subscription_id ? (
                                            <p className="text-xs text-slate-500 mt-1">Subscription: {issue.stripe_subscription_id}</p>
                                        ) : null}
                                    </td>
                                    <td className="py-3 text-slate-600">
                                        {issue.resolved_at ? `Resuelta · ${new Date(issue.resolved_at).toLocaleString('es-ES')}` : 'Pendiente'}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    );
}