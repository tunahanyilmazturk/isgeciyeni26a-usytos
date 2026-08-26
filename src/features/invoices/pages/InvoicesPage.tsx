import { motion } from 'framer-motion'
import {
  ArrowDownToLine,
  Download,
  Eye,
  FileText,
  Plus,
  Search,
  Send,
  TrendingUp,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Button, Pagination, paginate, getPaginationIndices, ViewToggle, type ViewMode, BulkActionBar, Checkbox } from '@/components/ui'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'cancelled'

interface Invoice {
  id: string
  number: string
  company: string
  amount: number
  dueDate: string
  status: InvoiceStatus
}

const invoices: Invoice[] = [
  { id: '1', number: 'FAT-2026-001', company: 'Yıldız Mühendislik A.Ş.', amount: 48500, dueDate: '12 Eyl 2026', status: 'paid' },
  { id: '2', number: 'FAT-2026-002', company: 'Anadolu İnşaat Ltd. Şti.', amount: 32750, dueDate: '18 Eyl 2026', status: 'pending' },
  { id: '3', number: 'FAT-2026-003', company: 'Marmara Tekstil San. Tic.', amount: 61900, dueDate: '05 Eyl 2026', status: 'overdue' },
  { id: '4', number: 'FAT-2026-004', company: 'Ege Lojistik A.Ş.', amount: 24300, dueDate: '24 Eyl 2026', status: 'pending' },
  { id: '5', number: 'FAT-2026-005', company: 'Boğaziçi Metal Sanayi', amount: 15600, dueDate: '02 Eki 2026', status: 'pending' },
  { id: '6', number: 'FAT-2026-006', company: 'Anadolu İnşaat Ltd. Şti.', amount: 39800, dueDate: '28 Ağu 2026', status: 'cancelled' },
  { id: '7', number: 'FAT-2026-007', company: 'Yıldız Mühendislik A.Ş.', amount: 52400, dueDate: '08 Eyl 2026', status: 'paid' },
  { id: '8', number: 'FAT-2026-008', company: 'Marmara Tekstil San. Tic.', amount: 18750, dueDate: '15 Eki 2026', status: 'pending' },
]

const monthlyRevenue = [
  { name: 'Nis', tahsilat: 84000 },
  { name: 'May', tahsilat: 96500 },
  { name: 'Haz', tahsilat: 78200 },
  { name: 'Tem', tahsilat: 112800 },
  { name: 'Ağu', tahsilat: 104300 },
  { name: 'Eyl', tahsilat: 128900 },
]

const statusConfig: Record<InvoiceStatus, { label: string; className: string }> = {
  paid: { label: 'Ödendi', className: 'bg-emerald-50 text-emerald-600' },
  pending: { label: 'Bekliyor', className: 'bg-amber-50 text-amber-600' },
  overdue: { label: 'Vadesi geçti', className: 'bg-rose-50 text-rose-600' },
  cancelled: { label: 'İptal', className: 'bg-ink-100 text-ink-600' },
}

const currencyFormatter = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' })
const formatCurrency = (value: number) => currencyFormatter.format(value)

