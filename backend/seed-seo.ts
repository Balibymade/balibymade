/**
 * Seed de SEO (título/descripción por página) y FAQ de la home (SEO + GEO).
 * Contenido nuevo (no viene de la demo) — escrito en en/es/id/ru y con fallback
 * a inglés en el resto de locales, igual que el resto del proyecto.
 *
 * Ejecutar: npx dotenv -e .env -- ts-node --transpile-only seed-seo.ts
 */
import { PrismaClient } from '@prisma/client'
import { LANGS } from './seed-data/i18n-data'

const prisma = new PrismaClient()
const LOCALE_CODES = LANGS.map(l => l.code)

export type Copy = { title: string; description: string }
export function pick(map: Record<string, Copy>, locale: string): Copy {
  return map[locale] ?? map.en
}

export const SEO_PAGES: { slug: string; order: number; copy: Record<string, Copy> }[] = [
  {
    slug: 'home',
    order: 1,
    copy: {
      en: { title: 'Bali By Made — Private Driver & Local Guide in Ubud, Bali', description: "Made is a local Ubud-born guide offering private car tours across Bali: volcanoes, rice terraces, temples and hidden waterfalls. Airport transfers and custom routes via WhatsApp." },
      es: { title: 'Bali By Made — Guía y conductor privado en Ubud, Bali', description: 'Made es un guía local nacido en Ubud que ofrece tours privados en coche por Bali: volcanes, arrozales, templos y cascadas escondidas. Transfers de aeropuerto y rutas a medida por WhatsApp.' },
      id: { title: 'Bali By Made — Sopir Pribadi & Pemandu Lokal di Ubud, Bali', description: 'Made adalah pemandu lokal asli Ubud yang menawarkan tur mobil pribadi keliling Bali: gunung berapi, sawah, pura, dan air terjun tersembunyi. Antar-jemput bandara dan rute khusus via WhatsApp.' },
      ru: { title: 'Bali By Made — Личный водитель и гид на Бали, Убуд', description: 'Мейд — местный гид из Убуда, предлагающий частные туры на машине по Бали: вулканы, рисовые террасы, храмы и скрытые водопады. Трансфер из аэропорта и индивидуальные маршруты через WhatsApp.' },
    },
  },
  {
    slug: 'experiences',
    order: 2,
    copy: {
      en: { title: '10 Private Bali Tour Routes — Bali By Made', description: 'Ten private car routes across Bali, all starting in Ubud: Kintamani volcano, Sidemen valley, Jatiluwih rice terraces, Uluwatu cliffs and more. Private car, English-speaking guide, all included.' },
      es: { title: '10 rutas privadas para descubrir Bali — Bali By Made', description: 'Diez rutas en coche privado por Bali, todas desde Ubud: volcán Kintamani, valle de Sidemen, arrozales de Jatiluwih, acantilados de Uluwatu y más. Coche privado y guía en inglés incluidos.' },
      id: { title: '10 Rute Tur Pribadi Bali — Bali By Made', description: 'Sepuluh rute mobil pribadi keliling Bali, semua dari Ubud: Gunung Kintamani, Lembah Sidemen, sawah Jatiluwih, tebing Uluwatu, dan lainnya. Mobil pribadi dan pemandu berbahasa Inggris termasuk.' },
      ru: { title: '10 частных маршрутов по Бали — Bali By Made', description: 'Десять маршрутов на частном авто по Бали, все начинаются в Убуде: вулкан Кинтамани, долина Сидемен, террасы Джатилувих, скалы Улувату и другие. Частная машина и англоговорящий гид включены.' },
    },
  },
  {
    slug: 'route-builder',
    order: 3,
    copy: {
      en: { title: 'Build Your Own Bali Route — Bali By Made', description: 'Pick your stops on a map of Bali and get an instant distance, time and price estimate for a private car day trip with Made — then book directly on WhatsApp.' },
      es: { title: 'Crea tu propia ruta por Bali — Bali By Made', description: 'Elige tus paradas en un mapa de Bali y obtén al instante una estimación de distancia, tiempo y precio para un día en coche privado con Made — reserva directa por WhatsApp.' },
      id: { title: 'Buat Rute Bali Anda Sendiri — Bali By Made', description: 'Pilih titik pemberhentian Anda di peta Bali dan dapatkan estimasi jarak, waktu, dan harga instan untuk perjalanan mobil pribadi dengan Made — langsung pesan via WhatsApp.' },
      ru: { title: 'Создайте свой маршрут по Бали — Bali By Made', description: 'Выберите остановки на карте Бали и получите мгновенную оценку расстояния, времени и цены поездки на частном авто с Мейдом — бронирование прямо в WhatsApp.' },
    },
  },
  {
    slug: 'about',
    order: 4,
    copy: {
      en: { title: 'About Made — Your Local Bali Guide', description: "Born and raised in Ubud, Made has spent over a decade guiding travelers through Bali's hidden corners — rice paths at dawn, temples before the crowds, and real local stories." },
      es: { title: 'Sobre Made — Tu guía local en Bali', description: 'Nacido y criado en Ubud, Made lleva más de una década guiando viajeros por los rincones escondidos de Bali — caminos entre arrozales al amanecer, templos antes de las multitudes e historias locales reales.' },
      id: { title: 'Tentang Made — Pemandu Lokal Bali Anda', description: 'Lahir dan tumbuh di Ubud, Made telah lebih dari satu dekade memandu wisatawan ke sudut-sudut tersembunyi Bali — jalan sawah saat subuh, pura sebelum keramaian, dan kisah lokal yang nyata.' },
      ru: { title: 'О Мейде — ваш местный гид по Бали', description: 'Мейд родился и выросрос в Убуде и уже более десяти лет показывает путешественникам скрытые уголки Бали — рисовые тропы на рассвете, храмы до толп туристов и настоящие местные истории.' },
    },
  },
  {
    slug: 'contact',
    order: 5,
    copy: {
      en: { title: 'Contact Made — Book Your Private Bali Tour', description: "Message Made directly on WhatsApp to plan your perfect day in Bali. Usually responds within the hour. No booking systems, no middlemen." },
      es: { title: 'Contacta con Made — Reserva tu tour privado por Bali', description: 'Escribe a Made directamente por WhatsApp para planear tu día perfecto en Bali. Suele responder en menos de una hora. Sin sistemas de reserva, sin intermediarios.' },
      id: { title: 'Hubungi Made — Pesan Tur Pribadi Bali Anda', description: 'Kirim pesan langsung ke Made via WhatsApp untuk merencanakan hari sempurna Anda di Bali. Biasanya merespons dalam satu jam. Tanpa sistem pemesanan, tanpa perantara.' },
      ru: { title: 'Связаться с Мейдом — Забронируйте тур по Бали', description: 'Напишите Мейду прямо в WhatsApp, чтобы спланировать идеальный день на Бали. Обычно отвечает в течение часа. Без систем бронирования, без посредников.' },
    },
  },
]

