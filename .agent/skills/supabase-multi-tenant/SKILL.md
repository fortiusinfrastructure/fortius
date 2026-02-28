---
name: supabase-multi-tenant
description: How to work with the Fortius multi-tenant Supabase data model
---

# Supabase Multi-Tenant Skill

## Core Concept

The Fortius ecosystem uses a single Supabase project with **`organization_id`** as the multi-tenant primitive. Every content table includes an `organization_id` column that determines which brand owns the data.

## Data Model Summary

```
auth.users (managed by Supabase)
    ↓ 1:1
user_profiles (personal data, brand-agnostic)
    ↓ 1:N
user_memberships (one per org: EH, IEAM, MD, Fortius)
    ↓
organizations (escuela-hispanica, ieam, mediterranean-dialogue, fortius)
```

## Working with Organizations

### Querying Data for a Specific Org

```typescript
// In server components or API routes
import { createServerClient } from '@fortius/database';

const supabase = createServerClient();
const orgSlug = process.env.NEXT_PUBLIC_ORG_SLUG;

// Get org-specific articles
const { data } = await supabase
  .from('articles')
  .select('*')
  .eq('organization_id', orgId)
  .eq('status', 'published');
```

### Getting the Current Org

```typescript
// Helper to resolve org from slug (cached)
export async function getCurrentOrg() {
  const supabase = createServerClient();
  const { data } = await supabase
    .from('organizations')
    .select('*')
    .eq('slug', process.env.NEXT_PUBLIC_ORG_SLUG)
    .single();
  return data;
}
```

### User Membership Check

```typescript
// Check if user has access to current org
export async function getUserMembership(userId: string, orgId: string) {
  const supabase = createServerClient();
  const { data } = await supabase
    .from('user_memberships')
    .select('*, membership_plans(*)')
    .eq('user_id', userId)
    .eq('organization_id', orgId)
    .eq('status', 'active')
    .single();
  return data;
}
```

## RLS Patterns

- **Public content**: `status = 'published'` → readable by anyone
- **User's own data**: `auth.uid() = user_id`
- **Org management**: Check `user_memberships.role IN ('editor', 'admin')`
- **Cross-org (Fortius Global)**: Check membership in org `fortius`

## Migration Guidelines

- Always add `organization_id UUID REFERENCES organizations(id) NOT NULL` to content tables
- Use `UNIQUE(organization_id, slug)` for slug-based lookups
- Add RLS policies for both public reads and org-admin writes
- Run `supabase gen types typescript` after every migration
