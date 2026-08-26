import { motion } from 'framer-motion'
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  GraduationCap,
  HardHat,
  LogOut,
  PlayCircle,
  TrendingUp,
  UserRound,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useParticipantAuth } from '../ParticipantAuthContext'

type TrainingStatusKey = 'not_started' | 'in_progress' | 'successful' | 'failed'

const trainingStatusConfig: Record<TrainingStatusKey, { label: string; color: string; dot: string }> = {
  not_started: { label: 'Başlamadı', color: 'bg-ink-100 text-ink-600', dot: 'bg-ink-400' },
  in_progress: { label: 'Devam ediyor', color: 'bg-sky-50 text-sky-700', dot: 'bg-sky-500' },
  successful: { label: 'Tamamlandı', color: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500' },
  failed: { label: 'Başarısız', color: 'bg-rose-50 text-rose-700', dot: 'bg-rose-500' },
}

const mockTrainings = [
  { id: 1, title: 'İSG Temel Eğitimi', duration: '120 dk', status: 'successful' as const, date: '12.01.2026', score: 92 },
  { id: 2, title: 'Yangın Güvenliği ve Tahliye', duration: '90 dk', status: 'successful' as const, date: '18.01.2026', score: 88 },
  { id: 3, title: 'İlk Yardım Eğitimi', duration: '60 dk', status: 'in_progress' as const, date: '—', score: null },
  { id: 4, title: 'Elektrik Güvenliği', duration: '75 dk', status: 'not_started' as const, date: '—', score: null },
  { id: 5, title: 'Yüksekte Çalışma Eğitimi', duration: '100 dk', status: 'not_started' as const, date: '—', score: null },
]

export function ParticipantDashboardPage() {
  const navigate = useNavigate()
  const { user, logout } = useParticipantAuth()

  if (!user) {
    navigate('/katilimci/giris', { replace: true })
    return null
  }

  const statusInfo = trainingStatusConfig[user.trainingStatus as TrainingStatusKey] ?? trainingStatusConfig.not_started
  const completedTrainings = mockTrainings.filter((t) => t.status === 'successful').length
  const totalTrainings = mockTrainings.length
  const completionRate = Math.round((completedTrainings / totalTrainings) * 100)

  function handleLogout() {
    logout()
    toast.info('Oturum kapatıldı', { description: 'Güvenle çıkış yaptınız.' })
    navigate('/katilimci/giris', { replace: true })
  }

  function handleStartTraining(title: string) {
    toast.info('Eğitim başlatılıyor', { description: `${title} yakında hazır olacak.` })
  }

  const stats = [
    { label: 'Tamamlanan eğitim', value: String(completedTrainings), icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Devam eden', value: String(mockTrainings.filter((t) => t.status === 'in_progress').length), icon: PlayCircle, color: 'text-sky-600 bg-sky-50' },
    { label: 'Toplam süre', value: `${user.trainingMinutes} dk`, icon: Clock, color: 'text-violet-600 bg-violet-50' },
    { label: 'İlerleme', value: `%${user.progress}`, icon: TrendingUp, color: 'text-brand-600 bg-brand-50' },
  ]

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-ink-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-ink-200/70 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6 lg:px-10">
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

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-3 sm:flex">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">
                {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </span>
              <div className="leading-none">
                <p className="text-sm font-semibold text-ink-800">{user.name}</p>
                <p className="mt-0.5 text-[11px] text-ink-400">{user.company}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl border border-ink-200 px-3 py-2 text-xs font-semibold text-ink-600 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.8} />
              <span className="hidden sm:inline">Çıkış</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8 lg:px-10 lg:py-12">
        {/* Karşılama */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-8"
        >
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-ink-400">
            <UserRound className="h-3.5 w-3.5" />
            <span>{user.department}</span>
            <span>·</span>
            <span>{user.riskLevel}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[30px]">
            Hoş geldiniz, {user.name.split(' ')[0]}
          </h1>
          <p className="mt-1.5 text-sm text-ink-500">
            İSG eğitimlerinizi buradan takip edebilir ve tamamlayabilirsiniz.
          </p>
        </motion.div>

        {/* İstatistik kartları */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]"
            >
              <div className="flex items-center justify-between">
                <span className={cn('grid h-10 w-10 place-items-center rounded-xl', stat.color)}>
                  <stat.icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <span className="text-2xl font-bold tracking-[-0.03em] text-ink-900">{stat.value}</span>
              </div>
              <p className="mt-3 text-xs font-medium text-ink-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* İlerleme çubuğu */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="mb-8 rounded-2xl border border-ink-200/80 bg-white p-6 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-700">
                <GraduationCap className="h-[18px] w-[18px]" strokeWidth={1.8} />
              </span>
              <div>
                <h2 className="text-sm font-semibold text-ink-900">Eğitim ilerlemeniz</h2>
                <p className="mt-0.5 text-xs text-ink-400">{completedTrainings} / {totalTrainings} eğitim tamamlandı</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-brand-600">%{completionRate}</span>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-ink-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionRate}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600"
            />
          </div>
        </motion.section>

        {/* Eğitim listesi */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="rounded-2xl border border-ink-200/80 bg-white shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]"
        >
          <div className="flex items-center justify-between border-b border-ink-100 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-50 text-violet-700">
                <BookOpen className="h-[18px] w-[18px]" strokeWidth={1.8} />
              </span>
              <div>
                <h2 className="text-sm font-semibold text-ink-900">Eğitimlerim</h2>
                <p className="mt-0.5 text-xs text-ink-400">Atanan eğitimleri tamamlayın</p>
              </div>
            </div>
            <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold', statusInfo.color)}>
              <span className={cn('h-1.5 w-1.5 rounded-full', statusInfo.dot)} />
              {statusInfo.label}
            </span>
          </div>

          <div className="divide-y divide-ink-100">
            {mockTrainings.map((training, index) => {
              const tStatus = trainingStatusConfig[training.status]
              return (
                <motion.div
                  key={training.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                  className="flex items-center gap-4 p-5 transition-colors hover:bg-ink-50/40 sm:p-6"
                >
                  <span className={cn('grid h-11 w-11 shrink-0 place-items-center rounded-xl', tStatus.color)}>
                    {training.status === 'successful' ? (
                      <CheckCircle2 className="h-5 w-5" strokeWidth={1.8} />
                    ) : training.status === 'in_progress' ? (
                      <PlayCircle className="h-5 w-5" strokeWidth={1.8} />
                    ) : (
                      <BookOpen className="h-5 w-5" strokeWidth={1.8} />
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink-800">{training.title}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-ink-400">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {training.duration}
                      </span>
                      {training.date !== '—' && (
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="h-3.5 w-3.5" /> {training.date}
                        </span>
                      )}
                      {training.score !== null && (
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                          <TrendingUp className="h-3.5 w-3.5" /> {training.score} puan
                        </span>
                      )}
                    </div>
                  </div>

                  <span className={cn('hidden shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold sm:inline-flex', tStatus.color)}>
                    <span className={cn('h-1.5 w-1.5 rounded-full', tStatus.dot)} />
                    {tStatus.label}
                  </span>

                  {training.status !== 'successful' && (
                    <Button
                      size="sm"
                      variant={training.status === 'in_progress' ? 'primary' : 'outline'}
                      onClick={() => handleStartTraining(training.title)}
                      leftIcon={<PlayCircle className="h-4 w-4" />}
                    >
                      {training.status === 'in_progress' ? 'Devam et' : 'Başlat'}
                    </Button>
                  )}
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Alt bilgi */}
        <p className="mt-8 text-center text-[11px] leading-5 text-ink-400">
          Son giriş: {user.lastLogin} · HanTech İSG Yönetim Sistemi
        </p>
      </main>
    </div>
  )
}
