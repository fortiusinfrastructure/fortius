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
