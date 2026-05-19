import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ieam.es';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/admin/',
                    '/api/',
                    '/*?*', // Evitar indexar parámetros de búsqueda
                ],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
