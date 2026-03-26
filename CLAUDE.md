# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fortius is a multi-organization digital ecosystem with a shared Supabase backend (multi-tenant via `organization_id`). Currently, only **Escuela Hispánica (EH)** is under active development as a Next.js 16 app. IEAM and Mediterranean Dialogue exist as separate Vite apps but are not being developed.

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
│   └── web-escuela-hispanica/    # Next.js 16 + next-intl (ES/EN/PT)
│       ├── src/app/[locale]/     # App Router with i18n
│       ├── src/app/api/          # API routes (checkout, webhooks, admin)
│       ├── src/components/       # React components (EH-specific)
│       ├── src/lib/
│       │   ├── auth/actions.ts   # Server Actions (signIn, signUp, signOut)
│       │   ├── stripe/           # Stripe SDK + HMAC tokens
│       │   ├── email/            # Resend wrapper
│       │   └── mock-data/        # Static data (pending Supabase migration)
│       └── src/messages/         # i18n dictionaries (es.json, en.json, pt.json)
├── packages/
│   ├── database/                 # @fortius/database
│   │   └── src/
│   │       ├── client/browser.ts # Client-side Supabase
│   │       ├── client/server.ts  # Server Component Supabase
│   │       ├── client/admin.ts   # Admin client (bypasses RLS)
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
