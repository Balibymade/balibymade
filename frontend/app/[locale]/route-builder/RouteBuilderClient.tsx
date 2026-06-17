'use client'
import { useState, useMemo } from 'react'
import type { Destination, DestinationCategory, RouteBuilderPageT } from '../../../lib/queries'
import { roadKm, formatTime, estimatePrice, buildWhatsAppMessage } from '../../../lib/routeBuilderUtils'
import s from './RouteBuilder.module.scss'

interface Props {
  locale: string
  rb: RouteBuilderPageT
  destinations: Destination[]
  categories: DestinationCategory[]
  whatsappNumber: string
}

export default function RouteBuilderClient({ locale, rb, destinations, categories, whatsappNumber }: Props) {
  const destMap = useMemo(() => Object.fromEntries(destinations.map(d => [d.id, d])), [destinations])
  const firstId = destinations[0]?.id ?? ''

  const [waypoints, setWaypoints] = useState<string[]>(firstId ? [firstId] : [])
  const [search, setSearch] = useState('')
  const [activeCat, setActiveCat] = useState<string>('all')
  const [mobileTab, setMobileTab] = useState<'destinations' | 'route'>('destinations')

  const catList = [{ slug: 'all', emoji: '🗺️', color: '#c9a84c', translations: [{ label: rb.destinationsLabel }] }, ...categories]

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return destinations.filter(d => {
      const name = (d.translations[0]?.name ?? '').toLowerCase()
      const matchQ = !q || name.includes(q) || d.region.toLowerCase().includes(q)
      const matchCat = activeCat === 'all' || d.category?.slug === activeCat
      return matchQ && matchCat
    })
  }, [search, activeCat, destinations])

  const waypointDests = useMemo(() => waypoints.map(id => destMap[id]).filter(Boolean) as Destination[], [waypoints, destMap])
  const segmentKms = useMemo(() => waypointDests.slice(1).map((d, i) => roadKm(waypointDests[i], d)), [waypointDests])

  const totalKm = segmentKms.reduce((a, b) => a + b, 0)
  const totalTime = formatTime(totalKm)
  const totalPrice = estimatePrice(totalKm)

  function add(id: string) { if (!waypoints.includes(id)) setWaypoints(p => [...p, id]) }
  function remove(id: string) { setWaypoints(p => p.filter(w => w !== id)) }
  function moveUp(i: number) { setWaypoints(p => { if (i < 1) return p; const a = [...p]; [a[i - 1], a[i]] = [a[i], a[i - 1]]; return a }) }
  function moveDn(i: number) { setWaypoints(p => { if (i >= p.length - 1) return p; const a = [...p]; [a[i], a[i + 1]] = [a[i + 1], a[i]]; return a }) }

  const waUrl = buildWhatsAppMessage(waypointDests, locale, whatsappNumber)
  const hasRoute = waypoints.length > 1

  function destName(d: Destination) { return d.translations[0]?.name ?? d.slug }

  const RoutePanel = () => (
    <div className={s.routePanelInner}>
      <div className={s.routeHeader}>
        <div className={s.routeHeaderLeft}>
          <span className={s.routeTitle}>{rb.yourRoute}</span>
          {waypoints.length > 0 && <span className={s.routeCount}>{waypoints.length} {rb.stops}</span>}
        </div>
        {hasRoute && (
          <button className={s.clearBtn} onClick={() => setWaypoints(firstId ? [firstId] : [])}>{rb.clearRoute}</button>
        )}
      </div>

      {waypointDests.length === 0 ? (
        <p className={s.routeHint}>{rb.addStops}</p>
      ) : (
        <div className={s.waypointList}>
          {waypointDests.map((dest, i) => {
            const color = dest.category?.color ?? '#c9a84c'
            const emoji = dest.category?.emoji ?? '📍'
            return (
              <div key={dest.id}>
                <div className={s.wp}>
                  <div className={s.wpDot} style={{ background: color + '90', borderColor: color }} />
                  <div className={s.wpBody}>
                    <div className={s.wpName}>
                      <span>{emoji}</span>
                      <span>{destName(dest)}</span>
                      {i === 0 && <span className={s.startBadge}>{rb.startPoint}</span>}
                    </div>
                    <div className={s.wpSub}>{dest.region} · ${dest.priceFromUbud}+ /car</div>
                  </div>
                  <div className={s.wpActions}>
                    <button className={s.moveBtn} onClick={() => moveUp(i)} disabled={i === 0}>↑</button>
                    <button className={s.moveBtn} onClick={() => moveDn(i)} disabled={i === waypointDests.length - 1}>↓</button>
                    <button className={s.removeBtn} onClick={() => remove(dest.id)}>×</button>
                  </div>
                </div>
                {i < waypointDests.length - 1 && segmentKms[i] !== undefined && (
                  <div className={s.segment}>
                    <div className={s.segLine} />
                    <span className={s.segKm}>{segmentKms[i]} km ({rb.approx})</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {hasRoute && (
        <>
          <div className={s.summary}>
            <div className={s.summaryRow}>
              <span className={s.summaryLabel}>{rb.totalKm}</span>
              <span className={s.summaryVal}>{totalKm} km ({rb.approx})</span>
            </div>
            <div className={s.summaryRow}>
              <span className={s.summaryLabel}>{rb.estimatedTime}</span>
              <span className={s.summaryVal}>{totalTime}</span>
            </div>
            <div className={s.summaryRow}>
              <span className={s.summaryLabel}>Est. price</span>
              <span className={s.summaryPrice}>from ${totalPrice} / private car</span>
            </div>
            <div className={s.summaryNote}>{rb.kmhNote}</div>
            <div className={s.included}>
              <span>✓ Private car</span><span>✓ Petrol</span><span>✓ Water</span><span>✓ Parking & tolls</span>
            </div>
          </div>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className={s.bookBtn}>{rb.bookCta}</a>
          <p className={s.bookNote}>{rb.bookNote}</p>
        </>
      )}

      {!hasRoute && <p className={s.routeHint}>{rb.addStops}</p>}
    </div>
  )

  return (
    <div className={s.page}>
      <section className={s.hero}>
        <div className={s.heroBg} style={{ backgroundImage: "url('/demos/balibymade/hero-road.jpg')" }} />
        <div className={s.heroOverlay} />
        <div className={s.heroInner}>
          <span className={s.heroTag}>{rb.tag}</span>
          <h1 className={s.h1}><span>{rb.h1}</span><em className={s.h1Em}>{rb.h1b}</em></h1>
          <p className={s.heroSub}>{rb.sub}</p>
        </div>
      </section>

      {hasRoute && (
        <div className={s.mobileStickyBar}>
          <div className={s.mobileBarInfo}>
            <span className={s.mobileBarStops}>{waypoints.length} {rb.stops}</span>
            <span className={s.mobileBarDot}>·</span>
            <span>{totalKm} km ({rb.approx})</span>
            <span className={s.mobileBarDot}>·</span>
            <span className={s.mobileBarPrice}>from ${totalPrice}</span>
          </div>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className={s.mobileBarBtn}>{rb.bookCta}</a>
        </div>
      )}

      <div className={s.mobileTabs}>
        <button className={`${s.mobileTab} ${mobileTab === 'destinations' ? s.mobileTabActive : ''}`} onClick={() => setMobileTab('destinations')}>
          🗺️ {rb.destinationsLabel} ({destinations.length})
        </button>
        <button className={`${s.mobileTab} ${mobileTab === 'route' ? s.mobileTabActive : ''}`} onClick={() => setMobileTab('route')}>
          📍 {rb.yourRoute} {waypoints.length > 0 ? `(${waypoints.length})` : ''}
          {hasRoute && <span className={s.mobileTabBadge} />}
        </button>
      </div>

      <div className={s.layout}>
        <div className={`${s.pickerPanel} ${mobileTab !== 'destinations' ? s.mobileHidden : ''}`}>
          <div className={s.pickerSticky}>
            <div className={s.searchWrap}>
              <span className={s.searchIcon}>🔍</span>
              <input
                type="text"
                className={s.searchInput}
                placeholder={rb.searchPlaceholder}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && <button className={s.searchClear} onClick={() => setSearch('')}>✕</button>}
            </div>
            <div className={s.filters}>
              {catList.map(cat => {
                const label = cat.translations[0]?.label ?? cat.slug
                const active = activeCat === cat.slug
                return (
                  <button
                    key={cat.slug}
                    className={`${s.filterBtn} ${active ? s.filterBtnActive : ''}`}
                    style={active ? { borderColor: cat.color, color: cat.color, background: cat.color + '14' } : {}}
                    onClick={() => setActiveCat(cat.slug)}
                  >
                    {cat.emoji} {label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className={s.destCount}>{filtered.length} {rb.destinationsLabel}</div>

          <div className={s.destGrid}>
            {filtered.map(dest => {
              const inRoute = waypoints.includes(dest.id)
              const color = dest.category?.color ?? '#c9a84c'
              const emoji = dest.category?.emoji ?? '📍'
              const name = destName(dest)
              return (
                <button
                  key={dest.id}
                  className={`${s.destCard} ${inRoute ? s.destCardActive : ''}`}
                  style={inRoute ? { borderColor: color + '50', background: color + '08' } : {}}
                  onClick={() => inRoute ? remove(dest.id) : add(dest.id)}
                >
                  <span className={s.destEmoji}>{emoji}</span>
                  <div className={s.destInfo}>
                    <div className={s.destName}>{name}</div>
                    <div className={s.destRegion}>{dest.region}</div>
                  </div>
                  <div className={s.destMeta}>
                    <span className={s.destPrice} style={{ color: inRoute ? color : '#c9a84c' }}>
                      {inRoute ? '✓' : `$${dest.priceFromUbud}+`}
                    </span>
                    {dest.driveMinFromUbud > 0 && <span className={s.destDrive}>{dest.driveMinFromUbud}min</span>}
                  </div>
                </button>
              )
            })}
            {filtered.length === 0 && <div className={s.noResults}>{rb.noResults}</div>}
          </div>
        </div>

        <div className={`${s.routePanel} ${mobileTab !== 'route' ? s.mobileHidden : ''}`}>
          <RoutePanel />
        </div>
      </div>
    </div>
  )
}
