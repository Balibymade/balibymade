/**
 * Seed de los manuales internos (Keystone Guide + Style Guide, EN/ID).
 * No forman parte del contenido público de la web — son documentación para quien
 * gestione balibymade.com día a día desde el admin de Keystone.
 *
 * Ejecutar: npm run seed:manuals
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type Node = Record<string, unknown>

const h1 = (text: string): Node => ({ type: 'heading', level: 1, children: [{ text }] })
const h2 = (text: string): Node => ({ type: 'heading', level: 2, children: [{ text }] })
const p = (text: string): Node => ({ type: 'paragraph', children: [{ text }] })
const pBold = (boldText: string, rest: string): Node => ({
  type: 'paragraph',
  children: [{ text: boldText, bold: true }, { text: rest }],
})
const divider = (): Node => ({ type: 'divider', children: [{ text: '' }] })
const bullets = (items: string[]): Node => ({
  type: 'unordered-list',
  children: items.map(text => ({
    type: 'list-item',
    children: [{ type: 'list-item-content', children: [{ text }] }],
  })),
})
const numbered = (items: string[]): Node => ({
  type: 'ordered-list',
  children: items.map(text => ({
    type: 'list-item',
    children: [{ type: 'list-item-content', children: [{ text }] }],
  })),
})

// ── KEYSTONE GUIDE — ENGLISH ─────────────────────────────────────────────────
const keystoneGuideEn: Node[] = [
  h1('Keystone User Guide'),
  p('This is the place where you change everything on the Bali By Made website: texts, prices, photos, routes, languages. Think of it like the "control room" of the site.'),
  p('This guide explains everything step by step, in the simplest way possible.'),

  h2('1. How to log in'),
  p('Open the admin website (the link your developer gave you). Type your email and password. Click "Sign in". That\'s it — you are now inside Keystone.'),

  h2('2. The menu on the left'),
  p('On the left side of the screen you see a list of names, like "Destinations", "Routes", "Site settings", "Manuals & Guides". Each of these is called a "list".'),
  p('Each list is a drawer full of similar things. For example:'),
  bullets([
    '"Destinations" — every place tourists can visit (temples, waterfalls, beaches...)',
    '"Routes" — the 10 ready-made trips shown on the Experiences page',
    '"Site settings" — the WhatsApp number, Instagram, contact email',
    '"Manuals & Guides" — this guide and the brand style guide (the document you are reading right now)',
  ]),
  p('Click on any name to open that drawer and see everything inside it.'),

  h2('3. Opening and changing something'),
  p('Inside a list, you will see a table with rows. Each row is one item (for example, one destination). Click anywhere on a row to open it.'),
  p('Once it is open, you will see boxes with text, numbers or checkboxes. Click inside any box and type to change it.'),
  pBold('Important: ', 'when you finish, you must press the "Save Changes" or "Update item" button at the bottom or top of the page. If you don\'t press it, your changes are lost.'),

  h2('4. The "Published" checkbox'),
  p('Most items have a checkbox called "Published".'),
  bullets([
    'Checked (✓) = visible on the real website, anyone can see it',
    'Unchecked = hidden, nobody can see it on the website (useful while you are still preparing something)',
  ]),
  p('If you add something new and it does not appear on the website, check first if "Published" is ticked.'),

  h2('5. Languages and translations'),
  p('The website exists in 22 languages. Almost every list has a matching list ending in "· Translations" — for example "Destinations" has "Destinations · Translations".'),
  p('The main list (e.g. "Destinations") holds things that are the same in every language: GPS coordinates, price, photo. The "· Translations" list holds the text that changes per language: the name, in each of the 22 languages.'),
  p('Inside a "· Translations" list, each row now shows both the language code AND the text, for example "en — Tegallalang", so you can find the right one easily without opening it blindly.'),
  p('To translate something: open the main item (e.g. one Destination), scroll to "Translations", click on the language you want to edit (e.g. "en — Tegallalang"), change the text, and save.'),

  h2('6. Adding a brand new Destination (step by step)'),
  numbered([
    'Click "Destinations" in the left menu.',
    'Click the "+ Create Destination" button.',
    'Fill in: slug (a short code with no spaces, e.g. "rice-terrace-jatiluwih"), category, GPS latitude/longitude, region, price from Ubud, drive time.',
    'Tick "Published" when you are ready for it to appear on the website.',
    'Click "Create Destination" to save.',
    'A set of empty translations is created automatically for all 22 languages — open "Translations" and fill in the name for at least English ("en"); the other languages will show the English text until someone translates them.',
  ]),

  h2('7. Adding images'),
  p('Some items have an image field (for example Routes, the Home page, the About page). Click the image box, choose a photo from your computer, and it uploads automatically. Then save the page.'),

  h2('8. If something looks wrong'),
  p('Before worrying, check:'),
  bullets([
    'Is "Published" ticked?',
    'Did you click "Save Changes" / "Update item" after editing?',
    'Are you editing the right language under "Translations"?',
  ]),
  p('If it still looks wrong, contact your developer (Pablo) with a screenshot — it is much faster to fix that way.'),

  divider(),
  p('This guide and the brand Style Guide live together inside "Manuals & Guides", in English and in Bahasa Indonesia.'),
]

// ── KEYSTONE GUIDE — BAHASA INDONESIA ────────────────────────────────────────
const keystoneGuideId: Node[] = [
  h1('Panduan Pengguna Keystone'),
  p('Di sinilah Anda mengubah semua hal di website Bali By Made: teks, harga, foto, rute, bahasa. Anggap saja ini seperti "ruang kontrol" website.'),
  p('Panduan ini menjelaskan semuanya langkah demi langkah, dengan cara paling sederhana.'),

  h2('1. Cara masuk (login)'),
  p('Buka website admin (link yang diberikan developer Anda). Ketik email dan password Anda. Klik "Sign in". Selesai — Anda sekarang sudah masuk ke Keystone.'),

  h2('2. Menu di sebelah kiri'),
  p('Di sisi kiri layar, Anda akan melihat daftar nama seperti "Destinations", "Routes", "Site settings", "Manuals & Guides". Masing-masing disebut "list" (daftar).'),
  p('Setiap list adalah laci berisi hal-hal sejenis. Contohnya:'),
  bullets([
    '"Destinations" — setiap tempat yang bisa dikunjungi wisatawan (candi, air terjun, pantai...)',
    '"Routes" — 10 perjalanan siap pakai yang muncul di halaman Experiences',
    '"Site settings" — nomor WhatsApp, Instagram, email kontak',
    '"Manuals & Guides" — panduan ini dan panduan gaya merek (dokumen yang sedang Anda baca)',
  ]),
  p('Klik nama apa pun untuk membuka laci itu dan melihat semua isinya.'),

  h2('3. Membuka dan mengubah sesuatu'),
  p('Di dalam sebuah list, Anda akan melihat tabel berisi baris-baris. Setiap baris adalah satu item (misalnya, satu destinasi). Klik di mana saja pada baris itu untuk membukanya.'),
  p('Setelah terbuka, Anda akan melihat kotak berisi teks, angka, atau kotak centang. Klik di dalam kotak mana pun dan ketik untuk mengubahnya.'),
  pBold('Penting: ', 'setelah selesai, Anda harus menekan tombol "Save Changes" atau "Update item" di bagian bawah atau atas halaman. Jika tidak ditekan, perubahan Anda akan hilang.'),

  h2('4. Kotak centang "Published"'),
  p('Sebagian besar item memiliki kotak centang bernama "Published".'),
  bullets([
    'Tercentang (✓) = terlihat di website asli, semua orang bisa melihatnya',
    'Tidak tercentang = tersembunyi, tidak ada yang bisa melihatnya di website (berguna saat Anda masih menyiapkan sesuatu)',
  ]),
  p('Jika Anda menambahkan sesuatu yang baru dan tidak muncul di website, periksa dulu apakah "Published" sudah tercentang.'),

  h2('5. Bahasa dan terjemahan'),
  p('Website ini tersedia dalam 22 bahasa. Hampir setiap list memiliki list pasangan yang diakhiri dengan "· Translations" — misalnya "Destinations" memiliki "Destinations · Translations".'),
  p('List utama (misalnya "Destinations") menyimpan hal-hal yang sama di semua bahasa: koordinat GPS, harga, foto. List "· Translations" menyimpan teks yang berubah per bahasa: nama tempat, dalam masing-masing dari 22 bahasa.'),
  p('Di dalam list "· Translations", setiap baris sekarang menampilkan kode bahasa DAN teksnya, misalnya "en — Tegallalang", sehingga Anda bisa menemukan baris yang tepat tanpa harus membukanya dulu.'),
  p('Untuk menerjemahkan sesuatu: buka item utama (misalnya satu Destination), gulir ke "Translations", klik bahasa yang ingin Anda edit (misalnya "en — Tegallalang"), ubah teksnya, lalu simpan.'),

  h2('6. Menambahkan Destinasi baru (langkah demi langkah)'),
  numbered([
    'Klik "Destinations" di menu kiri.',
    'Klik tombol "+ Create Destination".',
    'Isi: slug (kode singkat tanpa spasi, misalnya "rice-terrace-jatiluwih"), category, GPS latitude/longitude, region, harga dari Ubud, waktu tempuh.',
    'Centang "Published" saat Anda siap menampilkannya di website.',
    'Klik "Create Destination" untuk menyimpan.',
    'Terjemahan kosong otomatis dibuat untuk semua 22 bahasa — buka "Translations" dan isi nama untuk setidaknya bahasa Inggris ("en"); bahasa lain akan menampilkan teks Inggris sampai ada yang menerjemahkannya.',
  ]),

  h2('7. Menambahkan foto'),
  p('Beberapa item memiliki kolom foto (misalnya Routes, halaman Home, halaman About). Klik kotak foto, pilih foto dari komputer Anda, dan foto akan otomatis terunggah. Lalu simpan halamannya.'),

  h2('8. Jika ada yang terlihat salah'),
  p('Sebelum khawatir, periksa dulu:'),
  bullets([
    'Apakah "Published" sudah tercentang?',
    'Apakah Anda sudah klik "Save Changes" / "Update item" setelah mengedit?',
    'Apakah Anda mengedit bahasa yang benar di bawah "Translations"?',
  ]),
  p('Jika masih terlihat salah, hubungi developer Anda (Pablo) dengan tangkapan layar — cara ini jauh lebih cepat untuk memperbaikinya.'),

  divider(),
  p('Panduan ini dan Style Guide merek tersedia bersama di dalam "Manuals & Guides", dalam bahasa Inggris dan Bahasa Indonesia.'),
]

// ── STYLE GUIDE — ENGLISH ─────────────────────────────────────────────────────
const styleGuideEn: Node[] = [
  h1('Bali By Made — Brand Style Guide'),
  p('This page explains how the Bali By Made brand should look and sound, so that anything new added to the website still feels like it belongs.'),

  h2('1. Who is Made?'),
  p('Made is a private local guide in Bali. The whole brand is built around one simple feeling: a real local friend showing you the real Bali, not a tourist agency.'),

  h2('2. Logo'),
  p('The logo is simply the brand name split in two lines:'),
  bullets([
    'Top, small line: "BALI BY"',
    'Bottom, big line: "MADE"',
  ]),
  p('Never change the order, never write it all on one line, never use another font for it.'),

  h2('3. Colors'),
  bullets([
    'Dark forest green #0d1a11 — main background color, feels like the jungle at night',
    'Gold #c9a84c — accents, buttons hover, important small details (used carefully, never as a big background)',
    'Cream #f2ecd8 — main text color over dark backgrounds',
    'Terracotta #b85738 — call-to-action buttons (WhatsApp, "Book now")',
  ]),
  p('Always use these exact colors. Do not introduce new colors without checking with the developer.'),

  h2('4. Fonts'),
  bullets([
    'Cormorant Garamond — used only for big titles and headlines. It is an elegant, slightly old-fashioned serif font.',
    'DM Sans — used for everything else: body text, buttons, menus. Clean and easy to read.',
  ]),

  h2('5. Tone of voice'),
  p('Made speaks like a real person, not like a company.'),
  bullets([
    'Warm and personal — as if writing to a friend who is visiting',
    'Simple words — avoid touristic clichés and corporate language ("unparalleled experience", "world-class service")',
    'Confident but humble — Made knows Bali very well, but never brags',
  ]),
  pBold('Example (good): ', '"I\'ll pick you up early so we beat the crowds at Tegallalang."'),
  pBold('Example (avoid): ', '"Experience an unforgettable journey through breathtaking landscapes."'),

  h2('6. Photography'),
  bullets([
    'Real photos of real places in Bali, natural daylight whenever possible',
    'Avoid generic stock photos that could be from anywhere in the world',
    'Prefer photos that include a sense of scale (a road, a car, a person) over empty postcard shots',
  ]),

  h2('7. Quick do\'s and don\'ts'),
  bullets([
    'Do keep the logo, colors and fonts exactly as described here',
    'Do write in a warm, simple, personal voice',
    'Don\'t use stock-photo language or overly formal English',
    'Don\'t introduce new colors or fonts without checking first',
  ]),
]

// ── STYLE GUIDE — BAHASA INDONESIA ───────────────────────────────────────────
const styleGuideId: Node[] = [
  h1('Bali By Made — Panduan Gaya Merek'),
  p('Halaman ini menjelaskan bagaimana merek Bali By Made seharusnya terlihat dan terdengar, sehingga apa pun yang baru ditambahkan ke website tetap terasa cocok.'),

  h2('1. Siapa Made?'),
  p('Made adalah pemandu lokal pribadi di Bali. Seluruh merek ini dibangun di atas satu perasaan sederhana: seorang teman lokal asli yang menunjukkan Bali yang sesungguhnya, bukan agen wisata.'),

  h2('2. Logo'),
  p('Logo ini hanyalah nama merek yang dibagi menjadi dua baris:'),
  bullets([
    'Baris atas, kecil: "BALI BY"',
    'Baris bawah, besar: "MADE"',
  ]),
  p('Jangan pernah mengubah urutannya, jangan pernah menulisnya dalam satu baris, jangan pernah menggunakan font lain untuk logo ini.'),

  h2('3. Warna'),
  bullets([
    'Hijau hutan gelap #0d1a11 — warna latar utama, terasa seperti hutan di malam hari',
    'Emas #c9a84c — aksen, efek hover tombol, detail kecil yang penting (dipakai hati-hati, jangan pernah sebagai latar besar)',
    'Krem #f2ecd8 — warna teks utama di atas latar gelap',
    'Terracotta #b85738 — tombol aksi (WhatsApp, "Book now")',
  ]),
  p('Selalu gunakan warna-warna ini secara tepat. Jangan menambahkan warna baru tanpa memeriksa dengan developer.'),

  h2('4. Font'),
  bullets([
    'Cormorant Garamond — hanya digunakan untuk judul besar dan headline. Font serif yang elegan dan sedikit klasik.',
    'DM Sans — digunakan untuk semua yang lain: teks isi, tombol, menu. Bersih dan mudah dibaca.',
  ]),

  h2('5. Gaya bahasa (tone of voice)'),
  p('Made berbicara seperti orang sungguhan, bukan seperti perusahaan.'),
  bullets([
    'Hangat dan personal — seolah menulis untuk teman yang sedang berkunjung',
    'Kata-kata sederhana — hindari klise wisata dan bahasa korporat ("pengalaman tak tertandingi", "layanan kelas dunia")',
    'Percaya diri tapi rendah hati — Made sangat mengenal Bali, tapi tidak pernah menyombongkan diri',
  ]),
  pBold('Contoh (baik): ', '"Saya akan menjemput Anda lebih pagi agar kita tidak terjebak keramaian di Tegallalang."'),
  pBold('Contoh (hindari): ', '"Rasakan perjalanan tak terlupakan melalui pemandangan yang menakjubkan."'),

  h2('6. Fotografi'),
  bullets([
    'Foto asli dari tempat asli di Bali, cahaya alami sebisa mungkin',
    'Hindari foto stok generik yang bisa berasal dari mana saja di dunia',
    'Lebih baik foto yang menunjukkan skala (jalan, mobil, orang) daripada foto kartu pos yang kosong',
  ]),

  h2('7. Yang boleh dan tidak boleh'),
  bullets([
    'Pertahankan logo, warna, dan font persis seperti yang dijelaskan di sini',
    'Tulis dengan gaya yang hangat, sederhana, dan personal',
    'Jangan gunakan bahasa ala foto stok atau bahasa Inggris/Indonesia yang terlalu formal',
    'Jangan menambahkan warna atau font baru tanpa memeriksa dulu',
  ]),
]

// ── UMAMI GUIDE — ENGLISH ─────────────────────────────────────────────────────
const umamiGuideEn: Node[] = [
  h1('Umami Guide — Visitor Statistics'),
  p('Umami is a small, separate website that tells you how many people are visiting balibymade.com, where they come from, and which pages they like the most. It does not show names or personal details — it respects everyone\'s privacy.'),
  p('Think of it like a counter at the door of a shop, but for a website.'),

  h2('1. How to log in'),
  p('Open this address: https://analytics.balibymade.com'),
  p('Type your email and password. Click "Login".'),

  h2('2. What you see first'),
  p('After logging in, click on the website called "Bali By Made". You will see a page full of numbers and a graph — this is the "dashboard".'),

  h2('3. The 4 numbers at the top'),
  bullets([
    '"Visitors" — how many different people visited the website',
    '"Views" — how many pages were opened in total (one person can open several pages)',
    '"Bounce rate" — how many people left after seeing only one page (a high number can mean a page is not interesting enough)',
    '"Visit duration" — on average, how long people stay on the website',
  ]),

  h2('4. Choosing a date range'),
  p('At the top right of the page there is a button (often showing "Last 24 hours" or similar). Click it to choose a different period: today, this week, this month, or a custom range.'),

  h2('5. Where people come from and what they use'),
  p('Scroll down on the dashboard. You will find:'),
  bullets([
    '"Pages" — the most visited pages of the website (this tells you what people care about the most)',
    '"Referrers" — where people came from before reaching the site (Google, Instagram, a direct link, etc.)',
    '"Countries" — which countries the visitors are from',
    '"Devices" — whether people use a phone, a tablet or a computer',
  ]),

  h2('6. Why this is useful'),
  p('You don\'t need to check this every day. Once in a while, it can help you understand things like:'),
  bullets([
    'Which page people like the most (maybe the "Experiences" page, or the Route Builder)',
    'Whether more people visit from phones or computers',
    'Whether visitors come mostly from Instagram, Google, or somewhere else',
  ]),
  p('If a number looks strange or you are not sure what it means, just ask your developer — there is no need to worry about it on your own.'),
]

// ── UMAMI GUIDE — BAHASA INDONESIA ───────────────────────────────────────────
const umamiGuideId: Node[] = [
  h1('Panduan Umami — Statistik Pengunjung'),
  p('Umami adalah website kecil terpisah yang memberi tahu Anda berapa banyak orang yang mengunjungi balibymade.com, dari mana mereka berasal, dan halaman mana yang paling mereka sukai. Umami tidak menampilkan nama atau data pribadi — ia menghormati privasi semua orang.'),
  p('Anggap saja seperti penghitung pengunjung di pintu sebuah toko, tapi untuk website.'),

  h2('1. Cara masuk (login)'),
  p('Buka alamat ini: https://analytics.balibymade.com'),
  p('Ketik email dan password Anda. Klik "Login".'),

  h2('2. Apa yang pertama kali Anda lihat'),
  p('Setelah masuk, klik website bernama "Bali By Made". Anda akan melihat halaman penuh angka dan grafik — ini disebut "dashboard".'),

  h2('3. 4 angka di bagian atas'),
  bullets([
    '"Visitors" — berapa banyak orang berbeda yang mengunjungi website',
    '"Views" — berapa banyak halaman yang dibuka secara total (satu orang bisa membuka beberapa halaman)',
    '"Bounce rate" — berapa banyak orang yang pergi setelah hanya melihat satu halaman (angka tinggi bisa berarti halaman tersebut kurang menarik)',
    '"Visit duration" — rata-rata berapa lama orang bertahan di website',
  ]),

  h2('4. Memilih rentang tanggal'),
  p('Di kanan atas halaman ada tombol (biasanya menunjukkan "Last 24 hours" atau serupa). Klik tombol itu untuk memilih periode lain: hari ini, minggu ini, bulan ini, atau rentang khusus.'),

  h2('5. Dari mana orang berasal dan apa yang mereka gunakan'),
  p('Gulir ke bawah pada dashboard. Anda akan menemukan:'),
  bullets([
    '"Pages" — halaman yang paling sering dikunjungi (ini menunjukkan apa yang paling diminati orang)',
    '"Referrers" — dari mana orang datang sebelum mencapai website (Google, Instagram, link langsung, dll.)',
    '"Countries" — dari negara mana para pengunjung berasal',
    '"Devices" — apakah orang menggunakan ponsel, tablet, atau komputer',
  ]),

  h2('6. Mengapa ini berguna'),
  p('Anda tidak perlu memeriksa ini setiap hari. Sesekali, ini bisa membantu Anda memahami hal-hal seperti:'),
  bullets([
    'Halaman mana yang paling disukai orang (mungkin halaman "Experiences", atau Route Builder)',
    'Apakah lebih banyak orang mengunjungi dari ponsel atau komputer',
    'Apakah pengunjung sebagian besar datang dari Instagram, Google, atau tempat lain',
  ]),
  p('Jika ada angka yang terlihat aneh atau Anda tidak yakin artinya, tanyakan saja kepada developer Anda — tidak perlu khawatir memikirkannya sendiri.'),
]

async function upsertManual(title: string, category: string, language: string, order: number, content: Node[]) {
  const existing = await prisma.manual.findFirst({ where: { title } })
  if (existing) {
    await prisma.manual.update({ where: { id: existing.id }, data: { category, language, order, content } })
  } else {
    await prisma.manual.create({ data: { title, category, language, order, content } })
  }
}

async function main() {
  console.log('🌱 Seed de Manuals & Guides...')
  await upsertManual('Keystone User Guide (English)', 'keystone-guide', 'en', 0, keystoneGuideEn)
  await upsertManual('Keystone User Guide (Bahasa Indonesia)', 'keystone-guide', 'id', 1, keystoneGuideId)
  await upsertManual('Bali By Made — Brand Style Guide (English)', 'style-guide', 'en', 2, styleGuideEn)
  await upsertManual('Bali By Made — Panduan Gaya Merek (Bahasa Indonesia)', 'style-guide', 'id', 3, styleGuideId)
  await upsertManual('Umami Guide — Visitor Statistics (English)', 'umami-guide', 'en', 4, umamiGuideEn)
  await upsertManual('Panduan Umami — Statistik Pengunjung (Bahasa Indonesia)', 'umami-guide', 'id', 5, umamiGuideId)
  console.log('✅ Manuals seed completado.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
