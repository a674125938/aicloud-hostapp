/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Next.js 16 默认使用 Turbopack（开发模式）
  // 允许跨域，用于加载子应用
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
  // Turbopack 配置（Next.js 16 默认使用 Turbopack）
  turbopack: {
    // 如果需要自定义 Turbopack 配置，可以在这里添加
    // 目前使用默认配置即可
  },
  // 实验性功能配置
  experimental: {
    // 优化包导入，提升构建性能
    optimizePackageImports: ['garfish'],
  },
};

module.exports = nextConfig;

