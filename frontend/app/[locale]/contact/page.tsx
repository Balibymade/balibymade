import { getContactPage, getSiteSettings } from '../../../lib/queries'
import ContactForm from './ContactForm'
import s from './Contact.module.scss'

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [page, settings] = await Promise.all([
    getContactPage(locale),
    getSiteSettings(),
  ])

  if (!page) return null

  const waUrl = settings?.whatsappNumber ? `https://wa.me/${settings.whatsappNumber}` : 'https://wa.me/'

  return (
    <div className={s.page}>
      {/* COMPACT HERO */}
      <section className={s.hero}>
        <div className={s.heroBg} style={{ backgroundImage: "url('/demos/balibymade/hero-path.jpg')" }} />
        <div className={s.heroOverlay} />
        <div className={s.heroContent}>
          <span className={s.heroTag}>{page.heroTag}</span>
          <h1 className={s.h1}>
            {page.heroH1}<br />
            <em className={s.h1Em}>{page.heroH1b}</em>
          </h1>
          <p className={s.heroSub}>{page.heroSub}</p>
        </div>
      </section>

      {/* MAIN CONTACT */}
      <section className={s.main}>
        <div className={s.container}>
          <div className={s.layout}>
            <div className={s.leftCol}>
              <a href={`${waUrl}?text=${encodeURIComponent("Hi Made, I'd love to book a trip!")}`} target="_blank" rel="noopener noreferrer" className={s.waCard}>
                <span className={s.waIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </span>
                <div className={s.waInfo}>
                  <p className={s.waLabel}>{page.formWaLabel}</p>
                  <p className={s.waSub}>{page.formWaSublabel}</p>
                </div>
                <span className={s.waArrow}>→</span>
              </a>

              <div className={s.noteBox}>
                <p className={s.noteTitle}>{page.noteTitle}</p>
                <ul className={s.noteList}>
                  {page.noteItems.map(item => (
                    <li key={item} className={s.noteItem}><span className={s.noteDot}>✦</span>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <ContactForm page={page} waUrl={waUrl} />
          </div>
        </div>
      </section>
    </div>
  )
}
