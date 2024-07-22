/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'tailus.io',
        protocol: 'https',
      },
      {
        hostname: 'avatars.githubusercontent.com',
        protocol: 'https',
      }
    ],
  },
  experimental: {
    staleTimes: {
      dynamic: 0,
    },
  },
}

export default nextConfig
