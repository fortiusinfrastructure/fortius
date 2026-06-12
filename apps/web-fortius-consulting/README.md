# web-fortius-consulting

Sitio corporativo y editorial de **Fortius Consulting** dentro del monorepo
Fortius. La app mezcla presencia institucional, piezas de análisis, un pequeño
laboratorio visual y una **área privada todavía mock** para clientes.

## Estado general

- **Build verificado:** `pnpm --filter web-fortius-consulting build` ✅
- **Idioma actual:** español (`lang="es"`)
- **i18n:** esta app **todavía no usa `next-intl`**
- **Estado funcional:** frontend sólido + contacto persistente + área privada aún simulada

## Qué ofrece hoy

- home editorial v2 con foco en `Sociedad Civil` y `Política`
- páginas públicas de:
  - `/nosotros`
  - `/sociedad-civil`
  - `/politica`
  - `/publicaciones/[slug]`
  - `/expertos/[slug]`
  - `/contacto`
  - legales (`/aviso-legal`, `/politica-de-privacidad`, `/cookies`)
- laboratorio visual en `/lab` y `/lab/consulting-v2`
- área privada en `/area-privada` con dashboard y contenido exclusivo **mock**
- formulario de contacto con persistencia en Supabase y notificación interna por email

## Stack actual

- **Next.js 16** con App Router
- **React 19**
- **Tailwind CSS v4**
- `framer-motion` para interacción y animación
- `@fortius/database` y `@fortius/ui` como paquetes compartidos del monorepo
- `@supabase/supabase-js` para acciones seguras de servidor

## Comandos

Desde `fortius/apps/web-fortius-consulting/`:

```bash
pnpm dev
pnpm build
pnpm lint
pnpm check-types
```

Desde la raíz:

```bash
pnpm --filter web-fortius-consulting dev
pnpm --filter web-fortius-consulting build
```

## Estructura recomendada

```text
src/
├── app/
│   ├── (consulting)/        # Sitio público
│   ├── (private)/           # Área privada mock
│   ├── lab/                 # Prototipos y variantes visuales
│   └── globals.css          # Tokens y base visual
├── components/
│   ├── consulting-v2/       # Sistema editorial principal
│   ├── shared/              # Header, footer, layout
│   └── system/              # Utilidades pequeñas
├── content/                 # Fuente actual de contenido local
└── lib/
    ├── actions/             # Server actions, incluido contacto
    ├── email.ts             # Notificación interna por Resend
    └── auth.ts              # Usuario mock para el área privada
```

## Contacto y persistencia

La app ya no es solo estática en este punto.

El formulario de `/contacto`:

- guarda leads en `contact_submissions`
- intenta enviar notificación interna a `info@fortiusconsulting.org`
- registra el resultado del envío en `communication_logs`
- no pierde el lead si el email falla

### Variables necesarias para ese flujo

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`

## Herramienta de importación de artículos

### Dónde está

| Pieza | Ruta |
|-------|------|
| Página web (upload) | `src/app/(private)/herramientas/articulos/page.tsx` |
| API de conversión | `src/app/api/admin/articulos/convert/route.ts` |
| Scripts CLI | `scripts/convert-articulos.mjs` + `scripts/seed-articles.mjs` |
| Documentación CLI | `scripts/README.md` |

Una vez desplegada la app, el equipo editorial accede a:

```
https://tu-dominio.com/herramientas/articulos
```

Sube archivos `.docx` desde el navegador sin instalar nada. La API los convierte en memoria y los upserta directamente en Supabase.

### Pasos para activarla (una sola vez, por alguien técnico)

#### 1. Mover dependencias de conversión a `dependencies`

`mammoth` y `turndown` están ahora en `devDependencies`. Vercel no las instala en producción. Muévalas:

```bash
# Desde apps/web-fortius-consulting/
pnpm add mammoth turndown
```

Esto actualiza el `package.json` automáticamente.

#### 2. Añadir variables de entorno en Vercel

En el panel de Vercel → proyecto `web-fortius-consulting` → **Settings → Environment Variables**, añadir:

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase (ya debería existir) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key de Supabase (ya debería existir) |
| `ADMIN_UPLOAD_SECRET` | Contraseña arbitraria que protege el endpoint de subida |

`ADMIN_UPLOAD_SECRET` puede ser cualquier cadena larga y aleatoria, por ejemplo generada con:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

> Si se omite `ADMIN_UPLOAD_SECRET` el endpoint queda abierto — no recomendado en producción.

#### 3. Pasar el secreto a la página web (opcional pero recomendado)

Para que la interfaz web envíe automáticamente el header de autenticación, añadir también en Vercel:

| Variable | Valor |
|----------|-------|
| `NEXT_PUBLIC_UPLOAD_SECRET` | El mismo valor que `ADMIN_UPLOAD_SECRET` |

Y actualizar la llamada en `page.tsx`:

```typescript
// En handleSubmit, añadir al fetch:
headers: {
  "x-admin-secret": process.env.NEXT_PUBLIC_UPLOAD_SECRET ?? "",
},
```

#### 4. Desplegar

Hacer push a `main` (o el branch conectado a Vercel). El despliegue es automático. Una vez completado, la URL `/herramientas/articulos` ya está activa.

#### 5. Verificar

Abrir `https://tu-dominio.com/herramientas/articulos`, subir un `.docx` de prueba y comprobar que aparece en la tabla `articles` de Supabase.

### Convención de nombres de archivo

Los `.docx` deben nombrarse así para que la extracción de metadatos sea automática:

```
YYYY_MM_DD. TIPO (ACCESO). Título del artículo.docx
```

Ver ejemplos y tabla de tipos en [`scripts/README.md`](scripts/README.md).

---

## Almacenamiento de archivos (Supabase Storage)

Hoy esta app **no almacena binarios** en Supabase Storage. Los `.docx` que se suben en
`/herramientas/articulos` se convierten **en memoria** (mammoth → Markdown) y solo se
persiste el texto resultante en la tabla `articles`; el archivo original no se guarda.

Si en el futuro se necesita conservar adjuntos o imágenes, usar el modelo de buckets
global descrito en el README raíz (`content-media` para imágenes, `library-docs` para
documentos descargables).

## Qué sigue siendo local o mock

- el contenido principal sigue en `src/content/*.ts`
- el área privada usa estado simulado en `src/lib/auth.ts`
- no hay todavía acceso real de clientes ni autorización conectada a Supabase

## Próxima etapa natural

- sustituir el área privada mock por autenticación y datos reales
- mover contenido estructurado al backend compartido cuando compense
- mantener el patrón multi-tenant del monorepo por `organization_id`

## Notas para desarrollo

- Empieza por `src/app/(consulting)` si el cambio es público.
- Usa `src/components/consulting-v2` si afecta la capa editorial actual.
- Revisa `src/app/lab` antes de rehacer variantes visuales.
- Si conviertes contenido local en datos remotos, documenta claramente la transición.
- Esta app **no usa `next-intl`** ni `proxy.ts`/`middleware.ts`; el router de Next.js es estándar.
