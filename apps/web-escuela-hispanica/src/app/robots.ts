import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.escuelahispanica.org';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/colabora/exito'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
