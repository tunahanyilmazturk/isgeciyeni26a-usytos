import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  FileQuestion,
  Lock,
  PlayCircle,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useParticipantAuth } from '../ParticipantAuthContext'
import { trainingCatalog } from '@/features/trainings/data/trainings'
import {
  flattenTrainingContents,
  getTrainingContents,
} from '@/features/trainings/data/trainingContents'
import {
  getTrainingProgressPercentage,
  readParticipantProgress,
  awardCertificate,
} from '@/features/trainings/data/participantProgress'

export function ParticipantTrainingDetailPage() {
  const navigate = useNavigate()
  const { trainingId } = useParams<{ trainingId: string }>()
  const { user } = useParticipantAuth()
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set())

  const training = useMemo(() => {
    if (!trainingId) return null
    return trainingCatalog.find((t) => t.id === trainingId) ?? null
  }, [trainingId])

  const contents = useMemo(() => {
    if (!training) return []
    return flattenTrainingContents(training.id)
  }, [training])

  const progress = useMemo(() => {
    if (!user) return null
    return readParticipantProgress(user.id)
  }, [user])

  const percentage = useMemo(() => {
    if (!user || !training) return 0
    return getTrainingProgressPercentage(user.id, training.id, contents.map((c) => c.id))
  }, [user, training, contents])

  const hasCertificate = Boolean(progress?.certificates.includes(training?.id ?? ''))

  useEffect(() => {
    if (user && training && percentage === 100 && !hasCertificate) {
      awardCertificate(user.id, training.id)
      toast.success('Tebrikler! Sertifikanız oluşturuldu.', {
        description: 'Eğitimi başarıyla tamamladınız. +100 XP kazandınız.',
      })
    }
  }, [user, training, percentage, hasCertificate])

  const firstIncompleteIndex = useMemo(() => {
    return contents.findIndex((c) => !progress?.contentCompletions[c.id])
  }, [contents, progress])

  function toggleChapter(chapterId: string) {
    setExpandedChapters((prev) => {
      const next = new Set(prev)
      if (next.has(chapterId)) next.delete(chapterId)
      else next.add(chapterId)
      return next
    })
  }

  function getContentStatus(content: (typeof contents)[number], index: number) {
    if (progress?.contentCompletions[content.id]) return 'completed'
    if (index === firstIncompleteIndex || (firstIncompleteIndex === -1 && index === 0)) return 'active'
    if (index < firstIncompleteIndex || firstIncompleteIndex === -1) return 'unlocked'
    return 'locked'
  }

  function handleContentClick(content: (typeof contents)[number], index: number) {
    const status = getContentStatus(content, index)
    if (status === 'locked') {
      toast.error('Bu adım kilitli', {
        description: 'Önceki adımları tamamlamadan bu içeriğe geçemezsiniz.',
      })
      return
    }
    if (!training) return
    navigate(`/katilimci/egitimler/${training.id}/icerik/${content.id}`)
  }

  if (!user || !training) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <p className="text-sm font-semibold text-ink-700">Eğitim bulunamadı</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/katilimci/egitimler')}>
          Eğitimlere dön
        </Button>
      </div>
    )
  }

  const trainingContents = getTrainingContents(training.id)

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <button
          type="button"
          onClick={() => navigate('/katilimci/egitimler')}
          className="mb-3 inline-flex items-center gap-1.5 text-xs font-medium text-ink-500 hover:text-brand-700"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Eğitimlere dön
        </button>

        <h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[30px]">
          {training.name}
        </h1>
        <p className="mt-1.5 text-sm text-ink-500">{training.description}</p>

        <div className="mt-5 w-full max-w-xl">
          <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-ink-500">
            <span>Toplam İlerleme</span>
            <span className="text-brand-700">%{percentage}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-ink-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={cn(
                'h-full rounded-full',
                percentage === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-brand-400 to-brand-600',
              )}
            />
          </div>
        </div>

        {percentage === 100 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-5 flex items-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-600">
              <Award className="h-6 w-6" />
            </span>
            <div>
              <p className="font-bold text-emerald-800">Tebrikler, eğitim tamamlandı!</p>
              <p className="text-xs text-emerald-700">
                Sertifikanız profil sayfanızda görünecek. +100 XP kazandınız.
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Path map */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6"
      >
        <h2 className="mb-5 text-base font-bold text-ink-900">Eğitim Yol Haritası</h2>

        <div className="relative flex flex-col gap-0 sm:flex-row sm:items-start sm:justify-between">
          {trainingContents?.chapters.map((chapter, chIndex) => {
            const chapterContents = chapter.contents
            const completedCount = chapterContents.filter(
              (c) => progress?.contentCompletions[c.id],
            ).length
            const totalCount = chapterContents.length
            const isCompleted = completedCount === totalCount
            const isCurrent = chapterContents.some((c) => {
              const idx = contents.findIndex((item) => item.id === c.id)
              return idx === firstIncompleteIndex
            })

            return (
              <div key={chapter.id} className="relative flex flex-1 items-center sm:flex-col sm:gap-3">
                {/* Connector line */}
                {chIndex < (trainingContents?.chapters.length ?? 0) - 1 && (
                  <div className="absolute left-6 top-8 h-[calc(100%-2rem)] w-0.5 bg-ink-100 sm:left-1/2 sm:top-6 sm:h-0.5 sm:w-full sm:-translate-x-1/2" />
                )}

                <div
                  className={cn(
                    'relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 text-sm font-bold shadow-sm transition-colors',
                    isCompleted
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : isCurrent
                        ? 'border-brand-500 bg-brand-50 text-brand-700'
                        : 'border-ink-200 bg-ink-50 text-ink-400',
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <span>{chIndex + 1}</span>
                  )}
                </div>

                <div className="ml-4 flex-1 pb-8 sm:ml-0 sm:pb-0 sm:text-center">
                  <p
                    className={cn(
                      'text-sm font-semibold',
                      isCompleted ? 'text-emerald-700' : isCurrent ? 'text-brand-700' : 'text-ink-700',
                    )}
                  >
                    {chapter.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-ink-400">
                    {completedCount}/{totalCount} tamamlandı
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Chapters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        className="space-y-3"
      >
        <h2 className="text-base font-bold text-ink-900">Bölümler ve Adımlar</h2>

        {trainingContents?.chapters.map((chapter, chIndex) => {
          const isExpanded = expandedChapters.has(chapter.id)
          const completedCount = chapter.contents.filter(
            (c) => progress?.contentCompletions[c.id],
          ).length

          return (
            <div
              key={chapter.id}
              className="overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]"
            >
              <button
                type="button"
                onClick={() => toggleChapter(chapter.id)}
                className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-ink-50/40"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-xs font-bold text-brand-700">
                    {chIndex + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-ink-900">{chapter.title}</p>
                    <p className="text-[11px] text-ink-400">
                      {completedCount}/{chapter.contents.length} adım tamamlandı
                    </p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-ink-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-ink-400" />
                )}
              </button>

              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.25 }}
                  className="border-t border-ink-100 bg-ink-50/30 px-5 py-4"
                >
                  <div className="space-y-2">
                    {chapter.contents.map((content) => {
                      const contentIndex = contents.findIndex((c) => c.id === content.id)
                      const status = getContentStatus(content, contentIndex)

                      return (
                        <button
                          key={content.id}
                          type="button"
                          onClick={() => handleContentClick(content, contentIndex)}
                          className={cn(
                            'flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all',
                            status === 'completed'
                              ? 'border-emerald-200 bg-emerald-50/30'
                              : status === 'active'
                                ? 'border-brand-300 bg-brand-50/30 ring-1 ring-brand-100'
                                : status === 'unlocked'
                                  ? 'border-ink-200 bg-white hover:border-brand-200'
                                  : 'border-ink-200 bg-ink-50/50 text-ink-400',
                          )}
                        >
                          <span
                            className={cn(
                              'grid h-9 w-9 shrink-0 place-items-center rounded-lg',
                              status === 'completed'
                                ? 'bg-emerald-100 text-emerald-600'
                                : status === 'active'
                                  ? 'bg-brand-100 text-brand-600'
                                  : status === 'unlocked'
                                    ? 'bg-ink-100 text-ink-500'
                                    : 'bg-ink-100 text-ink-400',
                            )}
                          >
                            {status === 'locked' ? (
                              <Lock className="h-4 w-4" />
                            ) : content.type === 'quiz' ? (
                              <FileQuestion className="h-4 w-4" />
                            ) : (
                              <PlayCircle className="h-4 w-4" />
                            )}
                          </span>

                          <div className="min-w-0 flex-1">
                            <p
                              className={cn(
                                'truncate text-sm font-semibold',
                                status === 'locked' ? 'text-ink-400' : 'text-ink-800',
                              )}
                            >
                              {content.title}
                            </p>
                            <p className="text-[11px] text-ink-400">
                              {content.type === 'video'
                                ? `Video · ${content.durationMinutes} dk`
                                : content.type === 'quiz'
                                  ? `Quiz · ${content.quiz?.questions.length ?? 0} soru`
                                  : 'Makale'}
                            </p>
                          </div>

                          {status === 'completed' && (
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                          )}
                          {status === 'active' && (
                            <span className="shrink-0 rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
                              Sıradaki
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
