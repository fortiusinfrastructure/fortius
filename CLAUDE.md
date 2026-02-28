# Fortius Ecosystem — Project Context

> **Este archivo es la memoria persistente del proyecto.**
> Cualquier sesión de desarrollo (humana o AI) debe leerlo primero.
> Última actualización: 27 febrero 2026.

---

## Visión

Fortius es un ecosistema digital multi-organización que une:
- **Escuela Hispánica** (EH) — Think tank del pensamiento hispánico ← **FOCO ACTUAL**
- **IEAM** — Instituto de Estudios de América (app Vite existente, no se desarrolla ahora)
- **Mediterranean Dialogue** (MD) — Diálogo mediterráneo (app Vite existente, no se desarrolla ahora)

Un solo backend (Supabase), un monorepo (Turborepo) como hub de infraestructura.
Cada marca tiene identidad visual completamente independiente (no comparten UI).

## Decisiones Arquitectónicas Confirmadas (27 Feb 2026)

1. **Un solo Supabase** (Opción A simplificada) — Multi-tenant con `organization_id`
2. **Eliminar fila `fortius`** de `organizations` — Solo 3 orgs: EH, IEAM, MD
3. **No hay UI compartida entre marcas** — Cada app tiene sus propios componentes
4. **EH es la única app activa** — IEAM y MD se quedan como están (Vite)
5. **Prioridad: experiencia completa de membresía** — Auth → Payments → Email
6. **Contenido se gestiona en Supabase directamente** — Sin CMS/admin por ahora
7. **Mecenas es tier EH-only** — No hay membresía cross-org

## Arquitectura

```
fortius/                          ← Monorepo (Turborepo + pnpm)
├── apps/
│   └── web-escuela-hispanica/    ← Next.js 16 + next-intl (ES/EN/PT)
│       ├── middleware.ts         ← Composed: Supabase Auth + next-intl
│       ├── src/app/[locale]/     ← App Router con rutas por idioma
│       │   ├── auth/login/       ← Login page (Dark Academia)
│       │   ├── auth/register/    ← Register page + email verify state
│       │   └── colabora/exito/   ← Post-payment success page
│       ├── src/app/api/          ← API routes (payments, webhooks, admin)
│       ├── src/app/auth/callback/ ← Supabase email verification handler
│       ├── src/components/       ← Componentes React (exclusivos EH)
│       ├── src/lib/auth/         ← Server Actions (signIn, signUp, signOut)
│       ├── src/lib/stripe/       ← Stripe SDK + HMAC tokens
│       ├── src/lib/email/        ← Resend wrapper
│       ├── src/messages/         ← Diccionarios i18n (es.json, en.json, pt.json)
│       ├── src/lib/mock-data/    ← Datos estáticos (pendiente migrar a Supabase)
│       └── .env.local            ← Variables de entorno
├── packages/
│   ├── database/                 ← @fortius/database (Tipos, Clientes, Queries)
│   ├── eslint-config/            ← @fortius/eslint-config
│   ├── typescript-config/        ← @fortius/typescript-config
│   └── ui/                       ← @fortius/ui (mínimo, potencialmente deprecable)
├── supabase/
│   └── migrations/               ← SQL migrations
├── .agent/                       ← Skills y workflows (AI)
└── turbo.json                    ← Build pipeline
```

## API Routes (Membership)

| Route | Method | Propósito |
|-------|--------|-----------|
| `/api/checkout/amigo` | POST | Checkout Stripe (monto dinámico o suscripción) |
| `/api/checkout/mecenas` | POST | Checkout Stripe (suscripción 1000€/año) |
| `/api/postulacion/academico` | POST | Formulario + CV upload + emails |
| `/api/admin/approve` | GET | HMAC token → aprobar → enviar enlace de pago |
| `/api/admin/reject` | GET | HMAC token → rechazar → enviar email |
| `/api/webhooks/stripe` | POST | Idempotente (checkout.completed, subscription.deleted, invoice.failed) |

## Base de Datos (Supabase)

**Proyecto:** Fortius (ID: `airsfteshzwuykmygojl`)

### Tablas (9 + 1 pendiente):
| Tabla | Propósito |
|-------|-----------|\
| `organizations` | Multi-tenant: EH, IEAM, MD (3 filas, sin Fortius) |
| `user_profiles` | Extiende `auth.users` con datos académicos |
| `user_memberships` | Relación usuario ↔ organización (role + tier + status) |
| `membership_plans` | Planes de suscripción por org |
| `subscriptions` | Integración Stripe |
| `payment_history` | Historial de pagos |
| `articles` | Contenido con campos multi-idioma (`title_es/en/pt`) |
| `activities` | Eventos con campos multi-idioma |
| `contact_submissions` | Formularios de contacto por org |
| `stripe_events` ⚠️ | Idempotencia de webhooks **(migración pendiente)** |

