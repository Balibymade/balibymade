/**
 * Versión remota del seed de SEO + FAQ: mismo contenido que seed-seo.ts (lo importa,
 * única fuente de verdad) pero vía la API GraphQL de Keystone con sesión de admin,
 * para poder sembrar PRODUCCIÓN sin la DATABASE_URL (solo hace falta el token).
 *
 * Uso: KS_API=https://api.balibymade.com KS_TOKEN=$(cat token.txt) \
 *        npx ts-node --transpile-only seed-seo-remote.ts
 *
 * Idempotente: si un SEOPage ya existe por slug, no lo duplica (actualiza sus
 * traducciones). Las traducciones las crea el hook makeTranslationHook al crear
 * la entidad — aquí solo se rellenan, creando las que falten.
 */
import { SEO_PAGES, FAQ_TITLE, FAQ_ITEMS, pick } from './seed-seo'
import { LANGS } from './seed-data/i18n-data'

const API = (process.env.KS_API ?? 'http://localhost:3000') + '/api/graphql'
const TOKEN = process.env.KS_TOKEN
if (!TOKEN) { console.error('Falta KS_TOKEN'); process.exit(1) }

const LOCALE_CODES = LANGS.map(l => l.code)

async function gql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: `keystonejs-session=${TOKEN}` },
    body: JSON.stringify({ query, variables }),
  })
  const json = (await res.json()) as { data?: T; errors?: unknown[] }
  if (json.errors?.length) throw new Error(JSON.stringify(json.errors).slice(0, 500))
  return json.data as T
}

async function main() {
  console.log(`🌱 Seed SEO + FAQ (remoto) contra ${API}`)

  for (const page of SEO_PAGES) {
    // 1. Crear el SEOPage si no existe
    const existing = await gql<{ sEOPageItems: { id: string }[] }>(
      `query($slug: String!) { sEOPageItems(where: { slug: { equals: $slug } }) { id } }`,
      { slug: page.slug },
    )
    let pageId = existing.sEOPageItems[0]?.id
    if (!pageId) {
      const created = await gql<{ createSEOPage: { id: string } }>(
        `mutation($slug: String!, $order: Int!) { createSEOPage(data: { slug: $slug, order: $order }) { id } }`,
        { slug: page.slug, order: page.order },
      )
      pageId = created.createSEOPage.id
      console.log(`  + SEOPage ${page.slug}`)
    } else {
      console.log(`  = SEOPage ${page.slug} ya existía`)
    }

    // 2. Rellenar traducciones (las que creó el hook) y crear las que falten
    const trs = await gql<{ sEOPageTranslations: { id: string; locale: string }[] }>(
      `query($id: ID!) { sEOPageTranslations(where: { seoPage: { id: { equals: $id } } }) { id locale } }`,
      { id: pageId },
    )
    const byLocale = new Map(trs.sEOPageTranslations.map(t => [t.locale, t.id]))

    for (const locale of LOCALE_CODES) {
      const copy = pick(page.copy, locale)
      const trId = byLocale.get(locale)
      if (trId) {
        await gql(
          `mutation($id: ID!, $title: String!, $desc: String!) {
            updateSEOPageTranslation(where: { id: $id }, data: { title: $title, description: $desc }) { id } }`,
          { id: trId, title: copy.title, desc: copy.description },
        )
      } else {
        await gql(
          `mutation($pageId: ID!, $locale: String!, $title: String!, $desc: String!) {
            createSEOPageTranslation(data: { seoPage: { connect: { id: $pageId } }, locale: $locale, title: $title, description: $desc }) { id } }`,
          { pageId, locale, title: copy.title, desc: copy.description },
        )
      }
    }
    console.log(`    ✓ ${LOCALE_CODES.length} traducciones`)
  }

  // 3. FAQ en HomePageTranslation (todas las filas existentes)
  const homeTrs = await gql<{ homePageTranslations: { id: string; locale: string }[] }>(
    `{ homePageTranslations { id locale } }`,
  )
  for (const tr of homeTrs.homePageTranslations) {
    const faqItems = FAQ_ITEMS[tr.locale] ?? FAQ_ITEMS.en
    const faqTitle = FAQ_TITLE[tr.locale] ?? FAQ_TITLE.en
    await gql(
      `mutation($id: ID!, $title: String!, $items: JSON!) {
        updateHomePageTranslation(where: { id: $id }, data: { faqTitle: $title, faqItems: $items }) { id } }`,
      { id: tr.id, title: faqTitle, items: faqItems },
    )
  }
  console.log(`  ✓ FAQ en ${homeTrs.homePageTranslations.length} traducciones de Home`)
  console.log('✅ Seed remoto completado.')
}

main().catch(e => { console.error(e); process.exit(1) })
