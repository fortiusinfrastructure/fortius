# web-ieam

IEAM — Instituto de Estudios sobre África y el Mediterráneo.

Part of the Fortius monorepo. Next.js 16 + Tailwind v4 + next-intl (ES default, EN).

## Canonical domain

`https://ieam.es/` — configure `NEXT_PUBLIC_SITE_URL` accordingly.

The `ieam.org` value seeded in `organizations.domain` (Supabase) predates this
decision; align it via a follow-up migration when we finalize the domain setup.

## Commands

```bash
pnpm install          # from monorepo root
pnpm dev              # turbopack dev server
pnpm build            # production build
pnpm lint             # eslint
pnpm check-types      # tsc --noEmit
```

## Structure

```
src/
├── app/
│   ├── [locale]/       # App Router + i18n segment
│   └── globals.css     # Tailwind v4 + IEAM editorial tokens
├── i18n/               # next-intl routing + request config
├── lib/
│   └── mock-data/      # Transitional content source (articles, events, team)
├── messages/           # UI translation dictionaries (es.json, en.json)
└── proxy.ts            # Middleware (i18n only for now)
```

## Content migration status

- **Phase 0–1 (current):** static `src/lib/mock-data/*.ts` copied verbatim from
  the original Vite IEAM project.
- **Phase 3:** migration script reads the mock data and seeds Supabase tables
  (`articles`, `activities`, `team_members`) with `organization_id` scoped to
  the `ieam` organization.

## Design system

"Premium Editorial Design System" ported from the original IEAM Vite app.
Tokens live in `src/app/globals.css` under the Tailwind v4 `@theme` directive.

- Serif: **Playfair Display** (headlines)
- Sans: **Inter** (body)
- Hairlines instead of shadows; generous vertical rhythm.
