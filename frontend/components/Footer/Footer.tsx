import Link from 'next/link'
import type { SiteChrome, SiteSettings } from '../../lib/queries'
import { link } from '../../lib/links'
import { cookieStrings } from '../../lib/legalDict'
import s from './Footer.module.scss'

interface Props { locale: string; chrome: SiteChrome; settings: SiteSettings | null }

export default function Footer({ locale, chrome, settings }: Props) {
  const slugs = ['experiences', 'about', 'contact']

  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div className={s.brand}>
          <div className={s.logo}>
            <span className={s.logoSub}>{settings?.logoSub ?? 'BALI BY'}</span>
            <span className={s.logoMain}>{settings?.logoMain ?? 'MADE'}</span>
          </div>
          <p className={s.tagline}>{chrome.footerTagline}</p>
        </div>

        <div className={s.col}>
          <p className={s.colTitle}>{chrome.footerLinksLabel}</p>
          {chrome.footerLinks.map((label, i) => (
            <Link key={slugs[i]} href={link(locale, `/${slugs[i]}`)} className={s.colLink}>
              {label}
            </Link>
          ))}
        </div>

        <div className={s.col}>
          <p className={s.colTitle}>{chrome.footerSocialLabel}</p>
          {settings?.instagramUrl && (
            <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className={s.colLink}>
              Instagram · {settings.instagramHandle}
            </a>
          )}
          <a
            href={settings?.whatsappNumber ? `https://wa.me/${settings.whatsappNumber}` : 'https://wa.me/'}
            target="_blank"
            rel="noopener noreferrer"
            className={s.colLink}
          >
            WhatsApp Made
          </a>
        </div>
      </div>

      <div className={s.bottom}>
        <span className={s.credit}>
          {chrome.footerCredit}{' '}
          <a href="https://pablopedrosa.com" target="_blank" rel="noopener noreferrer" className={s.creditLink}>
            Pablo Pedrosa
          </a>
        </span>
        <span className={s.dot}>·</span>
        <span className={s.copy}>balibymade.com</span>
        <span className={s.dot}>·</span>
        <Link href={link(locale, '/privacy')} className={s.credit}>
          {cookieStrings(locale).privacyLabel}
        </Link>
      </div>
    </footer>
  )
}
