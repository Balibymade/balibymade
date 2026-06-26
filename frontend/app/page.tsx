import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { getEnabledLocales, getHomePage } from '../lib/queries'
import PlaceholderLangSwitcher from '../components/PlaceholderLangSwitcher/PlaceholderLangSwitcher'
import s from './page.module.scss'

export const metadata: Metadata = {
  title: 'Bali By Made — Coming soon',
  description: 'Your private guide to the real Bali. Coming soon.',
  robots: { index: false, follow: false },
}

const COMING_SOON: Record<string, string> = {
  en: 'Coming soon.',
  hi: 'जल्द आ रहा है।',
  zh: '即将上线。',
  de: 'Demnächst verfügbar.',
  fr: 'Bientôt disponible.',
  ms: 'Akan datang.',
  nl: 'Binnenkort beschikbaar.',
  ru: 'Скоро открытие.',
  uk: 'Скоро відкриття.',
  ja: '近日公開。',
  ko: '곧 공개됩니다.',
  it: 'Prossimamente.',
  pt: 'Em breve.',
  es: 'Próximamente.',
  id: 'Segera hadir.',
  ar: 'قريبًا.',
  sv: 'Kommer snart.',
  no: 'Kommer snart.',
  pl: 'Wkrótce.',
  tr: 'Yakında.',
  fi: 'Tulossa pian.',
  da: 'Kommer snart.',
}

const DEFAULT_TAGLINE = 'Your private guide to the real Bali.'

export default async function PlaceholderPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const [enabledLocales, headersList, params] = await Promise.all([
    getEnabledLocales(),
    headers(),
    searchParams,
  ])

  const enabledCodes = enabledLocales.map(l => l.code)

  let locale = params.lang && enabledCodes.includes(params.lang) ? params.lang : undefined

  if (!locale) {
    const acceptLanguage = headersList.get('accept-language') ?? ''
    const preferredCodes = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().toLowerCase().split('-')[0])
      .filter(Boolean)
    locale = preferredCodes.find(code => enabledCodes.includes(code)) ?? 'en'
  }

  const home = await getHomePage(locale)
  const tagline = home?.heroSub ?? DEFAULT_TAGLINE
  const soon = COMING_SOON[locale] ?? COMING_SOON.en

  return (
    <main className={s.page}>
      <div className={s.bg} style={{ backgroundImage: "url('/demos/balibymade/hero-tegallalang.jpg')" }} />
      <div className={s.overlay} />
      <div className={s.inner}>
        <div className={s.logoWrap}>
          <span className={s.logoSub}>Bali By</span>
          <h1 className={s.logo}>Made</h1>
        </div>
        <div className={s.divider}><span className={s.dividerDot} /></div>
        <p className={s.tagline}>{tagline}</p>
        <div className={s.soonBadge}>
          <span className={s.badgeDot} />
          <span>{soon}</span>
          <span className={s.badgeDot} />
        </div>
        <PlaceholderLangSwitcher locales={enabledLocales} current={locale} />
      </div>
    </main>
  )
}
