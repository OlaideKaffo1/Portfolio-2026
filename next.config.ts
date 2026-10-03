import type { NextConfig } from "next";

// Analytics go through /ingest on this domain to PostHog (public/analytics/track.js).
// POSTHOG_REGION is "us" or "eu", matching the PostHog project.
const PH = process.env.POSTHOG_REGION === "eu" ? "eu" : "us";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/ingest/static/:path*", destination: `https://${PH}-assets.i.posthog.com/static/:path*` },
      { source: "/ingest/array/:path*", destination: `https://${PH}-assets.i.posthog.com/array/:path*` },
      { source: "/ingest/:path*", destination: `https://${PH}.i.posthog.com/:path*` },
    ];
  },
  // PostHog's API paths end in a slash, so Next mustn't redirect them
  skipTrailingSlashRedirect: true,
  // Ask Olaide reads the knowledge files at runtime, so they ship with its server route
  outputFileTracingIncludes: { "/api/ask": ["./knowledge/**/*"] },
};

export default nextConfig;
