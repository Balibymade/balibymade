import type { MetadataRoute } from 'next'
import { getEnabledLocales } from '../lib/queries'
import { routing } from '../i18n/routing'

const BASE_URL = 'https://balibymade.com'
const PATHS = ['', '/experiences', '/route-builder', '/about', '/contact']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const enabled = await getEnabledLocales()
  const locales = enabled.length ? enabled.map(l => l.code) : [...routing.locales]

  function alternates(path: string): Record<string, string> {
    return {
      ...Object.fromEntries(locales.map(l => [l, `${BASE_URL}/${l}${path}`])),
      'x-default': `${BASE_URL}/en${path}`,
    }
  }

  const entries: MetadataRoute.Sitemap = []
  for (const path of PATHS) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.8,
        alternates: { languages: alternates(path) },
      })
    }
  }
  return entries
}
