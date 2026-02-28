---
description: How to clone an existing app in the monorepo to create a new brand (e.g., EH → IEAM)
---

# Creating a New Brand App in the Fortius Monorepo

## Prerequisites
- The monorepo `fortius/` is set up with Turborepo
- At least one working app exists (e.g., `apps/web-escuela-hispanica`)
- Supabase project is configured with the multi-tenant schema

## Steps

1. Copy the reference app directory:
```bash
cp -r apps/web-escuela-hispanica apps/web-<new-brand-slug>
```

2. Update `apps/web-<new-brand-slug>/package.json`:
   - Change `"name"` to `"web-<new-brand-slug>"`
   - Keep all `@fortius/*` dependencies

3. Create a new Tailwind theme in `packages/config-tailwind/themes/<new-brand>.ts`
   - Export a theme object with brand colors, fonts, and spacing
   - Import and apply it in the new app's `tailwind.config.ts`

4. Update `apps/web-<new-brand-slug>/.env.local`:
```
NEXT_PUBLIC_ORG_SLUG=<new-brand-slug>
NEXT_PUBLIC_APP_NAME=<Brand Name>
NEXT_PUBLIC_APP_URL=https://<domain>
```

5. Insert the new organization into Supabase:
```sql
INSERT INTO organizations (slug, name, domain)
VALUES ('<new-brand-slug>', '<Brand Name>', '<domain>');
```

6. Adapt brand-specific content:
   - Replace hero images, copy text, and page-specific content
   - Remove any EH-specific pages not relevant to the new brand
   - Add new brand-specific pages as needed

7. Verify the new app builds correctly:
// turbo
```bash
pnpm turbo build --filter=web-<new-brand-slug>
```

8. Deploy to Vercel as a separate project:
```bash
vercel --cwd apps/web-<new-brand-slug>
```

## Validation
- New app compiles without errors
- New app displays with correct branding
- Content is filtered by the correct organization_id via RLS
- Authentication works (shared auth system)
