'use client';

import { IntlProvider as ReactIntlProvider } from 'react-intl';
import { useAppStore } from '../store/useAppStore';
import { messages, defaultLocale, type Locale } from '../locales';

export default function IntlProvider({ children }: { children: React.ReactNode }) {
  const { language } = useAppStore();
  const locale = (language || defaultLocale) as Locale;
  const currentMessages = messages[locale] || messages[defaultLocale];

  return (
    <ReactIntlProvider locale={locale} messages={currentMessages}>
      {children}
    </ReactIntlProvider>
  );
}
