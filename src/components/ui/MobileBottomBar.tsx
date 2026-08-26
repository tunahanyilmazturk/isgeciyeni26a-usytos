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
      {/* "Daha fazla" açılır paneli */}
      {moreOpen && (
        <>
          <button
            type="button"
            aria-label="Menüyü kapat"
            onClick={() => setMoreOpen(false)}
            className="fixed inset-0 z-40 bg-ink-900/30 backdrop-blur-[2px] lg:hidden"
          />
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-[76px] left-1/2 z-50 w-[min(360px,calc(100vw-1.5rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-ink-200/80 bg-white p-2 shadow-[0_20px_60px_-20px_rgba(17,24,39,0.4)] lg:hidden"
          >
            <div className="grid grid-cols-3 gap-1">
              {overflowItems.map((item) => {
                const ItemIcon = item.icon
                const active = isActive(item)
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => handleNavigate(item.path)}
                    className={cn(
                      'flex flex-col items-center gap-1.5 rounded-xl px-2 py-3 text-[10px] font-semibold transition-colors',
                      active ? 'bg-brand-50 text-brand-700' : 'text-ink-500 hover:bg-ink-50',
                    )}
                  >
                    <ItemIcon className="h-5 w-5" strokeWidth={1.8} />
                    <span className="line-clamp-1 text-center">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        </>
      )}

      {/* Alt bar */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-200/80 bg-white/95 backdrop-blur-xl lg:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        aria-label="Mobil navigasyon"
      >
        <div className="mx-auto flex h-[64px] max-w-md items-stretch justify-between px-2">
          {visibleItems.map((item) => {
            const ItemIcon = item.icon
            const active = isActive(item)
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleNavigate(item.path)}
                className="group relative flex flex-1 flex-col items-center justify-center gap-1 pt-1.5"
                aria-label={item.label}
                aria-current={active ? 'page' : undefined}
              >
                {/* Aktif üst çizgi */}
                {active && (
                  <motion.span
                    layoutId="mobile-bar-active"
                    className="absolute top-0 h-0.5 w-8 rounded-full bg-brand-600"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <motion.span
                  whileTap={{ scale: 0.88 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className={cn(
                    'grid h-7 w-7 place-items-center rounded-lg transition-colors',
                    active ? 'text-brand-600' : 'text-ink-400 group-hover:text-ink-600',
                  )}
                >
                  <ItemIcon className="h-[22px] w-[22px]" strokeWidth={1.8} />
                </motion.span>
                <span
                  className={cn(
                    'text-[10px] font-semibold leading-none transition-colors',
                    active ? 'text-brand-700' : 'text-ink-400',
                  )}
                >
                  {item.label}
                </span>
              </button>
            )
          })}

          {/* Daha fazla butonu */}
          {hasMore && (
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              className="group relative flex flex-1 flex-col items-center justify-center gap-1 pt-1.5"
              aria-label="Daha fazla"
              aria-expanded={moreOpen}
            >
              {moreOpen && (
                <motion.span
                  layoutId="mobile-bar-active"
                    className="absolute top-0 h-0.5 w-8 rounded-full bg-brand-600"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <motion.span
                whileTap={{ scale: 0.88 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className={cn(
                  'grid h-7 w-7 place-items-center rounded-lg transition-colors',
                  moreOpen ? 'text-brand-600' : 'text-ink-400 group-hover:text-ink-600',
                )}
              >
                <MoreHorizontal className="h-[22px] w-[22px]" strokeWidth={1.8} />
              </motion.span>
              <span
                className={cn(
                  'text-[10px] font-semibold leading-none transition-colors',
                  moreOpen ? 'text-brand-700' : 'text-ink-400',
                )}
              >
                Daha
              </span>
            </button>
          )}
        </div>
      </nav>
    </>
  )
}
