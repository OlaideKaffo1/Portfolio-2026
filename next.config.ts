import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ask Olaide reads the knowledge files at runtime, so they ship with its server route
  outputFileTracingIncludes: { "/api/ask": ["./knowledge/**/*"] },
};

export default nextConfig;
