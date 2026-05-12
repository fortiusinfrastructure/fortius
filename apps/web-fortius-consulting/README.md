# web-fortius-consulting

Sitio corporativo de **Fortius Consulting** dentro del ecosistema digital Fortius.
La aplicación prioriza una presencia editorial sobria, estratégica y de alta
legibilidad, alineada con el **Premium Editorial Design System** compartido.

## Stack actual

- **Next.js 16** con App Router.
- **Tailwind CSS v4**.
- Tipografía y branding editorial vía `data-brand="consulting"`.
- Dependencias compartidas del monorepo (`@fortius/database`, `@fortius/ui`).

> Estado actual: esta app **no usa `next-intl` todavía**. Hoy opera en español,
> con `lang="es"`, mientras mantiene compatibilidad arquitectónica con el resto
> del ecosistema Fortius.

## Comandos

Desde `fortius/apps/web-fortius-consulting/`:

```bash
pnpm dev
pnpm build
pnpm lint
pnpm check-types
```

Desde la raíz del monorepo:

```bash
pnpm --filter web-fortius-consulting dev
```

## Estructura recomendada para orientarse

```text
src/
├── app/
│   ├── (consulting)/        # Sitio público: home, nosotros, política, sociedad civil, contacto
│   ├── (private)/           # Área privada / dashboard
│   ├── lab/                 # Laboratorio de diseño y prototipos
│   └── globals.css          # Tokens visuales y base Tailwind v4
├── components/
│   ├── consulting-v2/       # Componentes editoriales principales
│   ├── shared/              # Piezas compartidas de layout
│   └── system/              # Utilidades de interfaz
├── content/                 # Fuente actual de contenido estático
└── lib/
    ├── actions/             # Acciones de servidor específicas
    └── auth.ts              # Estado actual: auth mock para el MVP
```

## Contenido y backend compartido

La app ya vive dentro del monorepo Fortius y puede reutilizar paquetes comunes,
pero su estado actual es principalmente **frontend/editorial**:

- el contenido de negocio vive en `src/content/*.ts`;
- el área privada usa un usuario simulado en `src/lib/auth.ts`;
- la integración runtime con Supabase todavía no es la fuente principal del sitio.

Esto significa que, por ahora, `web-fortius-consulting` está preparada para
converger con el backend compartido, pero aún no opera con el mismo nivel de
persistencia que Escuela Hispánica o IEAM.

## Cómo encaja en la arquitectura Fortius

Cuando esta app consuma datos del backend compartido, deberá seguir el mismo
patrón que el resto del ecosistema:

- aislamiento por `organization_id`;
- acceso tipado y centralizado desde `@fortius/database`;
- separación entre acceso con sesión y acceso admin según el caso de uso.

## Estado de migración

- **Hoy:** contenido local en `src/content` y flujos mock para la parte privada.
- **Siguiente etapa natural:** mover contenido estructurado y accesos de clientes
  al backend compartido en Supabase.

## Notas para nuevos desarrolladores

- Empieza por `src/app/(consulting)` si vas a tocar páginas públicas.
- Usa `src/components/consulting-v2` si el cambio afecta la capa editorial actual.
- Revisa `src/app/lab` antes de rehacer una variante visual: suele haber pruebas
  de diseño o componentes en exploración.
- Si vas a sustituir contenido estático por datos reales, documenta claramente la
  transición para no mezclar contenido local con contenido remoto sin criterio.
