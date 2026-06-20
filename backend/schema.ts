import { list, graphql } from '@keystone-6/core'
import { publicReadAdminWrite, adminOnly } from './access'
import {
  text,
  password,
  timestamp,
  checkbox,
  integer,
  float,
  relationship,
  image,
  json,
  virtual,
} from '@keystone-6/core/fields'
import { type Lists } from '.keystone/types'

// Campo virtual "Locale + contenido" para que las listas de traducción (con muchas filas
// por entidad padre: Destinos, Rutas, Categorías...) se identifiquen de un vistazo en lugar
// de mostrar un ID o solo el código de idioma repetido.
const displayLabel = (contentField: string) =>
  virtual({
    field: graphql.field({
      type: graphql.String,
      resolve(item: any) {
        const content = item[contentField]
        return content ? `${item.locale} — ${content}` : item.locale
      },
    }),
  })

const publishedField = () => checkbox({
  defaultValue: false,
  ui: { description: 'Check this box to make the content visible on the public website.' },
})

// ── Helpers para hooks de traducción automática ────────────────────────────────
// Mismo patrón que pablopedrosa.com: al crear una entidad principal, se generan
// automáticamente traducciones vacías para cada locale habilitado en LocaleSetting.
// Al habilitar un locale nuevo, se rellenan las traducciones que faltan en todo lo existente.

async function getEnabledLocaleCodes(prisma: any): Promise<string[]> {
  const rows = await prisma.localeSetting.findMany({
    where: { enabled: true },
    select: { code: true },
  })
  return rows.map((r: any) => r.code as string)
}

const TRANSLATION_SPECS = [
  {
    translationModel: 'destinationCategoryTranslation',
    parentModel:      'destinationCategory',
    parentKey:        'categoryId',
    emptyData:        { label: '' },
  },
  {
    translationModel: 'destinationTranslation',
    parentModel:      'destination',
    parentKey:        'destinationId',
    emptyData:        { name: '' },
  },
  {
    translationModel: 'routeTranslation',
    parentModel:      'route',
    parentKey:        'routeId',
    emptyData:        { title: '', heroShort: '', tagline: '', path: '', duration: '', level: '', highlights: [] },
  },
  {
    translationModel: 'routeItineraryTranslation',
    parentModel:      'routeItinerary',
    parentKey:        'itineraryId',
    emptyData:        {
      title: '', tagline: '', badge: '', duration: '', departure: '', price: '', groupSize: '',
      included: [], notIncluded: [], stops: [], cta: '',
    },
  },
  {
    translationModel: 'airportRouteTranslation',
    parentModel:      'airportRoute',
    parentKey:        'airportRouteId',
    emptyData:        { to: '', duration: '' },
  },
  {
    translationModel: 'siteChromeTranslation',
    parentModel:      'siteChrome',
    parentKey:        'chromeId',
    emptyData:        {
      navHome: '', navExperiences: '', navRouteBuilder: '', navAbout: '', navContact: '', navCta: '',
      footerTagline: '', footerLinksLabel: '', footerLinks: [], footerSocialLabel: '', footerCredit: '',
      ctaTitle: '', ctaSub: '', ctaBtn: '', ctaNote: '',
      routesSectionOverline: '', routesSectionTitle: '', routesSectionSub: '',
      bookRouteCta: '',
    },
  },
  {
    translationModel: 'homePageTranslation',
    parentModel:      'homePage',
    parentKey:        'pageId',
    emptyData:        {
      heroTag: '', heroH1a: '', heroH1b: '', heroSub: '', heroCta1: '', heroCta2: '', heroScroll: '',
      heroCardTag: '', heroCardName: '', heroCardSub: '', heroCardStat: '',
      whyOverline: '', whyTitle: '', whyItems: [],
      faqTitle: '', faqItems: [],
    },
  },
  {
    translationModel: 'sEOPageTranslation',
    parentModel:      'sEOPage',
    parentKey:        'seoPageId',
    emptyData:        { title: '', description: '' },
  },
  {
    translationModel: 'experiencesPageTranslation',
    parentModel:      'experiencesPage',
    parentKey:        'pageId',
    emptyData:        {
      heroTag: '', heroH1: '', heroH1b: '', heroSub: '',
      includedOverline: '', includedTitle: '', includedItems: [],
      airportOverline: '', airportTitle: '', airportTagline: '', airportBadge: '', airportPrice: '',
      airportShortDuration: '', airportGroupSize: '', airportDesc: '', airportIncluded: [], airportNotIncluded: [],
      airportRoutesLabel: '', airportNote: '', airportCta: '',
      customTag: '', customTitle: '', customPrice: '', customDesc: '', customCta: '',
    },
  },
  {
    translationModel: 'aboutPageTranslation',
    parentModel:      'aboutPage',
    parentKey:        'pageId',
    emptyData:        {
      quoteText: '', quoteCredit: '',
      bioOverline: '', bioH1: '', bioSub: '', bioP1: '', bioP2: '', bioP3: '',
      availableBadge: '',
      valuesOverline: '', valuesItems: [],
      ctaQuestion: '',
    },
  },
  {
    translationModel: 'contactPageTranslation',
    parentModel:      'contactPage',
    parentKey:        'pageId',
    emptyData:        {
      heroTag: '', heroH1: '', heroH1b: '', heroSub: '',
      formNameLabel: '', formEmailLabel: '', formMessageLabel: '', formMessagePlaceholder: '',
      formSubmit: '', formSuccessTitle: '', formSuccessText: '', formOrNote: '',
      formWaBtn: '', formWaLabel: '', formWaSublabel: '',
      noteTitle: '', noteItems: [],
    },
  },
  {
    translationModel: 'routeBuilderPageTranslation',
    parentModel:      'routeBuilderPage',
    parentKey:        'pageId',
    emptyData:        {
      tag: '', h1: '', h1b: '', sub: '', searchPlaceholder: '', destinationsLabel: '',
      yourRoute: '', stops: '', totalKm: '', estimatedTime: '', kmhNote: '', addStops: '',
      clearRoute: '', bookCta: '', bookNote: '', removeStop: '', alreadyAdded: '', addToRoute: '',
      startPoint: '', noResults: '', approx: '',
    },
  },
] as const

