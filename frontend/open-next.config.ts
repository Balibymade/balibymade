import { defineCloudflareConfig } from '@opennextjs/cloudflare'
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache'

// Caché incremental (ISR) en R2. Sin esto, OpenNext no puede cachear el HTML
// renderizado y cada visita re-renderiza la página entera por SSR en el Worker
// → se pasa del límite de CPU del plan free (error 1102) de forma intermitente.
// Con esto + generateStaticParams + `revalidate`, el Worker sirve HTML cacheado
// (CPU casi cero) y el contenido de Keystone se refresca cada `revalidate` seg.
// Bucket: balibymade-nextcache (binding NEXT_INC_CACHE_R2_BUCKET en wrangler.jsonc).
export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
})
