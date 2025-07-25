/** @type {import('next').NextConfig} */

const prod = process.env.NODE_ENV === "production";
const jsonliConf = require("jsonli-conf");

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  reactStrictMode: prod, // Set to 'false' for Babylon development.
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    jsonliConf();
    return config;
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.weatherapi.com",
        port: "",
      },
    ],
  },
};

module.exports = prod ? withPWA(nextConfig) : nextConfig;
