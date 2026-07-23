# balibymade.com — Contexto para Claude Code

<!-- workers-builds-reminder -->
> ⚠️ **PENDIENTE al próximo commit de esta web: conectar el despliegue al repo (Cloudflare Workers Builds).**
> Hoy esta web se despliega con `npm run cf:deploy` **local** (no tira del repo). La próxima vez que
> toquemos esta web, conectar el Worker a ESTE repositorio para que haga auto-deploy en cada push a
> `main`, siguiendo `WEB_BLUEPRINT_v2.md` **§35.20**:
> - Panel Cloudflare → Worker → Settings → Build → *Connect* → este repo (el PRIMARIO si hay varios
>   remotos), rama `main`, **root `frontend`**, build `npx opennextjs-cloudflare build`, deploy
>   `npx wrangler deploy`.
> - Poner `NEXT_PUBLIC_API_URL=https://api.<dominio>` (y cualquier otra var de build, p. ej.
>   `DOMMIVA_BACKEND_ORIGIN`) como **Build env var**, y relajar el pre-check `check:prod-env`
>   (rompe el build en CI porque `.env.production.local` está gitignored — ver §35.20).
> - La conexión GitHub↔Cloudflare (OAuth de la GitHub App de Cloudflare) la autoriza Pablo en el
>   panel, una vez por cuenta.
> **Al dejarlo conectado y verificado (push → build → deploy), borrar este aviso.**


> **Memoria**: antes de nada, leer `/Users/ana/.claude/projects/-Users-ana-Documents-Proyectos-Web/memory/project_balibymade_reciente.md` (contexto rápido) y, si hace falta reconstruir a fondo, `project_balibymade.md` (memoria general).
> **Credenciales**: `/Users/ana/Documents/Proyectos/Web/.credentials/balibymade.com.md` (solo la ruta — nunca credenciales en claro aquí).

## Cuentas y accesos

- **Dos repositorios GitHub — patrón estándar de todos los proyectos** (cada commit se pushea
  a los dos: `git push origin main && git push render main`):
  - `https://github.com/Balibymade/balibymade` (remoto `render`) — **repo del proyecto, el
    principal: toda la infra tira de este** (Render ya despliega desde aquí).
  - `https://github.com/pablopedrosa7/balibymade.com` (remoto `origin`) — clon/backup, nada
    apunta a él.
- **Cuenta GitHub `Balibymade`**: email principal `balibymade.com@balibymade.com`
  (cambiado 2026-07-23).
- **Email del proyecto**: `balibymade.com@balibymade.com` — alias de Cloudflare Email Routing
  que reenvía a `pablo@pablopedrosa.com` (activo desde 2026-06-29). Para nuevos registros de
  servicios usar este alias. Registros antiguos (Cloudflare, Render, Supabase, Dinahosting)
  se hicieron con `pablo+balibymade@pablopedrosa.com` (alias "+" de Google Workspace, llega al
  mismo buzón).
- **Email público del negocio: `ikadekwirata7@gmail.com`** (el real del cliente, ya en
  `SiteSettings.contactEmail`). ⚠️ NO crear emails/aliases inventados tipo `hola@` — regla de
  Pablo 2026-07-23: todos los emails que deban recibirse van al email real del cliente.

## Descripción del proyecto

Web de Made, guía privado local en Bali (tours en coche privado, transfers de aeropuerto y
constructor de rutas a medida). Basada en la demo aprobada en
`pablopedrosa.com/demo/balibymade` (login `balibymade`).

- **Blueprint de referencia**: `/Users/ana/Documents/Proyectos/Web/WEB_BLUEPRINT_v2.md` (sección 15
  específicamente: "Demo → sitio real 100% configurable en Keystone")
- **Patrón elegido**: TODO el contenido (incluidos textos de UI fijos: nav, hero, footer, botones)
  vive en Keystone, en los 22 idiomas. No se usa `messages/[locale].json` de next-intl — next-intl
  solo gestiona el prefijo de idioma en la URL.

## Stack

Igual que pablopedrosa.com: Next.js 15 + next-intl (solo routing) + SCSS Modules / Keystone.js 6
(GraphQL) / PostgreSQL / Supabase Storage / Vercel + Render / Cloudflare / Umami / Sentry.

## Idiomas (22)

`en, hi, zh, de, fr, ms, nl, ru, uk, ja, ko, it, pt, es, id, ar, sv, no, pl, tr, fi, da`
(orden por volumen de visitantes a Bali, ver `LANGS` en `backend/seed-data/i18n-data.ts`).

`defaultLocale: 'en'`. Habilitados/deshabilitados vía `LocaleSettingItems` (igual que
pablopedrosa.com) — el middleware los cachea 60s.

## Puertos locales

| Servicio | Puerto |
|---------|--------|
| Frontend (Next.js) | 3001 |
| Backend (Keystone) | 3000 |
| PostgreSQL (Docker) | 5435 |

## Arrancar en local

```bash
cd /Users/ana/Documents/Proyectos/Web && docker compose up -d balibymade.com-postgres

cd balibymade.com/backend
npm install
npm run dev          # http://localhost:3000

cd ../frontend
npm install
npm run dev          # http://localhost:3001
```

Admin Keystone creado en local: `pablo@pablopedrosa.com` / `BaliByMade2026!` (cambiar antes de
producción). Login: `http://localhost:3000/keystonejs/auth/signin` (o el equivalente que genere
Keystone — revisar `/init` si no existe usuario).

