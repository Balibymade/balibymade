// Textos de cookies/privacidad — viven en el frontend (no en Keystone) a propósito:
// son texto legal/técnico que no debe editar el cliente por error. Mismo criterio que
// el diccionario del placeholder y la lógica del Route Builder.
//
// Banner de cookies: los 22 locales. Política de privacidad: en/es/id/ru con fallback
// a inglés (mismo estado que el resto del contenido del sitio, ver blueprint 28.4).

export interface CookieStrings {
  bannerDescription: string
  accept: string
  decline: string
  configure: string
  modalTitle: string
  modalDescription: string
  save: string
  necessaryTitle: string
  necessaryDescription: string
  analyticsTitle: string
  analyticsDescription: string
  mandatoryTag: string
  enabledTag: string
  disabledTag: string
  privacyLabel: string      // label del link del footer y título de la página
  consentLabel: string      // checkbox del formulario de contacto (antes del link)
  consentLinkText: string   // texto del link dentro del checkbox
}

const EN: CookieStrings = {
  bannerDescription: 'We use one cookie to remember your privacy choice, and anonymous visit statistics only if you allow them.',
  accept: 'Accept', decline: 'Decline', configure: 'Settings',
  modalTitle: 'Privacy settings', modalDescription: 'Choose what you allow on this site.',
  save: 'Save',
  necessaryTitle: 'Necessary', necessaryDescription: 'Remembers your privacy choice. Always on.',
  analyticsTitle: 'Visit statistics', analyticsDescription: 'Anonymous, cookie-free statistics (self-hosted) that help us see which pages are useful. Nothing is shared or sold.',
  mandatoryTag: 'Always on', enabledTag: 'Enabled', disabledTag: 'Disabled',
  privacyLabel: 'Privacy Policy',
  consentLabel: 'I have read and accept the', consentLinkText: 'Privacy Policy',
}

