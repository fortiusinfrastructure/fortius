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
- **next-intl** en las apps multilingües (`web-escuela-hispanica` y `web-ieam`).
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
| `web-fortius-consulting` | Base editorial madura con contenido en `src/content/*.ts`; área privada con auth Supabase, RLS y dashboards por rol (`super_admin`, `consultant`, `member`); provisión de cuentas vía webhook de Stripe (sin signup público); contacto persistente en Supabase + notificación por Resend. |
| `web-fortius-foundation` | Sitio institucional/editorial con contenido local en `src/content/*.ts`, blog estático y formularios de contacto/donación persistentes en Supabase + notificación por Resend. |

## Almacenamiento de archivos (Supabase Storage)

Todos los binarios del ecosistema (imágenes editoriales, documentos descargables y
envíos de usuarios) viven en **Supabase Storage**, no en el repositorio. El acceso es
multi-tenant: cada archivo se organiza por carpeta de organización o de propósito.

### Modelo de buckets (visión)

| Bucket          | Visibilidad      | Límite | Propósito                                                                 | Organización          |
| --------------- | ---------------- | ------ | ------------------------------------------------------------------------- | --------------------- |
| `content-media` | Público          | 10 MB  | Imágenes editoriales embebidas en páginas públicas (portadas, autores, eventos). | `articles/`, `team/`, `events/` |
| `library-docs`  | Público          | 50 MB  | Documentos descargables públicos (policy briefs, infografías, informes, publicaciones). | `ieam/`, `escuela-hispanica/` |
| `postulaciones` | **Privado** ⚠️   | 10 MB  | Envíos privados de usuarios con datos personales (CV de postulación académica). | `academico/{userId}/` |

> ⚠️ `postulaciones` contiene datos personales (CVs). Debe servirse con **signed URLs**
> de TTL corto generadas en el servidor, nunca con URL pública permanente.

### Patrón de 3 capas (uniforme)

```
CMS / Formulario  ──upload──▶  bucket de Storage  ──▶  URL (pública o firmada)
                                                         │
                                                    se guarda en
                                                         ▼
                                          DB (columna o JSONB, p.ej. articles.materials)
                                                         │
                                                    se renderiza en
                                                         ▼
                                          enlace de descarga / <img> en el sitio público
```

### Estado por bucket

- `content-media`: **en uso** — el componente `ImageUpload` de `@fortius/admin-ui` sube aquí las imágenes del CMS.
- `library-docs`: **creado, pendiente de cablear** — destino previsto para los PDFs de IEAM (`materials`), hoy todavía en `apps/web-ieam/public/docs/`.
- `postulaciones`: **en uso** por EH (`/api/postulacion/academico`); pendiente pasar a privado + signed URLs.

## Estado actual de las apps principales

La tabla siguiente resume de forma homogénea el estado real de las cuatro apps
principales del ecosistema.

| App | Estado general | Fuente principal de datos | i18n | Operación / admin | Pagos / contacto | Build actual |
| --- | --- | --- | --- | --- | --- | --- |
| `web-escuela-hispanica` | App más operativa del monorepo: sitio, membresías, admin y pagos | Híbrido: Supabase + `src/lib/mock-data` | `es`, `en`, `pt` con `next-intl` | Admin real en `/admin` | Stripe + Resend + API routes | ✅ |
| `web-ieam` | Sitio académico multilingüe + CMS editorial real | Híbrido: Supabase + `mock-data` + piloto `content-collections` | `es`, `en` con `next-intl` | CMS real en `/admin` | Colaboración y eventos; sin capa de pagos equivalente a EH | ✅ |
| `web-fortius-consulting` | Sitio editorial estable con área privada real (auth + RLS + roles) | `src/content/*.ts` + Supabase (auth, proyectos, suscripciones, contacto) | Sin `next-intl` | Dashboards por rol en `/area-privada`; provisión vía webhook de Stripe | Stripe (provisión) + contacto con Supabase + Resend | ✅ |
| `web-fortius-foundation` | Sitio institucional/editorial ya rediseñado | `src/content/*.ts` + formularios persistentes en Supabase | Sin `next-intl` | Sin CMS; área privada informativa | Contacto y donación de intención con Supabase + Resend | ✅ |

### Notas rápidas por app

#### `web-escuela-hispanica`

- backend real ya conectado para auth, membresías, admin, comunicaciones y pagos
- mantiene una capa editorial híbrida con `mock-data`
- es la referencia más completa del monorepo en flujos operativos

#### `web-ieam`

- CMS real ya operativo para artículos y eventos
- el sitio público aún convive con `mock-data`
- existe un piloto local con `content-collections` y `Decap CMS`
- el build muestra un aviso de Next.js para migrar `middleware` a `proxy`, pero no bloquea compilación
- **contenido pendiente de migrar desde el proyecto legacy `ieam/`** (Vite/React, deprecado): 1 artículo nuevo (`migracion-irregular-ue-t1-2026`) y 3 miembros del equipo (`Dolores López`, `Souleymane Fall`, `Fodié Tandjigora`)

#### `web-fortius-consulting`

- la capa pública está estable y compila bien
- el contacto ya guarda en Supabase y registra comunicaciones
- el área privada ya usa auth real de Supabase con RLS y tres dashboards
  diferenciados por rol (`super_admin`, `consultant`, `member`)
