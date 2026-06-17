import { getRouteBuilderPage, getDestinations, getDestinationCategories, getSiteSettings } from '../../../lib/queries'
import RouteBuilderClient from './RouteBuilderClient'

export default async function RouteBuilderPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [rb, destinations, categories, settings] = await Promise.all([
    getRouteBuilderPage(locale),
    getDestinations(locale),
    getDestinationCategories(locale),
    getSiteSettings(),
  ])

  if (!rb) return null

  return (
    <RouteBuilderClient
      locale={locale}
      rb={rb}
      destinations={destinations}
      categories={categories}
      whatsappNumber={settings?.whatsappNumber ?? ''}
    />
  )
}
