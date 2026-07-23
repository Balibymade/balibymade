import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

// El middleware corre en CADA petición dentro del Worker de Cloudflare y cuenta
// para el límite de CPU del plan free (error 1102). Debe ser lo más ligero
// posible: nada de fetch a la API aquí (antes calentaba una caché de locales
// que en Workers no persiste entre isolates — era un fetch bloqueante inútil por
// petición que provocaba 503 bajo carga). El enable/disable de locales lo
// resuelven las páginas vía getEnabledLocales() (cacheado por ISR).
export function middleware(request: NextRequest) {
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
    pathname.startsWith('/images/') ||
    pathname.startsWith('/orejime/')||
    pathname.startsWith('/favicon') ||
    pathname === '/icon.png' ||
    pathname === '/apple-icon.png' ||
    pathname === '/og.jpg' ||
    pathname === '/llms.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt'
  ) {
    return NextResponse.next()
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!_next|api|favicon|flags|demos).*)'],
}
