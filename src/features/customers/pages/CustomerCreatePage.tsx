import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  FileCheck2,
  FileText,
  Info,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  UserRound,
  Users,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button, Input } from '@/components/ui'
import { naceCodes } from '@/data/naceCodes'
import { turkeyLocations } from '@/data/turkeyLocations'
import { cn } from '@/lib/utils'
import { readCustomers, saveCustomers, type Customer, type RiskLevel, type ContractStatus, type ApprovalStatus, type CompanyStatus } from '../data/customers'

type FormData = {
  companyName: string
  taxNumber: string
  sgkNumber: string
  naceCode: string
  naceTitle: string
  riskLevel: string
  branchType: string
  city: string
  district: string
  address: string
  contactName: string
  signatory: string
  email: string
  phone: string
  accountantName: string
  accountantPhone: string
  accountantEmail: string
  employees: string
  expert: string
  doctor: string
  expertMinutes: string
  doctorMinutes: string
  contractStart: string
  contractEnd: string
  contractStatus: string
  sms: boolean
  loginSms: boolean
  loginWhatsapp: boolean
  trainingWhatsapp: boolean
  loginEmail: boolean
}

const initialForm: FormData = {
  companyName: '', taxNumber: '', sgkNumber: '', naceCode: '', naceTitle: '', riskLevel: '', branchType: 'Merkez', city: '', district: '', address: '', contactName: '', signatory: '', email: '', phone: '', accountantName: '', accountantPhone: '', accountantEmail: '', employees: '', expert: '', doctor: '', expertMinutes: '720', doctorMinutes: '360', contractStart: '', contractEnd: '', contractStatus: 'Teklif aşamasında', sms: false, loginSms: false, loginWhatsapp: false, trainingWhatsapp: false, loginEmail: true,
}

const experts = ['Demo Uzman 01', 'Demo Uzman 02', 'Demo Uzman 03', 'Demo Uzman 04', 'Demo Uzman 05']
const doctors = ['Demo Hekim 01', 'Demo Hekim 02']

const steps = [
  { title: 'Firma bilgileri', detail: 'Temel şirket bilgileri', icon: Building2 },
  { title: 'Adres & iletişim', detail: 'Yetkili ve iletişim bilgileri', icon: MapPin },
  { title: 'İSG hizmeti', detail: 'Atama ve sözleşme ayarları', icon: ShieldCheck },
  { title: 'Bildirimler', detail: 'İletişim tercihleri', icon: Mail },
  { title: 'Son kontrol', detail: 'Kaydetmeden önce gözden geçir', icon: CheckCircle2 },
]

function FieldLabel({ children, required = false }: { children: ReactNode; required?: boolean }) {
  return <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">{children}{required && <span className="ml-1 text-brand-600">*</span>}</span>
}

function SelectField({ label, value, onChange, options, required = false, hint, disabled = false }: { label: string; value: string; onChange: (value: string) => void; options: Array<{ value: string; label: string }>; required?: boolean; hint?: string; disabled?: boolean }) {
  return <label className="block"><FieldLabel required={required}>{label}</FieldLabel><div className="relative"><select value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} className="h-12 w-full appearance-none rounded-xl border border-ink-200 bg-white px-3.5 pr-10 text-sm text-ink-900 outline-none transition-all hover:border-ink-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 disabled:cursor-not-allowed disabled:bg-ink-50 disabled:text-ink-400"><option value="">Seçiniz</option>{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" /></div>{hint && <span className="mt-1.5 block text-[11px] leading-5 text-ink-400">{hint}</span>}</label>
}

function normalizeSearch(value: string) {
  return value.toLocaleLowerCase('tr-TR').replace(/[.\s-]/g, '')
}

