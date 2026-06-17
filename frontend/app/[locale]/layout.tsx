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

  return (
    <>
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
