# web-ieam

Aplicación del **Instituto de Estudios sobre África y el Mediterráneo (IEAM)**
dentro del monorepo Fortius. Su objetivo es combinar una presentación editorial
de carácter académico con un CMS ligero, multilingüe y preparado para migrar el
contenido a Supabase sin perder control editorial.

## Dominio canónico

`https://ieam.es/`

Configura `NEXT_PUBLIC_SITE_URL` con ese dominio. El valor histórico presente en
Supabase puede requerir una migración posterior para quedar totalmente alineado.

## Stack actual

- **Next.js 16** con App Router.
- **Tailwind CSS v4**.
- **next-intl** con español por defecto e inglés como segundo idioma.
- **Supabase** como backend compartido del ecosistema Fortius.
- **@fortius/admin-ui** y **@fortius/database** para CMS y acceso a datos.

## Comandos

Desde `fortius/apps/web-ieam/`:

```bash
pnpm dev
pnpm build
pnpm lint
pnpm check-types
```

Desde la raíz del monorepo:

```bash
pnpm --filter web-ieam dev
pnpm tsx apps/web-ieam/scripts/seed-content.ts
```

## Estructura principal

```text
src/
├── app/
│   ├── [locale]/            # Sitio público con i18n
│   ├── admin/               # CMS sin prefijo de idioma
│   └── globals.css          # Tokens editoriales IEAM sobre Tailwind v4
├── components/              # Home, análisis, eventos y bloques institucionales
├── i18n/                    # Routing y request config de next-intl
├── lib/
│   ├── admin/               # Server Actions y queries del CMS
│   ├── mock-data/           # Fuente transicional de contenido
│   └── utils/               # Utilidades de app
├── messages/                # Diccionarios es/en
└── middleware.ts            # Middleware de app
```

## CMS y backend compartido

IEAM usa el backend común de Fortius con aislamiento por `organization_id`.
Esto permite compartir Supabase con otras organizaciones sin cruzar contenido,
usuarios ni permisos.

Puntos clave:

- `src/app/admin` agrupa el CMS y evita prefijo de idioma.
- `src/lib/admin/auth.ts` valida sesión y rol activo en `user_memberships`.
- `src/lib/admin/article-queries.ts` y `event-queries.ts` resuelven lecturas.
- `src/lib/admin/article-actions.ts` y `event-actions.ts` agrupan mutaciones.

### Patrón importante en páginas de edición

Mantén siempre esta separación:

- lecturas en `*-queries.ts`;
- mutaciones en `*-actions.ts` con `'use server'`;
- página de edición como Server Component que carga datos y se los pasa al formulario.

Este patrón evita errores del tipo **Invalid Server Actions request**.

## Estado de migración de contenido

IEAM está en una transición ordenada desde contenido estático a contenido persistido.

- **Estado actual:** `src/lib/mock-data/*.ts` sigue siendo la fuente editorial
  de referencia para buena parte del sitio público.
- **Migración disponible:** `scripts/seed-content.ts` ya permite sembrar datos en
  Supabase para `articles` y `activities`, siempre vinculados a la organización `ieam`.
- **Pendiente:** completar la sustitución total de la capa `mock-data`, en especial
  donde todavía falta cerrar el modelo final de `team_members` y otras piezas editoriales.

El script de seed es **idempotente** y requiere `NEXT_PUBLIC_SUPABASE_URL` y
`SUPABASE_SERVICE_ROLE_KEY` en `.env.local` o `.env`.

## Diseño editorial

IEAM conserva una estética académica y de lectura larga: jerarquía tipográfica
clara, ritmo vertical generoso y una interfaz sobria orientada a artículos,
eventos y contenidos de análisis.

Si haces cambios visuales, empieza por `src/app/globals.css` y comprueba que el
ajuste siga encajando con el sistema editorial compartido del ecosistema Fortius.
