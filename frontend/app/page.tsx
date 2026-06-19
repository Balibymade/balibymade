import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { getEnabledLocales, getHomePage } from '../lib/queries'
import styles from './page.module.scss'

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

export default async function PlaceholderPage() {
  const [enabledLocales, headersList] = await Promise.all([
    getEnabledLocales(),
    headers(),
  ])

  const acceptLanguage = headersList.get('accept-language') ?? ''
  const preferredCodes = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0].trim().toLowerCase().split('-')[0])
    .filter(Boolean)

  const enabledCodes = enabledLocales.map(l => l.code)
  const locale = preferredCodes.find(code => enabledCodes.includes(code)) ?? 'en'

  const home = await getHomePage(locale)
  const tagline = home?.heroSub ?? DEFAULT_TAGLINE
  const soon = COMING_SOON[locale] ?? COMING_SOON.en

  return (
    <main className={styles.placeholder}>
      <div className={styles.inner}>
        <h1 className={styles.logo}>
          Bali<span>By</span>Made
        </h1>
        <p className={styles.tagline}>{tagline}</p>
        <p className={styles.soon}>{soon}</p>
      </div>
    </main>
  )
}
