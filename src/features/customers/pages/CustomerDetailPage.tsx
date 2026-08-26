import { motion } from 'framer-motion'
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Edit3,
  FileCheck2,
  FileText,
  GraduationCap,
  MapPin,
  MoreHorizontal,
  Plus,
  ShieldCheck,
  Stethoscope,
  Trash2,
  UserPlus,
  Users,
} from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { downloadParticipantLoginList } from '@/lib/excel'
import { readCustomerById, type Customer } from '../data/customers'

type CompanyDetails = Customer

const fallbackCompany: CompanyDetails = {
  id: 0,
  name: 'Firma kaydı',
  taxNumber: '—',
  sector: 'Sektör bilgisi',
  location: 'Merkez bilgisi yok',
  employees: 0,
  riskLevel: 'Az tehlikeli',
  expert: 'Atanmamış',
  doctor: 'Atanmamış',
  expertMinutes: 0,
  doctorMinutes: 0,
  contractStatus: 'Teklif aşamasında',
  approvalStatus: 'Onay bekliyor',
  status: 'active',
  contactName: '—',
  contactEmail: '—',
  contactPhone: '—',
  updatedAt: '—',
  socialSecurityNumber: '—',
  naceCode: '—',
  participants: 0,
  contractStart: '—',
  contractEnd: '—',
  approver: '—',
  signatory: '—',
  city: '—',
  district: '—',
  address: '—',
  accountant: '—',
  accountantPhone: '—',
  accountantEmail: '—',
  visitPeriod: '—',
  completedVisits: 0,
  plannedVisits: 0,
  nextVisit: '—',
  expertClass: '—',
}

const tabs = [
  { id: 'overview', label: 'Genel bakış' },
  { id: 'participants', label: 'Katılımcılar' },
  { id: 'contract', label: 'Sözleşme süreci' },
  { id: 'documents', label: 'Belgeler' },
] as const

type TabId = (typeof tabs)[number]['id']

function formatNumber(value: number) {
  return new Intl.NumberFormat('tr-TR').format(value)
}

function formatMinutes(value: number) {
  if (!value) return '—'
  return `${formatNumber(value)} dk/ay`
}

function initials(name: string) {
  return name.split(' ').slice(0, 2).map((part) => part[0]).join('').toLocaleUpperCase('tr-TR')
}

function riskClass(risk: Customer['riskLevel']) {
  if (risk === 'Çok tehlikeli') return 'border-rose-200 bg-rose-50 text-rose-700'
  if (risk === 'Tehlikeli') return 'border-amber-200 bg-amber-50 text-amber-700'
  return 'border-emerald-200 bg-emerald-50 text-emerald-700'
}

function DetailItem({ label, value, strong = false }: { label: string; value: ReactNode; strong?: boolean }) {
  return <div className="flex items-start justify-between gap-5 border-b border-ink-100 py-3 last:border-b-0"><dt className="shrink-0 text-xs text-ink-400">{label}</dt><dd className={cn('max-w-[64%] text-right text-xs text-ink-700', strong && 'font-semibold')}>{value}</dd></div>
}

