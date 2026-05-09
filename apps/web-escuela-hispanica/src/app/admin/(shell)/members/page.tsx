import { MetricCard } from '@/components/admin/MetricCard';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { requireAdminUser } from '@/lib/admin/auth';
import { getMembershipDashboard } from '@/lib/admin/membership-queries';

function hrefWith(filters: { status?: string; tier?: string }) {
    const params = new URLSearchParams();
    if (filters.status) params.set('status', filters.status);
    if (filters.tier) params.set('tier', filters.tier);
    const query = params.toString();
    return query ? `/admin/members?${query}` : '/admin/members';
}

export default async function MembersPage({
    searchParams,
}: {
    searchParams: Promise<{ status?: string; tier?: string }>;
}) {
    await requireAdminUser();
    const filters = await searchParams;
    const { summary, records } = await getMembershipDashboard(filters);

    return (
        <div className="p-6 space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Estado de miembros</h1>
                <p className="text-sm text-slate-500 mt-1">Filtra por estado y tier para revisar el ciclo de vida completo.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <MetricCard label="Pendientes" value={summary.pending} tone="gold" />
                <MetricCard label="Aprobados por pagar" value={summary.approved} tone="blue" />
                <MetricCard label="Activos" value={summary.active} tone="green" />
                <MetricCard label="Expirados" value={summary.expired} tone="slate" />
            </div>

            <div className="flex flex-wrap gap-2">
                {['all', 'pending', 'approved', 'active', 'expired', 'rejected', 'past_due'].map((status) => (
                    <a key={status} href={hrefWith({ status, tier: filters.tier })} className={`rounded-full px-3 py-1.5 text-sm ${filters.status === status || (!filters.status && status === 'all') ? 'bg-[#050a14] text-white' : 'bg-white border border-slate-200 text-slate-600'}`}>
                        {status}
                    </a>
                ))}
                {['all', 'academico', 'amigo', 'mecenas'].map((tier) => (
                    <a key={tier} href={hrefWith({ status: filters.status, tier })} className={`rounded-full px-3 py-1.5 text-sm ${filters.tier === tier || (!filters.tier && tier === 'all') ? 'bg-[#c5a059] text-[#050a14]' : 'bg-white border border-slate-200 text-slate-600'}`}>
                        {tier}
                    </a>
                ))}
            </div>

            <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200">
                <table className="min-w-full text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                        <tr>
                            <th className="px-4 py-3 text-left">Miembro</th>
                            <th className="px-4 py-3 text-left">Tier</th>
                            <th className="px-4 py-3 text-left">Estado</th>
                            <th className="px-4 py-3 text-left">Expira</th>
                            <th className="px-4 py-3 text-left">Recordatorios</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record) => (
                            <tr key={record.id} className="border-t border-slate-100 align-top">
                                <td className="px-4 py-3">
                                    <p className="font-medium text-slate-900">{record.fullName}</p>
                                    <p className="text-slate-500">{record.email}</p>
                                    {record.institution ? <p className="text-xs text-slate-400 mt-1">{record.institution}</p> : null}
                                </td>
                                <td className="px-4 py-3 text-slate-700">{record.tier || '—'}</td>
                                <td className="px-4 py-3"><StatusBadge value={record.displayStatus} /></td>
                                <td className="px-4 py-3 text-slate-700">{record.expiresAt ? new Date(record.expiresAt).toLocaleDateString('es-ES') : '—'}</td>
                                <td className="px-4 py-3 text-slate-700">{record.reminderCount} · {record.lastReminderSentAt ? new Date(record.lastReminderSentAt).toLocaleString('es-ES') : 'Sin envíos'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}