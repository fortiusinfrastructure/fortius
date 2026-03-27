import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  // reactCompiler: true,
  async rewrites() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://airsfteshzwuykmygojl.supabase.co';
    return [
      {
        source: '/docs/:path*',
        destination: `${supabaseUrl}/storage/v1/object/public/library-docs/:path*`,
      },
      {
        source: '/:locale/docs/:path*',
        destination: `${supabaseUrl}/storage/v1/object/public/library-docs/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
