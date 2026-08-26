import { motion } from 'framer-motion'
import {
  CalendarClock,
  Eye,
  Filter,
  Pencil,
  Plus,
  Search,
  XCircle,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Button, Pagination, paginate, getPaginationIndices } from '@/components/ui'
import { cn } from '@/lib/utils'

type AssignmentStatus = 'pending' | 'in_progress' | 'completed' | 'failed'
type RiskLevel = 'Az Tehlikeli' | 'Tehlikeli' | 'Çok Tehlikeli'

interface Assignment {
  id: string
  participant: string
  company: string
  training: string
  status: AssignmentStatus
  dueDate: string
  progress: number
  risk: RiskLevel
}

const statusLabels: Record<AssignmentStatus, string> = {
  pending: 'Bekliyor',
  in_progress: 'Devam ediyor',
  completed: 'Tamamlandı',
  failed: 'Başarısız',
}

const statusClasses: Record<AssignmentStatus, string> = {
  pending: 'border-amber-200 bg-amber-50 text-amber-700',
  in_progress: 'border-blue-200 bg-blue-50 text-blue-700',
  completed: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  failed: 'border-rose-200 bg-rose-50 text-rose-700',
}

const riskClasses: Record<RiskLevel, string> = {
  'Az Tehlikeli': 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Tehlikeli: 'border-amber-200 bg-amber-50 text-amber-700',
  'Çok Tehlikeli': 'border-rose-200 bg-rose-50 text-rose-700',
}

const assignments: Assignment[] = [
  { id: 'A-1041', participant: 'Mert Yıldız', company: 'Quantis Tekstil', training: 'Temel İSG Eğitimi', status: 'in_progress', dueDate: '12.09.2026', progress: 62, risk: 'Tehlikeli' },
  { id: 'A-1042', participant: 'Elif Demir', company: 'Pelion Gıda', training: 'Acil Durum Planı Eğitimi', status: 'pending', dueDate: '18.09.2026', progress: 0, risk: 'Az Tehlikeli' },
  { id: 'A-1043', participant: 'Burak Şahin', company: 'Norden Lojistik', training: 'Yüksekten Çalışma Eğitimi', status: 'completed', dueDate: '02.08.2026', progress: 100, risk: 'Çok Tehlikeli' },
  { id: 'A-1044', participant: 'Ayşe Kaya', company: 'Quantis Tekstil', training: 'Risk Değerlendirmesi Eğitimi', status: 'failed', dueDate: '28.07.2026', progress: 34, risk: 'Tehlikeli' },
  { id: 'A-1045', participant: 'Can Öztürk', company: 'Vesta Metal', training: 'İlk Yardım Eğitimi', status: 'in_progress', dueDate: '24.09.2026', progress: 48, risk: 'Çok Tehlikeli' },
  { id: 'A-1046', participant: 'Selin Arslan', company: 'Pelion Gıda', training: 'Temel İSG Eğitimi', status: 'completed', dueDate: '10.08.2026', progress: 100, risk: 'Az Tehlikeli' },
  { id: 'A-1047', participant: 'Emre Çelik', company: 'Norden Lojistik', training: 'Elektrik Güvenliği Eğitimi', status: 'pending', dueDate: '30.09.2026', progress: 0, risk: 'Tehlikeli' },
  { id: 'A-1048', participant: 'Zeynep Aydın', company: 'Vesta Metal', training: 'Yangın Güvenliği Eğitimi', status: 'in_progress', dueDate: '15.09.2026', progress: 71, risk: 'Çok Tehlikeli' },
  { id: 'A-1049', participant: 'Onur Yıldırım', company: 'Quantis Tekstil', training: 'Manuel Lifter Kullanımı', status: 'failed', dueDate: '15.07.2026', progress: 22, risk: 'Tehlikeli' },
  { id: 'A-1050', participant: 'Deniz Koç', company: 'Pelion Gıda', training: 'Temel İSG Eğitimi', status: 'pending', dueDate: '05.10.2026', progress: 0, risk: 'Az Tehlikeli' },
]

const companies = [...new Set(assignments.map((item) => item.company))].sort((a, b) => a.localeCompare(b, 'tr'))

function initials(name: string) {
  return name.split(' ').slice(0, 2).map((part) => part[0]).join('').toLocaleUpperCase('tr-TR')
}

