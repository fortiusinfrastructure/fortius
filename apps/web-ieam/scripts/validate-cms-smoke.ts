import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
const orgSlug = process.env.NEXT_PUBLIC_ORG_SLUG || 'ieam';

async function main() {
  if (!url || !anon || !service) {
    console.log(JSON.stringify({ ok: false, reason: 'missing_env' }, null, 2));
    process.exit(1);
  }

  const admin = createClient(url, service, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const anonClient = createClient(url, anon, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: org, error: orgError } = await admin
    .from('organizations')
    .select('id, slug')
    .eq('slug', orgSlug)
    .single();

  if (orgError || !org) {
    console.log(JSON.stringify({ ok: false, reason: 'org_not_found', message: orgError?.message ?? null }, null, 2));
    process.exit(1);
  }

  const adminRoles = ['editor', 'admin', 'super_admin'];

  const [memberships, articles, activities] = await Promise.all([
    admin.from('user_memberships').select('*', { count: 'exact', head: true }).eq('organization_id', org.id).eq('status', 'active').in('role', adminRoles),
    admin.from('articles').select('*', { count: 'exact', head: true }).eq('organization_id', org.id),
    admin.from('activities').select('*', { count: 'exact', head: true }).eq('organization_id', org.id),
  ]);

  const { data: articleSample, error: articleSampleError } = await admin
    .from('articles')
    .select('id, slug, title_es, featured_image_es, featured_image_en, materials, article_authors(name)')
    .eq('organization_id', org.id)
    .limit(1)
    .single();

  const { data: eventSample, error: eventSampleError } = await admin
    .from('activities')
    .select('id, slug, title_es, event_date, location, image_url, activity_speakers(name)')
    .eq('organization_id', org.id)
    .limit(1)
    .single();

  const { error: invalidLoginError } = await anonClient.auth.signInWithPassword({
    email: 'cms-validation-no-user@invalid.local',
    password: 'not-a-real-password-123',
  });

  console.log(JSON.stringify({
    ok: !memberships.error && !articles.error && !activities.error && !articleSampleError && !eventSampleError,
    orgSlug,
    orgFound: true,
    activeCmsUsers: memberships.count ?? null,
    articleCount: articles.count ?? null,
    activityCount: activities.count ?? null,
    articleQueryWorks: !articleSampleError,
    eventQueryWorks: !eventSampleError,
    articleHasMultilangImages: Boolean(articleSample && 'featured_image_es' in articleSample && 'featured_image_en' in articleSample),
    articleHasAuthorsRelation: Boolean(articleSample && Array.isArray((articleSample as any).article_authors)),
    eventHasSpeakersRelation: Boolean(eventSample && Array.isArray((eventSample as any).activity_speakers)),
    anonAuthReachable: invalidLoginError ? !/fetch/i.test(invalidLoginError.message) : true,
    anonAuthMessage: invalidLoginError?.message ?? null,
    errors: {
      membershipError: memberships.error?.message ?? null,
      articleCountError: articles.error?.message ?? null,
      activityCountError: activities.error?.message ?? null,
      articleSampleError: articleSampleError?.message ?? null,
      eventSampleError: eventSampleError?.message ?? null,
    }
  }, null, 2));
}

main().catch((error) => {
  console.log(JSON.stringify({ ok: false, reason: 'unexpected_error', message: error instanceof Error ? error.message : String(error) }, null, 2));
  process.exit(1);
});
