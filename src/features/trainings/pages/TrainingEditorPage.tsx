import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, Check, ChevronDown, GripVertical, Plus, Save, Trash2, Video, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui'
import { cn, nanoid } from '@/lib/utils'
import {
  addTraining,
  readTrainings,
  updateTraining,
  type ContentItem,
  type Question,
  type Quiz,
  type Slide,
  type Training,
  type TrainingModule,
  type TrainingPackage,
  type TrainingRisk,
} from '../data/trainings'

const packages: TrainingPackage[] = ['Temel Paket', 'Sektör Paketi']
const risks: TrainingRisk[] = ['Az Tehlikeli', 'Tehlikeli', 'Çok Tehlikeli']

function emptyTraining(): Training {
  return {
    id: nanoid(),
    name: '',
    package: 'Temel Paket',
    risk: 'Az Tehlikeli',
    description: '',
    passingScore: 70,
    modules: [],
  }
}

function emptyModule(): TrainingModule {
  return { id: nanoid(), title: '', items: [] }
}

function emptySlideItem(): ContentItem {
  return { id: nanoid(), title: '', type: 'slide', slides: [{ id: nanoid(), title: '', content: '' }] }
}

function emptyVideoItem(): ContentItem {
  return { id: nanoid(), title: '', type: 'video', videoUrl: '' }
}

function emptyQuestion(): Question {
  return { id: nanoid(), text: '', options: ['', ''], correctIndex: 0 }
}

