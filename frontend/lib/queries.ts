import { fetchGraphQL } from './graphql'

export type LocaleSetting = { code: string; label: string; flag: string; order: number }

export async function getEnabledLocales(): Promise<LocaleSetting[]> {
  const data = await fetchGraphQL<{ localeSettingItems: LocaleSetting[] }>(
    `{ localeSettingItems(where: { enabled: { equals: true } }, orderBy: [{ order: asc }]) { code label flag order } }`,
    undefined,
    300,
  )
  return data?.localeSettingItems ?? []
}

export type SiteSettings = {
  businessName: string; logoSub: string; logoMain: string
  whatsappNumber: string; instagramUrl: string; instagramHandle: string; contactEmail: string
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const data = await fetchGraphQL<{ siteSettingsItems: SiteSettings[] }>(
    `{ siteSettingsItems(take: 1) { businessName logoSub logoMain whatsappNumber instagramUrl instagramHandle contactEmail } }`,
    undefined,
    300,
  )
  return data?.siteSettingsItems?.[0] ?? null
}

export type SiteChrome = {
  navHome: string; navExperiences: string; navRouteBuilder: string; navAbout: string; navContact: string; navCta: string
  footerTagline: string; footerLinksLabel: string; footerLinks: string[]; footerSocialLabel: string; footerCredit: string
  ctaTitle: string; ctaSub: string; ctaBtn: string; ctaNote: string
  routesSectionOverline: string; routesSectionTitle: string; routesSectionSub: string
  bookRouteCta: string
}

export async function getSiteChrome(locale: string): Promise<SiteChrome | null> {
  const data = await fetchGraphQL<{ siteChromeTranslations: SiteChrome[] }>(
    `query($locale: String!) {
      siteChromeTranslations(where: { locale: { equals: $locale } }, take: 1) {
        navHome navExperiences navRouteBuilder navAbout navContact navCta
        footerTagline footerLinksLabel footerLinks footerSocialLabel footerCredit
        ctaTitle ctaSub ctaBtn ctaNote
        routesSectionOverline routesSectionTitle routesSectionSub
        bookRouteCta
      }
    }`,
    { locale },
  )
  return data?.siteChromeTranslations?.[0] ?? null
}

export type HomePageT = {
  heroTag: string; heroH1a: string; heroH1b: string; heroSub: string; heroCta1: string; heroCta2: string; heroScroll: string
  heroCardTag: string; heroCardName: string; heroCardSub: string; heroCardStat: string
  whyOverline: string; whyTitle: string; whyItems: { icon: string; title: string; desc: string }[]
}

export async function getHomePage(locale: string): Promise<HomePageT | null> {
  const data = await fetchGraphQL<{ homePageTranslations: HomePageT[] }>(
    `query($locale: String!) {
      homePageTranslations(where: { locale: { equals: $locale } }, take: 1) {
        heroTag heroH1a heroH1b heroSub heroCta1 heroCta2 heroScroll
        heroCardTag heroCardName heroCardSub heroCardStat
        whyOverline whyTitle whyItems
      }
    }`,
    { locale },
  )
  return data?.homePageTranslations?.[0] ?? null
}

export type ExperiencesPageT = {
  heroTag: string; heroH1: string; heroH1b: string; heroSub: string
  includedOverline: string; includedTitle: string; includedItems: { icon: string; text: string }[]
  airportOverline: string; airportTitle: string; airportTagline: string; airportBadge: string; airportPrice: string
  airportShortDuration: string; airportGroupSize: string; airportDesc: string
  airportIncluded: string[]; airportNotIncluded: string[]; airportRoutesLabel: string; airportNote: string; airportCta: string
  customTag: string; customTitle: string; customPrice: string; customDesc: string; customCta: string
}

export async function getExperiencesPage(locale: string): Promise<ExperiencesPageT | null> {
  const data = await fetchGraphQL<{ experiencesPageTranslations: ExperiencesPageT[] }>(
    `query($locale: String!) {
      experiencesPageTranslations(where: { locale: { equals: $locale } }, take: 1) {
        heroTag heroH1 heroH1b heroSub
        includedOverline includedTitle includedItems
        airportOverline airportTitle airportTagline airportBadge airportPrice
        airportShortDuration airportGroupSize airportDesc airportIncluded airportNotIncluded
        airportRoutesLabel airportNote airportCta
        customTag customTitle customPrice customDesc customCta
      }
    }`,
    { locale },
  )
  return data?.experiencesPageTranslations?.[0] ?? null
}

export type AboutPageT = {
  quoteText: string; quoteCredit: string
  bioOverline: string; bioH1: string; bioSub: string; bioP1: string; bioP2: string; bioP3: string
  availableBadge: string
  valuesOverline: string; valuesItems: { icon: string; title: string; desc: string }[]
  ctaQuestion: string
}

export async function getAboutPage(locale: string): Promise<AboutPageT | null> {
  const data = await fetchGraphQL<{ aboutPageTranslations: AboutPageT[] }>(
    `query($locale: String!) {
      aboutPageTranslations(where: { locale: { equals: $locale } }, take: 1) {
        quoteText quoteCredit
        bioOverline bioH1 bioSub bioP1 bioP2 bioP3
        availableBadge
        valuesOverline valuesItems
        ctaQuestion
      }
    }`,
    { locale },
  )
  return data?.aboutPageTranslations?.[0] ?? null
}

