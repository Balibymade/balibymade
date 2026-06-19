import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

const ALL_LOCALES = routing.locales as readonly string[]
const API_URL    = process.env.NEXT_PUBLIC_API_URL || 'https://api.balibymade.com'
const RENDER_URL = 'https://balibymade-backend.onrender.com'

// ── Caché de locales habilitados (Edge-compatible) ──────────────────────────
const CACHE_TTL_MS = 60_000
let localeCache: { enabled: string[]; at: number } | null = null

async function fetchEnabledLocales(): Promise<string[]> {
  if (localeCache && Date.now() - localeCache.at < CACHE_TTL_MS) {
    return localeCache.enabled
  }

  const query = JSON.stringify({
    query: '{ localeSettingItems(where: { enabled: { equals: true } }) { code } }',
  })

  for (const url of [API_URL, RENDER_URL]) {
    try {
      const res  = await fetch(`${url}/api/graphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: query,
      })
      const text = await res.text()
      if (!text.startsWith('{')) continue
      const json = JSON.parse(text)
      const codes: string[] = json?.data?.localeSettingItems?.map((l: { code: string }) => l.code) ?? []
      if (codes.length > 0) {
        localeCache = { enabled: codes, at: Date.now() }
        return codes
      }
    } catch {
      // intenta con el siguiente URL
    }
  }

  return [...ALL_LOCALES]
}

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl
  const host = request.headers.get('host') ?? ''

  // Redirigir tráfico directo a *.vercel.app → dominio oficial
  if (host.endsWith('.vercel.app')) {
    return NextResponse.redirect(
      `https://balibymade.com${pathname}${searchParams.toString() ? `?${searchParams}` : ''}`,
      301,
    )
  }

  // Assets, API, sitemap y robots siempre pasan
  if (
    pathname.startsWith('/_next')   ||
    pathname.startsWith('/api')     ||
    pathname.startsWith('/flags/')  ||
    pathname.startsWith('/demos/')  ||
    pathname.startsWith('/favicon') ||
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt'
  ) {
    return NextResponse.next()
  }

  // Preview gate: sin ?preview=true, todo el tráfico ve el placeholder de la home
  const isPreview = searchParams.get('preview') === 'true'
  if (!isPreview && pathname !== '/') {
    return NextResponse.rewrite(new URL('/', request.url))
  }
  if (!isPreview) {
    return NextResponse.next()
  }

  await fetchEnabledLocales() // calienta la caché (fallback: todos los locales si Keystone no responde)

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!_next|api|favicon|flags|demos).*)'],
}
