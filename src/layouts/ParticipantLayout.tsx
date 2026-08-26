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

interface NavItem {
  key: string
  label: string
  icon: typeof LayoutDashboard
  path: string
}

const navItems: NavItem[] = [
  { key: 'dashboard', label: 'Panel', icon: LayoutDashboard, path: '/katilimci' },
  { key: 'trainings', label: 'Eğitimler', icon: BookOpen, path: '/katilimci/egitimler' },
  { key: 'profile', label: 'Profil', icon: UserRound, path: '/katilimci/profil' },
]

export function ParticipantLayout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useParticipantAuth()
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)

  const activeKey = navItems.find((item) =>
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
      {/* Sidebar — sol tarafta şık dikey navigasyon */}
      <aside className="fixed inset-y-0 left-0 z-40 flex w-[76px] flex-col items-center border-r border-ink-200/70 bg-white/95 py-5 backdrop-blur sm:w-[88px]">
        {/* Logo */}
        <div className="mb-7 flex flex-col items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-brand-600 text-white shadow-sm shadow-brand-600/20 sm:h-11 sm:w-11">
            <HardHat className="h-5 w-5" strokeWidth={1.8} />
          </span>
        </div>

        {/* Navigasyon */}
        <nav className="flex flex-1 flex-col items-center gap-2.5" aria-label="Katılımcı navigasyon">
          {navItems.map((item) => {
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
                {/* Tooltip */}
                <span
                  className={cn(
                    'pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-ink-900 px-2.5 py-1.5 text-[11px] font-semibold text-white opacity-0 transition-all duration-200',
                    (isHovered || isActive) && 'opacity-100',
                  )}
                >
                  {item.label}
                  <span className="absolute right-full top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1 rotate-45 bg-ink-900" />
                </span>

                {/* Aktif arka plan (layout animasyonu) */}
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active-bg"
                    className="absolute inset-0 rounded-2xl bg-brand-50"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Aktif sol çizgi */}
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active-bar"
                    className="absolute -left-2 top-1/2 h-7 w-1 -translate-y-1/2 rounded-full bg-brand-600 sm:-left-3"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                <motion.span
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className={cn(
                    'relative grid h-11 w-11 place-items-center rounded-2xl transition-colors sm:h-12 sm:w-12',
                    isActive
                      ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/25'
                      : 'text-ink-400 hover:bg-ink-100 hover:text-ink-700',
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </motion.span>
              </button>
            )
          })}
        </nav>

        {/* Ayraç */}
        <span className="my-4 h-px w-9 bg-ink-200" aria-hidden />

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
              'pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-ink-900 px-2.5 py-1.5 text-[11px] font-semibold text-white opacity-0 transition-all duration-200',
              hoveredKey === 'logout' && 'opacity-100',
            )}
          >
            Çıkış
            <span className="absolute right-full top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1 rotate-45 bg-ink-900" />
          </span>
          <motion.span
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="grid h-11 w-11 place-items-center rounded-2xl text-ink-400 transition-colors hover:bg-rose-50 hover:text-rose-600 sm:h-12 sm:w-12"
          >
            <LogOut className="h-5 w-5" strokeWidth={1.8} />
          </motion.span>
        </button>
      </aside>

      {/* İçerik — sidebar genişliği kadar sola kaydırılmış */}
      <div className="pl-[76px] sm:pl-[88px]">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-ink-200/70 bg-white/95 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-10">
            <div className="flex items-center gap-3">
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
        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-12">
          {children}
        </main>
      </div>
    </div>
  )
}
