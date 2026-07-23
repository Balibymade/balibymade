// Wrapper de Sentry sobre el Worker generado por OpenNext (patrón blueprint §24.4,
// confirmado en alboralescuelawaldorf.com). No modificar .open-next/worker.js
// directamente — se regenera en cada build. Este fichero está excluido del
// tsconfig de Next.js (usa tipos de Workers); solo lo bundlea wrangler.
import * as Sentry from '@sentry/cloudflare'
import { default as handler } from './.open-next/worker.js'

interface Env { SENTRY_DSN?: string }

export default Sentry.withSentry(
  (env: Env) => ({
    dsn: env.SENTRY_DSN, // sin DSN configurado, el SDK queda inerte
    tracesSampleRate: 0.1,
    environment: 'production',
  }),
  { fetch: handler.fetch } satisfies ExportedHandler<Env>,
)

export { DOQueueHandler, DOShardedTagCache } from './.open-next/worker.js'
