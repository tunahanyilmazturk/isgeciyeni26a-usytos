import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Database,
  FileText,
  HardHat,
  Info,
  Scale,
  ShieldCheck,
  Target,
  Users,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useParticipantAuth } from '../ParticipantAuthContext'
import { KVKK_INTRO, KVKK_SECTIONS, KVKK_LEGAL_REFERENCE, type KvkkSection } from '../data/kvkk'

const SECTION_ICONS: Record<KvkkSection['icon'], typeof Info> = {
  info: Info,
  target: Target,
  share: Users,
  storage: Database,
  rights: ShieldCheck,
  shield: Building2,
  scale: Scale,
}

const SECTION_COLORS: Record<KvkkSection['icon'], string> = {
  info: 'bg-sky-50 text-sky-600 ring-sky-200',
  target: 'bg-violet-50 text-violet-600 ring-violet-200',
  share: 'bg-amber-50 text-amber-600 ring-amber-200',
  storage: 'bg-emerald-50 text-emerald-600 ring-emerald-200',
  rights: 'bg-brand-50 text-brand-600 ring-brand-200',
  shield: 'bg-indigo-50 text-indigo-600 ring-indigo-200',
  scale: 'bg-rose-50 text-rose-600 ring-rose-200',
}

export function KvkkApprovalPage() {
  const navigate = useNavigate()
  const { user, approveKvkk, logout } = useParticipantAuth()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    if (!user) navigate('/katilimci/giris', { replace: true })
  }, [user, navigate])

  function handleScroll() {
    const el = scrollRef.current
    if (!el) return
    const maxScroll = el.scrollHeight - el.clientHeight
    const progress = maxScroll > 0 ? Math.min(100, Math.round((el.scrollTop / maxScroll) * 100)) : 100
    setScrollProgress(progress)
    const isAtBottom = maxScroll - el.scrollTop < 8
    if (isAtBottom && !hasScrolledToEnd) setHasScrolledToEnd(true)
  }

  // Aktif bölümü scroll pozisyonuna göre belirle
  function updateActiveSection() {
    const el = scrollRef.current
    if (!el) return
    const sectionEls = el.querySelectorAll('[data-section-id]')
    let current: string | null = null
    sectionEls.forEach((sectionEl) => {
      const rect = sectionEl.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      if (rect.top <= elRect.top + 80 && rect.bottom > elRect.top + 80) {
        current = sectionEl.getAttribute('data-section-id')
      }
    })
    setActiveSection(current)
  }

  function scrollToSection(id: string) {
    const el = scrollRef.current
    if (!el) return
    const target = el.querySelector(`[data-section-id="${id}"]`)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  function handleApprove() {
    if (!hasScrolledToEnd) {
      toast.error('Metni okuyun', {
        description: 'KVKK metnini sonuna kadar kaydırarak okuduğunuzu onaylayın.',
      })
      return
    }
    if (!accepted) {
      toast.error('Onay gerekli', {
        description: 'KVKK aydınlatma metnini kabul ettiğinizi işaretleyin.',
      })
      return
    }
    approveKvkk()
    toast.success('KVKK onayı tamam', {
      description: 'Eğitim panelinize yönlendiriliyorsunuz…',
    })
    navigate('/katilimci')
  }

  function handleReject() {
    logout()
    toast.info('Oturum kapatıldı', {
      description: 'KVKK metnini kabul etmediğiniz için giriş yapılamadı.',
    })
    navigate('/katilimci/giris', { replace: true })
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-ink-50 via-white to-brand-50/30 text-ink-900">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-ink-200/70 bg-white/80 backdrop-blur-md">
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
            <div className="hidden items-center gap-2 rounded-full bg-ink-50 px-3 py-1.5 sm:flex">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-100 text-[10px] font-bold text-brand-700">
                {user.name.charAt(0).toLocaleUpperCase('tr-TR')}
              </span>
              <span className="text-xs font-semibold text-ink-700">{user.name}</span>
            </div>
            <button
              type="button"
              onClick={handleReject}
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 transition-colors hover:text-rose-600"
            >
              <X className="h-4 w-4" strokeWidth={1.8} />
              <span className="hidden sm:inline">Oturumu kapat</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {/* Hero başlık */}
          <div className="mb-6 overflow-hidden rounded-3xl border border-ink-200/80 bg-white shadow-[0_8px_30px_-16px_rgba(17,24,39,0.18)] sm:mb-8">
            <div className="relative bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 px-5 py-7 text-white sm:px-8 sm:py-9">
              {/* Dekoratif arka plan */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
                <ShieldCheck className="absolute -right-4 -top-4 h-32 w-32" strokeWidth={1} />
                <FileText className="absolute -bottom-6 right-20 h-24 w-24" strokeWidth={1} />
              </div>
              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur-sm sm:h-14 sm:w-14">
                    <ShieldCheck className="h-7 w-7" strokeWidth={1.6} />
                  </span>
                  <div>
                    <div className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
                      Yasal bilgilendirme
                    </div>
                    <h1 className="text-xl font-bold tracking-[-0.035em] sm:text-2xl">
                      {KVKK_INTRO.title}
                    </h1>
                    <p className="mt-1 text-sm text-brand-100/80">{KVKK_INTRO.subtitle}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2 rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15 backdrop-blur-sm">
                  <Clock className="h-4 w-4 text-brand-200" strokeWidth={1.8} />
                  <div className="text-xs">
                    <p className="font-semibold text-white">~2 dakika</p>
                    <p className="text-brand-200/80">okuma süresi</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-5 py-4 sm:px-8 sm:py-5">
              <p className="text-sm leading-7 text-ink-600">
                Merhaba <span className="font-semibold text-ink-900">{user.name}</span>, {KVKK_INTRO.summary}
              </p>
            </div>
          </div>

          {/* İçerik: TOC + metin */}
          <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
            {/* İçindekiler (sidebar) */}
            <aside className="hidden lg:block">
              <div className="sticky top-[88px] space-y-1 rounded-2xl border border-ink-200/80 bg-white p-4 shadow-[0_4px_20px_-12px_rgba(17,24,39,0.15)]">
                <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-wider text-ink-400">
                  İçindekiler
                </p>
                {KVKK_SECTIONS.map((section, idx) => {
                  const Icon = SECTION_ICONS[section.icon]
                  const isActive = activeSection === section.id
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => scrollToSection(section.id)}
                      className={cn(
                        'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs font-medium transition-colors',
                        isActive
                          ? 'bg-brand-50 text-brand-700'
                          : 'text-ink-500 hover:bg-ink-50 hover:text-ink-700',
                      )}
                    >
                      <Icon className={cn('h-3.5 w-3.5 shrink-0', isActive ? 'text-brand-600' : 'text-ink-400')} strokeWidth={2} />
                      <span className="flex-1 truncate">{section.title}</span>
                      <span className={cn('text-[9px] font-bold tabular-nums', isActive ? 'text-brand-400' : 'text-ink-300')}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </button>
                  )
                })}

                {/* Scroll ilerleme göstergesi */}
                <div className="mt-4 border-t border-ink-100 pt-4">
                  <div className="mb-1.5 flex items-center justify-between px-2 text-[10px] font-semibold">
                    <span className="text-ink-400">Okuma ilerlemesi</span>
                    <span className={cn(hasScrolledToEnd ? 'text-emerald-600' : 'text-ink-500')}>{scrollProgress}%</span>
                  </div>
                  <div className="mx-2 h-1.5 overflow-hidden rounded-full bg-ink-100">
                    <motion.div
                      className={cn('h-full rounded-full', hasScrolledToEnd ? 'bg-emerald-500' : 'bg-brand-500')}
                      animate={{ width: `${scrollProgress}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  {hasScrolledToEnd && (
                    <p className="mt-2 flex items-center gap-1.5 px-2 text-[10px] font-semibold text-emerald-600">
                      <CheckCircle2 className="h-3 w-3" strokeWidth={2} /> Metin okundu
                    </p>
                  )}
                </div>
              </div>
            </aside>

            {/* Metin alanı */}
            <div className="relative overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-[0_8px_30px_-16px_rgba(17,24,39,0.18)]">
              {/* Üst bar — scroll durumu */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink-100 bg-ink-50/40 px-4 py-3 sm:px-6 sm:py-3.5">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-ink-500" strokeWidth={1.8} />
                  <span className="text-xs font-semibold text-ink-700 sm:text-sm">6698 sayılı KVKK Aydınlatma Metni</span>
                </div>
                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors',
                    hasScrolledToEnd ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700',
                  )}
                >
                  <span className={cn('h-1.5 w-1.5 rounded-full', hasScrolledToEnd ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse')} />
                  {hasScrolledToEnd ? 'Okundu' : 'Okunuyor…'}
                </span>
              </div>

              {/* Scroll ilerleme barı (üst) */}
              <div className="h-0.5 bg-ink-100">
                <motion.div
                  className={cn('h-full', hasScrolledToEnd ? 'bg-emerald-500' : 'bg-brand-500')}
                  animate={{ width: `${scrollProgress}%` }}
                  transition={{ duration: 0.15 }}
                />
              </div>

              {/* Scrollable içerik */}
              <div
                ref={scrollRef}
                onScroll={() => { handleScroll(); updateActiveSection() }}
                className="h-[58vh] min-h-[320px] overflow-y-auto overscroll-contain px-4 py-5 sm:px-8 sm:py-7"
              >
                <div className="space-y-8">
                  {KVKK_SECTIONS.map((section, idx) => {
                    const Icon = SECTION_ICONS[section.icon]
                    return (
                      <section
                        key={section.id}
                        data-section-id={section.id}
                        className="scroll-mt-4"
                      >
                        <div className="mb-3 flex items-center gap-3">
                          <span className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-xl ring-1', SECTION_COLORS[section.icon])}>
                            <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold tabular-nums text-ink-300">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <h2 className="text-sm font-bold tracking-tight text-ink-900 sm:text-base">
                              {section.title}
                            </h2>
                          </div>
                        </div>
                        <div className="space-y-2.5 pl-1 sm:pl-12">
                          {section.paragraphs.map((para, pIdx) => (
                            <p key={pIdx} className="text-[13px] leading-7 text-ink-600 sm:text-sm">
                              {para}
                            </p>
                          ))}
                          {section.list && (
                            <ul className="mt-2 space-y-2">
                              {section.list.map((item, lIdx) => (
                                <li key={lIdx} className="flex items-start gap-2.5 text-[13px] leading-6 text-ink-600 sm:text-sm">
                                  <span className={cn('mt-2 h-1.5 w-1.5 shrink-0 rounded-full', SECTION_COLORS[section.icon].split(' ')[1].replace('text-', 'bg-'))} />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </section>
                    )
                  })}
                </div>

                {/* Alt boşluk */}
                <div className="h-4" />
              </div>

              {/* Scroll uyarısı */}
              <AnimatePresence>
                {!hasScrolledToEnd && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center justify-center gap-2 border-t border-amber-100 bg-amber-50/60 px-6 py-2.5 text-[11px] font-medium text-amber-700"
                  >
                    <ChevronDown className="h-3.5 w-3.5 animate-bounce" strokeWidth={2} />
                    Metni sonuna kadar kaydırarak okuduğunuzu onaylayın
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Onay kartı */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className={cn(
              'mt-6 overflow-hidden rounded-2xl border-2 transition-colors sm:mt-8',
              hasScrolledToEnd
                ? accepted
                  ? 'border-brand-300 bg-brand-50/40'
                  : 'border-ink-200 bg-white'
                : 'border-ink-200 bg-white opacity-70',
            )}
          >
            <label
              className={cn(
                'flex items-start gap-4 p-5 sm:p-6',
                hasScrolledToEnd ? 'cursor-pointer' : 'cursor-not-allowed',
              )}
            >
              <div className="relative mt-0.5 shrink-0">
                <input
                  type="checkbox"
                  disabled={!hasScrolledToEnd}
                  checked={accepted}
                  onChange={(event) => setAccepted(event.target.checked)}
                  className="peer sr-only"
                />
                <div className={cn(
                  'grid h-6 w-6 place-items-center rounded-lg border-2 transition-all',
                  accepted
                    ? 'border-brand-600 bg-brand-600 text-white'
                    : hasScrolledToEnd
                      ? 'border-ink-300 bg-white peer-hover:border-brand-400'
                      : 'border-ink-200 bg-ink-50',
                )}>
                  {accepted && <Check className="h-4 w-4" strokeWidth={3} />}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-ink-900 sm:text-base">
                  KVKK Aydınlatma Metni'ni okudum, anladım ve kabul ediyorum.
                </p>
                <p className="mt-1 text-xs leading-5 text-ink-500 sm:text-[13px]">
                  Kişisel verilerimin yukarıda belirtilen amaçlar kapsamında işlenmesini, saklanmasını ve gerekli hallerde aktarılmasını onaylıyorum.
                </p>
              </div>
              {accepted && hasScrolledToEnd && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <CheckCircle2 className="h-6 w-6 text-brand-600" strokeWidth={1.8} />
                </motion.div>
              )}
            </label>
          </motion.div>

          {/* Aksiyon butonları */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              onClick={handleReject}
              leftIcon={<X className="h-4 w-4" />}
            >
              Reddet ve çık
            </Button>
            <Button
              size="lg"
              className="w-full sm:w-auto"
              onClick={handleApprove}
              disabled={!hasScrolledToEnd || !accepted}
              rightIcon={hasScrolledToEnd && accepted ? <ArrowRight className="h-4 w-4" /> : undefined}
            >
              Onayla ve devam et
            </Button>
          </div>

          {/* Yasal alt bilgi */}
          <div className="mt-6 flex items-start gap-2.5 rounded-xl bg-ink-50/60 p-4 sm:mt-8">
            <Scale className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" strokeWidth={1.8} />
            <p className="text-[11px] leading-5 text-ink-500">
              {KVKK_LEGAL_REFERENCE}
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
