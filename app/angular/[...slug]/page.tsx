'use client';

// 动态路由配置，确保所有 /angular/* 路径都被匹配
export const dynamicParams = true;

export default function AngularApp() {
  // 这个页面用于匹配 /angular/* 路由，避免 Next.js 显示 404
  // 由于 angular 子应用不存在，SubAppContainer 会检测并显示 404 页面
  // 这里返回空内容，404 由 SubAppContainer 处理
  return <></>;
}

