'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import NotFound from './NotFound';

// 已注册的子应用列表
const REGISTERED_APPS = ['react', 'vue'];

export default function SubAppContainer() {
  const pathname = usePathname();
  const [showNotFound, setShowNotFound] = useState(false);
  const [notFoundApp, setNotFoundApp] = useState<string | null>(null);
  
  useEffect(() => {
    // 检测是否为子应用路由
    if (!pathname) {
      setShowNotFound(false);
      setNotFoundApp(null);
      return;
    }

    // 检查是否匹配已注册的子应用
    const isRegisteredApp = REGISTERED_APPS.some(app => pathname.startsWith(`/${app}`));
    
    // 如果已经是已注册的应用，不显示404
    if (isRegisteredApp) {
      setShowNotFound(false);
      setNotFoundApp(null);
      return;
    }
    
    // 检查是否为其他子应用路由（如 /angular, /svelte 等）
    const pathSegments = pathname.split('/').filter(Boolean);
    const firstSegment = pathSegments[0];
    
    // 如果第一个路径段不是已注册的应用，且不是空路径，则可能是未注册的子应用
    if (firstSegment && !['', 'favicon.ico'].includes(firstSegment)) {
      // 检查是否是常见的子应用路径模式（排除首页、API路由、Next.js内部路由等）
      const isSubAppPath = !firstSegment.startsWith('api') && 
                          !firstSegment.startsWith('_next') &&
                          !firstSegment.includes('.') &&
                          firstSegment !== 'favicon.ico';
      
      if (isSubAppPath) {
        setNotFoundApp(firstSegment);
        setShowNotFound(true);
        return;
      }
    }
    
    setShowNotFound(false);
    setNotFoundApp(null);
  }, [pathname]);
  
  // 只在已注册的子应用路由时显示容器
  const showSubApp = pathname?.startsWith('/react') || pathname?.startsWith('/vue');
  
  // 如果显示404，则显示404页面
  if (showNotFound && notFoundApp) {
    return <NotFound appName={notFoundApp} path={pathname || ''} />;
  }
  
  if (!showSubApp) {
    return null;
  }
  
  return (
    <div id="sub-app-container" style={{ isolation: 'isolate' }}></div>
  );
}

