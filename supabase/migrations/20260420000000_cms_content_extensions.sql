-- ============================================
-- CMS Content Extensions — Phase A
-- Extiende articles y activities con campos
-- IEAM-específicos y crea tablas relacionales
-- para autores y ponentes normalizados.
-- Compatible con arquitectura multi-tenant.
-- ============================================

-- 1. Extender tabla articles
ALTER TABLE articles
  ADD COLUMN IF NOT EXISTS subtitle_es              TEXT,
  ADD COLUMN IF NOT EXISTS subtitle_en              TEXT,
  ADD COLUMN IF NOT EXISTS content_kind             TEXT
    CHECK (content_kind IN ('analisis','policy','infografia','reseña-evento','entrevista','nota-prensa')),
  ADD COLUMN IF NOT EXISTS read_time                TEXT,
  ADD COLUMN IF NOT EXISTS materials                JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS pull_quote_es            TEXT,
  ADD COLUMN IF NOT EXISTS pull_quote_en            TEXT,
  ADD COLUMN IF NOT EXISTS main_image_caption_es    TEXT,
  ADD COLUMN IF NOT EXISTS main_image_caption_en    TEXT;

-- 2. Extender tabla activities
ALTER TABLE activities
  ADD COLUMN IF NOT EXISTS subtitle_es        TEXT,
  ADD COLUMN IF NOT EXISTS subtitle_en        TEXT,
  ADD COLUMN IF NOT EXISTS excerpt_en         TEXT,
  ADD COLUMN IF NOT EXISTS format             TEXT,
  ADD COLUMN IF NOT EXISTS format_en          TEXT,
  ADD COLUMN IF NOT EXISTS agenda             JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS agenda_title_es    TEXT,
  ADD COLUMN IF NOT EXISTS agenda_title_en    TEXT,
  ADD COLUMN IF NOT EXISTS highlight_image_url TEXT;

-- 3. Tabla relacional: autores de artículos
-- Permite múltiples autores por artículo con orden de aparición.
-- user_id es nullable: soporta autores externos sin cuenta Supabase.
CREATE TABLE IF NOT EXISTS article_authors (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id      UUID REFERENCES articles(id) ON DELETE CASCADE NOT NULL,
  user_id         UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  display_order   INT NOT NULL DEFAULT 0,
  name            TEXT NOT NULL,
  name_en         TEXT,
  role_es         TEXT,
  role_en         TEXT,
  bio_es          TEXT,
  bio_en          TEXT,
  image_url       TEXT,
  linkedin        TEXT,
  email           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_article_authors_article ON article_authors(article_id);

-- 4. Tabla relacional: ponentes de actividades/eventos
CREATE TABLE IF NOT EXISTS activity_speakers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id     UUID REFERENCES activities(id) ON DELETE CASCADE NOT NULL,
  user_id         UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  display_order   INT NOT NULL DEFAULT 0,
  name            TEXT NOT NULL,
  role_es         TEXT,
  role_en         TEXT,
  group_name_es   TEXT,
  group_name_en   TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activity_speakers_activity ON activity_speakers(activity_id);

-- 5. Habilitar RLS en tablas nuevas
ALTER TABLE article_authors    ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_speakers  ENABLE ROW LEVEL SECURITY;

-- 6. Políticas de lectura pública (join tables)
CREATE POLICY "article_authors_public_read" ON article_authors
  FOR SELECT USING (true);

CREATE POLICY "activity_speakers_public_read" ON activity_speakers
  FOR SELECT USING (true);

-- 7. Políticas de escritura para editores/admins
-- La lógica: el usuario debe tener role editor/admin/super_admin
-- en la misma organización que el artículo o actividad.

CREATE POLICY "editors_manage_articles" ON articles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_memberships m
      WHERE m.user_id = auth.uid()
        AND m.organization_id = articles.organization_id
        AND m.role IN ('editor', 'admin', 'super_admin')
        AND m.status = 'active'
    )
  );

CREATE POLICY "editors_manage_article_authors" ON article_authors
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM articles a
      JOIN user_memberships m ON m.organization_id = a.organization_id
      WHERE a.id = article_authors.article_id
        AND m.user_id = auth.uid()
        AND m.role IN ('editor', 'admin', 'super_admin')
        AND m.status = 'active'
    )
  );

CREATE POLICY "editors_manage_activities" ON activities
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_memberships m
      WHERE m.user_id = auth.uid()
        AND m.organization_id = activities.organization_id
        AND m.role IN ('editor', 'admin', 'super_admin')
        AND m.status = 'active'
    )
  );

CREATE POLICY "editors_manage_activity_speakers" ON activity_speakers
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM activities a
      JOIN user_memberships m ON m.organization_id = a.organization_id
      WHERE a.id = activity_speakers.activity_id
        AND m.user_id = auth.uid()
        AND m.role IN ('editor', 'admin', 'super_admin')
        AND m.status = 'active'
    )
  );

-- 8. Bucket de Supabase Storage para medios de contenido
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'content-media',
  'content-media',
  true,
  10485760, -- 10 MB
  ARRAY['image/jpeg','image/png','image/webp','image/gif','application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- 9. Políticas de Storage
CREATE POLICY "content_media_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'content-media');

CREATE POLICY "content_media_editor_insert" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'content-media'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "content_media_editor_update" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'content-media'
    AND auth.uid() = owner
  );

CREATE POLICY "content_media_editor_delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'content-media'
    AND auth.uid() = owner
  );
