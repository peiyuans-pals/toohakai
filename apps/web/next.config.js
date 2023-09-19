const path = require("path");
const {
  PHASE_PRODUCTION_SERVER,
  PHASE_PRODUCTION_BUILD
} = require("next/constants");

module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    reactStrictMode: true,
    output: "standalone",
    poweredByHeader: false,
    experimental: {
      outputFileTracingRoot: path.join(__dirname, "../../"),
      serverActions: true
    },
    async headers() {
      return [
        {
          source: "/:path*",
          headers: [
            ...(phase === PHASE_PRODUCTION_SERVER ||
            phase === PHASE_PRODUCTION_BUILD
              ? [
                  {
                    key: "Strict-Transport-Security",
                    value: "max-age=63072000; includeSubDomains; preload"
                  }
                ]
              : []),
            {
              key: "X-DNS-Prefetch-Control",
              value: "on"
            },
            {
              key: "X-Frame-Options",
              value: "SAMEORIGIN"
            },
            {
              key: "X-Content-Type-Options",
              value: "nosniff"
            },
            {
              key: "X-XSS-Protection",
              value: "1; mode=block"
            },
            {
              key: "Referrer-Policy",
              value: "same-origin"
            },
            {
              key: "Permissions-Policy",
              value: "camera=()"
            }
          ]
        }
      ];
    }
  };
  return nextConfig;
};
