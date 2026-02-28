-- ============================================
-- 1. ORGANIZACIONES (El tejido conectivo)
-- ============================================

CREATE TABLE IF NOT EXISTS organizations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  domain      TEXT,
  description TEXT,
  logo_url    TEXT,
  branding    JSONB DEFAULT '{}'::jsonb,
  config      JSONB DEFAULT '{}'::jsonb,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Seed inicial
INSERT INTO organizations (slug, name, domain) VALUES
  ('escuela-hispanica', 'Escuela Hispánica', 'escuelahispanica.org'),
  ('ieam',              'IEAM',              'ieam.org'),
  ('mediterranean-dialogue', 'Mediterranean Dialogue', 'mediterraneandialogue.org'),
  ('fortius',           'Fundación Fortius',  'fundacionfortius.org')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 2. PERFILES (Extiende auth.users de Supabase)
-- ============================================

CREATE TABLE IF NOT EXISTS user_profiles (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  full_name             TEXT,
  display_name          TEXT,
  avatar_url            TEXT,
  phone                 TEXT,
  country               TEXT,
  city                  TEXT,
  institution           TEXT,
  bio                   TEXT,
  website_url           TEXT,
  academic_credentials  JSONB DEFAULT '[]'::jsonb,
  preferences           JSONB DEFAULT '{}'::jsonb,
  onboarding_completed  BOOLEAN DEFAULT FALSE,
  preferred_language    TEXT DEFAULT 'es',
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger: auto-crear perfil cuando un usuario se registra
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- 3. MEMBRESÍAS (Relación usuario ↔ organización)
-- ============================================

CREATE TABLE IF NOT EXISTS user_memberships (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  organization_id UUID REFERENCES organizations(id) NOT NULL,
  role            TEXT DEFAULT 'member' CHECK (role IN ('member', 'editor', 'admin', 'super_admin')),
  tier            TEXT DEFAULT 'free'   CHECK (tier IN ('free', 'amigo', 'academico', 'mecenas')),
  status          TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending', 'suspended')),
  joined_at       TIMESTAMPTZ DEFAULT NOW(),
  expires_at      TIMESTAMPTZ,
  metadata        JSONB DEFAULT '{}'::jsonb,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, organization_id)
);

CREATE TABLE IF NOT EXISTS membership_plans (
  id              TEXT PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) NOT NULL,
  name            TEXT NOT NULL,
  subtitle        TEXT,
  tier            TEXT NOT NULL CHECK (tier IN ('amigo', 'academico', 'mecenas')),
  price_cents     INTEGER NOT NULL,
  currency        TEXT DEFAULT 'EUR',
  interval        TEXT NOT NULL CHECK (interval IN ('monthly', 'annual', 'lifetime')),
  features        JSONB NOT NULL DEFAULT '[]'::jsonb,
  stripe_price_id TEXT,
  is_active       BOOLEAN DEFAULT TRUE,
  display_order   INT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. SUSCRIPCIONES Y PAGOS (Stripe ↔ Supabase)
-- ============================================

CREATE TABLE IF NOT EXISTS subscriptions (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                 UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  membership_id           UUID REFERENCES user_memberships(id),
  plan_id                 TEXT REFERENCES membership_plans(id) NOT NULL,
  stripe_subscription_id  TEXT UNIQUE NOT NULL,
  stripe_customer_id      TEXT NOT NULL,
  status                  TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'past_due', 'canceled', 'incomplete', 'trialing')),
  current_period_start    TIMESTAMPTZ,
  current_period_end      TIMESTAMPTZ,
  cancel_at_period_end    BOOLEAN DEFAULT FALSE,
  canceled_at             TIMESTAMPTZ,
  metadata                JSONB DEFAULT '{}'::jsonb,
  created_at              TIMESTAMPTZ DEFAULT NOW(),
  updated_at              TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payment_history (
  id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                   UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subscription_id           UUID REFERENCES subscriptions(id),
  stripe_payment_intent_id  TEXT UNIQUE,
  amount_cents              INTEGER NOT NULL,
  currency                  TEXT DEFAULT 'EUR',
  status                    TEXT NOT NULL,
  description               TEXT,
  created_at                TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. CONTENIDO MULTI-ORG
-- ============================================

CREATE TABLE IF NOT EXISTS articles (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) NOT NULL,
  slug            TEXT NOT NULL,
  
  -- Campos Multi-idioma
  title_es        TEXT NOT NULL,
  title_en        TEXT,
  title_pt        TEXT,
  content_es      TEXT NOT NULL,
  content_en      TEXT,
  content_pt      TEXT,
  excerpt_es      TEXT,
  excerpt_en      TEXT,
  excerpt_pt      TEXT,
  
  author_name     TEXT,
  author_id       UUID REFERENCES auth.users(id),
  published_at    TIMESTAMPTZ,
  category        TEXT NOT NULL,
  featured_image  TEXT,
  is_featured     BOOLEAN DEFAULT FALSE,
  status          TEXT DEFAULT 'published'
    CHECK (status IN ('draft', 'published', 'archived')),
  metadata        JSONB DEFAULT '{}'::jsonb,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, slug)
);

CREATE TABLE IF NOT EXISTS activities (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id   UUID REFERENCES organizations(id) NOT NULL,
  slug              TEXT NOT NULL,
  
  -- Multi-idioma
  title_es          TEXT NOT NULL,
  title_en          TEXT,
  title_pt          TEXT,
  content_es        TEXT NOT NULL,
  content_en        TEXT,
  content_pt        TEXT,
  excerpt_es        TEXT,
  
  event_date        DATE NOT NULL,
  end_date          DATE,
  location          TEXT,
  organizer         TEXT,
  type              TEXT,
  image_url         TEXT,
  gallery           JSONB DEFAULT '[]'::jsonb,
  is_featured       BOOLEAN DEFAULT FALSE,
  registration_open BOOLEAN DEFAULT FALSE,
  status            TEXT DEFAULT 'published'
    CHECK (status IN ('draft', 'published', 'archived')),
  metadata          JSONB DEFAULT '{}'::jsonb,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, slug)
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) NOT NULL,
  first_name      TEXT NOT NULL,
  last_name       TEXT NOT NULL,
  email           TEXT NOT NULL,
  subject         TEXT NOT NULL,
  message         TEXT NOT NULL,
  status          TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Configurar RLS
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Políticas de Lectura Pública
CREATE POLICY "Public profiles are viewable by everyone" ON user_profiles FOR SELECT USING (true);
CREATE POLICY "Organizations are viewable by everyone" ON organizations FOR SELECT USING (true);
CREATE POLICY "Membership plans are viewable by everyone" ON membership_plans FOR SELECT USING (is_active = true);
CREATE POLICY "Published articles viewable by everyone" ON articles FOR SELECT USING (status = 'published');
CREATE POLICY "Published activities viewable by everyone" ON activities FOR SELECT USING (status = 'published');

-- Políticas de Perfiles Personales (Solo el usuario lee/edita lo suyo)
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can read own memberships" ON user_memberships FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can read own subscriptions" ON subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can read own payment history" ON payment_history FOR SELECT USING (auth.uid() = user_id);
