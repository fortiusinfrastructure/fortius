-- ============================================================
-- CONTENT SCHEMA EXTENSIONS — IEAM + future orgs
-- ============================================================
-- Extends articles and activities with IEAM-required fields.
-- Creates article_authors and activity_speakers join tables.
-- Adds admin RLS policies and content-media storage bucket.
-- Safe to re-run: all statements use IF NOT EXISTS / OR REPLACE.

-- ============================================================
-- 1. EXTEND articles
-- ============================================================
ALTER TABLE articles
  ADD COLUMN IF NOT EXISTS subtitle_es            TEXT,
  ADD COLUMN IF NOT EXISTS subtitle_en            TEXT,
  ADD COLUMN IF NOT EXISTS pull_quote_es          TEXT,
  ADD COLUMN IF NOT EXISTS pull_quote_en          TEXT,
  ADD COLUMN IF NOT EXISTS read_time              TEXT,        -- e.g. "12 min"
  ADD COLUMN IF NOT EXISTS content_kind           TEXT,        -- analisis | policy | infografia | …
  ADD COLUMN IF NOT EXISTS main_image_caption_es  TEXT,
  ADD COLUMN IF NOT EXISTS main_image_caption_en  TEXT,
  ADD COLUMN IF NOT EXISTS materials              JSONB;       -- [{label, label_en, url}]

-- ============================================================
-- 2. EXTEND activities
-- ============================================================
ALTER TABLE activities
  ADD COLUMN IF NOT EXISTS subtitle_es        TEXT,
  ADD COLUMN IF NOT EXISTS subtitle_en        TEXT,
  ADD COLUMN IF NOT EXISTS excerpt_en         TEXT,
  ADD COLUMN IF NOT EXISTS format             TEXT,            -- Chatham House | Presencial | Virtual
  ADD COLUMN IF NOT EXISTS format_en          TEXT,
  ADD COLUMN IF NOT EXISTS highlight_image_url TEXT,
  ADD COLUMN IF NOT EXISTS agenda_title_es    TEXT,
  ADD COLUMN IF NOT EXISTS agenda_title_en    TEXT,
  ADD COLUMN IF NOT EXISTS agenda             JSONB,           -- [{time, title, title_en, speaker, speaker_en}]
  ADD COLUMN IF NOT EXISTS location_en        TEXT,
  ADD COLUMN IF NOT EXISTS registration_url   TEXT;

-- ============================================================
-- 3. article_authors (join table)
-- ============================================================
CREATE TABLE IF NOT EXISTS article_authors (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id      UUID REFERENCES articles(id)      ON DELETE CASCADE NOT NULL,
  organization_id UUID REFERENCES organizations(id) NOT NULL,
  name            TEXT NOT NULL,
  name_en         TEXT,
  role_es         TEXT,
  role_en         TEXT,
  bio_es          TEXT,
  bio_en          TEXT,
  image_url       TEXT,
  linkedin        TEXT,
  email           TEXT,
  display_order   INT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_article_authors_article
  ON article_authors (article_id);

-- ============================================================
-- 4. activity_speakers (join table)
-- ============================================================
CREATE TABLE IF NOT EXISTS activity_speakers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id     UUID REFERENCES activities(id)    ON DELETE CASCADE NOT NULL,
  organization_id UUID REFERENCES organizations(id) NOT NULL,
  name            TEXT NOT NULL,
  role_es         TEXT,
  role_en         TEXT,
  group_name_es   TEXT,
  group_name_en   TEXT,
  display_order   INT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activity_speakers_activity
  ON activity_speakers (activity_id);

-- ============================================================
-- 5. RLS — Enable on join tables
-- ============================================================
ALTER TABLE article_authors  ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_speakers ENABLE ROW LEVEL SECURITY;

-- Public read (authors/speakers of published content are public)
DROP POLICY IF EXISTS "Article authors viewable by everyone" ON article_authors;
CREATE POLICY "Article authors viewable by everyone"
  ON article_authors FOR SELECT USING (true);

DROP POLICY IF EXISTS "Activity speakers viewable by everyone" ON activity_speakers;
CREATE POLICY "Activity speakers viewable by everyone"
  ON activity_speakers FOR SELECT USING (true);

-- Org admins/editors can manage join tables
DROP POLICY IF EXISTS "Org admins can manage article_authors" ON article_authors;
CREATE POLICY "Org admins can manage article_authors"
  ON article_authors FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_memberships um
      JOIN articles a ON a.id = article_authors.article_id
      WHERE um.user_id = auth.uid()
        AND um.organization_id = a.organization_id
        AND um.role IN ('editor', 'admin', 'super_admin')
        AND um.status = 'active'
    )
  );

DROP POLICY IF EXISTS "Org admins can manage activity_speakers" ON activity_speakers;
CREATE POLICY "Org admins can manage activity_speakers"
  ON activity_speakers FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_memberships um
      JOIN activities ac ON ac.id = activity_speakers.activity_id
      WHERE um.user_id = auth.uid()
        AND um.organization_id = ac.organization_id
        AND um.role IN ('editor', 'admin', 'super_admin')
        AND um.status = 'active'
    )
  );

-- Org admins/editors can write articles and activities
DROP POLICY IF EXISTS "Org admins can manage articles" ON articles;
CREATE POLICY "Org admins can manage articles"
  ON articles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_memberships um
      WHERE um.user_id = auth.uid()
        AND um.organization_id = articles.organization_id
        AND um.role IN ('editor', 'admin', 'super_admin')
        AND um.status = 'active'
    )
  );

DROP POLICY IF EXISTS "Org admins can manage activities" ON activities;
CREATE POLICY "Org admins can manage activities"
  ON activities FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_memberships um
      WHERE um.user_id = auth.uid()
        AND um.organization_id = activities.organization_id
        AND um.role IN ('editor', 'admin', 'super_admin')
        AND um.status = 'active'
    )
  );

-- ============================================================
-- 6. Storage bucket — content-media
-- ============================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'content-media',
  'content-media',
  true,
  10485760,  -- 10 MB per file
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public read on content-media" ON storage.objects;
CREATE POLICY "Public read on content-media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'content-media');

DROP POLICY IF EXISTS "Authenticated users can upload to content-media" ON storage.objects;
CREATE POLICY "Authenticated users can upload to content-media"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'content-media' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Owners can delete from content-media" ON storage.objects;
CREATE POLICY "Owners can delete from content-media"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'content-media' AND auth.uid() = owner);
