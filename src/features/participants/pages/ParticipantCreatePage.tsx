import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Info,
  KeyRound,
  Mail,
  Phone,
  Save,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button, Input } from '@/components/ui'
import { saveParticipants, readParticipants, type Participant, type ParticipantStatus } from '../data/participants'
import { readCustomers } from '@/features/customers/data/customers'

type ParticipantForm = {
  company: string
  name: string
  jobTitle: string
  username: string
  email: string
  phone: string
  tcNumber: string
  status: ParticipantStatus
  password: string
  passwordConfirmation: string
}

const initialForm: ParticipantForm = {
  company: '', name: '', jobTitle: '', username: '', email: '', phone: '', tcNumber: '', status: 'active', password: '', passwordConfirmation: '',
}

const steps = [
  { title: 'Çalışan bilgileri', detail: 'Firma ve kimlik bilgileri', icon: Users },
  { title: 'Panel hesabı', detail: 'Giriş bilgileri ve güvenlik', icon: KeyRound },
  { title: 'Son kontrol', detail: 'Kaydetmeden önce gözden geçir', icon: CheckCircle2 },
]

function FieldLabel({ children, required = false }: { children: ReactNode; required?: boolean }) {
  return <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">{children}{required && <span className="ml-1 text-brand-600">*</span>}</span>
}

