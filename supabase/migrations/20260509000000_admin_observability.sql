-- ============================================================
-- ADMIN OBSERVABILITY — EH dashboard foundations
-- ============================================================

-- 1. Persist sent email logs for admin traceability
CREATE TABLE IF NOT EXISTS communication_logs (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id     UUID REFERENCES organizations(id) NOT NULL,
  channel             TEXT NOT NULL DEFAULT 'email' CHECK (channel IN ('email')),
  kind                TEXT NOT NULL,
  recipient_email     TEXT NOT NULL,
  subject             TEXT NOT NULL,
  status              TEXT NOT NULL CHECK (status IN ('sent', 'failed')),
  provider            TEXT DEFAULT 'resend',
  provider_message_id TEXT,
  related_table       TEXT,
  related_id          TEXT,
  metadata            JSONB DEFAULT '{}'::jsonb,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_communication_logs_org_created
  ON communication_logs (organization_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_communication_logs_kind_status
  ON communication_logs (organization_id, kind, status);

ALTER TABLE communication_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Org admins can manage communication logs" ON communication_logs;
CREATE POLICY "Org admins can manage communication logs"
  ON communication_logs FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_memberships um
      WHERE um.user_id = auth.uid()
        AND um.organization_id = communication_logs.organization_id
        AND um.role IN ('editor', 'admin', 'super_admin')
        AND um.status = 'active'
    )
  );

-- 2. Add organization scoping to Stripe events for admin filtering
ALTER TABLE stripe_events
  ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id);

CREATE INDEX IF NOT EXISTS idx_stripe_events_org_processed
  ON stripe_events (organization_id, processed_at DESC);

-- 3. Add attendance tracking to event registrations
ALTER TABLE event_registrations
  ADD COLUMN IF NOT EXISTS attendance_status TEXT DEFAULT 'unconfirmed'
    CHECK (attendance_status IN ('unconfirmed', 'attended', 'absent')),
  ADD COLUMN IF NOT EXISTS attended_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_event_registrations_attendance
  ON event_registrations (organization_id, event_slug, attendance_status);