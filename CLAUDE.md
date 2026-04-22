# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fortius is a multi-organization digital ecosystem with a shared Supabase backend (multi-tenant via `organization_id`). Active Next.js apps: **Escuela Hispánica (EH)**, **IEAM**, **Fortius Consulting**, **Fortius Fundación**. Mediterranean Dialogue is not being developed.

## Commands

```bash
# Root (monorepo)
pnpm install                    # Install all dependencies
pnpm turbo build                # Build entire monorepo
pnpm turbo dev                  # Dev server for all apps
pnpm turbo lint                 # Lint all packages
pnpm turbo check-types          # TypeScript check all packages
pnpm format                     # Prettier format

# Escuela Hispánica app only
cd apps/web-escuela-hispanica
pnpm dev                        # Dev server with Turbopack
pnpm build                      # Production build
pnpm lint                       # ESLint
pnpm check-types                # TypeScript check
```

## Architecture

```
fortius/
├── apps/
│   ├── web-escuela-hispanica/    # Next.js 16 + next-intl (ES/EN/PT)
│   │   ├── src/app/[locale]/     # App Router with i18n
│   │   ├── src/app/api/          # API routes (checkout, webhooks, admin)
│   │   ├── src/components/       # React components (EH-specific)
│   │   ├── src/lib/
│   │   │   ├── auth/actions.ts   # Server Actions (signIn, signUp, signOut)
│   │   │   ├── stripe/           # Stripe SDK + HMAC tokens
│   │   │   ├── email/            # Resend wrapper
│   │   │   └── mock-data/        # Static data (pending Supabase migration)
│   │   └── src/messages/         # i18n dictionaries (es.json, en.json, pt.json)
│   └── web-ieam/                 # Next.js + next-intl (ES/EN)
│       ├── src/app/[locale]/     # Public site (analisis, eventos, nosotros…)
│       ├── src/app/admin/        # CMS admin — no locale prefix
│       │   ├── (shell)/articles/ # CRUD artículos
│       │   └── (shell)/events/   # CRUD eventos
│       ├── src/lib/admin/        # Server Actions + queries (admin)
│       │   ├── article-actions.ts  # 'use server' mutations
│       │   ├── article-queries.ts  # Read-only (no 'use server')
│       │   ├── event-actions.ts    # 'use server' mutations
│       │   ├── event-queries.ts    # Read-only (no 'use server')
│       │   └── auth.ts             # requireAdminUser()
│       └── scripts/seed-content.ts # Seed mock data → Supabase
│   ├── web-fortius-consulting/   # Next.js 16 — site Fortius Consulting
│   │   ├── src/app/(consulting)/ # Route group: home, nosotros, sociedad-civil,
│   │   │                         #   inteligencia, contacto, fundacion
│   │   ├── src/app/lab/          # Design lab + prototipos (noindex)
│   │   ├── src/components/consulting-v2/  # NavV2, HeroEditorial, VerticalSection,
│   │   │                         #   PersonCard, PersonDialog, PersonPortrait, etc.
│   │   └── src/content/          # home-v2.ts (verticales) + team.ts (personas + expertos)
│   └── web-fortius-foundation/   # Next.js 16 — site Fortius Fundación (grant-making)
│       ├── src/app/(foundation)/ # Route group: home, nosotros (F2: incubadora, ayudas, blog)
│       ├── src/components/foundation/     # NavF, FooterF, HeroFoundation,
│       │                         #   IncubadoraTeaser, AyudasTeaser, DonacionesCTA,
│       │                         #   NewsletterCTA, PersonCard, PersonDialog, PersonPortrait,
│       │                         #   FoundationLockup, BrandBanner
│       └── src/content/          # team.ts (patronato + consejo asesor + equipo),
│                                 #   projects.ts (incubadora + casos éxito), impact.ts
├── packages/
│   ├── admin-ui/                 # @fortius/admin-ui — componentes CMS compartibles
│   │   └── src/components/       # ArticleEditor, EventEditor, RichTextEditor,
│   │                             #   ImageUpload, MultilangTabs, AdminShell
│   ├── database/                 # @fortius/database
│   │   └── src/
│   │       ├── client/browser.ts # Client-side Supabase
│   │       ├── client/server.ts  # Server Component Supabase
│   │       ├── client/admin.ts   # Admin client (bypasses RLS)
│   │       ├── queries/articles.ts
│   │       ├── queries/activities.ts
│   │       └── types/database.ts # Generated DB types
│   ├── eslint-config/            # Shared ESLint
│   └── typescript-config/        # Shared TS config
└── supabase/migrations/          # SQL migrations
```

