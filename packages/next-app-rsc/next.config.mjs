/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env.mjs'));

import analyser from '@next/bundle-analyzer';

const withBundleAnalyzer = analyser({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import("next").NextConfig} */
const config = withBundleAnalyzer({
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
});

export default config;
