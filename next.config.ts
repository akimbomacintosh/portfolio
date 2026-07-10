import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tell Vercel's file-tracer to include the content directory in every
  // serverless function bundle. Without this, the Keystatic local reader
  // can't find the JSON files at runtime and returns empty collections.
  outputFileTracingIncludes: {
    "/**": ["./content/**/*"],
  },
};

export default nextConfig;
