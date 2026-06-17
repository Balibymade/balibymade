'use client'
import { useState } from 'react'
import type { ContactPageT } from '../../../lib/queries'
import s from './Contact.module.scss'

export default function ContactForm({ page, waUrl }: { page: ContactPageT; waUrl: string }) {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className={s.rightCol}>
      {sent ? (
        <div className={s.success}>
          <span className={s.successIcon}>✓</span>
          <h3 className={s.successTitle}>{page.formSuccessTitle}</h3>
          <p className={s.successText}>{page.formSuccessText}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={s.form}>
          <div className={s.fieldGroup}>
            <label className={s.label}>{page.formNameLabel}</label>
            <input type="text" className={s.input} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
          </div>
          <div className={s.fieldGroup}>
            <label className={s.label}>{page.formEmailLabel}</label>
            <input type="email" className={s.input} value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
          </div>
          <div className={s.fieldGroup}>
            <label className={s.label}>{page.formMessageLabel}</label>
            <textarea
              className={s.textarea}
              rows={5}
              placeholder={page.formMessagePlaceholder}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              required
            />
          </div>
          <button type="submit" className={s.submitBtn}>{page.formSubmit}</button>
          <p className={s.orNote}>
            {page.formOrNote}{' '}
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className={s.orLink}>{page.formWaBtn}</a>
          </p>
        </form>
      )}
    </div>
  )
}
