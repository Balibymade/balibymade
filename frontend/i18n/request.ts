import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

// Todo el contenido textual de balibymade.com vive en Keystone (GraphQL),
// no en ficheros de mensajes — next-intl aquí solo gestiona el prefijo de
// idioma en la URL y la detección de locale.
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale as typeof routing.locales[number])) {
    locale = routing.defaultLocale
  }

  return { locale, messages: {} }
})
