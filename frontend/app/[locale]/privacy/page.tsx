import type { Metadata } from 'next'
import { getSiteSettings } from '../../../lib/queries'
import { privacyContent, cookieStrings } from '../../../lib/legalDict'
import s from './Privacy.module.scss'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const content = privacyContent(locale)
  return {
    title: `${content.title} — Bali By Made`,
    robots: { index: true, follow: true },
  }
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = privacyContent(locale)
  const settings = await getSiteSettings()

  return (
    <div className={s.page}>
      <div className={s.container}>
        <p className={s.overline}>{cookieStrings(locale).privacyLabel}</p>
        <h1 className={s.h1}>{content.title}</h1>
        <p className={s.updated}>{content.updated}</p>

        {content.sections.map(section => (
          <section key={section.h} className={s.section}>
            <h2 className={s.h2}>{section.h}</h2>
            {section.p.map((para, i) => (
              <p key={i} className={s.para}>{para}</p>
            ))}
          </section>
        ))}

        {settings?.contactEmail && (
          <p className={s.contact}>
            {content.contactLead}{' '}
            <a href={`mailto:${settings.contactEmail}`} className={s.contactLink}>{settings.contactEmail}</a>
          </p>
        )}
      </div>
    </div>
  )
}