export const COOKIE_STRINGS: Record<string, CookieStrings> = {
  en: EN,
  hi: {
    bannerDescription: 'हम आपकी गोपनीयता पसंद याद रखने के लिए एक कुकी का उपयोग करते हैं, और आपकी अनुमति से ही गुमनाम विज़िट आँकड़े।',
    accept: 'स्वीकार करें', decline: 'अस्वीकार करें', configure: 'सेटिंग्स',
    modalTitle: 'गोपनीयता सेटिंग्स', modalDescription: 'चुनें कि आप इस साइट पर क्या अनुमति देते हैं।',
    save: 'सहेजें',
    necessaryTitle: 'आवश्यक', necessaryDescription: 'आपकी गोपनीयता पसंद याद रखता है। हमेशा चालू।',
    analyticsTitle: 'विज़िट आँकड़े', analyticsDescription: 'गुमनाम, कुकी-रहित आँकड़े जो हमें उपयोगी पेज समझने में मदद करते हैं। कुछ भी साझा या बेचा नहीं जाता।',
    mandatoryTag: 'हमेशा चालू', enabledTag: 'चालू', disabledTag: 'बंद',
    privacyLabel: 'गोपनीयता नीति',
    consentLabel: 'मैंने पढ़ लिया है और स्वीकार करता/करती हूँ', consentLinkText: 'गोपनीयता नीति',
  },
  zh: {
    bannerDescription: '我们仅使用一个 Cookie 来记住您的隐私选择；只有在您允许的情况下才收集匿名访问统计。',
    accept: '接受', decline: '拒绝', configure: '设置',
    modalTitle: '隐私设置', modalDescription: '选择您允许本网站执行的操作。',
    save: '保存',
    necessaryTitle: '必要', necessaryDescription: '记住您的隐私选择。始终开启。',
    analyticsTitle: '访问统计', analyticsDescription: '匿名、无 Cookie 的统计（自托管），帮助我们了解哪些页面有用。不会共享或出售任何数据。',
    mandatoryTag: '始终开启', enabledTag: '已启用', disabledTag: '已停用',
    privacyLabel: '隐私政策',
    consentLabel: '我已阅读并接受', consentLinkText: '隐私政策',
  },
  de: {
    bannerDescription: 'Wir verwenden ein Cookie, um Ihre Datenschutz-Wahl zu speichern, und anonyme Besuchsstatistiken nur mit Ihrer Zustimmung.',
    accept: 'Akzeptieren', decline: 'Ablehnen', configure: 'Einstellungen',
    modalTitle: 'Datenschutz-Einstellungen', modalDescription: 'Wählen Sie, was Sie auf dieser Website erlauben.',
    save: 'Speichern',
    necessaryTitle: 'Notwendig', necessaryDescription: 'Speichert Ihre Datenschutz-Wahl. Immer aktiv.',
    analyticsTitle: 'Besuchsstatistiken', analyticsDescription: 'Anonyme, cookielose Statistiken (selbst gehostet), die zeigen, welche Seiten nützlich sind. Nichts wird geteilt oder verkauft.',
    mandatoryTag: 'Immer aktiv', enabledTag: 'Aktiviert', disabledTag: 'Deaktiviert',
    privacyLabel: 'Datenschutzerklärung',
    consentLabel: 'Ich habe die', consentLinkText: 'Datenschutzerklärung gelesen und akzeptiere sie',
  },
  fr: {
    bannerDescription: 'Nous utilisons un cookie pour mémoriser votre choix de confidentialité, et des statistiques de visite anonymes uniquement si vous les autorisez.',
    accept: 'Accepter', decline: 'Refuser', configure: 'Paramètres',
    modalTitle: 'Paramètres de confidentialité', modalDescription: 'Choisissez ce que vous autorisez sur ce site.',
    save: 'Enregistrer',
    necessaryTitle: 'Nécessaire', necessaryDescription: 'Mémorise votre choix de confidentialité. Toujours actif.',
    analyticsTitle: 'Statistiques de visite', analyticsDescription: 'Statistiques anonymes sans cookies (auto-hébergées) pour savoir quelles pages sont utiles. Rien n’est partagé ni vendu.',
    mandatoryTag: 'Toujours actif', enabledTag: 'Activé', disabledTag: 'Désactivé',
    privacyLabel: 'Politique de confidentialité',
    consentLabel: 'J’ai lu et j’accepte la', consentLinkText: 'politique de confidentialité',
  },
  ms: {
    bannerDescription: 'Kami menggunakan satu kuki untuk mengingati pilihan privasi anda, dan statistik lawatan tanpa nama hanya jika anda benarkan.',
    accept: 'Terima', decline: 'Tolak', configure: 'Tetapan',
    modalTitle: 'Tetapan privasi', modalDescription: 'Pilih apa yang anda benarkan di laman ini.',
    save: 'Simpan',
    necessaryTitle: 'Perlu', necessaryDescription: 'Mengingati pilihan privasi anda. Sentiasa aktif.',
    analyticsTitle: 'Statistik lawatan', analyticsDescription: 'Statistik tanpa nama dan tanpa kuki (dihoskan sendiri) untuk memahami halaman yang berguna. Tiada apa yang dikongsi atau dijual.',
    mandatoryTag: 'Sentiasa aktif', enabledTag: 'Aktif', disabledTag: 'Tidak aktif',
    privacyLabel: 'Dasar Privasi',
    consentLabel: 'Saya telah membaca dan menerima', consentLinkText: 'Dasar Privasi',
  },
  nl: {
    bannerDescription: 'We gebruiken één cookie om uw privacykeuze te onthouden, en anonieme bezoekstatistieken alleen als u dat toestaat.',
    accept: 'Accepteren', decline: 'Weigeren', configure: 'Instellingen',
    modalTitle: 'Privacy-instellingen', modalDescription: 'Kies wat u op deze site toestaat.',
    save: 'Opslaan',
    necessaryTitle: 'Noodzakelijk', necessaryDescription: 'Onthoudt uw privacykeuze. Altijd aan.',
    analyticsTitle: 'Bezoekstatistieken', analyticsDescription: 'Anonieme, cookieloze statistieken (zelf gehost) die laten zien welke pagina’s nuttig zijn. Er wordt niets gedeeld of verkocht.',
    mandatoryTag: 'Altijd aan', enabledTag: 'Ingeschakeld', disabledTag: 'Uitgeschakeld',
    privacyLabel: 'Privacybeleid',
    consentLabel: 'Ik heb het', consentLinkText: 'privacybeleid gelezen en ga akkoord',
  },
  ru: {
    bannerDescription: 'Мы используем один cookie, чтобы запомнить ваш выбор конфиденциальности, и анонимную статистику посещений — только с вашего разрешения.',
    accept: 'Принять', decline: 'Отклонить', configure: 'Настройки',
    modalTitle: 'Настройки конфиденциальности', modalDescription: 'Выберите, что вы разрешаете на этом сайте.',
    save: 'Сохранить',
    necessaryTitle: 'Необходимые', necessaryDescription: 'Запоминает ваш выбор. Всегда включено.',
    analyticsTitle: 'Статистика посещений', analyticsDescription: 'Анонимная статистика без cookie (на собственном сервере), чтобы понимать, какие страницы полезны. Ничего не передаётся и не продаётся.',
    mandatoryTag: 'Всегда включено', enabledTag: 'Включено', disabledTag: 'Отключено',
    privacyLabel: 'Политика конфиденциальности',
    consentLabel: 'Я прочитал(а) и принимаю', consentLinkText: 'политику конфиденциальности',
  },
  uk: {
    bannerDescription: 'Ми використовуємо один cookie, щоб запам’ятати ваш вибір конфіденційності, та анонімну статистику відвідувань — лише з вашого дозволу.',
    accept: 'Прийняти', decline: 'Відхилити', configure: 'Налаштування',
    modalTitle: 'Налаштування конфіденційності', modalDescription: 'Оберіть, що ви дозволяєте на цьому сайті.',
    save: 'Зберегти',
    necessaryTitle: 'Необхідні', necessaryDescription: 'Запам’ятовує ваш вибір. Завжди увімкнено.',
    analyticsTitle: 'Статистика відвідувань', analyticsDescription: 'Анонімна статистика без cookie (на власному сервері), щоб розуміти, які сторінки корисні. Нічого не передається і не продається.',
    mandatoryTag: 'Завжди увімкнено', enabledTag: 'Увімкнено', disabledTag: 'Вимкнено',
    privacyLabel: 'Політика конфіденційності',
    consentLabel: 'Я прочитав(ла) та приймаю', consentLinkText: 'політику конфіденційності',
  },
  ja: {
    bannerDescription: 'プライバシー設定を記憶するために Cookie を1つだけ使用します。匿名の訪問統計は、許可された場合のみ収集します。',
    accept: '同意する', decline: '拒否する', configure: '設定',
    modalTitle: 'プライバシー設定', modalDescription: 'このサイトで許可する内容を選択してください。',
    save: '保存',
    necessaryTitle: '必須', necessaryDescription: 'プライバシー設定を記憶します。常に有効。',
    analyticsTitle: '訪問統計', analyticsDescription: 'Cookie を使わない匿名統計（自社ホスト）で、役立つページを把握します。データの共有・販売は一切ありません。',
    mandatoryTag: '常に有効', enabledTag: '有効', disabledTag: '無効',
    privacyLabel: 'プライバシーポリシー',
    consentLabel: '以下を読み、同意します：', consentLinkText: 'プライバシーポリシー',
  },
  ko: {
    bannerDescription: '개인정보 선택을 기억하기 위해 쿠키 1개만 사용하며, 익명 방문 통계는 허용하신 경우에만 수집합니다.',
    accept: '수락', decline: '거부', configure: '설정',
    modalTitle: '개인정보 설정', modalDescription: '이 사이트에서 허용할 항목을 선택하세요.',
    save: '저장',
    necessaryTitle: '필수', necessaryDescription: '개인정보 선택을 기억합니다. 항상 켜짐.',
    analyticsTitle: '방문 통계', analyticsDescription: '쿠키 없는 익명 통계(자체 호스팅)로 유용한 페이지를 파악합니다. 어떤 것도 공유하거나 판매하지 않습니다.',
    mandatoryTag: '항상 켜짐', enabledTag: '켜짐', disabledTag: '꺼짐',
    privacyLabel: '개인정보 처리방침',
    consentLabel: '다음을 읽고 동의합니다:', consentLinkText: '개인정보 처리방침',
  },
  it: {
    bannerDescription: 'Usiamo un solo cookie per ricordare la tua scelta sulla privacy, e statistiche di visita anonime solo se le consenti.',
    accept: 'Accetta', decline: 'Rifiuta', configure: 'Impostazioni',
    modalTitle: 'Impostazioni privacy', modalDescription: 'Scegli cosa consenti su questo sito.',
    save: 'Salva',
    necessaryTitle: 'Necessari', necessaryDescription: 'Ricorda la tua scelta sulla privacy. Sempre attivo.',
    analyticsTitle: 'Statistiche di visita', analyticsDescription: 'Statistiche anonime senza cookie (self-hosted) per capire quali pagine sono utili. Nulla viene condiviso o venduto.',
    mandatoryTag: 'Sempre attivo', enabledTag: 'Attivo', disabledTag: 'Disattivo',
    privacyLabel: 'Informativa sulla privacy',
    consentLabel: 'Ho letto e accetto l’', consentLinkText: 'informativa sulla privacy',
  },
  pt: {
    bannerDescription: 'Usamos um cookie para lembrar a sua escolha de privacidade, e estatísticas de visita anónimas apenas se as permitir.',
    accept: 'Aceitar', decline: 'Recusar', configure: 'Definições',
    modalTitle: 'Definições de privacidade', modalDescription: 'Escolha o que permite neste site.',
    save: 'Guardar',
    necessaryTitle: 'Necessário', necessaryDescription: 'Lembra a sua escolha de privacidade. Sempre ativo.',
    analyticsTitle: 'Estatísticas de visita', analyticsDescription: 'Estatísticas anónimas sem cookies (auto-hospedadas) para perceber que páginas são úteis. Nada é partilhado ou vendido.',
    mandatoryTag: 'Sempre ativo', enabledTag: 'Ativado', disabledTag: 'Desativado',
    privacyLabel: 'Política de Privacidade',
    consentLabel: 'Li e aceito a', consentLinkText: 'Política de Privacidade',
  },
  es: {
    bannerDescription: 'Usamos una única cookie para recordar tu elección de privacidad, y estadísticas de visita anónimas solo si las permites.',
    accept: 'Aceptar', decline: 'Rechazar', configure: 'Ajustes',
    modalTitle: 'Ajustes de privacidad', modalDescription: 'Elige qué permites en este sitio.',
    save: 'Guardar',
    necessaryTitle: 'Necesarias', necessaryDescription: 'Recuerda tu elección de privacidad. Siempre activa.',
    analyticsTitle: 'Estadísticas de visita', analyticsDescription: 'Estadísticas anónimas sin cookies (autoalojadas) para saber qué páginas son útiles. No se comparte ni se vende nada.',
    mandatoryTag: 'Siempre activa', enabledTag: 'Activada', disabledTag: 'Desactivada',
    privacyLabel: 'Política de privacidad',
    consentLabel: 'He leído y acepto la', consentLinkText: 'política de privacidad',
  },
  id: {
    bannerDescription: 'Kami menggunakan satu cookie untuk mengingat pilihan privasi Anda, dan statistik kunjungan anonim hanya jika Anda mengizinkannya.',
    accept: 'Terima', decline: 'Tolak', configure: 'Pengaturan',
    modalTitle: 'Pengaturan privasi', modalDescription: 'Pilih apa yang Anda izinkan di situs ini.',
    save: 'Simpan',
    necessaryTitle: 'Diperlukan', necessaryDescription: 'Mengingat pilihan privasi Anda. Selalu aktif.',
    analyticsTitle: 'Statistik kunjungan', analyticsDescription: 'Statistik anonim tanpa cookie (di-hosting sendiri) untuk memahami halaman mana yang berguna. Tidak ada yang dibagikan atau dijual.',
    mandatoryTag: 'Selalu aktif', enabledTag: 'Aktif', disabledTag: 'Nonaktif',
    privacyLabel: 'Kebijakan Privasi',
    consentLabel: 'Saya telah membaca dan menyetujui', consentLinkText: 'Kebijakan Privasi',
  },
  ar: {
    bannerDescription: 'نستخدم ملف تعريف ارتباط واحدًا لتذكّر خيار الخصوصية الخاص بك، وإحصاءات زيارة مجهولة فقط إذا سمحت بها.',
    accept: 'قبول', decline: 'رفض', configure: 'الإعدادات',
    modalTitle: 'إعدادات الخصوصية', modalDescription: 'اختر ما تسمح به في هذا الموقع.',
    save: 'حفظ',
    necessaryTitle: 'ضروري', necessaryDescription: 'يتذكّر خيار الخصوصية الخاص بك. مفعّل دائمًا.',
    analyticsTitle: 'إحصاءات الزيارة', analyticsDescription: 'إحصاءات مجهولة بدون ملفات تعريف ارتباط (مستضافة ذاتيًا) لفهم الصفحات المفيدة. لا تتم مشاركة أي شيء أو بيعه.',
    mandatoryTag: 'مفعّل دائمًا', enabledTag: 'مفعّل', disabledTag: 'معطّل',
    privacyLabel: 'سياسة الخصوصية',
    consentLabel: 'لقد قرأتُ وأوافق على', consentLinkText: 'سياسة الخصوصية',
  },
  sv: {
    bannerDescription: 'Vi använder en cookie för att komma ihåg ditt integritetsval, och anonym besöksstatistik endast om du tillåter det.',
    accept: 'Acceptera', decline: 'Avböj', configure: 'Inställningar',
    modalTitle: 'Integritetsinställningar', modalDescription: 'Välj vad du tillåter på den här webbplatsen.',
    save: 'Spara',
    necessaryTitle: 'Nödvändig', necessaryDescription: 'Kommer ihåg ditt integritetsval. Alltid på.',
    analyticsTitle: 'Besöksstatistik', analyticsDescription: 'Anonym, cookiefri statistik (självhostad) som visar vilka sidor som är användbara. Inget delas eller säljs.',
    mandatoryTag: 'Alltid på', enabledTag: 'Aktiverad', disabledTag: 'Inaktiverad',
    privacyLabel: 'Integritetspolicy',
    consentLabel: 'Jag har läst och godkänner', consentLinkText: 'integritetspolicyn',
  },
  no: {
    bannerDescription: 'Vi bruker én informasjonskapsel for å huske personvernvalget ditt, og anonym besøksstatistikk bare hvis du tillater det.',
    accept: 'Godta', decline: 'Avslå', configure: 'Innstillinger',
    modalTitle: 'Personverninnstillinger', modalDescription: 'Velg hva du tillater på dette nettstedet.',
    save: 'Lagre',
    necessaryTitle: 'Nødvendig', necessaryDescription: 'Husker personvernvalget ditt. Alltid på.',
    analyticsTitle: 'Besøksstatistikk', analyticsDescription: 'Anonym statistikk uten informasjonskapsler (selvdriftet) som viser hvilke sider som er nyttige. Ingenting deles eller selges.',
    mandatoryTag: 'Alltid på', enabledTag: 'Aktivert', disabledTag: 'Deaktivert',
    privacyLabel: 'Personvernerklæring',
    consentLabel: 'Jeg har lest og godtar', consentLinkText: 'personvernerklæringen',
  },
  pl: {
    bannerDescription: 'Używamy jednego pliku cookie, aby zapamiętać Twój wybór prywatności, oraz anonimowych statystyk odwiedzin tylko za Twoją zgodą.',
    accept: 'Akceptuję', decline: 'Odrzuć', configure: 'Ustawienia',
    modalTitle: 'Ustawienia prywatności', modalDescription: 'Wybierz, na co pozwalasz na tej stronie.',
    save: 'Zapisz',
    necessaryTitle: 'Niezbędne', necessaryDescription: 'Zapamiętuje Twój wybór prywatności. Zawsze włączone.',
    analyticsTitle: 'Statystyki odwiedzin', analyticsDescription: 'Anonimowe statystyki bez cookies (własny serwer), które pokazują, które strony są przydatne. Nic nie jest udostępniane ani sprzedawane.',
    mandatoryTag: 'Zawsze włączone', enabledTag: 'Włączone', disabledTag: 'Wyłączone',
    privacyLabel: 'Polityka prywatności',
    consentLabel: 'Przeczytałem/-am i akceptuję', consentLinkText: 'politykę prywatności',
  },
  tr: {
    bannerDescription: 'Gizlilik tercihinizi hatırlamak için tek bir çerez kullanıyoruz; anonim ziyaret istatistiklerini yalnızca izin verirseniz topluyoruz.',
    accept: 'Kabul et', decline: 'Reddet', configure: 'Ayarlar',
    modalTitle: 'Gizlilik ayarları', modalDescription: 'Bu sitede nelere izin verdiğinizi seçin.',
    save: 'Kaydet',
    necessaryTitle: 'Gerekli', necessaryDescription: 'Gizlilik tercihinizi hatırlar. Her zaman açık.',
    analyticsTitle: 'Ziyaret istatistikleri', analyticsDescription: 'Hangi sayfaların faydalı olduğunu anlamamıza yardımcı olan, çerezsiz ve anonim istatistikler (kendi sunucumuzda). Hiçbir şey paylaşılmaz veya satılmaz.',
    mandatoryTag: 'Her zaman açık', enabledTag: 'Açık', disabledTag: 'Kapalı',
    privacyLabel: 'Gizlilik Politikası',
    consentLabel: 'Okudum ve kabul ediyorum:', consentLinkText: 'Gizlilik Politikası',
  },
  fi: {
    bannerDescription: 'Käytämme yhtä evästettä muistaaksemme yksityisyysvalintasi, ja anonyymejä kävijätilastoja vain luvallasi.',
    accept: 'Hyväksy', decline: 'Hylkää', configure: 'Asetukset',
    modalTitle: 'Yksityisyysasetukset', modalDescription: 'Valitse, mitä sallit tällä sivustolla.',
    save: 'Tallenna',
    necessaryTitle: 'Välttämättömät', necessaryDescription: 'Muistaa yksityisyysvalintasi. Aina käytössä.',
    analyticsTitle: 'Kävijätilastot', analyticsDescription: 'Anonyymit, evästeettömät tilastot (omalla palvelimella), jotka kertovat mitkä sivut ovat hyödyllisiä. Mitään ei jaeta eikä myydä.',
    mandatoryTag: 'Aina käytössä', enabledTag: 'Käytössä', disabledTag: 'Pois käytöstä',
    privacyLabel: 'Tietosuojaseloste',
    consentLabel: 'Olen lukenut ja hyväksyn', consentLinkText: 'tietosuojaselosteen',
  },
  da: {
    bannerDescription: 'Vi bruger én cookie til at huske dit privatlivsvalg, og anonym besøgsstatistik kun hvis du tillader det.',
    accept: 'Accepter', decline: 'Afvis', configure: 'Indstillinger',
    modalTitle: 'Privatlivsindstillinger', modalDescription: 'Vælg, hvad du tillader på dette websted.',
    save: 'Gem',
    necessaryTitle: 'Nødvendig', necessaryDescription: 'Husker dit privatlivsvalg. Altid slået til.',
    analyticsTitle: 'Besøgsstatistik', analyticsDescription: 'Anonym statistik uden cookies (selvhostet), der viser hvilke sider der er nyttige. Intet deles eller sælges.',
    mandatoryTag: 'Altid til', enabledTag: 'Slået til', disabledTag: 'Slået fra',
    privacyLabel: 'Privatlivspolitik',
    consentLabel: 'Jeg har læst og accepterer', consentLinkText: 'privatlivspolitikken',
  },
}

