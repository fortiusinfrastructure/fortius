---
name: turborepo-monorepo
description: Conventions and patterns for working within the Fortius Turborepo monorepo
---

# Turborepo Monorepo Skill

## Architecture Overview

The Fortius ecosystem uses a **Turborepo monorepo** with `pnpm` workspaces. The structure follows a Hub & Spoke model:

- **`apps/`** — Deployable Next.js applications (one per brand)
- **`packages/`** — Shared libraries consumed by apps

## Key Conventions

### Adding a New Package

1. Create directory under `packages/<package-name>/`
2. Add `package.json` with `"name": "@fortius/<package-name>"`
3. Add `tsconfig.json` extending `@fortius/config-typescript/library.json`
4. Export everything from `src/index.ts`
5. Add to consuming app's `package.json`: `"@fortius/<package-name>": "workspace:*"`

### Adding a New App

1. Create directory under `apps/<app-name>/`
2. Initialize with Next.js configuration
3. Set internal dependencies: `@fortius/ui`, `@fortius/database`, `@fortius/auth`
4. Configure `.env.local` with `NEXT_PUBLIC_ORG_SLUG`
5. Follow the `/new-brand-app` workflow for full instructions

### Dependency Rules

- **Apps depend on packages**: `apps/web-eh` → `packages/ui`
- **Packages can depend on other packages**: `packages/auth` → `packages/database`
- **Packages NEVER depend on apps**
- **Use `workspace:*`** for internal dependencies, never version numbers

### Running Commands

```bash
# All apps and packages
pnpm turbo build

# Single app
pnpm turbo dev --filter=web-escuela-hispanica

# Package and its dependents
pnpm turbo build --filter=@fortius/ui...
```

### Environment Variables

- `NEXT_PUBLIC_*` — Exposed to browser, set per-app
- `SUPABASE_SERVICE_ROLE_KEY` — Server-only, set per-app in Vercel
- `NEXT_PUBLIC_ORG_SLUG` — Critical: determines which org's data the app displays
