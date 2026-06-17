import Link from 'next/link'
import { getAboutPage, getSiteChrome, getSiteSettings } from '../../../lib/queries'
import s from './About.module.scss'

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [page, chrome, settings] = await Promise.all([
    getAboutPage(locale),
    getSiteChrome(locale),
    getSiteSettings(),
  ])

  if (!page || !chrome) return null

  const waUrl = settings?.whatsappNumber ? `https://wa.me/${settings.whatsappNumber}` : 'https://wa.me/'

  return (
    <div className={s.page}>
      {/* QUOTE HERO */}
      <section className={s.quoteHero}>
        <div className={s.quoteBg} style={{ backgroundImage: "url('/demos/balibymade/hero-tegallalang.jpg')" }} />
        <div className={s.quoteOverlay} />
        <div className={s.quoteContent}>
          <blockquote className={s.quote}>
            {page.quoteText.split('\n').map((line, i) => (
              <span key={i} className={s.quoteLine}>{line}</span>
            ))}
          </blockquote>
          <cite className={s.quoteCite}>{page.quoteCredit}</cite>
        </div>
      </section>

      {/* BIO */}
      <section className={s.bio}>
        <div className={s.container}>
          <div className={s.bioLayout}>
            <div className={s.bioLeft}>
              <div className={s.bioImageWrap}>
                <img src="/demos/balibymade/hero-path.jpg" alt="Made — Local Bali guide" className={s.bioImage} />
                <div className={s.bioImageBg} />
              </div>
              <div className={s.bioCard}>
                <div className={s.bioCardDot} />
                <span className={s.bioCardLabel}>{page.availableBadge}</span>
              </div>
            </div>

            <div className={s.bioRight}>
              <p className={s.overline}>{page.bioOverline}</p>
              <h1 className={s.bioH1}>{page.bioH1}</h1>
              <p className={s.bioSub}>{page.bioSub}</p>
              <p className={s.bioPara}>{page.bioP1}</p>
              <p className={s.bioPara}>{page.bioP2}</p>
              <p className={s.bioPara}>{page.bioP3}</p>
              <Link href={`/${locale}/contact`} className={s.bioBtn}>{chrome.navCta}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className={s.values}>
        <div className={s.container}>
          <p className={s.valuesOverline}>{page.valuesOverline}</p>
          <div className={s.valuesGrid}>
            {page.valuesItems.map(item => (
              <div key={item.title} className={s.valueCard}>
                <span className={s.valueIcon}>{item.icon}</span>
                <h3 className={s.valueTitle}>{item.title}</h3>
                <p className={s.valueDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={s.ctaBanner}>
        <div className={s.container}>
          <div className={s.ctaInner}>
            <p className={s.ctaText}>{page.ctaQuestion}</p>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className={s.ctaBtn}>{chrome.ctaBtn}</a>
          </div>
        </div>
      </section>
    </div>
  )
}
