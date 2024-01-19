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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: `/${process.env.CLOUDINARY_CLOUD_NAME}/**`
      }
    ]
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  async redirects() {
    return [
      {
        source: '/students/application-problems.pdf',
        destination: 'https://github.com/rossprogram/rossprogram.github.io/blob/master/students/application-problems.pdf',
        permanent: false,
        basePath: false
      },
    ]
  },

}

export default withMarkdoc({ schemaPath: './src/markdoc', mode: 'static' })(nextConfig)
