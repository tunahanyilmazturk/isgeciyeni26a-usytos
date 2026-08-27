import { motion } from 'framer-motion'
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  PlayCircle,
  TrendingUp,
  XCircle,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
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

export function ParticipantTrainingsPage() {
  const { user } = useParticipantAuth()
  const [expandedTraining, setExpandedTraining] = useState<string | null>(null)

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

  function handleStartTraining(trainingName: string) {
    toast.info('Eğitim başlatılıyor', { description: `${trainingName} yakında hazır olacak.` })
  }

  function toggleTraining(trainingId: string) {
    setExpandedTraining((current) => (current === trainingId ? null : trainingId))
  }

  return (
    <div className="space-y-7">
      {/* Başlık */}
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
          {user.riskLevel} risk sınıfına uygun olarak size atanan tüm eğitimler. Eğitimleri tamamlayarak sertifikanızı alabilirsiniz.
        </p>
      </motion.div>

      {/* Eğitim listesi */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="rounded-2xl border border-ink-200/80 bg-white shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]"
      >
        {assignedTrainings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink-50 text-ink-300">
              <BookOpen className="h-6 w-6" strokeWidth={1.5} />
            </span>
            <p className="mt-4 text-sm font-semibold text-ink-700">Atanan eğitim bulunamadı</p>
            <p className="mt-1 text-xs text-ink-400">Henüz hesabınıza atanmış bir eğitim bulunmuyor.</p>
          </div>
        ) : (
          <div className="divide-y divide-ink-100">
            {assignedTrainings.map((training, index) => {
              const trainingStatus = index === 0 ? userStatus : 'not_started'
              const tStatus = trainingStatusConfig[trainingStatus]
              const isExpanded = expandedTraining === training.id
              const topicCount = training.chapters.reduce((sum, ch) => sum + ch.topics.length, 0)
              const chapterCount = training.chapters.length

              return (
                <motion.div
                  key={training.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="flex flex-wrap items-center gap-3 p-4 transition-colors hover:bg-ink-50/40 sm:flex-nowrap sm:gap-4 sm:p-6">
                    <span className={cn('grid h-11 w-11 shrink-0 place-items-center rounded-xl', tStatus.color)}>
                      {trainingStatus === 'successful' ? (
                        <CheckCircle2 className="h-5 w-5" strokeWidth={1.8} />
                      ) : trainingStatus === 'in_progress' ? (
                        <PlayCircle className="h-5 w-5" strokeWidth={1.8} />
                      ) : trainingStatus === 'failed' ? (
                        <XCircle className="h-5 w-5" strokeWidth={1.8} />
                      ) : (
                        <BookOpen className="h-5 w-5" strokeWidth={1.8} />
                      )}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink-800">{training.name}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-ink-400">
                        <span className="inline-flex items-center gap-1">
                          <BookOpen className="h-3.5 w-3.5" /> {chapterCount} bölüm
                        </span>
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

                    <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
                      {trainingStatus !== 'successful' && (
                        <Button
                          size="sm"
                          variant={trainingStatus === 'in_progress' ? 'primary' : 'outline'}
                          onClick={() => handleStartTraining(training.name)}
                          leftIcon={<PlayCircle className="h-4 w-4" />}
                        >
                          {trainingStatus === 'in_progress' ? 'Devam et' : 'Başlat'}
                        </Button>
                      )}
                      <button
                        type="button"
                        onClick={() => toggleTraining(training.id)}
                        className="grid h-9 w-9 place-items-center rounded-xl border border-ink-200 text-ink-400 transition-colors hover:bg-ink-50 hover:text-ink-700"
                        aria-label={isExpanded ? 'İçeriği gizle' : 'İçeriği göster'}
                      >
                        {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.25 }}
                      className="border-t border-ink-100 bg-ink-50/30 px-5 py-5 sm:px-6"
                    >
                      <p className="mb-4 text-xs leading-6 text-ink-500">{training.description}</p>
                      <div className="space-y-4">
                        {training.chapters.map((chapter, chIndex) => (
                          <div key={chapter.id} className="rounded-xl border border-ink-200/80 bg-white p-4">
                            <div className="flex items-center gap-2">
                              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-brand-50 text-[11px] font-bold text-brand-700">
                                {chIndex + 1}
                              </span>
                              <h4 className="text-xs font-semibold text-ink-800">{chapter.title}</h4>
                            </div>
                            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                              {chapter.topics.map((topic, tIndex) => (
                                <li key={tIndex} className="flex items-start gap-2 text-[11px] leading-5 text-ink-500">
                                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-400" />
                                  {topic}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      {trainingStatus !== 'successful' && (
                        <div className="mt-4 flex justify-end">
                          <Button
                            size="sm"
                            variant={trainingStatus === 'in_progress' ? 'primary' : 'outline'}
                            onClick={() => handleStartTraining(training.name)}
                            leftIcon={<PlayCircle className="h-4 w-4" />}
                          >
                            {trainingStatus === 'in_progress' ? 'Eğitime devam et' : 'Eğitimi başlat'}
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}
      </motion.section>
    </div>
  )
}
