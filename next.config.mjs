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
        source: '/participants/application-problems.pdf',
        destination: 'https://raw.githubusercontent.com/rossprogram/rossprogram.github.io/master/students/application-problems.pdf',
        permanent: false,
        basePath: false
      },
      {
        source: '/participants/math-topics',
        destination: '/participants/math-at-ross/math-topics',
        permanent: false,
        basePath: false,
      },
      {
        source: '/students/to-apply',
        destination: '/participants/application',
        permanent: false,
        basePath: false,
      },
      {
        source: '/students/:slug*',
        destination: '/participants/:slug*',
        permanent: false,
        basePath: false,
      }
    ]
  },

}

export default withMarkdoc({ schemaPath: './src/markdoc', mode: 'static' })(nextConfig)
