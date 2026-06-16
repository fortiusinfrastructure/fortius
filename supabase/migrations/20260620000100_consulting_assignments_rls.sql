-- Migration: RLS policies for Fortius Consulting consultant <-> client model.
--
-- Two scopes are covered:
--   1. user_memberships: a consultant can read the memberships of the clients
--      assigned to them (in addition to the existing "own memberships" policy).
--   2. client_projects: clients read their own projects; consultants read the
--      projects of their assigned clients; admins/super_admins read all in
--      their organization.
--
-- All CREATE POLICY statements drop the policy first so the migration is
-- safe to re-apply.

-- 1) Consultants can read memberships of clients assigned to them.
DROP POLICY IF EXISTS "Consultants can read assigned client memberships"
  ON user_memberships;

CREATE POLICY "Consultants can read assigned client memberships"
  ON user_memberships
  FOR SELECT
  USING (assigned_consultant_id = auth.uid());

-- 2) client_projects policies.

-- 2a) Clients read their own projects.
DROP POLICY IF EXISTS "Clients can read own projects" ON client_projects;

CREATE POLICY "Clients can read own projects"
  ON client_projects
  FOR SELECT
  USING (client_user_id = auth.uid());

-- 2b) Consultants read the projects of clients they own.
DROP POLICY IF EXISTS "Consultants can read assigned client projects"
  ON client_projects;

CREATE POLICY "Consultants can read assigned client projects"
  ON client_projects
  FOR SELECT
  USING (consultant_user_id = auth.uid());

-- 2c) Org admins / super_admins read all projects in their organization.
DROP POLICY IF EXISTS "Admins can read org projects" ON client_projects;

CREATE POLICY "Admins can read org projects"
  ON client_projects
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM user_memberships um
      WHERE um.user_id = auth.uid()
        AND um.organization_id = client_projects.organization_id
        AND um.status = 'active'
        AND um.role IN ('admin', 'super_admin')
    )
  );

-- 2d) Org admins / super_admins can write projects in their organization.
DROP POLICY IF EXISTS "Admins can write org projects" ON client_projects;

CREATE POLICY "Admins can write org projects"
  ON client_projects
  FOR ALL
  USING (
    EXISTS (
      SELECT 1
      FROM user_memberships um
      WHERE um.user_id = auth.uid()
        AND um.organization_id = client_projects.organization_id
        AND um.status = 'active'
        AND um.role IN ('admin', 'super_admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM user_memberships um
      WHERE um.user_id = auth.uid()
        AND um.organization_id = client_projects.organization_id
        AND um.status = 'active'
        AND um.role IN ('admin', 'super_admin')
    )
  );

-- 2e) Consultants can update KPIs / status of the projects they own.
DROP POLICY IF EXISTS "Consultants can update assigned projects"
  ON client_projects;

CREATE POLICY "Consultants can update assigned projects"
  ON client_projects
  FOR UPDATE
  USING (consultant_user_id = auth.uid())
  WITH CHECK (consultant_user_id = auth.uid());
