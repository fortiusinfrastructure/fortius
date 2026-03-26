import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  // reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/docs/:path*',
        destination: `${process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://airsfteshzwuykmygojl.supabase.co'}/storage/v1/object/public/library-docs/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
