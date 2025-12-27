'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useIntl } from 'react-intl';
import { Layout, Menu, Button, Space, Typography, Flex } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CloseOutlined,
  LoginOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

interface NavigationProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  children?: React.ReactNode;
}

export default function Navigation({ collapsed = false, onCollapse, children }: NavigationProps) {
  const pathname = usePathname();
  const intl = useIntl();
  const [isModelService, setIsModelService] = React.useState(false);
  
  // 使用 useEffect 确保客户端和服务端初始渲染一致
  React.useEffect(() => {
    setIsModelService(pathname?.startsWith('/react'));
  }, [pathname]);
  
  // 当 Navigation 组件渲染完成后，标记样式已加载
  React.useEffect(() => {
    // 等待 antd CSS-in-JS 样式注入完成
    const timer = setTimeout(() => {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.add('styles-loaded');
      }
    }, 200); // 给 antd 一些时间注入样式
    
    return () => clearTimeout(timer);
  }, []);

  // 顶部导航菜单项
  const topNavItems = useMemo(() => [
    { key: 'model-service', href: '/react', label: intl.formatMessage({ id: 'nav.modelService' }) },
    { key: 'app-dev', href: '/react/about', label: intl.formatMessage({ id: 'nav.appDev' }) },
    { key: 'experience', href: '/react/contact', label: intl.formatMessage({ id: 'nav.experience' }) },
    { key: 'docs', href: '/react/docs', label: intl.formatMessage({ id: 'nav.docs' }) },
    { key: 'api-ref', href: '/react/api-ref', label: intl.formatMessage({ id: 'nav.apiRef' }) },
  ], [intl]);

  // 左侧导航菜单项
  const sidebarMenuItems: MenuProps['items'] = [
    {
      key: 'model-marketplace',
      label: intl.formatMessage({ id: 'sidebar.modelMarketplace' }),
    },
    {
      key: 'model-experience',
      label: intl.formatMessage({ id: 'sidebar.modelExperience' }),
      children: [
        {
          key: 'text-model',
          label: intl.formatMessage({ id: 'sidebar.textModel' }),
        },
        {
          key: 'voice-model',
          label: intl.formatMessage({ id: 'sidebar.voiceModel' }),
        },
        {
          key: 'vision-model',
          label: intl.formatMessage({ id: 'sidebar.visionModel' }),
        },
        {
          key: 'omni-modal-model',
          label: intl.formatMessage({ id: 'sidebar.omniModalModel' }),
        },
      ],
    },
    {
      key: 'model-training',
      label: intl.formatMessage({ id: 'sidebar.modelTraining' }),
      children: [
        {
          key: 'model-tuning',
          label: intl.formatMessage({ id: 'sidebar.modelTuning' }),
        },
        {
          key: 'my-models',
          label: intl.formatMessage({ id: 'sidebar.myModels' }),
        },
        {
          key: 'model-evaluation',
          label: intl.formatMessage({ id: 'sidebar.modelEvaluation' }),
        },
      ],
    },
    {
      key: 'workbench',
      label: intl.formatMessage({ id: 'sidebar.workbench' }),
      children: [
        {
          key: 'model-usage',
          label: intl.formatMessage({ id: 'sidebar.modelUsage' }),
        },
        {
          key: 'batch-inference',
          label: intl.formatMessage({ id: 'sidebar.batchInference' }),
        },
        {
          key: 'model-deployment',
          label: intl.formatMessage({ id: 'sidebar.modelDeployment' }),
        },
        {
          key: 'data-management',
          label: intl.formatMessage({ id: 'sidebar.dataManagement' }),
        },
        {
          key: 'model-monitoring',
          label: intl.formatMessage({ id: 'sidebar.modelMonitoring' }),
        },
        {
          key: 'model-alert',
          label: intl.formatMessage({ id: 'sidebar.modelAlert' }),
        },
      ],
    },
  ];

  // 获取当前选中的顶部导航项
  const selectedTopNavKey = useMemo(() => {
    if (!pathname) {
      return '';
    }
    
    // 根据当前路径匹配对应的菜单项
    // 按路径长度从长到短排序，优先匹配更具体的路径
    const sortedItems = [...topNavItems].sort((a, b) => b.href.length - a.href.length);
    
    for (const item of sortedItems) {
      // 精确匹配或路径以该 href 开头（考虑子路径）
      if (pathname === item.href || pathname.startsWith(item.href + '/')) {
        return item.key;
      }
    }
    
    // 如果路径以 /react 开头但没有匹配到具体项，默认选中 model-service
    if (pathname.startsWith('/react')) {
      return 'model-service';
    }
    
    return '';
  }, [pathname, intl]);

  // 获取当前选中的左侧导航项（默认选中模型广场）
  const getSelectedSidebarKey = () => {
    // 可以根据实际路由设置选中的菜单项
    return ['model-marketplace'];
  };

  
  const sidebarWidth = useMemo(() => {
    return collapsed ? 80 : 200;
  },[collapsed])

  return (
    <>
        {/* 顶部提示横幅 */}
        <div style={{ 
        backgroundColor: '#fffbe6', 
        padding: '8px 16px', 
        textAlign: 'center',
        fontSize: '14px',
        borderBottom: '1px solid #ffe58f'
      }}>
        <span style={{ marginRight: '8px' }}>⚠️</span>
        <span>{intl.formatMessage({ id: 'banner.warning' })}</span>
        <Link href="/react" style={{ marginLeft: '8px', color: '#1890ff' }}>
          {intl.formatMessage({ id: 'common.moreInfo' })}
        </Link>
      </div>
      {/* 顶部导航栏 */}
      <Header style={{ 
        display:'flex',
        alignItems: 'center', 
        padding: '0 24px',
        background: '#fff',
        borderBottom: '1px solid #f0f0f0',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}>
        
    

        {/* 左侧：菜单按钮和 Logo */}
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '32px' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => onCollapse?.(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <Link href="/" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginLeft: '16px',
            textDecoration: 'none',
            color: 'inherit'
          }}>
            <Text strong style={{ fontSize: '18px' }}>
              {intl.formatMessage({ id: 'nav.brandName' })}
            </Text>
          </Link>
        </div>

        {/* 中间：导航链接 */}
        <Menu
          mode="horizontal"
          selectedKeys={selectedTopNavKey ? [selectedTopNavKey] : []}
          style={{ 
            flex: 1, 
            borderBottom: 'none',
            minWidth: 0,
          }}
          items={topNavItems.map(item => ({
            key: item.key,
            label: <Link href={item.href} style={{ textDecoration: 'none' }}>{item.label}</Link>,
          }))}
        />

        {/* 右侧：操作按钮 */}
        <Space size="middle" style={{ marginLeft: 'auto' }}>
          <Button type="text" icon={<CloseOutlined />} />
          <Text>{intl.formatMessage({ id: 'nav.cloudName' })}</Text>
          <Button type="text" icon={<LoginOutlined />}>
            {intl.formatMessage({ id: 'common.login' })}
          </Button>
          <Button type="default" icon={<SwapOutlined />}>
            {intl.formatMessage({ id: 'nav.modelComparison' })}
          </Button>
        </Space>
       
      </Header>
          <Layout style={{ 
            transition: 'margin-left 0.2s',
            minHeight: '100vh',
            width: '100%'
          }}>
        {/* 左侧导航栏 - 只在模型服务模块显示 */}
        {isModelService && (
          <Sider 
            trigger={null} 
            collapsible 
            collapsed={collapsed}
            width={200}
            collapsedWidth={80}
            // style={{
            //   background: '#fff',
            //   borderRight: '1px solid #f0f0f0',
            //   // position: 'fixed',
            //   left: 0,
            //   // top: '104px', // 横幅高度(约40px) + Header高度(64px) = 104px
            //   bottom: 0,
            //   overflow: 'auto',
            //   height: 'calc(100vh - 104px)',
            //   zIndex: 999,
            //   transition: 'width 0.2s',
            // }}
          >
            <Menu
              mode="inline"
              selectedKeys={getSelectedSidebarKey()}
              defaultOpenKeys={['model-experience', 'model-training', 'workbench']}
              style={{ height: '100%', borderRight: 0 }}
              items={sidebarMenuItems}
            />
          </Sider>
        )}
        <Content style={{ 
              margin: 0,
              padding: 0,
              minHeight: 'calc(100vh - 104px)', // 横幅高度(约40px) + Header高度(64px) = 104px
              background: '#fff',
              maxHeight: 'calc(100vh - 104px)',
              overflow: 'auto'
            }}>
              {children}
        </Content>
      </Layout>
    </>
  );
}
