import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Layers3,
  List,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
  Users,
  X,
  XCircle,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Button, Pagination, paginate, getPaginationIndices } from '@/components/ui'
import { cn } from '@/lib/utils'
import { readParticipants, type Participant } from '@/features/participants/data/participants'
import { trainingCatalog } from '@/features/trainings/data/trainings'
import {
  addAssignment,
  getParticipantAssignmentSummaries,
  getActiveTrainingCount,
  readAssignments,
  removeAssignment,
  type ParticipantAssignmentSummary,
  type TrainingAssignment,
} from '../data/assignments'

type AssignmentFilter = 'all' | 'assigned' | 'unassigned'
type ViewMode = 'list' | 'calendar'

function initials(name: string) {
  return name.split(' ').slice(0, 2).map((part) => part[0]).join('').toLocaleUpperCase('tr-TR')
}

export function AssignmentsPage() {
  const [search, setSearch] = useState('')
  const [assignmentFilter, setAssignmentFilter] = useState<AssignmentFilter>('all')
  const [companyFilter, setCompanyFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [view, setView] = useState<ViewMode>('list')
  const [drawerParticipant, setDrawerParticipant] = useState<Participant | null | undefined>(undefined)

  const [allSummaries, setAllSummaries] = useState<ParticipantAssignmentSummary[]>(() => getParticipantAssignmentSummaries())
  const [activeTrainingCount, setActiveTrainingCount] = useState(() => getActiveTrainingCount())
  const companies = useMemo(
    () => [...new Set(allSummaries.map((s) => s.participant.company))].sort((a, b) => a.localeCompare(b, 'tr')),
    [allSummaries],
  )

  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('tr-TR')
    return allSummaries.filter((summary) => {
      const p = summary.participant
      const haystack = `${p.name} ${p.username} ${p.email} ${p.company}`.toLocaleLowerCase('tr-TR')
      const matchesSearch = !query || haystack.includes(query)
      const matchesCompany = companyFilter === 'all' || p.company === companyFilter
      const totalAssignments = summary.activeCount + summary.pendingCount + summary.completedCount
      const matchesAssignment =
        assignmentFilter === 'all' ||
        (assignmentFilter === 'assigned' && totalAssignments > 0) ||
        (assignmentFilter === 'unassigned' && totalAssignments === 0)
      return matchesSearch && matchesCompany && matchesAssignment
    })
  }, [allSummaries, search, companyFilter, assignmentFilter])

  useEffect(() => { setCurrentPage(1) }, [search, companyFilter, assignmentFilter])

  const totalPages = Math.ceil(filtered.length / pageSize) || 1
  const paginatedItems = paginate(filtered, currentPage, pageSize)
  const { startIndex, endIndex } = getPaginationIndices(currentPage, pageSize, filtered.length)

  function clearFilters() {
    setSearch('')
    setAssignmentFilter('all')
    setCompanyFilter('all')
  }

  const hasActiveFilters = search || assignmentFilter !== 'all' || companyFilter !== 'all'

  function handleBulkAssign() {
    toast.success('Toplu eğitim atama akışı başlatıldı', {
      description: 'Katılımcı ve eğitim seçimi yapabilirsiniz.',
    })
  }

  function refreshData() {
    setAllSummaries(getParticipantAssignmentSummaries())
    setActiveTrainingCount(getActiveTrainingCount())
  }

  const openDrawer = useCallback((participant: Participant | null) => {
    setDrawerParticipant(participant)
  }, [])

  const closeDrawer = useCallback(() => {
    setDrawerParticipant(null)
  }, [])

  function handleEditAssignment(summary: ParticipantAssignmentSummary) {
    openDrawer(summary.participant)
  }

  function handleAddAssignment(participantId: number, trainingId: string, dueDate: string) {
    addAssignment(participantId, trainingId, dueDate)
    refreshData()
    const training = trainingCatalog.find((t) => t.id === trainingId)
    toast.success('Eğitim atandı', {
      description: `${training?.name ?? 'Eğitim'} başarıyla atandı.`,
    })
  }

  function handleRemoveAssignment(assignmentId: string, trainingName: string) {
    removeAssignment(assignmentId)
    refreshData()
    toast.info('Atama kaldırıldı', {
      description: `${trainingName} ataması kaldırıldı.`,
    })
  }

  return (
    <div className="space-y-7">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-ink-400">
            <span>Ana menü</span><span>/</span><span className="text-ink-600">Eğitim Atamaları</span>
          </div>
          <h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[30px]">Eğitim atamaları</h1>
          <p className="mt-1.5 max-w-2xl text-sm text-ink-500">Global eğitimleri katılımcılara atayın, atama durumlarını tek ekrandan takip edin.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {/* View toggle */}
          <div className="inline-flex rounded-xl border border-ink-200 bg-white p-0.5">
            <button
              type="button"
              onClick={() => setView('list')}
              className={cn('inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition-colors', view === 'list' ? 'bg-brand-600 text-white' : 'text-ink-500 hover:bg-ink-50')}
            >
              <List className="h-3.5 w-3.5" strokeWidth={1.8} /> Liste
            </button>
            <button
              type="button"
              onClick={() => setView('calendar')}
              className={cn('inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition-colors', view === 'calendar' ? 'bg-brand-600 text-white' : 'text-ink-500 hover:bg-ink-50')}
            >
              <Calendar className="h-3.5 w-3.5" strokeWidth={1.8} /> Takvim
            </button>
          </div>
          <Button size="md" leftIcon={<Plus className="h-4 w-4" strokeWidth={1.7} />} onClick={() => openDrawer(null)}>Eğitim ata</Button>
          <Button variant="outline" size="md" leftIcon={<Users className="h-4 w-4" strokeWidth={1.7} />} onClick={handleBulkAssign}>Toplu atama</Button>
        </div>
      </motion.div>

      {/* Aktif eğitim banner'ı */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="flex items-center gap-3 rounded-2xl border border-brand-100 bg-gradient-to-r from-brand-50/80 via-white to-brand-50/40 px-5 py-3.5"
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">
          <Layers3 className="h-5 w-5" strokeWidth={1.8} />
        </span>
        <p className="text-sm text-ink-600">
          Sistem genelindeki aktif eğitim sayısı:{' '}
          <span className="bg-gradient-to-r from-brand-600 to-teal-600 bg-clip-text font-bold text-transparent">{activeTrainingCount}</span>
        </p>
      </motion.div>

      {/* Filtre + tablo kartı */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="min-w-0 rounded-2xl border border-ink-200/80 bg-white shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]"
      >
        {/* Filtre barı */}
        <div className="border-b border-ink-100 p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-ink-900">Filtreler</h2>
                <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700">{filtered.length} katılımcı</span>
              </div>
              <p className="mt-1 text-xs text-ink-400">Katılımcı listesini arama, eğitim ataması ve müşteriye göre daraltın; sonucu dışa aktarabilirsiniz.</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" strokeWidth={1.7} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Ad, kullanıcı adı veya e-posta"
                  className="h-10 w-full rounded-xl border border-ink-200 bg-ink-50/50 pl-9 pr-3 text-sm text-ink-800 outline-none transition-all placeholder:text-ink-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10 sm:w-72"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowFilters((current) => !current)}
                className={cn('inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-3.5 text-xs font-semibold', showFilters ? 'border-brand-200 bg-brand-50 text-brand-700' : 'border-ink-200 text-ink-600 hover:bg-ink-50')}
              >
                <SlidersHorizontal className="h-4 w-4" strokeWidth={1.7} /> Filtreler
              </button>
            </div>
          </div>

          {/* Detaylı filtreler */}
          {showFilters && (
            <div className="mt-5 grid gap-3 border-t border-ink-100 pt-5 sm:grid-cols-2 lg:grid-cols-3">
              <label>
                <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink-400">Eğitim ataması</span>
                <select
                  value={assignmentFilter}
                  onChange={(event) => setAssignmentFilter(event.target.value as AssignmentFilter)}
                  className="h-10 w-full rounded-xl border border-ink-200 bg-white px-3 text-xs font-semibold text-ink-700 outline-none focus:border-brand-500"
                >
                  <option value="all">Tümü</option>
                  <option value="assigned">Ataması olanlar</option>
                  <option value="unassigned">Ataması olmayanlar</option>
                </select>
              </label>
              <label>
                <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink-400">Müşteri</span>
                <select
                  value={companyFilter}
                  onChange={(event) => setCompanyFilter(event.target.value)}
                  className="h-10 w-full rounded-xl border border-ink-200 bg-white px-3 text-xs font-semibold text-ink-700 outline-none focus:border-brand-500"
                >
                  <option value="all">Tümü</option>
                  {companies.map((company) => <option key={company} value={company}>{company}</option>)}
                </select>
              </label>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={clearFilters}
                  disabled={!hasActiveFilters}
                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-ink-200 px-3 text-xs font-semibold text-ink-600 transition-colors hover:bg-ink-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <XCircle className="h-4 w-4" strokeWidth={1.7} /> Filtreleri temizle
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tablo (liste görünümü) */}
        {view === 'list' && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b border-ink-100 bg-ink-50/40 text-[10px] font-semibold uppercase tracking-wider text-ink-400">
              <tr>
                <th className="px-5 py-3.5 font-semibold sm:px-6">Katılımcı</th>
                <th className="px-3 py-3.5 font-semibold">Müşteri</th>
                <th className="px-3 py-3.5 font-semibold">Yürürlükte</th>
                <th className="px-3 py-3.5 font-semibold">Onay bekleyen</th>
                <th className="px-3 py-3.5 font-semibold">Tamamlanan</th>
                <th className="px-5 py-3.5 text-right font-semibold sm:px-6">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {paginatedItems.map((summary) => {
                const p = summary.participant
                return (
                  <tr key={p.id} className="group transition-colors hover:bg-brand-50/35">
                    {/* Katılımcı */}
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-50 text-xs font-bold text-brand-700 ring-1 ring-brand-100">
                          {initials(p.name)}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-ink-800">{p.name}</p>
                          <p className="mt-0.5 truncate text-[11px] text-ink-400">
                            {p.username} {p.email !== '—' && `— ${p.email}`}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Müşteri */}
                    <td className="px-3 py-4">
                      <p className="text-sm font-medium text-ink-700">{p.company}</p>
                      <p className="mt-0.5 text-[11px] text-ink-400">{p.department}</p>
                    </td>

                    {/* Yürürlükte (aktif) */}
                    <td className="px-3 py-4">
                      <CountBadge count={summary.activeCount} variant="active" />
                    </td>

                    {/* Onay bekleyen */}
                    <td className="px-3 py-4">
                      <CountBadge count={summary.pendingCount} variant="pending" />
                    </td>

                    {/* Tamamlanan */}
                    <td className="px-3 py-4">
                      <CountBadge count={summary.completedCount} variant="completed" />
                    </td>

                    {/* İşlem */}
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleEditAssignment(summary)}
                          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-50"
                        >
                          <Pencil className="h-3.5 w-3.5" strokeWidth={1.7} />
                          <span className="hidden sm:inline">Atama düzenle</span>
                          <ArrowRight className="h-3.5 w-3.5 sm:hidden" strokeWidth={1.7} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {/* Boş durum */}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
              <Search className="h-8 w-8 text-ink-300" strokeWidth={1.7} />
              <p className="text-sm font-semibold text-ink-700">Sonuç bulunamadı</p>
              <p className="text-xs text-ink-400">Arama veya filtre kriterlerinizi güncelleyin.</p>
              {hasActiveFilters && <Button variant="outline" size="sm" className="mt-2" onClick={clearFilters}>Filtreleri temizle</Button>}
            </div>
          )}
        </div>
        )}

        {/* Pagination (liste görünümü) */}
        {view === 'list' && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filtered.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1) }}
          startIndex={startIndex}
          endIndex={endIndex}
          itemName="katılımcı"
        />
        )}

        {/* Takvim görünümü */}
        {view === 'calendar' && (
          <AssignmentCalendar
            summaries={filtered}
          />
        )}
      </motion.section>

      {/* Bireysel atama drawer'ı */}
      <AnimatePresence>
        {drawerParticipant !== undefined && (
          <AssignmentDrawer
            participant={drawerParticipant}
            onClose={closeDrawer}
            onAddAssignment={handleAddAssignment}
            onRemoveAssignment={handleRemoveAssignment}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

/** Atama durumu etiketleri ve renkleri (takvimde de kullanılır) */
const assignmentStatusLabels: Record<TrainingAssignment['status'], string> = {
  active: 'Yürürlükte',
  pending_approval: 'Onay bekliyor',
  completed: 'Tamamlandı',
  expired: 'Süresi doldu',
}

const assignmentStatusClasses: Record<TrainingAssignment['status'], string> = {
  active: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  pending_approval: 'border-amber-200 bg-amber-50 text-amber-700',
  completed: 'border-brand-200 bg-brand-50 text-brand-700',
  expired: 'border-rose-200 bg-rose-50 text-rose-700',
}

const assignmentStatusDot: Record<TrainingAssignment['status'], string> = {
  active: 'bg-emerald-500',
  pending_approval: 'bg-amber-500',
  completed: 'bg-brand-500',
  expired: 'bg-rose-500',
}

/** Türkçe ay isimleri */
const MONTH_NAMES = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
]

/** Türkçe gün kısaltmaları (Pazartesi'den başlar) */
const DAY_LABELS = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']

/** "30.11.2026" formatını "2026-11-30" formatına çevirir (takvim için) */
function parseDueDate(dueDate: string): string | null {
  const match = dueDate.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
  if (!match) return null
  const [, day, month, year] = match
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

/** Aylık takvim grid'i — atamaları son tarihlere göre gösterir */
function AssignmentCalendar({
  summaries,
}: {
  summaries: ParticipantAssignmentSummary[]
}) {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDay, setSelectedDay] = useState<string | null>(null)

  // Tüm atamaları topla — participant bilgisini ekle
  const allAssignments = useMemo(() => {
    const result: Array<TrainingAssignment & { participantName: string; participantId: number; company: string }> = []
    summaries.forEach((summary) => {
      summary.assignments.forEach((a) => {
        result.push({
          ...a,
          participantName: summary.participant.name,
          participantId: summary.participant.id,
          company: summary.participant.company,
        })
      })
    })
    return result
  }, [summaries])

  // Atamaları tarihe göre grupla
  const assignmentsByDate = useMemo(() => {
    const map = new Map<string, typeof allAssignments>()
    allAssignments.forEach((a) => {
      const dateStr = parseDueDate(a.dueDate)
      if (!dateStr) return
      const existing = map.get(dateStr) ?? []
      existing.push(a)
      map.set(dateStr, existing)
    })
    return map
  }, [allAssignments])

  // Takvim grid'ini oluştur
  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const startWeekday = (firstDay.getDay() + 6) % 7 // Pazartesi=0
    const daysInMonth = lastDay.getDate()

    const days: Array<{ date: string | null; day: number | null; isToday: boolean }> = []
    // Önceki aydan gelen boş günler
    for (let i = 0; i < startWeekday; i++) {
      days.push({ date: null, day: null, isToday: false })
    }
    // Ayın günleri
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      const isToday = d === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
      days.push({ date: dateStr, day: d, isToday })
    }
    // Sonraki aydan gelen boş günler (grid'i tamamla)
    while (days.length % 7 !== 0) {
      days.push({ date: null, day: null, isToday: false })
    }
    return days
  }, [currentYear, currentMonth])

  function prevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear((y) => y - 1)
    } else {
      setCurrentMonth((m) => m - 1)
    }
    setSelectedDay(null)
  }

  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear((y) => y + 1)
    } else {
      setCurrentMonth((m) => m + 1)
    }
    setSelectedDay(null)
  }

  function goToToday() {
    setCurrentMonth(today.getMonth())
    setCurrentYear(today.getFullYear())
    setSelectedDay(null)
  }

  const selectedDayAssignments = selectedDay ? (assignmentsByDate.get(selectedDay) ?? []) : []
  const monthAssignmentsCount = allAssignments.filter((a) => {
    const dateStr = parseDueDate(a.dueDate)
    if (!dateStr) return false
    const [y, m] = dateStr.split('-')
    return Number(y) === currentYear && Number(m) === currentMonth + 1
  }).length

  return (
    <div className="p-5 sm:p-6">
      {/* Takvim header — ay navigasyonu */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold text-ink-900">{MONTH_NAMES[currentMonth]} {currentYear}</h3>
          <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[10px] font-bold text-brand-700">{monthAssignmentsCount} atama</span>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={goToToday} className="inline-flex h-9 items-center rounded-xl border border-ink-200 px-3 text-xs font-semibold text-ink-600 transition-colors hover:bg-ink-50">Bugün</button>
          <button type="button" onClick={prevMonth} className="grid h-9 w-9 place-items-center rounded-xl border border-ink-200 text-ink-500 transition-colors hover:bg-ink-50" aria-label="Önceki ay">
            <ChevronLeft className="h-4 w-4" strokeWidth={1.8} />
          </button>
          <button type="button" onClick={nextMonth} className="grid h-9 w-9 place-items-center rounded-xl border border-ink-200 text-ink-500 transition-colors hover:bg-ink-50" aria-label="Sonraki ay">
            <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* Gün başlıkları */}
      <div className="mb-2 grid grid-cols-7 gap-1.5">
        {DAY_LABELS.map((label) => (
          <div key={label} className="pb-2 text-center text-[10px] font-bold uppercase tracking-wide text-ink-400">{label}</div>
        ))}
      </div>

      {/* Takvim grid'i */}
      <div className="grid grid-cols-7 gap-1.5">
        {calendarDays.map((cell, idx) => {
          if (!cell.date) {
            return <div key={idx} className="min-h-[88px] rounded-xl border border-dashed border-ink-100 bg-ink-50/20" />
          }
          const dayAssignments = assignmentsByDate.get(cell.date) ?? []
          const isSelected = selectedDay === cell.date
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedDay(isSelected ? null : cell.date)}
              className={cn(
                'min-h-[88px] rounded-xl border p-2 text-left transition-all',
                isSelected ? 'border-brand-400 bg-brand-50/50 ring-2 ring-brand-500/15' :
                dayAssignments.length > 0 ? 'border-ink-200 bg-white hover:border-brand-300 hover:bg-brand-50/20' :
                'border-ink-100 bg-ink-50/20 hover:border-ink-200',
              )}
            >
              <div className="mb-1.5 flex items-center justify-between">
                <span className={cn('text-xs font-bold tabular-nums', cell.isToday ? 'grid h-6 w-6 place-items-center rounded-full bg-brand-600 text-white' : 'text-ink-600')}>
                  {cell.day}
                </span>
                {dayAssignments.length > 0 && (
                  <span className="rounded-full bg-ink-100 px-1.5 py-0.5 text-[9px] font-bold text-ink-600">{dayAssignments.length}</span>
                )}
              </div>
              {/* Atama noktaları (max 3 göster) */}
              <div className="space-y-1">
                {dayAssignments.slice(0, 3).map((a) => (
                  <div key={a.id} className="flex items-center gap-1 truncate">
                    <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', assignmentStatusDot[a.status])} />
                    <span className="truncate text-[10px] font-medium text-ink-600">{a.trainingName}</span>
                  </div>
                ))}
                {dayAssignments.length > 3 && (
                  <p className="text-[10px] font-semibold text-ink-400">+{dayAssignments.length - 3} daha</p>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Seçili günün detayları */}
      {selectedDay && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 rounded-2xl border border-brand-200 bg-brand-50/30 p-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-ink-900">
                {selectedDay.split('-').reverse().map((p, i) => i === 1 ? MONTH_NAMES[Number(p) - 1] : p).join(' ')}
              </h4>
              <p className="mt-0.5 text-xs text-ink-500">{selectedDayAssignments.length} atama bu tarihte sona eriyor</p>
            </div>
            <button type="button" onClick={() => setSelectedDay(null)} className="rounded-lg p-1.5 text-ink-400 hover:bg-white">
              <X className="h-4 w-4" />
            </button>
          </div>

          {selectedDayAssignments.length === 0 ? (
            <p className="text-xs text-ink-400">Bu tarihte atama yok.</p>
          ) : (
            <div className="space-y-2">
              {selectedDayAssignments.map((a) => (
                <div key={a.id} className="flex items-center justify-between gap-3 rounded-xl border border-ink-200 bg-white p-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className={cn('h-2 w-2 shrink-0 rounded-full', assignmentStatusDot[a.status])} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink-800">{a.trainingName}</p>
                      <p className="mt-0.5 truncate text-[11px] text-ink-400">{a.participantName} · {a.company}</p>
                    </div>
                  </div>
                  <span className={cn('inline-flex shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold', assignmentStatusClasses[a.status])}>
                    {assignmentStatusLabels[a.status]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Lejant */}
      <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-ink-100 pt-4">
        <p className="text-[10px] font-bold uppercase tracking-wide text-ink-400">Durum:</p>
        {(['active', 'pending_approval', 'completed', 'expired'] as const).map((status) => (
          <span key={status} className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink-600">
            <span className={cn('h-2 w-2 rounded-full', assignmentStatusDot[status])} />
            {assignmentStatusLabels[status]}
          </span>
        ))}
      </div>
    </div>
  )
}

/** Atama sayısı rozeti — duruma göre renkli */
function CountBadge({ count, variant }: { count: number; variant: 'active' | 'pending' | 'completed' }) {
  const styles = {
    active: count > 0 ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-ink-200 bg-ink-50 text-ink-400',
    pending: count > 0 ? 'border-amber-200 bg-amber-50 text-amber-700' : 'border-ink-200 bg-ink-50 text-ink-400',
    completed: count > 0 ? 'border-brand-200 bg-brand-50 text-brand-700' : 'border-ink-200 bg-ink-50 text-ink-400',
  }
  const icons = {
    active: <ClipboardCheck className="h-3 w-3" strokeWidth={2} />,
    pending: <Clock className="h-3 w-3" strokeWidth={2} />,
    completed: <CheckCircle2 className="h-3 w-3" strokeWidth={2} />,
  }
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold tabular-nums', styles[variant])}>
      {count > 0 && icons[variant]}
      {count}
    </span>
  )
}

/** Bireysel eğitim atama drawer'ı — katılımcı seçimi, mevcut atamalar, yeni atama ekleme */
function AssignmentDrawer({
  participant,
  onClose,
  onAddAssignment,
  onRemoveAssignment,
}: {
  participant: Participant | null
  onClose: () => void
  onAddAssignment: (participantId: number, trainingId: string, dueDate: string) => void
  onRemoveAssignment: (assignmentId: string, trainingName: string) => void
}) {
  const allParticipants = useMemo(() => readParticipants(), [])
  const [selectedParticipantId, setSelectedParticipantId] = useState<number | null>(participant?.id ?? null)
  const [selectedTrainingId, setSelectedTrainingId] = useState('')
  const [dueDate, setDueDate] = useState('')

  // Drawer açıldığında participant değişirse güncelle
  useEffect(() => {
    setSelectedParticipantId(participant?.id ?? null)
    setSelectedTrainingId('')
    setDueDate('')
  }, [participant])

  const selectedParticipant = allParticipants.find((p) => p.id === selectedParticipantId) ?? null
  const participantAssignments = useMemo(() => {
    if (!selectedParticipantId) return []
    return readAssignments().filter((a) => a.participantId === selectedParticipantId)
  }, [selectedParticipantId, onAddAssignment, onRemoveAssignment])

  // Katılımcının halihazırda atalı eğitimleri — tekrar atamayı önle
  const assignedTrainingIds = new Set(participantAssignments.map((a) => a.trainingId))
  const availableTrainings = trainingCatalog.filter((t) => !assignedTrainingIds.has(t.id))

  const canSubmit = selectedParticipantId !== null && selectedTrainingId && dueDate

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit || !selectedParticipantId) return
    onAddAssignment(selectedParticipantId, selectedTrainingId, dueDate)
    setSelectedTrainingId('')
    setDueDate('')
  }

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-ink-900/20 backdrop-blur-[2px]"
        role="presentation"
        onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}
      />

      {/* Drawer */}
      <motion.aside
        initial={{ opacity: 0, x: 32 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 32 }}
        className="fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-ink-200 bg-white shadow-[-20px_0_60px_-28px_rgba(17,24,39,0.32)]"
      >
        {/* Header */}
        <div className="border-b border-ink-100 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                <ClipboardCheck className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <div>
                <h2 className="text-base font-bold text-ink-900">Eğitim ataması</h2>
                <p className="mt-1 text-xs text-ink-500">
                  {participant ? `${participant.name} için atama yönetin` : 'Katılımcı seçip eğitim atayın'}
                </p>
              </div>
            </div>
            <button type="button" onClick={onClose} className="rounded-xl p-2 text-ink-400 hover:bg-ink-100" aria-label="Kapat">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* İçerik */}
        <div className="flex-1 space-y-6 p-6">
          {/* Katılımcı seçimi — participant null ise seçilebilir, değilse sabit */}
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink-400">Katılımcı</label>
            {participant ? (
              <div className="flex items-center gap-3 rounded-xl border border-ink-200 bg-ink-50/50 p-3.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-50 text-xs font-bold text-brand-700 ring-1 ring-brand-100">
                  {initials(participant.name)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink-800">{participant.name}</p>
                  <p className="mt-0.5 truncate text-[11px] text-ink-400">{participant.username} · {participant.company}</p>
                </div>
              </div>
            ) : (
              <select
                value={selectedParticipantId ?? ''}
                onChange={(e) => setSelectedParticipantId(e.target.value ? Number(e.target.value) : null)}
                className="h-11 w-full rounded-xl border border-ink-200 bg-white px-3 text-sm font-medium text-ink-800 outline-none focus:border-brand-500"
              >
                <option value="">Katılımcı seçin…</option>
                {allParticipants.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} — {p.company}</option>
                ))}
              </select>
            )}
          </div>

          {/* Mevcut atamalar */}
          {selectedParticipant && (
            <div>
              <div className="mb-3 flex items-center gap-2">
                <h3 className="text-xs font-bold uppercase tracking-wide text-ink-400">Mevcut atamalar</h3>
                <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[10px] font-bold text-ink-600">{participantAssignments.length}</span>
              </div>
              {participantAssignments.length === 0 ? (
                <div className="rounded-xl border border-dashed border-ink-200 bg-ink-50/30 px-4 py-6 text-center">
                  <p className="text-xs text-ink-400">Bu katılımcıya henüz eğitim atanmamış.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {participantAssignments.map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between gap-3 rounded-xl border border-ink-200 bg-white p-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-ink-800">{assignment.trainingName}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className={cn('inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold', assignmentStatusClasses[assignment.status])}>
                            {assignmentStatusLabels[assignment.status]}
                          </span>
                          <span className="text-[11px] text-ink-400">Son: {assignment.dueDate}</span>
                          {assignment.progress > 0 && assignment.progress < 100 && (
                            <span className="text-[11px] text-ink-400">· %{assignment.progress}</span>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveAssignment(assignment.id, assignment.trainingName)}
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-ink-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
                        aria-label="Atamayı kaldır"
                      >
                        <Trash2 className="h-4 w-4" strokeWidth={1.7} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Yeni atama formu */}
          {selectedParticipant && (
            <form onSubmit={handleSubmit} className="space-y-4 border-t border-ink-100 pt-5">
              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-ink-400">Yeni eğitim ata</h3>
              </div>

              {availableTrainings.length === 0 ? (
                <div className="rounded-xl border border-dashed border-ink-200 bg-ink-50/30 px-4 py-6 text-center">
                  <p className="text-xs text-ink-400">Tüm eğitimler bu katılımcıya zaten atanmış.</p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink-400">Eğitim</label>
                    <select
                      value={selectedTrainingId}
                      onChange={(e) => setSelectedTrainingId(e.target.value)}
                      className="h-11 w-full rounded-xl border border-ink-200 bg-white px-3 text-sm font-medium text-ink-800 outline-none focus:border-brand-500"
                    >
                      <option value="">Eğitim seçin…</option>
                      {availableTrainings.map((t) => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink-400">Son tarih</label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="h-11 w-full rounded-xl border border-ink-200 bg-white px-3 text-sm font-medium text-ink-800 outline-none focus:border-brand-500"
                    />
                  </div>

                  <Button type="submit" size="md" disabled={!canSubmit} leftIcon={<Plus className="h-4 w-4" strokeWidth={1.7} />} className="w-full">
                    Eğitimi ata
                  </Button>
                </>
              )}
            </form>
          )}
        </div>
      </motion.aside>
    </>
  )
}
