import { motion } from 'framer-motion'
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ExternalLink,
  ListChecks,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { readAssignments, type AssignmentStatus, type TrainingAssignment } from '@/features/assignments/data/assignments'
import { readTrainings, type Training } from '@/features/trainings/data/trainings'
import { useParticipantAuth } from '../ParticipantAuthContext'

type CalendarItem = { assignment: TrainingAssignment; training: Training }

const statusMeta: Record<AssignmentStatus, { label: string; dot: string; badge: string }> = {
  active: { label: 'Devam ediyor', dot: 'bg-sky-500', badge: 'bg-sky-50 text-sky-700 ring-sky-100' },
  pending_approval: { label: 'Onay bekliyor', dot: 'bg-amber-500', badge: 'bg-amber-50 text-amber-700 ring-amber-100' },
  completed: { label: 'Tamamlandı', dot: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 ring-emerald-100' },
  expired: { label: 'Süresi doldu', dot: 'bg-rose-500', badge: 'bg-rose-50 text-rose-700 ring-rose-100' },
}

function toDateKey(value: string): string | null {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value
  const match = value.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
  if (!match) return null
  return `${match[3]}-${match[2].padStart(2, '0')}-${match[1].padStart(2, '0')}`
}

function dateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function monthLabel(date: Date): string {
  return date.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })
}

function formatDueDate(value: string): string {
  const key = toDateKey(value)
  if (!key) return value
  return new Date(`${key}T12:00:00`).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function calendarDays(month: Date): Date[] {
  const first = new Date(month.getFullYear(), month.getMonth(), 1)
  const mondayOffset = (first.getDay() + 6) % 7
  const start = new Date(month.getFullYear(), month.getMonth(), 1 - mondayOffset)
  return Array.from({ length: 42 }, (_, index) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + index))
}

