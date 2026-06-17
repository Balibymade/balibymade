import type { Metadata } from 'next'
import { getRouteBuilderPage, getDestinations, getDestinationCategories, getSiteSettings } from '../../../lib/queries'
import { buildMetadata } from '../../../lib/seoMetadata'
import RouteBuilderClient from './RouteBuilderClient'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata('route-builder', locale, '/route-builder')
}

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
