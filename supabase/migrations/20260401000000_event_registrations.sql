-- ============================================
-- EVENT REGISTRATIONS — Multi-org
-- ============================================
-- Tabla para almacenar inscripciones a eventos, 
-- vinculadas a Checkout Sessions de Stripe.

CREATE TABLE IF NOT EXISTS event_registrations (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id   UUID REFERENCES organizations(id) NOT NULL,
  
  -- Identificador del evento (slug o ID externo)
  event_slug        TEXT NOT NULL,
  
  -- Datos de la inscripción
  first_name        TEXT NOT NULL,
  last_name         TEXT NOT NULL,
  email             TEXT NOT NULL,
  institution       TEXT,
  message           TEXT,
  
  -- Estado de la inscripción
  status            TEXT NOT NULL DEFAULT 'pending'
                      CHECK (status IN ('pending', 'paid', 'cancelled')),
                      
  -- Tracking de pasarela de pago (Stripe)
  stripe_session_id TEXT UNIQUE,
  amount            NUMERIC(10,2),
  currency          TEXT DEFAULT 'eur',
  
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Índices de consulta frecuente para buscar por email, evento o sesión
CREATE INDEX IF NOT EXISTS idx_event_reg_org_event
  ON event_registrations (organization_id, event_slug);

CREATE INDEX IF NOT EXISTS idx_event_reg_email
  ON event_registrations (email);

CREATE INDEX IF NOT EXISTS idx_event_reg_stripe_session
  ON event_registrations (stripe_session_id);

-- Row Level Security
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- Admins y editores de la org pueden gestionar y ver las inscripciones
DROP POLICY IF EXISTS "Org admins can manage event registrations" ON event_registrations;
CREATE POLICY "Org admins can manage event registrations"
  ON event_registrations FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_memberships um
      WHERE um.user_id = auth.uid()
        AND um.organization_id = event_registrations.organization_id
        AND um.role IN ('editor', 'admin', 'super_admin')
        AND um.status = 'active'
    )
  );

-- NOTA: Las inserciones (INSERT) desde la web pública se realizarán mediante
-- un backend API usando el service_role key, por lo que no requieren una
-- política de RLS pública de inserción directa.
