# web-fortius-foundation

Sitio institucional y editorial de **Fortius Foundation**. Hoy combina narrativa
institucional, incubadora, ayudas, blog, contacto y donaciones dentro de una
misma app sencilla de Next.js.

## Estado general

- **Build verificado:** `pnpm --filter web-fortius-foundation build` ✅
- **Idioma actual:** español (`lang="es"`)
- **i18n:** esta app **todavía no usa `next-intl`**
- **Estado funcional:** rediseño editorial principal ya aplicado + contacto y donaciones persistentes

## Qué ofrece hoy

- home editorial por bloques
- páginas públicas de:
  - `/nosotros`
  - `/incubadora`
  - `/ayudas`
  - `/blog` y `/blog/[slug]`
  - `/contacto`
  - `/donaciones`
  - `/area-privada`
  - legales (`/legal`, `/privacidad`, `/cookies`)
- contenido institucional desde `src/content/*.ts`
- blog cargado desde `src/content/articles.ts`
- incubadora y casos de éxito desde `src/content/projects.ts`
- formulario real de contacto
- formulario de intención de donación reutilizando el backend de contacto

## Stack actual

- **Next.js 16** con App Router
- **React 19**
- **Tailwind CSS v4**
- `framer-motion` y `lucide-react`
- branding editorial con `data-brand="foundation"`
- acciones de servidor con Supabase + Resend para contacto/donaciones

## Comandos

Desde `fortius/apps/web-fortius-foundation/`:

```bash
pnpm dev
pnpm build
pnpm lint
pnpm check-types
```

`pnpm dev` arranca por defecto en el puerto `3002`.

Desde la raíz:

```bash
pnpm --filter web-fortius-foundation dev
pnpm --filter web-fortius-foundation build
```

## Estructura principal

```text
src/
├── app/
│   ├── (foundation)/        # Sitio público completo
│   └── globals.css          # Tokens visuales y base Tailwind
├── components/
│   ├── foundation/          # Navegación, formularios, bloques editoriales
│   └── system/              # Utilidades visuales compartidas
├── content/
│   ├── articles.ts          # Blog local
│   ├── legal.ts             # Textos legales
│   ├── projects.ts          # Incubadora y casos de éxito
│   ├── site.ts              # Configuración institucional
│   └── team.ts              # Patronato, consejo y equipo
└── lib/
    ├── actions/contact.ts   # Persistencia de contacto y donación
    ├── articles.ts          # Utilidades del blog
    └── email.ts             # Lookup de organización + Resend + logs
```

## Contacto y donaciones

### Contacto

La página `/contacto`:

- guarda envíos en `contact_submissions`
- intenta notificar a `info@fundacionfortius.org`
- registra el resultado en `communication_logs`
- protege el lead aunque el email falle

### Donaciones

La página `/donaciones` hoy no procesa pagos directamente. Lo que hace es:

- explicar ventajas fiscales en España y EE. UU.
- recoger intención de donación
- permitir elegir entidad (`España` / `United States`)
- permitir elegir destino (`Free Press Forum`, `Escuela Hispánica`, `IEAM`, `Principios`, `trabajo general`)
- reutilizar el mismo backend de contacto para registrar la solicitud

## Variables necesarias para esos flujos

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`

## Qué sigue siendo local

- narrativa institucional en `src/content/site.ts`
- equipo en `src/content/team.ts`
- blog en `src/content/articles.ts`
- incubadora y casos de éxito en `src/content/projects.ts`

Es decir: la app ya tiene **persistencia para formularios**, pero no ha migrado
su contenido principal al backend compartido.

## Próxima etapa natural

- decidir si blog, incubadora, ayudas y newsletter migrarán a Supabase
- activar pruebas runtime completas del email con las keys pendientes
- añadir RRSS reales cuando estén confirmadas

## Notas para desarrollo

- Empieza por `src/app/(foundation)` para entender la navegación pública.
- Usa `src/components/foundation` para mantener la coherencia del sistema editorial.
- Si introduces datos dinámicos, documenta qué deja de ser contenido local.
- Esta app **no usa `next-intl`** ni `proxy.ts`/`middleware.ts`; el router de Next.js es estándar.
