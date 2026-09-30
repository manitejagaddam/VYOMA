import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    VYOMA_DB_URL: process.env.VYOMA_DB_URL || "",
    VYOMA_DB_KEY: process.env.VYOMA_DB_KEY || "",
  },
  turbopack: {},
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "ui-avatars.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
