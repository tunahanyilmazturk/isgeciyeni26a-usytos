import { motion } from 'framer-motion'
import { Award, BookOpen, CalendarDays, ChevronRight, Clock3, Layers3, Play, RotateCcw, Search, Target } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { readAssignments, type AssignmentStatus, type TrainingAssignment } from '@/features/assignments/data/assignments'
import { readTrainings, type Training } from '@/features/trainings/data/trainings'
import { cn } from '@/lib/utils'
import { useParticipantAuth } from '../ParticipantAuthContext'

type FilterKey = 'all' | AssignmentStatus
type SortKey = 'priority' | 'progress' | 'name'

interface TrainingView {
  assignment: TrainingAssignment
  training: Training
  totalItems: number
  totalQuestions: number
  completedItems: number
  completedModules: number
  progress: number
  effectiveStatus: AssignmentStatus
  days: number
  cover?: string
}

const statusOrder: Record<AssignmentStatus, number> = { active: 0, pending_approval: 1, expired: 2, completed: 3 }
const statusStyles = {
  emerald: { badge: 'border-emerald-200 bg-emerald-50 text-emerald-700', bar: 'bg-emerald-500' },
  sky: { badge: 'border-sky-200 bg-sky-50 text-sky-700', bar: 'bg-sky-500' },
  amber: { badge: 'border-amber-200 bg-amber-50 text-amber-700', bar: 'bg-amber-500' },
  rose: { badge: 'border-rose-200 bg-rose-50 text-rose-700', bar: 'bg-rose-500' },
}
const filters: Array<{ key: FilterKey; label: string }> = [
  { key: 'all', label: 'Tümü' },
  { key: 'active', label: 'Devam eden' },
  { key: 'pending_approval', label: 'Onay bekleyen' },
  { key: 'completed', label: 'Tamamlanan' },
  { key: 'expired', label: 'Süresi dolan' },
]

function getStatusInfo(status: AssignmentStatus) {
  if (status === 'completed') return { label: 'Tamamlandı', tone: 'emerald' as const }
  if (status === 'pending_approval') return { label: 'Onay bekliyor', tone: 'amber' as const }
  if (status === 'expired') return { label: 'Süresi doldu', tone: 'rose' as const }
  return { label: 'Devam ediyor', tone: 'sky' as const }
}

function daysUntil(dateStr: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(dateStr)
  due.setHours(0, 0, 0, 0)
  return Math.round((due.getTime() - today.getTime()) / 86_400_000)
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return Number.isNaN(date.getTime()) ? dateStr : date.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' })
}

function getTrainingCover(training: Training): string | undefined {
  for (const module of training.modules) {
    for (const item of module.items) {
      const media = item.slides?.find((slide) => slide.mediaUrl)?.mediaUrl
      if (media) return media
    }
  }
  return undefined
}

function createTrainingView(assignment: TrainingAssignment, training: Training): TrainingView {
  const totalItems = training.modules.reduce((sum, module) => sum + module.items.length, 0)
  const totalQuestions = training.modules.reduce((sum, module) => sum + (module.quiz?.questions.length ?? 0), 0)
  const completedItems = training.modules.reduce((sum, module) => sum + module.items.filter((item) => assignment.completedItemIds.includes(item.id)).length, 0)
  const completedModules = training.modules.filter((module) => assignment.completedModuleIds.includes(module.id)).length
  const contentProgress = totalItems > 0 ? completedItems / totalItems : 0
  const moduleProgress = training.modules.length > 0 ? completedModules / training.modules.length : 0
  const calculatedProgress = Math.round((contentProgress * 0.6 + moduleProgress * 0.4) * 100)
  const progress = assignment.status === 'completed' || assignment.approvalStatus === 'approved' ? 100 : Math.min(100, calculatedProgress)
  const learningComplete = completedItems >= totalItems && completedModules >= training.modules.length
  let effectiveStatus = assignment.status
  if (assignment.approvalStatus === 'approved') effectiveStatus = 'completed'
  else if (assignment.status === 'pending_approval' && !learningComplete) effectiveStatus = 'active'
  else if (assignment.approvalStatus === 'pending' && learningComplete) effectiveStatus = 'pending_approval'
  return { assignment, training, totalItems, totalQuestions, completedItems, completedModules, progress, effectiveStatus, days: daysUntil(assignment.dueDate), cover: getTrainingCover(training) }
}

