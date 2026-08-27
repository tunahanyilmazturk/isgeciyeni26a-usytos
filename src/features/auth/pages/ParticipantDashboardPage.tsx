import { motion } from 'framer-motion'
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  GraduationCap,
  PlayCircle,
  TrendingUp,
  UserRound,
  ArrowRight,
} from 'lucide-react'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useParticipantAuth } from '../ParticipantAuthContext'
import { trainingCatalog } from '@/features/trainings/data/trainings'
import { readAssignments } from '@/features/assignments/data/assignments'

type TrainingStatusKey = 'not_started' | 'in_progress' | 'successful' | 'failed'

const trainingStatusConfig: Record<TrainingStatusKey, { label: string; color: string; dot: string }> = {
  not_started: { label: 'Başlamadı', color: 'bg-ink-100 text-ink-600', dot: 'bg-ink-400' },
  in_progress: { label: 'Devam ediyor', color: 'bg-sky-50 text-sky-700', dot: 'bg-sky-500' },
  successful: { label: 'Tamamlandı', color: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500' },
  failed: { label: 'Başarısız', color: 'bg-rose-50 text-rose-700', dot: 'bg-rose-500' },
}

export function ParticipantDashboardPage() {
  const navigate = useNavigate()
  const { user } = useParticipantAuth()

  const assignedTrainings = useMemo(() => {
    if (!user) return []
    const assignedTrainingIds = new Set(
      readAssignments()
        .filter((assignment) => assignment.participantId === user.id)
        .map((assignment) => assignment.trainingId),
    )
    return trainingCatalog.filter((training) => assignedTrainingIds.has(training.id))
  }, [user])

  if (!user) return null

  const userStatus = user.trainingStatus as TrainingStatusKey
  const statusInfo = trainingStatusConfig[userStatus] ?? trainingStatusConfig.not_started
  const completedTrainings = userStatus === 'successful' ? 1 : 0
  const inProgressTrainings = userStatus === 'in_progress' ? 1 : 0
  const totalTrainings = assignedTrainings.length
  const completionRate = totalTrainings > 0 ? Math.round((completedTrainings / totalTrainings) * 100) : 0

  const stats = [
    { label: 'Atanan eğitim', value: String(totalTrainings), icon: BookOpen, color: 'text-brand-600 bg-brand-50' },
    { label: 'Tamamlanan', value: String(completedTrainings), icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Devam eden', value: String(inProgressTrainings), icon: PlayCircle, color: 'text-sky-600 bg-sky-50' },
    { label: 'Toplam süre', value: `${user.trainingMinutes} dk`, icon: Clock, color: 'text-violet-600 bg-violet-50' },
  ]

  // İlk 3 eğitim önizleme
  const previewTrainings = assignedTrainings.slice(0, 3)

  return (
    <div className="space-y-7">
      {/* Karşılama */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-ink-400">
          <UserRound className="h-3.5 w-3.5" />
          <span>{user.department}</span>
          <span>·</span>
          <span>{user.riskLevel}</span>
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" />
            Son giriş: {user.lastLogin}
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[30px]">
          Hoş geldiniz, {user.name.split(' ')[0]}
        </h1>
        <p className="mt-1.5 text-sm text-ink-500">
          Size atanan İSG eğitimlerini tamamlayarak güvenli çalışma kültürüne katkıda bulunabilirsiniz.
        </p>
      </motion.div>

      {/* İstatistik kartları */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        className="rounded-2xl border border-ink-200/80 bg-white p-6 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-700">
              <GraduationCap className="h-[18px] w-[18px]" strokeWidth={1.8} />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-ink-900">Eğitim ilerlemeniz</h2>
              <p className="mt-0.5 text-xs text-ink-400">{completedTrainings} / {totalTrainings} eğitim tamamlandı</p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold', statusInfo.color)}>
              <span className={cn('h-1.5 w-1.5 rounded-full', statusInfo.dot)} />
              {statusInfo.label}
            </span>
            <span className="text-2xl font-bold text-brand-600">%{completionRate}</span>
          </div>
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

      {/* Eğitim önizleme — ilk 3 eğitim */}
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
              <h2 className="text-sm font-semibold text-ink-900">Eğitimleriniz</h2>
              <p className="mt-0.5 text-xs text-ink-400">{user.riskLevel} risk sınıfına uygun {totalTrainings} eğitim</p>
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={() => navigate('/katilimci/egitimler')} rightIcon={<ArrowRight className="h-4 w-4" />}>
            Tümü
          </Button>
        </div>

        {previewTrainings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink-50 text-ink-300">
              <BookOpen className="h-6 w-6" strokeWidth={1.5} />
            </span>
            <p className="mt-4 text-sm font-semibold text-ink-700">Atanan eğitim bulunamadı</p>
            <p className="mt-1 text-xs text-ink-400">Henüz hesabınıza atanmış bir eğitim bulunmuyor.</p>
          </div>
        ) : (
          <div className="divide-y divide-ink-100">
            {previewTrainings.map((training, index) => {
              const trainingStatus = index === 0 ? userStatus : 'not_started'
              const tStatus = trainingStatusConfig[trainingStatus]
              const topicCount = training.chapters.reduce((sum, ch) => sum + ch.topics.length, 0)

              return (
                <motion.div
                  key={training.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                >
                  <div className="flex flex-wrap items-center gap-3 p-4 transition-colors hover:bg-ink-50/40 sm:flex-nowrap sm:gap-4 sm:p-6">
                    <span className={cn('grid h-11 w-11 shrink-0 place-items-center rounded-xl', tStatus.color)}>
                      {trainingStatus === 'successful' ? (
                        <CheckCircle2 className="h-5 w-5" strokeWidth={1.8} />
                      ) : trainingStatus === 'in_progress' ? (
                        <PlayCircle className="h-5 w-5" strokeWidth={1.8} />
                      ) : (
                        <BookOpen className="h-5 w-5" strokeWidth={1.8} />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink-800">{training.name}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-ink-400">
                        <span className="inline-flex items-center gap-1">
                          <TrendingUp className="h-3.5 w-3.5" /> {topicCount} konu
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-ink-50 px-2 py-0.5 font-medium text-ink-500">
                          {training.package}
                        </span>
                      </div>
                    </div>
                    <span className={cn('hidden shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold sm:inline-flex', tStatus.color)}>
                      <span className={cn('h-1.5 w-1.5 rounded-full', tStatus.dot)} />
                      {tStatus.label}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </motion.section>
    </div>
  )
}