function NaceSearchField({ value, title, onSelect }: { value: string; title: string; onSelect: (code: string, title: string, risk?: string) => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const normalizedQuery = normalizeSearch(query)
  const filteredCodes = useMemo(() => naceCodes.filter((item) => !normalizedQuery || normalizeSearch(item.code).includes(normalizedQuery) || item.title.toLocaleLowerCase('tr-TR').includes(query.toLocaleLowerCase('tr-TR'))).slice(0, 80), [normalizedQuery, query])

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  return <div ref={dropdownRef} className="relative"><FieldLabel required>NACE kodu</FieldLabel><button type="button" onClick={() => setIsOpen((current) => !current)} aria-expanded={isOpen} className={cn('flex h-12 w-full items-center justify-between gap-3 rounded-xl border bg-white px-3.5 text-left text-sm outline-none transition-all', isOpen ? 'border-brand-500 ring-4 ring-brand-500/10' : 'border-ink-200 hover:border-ink-300')}><span className={cn('min-w-0 truncate', value ? 'font-medium text-ink-900' : 'text-ink-400')}>{value ? `${value} — ${title}` : 'NACE kodu seçiniz'}</span><ChevronDown className={cn('h-4 w-4 shrink-0 text-ink-400 transition-transform', isOpen && 'rotate-180')} /></button>{isOpen && <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-[0_18px_45px_-18px_rgba(17,24,39,0.3)]"><div className="border-b border-ink-100 bg-ink-50/70 p-3"><div className="relative"><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Kod veya faaliyet adı ara..." className="h-10 w-full rounded-xl border border-ink-200 bg-white pl-3 pr-3 text-sm text-ink-800 outline-none placeholder:text-ink-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10" /></div><div className="mt-2 flex items-center justify-between gap-3 text-[10px] text-ink-400"><span>{naceCodes.length.toLocaleString('tr-TR')} NACE kodu kayıtlı</span><span>{query ? `${filteredCodes.length}${filteredCodes.length === 80 ? '+' : ''} sonuç gösteriliyor` : 'Arama yaparak daraltın'}</span></div></div><div className="max-h-72 overflow-y-auto p-1.5">{filteredCodes.length ? filteredCodes.map((item) => <button key={item.code} type="button" onClick={() => { onSelect(item.code, item.title, item.hazard); setQuery(''); setIsOpen(false) }} className="flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-brand-50"><span className="mt-0.5 shrink-0 rounded-md bg-ink-100 px-1.5 py-1 font-mono text-[10px] font-bold text-ink-600">{item.code}</span><span className="min-w-0 flex-1"><span className="block text-xs font-medium leading-5 text-ink-700">{item.title}</span><span className={cn('mt-0.5 block text-[10px] font-semibold', item.hazard === 'Çok Tehlikeli' ? 'text-rose-600' : item.hazard === 'Tehlikeli' ? 'text-amber-600' : item.hazard === 'Az Tehlikeli' ? 'text-emerald-600' : 'text-ink-400')}>{item.hazard ?? 'Tehlike sınıfı tanımlı değil'}</span></span></button>) : <div className="px-4 py-8 text-center"><SearchIcon /><p className="mt-2 text-xs font-semibold text-ink-600">NACE kodu bulunamadı</p><p className="mt-1 text-[11px] text-ink-400">Kod veya faaliyet adını farklı yazmayı deneyin.</p></div>}</div></div>}</div>
}

function SearchIcon() {
  return <svg className="mx-auto h-6 w-6 text-ink-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
}

function SectionHeading({ icon: Icon, title, description }: { icon: typeof Building2; title: string; description: string }) {
  return <div className="mb-5 flex items-start gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700"><Icon className="h-[18px] w-[18px]" strokeWidth={1.8} /></span><div><h2 className="text-sm font-semibold text-ink-900">{title}</h2><p className="mt-1 text-xs leading-5 text-ink-400">{description}</p></div></div>
}

export function CustomerCreatePage() {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [form, setForm] = useState(initialForm)
  const [stepError, setStepError] = useState('')
  const districtOptions = useMemo(() => turkeyLocations.find((location) => location.province === form.city)?.districts ?? [], [form.city])

  function updateField<K extends keyof FormData>(field: K, value: FormData[K]) {
    setForm((current) => ({ ...current, [field]: value }))
    setStepError('')
  }

  function validateStep() {
    if (activeStep === 0) {
      if (!form.companyName.trim()) return 'Firma adı alanını doldurun.'
      if (!form.taxNumber.trim()) return 'Vergi numarası alanını doldurun.'
      if (!form.sgkNumber.trim()) return 'SGK işyeri sicil numarasını girin.'
      if (!form.naceCode) return 'NACE kodu seçin.'
      if (!form.riskLevel) return 'Tehlike sınıfı seçin.'
    }
    if (activeStep === 1) {
      if (!form.city || !form.district) return 'İl ve ilçe bilgilerini seçin.'
      if (!form.address.trim()) return 'Açık adres alanını doldurun.'
      if (!form.contactName.trim()) return 'Firma yetkilisini girin.'
      if (!form.email.trim() || !form.email.includes('@')) return 'Geçerli bir e-posta adresi girin.'
      if (!form.phone.trim()) return 'Telefon numarasını girin.'
    }
    if (activeStep === 2) {
      if (!form.contractStart) return 'Sözleşme başlangıç tarihini seçin.'
      if (!form.contractStatus) return 'Sözleşme durumunu seçin.'
    }
    return ''
  }

  function goNext() {
    const error = validateStep()
    if (error) {
      setStepError(error)
      toast.error('Eksik bilgileri tamamlayın', { description: error })
      return
    }
    setActiveStep((current) => Math.min(current + 1, steps.length - 1))
  }

  function goBack() {
    setStepError('')
    setActiveStep((current) => Math.max(current - 1, 0))
  }

  function saveDraft() {
    toast.success('Taslak kaydedildi', { description: 'Firma bilgileri bu oturum için saklandı.' })
  }

  function submitCustomer() {
    const error = validateStep()
    if (error) {
      setActiveStep(activeStep === 4 ? 0 : activeStep)
      setStepError(error)
      toast.error('Firma oluşturulamadı', { description: error })
      return
    }
    const existing = readCustomers()
    const newCustomer: Customer = {
      id: Date.now(),
      name: form.companyName,
      taxNumber: form.taxNumber,
      sector: form.naceTitle || 'Belirtilmedi',
      location: form.city && form.district ? `${form.city} / ${form.district}` : '—',
      employees: Number(form.employees) || 0,
      riskLevel: (form.riskLevel as RiskLevel) || 'Az tehlikeli',
      expert: form.expert || '',
      doctor: form.doctor || '',
      expertMinutes: Number(form.expertMinutes) || 0,
      doctorMinutes: Number(form.doctorMinutes) || 0,
      contractStatus: form.contractStatus as ContractStatus,
      approvalStatus: 'Onay bekliyor' as ApprovalStatus,
      status: 'active' as CompanyStatus,
      contactName: form.contactName,
      contactEmail: form.email,
      contactPhone: form.phone,
      updatedAt: new Date().toLocaleDateString('tr-TR') + ', ' + new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      socialSecurityNumber: form.sgkNumber,
      naceCode: form.naceCode ? `${form.naceCode} — ${form.naceTitle}` : '—',
      participants: 0,
      contractStart: form.contractStart || '—',
      contractEnd: form.contractEnd || '—',
      approver: 'Henüz onaylanmadı',
      signatory: form.signatory || form.contactName,
      city: form.city,
      district: form.district,
      address: form.address,
      accountant: form.accountantName || '—',
      accountantPhone: form.accountantPhone || '—',
      accountantEmail: form.accountantEmail || '—',
      visitPeriod: 'Aylık',
      completedVisits: 0,
      plannedVisits: 0,
      nextVisit: '—',
      expertClass: '—',
    }
    saveCustomers([...existing, newCustomer])
    toast.success('Firma oluşturuldu', { description: `${form.companyName} Firma portföyüne eklendi.` })
    navigate('/dashboard/firmalar')
  }

  function renderStep() {
    if (activeStep === 0) return <motion.div key="company" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6"><SectionHeading icon={Building2} title="Firma bilgileri" description="Firmayi tanımlayan temel bilgileri eksiksiz girin." /><div className="grid gap-4 sm:grid-cols-2"><Input label="Firma adı" placeholder="Örn. Quantis Tekstil" value={form.companyName} onChange={(event) => updateField('companyName', event.target.value)} required /><Input label="Vergi numarası" placeholder="10 veya 11 haneli numara" value={form.taxNumber} onChange={(event) => updateField('taxNumber', event.target.value)} /><Input label="SGK işyeri sicil no" placeholder="2-XXXXXXXX-X-X-..." value={form.sgkNumber} onChange={(event) => updateField('sgkNumber', event.target.value)} hint="Sicil numarası üzerinden mevcut firma eşleşmesi kontrol edilir." /><SelectField label="Şirket yapısı" value={form.branchType} onChange={(value) => updateField('branchType', value)} options={[{ value: 'Merkez', label: 'Merkez' }, { value: 'Şube', label: 'Şube' }]} /></div><div className="grid gap-4 sm:grid-cols-2"><NaceSearchField value={form.naceCode} title={form.naceTitle} onSelect={(code, title, risk) => { updateField('naceCode', code); updateField('naceTitle', title); if (risk) updateField('riskLevel', risk) }} /><div className="hidden"><FieldLabel required>NACE kodu</FieldLabel><div className="relative"><select value={form.naceCode} onChange={(event) => { const selected = naceCodes.find((option) => option.code === event.target.value); updateField('naceCode', event.target.value); updateField('naceTitle', selected?.title ?? ''); if (selected?.hazard) updateField('riskLevel', selected.hazard) }} className="h-12 w-full appearance-none rounded-xl border border-ink-200 bg-white px-3.5 pr-10 text-sm text-ink-900 outline-none transition-all focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"><option value="">NACE kodu seçiniz</option>{naceCodes.map((option) => <option key={option.code} value={option.code}>{option.code} — {option.title}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" /></div>{form.naceTitle && <p className="mt-1.5 text-[11px] text-brand-700">Seçilen faaliyet: {form.naceTitle}</p>}</div><SelectField label="Tehlike sınıfı" value={form.riskLevel} onChange={(value) => updateField('riskLevel', value)} options={[{ value: 'Az tehlikeli', label: 'Az tehlikeli' }, { value: 'Tehlikeli', label: 'Tehlikeli' }, { value: 'Çok tehlikeli', label: 'Çok tehlikeli' }]} required hint="NACE seçimine göre otomatik önerilir; gerektiğinde değiştirebilirsiniz." /></div><div className="flex items-start gap-3 rounded-xl border border-sky-100 bg-sky-50/70 p-4"><Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" /><p className="text-xs leading-5 text-sky-800/75">NACE kodunu doğru seçmek, tehlike sınıfı ve İSG hizmet kapasitesinin doğru hesaplanmasını sağlar.</p></div></motion.div>
    if (activeStep === 1) return <motion.div key="contact" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6"><SectionHeading icon={MapPin} title="Adres ve iletişim" description="Firma lokasyonu ve iletişim kurulacak yetkili bilgileri." /><div className="grid gap-4 sm:grid-cols-2"><SelectField label="İl" value={form.city} onChange={(value) => { updateField('city', value); updateField('district', '') }} options={turkeyLocations.map(({ province, plateCode }) => ({ value: province, label: `${province} (${plateCode})` }))} required /><SelectField label="İlçe" value={form.district} onChange={(value) => updateField('district', value)} options={districtOptions.map((district) => ({ value: district, label: district }))} required disabled={!form.city} hint={form.city ? `${districtOptions.length} ilçe seçilebilir.` : 'Önce il seçiniz.'} /></div><label className="block"><FieldLabel required>Açık adres</FieldLabel><textarea value={form.address} onChange={(event) => updateField('address', event.target.value)} placeholder="Cadde, sokak, bina ve diğer adres bilgileri" rows={3} className="w-full resize-none rounded-xl border border-ink-200 bg-white px-3.5 py-3 text-sm text-ink-900 outline-none transition-all placeholder:text-ink-400 hover:border-ink-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10" /></label><div className="border-t border-ink-100 pt-5"><div className="mb-4 flex items-center gap-2"><UserRound className="h-4 w-4 text-ink-400" /><div><h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-600">Firma yetkilisi</h3><p className="mt-1 text-[11px] text-ink-400">Bildirim ve sözleşme iletişiminde kullanılacak kişi.</p></div></div><div className="grid gap-4 sm:grid-cols-2"><Input label="Yetkili kişi" placeholder="Ad Soyad" value={form.contactName} onChange={(event) => updateField('contactName', event.target.value)} required /><Input label="İmza yetkilisi / vekili" placeholder="Ad Soyad" value={form.signatory} onChange={(event) => updateField('signatory', event.target.value)} /><Input label="E-posta" type="email" placeholder="yetkili@firma.com" value={form.email} onChange={(event) => updateField('email', event.target.value)} required /><Input label="Telefon" type="tel" placeholder="+90 5xx xxx xx xx" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} required /></div></div><div className="border-t border-ink-100 pt-5"><div className="mb-4 flex items-center gap-2"><FileText className="h-4 w-4 text-ink-400" /><h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-600">Mali müşavir <span className="font-normal normal-case tracking-normal text-ink-400">(opsiyonel)</span></h3></div><div className="grid gap-4 sm:grid-cols-3"><Input label="Ad Soyad" placeholder="Mali müşavir adı" value={form.accountantName} onChange={(event) => updateField('accountantName', event.target.value)} /><Input label="Telefon" placeholder="Telefon" value={form.accountantPhone} onChange={(event) => updateField('accountantPhone', event.target.value)} /><Input label="E-posta" type="email" placeholder="E-posta" value={form.accountantEmail} onChange={(event) => updateField('accountantEmail', event.target.value)} /></div></div></motion.div>
    if (activeStep === 2) return <motion.div key="isg" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6"><SectionHeading icon={ShieldCheck} title="İSG hizmeti" description="Çalışan sayısını, sorumlu profesyonelleri ve sözleşme kapsamını tanımlayın." /><div className="grid gap-4 sm:grid-cols-3"><Input label="Çalışan sayısı" type="number" min="0" placeholder="0" value={form.employees} onChange={(event) => updateField('employees', event.target.value)} /><Input label="Uzman hizmet süresi" type="number" min="0" placeholder="Dakika / ay" value={form.expertMinutes} onChange={(event) => updateField('expertMinutes', event.target.value)} hint="Dakika / ay" /><Input label="Hekim hizmet süresi" type="number" min="0" placeholder="Dakika / ay" value={form.doctorMinutes} onChange={(event) => updateField('doctorMinutes', event.target.value)} hint="Dakika / ay" /></div><div className="grid gap-4 sm:grid-cols-2"><SelectField label="İSG uzmanı" value={form.expert} onChange={(value) => updateField('expert', value)} options={experts.map((expert) => ({ value: expert, label: expert }))} hint="Atamayı daha sonra da yapabilirsiniz." /><SelectField label="İşyeri hekimi" value={form.doctor} onChange={(value) => updateField('doctor', value)} options={doctors.map((doctor) => ({ value: doctor, label: doctor }))} hint="Atamayı daha sonra da yapabilirsiniz." /></div><div className="border-t border-ink-100 pt-5"><SectionHeading icon={FileCheck2} title="Sözleşme ayarları" description="Hizmet sözleşmesinin başlangıç ve durum bilgileri." /><div className="grid gap-4 sm:grid-cols-3"><Input label="Başlangıç tarihi" type="date" value={form.contractStart} onChange={(event) => updateField('contractStart', event.target.value)} required /><Input label="Bitiş tarihi" type="date" value={form.contractEnd} onChange={(event) => updateField('contractEnd', event.target.value)} /><SelectField label="Sözleşme statüsü" value={form.contractStatus} onChange={(value) => updateField('contractStatus', value)} options={[{ value: 'Teklif aşamasında', label: 'Teklif aşamasında' }, { value: 'Devam ediyor', label: 'Devam ediyor' }, { value: 'Sonlandırıldı', label: 'Sonlandırıldı' }]} required /></div></div><div className="flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50/70 p-4"><CircleHelp className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" /><p className="text-xs leading-5 text-amber-800/75">Uzman veya hekim ataması yapmadan da firmayı oluşturabilirsiniz. Atamalar daha sonra firma kartından düzenlenebilir.</p></div></motion.div>
    if (activeStep === 3) return <motion.div key="notifications" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6"><SectionHeading icon={Mail} title="Bildirim tercihleri" description="Firma ve katılımcılara gönderilecek iletişim kanallarını belirleyin." /><div className="space-y-3">{[{ key: 'sms', label: 'Firma SMS bildirimleri', detail: 'Firma yetkilisine operasyonel durum mesajları gönderilir.', icon: Phone }, { key: 'loginSms', label: 'Giriş bilgisi SMS', detail: 'Katılımcı giriş bilgileri SMS ile iletilir.', icon: Users }, { key: 'loginWhatsapp', label: 'Giriş bilgisi WhatsApp', detail: 'Katılımcı giriş bilgileri WhatsApp üzerinden paylaşılır.', icon: Phone }, { key: 'trainingWhatsapp', label: 'Eğitim hatırlatma WhatsApp', detail: 'Eğitim atama ve hatırlatma bildirimleri gönderilir.', icon: CalendarDays }, { key: 'loginEmail', label: 'Giriş bilgisi e-posta', detail: 'Katılımcı giriş bilgileri e-posta ile iletilir.', icon: Mail }].map((item) => <label key={item.key} className={cn('flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors', form[item.key as keyof FormData] ? 'border-brand-200 bg-brand-50/50' : 'border-ink-200 hover:border-ink-300')}><input type="checkbox" checked={Boolean(form[item.key as keyof FormData])} onChange={(event) => updateField(item.key as keyof FormData, event.target.checked as never)} className="h-4 w-4 rounded border-ink-300" /><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-ink-500 shadow-sm ring-1 ring-ink-100"><item.icon className="h-4 w-4" /></span><span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-ink-800">{item.label}</span><span className="mt-1 block text-xs leading-5 text-ink-400">{item.detail}</span></span>{form[item.key as keyof FormData] && <Check className="h-4 w-4 text-brand-600" />}</label>)}</div><div className="flex items-start gap-3 rounded-xl border border-sky-100 bg-sky-50/70 p-4"><Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" /><p className="text-xs leading-5 text-sky-800/75">Bildirim tercihlerini daha sonra firma detay sayfasından değiştirebilirsiniz.</p></div></motion.div>
    return <motion.div key="review" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6"><div className="rounded-2xl border border-brand-200 bg-brand-50/60 p-5"><div className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700"><CheckCircle2 className="h-5 w-5" /></span><div><h2 className="text-sm font-semibold text-brand-900">Firma oluşturmaya hazır</h2><p className="mt-1 text-xs leading-5 text-brand-800/70">Aşağıdaki bilgileri kontrol edin. Kaydettiğinizde firma Firma portföyünüze eklenecek.</p></div></div></div><div className="grid gap-4 md:grid-cols-2"><div className="rounded-2xl border border-ink-200 bg-white p-5"><div className="flex items-center justify-between"><h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">Firma özeti</h3><button type="button" onClick={() => setActiveStep(0)} className="text-xs font-semibold text-brand-700 hover:text-brand-800">Düzenle</button></div><dl className="mt-3"><ReviewItem label="Firma adı" value={form.companyName || '—'} /><ReviewItem label="Vergi no" value={form.taxNumber || '—'} /><ReviewItem label="SGK sicil no" value={form.sgkNumber || '—'} /><ReviewItem label="NACE" value={form.naceCode ? `${form.naceCode} — ${form.naceTitle}` : '—'} /><ReviewItem label="Tehlike sınıfı" value={form.riskLevel || '—'} /></dl></div><div className="rounded-2xl border border-ink-200 bg-white p-5"><div className="flex items-center justify-between"><h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">İletişim</h3><button type="button" onClick={() => setActiveStep(1)} className="text-xs font-semibold text-brand-700 hover:text-brand-800">Düzenle</button></div><dl className="mt-3"><ReviewItem label="Konum" value={form.city && form.district ? `${form.district} / ${form.city}` : '—'} /><ReviewItem label="Yetkili" value={form.contactName || '—'} /><ReviewItem label="E-posta" value={form.email || '—'} /><ReviewItem label="Telefon" value={form.phone || '—'} /></dl></div><div className="rounded-2xl border border-ink-200 bg-white p-5"><div className="flex items-center justify-between"><h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">İSG hizmeti</h3><button type="button" onClick={() => setActiveStep(2)} className="text-xs font-semibold text-brand-700 hover:text-brand-800">Düzenle</button></div><dl className="mt-3"><ReviewItem label="Çalışan" value={form.employees || '0'} /><ReviewItem label="Uzman" value={form.expert || 'Atanmamış'} /><ReviewItem label="Hekim" value={form.doctor || 'Atanmamış'} /><ReviewItem label="Sözleşme" value={form.contractStatus || '—'} /></dl></div><div className="rounded-2xl border border-ink-200 bg-white p-5"><div className="flex items-center justify-between"><h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">Bildirim kanalları</h3><button type="button" onClick={() => setActiveStep(3)} className="text-xs font-semibold text-brand-700 hover:text-brand-800">Düzenle</button></div><p className="mt-4 text-sm font-semibold text-ink-800">{[form.sms, form.loginSms, form.loginWhatsapp, form.trainingWhatsapp, form.loginEmail].filter(Boolean).length} kanal aktif</p><p className="mt-1 text-xs leading-5 text-ink-400">Seçtiğiniz iletişim kanalları firma oluşturulduktan sonra uygulanır.</p></div></div><div className="flex items-start gap-3 rounded-xl border border-ink-200 bg-ink-50/60 p-4"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /><p className="text-xs leading-5 text-ink-600">Firma oluşturulduktan sonra katılımcı ekleyebilir, eğitim atayabilir ve sözleşme belgelerini firma kartından yönetebilirsiniz.</p></div></motion.div>
  }

  return <div className="space-y-6"><motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}><Link to="/dashboard/firmalar" className="inline-flex items-center gap-2 text-xs font-semibold text-ink-500 transition-colors hover:text-brand-700"><ArrowLeft className="h-4 w-4" /> Firma listesine dön</Link><div className="mt-5 flex items-center gap-2 text-xs font-medium text-ink-400"><span>Firmalar</span><ChevronRight className="h-3.5 w-3.5" /><span className="text-ink-600">Yeni Firma</span></div><div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[30px]">Yeni Firma oluştur</h1><p className="mt-1.5 text-sm text-ink-500">Firma bilgilerini adım adım tamamlayarak güvenli bir Firma kaydı oluşturun.</p></div><span className="inline-flex w-fit items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1.5 text-xs font-semibold text-ink-500"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Taslak</span></div></motion.div><div className="grid items-start gap-5 lg:grid-cols-[260px_minmax(0,1fr)]"><aside className="rounded-2xl border border-ink-200/80 bg-white p-4 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] lg:sticky lg:top-[100px]"><div className="mb-5 flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink-400">Oluşturma akışı</p><p className="mt-1 text-xs font-semibold text-ink-700">Adım {activeStep + 1} / {steps.length}</p></div><span className="text-xs font-bold text-brand-700">%{Math.round(((activeStep + 1) / steps.length) * 100)}</span></div><div className="mb-6 h-1.5 overflow-hidden rounded-full bg-ink-100"><div className="h-full rounded-full bg-brand-500 transition-all duration-300" style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }} /></div><nav className="flex gap-2 overflow-x-auto lg:block lg:space-y-1">{steps.map((step, index) => <button key={step.title} type="button" onClick={() => { if (index <= activeStep) setActiveStep(index) }} disabled={index > activeStep} className={cn('group flex min-w-[190px] items-center gap-3 rounded-xl p-3 text-left transition-colors lg:w-full', activeStep === index ? 'bg-brand-50' : index < activeStep ? 'hover:bg-ink-50' : 'cursor-not-allowed opacity-50')}><span className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-lg text-xs font-bold', index < activeStep ? 'bg-brand-600 text-white' : activeStep === index ? 'bg-white text-brand-700 shadow-sm ring-1 ring-brand-100' : 'bg-ink-100 text-ink-400')}>{index < activeStep ? <Check className="h-4 w-4" /> : <step.icon className="h-4 w-4" strokeWidth={1.8} />}</span><span className="min-w-0"><span className={cn('block truncate text-xs font-semibold', activeStep === index ? 'text-brand-800' : 'text-ink-700')}>{step.title}</span><span className="mt-0.5 block truncate text-[10px] text-ink-400">{step.detail}</span></span></button>)}</nav><div className="mt-5 hidden items-start gap-2 rounded-xl bg-ink-50 p-3 lg:flex"><Save className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-400" /><p className="text-[11px] leading-5 text-ink-500">İlerlemeniz otomatik olarak korunur. İstediğiniz zaman taslak olarak kaydedebilirsiniz.</p></div></aside><section className="min-w-0 rounded-2xl border border-ink-200/80 bg-white shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]"><div className="min-h-[580px] p-5 sm:p-7">{renderStep()}{stepError && <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-3 text-xs font-medium text-rose-700">{stepError}</div>}</div><div className="flex flex-col-reverse justify-between gap-3 border-t border-ink-100 bg-ink-50/35 px-5 py-4 sm:flex-row sm:items-center sm:px-7"><button type="button" onClick={saveDraft} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl px-3 text-xs font-semibold text-ink-500 transition-colors hover:bg-white hover:text-ink-800 sm:mr-auto"><Save className="h-4 w-4" /> Taslağı kaydet</button><div className="flex flex-col-reverse gap-2 sm:flex-row">{activeStep > 0 && <Button type="button" variant="outline" onClick={goBack} leftIcon={<ArrowLeft className="h-4 w-4" />}>Geri</Button>}{activeStep < steps.length - 1 ? <Button type="button" onClick={goNext} rightIcon={<ArrowRight className="h-4 w-4" />}>Devam et</Button> : <Button type="button" onClick={submitCustomer} leftIcon={<CheckCircle2 className="h-4 w-4" />}>Firmayi oluştur</Button>}</div></div></section></div></div>
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return <div className="flex items-start justify-between gap-4 border-b border-ink-100 py-2.5 last:border-b-0"><dt className="text-xs text-ink-400">{label}</dt><dd className="max-w-[62%] text-right text-xs font-semibold text-ink-700">{value}</dd></div>
}
