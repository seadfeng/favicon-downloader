import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`), for more information see:
// https://github.com/cloudflare/next-on-pages/blob/main/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

/** @type {import('next').NextConfig} */
import nextIntlPlugin from "next-intl/plugin";
const withNextIntl = nextIntlPlugin("./src/i18n.ts");

const nextConfig = {
  output: 'standalone',
  eslint: {
    dirs: ["src"],
  },
  async rewrites() {
    return [
      {
        source: '/:domain([a-z0-9-]+\\.[a-z]{2,})',
        destination: '/favicon/:domain',
      },
      {
        source: '/api/:domain([a-z0-9-]+\\.[a-z]{2,})',
        destination: '/api/favicon/:domain',
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
