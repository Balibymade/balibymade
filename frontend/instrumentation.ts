// Hook nativo de Next.js: sin esto los errores que Next atrapa internamente
// (route handlers, render) NUNCA llegan al wrapper de custom-worker.ts —
// Next los convierte en 500 antes de que se propaguen (blueprint §24.4,
// verificado en alboralescuelawaldorf.com).
import * as Sentry from '@sentry/cloudflare'

export async function register() {}

export async function onRequestError(error: unknown) {
  Sentry.captureException(error)
  await Sentry.flush(2000) // sin esto el evento puede no enviarse antes de que el Worker termine
}
