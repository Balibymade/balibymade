import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'hi', 'zh', 'de', 'fr', 'ms', 'nl', 'ru', 'uk', 'ja', 'ko', 'it', 'pt', 'es', 'id', 'ar', 'sv', 'no', 'pl', 'tr', 'fi', 'da'],
  defaultLocale: 'en',
  localeDetection: true,
})
