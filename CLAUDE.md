# Fortius Ecosystem — Project Context

> **Este archivo es la memoria persistente del proyecto.**
> Cualquier sesión de desarrollo (humana o AI) debe leerlo primero.
> Última actualización: 5 marzo 2026.

---

## Visión

Fortius es un ecosistema digital multi-organización que une:
- **Escuela Hispánica** (EH) — Think tank del pensamiento hispánico ← **FOCO ACTUAL**
- **IEAM** — Instituto de Estudios de América (app Vite existente, no se desarrolla ahora)
- **Mediterranean Dialogue** (MD) — Diálogo mediterráneo (app Vite existente, no se desarrolla ahora)

Un solo backend (Supabase), un monorepo (Turborepo) como hub de infraestructura.
Cada marca tiene identidad visual completamente independiente (no comparten UI).

## Technology Stack (Audited 5 Mar 2026)

| Layer | Technology | Version | Status |
|-------|-----------|---------|--------|
| Framework | Next.js | 16.1.6 | ✅ Latest stable |
| Runtime | React | 19.2.3 | ✅ Latest stable |
| Language | TypeScript | ^5 | ✅ Current |
| Monorepo | Turborepo + pnpm | — | ✅ Healthy |
| Payment Gateway | Stripe (Node SDK) | ^20.4.0 | ✅ Latest major |
| Database | Supabase (Postgres + Auth) | ^2.96.0 | ✅ Current |
| SSR Auth | @supabase/ssr | ^0.5.2 | ✅ Current |
| Transactional Email | Resend | ^6.9.2 | ✅ Current |
| i18n | next-intl | ^4.8.3 | ✅ Current |
| Styling | Tailwind CSS | v4 | ✅ Current |
| Animations | framer-motion | ^12.34.5 | ✅ Current |

> No deprecated dependencies. All major libraries at latest versions.

## Decisiones Arquitectónicas Confirmadas

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

| Route | Method | Auth | Propósito |
|-------|--------|------|-----------|
| `/api/checkout/amigo` | POST | Opcional | Checkout Stripe (monto dinámico o suscripción) |
| `/api/checkout/mecenas` | POST | Opcional ⚠️ | Checkout Stripe (suscripción 1000€/año) |
| `/api/postulacion/academico` | POST | Opcional | Formulario + CV upload + emails |
| `/api/admin/approve` | GET | HMAC token | Aprobar → enviar enlace de pago |
| `/api/admin/reject` | GET | HMAC token | Rechazar → enviar email |
| `/api/webhooks/stripe` | POST | Stripe signature | Idempotente (checkout.completed, subscription.deleted, invoice.failed) |

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
| `stripe_events` | Idempotencia de webhooks |

### Primitiva Multi-Tenant:
- `organization_id` en cada tabla de contenido/membresía
- RLS activado en todas las tablas (9 tablas)
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

## Seguridad (Auditoría 5 Mar 2026)

| Área | Implementación | Estado |
|------|---------------|--------|
| Verificación firma Stripe | `stripe.webhooks.constructEvent()` | ✅ |
| HMAC tokens para aprobación admin | SHA-256 + timing-safe comparison | ✅ |
| Expiración de tokens | 30 días max | ✅ |
| Supabase RLS | Habilitado en 9 tablas | ✅ |
| Admin client isolation | `createAdminClient()` bypasses RLS, server-only | ✅ |
| Service Role Key server-side only | No expuesto vía `NEXT_PUBLIC_*` | ✅ |
| PCI Compliance | Stripe Checkout (hosted) — SAQ-A | ✅ |
| CSRF protection en API routes | Sin tokens CSRF explícitos | ⚠️ Gap |

## Known Issues (Auditoría 5 Mar 2026)

### 🔴 Críticos (Resueltos ✅)

