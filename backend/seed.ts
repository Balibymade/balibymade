/**
 * Seed inicial para balibymade.com — extrae todo el contenido de la demo
 * (lib/demo/content/balibymade en pablopedrosa.com) y lo carga en Keystone
 * en los 22 idiomas, replicando el mismo fallback parcial→inglés que usa
 * la demo (resolveLocale).
 *
 * Ejecutar: npm run seed
 */
import { PrismaClient } from '@prisma/client'
import { LANGS, resolveLocale } from './seed-data/i18n-data'
import { DESTINATIONS, CATEGORY_META } from './seed-data/destinations-data'

const prisma = new PrismaClient()

const ROUTE_PRICES = [65, 110, 90, 95, 65, 100, 75, 70, 120, 160]

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function categoryLabel(meta: typeof CATEGORY_META[keyof typeof CATEGORY_META], locale: string): string {
  if (locale === 'es') return meta.labelEs
  if (locale === 'id') return meta.labelId
  if (locale === 'ru') return meta.labelRu
  return meta.labelEn
}

const ABOUT_AVAILABLE_BADGE: Record<string, string> = {
  en: 'Available for private trips',
  es: 'Disponible para viajes privados',
  id: 'Tersedia untuk perjalanan pribadi',
}
const ABOUT_CTA_QUESTION: Record<string, string> = {
  en: 'Want to meet Made?',
  es: '¿Quieres conocer a Made?',
  id: 'Ingin bertemu Made?',
}

