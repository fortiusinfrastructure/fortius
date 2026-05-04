-- Migration: Academic Payment Tracking & Reminder System
-- Date: 2026-05-01
-- Purpose: Add payment_link_id, approved_at, last_reminder_sent_at and reminder_count
--          to user_memberships for tracking the academic approval-to-payment flow.

-- ============================================================================
-- 1. Add payment tracking columns to user_memberships
-- ============================================================================
ALTER TABLE user_memberships
ADD COLUMN IF NOT EXISTS payment_link_id TEXT,
ADD COLUMN IF NOT EXISTS approved_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS last_reminder_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS reminder_count INTEGER NOT NULL DEFAULT 0;

-- ============================================================================
-- 2. Index for efficient CRON reminder queries
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_user_memberships_reminder_check
ON user_memberships (status, tier, reminder_count, last_reminder_sent_at, approved_at)
WHERE status = 'approved' AND tier = 'academico';

-- ============================================================================
-- 3. Grant access (service role already bypasses RLS, but be explicit)
-- ============================================================================
COMMENT ON COLUMN user_memberships.payment_link_id IS 'Secure token for the intermediate payment page (academic tier).';
COMMENT ON COLUMN user_memberships.approved_at IS 'Timestamp when the admin approved the academic application.';
COMMENT ON COLUMN user_memberships.last_reminder_sent_at IS 'Timestamp of the most recent payment reminder email.';
COMMENT ON COLUMN user_memberships.reminder_count IS 'Number of payment reminder emails sent (max 3).';
