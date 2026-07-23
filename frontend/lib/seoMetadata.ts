import type { Metadata } from 'next'
import { routing } from '../i18n/routing'
import { getSEOPage } from './queries'

const BASE_URL = 'https://balibymade.com'

export async function buildMetadata(slug: string, locale: string, path: string): Promise<Metadata> {
  const seo = await getSEOPage(slug, locale)
  const canonical = `${BASE_URL}/${locale}${path}`

  return {
    title: seo?.title ?? 'Bali By Made',
    description: seo?.description ?? 'Your private guide to the real Bali.',
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(routing.locales.map(l => [l, `${BASE_URL}/${l}${path}`])),
        'x-default': `${BASE_URL}/en${path}`,
      },
    },
    openGraph: {
      title: seo?.title ?? 'Bali By Made',
      description: seo?.description ?? 'Your private guide to the real Bali.',
      url: canonical,
      siteName: 'Bali By Made',
      locale,
      type: 'website',
      images: [{ url: `${BASE_URL}/og.jpg`, width: 1200, height: 630, alt: 'Bali sunset — Bali By Made' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.title ?? 'Bali By Made',
      description: seo?.description ?? 'Your private guide to the real Bali.',
      images: [`${BASE_URL}/og.jpg`],
    },
  }
}
