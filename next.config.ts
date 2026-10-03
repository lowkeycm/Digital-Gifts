import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  serverExternalPackages: ["ffmpeg-static"],
  outputFileTracingIncludes: {
    "/api/*": ["./node_modules/ffmpeg-static/ffmpeg"],
  },
};

export default nextConfig;
