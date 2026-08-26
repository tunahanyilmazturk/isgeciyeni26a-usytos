import { motion } from 'framer-motion'
import { MoreHorizontal, type LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

export interface BottomBarItem {
  key: string
  label: string
  icon: LucideIcon
  path: string
  /** `true` ise tam eşleşme gerekir (ör. `/katilimci`) */
  exact?: boolean
}

interface MobileBottomBarProps {
  items: BottomBarItem[]
  /** Daha fazla menü — opsiyonel. Maks. 4 ana öğe + 1 "daha fazla" butonu önerilir. */
  moreItems?: BottomBarItem[]
}

export function MobileBottomBar({ items, moreItems = [] }: MobileBottomBarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [moreOpen, setMoreOpen] = useState(false)
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)

  const visibleItems = items.slice(0, 4)
  const hasMore = items.length > 4 || moreItems.length > 0
  const overflowItems = [...items.slice(4), ...moreItems]

  function isActive(item: BottomBarItem): boolean {
    return item.exact
      ? location.pathname === item.path
      : location.pathname.startsWith(item.path)
  }

  function handleNavigate(path: string) {
    navigate(path)
    setMoreOpen(false)
  }

  return (
    <>
      {/* "Daha fazla" açılır paneli — dock üstünde floating */}
      {moreOpen && (
        <>
          <button
            type="button"
            aria-label="Menüyü kapat"
            onClick={() => setMoreOpen(false)}
            className="fixed inset-0 z-40 bg-ink-900/30 backdrop-blur-[2px] lg:hidden"
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-[88px] left-1/2 z-50 w-[min(360px,calc(100vw-1.5rem))] -translate-x-1/2 overflow-hidden rounded-3xl border border-ink-200/60 bg-white/95 p-2.5 shadow-[0_24px_80px_-24px_rgba(17,24,39,0.45)] backdrop-blur-xl lg:hidden"
          >
            <div className="grid grid-cols-3 gap-1.5">
              {overflowItems.map((item, index) => {
                const ItemIcon = item.icon
                const active = isActive(item)
                return (
                  <motion.button
                    key={item.key}
                    type="button"
                    onClick={() => handleNavigate(item.path)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03, duration: 0.2 }}
                    whileTap={{ scale: 0.92 }}
                    className={cn(
                      'flex flex-col items-center gap-2 rounded-2xl px-2 py-3.5 text-[10px] font-semibold transition-colors',
                      active ? 'bg-brand-50 text-brand-700' : 'text-ink-500 hover:bg-ink-50',
                    )}
                  >
                    <ItemIcon className="h-5 w-5" strokeWidth={1.8} />
                    <span className="line-clamp-1 text-center">{item.label}</span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </>
      )}

      {/* Dock — alt ortada floating, cam efektli */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-3 lg:hidden" style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 0.75rem)' }}>
        <motion.nav
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto flex items-center gap-1 rounded-2xl border border-ink-200/50 bg-white/85 p-1.5 shadow-[0_12px_40px_-12px_rgba(17,24,39,0.35)] backdrop-blur-xl"
          aria-label="Mobil navigasyon"
        >
          {visibleItems.map((item) => {
            const ItemIcon = item.icon
            const active = isActive(item)
            const isHovered = hoveredKey === item.key

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleNavigate(item.path)}
                onMouseEnter={() => setHoveredKey(item.key)}
                onMouseLeave={() => setHoveredKey(null)}
                className="group relative flex flex-col items-center"
                aria-label={item.label}
                aria-current={active ? 'page' : undefined}
              >
                {/* Tooltip — hover'da üstte */}
                <span
                  className={cn(
                    'pointer-events-none absolute -top-9 whitespace-nowrap rounded-lg bg-ink-900 px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 transition-all duration-200',
                    isHovered && 'opacity-100',
                  )}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-ink-900" />
                </span>

                {/* Aktif arka plan (layout animasyonu) */}
                {active && (
                  <motion.span
                    layoutId="dock-active-bg"
                    className="absolute inset-0 rounded-xl bg-brand-50"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                <motion.span
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.88 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className={cn(
                    'relative grid h-11 w-11 place-items-center rounded-xl transition-colors',
                    active
                      ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/25'
                      : 'text-ink-400 group-hover:text-ink-700',
                  )}
                >
                  <ItemIcon className="h-[22px] w-[22px]" strokeWidth={1.8} />
                </motion.span>

                {/* Aktif nokta göstergesi */}
                {active && (
                  <motion.span
                    layoutId="dock-active-dot"
                    className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-brand-600"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            )
          })}

          {/* Ayraç */}
          {hasMore && <span className="mx-0.5 h-8 w-px bg-ink-200/70" aria-hidden />}

          {/* Daha fazla butonu */}
          {hasMore && (
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              onMouseEnter={() => setHoveredKey('more')}
              onMouseLeave={() => setHoveredKey(null)}
              className="group relative flex flex-col items-center"
              aria-label="Daha fazla"
              aria-expanded={moreOpen}
            >
              {/* Tooltip */}
              <span
                className={cn(
                  'pointer-events-none absolute -top-9 whitespace-nowrap rounded-lg bg-ink-900 px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 transition-all duration-200',
                  hoveredKey === 'more' && 'opacity-100',
                )}
              >
                Daha fazla
                <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-ink-900" />
              </span>

              {moreOpen && (
                <motion.span
                  layoutId="dock-active-bg"
                  className="absolute inset-0 rounded-xl bg-brand-50"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              <motion.span
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.88 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className={cn(
                  'relative grid h-11 w-11 place-items-center rounded-xl transition-colors',
                  moreOpen
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/25'
                    : 'text-ink-400 group-hover:text-ink-700',
                )}
              >
                <MoreHorizontal className="h-[22px] w-[22px]" strokeWidth={1.8} />
              </motion.span>

              {moreOpen && (
                <motion.span
                  layoutId="dock-active-dot"
                  className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-brand-600"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          )}
        </motion.nav>
      </div>
    </>
  )
}
