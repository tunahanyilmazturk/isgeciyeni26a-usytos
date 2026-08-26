import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import {
  ArrowDownToLine,
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Edit3,
  FileCheck2,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Trash2,
  Upload,
  Users,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button, Input } from '@/components/ui'
import { downloadCustomerList } from '@/lib/excel'
import { cn } from '@/lib/utils'
import { readCustomers, saveCustomers, type Customer, type RiskLevel, type ContractStatus } from '../data/customers'

const riskLevels: RiskLevel[] = ['Az tehlikeli', 'Tehlikeli', 'Çok tehlikeli']
const contractStatuses: ContractStatus[] = ['Devam ediyor', 'Teklif aşamasında', 'Sonlandırıldı']
const experts = ['Barış Eren', 'Deniz Kara', 'Mert Acar', 'Ozan Tekin', 'Seda Yalçın']
const doctors = ['Elif Demir', 'Onur Polat']

const customerSchema = z.object({
  name: z.string().trim().min(2, 'Firma adı en az 2 karakter olmalı.'),
  taxNumber: z.string().trim().min(5, 'Vergi numarası gerekli.'),
  sector: z.string().trim().min(2, 'Sektör bilgisi gerekli.'),
  location: z.string().trim().min(2, 'Merkez bilgisi gerekli.'),
  employees: z.string().regex(/^\d+$/, 'Çalışan sayısı rakam olmalı.'),
  riskLevel: z.string().min(1, 'Tehlike sınıfı seçiniz.'),
  expert: z.string(),
  doctor: z.string(),
  contactName: z.string().trim().min(2, 'Yetkili adı gerekli.'),
  contactEmail: z.string().trim().email('Geçerli bir e-posta giriniz.'),
  contactPhone: z.string().trim().min(7, 'Telefon bilgisi gerekli.'),
})

type CustomerForm = z.infer<typeof customerSchema>

function formatNumber(value: number) {
  return new Intl.NumberFormat('tr-TR').format(value)
}

function initials(name: string) {
  return name.split(' ').slice(0, 2).map((part) => part[0]).join('').toLocaleUpperCase('tr-TR')
}

function riskClass(risk: RiskLevel) {
  if (risk === 'Çok tehlikeli') return 'border-rose-200 bg-rose-50 text-rose-700'
  if (risk === 'Tehlikeli') return 'border-amber-200 bg-amber-50 text-amber-700'
  return 'border-emerald-200 bg-emerald-50 text-emerald-700'
}

function contractClass(status: ContractStatus) {
  if (status === 'Devam ediyor') return 'text-brand-700'
  if (status === 'Teklif aşamasında') return 'text-amber-700'
  return 'text-ink-500'
}