export function ParticipantTrainingsPage() {
  const { user } = useParticipantAuth()
  const navigate = useNavigate()
  const [assignments, setAssignments] = useState<TrainingAssignment[]>(() => readAssignments())
  const [filter, setFilter] = useState<FilterKey>('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortKey>('priority')

  useEffect(() => setAssignments(readAssignments()), [user])

  const trainings = useMemo(() => {
    if (!user) return []
    const trainingById = new Map(readTrainings().map((training) => [training.id, training]))
    return assignments
      .filter((assignment) => assignment.participantId === user.id)
      .map((assignment) => {
        const training = trainingById.get(assignment.trainingId)
        return training ? createTrainingView(assignment, training) : null
      })
      .filter((item): item is TrainingView => Boolean(item))
  }, [assignments, user])

  const counts = useMemo(() => ({
    all: trainings.length,
    active: trainings.filter((item) => item.effectiveStatus === 'active').length,
    pending_approval: trainings.filter((item) => item.effectiveStatus === 'pending_approval').length,
    completed: trainings.filter((item) => item.effectiveStatus === 'completed').length,
    expired: trainings.filter((item) => item.effectiveStatus === 'expired').length,
  }), [trainings])

  const visibleTrainings = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('tr-TR')
    const visible = trainings.filter((item) => {
      if (filter !== 'all' && item.effectiveStatus !== filter) return false
      if (!query) return true
      return `${item.training.name} ${item.training.description} ${item.training.risk} ${item.training.package}`.toLocaleLowerCase('tr-TR').includes(query)
    })
    return visible.sort((a, b) => {
      if (sort === 'name') return a.training.name.localeCompare(b.training.name, 'tr-TR')
      if (sort === 'progress') return b.progress - a.progress
      return statusOrder[a.effectiveStatus] - statusOrder[b.effectiveStatus] || a.days - b.days
    })
  }, [filter, search, sort, trainings])

  if (!user) return null
  const nextTraining = trainings.filter((item) => item.effectiveStatus === 'active').sort((a, b) => a.days - b.days || b.progress - a.progress)[0]
  const hasFilters = filter !== 'all' || Boolean(search.trim()) || sort !== 'priority'

  return (
    <div className="space-y-4 pb-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-700">Öğrenme alanım</p>
          <h1 className="mt-1 text-2xl font-bold tracking-[-0.035em] text-ink-900">Eğitimlerim</h1>
          <p className="mt-1 text-xs text-ink-500">{trainings.length} atanmış eğitim · İçerikleriniz ve onay süreçleriniz tek ekranda</p>
        </div>
        <button type="button" onClick={() => navigate('/katilimci/takvim')} className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink-200 bg-white px-3.5 py-2 text-xs font-semibold text-ink-700 shadow-sm transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"><CalendarDays className="h-4 w-4" /> Takvimimi aç</button>
      </header>

      {nextTraining && (
        <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-2xl border border-brand-200 bg-slate-950 text-white shadow-[0_12px_30px_-22px_rgba(15,23,42,0.8)]">
          <div className="flex min-h-[128px] flex-col sm:flex-row">
            <div className="relative hidden w-44 shrink-0 overflow-hidden sm:block">
              {nextTraining.cover ? <img src={nextTraining.cover} alt="" className="absolute inset-0 h-full w-full object-cover object-center" /> : <div className="grid h-full place-items-center bg-slate-900"><BookOpen className="h-7 w-7 text-slate-500" /></div>}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950" />
            </div>
            <div className="min-w-0 flex-1 p-4 sm:py-5 sm:pl-2 sm:pr-5">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-teal-300"><Play className="h-3 w-3 fill-current" /> Sıradaki eğitim</div>
              <h2 className="mt-2 truncate text-base font-bold">{nextTraining.training.name}</h2>
              <p className="mt-1 text-xs text-slate-300">%{nextTraining.progress} tamamlandı · {nextTraining.days < 0 ? `${Math.abs(nextTraining.days)} gün gecikti` : `${nextTraining.days} gün kaldı`}</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-teal-400" style={{ width: `${nextTraining.progress}%` }} /></div>
            </div>
            <div className="flex items-center p-4 pt-0 sm:p-5"><button type="button" onClick={() => navigate(`/katilimci/egitim/${nextTraining.assignment.id}`)} className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-teal-500 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-teal-400 sm:w-auto">{nextTraining.progress > 0 ? 'Eğitime devam et' : 'Eğitimi başlat'} <ChevronRight className="h-4 w-4" /></button></div>
          </div>
        </motion.section>
      )}

      <section className="rounded-2xl border border-ink-200/80 bg-white p-3 shadow-[0_5px_20px_-17px_rgba(15,23,42,0.3)]">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {filters.map((option) => <button key={option.key} type="button" onClick={() => setFilter(option.key)} className={cn('inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-colors', filter === option.key ? 'bg-ink-900 text-white' : 'border border-ink-200 bg-white text-ink-600 hover:bg-ink-50')}>{option.label}<span className={cn('rounded-full px-1.5 py-0.5 text-[9px]', filter === option.key ? 'bg-white/15 text-white' : 'bg-ink-100 text-ink-500')}>{counts[option.key]}</span></button>)}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="relative min-w-0 sm:w-60"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Eğitim ara..." className="w-full rounded-xl border border-ink-200 bg-ink-50/60 py-2 pl-9 pr-3 text-xs text-ink-800 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100" /></label>
            <select value={sort} onChange={(event) => setSort(event.target.value as SortKey)} className="rounded-xl border border-ink-200 bg-white px-3 py-2 text-xs font-medium text-ink-700 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"><option value="priority">Önceliğe göre</option><option value="progress">İlerlemeye göre</option><option value="name">Ada göre</option></select>
            {hasFilters && <button type="button" onClick={() => { setFilter('all'); setSearch(''); setSort('priority') }} className="inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-ink-500 hover:bg-ink-50 hover:text-ink-800"><RotateCcw className="h-3.5 w-3.5" /> Temizle</button>}
          </div>
        </div>
      </section>

      {trainings.length === 0 ? <EmptyState icon={BookOpen} title="Atanan eğitim bulunamadı" description="Henüz hesabınıza atanmış bir eğitim bulunmuyor." /> : visibleTrainings.length === 0 ? <EmptyState icon={Search} title="Sonuç bulunamadı" description="Farklı bir arama veya filtre deneyin." /> : (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-4 xl:grid-cols-2">
          {visibleTrainings.map((item, index) => <TrainingCard key={item.assignment.id} item={item} index={index} onOpen={() => navigate(item.assignment.approvalStatus === 'approved' ? `/katilimci/sertifika/${item.assignment.id}` : `/katilimci/egitim/${item.assignment.id}`)} />)}
        </motion.section>
      )}
    </div>
  )
}

