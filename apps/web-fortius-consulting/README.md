# web-fortius-consulting

Sitio corporativo y editorial de **Fortius Consulting** dentro del monorepo
Fortius. La app mezcla presencia institucional, piezas de análisis, un pequeño
laboratorio visual y un **área privada conectada a Supabase + Stripe** con
acceso por roles (`super_admin`, `consultant`, `member`).

## Estado general

- **Build verificado:** `pnpm --filter web-fortius-consulting build` ✅
- **Idioma actual:** español (`lang="es"`)
- **i18n:** esta app **todavía no usa `next-intl`**
- **Estado funcional:** frontend sólido + contacto persistente + área privada
  con auth Supabase, RLS y provisión de cuentas vía webhook de Stripe

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
- área privada en `/area-privada` con dashboards diferenciados por rol y
  contenido exclusivo gateado por suscripción Stripe (ver sección abajo)
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
│   ├── (private)/           # Área privada (auth Supabase + Stripe)
│   ├── lab/                 # Prototipos y variantes visuales
│   └── globals.css          # Tokens y base visual
├── components/
│   ├── consulting-v2/       # Sistema editorial principal
│   ├── shared/              # Header, footer, layout
│   └── system/              # Utilidades pequeñas
├── content/                 # Fuente actual de contenido local
└── lib/
    ├── actions/             # Server actions, incluido contacto
    ├── auth/actions.ts      # signIn, signOut, requestPasswordReset
    ├── auth.ts              # requirePrivateUser() — sesión + membership
    ├── email.ts             # Notificación interna por Resend
    ├── private/queries.ts   # Lecturas para /area-privada (RLS)
    └── stripe/              # Webhook handlers + subscription sync
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

## Área privada (`/area-privada`)

### Modelo de acceso — invitación, no auto-registro

**No existe registro público.** Toda cuenta de cliente se crea a partir de un
pago verificado en Stripe. El flujo es:

```
1. Cliente compra plan en sitio público (Stripe Checkout)
2. Stripe dispara webhook → /api/webhooks/stripe
3. El handler (src/lib/stripe/*) hace:
   - resuelve usuario por email; si no existe, lanza
     supabase.auth.admin.inviteUserByEmail(email, {
       redirectTo: '/nueva-contrasena',
       data: { full_name: customer_details.name }
     })
   - upsert de subscription en Supabase (subscription-sync.ts)
   - crea user_memberships con role='member' y tier según el price_id
4. El usuario recibe email de invitación de Supabase, hace clic
   y aterriza en /nueva-contrasena con #access_token&type=invite
5. NuevaContrasenaForm parsea el hash, llama setSession y
   updateUser({ password }); al guardar redirige a
   /login?activated=ok (banner verde de bienvenida)
```

Consecuencias prácticas:

- `/registro` ya no existe como formulario. La ruta sigue accesible pero hace
  un `redirect('/login')` server-side (preserva `?redirect=` si venía con uno).
- El enlace "Crear cuenta" fue removido de `LoginForm.tsx`.
- La server action `signUp` en `src/lib/auth/actions.ts` está deshabilitada y
  devuelve `{ error: 'Registro deshabilitado' }` ante cualquier POST directo.
- Si alguien intenta registrarse manualmente sin haber pagado, no hay camino.

### Roles y dashboards

`requirePrivateUser()` carga la sesión + `user_memberships.role` para
`organization_id = 'fortius-consulting'` y entrega el rol al servidor. La
página `/area-privada/page.tsx` despacha a una de tres vistas:

| Rol | Vista | Qué ve |
|-----|-------|--------|
| `super_admin` | `SuperAdminDashboard` | KPIs globales, lista de clientes, acceso a CMS |
| `consultant` | `ConsultantDashboard` | Proyectos que tiene asignados como `consultant_user_id` |
| `member` | `DashboardClient` | Sus proyectos, equipo asignado, contenido y eventos |

Las queries de cliente (`src/lib/private/queries.ts`) usan `createServerClient()`
para que RLS controle visibilidad: un `member` solo ve sus filas, un
`consultant` solo las suyas, y `super_admin` ve todo gracias a políticas que
chequean su rol.

