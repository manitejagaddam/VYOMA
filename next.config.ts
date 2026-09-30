import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