- **no hay signup público**: las cuentas se provisionan desde el webhook de
  Stripe (`inviteUserByEmail` tras pago verificado, con `full_name` capturado
  de `customer_details` y `redirectTo: /nueva-contrasena`). `/registro`
  redirige a `/login` y la server action `signUp` está deshabilitada
- el dashboard del `member` ya bloquea "Contenido Exclusivo" y "Oportunidades
  & Eventos" cuando la suscripción Stripe no está `active`/`trialing` (overlay
  con CTA "Reactivar suscripción" / "Regularizar pago")
- pendientes inmediatos: Fase 4 (CMS de artículos con `ArticleEditor`
  compartido) y Fase 5 (subida segura de medios)
- ver bitácora completa en
  [`apps/web-fortius-consulting/README.md`](apps/web-fortius-consulting/README.md#bit%C3%A1cora-de-decisiones)

#### `web-fortius-foundation`

- home, incubadora, ayudas, blog, contacto y donaciones ya están reorganizados
- contacto y donaciones de intención ya persisten en Supabase
- el contenido principal sigue siendo local y editorial

## Estado operativo rápido

Si necesitas una lectura aún más práctica, esta tabla resume el estado operativo
por app.

| App | Build | Backend | Admin | Pagos | Email | Principal pendiente |
| --- | --- | --- | --- | --- | --- | --- |
| `web-escuela-hispanica` | ✅ | Supabase real | ✅ | Stripe real | Resend real | seguir reduciendo `mock-data` sin romper operación |
| `web-ieam` | ✅ | Supabase + capa híbrida | ✅ | no aplica como EH | formularios/eventos con integración parcial | completar migración desde `mock-data` y mover `middleware` a `proxy` |
| `web-fortius-consulting` | ✅ | Supabase (auth, RLS, proyectos, suscripciones) + contacto persistente; contenido editorial aún local | sin CMS propio (planeado Fase 4) | Stripe activo: provisión invite-only (webhook → invite → `/nueva-contrasena`) + gate del dashboard por `stripeStatus` | implementado, pendiente validación runtime completa | Fase 4 (CMS) + Fase 5 (subida segura de medios) + cerrar keys de email |
| `web-fortius-foundation` | ✅ | contenido local + formularios persistentes | no tiene CMS | intención de donación, sin checkout directo | implementado, pendiente validación runtime completa | decidir si más contenido migra a Supabase y cerrar keys de email |

## Matriz de variables de entorno por app

La tabla siguiente resume las variables detectadas en código para las cuatro apps
principales. Sirve como guía rápida para `.env` local, Vercel y revisiones de
runtime. No incluye valores, solo nombres de variables.

| Variable | `web-escuela-hispanica` | `web-ieam` | `web-fortius-consulting` | `web-fortius-foundation` |
| --- | --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | ✅ | ✅ | ✅ | ✅ |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | ✅ | ✅ | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | ✅ | — | — |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | ✅ | ✅ | ✅ |
| `NEXT_PUBLIC_ORG_SLUG` | ✅ | — | — | — |
| `RESEND_API_KEY` | ✅ | — | ✅ | ✅ |
| `RESEND_FROM_EMAIL` | — | — | ✅ | ✅ |
| `APPROVAL_SECRET` | ✅ | — | — | — |
| `APPROVER_EMAIL` | ✅ | — | — | — |
| `CRON_SECRET` | ✅ | — | — | — |
| `STRIPE_SECRET_KEY` | ✅ | — | — | — |
| `STRIPE_WEBHOOK_SECRET` | ✅ | — | — | — |
| `STRIPE_PRICE_AMIGO_MONTHLY` | ✅ | — | — | — |
| `STRIPE_PRICE_MECENAS_ANNUAL` | ✅ | — | — | — |
| `STRIPE_PRICE_ACADEMICO_MONTHLY` | ✅ | — | — | — |
| `STRIPE_PRICE_ACADEMICO_ANNUAL` | ✅ | — | — | — |

### Lectura rápida por grupo

#### Base compartida mínima

Estas variables aparecen en casi todas las apps conectadas a backend o formularios:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

#### Variables públicas de cliente Supabase

Necesarias hoy en las apps que usan cliente público de Supabase en runtime:

- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Apps afectadas:

- `web-escuela-hispanica`
- `web-ieam`

#### Email / Resend

Apps con envío de email en código:

- `web-escuela-hispanica`
- `web-fortius-consulting`
- `web-fortius-foundation`

Variables relacionadas:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` (hoy usada explícitamente en Consulting y Foundation)

#### Stripe

La única app con capa de pagos completa en código es `web-escuela-hispanica`.

Variables detectadas:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_AMIGO_MONTHLY`
- `STRIPE_PRICE_MECENAS_ANNUAL`
- `STRIPE_PRICE_ACADEMICO_MONTHLY`
- `STRIPE_PRICE_ACADEMICO_ANNUAL`

### Nota operativa para próximas revisiones

Cuando revisemos app por app y la colocación de llaves en Vercel, conviene mirar
primero estas dos situaciones:

- `web-fortius-consulting`: email implementado, pero pendiente validación runtime completa con keys reales
- `web-fortius-foundation`: email implementado, pero pendiente validación runtime completa con keys reales

## Onboarding recomendado

1. Instala dependencias con `pnpm install`.
2. Revisa el README de la app donde vayas a trabajar.
3. Confirma si esa app ya lee de Supabase o sigue en `mock-data` / `src/content`.
4. Si tocas acceso a datos, valida siempre el filtro por `organization_id`.
5. Si tocas build o variables de entorno globales, revisa también `turbo.json`.