### Gating por suscripción Stripe (Fase 3 — completa)

`DashboardClient` calcula `hasActiveSubscription` a partir de
`data.subscription.stripeStatus`:

```ts
hasActiveSubscription =
    stripeStatus === "active" ||
    stripeStatus === "trialing" ||
    (stripeStatus === null && data.status === "active");
```

Cuando es `false`, las secciones "Contenido Exclusivo" y "Oportunidades &
Eventos" se renderizan **borrosas, sin interacción y con `aria-hidden`**, y
encima se superpone una tarjeta con:

- icono `Lock`
- mensaje contextual:
  - si `stripeStatus === 'past_due'` → "Pago pendiente" + "Regularizar pago"
  - en otro caso → "Suscripción inactiva" + "Reactivar suscripción"
- CTA que enlaza a `/area-privada/cuenta#suscripcion`

El resto del dashboard (saludo, tarjeta de plan, equipo asignado, proyectos)
sigue accesible para que el cliente vea el estado de su contrato aunque la
suscripción haya caído. El badge de la tarjeta de plan también pasa a "Activa"
para `trialing`, no solo `active`.

## Qué sigue siendo local

- el contenido editorial público sigue en `src/content/*.ts` (home, team,
  expertos). Migrarlo a Supabase entra en la Fase 4 (CMS).

## Próxima etapa natural

- **Fase 4** — CMS de artículos compartiendo `ArticleEditor` de `@fortius/admin-ui`
- **Fase 5** — endurecer subidas de medios (server-side upload + RLS)

## Bitácora de decisiones

Registro de decisiones arquitectónicas y su razonamiento, en orden cronológico
inverso (lo más reciente arriba).

### 2026-06 — Provisioning invite-only afinado (Fase 3.5)

**Decisión.** Tres cambios coordinados en el flujo post-checkout:

1. El webhook (`/api/webhooks/stripe`) ahora pasa `customer_details.name` de la
   sesión de Stripe a `resolveOrInviteUser`. El nombre se manda como
   `user_metadata.full_name` al `inviteUserByEmail` (lo recoge el trigger
   `on_auth_user_created` que siembra `user_profiles.full_name`). Si el usuario
   ya existe y su `user_profiles.full_name` está vacío, se rellena.
2. El `redirectTo` del invite pasa de `/api/auth/callback` a `/nueva-contrasena`.
   Los invites de Supabase devuelven los tokens en el hash (`#access_token=…&type=invite`),
   no como `?code=…`. El callback PKCE no los procesa y mandaba al usuario a
   `/login?error=auth`.
3. `NuevaContrasenaForm` ahora acepta `type === 'invite'` además de
   `recovery`. Después de guardar, redirige a `/login?activated=ok` (vs.
   `?reset=ok`), y `LoginForm` muestra un banner verde correspondiente.

**Razonamiento.** Antes, el cliente que pagaba por primera vez recibía el correo
de Supabase, hacía clic, y caía en una página de error. Además, su perfil
quedaba sin nombre — lo que hacía que el dashboard del consultor mostrase
"Sin nombre" en la tarjeta "Equipo asignado" (ver Fase 2.9). Reusar el formulario
de recuperación (en lugar de crear `/activar-cuenta` aparte) ahorra superficie
y reusa la lógica `setSession` + `updateUser` que ya estaba probada.

**Trade-off aceptado.** El título de la página sigue diciendo "Nueva contraseña"
incluso para invites. Es genérico pero correcto (el usuario está creando una
contraseña), y evita ramificar `page.tsx` por flow.

### 2026-06 — Diego super_admin (migración)

**Decisión.** Nueva migración `20260622000000_consulting_diego_super_admin.sql`
asigna `super_admin` a `diego@fortiusconsulting.org` con el mismo patrón
defensivo de `20260620000200_consulting_team_seed.sql` (`DO $$ … END $$;` con
lookups por slug y email y `RAISE NOTICE` si falta algo).

**Razonamiento.** Diego necesita ver el área privada desde la perspectiva de
admin para validar cambios. Una migración versionada (vs. SQL manual) deja
huella en el repo y se replica automáticamente en cualquier entorno.

