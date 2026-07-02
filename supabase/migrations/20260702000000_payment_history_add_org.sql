-- Add organization_id to payment_history so Foundation donations can be
-- filtered independently from EH/Consulting subscription payments.
-- Existing rows default to NULL; only new Foundation payments will set it.

ALTER TABLE payment_history
  ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id);

CREATE INDEX IF NOT EXISTS payment_history_org_idx
  ON payment_history(organization_id, created_at DESC);
