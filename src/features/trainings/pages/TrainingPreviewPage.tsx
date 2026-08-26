import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  CirclePlay,
  ClipboardCheck,
  Clock,
  Eye,
  Info,
  ListChecks,
  Lock,
  PlayCircle,
  RotateCcw,
  Send,
  XCircle,
} from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { trainingCatalog } from '../data/trainings'
import { buildTrainingPreview, type QuizQuestion } from '../data/previewData'

type AnswerMap = Record<string, number>
type QuizResult = Record<string, boolean>

export function TrainingPreviewPage() {
  const { trainingId } = useParams<{ trainingId: string }>()
  const navigate = useNavigate()
  const training = trainingCatalog.find((t) => t.id === trainingId) ?? trainingCatalog[0]
  const preview = useMemo(() => buildTrainingPreview(training), [training])

  const [preTestAnswers, setPreTestAnswers] = useState<AnswerMap>({})
  const [preTestSubmitted, setPreTestSubmitted] = useState(false)
  const [preTestResult, setPreTestResult] = useState<QuizResult>({})

  const [topicAnswers, setTopicAnswers] = useState<AnswerMap>({})
  const [topicResults, setTopicResults] = useState<QuizResult>({})
  const [expandedQuizzes, setExpandedQuizzes] = useState<string[]>([])
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  const preTestTotal = preview.preTest.questions.length
  const preTestCorrect = Object.values(preTestResult).filter(Boolean).length
  const preTestScore = preTestSubmitted ? Math.round((preTestCorrect / preTestTotal) * 100) : 0

  const totalSteps = preview.chapters.reduce((sum, ch) => sum + ch.steps.length, 0)
  const completedCount = completedSteps.length
  const progress = Math.round((completedCount / totalSteps) * 100)

  const handlePreTestAnswer = useCallback((questionId: string, optionIndex: number) => {
    setPreTestAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }, [])

  const submitPreTest = useCallback(() => {
    const results: QuizResult = {}
    preview.preTest.questions.forEach((q) => {
      results[q.id] = preTestAnswers[q.id] === q.correctIndex
    })
    setPreTestResult(results)
    setPreTestSubmitted(true)
    const correct = Object.values(results).filter(Boolean).length
    toast.success(`Ön test gönderildi — ${correct}/${preview.preTest.questions.length} doğru`)
  }, [preTestAnswers, preview.preTest.questions])

  const resetPreTest = useCallback(() => {
    setPreTestAnswers({})
    setPreTestResult({})
    setPreTestSubmitted(false)
    toast.info('Önizleme oturumu sıfırlandı')
  }, [])

  const handleTopicAnswer = useCallback((questionId: string, optionIndex: number) => {
    setTopicAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }, [])

  const submitTopicQuiz = useCallback((questions: QuizQuestion[]) => {
    const results: QuizResult = {}
    questions.forEach((q) => {
      results[q.id] = topicAnswers[q.id] === q.correctIndex
    })
    setTopicResults((prev) => ({ ...prev, ...results }))
    const correct = Object.values(results).filter(Boolean).length
    toast.success(`Alıştırma testi gönderildi — ${correct}/${questions.length} doğru`)
  }, [topicAnswers])

  const toggleQuiz = useCallback((key: string) => {
    setExpandedQuizzes((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key])
  }, [])

  const toggleStepComplete = useCallback((stepId: string) => {
    setCompletedSteps((prev) => prev.includes(stepId) ? prev.filter((s) => s !== stepId) : [...prev, stepId])
  }, [])

  const allPreTestAnswered = preview.preTest.questions.every((q) => preTestAnswers[q.id] !== undefined)

  return (
    <div className="space-y-6">
      {/* Üst bar — önizleme modu bildirimi */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-700">
            <Eye className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-amber-900">Katılımcı ekranı önizlemesi</p>
            <p className="mt-0.5 text-xs leading-5 text-amber-700">İlerleme ve test sonuçları yalnızca tarayıcı oturumunda tutulur; katılımcı kaydı veya rapor oluşturulmaz.</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="h-4 w-4" />} onClick={() => navigate('/dashboard/egitimler')}>Eğitim listesi</Button>
          <button type="button" onClick={resetPreTest} className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-3 text-xs font-semibold text-amber-800 transition-colors hover:bg-amber-100">
            <RotateCcw className="h-3.5 w-3.5" /> Sıfırla
          </button>
        </div>
      </motion.div>

      {/* Geri link + ilerleme */}
      <div className="flex items-center justify-between gap-3">
        <button type="button" onClick={() => navigate('/dashboard/egitimler')} className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition-colors hover:text-brand-700">
          <ArrowLeft className="h-4 w-4" /> Eğitim listesine dön
        </button>
        <span className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1.5 text-xs font-semibold text-ink-600">
          <span className="h-2 w-2 rounded-full bg-brand-500" />
          İlerleme: %{progress} · {completedCount} / {totalSteps} adım
        </span>
      </div>

      {/* Eğitim adı banner */}
      <div className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]">
        <div className="flex items-center gap-3">
          <span className={cn('grid h-11 w-11 shrink-0 place-items-center rounded-xl', training.package === 'Temel Paket' ? 'bg-brand-50 text-brand-700' : 'bg-violet-50 text-violet-700')}>
            <ClipboardCheck className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-ink-900">{training.name}</h1>
            <p className="mt-0.5 text-xs text-ink-500">{training.risk} · {training.package}</p>
          </div>
        </div>
      </div>

      {/* Akış bilgisi */}
      <div className="flex items-start gap-3 rounded-2xl border border-brand-100 bg-brand-50/50 p-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
        <p className="text-xs leading-5 text-ink-600">
          Akış sırasıyla ilerler: ana başlıklar ve konular adım adım açılır. Bir adım tamamlanmadan sonraki adıma geçilemez.
          Bu atamada ön test istenmiştir; videolar önce ön testin tanı uygulaması gönderildikten sonra açılır (baraj yok, sertifikaya yazılmaz).
        </p>
      </div>

      {/* Ön test bölümü */}
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-amber-200 bg-amber-50/40 p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-100 text-amber-700">
                <ListChecks className="h-4 w-4" />
              </span>
              <h2 className="text-base font-bold text-ink-900">{preview.preTest.title}</h2>
            </div>
            <p className="mt-2 max-w-2xl text-xs leading-5 text-ink-500">{preview.preTest.description}</p>
          </div>
          {preTestSubmitted && (
            <div className={cn('rounded-xl border px-4 py-2 text-center', preTestScore >= 60 ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50')}>
              <p className="text-2xl font-bold tabular-nums text-ink-900">{preTestScore}%</p>
              <p className="text-[10px] text-ink-500">{preTestCorrect} / {preTestTotal} doğru</p>
            </div>
          )}
        </div>

        {/* Sorular */}
        <div className="mt-5 space-y-3">
          {preview.preTest.questions.map((q, qIdx) => (
            <QuestionCard
              key={q.id}
              question={q}
              index={qIdx}
              selected={preTestAnswers[q.id]}
              result={preTestSubmitted ? preTestResult[q.id] : undefined}
              disabled={preTestSubmitted}
              onSelect={(idx) => handlePreTestAnswer(q.id, idx)}
            />
          ))}
        </div>

        {!preTestSubmitted ? (
          <button
            type="button"
            onClick={submitPreTest}
            disabled={!allPreTestAnswered}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send className="h-4 w-4" /> Ön testi gönder
          </button>
        ) : (
          <div className="mt-5 flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="h-4 w-4" /> Ön test tamamlandı
            </span>
            <button type="button" onClick={resetPreTest} className="inline-flex items-center gap-1.5 rounded-xl border border-ink-200 px-3 py-2 text-xs font-semibold text-ink-600 hover:bg-ink-50">
              <RotateCcw className="h-3.5 w-3.5" /> Tekrar dene
            </button>
          </div>
        )}
      </motion.section>

      {/* Ana konu bölümleri — videolar + alıştırma testleri */}
      {preview.chapters.map((chapter, chIdx) => (
        <motion.section
          key={chapter.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 * (chIdx + 1) }}
          className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6"
        >
          {/* Bölüm başlığı */}
          <div className="mb-4 flex items-center gap-3 border-b border-ink-100 pb-4">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-sm font-bold text-brand-700">{chIdx + 1}</span>
            <h2 className="text-sm font-bold text-ink-900">{chapter.title}</h2>
            <span className="ml-auto rounded-full bg-ink-50 px-2.5 py-0.5 text-[10px] font-semibold text-ink-500">{chapter.steps.length} adım</span>
          </div>

          {/* Adımlar */}
          <div className="space-y-3">
            {chapter.steps.map((step, stepIdx) => {
              const isCompleted = completedSteps.includes(step.id)
              const prevCompleted = stepIdx === 0 || completedSteps.includes(chapter.steps[stepIdx - 1].id)
              const isLocked = !preTestSubmitted || !prevCompleted
              const quizKey = `${step.id}-quiz`
              const isQuizExpanded = expandedQuizzes.includes(quizKey)

              return (
                <div key={step.id} className={cn('rounded-xl border transition-all', isLocked ? 'border-ink-200/60 bg-ink-50/30' : 'border-ink-200/80 bg-white', isCompleted && 'border-brand-200 bg-brand-50/30')}>
                  {/* Adım header */}
                  <div className="flex items-center gap-3 p-4">
                    <button
                      type="button"
                      onClick={() => !isLocked && toggleStepComplete(step.id)}
                      disabled={isLocked}
                      className={cn(
                        'grid h-8 w-8 shrink-0 place-items-center rounded-lg border-2 transition-all',
                        isCompleted ? 'border-brand-500 bg-brand-500 text-white' : isLocked ? 'border-ink-200 bg-ink-100 text-ink-300' : 'border-ink-300 bg-white text-ink-400 hover:border-brand-400',
                      )}
                      aria-label={isCompleted ? 'Tamamlandı işaretini kaldır' : 'Adımı tamamla'}
                    >
                      {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : isLocked ? <Lock className="h-3.5 w-3.5" /> : <span className="text-xs font-bold">{stepIdx + 1}</span>}
                    </button>

                    <div className="min-w-0 flex-1">
                      <p className={cn('text-sm font-semibold', isLocked ? 'text-ink-400' : 'text-ink-800')}>
                        <span className="text-ink-400">{step.label} · </span>{step.videoTitle}
                      </p>
                      <p className="mt-0.5 flex items-center gap-3 text-[11px] text-ink-400">
                        <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {step.videoDuration}</span>
                        {step.quiz && <span className="inline-flex items-center gap-1"><ListChecks className="h-3 w-3" /> {step.quiz.questions.length} soru</span>}
                      </p>
                    </div>

                    {/* Video oynat butonu */}
                    <button
                      type="button"
                      disabled={isLocked}
                      onClick={() => isLocked ? undefined : toast.info('Video oynatıcı hazırlanacak.')}
                      className={cn(
                        'inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-colors',
                        isLocked ? 'cursor-not-allowed bg-ink-100 text-ink-300' : 'bg-ink-900 text-white hover:bg-brand-700',
                      )}
                    >
                      <PlayCircle className="h-4 w-4" /> <span className="hidden sm:inline">Oynat</span>
                    </button>

                    {/* Alıştırma testi aç/kapat */}
                    {step.quiz && !isLocked && (
                      <button
                        type="button"
                        onClick={() => toggleQuiz(quizKey)}
                        className={cn('inline-flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors', isQuizExpanded ? 'border-brand-200 bg-brand-50 text-brand-700' : 'border-ink-200 text-ink-600 hover:bg-ink-50')}
                      >
                        <ClipboardCheck className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Alıştırma</span>
                        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', isQuizExpanded && 'rotate-180')} />
                      </button>
                    )}
                  </div>

                  {/* Video placeholder */}
                  <AnimatePresence initial={false}>
                    {!isLocked && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="overflow-hidden">
                        <div className="mx-4 mb-4 aspect-video w-full overflow-hidden rounded-xl border border-ink-200 bg-ink-900">
                          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-ink-400">
                            <CirclePlay className="h-12 w-12 text-white/30" />
                            <p className="text-xs text-white/50">{step.videoTitle}</p>
                            <p className="text-[10px] text-white/30">Video önizlemesi hazırlanıyor</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Alıştırma testi içeriği */}
                  <AnimatePresence initial={false}>
                    {isQuizExpanded && step.quiz && !isLocked && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="border-t border-ink-100 p-4">
                          <div className="mb-3 flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-700">Konu alıştırma testi</span>
                            <span className="h-px flex-1 bg-ink-200" />
                            <span className="text-[10px] text-ink-400">{step.quiz.title} · {step.quiz.duration}</span>
                          </div>
                          <div className="space-y-3">
                            {step.quiz.questions.map((q, qIdx) => {
                              const submitted = topicResults[q.id] !== undefined
                              return (
                                <QuestionCard
                                  key={q.id}
                                  question={q}
                                  index={qIdx}
                                  selected={topicAnswers[q.id]}
                                  result={submitted ? topicResults[q.id] : undefined}
                                  disabled={submitted}
                                  onSelect={(idx) => handleTopicAnswer(q.id, idx)}
                                  compact
                                />
                              )
                            })}
                          </div>
                          <button
                            type="button"
                            onClick={() => step.quiz && submitTopicQuiz(step.quiz.questions)}
                            disabled={!step.quiz.questions.every((q) => topicAnswers[q.id] !== undefined) || step.quiz.questions.every((q) => topicResults[q.id] !== undefined)}
                            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-ink-300 bg-white px-4 py-2 text-xs font-bold text-ink-700 transition-colors hover:bg-ink-50 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Send className="h-3.5 w-3.5" /> Alıştırma testini gönder
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </motion.section>
      ))}

      {/* Alt buton */}
      <div className="flex justify-center pb-8">
        <Button variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />} onClick={() => navigate('/dashboard/egitimler')}>Eğitim listesine dön</Button>
      </div>
    </div>
  )
}

/** Soru kartı — ön test ve alıştırma testleri için ortak */
function QuestionCard({
  question,
  index,
  selected,
  result,
  disabled,
  onSelect,
  compact,
}: {
  question: QuizQuestion
  index: number
  selected: number | undefined
  result?: boolean
  disabled?: boolean
  onSelect: (optionIndex: number) => void
  compact?: boolean
}) {
  const letters = ['A', 'B', 'C', 'D', 'E']
  const submitted = result !== undefined

  return (
    <div className={cn('rounded-xl border bg-white', submitted ? (result ? 'border-emerald-200' : 'border-rose-200') : 'border-ink-200/80', compact ? 'p-3' : 'p-4')}>
      <p className={cn('text-ink-800', compact ? 'text-xs' : 'text-sm')}>
        <span className="font-semibold text-ink-400">Soru {index + 1}.</span> {question.text}
      </p>
      <div className={cn('mt-3 grid gap-2', compact ? 'text-xs' : 'text-sm', 'sm:grid-cols-2')}>
        {question.options.map((option, optIdx) => {
          const isSelected = selected === optIdx
          const isCorrect = optIdx === question.correctIndex
          const showCorrect = submitted && isCorrect
          const showWrong = submitted && isSelected && !isCorrect

          return (
            <label
              key={optIdx}
              className={cn(
                'flex cursor-pointer items-start gap-2.5 rounded-xl border px-3.5 py-2.5 leading-snug transition-colors',
                compact ? 'text-xs' : 'text-sm',
                showCorrect && 'border-emerald-300 bg-emerald-50',
                showWrong && 'border-rose-300 bg-rose-50',
                !submitted && isSelected && 'border-brand-300 bg-brand-50',
                !submitted && !isSelected && 'border-ink-200 hover:border-ink-300 hover:bg-ink-50',
                disabled && !submitted && 'cursor-not-allowed opacity-60',
              )}
            >
              <input
                type="radio"
                name={question.id}
                value={optIdx}
                checked={isSelected}
                disabled={disabled}
                onChange={() => onSelect(optIdx)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-brand-600"
              />
              <span className="min-w-0 flex-1 text-ink-700">
                <span className="font-semibold text-ink-400">{letters[optIdx]}) </span>
                {option}
              </span>
              {showCorrect && <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />}
              {showWrong && <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />}
            </label>
          )
        })}
      </div>
    </div>
  )
}
