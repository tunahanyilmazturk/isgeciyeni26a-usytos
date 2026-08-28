import {
  ArrowLeft, Award, BookOpen, Check, CheckCircle2, ChevronLeft, ChevronRight,
  ClipboardList, Clock, FileText, Film, LockKeyhole, Maximize2, Minimize2, Send, Stethoscope, UserRound, X,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { readAssignments, updateAssignment, type TrainingApprovalTarget, type TrainingAssignment } from '@/features/assignments/data/assignments'
import { readTrainings, type ContentItem, type Question, type Training, type TrainingModule } from '@/features/trainings/data/trainings'
import { seedTrainingCatalog } from '@/features/trainings/data/seed'

export function TrainingSessionPage() {
  const { assignmentId } = useParams<{ assignmentId: string }>()
  const navigate = useNavigate()

  const [assignment, setAssignment] = useState<TrainingAssignment | null>(null)
  const [training, setTraining] = useState<Training | null>(null)
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null)
  const [activeItemId, setActiveItemId] = useState<string | null>(null)
  const [activeSlideId, setActiveSlideId] = useState<string | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [showCompletionSummary, setShowCompletionSummary] = useState(false)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    seedTrainingCatalog()
    const a = readAssignments().find((x) => x.id === assignmentId)
    if (!a) {
      navigate('/katilimci/egitimler')
      return
    }
    const t = readTrainings().find((x) => x.id === a.trainingId)
    if (!t) {
      navigate('/katilimci/egitimler')
      return
    }
    setAssignment(a)
    setTraining(t)
    setShowCompletionSummary(Boolean(a.submittedAt) || a.approvalStatus !== 'not_requested')
    const initialModule = t.modules.find((module) => module.id === a.lastModuleId) ?? t.modules[0]
    const initialItem = initialModule?.items.find((item) => item.id === a.lastItemId) ?? initialModule?.items[0]
    const initialSlide = initialItem?.type === 'slide' ? initialItem.slides?.[0] : undefined
    setActiveModuleId(initialModule?.id ?? null)
    setActiveItemId(initialItem?.id ?? null)
    setActiveSlideId(initialSlide?.id ?? null)
  }, [assignmentId, navigate])

  const activeModule = useMemo(() => training?.modules.find((m) => m.id === activeModuleId), [training, activeModuleId])
  const activeItem = useMemo(() => activeModule?.items.find((i) => i.id === activeItemId), [activeModule, activeItemId])
  const activeSlide = useMemo(() => (activeItem?.type === 'slide' ? activeItem.slides?.find((s) => s.id === activeSlideId) : undefined), [activeItem, activeSlideId])

  const flatItems = useMemo(() => {
    const items: { moduleId: string; item: ContentItem }[] = []
    training?.modules.forEach((m) => m.items.forEach((i) => items.push({ moduleId: m.id, item: i })))
    return items
  }, [training])

  const currentIndex = useMemo(() => flatItems.findIndex((x) => x.moduleId === activeModuleId && x.item.id === activeItemId), [flatItems, activeModuleId, activeItemId])

  function updateProgress(patch: Partial<TrainingAssignment>) {
    if (!assignment) return
    const updated = updateAssignment(assignment.id, patch)
    if (updated) setAssignment(updated)
  }

  function markItemCompleted() {
    if (!assignment || !activeModuleId || !activeItemId) return
    if (assignment.submittedAt || assignment.approvalStatus !== 'not_requested') return
    if (assignment.completedItemIds.includes(activeItemId)) return
    const completedItemIds = [...assignment.completedItemIds, activeItemId]
    const total = flatItems.length
    const progress = total > 0 ? Math.round((completedItemIds.length / total) * 100) : 0
    updateProgress({ completedItemIds, progress, lastModuleId: activeModuleId, lastItemId: activeItemId })
  }

  function markModuleCompleted(moduleId: string) {
    if (!assignment) return
    if (assignment.submittedAt || assignment.approvalStatus !== 'not_requested') return
    if (assignment.completedModuleIds.includes(moduleId)) return
    const completedModuleIds = [...assignment.completedModuleIds, moduleId]
    updateProgress({ completedModuleIds })
  }

  function advanceToNextModule(completedModuleId: string) {
    if (!assignment || !training) return
    if (assignment.submittedAt || assignment.approvalStatus !== 'not_requested') return

    const completedModuleIds = [...new Set([...assignment.completedModuleIds, completedModuleId])]
    const moduleIndex = training.modules.findIndex((m) => m.id === completedModuleId)
    const nextModule = training.modules[moduleIndex + 1]

    if (nextModule) {
      updateProgress({ completedModuleIds })
      setShowQuiz(false)
      setActiveModuleId(nextModule.id)
      setActiveItemId(nextModule.items[0]?.id ?? null)
      setActiveSlideId(nextModule.items[0]?.type === 'slide' ? nextModule.items[0].slides?.[0].id ?? null : null)
      toast.success(`${moduleIndex + 1}. modül tamamlandı`, {
        description: `${moduleIndex + 2}. modüle geçtiniz.`,
      })
      return
    }

    updateProgress({ completedModuleIds, progress: 100 })
    setShowQuiz(false)
    setShowCompletionSummary(true)
    toast.success('Tüm adımlar tamamlandı', { description: 'Sonuç ve özet adımını kontrol ederek eğitimi teslim edin.' })
  }

  function finalizeTraining() {
    if (!assignment || !training) return
    if (assignment.submittedAt || assignment.approvalStatus !== 'not_requested') return
    const allItemsCompleted = flatItems.every(({ item }) => assignment.completedItemIds.includes(item.id))
    const allModulesCompleted = training.modules.every((module) => assignment.completedModuleIds.includes(module.id))
    if (!allItemsCompleted || !allModulesCompleted) {
      toast.error('Eğitim henüz teslim edilemez.', { description: 'Tüm içerikleri ve bölüm testlerini tamamlayın.' })
      return
    }
    const approvalTargets: TrainingApprovalTarget[] = [
      ...(assignment.requiresExpertApproval ? ['expert' as const] : []),
      ...(assignment.requiresDoctorApproval ? ['doctor' as const] : []),
    ]
    const now = new Date()
    const requiresApproval = approvalTargets.length > 0
    const updated = updateAssignment(assignment.id, {
      submittedAt: now.toISOString(),
      approvalStatus: requiresApproval ? 'pending' : 'approved',
      approvalRequestedTo: approvalTargets[0],
      approvalTargets,
      approvalDecisions: {},
      status: requiresApproval ? 'pending_approval' : 'completed',
      progress: 100,
      approvedBy: requiresApproval ? undefined : 'Sistem',
      approvedAt: requiresApproval ? undefined : now.toLocaleDateString('tr-TR'),
      certificateId: requiresApproval ? undefined : `HT-${now.getFullYear()}-${assignment.id}`,
    })
    if (updated) setAssignment(updated)
    toast.success(requiresApproval ? 'Eğitim teslim edildi ve kilitlendi' : 'Eğitim tamamlandı', {
      description: requiresApproval ? 'Sonuçlar ilgili eğitim onayı kuyruğuna aktarıldı. Artık cevaplar değiştirilemez.' : 'Sertifikanız oluşturuldu. Artık cevaplar değiştirilemez.',
    })
  }

  function openQuiz(module: TrainingModule) {
    if (!module.quiz || module.quiz.questions.length === 0) return
    if (assignment && (assignment.submittedAt || assignment.approvalStatus !== 'not_requested')) {
      setShowCompletionSummary(true)
      toast.info('Bu eğitim teslim edildiği için cevaplar değiştirilemez.')
      return
    }
    setActiveModuleId(module.id)
    setShowQuiz(true)
    const savedAnswers = assignment?.quizReviews?.[module.id] ?? []
    setAnswers(Object.fromEntries(savedAnswers.map((review) => [review.questionId, review.selectedIndex])))
    setSidebarOpen(false)
  }

  const submitQuiz = useCallback(() => {
    if (!activeModule?.quiz || !assignment) return
    if (assignment.submittedAt || assignment.approvalStatus !== 'not_requested') return
    const questions = activeModule.quiz.questions
    if (!questions.every((q) => answers[q.id] !== undefined)) {
      toast.error('Tüm soruları yanıtlayın.')
      return
    }
    let correct = 0
    questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) correct += 1
    })
    const score = Math.round((correct / questions.length) * 100)
    const moduleScores = { ...assignment.moduleScores, [activeModule.id]: score }
    const quizReviews = {
      ...assignment.quizReviews,
      [activeModule.id]: questions.map((question) => ({
        questionId: question.id,
        questionText: question.text,
        selectedIndex: answers[question.id],
        selectedText: question.options[answers[question.id]],
        correctIndex: question.correctIndex,
        correctText: question.options[question.correctIndex],
      })),
    }
    updateProgress({ moduleScores, quizReviews })
    toast.success('Yanıtlarınız kaydedildi', { description: 'Doğru ve yanlış cevaplar eğitim teslim edildikten sonra açıklanacaktır.' })
    advanceToNextModule(activeModule.id)
  }, [activeModule, answers, assignment, training])

  function goToPrevSlide() {
    if (!activeItem || activeItem.type !== 'slide') return
    const slides = activeItem.slides ?? []
    const idx = activeSlide ? slides.findIndex((s) => s.id === activeSlide.id) : -1
    if (idx > 0) setActiveSlideId(slides[idx - 1].id)
  }

  function goToNextItem() {
    if (!activeModule || !activeItem) return
    if (assignment?.submittedAt || assignment?.approvalStatus !== 'not_requested') return
    const itemIndex = activeModule.items.findIndex((i) => i.id === activeItem.id)
    const slideIndex = activeItem.type === 'slide' ? activeItem.slides?.findIndex((s) => s.id === activeSlideId) : -1

    if (activeItem.type === 'slide' && activeItem.slides && slideIndex !== undefined && slideIndex < activeItem.slides.length - 1) {
      setActiveSlideId(activeItem.slides[slideIndex + 1].id)
      return
    }

    markItemCompleted()

    if (itemIndex < activeModule.items.length - 1) {
      const nextItem = activeModule.items[itemIndex + 1]
      setActiveItemId(nextItem.id)
      setActiveSlideId(nextItem.type === 'slide' ? nextItem.slides?.[0].id ?? null : null)
      return
    }

    if (activeModule.quiz && activeModule.quiz.questions.length > 0) {
      openQuiz(activeModule)
      return
    }

    markModuleCompleted(activeModule.id)

    const moduleIndex = training?.modules.findIndex((m) => m.id === activeModule.id) ?? -1
    const nextModule = training?.modules[moduleIndex + 1]
    if (nextModule) {
      setActiveModuleId(nextModule.id)
      setActiveItemId(nextModule.items[0]?.id ?? null)
      setActiveSlideId(nextModule.items[0]?.type === 'slide' ? nextModule.items[0].slides?.[0].id ?? null : null)
    } else {
      updateProgress({ progress: 100 })
      setShowCompletionSummary(true)
      toast.success('Tüm adımlar tamamlandı', { description: 'Sonuç ve özet adımını kontrol ederek eğitimi teslim edin.' })
    }
  }

  function goToItem(moduleId: string, itemId: string, slideId?: string | null) {
    setActiveModuleId(moduleId)
    setActiveItemId(itemId)
    setActiveSlideId(slideId ?? null)
    setShowQuiz(false)
    setSidebarOpen(false)
  }

  // Klavye kısayolları
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (showQuiz) return
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return
      if (e.key === 'ArrowRight') goToNextItem()
      if (e.key === 'ArrowLeft') goToPrevSlide()
      if (e.key === 'Escape' && fullscreen) setFullscreen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (!training || !assignment) return null

  const totalItems = flatItems.length
  const completedItems = assignment.completedItemIds.length
  const completedModules = training.modules.filter((module) => module.items.length > 0 && module.items.every((item) => assignment.completedItemIds.includes(item.id))).length
  const progress = assignment.status === 'completed'
    ? 100
    : totalItems > 0
      ? Math.min(100, Math.round((completedItems / totalItems) * 100))
      : 0
  const isLocked = Boolean(assignment.submittedAt) || assignment.approvalStatus !== 'not_requested'
  const allItemsCompleted = flatItems.every(({ item }) => assignment.completedItemIds.includes(item.id))
  const allModulesCompleted = training.modules.every((module) => assignment.completedModuleIds.includes(module.id))
  const canFinalize = allItemsCompleted && allModulesCompleted

  return (
    <div className={cn('flex min-h-[calc(100dvh-136px)] flex-col gap-4', fullscreen ? 'fixed inset-0 z-50 overflow-auto bg-ink-50/80 p-4 backdrop-blur' : 'lg:grid lg:h-[calc(100dvh-168px)] lg:min-h-0 lg:grid-cols-[minmax(0,1fr)_300px] lg:overflow-hidden')}>
      {/* Mobil üst bar */}
      <div className="flex items-center justify-between rounded-2xl border border-ink-200/80 bg-white p-3 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] lg:hidden">
        <button type="button" onClick={() => setSidebarOpen((v) => !v)} className="inline-flex items-center gap-2 rounded-xl bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700">
          <BookOpen className="h-4 w-4" /> İçindekiler
        </button>
        <span className="text-xs font-bold text-brand-700">%{progress}</span>
        <button type="button" onClick={() => setFullscreen((v) => !v)} className="grid h-8 w-8 place-items-center rounded-lg border border-ink-200 text-ink-500">
          {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>
      </div>

      {/* Sol menü */}
      <aside
        className={cn(
          'w-full shrink-0 rounded-2xl border border-ink-200/80 bg-white p-4 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] lg:order-2 lg:sticky lg:top-0 lg:block lg:h-full lg:overflow-y-auto',
          sidebarOpen ? 'block' : 'hidden'
        )}
      >
        <div className="mb-4 flex items-center gap-2">
          <button type="button" onClick={() => navigate('/katilimci/egitimler')} className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-ink-200 text-ink-500 transition-colors hover:bg-brand-50 hover:text-brand-700">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="min-w-0 flex-1"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-700">Eğitim akışı</p><h2 className="mt-0.5 truncate text-sm font-bold tracking-tight text-ink-900">{training.name}</h2></div>
          <button type="button" onClick={() => setSidebarOpen(false)} className="grid h-8 w-8 place-items-center rounded-lg text-ink-400 hover:bg-ink-100 lg:hidden">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Genel ilerleme */}
        <div className="mb-5 rounded-xl border border-brand-100 bg-brand-50/50 p-3">
          <div className="mb-1.5 flex items-center justify-between text-[11px]">
            <span className="font-semibold text-brand-800">Genel ilerleme</span>
            <span className="font-bold text-brand-700">%{progress}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-brand-100">
            <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] text-brand-700/70">
            <span>{completedItems}/{totalItems} içerik</span>
            <span>{completedModules}/{training.modules.length} modül</span>
          </div>
        </div>

        {/* Modül listesi */}
        <div className="space-y-3">
          {training.modules.map((module, mIndex) => {
            const moduleCompleted = assignment.completedModuleIds.includes(module.id)
            const moduleActive = activeModuleId === module.id
            const moduleItems = module.items.length
            const moduleDone = module.items.filter((i) => assignment.completedItemIds.includes(i.id)).length
            const moduleScore = assignment.moduleScores[module.id]
            const moduleProgress = moduleItems > 0 ? Math.round((moduleDone / moduleItems) * 100) : 0

            return (
              <div key={module.id} className={cn('rounded-xl border transition-colors', moduleActive ? 'border-brand-300 bg-brand-50/40' : 'border-ink-200/70 bg-white')}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveModuleId(module.id)
                    const firstItem = module.items[0]
                    if (firstItem) goToItem(module.id, firstItem.id, firstItem.type === 'slide' ? firstItem.slides?.[0].id : null)
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2.5 text-left"
                >
                  <span className={cn(
                    'grid h-6 w-6 shrink-0 place-items-center rounded-lg text-[11px] font-bold',
                    moduleCompleted ? 'bg-brand-600 text-white' : moduleActive ? 'bg-brand-500 text-white' : 'bg-ink-100 text-ink-600'
                  )}>
                    {moduleCompleted ? <Check className="h-3.5 w-3.5" /> : mIndex + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-xs font-bold text-ink-800">{module.title}</span>
                  {isLocked && moduleScore !== undefined && (
                    <span className={cn('shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-bold', moduleScore >= 70 ? 'bg-brand-100 text-brand-700' : 'bg-rose-100 text-rose-700')}>
                      %{moduleScore}
                    </span>
                  )}
                </button>

                {/* Modül ilerleme çubuğu */}
                <div className="px-3 pb-1">
                  <div className="h-1 overflow-hidden rounded-full bg-ink-100">
                    <div className={cn('h-full rounded-full transition-all', moduleCompleted ? 'bg-brand-600' : 'bg-brand-400')} style={{ width: `${moduleProgress}%` }} />
                  </div>
                </div>

                {/* İçerik listesi */}
                <div className="mt-1 space-y-0.5 px-3 pb-3">
                  {module.items.map((item, iIndex) => {
                    const isActive = activeModuleId === module.id && activeItemId === item.id
                    const isCompleted = assignment.completedItemIds.includes(item.id)
                    const icon = item.type === 'video' ? <Film className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => goToItem(module.id, item.id, item.type === 'slide' ? item.slides?.[0].id : null)}
                        className={cn(
                          'flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[11px] transition-colors',
                          isActive ? 'bg-brand-600 text-white' : isCompleted ? 'text-brand-700 hover:bg-brand-50' : 'text-ink-500 hover:bg-ink-50'
                        )}
                      >
                        <span className={cn('shrink-0', isActive ? 'text-white' : isCompleted ? 'text-brand-600' : 'text-ink-400')}>
                          {isCompleted ? <Check className="h-3.5 w-3.5" /> : icon}
                        </span>
                        <span className="min-w-0 flex-1 truncate">{item.title || `İçerik ${iIndex + 1}`}</span>
                      </button>
                    )
                  })}
                  {module.quiz && (
                    <button
                      type="button"
                      onClick={() => openQuiz(module)}
                      className={cn(
                        'flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[11px] transition-colors',
                        showQuiz && activeModuleId === module.id ? 'bg-amber-100 text-amber-800' : 'text-ink-500 hover:bg-ink-50'
                      )}
                    >
                      <ClipboardList className="h-3.5 w-3.5 text-amber-500" />
                      <span className="min-w-0 flex-1 truncate">Bölüm testi ({module.quiz.questions.length} soru)</span>
                    </button>
                  )}
                </div>
              </div>
            )
          })}
          <button
            type="button"
            disabled={!canFinalize && !isLocked}
            onClick={() => { setShowCompletionSummary(true); setShowQuiz(false); setSidebarOpen(false) }}
            className={cn(
              'flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-colors',
              showCompletionSummary ? 'border-brand-300 bg-brand-50 text-brand-800' : canFinalize || isLocked ? 'border-brand-200 bg-white text-ink-700 hover:bg-brand-50' : 'cursor-not-allowed border-ink-200 bg-ink-50 text-ink-400',
            )}
          >
            <span className={cn('grid h-7 w-7 place-items-center rounded-lg', canFinalize || isLocked ? 'bg-brand-600 text-white' : 'bg-ink-200 text-ink-500')}><Award className="h-4 w-4" /></span>
            <span className="min-w-0 flex-1"><span className="block text-xs font-bold">Sonuç ve özet</span><span className="mt-0.5 block text-[10px] opacity-70">{isLocked ? 'Teslim edilen sonucu görüntüle' : canFinalize ? 'Eğitimi kontrol et ve teslim et' : 'Tüm adımları tamamlayınca açılır'}</span></span>
            {(canFinalize || isLocked) && <ChevronRight className="h-4 w-4" />}
          </button>
        </div>
      </aside>

      {/* Orta alan */}
      <main className="order-1 min-w-0 rounded-2xl border border-ink-200/80 bg-white p-4 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-5 lg:flex lg:min-h-0 lg:h-full lg:flex-col lg:overflow-hidden lg:p-6">
        <div className="min-h-0 flex-1">
          {showCompletionSummary ? (
            <CompletionSummary
              training={training}
              assignment={assignment}
              canFinalize={canFinalize}
              onFinalize={finalizeTraining}
              onBackToContent={() => setShowCompletionSummary(false)}
            />
          ) : showQuiz && activeModule?.quiz ? (
            <div className="h-full overflow-y-auto pr-1">
              <QuizPanel
                module={activeModule}
                answers={answers}
                setAnswers={setAnswers}
                onSubmit={submitQuiz}
                onClose={() => setShowQuiz(false)}
              />
            </div>
          ) : activeItem ? (
            <ContentPanel
              item={activeItem}
              activeSlide={activeSlide}
              onSlideChange={setActiveSlideId}
              onNext={goToNextItem}
              onPrev={goToPrevSlide}
              isLast={currentIndex === flatItems.length - 1 && !activeModule?.quiz}
              fullscreen={fullscreen}
              onToggleFullscreen={() => setFullscreen((v) => !v)}
            />
          ) : (
            <div className="py-16 text-center">
              <BookOpen className="mx-auto h-8 w-8 text-ink-300" />
              <p className="mt-3 text-sm font-semibold text-ink-700">Bir içerik seçin</p>
            </div>
          )}
        </div>
      </main>

    </div>
  )
}

