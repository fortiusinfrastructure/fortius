-- ============================================================
-- STRIPE SYNC ISSUES — reconciliation observability
-- ============================================================

CREATE TABLE IF NOT EXISTS stripe_sync_issues (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id       UUID REFERENCES organizations(id) NOT NULL,
  event_id              TEXT,
  event_type            TEXT,
  stripe_subscription_id TEXT,
  stripe_customer_id    TEXT,
  issue_type            TEXT NOT NULL,
  severity              TEXT NOT NULL DEFAULT 'warning' CHECK (severity IN ('warning', 'error')),
  message               TEXT NOT NULL,
  metadata              JSONB DEFAULT '{}'::jsonb,
  resolved_at           TIMESTAMPTZ,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_stripe_sync_issues_org_created
  ON stripe_sync_issues (organization_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_stripe_sync_issues_unresolved
  ON stripe_sync_issues (organization_id, resolved_at, severity);

CREATE INDEX IF NOT EXISTS idx_stripe_sync_issues_subscription
  ON stripe_sync_issues (stripe_subscription_id);

ALTER TABLE stripe_sync_issues ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Org admins can manage stripe sync issues" ON stripe_sync_issues;
CREATE POLICY "Org admins can manage stripe sync issues"
  ON stripe_sync_issues FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_memberships um
      WHERE um.user_id = auth.uid()
        AND um.organization_id = stripe_sync_issues.organization_id
        AND um.role IN ('editor', 'admin', 'super_admin')
        AND um.status = 'active'
    )
  );