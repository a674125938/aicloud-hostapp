'use client';

// 动态路由配置，确保所有 /vue/* 路径都被匹配
export const dynamicParams = true;

export default function VueApp() {
  // 这个页面用于匹配 /vue/* 路由，避免 Next.js 显示 404
  // 实际的子应用内容由 Garfish 渲染到 #sub-app-container 中
  // 返回一个空的 fragment，确保 Next.js 认为有内容
  return <></>;
}