function SelectField({ label, value, onChange, options, required = false, hint }: { label: string; value: string; onChange: (value: string) => void; options: Array<{ value: string; label: string }>; required?: boolean; hint?: string }) {
  return <label className="block"><FieldLabel required={required}>{label}</FieldLabel><div className="relative"><select value={value} onChange={(event) => onChange(event.target.value)} className="h-12 w-full appearance-none rounded-xl border border-ink-200 bg-white px-3.5 pr-10 text-sm text-ink-900 outline-none transition-all hover:border-ink-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"><option value="">Seçiniz</option>{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" /></div>{hint && <span className="mt-1.5 block text-[11px] leading-5 text-ink-400">{hint}</span>}</label>
}

function SectionHeading({ icon: Icon, title, description }: { icon: typeof Users; title: string; description: string }) {
  return <div className="mb-6 flex items-start gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700"><Icon className="h-[18px] w-[18px]" strokeWidth={1.8} /></span><div><h2 className="text-sm font-semibold text-ink-900">{title}</h2><p className="mt-1 text-xs leading-5 text-ink-400">{description}</p></div></div>
}

export function ParticipantCreatePage() {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const companies = useMemo(() => {
    const customers = readCustomers()
    return customers
      .filter((c) => c.status === 'active')
      .map((c) => ({ id: c.id, name: c.name, riskLevel: c.riskLevel }))
  }, [])

  function updateField<K extends keyof ParticipantForm>(field: K, value: ParticipantForm[K]) {
    setForm((current) => ({ ...current, [field]: value }))
    setError('')
  }

  function validateStep() {
    if (activeStep === 0) {
      if (!form.company) return 'Alt firma seçin.'
      if (!form.name.trim()) return 'Ad soyad alanını doldurun.'
      if (form.tcNumber && !/^\d{11}$/.test(form.tcNumber)) return 'TC Kimlik No 11 haneli olmalı.'
    }
    if (activeStep === 1) {
      if (!form.username.trim()) return 'Kullanıcı adı alanını doldurun.'
      if (!form.email.trim() || !form.email.includes('@')) return 'Geçerli bir e-posta adresi girin.'
      if (!form.password || form.password.length < 6) return 'Şifre en az 6 karakter olmalı.'
      if (form.password !== form.passwordConfirmation) return 'Şifreler eşleşmiyor.'
    }
    return ''
  }

  function nextStep() {
    const validationError = validateStep()
    if (validationError) {
      setError(validationError)
      toast.error('Eksik bilgileri tamamlayın', { description: validationError })
      return
    }
    setActiveStep((current) => Math.min(current + 1, steps.length - 1))
  }

  function previousStep() {
    setError('')
    setActiveStep((current) => Math.max(current - 1, 0))
  }

  function saveDraft() {
    toast.success('Katılımcı taslağı kaydedildi', { description: 'Bilgiler bu oturum için korunuyor.' })
  }

  function createParticipant() {
    const validationError = validateStep()
    if (validationError) {
      setError(validationError)
      toast.error('Katılımcı oluşturulamadı', { description: validationError })
      return
    }
    const selectedCompany = companies.find((company) => company.name === form.company) ?? companies[0]
    const participant: Participant = {
      id: Date.now(),
      name: form.name,
      username: form.username,
      email: form.email,
      phone: form.phone || '—',
      tcNumber: form.tcNumber || '—',
      companyId: selectedCompany.id,
      company: selectedCompany.name,
      riskLevel: selectedCompany.riskLevel,
      department: form.jobTitle || 'Genel',
      trainingMinutes: 0,
      progress: 0,
      trainingStatus: 'not_started',
      lastCompletion: '—',
      nextTraining: '—',
      status: form.status,
      lastLogin: 'Henüz giriş yapmadı',
      password: form.password,
    }
    saveParticipants([...readParticipants(), participant])
    toast.success('Katılımcı başarıyla oluşturuldu', { description: `${participant.name} ${participant.company} firmasına eklendi.` })
    navigate('/dashboard/katilimcilar')
  }

  function renderStep() {
    if (activeStep === 0) return <motion.div key="identity" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} className="space-y-6"><SectionHeading icon={Users} title="Çalışan bilgileri" description="Katılımcının bağlı olduğu firma ve temel kimlik bilgilerini girin." /><div className="grid gap-4 sm:grid-cols-2"><SelectField label="Alt firma" value={form.company} onChange={(value) => updateField('company', value)} options={companies.map((company) => ({ value: company.name, label: company.name }))} required hint="Katılımcı bu firmanın çalışan listesine eklenecek." /><Input label="Ad soyad" placeholder="Ad Soyad" value={form.name} onChange={(event) => updateField('name', event.target.value)} required /><Input label="Ünvan" placeholder="Örn. Üretim operatörü" value={form.jobTitle} onChange={(event) => updateField('jobTitle', event.target.value)} hint="Eğitim ve katılımcı listelerinde gösterilir." /><Input label="TC Kimlik No" placeholder="11 haneli kimlik numarası" inputMode="numeric" maxLength={11} value={form.tcNumber} onChange={(event) => updateField('tcNumber', event.target.value.replace(/\D/g, ''))} /></div><div className="flex items-start gap-3 rounded-xl border border-sky-100 bg-sky-50/70 p-4"><Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" /><p className="text-xs leading-5 text-sky-800/75">TC Kimlik No opsiyoneldir. Katılımcı hesabı oluşturmak için firma, ad soyad ve panel hesabı bilgileri yeterlidir.</p></div></motion.div>
    if (activeStep === 1) return <motion.div key="account" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} className="space-y-6"><SectionHeading icon={KeyRound} title="Panel hesabı" description="Katılımcının sisteme güvenli şekilde giriş yapacağı bilgileri oluşturun." /><div className="grid gap-4 sm:grid-cols-2"><Input label="Kullanıcı adı" placeholder="ornek.kullanici" value={form.username} onChange={(event) => updateField('username', event.target.value)} required hint="Katılımcı giriş ekranında kullanılır." /><Input label="E-posta" type="email" placeholder="calisan@firma.com" icon={<Mail className="h-[18px] w-[18px]" />} value={form.email} onChange={(event) => updateField('email', event.target.value)} required /><Input label="Telefon" type="tel" placeholder="+90 5xx xxx xx xx" icon={<Phone className="h-[18px] w-[18px]" />} value={form.phone} onChange={(event) => updateField('phone', event.target.value)} /><SelectField label="Durum" value={form.status} onChange={(value) => updateField('status', value as ParticipantStatus)} options={[{ value: 'active', label: 'Aktif' }, { value: 'passive', label: 'Pasif' }]} required /></div><div className="border-t border-ink-100 pt-5"><div className="mb-4 flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brand-600" /><div><h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-600">Giriş güvenliği</h3><p className="mt-1 text-[11px] text-ink-400">İlk girişte değiştirilebilecek geçici bir şifre oluşturun.</p></div></div><div className="grid gap-4 sm:grid-cols-2"><Input label="Şifre" type="password" placeholder="En az 6 karakter" value={form.password} onChange={(event) => updateField('password', event.target.value)} required /><Input label="Şifre tekrar" type="password" placeholder="Şifreyi tekrar girin" value={form.passwordConfirmation} onChange={(event) => updateField('passwordConfirmation', event.target.value)} required /></div></div><div className="flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50/70 p-4"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" /><p className="text-xs leading-5 text-amber-800/75">Şifreleri e-posta veya Excel çıktısında göstermiyoruz. Katılımcıya güvenli kanal üzerinden iletilmesi önerilir.</p></div></motion.div>
    return <motion.div key="review" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} className="space-y-6"><div className="rounded-2xl border border-brand-200 bg-brand-50/60 p-5"><div className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700"><CheckCircle2 className="h-5 w-5" /></span><div><h2 className="text-sm font-semibold text-brand-900">Katılımcı oluşturmaya hazır</h2><p className="mt-1 text-xs leading-5 text-brand-800/70">Bilgileri kontrol edin. Kaydettiğinizde katılımcı eğitim paneline eklenir.</p></div></div></div><div className="grid gap-4 md:grid-cols-2"><div className="rounded-2xl border border-ink-200 p-5"><div className="flex items-center justify-between"><h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">Çalışan bilgileri</h3><button type="button" onClick={() => setActiveStep(0)} className="text-xs font-semibold text-brand-700">Düzenle</button></div><dl className="mt-3 divide-y divide-ink-100"><ReviewItem label="Alt firma" value={form.company || '—'} /><ReviewItem label="Ad soyad" value={form.name || '—'} /><ReviewItem label="Ünvan" value={form.jobTitle || '—'} /><ReviewItem label="TC Kimlik No" value={form.tcNumber || '—'} /></dl></div><div className="rounded-2xl border border-ink-200 p-5"><div className="flex items-center justify-between"><h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">Panel hesabı</h3><button type="button" onClick={() => setActiveStep(1)} className="text-xs font-semibold text-brand-700">Düzenle</button></div><dl className="mt-3 divide-y divide-ink-100"><ReviewItem label="Kullanıcı adı" value={form.username || '—'} /><ReviewItem label="E-posta" value={form.email || '—'} /><ReviewItem label="Telefon" value={form.phone || '—'} /><ReviewItem label="Durum" value={form.status === 'active' ? 'Aktif' : 'Pasif'} /></dl></div></div><div className="flex items-start gap-3 rounded-xl border border-ink-200 bg-ink-50/60 p-4"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /><p className="text-xs leading-5 text-ink-600">Oluşturulduktan sonra katılımcıya eğitim atayabilir, ilerleme durumunu takip edebilir ve hesabını pasif hale getirebilirsiniz.</p></div></motion.div>
  }

  return <div className="space-y-6"><motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}><Link to="/dashboard/katilimcilar" className="inline-flex items-center gap-2 text-xs font-semibold text-ink-500 transition-colors hover:text-brand-700"><ArrowLeft className="h-4 w-4" /> Katılımcı listesine dön</Link><div className="mt-5 flex items-center gap-2 text-xs font-medium text-ink-400"><span>Katılımcılar</span><ChevronRight className="h-3.5 w-3.5" /><span className="text-ink-600">Yeni katılımcı</span></div><div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[30px]">Yeni katılımcı oluştur</h1><p className="mt-1.5 text-sm text-ink-500">Çalışan kaydını ve panel erişimini birkaç adımda tamamlayın.</p></div><span className="inline-flex w-fit items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1.5 text-xs font-semibold text-ink-500"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Taslak</span></div></motion.div><div className="grid items-start gap-5 lg:grid-cols-[260px_minmax(0,1fr)]"><aside className="rounded-2xl border border-ink-200/80 bg-white p-4 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] lg:sticky lg:top-[100px]"><div className="mb-5 flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink-400">Oluşturma akışı</p><p className="mt-1 text-xs font-semibold text-ink-700">Adım {activeStep + 1} / {steps.length}</p></div><span className="text-xs font-bold text-brand-700">%{Math.round(((activeStep + 1) / steps.length) * 100)}</span></div><div className="mb-6 h-1.5 overflow-hidden rounded-full bg-ink-100"><div className="h-full rounded-full bg-brand-500 transition-all duration-300" style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }} /></div><nav className="flex gap-2 overflow-x-auto lg:block lg:space-y-1">{steps.map((step, index) => <button key={step.title} type="button" onClick={() => { if (index <= activeStep) setActiveStep(index) }} disabled={index > activeStep} className={cn('group flex min-w-[190px] items-center gap-3 rounded-xl p-3 text-left transition-colors lg:w-full', activeStep === index ? 'bg-brand-50' : index < activeStep ? 'hover:bg-ink-50' : 'cursor-not-allowed opacity-50')}><span className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-lg text-xs font-bold', index < activeStep ? 'bg-brand-600 text-white' : activeStep === index ? 'bg-white text-brand-700 shadow-sm ring-1 ring-brand-100' : 'bg-ink-100 text-ink-400')}>{index < activeStep ? <Check className="h-4 w-4" /> : <step.icon className="h-4 w-4" strokeWidth={1.8} />}</span><span className="min-w-0"><span className={cn('block truncate text-xs font-semibold', activeStep === index ? 'text-brand-800' : 'text-ink-700')}>{step.title}</span><span className="mt-0.5 block truncate text-[10px] text-ink-400">{step.detail}</span></span></button>)}</nav><div className="mt-5 hidden items-start gap-2 rounded-xl bg-ink-50 p-3 lg:flex"><Save className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-400" /><p className="text-[11px] leading-5 text-ink-500">İlerleme otomatik korunur. İstediğiniz zaman taslak kaydı alabilirsiniz.</p></div></aside><section className="min-w-0 rounded-2xl border border-ink-200/80 bg-white shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]"><div className="min-h-[500px] p-5 sm:p-7">{renderStep()}{error && <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-3 text-xs font-medium text-rose-700">{error}</div>}</div><div className="flex flex-col-reverse justify-between gap-3 border-t border-ink-100 bg-ink-50/35 px-5 py-4 sm:flex-row sm:items-center sm:px-7"><button type="button" onClick={saveDraft} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl px-3 text-xs font-semibold text-ink-500 transition-colors hover:bg-white hover:text-ink-800 sm:mr-auto"><Save className="h-4 w-4" /> Taslağı kaydet</button><div className="flex flex-col-reverse gap-2 sm:flex-row">{activeStep > 0 && <Button type="button" variant="outline" onClick={previousStep} leftIcon={<ArrowLeft className="h-4 w-4" />}>Geri</Button>}{activeStep < steps.length - 1 ? <Button type="button" onClick={nextStep} rightIcon={<ArrowRight className="h-4 w-4" />}>Devam et</Button> : <Button type="button" onClick={createParticipant} leftIcon={<CheckCircle2 className="h-4 w-4" />}>Katılımcıyı oluştur</Button>}</div></div></section></div></div>
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return <div className="flex items-start justify-between gap-4 py-2.5"><dt className="text-xs text-ink-400">{label}</dt><dd className="max-w-[62%] text-right text-xs font-semibold text-ink-700">{value}</dd></div>
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}
