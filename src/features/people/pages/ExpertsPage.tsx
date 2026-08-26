import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import {
  CheckCircle2,
  ChevronDown,
  Clock3,
  Edit3,
  FileBadge2,
  HardHat,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  UserPlus,
  Users,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button, Input } from '@/components/ui'
import { cn } from '@/lib/utils'

const expertSchema = z
  .object({
    firstName: z.string().trim().min(2, 'İsim en az 2 karakter olmalı.'),
    lastName: z.string().trim().min(2, 'Soyisim en az 2 karakter olmalı.'),
    title: z.string().min(1, 'Unvan seçiniz.'),
    certificateNumber: z.string().trim().min(2, 'Sertifika numarası gerekli.'),
    maxServiceDuration: z
      .string()
      .min(1, 'Hizmet süresi gerekli.')
      .regex(/^\d+$/, 'Sadece rakam giriniz.')
      .refine((value) => Number(value) > 0 && Number(value) <= 99999, '1–99.999 dakika arasında olmalı.'),
    username: z.string().trim(),
    email: z.string().trim().refine((value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), 'Geçerli bir e-posta giriniz.'),
    phone: z.string().trim(),
    password: z.string(),
    passwordConfirmation: z.string(),
  })
  .refine(
    ({ password, passwordConfirmation }) => !password && !passwordConfirmation || password === passwordConfirmation,
    { path: ['passwordConfirmation'], message: 'Şifreler eşleşmiyor.' },
  )

type ExpertForm = z.infer<typeof expertSchema>
type ExpertTitle = 'A Sınıfı İş Güvenliği Uzmanı' | 'B Sınıfı İş Güvenliği Uzmanı' | 'C Sınıfı İş Güvenliği Uzmanı'

type Expert = {
  id: number
  firstName: string
  lastName: string
  title: ExpertTitle
  certificateNumber: string
  maxServiceDuration: number
  usedServiceDuration: number
  email?: string
  phone?: string
  status: 'active' | 'inactive'
}

const initialExperts: Expert[] = [
  { id: 279, firstName: 'Barış', lastName: 'Eren', title: 'B Sınıfı İş Güvenliği Uzmanı', certificateNumber: 'B-2024-0182', maxServiceDuration: 11700, usedServiceDuration: 6240, email: 'baris.eren@hantech.com', status: 'active' },
  { id: 278, firstName: 'Seda', lastName: 'Yalçın', title: 'A Sınıfı İş Güvenliği Uzmanı', certificateNumber: 'A-2023-0094', maxServiceDuration: 11700, usedServiceDuration: 8100, email: 'seda.yalcin@hantech.com', status: 'active' },
  { id: 277, firstName: 'Ozan', lastName: 'Tekin', title: 'C Sınıfı İş Güvenliği Uzmanı', certificateNumber: 'C-2025-0317', maxServiceDuration: 11700, usedServiceDuration: 2950, phone: '+90 532 000 00 00', status: 'active' },
  { id: 276, firstName: 'Deniz', lastName: 'Kara', title: 'B Sınıfı İş Güvenliği Uzmanı', certificateNumber: 'B-2024-0141', maxServiceDuration: 11700, usedServiceDuration: 11700, email: 'deniz.kara@hantech.com', status: 'active' },
  { id: 275, firstName: 'Mert', lastName: 'Acar', title: 'A Sınıfı İş Güvenliği Uzmanı', certificateNumber: 'A-2022-0068', maxServiceDuration: 11700, usedServiceDuration: 0, status: 'inactive' },
]

const titleOptions: ExpertTitle[] = [
  'A Sınıfı İş Güvenliği Uzmanı',
  'B Sınıfı İş Güvenliği Uzmanı',
  'C Sınıfı İş Güvenliği Uzmanı',
]

function formatMinutes(minutes: number) {
  return `${new Intl.NumberFormat('tr-TR').format(minutes)} dk/ay`
}

function initials(expert: Expert) {
  return `${expert.firstName[0]}${expert.lastName[0]}`.toLocaleUpperCase('tr-TR')
}

