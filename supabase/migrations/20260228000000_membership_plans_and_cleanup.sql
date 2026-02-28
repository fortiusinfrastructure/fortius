-- Migration: Membership Plans, Stripe Events & Cleanup
-- Date: 2026-02-28
-- Purpose: Seed EH membership plans, create stripe_events table, remove 'fortius' org

-- ============================================================================
-- 1. Remove 'fortius' organization (simplify to 3 real orgs)
-- ============================================================================
DELETE FROM organizations WHERE slug = 'fortius';


-- ============================================================================
-- 2. Create stripe_events table for webhook idempotency
-- ============================================================================
CREATE TABLE IF NOT EXISTS stripe_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_id TEXT NOT NULL UNIQUE,
    event_type TEXT NOT NULL,
    processed_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Only service role can access this table
ALTER TABLE stripe_events ENABLE ROW LEVEL SECURITY;


-- ============================================================================
-- 3. Seed membership plans for Escuela Hispánica
-- ============================================================================

-- First, get the EH organization ID
DO $$
DECLARE
    eh_org_id UUID;
BEGIN
    SELECT id INTO eh_org_id FROM organizations WHERE slug = 'escuela-hispanica';
    
    IF eh_org_id IS NULL THEN
        RAISE EXCEPTION 'Organization escuela-hispanica not found';
    END IF;

    -- Amigo: Free contribution (no fixed Stripe price, dynamic amount)
    INSERT INTO membership_plans (id, organization_id, name, tier, interval, price_cents, currency, is_active)
    VALUES ('eh-amigo', eh_org_id, 'Amigo de la Escuela', 'amigo', 'monthly', 0, 'EUR', true)
    ON CONFLICT (id) DO NOTHING;
    
    -- Académico Monthly: 10€/month
    INSERT INTO membership_plans (id, organization_id, name, tier, interval, price_cents, currency, is_active)
    VALUES ('eh-academico-monthly', eh_org_id, 'Miembro Académico (Mensual)', 'academico', 'monthly', 1000, 'EUR', true)
    ON CONFLICT (id) DO NOTHING;
    
    -- Académico Annual: 100€/year
    INSERT INTO membership_plans (id, organization_id, name, tier, interval, price_cents, currency, is_active)
    VALUES ('eh-academico-annual', eh_org_id, 'Miembro Académico (Anual)', 'academico', 'annual', 10000, 'EUR', true)
    ON CONFLICT (id) DO NOTHING;
    
    -- Mecenas Annual: 1000€/year
    INSERT INTO membership_plans (id, organization_id, name, tier, interval, price_cents, currency, is_active)
    VALUES ('eh-mecenas-annual', eh_org_id, 'Mecenas', 'mecenas', 'annual', 100000, 'EUR', true)
    ON CONFLICT (id) DO NOTHING;
END $$;


-- ============================================================================
-- 4. Add 'approved' status to user_memberships if not exists
-- ============================================================================
-- The 'status' column likely uses a CHECK constraint. Let's update it to include 'approved' and 'rejected'.
DO $$
BEGIN
    -- Drop existing constraint if it exists  
    ALTER TABLE user_memberships DROP CONSTRAINT IF EXISTS user_memberships_status_check;
    
    -- Add updated constraint with new statuses
    ALTER TABLE user_memberships ADD CONSTRAINT user_memberships_status_check
        CHECK (status IN ('active', 'inactive', 'pending', 'approved', 'rejected', 'past_due'));
END $$;
