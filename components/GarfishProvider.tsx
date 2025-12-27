'use client';

import { useEffect, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';

// 初始化 Garfish（只执行一次）
let garfishInitialized = false;

export default function GarfishProvider() {
  // 使用 useRef 存储 store hook，避免 useEffect 依赖项警告
  // 注意：useAppStore 本身是 hook 函数，不是调用它的结果
  const storeRef = useRef(useAppStore);
  
  useEffect(() => {
    // 确保只在客户端执行
    if (typeof window === 'undefined') {
      return;
    }
    
    if (!garfishInitialized) {
      // @ts-ignore 动态导入 Garfish，确保只在客户端加载
      import('garfish').then((GarfishModule) => {
        // Garfish 可能是默认导出或命名导出
        const Garfish = GarfishModule.default || GarfishModule;
        
        // const vueAppEntry = process.env.NEXT_PUBLIC_VUE_APP_ENTRY || 'http://127.0.0.1:8080';
        const reactAppEntry = process.env.NEXT_PUBLIC_REACT_APP_ENTRY || 'http://127.0.0.1:8083';
        
        // 判断是否为开发环境
        const isDev = process.env.NODE_ENV === 'development';

        // 不再设置外部依赖，让子应用使用自身的依赖
        // 这样可以避免依赖版本冲突，并通过沙箱实现隔离
        initializeGarfish();
        
        function initializeGarfish() {
          // 使用类型断言，因为 garfish 的类型定义可能不完整
          const GarfishInstance = Garfish as any;
          GarfishInstance.run({
            // 使用函数形式的 domGetter，动态查找容器元素
            domGetter: () => {
              return document.querySelector('#sub-app-container');
            },
            basename: '/',
            apps: [
              // {
              //   name: 'vue-app',
              //   entry: vueAppEntry,
              //   activeWhen: (location) => {
              //     // 安全检查：确保 location 和 pathname 存在
              //     // Garfish 可能传递不同格式的 location 对象
              //     const pathname = location?.pathname || location?.path || window.location.pathname;
              //     return pathname && pathname.startsWith('/vue');
              //   },
              //   modules: [() => ({ recover: () => {} })], // 简易配置
              //   // 开发环境下禁用沙箱以支持 Vite ES 模块
              //   // 生产环境建议启用沙箱以确保应用隔离
              //   sandbox: isDev ? false : {
              //     strictIsolation: false,
              //   },
              // },
              {
                name: 'react-app',
                // 始终使用 HTML 入口，让 Vite dev server 处理 ES 模块
                // HTML 中的 <script type="module"> 会告诉浏览器这是 ES 模块
                entry: `${reactAppEntry}/index.html`,
                // 配置沙箱以确保依赖隔离，避免主应用和子应用的依赖互相污染
                // 开发环境：使用快照沙箱，可以隔离全局变量但支持 ES 模块
                // 生产环境：使用更严格的沙箱隔离
                sandbox: isDev ? {
                  open: false, // 开发环境关闭沙箱，避免拦截 Next.js 资源
                  // 注意：关闭沙箱后，依赖隔离通过子应用自身打包实现
                } : {
                  open: true, // 生产环境启用沙箱
                  strictIsolation: true, // 生产环境启用严格隔离
                  snapshot: true, // 启用快照
                },
                activeWhen: (location: any) => {
                  // 安全检查：确保 location 和 pathname 存在
                  // Garfish 可能传递不同格式的 location 对象
                  const pathname = location?.pathname || location?.path || window.location.pathname;
                  return pathname && pathname.startsWith('/react');
                },
                props: {
                  isESM: true,
                  // 将 Zustand store 传递给子应用
                  // 直接传递 store 实例，Zustand store 本身是响应式的
                  store: storeRef.current,
                  // 传递 Tailwind CSS 配置
                  tailwindConfig: {
                    theme: {
                      extend: {
                        colors: {
                          primary: 'var(--primary-color)',
                        },
                      },
                    },
                    important: true,
                  },
                },
              },
            ],
          });
          garfishInitialized = true;
        }
      }).catch((error) => {
        console.error('Failed to load Garfish:', error);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 只初始化一次，使用 garfishInitialized 标志控制

  return null;
}

