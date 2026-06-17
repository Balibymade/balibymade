import { list } from '@keystone-6/core'
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
} from '@keystone-6/core/fields'
import { type Lists } from '.keystone/types'

const publishedField = () => checkbox({
  defaultValue: false,
  ui: { description: 'Marca esta casilla para que el contenido sea visible en la web pública.' },
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
      label: 'Idiomas',
      labelField: 'label',
      listView: { initialColumns: ['label', 'code', 'order', 'enabled'] },
    },
    fields: {
      code:    text({ validation: { isRequired: true }, isIndexed: 'unique', ui: { description: 'Código ISO del idioma (es, en, id, ru, ...)' } }),
      label:   text({ validation: { isRequired: true }, ui: { description: 'Nombre visible (Español, English, Bahasa Indonesia...)' } }),
      flag:    text({ ui: { description: 'Ruta del icono de bandera, ej. /flags/en.svg' } }),
      order:   integer({ defaultValue: 0, ui: { description: 'Orden en el selector de idioma' } }),
      enabled: checkbox({ defaultValue: true, ui: { description: 'Desmarca para ocultar este idioma en la web.' } }),
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
      label: 'Ajustes del sitio',
      labelField: 'businessName',
      description: 'Debe existir una única fila. Datos de contacto y marca usados en toda la web.',
    },
    fields: {
      businessName:   text({ defaultValue: 'Bali By Made', validation: { isRequired: true } }),
      logoSub:         text({ defaultValue: 'BALI BY', ui: { description: 'Línea superior del logo' } }),
      logoMain:        text({ defaultValue: 'MADE', ui: { description: 'Línea principal del logo' } }),
      whatsappNumber:  text({ ui: { description: 'Número completo con prefijo de país, ej. 6281234567890 (sin +, usado en wa.me)' } }),
      instagramUrl:    text({ defaultValue: 'https://www.instagram.com/balibymade' }),
      instagramHandle: text({ defaultValue: '@balibymade' }),
      contactEmail:    text(),
    },
  }),

  // ── DESTINATION CATEGORY ──────────────────────────────────────────────────────
  DestinationCategory: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Categorías de destino',
      labelField: 'slug',
      listView: { initialColumns: ['slug', 'emoji', 'color', 'order'] },
    },
    fields: {
      slug:         text({ validation: { isRequired: true }, isIndexed: 'unique', ui: { description: 'temple, waterfall, volcano, rice-terrace, beach, village, viewpoint, coast, market, lake, cultural, forest, airport...' } }),
      emoji:        text({ validation: { isRequired: true } }),
      color:        text({ validation: { isRequired: true }, ui: { description: 'Color hex, ej. #c9a84c' } }),
      order:        integer({ defaultValue: 0 }),
      translations: relationship({ ref: 'DestinationCategoryTranslation.category', many: true }),
    },
    hooks: makeTranslationHook('destinationCategoryTranslation', 'categoryId', { label: '' }),
  }),

  DestinationCategoryTranslation: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Categorías de destino · Traducciones',
      listView: { initialColumns: ['category', 'locale', 'label'] },
    },
    fields: {
      category: relationship({ ref: 'DestinationCategory.translations' }),
      locale:   text({ validation: { isRequired: true } }),
      label:    text({ validation: { isRequired: true } }),
    },
  }),

  // ── DESTINATION ───────────────────────────────────────────────────────────────
  Destination: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Destinos',
      labelField: 'slug',
      listView: { initialColumns: ['slug', 'category', 'region', 'priceFromUbud', 'order', 'published'] },
    },
    fields: {
      published:        publishedField(),
      slug:              text({ validation: { isRequired: true }, isIndexed: 'unique', ui: { description: 'Identificador único, ej. ubud, monkey-forest, tegallalang' } }),
      category:          relationship({ ref: 'DestinationCategory' }),
      lat:               float({ validation: { isRequired: true } }),
      lng:               float({ validation: { isRequired: true } }),
      region:             text({ validation: { isRequired: true }, ui: { description: 'Región o zona, ej. Ubud, Sidemen, Amed' } }),
      priceFromUbud:      integer({ validation: { isRequired: true }, ui: { description: 'Precio estimado en USD, coche privado desde Ubud' } }),
      driveMinFromUbud:   integer({ validation: { isRequired: true }, ui: { description: 'Minutos de conducción desde Ubud' } }),
      order:              integer({ defaultValue: 0 }),
      translations:       relationship({ ref: 'DestinationTranslation.destination', many: true }),
    },
    hooks: makeTranslationHook('destinationTranslation', 'destinationId', { name: '' }),
  }),

  DestinationTranslation: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Destinos · Traducciones',
      listView: { initialColumns: ['destination', 'locale', 'name'] },
    },
    fields: {
      destination: relationship({ ref: 'Destination.translations' }),
      locale:      text({ validation: { isRequired: true } }),
      name:        text({ validation: { isRequired: true } }),
    },
  }),

  // ── ROUTE (las 10 rutas de Experiences) ─────────────────────────────────────────
  Route: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Rutas',
      labelField: 'slug',
      listView: { initialColumns: ['slug', 'emoji', 'priceUsd', 'stars', 'order', 'published'] },
    },
    fields: {
      published:    publishedField(),
      slug:         text({ validation: { isRequired: true }, isIndexed: 'unique', ui: { description: 'Identificador único, ej. kintamani-volcano-road' } }),
      emoji:        text({ validation: { isRequired: true } }),
      image:        image({ storage: 'balibymade_media' }),
      priceUsd:     integer({ validation: { isRequired: true }, ui: { description: 'Precio "desde", en USD' } }),
      stars:        integer({ defaultValue: 5, ui: { description: 'Valoración 1-5' } }),
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
      label: 'Rutas · Traducciones',
      listView: { initialColumns: ['route', 'locale', 'title'] },
    },
    fields: {
      route:      relationship({ ref: 'Route.translations' }),
      locale:     text({ validation: { isRequired: true } }),
      title:      text({ validation: { isRequired: true }, ui: { description: 'Ej. Ubud → Kintamani Volcano Road' } }),
      heroShort:  text({ ui: { description: 'Versión corta del título, usada en tarjetas pequeñas' } }),
      tagline:    text(),
      path:       text({ ui: { description: 'Paradas separadas por · , ej. Ubud · Tirta Empul · Kintamani' } }),
      duration:   text({ ui: { description: 'Ej. Full day, Half day, 2–4 days' } }),
      level:      text({ ui: { description: 'Ej. Scenery, Adventure, Culture, Road trip, Epic' } }),
      highlights: json({ defaultValue: [], ui: { description: 'Array de strings con los puntos destacados de la ruta' } }),
    },
  }),

  // ── ROUTE ITINERARY (itinerarios completos con paradas, ej. r1Full/r2Full) ────
  RouteItinerary: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Itinerarios detallados',
      labelField: 'slug',
      listView: { initialColumns: ['slug', 'route', 'order', 'published'] },
    },
    fields: {
      published:    publishedField(),
      slug:         text({ validation: { isRequired: true }, isIndexed: 'unique', ui: { description: 'Identificador único, ej. ubud-kintamani' } }),
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
      label: 'Itinerarios detallados · Traducciones',
      listView: { initialColumns: ['itinerary', 'locale', 'title'] },
    },
    fields: {
      itinerary:   relationship({ ref: 'RouteItinerary.translations' }),
      locale:      text({ validation: { isRequired: true } }),
      title:       text({ validation: { isRequired: true } }),
      tagline:     text(),
      badge:       text({ ui: { description: 'Ej. Day Tour' } }),
      duration:    text({ ui: { description: 'Ej. Half day · ~7 hours' } }),
      departure:   text({ ui: { description: 'Ej. Pick-up from your hotel in Ubud' } }),
      price:       text({ ui: { description: 'Ej. From $60 / private car' } }),
      groupSize:   text({ ui: { description: 'Ej. Up to 6 passengers' } }),
      included:    json({ defaultValue: [], ui: { description: 'Array de strings: qué incluye' } }),
      notIncluded: json({ defaultValue: [], ui: { description: 'Array de strings: qué no incluye' } }),
      stops:       json({ defaultValue: [], ui: { description: 'Array de paradas: [{ n, time, place, desc }]' } }),
      cta:         text({ ui: { description: 'Texto del botón de reserva' } }),
    },
  }),

  // ── AIRPORT ROUTE (tabla de precios de transfer al aeropuerto) ────────────────
  AirportRoute: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Rutas de aeropuerto',
      labelField: 'slug',
      listView: { initialColumns: ['slug', 'priceUsd', 'order', 'published'] },
    },
    fields: {
      published:    publishedField(),
      slug:         text({ validation: { isRequired: true }, isIndexed: 'unique', ui: { description: 'Ej. kuta-seminyak-legian' } }),
      priceUsd:     integer({ validation: { isRequired: true } }),
      order:        integer({ defaultValue: 0 }),
      translations: relationship({ ref: 'AirportRouteTranslation.airportRoute', many: true }),
    },
    hooks: makeTranslationHook('airportRouteTranslation', 'airportRouteId', { to: '', duration: '' }),
  }),

  AirportRouteTranslation: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Rutas de aeropuerto · Traducciones',
      listView: { initialColumns: ['airportRoute', 'locale', 'to', 'duration'] },
    },
    fields: {
      airportRoute: relationship({ ref: 'AirportRoute.translations' }),
      locale:       text({ validation: { isRequired: true } }),
      to:           text({ validation: { isRequired: true }, ui: { description: 'Ej. Kuta / Seminyak / Legian' } }),
      duration:     text({ ui: { description: 'Ej. ~45 min' } }),
    },
  }),

  // ── SITE CHROME (textos globales: nav, footer, cta genérico) ──────────────────
  SiteChrome: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Textos globales (menú, footer, CTA)',
      labelField: 'label',
      description: 'Debe existir una única fila.',
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
      label: 'Textos globales · Traducciones',
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
      navCta:          text({ ui: { description: 'Ej. Book a trip' } }),

      footerTagline:    text(),
      footerLinksLabel: text(),
      footerLinks:      json({ defaultValue: [], ui: { description: 'Array de 3 strings: Experiences, About Made, Contact' } }),
      footerSocialLabel: text(),
      footerCredit:     text({ ui: { description: 'Ej. Web concept by' } }),

      ctaTitle: text(),
      ctaSub:   linesField('Texto del banner CTA (ready to see the real Bali...)'),
      ctaBtn:   text(),
      ctaNote:  text(),

      routesSectionOverline: text(),
      routesSectionTitle:    text(),
      routesSectionSub:      linesField('Subtítulo de la sección "10 rutas"'),

      bookRouteCta: text({ ui: { description: 'Texto reutilizado en los botones de reserva de cada tarjeta de ruta' } }),
    },
  }),

  // ── HOME PAGE ───────────────────────────────────────────────────────────────
  HomePage: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Página: Home',
      labelField: 'label',
      description: 'Debe existir una única fila.',
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
      label: 'Página Home · Traducciones',
      listView: { initialColumns: ['page', 'locale', 'heroH1a'] },
    },
    fields: {
      page:   relationship({ ref: 'HomePage.translations' }),
      locale: text({ validation: { isRequired: true } }),

      heroTag:    text(),
      heroH1a:    text({ ui: { description: 'Primera línea del titular' } }),
      heroH1b:    text({ ui: { description: 'Segunda línea del titular (en cursiva)' } }),
      heroSub:    linesField('Subtítulo del hero'),
      heroCta1:   text(),
      heroCta2:   text(),
      heroScroll: text(),

      heroCardTag:  text(),
      heroCardName: text(),
      heroCardSub:  text(),
      heroCardStat: text(),

      whyOverline: text(),
      whyTitle:    text(),
      whyItems:    json({ defaultValue: [], ui: { description: 'Array [{ icon, title, desc }] — sección "Why Made"' } }),

      faqTitle: text({ ui: { description: 'Título de la sección de preguntas frecuentes (SEO/GEO)' } }),
      faqItems: json({ defaultValue: [], ui: { description: 'Array [{ question, answer }] — preguntas frecuentes, visibles en la home y usadas como FAQPage schema.org para SEO y motores de respuesta IA (GEO)' } }),
    },
  }),

  // ── EXPERIENCES PAGE ────────────────────────────────────────────────────────
  ExperiencesPage: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Página: Experiences',
      labelField: 'label',
      description: 'Debe existir una única fila.',
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
      label: 'Página Experiences · Traducciones',
      listView: { initialColumns: ['page', 'locale', 'heroH1'] },
    },
    fields: {
      page:   relationship({ ref: 'ExperiencesPage.translations' }),
      locale: text({ validation: { isRequired: true } }),

      heroTag: text(),
      heroH1:  text(),
      heroH1b: text(),
      heroSub: linesField('Subtítulo del hero de Experiences'),

      includedOverline: text(),
      includedTitle:    text(),
      includedItems:    json({ defaultValue: [], ui: { description: 'Array [{ icon, text }] — "Qué incluye cada ruta"' } }),

      airportOverline:       text(),
      airportTitle:          text(),
      airportTagline:        text(),
      airportBadge:          text(),
      airportPrice:          text({ ui: { description: 'Ej. From $25 / private car' } }),
      airportShortDuration:  text({ ui: { description: 'Ej. 30 min – 3 hours' } }),
      airportGroupSize:      text(),
      airportDesc:           linesField('Descripción del bloque de transfer aeropuerto'),
      airportIncluded:       json({ defaultValue: [], ui: { description: 'Array de strings' } }),
      airportNotIncluded:    json({ defaultValue: [], ui: { description: 'Array de strings' } }),
      airportRoutesLabel:    text(),
      airportNote:           text(),
      airportCta:            text(),

      customTag:    text(),
      customTitle:  text(),
      customPrice:  text(),
      customDesc:   linesField('Descripción del bloque "ruta a medida"'),
      customCta:    text(),
    },
  }),

  // ── ABOUT PAGE ──────────────────────────────────────────────────────────────
  AboutPage: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Página: About',
      labelField: 'label',
      description: 'Debe existir una única fila.',
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
      label: 'Página About · Traducciones',
      listView: { initialColumns: ['page', 'locale', 'bioH1'] },
    },
    fields: {
      page:   relationship({ ref: 'AboutPage.translations' }),
      locale: text({ validation: { isRequired: true } }),

      quoteText:   linesField('Cita del hero (usar \\n para salto de línea)'),
      quoteCredit: text({ defaultValue: '— Made' }),

      bioOverline: text(),
      bioH1:       text(),
      bioSub:      text(),
      bioP1:       linesField('Párrafo 1 de la biografía'),
      bioP2:       linesField('Párrafo 2 de la biografía'),
      bioP3:       linesField('Párrafo 3 de la biografía'),

      availableBadge: text({ ui: { description: 'Ej. Available for private trips' } }),

      valuesOverline: text(),
      valuesItems:    json({ defaultValue: [], ui: { description: 'Array [{ icon, title, desc }] — valores de Made' } }),

      ctaQuestion: text({ ui: { description: 'Ej. Want to meet Made?' } }),
    },
  }),

  // ── CONTACT PAGE ────────────────────────────────────────────────────────────
  ContactPage: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Página: Contact',
      labelField: 'label',
      description: 'Debe existir una única fila.',
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
      label: 'Página Contact · Traducciones',
      listView: { initialColumns: ['page', 'locale', 'heroH1'] },
    },
    fields: {
      page:   relationship({ ref: 'ContactPage.translations' }),
      locale: text({ validation: { isRequired: true } }),

      heroTag: text(),
      heroH1:  text(),
      heroH1b: text(),
      heroSub: linesField('Subtítulo del hero de Contact'),

      formNameLabel:          text(),
      formEmailLabel:         text(),
      formMessageLabel:       text(),
      formMessagePlaceholder: text(),
      formSubmit:             text(),
      formSuccessTitle:       text(),
      formSuccessText:        text(),
      formOrNote:             text(),
      formWaBtn:               text(),
      formWaLabel:             text(),
      formWaSublabel:          text(),

      noteTitle: text(),
      noteItems: json({ defaultValue: [], ui: { description: 'Array de strings: qué incluir en el mensaje' } }),
    },
  }),

  // ── SEO PAGE (title/description por página, para metadata + sitemap) ─────────
  SEOPage: list({
    access: publicReadAdminWrite,
    graphql: { plural: 'SEOPageItems' },
    ui: {
      label: 'SEO por página',
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
      label: 'SEO por página · Traducciones',
      listView: { initialColumns: ['seoPage', 'locale', 'title'] },
    },
    fields: {
      seoPage:     relationship({ ref: 'SEOPage.translations' }),
      locale:      text({ validation: { isRequired: true } }),
      title:       text({ validation: { isRequired: true }, ui: { description: 'Title tag — máx. ~60 caracteres' } }),
      description: text({ ui: { displayMode: 'textarea', description: 'Meta description — máx. ~155 caracteres' } }),
    },
  }),

  // ── ROUTE BUILDER PAGE ──────────────────────────────────────────────────────
  RouteBuilderPage: list({
    access: publicReadAdminWrite,
    ui: {
      label: 'Página: Route Builder',
      labelField: 'label',
      description: 'Debe existir una única fila.',
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
      label: 'Página Route Builder · Traducciones',
      listView: { initialColumns: ['page', 'locale', 'h1'] },
    },
    fields: {
      page:   relationship({ ref: 'RouteBuilderPage.translations' }),
      locale: text({ validation: { isRequired: true } }),

      tag:               text(),
      h1:                text(),
      h1b:               text(),
      sub:               linesField('Subtítulo del hero del Route Builder'),
      searchPlaceholder: text(),
      destinationsLabel: text({ ui: { description: 'Ej. destinations' } }),
      yourRoute:         text({ ui: { description: 'Ej. Your Route' } }),
      stops:             text({ ui: { description: 'Ej. stops' } }),
      totalKm:           text({ ui: { description: 'Ej. Total' } }),
      estimatedTime:     text(),
      kmhNote:           text({ ui: { description: 'Ej. Avg. 35 km/h (Bali mountain roads)' } }),
      addStops:          text(),
      clearRoute:        text(),
      bookCta:           text(),
      bookNote:          text(),
      removeStop:        text(),
      alreadyAdded:      text(),
      addToRoute:        text(),
      startPoint:        text(),
      noResults:         text(),
      approx:            text({ ui: { description: 'Ej. approx.' } }),
    },
  }),
}