export function TrainingEditorPage() {
  const { trainingId } = useParams<{ trainingId?: string }>()
  const navigate = useNavigate()
  const isEdit = Boolean(trainingId)

  const [training, setTraining] = useState<Training>(() => {
    if (!trainingId) return emptyTraining()
    const found = readTrainings().find((t) => t.id === trainingId)
    return found ? { ...found } : emptyTraining()
  })

  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const canSave = training.name.trim().length > 0 && training.modules.length > 0

  function update(patch: Partial<Training>) {
    setTraining((current) => ({ ...current, ...patch }))
  }

  function addModule() {
    const module = emptyModule()
    setTraining((current) => ({ ...current, modules: [...current.modules, module] }))
    setExpandedModules((prev) => new Set(prev).add(module.id))
  }

  function updateModule(moduleId: string, patch: Partial<TrainingModule>) {
    setTraining((current) => ({
      ...current,
      modules: current.modules.map((m) => (m.id === moduleId ? { ...m, ...patch } : m)),
    }))
  }

  function removeModule(moduleId: string) {
    setTraining((current) => ({
      ...current,
      modules: current.modules.filter((m) => m.id !== moduleId),
    }))
  }

  function moveModule(index: number, direction: -1 | 1) {
    setTraining((current) => {
      const modules = [...current.modules]
      const newIndex = index + direction
      if (newIndex < 0 || newIndex >= modules.length) return current
      const [moved] = modules.splice(index, 1)
      modules.splice(newIndex, 0, moved)
      return { ...current, modules }
    })
  }

  function addItem(moduleId: string, type: ContentItem['type']) {
    const item = type === 'slide' ? emptySlideItem() : emptyVideoItem()
    setTraining((current) => ({
      ...current,
      modules: current.modules.map((m) =>
        m.id === moduleId ? { ...m, items: [...m.items, item] } : m
      ),
    }))
    setExpandedItems((prev) => new Set(prev).add(item.id))
  }

  function updateItem(moduleId: string, itemId: string, patch: Partial<ContentItem>) {
    setTraining((current) => ({
      ...current,
      modules: current.modules.map((m) =>
        m.id === moduleId
          ? { ...m, items: m.items.map((i) => (i.id === itemId ? { ...i, ...patch } : i)) }
          : m
      ),
    }))
  }

  function removeItem(moduleId: string, itemId: string) {
    setTraining((current) => ({
      ...current,
      modules: current.modules.map((m) =>
        m.id === moduleId ? { ...m, items: m.items.filter((i) => i.id !== itemId) } : m
      ),
    }))
  }

  function moveItem(moduleId: string, index: number, direction: -1 | 1) {
    setTraining((current) => ({
      ...current,
      modules: current.modules.map((m) => {
        if (m.id !== moduleId) return m
        const items = [...m.items]
        const newIndex = index + direction
        if (newIndex < 0 || newIndex >= items.length) return m
        const [moved] = items.splice(index, 1)
        items.splice(newIndex, 0, moved)
        return { ...m, items }
      }),
    }))
  }

  function updateSlide(moduleId: string, itemId: string, slideId: string, patch: Partial<Slide>) {
    setTraining((current) => ({
      ...current,
      modules: current.modules.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              items: m.items.map((i) =>
                i.id === itemId && i.slides
                  ? { ...i, slides: i.slides.map((s) => (s.id === slideId ? { ...s, ...patch } : s)) }
                  : i
              ),
            }
          : m
      ),
    }))
  }

  function addSlide(moduleId: string, itemId: string) {
    setTraining((current) => ({
      ...current,
      modules: current.modules.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              items: m.items.map((i) =>
                i.id === itemId && i.type === 'slide'
                  ? { ...i, slides: [...(i.slides ?? []), { id: nanoid(), title: '', content: '' }] }
                  : i
              ),
            }
          : m
      ),
    }))
  }

  function removeSlide(moduleId: string, itemId: string, slideId: string) {
    setTraining((current) => ({
      ...current,
      modules: current.modules.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              items: m.items.map((i) =>
                i.id === itemId && i.slides
                  ? { ...i, slides: i.slides.filter((s) => s.id !== slideId) }
                  : i
              ),
            }
          : m
      ),
    }))
  }

  function setQuiz(moduleId: string, quiz?: Quiz) {
    setTraining((current) => ({
      ...current,
      modules: current.modules.map((m) => (m.id === moduleId ? { ...m, quiz } : m)),
    }))
  }

  function updateQuestion(moduleId: string, questionId: string, patch: Partial<Question>) {
    setTraining((current) => ({
      ...current,
      modules: current.modules.map((m) =>
        m.id === moduleId && m.quiz
          ? {
              ...m,
              quiz: {
                ...m.quiz,
                questions: m.quiz.questions.map((q) => (q.id === questionId ? { ...q, ...patch } : q)),
              },
            }
          : m
      ),
    }))
  }

  function addQuestion(moduleId: string) {
    setTraining((current) => ({
      ...current,
      modules: current.modules.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              quiz: m.quiz
                ? { ...m.quiz, questions: [...m.quiz.questions, emptyQuestion()] }
                : { id: nanoid(), title: 'Bölüm sonu testi', questions: [emptyQuestion()] },
            }
          : m
      ),
    }))
  }

  function removeQuestion(moduleId: string, questionId: string) {
    setTraining((current) => ({
      ...current,
      modules: current.modules.map((m) =>
        m.id === moduleId && m.quiz
          ? { ...m, quiz: { ...m.quiz, questions: m.quiz.questions.filter((q) => q.id !== questionId) } }
          : m
      ),
    }))
  }

  function updateOption(moduleId: string, questionId: string, index: number, value: string) {
    setTraining((current) => ({
      ...current,
      modules: current.modules.map((m) =>
        m.id === moduleId && m.quiz
          ? {
              ...m,
              quiz: {
                ...m.quiz,
                questions: m.quiz.questions.map((q) =>
                  q.id === questionId
                    ? { ...q, options: q.options.map((o, i) => (i === index ? value : o)) }
                    : q
                ),
              },
            }
          : m
      ),
    }))
  }

  function addOption(moduleId: string, questionId: string) {
    setTraining((current) => ({
      ...current,
      modules: current.modules.map((m) =>
        m.id === moduleId && m.quiz
          ? {
              ...m,
              quiz: {
                ...m.quiz,
                questions: m.quiz.questions.map((q) =>
                  q.id === questionId ? { ...q, options: [...q.options, ''] } : q
                ),
              },
            }
          : m
      ),
    }))
  }

  function removeOption(moduleId: string, questionId: string, index: number) {
    setTraining((current) => ({
      ...current,
      modules: current.modules.map((m) =>
        m.id === moduleId && m.quiz
          ? {
              ...m,
              quiz: {
                ...m.quiz,
                questions: m.quiz.questions.map((q) => {
                  if (q.id !== questionId) return q
                  const options = q.options.filter((_, i) => i !== index)
                  return { ...q, options, correctIndex: Math.min(q.correctIndex, options.length - 1) }
                }),
              },
            }
          : m
      ),
    }))
  }

  function handleSave() {
    if (!canSave) {
      toast.error('Eğitim adı ve en az bir modül gerekli.')
      return
    }
    if (isEdit) {
      updateTraining(training.id, training)
      toast.success('Eğitim güncellendi')
    } else {
      addTraining(training)
      toast.success('Eğitim oluşturuldu')
    }
    navigate('/dashboard/egitimler')
  }

  return (
    <div className="space-y-6 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard/egitimler')}
            className="grid h-9 w-9 place-items-center rounded-xl border border-ink-200 text-ink-500 transition-colors hover:bg-ink-50"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[30px]">
              {isEdit ? 'Eğitimi düzenle' : 'Yeni eğitim'}
            </h1>
            <p className="text-sm text-ink-500">Modül, slayt/video ve test içeriklerini oluşturun.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/dashboard/egitimler')}>İptal</Button>
          <Button onClick={handleSave} leftIcon={<Save className="h-4 w-4" />}>
            Kaydet
          </Button>
        </div>
      </motion.div>

      {/* Temel bilgiler */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6"
      >
        <h2 className="text-sm font-semibold text-ink-900">Temel bilgiler</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-ink-400">Eğitim adı</label>
            <input
              value={training.name}
              onChange={(e) => update({ name: e.target.value })}
              placeholder="Örn. İş Sağlığı ve Güvenliği Temel Eğitimi"
              className="h-11 w-full rounded-xl border border-ink-200 bg-white px-3.5 text-sm font-medium text-ink-800 outline-none transition-colors focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-ink-400">Açıklama</label>
            <textarea
              value={training.description}
              onChange={(e) => update({ description: e.target.value })}
              placeholder="Eğitimin kısa açıklaması"
              rows={3}
              className="w-full rounded-xl border border-ink-200 bg-white p-3.5 text-sm text-ink-800 outline-none transition-colors focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-ink-400">Paket</label>
            <select
              value={training.package}
              onChange={(e) => update({ package: e.target.value as TrainingPackage })}
              className="h-11 w-full rounded-xl border border-ink-200 bg-white px-3.5 text-sm font-medium text-ink-800 outline-none transition-colors focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
            >
              {packages.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-ink-400">Risk sınıfı</label>
            <select
              value={training.risk}
              onChange={(e) => update({ risk: e.target.value as TrainingRisk })}
              className="h-11 w-full rounded-xl border border-ink-200 bg-white px-3.5 text-sm font-medium text-ink-800 outline-none transition-colors focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
            >
              {risks.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-ink-400">Geçme notu (%)</label>
            <input
              type="number"
              min={0}
              max={100}
              value={training.passingScore}
              onChange={(e) => update({ passingScore: Math.min(100, Math.max(0, Number(e.target.value))) })}
              className="h-11 w-full rounded-xl border border-ink-200 bg-white px-3.5 text-sm font-medium text-ink-800 outline-none transition-colors focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
            />
          </div>
        </div>
      </motion.section>

      {/* Modüller */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink-900">Modüller</h2>
          <Button size="sm" leftIcon={<Plus className="h-4 w-4" />} onClick={addModule}>
            Modül ekle
          </Button>
        </div>

        {training.modules.length === 0 && (
          <div className="rounded-2xl border border-dashed border-ink-200 bg-ink-50/50 p-8 text-center">
            <BookOpen className="mx-auto h-8 w-8 text-ink-300" />
            <p className="mt-3 text-sm font-semibold text-ink-700">Henüz modül yok</p>
            <p className="mt-1 text-xs text-ink-400">Yeni bir modül ekleyerek slayt, video ve test oluşturun.</p>
          </div>
        )}

        {training.modules.map((module, moduleIndex) => {
          const isExpanded = expandedModules.has(module.id)
          return (
            <div key={module.id} className="overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]">
              <div className="flex items-center gap-2 border-b border-ink-100 bg-ink-50/40 p-4">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-100 text-[10px] font-bold text-brand-700">{moduleIndex + 1}</span>
                <input
                  value={module.title}
                  onChange={(e) => updateModule(module.id, { title: e.target.value })}
                  placeholder="Modül başlığı"
                  className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-ink-800 outline-none placeholder:text-ink-400"
                />
                <button
                  type="button"
                  onClick={() => moveModule(moduleIndex, -1)}
                  disabled={moduleIndex === 0}
                  className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100 disabled:opacity-30"
                >
                  <ChevronDown className="h-4 w-4 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => moveModule(moduleIndex, 1)}
                  disabled={moduleIndex === training.modules.length - 1}
                  className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100 disabled:opacity-30"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setExpandedModules((prev) => {
                    const next = new Set(prev)
                    if (next.has(module.id)) next.delete(module.id)
                    else next.add(module.id)
                    return next
                  })}
                >
                  <ChevronDown className={cn('h-4 w-4 text-ink-400 transition-transform', isExpanded && 'rotate-180')} />
                </button>
                <button
                  type="button"
                  onClick={() => removeModule(module.id)}
                  className="grid h-8 w-8 place-items-center rounded-lg text-ink-400 hover:bg-rose-50 hover:text-rose-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {isExpanded && (
                <div className="space-y-4 p-4">
                  {/* İçerikler */}
                  {module.items.map((item, itemIndex) => (
                    <ContentItemEditor
                      key={item.id}
                      item={item}
                      index={itemIndex}
                      isFirst={itemIndex === 0}
                      isLast={itemIndex === module.items.length - 1}
                      onUpdate={(patch) => updateItem(module.id, item.id, patch)}
                      onRemove={() => removeItem(module.id, item.id)}
                      onMove={(direction) => moveItem(module.id, itemIndex, direction)}
                      onAddSlide={() => addSlide(module.id, item.id)}
                      onUpdateSlide={(slideId, patch) => updateSlide(module.id, item.id, slideId, patch)}
                      onRemoveSlide={(slideId) => removeSlide(module.id, item.id, slideId)}
                      isExpanded={expandedItems.has(item.id)}
                      onToggleExpand={() => setExpandedItems((prev) => {
                        const next = new Set(prev)
                        if (next.has(item.id)) next.delete(item.id)
                        else next.add(item.id)
                        return next
                      })}
                    />
                  ))}

                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" leftIcon={<BookOpen className="h-4 w-4" />} onClick={() => addItem(module.id, 'slide')}>
                      Slayt ekle
                    </Button>
                    <Button size="sm" variant="outline" leftIcon={<Video className="h-4 w-4" />} onClick={() => addItem(module.id, 'video')}>
                      Video ekle
                    </Button>
                  </div>

                  {/* Test */}
                  <QuizEditor
                    module={module}
                    onAddQuestion={() => addQuestion(module.id)}
                    onUpdateQuestion={(questionId, patch) => updateQuestion(module.id, questionId, patch)}
                    onRemoveQuestion={(questionId) => removeQuestion(module.id, questionId)}
                    onUpdateOption={(questionId, index, value) => updateOption(module.id, questionId, index, value)}
                    onAddOption={(questionId) => addOption(module.id, questionId)}
                    onRemoveOption={(questionId, index) => removeOption(module.id, questionId, index)}
                    onRemoveQuiz={() => setQuiz(module.id, undefined)}
                  />
                </div>
              )}
            </div>
          )
        })}
      </motion.section>
    </div>
  )
}

