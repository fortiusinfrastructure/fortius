import { requireAdminUser } from '@/lib/admin/auth';
import { getArticlesForAdmin } from '@fortius/database';
import { getActivitiesForAdmin } from '@fortius/database';
import { FileText, CalendarDays, Eye, Clock } from 'lucide-react';

const ORG_SLUG = 'ieam';

export default async function AdminDashboard() {
    const user = await requireAdminUser();

    const [articles, activities] = await Promise.all([
        getArticlesForAdmin(ORG_SLUG),
        getActivitiesForAdmin(ORG_SLUG),
    ]);

    const publishedArticles = articles.filter((a) => a.status === 'published');
    const draftArticles = articles.filter((a) => a.status === 'draft');
    const upcomingEvents = activities.filter(
        (e) => e.status === 'published' && new Date(e.event_date) >= new Date()
    );

    const stats = [
        {
            label: 'Artículos publicados',
            value: publishedArticles.length,
            icon: <FileText size={20} />,
            color: 'text-blue-600 bg-blue-50',
        },
        {
            label: 'Borradores',
            value: draftArticles.length,
            icon: <Clock size={20} />,
            color: 'text-amber-600 bg-amber-50',
        },
        {
            label: 'Eventos próximos',
            value: upcomingEvents.length,
            icon: <CalendarDays size={20} />,
            color: 'text-green-600 bg-green-50',
        },
        {
            label: 'Total contenidos',
            value: articles.length + activities.length,
            icon: <Eye size={20} />,
            color: 'text-slate-600 bg-slate-100',
        },
    ];

    const recentArticles = articles.slice(0, 5);
    const recentEvents = activities.slice(0, 5);

    return (
        <div className="p-6 space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Panel de control</h1>
                <p className="text-slate-500 text-sm mt-1">
                    Bienvenido, {user.email} · Rol: {user.role}
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white rounded-xl border border-slate-200 p-5"
                    >
                        <div className={`inline-flex p-2 rounded-lg ${stat.color} mb-3`}>
                            {stat.icon}
                        </div>
                        <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                        <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent content */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent articles */}
                <div className="bg-white rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                        <h2 className="font-semibold text-slate-900 text-sm">
                            Artículos recientes
                        </h2>
                        <a
                            href="/admin/articles"
                            className="text-xs text-blue-600 hover:underline"
                        >
                            Ver todos
                        </a>
                    </div>
                    <ul className="divide-y divide-slate-100">
                        {recentArticles.length === 0 ? (
                            <li className="px-5 py-4 text-sm text-slate-400">Sin artículos aún.</li>
                        ) : (
                            recentArticles.map((article) => (
                                <li key={article.id} className="px-5 py-3">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-slate-800 truncate">
                                                {article.title_es}
                                            </p>
                                            <p className="text-xs text-slate-400 mt-0.5">
                                                {article.category} · {article.slug}
                                            </p>
                                        </div>
                                        <StatusBadge status={article.status ?? 'draft'} />
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                    <div className="px-5 py-3 border-t border-slate-100">
                        <a
                            href="/admin/articles/new"
                            className="text-sm text-blue-600 hover:underline font-medium"
                        >
                            + Nuevo artículo
                        </a>
                    </div>
                </div>

                {/* Recent events */}
                <div className="bg-white rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                        <h2 className="font-semibold text-slate-900 text-sm">
                            Eventos recientes
                        </h2>
                        <a href="/admin/events" className="text-xs text-blue-600 hover:underline">
                            Ver todos
                        </a>
                    </div>
                    <ul className="divide-y divide-slate-100">
                        {recentEvents.length === 0 ? (
                            <li className="px-5 py-4 text-sm text-slate-400">Sin eventos aún.</li>
                        ) : (
                            recentEvents.map((event) => (
                                <li key={event.id} className="px-5 py-3">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-slate-800 truncate">
                                                {event.title_es}
                                            </p>
                                            <p className="text-xs text-slate-400 mt-0.5">
                                                {event.event_date} · {event.location ?? '—'}
                                            </p>
                                        </div>
                                        <StatusBadge status={event.status ?? 'draft'} />
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                    <div className="px-5 py-3 border-t border-slate-100">
                        <a
                            href="/admin/events/new"
                            className="text-sm text-blue-600 hover:underline font-medium"
                        >
                            + Nuevo evento
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        published: 'bg-green-100 text-green-700',
        draft: 'bg-amber-100 text-amber-700',
        archived: 'bg-slate-100 text-slate-500',
    };
    const labels: Record<string, string> = {
        published: 'Publicado',
        draft: 'Borrador',
        archived: 'Archivado',
    };
    return (
        <span
            className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${styles[status] ?? styles.draft}`}
        >
            {labels[status] ?? status}
        </span>
    );
}
