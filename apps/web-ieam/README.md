# web-ieam

Aplicación del **Instituto de Estudios sobre África y el Mediterráneo (IEAM)**
dentro del monorepo Fortius. Combina sitio público multilingüe, CMS interno y
una migración editorial todavía híbrida entre contenido local y Supabase.

## Estado general

- **Build verificado:** `pnpm --filter web-ieam build` ✅
- **Dominio canónico esperado:** `https://ieam.es/`
- **Idiomas activos:** español e inglés
- **i18n:** `next-intl`
- **Estado funcional:** web pública + CMS real + seed a Supabase + piloto editorial local

## Qué ofrece hoy

- sitio público multilingüe bajo `src/app/[locale]`
- rutas públicas de:
  - home
  - `nosotros`
  - `investigacion`
  - `eventos`
  - `contacto`
  - `colabora`
  - legales
- CMS interno en `/admin` para:
  - artículos
  - eventos
  - edición y publicación
- integración con backend compartido del monorepo por `organization_id`
- script de seed para sembrar artículos y actividades en Supabase
- piloto local con `content-collections` y `Decap CMS`

## Stack actual

- **Next.js 16** con App Router
- **React 19**
- **Tailwind CSS v4**
- **next-intl**
- **Supabase** como backend compartido
- `@fortius/admin-ui` y `@fortius/database`
- `content-collections` como piloto local de contenido
- `Decap CMS` para edición local experimental

## Comandos

Desde `fortius/apps/web-ieam/`:

```bash
pnpm dev
pnpm build
pnpm lint
pnpm check-types
pnpm cms:proxy
```

Desde la raíz:

```bash
pnpm --filter web-ieam dev
pnpm --filter web-ieam build
pnpm tsx apps/web-ieam/scripts/seed-content.ts
```

## Estructura principal

```text
src/
├── app/
│   ├── [locale]/            # Sitio público con i18n
│   ├── admin/               # CMS sin prefijo de idioma
│   └── globals.css          # Tokens editoriales IEAM
├── content/                 # Piloto Markdown para content-collections
├── components/              # Home, análisis, eventos e institucional
├── i18n/                    # Routing y request config
├── lib/
│   ├── admin/               # Auth, queries y mutaciones del CMS
│   ├── content/             # Normalización híbrida
│   ├── mock-data/           # Fuente transicional
│   └── utils/               # Utilidades varias
├── messages/                # Diccionarios es/en
└── middleware.ts            # Middleware legacy de app
```

## CMS y backend compartido

IEAM ya usa el backend común de Fortius con aislamiento por `organization_id`.

Puntos clave:

- `src/app/admin` agrupa el CMS
- `src/lib/admin/auth.ts` protege acceso por membresía/rol
- `article-queries.ts` y `event-queries.ts` resuelven lecturas
- `article-actions.ts` y `event-actions.ts` agrupan mutaciones

### Patrón importante para edición

Mantén esta separación:

- lecturas en `*-queries.ts`
- mutaciones en `*-actions.ts` con `'use server'`
- páginas de edición como Server Components que cargan datos y se los pasan al formulario

Ese patrón evita errores del tipo **Invalid Server Actions request**.

## Estado del contenido

La app está en transición ordenada:

- buena parte del sitio público todavía lee de `src/lib/mock-data/*.ts`
- existe seed idempotente para `articles` y `activities` en Supabase
- hay un piloto local con `content-collections` desde `src/content/research`
- `Decap CMS` vive en `/decap` y no sustituye al CMS real de `/admin`

## Variables y entorno importantes

### Sitio

- `NEXT_PUBLIC_SITE_URL` debería apuntar a `https://ieam.es/`

### Seed y acceso admin

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Nota técnica conocida

En el build actual aparece un aviso de Next.js indicando que la convención
`middleware` está deprecada y que conviene migrar a `proxy` en una iteración
posterior. No bloquea la compilación actual.

## Próxima etapa natural

- completar la sustitución progresiva de `mock-data`
- cerrar el modelo final de piezas editoriales aún no migradas
- decidir si el piloto con `content-collections` pasa a ser parte estable del flujo

## Notas para desarrollo

- Empieza por `src/app/[locale]` si el cambio es público.
- Empieza por `src/app/admin` si el cambio es editorial/CMS.
- Si tocas contenido, confirma primero si la fuente de verdad es `mock-data`, Supabase o el piloto local.
- Si tocas i18n, revisa `src/messages/{es,en}.json`.