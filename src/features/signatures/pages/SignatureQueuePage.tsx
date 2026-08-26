import { motion } from 'framer-motion'
import {
  CalendarClock,
  FileCheck2,
  FileSignature,
  Filter,
  PenLine,
  Search,
  ShieldCheck,
  Stamp,
  XCircle,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Button, Pagination, paginate, getPaginationIndices } from '@/components/ui'
import { cn } from '@/lib/utils'

type SignatureStatus = 'pending' | 'signed' | 'rejected' | 'expired'
type DocumentType = 'İSG sözleşmesi' | 'Risk değerlendirmesi' | 'Eğitim sertifikası' | 'Acil durum planı'
type TabKey = 'all' | 'pending' | 'signed' | 'rejected'

interface SignatureRecord {
  id: string
  document: string
  company: string
  type: DocumentType
  dueDate: string
  status: SignatureStatus
  recipient: string
}

const statusLabels: Record<SignatureStatus, string> = {
  pending: 'Bekliyor',
  signed: 'İmzalandı',
  rejected: 'Reddedildi',
  expired: 'Süresi doldu',
}

const statusClasses: Record<SignatureStatus, string> = {
  pending: 'border-amber-200 bg-amber-50 text-amber-700',
  signed: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  rejected: 'border-rose-200 bg-rose-50 text-rose-700',
  expired: 'border-red-300 bg-red-50 text-red-700',
}

const typeIcons: Record<DocumentType, typeof FileSignature> = {
  'İSG sözleşmesi': FileSignature,
  'Risk değerlendirmesi': ShieldCheck,
  'Eğitim sertifikası': FileCheck2,
  'Acil durum planı': Stamp,
}

const records: SignatureRecord[] = [
  { id: 'S-2011', document: '2026 İSG Hizmet Sözleşmesi', company: 'Quantis Tekstil', type: 'İSG sözleşmesi', dueDate: '14.09.2026', status: 'pending', recipient: 'Ahmet Yılmaz' },
  { id: 'S-2012', document: 'Üretim Hattı Risk Değerlendirmesi', company: 'Vesta Metal', type: 'Risk değerlendirmesi', dueDate: '09.09.2026', status: 'pending', recipient: 'Selin Arslan' },
  { id: 'S-2013', document: 'Temel İSG Eğitim Sertifikası', company: 'Pelion Gıda', type: 'Eğitim sertifikası', dueDate: '02.08.2026', status: 'signed', recipient: 'Selin Arslan' },
  { id: 'S-2014', document: 'Acil Durum Eylem Planı', company: 'Norden Lojistik', type: 'Acil durum planı', dueDate: '26.08.2026', status: 'expired', recipient: 'Burak Şahin' },
  { id: 'S-2015', document: 'Yüksekten Çalışma İzin Belgesi', company: 'Vesta Metal', type: 'Risk değerlendirmesi', dueDate: '20.09.2026', status: 'pending', recipient: 'Can Öztürk' },
  { id: 'S-2016', document: 'İlk Yardım Eğitim Sertifikası', company: 'Quantis Tekstil', type: 'Eğitim sertifikası', dueDate: '11.08.2026', status: 'signed', recipient: 'Mert Yıldız' },
  { id: 'S-2017', document: 'Yangın Güvenliği Sözleşmesi', company: 'Pelion Gıda', type: 'İSG sözleşmesi', dueDate: '30.08.2026', status: 'rejected', recipient: 'Deniz Koç' },
  { id: 'S-2018', document: 'Elektrik Güvenliği Risk Değerlendirmesi', company: 'Norden Lojistik', type: 'Risk değerlendirmesi', dueDate: '22.09.2026', status: 'pending', recipient: 'Emre Çelik' },
]

const tabs: { key: TabKey; label: string }[] = [
  { key: 'all', label: 'Tümü' },
  { key: 'pending', label: 'Bekleyen' },
  { key: 'signed', label: 'İmzalanan' },
  { key: 'rejected', label: 'Reddedilen' },
]