## Modelos Keystone (23 listas)

**Negocio** (con traducción por idioma):
| Modelo | Notas |
|--------|-------|
| LocaleSetting | code/label/flag/order/enabled |
| DestinationCategory (+Translation) | taxonomía del Route Builder: temple, waterfall, volcano... |
| Destination (+Translation) | 140 destinos del Route Builder: lat/lng/categoría/precio/región |
| Route (+Translation) | las 10 rutas de Experiences |
| RouteItinerary (+Translation) | 2 itinerarios detallados con paradas (ligados a una Route) |
| AirportRoute (+Translation) | 6 filas de la tabla de precios transfer aeropuerto |
| SiteSettings | singleton sin traducir: WhatsApp, Instagram, email, logo |

**Textos de página** (singleton + traducción, ver blueprint sección 28.2):
| Modelo | Cubre |
|--------|-------|
| SiteChrome | nav, footer, CTA global, texto de "10 routes" |
| HomePage | hero, sección "Why Made" |
| ExperiencesPage | hero, "qué incluye", bloque transfer aeropuerto, "ruta a medida" |
| AboutPage | quote, biografía, valores |
| ContactPage | hero, formulario, notas |
| RouteBuilderPage | todos los textos del constructor de rutas |

Todas las listas tienen `ui.labelField` apuntando a un campo legible (slug/label) — nunca se
debería ver un ID crudo en un selector de relación.

Hook de auto-traducción: igual que pablopedrosa.com — al crear una entidad principal se generan
traducciones vacías para cada locale habilitado; al habilitar un locale nuevo se rellenan las que
falten (`makeTranslationHook` / `TRANSLATION_SPECS` en `schema.ts`).

## Seed

`backend/seed.ts` extrae el contenido directamente de la demo:
- `backend/seed-data/i18n-data.ts` — copia de `i18n.ts` de la demo (22 idiomas), con
  `resolveLocale(locale)` que replica el fallback parcial→inglés (`LANG_UI` + `deepAssign`) de la
  demo. **No editar a mano** — si hace falta cambiar contenido base, mejor editar en Keystone admin
  directamente o regenerar desde la demo actualizada.
- `backend/seed-data/destinations-data.ts` — copia de `destinations.ts` (141 destinos, 4 quedaron
  con `published:false` o duplicados — el seed cargó 140).

Ejecutar: `npm run seed` (idempotente NO — vuelve a insertar todo; solo correr una vez sobre BD
vacía o limpiar antes).

## Lógica del Route Builder (no es contenido — vive en el frontend)

`frontend/lib/routeBuilderUtils.ts`: `roadKm` (Haversine × factor de carretera 1.35),
`estimatePrice`, `formatTime`, `buildWhatsAppMessage`. Igual que la demo, solo que opera sobre el
tipo `Destination` de GraphQL en vez de los datos hardcodeados.

## Rutas del frontend

```
/[locale]                  — Home
/[locale]/experiences      — Las 10 rutas + transfer aeropuerto + ruta a medida
/[locale]/route-builder    — Constructor interactivo de rutas (cliente, useState)
/[locale]/about            — Sobre Made
/[locale]/contact          — Contacto (formulario visual, WhatsApp real)
```

## SEO y GEO

Ver blueprint sección 29. Implementado:
- `SEOPage` (+Translation) en Keystone — title/description por página y locale
- `generateMetadata` en las 5 páginas vía `lib/seoMetadata.ts` (canonical + hreflang 22 locales + og/twitter)
- `app/sitemap.ts` (5 páginas × locales habilitados, con `alternates.languages`) y `app/robots.ts`
- Schema.org JSON-LD en `app/[locale]/layout.tsx`: `LocalBusiness`/`TouristInformationCenter` + `Person` (Made)
- GEO: sección FAQ visible en Home (`HomePageTranslation.faqItems`, editable en Keystone) + `FAQPage` schema.org
- GEO: `frontend/public/llms.txt` (estático, actualizar a mano si cambian precios/servicios)
- `robots.ts` permite explícitamente GPTBot/ClaudeBot/Google-Extended/PerplexityBot/Applebot-Extended
- Pendiente (cuenta del cliente): Google Search Console, Bing Webmaster Tools, **Google Business Profile** (aplica — Made presta servicio en una zona geográfica concreta, Bali/Ubud)
- Seed de SEO/FAQ: `backend/seed-seo.ts` (contenido nuevo en en/es/id/ru, fallback inglés en el resto — pendiente revisar/traducir el resto de locales)

## Pendiente antes de producción

- [ ] Subir imágenes reales a cada `Route`/`RouteItinerary`/`HomePage.heroImage`/`AboutPage.bioImage`
      en Keystone (actualmente el frontend usa fallback a las imágenes de la demo en
      `/public/demos/balibymade/`)
- [ ] `SiteSettings.whatsappNumber` y `contactEmail` reales (actualmente vacíos)
- [ ] Todo el checklist de infraestructura del blueprint (Fases 1-7): Supabase, Render, Vercel,
      Cloudflare, Umami, Sentry, backups, dominio
- [ ] Revisar/ajustar traducciones de los 18 idiomas que en la demo solo tenían textos de UI
      parciales (heredan contenido en inglés para itinerarios/valores — ver blueprint 28.4)