function TrainingCard({ item, index, onOpen }: { item: TrainingView; index: number; onOpen: () => void }) {
  const status = getStatusInfo(item.effectiveStatus)
  const style = statusStyles[status.tone]
  const urgent = item.days >= 0 && item.days <= 7 && item.effectiveStatus !== 'completed'
  const overdue = item.days < 0 && item.effectiveStatus !== 'completed'
  const actionLabel = item.assignment.approvalStatus === 'approved' ? 'Sertifikayı görüntüle' : item.effectiveStatus === 'pending_approval' ? 'Sonucu görüntüle' : item.effectiveStatus === 'completed' ? 'Tekrar incele' : item.effectiveStatus === 'expired' ? 'İçeriği incele' : item.progress > 0 ? 'Devam et' : 'Başlat'

  return (
    <motion.article initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: index * 0.035 }} className="group overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-[0_7px_24px_-20px_rgba(15,23,42,0.4)] transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_14px_32px_-22px_rgba(15,23,42,0.42)]">
      <div className="flex h-full min-h-[290px] flex-col sm:flex-row">
        <div className="relative h-40 shrink-0 overflow-hidden bg-slate-950 sm:h-auto sm:w-44">
          {item.cover ? <img src={item.cover} alt={`${item.training.name} görseli`} className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.03]" /> : <div className="grid h-full place-items-center"><BookOpen className="h-8 w-8 text-slate-600" /></div>}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/10" />
          <span className={cn('absolute left-3 top-3 rounded-lg border px-2 py-1 text-[9px] font-bold shadow-sm', style.badge)}>{status.label}</span>
          <div className="absolute inset-x-0 bottom-0 p-3 text-white"><p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-teal-200">{item.training.package}</p><p className="mt-1 text-[10px] text-slate-200">{item.training.risk}</p></div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col p-4">
          <h2 className="line-clamp-2 text-[15px] font-bold leading-5 tracking-tight text-ink-900">{item.training.name}</h2>
          <p className="mt-1.5 line-clamp-2 text-[11px] leading-4 text-ink-500">{item.training.description}</p>
          <div className="mt-4"><div className="flex items-center justify-between text-[10px]"><span className="font-semibold text-ink-600">Eğitim ilerlemesi</span><span className="font-bold text-ink-800">%{item.progress}</span></div><div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink-100"><div className={cn('h-full rounded-full transition-all', style.bar)} style={{ width: `${item.progress}%` }} /></div></div>
          <div className="mt-3 grid grid-cols-3 divide-x divide-ink-100 rounded-xl border border-ink-100 bg-ink-50/60 py-2"><MiniMetric icon={Layers3} value={`${item.completedModules}/${item.training.modules.length}`} label="Modül" /><MiniMetric icon={BookOpen} value={`${item.completedItems}/${item.totalItems}`} label="İçerik" /><MiniMetric icon={Target} value={String(item.totalQuestions)} label="Soru" /></div>
          <div className="mt-auto flex items-end justify-between gap-3 pt-4">
            <div className={cn('min-w-0 text-[10px]', overdue ? 'text-rose-600' : urgent ? 'text-amber-600' : 'text-ink-500')}><p className="flex items-center gap-1 font-semibold"><Clock3 className="h-3.5 w-3.5" /> {formatDate(item.assignment.dueDate)}</p><p className="mt-0.5 truncate">{overdue ? `${Math.abs(item.days)} gün gecikti` : urgent ? `${item.days} gün kaldı` : item.effectiveStatus === 'pending_approval' ? 'Sonuç değerlendirmede' : item.assignment.approvalStatus === 'approved' ? 'Sertifika hazır' : 'Son tarih'}</p></div>
            <button type="button" onClick={onOpen} className={cn('inline-flex shrink-0 items-center gap-1 rounded-xl px-3.5 py-2 text-[11px] font-bold transition-colors', item.assignment.approvalStatus === 'approved' ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-ink-900 text-white hover:bg-brand-700')}>{item.assignment.approvalStatus === 'approved' && <Award className="h-3.5 w-3.5" />}{actionLabel}<ChevronRight className="h-3.5 w-3.5" /></button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function MiniMetric({ icon: Icon, value, label }: { icon: typeof Layers3; value: string; label: string }) {
  return <div className="px-2 text-center"><p className="flex items-center justify-center gap-1 text-[11px] font-bold text-ink-800"><Icon className="h-3 w-3 text-brand-600" />{value}</p><p className="mt-0.5 text-[9px] text-ink-400">{label}</p></div>
}

function EmptyState({ icon: Icon, title, description }: { icon: typeof BookOpen; title: string; description: string }) {
  return <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-white py-16 text-center"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink-50 text-ink-300"><Icon className="h-7 w-7" /></span><p className="mt-4 text-sm font-semibold text-ink-700">{title}</p><p className="mt-1 text-xs text-ink-400">{description}</p></div>
}
