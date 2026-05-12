# web-escuela-hispanica

Aplicación principal de **Escuela Hispánica** dentro del ecosistema Fortius.
Combina sitio editorial, captación de comunidad, membresías, eventos, pagos y
panel interno de gestión sobre una misma base técnica.

## Stack actual

- **Next.js 16** con App Router.
- **Tailwind CSS v4**.
- **next-intl** para `es`, `en` y `pt`.
- **Supabase** como backend compartido para auth, datos y panel admin.
- **Stripe** para checkout y suscripciones.
- **Resend** para correo transaccional.

## Comandos

Desde `fortius/apps/web-escuela-hispanica/`:

```bash
pnpm dev
pnpm build
pnpm lint
pnpm check-types
```

Desde la raíz del monorepo:

```bash
pnpm --filter web-escuela-hispanica dev
```

## Estructura principal

```text
src/
├── app/
│   ├── [locale]/            # Sitio público con i18n
│   ├── admin/               # Panel interno de gestión
│   ├── api/                 # Checkout, webhooks, aprobaciones y rutas seguras
│   └── globals.css          # Base visual Tailwind v4
├── components/              # UI pública, formularios, secciones y admin
├── i18n/                    # Routing y config de next-intl
├── lib/
│   ├── admin/               # Queries y acciones del panel
│   ├── auth/                # Server Actions de acceso
│   ├── email/               # Envío de correos
│   ├── mock-data/           # Capa transicional de contenido
│   ├── stripe/              # Integración Stripe y sincronización
│   └── supabase/            # Helpers de cliente y servidor
├── messages/                # Diccionarios es/en/pt
└── proxy.ts                 # Middleware de internacionalización
```

## Backend compartido y multi-tenencia

Escuela Hispánica comparte backend con el resto del monorepo mediante Supabase.
El aislamiento entre organizaciones se resuelve por `organization_id`.

En esta app eso se ve, por ejemplo, en:

- `src/lib/admin/org.ts`, que resuelve la organización `escuela-hispanica`;
- `src/lib/admin/auth.ts`, que valida membresía activa en `user_memberships`;
- rutas de pago y webhooks, que sincronizan estado de negocio en tablas compartidas.

## Qué ya está conectado a Supabase

La integración real con backend ya cubre varias capas críticas:

- autenticación y sesión;
- membresías y roles;
- panel admin;
- eventos y registros;
- webhooks de Stripe;
- sincronización de `subscriptions`, `payment_history` y otros registros operativos.

## Estado de migración del contenido

La app está en estado **híbrido**:

- parte de la operación ya vive plenamente en Supabase;
- todavía existe `src/lib/mock-data` como capa editorial transicional;
- la migración total debe hacerse sin romper los flujos actuales de membresía,
  cobro, admin y contenido.

En otras palabras: no asumas que todo el sitio es ya 100% dinámico ni que todo
el contenido sigue siendo estático. Conviven ambas capas.

## Rutas y módulos que conviene conocer

- `src/app/[locale]`: navegación pública por idioma.
- `src/app/admin`: operación interna.
- `src/app/api/webhooks/stripe`: conciliación y actualización de pagos.
- `src/lib/auth/actions.ts`: `signIn`, `signUp`, `signOut`.
- `src/lib/admin/*`: consultas y acciones del dashboard.
- `src/lib/mock-data/*`: contenido heredado o todavía no migrado.

## Notas para nuevos desarrolladores

- Si el cambio toca negocio, comprueba primero si la fuente de verdad está en
  Supabase o en `mock-data`.
- Si el cambio toca el panel, revisa siempre el filtro por `organization_id`.
- Si el cambio toca navegación o copy, confirma también los mensajes en
  `src/messages/{es,en,pt}.json`.
- Antes de introducir una nueva integración, comprueba si ya existe una utilidad
  equivalente en `@fortius/database` o en `src/lib/*`.
