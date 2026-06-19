'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import type { LocaleSetting } from '../../lib/queries'
import s from './PlaceholderLangSwitcher.module.scss'

interface Props {
  locales: LocaleSetting[]
  current: string
}

export default function PlaceholderLangSwitcher({ locales, current }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const currentLang = locales.find(l => l.code === current) ?? locales[0]

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  if (!locales.length) return null

  return (
    <div className={s.langSelect} ref={ref}>
      <button className={s.langBtn} onClick={() => setOpen(!open)} aria-label="Change language">
        {currentLang?.flag && <Image src={currentLang.flag} alt={currentLang.label} width={18} height={13} className={s.flag} />}
        <span className={s.langCode}>{current.toUpperCase()}</span>
        <span className={`${s.langChevron} ${open ? s.langChevronOpen : ''}`}>▾</span>
      </button>
      {open && (
        <div className={s.langDropdown}>
          {locales.map(l => (
            <a
              key={l.code}
              href={`/?lang=${l.code}`}
              className={`${s.langOption} ${l.code === current ? s.langOptionActive : ''}`}
              onClick={() => setOpen(false)}
            >
              <Image src={l.flag} alt={l.label} width={18} height={13} className={s.flag} />
              <span className={s.langOptionLabel}>{l.label}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