async function createTranslationsForNewEntity(
  prisma: any,
  translationModel: string,
  parentKey: string,
  entityId: string,
  emptyData: Record<string, unknown>,
) {
  const locales = await getEnabledLocaleCodes(prisma)
  for (const locale of locales) {
    try {
      await prisma[translationModel].create({
        data: { [parentKey]: entityId, locale, ...emptyData },
      })
    } catch (e) {
      console.error(`[hook] Error creando traducción ${translationModel} [${locale}]:`, e)
    }
  }
}

async function addLocaleToAllExistingEntities(prisma: any, locale: string) {
  for (const { translationModel, parentModel, parentKey, emptyData } of TRANSLATION_SPECS) {
    try {
      const entities: { id: string }[] = await prisma[parentModel].findMany({ select: { id: true } })
      const existing: any[] = await prisma[translationModel].findMany({
        where: { locale },
        select: { [parentKey]: true },
      })
      const existingSet = new Set(existing.map((r: any) => r[parentKey]))
      const toCreate = entities.filter(e => !existingSet.has(e.id))
      for (const { id } of toCreate) {
        await prisma[translationModel].create({
          data: { [parentKey]: id, locale, ...emptyData },
        })
      }
      if (toCreate.length > 0) {
        console.log(`[hook] Locale ${locale}: ${toCreate.length} traducciones añadidas a ${translationModel}`)
      }
    } catch (e) {
      console.error(`[hook] Error añadiendo locale ${locale} a ${translationModel}:`, e)
    }
  }
}

function makeTranslationHook(
  translationModel: string,
  parentKey: string,
  emptyData: Record<string, unknown>,
) {
  return {
    afterOperation: async ({ operation, item, context }: any) => {
      if (operation !== 'create') return
      await createTranslationsForNewEntity(
        context.prisma,
        translationModel,
        parentKey,
        item.id as string,
        emptyData,
      )
    },
  }
}

// Texto multilínea: una entrada por línea → array de strings en el frontend.
const linesField = (description: string) =>
  text({ ui: { displayMode: 'textarea', description } })

