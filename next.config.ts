import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**", // allows all paths under Cloudinary
      },
      // If you want to restrict to your specific folder, use:
      // pathname: "/dnq0dk2tv/image/upload/**",
    ],
  },
};

export default nextConfig;