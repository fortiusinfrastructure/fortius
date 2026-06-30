import { redirect } from 'next/navigation';

/**
 * Self-service signup is disabled. Accounts are provisioned by the Stripe
 * checkout webhook (see /api/webhooks/stripe → resolveOrInviteUser).
 *
 * This route used to render a public sign-up form. It now redirects to /login
 * so any direct link or bookmark still ends in a usable place. The redirect
 * preserves any `?redirect=` query so the original deep-link flow is kept.
 */
export default async function RegistroPage({
    searchParams,
}: {
    searchParams: Promise<{ redirect?: string }>;
}) {
    const { redirect: redirectParam } = await searchParams;
    const isInternal = redirectParam?.startsWith('/') && !redirectParam.startsWith('//');
    const target = isInternal
        ? `/login?redirect=${encodeURIComponent(redirectParam!)}`
        : '/login';
    redirect(target);
}