1. **`'cancelled'` vs `'canceled'`** — [webhook L221](file:///Users/dasalazarr/Projects/Fortius/fortius/apps/web-escuela-hispanica/src/app/api/webhooks/stripe/route.ts#L221) corrigido.
2. **`onConflict` incorrecto** — `subscriptions.upsert()` usa ahora `onConflict: 'stripe_subscription_id'` en [webhook L152](file:///Users/dasalazarr/Projects/Fortius/fortius/apps/web-escuela-hispanica/src/app/api/webhooks/stripe/route.ts#L152).
3. **Amigo subscription guard** — Añadido check de `STRIPE_PRICE_AMIGO_MONTHLY` en [amigo/route.ts L31](file:///Users/dasalazarr/Projects/Fortius/fortius/apps/web-escuela-hispanica/src/app/api/checkout/amigo/route.ts#L31).
4. **Tipos `stripe_events`** — Añadidos a `database.ts`.

### 🟡 Medios (edge cases que fallarán)

5. **`listUsers()` no escala** — Webhook y postulación cargan TODOS los usuarios en memoria para buscar por email. Desastre de rendimiento a escala.
   - 📍 `src/app/api/webhooks/stripe/route.ts` + `src/app/api/postulacion/academico/route.ts`

6. **`subscription.deleted` sin fallback** — Si `metadata.userId` está vacío (Stripe no siempre preserva metadata), la desactivación no hace nada.
   - 📍 `src/app/api/webhooks/stripe/route.ts`

7. **Sin handler `invoice.payment_succeeded`** — Los pagos recurrentes de suscripción no se registran en `payment_history`. Solo se registra el primer pago.
   - 📍 `src/app/api/webhooks/stripe/route.ts`

8. **Mecenas sin auth** — `/api/checkout/mecenas` no rechaza usuarios no autenticados. Permite checkouts con `userId: 'anonymous'`.
   - 📍 `src/app/api/checkout/mecenas/route.ts`

9. **`as any` innecesario en invoice** — `invoice.subscription` en Stripe SDK v20 ya es `string | Subscription | null`. El cast a `any` es innecesario y oculta tipos.
   - 📍 `src/app/api/webhooks/stripe/route.ts`

10. **`membership_plans.stripe_price_id` huérfano** — Columna existe pero nunca se popula ni se consulta. Debería mapear Stripe prices a planes internos.

### 🟢 Menores

11. **`colabora/page.tsx` monolítico** — 538 líneas con `'use client'`. Extraer modales a componentes separados.
12. **Seed de `fortius` org y borrado** — Creada en migración 1, borrada en migración 2. Funcional pero desordenado.
13. **Bucket `postulaciones` no creado** — La ruta de postulación sube CVs a este bucket, pero no existe automáticamente. Requiere creación manual en Supabase.
14. **`subscriptions.plan_id` NOT NULL + FK** — Si `membership_plans` no tiene el slug esperado, el fallback `planSlug` como string falla por constraint FK.

### ✅ Completado:
- Monorepo Turborepo con build limpio
- Schema SQL multi-tenant (9 tablas + RLS)
- i18n completo (ES/EN/PT) con Language Switcher
- UI: 10 rutas, 17 componentes, SEO dinámico
- **Auth completa** (middleware, login, register, callback, navbar)
- **Backend de pagos** (6 API routes, Stripe + HMAC tokens)
- **Emails transaccionales** (Resend wrapper + templates inline)
- **Resiliencia i18n:** Fix persistente de Error 500 en `generateMetadata`
- **Auditoría completa** del stack, infraestructura y seguridad (5 Mar 2026)
- **Fixes críticos (Fase 1):** Spelling `canceled`, `onConflict` column, Amigo price guard, y tipos `stripe_events`.

### 🔜 Sprint actual: Mejoras esenciales + puesta operativa

**Prioridad 1 — Essential improvements:**
1. Reemplazar `listUsers()` por lookup directo por email
2. Fallback en `subscription.deleted` por `stripe_subscription_id`
3. Handler `invoice.payment_succeeded` para pagos recurrentes
4. Requerir auth en `/api/checkout/mecenas`
5. Eliminar `as any` en `invoice.payment_failed`

**Prioridad 2 — Configuración operativa (antes de go-live):**
6. Crear Stripe Products/Prices (Amigo, Académico, Mecenas)
7. Configurar env vars `STRIPE_PRICE_*` en `.env.local` y Vercel
8. Configurar webhook endpoint en Stripe Dashboard
9. Configurar dominio Resend (`escuelahispanica.org`)
10. Crear bucket `postulaciones` en Supabase Storage
11. Aplicar migración `20260228000000_membership_plans_and_cleanup.sql` a producción

### 🔜 Sprint siguiente: Contenido e i18n
1. Migrar mock-data a Supabase (Articles, activities, projects)
2. Traducción editorial EN/PT (requiere traductor humano)
3. Split `colabora/page.tsx` en componentes

### 🔜 Futuro: Escalado
1. Clonar apps para IEAM y MD dentro del monorepo
2. Portal de miembros — Ciudadela Digital (ver spec abajo)
3. Panel de administración (ver spec abajo)
4. Stripe Customer Portal para self-service cancellations
5. web-admin para gestión cross-org
6. Rate limiting en rutas públicas

## Diseño: Ciudadela Digital (Portal de Miembros)

### Propósito
Un portal privado para miembros autenticados de la Escuela Hispánica (tiers Amigo, Académico, Mecenas) que centralice el acceso a contenido exclusivo, gestión de membresía y comunicación.

### Funcionalidades Clave
1.  **Dashboard Personalizado:**
    *   Bienvenida al usuario con su nombre y tier de membresía.
    *   Acceso rápido a contenido destacado o reciente.
    *   Estado de la membresía (activa, pendiente, expirada).
    *   Notificaciones importantes.
2.  **Contenido Exclusivo:**
    *   Artículos, videos, grabaciones de eventos, documentos (filtrados por tier si aplica).
    *   Posibilidad de marcar contenido como favorito o "leer más tarde".
    *   Buscador y filtros por tipo de contenido, tema, etc.
3.  **Gestión de Membresía:**
    *   Ver detalles de la suscripción actual (plan, fecha de renovación, precio).
    *   Acceso al portal de clientes de Stripe para actualizar métodos de pago o cancelar (redirección).
    *   Historial de pagos.
    *   Opción de actualizar a un tier superior (si aplica).
4.  **Perfil de Usuario:**
    *   Editar información básica (nombre, email, contraseña).
    *   Gestionar preferencias de comunicación (newsletter, notificaciones).
    *   Subir/actualizar CV (para Académicos).
5.  **Comunidad (futuro):**
    *   Foros o grupos de discusión.
    *   Directorio de miembros (opcional, con consentimiento).
6.  **Soporte:**
    *   FAQ.
    *   Formulario de contacto directo con soporte.

### Consideraciones Técnicas
*   **Rutas:** `/ciudadela`, `/ciudadela/dashboard`, `/ciudadela/contenido`, `/ciudadela/membresia`, `/ciudadela/perfil`, etc.
*   **Autenticación:** Requiere usuario autenticado (`@supabase/auth-helpers-nextjs`).
*   **Autorización:** RLS en Supabase para filtrar contenido y funcionalidades según `user_memberships.tier`.
*   **UI:** Reutilizar componentes existentes de `web-escuela-hispanica`. Crear nuevos componentes específicos para el portal.
*   **Datos:** Consumir datos de `articles`, `activities`, `user_profiles`, `user_memberships`, `subscriptions`, `payment_history` de Supabase.
*   **Internacionalización:** Soporte completo para ES/EN/PT.

### Fases de Implementación
*   **Fase 1 (MVP):** Dashboard básico, acceso a contenido (sin filtros avanzados), gestión de membresía (redirección a Stripe), perfil básico.
*   **Fase 2:** Buscador de contenido, filtros, historial de pagos, gestión de CV.
*   **Fase 3:** Funcionalidades de comunidad, notificaciones avanzadas.

## Diseño: Panel de Administración

### Propósito
Portal privado para administradores que permite gestionar miembros, aprobar postulaciones académicas, revisar pagos y supervisar el contenido publicado.

### Roles de Acceso
| Rol | Descripción | Acceso |
|-----|-------------|--------|
| `super_admin` | Control total (Fortius-level) | Todo |
| `org_admin` | Administrador de una org (EH, IEAM, MD) | Usuarios, pagos y contenido de su org |
| `reviewer` | Revisor académico | Solo postulaciones de Académicos |

Los roles se almacenan en `user_profiles.role` (columna a añadir) y se validan server-side con Supabase RLS.

### Vistas del Panel
1. **Dashboard** — KPIs: miembros activos por tier, ingresos del mes, postulaciones pendientes.
2. **Miembros** — Tabla con buscador, filtros por tier/estado, acciones: ver perfil, cambiar tier, suspender.
3. **Postulaciones** — Cola de postulaciones de Académico: aprobar / rechazar (envío de email automático via Resend).
4. **Pagos** — Historial de `payment_history` + `subscriptions`. Enlace a Stripe Dashboard.
5. **Contenido** — CRUD básico de artículos y actividades (migración desde mock-data a Supabase).
6. **Ajustes** — Variables de configuración de la org (nombre, logo, colores, planes activos).

### Consideraciones Técnicas
*   **Ruta base:** `/admin` (protegida por middleware que verifica `role IN ('super_admin', 'org_admin', 'reviewer')`).
*   **UI:** Panel separado visualmente del site público (layout propio, sin navbar pública).
*   **Server Actions / Route Handlers:** Toda mutación pasa por API routes con validación de sesión server-side.
*   **No exponer data cruda:** El admin accede via API routes que usan `createAdminClient()` — nunca expone la service role key al cliente.

### Fases de Implementación
*   **Fase 1 (MVP):** Login de admin, listado de miembros, aprobación/rechazo de postulaciones.
*   **Fase 2:** Dashboard con KPIs, gestión de pagos, historial.
*   **Fase 3:** CRUD de contenido, ajustes de org, multi-org.

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

## Despliegue en Vercel (Notas Críticas)

Debido al setup de Turborepo (`pnpm@10`), Next.js 16 y dependencias nativas, se requieren configuraciones específicas para que los builds en Vercel funcionen y no reporten "Internal Error":

1. **`.npmrc` (Root):** Es imperativo mantener `node-linker=hoisted` y la whitelist `only-built-dependencies[]` para binarios como `supabase`, `sharp`, `@swc/core`, `@parcel/watcher` y `unrs-resolver`. De lo contrario, `pnpm` ignora los binarios y el despliegue falla por archivos desaparecidos (`ENOENT`).
2. **`next.config.ts`:** Requiere `output: 'standalone'` activo.
3. **Manejo de Rutas (Middleware vs Proxy):** En Next.js 16+, la convención de exportar por defecto desde `middleware.ts` está deprecada en entornos de Edge proxy de Vercel (provoca build failure o warnings fatales). Utilizar `src/proxy.ts` exportando `export default async function proxy(request)`.
4. **Vercel Env Vars en `turbo.json`:** Cualquier variable usada en Vercel durante el Build/Run (incluyendo las de Supabase, Stripe y Resend) debe pre-declararse obligatoriamente en el array `globalEnv` de `turbo.json` para evitar que Turbo las descarte por considerar que rompen el cache de build.
5. **Metadata URLs:** En los `layout.tsx` (especialmente de auth), es obligatorio configurar `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL)` para asegurar la correcta resolución de rutas absolutas durante la pre-renderización SSR en Vercel.
