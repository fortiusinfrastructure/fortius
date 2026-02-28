import type { LocalizedText } from '@/types';

/**
 * Resolves a potentially localized field based on the current locale.
 * If the field is a string, it returns it as is.
 * If the field is a LocalizedText object, it returns the value for the given locale,
 * falling back to Spanish ('es') if the locale's value is missing or empty.
 */
export function getLocalizedValue<T>(
    field: T | LocalizedText | undefined | null,
    locale: string
): string {
    if (!field) return '';

    if (typeof field === 'string') {
        return field;
    }

    // At this point we assume it's a LocalizedText object
    const localized = field as LocalizedText;
    const value = localized[locale as keyof LocalizedText];

    if (!value || value.trim() === '') {
        return localized.es || '';
    }

    return value;
}
