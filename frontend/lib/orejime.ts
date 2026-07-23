export interface OrejimeManager {
  getConsent(purposeId: string): boolean
  on(event: 'update', callback: (updatedConsents: Record<string, boolean>, allConsents: Record<string, boolean>) => void): void
  on(event: 'clear' | 'dirty', callback: (...args: unknown[]) => void): void
}

declare global {
  interface Window {
    orejimeConfig?: Record<string, unknown>
    orejime?: { manager: OrejimeManager; prompt: () => void }
  }
}

/**
 * Dispara `callback` en cuanto haya consentimiento real para "analytics"
 * (aquí carga Umami — ver CookieConsent.tsx). El script de Orejime carga
 * `afterInteractive`, así que puede no existir todavía cuando este módulo
 * se llama — sondea hasta 5s y se rinde en silencio si nunca aparece
 * (adblocker, fallo de red...), sin romper nada. Mismo patrón que
 * totukeli.com / cocomuny.com.
 */
export function onAnalyticsConsent(callback: () => void): void {
  if (typeof window === 'undefined') return
  let attempts = 0
  const interval = setInterval(() => {
    attempts++
    if (window.orejime) {
      clearInterval(interval)
      if (window.orejime.manager.getConsent('analytics')) callback()
      window.orejime.manager.on('update', (updated) => {
        if (updated.analytics) callback()
      })
      return
    }
    if (attempts > 25) clearInterval(interval)
  }, 200)
}
