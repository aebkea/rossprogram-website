import withMarkdoc from '@markdoc/next.js'
// import withSearch from './src/markdoc/search.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md'],
  experimental: {
    scrollRestoration: true,
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
}

export default withMarkdoc({ schemaPath: './src/markdoc' })(nextConfig)
