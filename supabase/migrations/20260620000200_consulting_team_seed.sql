-- Migration: seed Fortius Consulting team memberships for Juan and Dídac.
--
-- Idempotent and defensive:
--   * Looks up the consulting organization by slug.
--   * Looks up the auth users by email.
--   * Upserts an active membership with the requested role.
--   * If the org or any user is missing, the relevant block is skipped (no
--     ERROR), so the migration does not block deployments that pre-date the
--     accounts being created.
--
-- Roles assigned:
--   * juan@fortiusconsulting.org   -> super_admin
--   * didac@fortiusconsulting.org  -> consultant

DO $$
DECLARE
  v_org_id  UUID;
  v_juan_id UUID;
  v_didac_id UUID;
BEGIN
  SELECT id INTO v_org_id
  FROM organizations
  WHERE slug = 'fortius-consulting'
  LIMIT 1;

  IF v_org_id IS NULL THEN
    RAISE NOTICE 'Skipping consulting team seed: organization slug "fortius-consulting" not found.';
    RETURN;
  END IF;

  SELECT id INTO v_juan_id
  FROM auth.users
  WHERE lower(email) = 'juan@fortiusconsulting.org'
  LIMIT 1;

  SELECT id INTO v_didac_id
  FROM auth.users
  WHERE lower(email) = 'didac@fortiusconsulting.org'
  LIMIT 1;

  IF v_juan_id IS NOT NULL THEN
    INSERT INTO user_memberships (user_id, organization_id, role, status)
    VALUES (v_juan_id, v_org_id, 'super_admin', 'active')
    ON CONFLICT DO NOTHING;

    UPDATE user_memberships
       SET role = 'super_admin',
           status = 'active'
     WHERE user_id = v_juan_id
       AND organization_id = v_org_id;
  ELSE
    RAISE NOTICE 'Skipping Juan seed: auth.users entry for juan@fortiusconsulting.org not found.';
  END IF;

  IF v_didac_id IS NOT NULL THEN
    INSERT INTO user_memberships (user_id, organization_id, role, status)
    VALUES (v_didac_id, v_org_id, 'consultant', 'active')
    ON CONFLICT DO NOTHING;

    UPDATE user_memberships
       SET role = 'consultant',
           status = 'active'
     WHERE user_id = v_didac_id
       AND organization_id = v_org_id;
  ELSE
    RAISE NOTICE 'Skipping Dídac seed: auth.users entry for didac@fortiusconsulting.org not found.';
  END IF;
END
$$;
