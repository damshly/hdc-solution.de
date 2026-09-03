/** @type {import('next.js').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true, // يحسّن التوافق مع استضافات الـ Static مثل Nginx أو Cloudflare Pages
};

module.exports = nextConfig;
