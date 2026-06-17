import type { MetadataRoute } from 'next'

const BASE_URL = 'https://balibymade.com'

// Crawlers de IA permitidos explícitamente (GEO) — el negocio quiere poder ser citado
// por motores de respuesta IA. Revertir a bloqueo solo si el cliente lo pide.
const AI_CRAWLERS = ['GPTBot', 'ClaudeBot', 'Google-Extended', 'PerplexityBot', 'Applebot-Extended']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/*?'],
      },
      ...AI_CRAWLERS.map(userAgent => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
