-- Insert Foundation organization
INSERT INTO organizations (id, slug, name, domain)
VALUES (
    gen_random_uuid(),
    'fortius-foundation',
    'Fundación Fortius',
    'fundacionfortius.org'
)
ON CONFLICT (slug) DO UPDATE
SET name = EXCLUDED.name,
    domain = EXCLUDED.domain;

-- Assuming Diego and maybe Juan Angel are admins for foundation as well
-- Find the organization id for Foundation
DO $$
DECLARE
    v_foundation_org_id uuid;
    v_diego_id uuid;
    v_juan_id uuid;
BEGIN
    SELECT id INTO v_foundation_org_id FROM organizations WHERE slug = 'fortius-foundation';

    SELECT id INTO v_diego_id FROM user_profiles WHERE email = 'dasalazarr@gmail.com';
    IF v_diego_id IS NOT NULL THEN
        INSERT INTO user_memberships (
            user_id,
            organization_id,
            role,
            status,
            active_from,
            active_until,
            metadata
        ) VALUES (
            v_diego_id,
            v_foundation_org_id,
            'admin',
            'active',
            now(),
            '2099-12-31',
            '{"granted_by": "system_migration"}'::jsonb
        ) ON CONFLICT (user_id, organization_id) DO UPDATE
        SET role = 'admin', status = 'active';
    END IF;

    SELECT id INTO v_juan_id FROM user_profiles WHERE email = 'info@fundacionfortius.org';
    IF v_juan_id IS NOT NULL THEN
        INSERT INTO user_memberships (
            user_id,
            organization_id,
            role,
            status,
            active_from,
            active_until,
            metadata
        ) VALUES (
            v_juan_id,
            v_foundation_org_id,
            'admin',
            'active',
            now(),
            '2099-12-31',
            '{"granted_by": "system_migration"}'::jsonb
        ) ON CONFLICT (user_id, organization_id) DO UPDATE
        SET role = 'admin', status = 'active';
    END IF;
END
$$;
