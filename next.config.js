/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  basePath: '/gen-art',
  assetPrefix: '/gen-art',
  experimental: {
    images: {
      unoptimized: true,
    },
  },
}

module.exports = nextConfig
