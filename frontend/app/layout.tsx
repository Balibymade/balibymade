import type { Metadata } from 'next'
import './globals.scss'

export const metadata: Metadata = {
  title: 'Bali By Made',
  description: 'Your private guide to the real Bali.',
}

// Umami ya no se inyecta aquí: lo carga CookieConsent (components/CookieConsent)
// SOLO cuando el visitante acepta la categoría "analytics" de Orejime.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600;1,700&family=DM+Sans:wght@300;400;500;600&display=swap"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
