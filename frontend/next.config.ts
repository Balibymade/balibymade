import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

function parseHost(url: string): string {
  try { return url ? new URL(url).host : '' } catch { return '' }
}

const apiHost   = parseHost(process.env.NEXT_PUBLIC_API_URL ?? '')
const umamiHost = parseHost(process.env.NEXT_PUBLIC_UMAMI_URL ?? '')
const isDev     = process.env.NODE_ENV !== 'production'

const securityHeaders = [
  { key: 'X-Frame-Options',        value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',     value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      ["script-src 'self' 'unsafe-inline'", isDev ? "'unsafe-eval'" : '', umamiHost ? `https://${umamiHost}` : ''].filter(Boolean).join(' '),
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https://media.balibymade.com",
      [
        "connect-src 'self'",
        isDev ? 'ws://localhost:*' : '',
        isDev ? 'http://localhost:*' : '',
        apiHost   ? `https://${apiHost}`   : '',
        umamiHost ? `https://${umamiHost}` : '',
        'https://*.ingest.sentry.io',    // errores del navegador → Sentry
        'https://*.ingest.de.sentry.io',
      ].filter(Boolean).join(' '),
      "frame-src https://wa.me",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'media.balibymade.com', pathname: '/images/**' },
    ],
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
}

export default withNextIntl(nextConfig)
