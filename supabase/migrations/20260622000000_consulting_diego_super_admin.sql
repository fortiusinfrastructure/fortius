-- Migration: assign Diego super_admin role in Fortius Consulting.
--
-- Idempotent and defensive (same pattern as 20260620000200_consulting_team_seed.sql):
--   * Looks up the consulting organization by slug.
--   * Looks up the auth user by email.
--   * Upserts an active super_admin membership.
--   * If the org or user is missing, the block is skipped (no ERROR), so the
--     migration does not block deployments that pre-date the account being
--     created.
--
-- Role assigned:
--   * diego@fortiusconsulting.org -> super_admin

DO $$
DECLARE
  v_org_id   UUID;
  v_diego_id UUID;
BEGIN
  SELECT id INTO v_org_id
  FROM organizations
  WHERE slug = 'fortius-consulting'
  LIMIT 1;

  IF v_org_id IS NULL THEN
    RAISE NOTICE 'Skipping Diego seed: organization slug "fortius-consulting" not found.';
    RETURN;
  END IF;

  SELECT id INTO v_diego_id
  FROM auth.users
  WHERE lower(email) = 'diego@fortiusconsulting.org'
  LIMIT 1;

  IF v_diego_id IS NOT NULL THEN
    INSERT INTO user_memberships (user_id, organization_id, role, status)
    VALUES (v_diego_id, v_org_id, 'super_admin', 'active')
    ON CONFLICT DO NOTHING;

    UPDATE user_memberships
       SET role = 'super_admin',
           status = 'active'
     WHERE user_id = v_diego_id
       AND organization_id = v_org_id;
  ELSE
    RAISE NOTICE 'Skipping Diego seed: auth.users entry for diego@fortiusconsulting.org not found.';
  END IF;
END
$$;
