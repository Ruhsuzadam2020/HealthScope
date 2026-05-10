/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    allowedDevOrigins: ['192.168.1.100:3000', 'localhost:3000'],
  },
}

module.exports = nextConfig