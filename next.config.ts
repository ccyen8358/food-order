import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 
    enable app router tree shaking for mantine 
    source: https://mantine.dev/guides/next/#app-router-tree-shaking
  */
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
};

export default nextConfig;