### ⚠️ Gaps DB conocidos (corregir antes de E2E):
- Webhook escribe `amount` / `stripe_payment_id` pero tabla usa `amount_cents` / `stripe_payment_intent_id`
- `subscriptions.plan_id` es NOT NULL pero webhook no lo provee → hacer nullable o incluir en metadata

### Primitiva Multi-Tenant:
- `organization_id` en cada tabla de contenido/membresía
- RLS activado en todas las tablas
- Trigger `on_auth_user_created` auto-crea perfil en `user_profiles`

### Tiers de Membresía (Solo EH):
- **Amigo**: Pago puntual o recurrente (a criterio del usuario)
- **Académico**: CV obligatorio → revisión → aprobación vía email con token HMAC → suscripción recurrente (10€/mes o 100€/año)
- **Mecenas**: Checkout directo ≥1.000€/año

## Internacionalización

- **Librería:** `next-intl` v4
- **Idiomas:** Español (default, sin prefix), English (`/en`), Português (`/pt`)
- **Diccionarios:** `src/messages/{es,en,pt}.json` para UI strings
- **Contenido editorial:** Campos `title_es/en/pt` en tablas de Supabase
- **SEO:** `generateMetadata()` dinámico con hreflang alternates

## Variables de Entorno Requeridas (.env.local)

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://airsfteshzwuykmygojl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key>
SUPABASE_SERVICE_ROLE_KEY=<service_role_key>
NEXT_PUBLIC_ORG_SLUG=escuela-hispanica
NEXT_PUBLIC_SITE_URL=https://escuelahispanica.org

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_PRICE_AMIGO_MONTHLY=price_xxx       # Opcional: para Amigo recurrente
STRIPE_PRICE_ACADEMICO_MONTHLY=price_xxx
STRIPE_PRICE_ACADEMICO_ANNUAL=price_xxx
STRIPE_PRICE_MECENAS_ANNUAL=price_xxx

# Resend
RESEND_API_KEY=re_xxx

# Approval System
APPROVAL_SECRET=<random-32-char-string>
APPROVER_EMAIL=secretaria@escuelahispanica.org
```

## Roadmap (27 Feb 2026)

### ✅ Completado:
- Monorepo Turborepo con build limpio
- Schema SQL multi-tenant (9 tablas + RLS)
- i18n completo (ES/EN/PT) con Language Switcher
- UI: 10 rutas, 17 componentes, SEO dinámico
- **Auth completa** (middleware, login, register, callback, navbar)
- **Backend de pagos** (6 API routes, Stripe + HMAC tokens)
- **Emails transaccionales** (Resend wrapper + templates inline)

### 🔜 Sprint actual: Poner operativo el flujo de membresía
1. **Fix webhook → DB column mismatch** (amount, plan_id)
2. **Aplicar migración SQL** (stripe_events + membership_plans)
3. **Conectar UI de `/colabora`** (botones → API routes)
4. **Configurar Stripe y Resend** (Products, Prices, API keys, dominio)
5. **E2E testing** con Stripe CLI
6. **Regenerar tipos** con `supabase gen types`

### 🔜 Sprint siguiente: Contenido e i18n
1. Migrar mock-data a Supabase (Articles, activities, projects)
2. Traducción editorial EN/PT (requiere traductor humano)

### 🔜 Futuro: Escalado
1. Clonar apps para IEAM y MD dentro del monorepo
2. Portal de miembros (Ciudadela Digital)
3. web-admin para gestión cross-org

## Comandos Esenciales

```bash
pnpm install                    # Instalar todas las dependencias
pnpm turbo build                # Build completo del monorepo
pnpm turbo dev                  # Dev server (todas las apps)

# Solo Escuela Hispánica
cd apps/web-escuela-hispanica
pnpm dev                        # Dev server local
pnpm build                      # Build de producción
```

## Convenciones

- **Styling:** Tailwind CSS v4
- **Components:** Server Components por defecto, `'use client'` solo cuando es necesario
- **Imports internos:** `@fortius/database`
- **Naming:** kebab-case para archivos, PascalCase para componentes
- **Git:** Commits en inglés, branch principal `main`
