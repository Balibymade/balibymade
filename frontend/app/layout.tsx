import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.scss'

export const metadata: Metadata = {
  title: 'Bali By Made',
  description: 'Your private guide to the real Bali.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL?.replace(/\/$/, '')
  const umamiId  = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
  const isProd   = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'

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
        {isProd && umamiUrl && umamiId && (
          <Script
            src={`${umamiUrl}/script.js`}
            data-website-id={umamiId}
            strategy="afterInteractive"
            defer
          />
        )}
      </body>
    </html>
  )
}
