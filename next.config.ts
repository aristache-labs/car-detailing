import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['192.168.1.106'],
  images: {
    qualities: [70, 75],
  },
};

export default nextConfig;
