// Errores del navegador — convención nativa de Next.js 15.3+ (la carga solo,
// sin necesidad del paquete @sentry/nextjs). Blueprint §24.4.
import * as Sentry from '@sentry/browser'

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 0.1,
    environment: 'production',
  })
}
