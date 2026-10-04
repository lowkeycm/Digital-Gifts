import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  serverExternalPackages: ["ffmpeg-static"],
  outputFileTracingIncludes: {
    "/song/*/keepsake": ["./src/assets/fonts/cormorant-garamond-regular.ttf"],
    "/studio-preview/keepsake": [
      "./src/assets/fonts/cormorant-garamond-regular.ttf",
    ],
    "/api/*": [
      "./node_modules/ffmpeg-static/ffmpeg",
      "./src/assets/fonts/cormorant-garamond-regular.ttf",
    ],
  },
};

export default nextConfig;
