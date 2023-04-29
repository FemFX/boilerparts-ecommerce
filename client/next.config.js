/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["loremflickr.com"],
  },
  env: {
    NEXT_PUBLIC_SERVER_URL: "http://localhost:4000",
  },
};

module.exports = nextConfig;
