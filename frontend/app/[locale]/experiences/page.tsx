import type { Metadata } from 'next'
import { getExperiencesPage, getSiteChrome, getRoutes, getAirportRoutes, getSiteSettings } from '../../../lib/queries'
import { buildMetadata } from '../../../lib/seoMetadata'
import s from './Experiences.module.scss'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata('experiences', locale, '/experiences')
}

const ROUTE_IMAGES = [
  '/demos/balibymade/hero-batur.jpg',
  '/demos/balibymade/route-sidemen-valley.jpg',
  '/demos/balibymade/stop-green.jpg',
  '/demos/balibymade/hero-path.jpg',
  '/demos/balibymade/hero-tegallalang.jpg',
  '/demos/balibymade/stop-temple.jpg',
  '/demos/balibymade/hero-road.jpg',
  '/demos/balibymade/stop-coffee.jpg',
  '/demos/balibymade/card-road.jpg',
  '/demos/balibymade/card-batur.jpg',
]

export default async function ExperiencesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [page, chrome, routes, airportRoutes, settings] = await Promise.all([
    getExperiencesPage(locale),
    getSiteChrome(locale),
    getRoutes(locale),
    getAirportRoutes(locale),
    getSiteSettings(),
  ])

  if (!page || !chrome) return null

  const waBase = settings?.whatsappNumber ? `https://wa.me/${settings.whatsappNumber}` : 'https://wa.me/'
  const airportBookMsg = encodeURIComponent("Hi Made! I'd like to book an airport transfer. Can you arrange a pick-up from Ngurah Rai Airport?")

  return (
    <div className={s.page}>
      {/* HERO */}
      <section className={s.hero}>
        <div className={s.heroBg} style={{ backgroundImage: "url('/demos/balibymade/hero-tegallalang.jpg')" }} />
        <div className={s.heroOverlay} />
        <div className={s.heroContent}>
          <div className={s.heroLeft}>
            <span className={s.heroTag}>{page.heroTag}</span>
            <h1 className={s.h1}>
              <span>{page.heroH1}</span>
              <em className={s.h1Em}>{page.heroH1b}</em>
            </h1>
            <p className={s.heroSub}>{page.heroSub}</p>
          </div>
          <div className={s.heroRight}>
            <div className={s.heroCard}>
              <div className={s.heroCardImg} style={{ backgroundImage: "url('/demos/balibymade/card-batur.jpg')" }} />
              <div className={s.heroCardOverlay} />
              <div className={s.heroCardBadge}>{page.heroTag}</div>
              <div className={s.heroCardRoutes}>
                {routes.slice(0, 3).map((r, i) => (
                  <div key={r.id}>
                    {i > 0 && <div className={s.heroCardDivider} />}
                    <div className={s.heroCardRoute}>
                      <span className={s.heroCardN}>{String(i + 1).padStart(2, '0')}</span>
                      <span className={s.heroCardRouteName}>{r.translations[0]?.heroShort}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10 ROUTES GRID */}
      <section className={s.routesSection}>
        <div className={s.container}>
          <span className={s.overline}>{chrome.routesSectionOverline}</span>
          <h2 className={s.sectionTitle}>{chrome.routesSectionTitle}</h2>
          <p className={s.sectionSub}>{chrome.routesSectionSub}</p>
          <div className={s.routesGrid}>
            {routes.map((route, i) => {
              const tr = route.translations[0]
              if (!tr) return null
              return (
                <div key={route.id} className={s.routeCard}>
                  <div className={s.routeCardImgWrap}>
                    <div className={s.routeCardBg} style={{ backgroundImage: `url('${route.image?.url ?? ROUTE_IMAGES[i % ROUTE_IMAGES.length]}')` }} />
                    <div className={s.routeCardImgOverlay} />
                  </div>
                  <div className={s.routeCardContent}>
                    <div className={s.routeCardHeader}>
                      <span className={s.routeCardEmoji}>{route.emoji}</span>
                      <span className={s.routeCardNum}>{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className={s.routeCardTitle}>{tr.title}</h3>
                    <p className={s.routeCardTagline}>{tr.tagline}</p>
                    <p className={s.routeCardPath}>{tr.path}</p>
                    <div className={s.routeHighlights}>
                      {tr.highlights.map((h, j) => (
                        <span key={j} className={s.routeHighlight}>{h}</span>
                      ))}
                    </div>
                    <div className={s.routeCardFooter}>
                      <div className={s.routeCardFooterLeft}>
                        <span className={s.routeDuration}>🚗 {tr.duration}</span>
                        <span className={s.routeLevel}>{tr.level} {'⭐'.repeat(route.stars)}</span>
                      </div>
                      <span className={s.routeCardPrice}>from ${route.priceUsd}</span>
                    </div>
                    <a
                      href={`${waBase}?text=${encodeURIComponent(`${chrome.bookRouteCta}: ${tr.title}\n${tr.path}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={s.routeBookBtn}
                    >
                      {chrome.bookRouteCta} →
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className={s.includedSection}>
        <div className={s.container}>
          <span className={s.overline}>{page.includedOverline}</span>
          <h2 className={s.sectionTitle}>{page.includedTitle}</h2>
          <div className={s.includedGrid}>
            {page.includedItems.map((item, i) => (
              <div key={i} className={s.includedItem}>
                <span className={s.includedIcon}>{item.icon}</span>
                <span className={s.includedText}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AIRPORT TRANSFER */}
      <section className={s.airportSection}>
        <div className={s.container}>
          <div className={s.airportGrid}>
            <div className={s.airportLeft}>
              <span className={s.airportIcon}>✈️</span>
              <span className={s.overline} style={{ marginTop: 12 }}>{page.airportOverline}</span>
              <h2 className={s.airportTitle}>{page.airportTitle}</h2>
              <p className={s.airportDesc}>{page.airportDesc}</p>
              <div className={s.airportIncluded}>
                {page.airportIncluded.map((item, i) => (
                  <span key={i} className={s.airportChip}>✓ {item}</span>
                ))}
              </div>
              <a href={`${waBase}?text=${airportBookMsg}`} target="_blank" rel="noopener noreferrer" className={s.airportBtn}>
                {page.airportCta}
              </a>
            </div>

            <div className={s.airportRight}>
              <div className={s.airportTableLabel}>{page.airportRoutesLabel}</div>
              <div className={s.airportTable}>
                {airportRoutes.map(r => {
                  const tr = r.translations[0]
                  if (!tr) return null
                  return (
                    <div key={r.id} className={s.airportRow}>
                      <span className={s.airportTo}>{tr.to}</span>
                      <span className={s.airportDur}>{tr.duration}</span>
                      <span className={s.airportPrice}>${r.priceUsd}</span>
                    </div>
                  )
                })}
              </div>
              <p className={s.airportNote}>{page.airportNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT MADE */}
      <section className={s.contactSection}>
        <div className={s.container}>
          <div className={s.contactCard}>
            <div className={s.contactCardLeft}>
              <span className={s.contactEmoji}>📱</span>
              <h2 className={s.contactTitle}>{chrome.ctaTitle}</h2>
              <p className={s.contactSub}>{chrome.ctaSub}</p>
            </div>
            <div className={s.contactCardRight}>
              <a href={waBase} target="_blank" rel="noopener noreferrer" className={s.contactBtn}>
                {chrome.ctaBtn}
              </a>
              <p className={s.contactNote}>{chrome.ctaNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOM */}
      <section id="custom" className={s.custom}>
        <div className={s.container}>
          <div className={s.customInner}>
            <span className={s.customTag}>{page.customTag}</span>
            <h2 className={s.customTitle}>{page.customTitle}</h2>
            <p className={s.customDesc}>{page.customDesc}</p>
            <a href={waBase} target="_blank" rel="noopener noreferrer" className={s.customBtn}>
              {page.customCta}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
