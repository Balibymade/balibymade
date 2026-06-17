import type { Metadata } from 'next'
import './globals.scss'

export const metadata: Metadata = {
  title: 'Bali By Made',
  description: 'Your private guide to the real Bali.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