async function main() {
  console.log('🌱 Iniciando seed de balibymade.com...')

  // ── LOCALE SETTINGS ─────────────────────────────────────────────────────────
  console.log('→ Idiomas')
  for (let i = 0; i < LANGS.length; i++) {
    const l = LANGS[i]
    await prisma.localeSetting.upsert({
      where: { code: l.code },
      update: { label: l.label, flag: l.flag, order: i, enabled: true },
      create: { code: l.code, label: l.label, flag: l.flag, order: i, enabled: true },
    })
  }
  const LOCALE_CODES = LANGS.map(l => l.code)

  // ── DESTINATION CATEGORIES ──────────────────────────────────────────────────
  console.log('→ Categorías de destino')
  const categorySlugs = Object.keys(CATEGORY_META).filter(k => k !== 'all') as (keyof typeof CATEGORY_META)[]
  let catOrder = 0
  for (const slug of categorySlugs) {
    const meta = CATEGORY_META[slug]
    const category = await prisma.destinationCategory.create({
      data: { slug, emoji: meta.emoji, color: meta.color, order: catOrder++ },
    })
    for (const locale of LOCALE_CODES) {
      await prisma.destinationCategoryTranslation.create({
        data: { categoryId: category.id, locale, label: categoryLabel(meta, locale) },
      })
    }
  }

  // ── DESTINATIONS (141) ───────────────────────────────────────────────────────
  console.log(`→ Destinos (${DESTINATIONS.length})`)
  let destOrder = 0
  for (const d of DESTINATIONS) {
    const dest = await prisma.destination.create({
      data: {
        slug: d.id,
        category: { connect: { slug: d.category } },
        lat: d.lat,
        lng: d.lng,
        region: d.region,
        priceFromUbud: d.priceFromUbud,
        driveMinFromUbud: d.driveMinFromUbud,
        order: destOrder++,
        published: d.published,
      },
    })
    for (const locale of LOCALE_CODES) {
      const tr = (d.translations as Record<string, { name: string } | undefined>)[locale]
      const name = tr?.name ?? d.translations.en.name
      await prisma.destinationTranslation.create({
        data: { destinationId: dest.id, locale, name },
      })
    }
  }

  // ── ROUTES (10) ───────────────────────────────────────────────────────────────
  console.log('→ Rutas')
  const enT = resolveLocale('en')
  const routeIds: string[] = []
  for (let i = 0; i < enT.routes10.length; i++) {
    const r = enT.routes10[i]
    const route = await prisma.route.create({
      data: {
        slug: slugify(r.heroShort || r.title),
        emoji: r.emoji,
        priceUsd: ROUTE_PRICES[i],
        stars: r.stars,
        order: i + 1,
        published: true,
      },
    })
    routeIds.push(route.id)
    for (const locale of LOCALE_CODES) {
      const t = resolveLocale(locale)
      const lr = t.routes10[i]
      await prisma.routeTranslation.create({
        data: {
          routeId: route.id,
          locale,
          title: lr.title,
          heroShort: lr.heroShort,
          tagline: lr.tagline,
          path: lr.path,
          duration: lr.duration,
          level: lr.level,
          highlights: lr.highlights,
        },
      })
    }
  }

  // ── ROUTE ITINERARIES (r1Full / r2Full) ────────────────────────────────────
  console.log('→ Itinerarios detallados')
  const itineraries = [
    { key: 'r1Full' as const, slug: 'ubud-kintamani', routeId: routeIds[0] },
    { key: 'r2Full' as const, slug: 'kintamani-sidemen', routeId: routeIds[1] },
  ]
  for (const it of itineraries) {
    const itinerary = await prisma.routeItinerary.create({
      data: { slug: it.slug, route: { connect: { id: it.routeId } }, order: 0, published: true },
    })
    for (const locale of LOCALE_CODES) {
      const t = resolveLocale(locale)
      const full = t[it.key]
      await prisma.routeItineraryTranslation.create({
        data: {
          itineraryId: itinerary.id,
          locale,
          title: full.title,
          tagline: full.tagline,
          badge: full.badge,
          duration: full.duration,
          departure: full.departure,
          price: full.price,
          groupSize: full.groupSize,
          included: full.included,
          notIncluded: full.notIncluded,
          stops: full.stops,
          cta: full.cta,
        },
      })
    }
  }

  // ── AIRPORT ROUTES (6) ───────────────────────────────────────────────────────
  console.log('→ Rutas de aeropuerto')
  const enAirportRoutes = enT.airportTransfer.routes
  const airportRouteIds: string[] = []
  for (let i = 0; i < enAirportRoutes.length; i++) {
    const r = enAirportRoutes[i]
    const priceUsd = parseInt(String(r.price).replace(/[^0-9]/g, ''), 10) || 0
    const ar = await prisma.airportRoute.create({
      data: { slug: slugify(r.to), priceUsd, order: i, published: true },
    })
    airportRouteIds.push(ar.id)
    for (const locale of LOCALE_CODES) {
      const t = resolveLocale(locale)
      const lr = t.airportTransfer.routes[i]
      await prisma.airportRouteTranslation.create({
        data: { airportRouteId: ar.id, locale, to: lr.to, duration: lr.duration },
      })
    }
  }

  // ── SITE CHROME (nav, footer, cta global, routes section) ──────────────────
  console.log('→ Textos globales (SiteChrome)')
  const chrome = await prisma.siteChrome.create({ data: { label: 'Global' } })
  for (const locale of LOCALE_CODES) {
    const t = resolveLocale(locale)
    await prisma.siteChromeTranslation.create({
      data: {
        chromeId: chrome.id,
        locale,
        navHome: t.nav.home,
        navExperiences: t.nav.experiences,
        navRouteBuilder: t.nav.routeBuilder,
        navAbout: t.nav.about,
        navContact: t.nav.contact,
        navCta: t.nav.cta,
        footerTagline: t.footer.tagline,
        footerLinksLabel: t.footer.linksLabel,
        footerLinks: t.footer.links,
        footerSocialLabel: t.footer.socialLabel,
        footerCredit: t.footer.credit,
        ctaTitle: t.cta.title,
        ctaSub: t.cta.sub,
        ctaBtn: t.cta.btn,
        ctaNote: t.cta.note,
        routesSectionOverline: t.routesSection.overline,
        routesSectionTitle: t.routesSection.title,
        routesSectionSub: t.routesSection.sub,
        bookRouteCta: t.r1Full.cta,
      },
    })
  }

  // ── HOME PAGE ────────────────────────────────────────────────────────────────
  console.log('→ Página Home')
  const homePage = await prisma.homePage.create({ data: { label: 'Home' } })
  for (const locale of LOCALE_CODES) {
    const t = resolveLocale(locale)
    await prisma.homePageTranslation.create({
      data: {
        pageId: homePage.id,
        locale,
        heroTag: t.hero.tag,
        heroH1a: t.hero.h1a,
        heroH1b: t.hero.h1b,
        heroSub: t.hero.sub,
        heroCta1: t.hero.cta1,
        heroCta2: t.hero.cta2,
        heroScroll: t.hero.scroll,
        heroCardTag: t.hero.cardTag,
        heroCardName: t.hero.cardName,
        heroCardSub: t.hero.cardSub,
        heroCardStat: t.hero.cardStat,
        whyOverline: t.why.overline,
        whyTitle: t.why.title,
        whyItems: t.why.items,
      },
    })
  }

  // ── EXPERIENCES PAGE ─────────────────────────────────────────────────────────
  console.log('→ Página Experiences')
  const experiencesPage = await prisma.experiencesPage.create({ data: { label: 'Experiences' } })
  for (const locale of LOCALE_CODES) {
    const t = resolveLocale(locale)
    await prisma.experiencesPageTranslation.create({
      data: {
        pageId: experiencesPage.id,
        locale,
        heroTag: t.experiencesHero.tag,
        heroH1: t.experiencesHero.h1,
        heroH1b: t.experiencesHero.h1b,
        heroSub: t.experiencesHero.sub,
        includedOverline: t.includedSection.overline,
        includedTitle: t.includedSection.title,
        includedItems: t.includedSection.items,
        airportOverline: t.airportTransfer.overline,
        airportTitle: t.airportTransfer.title,
        airportTagline: t.airportTransfer.tagline,
        airportBadge: t.airportTransfer.badge,
        airportPrice: t.airportTransfer.price,
        airportShortDuration: t.airportTransfer.shortDuration,
        airportGroupSize: t.airportTransfer.groupSize,
        airportDesc: t.airportTransfer.desc,
        airportIncluded: t.airportTransfer.included,
        airportNotIncluded: t.airportTransfer.notIncluded,
        airportRoutesLabel: t.airportTransfer.routesLabel,
        airportNote: t.airportTransfer.note,
        airportCta: t.airportTransfer.cta,
        customTag: t.customRoute.tag,
        customTitle: t.customRoute.title,
        customPrice: t.customRoute.price,
        customDesc: t.customRoute.desc,
        customCta: t.customRoute.cta,
      },
    })
  }

  // ── ABOUT PAGE ───────────────────────────────────────────────────────────────
  console.log('→ Página About')
  const aboutPage = await prisma.aboutPage.create({ data: { label: 'About' } })
  for (const locale of LOCALE_CODES) {
    const t = resolveLocale(locale)
    await prisma.aboutPageTranslation.create({
      data: {
        pageId: aboutPage.id,
        locale,
        quoteText: t.aboutHero.quote,
        quoteCredit: t.aboutHero.credit,
        bioOverline: t.aboutBio.overline,
        bioH1: t.aboutBio.h1,
        bioSub: t.aboutBio.sub,
        bioP1: t.aboutBio.p1,
        bioP2: t.aboutBio.p2,
        bioP3: t.aboutBio.p3,
        availableBadge: ABOUT_AVAILABLE_BADGE[locale] ?? ABOUT_AVAILABLE_BADGE.en,
        valuesOverline: t.aboutValues.overline,
        valuesItems: t.aboutValues.items,
        ctaQuestion: ABOUT_CTA_QUESTION[locale] ?? ABOUT_CTA_QUESTION.en,
      },
    })
  }

  // ── CONTACT PAGE ─────────────────────────────────────────────────────────────
  console.log('→ Página Contact')
  const contactPage = await prisma.contactPage.create({ data: { label: 'Contact' } })
  for (const locale of LOCALE_CODES) {
    const t = resolveLocale(locale)
    await prisma.contactPageTranslation.create({
      data: {
        pageId: contactPage.id,
        locale,
        heroTag: t.contactHero.tag,
        heroH1: t.contactHero.h1,
        heroH1b: t.contactHero.h1b,
        heroSub: t.contactHero.sub,
        formNameLabel: t.contactForm.nameLabel,
        formEmailLabel: t.contactForm.emailLabel,
        formMessageLabel: t.contactForm.messageLabel,
        formMessagePlaceholder: t.contactForm.messagePlaceholder,
        formSubmit: t.contactForm.submit,
        formSuccessTitle: t.contactForm.successTitle,
        formSuccessText: t.contactForm.successText,
        formOrNote: t.contactForm.orNote,
        formWaBtn: t.contactForm.waBtn,
        formWaLabel: t.contactForm.waLabel,
        formWaSublabel: t.contactForm.waSublabel,
        noteTitle: t.contactNote.title,
        noteItems: t.contactNote.items,
      },
    })
  }

  // ── ROUTE BUILDER PAGE ───────────────────────────────────────────────────────
  console.log('→ Página Route Builder')
  const rbPage = await prisma.routeBuilderPage.create({ data: { label: 'Route Builder' } })
  for (const locale of LOCALE_CODES) {
    const t = resolveLocale(locale)
    const rb = t.routeBuilderPage
    await prisma.routeBuilderPageTranslation.create({
      data: {
        pageId: rbPage.id,
        locale,
        tag: rb.tag,
        h1: rb.h1,
        h1b: rb.h1b,
        sub: rb.sub,
        searchPlaceholder: rb.searchPlaceholder,
        destinationsLabel: rb.destinationsLabel,
        yourRoute: rb.yourRoute,
        stops: rb.stops,
        totalKm: rb.totalKm,
        estimatedTime: rb.estimatedTime,
        kmhNote: rb.kmhNote,
        addStops: rb.addStops,
        clearRoute: rb.clearRoute,
        bookCta: rb.bookCta,
        bookNote: rb.bookNote,
        removeStop: rb.removeStop,
        alreadyAdded: rb.alreadyAdded,
        addToRoute: rb.addToRoute,
        startPoint: rb.startPoint,
        noResults: rb.noResults,
        approx: rb.approx,
      },
    })
  }

  // ── SITE SETTINGS ────────────────────────────────────────────────────────────
  console.log('→ Ajustes del sitio')
  await prisma.siteSettings.create({
    data: {
      businessName: 'Bali By Made',
      logoSub: 'BALI BY',
      logoMain: 'MADE',
      whatsappNumber: '',
      instagramUrl: 'https://www.instagram.com/balibymade',
      instagramHandle: '@balibymade',
      contactEmail: '',
    },
  })

  console.log('✅ Seed completado.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
