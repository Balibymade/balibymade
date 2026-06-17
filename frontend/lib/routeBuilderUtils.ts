import type { Destination } from './queries'

const R = 6371
const ROAD_FACTOR = 1.35 // las carreteras de Bali no son línea recta — factor empírico

function toRad(deg: number): number { return (deg * Math.PI) / 180 }

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function roadKm(a: Destination, b: Destination): number {
  return Math.round(haversineKm(a.lat, a.lng, b.lat, b.lng) * ROAD_FACTOR)
}

export function estimatePrice(totalKm: number): number {
  const base = 45
  const perKm = 0.7
  return Math.max(50, Math.ceil((base + totalKm * perKm) / 5) * 5)
}

export function formatTime(totalKm: number): string {
  const hours = totalKm / 35
  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60)
  if (h === 0) return `${m}min`
  if (m === 0) return `${h}h`
  return `${h}h ${m}min`
}

type MsgLang = 'en' | 'es' | 'id' | 'ru'
const GREET: Record<MsgLang, string> = {
  en: "Hi Made! I'd like to book a private tour.\n\nMy route:",
  es: '¡Hola Made! Me gustaría reservar un tour privado.\n\nMi ruta:',
  id: 'Halo Made! Saya ingin memesan tur pribadi.\n\nRute saya:',
  ru: 'Привет, Мейд! Хочу заказать частный тур.\n\nМой маршрут:',
}
const FOOTER: Record<MsgLang, (km: number, t: string, p: number) => string> = {
  en: (km, t, p) => `\nTotal: ~${km} km · Est. ${t} driving · ~$${p}/private car\n\nCan you arrange this?`,
  es: (km, t, p) => `\nTotal: ~${km} km · Aprox. ${t} · ~$${p}/coche privado\n\n¿Puedes organizar esto?`,
  id: (km, t, p) => `\nTotal: ~${km} km · Estimasi ${t} · ~$${p}/mobil pribadi\n\nBisa diatur?`,
  ru: (km, t, p) => `\nВсего: ~${km} км · ~${t} · ~$${p}/авто\n\nМожете организовать?`,
}

export function buildWhatsAppMessage(waypoints: Destination[], lang: string, whatsappNumber: string): string {
  const base = whatsappNumber ? `https://wa.me/${whatsappNumber}` : 'https://wa.me/'
  if (waypoints.length < 2) return base
  const ml: MsgLang = (lang === 'es' || lang === 'id' || lang === 'ru') ? lang : 'en'
  const greet  = GREET[ml]
  const footer = FOOTER[ml]
  const lines: string[] = [greet]
  waypoints.forEach((dest, i) => {
    const name = dest.translations[0]?.name ?? dest.slug
    lines.push(`📍 ${name}`)
    if (i < waypoints.length - 1) {
      const km = roadKm(dest, waypoints[i + 1])
      lines.push(`  ↓ ~${km} km`)
    }
  })
  const totalKm = waypoints.slice(1).reduce((sum, dest, i) => sum + roadKm(waypoints[i], dest), 0)
  lines.push(footer(totalKm, formatTime(totalKm), estimatePrice(totalKm)))
  return `${base}?text=${encodeURIComponent(lines.join('\n'))}`
}
