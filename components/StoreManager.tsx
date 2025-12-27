'use client';

import React from 'react';
import { Button, Space, Select, ColorPicker } from 'antd';
import { useAppStore } from '../store/useAppStore';
import { usePathname } from 'next/navigation';
import { useIntl } from 'react-intl';

const { Option } = Select;

// 预设主题色
const presetColors = [
  { label: '紫色', value: '#667eea' },
  { label: '蓝色', value: '#1890ff' },
  { label: '绿色', value: '#52c41a' },
  { label: '橙色', value: '#fa8c16' },
  { label: '红色', value: '#f5222d' },
  { label: '粉色', value: '#eb2f96' },
];

export default function StoreManager() {
  const pathname = usePathname();
  const { user, theme, primaryColor, language, setUser, setTheme, setPrimaryColor, setLanguage, addNotification } = useAppStore();
  const intl = useIntl();

  const handleLogin = () => {
    setUser({
      name: intl.formatMessage({ id: 'store.userName' }),
      email: 'main@example.com',
      avatar: 'https://via.placeholder.com/40',
    });
    addNotification({
      message: intl.formatMessage({ id: 'store.loginSuccess' }),
      type: 'success',
    });
  };

  const handleLogout = () => {
    setUser(null);
    addNotification({
      message: intl.formatMessage({ id: 'store.logoutSuccess' }),
      type: 'info',
    });
  };

  return (
    <div className="p-4 my-2 bg-gray-100 rounded-lg border border-gray-300  mx-auto w-full box-border">
      <h3 className="mt-0 mb-2 text-base font-semibold">
        🎛️ {intl.formatMessage({ id: 'store.title' })}
      </h3>
      <div className="flex gap-2 flex-wrap items-center">
        <div>
          <strong>{intl.formatMessage({ id: 'common.user' })}:</strong> {user ? user.name : intl.formatMessage({ id: 'common.notLoggedIn' })}
        </div>
        <div>
          <strong>{intl.formatMessage({ id: 'common.theme' })}:</strong> {theme === 'light' ? intl.formatMessage({ id: 'common.light' }) : intl.formatMessage({ id: 'common.dark' })}
        </div>
        <div>
          <strong>{intl.formatMessage({ id: 'common.primaryColor' })}:</strong> 
          <span style={{ 
            display: 'inline-block', 
            width: '20px', 
            height: '20px', 
            backgroundColor: primaryColor, 
            borderRadius: '4px',
            marginLeft: '8px',
            verticalAlign: 'middle',
            border: '1px solid #d9d9d9'
          }}></span>
        </div>
        <div>
          <strong>{intl.formatMessage({ id: 'common.language' })}:</strong> {language === 'zh-CN' ? intl.formatMessage({ id: 'common.chinese' }) : intl.formatMessage({ id: 'common.english' })}
        </div>
        <div className="ml-auto flex gap-2">
          <Space>
            {user ? (
              <Button danger size="small" onClick={handleLogout}>
                {intl.formatMessage({ id: 'common.logout' })}
              </Button>
            ) : (
              <Button type="primary" size="small" onClick={handleLogin}>
                {intl.formatMessage({ id: 'common.login' })}
              </Button>
            )}
            <Select
              value={theme}
              onChange={(value) => setTheme(value as 'light' | 'dark')}
              size="small"
              className="w-[100px]"
            >
              <Option value="light">{intl.formatMessage({ id: 'common.light' })}</Option>
              <Option value="dark">{intl.formatMessage({ id: 'common.dark' })}</Option>
            </Select>
            <ColorPicker
              value={primaryColor}
              onChange={(color) => setPrimaryColor(color.toHexString())}
              presets={presetColors.map(c => ({ label: c.label, colors: [c.value] }))}
              size="small"
              showText
            />
            <Select
              value={language}
              onChange={(value) => setLanguage(value as 'zh-CN' | 'en-US')}
              size="small"
              className="w-[100px]"
            >
              <Option value="zh-CN">{intl.formatMessage({ id: 'common.chinese' })}</Option>
              <Option value="en-US">{intl.formatMessage({ id: 'common.english' })}</Option>
            </Select>
          </Space>
        </div>
      </div>
      <p className="mt-2 text-xs text-gray-600">
        💡 {intl.formatMessage({ id: 'store.tip' })}
      </p>
    </div>
  );
}

