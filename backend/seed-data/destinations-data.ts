// Keystone-ready: in production, replace DESTINATIONS with:
// destinationItems(where: { published: { equals: true } }) {
//   id name nameEs nameId nameRu lat lng category region priceFromUbud driveMinFromUbud published
// }

export type DestinationCategory =
  | 'temple' | 'waterfall' | 'volcano' | 'rice-terrace'
  | 'beach'  | 'village'   | 'viewpoint'| 'coast'
  | 'market' | 'lake'      | 'cultural' | 'forest' | 'airport'

export type Destination = {
  id:                string
  lat:               number
  lng:               number
  category:          DestinationCategory
  region:            string
  priceFromUbud:     number   // USD, private car estimate from Ubud
  driveMinFromUbud:  number   // minutes driving, one way
  published:         boolean
  translations: {
    en: { name: string }
    es: { name: string }
    id: { name: string }
    ru: { name: string }
  }
}

export type DestCategoryMeta = {
  emoji:   string
  labelEn: string
  labelEs: string
  labelId: string
  labelRu: string
  color:   string
}

// Keep in sync with i18n.ts Lang type
export type Lang = 'en' | 'es' | 'id' | 'ru' | 'de' | 'fr' | 'nl' | 'it' | 'pt' | 'ja' | 'zh' | 'ko' | 'tr' | 'ar' | 'fi' | 'da' | 'hi' | 'ms' | 'uk' | 'sv' | 'no' | 'pl'

export function getCategoryLabel(meta: DestCategoryMeta, lang: string): string {
  if (lang === 'es') return meta.labelEs
  if (lang === 'id') return meta.labelId
  if (lang === 'ru') return meta.labelRu
  return meta.labelEn
}

export const CATEGORY_META: Record<DestinationCategory | 'all', DestCategoryMeta> = {
  all:           { emoji: '🗺️', labelEn: 'All',          labelEs: 'Todo',          labelId: 'Semua',        labelRu: 'Все',            color: '#c9a84c' },
  temple:        { emoji: '🛕', labelEn: 'Temple',        labelEs: 'Templo',        labelId: 'Pura',         labelRu: 'Храм',           color: '#c9a84c' },
  waterfall:     { emoji: '🌊', labelEn: 'Waterfall',     labelEs: 'Cascada',       labelId: 'Air Terjun',   labelRu: 'Водопад',        color: '#4a9eca' },
  volcano:       { emoji: '🌋', labelEn: 'Volcano',       labelEs: 'Volcán',        labelId: 'Gunung Api',   labelRu: 'Вулкан',         color: '#c06030' },
  'rice-terrace':{ emoji: '🌾', labelEn: 'Rice Terraces', labelEs: 'Arrozales',     labelId: 'Sawah',        labelRu: 'Террасы',        color: '#52b788' },
  beach:         { emoji: '🏖️', labelEn: 'Beach',         labelEs: 'Playa',         labelId: 'Pantai',       labelRu: 'Пляж',           color: '#e8c67a' },
  village:       { emoji: '🏘️', labelEn: 'Village',       labelEs: 'Pueblo',        labelId: 'Desa',         labelRu: 'Деревня',        color: '#b8a898' },
  viewpoint:     { emoji: '🔭', labelEn: 'Viewpoint',     labelEs: 'Mirador',       labelId: 'Titik Pandang',labelRu: 'Смотровая',      color: '#9b88cc' },
  coast:         { emoji: '⛵', labelEn: 'Coast',          labelEs: 'Costa',         labelId: 'Pesisir',      labelRu: 'Побережье',      color: '#4abcb0' },
  market:        { emoji: '🛍️', labelEn: 'Market',        labelEs: 'Mercado',       labelId: 'Pasar',        labelRu: 'Рынок',          color: '#cc8844' },
  lake:          { emoji: '🏞️', labelEn: 'Lake',          labelEs: 'Lago',          labelId: 'Danau',        labelRu: 'Озеро',          color: '#6abacc' },
  cultural:      { emoji: '🎭', labelEn: 'Attraction',    labelEs: 'Atracción',     labelId: 'Atraksi',      labelRu: 'Аттракцион',     color: '#cc88aa' },
  forest:        { emoji: '🌿', labelEn: 'Forest',        labelEs: 'Bosque',        labelId: 'Hutan',        labelRu: 'Лес',            color: '#52b788' },
  airport:       { emoji: '✈️', labelEn: 'Airport',       labelEs: 'Aeropuerto',    labelId: 'Bandara',      labelRu: 'Аэропорт',       color: '#8899bb' },
}