export function CustomerDetailPage() {
  const { customerId } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabId>('overview')
  const company = useMemo(() => readCustomerById(customerId ?? '') ?? fallbackCompany, [customerId])
  const progress = company.plannedVisits ? Math.round(((company.completedVisits ?? 0) / company.plannedVisits) * 100) : 0

  function action(message: string) {
    toast.info(message)
  }

  function handleDelete() {
    if (!window.confirm(`${company.name} kaydı silinsin mi?`)) return
    toast.success('Müşteri kaydı silindi')
    navigate('/dashboard/firmalar')
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <Link to="/dashboard/firmalar" className="inline-flex items-center gap-2 text-xs font-semibold text-ink-500 transition-colors hover:text-brand-700"><ArrowLeft className="h-4 w-4" /> Müşteri listesine dön</Link>
        <div className="mt-5 flex items-center gap-2 text-xs font-medium text-ink-400"><span>Müşteriler</span><ChevronRight className="h-3.5 w-3.5" /><span className="text-ink-600">Firma kartı</span></div>
      </motion.div>

      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.04 }} className="relative overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-[0_8px_28px_-18px_rgba(17,24,39,0.28)]">
        <div className="absolute right-0 top-0 h-40 w-40 translate-x-12 -translate-y-20 rounded-full border-[24px] border-brand-50" />
        <div className="relative border-b border-ink-100 p-5 sm:p-7"><div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start"><div className="flex min-w-0 items-start gap-4"><span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-50 text-lg font-bold text-brand-700">{initials(company.name)}</span><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h1 className="truncate text-xl font-bold tracking-[-0.025em] text-ink-900 sm:text-2xl">{company.name}</h1><span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold', company.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-ink-100 text-ink-500')}><span className={cn('h-1.5 w-1.5 rounded-full', company.status === 'active' ? 'bg-emerald-500' : 'bg-ink-400')} />{company.status === 'active' ? 'Aktif' : 'Pasif'}</span></div><p className="mt-1.5 text-sm text-ink-500">{company.sector} <span className="mx-1.5 text-ink-300">·</span> {company.location}</p><div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-ink-400"><span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {company.city}, {company.district}</span><span className="h-3 w-px bg-ink-200" /><span>VKN: {company.taxNumber}</span></div></div></div><div className="grid w-full grid-cols-[minmax(0,1fr)_auto] gap-2 sm:flex sm:w-auto"><Button className="h-9 min-w-0 px-3 text-xs sm:px-3.5 sm:text-sm" variant="outline" size="sm" leftIcon={<Edit3 className="h-4 w-4" />} onClick={() => action('Firma düzenleme ekranı sıradaki adımda hazırlanacak.')}>Düzenle</Button><button type="button" onClick={() => action('Firma seçenekleri açılacak.')} className="grid h-9 w-9 place-items-center rounded-xl border border-ink-200 text-ink-400 transition-colors hover:bg-ink-50 hover:text-ink-700" aria-label="Firma seçenekleri"><MoreHorizontal className="h-4 w-4" /></button></div></div><div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><div className="rounded-xl bg-ink-50/80 p-4"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-400">Çalışan</p><p className="mt-2 text-xl font-bold text-ink-900">{formatNumber(company.employees)}</p><p className="mt-1 text-[11px] text-ink-400">aktif kişi</p></div><div className="rounded-xl bg-ink-50/80 p-4"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-400">Katılımcı</p><p className="mt-2 text-xl font-bold text-ink-900">{formatNumber(company.participants ?? 0)}</p><p className="mt-1 text-[11px] text-ink-400">panel hesabı</p></div><div className="rounded-xl bg-ink-50/80 p-4"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-400">Sözleşme</p><p className="mt-2 text-sm font-bold text-brand-700">{company.contractStatus}</p><p className="mt-1 text-[11px] text-ink-400">{company.contractStart} — {company.contractEnd}</p></div><div className="rounded-xl bg-ink-50/80 p-4"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-400">Ziyaret planı</p><div className="mt-2 flex items-center justify-between gap-2"><p className="text-xl font-bold text-ink-900">%{progress}</p><span className="text-[11px] text-ink-400">{company.completedVisits}/{company.plannedVisits}</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-200"><div className="h-full rounded-full bg-brand-500" style={{ width: `${progress}%` }} /></div></div></div></div>
        <div className="grid grid-cols-2 gap-2 border-b border-ink-100 px-4 py-3 sm:flex sm:flex-wrap sm:px-7 sm:py-4">{[
          { label: 'Katılımcı ekle', icon: UserPlus, message: 'Katılımcı ekleme ekranı hazırlanacak.' },
          { label: 'Toplu katılımcı', icon: Users, message: 'Toplu katılımcı aktarım ekranı hazırlanacak.' },
          { label: 'Toplu eğitim ata', icon: GraduationCap, message: 'Toplu eğitim atama ekranı hazırlanacak.' },
          { label: 'Giriş listesi', icon: ArrowDownToLine, message: 'Giriş listesi dışa aktarmaya hazırlandı.' },
        ].map((item) => <button key={item.label} type="button" onClick={() => { if (item.label === 'Giriş listesi') { downloadParticipantLoginList(company.name, ['Ayşe Demir', 'Emre Kaya', 'Buse Yıldız', 'Murat Şen', 'Ece Arslan'].slice(0, Math.max(company.participants ?? 0, 1))); toast.success("Giriş listesi Excel'e aktarıldı") } else action(item.message) }} className="inline-flex min-w-0 items-center justify-center gap-2 rounded-xl border border-ink-200 bg-white px-2.5 py-2 text-xs font-semibold text-ink-600 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"><item.icon className="h-3.5 w-3.5" /> {item.label}</button>)}</div>
        <div className="flex gap-1 overflow-x-auto px-4 sm:px-7">{tabs.map((tab) => <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={cn('relative shrink-0 whitespace-nowrap px-2.5 py-4 text-xs font-semibold transition-colors sm:px-3', activeTab === tab.id ? 'text-brand-700' : 'text-ink-400 hover:text-ink-700')}>{tab.label}{activeTab === tab.id && <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-brand-600" />}</button>)}</div>
      </motion.section>

      {activeTab === 'overview' && <div className="grid gap-5 lg:grid-cols-2"><motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6"><div className="flex items-center justify-between gap-3"><div><h2 className="text-sm font-semibold text-ink-900">Firma bilgileri</h2><p className="mt-1 text-xs text-ink-400">Resmi kayıt ve işyeri tanımları</p></div><span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-700"><Building2 className="h-[18px] w-[18px]" /></span></div><dl className="mt-5"><DetailItem label="Vergi numarası" value={company.taxNumber} strong /><DetailItem label="SGK işyeri sicil no" value={company.socialSecurityNumber} /><DetailItem label="NACE kodu" value={company.naceCode} /><DetailItem label="Tehlike sınıfı" value={<span className={cn('inline-flex rounded-lg border px-2.5 py-1 text-[11px] font-semibold', riskClass(company.riskLevel))}>{company.riskLevel}</span>} /><DetailItem label="Merkez / şube" value={company.location} /><DetailItem label="Çalışan sayısı" value={formatNumber(company.employees)} strong /><DetailItem label="Uzman hizmet süresi" value={formatMinutes(company.expertMinutes)} /><DetailItem label="Hekim hizmet süresi" value={formatMinutes(company.doctorMinutes)} /></dl></motion.section>

        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.04 }} className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6"><div className="flex items-center justify-between gap-3"><div><h2 className="text-sm font-semibold text-ink-900">İletişim ve atamalar</h2><p className="mt-1 text-xs text-ink-400">Firma yetkilileri ve sorumlu ekip</p></div><span className="grid h-9 w-9 place-items-center rounded-xl bg-sky-50 text-sky-700"><ShieldCheck className="h-[18px] w-[18px]" /></span></div><dl className="mt-5"><DetailItem label="Yetkili kişi" value={company.contactName} strong /><DetailItem label="İmza yetkilisi" value={company.signatory} /><DetailItem label="E-posta" value={company.contactEmail} /><DetailItem label="Telefon" value={company.contactPhone} /><DetailItem label="İl / ilçe" value={`${company.city} / ${company.district}`} /><DetailItem label="Adres" value={company.address} /><DetailItem label="İSG uzmanı" value={<span className="font-semibold text-brand-700">{company.expert}</span>} /><DetailItem label="İşyeri hekimi" value={<span className="font-semibold text-brand-700">{company.doctor}</span>} /></dl></motion.section>

        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.08 }} className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6"><div className="flex items-center justify-between gap-3"><div><h2 className="text-sm font-semibold text-ink-900">Sözleşme özeti</h2><p className="mt-1 text-xs text-ink-400">Hizmet kapsamı ve onay bilgileri</p></div><span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-50 text-violet-700"><FileCheck2 className="h-[18px] w-[18px]" /></span></div><dl className="mt-5"><DetailItem label="Başlangıç tarihi" value={company.contractStart} /><DetailItem label="Bitiş tarihi" value={company.contractEnd} /><DetailItem label="Sözleşme statüsü" value={<span className="font-semibold text-brand-700">{company.contractStatus}</span>} /><DetailItem label="Onay durumu" value={<span className={cn('font-semibold', company.approvalStatus === 'Onaylandı' ? 'text-emerald-700' : 'text-amber-700')}>{company.approvalStatus}</span>} /><DetailItem label="Onaylayan kişi" value={company.approver} /></dl><button type="button" onClick={() => setActiveTab('contract')} className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-800">Sözleşme sürecini görüntüle <ArrowRight className="h-3.5 w-3.5" /></button></motion.section>

        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.12 }} className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6"><div className="flex items-center justify-between gap-3"><div><h2 className="text-sm font-semibold text-ink-900">Ziyaret ve operasyon</h2><p className="mt-1 text-xs text-ink-400">Saha planlamasının güncel görünümü</p></div><span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-50 text-amber-700"><CalendarDays className="h-[18px] w-[18px]" /></span></div><div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-xl bg-ink-50 p-4"><p className="text-[10px] uppercase tracking-wide text-ink-400">Periyot</p><p className="mt-2 text-sm font-bold text-ink-800">{company.visitPeriod}</p></div><div className="rounded-xl bg-ink-50 p-4"><p className="text-[10px] uppercase tracking-wide text-ink-400">Sonraki planlama</p><p className="mt-2 text-sm font-bold text-ink-800">{company.nextVisit}</p></div></div><div className="mt-4 flex items-center justify-between text-xs"><span className="text-ink-500">Tamamlanan ziyaretler</span><span className="font-semibold text-ink-800">{company.completedVisits ?? 0} / {company.plannedVisits ?? 0}</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-ink-100"><div className="h-full rounded-full bg-brand-500" style={{ width: `${progress}%` }} /></div></motion.section></div>}

      {activeTab === 'participants' && <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-ink-200/80 bg-white shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]"><div className="flex flex-col justify-between gap-4 border-b border-ink-100 p-5 sm:flex-row sm:items-center sm:p-6"><div><h2 className="text-sm font-semibold text-ink-900">Katılımcılar</h2><p className="mt-1 text-xs text-ink-400">{company.participants} katılımcı kaydı bu firmaya bağlı.</p></div><Button className="w-full sm:w-auto" size="sm" leftIcon={<Plus className="h-4 w-4" />} onClick={() => action('Katılımcı ekleme ekranı hazırlanacak.')}>Katılımcı ekle</Button></div><div className="relative overflow-x-auto">
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white via-white/80 to-transparent sm:hidden" />
        <div className="pointer-events-none absolute right-3 top-3 z-20 rounded-full bg-white/95 px-2 py-1 text-[10px] font-semibold text-ink-400 shadow-sm sm:hidden">Yatay kaydır</div>
        <table className="w-full min-w-[700px] text-left text-xs"><thead className="border-b border-ink-100 bg-ink-50/40 text-[10px] uppercase tracking-wider text-ink-400"><tr><th className="px-5 py-3.5 font-semibold sm:px-6">Katılımcı</th><th className="px-3 py-3.5 font-semibold">Departman</th><th className="px-3 py-3.5 font-semibold">Eğitim durumu</th><th className="px-3 py-3.5 font-semibold">Son giriş</th><th className="px-5 py-3.5 text-right font-semibold sm:px-6">İşlem</th></tr></thead><tbody className="divide-y divide-ink-100">{['Ayşe Demir', 'Emre Kaya', 'Buse Yıldız', 'Murat Şen', 'Ece Arslan'].slice(0, Math.min(company.participants || 5, 5)).map((participant, index) => <tr key={participant} className="transition-colors hover:bg-ink-50/50"><td className="px-5 py-4 sm:px-6"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-[11px] font-bold text-brand-700">{initials(participant)}</span><div><p className="font-semibold text-ink-800">{participant}</p><p className="mt-0.5 text-[11px] text-ink-400">katilimci{index + 1}@panel.demo</p></div></div></td><td className="px-3 py-4 text-ink-600">{['Üretim', 'İnsan Kaynakları', 'Kalite', 'Operasyon', 'Yönetim'][index]}</td><td className="px-3 py-4"><span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700"><CheckCircle2 className="h-3 w-3" /> Tamamlandı</span></td><td className="px-3 py-4 text-ink-500">{index + 1} gün önce</td><td className="px-5 py-4 text-right sm:px-6"><button type="button" onClick={() => action(`${participant} detayları açılacak.`)} className="rounded-lg p-2 text-ink-400 hover:bg-ink-100 hover:text-ink-700" aria-label="Katılımcı seçenekleri"><MoreHorizontal className="h-4 w-4" /></button></td></tr>)}</tbody></table></div></motion.section>}

      {activeTab === 'contract' && <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]"><div className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6"><div className="flex items-center justify-between"><div><h2 className="text-sm font-semibold text-ink-900">Sözleşme zaman çizelgesi</h2><p className="mt-1 text-xs text-ink-400">{company.name} için süreç geçmişi</p></div><FileCheck2 className="h-5 w-5 text-brand-600" /></div><div className="mt-7 space-y-6">{[{ title: 'Sözleşme onaylandı', detail: `${company.approver} · ${company.contractStart}`, done: company.approvalStatus === 'Onaylandı' }, { title: 'Hizmet atamaları yapıldı', detail: `${company.expert} ve ${company.doctor}`, done: Boolean(company.expert && company.doctor && company.expert !== 'Atanmamış') }, { title: 'İlk ziyaret planlandı', detail: company.nextVisit, done: (company.plannedVisits ?? 0) > 0 }].map((item, index) => <div key={item.title} className="flex gap-4"><div className="flex flex-col items-center"><span className={cn('grid h-8 w-8 place-items-center rounded-full', item.done ? 'bg-brand-100 text-brand-700' : 'bg-ink-100 text-ink-400')}>{item.done ? <Check className="h-4 w-4" /> : index + 1}</span>{index < 2 && <span className="mt-1 h-8 w-px bg-ink-200" />}</div><div className="pt-1"><p className="text-sm font-semibold text-ink-800">{item.title}</p><p className="mt-1 text-xs text-ink-400">{item.detail}</p></div></div>)}</div></div><div className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6"><h2 className="text-sm font-semibold text-ink-900">Hizmet kapasitesi</h2><p className="mt-1 text-xs text-ink-400">Aylık sözleşme tanımları</p><div className="mt-6 space-y-5"><div><div className="mb-2 flex items-center justify-between text-xs"><span className="flex items-center gap-2 text-ink-600"><ShieldCheck className="h-4 w-4 text-brand-600" /> Uzman hizmet süresi</span><span className="font-semibold text-ink-800">{formatMinutes(company.expertMinutes)}</span></div><div className="h-2 rounded-full bg-ink-100"><div className="h-full w-[68%] rounded-full bg-brand-500" /></div></div><div><div className="mb-2 flex items-center justify-between text-xs"><span className="flex items-center gap-2 text-ink-600"><Stethoscope className="h-4 w-4 text-violet-600" /> Hekim hizmet süresi</span><span className="font-semibold text-ink-800">{formatMinutes(company.doctorMinutes)}</span></div><div className="h-2 rounded-full bg-ink-100"><div className="h-full w-[52%] rounded-full bg-violet-500" /></div></div></div><div className="mt-7 rounded-xl bg-amber-50 p-4"><p className="text-xs font-semibold text-amber-800">Onay durumu</p><p className="mt-1 text-xs leading-5 text-amber-700/80">{company.approvalStatus === 'Onaylandı' ? 'Sözleşme onay süreci tamamlandı.' : 'Bu sözleşme için onay işlemi bekliyor.'}</p></div></div></motion.section>}

      {activeTab === 'documents' && <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h2 className="text-sm font-semibold text-ink-900">Firma belgeleri</h2><p className="mt-1 text-xs text-ink-400">Sözleşme ve operasyon belgelerini tek yerde yönetin.</p></div><Button variant="outline" size="sm" leftIcon={<Plus className="h-4 w-4" />} onClick={() => action('Belge yükleme ekranı hazırlanacak.')}>Belge ekle</Button></div><div className="mt-5 grid gap-3 md:grid-cols-2">{[{ name: 'İSG hizmet sözleşmesi', type: 'PDF', date: company.contractStart, icon: FileCheck2 }, { name: 'Firma bilgi formu', type: 'DOCX', date: '12.01.2026', icon: FileText }, { name: 'İSG KATİP onay belgesi', type: 'PDF', date: company.approvalStatus === 'Onaylandı' ? company.contractStart : 'Bekleniyor', icon: ClipboardCheck }].map((document) => <div key={document.name} className="flex items-center gap-3 rounded-xl border border-ink-200 p-4 transition-colors hover:border-brand-200 hover:bg-brand-50/30"><span className="grid h-10 w-10 place-items-center rounded-xl bg-ink-100 text-ink-600"><document.icon className="h-[18px] w-[18px]" /></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-ink-700">{document.name}</p><p className="mt-1 text-[11px] text-ink-400">{document.type} · {document.date}</p></div><button type="button" onClick={() => action(`${document.name} indirilmeye hazırlandı.`)} className="rounded-lg p-2 text-ink-400 hover:bg-white hover:text-brand-700" aria-label={`${document.name} indir`}><ArrowDownToLine className="h-4 w-4" /></button></div>)}</div></motion.section>}

      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.14 }} className="flex flex-col justify-between gap-4 rounded-2xl border border-rose-100 bg-rose-50/50 p-5 sm:flex-row sm:items-center sm:p-6"><div><div className="flex items-center gap-2 text-sm font-semibold text-rose-800"><Trash2 className="h-4 w-4" /> Firma kaydını sil</div><p className="mt-1 text-xs leading-5 text-rose-700/70">Bu işlem firma kartını listeden kaldırır. Silmeden önce aktif sözleşme ve katılımcıları kontrol edin.</p></div><button type="button" onClick={handleDelete} className="inline-flex h-9 shrink-0 items-center justify-center rounded-xl border border-rose-200 bg-white px-3.5 text-xs font-semibold text-rose-700 transition-colors hover:bg-rose-100">Kaydı sil</button></motion.section>
    </div>
  )
}
