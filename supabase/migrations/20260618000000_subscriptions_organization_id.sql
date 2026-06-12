-- Migration: add organization_id to subscriptions for multi-tenant scoping.
--
-- The consulting Stripe sync (subscription-sync.ts) already writes
-- organization_id on upsert, but the column was never added by a migration.
-- Adding it makes the schema match the code and lets queries filter
-- subscriptions per organization (avoids cross-org access leaks).

ALTER TABLE subscriptions
  ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id);

-- Backfill from the linked membership where possible
UPDATE subscriptions s
SET organization_id = um.organization_id
FROM user_memberships um
WHERE s.membership_id = um.id
  AND s.organization_id IS NULL;

-- Fallback backfill from the plan (membership_plans is org-scoped)
UPDATE subscriptions s
SET organization_id = mp.organization_id
FROM membership_plans mp
WHERE s.plan_id = mp.id
  AND s.organization_id IS NULL;

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_org
  ON subscriptions (user_id, organization_id);
