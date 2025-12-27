'use client';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import { useAppStore, initializeAppStore } from '../store/useAppStore';
import { ReactNode, useEffect } from 'react';

export default function AntdConfigProvider({ children }: { children: ReactNode }) {
  const { language, primaryColor } = useAppStore();
  
  // 初始化 store（从 localStorage 恢复设置）- 只在客户端执行
  // 立即执行，不等待 useEffect，确保页面刷新时样式立即应用
  if (typeof window !== 'undefined') {
    // 在组件渲染前立即初始化
    const savedPrimaryColor = localStorage.getItem('app-primary-color');
    if (savedPrimaryColor) {
      document.documentElement.style.setProperty('--primary-color', savedPrimaryColor);
    } else {
      // 使用默认颜色
      document.documentElement.style.setProperty('--primary-color', '#667eea');
    }
  }
  
  useEffect(() => {
    initializeAppStore();
  }, []);
  
  // 根据语言设置 Ant Design 的 locale
  const locale = language === 'zh-CN' ? zhCN : enUS;
  
  // 更新 CSS 变量
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.style.setProperty('--primary-color', primaryColor);
    }
  }, [primaryColor]);
  
  // 配置 Ant Design 的主题色
  const themeConfig = {
    token: {
      colorPrimary: primaryColor,
    },
  };
  
  return (
    <ConfigProvider locale={locale} theme={themeConfig}>
      {children}
    </ConfigProvider>
  );
}
