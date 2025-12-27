'use client';

import { useIntl } from 'react-intl';
import { Result, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Link from 'next/link';

interface NotFoundProps {
  appName?: string;
  path?: string;
}

export default function NotFound({ appName, path }: NotFoundProps) {
  const intl = useIntl();
  
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '60vh',
      padding: '40px 20px'
    }}>
      <Result
        status="404"
        title={intl.formatMessage({ id: 'notFound.title' })}
        subTitle={
          appName 
            ? intl.formatMessage({ id: 'notFound.subTitleWithApp' }, { appName, path: path || '' })
            : intl.formatMessage({ id: 'notFound.subTitle' }, { path: path || '' })
        }
        extra={
          <Link href="/">
            <Button type="primary" icon={<HomeOutlined />}>
              {intl.formatMessage({ id: 'notFound.backHome' })}
            </Button>
          </Link>
        }
      />
    </div>
  );
}

