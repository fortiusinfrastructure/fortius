import { requireAdminUser } from '@/lib/admin/auth';
import { getArticlesForAdmin } from '@fortius/database';
import { Plus, Pencil } from 'lucide-react';
import { DeleteArticleButton } from './_components/DeleteArticleButton';

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

export default async function ArticlesListPage() {
    await requireAdminUser();
    const articles = await getArticlesForAdmin(ORG_SLUG);

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Artículos</h1>
                    <p className="text-slate-500 text-sm mt-1">{articles.length} contenidos totales</p>
                </div>
                <a
                    href="/admin/articles/new"
                    className="flex items-center gap-2 bg-[#0A2540] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1a3a5c] transition-colors"
                >
                    <Plus size={16} />
                    Nuevo artículo
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
                                Tipo
                            </th>
                            <th className="text-left px-4 py-3 font-medium text-slate-600 hidden lg:table-cell">
                                Categoría
                            </th>
                            <th className="text-left px-4 py-3 font-medium text-slate-600 hidden lg:table-cell">
                                Fecha
                            </th>
                            <th className="text-left px-4 py-3 font-medium text-slate-600">
                                Estado
                            </th>
                            <th className="px-4 py-3" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {articles.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                                    No hay artículos todavía.{' '}
                                    <a
                                        href="/admin/articles/new"
                                        className="text-blue-600 underline"
                                    >
                                        Crear el primero
                                    </a>
                                </td>
                            </tr>
                        ) : (
                            articles.map((article) => (
                                <tr key={article.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="font-medium text-slate-900 line-clamp-1">
                                                {article.title_es}
                                            </p>
                                            <p className="text-xs text-slate-400 mt-0.5">
                                                /{article.slug}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 hidden md:table-cell text-slate-600">
                                        {article.content_kind ?? '—'}
                                    </td>
                                    <td className="px-4 py-3 hidden lg:table-cell text-slate-600">
                                        {article.category}
                                    </td>
                                    <td className="px-4 py-3 hidden lg:table-cell text-slate-500">
                                        {article.published_at
                                            ? new Date(article.published_at).toLocaleDateString(
                                                  'es-ES',
                                                  { day: '2-digit', month: 'short', year: 'numeric' }
                                              )
                                            : '—'}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[article.status ?? 'draft'] ?? STATUS_STYLES.draft}`}
                                        >
                                            {STATUS_LABELS[article.status ?? 'draft']}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2 justify-end">
                                            <a
                                                href={`/admin/articles/${article.id}/edit`}
                                                className="text-slate-500 hover:text-slate-900 transition-colors"
                                                title="Editar"
                                            >
                                                <Pencil size={15} />
                                            </a>
                                            <DeleteArticleButton articleId={article.id} />
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
