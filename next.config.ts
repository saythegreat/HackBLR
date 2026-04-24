import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── Compression & Image Optimization ──────────────────────────────────────
  compress: true,
  
  // ─── Production Source Maps: off (saves ~300KB per bundle) ─────────────────
  productionBrowserSourceMaps: false,

  // ─── Experimental: Optimize CSS + Package Imports ──────────────────────────
  experimental: {
    optimizeCss: true,
    // Tree-shake heavy icon libraries — only import what's used
    optimizePackageImports: ['lucide-react', 'framer-motion', '@supabase/supabase-js'],
    // React Server Components + faster cold starts
    serverMinification: true,
  },

  // ─── Server External Packages (never bundle on client) ─────────────────────
  serverExternalPackages: ["@qdrant/js-client-rest", "nodemailer"],

  // ─── HTTP Headers ──────────────────────────────────────────────────────────
  async headers() {
    return [
      // Aggressive static asset caching (1 year immutable)
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // Fonts: cache 1 year
      {
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // Public assets: cache 24 hours, stale-while-revalidate
      {
        source: "/public/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=3600" },
        ],
      },
      // API routes: no-store (dynamic), add CORS
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store" },
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
