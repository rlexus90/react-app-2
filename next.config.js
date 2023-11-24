/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript:{
    ignoreBuildErrors: true,
  },
  compiler: {
    reactRemoveProperties: true,
    removeConsole: true,
  },
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
    ],
  }
};

module.exports = nextConfig;
