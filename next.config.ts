import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ac.goit.global" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://noted-backend-h249.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;