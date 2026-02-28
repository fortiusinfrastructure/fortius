---
description: How to deploy an app from the Fortius monorepo to Vercel
---

# Deployment Workflow

## Prerequisites
- Vercel CLI installed: `npm i -g vercel`
- Vercel account authenticated: `vercel login`
- Each app has its own Vercel project

## Steps

1. Ensure all checks pass:
// turbo
```bash
pnpm turbo lint typecheck build --filter=<app-name>
```

2. Preview deployment (staging):
```bash
vercel --cwd apps/<app-name>
```

3. Production deployment:
```bash
vercel --cwd apps/<app-name> --prod
```

4. Verify deployment:
   - Check Vercel dashboard for build logs
   - Verify the deployed URL loads correctly
   - Test critical user flows (auth, navigation)

## Environment Variables
Each app needs these env vars configured in Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_ORG_SLUG` (unique per app)
- `NEXT_PUBLIC_APP_URL` (unique per app)
- `STRIPE_SECRET_KEY` (shared)
- `STRIPE_WEBHOOK_SECRET` (unique per app endpoint)

## Notes
- Turborepo caches builds. If only `packages/ui` changed, apps that depend on it rebuild automatically.
- Vercel auto-detects the monorepo root and uses `turbo` for builds.
- Set `Root Directory` in Vercel project settings to `apps/<app-name>`.
