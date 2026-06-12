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

/**
 * Storage object keys must be ASCII-safe. Strip diacritics and replace any
 * remaining unsafe char. Keep in sync with
 * scripts/migrate-docs-to-storage.ts → sanitizeKey().
 */
export function sanitizeDocKey(filename: string): string {
  return filename
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9._-]/g, '-');
}

const LIBRARY_DOCS_BASE = `${process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''}/storage/v1/object/public/library-docs/ieam`;

/**
 * Resolve a material/download URL. Legacy `/docs/<file>` paths are mapped to
 * their public Supabase Storage URL (library-docs/ieam). Absolute URLs (e.g.
 * uploaded via the CMS) are returned unchanged.
 */
export function resolveMaterialUrl(url: string | undefined): string | undefined {
  if (!url) return url;
  if (url.startsWith('/docs/')) {
    // `?download` forces Content-Disposition: attachment (cross-origin links
    // ignore the HTML `download` attribute).
    return `${LIBRARY_DOCS_BASE}/${sanitizeDocKey(url.slice('/docs/'.length))}?download`;
  }
  return url;
}

type MaterialLike = { url?: string; url_es?: string; url_en?: string } & Record<string, unknown>;

/** Apply resolveMaterialUrl to every url field of a materials array. */
export function resolveMaterials<T extends MaterialLike>(materials: T[] | undefined): T[] | undefined {
  if (!materials?.length) return materials;
  return materials.map((m) => ({
    ...m,
    url: resolveMaterialUrl(m.url) as string,
    ...(m.url_es !== undefined ? { url_es: resolveMaterialUrl(m.url_es) } : {}),
    ...(m.url_en !== undefined ? { url_en: resolveMaterialUrl(m.url_en) } : {}),
  }));
}
