-- Migration: add Fortius Consulting tier values to the user_memberships check constraint.
--
-- The original constraint only allowed EH tiers: 'free','amigo','academico','mecenas'.
-- Consulting plans use different keys: 'sociedad-civil-basica', 'sociedad-civil-premium',
-- 'politica-basica', 'politica-premium'.
--
-- NULL is always allowed by CHECK constraints in PostgreSQL (evaluates to NULL, not FALSE),
-- so admin memberships with tier = NULL continue to work without changes.

ALTER TABLE user_memberships
  DROP CONSTRAINT IF EXISTS user_memberships_tier_check;

ALTER TABLE user_memberships
  ADD CONSTRAINT user_memberships_tier_check CHECK (
    tier IN (
      -- Escuela Hispánica
      'free', 'amigo', 'academico', 'mecenas',
      -- Fortius Consulting
      'sociedad-civil-basica', 'sociedad-civil-premium',
      'politica-basica', 'politica-premium'
    )
  );
