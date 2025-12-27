import './globals.css';
// antd/dist/reset.css 已在 globals.css 中导入，确保加载顺序
import GarfishProvider from '@/components/GarfishProvider';
import StoreManager from '@/components/StoreManager';
import SubAppContainer from '@/components/SubAppContainer';
import IntlProvider from '@/components/IntlProvider';
import AntdConfigProvider from '@/components/AntdConfigProvider';
import { Layout } from 'antd';
import { ReactNode } from 'react';
import NavigationLayout from '../components/NavigationLayout';

const { Content } = Layout;

export const metadata = {
  title: 'Garfish 微前端主应用',
  description: '基于 Next.js 和 Garfish 的微前端 Demo',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        {/* 防止 FOUC - 内联关键样式 */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* 在样式加载前隐藏内容 */
            html:not(.styles-loaded) body {
              opacity: 0;
              visibility: hidden;
            }
            html.styles-loaded body {
              opacity: 1;
              visibility: visible;
              transition: opacity 0.15s ease-in;
            }
            /* Ant Design 关键样式 - 内联以避免 FOUC */
            .ant-layout-header {
              display: flex;
              align-items: center;
              padding: 0 24px;
              background: #fff;
              border-bottom: 1px solid #f0f0f0;
              position: sticky;
              top: 0;
              z-index: 1000;
              height: 64px;
              line-height: 64px;
            }
            .ant-menu {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
              font-size: 14px;
              line-height: 1.5715;
              list-style: none;
            }
            .ant-menu-horizontal {
              border-bottom: none;
            }
            .ant-btn {
              box-sizing: border-box;
              margin: 0;
              padding: 4px 15px;
              font-size: 14px;
              border-radius: 6px;
              height: 32px;
              line-height: 1.5715;
            }
          `
        }} />
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // 检测 antd CSS-in-JS 样式是否已注入
              function checkAntdStyles() {
                const styles = Array.from(document.querySelectorAll('style'));
                return styles.some(style => {
                  const text = style.textContent || '';
                  return text.includes('ant-') || text.includes('antd');
                });
              }
              
              // 等待样式加载完成
              function waitForStyles() {
                let attempts = 0;
                const maxAttempts = 100; // 最多等待 5 秒
                
                const checkInterval = setInterval(() => {
                  attempts++;
                  const rootElement = document.getElementById('__next');
                  const hasReactRendered = rootElement && rootElement.children.length > 0;
                  const hasAntdStyles = checkAntdStyles();
                  
                  // 如果 React 已渲染且 antd 样式已注入，显示内容
                  if ((hasReactRendered && hasAntdStyles) || attempts >= maxAttempts) {
                    clearInterval(checkInterval);
                    requestAnimationFrame(() => {
                      requestAnimationFrame(() => {
                        document.documentElement.classList.add('styles-loaded');
                      });
                    });
                  }
                }, 50);
              }
              
              // 等待 DOM 加载后开始检查
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', waitForStyles);
              } else {
                setTimeout(waitForStyles, 100);
              }
            })();
          `
        }} />
      </head>
      <body>
        <IntlProvider>
          <AntdConfigProvider>
            <NavigationLayout>
             
                <GarfishProvider />
                {/* 测试用悬浮框 - 包含 StoreManager 功能 */}
                <div 
                  className="fixed bottom-4 left-4 z-50 bg-white shadow-lg rounded-lg p-4 border border-gray-200 max-w-[400px] max-h-[80vh] overflow-y-auto"
                  style={{
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  <StoreManager />
                </div>
                {/* 首页内容 */}
                {children}
                {/* 子应用容器 - 只在子应用路由时显示 */}
                <SubAppContainer />
              
            </NavigationLayout>
          </AntdConfigProvider>
        </IntlProvider>
      </body>
    </html>
  );
}

