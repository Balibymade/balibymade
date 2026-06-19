import type { Metadata } from 'next'
import styles from './page.module.scss'

export const metadata: Metadata = {
  title: 'Bali By Made — Coming soon',
  description: 'Your private guide to the real Bali. Coming soon.',
  robots: { index: false, follow: false },
}

export default function PlaceholderPage() {
  return (
    <main className={styles.placeholder}>
      <div className={styles.inner}>
        <h1 className={styles.logo}>
          Bali<span>By</span>Made
        </h1>
        <p className={styles.tagline}>Your private guide to the real Bali.</p>
        <p className={styles.soon}>Coming soon.</p>
      </div>
    </main>
  )
}
