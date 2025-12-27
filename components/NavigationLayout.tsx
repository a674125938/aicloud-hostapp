'use client';

import { Layout } from 'antd';
import Navigation from './Navigation';
import { ReactNode, useState, useEffect } from 'react';

export default function NavigationLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="main-app">
      <Layout style={{ minHeight: '100vh' }}>
        <Navigation collapsed={collapsed} onCollapse={setCollapsed} >
            {children}
          </Navigation>
      </Layout>
    </div>
  );
}