export function AssignmentsPage() {
  const [search, setSearch] = useState('')
  const [companyFilter, setCompanyFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState<'all' | AssignmentStatus>('all')
  const [riskFilter, setRiskFilter] = useState<'all' | RiskLevel>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('tr-TR')
    return assignments.filter((item) => {
      const haystack = `${item.participant} ${item.company} ${item.training}`.toLocaleLowerCase('tr-TR')
      return (!query || haystack.includes(query)) &&
        (companyFilter === 'all' || item.company === companyFilter) &&
        (statusFilter === 'all' || item.status === statusFilter) &&
        (riskFilter === 'all' || item.risk === riskFilter)
    })
  }, [search, companyFilter, statusFilter, riskFilter])

  useEffect(() => { setCurrentPage(1) }, [search, companyFilter, statusFilter, riskFilter])

  const totalPages = Math.ceil(filtered.length / pageSize) || 1
  const paginatedItems = paginate(filtered, currentPage, pageSize)
  const { startIndex, endIndex } = getPaginationIndices(currentPage, pageSize, filtered.length)

  function clearFilters() {
    setSearch('')
    setCompanyFilter('all')
    setStatusFilter('all')
    setRiskFilter('all')
  }

  const hasActiveFilters = search || companyFilter !== 'all' || statusFilter !== 'all' || riskFilter !== 'all'

  return (
    <div className="space-y-7">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-ink-400">
            <span>Ana menü</span><span>/</span><span className="text-ink-600">Eğitim Atamaları</span>
          </div>
          <h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[30px]">Eğitim atamaları</h1>
          <p className="mt-1.5 max-w-2xl text-sm text-ink-500">Katılımcılara atanan eğitimleri takip edin, durumlarını ve son tarihlerini tek ekrandan yönetin.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" leftIcon={<CalendarClock className="h-4 w-4" strokeWidth={1.7} />} onClick={() => toast.info('Atama takvimi hazırlanacak.')}>Takvim görünümü</Button>
          <Button size="md" leftIcon={<Plus className="h-4 w-4" strokeWidth={1.7} />} onClick={() => toast.success('Yeni eğitim atama akışı başlatıldı.', { description: 'Katılımcı ve eğitim seçimi yapabilirsiniz.' })}>Eğitim ata</Button>
        </div>
      </motion.div>

      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }} className="min-w-0 rounded-2xl border border-ink-200/80 bg-white shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]">
        <div className="border-b border-ink-100 p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-ink-900">Atama listesi</h2>
                <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700">{filtered.length} kayıt</span>
              </div>
              <p className="mt-1 text-xs text-ink-400">Katılımcı, firma, durum ve risk seviyesine göre filtreleyin.</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" strokeWidth={1.7} />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Katılımcı, firma veya eğitim ara..." className="h-10 w-full rounded-xl border border-ink-200 bg-ink-50/50 pl-9 pr-3 text-sm text-ink-800 outline-none transition-all placeholder:text-ink-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10 sm:w-72" />
              </div>
              <button type="button" onClick={() => setShowFilters((current) => !current)} className={cn('inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-3.5 text-xs font-semibold', showFilters ? 'border-brand-200 bg-brand-50 text-brand-700' : 'border-ink-200 text-ink-600 hover:bg-ink-50')}>
                <Filter className="h-4 w-4" strokeWidth={1.7} /> Filtreler
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-5 grid gap-3 border-t border-ink-100 pt-5 sm:grid-cols-2 lg:grid-cols-4">
              <label>
                <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink-400">Firma</span>
                <select value={companyFilter} onChange={(event) => setCompanyFilter(event.target.value)} className="h-10 w-full rounded-xl border border-ink-200 bg-white px-3 text-xs font-semibold text-ink-700 outline-none focus:border-brand-500">
                  <option value="all">Tüm firmalar</option>
                  {companies.map((company) => <option key={company} value={company}>{company}</option>)}
                </select>
              </label>
              <label>
                <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink-400">Eğitim durumu</span>
                <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as 'all' | AssignmentStatus)} className="h-10 w-full rounded-xl border border-ink-200 bg-white px-3 text-xs font-semibold text-ink-700 outline-none focus:border-brand-500">
                  <option value="all">Tüm durumlar</option>
                  <option value="pending">Bekliyor</option>
                  <option value="in_progress">Devam ediyor</option>
                  <option value="completed">Tamamlandı</option>
                  <option value="failed">Başarısız</option>
                </select>
              </label>
              <label>
                <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink-400">Risk seviyesi</span>
                <select value={riskFilter} onChange={(event) => setRiskFilter(event.target.value as 'all' | RiskLevel)} className="h-10 w-full rounded-xl border border-ink-200 bg-white px-3 text-xs font-semibold text-ink-700 outline-none focus:border-brand-500">
                  <option value="all">Tüm seviyeler</option>
                  <option value="Az Tehlikeli">Az tehlikeli</option>
                  <option value="Tehlikeli">Tehlikeli</option>
                  <option value="Çok Tehlikeli">Çok tehlikeli</option>
                </select>
              </label>
              <div className="flex items-end">
                <button type="button" onClick={clearFilters} disabled={!hasActiveFilters} className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-ink-200 px-3 text-xs font-semibold text-ink-600 transition-colors hover:bg-ink-50 disabled:cursor-not-allowed disabled:opacity-50">
                  <XCircle className="h-4 w-4" strokeWidth={1.7} /> Filtreleri temizle
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="overflow-x-auto max-h-[calc(100dvh-380px)] overflow-y-auto">
          <table className="w-full min-w-[960px] text-left text-xs">
            <thead className="border-b border-ink-100 bg-ink-50/40 text-[10px] font-semibold uppercase tracking-wider text-ink-400">
              <tr>
                <th className="px-5 py-3.5 font-semibold sm:px-6">Katılımcı</th>
                <th className="px-3 py-3.5 font-semibold">Firma</th>
                <th className="px-3 py-3.5 font-semibold">Eğitim</th>
                <th className="px-3 py-3.5 font-semibold">Durum</th>
                <th className="px-3 py-3.5 font-semibold">Son tarih</th>
                <th className="px-5 py-3.5 text-right font-semibold sm:px-6">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {paginatedItems.map((item) => (
                <tr key={item.id} className="group transition-colors hover:bg-brand-50/35">
                  <td className="px-5 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-xs font-bold text-brand-700">{initials(item.participant)}</span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-ink-800">{item.participant}</p>
                        <p className="mt-0.5 truncate text-[11px] text-ink-400">{item.id} · %{item.progress} ilerleme</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <p className="text-sm font-medium text-ink-700">{item.company}</p>
                    <span className={cn('mt-1 inline-flex rounded-md border px-2 py-0.5 text-[10px] font-semibold', riskClasses[item.risk])}>{item.risk}</span>
                  </td>
                  <td className="px-3 py-4">
                    <p className="text-sm font-medium text-ink-700">{item.training}</p>
                    <div className="mt-1.5 h-1.5 w-32 overflow-hidden rounded-full bg-ink-100">
                      <div className={cn('h-full rounded-full', item.status === 'completed' ? 'bg-emerald-500' : item.status === 'failed' ? 'bg-rose-500' : item.status === 'in_progress' ? 'bg-blue-500' : 'bg-amber-500')} style={{ width: `${item.progress}%` }} />
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <span className={cn('inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold', statusClasses[item.status])}>{statusLabels[item.status]}</span>
                  </td>
                  <td className="px-3 py-4">
                    <p className="text-sm font-medium text-ink-700">{item.dueDate}</p>
                    {item.status === 'failed' && <p className="mt-0.5 text-[11px] font-medium text-rose-600">Süresi geçti</p>}
                  </td>
                  <td className="px-5 py-4 sm:px-6">
                    <div className="flex items-center justify-end gap-1">
                      <button type="button" onClick={() => toast.info(`${item.participant} için atama detayı açılacak.`)} className="grid h-8 w-8 place-items-center rounded-lg text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-800" aria-label="Görüntüle">
                        <Eye className="h-4 w-4" strokeWidth={1.7} />
                      </button>
                      <button type="button" onClick={() => toast.info(`${item.participant} ataması düzenlenecek.`)} className="grid h-8 w-8 place-items-center rounded-lg text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-800" aria-label="Düzenle">
                        <Pencil className="h-4 w-4" strokeWidth={1.7} />
                      </button>
                      <button type="button" onClick={() => toast.warning(`${item.participant} ataması iptal edildi.`, { description: 'İşlem geri alınabilir.' })} className="grid h-8 w-8 place-items-center rounded-lg text-rose-500 transition-colors hover:bg-rose-50 hover:text-rose-700" aria-label="İptal et">
                        <XCircle className="h-4 w-4" strokeWidth={1.7} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
              <Search className="h-8 w-8 text-ink-300" strokeWidth={1.7} />
              <p className="text-sm font-semibold text-ink-700">Sonuç bulunamadı</p>
              <p className="text-xs text-ink-400">Arama veya filtre kriterlerinizi güncelleyin.</p>
              {hasActiveFilters && <Button variant="outline" size="sm" className="mt-2" onClick={clearFilters}>Filtreleri temizle</Button>}
            </div>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filtered.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1) }}
          startIndex={startIndex}
          endIndex={endIndex}
          itemName="atama"
        />
      </motion.section>
    </div>
  )
}
