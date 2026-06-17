import type { MetadataRoute } from 'next'

const BASE_URL = 'https://balibymade.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/*?'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