export function InvoicesPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | InvoiceStatus>('all')
  const [companyFilter, setCompanyFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [view, setView] = useState<ViewMode>('table')
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const companies = useMemo(() => Array.from(new Set(invoices.map((i) => i.company))), [])

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const matchesSearch =
        invoice.number.toLowerCase().includes(search.toLowerCase()) ||
        invoice.company.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter
      const matchesCompany = companyFilter === 'all' || invoice.company === companyFilter
      return matchesSearch && matchesStatus && matchesCompany
    })
  }, [search, statusFilter, companyFilter])

  useEffect(() => { setCurrentPage(1) }, [search, statusFilter, companyFilter])

  const totalPages = Math.ceil(filteredInvoices.length / pageSize) || 1
  const paginatedItems = paginate(filteredInvoices, currentPage, pageSize)
  const { startIndex, endIndex } = getPaginationIndices(currentPage, pageSize, filteredInvoices.length)

  const handleCreateInvoice = () => {
    toast.info('Yeni fatura oluşturma henüz hazır değil', { description: 'Fatura işlemleri backend bağlantısı sonrasında etkinleştirilecek.' })
  }

  const handleView = (invoice: Invoice) => {
    toast.info(`"${invoice.number}" görüntüleme henüz hazır değil`, { description: 'Fatura detay ekranı backend bağlantısı sonrasında etkinleştirilecek.' })
  }

  const handleDownloadInvoice = (invoice: Invoice) => {
    toast.info(`"${invoice.number}" indirilemedi`, { description: 'Fatura PDF dışa aktarma özelliği henüz hazır değil.' })
  }

  const handleSend = (invoice: Invoice) => {
    toast.info(`"${invoice.number}" gönderilemedi`, { description: 'Fatura gönderimi için backend ve e-posta bağlantısı gereklidir.' })
  }

  const toggleSelection = (id: string) => setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  const toggleAll = () => setSelectedIds((current) => current.length === paginatedItems.length ? [] : paginatedItems.map((item) => item.id))
  const handleBulkDelete = () => { toast.info('Fatura silme henüz hazır değil', { description: 'Faturalar statik demo verisi olarak gösteriliyor.' }); setSelectedIds([]) }

  const selectClass =
    'h-9 rounded-xl border border-ink-200 bg-white px-3 text-xs font-medium text-ink-700 outline-none transition-colors hover:border-ink-300 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/15'

  return (
    <div className="space-y-7">
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
      >
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-ink-400">
            <span>Ana menü</span>
            <span>/</span>
            <span className="text-ink-600">Faturalar</span>
          </div>
          <h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[30px]">Faturalar</h1>
          <p className="mt-1.5 text-sm text-ink-500">Faturaları görüntüleyin, takip edin ve tahsilat süreçlerini yönetin.</p>
        </div>
        <Button size="md" leftIcon={<Plus className="h-4 w-4" strokeWidth={1.8} />} onClick={handleCreateInvoice}>
          Fatura oluştur
        </Button>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6"
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-ink-900">Fatura listesi</h2>
            <p className="mt-1 text-xs text-ink-400">{filteredInvoices.length} fatura listeleniyor</p>
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" strokeWidth={1.8} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Fatura no veya firma ara..."
              className="h-9 w-full rounded-xl border border-ink-200 bg-white pl-9 pr-3 text-xs font-medium text-ink-700 outline-none transition-colors placeholder:text-ink-400 hover:border-ink-300 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/15"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as 'all' | InvoiceStatus)} className={selectClass} aria-label="Durum filtresi">
              <option value="all">Tüm durumlar</option>
              <option value="paid">Ödendi</option>
              <option value="pending">Bekliyor</option>
              <option value="overdue">Vadesi geçti</option>
              <option value="cancelled">İptal</option>
            </select>
            <select value={companyFilter} onChange={(e) => setCompanyFilter(e.target.value)} className={selectClass} aria-label="Firma filtresi">
              <option value="all">Tüm firmalar</option>
              {companies.map((company) => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
            <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className={selectClass} aria-label="Tarih aralığı filtresi">
              <option value="all">Tüm tarihler</option>
              <option value="month">Bu ay</option>
              <option value="quarter">Son 3 ay</option>
              <option value="year">Bu yıl</option>
            </select>
            <ViewToggle view={view} onChange={setView} />
          </div>
        </div>

        <BulkActionBar
          selectedCount={selectedIds.length}
          itemName="fatura"
          onClear={() => setSelectedIds([])}
          onDelete={handleBulkDelete}
        />

        {view === 'table' && (
        <div className="overflow-x-auto max-h-[calc(100dvh-380px)] overflow-y-auto">
          <table className="w-full min-w-[760px] text-left text-xs">
            <thead className="border-b border-ink-100 text-[10px] font-semibold uppercase tracking-wider text-ink-400">
              <tr>
                <th className="pb-3 font-semibold">
                  <Checkbox
                    checked={paginatedItems.length > 0 && selectedIds.length === paginatedItems.length}
                    onChange={toggleAll}
                    aria-label="Tümünü seç"
                    label={null}
                  />
                </th>
                <th className="pb-3 font-semibold">Fatura no</th>
                <th className="pb-3 font-semibold">Firma</th>
                <th className="pb-3 font-semibold">Tutar</th>
                <th className="pb-3 font-semibold">Vade tarihi</th>
                <th className="pb-3 font-semibold">Durum</th>
                <th className="pb-3 text-right font-semibold">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-ink-400">
                    Filtrelere uygun fatura bulunamadı.
                  </td>
                </tr>
              ) : (
                paginatedItems.map((invoice) => {
                  const status = statusConfig[invoice.status]
                  return (
                    <tr key={invoice.id} className="group transition-colors hover:bg-ink-50/60">
                      <td className="py-3.5">
                        <Checkbox
                          checked={selectedIds.includes(invoice.id)}
                          onChange={() => toggleSelection(invoice.id)}
                          aria-label={`${invoice.company} seç`}
                          label={null}
                        />
                      </td>
                      <td className="py-3.5">
                        <div className="flex items-center gap-3">
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                            <FileText className="h-4 w-4" strokeWidth={1.8} />
                          </span>
                          <span className="font-semibold text-ink-700">{invoice.number}</span>
                        </div>
                      </td>
                      <td className="py-3.5 text-ink-600">{invoice.company}</td>
                      <td className="py-3.5 font-semibold text-ink-800">{formatCurrency(invoice.amount)}</td>
                      <td className="py-3.5 text-ink-500">{invoice.dueDate}</td>
                      <td className="py-3.5">
                        <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold', status.className)}>
                          {status.label}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => handleView(invoice)}
                            className="grid h-8 w-8 place-items-center rounded-lg text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-800"
                            aria-label="Görüntüle"
                            title="Görüntüle"
                          >
                            <Eye className="h-4 w-4" strokeWidth={1.8} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDownloadInvoice(invoice)}
                            className="grid h-8 w-8 place-items-center rounded-lg text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-800"
                            aria-label="İndir"
                            title="İndir"
                          >
                            <Download className="h-4 w-4" strokeWidth={1.8} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSend(invoice)}
                            className="grid h-8 w-8 place-items-center rounded-lg text-ink-500 transition-colors hover:bg-brand-50 hover:text-brand-700"
                            aria-label="Gönder"
                            title="Gönder"
                          >
                            <Send className="h-4 w-4" strokeWidth={1.8} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
        )}

        {view === 'card' && (
          <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 sm:p-6">
            {paginatedItems.map((invoice) => {
              const status = statusConfig[invoice.status]
              return (
                <div key={invoice.id} className="rounded-2xl border border-ink-200/80 bg-white p-5 transition-all hover:border-brand-300 hover:shadow-[0_8px_24px_-12px_rgba(17,24,39,0.18)]">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-sm font-bold text-brand-700">{invoice.company[0]}</span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-ink-800">{invoice.company}</p>
                        <p className="mt-0.5 truncate text-[11px] text-ink-400">{invoice.id}</p>
                      </div>
                    </div>
                    <input type="checkbox" checked={selectedIds.includes(invoice.id)} onChange={() => toggleSelection(invoice.id)} aria-label={`${invoice.company} seç`} className="h-4 w-4 rounded border-ink-300" />
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-3">
                    <span className={cn('inline-flex whitespace-nowrap rounded-lg px-2.5 py-1 text-[11px] font-semibold', status.className)}>{status.label}</span>
                    <span className="text-sm font-bold text-ink-800">{invoice.amount.toLocaleString('tr-TR')} ₺</span>
                  </div>
                  <p className="mt-2 text-[11px] text-ink-400">Vade: {invoice.dueDate}</p>
                </div>
              )
            })}
            {paginatedItems.length === 0 && <div className="col-span-full py-16 text-center"><Search className="mx-auto h-8 w-8 text-ink-300" /><p className="mt-3 text-sm font-semibold text-ink-700">Fatura bulunamadı</p></div>}
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredInvoices.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1) }}
          startIndex={startIndex}
          endIndex={endIndex}
          itemName="fatura"
        />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-ink-900">Aylık tahsilat özeti</h2>
            <p className="mt-1 text-xs text-ink-400">Son 6 ayda tahsil edilen tutar (TRY)</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-700">
              <TrendingUp className="h-[18px] w-[18px]" strokeWidth={1.8} />
            </span>
            <Button variant="outline" size="sm" leftIcon={<ArrowDownToLine className="h-4 w-4" strokeWidth={1.8} />} onClick={() => toast.info('Tahsilat özeti dışa aktarma henüz hazır değil', { description: 'Bu özellik backend bağlantısı sonrasında etkinleştirilecek.' })}>
              Özet indir
            </Button>
          </div>
        </div>
        <div className="mt-6 h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyRevenue} margin={{ top: 8, right: 4, left: -4, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1c9f94" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="#1c9f94" stopOpacity={0.5} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#eef0f3" strokeDasharray="4 4" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9aa3b2', fontSize: 11 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9aa3b2', fontSize: 11 }} tickFormatter={(value) => `${value / 1000}K`} />
              <Tooltip
                cursor={{ fill: 'rgba(28,159,148,0.06)' }}
                contentStyle={{ border: '1px solid #e3e7ee', borderRadius: 12, boxShadow: '0 8px 24px -12px rgba(17,24,39,.25)', fontSize: 12 }}
                labelStyle={{ color: '#374151', fontWeight: 600, marginBottom: 4 }}
                formatter={(value) => [formatCurrency(Number(value)), 'Tahsilat']}
              />
              <Bar dataKey="tahsilat" name="Tahsilat" radius={[6, 6, 0, 0]} maxBarSize={48} fill="url(#revenueGradient)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.section>
    </div>
  )
}
