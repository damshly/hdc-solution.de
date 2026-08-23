/** @type {import('next.js').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // ضروري مع التصدير الستاتيكي إذا ما عم تستخدم CDN صور خارجي
  },
  trailingSlash: true, // يحسّن التوافق مع استضافات الـ Static مثل Nginx أو Cloudflare Pages
};

module.exports = nextConfig;
