const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  reactStrictMode: true,

  transpilePackages: ['@repo/web-ui'],

  experimental: {
    serverMinification: false,
  },
}

module.exports = withMDX(nextConfig)
