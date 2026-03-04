import { activities } from './apps/web-escuela-hispanica/src/lib/mock-data/activities';

function getLocalizedValue(field: any, locale: string): string {
    if (!field) return '';
    if (typeof field === 'string') return field;
    const value = field[locale];
    if (!value || value.trim() === '') {
        return field.es || '';
    }
    return value;
}

function validateActivities() {
    const locales = ['es', 'en', 'pt'];
    activities.forEach((activity, index) => {
        const slug = activity.slug;
        locales.forEach(locale => {
            try {
                const title = getLocalizedValue(activity.title, locale);
                const content = getLocalizedValue(activity.content, locale);
                const excerpt = getLocalizedValue(activity.excerpt, locale);
                
                if (!title) console.error(`Activity ${slug} missing title for ${locale}`);
                if (!content) console.error(`Activity ${slug} missing content for ${locale}`);
                if (!excerpt) console.error(`Activity ${slug} missing excerpt for ${locale}`);
            } catch (e) {
                console.error(`Error localizing activity ${slug} for ${locale}:`, e);
            }
        });
    });
}

try {
    validateActivities();
    console.log("Validation complete");
} catch (e) {
    console.error("Validation failed with error:", e);
}
