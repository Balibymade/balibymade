'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import type { SiteChrome, LocaleSetting } from '../../lib/queries'
import s from './Header.module.scss'

interface Props {
  locale: string
  transparent?: boolean
  chrome: SiteChrome
  enabledLocales: LocaleSetting[]
  logoSub: string
  logoMain: string
}

export default function Header({ locale, transparent = false, chrome, enabledLocales, logoSub, logoMain }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const segment = pathname.split('/').filter(Boolean)[1] ?? ''
  const activePage = segment || 'home'

  useEffect(() => {
    const id = 'bm-fonts'
    if (!document.getElementById(id)) {
      const link = document.createElement('link')
      link.id = id; link.rel = 'stylesheet'
      link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600;1,700&family=DM+Sans:wght@300;400;500;600&display=swap'
      document.head.appendChild(link)
    }
  }, [])

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 60) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const NAV = [
    { slug: '',               key: 'home',          label: chrome.navHome },
    { slug: 'experiences',    key: 'experiences',    label: chrome.navExperiences },
    { slug: 'route-builder',  key: 'route-builder',  label: chrome.navRouteBuilder },
    { slug: 'about',          key: 'about',          label: chrome.navAbout },
    { slug: 'contact',        key: 'contact',        label: chrome.navContact },
  ]

  const currentLang = enabledLocales.find(l => l.code === locale) ?? enabledLocales[0]
  const isTransparent = transparent && !scrolled && !menuOpen

  function localePath(targetLocale: string): string {
    const path = segment ? `/${segment}` : ''
    return `/${targetLocale}${path}`
  }

  return (
    <>
      <header className={`${s.header} ${isTransparent ? s.headerTransparent : s.headerSolid}`}>
        <div className={s.inner}>
          <Link href={`/${locale}`} className={s.logo} onClick={() => setMenuOpen(false)}>
            <span className={s.logoSub}>{logoSub}</span>
            <span className={s.logoMain}>{logoMain}</span>
          </Link>

          <nav className={s.desktopNav}>
            {NAV.map(item => (
              <Link
                key={item.key}
                href={`/${locale}${item.slug ? `/${item.slug}` : ''}`}
                className={`${s.navLink} ${activePage === item.key ? s.navLinkActive : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={s.actions}>
            <div className={s.langSelect} ref={langRef}>
              <button className={s.langBtn} onClick={() => setLangOpen(!langOpen)} aria-label="Change language">
                {currentLang?.flag && <Image src={currentLang.flag} alt={currentLang.label} width={18} height={13} className={s.flag} />}
                <span className={s.langCode}>{locale.toUpperCase()}</span>
                <span className={`${s.langChevron} ${langOpen ? s.langChevronOpen : ''}`}>▾</span>
              </button>
              {langOpen && (
                <div className={s.langDropdown}>
                  {enabledLocales.map(l => (
                    <Link
                      key={l.code}
                      href={localePath(l.code)}
                      className={`${s.langOption} ${l.code === locale ? s.langOptionActive : ''}`}
                      onClick={() => setLangOpen(false)}
                    >
                      <Image src={l.flag} alt={l.label} width={18} height={13} className={s.flag} />
                      <span className={s.langOptionLabel}>{l.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href={`/${locale}/contact`} className={s.ctaBtn}>{chrome.navCta}</Link>

            <button
              className={`${s.hamburger} ${menuOpen ? s.hamburgerOpen : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className={s.bar} />
              <span className={s.bar} />
              <span className={s.bar} />
            </button>
          </div>
        </div>
      </header>

      <div className={`${s.mobileOverlay} ${menuOpen ? s.mobileOverlayOpen : ''}`} aria-hidden={!menuOpen}>
        {NAV.map(item => (
          <Link
            key={item.key}
            href={`/${locale}${item.slug ? `/${item.slug}` : ''}`}
            className={`${s.mobileNavLink} ${activePage === item.key ? s.mobileNavLinkActive : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}

        <Link href={`/${locale}/contact`} className={s.mobileCta} onClick={() => setMenuOpen(false)}>
          {chrome.navCta}
        </Link>

        <div className={s.mobileLangSection}>
          <span className={s.mobileLangLabel}>Language</span>
          <div className={s.mobileLangGrid}>
            {enabledLocales.map(l => (
              <Link
                key={l.code}
                href={localePath(l.code)}
                className={`${s.mobileLangBtn} ${l.code === locale ? s.mobileLangBtnActive : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <Image src={l.flag} alt={l.label} width={18} height={13} className={s.flag} />
                <span className={s.mobileLangName}>{l.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
