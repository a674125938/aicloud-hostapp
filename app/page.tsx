'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useIntl } from 'react-intl';

export default function Home() {
  const intl = useIntl();


  return (
    <div className="home-hero">
      {/* 左侧主要内容 */}
      <div className="hero-left">
        <h1 className="hero-title">
          {intl.formatMessage({ id: 'home.enterprise' })} <span className="highlight">{intl.formatMessage({ id: 'home.security' })}</span>
        </h1>
        <h2 className="hero-subtitle">
          {intl.formatMessage({ id: 'home.subtitle1' })} <span className="highlight">{intl.formatMessage({ id: 'home.subtitle2' })}</span>
        </h2>
        <p className="hero-description">
          {intl.formatMessage({ id: 'home.description' })}
        </p>
        
        {/* 新功能提示 */}
        <div className="hero-feature">
          <span className="new-badge">{intl.formatMessage({ id: 'common.new' })}</span>
          <Link href="/react" className="feature-link">
            {intl.formatMessage({ id: 'home.feature' })}
          </Link>
        </div>
      </div>

 
    </div>
  );
}
