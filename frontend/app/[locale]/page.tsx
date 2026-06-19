import Link from 'next/link'
import type { Metadata } from 'next'
import { getHomePage, getSiteChrome, getRoutes, getSiteSettings } from '../../lib/queries'
import { buildMetadata } from '../../lib/seoMetadata'
import { link } from '../../lib/links'
import s from './Home.module.scss'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata('home', locale, '')
}

const TEASER_IMAGES = [
  '/demos/balibymade/hero-tegallalang.jpg',
  '/demos/balibymade/hero-batur.jpg',
  '/demos/balibymade/route-sidemen-valley.jpg',
  '/demos/balibymade/stop-green.jpg',
  '/demos/balibymade/hero-tegallalang.jpg',
]
const TEASER_ORDERS = [1, 2, 3, 5] // Route.order de las 4 rutas destacadas en home

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [home, chrome, routes, settings] = await Promise.all([
    getHomePage(locale),
    getSiteChrome(locale),
    getRoutes(locale),
    getSiteSettings(),
  ])

  if (!home || !chrome) return null

  const teaserRoutes = TEASER_ORDERS.map(order => routes.find(r => r.order === order)).filter(Boolean)
  const waUrl = settings?.whatsappNumber ? `https://wa.me/${settings.whatsappNumber}` : 'https://wa.me/'

  return (
    <div className={s.page}>
      {/* HERO */}
      <section className={s.hero}>
        <div className={s.heroBg} style={{ backgroundImage: "url('/demos/balibymade/hero-tegallalang.jpg')" }} />
        <div className={s.heroOverlay} />
        <div className={s.heroContent}>
          <div className={s.heroLeft}>
            <span className={s.heroTag}>{home.heroTag}</span>
            <h1 className={s.h1}>
              <span className={s.h1Line}>{home.heroH1a}</span>
              <em className={s.h1Em}>{home.heroH1b}</em>
            </h1>
            <p className={s.heroSub}>{home.heroSub}</p>
            <div className={s.heroCtas}>
              <Link href={link(locale, "/experiences")} className={s.btnTerra}>{home.heroCta1}</Link>
              <Link href={link(locale, "/about")} className={s.btnGhost}>{home.heroCta2}</Link>
            </div>
          </div>

          <div className={s.heroRight}>
            <div className={s.photoCard}>
              <div className={s.photoCardImg} style={{ backgroundImage: "url('/demos/balibymade/card-road.jpg')" }} />
              <div className={s.photoCardOverlay} />
              <div className={s.photoCardBadge}>{home.heroCardTag}</div>
              <div className={s.photoCardBottom}>
                <p className={s.photoCardName}>{home.heroCardName}</p>
                <p className={s.photoCardSub}>{home.heroCardSub}</p>
              </div>
              <div className={s.photoCardStat}>
                <span className={s.photoCardStatDot} />
                {home.heroCardStat}
              </div>
            </div>
            <div className={s.accentCard}>
              <span className={s.accentIcon}>🌿</span>
              <span className={s.accentText}>
                {home.whyItems[0]?.title}. {home.whyItems[1]?.title}.
              </span>
            </div>
          </div>
        </div>

        <div className={s.heroScroll}>
          <span className={s.heroScrollLine} />
          <span className={s.heroScrollText}>{home.heroScroll}</span>
        </div>
      </section>

      {/* ROUTES TEASER */}
      <section className={s.routes}>
        <div className={s.container}>
          <p className={s.overline}>{chrome.routesSectionOverline}</p>
          <h2 className={s.sectionTitle}>{chrome.routesSectionTitle}</h2>
          <p className={s.sectionSub}>{chrome.routesSectionSub}</p>
          <div className={s.routeGrid}>
            {teaserRoutes.map((route, i) => {
              if (!route) return null
              const tr = route.translations[0]
              if (!tr) return null
              return (
                <div key={route.id} className={s.routeCard}>
                  <div className={s.routeImg} style={{ backgroundImage: `url('${route.image?.url ?? TEASER_IMAGES[i]}')` }}>
                    <div className={s.routeImgOverlay} />
                    <span className={s.routeTag}>{route.emoji} {tr.tagline}</span>
                  </div>
                  <div className={s.routeBody}>
                    <div className={s.routeMeta}><span className={s.routeDuration}>🚗 {tr.duration}</span></div>
                    <h3 className={s.routeTitle}>{tr.title}</h3>
                    <p className={s.routeDesc}>{tr.path.split('·').slice(0, 3).join('·')}</p>
                    <Link href={link(locale, "/experiences")} className={s.routeCta}>
                      {chrome.bookRouteCta} →
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
          <div className={s.routesSeeAll}>
            <Link href={link(locale, "/experiences")} className={s.routesSeeAllBtn}>
              {routes.length} routes →
            </Link>
          </div>
        </div>
      </section>

      {/* WHY MADE */}
      <section className={s.why}>
        <div className={s.container}>
          <p className={s.overline}>{home.whyOverline}</p>
          <h2 className={s.sectionTitleLight}>{home.whyTitle}</h2>
          <div className={s.whyGrid}>
            {home.whyItems.map(item => (
              <div key={item.title} className={s.whyCard}>
                <span className={s.whyIcon}>{item.icon}</span>
                <h3 className={s.whyTitle}>{item.title}</h3>
                <p className={s.whyDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className={s.ctaBanner}>
        <div className={s.ctaBannerBg} style={{ backgroundImage: "url('/demos/balibymade/hero-batur.jpg')" }} />
        <div className={s.ctaBannerOverlay} />
        <div className={s.ctaBannerContent}>
          <h2 className={s.ctaTitle}>{chrome.ctaTitle}</h2>
          <p className={s.ctaSub}>{chrome.ctaSub}</p>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className={s.ctaBtn}>{chrome.ctaBtn}</a>
          <p className={s.ctaNote}>✦ {chrome.ctaNote}</p>
        </div>
      </section>

      {/* FAQ — SEO + GEO (FAQPage schema.org, contenido citable por motores de respuesta IA) */}
      {home.faqItems.length > 0 && (
        <section className={s.why} aria-labelledby="faq-title">
          <div className={s.container}>
            <h2 id="faq-title" className={s.sectionTitleLight}>{home.faqTitle}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
              {home.faqItems.map((item, i) => (
                <div key={i}>
                  <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '.4rem' }}>{item.question}</h3>
                  <p style={{ color: 'rgba(255,255,255,.75)', lineHeight: 1.6 }}>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: home.faqItems.map(item => ({
                  '@type': 'Question',
                  name: item.question,
                  acceptedAnswer: { '@type': 'Answer', text: item.answer },
                })),
              }),
            }}
          />
        </section>
      )}
    </div>
  )
}