export function SignatureQueuePage() {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<TabKey>('all')
  const [typeFilter, setTypeFilter] = useState<'all' | DocumentType>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('tr-TR')
    return records.filter((item) => {
      const haystack = `${item.document} ${item.company} ${item.recipient}`.toLocaleLowerCase('tr-TR')
      return (!query || haystack.includes(query)) &&
        (activeTab === 'all' || item.status === activeTab) &&
        (typeFilter === 'all' || item.type === typeFilter)
    })
  }, [search, activeTab, typeFilter])

  useEffect(() => { setCurrentPage(1) }, [search, activeTab, typeFilter])

  const totalPages = Math.ceil(filtered.length / pageSize) || 1
  const paginatedItems = paginate(filtered, currentPage, pageSize)
  const { startIndex, endIndex } = getPaginationIndices(currentPage, pageSize, filtered.length)

  const tabCounts: Record<TabKey, number> = {
    all: records.length,
    pending: records.filter((r) => r.status === 'pending').length,
    signed: records.filter((r) => r.status === 'signed').length,
    rejected: records.filter((r) => r.status === 'rejected').length,
  }

  function clearFilters() {
    setSearch('')
    setActiveTab('all')
    setTypeFilter('all')
  }

  const hasActiveFilters = search || activeTab !== 'all' || typeFilter !== 'all'

  return (
    <div className="space-y-7">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-ink-400">
            <span>Ana menü</span><span>/</span><span className="text-ink-600">E-İmza Kuyruğu</span>
          </div>
          <h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[30px]">E-imza kuyruğu</h1>
          <p className="mt-1.5 max-w-2xl text-sm text-ink-500">Bekleyen elektronik imza taleplerini yönetin, belgeleri imzalayın veya reddedin.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" leftIcon={<CalendarClock className="h-4 w-4" strokeWidth={1.7} />} onClick={() => toast.info('İmza takvimi hazırlanacak.')}>İmza takvimi</Button>
          <Button size="md" leftIcon={<PenLine className="h-4 w-4" strokeWidth={1.7} />} onClick={() => toast.success('Toplu imzalama akışı başlatıldı.', { description: 'Bekleyen tüm belgeler sıraya alındı.' })}>Toplu imzala</Button>
        </div>
      </motion.div>

      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }} className="min-w-0 rounded-2xl border border-ink-200/80 bg-white shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]">
        <div className="border-b border-ink-100 p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-ink-900">İmza kuyruğu</h2>
                <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700">{filtered.length} belge</span>
              </div>
              <p className="mt-1 text-xs text-ink-400">Belge türüne ve durumuna göre filtreleyin, işlemleri uygulayın.</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" strokeWidth={1.7} />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Belge, firma veya alıcı ara..." className="h-10 w-full rounded-xl border border-ink-200 bg-ink-50/50 pl-9 pr-3 text-sm text-ink-800 outline-none transition-all placeholder:text-ink-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10 sm:w-72" />
              </div>
              <button type="button" onClick={() => setShowFilters((current) => !current)} className={cn('inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-3.5 text-xs font-semibold', showFilters ? 'border-brand-200 bg-brand-50 text-brand-700' : 'border-ink-200 text-ink-600 hover:bg-ink-50')}>
                <Filter className="h-4 w-4" strokeWidth={1.7} /> Filtreler
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-1.5 border-t border-ink-100 pt-5">
            {tabs.map((tab) => (
              <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key)} className={cn('inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors', activeTab === tab.key ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/25' : 'text-ink-600 hover:bg-ink-100')}>
                {tab.label}
                <span className={cn('rounded-full px-1.5 py-0.5 text-[10px] font-bold', activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-ink-100 text-ink-500')}>{tabCounts[tab.key]}</span>
              </button>
            ))}
          </div>

          {showFilters && (
            <div className="mt-5 grid gap-3 border-t border-ink-100 pt-5 sm:grid-cols-3">
              <label>
                <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink-400">Belge türü</span>
                <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as 'all' | DocumentType)} className="h-10 w-full rounded-xl border border-ink-200 bg-white px-3 text-xs font-semibold text-ink-700 outline-none focus:border-brand-500">
                  <option value="all">Tüm türler</option>
                  <option value="İSG sözleşmesi">İSG sözleşmesi</option>
                  <option value="Risk değerlendirmesi">Risk değerlendirmesi</option>
                  <option value="Eğitim sertifikası">Eğitim sertifikası</option>
                  <option value="Acil durum planı">Acil durum planı</option>
                </select>
              </label>
              <div className="flex items-end sm:col-span-2">
                <button type="button" onClick={clearFilters} disabled={!hasActiveFilters} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-ink-200 px-3 text-xs font-semibold text-ink-600 transition-colors hover:bg-ink-50 disabled:cursor-not-allowed disabled:opacity-50">
                  <XCircle className="h-4 w-4" strokeWidth={1.7} /> Filtreleri temizle
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="overflow-x-auto max-h-[calc(100dvh-380px)] overflow-y-auto">
          <table className="w-full min-w-[920px] text-left text-xs">
            <thead className="border-b border-ink-100 bg-ink-50/40 text-[10px] font-semibold uppercase tracking-wider text-ink-400">
              <tr>
                <th className="px-5 py-3.5 font-semibold sm:px-6">Belge</th>
                <th className="px-3 py-3.5 font-semibold">Firma</th>
                <th className="px-3 py-3.5 font-semibold">Tür</th>
                <th className="px-3 py-3.5 font-semibold">Son tarih</th>
                <th className="px-3 py-3.5 font-semibold">Durum</th>
                <th className="px-5 py-3.5 text-right font-semibold sm:px-6">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {paginatedItems.map((item) => {
                const Icon = typeIcons[item.type]
                return (
                  <tr key={item.id} className="group transition-colors hover:bg-brand-50/35">
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700"><Icon className="h-[18px] w-[18px]" strokeWidth={1.7} /></span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-ink-800">{item.document}</p>
                          <p className="mt-0.5 truncate text-[11px] text-ink-400">{item.id} · {item.recipient}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4"><p className="text-sm font-medium text-ink-700">{item.company}</p></td>
                    <td className="px-3 py-4"><span className="inline-flex rounded-md bg-ink-100 px-2 py-1 text-[11px] font-medium text-ink-600">{item.type}</span></td>
                    <td className="px-3 py-4">
                      <p className="text-sm font-medium text-ink-700">{item.dueDate}</p>
                      {item.status === 'expired' && <p className="mt-0.5 text-[11px] font-medium text-red-600">Süresi doldu</p>}
                    </td>
                    <td className="px-3 py-4">
                      <span className={cn('inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold', statusClasses[item.status])}>{statusLabels[item.status]}</span>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex items-center justify-end gap-2">
                        {item.status === 'pending' || item.status === 'expired' ? (
                          <>
                            <Button variant="subtle" size="sm" leftIcon={<PenLine className="h-3.5 w-3.5" strokeWidth={1.7} />} onClick={() => toast.success(`${item.document} imzalandı.`, { description: 'E-imza işlemi tamamlandı.' })}>İmzala</Button>
                            <button type="button" onClick={() => toast.error(`${item.document} reddedildi.`, { description: 'Belge imza kuyruğundan çıkarıldı.' })} className="grid h-9 w-9 place-items-center rounded-xl border border-ink-200 text-rose-500 transition-colors hover:bg-rose-50 hover:text-rose-700" aria-label="Reddet">
                              <XCircle className="h-4 w-4" strokeWidth={1.7} />
                            </button>
                          </>
                        ) : (
                          <button type="button" onClick={() => toast.info(`${item.document} detayı açılacak.`)} className="grid h-9 w-9 place-items-center rounded-xl border border-ink-200 text-ink-500 transition-colors hover:bg-ink-50 hover:text-ink-800" aria-label="Detay">
                            <FileCheck2 className="h-4 w-4" strokeWidth={1.7} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
              <FileSignature className="h-8 w-8 text-ink-300" strokeWidth={1.7} />
              <p className="text-sm font-semibold text-ink-700">Belge bulunamadı</p>
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
          itemName="belge"
        />
      </motion.section>
    </div>
  )
}
