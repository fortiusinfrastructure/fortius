-- ============================================================
-- NEWSLETTER SUBSCRIPTIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id     UUID REFERENCES organizations(id) NOT NULL,
  email               TEXT NOT NULL,
  status              TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'unsubscribed')),
  source              TEXT DEFAULT 'website',
  metadata            JSONB DEFAULT '{}'::jsonb,
  confirmed_at        TIMESTAMPTZ DEFAULT NOW(),
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (organization_id, email)
);

CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_org_created
  ON newsletter_subscriptions (organization_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_org_status
  ON newsletter_subscriptions (organization_id, status);

ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Org admins can manage newsletter subscriptions" ON newsletter_subscriptions;
CREATE POLICY "Org admins can manage newsletter subscriptions"
  ON newsletter_subscriptions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_memberships um
      WHERE um.user_id = auth.uid()
        AND um.organization_id = newsletter_subscriptions.organization_id
        AND um.role IN ('editor', 'admin', 'super_admin')
        AND um.status = 'active'
    )
  );