export type ContactPageT = {
  heroTag: string; heroH1: string; heroH1b: string; heroSub: string
  formNameLabel: string; formEmailLabel: string; formMessageLabel: string; formMessagePlaceholder: string
  formSubmit: string; formSuccessTitle: string; formSuccessText: string; formOrNote: string
  formWaBtn: string; formWaLabel: string; formWaSublabel: string
  noteTitle: string; noteItems: string[]
}

export async function getContactPage(locale: string): Promise<ContactPageT | null> {
  const data = await fetchGraphQL<{ contactPageTranslations: ContactPageT[] }>(
    `query($locale: String!) {
      contactPageTranslations(where: { locale: { equals: $locale } }, take: 1) {
        heroTag heroH1 heroH1b heroSub
        formNameLabel formEmailLabel formMessageLabel formMessagePlaceholder
        formSubmit formSuccessTitle formSuccessText formOrNote
        formWaBtn formWaLabel formWaSublabel
        noteTitle noteItems
      }
    }`,
    { locale },
  )
  return data?.contactPageTranslations?.[0] ?? null
}

export type RouteBuilderPageT = {
  tag: string; h1: string; h1b: string; sub: string; searchPlaceholder: string; destinationsLabel: string
  yourRoute: string; stops: string; totalKm: string; estimatedTime: string; kmhNote: string; addStops: string
  clearRoute: string; bookCta: string; bookNote: string; removeStop: string; alreadyAdded: string; addToRoute: string
  startPoint: string; noResults: string; approx: string
}

export async function getRouteBuilderPage(locale: string): Promise<RouteBuilderPageT | null> {
  const data = await fetchGraphQL<{ routeBuilderPageTranslations: RouteBuilderPageT[] }>(
    `query($locale: String!) {
      routeBuilderPageTranslations(where: { locale: { equals: $locale } }, take: 1) {
        tag h1 h1b sub searchPlaceholder destinationsLabel
        yourRoute stops totalKm estimatedTime kmhNote addStops
        clearRoute bookCta bookNote removeStop alreadyAdded addToRoute
        startPoint noResults approx
      }
    }`,
    { locale },
  )
  return data?.routeBuilderPageTranslations?.[0] ?? null
}

export type Route = {
  id: string; slug: string; emoji: string; priceUsd: number; stars: number; order: number
  image: { url: string } | null
  translations: { title: string; heroShort: string; tagline: string; path: string; duration: string; level: string; highlights: string[] }[]
}

export async function getRoutes(locale: string): Promise<Route[]> {
  const data = await fetchGraphQL<{ routes: Route[] }>(
    `query($locale: String!) {
      routes(where: { published: { equals: true } }, orderBy: [{ order: asc }]) {
        id slug emoji priceUsd stars order
        image { url }
        translations(where: { locale: { equals: $locale } }) { title heroShort tagline path duration level highlights }
      }
    }`,
    { locale },
    300,
  )
  return data?.routes ?? []
}

export type RouteItinerary = {
  id: string; slug: string
  route: { id: string; slug: string } | null
  translations: {
    title: string; tagline: string; badge: string; duration: string; departure: string; price: string; groupSize: string
    included: string[]; notIncluded: string[]; stops: { n: string; time: string; place: string; desc: string }[]; cta: string
  }[]
}

export async function getRouteItineraries(locale: string): Promise<RouteItinerary[]> {
  const data = await fetchGraphQL<{ routeItineraries: RouteItinerary[] }>(
    `query($locale: String!) {
      routeItineraries(where: { published: { equals: true } }, orderBy: [{ order: asc }]) {
        id slug
        route { id slug }
        translations(where: { locale: { equals: $locale } }) {
          title tagline badge duration departure price groupSize included notIncluded stops cta
        }
      }
    }`,
    { locale },
    300,
  )
  return data?.routeItineraries ?? []
}

export type AirportRoute = {
  id: string; slug: string; priceUsd: number; order: number
  translations: { to: string; duration: string }[]
}

export async function getAirportRoutes(locale: string): Promise<AirportRoute[]> {
  const data = await fetchGraphQL<{ airportRoutes: AirportRoute[] }>(
    `query($locale: String!) {
      airportRoutes(where: { published: { equals: true } }, orderBy: [{ order: asc }]) {
        id slug priceUsd order
        translations(where: { locale: { equals: $locale } }) { to duration }
      }
    }`,
    { locale },
    300,
  )
  return data?.airportRoutes ?? []
}

export type DestinationCategory = {
  id: string; slug: string; emoji: string; color: string; order: number
  translations: { label: string }[]
}

export async function getDestinationCategories(locale: string): Promise<DestinationCategory[]> {
  const data = await fetchGraphQL<{ destinationCategories: DestinationCategory[] }>(
    `query($locale: String!) {
      destinationCategories(orderBy: [{ order: asc }]) {
        id slug emoji color order
        translations(where: { locale: { equals: $locale } }) { label }
      }
    }`,
    { locale },
    300,
  )
  return data?.destinationCategories ?? []
}

export type Destination = {
  id: string; slug: string; lat: number; lng: number; region: string
  priceFromUbud: number; driveMinFromUbud: number; order: number
  category: { slug: string; emoji: string; color: string } | null
  translations: { name: string }[]
}

export async function getDestinations(locale: string): Promise<Destination[]> {
  const data = await fetchGraphQL<{ destinations: Destination[] }>(
    `query($locale: String!) {
      destinations(where: { published: { equals: true } }, orderBy: [{ order: asc }]) {
        id slug lat lng region priceFromUbud driveMinFromUbud order
        category { slug emoji color }
        translations(where: { locale: { equals: $locale } }) { name }
      }
    }`,
    { locale },
    300,
  )
  return data?.destinations ?? []
}