### 2026-06 — Gate de suscripción Stripe en el dashboard del member (Fase 3)

**Decisión.** "Contenido Exclusivo" y "Oportunidades & Eventos" se bloquean
con overlay + CTA cuando `stripeStatus` no es `active` ni `trialing`. El
contenido sigue visible (blureado, sin interacción) en lugar de eliminarse del
DOM. El mensaje cambia entre `past_due` y otros estados.

**Razonamiento.** El membership y la suscripción son piezas distintas en BD:
un `member` puede tener membership `active` con suscripción `canceled` o
`past_due`. Mostrar todo igual era una fuga del producto. Dejarlo blureado
(no oculto) refuerza el upsell — el cliente ve lo que tiene en pausa, y la
fricción del CTA es mínima. `past_due` recibe copy específico porque el
problema es operativo (tarjeta) y no comercial (no quiere renovar).

**Trade-off aceptado.** El contenido se sigue enviando al cliente (es solo
visual). No es un gate de seguridad — quien fuerce el DOM puede leerlo. Para
contenido realmente sensible se hará gate del lado servidor en Fase 4.

### 2026-06 — Cierre de signup público (Nivel C)

**Decisión.** Eliminar todo camino de auto-registro. El enlace "Crear cuenta"
desaparece del login, `/registro` redirige a `/login`, y la server action
`signUp` devuelve error.

**Razonamiento.** Un cliente sin suscripción activa no debería poder crear
cuenta — el contrato del área privada asume que existe pago verificado. Dejar
signup abierto creaba usuarios huérfanos que rompían el modelo y daban una
puerta sin propósito. La provisión va siempre por el webhook de Stripe.

**Trade-off aceptado.** Si el webhook falla, el usuario queda bloqueado hasta
que un admin lo invite manualmente. Es preferible a admitir cuentas sin pago.

### 2026-06 — Equipo asignado derivado de proyectos reales (Fase 2.9)

**Decisión.** En `DashboardClient`, la sección "Equipo Asignado" deja de
filtrar `TEAM` hardcoded y pasa a derivar consultores desde
`projects[].consultantUserId/Name`, deduplicando y enriqueciendo con
metadatos estáticos (foto, LinkedIn) por match de nombre normalizado.

**Razonamiento.** Antes mostraba a Juan y Beatriz a todos los clientes,
independientemente de quién tuviera realmente el proyecto. Ahora cada cliente
ve a su(s) consultor(es) real(es) de BD. Cuando hay match con `team.ts` la
card se enriquece visualmente; cuando no, sigue funcional con datos mínimos.

### 2026-06 — Dashboards diferenciados por rol (Fase 2.6 → 2.8)

**Decisión.** Separar `/area-privada` en tres vistas (`super_admin`,
`consultant`, `member`) con dispatching en el server component raíz.

**Razonamiento.** Staff interno y cliente final tienen información,
permisos y CTAs completamente distintos. Forzarlos en una sola vista
condicional volvía el cliente lento y mezclaba responsabilidades. Separar
también facilita iterar el dashboard de cada audiencia sin riesgo cruzado.

### 2026-06 — RLS por `consultant_user_id` para asignación de proyectos

**Decisión.** Añadir política de Supabase que permite a un `consultant` leer
proyectos donde su `auth.uid()` coincide con `consultant_user_id`, además del
acceso por `client_user_id` que tenía el `member`.

**Razonamiento.** Reutilizar la misma tabla `projects` para ambos lados (la
relación cliente↔consultor ya está en una sola fila) en lugar de duplicar
datos en tablas paralelas. La RLS hace el trabajo de visibilidad sin que la
app tenga que filtrar manualmente.

## Notas para desarrollo

- Empieza por `src/app/(consulting)` si el cambio es público.
- Usa `src/components/consulting-v2` si afecta la capa editorial actual.
- Revisa `src/app/lab` antes de rehacer variantes visuales.
- Si conviertes contenido local en datos remotos, documenta claramente la transición.
- Esta app **no usa `next-intl`** ni `proxy.ts`/`middleware.ts`; el router de Next.js es estándar.
