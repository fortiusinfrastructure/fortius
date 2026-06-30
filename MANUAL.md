# Manual de Infraestructura y Productos Digitales — Fortius

> **Versión:** junio 2026  
> **Alcance:** monorepo `fortius/` — cuatro aplicaciones Next.js sobre backend Supabase compartido  
> **Audiencia:** equipo de dirección, product owners y desarrolladores con acceso al repositorio

---

## Índice

1. [Visión general del ecosistema](#1-visión-general-del-ecosistema)
2. [Arquitectura técnica compartida](#2-arquitectura-técnica-compartida)
3. [Escuela Hispánica — web-escuela-hispanica](#3-escuela-hispánica) · [Guía de cambios →](#39-guía-de-cambios-frecuentes)
4. [IEAM — web-ieam](#4-ieam) · [Guía de cambios →](#48-guía-de-cambios-frecuentes)
5. [Fortius Consulting — web-fortius-consulting](#5-fortius-consulting) · [Guía de cambios →](#57-guía-de-cambios-frecuentes)
6. [Fortius Foundation — web-fortius-foundation](#6-fortius-foundation) · [Guía de cambios →](#610-guía-de-cambios-frecuentes)
7. [Servicios e infraestructura externa](#7-servicios-e-infraestructura-externa)
8. [Variables de entorno por aplicación](#8-variables-de-entorno-por-aplicación)
9. [Base de datos — modelo y tablas clave](#9-base-de-datos--modelo-y-tablas-clave)
10. [Estado general y próximas etapas](#10-estado-general-y-próximas-etapas)

---

## 1. Visión general del ecosistema

Fortius es un **ecosistema digital multi-producto** que agrupa cuatro organizaciones bajo un mismo backend Supabase y un monorepo Turborepo. Cada organización tiene su propio sitio web independiente, con identidad visual, lógica de negocio y audiencia diferenciadas, pero comparten autenticación, base de datos, almacenamiento y paquetes de código.

| Producto | Dominio | Audiencia | Estado |
|---|---|---|---|
| **Escuela Hispánica (EH)** | escuelahispanica.org | Miembros, académicos, mecenas | Producción operativa |
| **IEAM** | ieam.es | Investigadores, público general | Web pública + CMS activo |
| **Fortius Consulting** | fortiusconsulting.org | Clientes de consultoría | Área privada + Stripe activo |
| **Fortius Foundation** | fundacionfortius.org | Beneficiarios, donantes, público | Web + área privada en marcha |

### Principio de aislamiento multi-tenant

Todas las organizaciones comparten las mismas tablas de Supabase. El aislamiento se garantiza mediante la columna `organization_id` presente en cada tabla de contenido o membresía. Las políticas RLS (Row Level Security) de Supabase aseguran que una organización no pueda leer datos de otra.

---

## 2. Arquitectura técnica compartida

### 2.1 Monorepo

```
fortius/
├── apps/
│   ├── web-escuela-hispanica/
│   ├── web-ieam/
│   ├── web-fortius-consulting/
│   └── web-fortius-foundation/
├── packages/
│   ├── database/          # @fortius/database — clientes Supabase y tipos
│   ├── admin-ui/          # @fortius/admin-ui — componentes CMS compartibles
│   ├── eslint-config/     # Reglas ESLint compartidas
│   └── typescript-config/ # tsconfig base
└── supabase/
    └── migrations/        # SQL versionado aplicado al proyecto Supabase
```

**Gestor de paquetes:** `pnpm` con workspaces  
**Orquestador de builds:** Turborepo  
**Framework:** Next.js 16 con App Router y React 19  
**Estilos:** Tailwind CSS v4  
**Despliegue:** Vercel (una app por proyecto Vercel)

### 2.2 Paquete `@fortius/database`

Centraliza el acceso a Supabase para todas las apps.

```typescript
// Server Components y Server Actions (respeta RLS)
import { createServerClient } from '@fortius/database';
const supabase = await createServerClient();

// Webhooks, admin y operaciones que necesitan saltarse RLS
import { createAdminClient } from '@fortius/database';
const admin = createAdminClient();
```

- `createServerClient()` — usa cookies de sesión, respeta RLS
- `createAdminClient()` — usa `SUPABASE_SERVICE_ROLE_KEY`, solo para servidor

### 2.3 Almacenamiento de archivos (Supabase Storage)

| Bucket | Visibilidad | Límite | Uso |
|---|---|---|---|
| `content-media` | Público | 10 MB | Imágenes editoriales (artículos, eventos, equipo) |
| `library-docs` | Público | 50 MB | Documentos descargables (PDFs IEAM, informes) |
| `postulaciones` | **Privado** ⚠️ | 10 MB | CVs de postulación académica (datos personales) |

> `postulaciones` debe servirse mediante **signed URLs con TTL corto** generadas en servidor, nunca con `getPublicUrl`.

### 2.4 Email transaccional (Resend)

Todas las apps envían email con Resend mediante `RESEND_API_KEY`. El remitente varía por app. La función `sendEmail` en cada app registra el resultado en `communication_logs` en Supabase, de modo que un fallo de entrega no hace perder el lead.

### 2.5 i18n

| App | Idiomas | Librería |
|---|---|---|
| Escuela Hispánica | ES / EN / PT | `next-intl` |
| IEAM | ES / EN | `next-intl` |
| Fortius Consulting | ES / EN | `next-intl` |
| Fortius Foundation | ES | No usa i18n |

---

## 3. Escuela Hispánica

**Repositorio:** `apps/web-escuela-hispanica/`  
**Dominio:** escuelahispanica.org  
**Estado:** Producción operativa — la app más completa del ecosistema

### 3.1 Qué hace

Sitio multilingüe con membresías, autenticación, eventos, checkout Stripe y panel de administración interno. Permite a personas interesadas en la cultura hispánica suscribirse como miembros con distintos niveles de acceso y aportación.

### 3.2 Rutas públicas

| Ruta | Descripción |
|---|---|
| `/` | Home editorial |
| `/nosotros` | Misión, equipo e institución |
| `/proyectos` | Iniciativas activas |
| `/publicaciones` | Artículos y análisis |
| `/recursos` | Materiales descargables |
| `/actividades` | Eventos y agenda |
| `/colabora` | Formas de participar y donar |
| `/contacto` | Formulario de contacto |
| `/auth/login` | Inicio de sesión |
| `/auth/register` | Registro de cuenta |

### 3.3 Membresías y tiers

| Tier | Flujo | Precio |
|---|---|---|
| **Amigo** | Aportación puntual o recurrente | Variable |
| **Académico** | Solicitud → aprobación → suscripción | Según convocatoria |
| **Mecenas** | Checkout directo | 1.000 €+ / año |

El tier **Académico** es el más complejo: el candidato envía un formulario con CV adjunto (subido a `postulaciones/{userId}/`), el equipo recibe un email con link de aprobación/rechazo firmado con HMAC, y solo tras la aprobación se activa la suscripción.

### 3.4 Rutas de API

| Ruta | Función |
|---|---|
| `/api/checkout/amigo` | Inicia sesión de checkout Stripe (importe dinámico o suscripción) |
| `/api/checkout/mecenas` | Checkout suscripción anual 1.000 €+ |
| `/api/postulacion/academico` | Recibe solicitud + CV, envía notificación al aprobador |
| `/api/admin/approve` | Aprueba postulación (link firmado con HMAC) |
| `/api/admin/reject` | Rechaza postulación (link firmado con HMAC) |
| `/api/webhooks/stripe` | Procesa eventos Stripe (idempotente) |

### 3.5 Panel de administración

Ruta: `/admin`  
Acceso: requiere rol `admin` en `user_memberships` para la organización EH.

Módulos disponibles:
- **Miembros**: listado, estado, tier y acciones
- **Eventos**: gestión de agenda
- **Comunicaciones**: log de emails enviados

### 3.6 Lógica de autenticación

```
src/lib/auth/actions.ts
├── signUp(formData)   — Crea usuario, envía email de verificación
├── signIn(formData)   — Login con contraseña
└── signOut()          — Cierra sesión y redirige
```

### 3.7 Variables de entorno necesarias

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_ORG_SLUG=escuela-hispanica
NEXT_PUBLIC_SITE_URL

STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_PRICE_ACADEMICO_MONTHLY
STRIPE_PRICE_ACADEMICO_ANNUAL
STRIPE_PRICE_MECENAS_ANNUAL
STRIPE_PRICE_AMIGO_MONTHLY   # opcional

RESEND_API_KEY
APPROVAL_SECRET
APPROVER_EMAIL
```

### 3.8 Estado del contenido

La app está en estado **híbrido**: parte del negocio (auth, membresías, pagos, admin, eventos) ya vive en Supabase. El contenido editorial (publicaciones, recursos) sigue en `src/lib/mock-data/` como capa transicional pendiente de migración.

### 3.9 Guía de cambios frecuentes

> Los cambios en archivos de código requieren un nuevo **commit + despliegue** en Vercel.  
> Los cambios a través del **CMS web** (`/admin`) son inmediatos sin redeploy.

#### Modificar biografías o datos del equipo

1. Abrir `apps/web-escuela-hispanica/src/lib/mock-data/team.ts`
2. Localizar el miembro por su `name` en el array `teamMembers`
3. Editar `name`, `role`, `bio` (los tres soportan objeto `{ es, en, pt }`) o `image` (ruta relativa dentro de `public/`)
4. Si se añade foto nueva: colocar el archivo WebP en `public/equipo/` y apuntar `image` a esa ruta
5. Commit y redeploy

#### Añadir o editar un artículo de publicaciones

1. Abrir `apps/web-escuela-hispanica/src/lib/mock-data/articles.ts`
2. Añadir un nuevo objeto al array o editar el existente — campos clave: `slug`, `title`, `excerpt`, `content`, `author`, `date`, `category`, `image`
3. Si el autor es nuevo, añadirlo también en `src/lib/mock-data/authors.ts`
4. Colocar la imagen destacada en `public/publicaciones/` (o donde indique el campo `image`)
5. Commit y redeploy

#### Añadir o editar un evento

Los eventos tienen dos fuentes según cómo se crearon:

**Opción A — Sin CMS (archivo estático):**
1. Abrir `apps/web-escuela-hispanica/src/lib/mock-data/activities.ts`
2. Añadir o editar el objeto en el array `activities` — campos: `title`, `date`, `time`, `location`, `description`, `category`
3. Commit y redeploy

**Opción B — CMS web (sin redeploy):**
1. Acceder a `escuelahispanica.org/admin` con cuenta administradora
2. Ir a **Eventos** → **Nuevo evento** (o clic en el evento a editar)
3. Completar el formulario y guardar — el cambio es inmediato en Supabase

#### Añadir o editar un proyecto

1. Abrir `apps/web-escuela-hispanica/src/lib/mock-data/projects.ts`
2. Añadir o editar el objeto con `slug`, `title`, `description`, `image`, `status`, `category`
3. Commit y redeploy

#### Añadir o editar un recurso descargable

1. Abrir `apps/web-escuela-hispanica/src/lib/mock-data/resources.ts`
2. Añadir o editar el objeto con `title`, `description`, `type`, `url`, `category`
3. Si el recurso es un PDF: subirlo al bucket `library-docs` en Supabase Storage y usar la URL pública en el campo `url`
4. Commit y redeploy

#### Modificar textos de la interfaz (UI strings)

1. Abrir el archivo de idioma en `apps/web-escuela-hispanica/src/messages/` (`es.json`, `en.json` o `pt.json`)
2. Localizar la clave por namespace (p. ej. `"home"`, `"nosotros"`, `"colabora"`)
3. Editar el valor y hacer commit y redeploy

---

## 4. IEAM

**Repositorio:** `apps/web-ieam/`  
**Dominio:** ieam.es  
**Estado:** Web pública operativa + CMS interno activo

### 4.1 Qué hace

Sitio del **Instituto Español de Análisis Migratorio**. Publica análisis de política migratoria, informa sobre eventos y cuenta con un CMS interno (`/admin`) para que el equipo editorial gestione artículos y eventos sin tocar código.

### 4.2 Rutas públicas

| Ruta | Descripción |
|---|---|
| `/` | Home institucional |
| `/nosotros` | Misión y equipo |
| `/investigacion` | Líneas de investigación |
| `/analisis` | Artículos y policy briefs |
| `/analisis/[slug]` | Artículo individual con materiales descargables |
| `/eventos` | Agenda de eventos |
| `/contacto` | Formulario de contacto |
| `/colabora` | Formas de colaborar |

### 4.3 CMS interno (`/admin`)

El CMS vive en `/admin` sin prefijo de idioma. Acceso protegido: requiere rol `admin` en `user_memberships` para la organización IEAM.

**Módulos disponibles:**

| Módulo | Ruta | Función |
|---|---|---|
| Artículos | `/admin/articles` | Listar, crear, editar, publicar y eliminar artículos |
| Artículo nuevo | `/admin/articles/new` | Editor con campos multiidioma y subida de imagen |
| Artículo editar | `/admin/articles/[id]/edit` | Mismo editor, datos precargados |
| Eventos | `/admin/events` | Listar, crear, editar y eliminar eventos |
| Evento nuevo | `/admin/events/new` | Editor con fecha, imagen y descripción |
| Evento editar | `/admin/events/[id]/edit` | Mismo editor, datos precargados |

**Patrón de edición (crítico):**
- Las funciones de **lectura** viven en `*-queries.ts` (sin `'use server'`)
- Las **mutaciones** viven en `*-actions.ts` (con `'use server'`)
- Las páginas de edición son Server Components que cargan el dato y lo pasan a un Client Component formulario

Este patrón evita el error "Invalid Server Actions request" que ocurre cuando se mezclan lecturas en archivos `'use server'`.

### 4.4 Materiales descargables (PDFs)

Los artículos pueden tener materiales adjuntos (policy briefs, infografías) definidos en el campo `materials` (JSONB) como `[{label, url, url_es?, url_en?}]`. La función `resolveMaterialUrl()` en `src/lib/utils/content.ts` mapea las rutas `/docs/archivo.pdf` a la URL pública de Supabase Storage (`library-docs/ieam/`).

### 4.5 Seed de contenido

Para poblar Supabase con el contenido de mock-data:

```bash
# Desde la raíz del monorepo
pnpm tsx apps/web-ieam/scripts/seed-content.ts
```

Requiere `NEXT_PUBLIC_SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` en `apps/web-ieam/.env`. El script es idempotente — puede ejecutarse varias veces sin duplicar datos.

### 4.6 Variables de entorno necesarias

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_SITE_URL=https://ieam.es
```

### 4.7 Estado del contenido

- Artículos y eventos: **fuente en Supabase** (vía CMS + seed)
- Equipo e institución: en `src/lib/mock-data/` (pendiente migración)
- PDFs: en `public/docs/` del repo (objetivo moverlos a `library-docs/ieam/`)

### 4.8 Guía de cambios frecuentes

> Los artículos y eventos se gestionan desde el CMS web — **sin redeploy**.  
> Los cambios de equipo y textos de UI requieren **commit + redeploy**.

#### Modificar biografías o datos del equipo

1. Abrir `apps/web-ieam/src/lib/mock-data/team.ts`
2. Localizar el miembro y editar `name`, `role`, `bio` o `image`
3. Si se añade foto nueva: colocar el WebP en `public/equipo/`
4. Commit y redeploy

#### Añadir o editar un artículo de análisis

El contenido de artículos vive en Supabase y se gestiona exclusivamente desde el CMS. No requiere tocar código.

1. Iniciar sesión con cuenta administradora en `ieam.es/admin`
2. Ir a **Artículos** → **Nuevo artículo** (o clic en el artículo a editar)
3. Completar: título ES y EN, excerpt, cuerpo (rich text), imagen destacada y, si aplica, materiales descargables
4. Publicar — el artículo aparece en `/analisis` de inmediato

#### Añadir un PDF descargable a un artículo

1. Subir el PDF al bucket `library-docs/ieam/` en Supabase Storage (panel de Supabase → Storage)
2. En el editor del artículo (CMS), sección **Materiales**: añadir entrada con etiqueta y la ruta devuelta por Supabase
3. La función `resolveMaterialUrl()` en `src/lib/utils/content.ts` resuelve automáticamente la URL pública con descarga forzada

#### Añadir o editar un evento

1. En `ieam.es/admin`, ir a **Eventos** → **Nuevo evento**
2. Completar título, fecha, ubicación, descripción e imagen destacada
3. Guardar — el evento aparece en `/eventos` de forma inmediata

#### Modificar textos de la interfaz (UI strings)

1. Abrir `apps/web-ieam/src/messages/es.json` o `en.json`
2. Localizar la clave por namespace y editar el valor
3. Commit y redeploy

---

## 5. Fortius Consulting

**Repositorio:** `apps/web-fortius-consulting/`  
**Dominio:** fortiusconsulting.org  
**Estado:** Sitio público + área privada con Stripe y Supabase operativos

### 5.1 Qué hace

Sitio corporativo de **Fortius Consulting**. Presenta los servicios de consultoría (Sociedad Civil e Inteligencia Política), el equipo y los expertos colaboradores. Incluye un área privada exclusiva para clientes activos, con acceso gateado por suscripción Stripe.

### 5.2 Rutas públicas

| Ruta | Descripción |
|---|---|
| `/` | Home editorial v2 |
| `/nosotros` | Misión y equipo de Fortius Consulting |
| `/sociedad-civil` | Vertical de Sociedad Civil |
| `/politica` | Vertical de Inteligencia Política |
| `/publicaciones/[slug]` | Artículo individual |
| `/expertos/[slug]` | Perfil de experto colaborador |
| `/contacto` | Formulario con persistencia en Supabase |
| `/aviso-legal` | Aviso legal |
| `/politica-de-privacidad` | Política de privacidad |
| `/cookies` | Política de cookies |
| `/lab` | Laboratorio visual (no indexado) |

### 5.3 Área privada (`/area-privada`)

#### Modelo de acceso — solo por invitación

No existe registro público. Toda cuenta se crea automáticamente a partir de un pago verificado en Stripe:

```
1. Cliente compra plan → Stripe Checkout
2. Stripe dispara webhook → /api/webhooks/stripe
3. El handler:
   - resuelve usuario por email (si no existe, inviteUserByEmail)
   - crea subscription en Supabase
   - asigna user_memberships con role='member'
4. Cliente recibe email de invitación de Supabase
5. Hace clic → /nueva-contrasena (establece contraseña)
6. Redirige a /login?activated=ok (banner de bienvenida)
```

#### Roles y dashboards

| Rol | Dashboard | Contenido |
|---|---|---|
| `super_admin` | SuperAdminDashboard | KPIs globales, lista de clientes, acceso CMS |
| `consultant` | ConsultantDashboard | Proyectos asignados como consultor |
| `member` | DashboardClient | Sus proyectos, equipo asignado, contenido exclusivo |

#### Gate de suscripción Stripe

El dashboard de `member` bloquea visualmente las secciones "Contenido Exclusivo" y "Oportunidades & Eventos" cuando la suscripción no está activa:

- `active` o `trialing` → acceso completo
- `past_due` → overlay "Pago pendiente" con CTA para regularizar
- `canceled` / otro → overlay "Suscripción inactiva" con CTA para reactivar

El bloqueo es visual (blur + aria-hidden), no de servidor. El contenido sigue enviándose al cliente. Para gating seguro a nivel servidor, está planificada la Fase 4.

#### Rutas del área privada

| Ruta | Acceso | Descripción |
|---|---|---|
| `/login` | Público | Formulario de inicio de sesión |
| `/nueva-contrasena` | Token Supabase | Establecer contraseña (invite/recovery) |
| `/area-privada` | Autenticado | Dashboard según rol |
| `/area-privada/cuenta` | Autenticado | Datos de cuenta y suscripción |

### 5.4 Herramienta de importación de artículos

Una vez desplegada, en `/herramientas/articulos` el equipo puede subir archivos `.docx` desde el navegador. La API los convierte en Markdown (mammoth → turndown) y los upserta en Supabase.

**Convención de nombre de archivo:**
```
YYYY_MM_DD. TIPO (ACCESO). Título del artículo.docx
```

### 5.5 Formulario de contacto

`/contacto` guarda leads en `contact_submissions`, intenta enviar notificación interna a `info@fortiusconsulting.org` y registra el resultado en `communication_logs`. El lead no se pierde si el email falla.

### 5.6 Variables de entorno necesarias

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_SITE_URL=https://fortiusconsulting.org

STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET

RESEND_API_KEY
RESEND_FROM_EMAIL=noreply@fortiusconsulting.org

ADMIN_UPLOAD_SECRET        # protege /api/admin/articulos/convert
NEXT_PUBLIC_UPLOAD_SECRET  # mismo valor, para la interfaz web
```

### 5.7 Guía de cambios frecuentes

> Los artículos se gestionan desde el CMS web — **sin redeploy**.  
> El equipo, los expertos y el contenido editorial estático (home, verticales) requieren **commit + redeploy**.

#### Modificar el equipo o los expertos colaboradores

Todo el equipo y los expertos están en un único archivo:

```
apps/web-fortius-consulting/src/content/team.ts
```

- **Equipo interno**: array `TEAM` — cada entrada tiene `slug`, `name`, `role`, `role_en`, `bio`, `bio_en`, `photo`, `department`, `linkedin`
- **Expertos externos**: array `EXPERTS` al final del mismo archivo — misma estructura sin `department`
- Añadir foto: colocar el WebP en `apps/web-fortius-consulting/public/equipo/` y apuntar `photo` a esa ruta (`/equipo/nombre.webp`)
- Los campos `role_en` y `bio_en` son los que se muestran cuando el visitante cambia el idioma a EN; si se omiten, se muestra el campo ES como fallback
- Commit y redeploy

#### Añadir o editar un artículo

Los artículos se gestionan desde el CMS del área privada. No requiere tocar código.

1. Iniciar sesión en `fortiusconsulting.org/area-privada` con cuenta `super_admin`
2. Ir a **CMS → Artículos** (ruta: `/area-privada/admin/articulos`)
3. Crear nuevo artículo o editar uno existente
4. Completar los campos en **ES** y opcionalmente en **EN** (sección «Traducción EN» al final del formulario)
5. Guardar — el artículo aparece en la sección correspondiente de forma inmediata

#### Modificar el contenido de la vertical Sociedad Civil

| Idioma | Archivo |
|---|---|
| Español | `apps/web-fortius-consulting/src/content/sociedad-civil.ts` |
| Inglés  | `apps/web-fortius-consulting/src/content/sociedad-civil.en.ts` |

Contiene los bloques editoriales: hero, secciones descriptivas, estadísticas y CTAs. Commit y redeploy.

#### Modificar el contenido de la vertical Inteligencia Política

| Idioma | Archivo |
|---|---|
| Español | `apps/web-fortius-consulting/src/content/politica.ts` |
| Inglés  | `apps/web-fortius-consulting/src/content/politica.en.ts` |

Misma estructura que Sociedad Civil. Commit y redeploy.

#### Modificar el home (página de inicio)

| Idioma | Archivo |
|---|---|
| Español | `apps/web-fortius-consulting/src/content/home-v2.ts` |
| Inglés  | `apps/web-fortius-consulting/src/content/home-v2.en.ts` |

Contiene tagline, bloques editoriales y secciones de verticales del home v2. Commit y redeploy.

#### Modificar textos de la interfaz (UI strings)

1. Abrir `apps/web-fortius-consulting/src/messages/es.json` o `en.json`
2. Localizar la clave por namespace (p. ej. `"nosotros"`, `"article"`, `"expert"`)
3. Editar el valor y hacer commit y redeploy

---

## 6. Fortius Foundation

**Repositorio:** `apps/web-fortius-foundation/`  
**Dominio:** fundacionfortius.org  
**Estado:** Web pública + área privada con roles de beneficiario, donante y admin

### 6.1 Qué hace

Sitio institucional de **Fortius Foundation**. Presenta la misión de la fundación, la incubadora de iniciativas, las convocatorias de ayudas, el blog editorial, el formulario de donaciones y un área privada diferenciada por tipo de usuario.

### 6.2 Rutas públicas

| Ruta | Descripción |
|---|---|
| `/` | Home por bloques con sneak peak de ayudas y blog |
| `/nosotros` | Patronato, consejo asesor y equipo |
| `/incubadora` | Proyectos bajo incubación y casos de éxito |
| `/ayudas` | Información sobre el programa de ayudas |
| `/blog` | Listado de artículos editoriales |
| `/blog/[slug]` | Artículo individual |
| `/contacto` | Formulario de contacto (persistido en Supabase) |
| `/donaciones` | Formulario de intención de donación |
| `/registro` | Registro de cuenta para beneficiarios |
| `/login` | Inicio de sesión |
| `/recuperar-contrasena` | Solicitud de recuperación de contraseña |
| `/legal` | Aviso legal |
| `/privacidad` | Política de privacidad |
| `/cookies` | Política de cookies |

### 6.3 Área privada (`/area-privada`)

#### Modelo de acceso — registro abierto para beneficiarios

A diferencia de Consulting, Foundation sí permite el **registro público**. Al registrarse, el usuario recibe un email de verificación y se le asigna automáticamente el rol `beneficiario` en la organización Foundation.

```
1. Usuario completa /registro
2. Se crea cuenta en Supabase Auth
3. Se crea user_memberships con role='beneficiario'
4. Usuario recibe email de verificación
5. Confirma → puede iniciar sesión en /login
6. Accede a /area-privada → DashboardBeneficiario
```

Los roles `donante` y `admin` / `super_admin` se asignan manualmente desde la base de datos o mediante proceso interno.

#### Roles y dashboards

| Rol | Dashboard | Contenido |
|---|---|---|
| `beneficiario` | DashboardBeneficiario | Convocatorias abiertas, detalle y formulario de solicitud |
| `donante` | DashboardDonante | Historial de donaciones de `payment_history` |
| `admin` / `super_admin` | DashboardAdmin | Métricas de membresías, tabla de usuarios |

#### Rutas del área privada

| Ruta | Acceso | Descripción |
|---|---|---|
| `/registro` | Público | Formulario de alta como beneficiario |
| `/login` | Público | Inicio de sesión |
| `/area-privada` | Autenticado | Dashboard según rol |
| `/area-privada/ayudas/[slug]` | Autenticado | Detalle de convocatoria + formulario de solicitud |

### 6.4 Convocatorias de ayudas

Las convocatorias se definen en `src/content/ayudas.ts`. Cada convocatoria tiene:

```typescript
interface Ayuda {
  slug: string;           // URL: /area-privada/ayudas/[slug]
  title: string;
  kicker: string;         // Etiqueta (ej. "Convocatoria abierta")
  summary: string;        // Resumen para la tarjeta
  description: string[];  // Párrafos de descripción completa
  deadline: string;       // Fecha límite en texto
  pdfUrl: string | null;  // PDF de bases, en /public/ayudas/
  imageUrl: string | null; // Imagen destacada, en /public/ayudas/
  maxAmount: string | null; // Importe máximo (ej. "10.000 €")
  eligibility: string[];  // Quién puede solicitar
  requirements: string[]; // Documentación requerida
  status: "open" | "closed" | "upcoming";
}
```

**Convocatorias activas (junio 2026):**

| Convocatoria | Slug | Importe | Estado |
|---|---|---|---|
| Convocatoria Familia Fortius 2026 | `familia-fortius-2026` | 10.000 € | Abierta |
| Convocatoria Libertad de Expresión Fortius 2026 | `libertad-expresion-fortius-2026` | 5.000 € | Abierta |

**Para añadir una nueva convocatoria:** editar `src/content/ayudas.ts`, añadir la entrada al array `AYUDAS`, colocar el PDF y la imagen en `public/ayudas/`.

### 6.5 Formulario de solicitud de ayuda

En `/area-privada/ayudas/[slug]#solicitar`. El formulario:
- Recoge: nombre, email, teléfono, organización, importe solicitado, descripción del proyecto y motivación
- Envía notificación interna a `info@fundacionfortius.org`
- Envía confirmación al solicitante
- Implementado en `src/lib/actions/grant.ts` (`submitGrantApplication`)

### 6.6 Formulario de donación

`/donaciones` no procesa pagos directamente. Recoge:
- Nombre y email del donante
- Entidad de destino (Fundación Fortius España / Fortius Foundation United States)
- Proyecto de destino (Free Press Forum, Escuela Hispánica, IEAM, Principios, trabajo general)
- Importe orientativo y notas

La acción `submitDonationInterest` en `src/lib/email/actions.ts`:
- Envía notificación interna con tabla de datos
- Envía confirmación al donante
- Retorna error visible si la notificación interna falla

### 6.7 Formulario de contacto

`/contacto` acepta adjuntos (PDF/DOC/DOCX, máx. 8 MB). El adjunto se envía por email vía Resend sin persistirlo en Storage. El lead siempre se guarda en `contact_submissions` incluso si el email falla.

### 6.8 Blog editorial

Los artículos se definen en `src/content/articles.ts`. Cada artículo tiene:
- `slug` — usado como URL y para derivar la imagen destacada (`/entradas/images/{slug}.png`)
- `title`, `excerpt`, `content`, `author`, `published_at`

Los metadatos visuales (categoría, tema de color) viven en `src/content/article-visuals.ts`. Las imágenes destacadas están en `public/entradas/images/` con el mismo nombre que el slug.

### 6.9 Variables de entorno necesarias

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_SITE_URL=https://fundacionfortius.org
NEXT_PUBLIC_ORG_SLUG=fortius-foundation

RESEND_API_KEY
RESEND_FROM_EMAIL=noreply@fundacionfortius.org   # opcional, tiene default
```

### 6.10 Guía de cambios frecuentes

> Todo el contenido de Foundation vive en archivos de código — **todos los cambios requieren commit + redeploy**.

#### Modificar el equipo (patronato, consejo asesor, equipo ejecutivo)

Archivo único:

```
apps/web-fortius-foundation/src/content/team.ts
```

El archivo exporta tres arrays separados: `PATRONATO`, `CONSEJO_ASESOR` y `EQUIPO`. Cada persona tiene `name`, `role`, `bio`, `image`, `linkedin`. Para añadir una foto nueva, colocar el WebP en `public/equipo/` y apuntar `image` a esa ruta.

#### Añadir o editar un artículo del blog

1. Abrir `apps/web-fortius-foundation/src/content/articles.ts` y añadir o editar el objeto en el array `ARTICLES`
   - Campos: `slug`, `title`, `excerpt`, `content`, `author`, `published_at`, `category`
2. Si el artículo tiene categoría o tema de color específico: añadir la entrada correspondiente en `src/content/article-visuals.ts` (formato `{ slug → { category, colorTheme } }`)
3. Colocar la imagen destacada en `public/entradas/images/{slug}.png` — el nombre de archivo **debe coincidir exactamente con el slug**
4. Commit y redeploy

#### Añadir o editar un proyecto de la incubadora

1. Abrir `apps/web-fortius-foundation/src/content/projects.ts`
2. Añadir o editar el objeto en el array `PROJECTS` — campos: `slug`, `title`, `description`, `status`, `image`, `area`, `impact`
3. Commit y redeploy

#### Añadir o modificar una convocatoria de ayudas

1. Abrir `apps/web-fortius-foundation/src/content/ayudas.ts`
2. Añadir o editar el objeto en el array `AYUDAS`:

| Campo | Descripción |
|---|---|
| `slug` | Identificador único — define la URL `/area-privada/ayudas/{slug}` |
| `title` | Nombre de la convocatoria |
| `kicker` | Etiqueta corta (p. ej. `"Convocatoria abierta"`) |
| `summary` | Resumen para la tarjeta |
| `description` | Array de párrafos con la descripción completa |
| `deadline` | Fecha límite en texto libre |
| `maxAmount` | Importe máximo (p. ej. `"10.000 €"`) o `null` |
| `eligibility` | Array de strings con los criterios de elegibilidad |
| `requirements` | Array de strings con la documentación requerida |
| `status` | `"open"` · `"closed"` · `"upcoming"` |
| `pdfUrl` | Ruta al PDF de bases en `public/ayudas/` o `null` |
| `imageUrl` | Ruta a la imagen en `public/ayudas/` o `null` |

3. Si hay PDF o imagen: colocarlos en `public/ayudas/` y actualizar `pdfUrl` / `imageUrl`
4. Commit y redeploy

---

## 7. Servicios e infraestructura externa

### 7.1 Supabase

- **Proyecto único** compartido por las cuatro apps
- Auth (email/password + magic links + invitaciones)
- Base de datos PostgreSQL con RLS
- Storage (tres buckets: `content-media`, `library-docs`, `postulaciones`)
- Realtime (no usado actualmente)

**Acceso admin:** Supabase Dashboard → proyecto Fortius

### 7.2 Stripe

Usado exclusivamente por **Escuela Hispánica** y **Fortius Consulting**.

- EH: tres tiers de membresía con checkouts diferenciados
- Consulting: suscripción que provee el acceso al área privada (provisioning vía webhook)
- Los webhooks se procesan de forma idempotente: si el mismo evento llega dos veces, el estado final es el mismo
- Los eventos Stripe se registran en la tabla `stripe_events`

### 7.3 Resend

Proveedor de email transaccional usado por todas las apps. Un único `RESEND_API_KEY` puede servir a todas desde el mismo dominio de envío, o usar dominios separados por app.

Todos los envíos de email quedan registrados en `communication_logs` en Supabase (éxito o fallo).

### 7.4 Vercel

Cada app se despliega como un proyecto independiente en Vercel conectado a la rama `main` del monorepo. El archivo `turbo.json` en la raíz declara todas las variables de entorno necesarias en `globalEnv` para que Turborepo las considere al hacer caché de builds.

**Notas de despliegue:**
- `.npmrc` debe contener `node-linker=hoisted` para binarios nativos
- `metadataBase` debe ser `process.env.NEXT_PUBLIC_SITE_URL` en los layouts

---

## 8. Variables de entorno por aplicación

### Variables compartidas (todas las apps)

```
NEXT_PUBLIC_SUPABASE_URL          # URL del proyecto Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY     # Clave pública anon
SUPABASE_SERVICE_ROLE_KEY         # Clave de servicio (solo servidor)
NEXT_PUBLIC_SITE_URL              # URL canónica de la app
RESEND_API_KEY                    # Clave de Resend
```

### Escuela Hispánica (adicionales)

```
NEXT_PUBLIC_ORG_SLUG=escuela-hispanica
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_PRICE_ACADEMICO_MONTHLY
STRIPE_PRICE_ACADEMICO_ANNUAL
STRIPE_PRICE_MECENAS_ANNUAL
STRIPE_PRICE_AMIGO_MONTHLY
APPROVAL_SECRET
APPROVER_EMAIL
```

### IEAM (adicionales)

```
# Sin variables adicionales más allá de las compartidas
```

### Fortius Consulting (adicionales)

```
RESEND_FROM_EMAIL=noreply@fortiusconsulting.org
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
ADMIN_UPLOAD_SECRET
NEXT_PUBLIC_UPLOAD_SECRET
```

### Fortius Foundation (adicionales)

```
NEXT_PUBLIC_ORG_SLUG=fortius-foundation
RESEND_FROM_EMAIL=noreply@fundacionfortius.org
```

---

## 9. Base de datos — modelo y tablas clave

Todas las tablas de contenido y membresía incluyen `organization_id` para el aislamiento multi-tenant. RLS habilitado en todas.

### Tablas de identidad y acceso

| Tabla | Descripción |
|---|---|
| `organizations` | Cada producto es una organización (`slug`, `domain`, `name`) |
| `user_profiles` | Perfil de cada usuario (`full_name`, `avatar_url`) |
| `user_memberships` | Relación usuario ↔ organización + rol + estado |

**Roles válidos en `user_memberships`:**
`member`, `editor`, `admin`, `super_admin`, `consultant`, `beneficiario`, `donante`

### Tablas de negocio

| Tabla | Descripción |
|---|---|
| `membership_plans` | Planes disponibles por organización |
| `subscriptions` | Suscripciones activas (vinculadas a Stripe) |
| `payment_history` | Historial de pagos completados |
| `stripe_events` | Eventos Stripe recibidos (idempotencia) |

### Tablas de contenido

| Tabla | Descripción |
|---|---|
| `articles` | Artículos y análisis (multiidioma) con `materials` JSONB |
| `activities` | Eventos y actividades |

### Tablas de formularios y comunicación

| Tabla | Descripción |
|---|---|
| `contact_submissions` | Envíos de formularios de contacto |
| `newsletter_subscriptions` | Suscripciones al boletín |
| `communication_logs` | Log de todos los emails enviados (éxito/fallo) |

### Migraciones SQL

Todas las migraciones están versionadas en `supabase/migrations/` con el formato `YYYYMMDDHHMMSS_descripcion.sql`. Deben aplicarse en orden cronológico antes de desplegar código que dependa de ellas.

**Migración crítica reciente:**
- `20260629000000_foundation_roles.sql` — amplía el CHECK constraint de `user_memberships.role` para incluir `beneficiario` y `donante`. Debe estar aplicada en producción antes de desplegar el área privada de Foundation.

---

## 10. Estado general y próximas etapas

### Estado por app (junio 2026)

| App | Producción | Auth | Pagos | CMS | Área privada |
|---|---|---|---|---|---|
| Escuela Hispánica | ✅ | ✅ | ✅ Stripe | ✅ Admin | ✅ Miembros |
| IEAM | ✅ | ✅ | — | ✅ CMS completo | — |
| Fortius Consulting | ✅ | ✅ | ✅ Stripe | Parcial | ✅ Roles |
| Fortius Foundation | ✅ | ✅ | — (intención) | — | ✅ Roles |

### Pendientes técnicos priorizados

#### Todos los productos
- [ ] Migrar `postulaciones` a bucket privado y servir CVs con signed URLs (privacidad)
- [ ] Revisar RLS policies en todos los entornos antes de escalar

#### Escuela Hispánica
- [ ] Reducir dependencia de `src/lib/mock-data/` — migrar contenido editorial a Supabase
- [ ] Documentar proceso de aprobación académica para el equipo no técnico

#### IEAM
- [ ] Subir los PDFs de `public/docs/` a `library-docs/ieam/` en Supabase Storage
- [ ] Añadir `FileUpload` al CMS para nuevos documentos descargables
- [ ] Migrar `middleware.ts` → `proxy.ts` (aviso en build, no bloquea)
- [ ] Añadir 3 miembros nuevos del equipo y 1 artículo nuevo a mock-data

#### Fortius Consulting
- [ ] Mover `mammoth` y `turndown` a `dependencies` para activar herramienta de artículos en producción
- [ ] Migrar contenido editorial público (`src/content/`) a CMS en Supabase (Fase 4)
- [ ] Endurecer gate de contenido exclusivo a nivel servidor (Fase 4)

#### Fortius Foundation
- [ ] Decidir si blog, incubadora y ayudas migrarán a Supabase (hoy son archivos locales)
- [ ] Activar checkout de donaciones (Stripe) cuando se confirme la estructura legal
- [ ] Crear roles `donante` y `admin` desde panel o migración para los usuarios correspondientes

### Contenido que vive en código (no en base de datos)

| App | Contenido local |
|---|---|
| EH | Publicaciones, recursos, actividades (mock-data) |
| IEAM | Equipo, institución (mock-data) |
| Consulting | Home, equipo, expertos, publicaciones (`src/content/*.ts`) |
| Foundation | Blog, equipo, incubadora, ayudas (`src/content/*.ts`) |

Cualquier cambio en este contenido requiere editar el archivo correspondiente y hacer un nuevo despliegue.

---

*Manual generado a partir del estado real del repositorio y la infraestructura en junio 2026. Para dudas técnicas, consultar los README de cada app o el archivo `CLAUDE.md` en la raíz del monorepo.*
