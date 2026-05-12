# Fortius

Monorepo del ecosistema digital Fortius. Reúne varias organizaciones con marcas,
sitios y flujos editoriales distintos, pero con una base técnica compartida:
**Turborepo + pnpm + Next.js 16 + Tailwind CSS v4 + Supabase**.

## Qué hay en este repositorio

Fortius opera como un ecosistema multi-organización. Las aplicaciones activas hoy son:

- `apps/web-escuela-hispanica`: plataforma editorial, membresías, pagos y administración.
- `apps/web-ieam`: sitio institucional y CMS del Instituto de Estudios sobre África y el Mediterráneo.
- `apps/web-fortius-consulting`: web corporativa y laboratorio de diseño de Fortius Consulting.
- `apps/web-fortius-foundation`: web institucional de Fortius Foundation.

La estructura principal del monorepo es:

```text
fortius/
├── apps/                 # Aplicaciones Next.js
├── packages/             # Paquetes compartidos (DB, UI, admin, lint, TS)
├── supabase/migrations/  # Esquema SQL y evolución del backend
├── turbo.json            # Pipeline de Turborepo
└── pnpm-workspace.yaml   # Workspaces de apps/* y packages/*
```

## Arquitectura compartida

### Monorepo con Turborepo

- `pnpm` gestiona dependencias y workspaces.
- `turbo` coordina tareas de `dev`, `build`, `lint` y `check-types`.
- `packages/database` centraliza clientes y queries de Supabase.
- `packages/admin-ui` concentra piezas reutilizables del CMS.
- `packages/ui` guarda tokens y pautas del **Premium Editorial Design System**.

### Backend compartido en Supabase

El backend es común para todo el ecosistema y aplica **multi-tenencia por
`organization_id`**. Eso permite que varias organizaciones compartan esquema y
servicios, sin mezclar contenido, membresías ni permisos.

Piezas clave:

- tabla `organizations` como catálogo de organizaciones;
- tablas de negocio como `articles`, `activities`, `user_memberships`,
  `subscriptions`, `payment_history` y `stripe_events`;
- políticas RLS basadas en `organization_id`;
- `createServerClient()` para acceso con sesión y RLS;
- `createAdminClient()` para rutas seguras de servidor, webhooks y tareas admin.

## Stack técnico

- **Next.js 16** con App Router.
- **React 19**.
- **Tailwind CSS v4** como base visual.
- **next-intl** en las apps multilingües (`web-escuela-hispanica` e `web-ieam`).
- **Supabase** para autenticación, datos, RLS y flujos administrativos.

> Nota: `web-fortius-consulting` y `web-fortius-foundation` comparten la base
> de Next.js 16 + Tailwind v4 y el sistema visual del ecosistema, pero hoy no
> activan `next-intl` en runtime.

## Comandos principales

Ejecuta estos comandos desde la raíz del monorepo (`fortius/`):

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm check-types
```

Para trabajar en una sola aplicación:

```bash
pnpm --filter web-escuela-hispanica dev
pnpm --filter web-ieam dev
pnpm --filter web-fortius-consulting dev
pnpm --filter web-fortius-foundation dev
```

Tarea útil de migración para IEAM:

```bash
pnpm tsx apps/web-ieam/scripts/seed-content.ts
```

## Rutas y carpetas que conviene conocer

- `apps/*/src/app/[locale]`: rutas públicas con internacionalización.
- `apps/web-ieam/src/app/admin`: CMS de IEAM sin prefijo de idioma.
- `apps/web-escuela-hispanica/src/app/admin`: panel interno de Escuela Hispánica.
- `apps/web-escuela-hispanica/src/app/api`: checkout, webhooks y acciones seguras.
- `apps/web-ieam/src/lib/admin`: queries y mutaciones del CMS.
- `apps/web-escuela-hispanica/src/lib/admin`: consultas operativas del panel.
- `packages/database/src`: clientes, tipos y queries compartidas.
- `supabase/migrations`: fuente de verdad del esquema SQL.

## Estado de migración de contenido

El ecosistema está convergiendo desde contenido estático hacia tablas compartidas
en Supabase. El estado actual es híbrido:

| App                      | Estado actual                                                                                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `web-escuela-hispanica`  | Integración real con Supabase para auth, admin, membresías, pagos y eventos; todavía convive con `src/lib/mock-data` en parte del contenido editorial.                    |
| `web-ieam`               | La web pública mantiene `src/lib/mock-data` como fuente transicional; existe script idempotente para sembrar `articles` y `activities` en Supabase por `organization_id`. |
| `web-fortius-consulting` | Contenido actual servido desde `src/content/*.ts`; preparada para converger con el backend compartido, pero aún en fase frontend/MVP.                                     |
| `web-fortius-foundation` | Contenido institucional actualmente en `src/content/*.ts`; la migración al backend compartido sigue pendiente.                                                            |

## Onboarding recomendado

1. Instala dependencias con `pnpm install`.
2. Revisa el README de la app donde vayas a trabajar.
3. Confirma si esa app ya lee de Supabase o sigue en `mock-data` / `src/content`.
4. Si tocas acceso a datos, valida siempre el filtro por `organization_id`.
5. Si tocas build o variables de entorno globales, revisa también `turbo.json`.