export const DESTINATIONS: Destination[] = [

  // ─── AIRPORT ───────────────────────────────────────────────────────────
  {
    id: 'ngurah-rai', lat: -8.7482, lng: 115.1672,
    category: 'airport', region: 'Denpasar', priceFromUbud: 30, driveMinFromUbud: 60, published: true,
    translations: {
      en: { name: 'Ngurah Rai International Airport' },
      es: { name: 'Aeropuerto Internacional Ngurah Rai' },
      id: { name: 'Bandara Internasional Ngurah Rai' },
      ru: { name: 'Аэропорт Нгурах-Рай' },
    },
  },

  // ─── UBUD TOWN ─────────────────────────────────────────────────────────
  {
    id: 'ubud', lat: -8.5069, lng: 115.2625,
    category: 'village', region: 'Ubud', priceFromUbud: 40, driveMinFromUbud: 0, published: true,
    translations: {
      en: { name: 'Ubud (Town Center)' },
      es: { name: 'Ubud (Centro)' },
      id: { name: 'Ubud (Pusat Kota)' },
      ru: { name: 'Убуд (центр)' },
    },
  },
  {
    id: 'ubud-palace', lat: -8.5068, lng: 115.2634,
    category: 'cultural', region: 'Ubud', priceFromUbud: 40, driveMinFromUbud: 1, published: true,
    translations: {
      en: { name: 'Ubud Royal Palace (Puri Saren)' },
      es: { name: 'Palacio Real de Ubud (Puri Saren)' },
      id: { name: 'Puri Saren Agung Ubud' },
      ru: { name: 'Королевский дворец Убуда' },
    },
  },
  {
    id: 'ubud-market', lat: -8.5063, lng: 115.2627,
    category: 'market', region: 'Ubud', priceFromUbud: 40, driveMinFromUbud: 1, published: true,
    translations: {
      en: { name: 'Ubud Traditional Market' },
      es: { name: 'Mercado Tradicional de Ubud' },
      id: { name: 'Pasar Tradisional Ubud' },
      ru: { name: 'Рынок Убуда' },
    },
  },
  {
    id: 'monkey-forest', lat: -8.5186, lng: 115.2637,
    category: 'forest', region: 'Ubud', priceFromUbud: 40, driveMinFromUbud: 5, published: true,
    translations: {
      en: { name: 'Sacred Monkey Forest Ubud' },
      es: { name: 'Bosque Sagrado de los Monos' },
      id: { name: 'Hutan Monyet Ubud' },
      ru: { name: 'Священный лес обезьян' },
    },
  },
  {
    id: 'campuhan', lat: -8.5003, lng: 115.2549,
    category: 'viewpoint', region: 'Ubud', priceFromUbud: 40, driveMinFromUbud: 5, published: true,
    translations: {
      en: { name: 'Campuhan Ridge Walk' },
      es: { name: 'Sendero Campuhan Ridge' },
      id: { name: 'Jalan Campuhan Ridge' },
      ru: { name: 'Хребет Кампухан' },
    },
  },
  {
    id: 'blanco-museum', lat: -8.5054, lng: 115.2568,
    category: 'cultural', region: 'Ubud', priceFromUbud: 40, driveMinFromUbud: 5, published: true,
    translations: {
      en: { name: 'Blanco Renaissance Museum' },
      es: { name: 'Museo Blanco Renaissance' },
      id: { name: 'Museum Blanco Renaissance' },
      ru: { name: 'Музей Бланко' },
    },
  },
  {
    id: 'neka-museum', lat: -8.4997, lng: 115.2572,
    category: 'cultural', region: 'Ubud', priceFromUbud: 40, driveMinFromUbud: 5, published: true,
    translations: {
      en: { name: 'Neka Art Museum' },
      es: { name: 'Museo de Arte Neka' },
      id: { name: 'Museum Neka' },
      ru: { name: 'Музей Нека' },
    },
  },
  {
    id: 'sari-organik', lat: -8.4978, lng: 115.2597,
    category: 'viewpoint', region: 'Ubud', priceFromUbud: 40, driveMinFromUbud: 5, published: true,
    translations: {
      en: { name: 'Sari Organik Rice Field Walk' },
      es: { name: 'Sari Organik · Paseo entre arrozales' },
      id: { name: 'Sari Organik Tegalan' },
      ru: { name: 'Рисовые поля Сари Органик' },
    },
  },
  {
    id: 'goa-gajah', lat: -8.5217, lng: 115.2883,
    category: 'temple', region: 'Ubud', priceFromUbud: 40, driveMinFromUbud: 8, published: true,
    translations: {
      en: { name: 'Goa Gajah (Elephant Cave Temple)' },
      es: { name: 'Goa Gajah (Cueva del Elefante)' },
      id: { name: 'Goa Gajah' },
      ru: { name: 'Гоа Гаджа (Слоновья пещера)' },
    },
  },
  {
    id: 'peliatan', lat: -8.5153, lng: 115.2831,
    category: 'village', region: 'Ubud', priceFromUbud: 40, driveMinFromUbud: 8, published: true,
    translations: {
      en: { name: 'Peliatan Village (dance & arts)' },
      es: { name: 'Pueblo de Peliatan (danza y artes)' },
      id: { name: 'Desa Peliatan (tari & seni)' },
      ru: { name: 'Деревня Пелиатан' },
    },
  },
  {
    id: 'petulu', lat: -8.4772, lng: 115.2672,
    category: 'village', region: 'Ubud', priceFromUbud: 40, driveMinFromUbud: 10, published: true,
    translations: {
      en: { name: 'Petulu (White Heron Village)' },
      es: { name: 'Petulu (pueblo de las garzas blancas)' },
      id: { name: 'Petulu (Desa Burung Kuntul)' },
      ru: { name: 'Петулу (деревня цапель)' },
    },
  },
  {
    id: 'keliki', lat: -8.4714, lng: 115.2770,
    category: 'village', region: 'Ubud', priceFromUbud: 40, driveMinFromUbud: 12, published: true,
    translations: {
      en: { name: 'Keliki (artists village)' },
      es: { name: 'Keliki (pueblo de artistas)' },
      id: { name: 'Keliki (desa seniman)' },
      ru: { name: 'Келики (деревня художников)' },
    },
  },
  {
    id: 'mas', lat: -8.5483, lng: 115.2758,
    category: 'village', region: 'Ubud', priceFromUbud: 40, driveMinFromUbud: 10, published: true,
    translations: {
      en: { name: 'Mas Village (wood carving)' },
      es: { name: 'Pueblo de Mas (talla de madera)' },
      id: { name: 'Desa Mas (ukiran kayu)' },
      ru: { name: 'Деревня Мас (резьба по дереву)' },
    },
  },
  {
    id: 'bali-swing', lat: -8.4322, lng: 115.2762,
    category: 'viewpoint', region: 'Ubud', priceFromUbud: 45, driveMinFromUbud: 20, published: true,
    translations: {
      en: { name: 'Bali Swing (Tegallalang)' },
      es: { name: 'Bali Swing (Tegallalang)' },
      id: { name: 'Bali Swing Tegallalang' },
      ru: { name: 'Бали Свинг Тегаллаланг' },
    },
  },

  // ─── UBUD WATERFALLS ───────────────────────────────────────────────────
  {
    id: 'tegenungan', lat: -8.5667, lng: 115.2883,
    category: 'waterfall', region: 'Ubud', priceFromUbud: 45, driveMinFromUbud: 15, published: true,
    translations: {
      en: { name: 'Tegenungan Waterfall' },
      es: { name: 'Cascada Tegenungan' },
      id: { name: 'Air Terjun Tegenungan' },
      ru: { name: 'Водопад Тегенунган' },
    },
  },
  {
    id: 'kanto-lampo', lat: -8.5247, lng: 115.3200,
    category: 'waterfall', region: 'Ubud', priceFromUbud: 50, driveMinFromUbud: 20, published: true,
    translations: {
      en: { name: 'Kanto Lampo Waterfall' },
      es: { name: 'Cascada Kanto Lampo' },
      id: { name: 'Air Terjun Kanto Lampo' },
      ru: { name: 'Водопад Канто Лампо' },
    },
  },
  {
    id: 'tibumana', lat: -8.4619, lng: 115.3281,
    category: 'waterfall', region: 'Ubud', priceFromUbud: 50, driveMinFromUbud: 22, published: true,
    translations: {
      en: { name: 'Tibumana Waterfall' },
      es: { name: 'Cascada Tibumana' },
      id: { name: 'Air Terjun Tibumana' },
      ru: { name: 'Водопад Тибумана' },
    },
  },
  {
    id: 'tukad-cepung', lat: -8.4831, lng: 115.3631,
    category: 'waterfall', region: 'Ubud', priceFromUbud: 55, driveMinFromUbud: 30, published: true,
    translations: {
      en: { name: 'Tukad Cepung Waterfall (canyon)' },
      es: { name: 'Cascada Tukad Cepung (cañón)' },
      id: { name: 'Air Terjun Tukad Cepung' },
      ru: { name: 'Водопад Тукад Чепунг' },
    },
  },

  // ─── UBUD AREA — TEMPLES & RICE ────────────────────────────────────────
  {
    id: 'tegallalang', lat: -8.4321, lng: 115.2787,
    category: 'rice-terrace', region: 'Ubud', priceFromUbud: 45, driveMinFromUbud: 22, published: true,
    translations: {
      en: { name: 'Tegallalang Rice Terraces' },
      es: { name: 'Arrozales de Tegallalang' },
      id: { name: 'Sawah Terasering Tegallalang' },
      ru: { name: 'Рисовые террасы Тегаллаланг' },
    },
  },
  {
    id: 'tirta-empul', lat: -8.4152, lng: 115.3151,
    category: 'temple', region: 'Ubud', priceFromUbud: 50, driveMinFromUbud: 25, published: true,
    translations: {
      en: { name: 'Tirta Empul Temple (sacred springs)' },
      es: { name: 'Templo Tirta Empul (manantiales sagrados)' },
      id: { name: 'Pura Tirta Empul' },
      ru: { name: 'Храм Тирта Эмпул' },
    },
  },
  {
    id: 'pura-mengening', lat: -8.3989, lng: 115.3167,
    category: 'temple', region: 'Ubud', priceFromUbud: 50, driveMinFromUbud: 28, published: true,
    translations: {
      en: { name: 'Pura Mengening (holy spring temple)' },
      es: { name: 'Pura Mengening (templo manantial)' },
      id: { name: 'Pura Mengening' },
      ru: { name: 'Пура Менгенинг' },
    },
  },
  {
    id: 'sukawati', lat: -8.5933, lng: 115.2914,
    category: 'market', region: 'Ubud', priceFromUbud: 45, driveMinFromUbud: 15, published: true,
    translations: {
      en: { name: 'Sukawati Art Market' },
      es: { name: 'Mercado de Arte Sukawati' },
      id: { name: 'Pasar Seni Sukawati' },
      ru: { name: 'Рынок Сукавати' },
    },
  },

  // ─── UBUD — ATTRACTIONS ────────────────────────────────────────────────
  {
    id: 'bali-zoo', lat: -8.5481, lng: 115.2958,
    category: 'cultural', region: 'Gianyar', priceFromUbud: 45, driveMinFromUbud: 15, published: true,
    translations: {
      en: { name: 'Bali Zoo' },
      es: { name: 'Zoo de Bali' },
      id: { name: 'Bali Zoo' },
      ru: { name: 'Зоопарк Бали' },
    },
  },
  {
    id: 'bali-bird-park', lat: -8.5703, lng: 115.3078,
    category: 'cultural', region: 'Gianyar', priceFromUbud: 50, driveMinFromUbud: 18, published: true,
    translations: {
      en: { name: 'Bali Bird Park' },
      es: { name: 'Parque de Aves de Bali' },
      id: { name: 'Bali Bird Park' },
      ru: { name: 'Парк птиц Бали' },
    },
  },
  {
    id: 'bali-safari', lat: -8.5831, lng: 115.3136,
    category: 'cultural', region: 'Gianyar', priceFromUbud: 50, driveMinFromUbud: 20, published: true,
    translations: {
      en: { name: 'Bali Safari & Marine Park' },
      es: { name: 'Safari y Parque Marino de Bali' },
      id: { name: 'Bali Safari & Marine Park' },
      ru: { name: 'Сафари-парк Бали' },
    },
  },
  {
    id: 'sangeh', lat: -8.5308, lng: 115.1897,
    category: 'forest', region: 'Badung', priceFromUbud: 55, driveMinFromUbud: 25, published: true,
    translations: {
      en: { name: 'Sangeh Monkey Forest' },
      es: { name: 'Bosque de Monos de Sangeh' },
      id: { name: 'Hutan Monyet Sangeh' },
      ru: { name: 'Лес обезьян Сангех' },
    },
  },

  // ─── BANGLI / KINTAMANI ────────────────────────────────────────────────
  {
    id: 'penglipuran', lat: -8.4159, lng: 115.3591,
    category: 'village', region: 'Bangli', priceFromUbud: 55, driveMinFromUbud: 30, published: true,
    translations: {
      en: { name: 'Penglipuran Traditional Village' },
      es: { name: 'Pueblo Tradicional de Penglipuran' },
      id: { name: 'Desa Tradisional Penglipuran' },
      ru: { name: 'Деревня Пенглипуран' },
    },
  },
  {
    id: 'pura-kehen', lat: -8.4217, lng: 115.3626,
    category: 'temple', region: 'Bangli', priceFromUbud: 55, driveMinFromUbud: 32, published: true,
    translations: {
      en: { name: 'Pura Kehen Temple (11-tiered pagoda)' },
      es: { name: 'Templo Pura Kehen (pagoda de 11 niveles)' },
      id: { name: 'Pura Kehen (pagoda 11 tingkat)' },
      ru: { name: 'Пура Кехен (11-ярусная пагода)' },
    },
  },
  {
    id: 'kintamani', lat: -8.2439, lng: 115.3697,
    category: 'viewpoint', region: 'Kintamani', priceFromUbud: 65, driveMinFromUbud: 70, published: true,
    translations: {
      en: { name: 'Kintamani Viewpoint (Penelokan)' },
      es: { name: 'Mirador de Kintamani (Penelokan)' },
      id: { name: 'Titik Pandang Kintamani (Penelokan)' },
      ru: { name: 'Смотровая Кинтамани' },
    },
  },
  {
    id: 'mount-batur', lat: -8.2414, lng: 115.3756,
    category: 'volcano', region: 'Kintamani', priceFromUbud: 65, driveMinFromUbud: 75, published: true,
    translations: {
      en: { name: 'Mount Batur (active volcano)' },
      es: { name: 'Monte Batur (volcán activo)' },
      id: { name: 'Gunung Batur (gunung berapi aktif)' },
      ru: { name: 'Гора Батур (действующий вулкан)' },
    },
  },
  {
    id: 'lake-batur', lat: -8.2500, lng: 115.3833,
    category: 'lake', region: 'Kintamani', priceFromUbud: 65, driveMinFromUbud: 78, published: true,
    translations: {
      en: { name: 'Lake Batur (volcanic crater lake)' },
      es: { name: 'Lago Batur (lago de cráter volcánico)' },
      id: { name: 'Danau Batur (danau kawah vulkanik)' },
      ru: { name: 'Озеро Батур' },
    },
  },
  {
    id: 'batur-hot-springs', lat: -8.2517, lng: 115.3922,
    category: 'cultural', region: 'Kintamani', priceFromUbud: 70, driveMinFromUbud: 80, published: true,
    translations: {
      en: { name: 'Batur Hot Springs (Toya Devasya)' },
      es: { name: 'Aguas Termales de Batur (Toya Devasya)' },
      id: { name: 'Pemandian Air Panas Batur' },
      ru: { name: 'Горячие источники Батур' },
    },
  },
  {
    id: 'manikliyu', lat: -8.3100, lng: 115.3200,
    category: 'viewpoint', region: 'Kintamani', priceFromUbud: 65, driveMinFromUbud: 50, published: true,
    translations: {
      en: { name: 'Manikliyu Road (secret mountain road)' },
      es: { name: 'Carretera de Manikliyu (carretera secreta)' },
      id: { name: 'Jalan Manikliyu (jalan rahasia)' },
      ru: { name: 'Дорога Маниклию' },
    },
  },
  {
    id: 'pura-penulisan', lat: -8.2181, lng: 115.3644,
    category: 'temple', region: 'Kintamani', priceFromUbud: 70, driveMinFromUbud: 85, published: true,
    translations: {
      en: { name: "Pura Penulisan (Bali's highest temple)" },
      es: { name: 'Pura Penulisan (templo más alto de Bali)' },
      id: { name: 'Pura Penulisan (pura tertinggi Bali)' },
      ru: { name: 'Пура Пенулисан (высшая точка)' },
    },
  },

  // ─── EAST BALI — NEAR ──────────────────────────────────────────────────
  {
    id: 'besakih', lat: -8.3743, lng: 115.4521,
    category: 'temple', region: 'East Bali', priceFromUbud: 75, driveMinFromUbud: 90, published: true,
    translations: {
      en: { name: 'Besakih Mother Temple' },
      es: { name: 'Templo Madre Besakih' },
      id: { name: 'Pura Besakih (Ibu Segala Pura)' },
      ru: { name: 'Храм-мать Бесаких' },
    },
  },
  {
    id: 'bukit-jambul', lat: -8.5369, lng: 115.4378,
    category: 'viewpoint', region: 'East Bali', priceFromUbud: 70, driveMinFromUbud: 60, published: true,
    translations: {
      en: { name: 'Bukit Jambul Viewpoint' },
      es: { name: 'Mirador Bukit Jambul' },
      id: { name: 'Titik Pandang Bukit Jambul' },
      ru: { name: 'Смотровая Букит Джамбул' },
    },
  },
  {
    id: 'goa-lawah', lat: -8.5505, lng: 115.4726,
    category: 'temple', region: 'East Bali', priceFromUbud: 75, driveMinFromUbud: 75, published: true,
    translations: {
      en: { name: 'Goa Lawah Bat Cave Temple' },
      es: { name: 'Templo Cueva de los Murciélagos Goa Lawah' },
      id: { name: 'Pura Goa Lawah' },
      ru: { name: 'Храм летучих мышей Гоа Лава' },
    },
  },
  {
    id: 'sidemen', lat: -8.5005, lng: 115.5261,
    category: 'village', region: 'East Bali', priceFromUbud: 70, driveMinFromUbud: 65, published: true,
    translations: {
      en: { name: 'Sidemen Valley (weaving village)' },
      es: { name: 'Valle de Sidemen (pueblo de tejidos)' },
      id: { name: 'Lembah Sidemen (desa tenun)' },
      ru: { name: 'Долина Сидемен' },
    },
  },
  {
    id: 'tirta-gangga', lat: -8.4117, lng: 115.5892,
    category: 'temple', region: 'East Bali', priceFromUbud: 90, driveMinFromUbud: 110, published: true,
    translations: {
      en: { name: 'Tirta Gangga Water Palace' },
      es: { name: 'Palacio de Agua Tirta Gangga' },
      id: { name: 'Taman Air Tirta Gangga' },
      ru: { name: 'Водный дворец Тирта Ганга' },
    },
  },
  {
    id: 'lempuyang', lat: -8.3921, lng: 115.6249,
    category: 'temple', region: 'East Bali', priceFromUbud: 100, driveMinFromUbud: 120, published: true,
    translations: {
      en: { name: 'Lempuyang Temple (Gates of Heaven)' },
      es: { name: 'Templo Lempuyang (Puertas del Cielo)' },
      id: { name: 'Pura Lempuyang (Gerbang Surga)' },
      ru: { name: 'Храм Лемпуянг (Врата небес)' },
    },
  },
  {
    id: 'tenganan', lat: -8.5283, lng: 115.5678,
    category: 'village', region: 'East Bali', priceFromUbud: 85, driveMinFromUbud: 95, published: true,
    translations: {
      en: { name: 'Tenganan Ancient Village' },
      es: { name: 'Pueblo Antiguo de Tenganan' },
      id: { name: 'Desa Adat Tenganan Pegringsingan' },
      ru: { name: 'Деревня Тенганан' },
    },
  },
  {
    id: 'candidasa', lat: -8.5100, lng: 115.5650,
    category: 'coast', region: 'East Bali', priceFromUbud: 85, driveMinFromUbud: 90, published: true,
    translations: {
      en: { name: 'Candidasa' },
      es: { name: 'Candidasa' },
      id: { name: 'Candidasa' },
      ru: { name: 'Кандидаса' },
    },
  },
  {
    id: 'padangbai', lat: -8.5358, lng: 115.5108,
    category: 'coast', region: 'East Bali', priceFromUbud: 75, driveMinFromUbud: 80, published: true,
    translations: {
      en: { name: 'Padangbai (harbor & blue lagoon)' },
      es: { name: 'Padangbai (puerto y laguna azul)' },
      id: { name: 'Padangbai (pelabuhan & laguna biru)' },
      ru: { name: 'Паданбай' },
    },
  },
  {
    id: 'virgin-beach', lat: -8.5375, lng: 115.5703,
    category: 'beach', region: 'East Bali', priceFromUbud: 90, driveMinFromUbud: 95, published: true,
    translations: {
      en: { name: 'Virgin Beach (Pantai Pasir Putih)' },
      es: { name: 'Playa Virgen (Pantai Pasir Putih)' },
      id: { name: 'Pantai Pasir Putih (Pantai Virgin)' },
      ru: { name: 'Девственный пляж' },
    },
  },

  // ─── EAST BALI — FAR ───────────────────────────────────────────────────
  {
    id: 'mount-agung', lat: -8.3428, lng: 115.5083,
    category: 'volcano', region: 'East Bali', priceFromUbud: 90, driveMinFromUbud: 105, published: true,
    translations: {
      en: { name: 'Mount Agung (sacred volcano)' },
      es: { name: 'Monte Agung (volcán sagrado)' },
      id: { name: 'Gunung Agung (gunung suci)' },
      ru: { name: 'Гора Агунг (священный вулкан)' },
    },
  },
  {
    id: 'taman-ujung', lat: -8.4589, lng: 115.6128,
    category: 'cultural', region: 'East Bali', priceFromUbud: 105, driveMinFromUbud: 120, published: true,
    translations: {
      en: { name: 'Taman Ujung Water Palace' },
      es: { name: 'Palacio de Agua Taman Ujung' },
      id: { name: 'Taman Ujung (Soekasada)' },
      ru: { name: 'Дворец на воде Таман Уджунг' },
    },
  },
  {
    id: 'bukit-asah', lat: -8.4700, lng: 115.5700,
    category: 'viewpoint', region: 'East Bali', priceFromUbud: 90, driveMinFromUbud: 100, published: true,
    translations: {
      en: { name: "Bukit Asah (Dragon's Nest viewpoint)" },
      es: { name: 'Bukit Asah (mirador del nido del dragón)' },
      id: { name: "Bukit Asah (Dragon's Nest)" },
      ru: { name: 'Букит Аса (Гнездо дракона)' },
    },
  },
  {
    id: 'amed', lat: -8.3489, lng: 115.6561,
    category: 'coast', region: 'East Bali', priceFromUbud: 120, driveMinFromUbud: 135, published: true,
    translations: {
      en: { name: 'Amed (volcanic coast & snorkeling)' },
      es: { name: 'Amed (costa volcánica y snorkel)' },
      id: { name: 'Amed (pantai vulkanik & snorkeling)' },
      ru: { name: 'Амед (вулканическое побережье)' },
    },
  },
  {
    id: 'tulamben', lat: -8.2806, lng: 115.5906,
    category: 'coast', region: 'East Bali', priceFromUbud: 115, driveMinFromUbud: 130, published: true,
    translations: {
      en: { name: 'Tulamben (USAT Liberty wreck dive)' },
      es: { name: 'Tulamben (buceo en el pecio USS Liberty)' },
      id: { name: 'Tulamben (selam kapal karam USAT Liberty)' },
      ru: { name: 'Туламбен (затонувший корабль)' },
    },
  },

  // ─── NORTH HIGHLANDS (MUNDUK / BEDUGUL) ───────────────────────────────
  {
    id: 'nungnung', lat: -8.4306, lng: 115.1428,
    category: 'waterfall', region: 'North Highlands', priceFromUbud: 65, driveMinFromUbud: 55, published: true,
    translations: {
      en: { name: 'Nungnung Waterfall (140 steps)' },
      es: { name: 'Cascada Nungnung (140 escalones)' },
      id: { name: 'Air Terjun Nungnung (140 anak tangga)' },
      ru: { name: 'Водопад Нунгнунг' },
    },
  },
  {
    id: 'ulun-danu', lat: -8.2752, lng: 115.1626,
    category: 'temple', region: 'North Highlands', priceFromUbud: 75, driveMinFromUbud: 80, published: true,
    translations: {
      en: { name: 'Ulun Danu Beratan Temple (lake temple)' },
      es: { name: 'Templo Ulun Danu Beratan (templo lacustre)' },
      id: { name: 'Pura Ulun Danu Beratan' },
      ru: { name: 'Храм Улун Дану Бератан' },
    },
  },
  {
    id: 'lake-beratan', lat: -8.2758, lng: 115.1608,
    category: 'lake', region: 'North Highlands', priceFromUbud: 75, driveMinFromUbud: 80, published: true,
    translations: {
      en: { name: 'Lake Beratan (Bedugul)' },
      es: { name: 'Lago Beratan (Bedugul)' },
      id: { name: 'Danau Beratan (Bedugul)' },
      ru: { name: 'Озеро Бератан (Бедугул)' },
    },
  },
  {
    id: 'kebun-raya', lat: -8.2731, lng: 115.1600,
    category: 'forest', region: 'North Highlands', priceFromUbud: 75, driveMinFromUbud: 80, published: true,
    translations: {
      en: { name: 'Bali Botanic Garden (Kebun Raya)' },
      es: { name: 'Jardín Botánico de Bali (Kebun Raya)' },
      id: { name: 'Kebun Raya Bali' },
      ru: { name: 'Ботанический сад Бали' },
    },
  },
  {
    id: 'lake-tamblingan', lat: -8.2617, lng: 115.1225,
    category: 'lake', region: 'North Highlands', priceFromUbud: 80, driveMinFromUbud: 90, published: true,
    translations: {
      en: { name: 'Lake Tamblingan (sacred twin lake)' },
      es: { name: 'Lago Tamblingan (lago sagrado)' },
      id: { name: 'Danau Tamblingan (danau kembar sakral)' },
      ru: { name: 'Озеро Тамблинган' },
    },
  },
  {
    id: 'lake-buyan', lat: -8.2758, lng: 115.1375,
    category: 'lake', region: 'North Highlands', priceFromUbud: 80, driveMinFromUbud: 88, published: true,
    translations: {
      en: { name: 'Lake Buyan (twin lake panorama)' },
      es: { name: 'Lago Buyan (panorama de los lagos gemelos)' },
      id: { name: 'Danau Buyan (panorama danau kembar)' },
      ru: { name: 'Озеро Буян' },
    },
  },
  {
    id: 'munduk', lat: -8.2783, lng: 115.0650,
    category: 'village', region: 'North Highlands', priceFromUbud: 80, driveMinFromUbud: 95, published: true,
    translations: {
      en: { name: 'Munduk Village (mist & spice)' },
      es: { name: 'Pueblo de Munduk (niebla y especias)' },
      id: { name: 'Desa Munduk (kabut & rempah)' },
      ru: { name: 'Деревня Мундук' },
    },
  },
  {
    id: 'banyumala', lat: -8.2164, lng: 115.0947,
    category: 'waterfall', region: 'North Highlands', priceFromUbud: 85, driveMinFromUbud: 105, published: true,
    translations: {
      en: { name: 'Banyumala Twin Waterfalls' },
      es: { name: 'Cascadas Gemelas de Banyumala' },
      id: { name: 'Air Terjun Kembar Banyumala' },
      ru: { name: 'Двойной водопад Баньюмала' },
    },
  },

  // ─── NORTH BALI ────────────────────────────────────────────────────────
  {
    id: 'aling-aling', lat: -8.1683, lng: 115.1517,
    category: 'waterfall', region: 'North Bali', priceFromUbud: 90, driveMinFromUbud: 110, published: true,
    translations: {
      en: { name: 'Aling-Aling Waterfall (5 cascades)' },
      es: { name: 'Cascada Aling-Aling (5 caídas)' },
      id: { name: 'Air Terjun Aling-Aling (5 air terjun)' },
      ru: { name: 'Водопад Алинг-Алинг' },
    },
  },
  {
    id: 'sekumpul', lat: -8.1481, lng: 115.1564,
    category: 'waterfall', region: 'North Bali', priceFromUbud: 95, driveMinFromUbud: 115, published: true,
    translations: {
      en: { name: "Sekumpul Waterfall (Bali's most impressive)" },
      es: { name: 'Cascada de Sekumpul (la más impresionante de Bali)' },
      id: { name: 'Air Terjun Sekumpul (paling mengesankan)' },
      ru: { name: 'Водопад Секумпул' },
    },
  },
  {
    id: 'gitgit', lat: -8.1756, lng: 115.1308,
    category: 'waterfall', region: 'North Bali', priceFromUbud: 85, driveMinFromUbud: 105, published: true,
    translations: {
      en: { name: 'Gitgit Waterfall' },
      es: { name: 'Cascada Gitgit' },
      id: { name: 'Air Terjun Gitgit' },
      ru: { name: 'Водопад Гитгит' },
    },
  },
  {
    id: 'banjar', lat: -8.2200, lng: 115.0261,
    category: 'cultural', region: 'North Bali', priceFromUbud: 85, driveMinFromUbud: 110, published: true,
    translations: {
      en: { name: 'Banjar Hot Springs' },
      es: { name: 'Aguas Termales de Banjar' },
      id: { name: 'Pemandian Air Panas Banjar' },
      ru: { name: 'Горячие источники Банджар' },
    },
  },
  {
    id: 'singaraja', lat: -8.1119, lng: 115.0882,
    category: 'cultural', region: 'North Bali', priceFromUbud: 90, driveMinFromUbud: 115, published: true,
    translations: {
      en: { name: 'Singaraja (colonial town & heritage)' },
      es: { name: 'Singaraja (ciudad colonial y patrimonio)' },
      id: { name: 'Singaraja (kota kolonial & warisan budaya)' },
      ru: { name: 'Сингараджа' },
    },
  },
  {
    id: 'lovina', lat: -8.1570, lng: 115.0128,
    category: 'beach', region: 'North Bali', priceFromUbud: 95, driveMinFromUbud: 120, published: true,
    translations: {
      en: { name: 'Lovina Beach (dolphins at sunrise)' },
      es: { name: 'Playa de Lovina (delfines al amanecer)' },
      id: { name: 'Pantai Lovina (lumba-lumba saat matahari terbit)' },
      ru: { name: 'Пляж Ловина (дельфины на рассвете)' },
    },
  },
  {
    id: 'air-sanih', lat: -8.0831, lng: 115.2025,
    category: 'cultural', region: 'North Bali', priceFromUbud: 120, driveMinFromUbud: 140, published: true,
    translations: {
      en: { name: 'Air Sanih Natural Springs' },
      es: { name: 'Manantiales Naturales de Air Sanih' },
      id: { name: 'Yeh Sanih (Pemandian Air Alam)' },
      ru: { name: 'Природные источники Аир Сани' },
    },
  },
  {
    id: 'pura-pulaki', lat: -8.1592, lng: 114.6194,
    category: 'temple', region: 'North Bali', priceFromUbud: 140, driveMinFromUbud: 160, published: true,
    translations: {
      en: { name: 'Pura Pulaki (sea temple with monkeys)' },
      es: { name: 'Pura Pulaki (templo marino con monos)' },
      id: { name: 'Pura Pulaki (pura laut dengan monyet)' },
      ru: { name: 'Пура Пулаки (морской храм с обезьянами)' },
    },
  },

  // ─── CENTRAL / WEST BALI ───────────────────────────────────────────────
  {
    id: 'jatiluwih', lat: -8.3711, lng: 115.1286,
    category: 'rice-terrace', region: 'Central Bali', priceFromUbud: 70, driveMinFromUbud: 75, published: true,
    translations: {
      en: { name: 'Jatiluwih Rice Terraces (UNESCO)' },
      es: { name: 'Arrozales de Jatiluwih (UNESCO)' },
      id: { name: 'Sawah Jatiluwih (UNESCO)' },
      ru: { name: 'Джатилувих (ЮНЕСКО)' },
    },
  },
  {
    id: 'pura-batukaru', lat: -8.3697, lng: 115.1350,
    category: 'temple', region: 'Central Bali', priceFromUbud: 70, driveMinFromUbud: 78, published: true,
    translations: {
      en: { name: 'Pura Luhur Batukaru (jungle temple)' },
      es: { name: 'Pura Luhur Batukaru (templo en la jungla)' },
      id: { name: 'Pura Luhur Batukaru (pura di hutan)' },
      ru: { name: 'Пура Батукару (храм в джунглях)' },
    },
  },
  {
    id: 'pura-taman-ayun', lat: -8.5456, lng: 115.0828,
    category: 'temple', region: 'Central Bali', priceFromUbud: 60, driveMinFromUbud: 55, published: true,
    translations: {
      en: { name: 'Pura Taman Ayun (UNESCO moat temple)' },
      es: { name: 'Pura Taman Ayun (templo con foso, UNESCO)' },
      id: { name: 'Pura Taman Ayun (pura berparit UNESCO)' },
      ru: { name: 'Пура Таман Аюн' },
    },
  },
  {
    id: 'tanah-lot', lat: -8.6212, lng: 115.0869,
    category: 'temple', region: 'South-West Bali', priceFromUbud: 60, driveMinFromUbud: 60, published: true,
    translations: {
      en: { name: 'Tanah Lot Temple (ocean temple at sunset)' },
      es: { name: 'Templo Tanah Lot (templo oceánico al atardecer)' },
      id: { name: 'Pura Tanah Lot (pura laut saat sunset)' },
      ru: { name: 'Храм Танах Лот (закат над океаном)' },
    },
  },
  {
    id: 'medewi', lat: -8.4408, lng: 114.8739,
    category: 'beach', region: 'West Bali', priceFromUbud: 100, driveMinFromUbud: 120, published: true,
    translations: {
      en: { name: 'Medewi Beach (legendary surf spot)' },
      es: { name: 'Playa Medewi (spot de surf legendario)' },
      id: { name: 'Pantai Medewi (spot surfing legendaris)' },
      ru: { name: 'Пляж Медеви (серфинг)' },
    },
  },
  {
    id: 'pura-rambut-siwi', lat: -8.4628, lng: 114.7897,
    category: 'temple', region: 'West Bali', priceFromUbud: 105, driveMinFromUbud: 125, published: true,
    translations: {
      en: { name: 'Pura Rambut Siwi (cliffside sea temple)' },
      es: { name: 'Pura Rambut Siwi (templo marino en acantilado)' },
      id: { name: 'Pura Rambut Siwi (pura tebing)' },
      ru: { name: 'Пура Рамбут Сиви' },
    },
  },
  {
    id: 'bali-barat', lat: -8.1500, lng: 114.6000,
    category: 'forest', region: 'West Bali', priceFromUbud: 145, driveMinFromUbud: 165, published: true,
    translations: {
      en: { name: 'Bali Barat National Park' },
      es: { name: 'Parque Nacional Bali Barat' },
      id: { name: 'Taman Nasional Bali Barat' },
      ru: { name: 'Нац. парк Бали Барат' },
    },
  },
  {
    id: 'menjangan', lat: -8.1150, lng: 114.5158,
    category: 'coast', region: 'West Bali', priceFromUbud: 160, driveMinFromUbud: 185, published: true,
    translations: {
      en: { name: 'Menjangan Island (snorkeling & diving)' },
      es: { name: 'Isla Menjangan (snorkel y buceo)' },
      id: { name: 'Pulau Menjangan (snorkeling & diving)' },
      ru: { name: 'Остров Менджанган' },
    },
  },

  // ─── SOUTH BALI / ULUWATU ──────────────────────────────────────────────
  {
    id: 'gwk', lat: -8.8100, lng: 115.1672,
    category: 'cultural', region: 'South Bali', priceFromUbud: 70, driveMinFromUbud: 80, published: true,
    translations: {
      en: { name: 'GWK Cultural Park (Garuda Wisnu Kencana)' },
      es: { name: 'Parque Cultural GWK' },
      id: { name: 'GWK Cultural Park (Garuda Wisnu Kencana)' },
      ru: { name: 'Культурный парк ГВК' },
    },
  },
  {
    id: 'uluwatu', lat: -8.8291, lng: 115.0849,
    category: 'temple', region: 'Uluwatu', priceFromUbud: 70, driveMinFromUbud: 80, published: true,
    translations: {
      en: { name: 'Uluwatu Temple & Ocean Cliffs' },
      es: { name: 'Templo y Acantilados de Uluwatu' },
      id: { name: 'Pura Uluwatu & Tebing Samudra' },
      ru: { name: 'Улувату: храм и скалы' },
    },
  },
  {
    id: 'padang-padang', lat: -8.8083, lng: 115.1083,
    category: 'beach', region: 'Uluwatu', priceFromUbud: 75, driveMinFromUbud: 85, published: true,
    translations: {
      en: { name: 'Padang Padang Beach' },
      es: { name: 'Playa Padang Padang' },
      id: { name: 'Pantai Padang Padang' },
      ru: { name: 'Паданг Паданг' },
    },
  },
  {
    id: 'balangan', lat: -8.8167, lng: 115.1000,
    category: 'beach', region: 'Uluwatu', priceFromUbud: 75, driveMinFromUbud: 85, published: true,
    translations: {
      en: { name: 'Balangan Beach' },
      es: { name: 'Playa Balangan' },
      id: { name: 'Pantai Balangan' },
      ru: { name: 'Пляж Баланган' },
    },
  },
  {
    id: 'dreamland', lat: -8.7983, lng: 115.0947,
    category: 'beach', region: 'Uluwatu', priceFromUbud: 75, driveMinFromUbud: 83, published: true,
    translations: {
      en: { name: 'Dreamland Beach' },
      es: { name: 'Playa Dreamland' },
      id: { name: 'Pantai Dreamland' },
      ru: { name: 'Пляж Дримленд' },
    },
  },
  {
    id: 'suluban', lat: -8.8258, lng: 115.0831,
    category: 'beach', region: 'Uluwatu', priceFromUbud: 75, driveMinFromUbud: 85, published: true,
    translations: {
      en: { name: 'Suluban Beach (Blue Point)' },
      es: { name: 'Playa Suluban (Blue Point)' },
      id: { name: 'Pantai Suluban (Blue Point)' },
      ru: { name: 'Пляж Сулубан (Blue Point)' },
    },
  },
  {
    id: 'nyang-nyang', lat: -8.8456, lng: 115.0883,
    category: 'beach', region: 'Uluwatu', priceFromUbud: 80, driveMinFromUbud: 90, published: true,
    translations: {
      en: { name: 'Nyang Nyang Beach (hidden & wild)' },
      es: { name: 'Playa Nyang Nyang (escondida y salvaje)' },
      id: { name: 'Pantai Nyang Nyang (tersembunyi & liar)' },
      ru: { name: 'Пляж Нянг Нянг (дикий)' },
    },
  },
  {
    id: 'melasti', lat: -8.8458, lng: 115.1319,
    category: 'beach', region: 'Uluwatu', priceFromUbud: 75, driveMinFromUbud: 85, published: true,
    translations: {
      en: { name: 'Melasti Beach' },
      es: { name: 'Playa Melasti' },
      id: { name: 'Pantai Melasti' },
      ru: { name: 'Пляж Мелисти' },
    },
  },
  {
    id: 'jimbaran', lat: -8.7683, lng: 115.1700,
    category: 'beach', region: 'South Bali', priceFromUbud: 70, driveMinFromUbud: 78, published: true,
    translations: {
      en: { name: 'Jimbaran Bay (seafood & sunset)' },
      es: { name: 'Bahía de Jimbaran (marisco y atardecer)' },
      id: { name: 'Teluk Jimbaran (seafood & sunset)' },
      ru: { name: 'Залив Джимбаран (морепродукты)' },
    },
  },
  {
    id: 'waterbom', lat: -8.7178, lng: 115.1693,
    category: 'cultural', region: 'South Bali', priceFromUbud: 65, driveMinFromUbud: 72, published: true,
    translations: {
      en: { name: 'Waterbom Bali (water park)' },
      es: { name: 'Waterbom Bali (parque acuático)' },
      id: { name: 'Waterbom Bali (taman air)' },
      ru: { name: 'Аквапарк Ватербом' },
    },
  },
  {
    id: 'kuta', lat: -8.7183, lng: 115.1686,
    category: 'beach', region: 'South Bali', priceFromUbud: 65, driveMinFromUbud: 72, published: true,
    translations: {
      en: { name: 'Kuta Beach' },
      es: { name: 'Playa de Kuta' },
      id: { name: 'Pantai Kuta' },
      ru: { name: 'Пляж Кута' },
    },
  },
  {
    id: 'seminyak', lat: -8.6908, lng: 115.1597,
    category: 'beach', region: 'South Bali', priceFromUbud: 65, driveMinFromUbud: 68, published: true,
    translations: {
      en: { name: 'Seminyak Beach' },
      es: { name: 'Playa de Seminyak' },
      id: { name: 'Pantai Seminyak' },
      ru: { name: 'Семиньяк' },
    },
  },
  {
    id: 'berawa', lat: -8.6639, lng: 115.1353,
    category: 'beach', region: 'South Bali', priceFromUbud: 65, driveMinFromUbud: 66, published: true,
    translations: {
      en: { name: 'Berawa Beach (Canggu)' },
      es: { name: 'Playa Berawa (Canggu)' },
      id: { name: 'Pantai Berawa (Canggu)' },
      ru: { name: 'Пляж Берава (Чангу)' },
    },
  },
  {
    id: 'canggu', lat: -8.6508, lng: 115.1300,
    category: 'beach', region: 'South Bali', priceFromUbud: 65, driveMinFromUbud: 66, published: true,
    translations: {
      en: { name: 'Canggu & Echo Beach' },
      es: { name: 'Canggu y Echo Beach' },
      id: { name: 'Canggu & Echo Beach' },
      ru: { name: 'Чангу и Echo Beach' },
    },
  },
  {
    id: 'sanur', lat: -8.7042, lng: 115.2650,
    category: 'beach', region: 'South Bali', priceFromUbud: 65, driveMinFromUbud: 55, published: true,
    translations: {
      en: { name: 'Sanur Beach (calm & local)' },
      es: { name: 'Playa de Sanur (tranquila y local)' },
      id: { name: 'Pantai Sanur (tenang & lokal)' },
      ru: { name: 'Санур (спокойный пляж)' },
    },
  },
  {
    id: 'nusa-dua', lat: -8.8008, lng: 115.2308,
    category: 'beach', region: 'South Bali', priceFromUbud: 75, driveMinFromUbud: 82, published: true,
    translations: {
      en: { name: 'Nusa Dua' },
      es: { name: 'Nusa Dua' },
      id: { name: 'Nusa Dua' },
      ru: { name: 'Нуса Дуа' },
    },
  },
  {
    id: 'denpasar', lat: -8.6586, lng: 115.2169,
    category: 'cultural', region: 'Denpasar', priceFromUbud: 60, driveMinFromUbud: 45, published: true,
    translations: {
      en: { name: 'Denpasar (Bali Museum & city)' },
      es: { name: 'Denpasar (Museo de Bali y ciudad)' },
      id: { name: 'Denpasar (Museum Bali & kota)' },
      ru: { name: 'Денпасар (музей и город)' },
    },
  },

  // ─── PALACES & CULTURAL EAST ───────────────────────────────────────────
  {
    id: 'klungkung', lat: -8.5394, lng: 115.4014,
    category: 'cultural', region: 'Klungkung', priceFromUbud: 65, driveMinFromUbud: 55, published: true,
    translations: {
      en: { name: 'Klungkung — Kertha Gosa floating pavilion' },
      es: { name: 'Klungkung — Pabellón flotante Kertha Gosa' },
      id: { name: 'Klungkung — Kertha Gosa (Bale Kambang)' },
      ru: { name: 'Клунгкунг — плавучий павильон Кертха Госа' },
    },
  },
  {
    id: 'puri-agung-karangasem', lat: -8.4514, lng: 115.6106,
    category: 'cultural', region: 'Karangasem', priceFromUbud: 110, driveMinFromUbud: 125, published: true,
    translations: {
      en: { name: 'Puri Agung Karangasem (royal palace Amlapura)' },
      es: { name: 'Palacio Real de Karangasem (Amlapura)' },
      id: { name: 'Puri Agung Karangasem (Amlapura)' },
      ru: { name: 'Королевский дворец Карангасем' },
    },
  },
  {
    id: 'kusamba', lat: -8.5550, lng: 115.4561,
    category: 'village', region: 'Klungkung', priceFromUbud: 70, driveMinFromUbud: 65, published: true,
    translations: {
      en: { name: 'Kusamba (traditional salt making village)' },
      es: { name: 'Kusamba (pueblo tradicional de sal marina)' },
      id: { name: 'Kusamba (desa pembuatan garam tradisional)' },
      ru: { name: 'Кусамба (деревня соляных промыслов)' },
    },
  },
  {
    id: 'batuan-temple', lat: -8.5425, lng: 115.2944,
    category: 'temple', region: 'Gianyar', priceFromUbud: 50, driveMinFromUbud: 18, published: true,
    translations: {
      en: { name: 'Batuan Temple (ancient dark paintings)' },
      es: { name: 'Templo Batuan (pinturas oscuras ancestrales)' },
      id: { name: 'Pura Batuan (lukisan gelap kuno)' },
      ru: { name: 'Храм Батуан (древние картины)' },
    },
  },
  {
    id: 'pejeng', lat: -8.4561, lng: 115.3005,
    category: 'cultural', region: 'Gianyar', priceFromUbud: 50, driveMinFromUbud: 20, published: true,
    translations: {
      en: { name: 'Pejeng — Moon of Pejeng (largest bronze drum)' },
      es: { name: 'Pejeng — Luna de Pejeng (mayor tambor de bronce)' },
      id: { name: 'Pejeng — Bulan Pejeng (nekara terbesar dunia)' },
      ru: { name: 'Педжен — Луна Педжен' },
    },
  },
  {
    id: 'muncan', lat: -8.5008, lng: 115.4661,
    category: 'village', region: 'Karangasem', priceFromUbud: 75, driveMinFromUbud: 80, published: true,
    translations: {
      en: { name: 'Muncan Village (rice terraces & Agung views)' },
      es: { name: 'Pueblo de Muncan (arrozales y vistas al Agung)' },
      id: { name: 'Desa Muncan (sawah & pemandangan Agung)' },
      ru: { name: 'Деревня Мунчан' },
    },
  },

  // ─── MORE PADANGBAI BEACHES ────────────────────────────────────────────
  {
    id: 'blue-lagoon', lat: -8.5314, lng: 115.5113,
    category: 'beach', region: 'Karangasem', priceFromUbud: 78, driveMinFromUbud: 85, published: true,
    translations: {
      en: { name: 'Blue Lagoon Beach (snorkeling, Padangbai)' },
      es: { name: 'Playa Blue Lagoon (snorkel, Padangbai)' },
      id: { name: 'Blue Lagoon Beach (snorkeling, Padangbai)' },
      ru: { name: 'Голубая лагуна (Паданбай)' },
    },
  },
  {
    id: 'bias-tugel', lat: -8.5331, lng: 115.5089,
    category: 'beach', region: 'Karangasem', priceFromUbud: 78, driveMinFromUbud: 85, published: true,
    translations: {
      en: { name: 'Bias Tugel (secret cove, Padangbai)' },
      es: { name: 'Bias Tugel (cala secreta, Padangbai)' },
      id: { name: 'Bias Tugel (pantai tersembunyi, Padangbai)' },
      ru: { name: 'Биас Тугел (скрытая бухта)' },
    },
  },

  // ─── CANGGU / SEMINYAK BEACHES ─────────────────────────────────────────
  {
    id: 'batu-bolong-beach', lat: -8.6492, lng: 115.1328,
    category: 'beach', region: 'Canggu', priceFromUbud: 65, driveMinFromUbud: 66, published: true,
    translations: {
      en: { name: 'Batu Bolong Beach & Pura Batu Bolong' },
      es: { name: 'Playa Batu Bolong y Pura Batu Bolong' },
      id: { name: 'Pantai Batu Bolong & Pura Batu Bolong' },
      ru: { name: 'Пляж Бату Болонг' },
    },
  },
  {
    id: 'pererenan', lat: -8.6400, lng: 115.1250,
    category: 'beach', region: 'Canggu', priceFromUbud: 65, driveMinFromUbud: 65, published: true,
    translations: {
      en: { name: 'Pererenan Beach (quiet surf, Canggu)' },
      es: { name: 'Playa Pererenan (surf tranquilo, Canggu)' },
      id: { name: 'Pantai Pererenan (surfing tenang, Canggu)' },
      ru: { name: 'Пляж Перереnan (тихий серфинг)' },
    },
  },
  {
    id: 'yeh-gangga', lat: -8.6131, lng: 115.0661,
    category: 'beach', region: 'Tabanan', priceFromUbud: 65, driveMinFromUbud: 70, published: true,
    translations: {
      en: { name: 'Yeh Gangga Beach (black sand, quiet)' },
      es: { name: 'Playa Yeh Gangga (arena negra, tranquila)' },
      id: { name: 'Pantai Yeh Gangga (pasir hitam, sepi)' },
      ru: { name: 'Пляж Ех Ганга (чёрный песок)' },
    },
  },

  // ─── ULUWATU EXTRA BEACHES ─────────────────────────────────────────────
  {
    id: 'thomas-beach', lat: -8.8269, lng: 115.0878,
    category: 'beach', region: 'Uluwatu', priceFromUbud: 75, driveMinFromUbud: 85, published: true,
    translations: {
      en: { name: "Thomas Beach (Uluwatu, locals' secret)" },
      es: { name: 'Playa Thomas (Uluwatu, secreto local)' },
      id: { name: 'Pantai Thomas (Uluwatu, rahasia lokal)' },
      ru: { name: 'Пляж Томас (Улувату)' },
    },
  },
  {
    id: 'bingin', lat: -8.8119, lng: 115.0961,
    category: 'beach', region: 'Uluwatu', priceFromUbud: 75, driveMinFromUbud: 85, published: true,
    translations: {
      en: { name: 'Bingin Beach (surf & cliff restaurant)' },
      es: { name: 'Playa Bingin (surf y restaurante en acantilado)' },
      id: { name: 'Pantai Bingin (surf & restoran tebing)' },
      ru: { name: 'Пляж Бингин (серфинг)' },
    },
  },
  {
    id: 'green-bowl', lat: -8.8367, lng: 115.1600,
    category: 'beach', region: 'Uluwatu', priceFromUbud: 78, driveMinFromUbud: 88, published: true,
    translations: {
      en: { name: 'Green Bowl Beach (170 steps, hidden gem)' },
      es: { name: 'Playa Green Bowl (170 escalones, joya escondida)' },
      id: { name: 'Pantai Green Bowl (170 tangga, tersembunyi)' },
      ru: { name: 'Пляж Грин Боул (170 ступенек)' },
    },
  },
  {
    id: 'tegal-wangi', lat: -8.7867, lng: 115.1550,
    category: 'beach', region: 'Jimbaran', priceFromUbud: 70, driveMinFromUbud: 80, published: true,
    translations: {
      en: { name: 'Tegal Wangi Beach (cliff pools & sunset)' },
      es: { name: 'Playa Tegal Wangi (piscinas en acantilado y atardecer)' },
      id: { name: 'Pantai Tegal Wangi (kolam tebing & sunset)' },
      ru: { name: 'Тегал Ванги (бассейны на скалах)' },
    },
  },

  // ─── WEST BALI EXTRA ────────────────────────────────────────────────────
  {
    id: 'pantai-soka', lat: -8.4567, lng: 114.9278,
    category: 'beach', region: 'West Bali', priceFromUbud: 90, driveMinFromUbud: 110, published: true,
    translations: {
      en: { name: 'Pantai Soka (black sand, West Bali)' },
      es: { name: 'Pantai Soka (arena negra, Bali Occidental)' },
      id: { name: 'Pantai Soka (pasir hitam, Bali Barat)' },
      ru: { name: 'Пляж Сока (западный Бали)' },
    },
  },
  {
    id: 'bunut-bolong', lat: -8.3656, lng: 114.8539,
    category: 'forest', region: 'West Bali', priceFromUbud: 105, driveMinFromUbud: 130, published: true,
    translations: {
      en: { name: 'Bunut Bolong (giant banyan tree arch on the road)' },
      es: { name: 'Bunut Bolong (arco de higuera gigante en la carretera)' },
      id: { name: 'Bunut Bolong (pohon beringin raksasa di jalan)' },
      ru: { name: 'Бунут Болонг (гигантский баньян-арка)' },
    },
  },
  {
    id: 'pupuan', lat: -8.3978, lng: 115.0011,
    category: 'viewpoint', region: 'West Bali', priceFromUbud: 90, driveMinFromUbud: 115, published: true,
    translations: {
      en: { name: 'Pupuan Coffee Plantation & rice valley' },
      es: { name: 'Plantación de café de Pupuan y valle de arrozales' },
      id: { name: 'Perkebunan Kopi Pupuan & sawah' },
      ru: { name: 'Кофейная плантация Пупуан' },
    },
  },

  // ─── NORTH HIGHLANDS EXTRA ─────────────────────────────────────────────
  {
    id: 'yeh-panas', lat: -8.3956, lng: 115.1228,
    category: 'cultural', region: 'North Highlands', priceFromUbud: 70, driveMinFromUbud: 80, published: true,
    translations: {
      en: { name: 'Yeh Panas Hot Springs (Penebel)' },
      es: { name: 'Aguas Termales Yeh Panas (Penebel)' },
      id: { name: 'Pemandian Yeh Panas Penebel' },
      ru: { name: 'Горячие источники Ех Панас' },
    },
  },
  {
    id: 'bali-treetop', lat: -8.2764, lng: 115.1606,
    category: 'cultural', region: 'North Highlands', priceFromUbud: 75, driveMinFromUbud: 82, published: true,
    translations: {
      en: { name: 'Bali Treetop Adventure Park (Bedugul)' },
      es: { name: 'Parque de Aventura Bali Treetop (Bedugul)' },
      id: { name: 'Bali Treetop Adventure Park (Bedugul)' },
      ru: { name: 'Приключения в кронах деревьев (Бедугул)' },
    },
  },

  // ─── KINTAMANI EXTRA ───────────────────────────────────────────────────
  {
    id: 'pura-ulun-danu-batur', lat: -8.2347, lng: 115.3756,
    category: 'temple', region: 'Kintamani', priceFromUbud: 70, driveMinFromUbud: 80, published: true,
    translations: {
      en: { name: 'Pura Ulun Danu Batur (crater rim lake temple)' },
      es: { name: 'Pura Ulun Danu Batur (templo lacustre en el cráter)' },
      id: { name: 'Pura Ulun Danu Batur (pura tepi kawah)' },
      ru: { name: 'Пура Улун Дану Батур (у кратера)' },
    },
  },
  {
    id: 'toya-devasya', lat: -8.2556, lng: 115.4022,
    category: 'cultural', region: 'Kintamani', priceFromUbud: 72, driveMinFromUbud: 82, published: true,
    translations: {
      en: { name: 'Toya Devasya — natural hot pool with volcano view' },
      es: { name: 'Toya Devasya — piscina termal con vista al volcán' },
      id: { name: 'Toya Devasya — kolam alami dengan pemandangan gunung berapi' },
      ru: { name: 'Тоя Девасья — термальный бассейн у вулкана' },
    },
  },

  // ─── GIANYAR AREA TOWNS ───────────────────────────────────────────────────
  {
    id: 'gianyar', lat: -8.5461, lng: 115.3294,
    category: 'village', region: 'Gianyar', priceFromUbud: 50, driveMinFromUbud: 25, published: true,
    translations: {
      en: { name: 'Gianyar Town (babi guling & art market)' },
      es: { name: 'Ciudad de Gianyar (babi guling y mercado de arte)' },
      id: { name: 'Kota Gianyar (babi guling & pasar seni)' },
      ru: { name: 'Гиньяр (город, рынок)' },
    },
  },
  {
    id: 'batubulan', lat: -8.5656, lng: 115.2942,
    category: 'village', region: 'Gianyar', priceFromUbud: 50, driveMinFromUbud: 22, published: true,
    translations: {
      en: { name: 'Batubulan (Barong dance & stone carvings)' },
      es: { name: 'Batubulan (danza Barong y tallas de piedra)' },
      id: { name: 'Batubulan (tari Barong & ukiran batu)' },
      ru: { name: 'Батубулан (танец Барон, каменная резьба)' },
    },
  },
  {
    id: 'celuk', lat: -8.5594, lng: 115.2683,
    category: 'village', region: 'Gianyar', priceFromUbud: 45, driveMinFromUbud: 12, published: true,
    translations: {
      en: { name: 'Celuk (silversmithing & gold jewelry village)' },
      es: { name: 'Celuk (pueblo de platería y joyería)' },
      id: { name: 'Celuk (desa perak & perhiasan emas)' },
      ru: { name: 'Челук (серебряные мастерские)' },
    },
  },
  {
    id: 'blahbatuh', lat: -8.5553, lng: 115.3058,
    category: 'village', region: 'Gianyar', priceFromUbud: 50, driveMinFromUbud: 22, published: true,
    translations: {
      en: { name: 'Blahbatuh (Pura Gaduh & traditional crafts)' },
      es: { name: 'Blahbatuh (Pura Gaduh y artesanías)' },
      id: { name: 'Blahbatuh (Pura Gaduh & kerajinan tradisional)' },
      ru: { name: 'Блахбатух (традиционное ремесло)' },
    },
  },
  {
    id: 'bona', lat: -8.5400, lng: 115.3067,
    category: 'village', region: 'Gianyar', priceFromUbud: 50, driveMinFromUbud: 20, published: true,
    translations: {
      en: { name: 'Bona Village (bamboo crafts & Kecak dance)' },
      es: { name: 'Pueblo de Bona (artesanía de bambú y danza Kecak)' },
      id: { name: 'Desa Bona (kerajinan bambu & tari Kecak)' },
      ru: { name: 'Деревня Бона (бамбуковые изделия)' },
    },
  },
  {
    id: 'kemenuh', lat: -8.5267, lng: 115.3133,
    category: 'village', region: 'Gianyar', priceFromUbud: 50, driveMinFromUbud: 18, published: true,
    translations: {
      en: { name: 'Kemenuh (woodcarving village, Ganesh statues)' },
      es: { name: 'Kemenuh (pueblo tallador de madera, estatuas Ganesha)' },
      id: { name: 'Kemenuh (desa ukir kayu, patung Ganesha)' },
      ru: { name: 'Кеменух (резьба по дереву)' },
    },
  },
  {
    id: 'lodtunduh', lat: -8.5350, lng: 115.2700,
    category: 'village', region: 'Gianyar', priceFromUbud: 45, driveMinFromUbud: 14, published: true,
    translations: {
      en: { name: 'Lodtunduh (antiques & crafts village)' },
      es: { name: 'Lodtunduh (pueblo de antigüedades y artesanías)' },
      id: { name: 'Lodtunduh (desa antik & kerajinan)' },
      ru: { name: 'Лодтундух (антиквариат)' },
    },
  },

  // ─── NEAR UBUD TOWNS ──────────────────────────────────────────────────────
  {
    id: 'payangan', lat: -8.4083, lng: 115.2350,
    category: 'village', region: 'Ubud', priceFromUbud: 50, driveMinFromUbud: 22, published: true,
    translations: {
      en: { name: 'Payangan (scenic eco-resort area, north of Ubud)' },
      es: { name: 'Payangan (zona eco-resort escénica, norte de Ubud)' },
      id: { name: 'Payangan (kawasan eco-resort, utara Ubud)' },
      ru: { name: 'Паянган (к северу от Убуда)' },
    },
  },
  {
    id: 'tampaksiring', lat: -8.4003, lng: 115.3147,
    category: 'village', region: 'Ubud', priceFromUbud: 50, driveMinFromUbud: 20, published: true,
    translations: {
      en: { name: 'Tampaksiring (presidential palace & Tirta Empul area)' },
      es: { name: 'Tampaksiring (palacio presidencial y zona Tirta Empul)' },
      id: { name: 'Tampaksiring (istana presiden & area Tirta Empul)' },
      ru: { name: 'Тампаксиринг (президентский дворец)' },
    },
  },

  // ─── TABANAN AREA TOWNS ───────────────────────────────────────────────────
  {
    id: 'tabanan', lat: -8.5408, lng: 115.1247,
    category: 'village', region: 'Tabanan', priceFromUbud: 60, driveMinFromUbud: 40, published: true,
    translations: {
      en: { name: 'Tabanan Town (gateway to Jatiluwih & Batukaru)' },
      es: { name: 'Ciudad de Tabanan (puerta a Jatiluwih y Batukaru)' },
      id: { name: 'Kota Tabanan (gerbang menuju Jatiluwih & Batukaru)' },
      ru: { name: 'Табанан (ворота к Джатилувих)' },
    },
  },
  {
    id: 'mengwi-town', lat: -8.5433, lng: 115.0847,
    category: 'village', region: 'Badung', priceFromUbud: 60, driveMinFromUbud: 50, published: true,
    translations: {
      en: { name: 'Mengwi Town (Pura Taman Ayun area)' },
      es: { name: 'Pueblo de Mengwi (zona Pura Taman Ayun)' },
      id: { name: 'Desa Mengwi (area Pura Taman Ayun)' },
      ru: { name: 'Менгви (у Пура Таман Аюн)' },
    },
  },
  {
    id: 'kerambitan', lat: -8.5544, lng: 115.0811,
    category: 'village', region: 'Tabanan', priceFromUbud: 68, driveMinFromUbud: 55, published: true,
    translations: {
      en: { name: 'Kerambitan (Puri Anyar royal palace & traditional dances)' },
      es: { name: 'Kerambitan (Palacio Real Puri Anyar y danzas tradicionales)' },
      id: { name: 'Kerambitan (Puri Anyar & tari tradisional)' },
      ru: { name: 'Керамбитан (королевский дворец)' },
    },
  },
  {
    id: 'penebel', lat: -8.3956, lng: 115.1100,
    category: 'village', region: 'Tabanan', priceFromUbud: 68, driveMinFromUbud: 55, published: true,
    translations: {
      en: { name: 'Penebel (scenic highlands, Yeh Panas hot springs area)' },
      es: { name: 'Penebel (tierras altas escénicas, zona Yeh Panas)' },
      id: { name: 'Penebel (pegunungan indah, area Yeh Panas)' },
      ru: { name: 'Пенебел (горное нагорье)' },
    },
  },

  // ─── BADUNG AREA TOWNS ───────────────────────────────────────────────────
  {
    id: 'legian', lat: -8.7067, lng: 115.1650,
    category: 'village', region: 'South Bali', priceFromUbud: 65, driveMinFromUbud: 68, published: true,
    translations: {
      en: { name: 'Legian (beach town between Kuta and Seminyak)' },
      es: { name: 'Legian (pueblo de playa entre Kuta y Seminyak)' },
      id: { name: 'Legian (kota pantai antara Kuta dan Seminyak)' },
      ru: { name: 'Легиан (между Кутой и Семиньяком)' },
    },
  },
  {
    id: 'kerobokan', lat: -8.6653, lng: 115.1675,
    category: 'village', region: 'South Bali', priceFromUbud: 65, driveMinFromUbud: 65, published: true,
    translations: {
      en: { name: 'Kerobokan (trendy area between Seminyak and Canggu)' },
      es: { name: 'Kerobokan (zona de moda entre Seminyak y Canggu)' },
      id: { name: 'Kerobokan (kawasan trendi antara Seminyak dan Canggu)' },
      ru: { name: 'Кероботан (между Семиньяком и Чангу)' },
    },
  },
  {
    id: 'kedonganan', lat: -8.7478, lng: 115.1667,
    category: 'market', region: 'South Bali', priceFromUbud: 65, driveMinFromUbud: 70, published: true,
    translations: {
      en: { name: 'Kedonganan Fish Market (fresh seafood near airport)' },
      es: { name: 'Mercado de Pescado Kedonganan (mariscos frescos)' },
      id: { name: 'Pasar Ikan Kedonganan (seafood segar dekat bandara)' },
      ru: { name: 'Рыбный рынок Кедонганан' },
    },
  },

  // ─── BANGLI AREA TOWNS ───────────────────────────────────────────────────
  {
    id: 'bangli-town', lat: -8.4567, lng: 115.3564,
    category: 'village', region: 'Bangli', priceFromUbud: 55, driveMinFromUbud: 28, published: true,
    translations: {
      en: { name: 'Bangli Town (regency capital, gateway to Kintamani)' },
      es: { name: 'Ciudad de Bangli (capital del distrito, puerta a Kintamani)' },
      id: { name: 'Kota Bangli (ibu kota kabupaten, gerbang Kintamani)' },
      ru: { name: 'Банgli (город, ворота в Кинтамани)' },
    },
  },

  // ─── KLUNGKUNG / EAST TOWNS ──────────────────────────────────────────────
  {
    id: 'rendang', lat: -8.4667, lng: 115.4333,
    category: 'village', region: 'Karangasem', priceFromUbud: 70, driveMinFromUbud: 65, published: true,
    translations: {
      en: { name: 'Rendang (scenic mountain road between Besakih & Sidemen)' },
      es: { name: 'Rendang (carretera de montaña entre Besakih y Sidemen)' },
      id: { name: 'Rendang (jalan pegunungan indah antara Besakih & Sidemen)' },
      ru: { name: 'Рендан (горная дорога)' },
    },
  },
  {
    id: 'selat', lat: -8.4333, lng: 115.4500,
    category: 'village', region: 'Karangasem', priceFromUbud: 72, driveMinFromUbud: 68, published: true,
    translations: {
      en: { name: 'Selat (traditional village with Agung views)' },
      es: { name: 'Selat (pueblo tradicional con vistas al Agung)' },
      id: { name: 'Selat (desa tradisional dengan pemandangan Agung)' },
      ru: { name: 'Селат (деревня с видом на Агунг)' },
    },
  },
  {
    id: 'manggis', lat: -8.5344, lng: 115.5308,
    category: 'village', region: 'Karangasem', priceFromUbud: 80, driveMinFromUbud: 85, published: true,
    translations: {
      en: { name: 'Manggis (east coast town, resort area near Candidasa)' },
      es: { name: 'Manggis (pueblo de la costa este, zona de resorts)' },
      id: { name: 'Manggis (kota pesisir timur, kawasan resort dekat Candidasa)' },
      ru: { name: 'Мангис (восточное побережье)' },
    },
  },
  {
    id: 'dawan', lat: -8.5600, lng: 115.4150,
    category: 'village', region: 'Klungkung', priceFromUbud: 68, driveMinFromUbud: 70, published: true,
    translations: {
      en: { name: 'Dawan (Klungkung area, rice fields & traditional life)' },
      es: { name: 'Dawan (zona Klungkung, arrozales y vida tradicional)' },
      id: { name: 'Dawan (area Klungkung, sawah & kehidupan tradisional)' },
      ru: { name: 'Даван (рисовые поля Клунгкунг)' },
    },
  },
  {
    id: 'abang', lat: -8.3167, lng: 115.6167,
    category: 'village', region: 'Karangasem', priceFromUbud: 115, driveMinFromUbud: 130, published: true,
    translations: {
      en: { name: 'Abang (village on the route to Amed & Tulamben)' },
      es: { name: 'Abang (pueblo en la ruta a Amed y Tulamben)' },
      id: { name: 'Abang (desa di jalur menuju Amed & Tulamben)' },
      ru: { name: 'Абанг (по дороге в Амед)' },
    },
  },

  // ─── NORTH BALI TOWNS ────────────────────────────────────────────────────
  {
    id: 'seririt', lat: -8.1786, lng: 115.0003,
    category: 'village', region: 'North Bali', priceFromUbud: 95, driveMinFromUbud: 110, published: true,
    translations: {
      en: { name: 'Seririt (north coast town, gateway to west)' },
      es: { name: 'Seririt (pueblo de la costa norte, puerta al oeste)' },
      id: { name: 'Seririt (kota pantai utara, gerbang ke barat)' },
      ru: { name: 'Серирит (северное побережье)' },
    },
  },
  {
    id: 'tejakula', lat: -8.1008, lng: 115.3167,
    category: 'village', region: 'North Bali', priceFromUbud: 100, driveMinFromUbud: 115, published: true,
    translations: {
      en: { name: 'Tejakula (northeast coast, heritage village & diving)' },
      es: { name: 'Tejakula (costa noreste, pueblo patrimonial y buceo)' },
      id: { name: 'Tejakula (pesisir timur laut, desa warisan & diving)' },
      ru: { name: 'Теджакула (северо-восток, дайвинг)' },
    },
  },

  // ─── WEST BALI TOWNS ─────────────────────────────────────────────────────
  {
    id: 'negara', lat: -8.3614, lng: 114.6253,
    category: 'village', region: 'West Bali', priceFromUbud: 115, driveMinFromUbud: 130, published: true,
    translations: {
      en: { name: 'Negara (westernmost city in Bali, Jembrana capital)' },
      es: { name: 'Negara (ciudad más occidental de Bali, capital de Jembrana)' },
      id: { name: 'Negara (kota paling barat Bali, ibu kota Jembrana)' },
      ru: { name: 'Негара (самый западный город Бали)' },
    },
  },
  {
    id: 'gilimanuk', lat: -8.1667, lng: 114.4333,
    category: 'village', region: 'West Bali', priceFromUbud: 150, driveMinFromUbud: 165, published: true,
    translations: {
      en: { name: 'Gilimanuk (ferry port to Java, westernmost tip of Bali)' },
      es: { name: 'Gilimanuk (puerto de ferry a Java, extremo occidental de Bali)' },
      id: { name: 'Gilimanuk (pelabuhan feri ke Jawa, ujung barat Bali)' },
      ru: { name: 'Гиляманук (паром на Яву)' },
    },
  },
  {
    id: 'pekutatan', lat: -8.4250, lng: 114.9528,
    category: 'village', region: 'West Bali', priceFromUbud: 98, driveMinFromUbud: 118, published: true,
    translations: {
      en: { name: 'Pekutatan (scenic west coast road, surf area)' },
      es: { name: 'Pekutatan (carretera costera del oeste, zona de surf)' },
      id: { name: 'Pekutatan (jalur pantai barat, area surfing)' },
      ru: { name: 'Пекутатан (западное побережье)' },
    },
  },
]

// ─── HELPERS ────────────────────────────────────────────────────────────────
const ROAD_FACTOR = 1.45

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const toRad = (x: number) => (x * Math.PI) / 180
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
  const base  = 45
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

export function buildWhatsAppMessage(waypoints: Destination[], lang: Lang): string {
  if (waypoints.length < 2) return 'https://wa.me/'
  const ml: MsgLang = (lang === 'es' || lang === 'id' || lang === 'ru') ? lang : 'en'
  const greet  = GREET[ml]
  const footer = FOOTER[ml]
  const lines: string[] = [greet]
  waypoints.forEach((dest, i) => {
    const name = dest.translations[lang as keyof typeof dest.translations]?.name ?? dest.translations.en.name
    lines.push(`📍 ${name}`)
    if (i < waypoints.length - 1) {
      const km = roadKm(dest, waypoints[i + 1])
      lines.push(`  ↓ ~${km} km`)
    }
  })
  const totalKm = waypoints.slice(1).reduce((sum, dest, i) => sum + roadKm(waypoints[i], dest), 0)
  lines.push(footer(totalKm, formatTime(totalKm), estimatePrice(totalKm)))
  return `https://wa.me/?text=${encodeURIComponent(lines.join('\n'))}`
}
