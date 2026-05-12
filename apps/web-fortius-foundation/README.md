# web-fortius-foundation

Sitio institucional de **Fortius Foundation**, concebido como la capa digital de
una fundación orientada al grant-making, la incubación de iniciativas y el
fortalecimiento de la sociedad civil.

## Stack actual

- **Next.js 16** con App Router.
- **Tailwind CSS v4**.
- Identidad visual editorial mediante `data-brand="foundation"`.
- Arquitectura simple y enfocada en contenido institucional.

> Estado actual: esta app **no usa `next-intl` todavía**. Comparte base técnica
> y lenguaje visual con el resto del monorepo, pero hoy se publica en español.

## Comandos

Desde `fortius/apps/web-fortius-foundation/`:

```bash
pnpm dev
pnpm build
pnpm lint
pnpm check-types
```

`pnpm dev` arranca por defecto en el puerto `3002`.

Desde la raíz del monorepo:

```bash
pnpm --filter web-fortius-foundation dev
```

## Estructura principal

```text
src/
├── app/
│   ├── (foundation)/        # Home y páginas institucionales
│   └── globals.css          # Tailwind v4 + tokens visuales de marca
├── components/
│   ├── foundation/          # Hero, teasers, CTA, navegación y bloques de marca
│   └── system/              # Utilidades visuales compartidas
└── content/
    ├── impact.ts            # Narrativa de impacto
    ├── projects.ts          # Incubadora y casos de éxito
    └── team.ts              # Patronato, consejo asesor y equipo
```

## Relación con el ecosistema Fortius

Fortius Foundation forma parte del mismo monorepo que IEAM, Escuela Hispánica y
Fortius Consulting. Eso facilita compartir:

- criterios de diseño editorial;
- convenciones de desarrollo;
- paquetes comunes;
- futura integración sobre un backend unificado en Supabase.

Además, la propia narrativa de la fundación conecta con otras organizaciones del
ecosistema, como `IEAM` y `Escuela Hispánica`, ya visibles en `src/content/projects.ts`.

## Estado backend y contenido

La app se encuentra en una fase **institucional/editorial**:

- el contenido vive hoy en archivos `src/content/*.ts`;
- no depende todavía de tablas activas de Supabase en runtime;
- la migración al backend compartido sigue pendiente.

Cuando llegue esa integración, deberá respetar el mismo modelo de aislamiento por
`organization_id` que ya usan las apps conectadas al backend común.

## Estado de migración

- **Hoy:** contenido estático, estable y fácil de iterar.
- **Más adelante:** convergencia hacia Supabase para proyectos, ayudas,
  newsletter o flujos institucionales que requieran persistencia.

## Notas para nuevos desarrolladores

- Empieza por `src/app/(foundation)` para entender la navegación pública.
- Usa `src/components/foundation` para mantener coherencia visual y narrativa.
- Si introduces datos dinámicos, deja claro en la documentación qué sigue siendo
  contenido editorial local y qué pasa a depender del backend compartido.
