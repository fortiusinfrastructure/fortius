-- Migration: expand user_memberships role check to include Foundation-specific roles.
--
-- The previous constraint only included consulting/EH roles.
-- Foundation needs 'beneficiario' and 'donante' in addition to the existing set.

ALTER TABLE user_memberships
  DROP CONSTRAINT IF EXISTS user_memberships_role_check;

ALTER TABLE user_memberships
  ADD CONSTRAINT user_memberships_role_check CHECK (
    role IN (
      'member',
      'editor',
      'admin',
      'super_admin',
      'consultant',
      'beneficiario',
      'donante'
    )
  );
