import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "ui-avatars.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  env: {
    VYOMA_DB_URL: process.env.VYOMA_DB_URL,
    VYOMA_DB_KEY: process.env.VYOMA_DB_KEY,
  },
};

export default nextConfig;
