import { motion } from 'framer-motion'
import {
  HardHat,
  LayoutDashboard,
  LogOut,
  BookOpen,
  UserRound,
} from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useParticipantAuth } from '@/features/auth/ParticipantAuthContext'

interface DockItem {
  key: string
  label: string
  icon: typeof LayoutDashboard
  path: string
}

const dockItems: DockItem[] = [
  { key: 'dashboard', label: 'Panel', icon: LayoutDashboard, path: '/katilimci' },
  { key: 'trainings', label: 'Eğitimler', icon: BookOpen, path: '/katilimci/egitimler' },
  { key: 'profile', label: 'Profil', icon: UserRound, path: '/katilimci/profil' },
]

export function ParticipantLayout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useParticipantAuth()
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)

  const activeKey = dockItems.find((item) =>
    item.path === '/katilimci'
      ? location.pathname === '/katilimci'
      : location.pathname.startsWith(item.path),
  )?.key ?? 'dashboard'

  function handleLogout() {
    logout()
    toast.info('Oturum kapatıldı', { description: 'Güvenle çıkış yaptınız.' })
    navigate('/katilimci/giris', { replace: true })
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-ink-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-ink-200/70 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-10">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-brand-600 text-white shadow-sm shadow-brand-600/20">
              <HardHat className="h-[18px] w-[18px]" strokeWidth={1.8} />
            </span>
            <span className="leading-none">
              <span className="block text-[13px] font-bold uppercase tracking-[0.18em] text-ink-900">
                HanTech
              </span>
              <span className="mt-1 block text-[10px] font-medium tracking-wide text-ink-400">
                İSG Eğitim Portalı
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-3 sm:flex">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">
                {user?.name.split(' ').map((n) => n[0]).join('').slice(0, 2) ?? '??'}
              </span>
              <div className="leading-none">
                <p className="text-sm font-semibold text-ink-800">{user?.name}</p>
                <p className="mt-0.5 text-[11px] text-ink-400">{user?.company} · {user?.department}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* İçerik */}
      <main className="mx-auto max-w-6xl px-4 pb-32 pt-6 sm:px-6 sm:pb-28 sm:pt-8 lg:px-10 lg:pt-12">
        {children}
      </main>

      {/* Dock — alt ortada şık navigasyon */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-5 sm:pb-6">
        <motion.nav
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="pointer-events-auto flex items-end gap-1.5 rounded-2xl border border-ink-200/70 bg-white/90 p-2 shadow-[0_12px_40px_-12px_rgba(17,24,39,0.35)] backdrop-blur-xl sm:gap-2 sm:rounded-[20px] sm:p-2.5"
          aria-label="Katılımcı navigasyon"
        >
          {dockItems.map((item) => {
            const isActive = activeKey === item.key
            const isHovered = hoveredKey === item.key
            const Icon = item.icon

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => navigate(item.path)}
                onMouseEnter={() => setHoveredKey(item.key)}
                onMouseLeave={() => setHoveredKey(null)}
                className="group relative flex flex-col items-center"
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Tooltip label */}
                <span
                  className={cn(
                    'pointer-events-none absolute -top-9 whitespace-nowrap rounded-lg bg-ink-900 px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 transition-all duration-200',
                    (isHovered || isActive) && 'opacity-100',
                  )}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-ink-900" />
                </span>

                <motion.span
                  whileHover={{ scale: 1.12, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className={cn(
                    'grid h-11 w-11 place-items-center rounded-xl transition-colors sm:h-12 sm:w-12 sm:rounded-2xl',
                    isActive
                      ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/25'
                      : 'text-ink-400 hover:bg-ink-100 hover:text-ink-700',
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </motion.span>

                {/* Aktif göstergesi */}
                {isActive && (
                  <motion.span
                    layoutId="dock-active-dot"
                    className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-brand-600"
                  />
                )}
              </button>
            )
          })}

          {/* Ayraç */}
          <span className="mx-0.5 h-8 w-px self-center bg-ink-200" aria-hidden />

          {/* Çıkış */}
          <button
            type="button"
            onClick={handleLogout}
            onMouseEnter={() => setHoveredKey('logout')}
            onMouseLeave={() => setHoveredKey(null)}
            className="group relative flex flex-col items-center"
            aria-label="Çıkış yap"
          >
            <span
              className={cn(
                'pointer-events-none absolute -top-9 whitespace-nowrap rounded-lg bg-ink-900 px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 transition-all duration-200',
                hoveredKey === 'logout' && 'opacity-100',
              )}
            >
              Çıkış
              <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-ink-900" />
            </span>
            <motion.span
              whileHover={{ scale: 1.12, y: -4 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="grid h-11 w-11 place-items-center rounded-xl text-ink-400 transition-colors hover:bg-rose-50 hover:text-rose-600 sm:h-12 sm:w-12 sm:rounded-2xl"
            >
              <LogOut className="h-5 w-5" strokeWidth={1.8} />
            </motion.span>
          </button>
        </motion.nav>
      </div>
    </div>
  )
}
