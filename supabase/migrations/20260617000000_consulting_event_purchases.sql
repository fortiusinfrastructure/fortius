-- Migration: Fortius Consulting event / opportunity purchases.
-- Stores one-time purchases made by active consulting clients.

CREATE TABLE IF NOT EXISTS event_purchases (
  id                          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                     UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  organization_id             UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  event_slug                  TEXT NOT NULL,
  event_title                 TEXT NOT NULL,
  stripe_checkout_session_id  TEXT UNIQUE,
  stripe_payment_intent_id    TEXT UNIQUE,
  amount_cents                INTEGER NOT NULL DEFAULT 1000,
  currency                    TEXT NOT NULL DEFAULT 'eur',
  status                      TEXT NOT NULL DEFAULT 'paid'
    CHECK (status IN ('paid', 'refunded', 'failed')),
  metadata                    JSONB DEFAULT '{}'::jsonb,
  purchased_at                TIMESTAMPTZ DEFAULT NOW(),
  created_at                  TIMESTAMPTZ DEFAULT NOW(),
  updated_at                  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, organization_id, event_slug)
);

CREATE INDEX IF NOT EXISTS idx_event_purchases_user_org
  ON event_purchases(user_id, organization_id);

CREATE INDEX IF NOT EXISTS idx_event_purchases_event_slug
  ON event_purchases(event_slug);

ALTER TABLE event_purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own event purchases"
  ON event_purchases
  FOR SELECT
  USING (auth.uid() = user_id);