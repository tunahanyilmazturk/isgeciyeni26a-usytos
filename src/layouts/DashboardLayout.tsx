import { useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  Bell,
  BookOpen,
  Building2,
  ChevronDown,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Gauge,
  HardHat,
  HelpCircle,
  KeyRound,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Menu,
  PlayCircle,
  Search,
  Settings2,
  ShieldCheck,
  UserRound,
  Users,
  Video,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/features/auth'

interface NavigationItem {
  label: string
  to: string
  icon: ReactNode
}

const mainNavigation: NavigationItem[] = [
  { label: 'Gösterge Paneli', to: '/dashboard', icon: <LayoutDashboard /> },
  { label: 'Müşteriler', to: '/dashboard/firmalar', icon: <Building2 /> },
  { label: 'Katılımcılar', to: '/dashboard/katilimcilar', icon: <Users /> },
  { label: 'Eğitim Atamaları', to: '/dashboard/egitim-atamalari', icon: <ClipboardCheck /> },
  { label: 'E-İmza Kuyruğu', to: '/dashboard/imza-kuyrugu', icon: <KeyRound /> },
  { label: 'Canlı Eğitim', to: '/dashboard/canli-egitim', icon: <Video /> },
  { label: 'Raporlar', to: '/dashboard/raporlar', icon: <Gauge /> },
  { label: 'Eğitimler', to: '/dashboard/egitimler', icon: <BookOpen /> },
]

const supportNavigation: NavigationItem[] = [
  { label: 'Kullanım Kılavuzu', to: '/dashboard/destek/kilavuz', icon: <FileText /> },
  { label: 'Kullanım Videosu', to: '/dashboard/destek/video', icon: <PlayCircle /> },
  { label: 'Destek Talebi', to: '/dashboard/destek/talepler', icon: <LifeBuoy /> },
]

const osgbNavigation: NavigationItem[] = [
  { label: 'Firma Bilgileri', to: '/dashboard/osgb-bilgileri/firma-bilgileri', icon: <Building2 /> },
  { label: 'Uzman', to: '/dashboard/osgb-bilgileri/egiticiler', icon: <UserRound /> },
  { label: 'Doktor', to: '/dashboard/osgb-bilgileri/doktorlar', icon: <ShieldCheck /> },
  { label: 'Kullanıcılar', to: '/dashboard/osgb-bilgileri/kullanicilar', icon: <Users /> },
  { label: 'Faturalar', to: '/dashboard/osgb-bilgileri/faturalar', icon: <FileCheck2 /> },
]

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const isDashboard = location.pathname === '/dashboard'

  function closeMobileMenu() {
    setMobileMenuOpen(false)
  }

  function handleLogout() {
    logout()
    navigate('/giris')
  }

  return (
    <div className="min-h-screen bg-[#f7f9f9] text-ink-900">
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Menüyü kapat"
          onClick={closeMobileMenu}
          className="fixed inset-0 z-30 bg-ink-900/20 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-[min(264px,calc(100vw-1rem))] flex-col border-r border-ink-200/80 bg-white transition-transform duration-200 lg:translate-x-0',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-[76px] items-center justify-between border-b border-ink-200/80 px-6">
          <Link to="/dashboard" onClick={closeMobileMenu} className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-brand-600 text-white shadow-sm shadow-brand-600/20">
              <HardHat className="h-[18px] w-[18px]" strokeWidth={1.8} />
            </span>
            <span className="leading-none">
              <span className="block text-[13px] font-bold uppercase tracking-[0.17em] text-ink-900">
                HanTech
              </span>
              <span className="mt-1 block text-[10px] font-medium tracking-wide text-ink-400">
                İSG Yönetim Sistemi
              </span>
            </span>
          </Link>
          <button
            type="button"
            onClick={closeMobileMenu}
            className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100 lg:hidden"
            aria-label="Menüyü kapat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b border-ink-200/80 px-4 py-4">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl border border-ink-200 bg-ink-50/60 p-3 text-left transition-colors hover:border-ink-300 hover:bg-ink-50"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-sm font-bold text-brand-700">
              {user?.company?.[0] ?? 'H'}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-ink-800">{user?.company ?? 'HanTech'}</span>
              <span className="mt-0.5 block truncate text-[11px] text-ink-400">{user?.role ?? 'Kullanıcı'} hesabı</span>
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 text-ink-400" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-ink-400">
            Ana menü
          </p>
          <div className="space-y-1">
            {mainNavigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/dashboard'}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  cn(
                    'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors',
                    isActive
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-ink-500 hover:bg-ink-50 hover:text-ink-800',
                  )
                }
              >
                <span className="[&>svg]:h-[18px] [&>svg]:w-[18px] [&>svg]:stroke-[1.7]">
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </NavLink>
            ))}

            <details
              className="group rounded-xl"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-ink-500 transition-colors hover:bg-ink-50 hover:text-ink-800 [&::-webkit-details-marker]:hidden">
                <span className="flex min-w-0 items-center gap-3">
                  <ClipboardCheck className="h-[18px] w-[18px] shrink-0 stroke-[1.7]" />
                  <span className="truncate">Eğitim Onayları</span>
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 text-ink-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="ml-5 space-y-1 border-l border-ink-200 pl-3 pt-1">
                {[
                  { label: 'Bekleyen Onaylar', to: '/dashboard/egitim-atamalari/onay-kuyrugu' },
                  { label: 'Geçmiş Onaylar', to: '/dashboard/egitim-atamalari/onay-kuyrugu/gecmis' },
                ].map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-lg px-3 py-2 text-xs font-medium transition-colors',
                        isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-500 hover:bg-ink-50 hover:text-ink-800',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </details>
          </div>

          <p className="mb-2 mt-8 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-ink-400">
            Yardım ve yönetim
          </p>
          <div className="space-y-1">
            <details
              className="group rounded-xl"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-ink-500 transition-colors hover:bg-ink-50 hover:text-ink-800 [&::-webkit-details-marker]:hidden">
                <span className="flex min-w-0 items-center gap-3">
                  <HelpCircle className="h-[18px] w-[18px] shrink-0 stroke-[1.7]" />
                  <span className="truncate">Destek</span>
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 text-ink-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="ml-5 space-y-1 border-l border-ink-200 pl-3 pt-1">
                {supportNavigation.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors',
                        isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-500 hover:bg-ink-50 hover:text-ink-800',
                      )
                    }
                  >
                    <span className="[&>svg]:h-3.5 [&>svg]:w-3.5">{item.icon}</span>
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </details>

            <details
              className="group rounded-xl"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-ink-500 transition-colors hover:bg-ink-50 hover:text-ink-800 [&::-webkit-details-marker]:hidden">
                <span className="flex min-w-0 items-center gap-3">
                  <Settings2 className="h-[18px] w-[18px] shrink-0 stroke-[1.7]" />
                  <span className="truncate">OSGB Bilgileri</span>
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 text-ink-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="ml-5 space-y-1 border-l border-ink-200 pl-3 pt-1">
                {osgbNavigation.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors',
                        isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-500 hover:bg-ink-50 hover:text-ink-800',
                      )
                    }
                  >
                    <span className="[&>svg]:h-3.5 [&>svg]:w-3.5">{item.icon}</span>
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </details>
          </div>
        </nav>

        <div className="border-t border-ink-200/80 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-ink-50/70 p-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ink-200 text-xs font-bold text-ink-600">
              {user?.initials ?? 'K'}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-ink-800">{user?.name ?? 'Kullanıcı'}</span>
              <span className="block truncate text-[11px] text-ink-400">{user?.role ?? 'Kullanıcı'}</span>
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg p-1.5 text-ink-400 transition-colors hover:bg-white hover:text-ink-700"
              aria-label="Çıkış yap"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
          <p className="px-1 text-[10px] text-ink-400">HanTech İSG v1.0</p>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-[264px]">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-ink-200/80 bg-white/95 px-3 backdrop-blur sm:h-[76px] sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-xl p-2 text-ink-500 hover:bg-ink-100 lg:hidden"
              aria-label="Menüyü aç"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden items-center gap-2 text-xs text-ink-400 sm:flex">
              <span>Çalışma alanı</span>
              <span>/</span>
              <span className="font-medium text-ink-700">{isDashboard ? 'Genel Bakış' : 'Yönetim'}</span>
            </div>
            <span className="text-sm font-semibold text-ink-900 sm:hidden">Genel Bakış</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="hidden h-9 items-center gap-2 rounded-xl border border-ink-200 bg-ink-50/50 px-3 text-xs text-ink-400 transition-colors hover:border-ink-300 hover:bg-white sm:flex"
            >
              <Search className="h-4 w-4" />
              <span>Ara</span>
              <kbd className="ml-3 rounded-md border border-ink-200 bg-white px-1.5 py-0.5 text-[10px] text-ink-400">⌘ K</kbd>
            </button>
            <button
              type="button"
              className="relative rounded-xl p-2 text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-800"
              aria-label="Bildirimler"
            >
              <Bell className="h-[19px] w-[19px]" strokeWidth={1.7} />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-brand-500 ring-2 ring-white" />
            </button>
            <div className="ml-1 h-7 w-px bg-ink-200" />
            <button type="button" className="flex items-center gap-2 rounded-xl p-1.5 transition-colors hover:bg-ink-50">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-ink-200 text-[11px] font-bold text-ink-600">{user?.initials ?? 'K'}</span>
              <span className="hidden text-left md:block">
                <span className="block text-xs font-semibold text-ink-800">{user?.name ?? 'Kullanıcı'}</span>
                <span className="block text-[10px] text-ink-400">{user?.role ?? 'Kullanıcı'}</span>
              </span>
              <ChevronDown className="hidden h-4 w-4 text-ink-400 md:block" />
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-[1440px] p-3 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
