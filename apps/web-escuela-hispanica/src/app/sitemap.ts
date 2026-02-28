import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.escuelahispanica.org';

    const routes = [
        '',
        '/nosotros',
        '/proyectos',
        '/proyectos/1776',
        '/actividades',
        '/publicaciones',
        '/colabora',
        '/contacto',
        '/recursos',
        '/recursos/biografias',
        '/aviso-legal',
        '/politica-privacidad',
        '/politica-cookies'
    ];

    return routes.flatMap((route) => {
        // Generate entries for all supported locales
        const locales = ['es', 'en', 'pt'];

        return locales.map(locale => ({
            url: `${baseUrl}/${locale}${route}`,
            lastModified: new Date(),
            changeFrequency: route === '' ? 'daily' : 'weekly',
            priority: route === '' ? 1 : (route.includes('politica') || route.includes('aviso')) ? 0.3 : 0.8,
        }));
    });
}
