import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Image optimisation ───────────────────────────────────────────────────
  images: {
    // Prefer AVIF (smallest), fall back to WebP — modern format delivery
    formats: ['image/avif', 'image/webp'],
    // Cache optimised images on Vercel's CDN for 30 days
    minimumCacheTTL: 2592000,
    // Match actual display sizes used on the site — avoids generating unused sizes
    deviceSizes: [390, 640, 750, 828, 1080, 1200],
    imageSizes: [42, 80, 130, 165, 180, 400],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rxfyqgildzmioeougkdo.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // ── JS bundle optimisation ───────────────────────────────────────────────
  experimental: {
    // Tree-shake framer-motion barrel exports — only bundle what's imported
    // Addresses "Legacy JavaScript" and "Reduce unused JavaScript" Lighthouse flags
    optimizePackageImports: ['framer-motion'],
  },
};

export default nextConfig;