## Key Patterns

### Database Access

```typescript
// Server Components / Server Actions
import { createServerClient } from '@fortius/database';
const supabase = await createServerClient();

// API Routes needing to bypass RLS (webhooks, admin)
import { createAdminClient } from '@fortius/database';
const admin = createAdminClient();
```

- `createServerClient()` respects RLS, uses cookies for auth
- `createAdminClient()` bypasses RLS (server-only, for webhooks/admin)

### i18n

- Routing via `next-intl`: ES default (no prefix), `/en`, `/pt`
- UI strings in `src/messages/{es,en,pt}.json`
- Editorial content uses multi-lang columns (`title_es`, `title_en`, `title_pt`)
- Import navigation from `@/i18n/routing` (not `next/navigation`)

### Authentication

Server Actions in `src/lib/auth/actions.ts`:
- `signUp(formData)` - Creates user via admin client, sends verification email
- `signIn(formData)` - Password login
- `signOut()` - Logout and redirect

### Payments (Stripe)

API Routes:
- `/api/checkout/amigo` - Dynamic amount or subscription
- `/api/checkout/mecenas` - 1000+/year subscription
- `/api/postulacion/academico` - Application with CV upload
- `/api/admin/approve`, `/api/admin/reject` - HMAC-protected approval links
- `/api/webhooks/stripe` - Idempotent webhook handler

### Membership Tiers (EH only)

- **Amigo**: One-time or recurring contribution
- **Academico**: Requires application + approval + subscription
- **Mecenas**: Direct checkout 1000+/year

## Database (Supabase)

Multi-tenant with `organization_id` on all content/membership tables. RLS enabled.

Key tables: `organizations`, `user_profiles`, `user_memberships`, `membership_plans`, `subscriptions`, `payment_history`, `articles`, `activities`, `stripe_events`

Trigger `on_auth_user_created` auto-creates `user_profiles` entry.

## Environment Variables

Required in `.env.local`:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_ORG_SLUG=escuela-hispanica
NEXT_PUBLIC_SITE_URL=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ACADEMICO_MONTHLY=
STRIPE_PRICE_ACADEMICO_ANNUAL=
STRIPE_PRICE_MECENAS_ANNUAL=
STRIPE_PRICE_AMIGO_MONTHLY=  # Optional

# Resend
RESEND_API_KEY=

# Admin Approval
APPROVAL_SECRET=
APPROVER_EMAIL=
```

## IEAM Admin CMS

`/admin` routes bypass i18n (no locale prefix). Auth via middleware — redirige a `/admin/login` si no hay sesión. `requireAdminUser()` en cada Server Component verifica `role='admin'` en `user_memberships` para `org='ieam'`.

### Patrón edit page (App Router)

Las páginas de edición son **Server Components** que cargan el dato y lo pasan a un Client Component con el formulario. Las funciones de lectura viven en `*-queries.ts` (sin `'use server'`). Las mutaciones viven en `*-actions.ts` (con `'use server'`). Mezclar lecturas en archivos `'use server'` y llamarlas desde `useEffect` causa "Invalid Server Actions request".

```
page.tsx (Server Component)
  └─ getEventById()  ← desde event-queries.ts (sin 'use server')
  └─ <EditEventForm initialData={...} />  ← Client Component
       └─ updateEventAction()  ← desde event-actions.ts ('use server')
```

### Seed script IEAM

```bash
# Desde la raíz del monorepo (fortius/)
pnpm tsx apps/web-ieam/scripts/seed-content.ts
```

Requiere `NEXT_PUBLIC_SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` en `apps/web-ieam/.env` (o `.env.local`). Idempotente — safe re-ejecutar.

## Conventions

- **Styling**: Tailwind CSS v4
- **Components**: Server Components by default, `'use client'` only when necessary
- **File naming**: kebab-case for files, PascalCase for components
- **Imports**: Use `@fortius/database` for DB access, `@/` for app-local
- **Git**: Commits in English, main branch is `main`

## Vercel Deployment Notes

- `.npmrc` must have `node-linker=hoisted` for native binaries
- All env vars used in build must be declared in `turbo.json` `globalEnv`
- `metadataBase` must be set in layouts using `process.env.NEXT_PUBLIC_SITE_URL`
