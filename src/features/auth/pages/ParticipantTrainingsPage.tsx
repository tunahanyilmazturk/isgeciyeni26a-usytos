import { motion } from 'framer-motion'
import {
  Award,
  BookOpen,
  ChevronRight,
  Flame,
  PlayCircle,
  Target,
  TrendingUp,
  Trophy,
} from 'lucide-react'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useParticipantAuth } from '../ParticipantAuthContext'
import { trainingCatalog } from '@/features/trainings/data/trainings'
import { readAssignments } from '@/features/assignments/data/assignments'
import {
  flattenTrainingContents,
  getTrainingContentCount,
  getTrainingContents,
} from '@/features/trainings/data/trainingContents'
import {
  getTrainingProgressPercentage,
  readParticipantProgress,
} from '@/features/trainings/data/participantProgress'

export function ParticipantTrainingsPage() {
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

  const progress = useMemo(() => {
    if (!user) return null
    return readParticipantProgress(user.id)
  }, [user])

  const activeTraining = useMemo(() => {
    if (!user || assignedTrainings.length === 0) return null
    const current = assignedTrainings.find((t) => t.id === progress?.currentTrainingId)
    return current ?? assignedTrainings[0]
  }, [user, assignedTrainings, progress])

  const activeContent = useMemo(() => {
    if (!activeTraining) return null
    const contents = flattenTrainingContents(activeTraining.id)
    return (
      contents.find((c) => c.id === progress?.currentContentId) ??
      contents.find((c) => !progress?.contentCompletions[c.id]) ??
      contents[0]
    )
  }, [activeTraining, progress])

  const activeProgress = useMemo(() => {
    if (!user || !activeTraining) return 0
    const contentIds = flattenTrainingContents(activeTraining.id).map((c) => c.id)
    return getTrainingProgressPercentage(user.id, activeTraining.id, contentIds)
  }, [user, activeTraining])

  if (!user) return null

  function handleStartTraining(trainingId: string) {
    toast.info('Eğitim detay sayfası çok yakında', {
      description: 'Faz 3 ile içerik detayları ve quiz ekranı eklenecek.',
    })
    navigate(`/panel/egitimler/${trainingId}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div className="mb-2 flex items-center gap-2 text-xs font-medium text-ink-400">
          <span>Panel</span>
          <span>/</span>
          <span className="text-ink-600">Eğitimler</span>
        </div>
        <h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[30px]">
          Eğitim Modülleri
        </h1>
        <p className="mt-1.5 text-sm text-ink-500">
          {user.riskLevel} risk sınıfına uygun eğitimler. İlerleme kaydederek kazanma serini devam ettir.
        </p>
      </motion.div>

      {/* Gamification stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <StatCard
          icon={<Trophy className="h-5 w-5 text-amber-500" />}
          label="Toplam XP"
          value={progress?.totalXp ?? 0}
          suffix=" XP"
          tone="amber"
        />
        <StatCard
          icon={<Flame className="h-5 w-5 text-rose-500" />}
          label="Gün Serisi"
          value={progress?.streak ?? 0}
          suffix=" gün"
          tone="rose"
        />
        <StatCard
          icon={<Target className="h-5 w-5 text-sky-500" />}
          label="Günlük Hedef"
          value={Math.min((progress?.streak ?? 0) + 1, 3)}
          suffix=" adım"
          tone="sky"
        />
        <StatCard
          icon={<Award className="h-5 w-5 text-emerald-500" />}
          label="Sertifika"
          value={progress?.certificates.length ?? 0}
          suffix=""
          tone="emerald"
        />
      </motion.div>

      {/* Continue training */}
      {activeTraining && activeContent && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="relative overflow-hidden rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6"
        >
          <div className="absolute right-0 top-0 h-full w-1.5 bg-gradient-to-b from-brand-400 to-brand-600" />
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">Kaldığın yerden devam et</p>
              <h2 className="mt-1 text-lg font-bold text-ink-900">{activeTraining.name}</h2>
              <p className="mt-1 text-sm text-ink-500">
                {activeContent.title} · {activeContent.type === 'video' ? 'Video' : 'Quiz'}
              </p>

              <div className="mt-4 w-full max-w-md">
                <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-ink-500">
                  <span>İlerleme</span>
                  <span className="text-brand-700">%{activeProgress}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-ink-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${activeProgress}%` }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600"
                  />
                </div>
              </div>
            </div>

            <Button
              size="lg"
              leftIcon={<PlayCircle className="h-5 w-5" />}
              onClick={() => handleStartTraining(activeTraining.id)}
              className="shrink-0"
            >
              {activeProgress > 0 ? 'Devam et' : 'Başla'}
            </Button>
          </div>
        </motion.div>
      )}

      {/* Training list */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
      >
        <h2 className="mb-3 text-base font-bold text-ink-900">Atanan Eğitimler</h2>

        {assignedTrainings.length === 0 ? (
          <div className="rounded-2xl border border-ink-200/80 bg-white p-10 text-center shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink-50 text-ink-300">
              <BookOpen className="h-6 w-6" strokeWidth={1.5} />
            </span>
            <p className="mt-4 text-sm font-semibold text-ink-700">Atanan eğitim bulunamadı</p>
            <p className="mt-1 text-xs text-ink-400">Henüz hesabınıza atanmış bir eğitim bulunmuyor.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {assignedTrainings.map((training, index) => {
              const contents = getTrainingContents(training.id)
              const totalContents = contents
                ? contents.chapters.reduce((sum, ch) => sum + ch.contents.length, 0)
                : getTrainingContentCount(training.id)
              const completedContents = contents
                ? contents.chapters
                  .flatMap((ch) => ch.contents)
                  .filter((c) => progress?.contentCompletions[c.id]).length
                : 0
              const percentage = totalContents > 0 ? Math.round((completedContents / totalContents) * 100) : 0
              const isActive = activeTraining?.id === training.id

              return (
                <motion.div
                  key={training.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  className={cn(
                    'group rounded-2xl border bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] transition-all',
                    isActive ? 'border-brand-300 ring-1 ring-brand-100' : 'border-ink-200/80 hover:border-brand-200',
                  )}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-ink-900">{training.name}</h3>
                        {isActive && (
                          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
                            Aktif
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-ink-500">{training.description}</p>

                      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-ink-400">
                        <span className="inline-flex items-center gap-1">
                          <BookOpen className="h-3.5 w-3.5" />
                          {training.chapters.length} bölüm
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <TrendingUp className="h-3.5 w-3.5" />
                          {totalContents} adım
                        </span>
                        <span className="inline-flex items-center gap-1">
                          {completedContents}/{totalContents} tamamlandı
                        </span>
                      </div>

                      <div className="mt-3 w-full max-w-sm">
                        <div className="mb-1 flex items-center justify-between text-[11px] font-medium text-ink-500">
                          <span>İlerleme</span>
                          <span className="text-ink-700">%{percentage}</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-ink-100">
                          <div
                            className={cn(
                              'h-full rounded-full transition-all',
                              percentage === 100 ? 'bg-emerald-500' : 'bg-brand-500',
                            )}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant={isActive ? 'primary' : 'outline'}
                      leftIcon={<ChevronRight className="h-4 w-4" />}
                      onClick={() => handleStartTraining(training.id)}
                      className="shrink-0 self-start sm:self-center"
                    >
                      {percentage === 100 ? 'Tekrar İncele' : percentage > 0 ? 'Devam Et' : 'Başla'}
                    </Button>
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

function StatCard({
  icon,
  label,
  value,
  suffix,
  tone,
}: {
  icon: React.ReactNode
  label: string
  value: number
  suffix: string
  tone: 'amber' | 'rose' | 'sky' | 'emerald'
}) {
  const toneClasses = {
    amber: 'bg-amber-50/60 text-amber-800',
    rose: 'bg-rose-50/60 text-rose-800',
    sky: 'bg-sky-50/60 text-sky-800',
    emerald: 'bg-emerald-50/60 text-emerald-800',
  }

  return (
    <div className={cn('rounded-2xl border border-ink-200/80 p-4 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]', toneClasses[tone])}>
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/70 shadow-sm">{icon}</span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider opacity-80">{label}</p>
          <p className="text-xl font-bold">
            {value}
            <span className="ml-0.5 text-sm font-medium opacity-80">{suffix}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
