/** @type {import('next').NextConfig} */
const nextConfig = {

  eslint: {
    dirs: ["/"],
  },

  experimental: {
    scrollRestoration: true,
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
