import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import {
  ChevronDown,
  Edit3,
  FileBadge2,
  HeartPulse,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Stethoscope,
  Trash2,
  UserPlus,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button, Input, Pagination, paginate, getPaginationIndices, ViewToggle, type ViewMode, BulkActionBar } from '@/components/ui'
import { cn } from '@/lib/utils'
import { type Doctor, type DoctorLevel, readDoctors, saveDoctors } from '../data/people'
import { StampUploadField } from '../components/StampUploadField'

const doctorSchema = z
  .object({
    doctorLevel: z.string().min(1, 'Doktor tipi seçiniz.'),
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

type DoctorForm = z.infer<typeof doctorSchema>

const doctorLevels: DoctorLevel[] = ['Asistan', 'Dr.', 'Prof.']

function formatMinutes(minutes: number) {
  return `${new Intl.NumberFormat('tr-TR').format(minutes)} dk/ay`
}

function initials(doctor: Doctor) {
  return `${doctor.firstName[0]}${doctor.lastName[0]}`.toLocaleUpperCase('tr-TR')
}

export function DoctorsPage() {
  const [doctors, setDoctors] = useState(() => readDoctors())
  const [search, setSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDoctorId, setEditingDoctorId] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [view, setView] = useState<ViewMode>('table')
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [stampDataUrl, setStampDataUrl] = useState('')
  const [stampFileName, setStampFileName] = useState('')

  useEffect(() => { saveDoctors(doctors) }, [doctors])

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
  } = useForm<DoctorForm>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      doctorLevel: '',
      firstName: '',
      lastName: '',
      title: 'İşyeri Hekimi',
      certificateNumber: '',
      maxServiceDuration: '11700',
      username: '',
      email: '',
      phone: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const filteredDoctors = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('tr-TR')
    return doctors.filter((doctor) => {
      const matchesSearch = !query || `${doctor.firstName} ${doctor.lastName} ${doctor.certificateNumber}`.toLocaleLowerCase('tr-TR').includes(query)
      const matchesLevel = levelFilter === 'all' || doctor.doctorLevel === levelFilter
      return matchesSearch && matchesLevel
    })
  }, [doctors, search, levelFilter])

  useEffect(() => { setCurrentPage(1) }, [doctors, search, levelFilter])

  const totalPages = Math.ceil(filteredDoctors.length / pageSize) || 1
  const paginatedItems = paginate(filteredDoctors, currentPage, pageSize)
  const { startIndex, endIndex } = getPaginationIndices(currentPage, pageSize, filteredDoctors.length)

  function openNewDoctorModal() {
    setEditingDoctorId(null)
    setStampDataUrl('')
    setStampFileName('')
    reset()
    setIsModalOpen(true)
  }

  function openEditDoctorModal(doctor: Doctor) {
    setEditingDoctorId(doctor.id)
    setStampDataUrl(doctor.stampDataUrl ?? '')
    setStampFileName(doctor.stampFileName ?? '')
    reset({
      doctorLevel: doctor.doctorLevel,
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      title: doctor.title,
      certificateNumber: doctor.certificateNumber,
      maxServiceDuration: String(doctor.maxServiceDuration),
      username: '',
      email: doctor.email ?? '',
      phone: doctor.phone ?? '',
      password: '',
      passwordConfirmation: '',
    })
    setIsModalOpen(true)
  }

  function onSubmit(data: DoctorForm) {
    const existing = editingDoctorId === null ? undefined : doctors.find((item) => item.id === editingDoctorId)
    const doctor: Doctor = {
      id: existing?.id ?? Date.now(),
      doctorLevel: data.doctorLevel as DoctorLevel,
      firstName: data.firstName,
      lastName: data.lastName,
      title: 'İşyeri Hekimi',
      certificateNumber: data.certificateNumber,
      maxServiceDuration: Number(data.maxServiceDuration),
      usedServiceDuration: existing?.usedServiceDuration ?? 0,
      email: data.email || undefined,
      phone: data.phone || undefined,
      stampDataUrl: stampDataUrl || undefined,
      stampFileName: stampFileName || undefined,
      status: existing?.status ?? 'active',
    }
    setDoctors((current) => existing ? current.map((item) => item.id === existing.id ? doctor : item) : [doctor, ...current])
    reset()
    setEditingDoctorId(null)
    setIsModalOpen(false)
    toast.success(existing ? 'Doktor bilgileri güncellendi' : 'Doktor başarıyla eklendi', {
      description: `${doctor.firstName} ${doctor.lastName} doktor listesine ${existing ? 'kaydedildi' : 'eklendi'}${doctor.stampDataUrl ? '; onay kaşesi sertifikalara bağlandı.' : '.'}`,
    })
  }

  function handleDelete(doctor: Doctor) {
    if (!window.confirm(`${doctor.firstName} ${doctor.lastName} kaydı silinsin mi?`)) return
    setDoctors((current) => current.filter((item) => item.id !== doctor.id))
    toast.success('Doktor kaydı silindi')
  }

  const toggleSelection = (id: number) => setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  const toggleAll = () => setSelectedIds((current) => current.length === paginatedItems.length ? [] : paginatedItems.map((item) => item.id))
  const handleBulkDelete = () => { setDoctors((current) => current.filter((item) => !selectedIds.includes(item.id))); toast.success(`${selectedIds.length} doktor silindi`); setSelectedIds([]) }

  return (
    <div className="space-y-7">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-ink-400"><span>OSGB Bilgileri</span><span>/</span><span className="text-ink-600">Doktor</span></div>
          <h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[30px]">Doktorlar</h1>
          <p className="mt-1.5 text-sm text-ink-500">OSGB bünyesindeki işyeri hekimlerini ve hizmet kapasitelerini yönetin.</p>
        </div>
        <Button size="md" leftIcon={<UserPlus className="h-4 w-4" />} onClick={openNewDoctorModal}>Yeni doktor ekle</Button>
      </motion.div>

      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }} className="min-w-0 rounded-2xl border border-ink-200/80 bg-white shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]">
        <div className="flex flex-col justify-between gap-4 border-b border-ink-100 p-5 sm:flex-row sm:items-center sm:p-6">
          <div><h2 className="text-sm font-semibold text-ink-900">Kayıtlı doktorlar</h2><p className="mt-1 text-xs text-ink-400">Toplam {doctors.length} doktor kaydı listeleniyor.</p></div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Doktor ara..." className="h-10 w-full rounded-xl border border-ink-200 bg-ink-50/50 pl-9 pr-3 text-sm text-ink-800 outline-none transition-all placeholder:text-ink-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10 sm:w-48" /></div>
            <div className="relative"><select value={levelFilter} onChange={(event) => setLevelFilter(event.target.value)} className="h-10 w-full appearance-none rounded-xl border border-ink-200 bg-white px-3 pr-9 text-xs font-medium text-ink-600 outline-none focus:border-brand-500 sm:w-36"><option value="all">Tüm tipler</option>{doctorLevels.map((level) => <option key={level} value={level}>{level}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" /></div>
            <ViewToggle view={view} onChange={setView} />
          </div>
        </div>

        <BulkActionBar selectedCount={selectedIds.length} itemName="doktor" onClear={() => setSelectedIds([])} onDelete={handleBulkDelete} />

        {view === 'table' && (
        <div className="overflow-x-auto max-h-[calc(100dvh-380px)] overflow-y-auto">
          <table className="w-full min-w-[900px] text-left text-xs">
            <thead className="border-b border-ink-100 bg-ink-50/40 text-[10px] font-semibold uppercase tracking-wider text-ink-400"><tr><th className="px-5 py-3.5 sm:px-6"><input type="checkbox" checked={paginatedItems.length > 0 && selectedIds.length === paginatedItems.length} onChange={toggleAll} aria-label="Tüm doktorları seç" className="h-4 w-4 rounded border-ink-300" /></th><th className="px-5 py-3.5 font-semibold sm:px-6">Tip</th><th className="px-3 py-3.5 font-semibold">Doktor</th><th className="px-3 py-3.5 font-semibold">Unvan</th><th className="px-3 py-3.5 font-semibold">Sertifika</th><th className="px-3 py-3.5 font-semibold">Hizmet kapasitesi</th><th className="px-3 py-3.5 font-semibold">Kullanım</th><th className="px-5 py-3.5 text-right font-semibold sm:px-6">İşlem</th></tr></thead>
            <tbody className="divide-y divide-ink-100">
              {paginatedItems.map((doctor) => {
                const percentage = doctor.maxServiceDuration ? Math.round((doctor.usedServiceDuration / doctor.maxServiceDuration) * 100) : 0
                return <tr key={doctor.id} className="group transition-colors hover:bg-ink-50/50">
                  <td className="px-5 py-4 sm:px-6"><input type="checkbox" checked={selectedIds.includes(doctor.id)} onChange={() => toggleSelection(doctor.id)} aria-label={`${doctor.firstName} ${doctor.lastName} seç`} className="h-4 w-4 rounded border-ink-300" /></td>
                  <td className="px-5 py-4 sm:px-6"><span className="inline-flex rounded-lg bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-700">{doctor.doctorLevel}</span></td>
                  <td className="px-3 py-4"><div className="flex items-center gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink-100 text-[11px] font-bold text-ink-600">{initials(doctor)}</span><div className="min-w-0"><p className="truncate text-sm font-semibold text-ink-800">{doctor.firstName} {doctor.lastName}</p><p className="mt-0.5 truncate text-[11px] text-ink-400">{doctor.email ?? doctor.phone ?? 'İletişim bilgisi yok'}</p></div></div></td>
                  <td className="px-3 py-4 text-ink-600">{doctor.title}</td>
                  <td className="px-3 py-4 font-medium text-ink-600">{doctor.certificateNumber}</td>
                  <td className="px-3 py-4 text-ink-600">{formatMinutes(doctor.maxServiceDuration)}</td>
                  <td className="px-3 py-4"><div className="w-28"><div className="mb-1.5 flex items-center justify-between gap-2"><span className="text-[11px] text-ink-500">{percentage}%</span><span className={cn('text-[10px] font-medium', percentage >= 90 ? 'text-rose-500' : 'text-brand-600')}>{formatMinutes(Math.max(doctor.maxServiceDuration - doctor.usedServiceDuration, 0))} kaldı</span></div><div className="h-1.5 overflow-hidden rounded-full bg-ink-100"><div className={cn('h-full rounded-full', percentage >= 90 ? 'bg-rose-400' : 'bg-brand-500')} style={{ width: `${percentage}%` }} /></div></div></td>
                  <td className="px-5 py-4 text-right sm:px-6"><div className="inline-flex items-center gap-1"><button type="button" onClick={() => openEditDoctorModal(doctor)} className="rounded-lg p-2 text-ink-400 transition-colors hover:bg-brand-50 hover:text-brand-700" aria-label={`${doctor.firstName} ${doctor.lastName} düzenle`}><Edit3 className="h-4 w-4" /></button><button type="button" onClick={() => handleDelete(doctor)} className="rounded-lg p-2 text-ink-400 transition-colors hover:bg-rose-50 hover:text-rose-600" aria-label={`${doctor.firstName} ${doctor.lastName} sil`}><Trash2 className="h-4 w-4" /></button><button type="button" className="rounded-lg p-2 text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-700" aria-label="Daha fazla seçenek"><MoreHorizontal className="h-4 w-4" /></button></div></td>
                </tr>
              })}
            </tbody>
          </table>
          {filteredDoctors.length === 0 && <div className="px-6 py-14 text-center"><Search className="mx-auto h-7 w-7 text-ink-300" /><p className="mt-3 text-sm font-medium text-ink-600">Doktor bulunamadı</p><p className="mt-1 text-xs text-ink-400">Arama veya tip filtresini değiştirmeyi deneyin.</p></div>}
        </div>
        )}
        {view === 'card' && (
          <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 sm:p-6">
            {paginatedItems.map((doctor) => {
              const percentage = doctor.maxServiceDuration ? Math.round((doctor.usedServiceDuration / doctor.maxServiceDuration) * 100) : 0
              return (
                <div key={doctor.id} className="rounded-2xl border border-ink-200/80 bg-white p-5 transition-all hover:border-brand-300 hover:shadow-[0_8px_24px_-12px_rgba(17,24,39,0.18)]">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-sm font-bold text-brand-700">{initials(doctor)}</span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-ink-800">{doctor.firstName} {doctor.lastName}</p>
                        <p className="mt-0.5 truncate text-[11px] text-ink-400">{doctor.doctorLevel}</p>
                      </div>
                    </div>
                    <input type="checkbox" checked={selectedIds.includes(doctor.id)} onChange={() => toggleSelection(doctor.id)} aria-label={`${doctor.firstName} ${doctor.lastName} seç`} className="h-4 w-4 rounded border-ink-300" />
                  </div>
                  <div className="mt-4 space-y-3 border-t border-ink-100 pt-3">
                    <p className="text-[11px] text-ink-500">Sertifika: {doctor.certificateNumber}</p>
                    <div>
                      <div className="mb-1.5 flex items-center justify-between text-[11px]"><span className="text-ink-400">Kapasite</span><span className="font-semibold text-ink-600">%{percentage}</span></div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-ink-100"><div className={cn('h-full rounded-full', percentage > 80 ? 'bg-rose-500' : percentage > 60 ? 'bg-amber-500' : 'bg-emerald-500')} style={{ width: `${percentage}%` }} /></div>
                    </div>
                  </div>
                </div>
              )
            })}
            {paginatedItems.length === 0 && <div className="col-span-full py-16 text-center"><Search className="mx-auto h-8 w-8 text-ink-300" /><p className="mt-3 text-sm font-semibold text-ink-700">Doktor bulunamadı</p></div>}
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredDoctors.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1) }}
          startIndex={startIndex}
          endIndex={endIndex}
          itemName="doktor"
        />
      </motion.section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink-900/25 p-4 backdrop-blur-[2px] sm:p-8" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsModalOpen(false) }}>
          <motion.div initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.2 }} role="dialog" aria-modal="true" aria-labelledby="new-doctor-title" className="relative z-10 my-auto max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto rounded-2xl border border-ink-200 bg-white shadow-[0_24px_80px_-24px_rgba(17,24,39,0.35)] sm:max-h-[calc(100vh-4rem)]">
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-ink-100 bg-white/95 px-6 py-5 backdrop-blur sm:px-7"><div className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700"><Stethoscope className="h-5 w-5" strokeWidth={1.7} /></span><div><h2 id="new-doctor-title" className="text-base font-semibold text-ink-900">{editingDoctorId === null ? 'Yeni doktor ekle' : 'Doktoru düzenle'}</h2><p className="mt-1 text-xs text-ink-400">İşyeri hekimi bilgilerini eksiksiz doldurun.</p></div></div><button type="button" onClick={() => setIsModalOpen(false)} className="rounded-xl p-2 text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-700" aria-label="Modalı kapat"><X className="h-5 w-5" /></button></div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-6 py-6 sm:px-7" noValidate>
              <div><div className="mb-3 flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-brand-500" /><h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-600">Doktor bilgileri</h3></div><div className="grid gap-4 sm:grid-cols-2"><div><label htmlFor="doctor-level" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">Doktor tipi</label><div className="relative"><select id="doctor-level" className={cn('h-12 w-full appearance-none rounded-xl border bg-white px-3.5 pr-10 text-sm text-ink-900 outline-none transition-all focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10', errors.doctorLevel ? 'border-red-400' : 'border-ink-200 hover:border-ink-300')} {...register('doctorLevel')}><option value="">Tip seçiniz</option>{doctorLevels.map((level) => <option key={level} value={level}>{level}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" /></div>{errors.doctorLevel && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.doctorLevel.message}</p>}</div><Input label="İsim" placeholder="Onur" error={errors.firstName?.message} {...register('firstName')} /><Input label="Soyisim" placeholder="Polat" error={errors.lastName?.message} {...register('lastName')} /><div><label htmlFor="doctor-title" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">Unvan</label><div className="relative"><select id="doctor-title" className="h-12 w-full appearance-none rounded-xl border border-ink-200 bg-white px-3.5 pr-10 text-sm text-ink-900 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10" {...register('title')}><option value="İşyeri Hekimi">İşyeri Hekimi</option></select><ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" /></div></div></div></div>
              <div className="grid gap-4 sm:grid-cols-2"><Input label="Sertifika numarası" placeholder="Örn. HEK-2024-0108" icon={<FileBadge2 className="h-[18px] w-[18px]" />} error={errors.certificateNumber?.message} {...register('certificateNumber')} /><Input label="Aylık hizmet süresi" type="number" min="1" max="99999" hint="Maksimum hizmet süresi, dakika cinsinden." error={errors.maxServiceDuration?.message} {...register('maxServiceDuration')} /></div>
              <StampUploadField image={stampDataUrl} fileName={stampFileName} ownerLabel="Doktor" onChange={(image, fileName) => { setStampDataUrl(image); setStampFileName(fileName) }} />
              <div className="border-t border-ink-100 pt-5"><div className="mb-4 flex items-center gap-2"><HeartPulse className="h-4 w-4 text-ink-400" strokeWidth={1.8} /><div><h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-600">Panel hesabı</h3><p className="mt-1 text-[11px] text-ink-400">İşyeri hekiminin sisteme giriş yapabilmesi için isteğe bağlıdır.</p></div></div><div className="grid gap-4 sm:grid-cols-2"><Input label="Kullanıcı adı" placeholder="Panel hesabı için" {...register('username')} /><Input label="E-posta" type="email" placeholder="doktor@ornek.com" icon={<Mail className="h-[18px] w-[18px]" />} error={errors.email?.message} {...register('email')} /><Input label="Telefon" type="tel" placeholder="+90 5xx xxx xx xx" icon={<Phone className="h-[18px] w-[18px]" />} {...register('phone')} /><Input label="Şifre" type="password" placeholder="Panel hesabı için" {...register('password')} /><Input label="Şifre tekrar" type="password" placeholder="Şifreyi tekrar girin" error={errors.passwordConfirmation?.message} {...register('passwordConfirmation')} /></div></div>
              <div className="flex flex-col-reverse gap-3 border-t border-ink-100 pt-5 sm:flex-row sm:justify-end"><Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Vazgeç</Button><Button type="submit" loading={isSubmitting} leftIcon={!isSubmitting ? <Plus className="h-4 w-4" /> : undefined}>{editingDoctorId === null ? 'Doktoru kaydet' : 'Değişiklikleri kaydet'}</Button></div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
