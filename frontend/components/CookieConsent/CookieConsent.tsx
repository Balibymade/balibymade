'use client'

import { useEffect, useRef } from 'react'
import Script from 'next/script'
import { cookieStrings } from '../../lib/legalDict'
import { link } from '../../lib/links'
import { onAnalyticsConsent } from '../../lib/orejime'

/**
 * Banner de consentimiento (Orejime, self-hosted vía public/orejime/, mismo
 * patrón que cocomuny.com/totukeli.com). La única cookie propia (la del
 * consentimiento) queda `isMandatory`. La categoría "analytics" controla la
 * carga real de Umami: el script SOLO se inyecta cuando el visitante acepta
 * — sin consentimiento no se envía ningún dato (patrón onAnalyticsConsent
 * de la flota).
 *
 * Los ficheros de public/orejime/ NO se importan en el bundle de la app —
 * se sirven como asset estático vía <Script>, para no pesar en el Worker.
 * Textos: lib/legalDict.ts (22 idiomas) — este proyecto no usa
 * next-intl/messages (todo el contenido vive en Keystone o en dicts
 * locales del frontend).
 */
export function CookieConsent({ locale }: { locale: string }) {
  const t = cookieStrings(locale)
  const umamiLoaded = useRef(false)

  useEffect(() => {
    const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL?.replace(/\/$/, '')
    const umamiId  = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
    const isProd   = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    if (!isProd || !umamiUrl || !umamiId) return

    onAnalyticsConsent(() => {
      if (umamiLoaded.current) return
      umamiLoaded.current = true
      const s = document.createElement('script')
      s.src = `${umamiUrl}/script.js`
      s.defer = true
      s.setAttribute('data-website-id', umamiId)
      document.body.appendChild(s)
    })
  }, [])

  const config = {
    privacyPolicyUrl: link(locale, '/privacy'),
    cookie: { name: 'bm_consent', sameSite: 'lax' },
    purposes: [
      {
        id: 'necessary',
        title: t.necessaryTitle,
        description: t.necessaryDescription,
        cookies: ['bm_consent'],
        isMandatory: true,
      },
      {
        id: 'analytics',
        title: t.analyticsTitle,
        description: t.analyticsDescription,
        cookies: [],
        default: false,
      },
    ],
    translations: {
      banner: {
        title: null,
        description: t.bannerDescription,
        accept: t.accept,
        acceptTitle: t.accept,
        decline: t.decline,
        declineTitle: t.decline,
        configure: t.configure,
        configureTitle: t.configure,
      },
      modal: {
        title: t.modalTitle,
        description: t.modalDescription,
        acceptAll: t.accept,
        declineAll: t.decline,
        save: t.save,
        saveTitle: t.save,
      },
      purpose: {
        mandatory: t.mandatoryTag,
        mandatoryTitle: t.mandatoryTag,
        enabled: t.enabledTag,
        disabled: t.disabledTag,
      },
    },
  }

  return (
    <>
      <link rel="stylesheet" href="/orejime/orejime.css" />
      <style>{`
        .orejime-Env {
          /* Marca Bali By Made: verde selva + dorado sobre crema (globals.scss).
             El verde primario #2d4a1e con texto blanco da >7:1 (WCAG AA). */
          --orejime-color-interactive: #2d4a1e;
          --orejime-color-on-interactive: #fff;
          --orejime-color-background: #f5f0e8;
          --orejime-color-text: #1a1a1a;
          --orejime-color-subdued: #5c5647;
          --orejime-font-family: var(--font-body), 'DM Sans', system-ui, sans-serif;
          --orejime-radius: 12px;
          --orejime-banner-max-width: 34ch;
        }
        .orejime-Banner-body {
          font-size: 0.8125rem;
          border: 1px solid rgba(201, 168, 76, .35); /* filo dorado sutil */
          box-shadow: 0 2px 4px rgba(26,26,26,.08), 0 16px 32px rgba(26,26,26,.14);
        }
        /* Móvil: banner a ancho completo abajo, botones cómodos de pulsar */
        @media (max-width: 640px) {
          .orejime-Env { --orejime-banner-max-width: 100%; }
          .orejime-Banner { left: 0; right: 0; bottom: 0; margin: 0; }
          .orejime-Banner-body { border-radius: 12px 12px 0 0; font-size: 0.875rem; }
          .orejime-Banner-actions button { min-height: 44px; }
        }
      `}</style>
      <Script
        id="orejime-config"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: `window.orejimeConfig = ${JSON.stringify(config)};` }}
      />
      <Script src="/orejime/orejime.js" strategy="afterInteractive" />
    </>
  )
}