export const lists: Lists = {

  // ── LOCALE SETTING ───────────────────────────────────────────────────────────
  LocaleSetting: list({
    access: publicReadAdminWrite,
    graphql: { plural: 'LocaleSettingItems' },
    ui: {
      label: 'Languages',
      labelField: 'label',
      listView: { initialColumns: ['label', 'code', 'order', 'enabled'] },
    },
    fields: {
      code:    text({ validation: { isRequired: true }, isIndexed: 'unique', ui: { description: 'ISO language code (es, en, id, ru, ...)' } }),
      label:   text({ validation: { isRequired: true }, ui: { description: 'Display name (Español, English, Bahasa Indonesia...)' } }),
      flag:    text({ ui: { description: 'Flag icon path, e.g. /flags/en.svg' } }),
      order:   integer({ defaultValue: 0, ui: { description: 'Order in the language selector' } }),
      enabled: checkbox({ defaultValue: true, ui: { description: 'Uncheck to hide this language on the website.' } }),
    },
    hooks: {
      afterOperation: async ({ operation, item, originalItem, context }: any) => {
        const prisma = context.prisma
        const isNewEnabled = operation === 'create' && item.enabled === true
        const justEnabled  = operation === 'update' && item.enabled === true && originalItem?.enabled === false
        if (isNewEnabled || justEnabled) {
          console.log(`[hook] Nuevo locale habilitado: ${item.code}. Creando traducciones vacías...`)
          await addLocaleToAllExistingEntities(prisma, item.code as string)
        }
      },
    },
  }),

  // ── USER ────────────────────────────────────────────────────────────────────
  User: list({
    access: adminOnly,
    ui: { labelField: 'name' },
    fields: {
      name:      text({ validation: { isRequired: true } }),
      email:     text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      password:  password({ validation: { isRequired: true } }),
      createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    },
  }),

  // ── SITE SETTINGS (singleton, sin traducir — datos de contacto del negocio) ──
  SiteSettings: list({
    access: publicReadAdminWrite,
    graphql: { plural: 'SiteSettingsItems' },
    ui: {
      label: 'Site settings',
      labelField: 'businessName',
      description: 'There should only be one row. Contact and brand data used across the whole site.',
    },
    fields: {
      businessName:   text({ defaultValue: 'Bali By Made', validation: { isRequired: true } }),
      logoSub:         text({ defaultValue: 'BALI BY', ui: { description: 'Top line of the logo' } }),
      logoMain:        text({ defaultValue: 'MADE', ui: { description: 'Main line of the logo' } }),
      whatsappNumber:  text({ ui: { description: 'Full number with country code, e.g. 6281234567890 (no +, used for wa.me)' } }),
      instagramUrl:    text({ defaultValue: 'https://www.instagram.com/balibymade' }),
      instagramHandle: text({ defaultValue: '@balibymade' }),
      contactEmail:    text(),
    },
  }),

  // ── DESTINATION CATEGORY ──────────────────────────────────────────────────────
  DestinationCategory: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Destination categories',
      labelField: 'slug',
      listView: { initialColumns: ['slug', 'emoji', 'color', 'order'] },
    },
    fields: {
      slug:         text({ validation: { isRequired: true }, isIndexed: 'unique', ui: { description: 'temple, waterfall, volcano, rice-terrace, beach, village, viewpoint, coast, market, lake, cultural, forest, airport...' } }),
      emoji:        text({ validation: { isRequired: true } }),
      color:        text({ validation: { isRequired: true }, ui: { description: 'Hex color, e.g. #c9a84c' } }),
      order:        integer({ defaultValue: 0 }),
      translations: relationship({ ref: 'DestinationCategoryTranslation.category', many: true }),
    },
    hooks: makeTranslationHook('destinationCategoryTranslation', 'categoryId', { label: '' }),
  }),

  DestinationCategoryTranslation: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Destination categories · Translations',
      labelField: 'displayLabel',
      listView: { initialColumns: ['category', 'locale', 'label'] },
    },
    fields: {
      category:    relationship({ ref: 'DestinationCategory.translations' }),
      locale:      text({ validation: { isRequired: true } }),
      label:       text({ validation: { isRequired: true } }),
      displayLabel: displayLabel('label'),
    },
  }),

  // ── DESTINATION ───────────────────────────────────────────────────────────────
  Destination: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Destinations',
      labelField: 'slug',
      listView: { initialColumns: ['slug', 'category', 'region', 'priceFromUbud', 'order', 'published'] },
    },
    fields: {
      published:        publishedField(),
      slug:              text({ validation: { isRequired: true }, isIndexed: 'unique', ui: { description: 'Unique identifier, e.g. ubud, monkey-forest, tegallalang' } }),
      category:          relationship({ ref: 'DestinationCategory' }),
      lat:               float({ validation: { isRequired: true }, ui: { description: 'GPS latitude, e.g. -8.4305 (use Google Maps "what\'s here" to find it)' } }),
      lng:               float({ validation: { isRequired: true }, ui: { description: 'GPS longitude, e.g. 115.2502 (use Google Maps "what\'s here" to find it)' } }),
      region:             text({ validation: { isRequired: true }, ui: { description: 'Region or area, e.g. Ubud, Sidemen, Amed' } }),
      priceFromUbud:      integer({ validation: { isRequired: true }, ui: { description: 'Estimated price in USD, private car from Ubud' } }),
      driveMinFromUbud:   integer({ validation: { isRequired: true }, ui: { description: 'Drive minutes from Ubud' } }),
      order:              integer({ defaultValue: 0 }),
      translations:       relationship({ ref: 'DestinationTranslation.destination', many: true }),
    },
    hooks: makeTranslationHook('destinationTranslation', 'destinationId', { name: '' }),
  }),

  DestinationTranslation: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Destinations · Translations',
      labelField: 'displayLabel',
      listView: { initialColumns: ['destination', 'locale', 'name'] },
    },
    fields: {
      destination: relationship({ ref: 'Destination.translations' }),
      locale:      text({ validation: { isRequired: true } }),
      name:        text({ validation: { isRequired: true } }),
      displayLabel: displayLabel('name'),
    },
  }),

  // ── ROUTE (las 10 rutas de Experiences) ─────────────────────────────────────────
  Route: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Routes',
      labelField: 'slug',
      listView: { initialColumns: ['slug', 'emoji', 'priceUsd', 'stars', 'order', 'published'] },
    },
    fields: {
      published:    publishedField(),
      slug:         text({ validation: { isRequired: true }, isIndexed: 'unique', ui: { description: 'Unique identifier, e.g. kintamani-volcano-road' } }),
      emoji:        text({ validation: { isRequired: true } }),
      image:        image({ storage: 'balibymade_media' }),
      priceUsd:     integer({ validation: { isRequired: true }, ui: { description: '"From" price, in USD' } }),
      stars:        integer({ defaultValue: 5, ui: { description: 'Rating 1-5' } }),
      order:        integer({ defaultValue: 0 }),
      itinerary:    relationship({ ref: 'RouteItinerary.route', many: true }),
      translations: relationship({ ref: 'RouteTranslation.route', many: true }),
    },
    hooks: makeTranslationHook('routeTranslation', 'routeId', {
      title: '', heroShort: '', tagline: '', path: '', duration: '', level: '', highlights: [],
    }),
  }),

  RouteTranslation: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Routes · Translations',
      labelField: 'displayLabel',
      listView: { initialColumns: ['route', 'locale', 'title'] },
    },
    fields: {
      route:      relationship({ ref: 'Route.translations' }),
      locale:     text({ validation: { isRequired: true } }),
      title:      text({ validation: { isRequired: true }, ui: { description: 'E.g. Ubud → Kintamani Volcano Road' } }),
      heroShort:  text({ ui: { description: 'Short version of the title, used on small cards' } }),
      tagline:    text(),
      path:       text({ ui: { description: 'Stops separated by · , e.g. Ubud · Tirta Empul · Kintamani' } }),
      duration:   text({ ui: { description: 'E.g. Full day, Half day, 2–4 days' } }),
      level:      text({ ui: { description: 'E.g. Scenery, Adventure, Culture, Road trip, Epic' } }),
      highlights: json({ defaultValue: [], ui: { description: 'Array of strings with the route highlights' } }),
      displayLabel: displayLabel('title'),
    },
  }),

  // ── ROUTE ITINERARY (itinerarios completos con paradas, ej. r1Full/r2Full) ────
  RouteItinerary: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Detailed itineraries',
      labelField: 'slug',
      listView: { initialColumns: ['slug', 'route', 'order', 'published'] },
    },
    fields: {
      published:    publishedField(),
      slug:         text({ validation: { isRequired: true }, isIndexed: 'unique', ui: { description: 'Unique identifier, e.g. ubud-kintamani' } }),
      route:        relationship({ ref: 'Route.itinerary' }),
      image:        image({ storage: 'balibymade_media' }),
      order:        integer({ defaultValue: 0 }),
      translations: relationship({ ref: 'RouteItineraryTranslation.itinerary', many: true }),
    },
    hooks: makeTranslationHook('routeItineraryTranslation', 'itineraryId', {
      title: '', tagline: '', badge: '', duration: '', departure: '', price: '', groupSize: '',
      included: [], notIncluded: [], stops: [], cta: '',
    }),
  }),

  RouteItineraryTranslation: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Detailed itineraries · Translations',
      labelField: 'displayLabel',
      listView: { initialColumns: ['itinerary', 'locale', 'title'] },
    },
    fields: {
      itinerary:   relationship({ ref: 'RouteItinerary.translations' }),
      locale:      text({ validation: { isRequired: true } }),
      title:       text({ validation: { isRequired: true } }),
      tagline:     text(),
      badge:       text({ ui: { description: 'E.g. Day Tour' } }),
      duration:    text({ ui: { description: 'E.g. Half day · ~7 hours' } }),
      departure:   text({ ui: { description: 'E.g. Pick-up from your hotel in Ubud' } }),
      price:       text({ ui: { description: 'E.g. From $60 / private car' } }),
      groupSize:   text({ ui: { description: 'E.g. Up to 6 passengers' } }),
      included:    json({ defaultValue: [], ui: { description: 'Array of strings: what is included' } }),
      notIncluded: json({ defaultValue: [], ui: { description: 'Array of strings: what is not included' } }),
      stops:       json({ defaultValue: [], ui: { description: 'Array of stops: [{ n, time, place, desc }]' } }),
      cta:         text({ ui: { description: 'Booking button text' } }),
      displayLabel: displayLabel('title'),
    },
  }),

  // ── AIRPORT ROUTE (tabla de precios de transfer al aeropuerto) ────────────────
  AirportRoute: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Airport routes',
      labelField: 'slug',
      listView: { initialColumns: ['slug', 'priceUsd', 'order', 'published'] },
    },
    fields: {
      published:    publishedField(),
      slug:         text({ validation: { isRequired: true }, isIndexed: 'unique', ui: { description: 'E.g. kuta-seminyak-legian' } }),
      priceUsd:     integer({ validation: { isRequired: true }, ui: { description: '"From" price, in USD' } }),
      order:        integer({ defaultValue: 0 }),
      translations: relationship({ ref: 'AirportRouteTranslation.airportRoute', many: true }),
    },
    hooks: makeTranslationHook('airportRouteTranslation', 'airportRouteId', { to: '', duration: '' }),
  }),

  AirportRouteTranslation: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Airport routes · Translations',
      labelField: 'displayLabel',
      listView: { initialColumns: ['airportRoute', 'locale', 'to', 'duration'] },
    },
    fields: {
      airportRoute: relationship({ ref: 'AirportRoute.translations' }),
      locale:       text({ validation: { isRequired: true } }),
      to:           text({ validation: { isRequired: true }, ui: { description: 'E.g. Kuta / Seminyak / Legian' } }),
      duration:     text({ ui: { description: 'E.g. ~45 min' } }),
      displayLabel: displayLabel('to'),
    },
  }),

  // ── SITE CHROME (textos globales: nav, footer, cta genérico) ──────────────────
  SiteChrome: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Global text (menu, footer, CTA)',
      labelField: 'label',
      description: 'There should only be one row.',
    },
    fields: {
      label:        text({ defaultValue: 'Global', isIndexed: 'unique' }),
      translations: relationship({ ref: 'SiteChromeTranslation.chrome', many: true }),
    },
    hooks: makeTranslationHook('siteChromeTranslation', 'chromeId', {
      navHome: '', navExperiences: '', navRouteBuilder: '', navAbout: '', navContact: '', navCta: '',
      footerTagline: '', footerLinksLabel: '', footerLinks: [], footerSocialLabel: '', footerCredit: '',
      ctaTitle: '', ctaSub: '', ctaBtn: '', ctaNote: '',
      routesSectionOverline: '', routesSectionTitle: '', routesSectionSub: '',
      bookRouteCta: '',
    }),
  }),

  SiteChromeTranslation: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Global text · Translations',
      labelField: 'locale',
      listView: { initialColumns: ['chrome', 'locale', 'navHome'] },
    },
    fields: {
      chrome:  relationship({ ref: 'SiteChrome.translations' }),
      locale:  text({ validation: { isRequired: true } }),

      navHome:         text(),
      navExperiences:  text(),
      navRouteBuilder: text(),
      navAbout:        text(),
      navContact:      text(),
      navCta:          text({ ui: { description: 'E.g. Book a trip' } }),

      footerTagline:    text(),
      footerLinksLabel: text(),
      footerLinks:      json({ defaultValue: [], ui: { description: 'Array of 3 strings: Experiences, About Made, Contact' } }),
      footerSocialLabel: text(),
      footerCredit:     text({ ui: { description: 'E.g. Web concept by' } }),

      ctaTitle: text({ ui: { description: 'Headline of the global CTA banner shown at the bottom of the Home page' } }),
      ctaSub:   linesField('CTA banner text (ready to see the real Bali...)'),
      ctaBtn:   text({ ui: { description: 'Button text of the global CTA banner, e.g. Chat on WhatsApp' } }),
      ctaNote:  text({ ui: { description: 'Small note under the CTA banner button' } }),

      routesSectionOverline: text(),
      routesSectionTitle:    text(),
      routesSectionSub:      linesField('Subtitle of the "10 routes" section'),

      bookRouteCta: text({ ui: { description: 'Text reused in the booking buttons of each route card' } }),
    },
  }),

  // ── HOME PAGE ───────────────────────────────────────────────────────────────
  HomePage: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Page: Home',
      labelField: 'label',
      description: 'There should only be one row.',
    },
    fields: {
      label:        text({ defaultValue: 'Home', isIndexed: 'unique' }),
      heroImage:    image({ storage: 'balibymade_media' }),
      translations: relationship({ ref: 'HomePageTranslation.page', many: true }),
    },
    hooks: makeTranslationHook('homePageTranslation', 'pageId', {
      heroTag: '', heroH1a: '', heroH1b: '', heroSub: '', heroCta1: '', heroCta2: '', heroScroll: '',
      heroCardTag: '', heroCardName: '', heroCardSub: '', heroCardStat: '',
      whyOverline: '', whyTitle: '', whyItems: [],
    }),
  }),

  HomePageTranslation: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Home page · Translations',
      labelField: 'locale',
      listView: { initialColumns: ['page', 'locale', 'heroH1a'] },
    },
    fields: {
      page:   relationship({ ref: 'HomePage.translations' }),
      locale: text({ validation: { isRequired: true } }),

      heroTag:    text({ ui: { description: 'Small label above the headline, e.g. PRIVATE BALI GUIDE' } }),
      heroH1a:    text({ ui: { description: 'First line of the headline' } }),
      heroH1b:    text({ ui: { description: 'Second line of the headline (italic)' } }),
      heroSub:    linesField('Hero subtitle'),
      heroCta1:   text({ ui: { description: 'Main hero button text, e.g. Explore the routes' } }),
      heroCta2:   text({ ui: { description: 'Secondary hero button text, e.g. Meet Made' } }),
      heroScroll: text({ ui: { description: '"Scroll down" hint text near the bottom of the hero' } }),

      heroCardTag:  text(),
      heroCardName: text(),
      heroCardSub:  text(),
      heroCardStat: text(),

      whyOverline: text(),
      whyTitle:    text(),
      whyItems:    json({ defaultValue: [], ui: { description: 'Array [{ icon, title, desc }] — "Why Made" section' } }),

      faqTitle: text({ ui: { description: 'Title of the FAQ section (SEO/GEO)' } }),
      faqItems: json({ defaultValue: [], ui: { description: 'Array [{ question, answer }] — FAQs, shown on the home page and used as FAQPage schema.org for SEO and AI answer engines (GEO)' } }),
    },
  }),

  // ── EXPERIENCES PAGE ────────────────────────────────────────────────────────
  ExperiencesPage: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Page: Experiences',
      labelField: 'label',
      description: 'There should only be one row.',
    },
    fields: {
      label:        text({ defaultValue: 'Experiences', isIndexed: 'unique' }),
      translations: relationship({ ref: 'ExperiencesPageTranslation.page', many: true }),
    },
    hooks: makeTranslationHook('experiencesPageTranslation', 'pageId', {
      heroTag: '', heroH1: '', heroH1b: '', heroSub: '',
      includedOverline: '', includedTitle: '', includedItems: [],
      airportOverline: '', airportTitle: '', airportTagline: '', airportBadge: '', airportPrice: '',
      airportShortDuration: '', airportGroupSize: '', airportDesc: '', airportIncluded: [], airportNotIncluded: [],
      airportRoutesLabel: '', airportNote: '', airportCta: '',
      customTag: '', customTitle: '', customPrice: '', customDesc: '', customCta: '',
    }),
  }),

  ExperiencesPageTranslation: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Experiences page · Translations',
      labelField: 'locale',
      listView: { initialColumns: ['page', 'locale', 'heroH1'] },
    },
    fields: {
      page:   relationship({ ref: 'ExperiencesPage.translations' }),
      locale: text({ validation: { isRequired: true } }),

      heroTag: text({ ui: { description: 'Small label above the Experiences page headline' } }),
      heroH1:  text({ ui: { description: 'First line of the Experiences page headline' } }),
      heroH1b: text({ ui: { description: 'Second line of the Experiences page headline (italic)' } }),
      heroSub: linesField('Experiences hero subtitle'),

      includedOverline: text({ ui: { description: 'Small label above the "What each route includes" section' } }),
      includedTitle:    text({ ui: { description: 'Title of the "What each route includes" section' } }),
      includedItems:    json({ defaultValue: [], ui: { description: 'Array [{ icon, text }] — "What each route includes"' } }),

      airportOverline:       text({ ui: { description: 'Small label above the airport transfer block title' } }),
      airportTitle:          text({ ui: { description: 'Title of the airport transfer block' } }),
      airportTagline:        text({ ui: { description: 'Tagline shown right under the airport transfer title' } }),
      airportBadge:          text({ ui: { description: 'Small badge on the airport transfer block, e.g. Door to door' } }),
      airportPrice:          text({ ui: { description: 'E.g. From $25 / private car' } }),
      airportShortDuration:  text({ ui: { description: 'E.g. 30 min – 3 hours' } }),
      airportGroupSize:      text({ ui: { description: 'E.g. Up to 6 passengers' } }),
      airportDesc:           linesField('Airport transfer block description'),
      airportIncluded:       json({ defaultValue: [], ui: { description: 'Array of strings: what is included in the airport transfer' } }),
      airportNotIncluded:    json({ defaultValue: [], ui: { description: 'Array of strings: what is not included in the airport transfer' } }),
      airportRoutesLabel:    text({ ui: { description: 'Title above the airport routes price table' } }),
      airportNote:           text({ ui: { description: 'Small note shown under the airport routes price table' } }),
      airportCta:            text({ ui: { description: 'Booking button text for the airport transfer block' } }),

      customTag:    text({ ui: { description: 'Small label above the "custom route" block title' } }),
      customTitle:  text({ ui: { description: 'Title of the "custom route" block (links to the Route Builder)' } }),
      customPrice:  text({ ui: { description: 'E.g. From $80 / day' } }),
      customDesc:   linesField('"Custom route" block description'),
      customCta:    text({ ui: { description: 'Button text for the "custom route" block, e.g. Build your route' } }),
    },
  }),

  // ── ABOUT PAGE ──────────────────────────────────────────────────────────────
  AboutPage: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Page: About',
      labelField: 'label',
      description: 'There should only be one row.',
    },
    fields: {
      label:        text({ defaultValue: 'About', isIndexed: 'unique' }),
      bioImage:     image({ storage: 'balibymade_media' }),
      translations: relationship({ ref: 'AboutPageTranslation.page', many: true }),
    },
    hooks: makeTranslationHook('aboutPageTranslation', 'pageId', {
      quoteText: '', quoteCredit: '',
      bioOverline: '', bioH1: '', bioSub: '', bioP1: '', bioP2: '', bioP3: '',
      availableBadge: '',
      valuesOverline: '', valuesItems: [],
      ctaQuestion: '',
    }),
  }),

  AboutPageTranslation: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'About page · Translations',
      labelField: 'locale',
      listView: { initialColumns: ['page', 'locale', 'bioH1'] },
    },
    fields: {
      page:   relationship({ ref: 'AboutPage.translations' }),
      locale: text({ validation: { isRequired: true } }),

      quoteText:   linesField('Hero quote (use \\n for line break)'),
      quoteCredit: text({ defaultValue: '— Made' }),

      bioOverline: text({ ui: { description: 'Small label above the biography headline' } }),
      bioH1:       text({ ui: { description: 'Biography headline, e.g. Meet Made' } }),
      bioSub:      text({ ui: { description: 'Short subtitle under the biography headline' } }),
      bioP1:       linesField('Biography paragraph 1'),
      bioP2:       linesField('Biography paragraph 2'),
      bioP3:       linesField('Biography paragraph 3'),

      availableBadge: text({ ui: { description: 'E.g. Available for private trips' } }),

      valuesOverline: text({ ui: { description: 'Small label above the "values" section' } }),
      valuesItems:    json({ defaultValue: [], ui: { description: "Array [{ icon, title, desc }] — Made's values" } }),

      ctaQuestion: text({ ui: { description: 'E.g. Want to meet Made?' } }),
    },
  }),

  // ── CONTACT PAGE ────────────────────────────────────────────────────────────
  ContactPage: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Page: Contact',
      labelField: 'label',
      description: 'There should only be one row.',
    },
    fields: {
      label:        text({ defaultValue: 'Contact', isIndexed: 'unique' }),
      translations: relationship({ ref: 'ContactPageTranslation.page', many: true }),
    },
    hooks: makeTranslationHook('contactPageTranslation', 'pageId', {
      heroTag: '', heroH1: '', heroH1b: '', heroSub: '',
      formNameLabel: '', formEmailLabel: '', formMessageLabel: '', formMessagePlaceholder: '',
      formSubmit: '', formSuccessTitle: '', formSuccessText: '', formOrNote: '',
      formWaBtn: '', formWaLabel: '', formWaSublabel: '',
      noteTitle: '', noteItems: [],
    }),
  }),

  ContactPageTranslation: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Contact page · Translations',
      labelField: 'locale',
      listView: { initialColumns: ['page', 'locale', 'heroH1'] },
    },
    fields: {
      page:   relationship({ ref: 'ContactPage.translations' }),
      locale: text({ validation: { isRequired: true } }),

      heroTag: text({ ui: { description: 'Small label above the Contact page headline' } }),
      heroH1:  text({ ui: { description: 'First line of the Contact page headline' } }),
      heroH1b: text({ ui: { description: 'Second line of the Contact page headline (italic)' } }),
      heroSub: linesField('Contact hero subtitle'),

      formNameLabel:          text({ ui: { description: 'Label of the "Name" field in the contact form' } }),
      formEmailLabel:         text({ ui: { description: 'Label of the "Email" field in the contact form' } }),
      formMessageLabel:       text({ ui: { description: 'Label of the "Message" field in the contact form' } }),
      formMessagePlaceholder: text({ ui: { description: 'Placeholder text inside the empty "Message" field' } }),
      formSubmit:             text({ ui: { description: 'Submit button text of the contact form' } }),
      formSuccessTitle:       text({ ui: { description: 'Title shown after the form is submitted successfully' } }),
      formSuccessText:        text({ ui: { description: 'Body text shown after the form is submitted successfully' } }),
      formOrNote:             text({ ui: { description: 'Small "or" divider text between the form and the WhatsApp button' } }),
      formWaBtn:              text({ ui: { description: 'WhatsApp button text, e.g. Chat on WhatsApp' } }),
      formWaLabel:            text({ ui: { description: 'Label above the WhatsApp button' } }),
      formWaSublabel:         text({ ui: { description: 'Small subtitle under the WhatsApp label' } }),

      noteTitle: text({ ui: { description: 'Title of the small note box ("what to include in your message")' } }),
      noteItems: json({ defaultValue: [], ui: { description: 'Array of strings: what to include in the message' } }),
    },
  }),

  // ── SEO PAGE (title/description por página, para metadata + sitemap) ─────────
  SEOPage: list({
    access: publicReadAdminWrite,
    graphql: { plural: 'SEOPageItems' },
    ui: {
      label: 'SEO per page',
      labelField: 'slug',
      listView: { initialColumns: ['slug', 'order'] },
    },
    fields: {
      slug:         text({ validation: { isRequired: true }, isIndexed: 'unique', ui: { description: 'home, experiences, route-builder, about, contact' } }),
      order:        integer({ defaultValue: 0 }),
      translations: relationship({ ref: 'SEOPageTranslation.seoPage', many: true }),
    },
    hooks: makeTranslationHook('sEOPageTranslation', 'seoPageId', { title: '', description: '' }),
  }),

  SEOPageTranslation: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'SEO per page · Translations',
      listView: { initialColumns: ['seoPage', 'locale', 'title'] },
    },
    fields: {
      seoPage:     relationship({ ref: 'SEOPage.translations' }),
      locale:      text({ validation: { isRequired: true } }),
      title:       text({ validation: { isRequired: true }, ui: { description: 'Title tag — max ~60 characters' } }),
      description: text({ ui: { displayMode: 'textarea', description: 'Meta description — max ~155 characters' } }),
    },
  }),

  // ── ROUTE BUILDER PAGE ──────────────────────────────────────────────────────
  RouteBuilderPage: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Page: Route Builder',
      labelField: 'label',
      description: 'There should only be one row.',
    },
    fields: {
      label:        text({ defaultValue: 'Route Builder', isIndexed: 'unique' }),
      translations: relationship({ ref: 'RouteBuilderPageTranslation.page', many: true }),
    },
    hooks: makeTranslationHook('routeBuilderPageTranslation', 'pageId', {
      tag: '', h1: '', h1b: '', sub: '', searchPlaceholder: '', destinationsLabel: '',
      yourRoute: '', stops: '', totalKm: '', estimatedTime: '', kmhNote: '', addStops: '',
      clearRoute: '', bookCta: '', bookNote: '', removeStop: '', alreadyAdded: '', addToRoute: '',
      startPoint: '', noResults: '', approx: '',
    }),
  }),

  RouteBuilderPageTranslation: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Route Builder page · Translations',
      labelField: 'locale',
      listView: { initialColumns: ['page', 'locale', 'h1'] },
    },
    fields: {
      page:   relationship({ ref: 'RouteBuilderPage.translations' }),
      locale: text({ validation: { isRequired: true } }),

      tag:               text({ ui: { description: 'Small label above the Route Builder page headline' } }),
      h1:                text({ ui: { description: 'First line of the Route Builder page headline' } }),
      h1b:               text({ ui: { description: 'Second line of the Route Builder page headline (italic)' } }),
      sub:               linesField('Route Builder hero subtitle'),
      searchPlaceholder: text({ ui: { description: 'Placeholder text inside the destination search box' } }),
      destinationsLabel: text({ ui: { description: 'E.g. destinations' } }),
      yourRoute:         text({ ui: { description: 'E.g. Your Route' } }),
      stops:             text({ ui: { description: 'E.g. stops' } }),
      totalKm:           text({ ui: { description: 'E.g. Total' } }),
      estimatedTime:     text({ ui: { description: 'E.g. Estimated time' } }),
      kmhNote:           text({ ui: { description: 'E.g. Avg. 35 km/h (Bali mountain roads)' } }),
      addStops:          text({ ui: { description: 'Empty-state text: "add stops to build your route"' } }),
      clearRoute:        text({ ui: { description: 'Button text to remove all stops from the route' } }),
      bookCta:           text({ ui: { description: 'Booking button text for the built route' } }),
      bookNote:          text({ ui: { description: 'Small note shown under the booking button' } }),
      removeStop:        text({ ui: { description: 'Tooltip/label for the "remove this stop" button' } }),
      alreadyAdded:      text({ ui: { description: 'Label shown on a destination already added to the route' } }),
      addToRoute:        text({ ui: { description: 'Button text to add a destination to the route' } }),
      startPoint:        text({ ui: { description: 'Label for the starting point of the route, e.g. Ubud' } }),
      noResults:         text({ ui: { description: 'Text shown when a destination search has no results' } }),
      approx:            text({ ui: { description: 'E.g. approx.' } }),
    },
  }),
}
