import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // GitHub Pages statik site istediği için bu şart
  basePath: '/HealthScope',
  images: {
    unoptimized: true, // Statik exportta resim optimizasyonu çalışmaz
  },
};

export default nextConfig;