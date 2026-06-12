# web-ieam

Aplicación del **Instituto Español de Análisis Migratorio (IEAM)**
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
  - `analisis`
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
└── middleware.ts            # ⚠️ Deprecado — pendiente migrar a proxy.ts
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

### Supabase

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Almacenamiento de archivos (Supabase Storage)

IEAM maneja dos tipos de binarios (ver el modelo de buckets global en el README raíz):

- **Imágenes** (portadas, autores): bucket `content-media`, vía el componente
  `ImageUpload` del CMS. **Ya funciona.**
- **Documentos descargables** (policy briefs, infografías): bucket `library-docs`,
  carpeta `ieam/`. Se referencian desde `articles.materials` (JSONB
  `[{label, url, url_es?, url_en?}]`) y se renderizan como botones en
  `/analisis/[slug]`.

> ⚠️ **Estado transicional:** los PDFs todavía viven en `public/docs/` (estáticos en
> el repo) y `materials` apunta a rutas `/docs/x.pdf`. El destino objetivo es subirlos
> a `library-docs/ieam/` y actualizar las URLs a Supabase Storage.

> **Nota del middleware:** `proxy.ts` excluye `.pdf` del matcher y añade `/docs/` a
> `PASSTHROUGH_ROUTES`, para que las descargas no pasen por la redirección i18n
> (que rompía con un 404). Mantener ambos al migrar a Storage.

## Próxima etapa natural

- **Cablear `library-docs`**: subir los PDFs de `public/docs/` al bucket y actualizar `materials`; añadir un `FileUpload` al CMS para nuevos documentos.
- **Migrar `middleware.ts` → `proxy.ts`** (ya hecho en `web-escuela-hispanica`; el build muestra aviso pero no bloquea).
- **Migrar contenido legacy de `ieam/`** (proyecto Vite deprecado):
  - 1 artículo nuevo: `migracion-irregular-ue-t1-2026` (añadir a `mock-data/articles.ts` y re-correr `seed-content.ts` o cargar vía CMS).
  - 3 miembros del equipo nuevos: `Dolores López`, `Souleymane Fall`, `Fodié Tandjigora` (actualizar `mock-data/team.ts`).
  - Validar posibles diffs de cuerpo en los 18 artículos comunes entre `ieam/src/data/articles.ts` y `mock-data/articles.ts`.
- Completar la sustitución progresiva de `mock-data` por lecturas directas a Supabase.
- Decidir si el piloto con `content-collections` pasa a ser parte estable del flujo.

## Notas para desarrollo

- Empieza por `src/app/[locale]` si el cambio es público.
- Empieza por `src/app/admin` si el cambio es editorial/CMS.
- Si tocas contenido, confirma primero si la fuente de verdad es `mock-data`, Supabase o el piloto local.
- Si tocas i18n, revisa `src/messages/{es,en}.json`.