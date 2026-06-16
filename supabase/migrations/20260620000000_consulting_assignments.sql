-- Migration: Fortius Consulting consultant <-> client assignments and projects.
--
-- Adds the minimum schema needed for the private area To-Be:
--   1. A 'consultant' role on user_memberships.
--   2. assigned_consultant_id on user_memberships, so a client membership can
--      point to the consultant that owns the relationship.
--   3. client_projects: per-client engagements with free-form JSONB KPIs.
--
-- All statements are idempotent so the migration can be re-applied safely.

-- 1) Expand the role check to include 'consultant'.
ALTER TABLE user_memberships
  DROP CONSTRAINT IF EXISTS user_memberships_role_check;

ALTER TABLE user_memberships
  ADD CONSTRAINT user_memberships_role_check CHECK (
    role IN ('member', 'editor', 'admin', 'super_admin', 'consultant')
  );

-- 2) Link a client membership to the consultant that owns the account.
ALTER TABLE user_memberships
  ADD COLUMN IF NOT EXISTS assigned_consultant_id UUID
    REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_user_memberships_assigned_consultant
  ON user_memberships (assigned_consultant_id);

-- 3) Client projects: one row per engagement / workstream.
CREATE TABLE IF NOT EXISTS client_projects (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id   UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  client_user_id    UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  consultant_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title             TEXT NOT NULL,
  summary           TEXT,
  status            TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'paused', 'completed', 'archived')),
  -- KPIs as free-form JSON list: [{label, value, target, unit}].
  kpis              JSONB NOT NULL DEFAULT '[]'::jsonb,
  metadata          JSONB NOT NULL DEFAULT '{}'::jsonb,
  started_at        TIMESTAMPTZ DEFAULT NOW(),
  ended_at          TIMESTAMPTZ,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_client_projects_client
  ON client_projects (client_user_id, organization_id);

CREATE INDEX IF NOT EXISTS idx_client_projects_consultant
  ON client_projects (consultant_user_id, organization_id);

ALTER TABLE client_projects ENABLE ROW LEVEL SECURITY;