export function cookieStrings(locale: string): CookieStrings {
  return COOKIE_STRINGS[locale] ?? EN
}

// ── Política de privacidad ──────────────────────────────────────────────────

export interface PrivacySection { h: string; p: string[] }
export interface PrivacyContent {
  title: string
  updated: string          // "Last updated" label
  sections: PrivacySection[]
  contactLead: string      // frase antes del email de contacto (el email viene de SiteSettings)
}

const PRIVACY_EN: PrivacyContent = {
  title: 'Privacy Policy',
  updated: 'Last updated: July 2026',
  sections: [
    {
      h: 'Who we are',
      p: [
        'Bali By Made offers private guided tours, airport transfers and custom routes in Bali, Indonesia, through this website (balibymade.com).',
      ],
    },
    {
      h: 'What information we collect',
      p: [
        'Contact form: when you send us a message we receive the name, email address and message you type. We use them only to reply to you, and we keep the email only as long as needed to handle your request.',
        'WhatsApp: if you choose to contact us via WhatsApp, the conversation happens inside WhatsApp and is governed by WhatsApp’s own terms and privacy policy.',
        'Technical logs: our hosting providers keep short-lived server logs (including IP addresses) for security and abuse prevention.',
      ],
    },
    {
      h: 'Visit statistics',
      p: [
        'Only if you accept the “visit statistics” option in the cookie banner, we collect anonymous, aggregated statistics with a self-hosted analytics tool (Umami). It does not use cookies, does not build personal profiles and never shares or sells data.',
      ],
    },
    {
      h: 'Cookies',
      p: [
        'The site itself uses a single cookie, which stores your answer to the cookie banner. There are no advertising or third-party tracking cookies.',
      ],
    },
    {
      h: 'Who processes your data',
      p: [
        'The website runs on Cloudflare (hosting and content delivery) and Render (server). Contact form emails are delivered by Resend. These providers process data on our behalf only to run the website.',
      ],
    },
    {
      h: 'Your rights',
      p: [
        'You can ask us at any time to access, correct or delete the information you sent us. Write to us at the email address below and we will take care of it.',
      ],
    },
  ],
  contactLead: 'Questions about privacy? Contact us at',
}

