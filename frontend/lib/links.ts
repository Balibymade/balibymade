// Web lanzada públicamente el 2026-07-23 — el preview gate ya no existe.
// El helper se mantiene para no tocar todos los call sites.
export function link(locale: string, path: string = ''): string {
  return `/${locale}${path}`
}
