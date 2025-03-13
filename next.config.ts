import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"],

    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com", // Domínio de Cloudinary
      },
    ],
  },
};

export default nextConfig;
