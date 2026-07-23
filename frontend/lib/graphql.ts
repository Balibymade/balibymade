const API_URL    = process.env.NEXT_PUBLIC_API_URL || 'https://api.balibymade.com'
const RENDER_URL  = 'https://balibymade.onrender.com'

async function doFetch(
  url: string,
  query: string,
  variables: Record<string, unknown> | undefined,
  revalidate: number,
): Promise<unknown | null> {
  try {
    const res = await fetch(`${url}/api/graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
      next: { revalidate },
      // 25s: el backend Render (0.1 CPU) puede tardar bajo la ráfaga de fetches
      // del build (132 páginas prerenderizadas) o en cold start.
      signal: AbortSignal.timeout(25_000),
    })

    if (!res.ok) {
      console.error(`[GraphQL] HTTP ${res.status} from ${url}`)
      return null
    }

    const text = await res.text()
    if (!text.startsWith('{')) {
      console.error(`[GraphQL] Non-JSON from ${url}`)
      return null
    }

    const json = JSON.parse(text)
    if (json.errors?.length) {
      console.error('[GraphQL] Error:', json.errors[0].message)
      return null
    }

    return json.data
  } catch (err) {
    console.error(`[GraphQL] Fetch error from ${url}:`, err)
    return null
  }
}

export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  revalidate = 60,
): Promise<T | null> {
  const onVercel = !!process.env.VERCEL
  const [primary, fallback] = onVercel ? [RENDER_URL, API_URL] : [API_URL, RENDER_URL]

  // 3 intentos con backoff creciente — durante el build, la ráfaga de fetches
  // satura momentáneamente el backend Render (0.1 CPU); reintentar deja que se
  // recupere en vez de generar la página como 404.
  for (let attempt = 0; attempt < 3; attempt++) {
    const r = await doFetch(primary, query, variables, revalidate)
    if (r !== null) return r as T
    await new Promise(r => setTimeout(r, 1500 * (attempt + 1)))
  }

  if (primary !== fallback) {
    const r2 = await doFetch(fallback, query, variables, revalidate)
    if (r2 !== null) return r2 as T
  }

  return null
}
