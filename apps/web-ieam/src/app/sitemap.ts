import { MetadataRoute } from 'next';
import { articles } from '@/lib/mock-data/articles';
import { events } from '@/lib/mock-data/events';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ieam.es';

    const staticRoutes = [
        '',
        '/investigacion',
        '/eventos',
        '/nosotros',
        '/contacto',
        '/colabora',
        '/legal',
        '/privacy',
        '/cookies',
    ];

    const articleRoutes = articles.map(article => `/analisis/${article.slug}`);
    const eventRoutes = events.map(event => `/eventos/${event.slug}`);

    const allRoutes = [...staticRoutes, ...articleRoutes, ...eventRoutes];
    const locales = ['es', 'en'];

    return allRoutes.flatMap((route) => {
        return locales.map(locale => ({
            url: `${baseUrl}/${locale}${route}`,
            lastModified: new Date(),
            changeFrequency: route === '' ? 'daily' : 'weekly',
            priority: route === '' ? 1 : route.includes('analisis') ? 0.9 : 0.7,
        }));
    });
}
