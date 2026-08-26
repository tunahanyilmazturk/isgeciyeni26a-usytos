import { motion } from 'framer-motion'
import {
  ChevronDown,
  Info,
  KeyRound,
  UserPlus,
  Users,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button, Input } from '@/components/ui'
import { readCustomers } from '@/features/customers/data/customers'
import { saveParticipants, readParticipants, type Participant, type ParticipantStatus } from '../data/participants'

type ParticipantForm = {
  company: string
  name: string
  jobTitle: string
  username: string
  tcNumber: string
  status: ParticipantStatus
  password: string
}

const DEFAULT_PASSWORD = '123456'

const initialForm: ParticipantForm = {
  company: '', name: '', jobTitle: '', username: '', tcNumber: '', status: 'active', password: DEFAULT_PASSWORD,
}

/** Tekil katılımcı ekleme modal'ı — tüm alanlar tek ekranda */
export function SingleParticipantModal({
  onClose,
  onCreate,
}: {
  onClose: () => void
  onCreate: (participant: Participant) => void
}) {
  const [form, setForm] = useState<ParticipantForm>(initialForm)
  const [error, setError] = useState('')

  const companies = useMemo(() => {
    const customers = readCustomers()
    return customers
      .filter((c) => c.status === 'active')
      .map((c) => ({ id: c.id, name: c.name, riskLevel: c.riskLevel }))
  }, [])

  // ESC ile kapatma
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  // İlk firma otomatik seçili olsun
  useEffect(() => {
    if (!form.company && companies.length > 0) {
      setForm((current) => ({ ...current, company: companies[0].name }))
    }
  }, [companies, form.company])

  function updateField<K extends keyof ParticipantForm>(field: K, value: ParticipantForm[K]) {
    setForm((current) => ({ ...current, [field]: value }))
    setError('')
  }

  function validate(): string {
    if (!form.company) return 'Alt firma seçin.'
    if (!form.name.trim()) return 'Ad soyad alanını doldurun.'
    if (!form.jobTitle.trim()) return 'Ünvan alanını doldurun.'
    if (!form.username.trim()) return 'Kullanıcı adı alanını doldurun.'
    if (!form.password || form.password.length < 6) return 'Şifre en az 6 karakter olmalı.'
    if (form.tcNumber && !/^\d{11}$/.test(form.tcNumber)) return 'TC Kimlik No 11 haneli olmalı.'
    return ''
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }
    const selectedCompany = companies.find((company) => company.name === form.company) ?? companies[0]
    const participant: Participant = {
      id: Date.now(),
      name: form.name.trim(),
      username: form.username.trim(),
      email: '—',
      phone: '—',
      tcNumber: form.tcNumber || '—',
      companyId: selectedCompany.id,
      company: selectedCompany.name,
      riskLevel: selectedCompany.riskLevel,
      department: form.jobTitle.trim(),
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
    onCreate(participant)
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-ink-900/30 backdrop-blur-[3px]"
        role="presentation"
        onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 16 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-2xl shadow-ink-900/15"
      >
        {/* Header */}
        <div className="shrink-0 border-b border-ink-100 bg-gradient-to-br from-brand-50/60 via-white to-white px-6 py-5 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-100 text-brand-700 ring-1 ring-brand-200">
                <UserPlus className="h-6 w-6" strokeWidth={1.8} />
              </span>
              <div>
                <h2 className="text-lg font-bold tracking-tight text-ink-900">Yeni katılımcı ekle</h2>
                <p className="mt-0.5 text-sm text-ink-500">Çalışan bilgilerini ve panel hesabını oluşturun.</p>
              </div>
            </div>
            <button type="button" onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-700" aria-label="Kapat">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Form içeriği */}
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
            <div className="mx-auto max-w-xl space-y-7">
              {/* Bölüm 1: Çalışan bilgileri */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                    <Users className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-ink-900">Çalışan bilgileri</h3>
                    <p className="text-[11px] text-ink-400">Firma ve kimlik bilgileri</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Alt firma */}
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">Alt firma<span className="ml-1 text-brand-600">*</span></span>
                    <div className="relative">
                      <select
                        value={form.company}
                        onChange={(event) => updateField('company', event.target.value)}
                        className="h-12 w-full appearance-none rounded-xl border border-ink-200 bg-white px-3.5 pr-10 text-sm text-ink-900 outline-none transition-all hover:border-ink-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
                      >
                        <option value="">Seçiniz</option>
                        {companies.map((company) => <option key={company.id} value={company.name}>{company.name}</option>)}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                    </div>
                  </label>

                  {/* Ad soyad */}
                  <Input
                    label="Ad soyad"
                    placeholder="Ad Soyad"
                    value={form.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    required
                  />

                  {/* Ünvan */}
                  <Input
                    label="Ünvan"
                    placeholder="Örn. Üretim operatörü"
                    value={form.jobTitle}
                    onChange={(event) => updateField('jobTitle', event.target.value)}
                    required
                    hint="Eğitim ve katılımcı listelerinde gösterilir."
                  />

                  {/* TC Kimlik */}
                  <Input
                    label="TC Kimlik No"
                    placeholder="11 haneli kimlik numarası"
                    inputMode="numeric"
                    maxLength={11}
                    value={form.tcNumber}
                    onChange={(event) => updateField('tcNumber', event.target.value.replace(/\D/g, ''))}
                    hint="Opsiyonel."
                  />
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-sky-100 bg-sky-50/70 p-3.5">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                  <p className="text-[11px] leading-5 text-sky-800/75">E-posta ve telefon bilgilerini katılımcı ilk girişte kendisi girecek.</p>
                </div>
              </section>

              {/* Bölüm 2: Panel hesabı */}
              <section className="space-y-4 border-t border-ink-100 pt-6">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                    <KeyRound className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-ink-900">Panel hesabı</h3>
                    <p className="text-[11px] text-ink-400">Giriş bilgileri ve durum</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Kullanıcı adı */}
                  <Input
                    label="Kullanıcı adı"
                    placeholder="ornek.kullanici"
                    value={form.username}
                    onChange={(event) => updateField('username', event.target.value)}
                    required
                    hint="Katılımcı giriş ekranında kullanılır."
                  />

                  {/* Durum */}
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">Durum<span className="ml-1 text-brand-600">*</span></span>
                    <div className="relative">
                      <select
                        value={form.status}
                        onChange={(event) => updateField('status', event.target.value as ParticipantStatus)}
                        className="h-12 w-full appearance-none rounded-xl border border-ink-200 bg-white px-3.5 pr-10 text-sm text-ink-900 outline-none transition-all hover:border-ink-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
                      >
                        <option value="active">Aktif</option>
                        <option value="passive">Pasif</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                    </div>
                  </label>
                </div>

                {/* Şifre */}
                <Input
                  label="Şifre"
                  value={form.password}
                  onChange={(event) => updateField('password', event.target.value)}
                  required
                  hint="Varsayılan: 123456 — katılımcı giriş yapınca değiştirecek"
                />

                <div className="flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50/70 p-3.5">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  <p className="text-[11px] leading-5 text-amber-800/75">Katılımcıya kullanıcı adı ve şifreyi bildirin. İlk girişte KVKK onayı sonrası şifre değişikliği zorunludur.</p>
                </div>
              </section>

              {/* Hata */}
              {error && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="shrink-0 border-t border-ink-100 bg-ink-50/40 px-6 py-4 sm:px-8">
            <div className="mx-auto flex max-w-xl items-center justify-end gap-2.5">
              <Button type="button" variant="outline" size="md" onClick={onClose}>İptal</Button>
              <Button type="submit" size="md" leftIcon={<UserPlus className="h-4 w-4" strokeWidth={1.7} />}>
                Katılımcıyı oluştur
              </Button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>,
    document.body,
  )
}
