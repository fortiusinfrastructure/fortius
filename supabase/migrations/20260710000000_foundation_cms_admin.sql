-- Migration: assign Juan admin role in Fortius Foundation (article CMS access).
--
-- Idempotent and defensive (same pattern as 20260622000000_consulting_diego_super_admin.sql):
--   * Looks up the foundation organization by slug.
--   * Looks up the auth user by email.
--   * Upserts an active admin membership.
--   * If the org or user is missing, the block is skipped (no ERROR), so the
--     migration does not block deployments that pre-date the account being
--     created.
--
-- Role assigned:
--   * juan@fortiusconsulting.org -> admin (fortius-foundation)

DO $$
DECLARE
  v_org_id  UUID;
  v_juan_id UUID;
BEGIN
  SELECT id INTO v_org_id
  FROM organizations
  WHERE slug = 'fortius-foundation'
  LIMIT 1;

  IF v_org_id IS NULL THEN
    RAISE NOTICE 'Skipping Juan seed: organization slug "fortius-foundation" not found.';
    RETURN;
  END IF;

  SELECT id INTO v_juan_id
  FROM auth.users
  WHERE lower(email) = 'juan@fortiusconsulting.org'
  LIMIT 1;

  IF v_juan_id IS NOT NULL THEN
    INSERT INTO user_memberships (user_id, organization_id, role, status)
    VALUES (v_juan_id, v_org_id, 'admin', 'active')
    ON CONFLICT DO NOTHING;

    UPDATE user_memberships
       SET role = 'admin',
           status = 'active'
     WHERE user_id = v_juan_id
       AND organization_id = v_org_id;
  ELSE
    RAISE NOTICE 'Skipping Juan seed: auth.users entry for juan@fortiusconsulting.org not found.';
  END IF;
END
$$;
