import { notFound } from 'next/navigation'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { routing } from '../../i18n/routing'
import { getEnabledLocales, getSiteChrome, getSiteSettings } from '../../lib/queries'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as typeof routing.locales[number])) notFound()

  const [chrome, settings, enabledLocales] = await Promise.all([
    getSiteChrome(locale),
    getSiteSettings(),
    getEnabledLocales(),
  ])

  if (!chrome) notFound()

  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'TouristInformationCenter'],
    name: settings?.businessName ?? 'Bali By Made',
    description: chrome.ctaSub,
    url: 'https://balibymade.com',
    image: 'https://balibymade.com/demos/balibymade/hero-tegallalang.jpg',
    areaServed: { '@type': 'Place', name: 'Bali, Indonesia' },
    address: { '@type': 'PostalAddress', addressLocality: 'Ubud', addressRegion: 'Bali', addressCountry: 'ID' },
    ...(settings?.whatsappNumber ? { telephone: `+${settings.whatsappNumber}` } : {}),
    sameAs: settings?.instagramUrl ? [settings.instagramUrl] : [],
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Made',
    jobTitle: 'Local Bali Guide',
    worksFor: { '@type': 'LocalBusiness', name: settings?.businessName ?? 'Bali By Made' },
    knowsAbout: ['Bali tourism', 'Private driving tours', 'Bali temples', 'Bali volcanoes'],
    knowsLanguage: ['en', 'id'],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <Header
        locale={locale}
        transparent
        chrome={chrome}
        enabledLocales={enabledLocales.length ? enabledLocales : [{ code: locale, label: locale.toUpperCase(), flag: '', order: 0 }]}
        logoSub={settings?.logoSub ?? 'BALI BY'}
        logoMain={settings?.logoMain ?? 'MADE'}
      />
      {children}
      <Footer locale={locale} chrome={chrome} settings={settings} />
    </>
  )
}
