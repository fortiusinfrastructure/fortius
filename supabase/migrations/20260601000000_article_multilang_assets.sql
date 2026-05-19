-- ============================================================
-- ARTICLE MULTILANG ASSETS — per-locale featured image
-- ============================================================
-- Adds independent featured-image columns per locale for articles.
-- Materials JSONB now also supports optional `url_es` / `url_en`
-- (no schema change required — JSONB is flexible).
-- Safe to re-run.

ALTER TABLE articles
  ADD COLUMN IF NOT EXISTS featured_image_es TEXT,
  ADD COLUMN IF NOT EXISTS featured_image_en TEXT;

COMMENT ON COLUMN articles.featured_image    IS 'Locale-neutral fallback hero image (legacy / default).';
COMMENT ON COLUMN articles.featured_image_es IS 'Hero image used when locale=es. Falls back to featured_image.';
COMMENT ON COLUMN articles.featured_image_en IS 'Hero image used when locale=en. Falls back to featured_image.';
COMMENT ON COLUMN articles.materials         IS 'JSONB array [{label, label_en?, url, url_es?, url_en?}]. Per-locale URL overrides url.';
