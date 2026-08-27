import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, CheckCircle2, PlayCircle, RefreshCcw, Trophy } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useParticipantAuth } from '../ParticipantAuthContext'
import { trainingCatalog } from '@/features/trainings/data/trainings'
import { flattenTrainingContents } from '@/features/trainings/data/trainingContents'
import {
  completeContent,
  readParticipantProgress,
  saveQuizResult,
} from '@/features/trainings/data/participantProgress'
import type { Question, Quiz, TrainingContent } from '@/features/trainings/data/trainingContents'

export function ParticipantTrainingContentPage() {
  const navigate = useNavigate()
  const { trainingId, contentId } = useParams<{ trainingId: string; contentId: string }>()
  const { user } = useParticipantAuth()
  const [justCompleted, setJustCompleted] = useState(false)

  const training = useMemo(() => {
    if (!trainingId) return null
    return trainingCatalog.find((t) => t.id === trainingId) ?? null
  }, [trainingId])

  const contents = useMemo(() => {
    if (!training) return []
    return flattenTrainingContents(training.id)
  }, [training])

  const content = useMemo(() => {
    return contents.find((c) => c.id === contentId) ?? null
  }, [contents, contentId])

  const contentIndex = useMemo(() => {
    return contents.findIndex((c) => c.id === contentId)
  }, [contents, contentId])

  const progress = useMemo(() => {
    if (!user) return null
    return readParticipantProgress(user.id)
  }, [user])

  const isCompleted = useMemo(() => {
    return content ? Boolean(progress?.contentCompletions[content.id]) : false
  }, [content, progress])

  function handleComplete() {
    if (!user || !training || !content) return
    completeContent(user.id, training.id, content.id)
    setJustCompleted(true)
    toast.success('Adım tamamlandı!', { description: `+10 XP kazandınız.` })
  }

  function handleNext() {
    if (!training) return
    const nextIndex = contentIndex + 1
    if (nextIndex < contents.length) {
      navigate(`/katilimci/egitimler/${training.id}/icerik/${contents[nextIndex].id}`)
    } else {
      navigate(`/katilimci/egitimler/${training.id}`)
    }
  }

  if (!user || !training || !content) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <p className="text-sm font-semibold text-ink-700">İçerik bulunamadı</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/katilimci/egitimler')}>
          Eğitimlere dön
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <button
          type="button"
          onClick={() => navigate(`/katilimci/egitimler/${training.id}`)}
          className="mb-3 inline-flex items-center gap-1.5 text-xs font-medium text-ink-500 hover:text-brand-700"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Eğitime dön
        </button>

        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
          {training.name} · Adım {contentIndex + 1}/{contents.length}
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[28px]">
          {content.title}
        </h1>
      </motion.div>

      {/* Progress step bar */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((contentIndex + 1) / contents.length) * 100}%` }}
          transition={{ duration: 0.5 }}
          className="h-full rounded-full bg-brand-500"
        />
      </div>

      {/* Content body */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6"
      >
        {content.type === 'video' || content.type === 'scorm' ? (
          <VideoPlayer
            content={content}
            isCompleted={isCompleted || justCompleted}
            onComplete={handleComplete}
            onNext={handleNext}
          />
        ) : content.type === 'quiz' && content.quiz ? (
          <QuizPlayer
            quiz={content.quiz}
            participantId={user.id}
            trainingId={training.id}
            contentId={content.id}
            onComplete={handleComplete}
            onNext={handleNext}
          />
        ) : (
          <ArticleView
            content={content}
            isCompleted={isCompleted || justCompleted}
            onComplete={handleComplete}
            onNext={handleNext}
          />
        )}
      </motion.div>
    </div>
  )
}

function VideoPlayer({
  content,
  isCompleted,
  onComplete,
  onNext,
}: {
  content: TrainingContent
  isCompleted: boolean
  onComplete: () => void
  onNext: () => void
}) {
  return (
    <div className="space-y-5">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-ink-950">
        {content.videoUrl ? (
          <iframe
            src={content.videoUrl}
            title={content.title}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center text-white">
            <PlayCircle className="h-16 w-16 text-ink-600" />
            <p className="mt-4 text-sm text-ink-400">Video içeriği yakında eklenecek.</p>
            <p className="text-xs text-ink-600">{content.title}</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="text-xs text-ink-500">
          <span className="font-semibold text-ink-700">{content.durationMinutes} dk</span> tahmini süre
        </div>

        {isCompleted ? (
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              Tamamlandı
            </span>
            <Button size="sm" leftIcon={<ArrowLeft className="h-4 w-4 rotate-180" />} onClick={onNext}>
              Sonraki adım
            </Button>
          </div>
        ) : (
          <Button size="sm" leftIcon={<CheckCircle2 className="h-4 w-4" />} onClick={onComplete}>
            İzledim, tamamla
          </Button>
        )}
      </div>
    </div>
  )
}

function ArticleView({
  content,
  isCompleted,
  onComplete,
  onNext,
}: {
  content: TrainingContent
  isCompleted: boolean
  onComplete: () => void
  onNext: () => void
}) {
  return (
    <div className="space-y-5">
      <div className="prose prose-sm max-w-none text-ink-700">
        <p>{content.articleText ?? 'Bu bölümde okuma materyali yer alır.'}</p>
      </div>

      {isCompleted ? (
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            Okundu olarak işaretlendi
          </span>
          <Button size="sm" leftIcon={<ArrowLeft className="h-4 w-4 rotate-180" />} onClick={onNext}>
            Sonraki adım
          </Button>
        </div>
      ) : (
        <Button size="sm" leftIcon={<BookOpen className="h-4 w-4" />} onClick={onComplete}>
          Okudum, tamamla
        </Button>
      )}
    </div>
  )
}

function QuizPlayer({
  quiz,
  participantId,
  trainingId,
  contentId,
  onComplete,
  onNext,
}: {
  quiz: Quiz
  participantId: number
  trainingId: string
  contentId: string
  onComplete: () => void
  onNext: () => void
}) {
  const progress = readParticipantProgress(participantId)
  const existingResult = progress.quizResults[quiz.id]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [finished, setFinished] = useState(false)
  const [attempts, setAttempts] = useState(existingResult?.attempts ?? 0)

  const question = quiz.questions[currentIndex]
  const isLast = currentIndex === quiz.questions.length - 1

  function handleOptionSelect(optionId: string) {
    if (showFeedback) return
    setSelectedOption(optionId)
  }

  function handleConfirm() {
    if (!selectedOption) return
    setShowFeedback(true)
    setAnswers((prev) => ({ ...prev, [question.id]: selectedOption }))
  }

  function handleNextQuestion() {
    if (isLast) {
      finishQuiz()
      return
    }
    setCurrentIndex((i) => i + 1)
    setSelectedOption(null)
    setShowFeedback(false)
  }

  function finishQuiz() {
    let correct = 0
    for (const q of quiz.questions) {
      if (answers[q.id] === q.correctOptionId) correct += 1
    }
    const score = Math.round((correct / quiz.questions.length) * 100)
    const passed = score >= quiz.passingScore

    setFinished(true)
    saveQuizResult(participantId, quiz.id, score, passed)
    setAttempts((a) => a + 1)

    if (passed) {
      completeContent(participantId, trainingId, contentId)
      onComplete()
      toast.success('Quiz başarıyla tamamlandı!', {
        description: `Puan: %${score} · +20 XP`,
      })
    } else {
      toast.error('Quiz geçme notunu sağlayamadı', {
        description: `Puan: %${score} · Geçme notu: %${quiz.passingScore}`,
      })
    }
  }

  function handleRetry() {
    if (attempts >= quiz.maxAttempts) {
      toast.error('Maksimum deneme hakkına ulaştınız.')
      return
    }
    setCurrentIndex(0)
    setSelectedOption(null)
    setShowFeedback(false)
    setAnswers({})
    setFinished(false)
  }

  if (finished) {
    const correctCount = quiz.questions.filter((q) => answers[q.id] === q.correctOptionId).length
    const score = Math.round((correctCount / quiz.questions.length) * 100)
    const passed = score >= quiz.passingScore

    return (
      <div className="space-y-6 text-center">
        <div
          className={cn(
            'mx-auto grid h-20 w-20 place-items-center rounded-full',
            passed ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600',
          )}
        >
          {passed ? <Trophy className="h-10 w-10" /> : <RefreshCcw className="h-10 w-10" />}
        </div>

        <div>
          <h3 className={cn('text-xl font-bold', passed ? 'text-emerald-700' : 'text-rose-700')}>
            {passed ? 'Tebrikler, geçtiniz!' : 'Tekrar deneyin'}
          </h3>
          <p className="mt-1 text-sm text-ink-500">
            {correctCount}/{quiz.questions.length} doğru · Puan: %{score}
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          {passed ? (
            <Button leftIcon={<ArrowLeft className="h-4 w-4 rotate-180" />} onClick={onNext}>
              Sonraki adım
            </Button>
          ) : (
            <Button variant="outline" leftIcon={<RefreshCcw className="h-4 w-4" />} onClick={handleRetry}>
              Tekrar dene ({attempts}/{quiz.maxAttempts})
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-xs text-ink-500">
        <span className="font-semibold text-ink-700">Soru {currentIndex + 1}/{quiz.questions.length}</span>
        <span>Geçme notu: %{quiz.passingScore}</span>
      </div>

      <QuestionCard
        question={question}
        selectedOption={selectedOption}
        showFeedback={showFeedback}
        onSelect={handleOptionSelect}
      />

      <div className="flex items-center justify-end gap-3">
        {!showFeedback ? (
          <Button
            size="sm"
            disabled={!selectedOption}
            onClick={handleConfirm}
          >
            Cevabı kontrol et
          </Button>
        ) : (
          <Button size="sm" onClick={handleNextQuestion}>
            {isLast ? 'Quiz\'i bitir' : 'Sonraki soru'}
          </Button>
        )}
      </div>
    </div>
  )
}

function QuestionCard({
  question,
  selectedOption,
  showFeedback,
  onSelect,
}: {
  question: Question
  selectedOption: string | null
  showFeedback: boolean
  onSelect: (optionId: string) => void
}) {
  return (
    <div className="space-y-4">
      <p className="text-base font-semibold leading-relaxed text-ink-900">{question.text}</p>

      <div className="grid gap-2.5">
        {question.options.map((option) => {
          const isSelected = selectedOption === option.id
          const isCorrect = option.id === question.correctOptionId
          const showCorrect = showFeedback && isCorrect
          const showWrong = showFeedback && isSelected && !isCorrect

          return (
            <button
              key={option.id}
              type="button"
              disabled={showFeedback}
              onClick={() => onSelect(option.id)}
              className={cn(
                'flex items-start gap-3 rounded-xl border p-3.5 text-left text-sm transition-all',
                showCorrect
                  ? 'border-emerald-300 bg-emerald-50'
                  : showWrong
                    ? 'border-rose-300 bg-rose-50'
                    : isSelected
                      ? 'border-brand-300 bg-brand-50'
                      : 'border-ink-200 bg-white hover:border-brand-200 hover:bg-brand-50/30',
              )}
            >
              <span
                className={cn(
                  'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px] font-bold',
                  showCorrect
                    ? 'border-emerald-500 bg-emerald-500 text-white'
                    : showWrong
                      ? 'border-rose-500 bg-rose-500 text-white'
                      : isSelected
                        ? 'border-brand-500 bg-brand-500 text-white'
                        : 'border-ink-300 text-ink-500',
                )}
              >
                {String.fromCharCode(65 + question.options.findIndex((o) => o.id === option.id))}
              </span>
              <span className="mt-0.5 flex-1 leading-snug text-ink-700">{option.text}</span>

              {showCorrect && <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />}
              {showWrong && <span className="text-[11px] font-semibold text-rose-600">Yanlış</span>}
            </button>
          )
        })}
      </div>

      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            'rounded-xl border p-3.5 text-sm',
            selectedOption === question.correctOptionId
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-rose-200 bg-rose-50 text-rose-800',
          )}
        >
          <p className="font-semibold">
            {selectedOption === question.correctOptionId ? 'Doğru cevap!' : 'Yanlış cevap.'}
          </p>
          <p className="mt-1 text-ink-700">{question.explanation}</p>
        </motion.div>
      )}
    </div>
  )
}
