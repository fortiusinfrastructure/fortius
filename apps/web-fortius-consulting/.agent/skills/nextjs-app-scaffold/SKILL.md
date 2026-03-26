---
name: nextjs-app-scaffold
description: How to create a new Next.js app within the Fortius monorepo following conventions
---

# Next.js App Scaffold Skill

## When to Use

When a new brand is being added to the Fortius ecosystem and you need to create a new deployable Next.js application.

## App Structure

```
apps/web-<brand>/
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← Root layout with brand theme
│   │   ├── page.tsx            ← Homepage
│   │   ├── globals.css         ← Brand-specific CSS overrides
│   │   ├── (auth)/             ← Auth routes (login, register)
│   │   ├── (dashboard)/        ← Protected routes
│   │   └── api/                ← API routes (webhooks, etc.)
│   ├── components/             ← Brand-specific components only
│   ├── content/                ← Static content/mock data
│   └── lib/                    ← Brand-specific utilities
├── public/                     ← Brand assets (logo, images)
├── next.config.ts
├── tailwind.config.ts          ← Imports brand theme from @fortius/config-tailwind
├── package.json
└── .env.local
```

## Required Dependencies

```json
{
  "dependencies": {
    "next": "16.x",
    "react": "19.x",
    "react-dom": "19.x",
    "@fortius/ui": "workspace:*",
    "@fortius/database": "workspace:*",
    "@fortius/auth": "workspace:*"
  }
}
```

## Required Environment Variables

```bash
NEXT_PUBLIC_ORG_SLUG=<brand-slug>
NEXT_PUBLIC_APP_NAME=<Brand Display Name>
NEXT_PUBLIC_APP_URL=https://<domain>
NEXT_PUBLIC_SUPABASE_URL=<shared>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<shared>
SUPABASE_SERVICE_ROLE_KEY=<shared>
```

## Layout Pattern

The root layout should:
1. Import the brand's font configuration
2. Apply the brand's CSS theme variables
3. Use shared `<Navbar>` and `<Footer>` from `@fortius/ui`
4. Include the `AuthProvider` from `@fortius/auth`

## Key Principle

**Keep app-specific code minimal.** If a component could be useful in another brand's app, it belongs in `packages/ui/`. The app should primarily contain:
- Page routes and layouts
- Brand-specific content and copy
- Configuration (env vars, theme selection)
