/**
 * Localization + date helpers used by ported components.
 *
 * The mock-data files (copied from the Vite app) store secondary-language
 * variants as sibling fields (`title_en`, `subtitle_en`, etc.). These helpers
 * resolve the right variant based on the active locale.
 */

export type Locale = 'es' | 'en';

/**
 * Return a shallow copy of `item` where, when locale is `en`, any field with
 * a matching `_en` sibling is replaced by that sibling. The return type
 * mirrors the input type so downstream consumers keep full type information.
 */
export function pickLocalized<T extends object>(item: T, locale: Locale): T {
  if (locale !== 'en') return item;
  const record = item as Record<string, unknown>;
  const out: Record<string, unknown> = { ...record };
  for (const key of Object.keys(record)) {
    const enKey = `${key}_en`;
    const enValue = record[enKey];
    if (enValue !== undefined && enValue !== null && enValue !== '') {
      out[key] = enValue;
    }
  }
  return out as T;
}

/**
 * Parse dates like "14 Nov 2024", "20 Sep 2025" (ES) or "Jan 2025" (EN partial).
 * Mirrors the logic used in the original IEAM Vite app.
 */
const MONTHS: Record<string, number> = {
  Ene: 0, Feb: 1, Mar: 2, Abr: 3, May: 4, Jun: 5,
  Jul: 6, Ago: 7, Sep: 8, Oct: 9, Nov: 10, Dic: 11,
  Jan: 0, Apr: 3, Aug: 7, Dec: 11,
};

export function parseEventDate(dateString: string): Date {
  const parts = dateString.split(' ');
  if (parts.length === 2) {
    const month = MONTHS[parts[0]] ?? 0;
    const year = parseInt(parts[1], 10);
    return new Date(year, month, 1);
  }
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = MONTHS[parts[1]] ?? 0;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  return new Date();
}
