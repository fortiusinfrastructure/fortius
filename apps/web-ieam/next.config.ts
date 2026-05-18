import type { NextConfig } from "next";
import { withContentCollections } from '@content-collections/next';
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Canonical domain is https://ieam.es — set via NEXT_PUBLIC_SITE_URL in .env.
  // Rewrites for Supabase Storage will be added in Phase 3 once content lives in Supabase.
};

export default withContentCollections(withNextIntl(nextConfig));
