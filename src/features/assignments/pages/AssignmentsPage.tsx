import { motion } from 'framer-motion'
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Download,
  FileSpreadsheet,
  FileText,
  Layers3,
  Pencil,
  Search,
  SlidersHorizontal,
  Users,
  XCircle,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Button, Pagination, paginate, getPaginationIndices } from '@/components/ui'
import { cn } from '@/lib/utils'
import {
  getParticipantAssignmentSummaries,
  getActiveTrainingCount,
  type ParticipantAssignmentSummary,
} from '../data/assignments'

type AssignmentFilter = 'all' | 'assigned' | 'unassigned'

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

  const allSummaries = useMemo(() => getParticipantAssignmentSummaries(), [])
  const activeTrainingCount = useMemo(() => getActiveTrainingCount(), [])
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

  function handleExport(format: 'csv' | 'xlsx' | 'pdf') {
    toast.success(`${format.toUpperCase()} dışa aktarma başlatıldı`, {
      description: `${filtered.length} katılımcı listesi indiriliyor.`,
    })
  }

  function handleBulkAssign() {
    toast.success('Toplu eğitim atama akışı başlatıldı', {
      description: 'Katılımcı ve eğitim seçimi yapabilirsiniz.',
    })
  }

  function handleEditAssignment(summary: ParticipantAssignmentSummary) {
    toast.info(`${summary.participant.name} için atama düzenleme ekranı açılacak.`, {
      description: `${summary.activeCount} aktif, ${summary.pendingCount} onay bekleyen atama.`,
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
          <Button variant="outline" size="sm" leftIcon={<CalendarClock className="h-4 w-4" strokeWidth={1.7} />} onClick={() => toast.info('Atama takvimi hazırlanacak.')}>Takvim görünümü</Button>
          <Button size="md" leftIcon={<Users className="h-4 w-4" strokeWidth={1.7} />} onClick={handleBulkAssign}>Toplu eğitim atama</Button>
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

          {/* Dışa aktarma butonları */}
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-ink-100 pt-4">
            <button
              type="button"
              onClick={() => handleExport('csv')}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              <Download className="h-3.5 w-3.5" /> CSV indir
            </button>
            <button
              type="button"
              onClick={() => handleExport('xlsx')}
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              <FileSpreadsheet className="h-3.5 w-3.5" /> XLSX indir
            </button>
            <button
              type="button"
              onClick={() => handleExport('pdf')}
              className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-rose-700"
            >
              <FileText className="h-3.5 w-3.5" /> PDF indir
            </button>
          </div>
        </div>

        {/* Tablo */}
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

        {/* Pagination */}
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
      </motion.section>
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