export function CustomersPage() {
  const [customers, setCustomers] = useState(() => readCustomers())
  const [search, setSearch] = useState('')
  useEffect(() => {
    saveCustomers(customers)
  }, [customers])
  const [riskFilter, setRiskFilter] = useState('all')
  const [expertFilter, setExpertFilter] = useState('all')
  const [doctorFilter, setDoctorFilter] = useState('all')
  const [contractFilter, setContractFilter] = useState('all')
  const [approvalFilter, setApprovalFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState<'active' | 'passive' | 'all'>('active')
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const navigate = useNavigate()

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CustomerForm>({
    resolver: zodResolver(customerSchema),
    defaultValues: { name: '', taxNumber: '', sector: '', location: '', employees: '0', riskLevel: '', expert: '', doctor: '', contactName: '', contactEmail: '', contactPhone: '' },
  })

  useEffect(() => {
    if (!isModalOpen && !selectedCustomer) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsModalOpen(false)
        setSelectedCustomer(null)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isModalOpen, selectedCustomer])

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('tr-TR')
    const filtered = customers.filter((customer) => {
      const haystack = `${customer.name} ${customer.taxNumber} ${customer.sector} ${customer.location} ${customer.contactName} ${customer.contactEmail}`.toLocaleLowerCase('tr-TR')
      return (!query || haystack.includes(query)) &&
        (riskFilter === 'all' || customer.riskLevel === riskFilter) &&
        (expertFilter === 'all' || (expertFilter === 'none' ? !customer.expert : customer.expert === expertFilter)) &&
        (doctorFilter === 'all' || (doctorFilter === 'none' ? !customer.doctor : customer.doctor === doctorFilter)) &&
        (contractFilter === 'all' || customer.contractStatus === contractFilter) &&
        (approvalFilter === 'all' || customer.approvalStatus === approvalFilter) &&
        (statusFilter === 'all' || customer.status === statusFilter)
    })
    return [...filtered].sort((a, b) => {
      if (sortBy === 'nameAsc') return a.name.localeCompare(b.name, 'tr')
      if (sortBy === 'nameDesc') return b.name.localeCompare(a.name, 'tr')
      if (sortBy === 'employeesAsc') return a.employees - b.employees
      if (sortBy === 'employeesDesc') return b.employees - a.employees
      return b.id - a.id
    })
  }, [customers, search, riskFilter, expertFilter, doctorFilter, contractFilter, approvalFilter, statusFilter, sortBy])

  const activeCustomers = customers.filter((customer) => customer.status === 'active')
  const totalEmployees = activeCustomers.reduce((sum, customer) => sum + customer.employees, 0)
  const pendingApprovals = activeCustomers.filter((customer) => customer.approvalStatus === 'Onay bekliyor').length
  const activeContracts = activeCustomers.filter((customer) => customer.contractStatus === 'Devam ediyor').length

  function clearFilters() {
    setSearch('')
    setRiskFilter('all')
    setExpertFilter('all')
    setDoctorFilter('all')
    setContractFilter('all')
    setApprovalFilter('all')
    setStatusFilter('active')
    setSortBy('newest')
  }

  function exportCustomers() {
    downloadCustomerList(customers)
    toast.success('Müşteri listesi XLSX olarak indirildi')
  }

  function onSubmit(data: CustomerForm) {
    const customer: Customer = {
      id: Date.now(),
      name: data.name,
      taxNumber: data.taxNumber,
      sector: data.sector,
      location: data.location,
      employees: Number(data.employees),
      riskLevel: data.riskLevel as RiskLevel,
      expert: data.expert,
      doctor: data.doctor,
      expertMinutes: 0,
      doctorMinutes: 0,
      contractStatus: 'Teklif aşamasında',
      approvalStatus: 'Onay bekliyor',
      status: 'active',
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      updatedAt: 'Az önce',
    }
    setCustomers((current) => [customer, ...current])
    reset()
    setIsModalOpen(false)
    toast.success('Müşteri başarıyla eklendi', { description: `${customer.name} müşteri portföyüne eklendi.` })
  }

  function handleDelete(customer: Customer) {
    if (!window.confirm(`${customer.name} kaydı silinsin mi?`)) return
    setCustomers((current) => current.filter((item) => item.id !== customer.id))
    setSelectedCustomer(null)
    toast.success('Müşteri kaydı silindi')
  }

  const filterCount = [riskFilter, expertFilter, doctorFilter, contractFilter, approvalFilter].filter((value) => value !== 'all').length + (statusFilter !== 'active' ? 1 : 0)

  return (
    <div className="space-y-7">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-ink-400"><span>Ana menü</span><span>/</span><span className="text-ink-600">Müşteriler</span></div>
          <h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[30px]">Müşteriler</h1>
          <p className="mt-1.5 max-w-2xl text-sm text-ink-500">Hizmet verdiğiniz firmaları, sözleşme süreçlerini ve İSG atamalarını tek ekrandan yönetin.</p>
        </div>
        <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto">
          <Link to="/dashboard/firmalar/toplu-isg-import" className="inline-flex h-9 min-w-0 items-center justify-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-3 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-100 sm:px-3.5 sm:text-sm"><Upload className="h-4 w-4 shrink-0" /> <span className="truncate">Toplu aktarım</span></Link>
          <Button className="h-9 min-w-0 px-3 text-xs sm:px-3.5 sm:text-sm" variant="outline" size="sm" leftIcon={<ArrowDownToLine className="h-4 w-4" />} onClick={exportCustomers}>Dışa aktar</Button>
          <Link to="/dashboard/firmalar/yeni" className="col-span-2 inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-brand-600 px-3 text-xs font-semibold text-white shadow-sm shadow-brand-600/20 transition-colors hover:bg-brand-700 sm:col-span-1 sm:h-10 sm:px-4 sm:text-sm"><Plus className="h-4 w-4" /> Yeni müşteri</Link>
        </div>
      </motion.div>

      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.04 }} className="relative overflow-hidden rounded-2xl bg-brand-900 px-5 py-5 text-white shadow-[0_12px_32px_-18px_rgba(18,70,65,0.5)] sm:px-7 sm:py-6">
        <div className="absolute -right-8 -top-20 h-56 w-56 rounded-full border-[26px] border-brand-800/50" />
        <div className="absolute -bottom-24 right-32 h-44 w-44 rounded-full border-[18px] border-brand-800/40" />
        <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-200"><span className="h-1.5 w-1.5 rounded-full bg-brand-300" /> Portföy özeti</div>
            <h2 className="text-lg font-semibold tracking-[-0.02em] sm:text-xl">Müşteri portföyünüz kontrol altında.</h2>
            <p className="mt-1.5 max-w-xl text-sm leading-6 text-brand-100/75">Aktif firmalarınızın sözleşme ve onay durumlarını takip edin, kritik adımları zamanında tamamlayın.</p>
          </div>
          <div className="flex shrink-0 items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm"><div className="grid h-9 w-9 place-items-center rounded-lg bg-white/10"><Building2 className="h-[18px] w-[18px] text-brand-100" /></div><div><p className="text-2xl font-bold leading-none">{activeCustomers.length}</p><p className="mt-1 text-[11px] text-brand-100/70">aktif müşteri</p></div><ArrowRight className="ml-2 h-4 w-4 text-brand-200" /></div>
        </div>
      </motion.section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Toplam müşteri', value: customers.length, detail: `${activeCustomers.length} aktif · ${customers.length - activeCustomers.length} pasif`, icon: Building2, tone: 'teal' },
          { label: 'Aktif sözleşme', value: activeContracts, detail: 'Hizmet devam ediyor', icon: FileCheck2, tone: 'violet' },
          { label: 'Toplam çalışan', value: formatNumber(totalEmployees), detail: 'Aktif portföy içindeki kişi', icon: Users, tone: 'blue' },
          { label: 'Onay bekleyen', value: pendingApprovals, detail: pendingApprovals ? 'Aksiyon gerektiren kayıt' : 'Bekleyen kayıt yok', icon: CircleAlert, tone: 'amber' },
        ].map((stat, index) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]">
            <div className="flex items-start justify-between gap-3"><p className="text-[13px] font-medium text-ink-500">{stat.label}</p><span className={cn('grid h-9 w-9 place-items-center rounded-xl', stat.tone === 'teal' && 'bg-brand-50 text-brand-700', stat.tone === 'violet' && 'bg-violet-50 text-violet-600', stat.tone === 'blue' && 'bg-sky-50 text-sky-600', stat.tone === 'amber' && 'bg-amber-50 text-amber-600')}><stat.icon className="h-[18px] w-[18px]" strokeWidth={1.8} /></span></div>
            <p className="mt-4 text-xl font-bold tracking-[-0.03em] text-ink-900">{stat.value}</p><p className="mt-1 text-xs text-ink-400">{stat.detail}</p>
          </motion.div>
        ))}
      </section>

      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }} className="min-w-0 rounded-2xl border border-ink-200/80 bg-white shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]">
        <div className="border-b border-ink-100 p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div><div className="flex items-center gap-2"><h2 className="text-sm font-semibold text-ink-900">Müşteri portföyü</h2><span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700">{filteredCustomers.length} kayıt</span></div><p className="mt-1 text-xs text-ink-400">Firma bilgilerine, atamalara ve sözleşme durumuna hızlıca erişin.</p></div>
            <div className="flex flex-col gap-2 sm:flex-row"><div className="relative"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Firma, vergi no veya sektör ara..." className="h-10 w-full rounded-xl border border-ink-200 bg-ink-50/50 pl-9 pr-3 text-sm text-ink-800 outline-none transition-all placeholder:text-ink-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10 sm:w-64" /></div><button type="button" onClick={() => setShowFilters((current) => !current)} className={cn('inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-3.5 text-xs font-semibold transition-colors', showFilters || filterCount ? 'border-brand-200 bg-brand-50 text-brand-700' : 'border-ink-200 bg-white text-ink-600 hover:border-ink-300 hover:bg-ink-50')}><SlidersHorizontal className="h-4 w-4" /> Filtreler {filterCount > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand-600 px-1 text-[10px] text-white">{filterCount}</span>}</button></div>
          </div>
          {showFilters && <div className="mt-5 grid min-w-0 gap-3 border-t border-ink-100 pt-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {[
              { label: 'Tehlike sınıfı', value: riskFilter, set: setRiskFilter, options: ['all', ...riskLevels], labels: ['Tüm sınıflar', ...riskLevels] },
              { label: 'Uzman', value: expertFilter, set: setExpertFilter, options: ['all', 'none', ...experts], labels: ['Tüm uzmanlar', 'Atanmamış', ...experts] },
              { label: 'Doktor', value: doctorFilter, set: setDoctorFilter, options: ['all', 'none', ...doctors], labels: ['Tüm doktorlar', 'Atanmamış', ...doctors] },
              { label: 'Sözleşme', value: contractFilter, set: setContractFilter, options: ['all', ...contractStatuses], labels: ['Tüm statüler', ...contractStatuses] },
              { label: 'Onay durumu', value: approvalFilter, set: setApprovalFilter, options: ['all', 'Onaylandı', 'Onay bekliyor'], labels: ['Tüm durumlar', 'Onaylandı', 'Onay bekliyor'] },
              { label: 'Sıralama', value: sortBy, set: setSortBy, options: ['newest', 'nameAsc', 'nameDesc', 'employeesDesc', 'employeesAsc'], labels: ['En yeni', 'Firma adı (A → Z)', 'Firma adı (Z → A)', 'Çalışan (çok → az)', 'Çalışan (az → çok)'] },
            ].map((filter) => <label key={filter.label} className="block"><span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink-400">{filter.label}</span><div className="relative"><select value={filter.value} onChange={(event) => filter.set(event.target.value)} className="h-10 w-full appearance-none rounded-xl border border-ink-200 bg-white px-3 pr-8 text-xs font-medium text-ink-700 outline-none transition-colors focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10">{filter.options.map((option, index) => <option key={option} value={option}>{filter.labels[index]}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" /></div></label>)}
            <div className="flex flex-wrap items-end gap-2 sm:col-span-2 lg:col-span-3 xl:col-span-6"><button type="button" onClick={() => setStatusFilter('active')} className={cn('inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-medium', statusFilter === 'active' ? 'border-brand-200 bg-brand-50 text-brand-700' : 'border-ink-200 text-ink-500')}>Aktif firmalar</button><button type="button" onClick={() => setStatusFilter('passive')} className={cn('inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-medium', statusFilter === 'passive' ? 'border-brand-200 bg-brand-50 text-brand-700' : 'border-ink-200 text-ink-500')}>Pasif firmalar</button><button type="button" onClick={() => setStatusFilter('all')} className={cn('inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-medium', statusFilter === 'all' ? 'border-brand-200 bg-brand-50 text-brand-700' : 'border-ink-200 text-ink-500')}>Tümü</button><button type="button" onClick={clearFilters} className="ml-0 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg px-3 text-xs font-semibold text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-800 sm:ml-auto sm:w-auto"><X className="h-3.5 w-3.5" /> Filtreleri temizle</button></div>
          </div>}
        </div>

        <div className="relative overflow-x-auto">
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white via-white/80 to-transparent sm:hidden" />
          <div className="pointer-events-none absolute right-3 top-3 z-20 rounded-full bg-white/95 px-2 py-1 text-[10px] font-semibold text-ink-400 shadow-sm sm:hidden">Yatay kaydır</div>
          <table className="w-full min-w-[1080px] text-left text-xs"><thead className="border-b border-ink-100 bg-ink-50/40 text-[10px] font-semibold uppercase tracking-wider text-ink-400"><tr><th className="px-5 py-3.5 font-semibold sm:px-6">Firma</th><th className="px-3 py-3.5 font-semibold">Tehlike sınıfı</th><th className="px-3 py-3.5 font-semibold">Çalışan</th><th className="px-3 py-3.5 font-semibold">İSG atamaları</th><th className="px-3 py-3.5 font-semibold">Sözleşme</th><th className="px-3 py-3.5 font-semibold">Onay</th><th className="px-5 py-3.5 text-right font-semibold sm:px-6">İşlem</th></tr></thead><tbody className="divide-y divide-ink-100">
          {filteredCustomers.map((customer) => <tr key={customer.id} onClick={() => navigate(`/dashboard/firmalar/${customer.id}`)} className="group cursor-pointer transition-colors hover:bg-brand-50/35">
            <td className="px-5 py-4 sm:px-6"><div className="flex items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-xs font-bold text-brand-700">{initials(customer.name)}</span><div className="min-w-0"><p className="truncate text-sm font-semibold text-ink-800">{customer.name}</p><p className="mt-0.5 truncate text-[11px] text-ink-400">VKN: {customer.taxNumber} · {customer.sector}</p><p className="mt-0.5 flex items-center gap-1 truncate text-[11px] text-ink-400"><MapPin className="h-3 w-3" />{customer.location}</p></div></div></td>
            <td className="px-3 py-4"><span className={cn('inline-flex whitespace-nowrap rounded-lg border px-2.5 py-1 text-[11px] font-semibold', riskClass(customer.riskLevel))}>{customer.riskLevel}</span></td>
            <td className="px-3 py-4"><div className="flex items-center gap-2 text-ink-700"><Users className="h-3.5 w-3.5 text-ink-400" /> <span className="font-semibold">{customer.employees ? formatNumber(customer.employees) : '—'}</span></div><p className="mt-1 text-[10px] text-ink-400">aktif çalışan</p></td>
            <td className="px-3 py-4"><div className="space-y-1.5"><p className={cn('text-[11px]', customer.expert ? 'text-ink-700' : 'text-ink-400')}>{customer.expert ? `Uzm. ${customer.expert}` : 'Uzman atanmamış'}</p><p className={cn('text-[11px]', customer.doctor ? 'text-ink-700' : 'text-ink-400')}>{customer.doctor ? `Dr. ${customer.doctor}` : 'Doktor atanmamış'}</p></div></td>
            <td className="px-3 py-4"><p className={cn('font-semibold', contractClass(customer.contractStatus))}>{customer.contractStatus}</p><p className="mt-1 text-[10px] text-ink-400">{customer.updatedAt}</p></td>
            <td className="px-3 py-4"><span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold', customer.approvalStatus === 'Onaylandı' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700')}><span className={cn('h-1.5 w-1.5 rounded-full', customer.approvalStatus === 'Onaylandı' ? 'bg-emerald-500' : 'bg-amber-500')} />{customer.approvalStatus}</span></td>
            <td className="px-5 py-4 text-right sm:px-6"><div className="inline-flex items-center gap-1" onClick={(event) => event.stopPropagation()}><button type="button" onClick={() => navigate(`/dashboard/firmalar/${customer.id}`)} className="rounded-lg p-2 text-ink-400 transition-colors hover:bg-brand-50 hover:text-brand-700" aria-label={`${customer.name} detayları`}><ArrowRight className="h-4 w-4" /></button><button type="button" onClick={() => toast.info('Düzenleme ekranı sıradaki adımda hazırlanacak.')} className="rounded-lg p-2 text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-700" aria-label={`${customer.name} düzenle`}><MoreHorizontal className="h-4 w-4" /></button></div></td>
          </tr>)}
        </tbody></table>{filteredCustomers.length === 0 && <div className="px-6 py-16 text-center"><Search className="mx-auto h-8 w-8 text-ink-300" /><p className="mt-3 text-sm font-semibold text-ink-700">Müşteri bulunamadı</p><p className="mt-1 text-xs text-ink-400">Arama veya filtre kriterlerini değiştirerek tekrar deneyin.</p><button type="button" onClick={clearFilters} className="mt-4 text-xs font-semibold text-brand-700 hover:text-brand-800">Filtreleri temizle</button></div>}</div>
        <div className="flex flex-col justify-between gap-3 border-t border-ink-100 px-5 py-4 text-xs text-ink-400 sm:flex-row sm:items-center sm:px-6"><span>{filteredCustomers.length} müşteri gösteriliyor</span><span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-brand-500" /> Son senkronizasyon: az önce</span></div>
      </motion.section>

      {isModalOpen && <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overscroll-contain bg-ink-900/25 p-3 backdrop-blur-[2px] sm:p-8" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsModalOpen(false) }}><motion.div initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.2 }} role="dialog" aria-modal="true" aria-labelledby="new-customer-title" className="relative z-10 my-auto max-h-[calc(100dvh-1.5rem)] min-h-0 w-full max-w-3xl overflow-y-auto overscroll-contain rounded-xl border border-ink-200 bg-white shadow-[0_24px_80px_-24px_rgba(17,24,39,0.35)] sm:max-h-[calc(100dvh-4rem)] sm:rounded-2xl"><div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-ink-100 bg-white/95 px-4 py-4 backdrop-blur sm:gap-4 sm:px-7 sm:py-5"><div className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700"><Building2 className="h-5 w-5" strokeWidth={1.7} /></span><div><h2 id="new-customer-title" className="text-base font-semibold text-ink-900">Yeni müşteri ekle</h2><p className="mt-1 text-xs text-ink-400">Firma bilgilerini girerek portföyünüze yeni bir kayıt ekleyin.</p></div></div><button type="button" onClick={() => setIsModalOpen(false)} className="rounded-xl p-2 text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-700" aria-label="Modalı kapat"><X className="h-5 w-5" /></button></div><form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-4 py-5 sm:px-7 sm:py-6" noValidate><div><div className="mb-3 flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-brand-500" /><h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-600">Firma bilgileri</h3></div><div className="grid gap-4 sm:grid-cols-2"><Input label="Firma adı" placeholder="Örn. Quantis Tekstil" error={errors.name?.message} {...register('name')} /><Input label="Vergi numarası" placeholder="10 haneli vergi numarası" error={errors.taxNumber?.message} {...register('taxNumber')} /><Input label="Sektör" placeholder="Örn. Tekstil üretimi" error={errors.sector?.message} {...register('sector')} /><Input label="Merkez / Şube" placeholder="İlçe ve il bilgisi" icon={<MapPin className="h-[18px] w-[18px]" />} error={errors.location?.message} {...register('location')} /><Input label="Çalışan sayısı" type="number" min="0" placeholder="0" error={errors.employees?.message} {...register('employees')} /><div><label htmlFor="customer-risk" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">Tehlike sınıfı</label><div className="relative"><select id="customer-risk" className={cn('h-12 w-full appearance-none rounded-xl border bg-white px-3.5 pr-10 text-sm text-ink-900 outline-none transition-all focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10', errors.riskLevel ? 'border-red-400' : 'border-ink-200 hover:border-ink-300')} {...register('riskLevel')}><option value="">Sınıf seçiniz</option>{riskLevels.map((risk) => <option key={risk} value={risk}>{risk}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" /></div>{errors.riskLevel && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.riskLevel.message}</p>}</div></div></div><div className="border-t border-ink-100 pt-5"><div className="mb-3 flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-ink-400" strokeWidth={1.8} /><h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-600">Hizmet atamaları</h3></div><div className="grid gap-4 sm:grid-cols-2"><div><label htmlFor="customer-expert" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">İSG uzmanı</label><div className="relative"><select id="customer-expert" className="h-12 w-full appearance-none rounded-xl border border-ink-200 bg-white px-3.5 pr-10 text-sm text-ink-900 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10" {...register('expert')}><option value="">Atama daha sonra yapılacak</option>{experts.map((expert) => <option key={expert} value={expert}>{expert}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" /></div></div><div><label htmlFor="customer-doctor" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">İşyeri hekimi</label><div className="relative"><select id="customer-doctor" className="h-12 w-full appearance-none rounded-xl border border-ink-200 bg-white px-3.5 pr-10 text-sm text-ink-900 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10" {...register('doctor')}><option value="">Atama daha sonra yapılacak</option>{doctors.map((doctor) => <option key={doctor} value={doctor}>{doctor}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" /></div></div></div></div><div className="border-t border-ink-100 pt-5"><div className="mb-3 flex items-center gap-2"><Phone className="h-4 w-4 text-ink-400" strokeWidth={1.8} /><h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-600">Firma yetkilisi</h3></div><div className="grid gap-4 sm:grid-cols-2"><Input label="Yetkili adı" placeholder="Ad Soyad" error={errors.contactName?.message} {...register('contactName')} /><Input label="E-posta" type="email" placeholder="yetkili@firma.com" icon={<Mail className="h-[18px] w-[18px]" />} error={errors.contactEmail?.message} {...register('contactEmail')} /><Input label="Telefon" type="tel" placeholder="+90 5xx xxx xx xx" icon={<Phone className="h-[18px] w-[18px]" />} error={errors.contactPhone?.message} {...register('contactPhone')} /></div></div><div className="flex flex-col-reverse gap-3 border-t border-ink-100 pt-5 sm:flex-row sm:justify-end"><Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Vazgeç</Button><Button type="submit" loading={isSubmitting} leftIcon={!isSubmitting ? <Plus className="h-4 w-4" /> : undefined}>Müşteriyi kaydet</Button></div></form></motion.div></div>}

      {selectedCustomer && <div className="fixed inset-0 z-50 bg-ink-900/20 backdrop-blur-[2px]" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedCustomer(null) }}><motion.aside initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} role="dialog" aria-modal="true" aria-labelledby="customer-detail-title" className="ml-auto flex h-full max-h-[100dvh] w-full max-w-md flex-col overflow-y-auto overscroll-contain border-ink-200 bg-white shadow-[-20px_0_60px_-28px_rgba(17,24,39,0.32)] sm:border-l"><div className="border-b border-ink-100 px-4 py-4 sm:px-6 sm:py-5"><div className="flex items-start justify-between gap-4"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-sm font-bold text-brand-700">{initials(selectedCustomer.name)}</span><div><h2 id="customer-detail-title" className="text-base font-semibold text-ink-900">{selectedCustomer.name}</h2><p className="mt-1 text-xs text-ink-400">Müşteri detayları</p></div></div><button type="button" onClick={() => setSelectedCustomer(null)} className="rounded-xl p-2 text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-700" aria-label="Detay panelini kapat"><X className="h-5 w-5" /></button></div><div className="mt-4 flex flex-wrap gap-2"><span className={cn('inline-flex rounded-lg border px-2.5 py-1 text-[11px] font-semibold', riskClass(selectedCustomer.riskLevel))}>{selectedCustomer.riskLevel}</span><span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold', selectedCustomer.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-ink-100 text-ink-500')}><span className={cn('h-1.5 w-1.5 rounded-full', selectedCustomer.status === 'active' ? 'bg-emerald-500' : 'bg-ink-400')} />{selectedCustomer.status === 'active' ? 'Aktif' : 'Pasif'}</span></div></div><div className="flex-1 space-y-6 px-4 py-5 sm:px-6 sm:py-6"><div className="grid grid-cols-2 gap-3"><div className="rounded-xl bg-ink-50 p-4"><p className="text-[10px] font-bold uppercase tracking-wide text-ink-400">Çalışan</p><p className="mt-2 text-xl font-bold text-ink-900">{formatNumber(selectedCustomer.employees)}</p><p className="mt-0.5 text-[11px] text-ink-400">aktif kişi</p></div><div className="rounded-xl bg-ink-50 p-4"><p className="text-[10px] font-bold uppercase tracking-wide text-ink-400">Sözleşme</p><p className={cn('mt-2 text-sm font-bold', contractClass(selectedCustomer.contractStatus))}>{selectedCustomer.contractStatus}</p><p className="mt-1 text-[11px] text-ink-400">{selectedCustomer.approvalStatus}</p></div></div><div><h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">Firma bilgileri</h3><div className="divide-y divide-ink-100 rounded-xl border border-ink-200"><div className="flex items-center justify-between gap-4 px-4 py-3"><span className="text-xs text-ink-400">Vergi numarası</span><span className="text-xs font-semibold text-ink-700">{selectedCustomer.taxNumber}</span></div><div className="flex items-center justify-between gap-4 px-4 py-3"><span className="text-xs text-ink-400">Sektör</span><span className="text-xs font-semibold text-ink-700">{selectedCustomer.sector}</span></div><div className="flex items-center justify-between gap-4 px-4 py-3"><span className="text-xs text-ink-400">Merkez</span><span className="text-right text-xs font-semibold text-ink-700">{selectedCustomer.location}</span></div></div></div><div><h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">İSG atamaları</h3><div className="space-y-2 rounded-xl border border-ink-200 p-4"><div className="flex items-center justify-between gap-3"><span className="text-xs text-ink-400">İSG uzmanı</span><span className="text-xs font-semibold text-ink-700">{selectedCustomer.expert || 'Atanmamış'}</span></div><div className="flex items-center justify-between gap-3"><span className="text-xs text-ink-400">İşyeri hekimi</span><span className="text-xs font-semibold text-ink-700">{selectedCustomer.doctor || 'Atanmamış'}</span></div></div></div><div><h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">Firma yetkilisi</h3><div className="space-y-3 rounded-xl border border-ink-200 p-4"><div className="flex items-center gap-3"><Users className="h-4 w-4 text-ink-400" /><span className="text-sm font-semibold text-ink-700">{selectedCustomer.contactName}</span></div><div className="flex items-center gap-3"><Mail className="h-4 w-4 text-ink-400" /><span className="truncate text-xs text-ink-600">{selectedCustomer.contactEmail}</span></div><div className="flex items-center gap-3"><Phone className="h-4 w-4 text-ink-400" /><span className="text-xs text-ink-600">{selectedCustomer.contactPhone}</span></div></div></div></div><div className="flex gap-2 border-t border-ink-100 p-6"><Button variant="outline" className="flex-1" leftIcon={<Edit3 className="h-4 w-4" />} onClick={() => toast.info('Düzenleme ekranı sıradaki adımda hazırlanacak.')}>Düzenle</Button><button type="button" onClick={() => handleDelete(selectedCustomer)} className="grid h-10 w-10 place-items-center rounded-xl border border-rose-200 text-rose-600 transition-colors hover:bg-rose-50" aria-label="Müşteriyi sil"><Trash2 className="h-4 w-4" /></button></div></motion.aside></div>}
    </div>
  )
}