function ContentItemEditor({
  item,
  index,
  isFirst,
  isLast,
  onUpdate,
  onRemove,
  onMove,
  onAddSlide,
  onUpdateSlide,
  onRemoveSlide,
  isExpanded,
  onToggleExpand,
}: {
  item: ContentItem
  index: number
  isFirst: boolean
  isLast: boolean
  onUpdate: (patch: Partial<ContentItem>) => void
  onRemove: () => void
  onMove: (direction: -1 | 1) => void
  onAddSlide: () => void
  onUpdateSlide: (slideId: string, patch: Partial<Slide>) => void
  onRemoveSlide: (slideId: string) => void
  isExpanded: boolean
  onToggleExpand: () => void
}) {
  return (
    <div className="rounded-xl border border-ink-200 bg-white">
      <div className="flex items-center gap-2 border-b border-ink-100 bg-ink-50/30 p-3">
        <GripVertical className="h-4 w-4 text-ink-300" />
        <span className="grid h-6 w-6 place-items-center rounded bg-ink-100 text-[10px] font-bold text-ink-600">{index + 1}</span>
        <input
          value={item.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder={item.type === 'slide' ? 'Slayt grubu başlığı' : 'Video başlığı'}
          className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-ink-800 outline-none placeholder:text-ink-400"
        />
        <button
          type="button"
          onClick={() => onMove(-1)}
          disabled={isFirst}
          className="rounded p-1 text-ink-400 hover:bg-ink-100 disabled:opacity-30"
        >
          <ChevronDown className="h-4 w-4 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => onMove(1)}
          disabled={isLast}
          className="rounded p-1 text-ink-400 hover:bg-ink-100 disabled:opacity-30"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
        <button type="button" onClick={onToggleExpand}>
          <ChevronDown className={cn('h-4 w-4 text-ink-400 transition-transform', isExpanded && 'rotate-180')} />
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="grid h-7 w-7 place-items-center rounded text-ink-400 hover:bg-rose-50 hover:text-rose-600"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-3 p-3">
          {item.type === 'video' ? (
            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink-400">Video URL</label>
              <input
                value={item.videoUrl ?? ''}
                onChange={(e) => onUpdate({ videoUrl: e.target.value })}
                placeholder="https://..."
                className="h-10 w-full rounded-lg border border-ink-200 bg-white px-3 text-sm text-ink-800 outline-none focus:border-brand-500"
              />
            </div>
          ) : (
            <div className="space-y-3">
              {item.slides?.map((slide, slideIndex) => (
                <div key={slide.id} className="rounded-lg border border-ink-200 p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-[10px] font-bold text-ink-400">SLAYT {slideIndex + 1}</span>
                    <button
                      type="button"
                      onClick={() => onRemoveSlide(slide.id)}
                      className="ml-auto text-ink-400 hover:text-rose-600"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <input
                    value={slide.title}
                    onChange={(e) => onUpdateSlide(slide.id, { title: e.target.value })}
                    placeholder="Slayt başlığı"
                    className="mb-2 h-9 w-full rounded-lg border border-ink-200 bg-white px-3 text-sm font-medium text-ink-800 outline-none focus:border-brand-500"
                  />
                  <textarea
                    value={slide.content}
                    onChange={(e) => onUpdateSlide(slide.id, { content: e.target.value })}
                    placeholder="Slayt içeriği (metin/HTML)"
                    rows={5}
                    className="w-full rounded-lg border border-ink-200 bg-white p-3 text-sm text-ink-800 outline-none focus:border-brand-500"
                  />
                </div>
              ))}
              <Button size="sm" variant="outline" leftIcon={<Plus className="h-4 w-4" />} onClick={onAddSlide}>
                Slayt ekle
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function QuizEditor({
  module,
  onAddQuestion,
  onUpdateQuestion,
  onRemoveQuestion,
  onUpdateOption,
  onAddOption,
  onRemoveOption,
  onRemoveQuiz,
}: {
  module: TrainingModule
  onAddQuestion: () => void
  onUpdateQuestion: (id: string, patch: Partial<Question>) => void
  onRemoveQuestion: (id: string) => void
  onUpdateOption: (questionId: string, index: number, value: string) => void
  onAddOption: (questionId: string) => void
  onRemoveOption: (questionId: string, index: number) => void
  onRemoveQuiz: () => void
}) {
  if (!module.quiz) {
    return (
      <div className="rounded-xl border border-dashed border-ink-200 bg-ink-50/30 p-4 text-center">
        <p className="text-xs text-ink-500">Bu modül için henüz test eklenmemiş.</p>
        <Button size="sm" variant="outline" className="mt-2" leftIcon={<Plus className="h-4 w-4" />} onClick={onAddQuestion}>
          Test ekle
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-ink-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-semibold text-ink-800">Bölüm sonu testi</h3>
        <button type="button" onClick={onRemoveQuiz} className="text-[11px] text-rose-600 hover:underline">Testi kaldır</button>
      </div>
      <div className="space-y-4">
        {module.quiz.questions.map((question, qIndex) => (
          <div key={question.id} className="rounded-lg border border-ink-200 p-3">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-[10px] font-bold text-ink-400">SORU {qIndex + 1}</span>
              <button
                type="button"
                onClick={() => onRemoveQuestion(question.id)}
                className="ml-auto text-ink-400 hover:text-rose-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <textarea
              value={question.text}
              onChange={(e) => onUpdateQuestion(question.id, { text: e.target.value })}
              placeholder="Soru metni"
              rows={2}
              className="mb-3 w-full rounded-lg border border-ink-200 bg-white p-2.5 text-sm text-ink-800 outline-none focus:border-brand-500"
            />
            <div className="space-y-2">
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onUpdateQuestion(question.id, { correctIndex: oIndex })}
                    className={cn(
                      'grid h-6 w-6 place-items-center rounded-full border text-[10px] font-bold',
                      question.correctIndex === oIndex
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                        : 'border-ink-200 bg-white text-ink-400'
                    )}
                    title="Doğru cevap olarak işaretle"
                  >
                    {question.correctIndex === oIndex ? <Check className="h-3 w-3" /> : String.fromCharCode(65 + oIndex)}
                  </button>
                  <input
                    value={option}
                    onChange={(e) => onUpdateOption(question.id, oIndex, e.target.value)}
                    placeholder={`Seçenek ${String.fromCharCode(65 + oIndex)}`}
                    className="min-w-0 flex-1 rounded-lg border border-ink-200 bg-white px-2.5 py-1.5 text-sm text-ink-800 outline-none focus:border-brand-500"
                  />
                  {question.options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => onRemoveOption(question.id, oIndex)}
                      className="text-ink-400 hover:text-rose-600"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <Button size="sm" variant="outline" className="mt-2" leftIcon={<Plus className="h-4 w-4" />} onClick={() => onAddOption(question.id)}>
              Seçenek ekle
            </Button>
          </div>
        ))}
        <Button size="sm" variant="outline" leftIcon={<Plus className="h-4 w-4" />} onClick={onAddQuestion}>
          Soru ekle
        </Button>
      </div>
    </div>
  )
}
