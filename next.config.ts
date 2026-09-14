import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  devIndicators: false,
  turbopack: {
    // Pin the root explicitly — a stray package-lock.json one directory up
    // (outside this project) was making Turbopack misdetect the workspace root.
    root: path.join(__dirname),
  },
};

export default nextConfig;
