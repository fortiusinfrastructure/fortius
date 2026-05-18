# web-escuela-hispanica

Aplicación principal de **Escuela Hispánica** dentro del ecosistema Fortius.
Es la app más operativa del monorepo: combina sitio público multilingüe,
membresías, autenticación, eventos, checkout con Stripe, email transaccional y
panel interno de gestión.

## Estado general

- **Build verificado:** `pnpm --filter web-escuela-hispanica build` ✅
- **Idiomas activos:** español, inglés y portugués
- **i18n:** `next-intl`
- **Estado funcional:** producción operativa con backend real sobre Supabase

## Qué ofrece hoy

- sitio público multilingüe bajo `src/app/[locale]`
- rutas públicas de:
  - `nosotros`
  - `proyectos`
  - `publicaciones`
  - `recursos`
  - `actividades`
  - `colabora`
  - `contacto`
  - legales
- autenticación en:
  - `/auth/login`
  - `/auth/register`
- rutas protegidas de miembros
- panel admin en `/admin` con módulos de:
  - miembros
  - eventos
  - comunicaciones
- checkout con Stripe para distintos tiers y pagos
- webhooks y sincronización de suscripciones, pagos y accesos
- correo transaccional y trazabilidad de comunicaciones

## Stack actual

- **Next.js 16** con App Router
- **React 19**
- **Tailwind CSS v4**
- **next-intl**
- **Supabase** para auth, datos y panel admin
- **Stripe** para checkout y suscripciones
- **Resend** para email transaccional
- `@fortius/database` como paquete compartido del monorepo

## Comandos

Desde `fortius/apps/web-escuela-hispanica/`:

```bash
pnpm dev
pnpm build
pnpm lint
pnpm check-types
```

Desde la raíz:

```bash
pnpm --filter web-escuela-hispanica dev
pnpm --filter web-escuela-hispanica build
```

## Estructura principal

```text
src/
├── app/
│   ├── [locale]/            # Sitio público con i18n
│   ├── admin/               # Panel interno de gestión
│   ├── api/                 # Checkout, webhooks y rutas seguras
│   └── globals.css          # Base visual Tailwind
├── components/              # UI pública, formularios y admin
├── i18n/                    # Routing y config de next-intl
├── lib/
│   ├── admin/               # Queries y acciones del panel
│   ├── auth/                # Acceso y sesiones
│   ├── email/               # Envío y logging de emails
│   ├── mock-data/           # Capa editorial transicional
│   ├── stripe/              # Integración Stripe
│   └── supabase/            # Helpers de cliente/servidor
├── messages/                # Diccionarios es/en/pt
└── proxy.ts                 # Middleware de i18n + auth
```

## Backend compartido y multi-tenencia

Escuela Hispánica comparte backend con el resto del monorepo mediante Supabase.
El aislamiento entre organizaciones se resuelve por `organization_id`.

Esto se ve especialmente en:

- `src/lib/admin/org.ts`, que resuelve `escuela-hispanica`
- `src/lib/admin/auth.ts`, que valida membresías y roles
- rutas de pago y webhooks que sincronizan estado de negocio

## Qué ya está conectado a Supabase

La integración real ya cubre:

- autenticación y sesión
- membresías y roles
- panel admin
- eventos e inscripciones
- webhooks de Stripe
- sincronización de `subscriptions`, `payment_history` y trazabilidad operativa
- logs de comunicaciones por email

## Estado del contenido

La app sigue en estado **híbrido**:

- parte del negocio ya vive plenamente en Supabase
- todavía existe `src/lib/mock-data` como capa editorial transicional
- cualquier migración futura debe respetar la operación actual de membresías, cobros, admin y contenido

## Variables y entorno importantes

### Supabase

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Stripe

- claves de checkout y precios por tier
- secreto del webhook de Stripe

### Email

- `RESEND_API_KEY`
- remitente configurado para correo transaccional

## Rutas y módulos que conviene conocer

- `src/app/[locale]`: navegación pública por idioma
- `src/app/admin`: operación interna
- `src/app/api/webhooks/stripe`: conciliación y actualización de pagos
- `src/lib/auth/actions.ts`: `signIn`, `signUp`, `signOut`
- `src/lib/admin/*`: consultas y acciones del dashboard
- `src/lib/mock-data/*`: contenido heredado o pendiente de migración

## Próxima etapa natural

- seguir reduciendo la dependencia de `mock-data`
- mantener la coherencia entre flujos editoriales y flujos de membresía/pago
- documentar mejor cualquier nueva integración para no romper la parte operativa

## Notas para desarrollo

- Si el cambio toca negocio, confirma primero si la fuente de verdad está en Supabase o en `mock-data`.
- Si el cambio toca el panel, revisa siempre el filtro por `organization_id`.
- Si el cambio toca copy o navegación, revisa también `src/messages/{es,en,pt}.json`.
- Antes de introducir una integración nueva, comprueba si ya existe una utilidad equivalente en `@fortius/database` o `src/lib/*`.