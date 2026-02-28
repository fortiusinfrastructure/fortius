---
description: How to create, review, and apply Supabase database migrations
---

# Database Migration Workflow

## Prerequisites
- Supabase CLI installed: `npm install -g supabase`
- Supabase project linked: `supabase link --project-ref <ref>`

## Steps

1. Create a new migration file:
// turbo
```bash
supabase migration new <descriptive_name>
```

2. Write your SQL in the generated file at `supabase/migrations/<timestamp>_<name>.sql`:
   - Always use `IF NOT EXISTS` / `IF EXISTS` for idempotency
   - Add comments explaining the purpose of each change
   - Remember to add `organization_id` to any new content table
   - Add RLS policies for new tables

3. Test locally (if Supabase CLI local dev is configured):
// turbo
```bash
supabase db reset
```

4. Apply to remote Supabase project:
```bash
supabase db push
```

5. Regenerate TypeScript types:
// turbo
```bash
supabase gen types typescript --project-id <ref> > packages/database/src/types/database.ts
```

6. Run type-check to verify nothing broke:
// turbo
```bash
pnpm turbo typecheck
```

## Important Rules
- **Never** modify a migration that has already been applied to production
- **Always** create a new migration for schema changes
- **Always** regenerate types after applying migrations
- **Always** add RLS policies for new tables
- **Always** add `organization_id` to tables that hold per-brand data