export const PRIVACY: Record<string, PrivacyContent> = {
  en: PRIVACY_EN,
  es: {
    title: 'Política de privacidad',
    updated: 'Última actualización: julio de 2026',
    sections: [
      {
        h: 'Quiénes somos',
        p: [
          'Bali By Made ofrece tours privados guiados, traslados de aeropuerto y rutas a medida en Bali, Indonesia, a través de esta web (balibymade.com).',
        ],
      },
      {
        h: 'Qué información recogemos',
        p: [
          'Formulario de contacto: al enviarnos un mensaje recibimos el nombre, el email y el texto que escribas. Los usamos solo para responderte, y conservamos el email solo el tiempo necesario para atender tu solicitud.',
          'WhatsApp: si decides contactarnos por WhatsApp, la conversación ocurre dentro de WhatsApp y se rige por sus propios términos y política de privacidad.',
          'Registros técnicos: nuestros proveedores de alojamiento guardan registros de servidor de corta duración (incluidas direcciones IP) por seguridad y prevención de abusos.',
        ],
      },
      {
        h: 'Estadísticas de visita',
        p: [
          'Solo si aceptas la opción de «estadísticas de visita» en el aviso de cookies, recogemos estadísticas anónimas y agregadas con una herramienta de analítica autoalojada (Umami). No usa cookies, no crea perfiles personales y nunca comparte ni vende datos.',
        ],
      },
      {
        h: 'Cookies',
        p: [
          'La web usa una única cookie, que guarda tu respuesta al aviso de cookies. No hay cookies publicitarias ni de rastreo de terceros.',
        ],
      },
      {
        h: 'Quién trata tus datos',
        p: [
          'La web funciona sobre Cloudflare (alojamiento y entrega de contenido) y Render (servidor). Los emails del formulario los entrega Resend. Estos proveedores tratan los datos por nuestra cuenta únicamente para que la web funcione.',
        ],
      },
      {
        h: 'Tus derechos',
        p: [
          'Puedes pedirnos en cualquier momento acceder, corregir o borrar la información que nos enviaste. Escríbenos al email de abajo y nos encargamos.',
        ],
      },
    ],
    contactLead: '¿Dudas sobre privacidad? Escríbenos a',
  },
  id: {
    title: 'Kebijakan Privasi',
    updated: 'Terakhir diperbarui: Juli 2026',
    sections: [
      {
        h: 'Tentang kami',
        p: [
          'Bali By Made menawarkan tur pribadi berpemandu, antar-jemput bandara, dan rute khusus di Bali, Indonesia, melalui situs ini (balibymade.com).',
        ],
      },
      {
        h: 'Informasi yang kami kumpulkan',
        p: [
          'Formulir kontak: saat Anda mengirim pesan, kami menerima nama, alamat email, dan pesan yang Anda tulis. Kami menggunakannya hanya untuk membalas Anda, dan menyimpan email hanya selama diperlukan untuk menangani permintaan Anda.',
          'WhatsApp: jika Anda menghubungi kami lewat WhatsApp, percakapan terjadi di dalam WhatsApp dan tunduk pada ketentuan serta kebijakan privasi WhatsApp sendiri.',
          'Log teknis: penyedia hosting kami menyimpan log server berumur pendek (termasuk alamat IP) untuk keamanan dan pencegahan penyalahgunaan.',
        ],
      },
      {
        h: 'Statistik kunjungan',
        p: [
          'Hanya jika Anda menyetujui opsi “statistik kunjungan” di banner cookie, kami mengumpulkan statistik anonim dan agregat dengan alat analitik yang di-hosting sendiri (Umami). Alat ini tidak menggunakan cookie, tidak membuat profil pribadi, dan tidak pernah membagikan atau menjual data.',
        ],
      },
      {
        h: 'Cookie',
        p: [
          'Situs ini menggunakan satu cookie saja, yang menyimpan jawaban Anda terhadap banner cookie. Tidak ada cookie iklan atau pelacakan pihak ketiga.',
        ],
      },
      {
        h: 'Siapa yang memproses data Anda',
        p: [
          'Situs ini berjalan di Cloudflare (hosting dan pengiriman konten) dan Render (server). Email formulir kontak dikirim oleh Resend. Penyedia ini memproses data atas nama kami hanya untuk menjalankan situs.',
        ],
      },
      {
        h: 'Hak Anda',
        p: [
          'Anda dapat meminta kami kapan saja untuk mengakses, memperbaiki, atau menghapus informasi yang Anda kirim. Tulis ke alamat email di bawah dan kami akan mengurusnya.',
        ],
      },
    ],
    contactLead: 'Ada pertanyaan tentang privasi? Hubungi kami di',
  },
  ru: {
    title: 'Политика конфиденциальности',
    updated: 'Последнее обновление: июль 2026',
    sections: [
      {
        h: 'Кто мы',
        p: [
          'Bali By Made предлагает частные туры с гидом, трансферы из аэропорта и индивидуальные маршруты по Бали, Индонезия, через этот сайт (balibymade.com).',
        ],
      },
      {
        h: 'Какую информацию мы собираем',
        p: [
          'Контактная форма: отправляя нам сообщение, вы передаёте имя, адрес электронной почты и текст сообщения. Мы используем их только для ответа и храним письмо лишь столько, сколько нужно для обработки запроса.',
          'WhatsApp: если вы пишете нам в WhatsApp, переписка происходит внутри WhatsApp и регулируется его собственными условиями и политикой конфиденциальности.',
          'Технические журналы: наши хостинг-провайдеры хранят краткосрочные серверные журналы (включая IP-адреса) в целях безопасности и предотвращения злоупотреблений.',
        ],
      },
      {
        h: 'Статистика посещений',
        p: [
          'Только если вы согласились с опцией «статистика посещений» в баннере cookie, мы собираем анонимную агрегированную статистику с помощью аналитики на собственном сервере (Umami). Она не использует cookie, не создаёт личные профили и никогда не передаёт и не продаёт данные.',
        ],
      },
      {
        h: 'Cookie',
        p: [
          'Сам сайт использует один cookie — он хранит ваш ответ на баннер cookie. Рекламных и сторонних отслеживающих cookie нет.',
        ],
      },
      {
        h: 'Кто обрабатывает ваши данные',
        p: [
          'Сайт работает на Cloudflare (хостинг и доставка контента) и Render (сервер). Письма из формы доставляет Resend. Эти провайдеры обрабатывают данные от нашего имени исключительно для работы сайта.',
        ],
      },
      {
        h: 'Ваши права',
        p: [
          'Вы можете в любой момент попросить нас предоставить, исправить или удалить отправленную вами информацию. Напишите на адрес ниже — мы всё сделаем.',
        ],
      },
    ],
    contactLead: 'Вопросы о конфиденциальности? Напишите нам:',
  },
}

export function privacyContent(locale: string): PrivacyContent {
  return PRIVACY[locale] ?? PRIVACY_EN
}