export const FAQ_TITLE: Record<string, string> = {
  en: 'Frequently asked questions',
  es: 'Preguntas frecuentes',
  id: 'Pertanyaan yang sering diajukan',
  ru: 'Часто задаваемые вопросы',
}

export const FAQ_ITEMS: Record<string, { question: string; answer: string }[]> = {
  en: [
    { question: 'How much does a private driver cost in Bali?', answer: 'A private car with Made is a flat $30 for a half-day trip (about 5 hours) and $50 for a full-day trip (about 10 hours); multi-day trips like the 2–4 day Grand Bali Loop are $50 per day. Every route includes the car, petrol, an English-speaking guide, bottled water and hotel pick-up in the Ubud area.' },
    { question: 'Is it safe to hire a private driver in Bali?', answer: "Yes — Made is a licensed local guide born and raised in Ubud, with over 10 years of experience driving Bali's mountain roads. The car is air-conditioned and insured, and routes are paced to avoid rushing." },
    { question: 'Can I create my own custom route?', answer: "Yes. Use the Route Builder to pick your own stops from over 140 destinations across Bali, or simply message Made on WhatsApp with what you'd like to see." },
    { question: 'Do you offer airport transfers?', answer: 'Yes, fixed-price private transfers from Ngurah Rai International Airport to Kuta, Seminyak, Canggu, Sanur, Ubud and Lovina, including petrol, parking and a mineral water.' },
    { question: 'How do I book a tour with Made?', answer: 'Booking is done directly on WhatsApp — no booking platforms or middlemen. Made usually responds within the hour.' },
  ],
  es: [
    { question: '¿Cuánto cuesta un conductor privado en Bali?', answer: 'Un coche privado con Made cuesta una tarifa plana de $30 por un viaje de medio día (unas 5 horas) y $50 por un día completo (unas 10 horas); los viajes de varios días, como el Grand Bali Loop de 2 a 4 días, cuestan $50 por día. Cada ruta incluye el coche, gasolina, guía en inglés, agua embotellada y recogida en el hotel en la zona de Ubud.' },
    { question: '¿Es seguro contratar un conductor privado en Bali?', answer: 'Sí — Made es un guía local con licencia, nacido y criado en Ubud, con más de 10 años de experiencia conduciendo por las carreteras de montaña de Bali. El coche tiene aire acondicionado y seguro, y las rutas se hacen sin prisas.' },
    { question: '¿Puedo crear mi propia ruta a medida?', answer: 'Sí. Usa el Constructor de Rutas para elegir tus propias paradas entre más de 140 destinos por toda Bali, o simplemente escribe a Made por WhatsApp contándole qué quieres ver.' },
    { question: '¿Ofrecéis transfer de aeropuerto?', answer: 'Sí, transfers privados a precio fijo desde el Aeropuerto Internacional Ngurah Rai hasta Kuta, Seminyak, Canggu, Sanur, Ubud y Lovina, incluyendo gasolina, parking y agua mineral.' },
    { question: '¿Cómo reservo un tour con Made?', answer: 'La reserva se hace directamente por WhatsApp, sin plataformas de reserva ni intermediarios. Made suele responder en menos de una hora.' },
  ],
  id: [
    { question: 'Berapa biaya sopir pribadi di Bali?', answer: 'Mobil pribadi dengan Made bertarif tetap $30 untuk perjalanan setengah hari (sekitar 5 jam) dan $50 untuk sehari penuh (sekitar 10 jam); perjalanan beberapa hari seperti Grand Bali Loop 2–4 hari bertarif $50 per hari. Setiap rute termasuk mobil, bensin, pemandu berbahasa Inggris, air mineral, dan penjemputan hotel di area Ubud.' },
    { question: 'Apakah aman menyewa sopir pribadi di Bali?', answer: 'Ya — Made adalah pemandu lokal berlisensi, lahir dan besar di Ubud, dengan lebih dari 10 tahun pengalaman mengemudi di jalan pegunungan Bali. Mobil ber-AC dan diasuransikan, rute dijalani tanpa terburu-buru.' },
    { question: 'Bisakah saya membuat rute saya sendiri?', answer: 'Ya. Gunakan Route Builder untuk memilih pemberhentian Anda sendiri dari lebih 140 destinasi di Bali, atau cukup kirim pesan ke Made via WhatsApp.' },
    { question: 'Apakah Anda menyediakan antar-jemput bandara?', answer: 'Ya, transfer pribadi harga tetap dari Bandara Internasional Ngurah Rai ke Kuta, Seminyak, Canggu, Sanur, Ubud, dan Lovina, termasuk bensin, parkir, dan air mineral.' },
    { question: 'Bagaimana cara memesan tur dengan Made?', answer: 'Pemesanan langsung melalui WhatsApp — tanpa platform pemesanan atau perantara. Made biasanya merespons dalam satu jam.' },
  ],
  ru: [
    { question: 'Сколько стоит частный водитель на Бали?', answer: 'Частная машина с Мейдом стоит фиксированно $30 за полдня (около 5 часов) и $50 за полный день (около 10 часов); многодневные поездки, такие как Grand Bali Loop на 2–4 дня, стоят $50 в день. Каждый маршрут включает автомобиль, бензин, англоговорящего гида, воду и трансфер из отеля в районе Убуда.' },
    { question: 'Безопасно ли нанимать частного водителя на Бали?', answer: 'Да — Мейд лицензированный местный гид, родившийся и выросший в Убуде, с более чем 10-летним опытом вождения по горным дорогам Бали. Машина с кондиционером и страховкой, маршруты без спешки.' },
    { question: 'Могу ли я создать свой собственный маршрут?', answer: 'Да. Используйте конструктор маршрутов, чтобы выбрать остановки из более чем 140 направлений по Бали, или просто напишите Мейду в WhatsApp.' },
    { question: 'Предлагаете ли вы трансфер из аэропорта?', answer: 'Да, частные трансферы по фиксированной цене из аэропорта Нгурах-Рай в Куту, Семиньяк, Чангу, Санур, Убуд и Ловину, включая бензин, парковку и воду.' },
    { question: 'Как забронировать тур с Мейдом?', answer: 'Бронирование напрямую через WhatsApp — без платформ бронирования и посредников. Мейд обычно отвечает в течение часа.' },
  ],
}

async function main() {
  console.log('🌱 Seed SEO + FAQ...')

  for (const page of SEO_PAGES) {
    const seoPage = await prisma.sEOPage.create({ data: { slug: page.slug, order: page.order } })
    for (const locale of LOCALE_CODES) {
      const copy = pick(page.copy, locale)
      await prisma.sEOPageTranslation.create({
        data: { seoPageId: seoPage.id, locale, title: copy.title, description: copy.description },
      })
    }
  }

  const homeTranslations = await prisma.homePageTranslation.findMany()
  for (const tr of homeTranslations) {
    const faqItems = FAQ_ITEMS[tr.locale] ?? FAQ_ITEMS.en
    const faqTitle = FAQ_TITLE[tr.locale] ?? FAQ_TITLE.en
    await prisma.homePageTranslation.update({
      where: { id: tr.id },
      data: { faqTitle, faqItems },
    })
  }

  console.log('✅ SEO + FAQ seed completado.')
}

// Solo ejecuta el seed si se corre directamente (permite importar los datos
// desde seed-seo-remote.ts sin disparar Prisma contra la BD local)
if (require.main === module) {
  main()
    .catch(e => { console.error(e); process.exit(1) })
    .finally(async () => { await prisma.$disconnect() })
}