function ContentPanel({
  item,
  activeSlide,
  onSlideChange,
  onNext,
  onPrev,
  isLast,
  fullscreen,
  onToggleFullscreen,
}: {
  item: ContentItem
  activeSlide?: { id: string; title: string; content: string; mediaUrl?: string }
  onSlideChange: (id: string) => void
  onNext: () => void
  onPrev: () => void
  isLast: boolean
  fullscreen: boolean
  onToggleFullscreen: () => void
}) {
  if (item.type === 'video' && item.videoUrl?.startsWith('internal://')) {
    const introSlides = item.slides ?? []
    return (
      <div className="flex h-full min-h-0 flex-col">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-1 text-[11px] font-semibold text-brand-700">
            <Film className="h-3.5 w-3.5" /> Başlangıç videosu
          </div>
          <button type="button" onClick={onToggleFullscreen} className="grid h-8 w-8 place-items-center rounded-lg border border-ink-200 text-ink-500 transition-colors hover:bg-brand-50 hover:text-brand-700" aria-label="Tam ekran">
            {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-auto rounded-2xl bg-ink-950 p-5 text-white shadow-inner sm:p-8">
          <div className="mx-auto flex min-h-full max-w-4xl flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-300">
                <span>HanTech Öğrenme Serisi</span>
                <span>{introSlides.length} bölüm</span>
              </div>
              <h2 className="mt-5 max-w-2xl text-2xl font-bold tracking-tight sm:text-4xl">{item.title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-300 sm:text-base">
                Eğitime başlamadan önce bu kısa tanıtımı izleyin. Temel akışı öğrendikten sonra konu anlatımına geçebilirsiniz.
              </p>

              <div className="mt-8 grid gap-3 md:grid-cols-3">
                {introSlides.map((slide, index) => (
                  <div key={slide.id} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500 text-xs font-bold text-white">{index + 1}</span>
                    <h3 className="mt-4 text-sm font-bold text-white">{slide.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-ink-300">{slide.content}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-5">
              <div className="mb-4 flex items-center gap-1.5">
                {introSlides.map((slide) => <span key={slide.id} className="h-1.5 flex-1 rounded-full bg-brand-400" />)}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-ink-400">Başlangıç videosu · Sonraki aşamada ilk konu anlatımı açılır.</p>
                <Button size="md" rightIcon={<ChevronRight className="h-4 w-4" />} onClick={onNext}>
                  {isLast ? 'Eğitimi bitir' : 'Videoyu tamamla ve devam et'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (item.type === 'video' && item.videoUrl) {
    const isYouTube = item.videoUrl.includes('youtube') || item.videoUrl.includes('youtu.be')
    const embedUrl = isYouTube ? item.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/') : item.videoUrl
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-1 text-[11px] font-semibold text-brand-700">
            <Film className="h-3.5 w-3.5" /> Video içeriği
          </div>
          <button type="button" onClick={onToggleFullscreen} className="grid h-8 w-8 place-items-center rounded-lg border border-ink-200 text-ink-500 transition-colors hover:bg-brand-50 hover:text-brand-700">
            {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-ink-900">{item.title}</h2>
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-ink-200 bg-ink-900 shadow-sm">
          <iframe
            src={embedUrl}
            title={item.title}
            className="h-full w-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
        <p className="text-sm text-ink-500">Video izlendikten sonra sonraki adıma geçebilirsiniz.</p>
        <div className="flex justify-end border-t border-ink-100 pt-4">
          <Button size="md" rightIcon={<ChevronRight className="h-4 w-4" />} onClick={onNext}>{isLast ? 'Eğitimi bitir' : 'Sonraki'}</Button>
        </div>
      </div>
    )
  }

  const slides = item.slides ?? []
  const currentIndex = activeSlide ? slides.findIndex((s) => s.id === activeSlide.id) : -1
  const isFirst = currentIndex <= 0
  const isLastSlide = currentIndex >= slides.length - 1
  const readingTime = activeSlide ? Math.max(1, Math.ceil(activeSlide.content.length / 600)) : 0
  const contentSections = activeSlide?.content.split(/\n\n+/).filter(Boolean) ?? []
  const leadContent = contentSections[0] ?? ''
  const detailSections = contentSections.slice(1)

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-700">Sunum görünümü</p><p className="mt-0.5 truncate text-xs font-semibold text-ink-600">{item.title}</p></div>
        <div className="flex items-center gap-2">
          {activeSlide && (
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
              {currentIndex + 1} / {slides.length}
            </span>
          )}
          <button type="button" onClick={onToggleFullscreen} className="grid h-8 w-8 place-items-center rounded-lg border border-ink-200 text-ink-500 transition-colors hover:bg-brand-50 hover:text-brand-700">
            {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {activeSlide ? (
        <div className="min-h-[470px] flex-1 overflow-hidden">
          <article className="h-full min-h-[470px] overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.7)]">
            <div className="grid h-full min-h-[470px] lg:grid-cols-[minmax(0,1.08fr)_minmax(300px,0.92fr)]">
              <section className="flex min-h-0 flex-col bg-[#071426] p-5 text-white sm:p-6">
                <header className="shrink-0"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-teal-300"><span className="grid h-7 w-7 place-items-center rounded-lg bg-teal-500 text-white">{currentIndex + 1}</span><span>HanTech öğrenme serisi</span></div><span className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[9px] font-semibold text-slate-300">{currentIndex + 1} / {slides.length}</span></div></header>
                <div className="mt-5 min-h-0 flex-1 overflow-y-auto pr-1 [scrollbar-color:rgba(45,212,191,0.35)_transparent]">
                  <h3 className="max-w-2xl text-2xl font-bold leading-tight tracking-[-0.025em] sm:text-[28px]">{activeSlide.title}</h3>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">{leadContent}</p>
                  <div className="mt-6 space-y-4 border-t border-white/10 pt-5">
                  {detailSections.map((section, index) => {
                    const lines = section.split('\n')
                    const heading = lines.length > 1 && lines[0].length < 70 ? lines[0] : index === 0 ? 'İşyerinde uygulama' : 'Dikkat edilmesi gerekenler'
                    const body = lines.length > 1 && lines[0].length < 70 ? lines.slice(1).join('\n') : section
                    const normalizedHeading = heading.toLocaleLowerCase('tr-TR')
                    const isControl = normalizedHeading.includes('kontrol')
                    const isApplication = normalizedHeading.includes('uygulama')
                    return <div key={`${heading}-${index}`} className={cn('border-l-2 py-0.5 pl-3.5', isControl ? 'border-amber-400' : isApplication ? 'border-teal-400' : 'border-slate-600')}><div className="flex items-center gap-2"><CheckCircle2 className={cn('h-3.5 w-3.5', isControl ? 'text-amber-400' : 'text-teal-300')} /><h4 className="text-xs font-bold text-white">{heading}</h4></div><p className="mt-2 whitespace-pre-wrap text-xs leading-5 text-slate-300">{body}</p></div>
                  })}
                  </div>
                </div>
                <footer className="mt-5 shrink-0 border-t border-white/10 pt-4"><div className="h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-teal-400 transition-all" style={{ width: `${Math.round(((currentIndex + 1) / slides.length) * 100)}%` }} /></div><div className="mt-3 flex items-center justify-between gap-3 text-[10px] font-semibold text-slate-400"><span className="inline-flex items-center gap-1.5"><Clock className="h-3 w-3" /> ~{readingTime} dk</span><span>Sonraki adım için içeriği tamamlayın</span></div></footer>
              </section>
              {activeSlide.mediaUrl ? <figure className="relative min-h-[300px] overflow-hidden border-t border-slate-800 bg-[radial-gradient(circle_at_center,_#1e293b_0%,_#020617_75%)] lg:min-h-0 lg:border-l lg:border-t-0"><img src={activeSlide.mediaUrl} alt={`${activeSlide.title} görseli`} className="absolute inset-0 h-full w-full object-contain object-center" /><div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" /><figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5"><div><p className="text-[9px] font-bold uppercase tracking-[0.16em] text-teal-300">Görsel anlatım</p><p className="mt-1 line-clamp-2 text-xs font-semibold text-white">{activeSlide.title}</p></div><span className="shrink-0 rounded-lg border border-white/15 bg-black/25 px-2.5 py-1 text-[9px] font-semibold text-white backdrop-blur">Türkiye · İSG</span></figcaption></figure> : <div className="grid min-h-[300px] place-items-center border-t border-slate-800 bg-slate-900 text-xs text-slate-400 lg:min-h-0 lg:border-l lg:border-t-0">Bu slayt için görsel hazırlanıyor</div>}
            </div>
          </article>
        </div>
      ) : (
        <div className="py-16 text-center text-ink-500">Bu içerikte slayt bulunamadı.</div>
      )}

      {/* Alt navigasyon */}
      <div className="mt-4 flex flex-col gap-3 border-t border-ink-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Slayt noktaları */}
        <div className="flex flex-wrap gap-2">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => onSlideChange(slide.id)}
              className={cn(
                'grid h-9 w-9 place-items-center rounded-lg text-xs font-bold transition-all',
                slide.id === activeSlide?.id ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/25' : 'bg-ink-100 text-ink-500 hover:bg-brand-100 hover:text-brand-700'
              )}
              aria-label={`Slayt ${idx + 1}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        {/* Önceki / Sonraki */}
        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="outline"
            size="md"
            leftIcon={<ChevronLeft className="h-4 w-4" />}
            onClick={onPrev}
            disabled={isFirst}
          >
            Önceki
          </Button>
          <Button size="md" rightIcon={<ChevronRight className="h-4 w-4" />} onClick={onNext}>
            {isLast && isLastSlide ? 'Eğitimi bitir' : isLastSlide ? 'Sonraki içerik' : 'Sonraki slayt'}
          </Button>
        </div>
      </div>
    </div>
  )
}

function CompletionSummary({
  training,
  assignment,
  canFinalize,
  onFinalize,
  onBackToContent,
}: {
  training: Training
  assignment: TrainingAssignment
  canFinalize: boolean
  onFinalize: () => void
  onBackToContent: () => void
}) {
  const navigate = useNavigate()
  const reviews = training.modules.flatMap((module) => (assignment.quizReviews?.[module.id] ?? []).map((review) => ({ ...review, moduleTitle: module.title })))
  const correctCount = reviews.filter((review) => review.selectedIndex === review.correctIndex).length
  const errorCount = reviews.length - correctCount
  const averageScore = Object.values(assignment.moduleScores).length > 0
    ? Math.round(Object.values(assignment.moduleScores).reduce((sum, score) => sum + score, 0) / Object.values(assignment.moduleScores).length)
    : 0
  const isLocked = Boolean(assignment.submittedAt) || assignment.approvalStatus !== 'not_requested'
  const isApproved = assignment.approvalStatus === 'approved'
  const isPending = assignment.approvalStatus === 'pending'
  const approvalTargets = assignment.approvalTargets?.length
    ? assignment.approvalTargets
    : [
        ...(assignment.requiresExpertApproval ? ['expert' as const] : []),
        ...(assignment.requiresDoctorApproval ? ['doctor' as const] : []),
      ]
  const approvalLabel = approvalTargets.length === 2
    ? 'İSG uzmanı ve işyeri hekimi'
    : approvalTargets[0] === 'doctor' ? 'İşyeri hekimi' : approvalTargets[0] === 'expert' ? 'İSG uzmanı' : 'Otomatik onay'

  return (
    <div className="space-y-5 overflow-y-auto pr-1">
      <div className="rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-white p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-brand-100 px-3 py-1 text-[11px] font-bold text-brand-700">
              {isLocked ? <LockKeyhole className="h-3.5 w-3.5" /> : <Award className="h-3.5 w-3.5" />} {isLocked ? 'Kilitli eğitim sonucu' : 'Sonuç ve özet'}
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink-900">{isLocked ? 'Eğitim teslim edildi' : 'Eğitimi teslim etmeye hazırsınız'}</h2>
            <p className="mt-1 text-sm text-ink-500">{isLocked ? 'Cevaplarınız kilitlendi. Sonuç ve hata analizinizi aşağıdan inceleyebilirsiniz.' : `${training.name} kapsamında tamamladığınız adımların hızlı özetini kontrol edin.`}</p>
          </div>
          {isLocked ? <div className="grid grid-cols-3 gap-2"><SummaryStat label="Başarı" value={`%${averageScore}`} /><SummaryStat label="Doğru" value={String(correctCount)} /><SummaryStat label="Hata" value={String(errorCount)} /></div> : <div className="grid grid-cols-3 gap-2"><SummaryStat label="Modül" value={String(training.modules.length)} /><SummaryStat label="İçerik" value={String(training.modules.reduce((sum, module) => sum + module.items.length, 0))} /><SummaryStat label="Soru" value={String(reviews.length)} /></div>}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border border-ink-200/80 bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-ink-900">{isLocked ? 'Cevap ve hata analizi' : 'Teslim öncesi hızlı özet'}</h3>
              <p className="mt-1 text-xs text-ink-400">{isLocked ? 'Yanlış cevapladığınız soruları ve doğru cevapları inceleyin.' : 'Cevap anahtarı kesin teslimden sonra açılacaktır.'}</p>
            </div>
            <span className="rounded-full bg-ink-100 px-2.5 py-1 text-[10px] font-bold text-ink-600">{reviews.length} soru</span>
          </div>
          {!isLocked ? (
            <div className="mt-4 space-y-3">
              {training.modules.map((module, index) => <div key={module.id} className="flex items-center gap-3 rounded-xl border border-ink-100 bg-ink-50/60 p-3"><span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-100 text-[11px] font-bold text-brand-700">{index + 1}</span><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold text-ink-800">{module.title}</p><p className="mt-0.5 text-[10px] text-ink-400">{module.items.length} içerik · {module.quiz?.questions.length ?? 0} soru tamamlandı</p></div><CheckCircle2 className="h-4 w-4 text-emerald-500" /></div>)}
              <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4"><LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" /><p className="text-xs leading-5 text-amber-800"><strong>Kesin teslim uyarısı:</strong> Eğitimi tamamladıktan sonra cevaplarınız kilitlenir; testleri yeniden çözemez veya cevaplarınızı değiştiremezsiniz. Yanlışlarınız ve doğru cevaplarınız teslimden sonra bu alanda gösterilir.</p></div>
            </div>
          ) : <div className="mt-4 max-h-[360px] space-y-2 overflow-y-auto pr-1">
            {reviews.length === 0 ? <p className="rounded-xl bg-ink-50 p-4 text-xs text-ink-500">Bu eğitimde cevap analizi bulunmuyor.</p> : reviews.map((review) => {
              const correct = review.selectedIndex === review.correctIndex
              return (
                <div key={`${review.moduleTitle}-${review.questionId}`} className={cn('rounded-xl border p-3', correct ? 'border-emerald-100 bg-emerald-50/40' : 'border-rose-100 bg-rose-50/50')}>
                  <div className="flex items-start gap-2">
                    <span className={cn('mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold text-white', correct ? 'bg-emerald-500' : 'bg-rose-500')}>
                      {correct ? <Check className="h-3 w-3" /> : '!' }
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold leading-5 text-ink-800">{review.questionText}</p>
                      <p className="mt-1 text-[11px] text-ink-500">Sizin cevabınız: <span className="font-semibold">{review.selectedText}</span></p>
                      {!correct && <p className="mt-0.5 text-[11px] text-emerald-700">Doğru cevap: <span className="font-semibold">{review.correctText}</span></p>}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>}
        </section>

        <section className="rounded-2xl border border-ink-200/80 bg-white p-5">
          <h3 className="text-sm font-bold text-ink-900">Teslim ve onay</h3>
          <p className="mt-1 text-xs leading-5 text-ink-500">Bu eğitim için belirlenen onay akışı: <strong className="text-ink-700">{approvalLabel}</strong>.</p>
          {isApproved ? (
            <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-800"><CheckCircle2 className="h-4 w-4" /> Onaylandı</div>
              <p className="mt-2 text-xs text-emerald-700">Sertifikanız hazır: {assignment.certificateId}</p>
              <Button className="mt-4 w-full" size="sm" onClick={() => navigate(`/katilimci/sertifika/${assignment.id}`)}>Sertifikayı görüntüle</Button>
            </div>
          ) : isPending ? (
            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-bold text-amber-800">Onay bekliyor</p>
              <p className="mt-1 text-xs text-amber-700">Sonucunuz şu anda {assignment.approvalRequestedTo === 'expert' ? 'İSG uzmanının' : 'işyeri hekiminin'} onay kuyruğunda.</p>
            </div>
          ) : (
            <div className="mt-5">
              <div className="mb-3 flex items-center gap-3 rounded-xl bg-brand-50 p-3"><span className="grid h-9 w-9 place-items-center rounded-lg bg-white text-brand-700">{approvalTargets.includes('doctor') ? <Stethoscope className="h-4 w-4" /> : <UserRound className="h-4 w-4" />}</span><div><p className="text-xs font-bold text-brand-900">{approvalLabel}</p><p className="mt-0.5 text-[10px] text-brand-700">Teslim edildiğinde otomatik yönlendirilir</p></div></div>
              <Button className="w-full" size="sm" disabled={!canFinalize} leftIcon={<Send className="h-4 w-4" />} onClick={onFinalize}>Eğitimi tamamla ve teslim et</Button>
            </div>
          )}
          {isLocked ? <button type="button" onClick={() => navigate('/katilimci/egitimler')} className="mt-4 w-full text-center text-xs font-semibold text-ink-500 hover:text-brand-700">Eğitimlerime dön</button> : <button type="button" onClick={onBackToContent} className="mt-4 w-full text-center text-xs font-semibold text-ink-500 hover:text-brand-700">İçeriğe dön</button>}
        </section>
      </div>
    </div>
  )
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-[58px] rounded-xl border border-brand-100 bg-white p-2.5 text-center">
      <p className="text-[10px] font-medium text-ink-400">{label}</p>
      <p className="mt-0.5 text-sm font-bold text-ink-900">{value}</p>
    </div>
  )
}

function QuizPanel({
  module,
  answers,
  setAnswers,
  onSubmit,
  onClose,
}: {
  module: TrainingModule
  answers: Record<string, number>
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, number>>>
  onSubmit: () => void
  onClose: () => void
}) {
  if (!module.quiz) return null
  const totalQuestions = module.quiz.questions.length
  const answeredCount = Object.keys(answers).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-lg bg-amber-100 px-3 py-1 text-[11px] font-bold text-amber-700">
            <ClipboardList className="h-3.5 w-3.5" /> Bölüm testi
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink-900">{module.quiz.title}</h2>
          <p className="mt-1 text-xs text-ink-500">{totalQuestions} soru · Sonuçlar eğitimin kesin tesliminden sonra açıklanır</p>
        </div>
        <button type="button" onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg text-ink-400 transition-colors hover:bg-ink-100">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* İlerleme göstergesi */}
      <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3">
          <div className="mb-1.5 flex items-center justify-between text-[11px]">
            <span className="font-semibold text-amber-800">Yanıtlanan</span>
            <span className="font-bold text-amber-900">{answeredCount}/{totalQuestions}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-amber-100">
            <div className="h-full rounded-full bg-amber-500 transition-all" style={{ width: `${(answeredCount / totalQuestions) * 100}%` }} />
          </div>
        <p className="mt-2 text-[10px] leading-4 text-amber-700">Bu aşamada yalnızca cevaplarınız kaydedilir. Doğru ve yanlış seçenekler gösterilmez.</p>
      </div>

      <div className="space-y-4">
        {module.quiz.questions.map((question, qIndex) => (
          <QuizQuestion
            key={question.id}
            index={qIndex}
            total={totalQuestions}
            question={question}
            selected={answers[question.id]}
            onSelect={(idx) => setAnswers((prev) => ({ ...prev, [question.id]: idx }))}
          />
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-ink-100 pt-5">
        <Button variant="outline" size="md" leftIcon={<ArrowLeft className="h-4 w-4" />} onClick={onClose}>
          İçeriğe dön
        </Button>
        <Button leftIcon={<Check className="h-4 w-4" />} onClick={onSubmit} disabled={answeredCount < totalQuestions}>Yanıtları kaydet ve devam et</Button>
      </div>
    </div>
  )
}

function QuizQuestion({
  index,
  total,
  question,
  selected,
  onSelect,
}: {
  index: number
  total: number
  question: Question
  selected: number | undefined
  onSelect: (idx: number) => void
}) {
  return (
    <div className="rounded-2xl border border-ink-200/80 bg-white p-5">
      <div className="mb-3 flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-600 text-xs font-bold text-white">{index + 1}</span>
        <span className="text-[11px] font-medium text-ink-400">Soru {index + 1} / {total}</span>
      </div>
      <p className="text-base font-semibold leading-relaxed text-ink-800">{question.text}</p>
      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {question.options.map((option, oIndex) => {
          const isSelected = selected === oIndex

          return (
            <button
              key={oIndex}
              type="button"
              onClick={() => onSelect(oIndex)}
              className={cn(
                'flex items-start gap-3 rounded-xl border p-4 text-left text-sm transition-all',
                isSelected ? 'border-brand-400 bg-brand-50 text-brand-900 ring-1 ring-brand-200' : 'border-ink-200 bg-white text-ink-700 hover:border-brand-200 hover:bg-brand-50/40'
              )}
            >
              <span className={cn(
                'mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[11px] font-bold',
                isSelected ? 'border-brand-500 bg-brand-500 text-white' : 'border-ink-300 text-ink-500'
              )}>
                {String.fromCharCode(65 + oIndex)}
              </span>
              <span className="min-w-0 flex-1">{option}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
