// Mientras la web está en preview (sin lanzar públicamente), todos los enlaces internos
// deben llevar ?preview=true para que el preview gate del middleware no los redirija al
// placeholder. Quitar PREVIEW_MODE (poner a false) en el lanzamiento.
const PREVIEW_MODE = true

export function link(locale: string, path: string = ''): string {
  const base = `/${locale}${path}`
  return PREVIEW_MODE ? `${base}?preview=true` : base
}