export function ExpertsPage() {
  const [experts, setExperts] = useState(initialExperts)
  const [search, setSearch] = useState('')
  const [titleFilter, setTitleFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!isModalOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsModalOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isModalOpen])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExpertForm>({
    resolver: zodResolver(expertSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      title: '',
      certificateNumber: '',
      maxServiceDuration: '11700',
      username: '',
      email: '',
      phone: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const filteredExperts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('tr-TR')
    return experts.filter((expert) => {
      const matchesSearch = !query || `${expert.firstName} ${expert.lastName} ${expert.certificateNumber}`.toLocaleLowerCase('tr-TR').includes(query)
      const matchesTitle = titleFilter === 'all' || expert.title === titleFilter
      return matchesSearch && matchesTitle
    })
  }, [experts, search, titleFilter])

  const totalCapacity = experts.reduce((sum, expert) => sum + expert.maxServiceDuration, 0)
  const usedCapacity = experts.reduce((sum, expert) => sum + expert.usedServiceDuration, 0)
  const availableCapacity = totalCapacity - usedCapacity
  const activeExperts = experts.filter((expert) => expert.status === 'active').length

  function onSubmit(data: ExpertForm) {
    const expert: Expert = {
      id: Date.now(),
      firstName: data.firstName,
      lastName: data.lastName,
      title: data.title as ExpertTitle,
      certificateNumber: data.certificateNumber,
      maxServiceDuration: Number(data.maxServiceDuration),
      usedServiceDuration: 0,
      email: data.email || undefined,
      phone: data.phone || undefined,
      status: 'active',
    }
    setExperts((current) => [expert, ...current])
    reset()
    setIsModalOpen(false)
    toast.success('Uzman başarıyla eklendi', {
      description: `${expert.firstName} ${expert.lastName} uzman listesine eklendi.`,
    })
  }

  function handleDelete(expert: Expert) {
    if (!window.confirm(`${expert.firstName} ${expert.lastName} kaydı silinsin mi?`)) return
    setExperts((current) => current.filter((item) => item.id !== expert.id))
    toast.success('Uzman kaydı silindi')
  }

  return (
    <div className="space-y-7">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
      >
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-ink-400">
            <span>OSGB Bilgileri</span>
            <span>/</span>
            <span className="text-ink-600">Uzman</span>
          </div>
          <h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[30px]">Uzmanlar</h1>
          <p className="mt-1.5 text-sm text-ink-500">OSGB bünyesindeki iş güvenliği uzmanlarını ve hizmet kapasitelerini yönetin.</p>
        </div>
        <Button size="md" leftIcon={<UserPlus className="h-4 w-4" />} onClick={() => setIsModalOpen(true)}>
          Yeni uzman ekle
        </Button>
      </motion.div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Toplam uzman', value: experts.length, detail: `${activeExperts} aktif kayıt`, icon: Users, tone: 'teal' },
          { label: 'Aylık kapasite', value: formatMinutes(totalCapacity), detail: 'Toplam tanımlı süre', icon: Clock3, tone: 'violet' },
          { label: 'Kullanılabilir süre', value: formatMinutes(availableCapacity), detail: 'Bu dönem kalan', icon: ShieldCheck, tone: 'green' },
          { label: 'Kapasite kullanımı', value: `${totalCapacity ? Math.round((usedCapacity / totalCapacity) * 100) : 0}%`, detail: 'Aktif hizmet planı', icon: CheckCircle2, tone: 'amber' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-[13px] font-medium text-ink-500">{stat.label}</p>
              <span className={cn('grid h-9 w-9 place-items-center rounded-xl', stat.tone === 'teal' && 'bg-brand-50 text-brand-700', stat.tone === 'violet' && 'bg-violet-50 text-violet-600', stat.tone === 'green' && 'bg-emerald-50 text-emerald-600', stat.tone === 'amber' && 'bg-amber-50 text-amber-600')}>
                <stat.icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
              </span>
            </div>
            <p className="mt-4 truncate text-xl font-bold tracking-[-0.03em] text-ink-900">{stat.value}</p>
            <p className="mt-1 text-xs text-ink-400">{stat.detail}</p>
          </motion.div>
        ))}
      </section>

      <section className="space-y-5">
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="min-w-0 rounded-2xl border border-ink-200/80 bg-white shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]"
        >
          <div className="flex flex-col justify-between gap-4 border-b border-ink-100 p-5 sm:flex-row sm:items-center sm:p-6">
            <div><h2 className="text-sm font-semibold text-ink-900">Kayıtlı uzmanlar</h2><p className="mt-1 text-xs text-ink-400">Toplam {experts.length} uzman kaydı listeleniyor.</p></div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Uzman ara..." className="h-10 w-full rounded-xl border border-ink-200 bg-ink-50/50 pl-9 pr-3 text-sm text-ink-800 outline-none transition-all placeholder:text-ink-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10 sm:w-48" />
              </div>
              <div className="relative">
                <select value={titleFilter} onChange={(event) => setTitleFilter(event.target.value)} className="h-10 w-full appearance-none rounded-xl border border-ink-200 bg-white px-3 pr-9 text-xs font-medium text-ink-600 outline-none focus:border-brand-500 sm:w-44">
                  <option value="all">Tüm unvanlar</option>
                  {titleOptions.map((title) => <option key={title} value={title}>{title.replace(' İş Güvenliği Uzmanı', '')}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-xs">
              <thead className="border-b border-ink-100 bg-ink-50/40 text-[10px] font-semibold uppercase tracking-wider text-ink-400">
                <tr>
                  <th className="px-5 py-3.5 font-semibold sm:px-6">Uzman</th>
                  <th className="px-3 py-3.5 font-semibold">Unvan</th>
                  <th className="px-3 py-3.5 font-semibold">Sertifika</th>
                  <th className="px-3 py-3.5 font-semibold">Hizmet kapasitesi</th>
                  <th className="px-3 py-3.5 font-semibold">Kullanım</th>
                  <th className="px-5 py-3.5 text-right font-semibold sm:px-6">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {filteredExperts.map((expert) => {
                  const percentage = expert.maxServiceDuration ? Math.round((expert.usedServiceDuration / expert.maxServiceDuration) * 100) : 0
                  return (
                    <tr key={expert.id} className="group transition-colors hover:bg-ink-50/50">
                      <td className="px-5 py-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-50 text-[11px] font-bold text-brand-700">{initials(expert)}</span>
                          <div className="min-w-0"><p className="truncate text-sm font-semibold text-ink-800">{expert.firstName} {expert.lastName}</p><p className="mt-0.5 truncate text-[11px] text-ink-400">{expert.email ?? expert.phone ?? 'İletişim bilgisi yok'}</p></div>
                        </div>
                      </td>
                      <td className="px-3 py-4"><span className="inline-flex rounded-lg bg-ink-100 px-2.5 py-1 text-[11px] font-medium text-ink-600">{expert.title.split(' ')[0]} Sınıfı</span></td>
                      <td className="px-3 py-4 font-medium text-ink-600">{expert.certificateNumber}</td>
                      <td className="px-3 py-4 text-ink-600">{formatMinutes(expert.maxServiceDuration)}</td>
                      <td className="px-3 py-4"><div className="w-28"><div className="mb-1.5 flex items-center justify-between gap-2"><span className="text-[11px] text-ink-500">{percentage}%</span><span className={cn('text-[10px] font-medium', percentage >= 90 ? 'text-rose-500' : 'text-brand-600')}>{formatMinutes(Math.max(expert.maxServiceDuration - expert.usedServiceDuration, 0))} kaldı</span></div><div className="h-1.5 overflow-hidden rounded-full bg-ink-100"><div className={cn('h-full rounded-full', percentage >= 90 ? 'bg-rose-400' : 'bg-brand-500')} style={{ width: `${percentage}%` }} /></div></div></td>
                      <td className="px-5 py-4 text-right sm:px-6"><div className="inline-flex items-center gap-1"><button type="button" onClick={() => toast.info('Düzenleme ekranı sıradaki adımda hazırlanacak.')} className="rounded-lg p-2 text-ink-400 transition-colors hover:bg-brand-50 hover:text-brand-700" aria-label={`${expert.firstName} ${expert.lastName} düzenle`}><Edit3 className="h-4 w-4" /></button><button type="button" onClick={() => handleDelete(expert)} className="rounded-lg p-2 text-ink-400 transition-colors hover:bg-rose-50 hover:text-rose-600" aria-label={`${expert.firstName} ${expert.lastName} sil`}><Trash2 className="h-4 w-4" /></button><button type="button" className="rounded-lg p-2 text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-700" aria-label="Daha fazla seçenek"><MoreHorizontal className="h-4 w-4" /></button></div></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {filteredExperts.length === 0 && <div className="px-6 py-14 text-center"><Search className="mx-auto h-7 w-7 text-ink-300" /><p className="mt-3 text-sm font-medium text-ink-600">Uzman bulunamadı</p><p className="mt-1 text-xs text-ink-400">Arama veya unvan filtresini değiştirmeyi deneyin.</p></div>}
          </div>
        </motion.div>
      </section>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink-900/25 p-4 backdrop-blur-[2px] sm:p-8"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsModalOpen(false)
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-expert-title"
            className="relative z-10 my-auto max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto rounded-2xl border border-ink-200 bg-white shadow-[0_24px_80px_-24px_rgba(17,24,39,0.35)] sm:max-h-[calc(100vh-4rem)]"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-ink-100 bg-white/95 px-6 py-5 backdrop-blur sm:px-7">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <HardHat className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <div>
                  <h2 id="new-expert-title" className="text-base font-semibold text-ink-900">Yeni uzman ekle</h2>
                  <p className="mt-1 text-xs text-ink-400">Uzman bilgilerini eksiksiz doldurun.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl p-2 text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-700"
                aria-label="Modalı kapat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-6 py-6 sm:px-7" noValidate>
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-600">Uzman bilgileri</h3>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="İsim" placeholder="Barış" error={errors.firstName?.message} {...register('firstName')} />
                  <Input label="Soyisim" placeholder="Eren" error={errors.lastName?.message} {...register('lastName')} />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="expert-title" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">Unvan</label>
                  <div className="relative">
                    <select id="expert-title" className={cn('h-12 w-full appearance-none rounded-xl border bg-white px-3.5 pr-10 text-sm text-ink-900 outline-none transition-all focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10', errors.title ? 'border-red-400' : 'border-ink-200 hover:border-ink-300')} {...register('title')}>
                      <option value="">Unvan seçiniz</option>
                      {titleOptions.map((title) => <option key={title} value={title}>{title}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                  </div>
                  {errors.title && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.title.message}</p>}
                </div>
                <Input label="Sertifika numarası" placeholder="Örn. B-2024-0182" icon={<FileBadge2 className="h-[18px] w-[18px]" />} error={errors.certificateNumber?.message} {...register('certificateNumber')} />
              </div>

              <Input label="Aylık hizmet süresi" type="number" min="1" max="99999" hint="Maksimum hizmet süresi, dakika cinsinden." error={errors.maxServiceDuration?.message} {...register('maxServiceDuration')} />

              <div className="border-t border-ink-100 pt-5">
                <div className="mb-4 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-ink-400" strokeWidth={1.8} />
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-600">Panel hesabı</h3>
                    <p className="mt-1 text-[11px] text-ink-400">Uzmanın sisteme giriş yapabilmesi için isteğe bağlıdır.</p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Kullanıcı adı" placeholder="Panel hesabı için" {...register('username')} />
                  <Input label="E-posta" type="email" placeholder="uzman@ornek.com" icon={<Mail className="h-[18px] w-[18px]" />} error={errors.email?.message} {...register('email')} />
                  <Input label="Telefon" type="tel" placeholder="+90 5xx xxx xx xx" icon={<Phone className="h-[18px] w-[18px]" />} {...register('phone')} />
                  <Input label="Şifre" type="password" placeholder="Panel hesabı için" {...register('password')} />
                  <Input label="Şifre tekrar" type="password" placeholder="Şifreyi tekrar girin" error={errors.passwordConfirmation?.message} {...register('passwordConfirmation')} />
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-ink-100 pt-5 sm:flex-row sm:justify-end">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Vazgeç
                </Button>
                <Button type="submit" loading={isSubmitting} leftIcon={!isSubmitting ? <Plus className="h-4 w-4" /> : undefined}>
                  Uzmanı kaydet
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