export function ParticipantCalendarPage() {
  const { user } = useParticipantAuth()
  const navigate = useNavigate()
  const [month, setMonth] = useState(() => new Date())
  const [selectedKey, setSelectedKey] = useState(() => dateKey(new Date()))
  const [assignments] = useState(() => readAssignments())

  const items = useMemo<CalendarItem[]>(() => {
    if (!user) return []
    const trainings = readTrainings()
    return assignments
      .filter((assignment) => assignment.participantId === user.id)
      .map((assignment) => ({ assignment, training: trainings.find((training) => training.id === assignment.trainingId) }))
      .filter((item): item is CalendarItem => Boolean(item.training))
  }, [assignments, user])

  const byDate = useMemo(() => {
    const grouped = new Map<string, CalendarItem[]>()
    items.forEach((item) => {
      const key = toDateKey(item.assignment.dueDate)
      if (!key) return
      grouped.set(key, [...(grouped.get(key) ?? []), item])
    })
    return grouped
  }, [items])

  const selectedItems = byDate.get(selectedKey) ?? []
  const days = calendarDays(month)
  const todayKey = dateKey(new Date())
  const activeCount = items.filter((item) => item.assignment.status === 'active').length
  const completedCount = items.filter((item) => item.assignment.status === 'completed').length

  function shiftMonth(offset: number) {
    const nextMonth = new Date(month.getFullYear(), month.getMonth() + offset, 1)
    setMonth(nextMonth)
    setSelectedKey(dateKey(nextMonth))
  }

  if (!user) return null

  return (
    <div className="space-y-3">
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} className="overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-[0_5px_24px_-16px_rgba(17,24,39,0.24)]">
        <div className="grid items-start gap-4 p-3 sm:p-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.85fr)]">
          <div className="min-w-0">
            <div className="flex items-center justify-between gap-3 rounded-xl border border-ink-100 bg-ink-50/40 px-3 py-2.5">
              <div className="flex items-center gap-2.5"><span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-100 text-brand-700"><CalendarDays className="h-4 w-4" /></span><h2 className="text-sm font-bold capitalize text-ink-900">{monthLabel(month)}</h2></div>
              <div className="flex items-center gap-1"><button type="button" onClick={() => { setMonth(new Date()); setSelectedKey(todayKey) }} className="rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-brand-700 hover:bg-brand-50">Bugün</button><button type="button" onClick={() => shiftMonth(-1)} className="grid h-8 w-8 place-items-center rounded-lg text-ink-500 hover:bg-white" aria-label="Önceki ay"><ChevronLeft className="h-4 w-4" /></button><button type="button" onClick={() => shiftMonth(1)} className="grid h-8 w-8 place-items-center rounded-lg text-ink-500 hover:bg-white" aria-label="Sonraki ay"><ChevronRight className="h-4 w-4" /></button></div>
            </div>
            <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[9px] font-bold uppercase tracking-wide text-ink-400 sm:gap-1.5"><span>Pzt</span><span>Sal</span><span>Çar</span><span>Per</span><span>Cum</span><span>Cmt</span><span>Paz</span></div>
            <div className="mt-1.5 grid grid-cols-7 gap-1 sm:gap-1.5">
              {days.map((day) => {
                const key = dateKey(day)
                const dayItems = byDate.get(key) ?? []
                const isCurrentMonth = day.getMonth() === month.getMonth()
                const isSelected = key === selectedKey
                return <button key={key} type="button" onClick={() => setSelectedKey(key)} className={cn('min-h-[70px] rounded-xl border p-2 text-left transition-colors sm:min-h-[82px]', isSelected ? 'border-brand-400 bg-brand-50/70 shadow-sm' : 'border-ink-100 hover:border-brand-200 hover:bg-brand-50/30', !isCurrentMonth && 'bg-ink-50/30 opacity-45')}><span className={cn('inline-grid h-6 w-6 place-items-center rounded-full text-[11px] font-bold', key === todayKey ? 'bg-brand-600 text-white' : 'text-ink-600')}>{day.getDate()}</span><span className="mt-1.5 block space-y-1">{dayItems.slice(0, 2).map((item) => <span key={item.assignment.id} className="flex items-center gap-1 truncate text-[9px] font-semibold text-ink-600"><span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', statusMeta[item.assignment.status].dot)} />{item.training.name}</span>)}{dayItems.length > 2 && <span className="block text-[9px] font-bold text-brand-700">+{dayItems.length - 2} eğitim</span>}</span></button>
              })}
            </div>
          </div>

          <aside className="space-y-3 lg:sticky lg:top-4">
            <div className="rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50/70 via-white to-white p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-700">Seçili gün</p><h2 className="mt-1 text-base font-bold text-ink-900">{selectedItems.length ? formatDueDate(selectedItems[0].assignment.dueDate) : 'Planlanan işlem yok'}</h2></div><span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-100 text-brand-700"><ListChecks className="h-4 w-4" /></span></div><p className="mt-3 text-xs leading-5 text-ink-500">{selectedItems.length ? `${selectedItems.length} eğitim bu tarihte takip ediliyor.` : 'Takvimde bir gün seçerek o güne ait eğitimleri görüntüleyin.'}</p></div>
            <div className="rounded-2xl border border-ink-200 bg-white p-4"><div className="grid grid-cols-2 gap-2"><div className="rounded-xl bg-sky-50 p-3"><p className="text-[10px] font-semibold text-sky-700">Devam eden</p><p className="mt-1 text-xl font-bold text-ink-900">{activeCount}</p></div><div className="rounded-xl bg-emerald-50 p-3"><p className="text-[10px] font-semibold text-emerald-700">Tamamlanan</p><p className="mt-1 text-xl font-bold text-ink-900">{completedCount}</p></div></div></div>
            <div className="rounded-2xl border border-ink-100 bg-ink-50/40 p-3.5"><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-ink-400">Seçili gündeki eğitimler</p>{selectedItems.length ? <div className="space-y-2">{selectedItems.map(({ assignment, training }) => { const meta = statusMeta[assignment.status]; return <div key={assignment.id} className="rounded-xl border border-ink-100 bg-white p-3"><div className="flex items-start justify-between gap-2"><div className="min-w-0"><p className="truncate text-xs font-bold text-ink-900">{training.name}</p><p className="mt-1 flex items-center gap-1 text-[10px] text-ink-400"><Clock3 className="h-3 w-3" /> %{assignment.progress} tamamlandı</p></div><span className={cn('shrink-0 rounded-full px-2 py-1 text-[9px] font-bold ring-1', meta.badge)}>{meta.label}</span></div>{assignment.status === 'active' && <button type="button" onClick={() => navigate(`/katilimci/egitim/${assignment.id}`)} className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-brand-700 hover:text-brand-800">Eğitime devam et <ExternalLink className="h-3 w-3" /></button>}</div> })}</div> : <p className="py-3 text-xs leading-5 text-ink-500">Bu gün için kayıtlı bir eğitim son tarihi bulunmuyor.</p>}</div>
            <div className="flex flex-wrap gap-x-3 gap-y-2 px-1 text-[10px] font-medium text-ink-500"><span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-sky-500" />Devam ediyor</span><span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" />Onay bekliyor</span><span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Tamamlandı</span></div>
          </aside>
        </div>
      </motion.section>
    </div>
  )
}
