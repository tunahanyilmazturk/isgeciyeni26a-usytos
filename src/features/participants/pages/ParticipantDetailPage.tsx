import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  Edit3,
  GraduationCap,
  Mail,
  MapPin,
  ShieldCheck,
  Trash2,
  UserRound,
} from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { readParticipants, saveParticipants, type Participant, type TrainingStatus } from '../data/participants'
import { readAssignments, type TrainingAssignment } from '@/features/assignments/data/assignments'
import { readCustomers } from '@/features/customers/data/customers'
import { SingleParticipantModal } from '../components/SingleParticipantModal'
import { AssignmentModal } from '@/features/assignments/components/AssignmentModals'
import { trainingCatalog } from '@/features/trainings/data/trainings'

const tabs = [
  { id: 'overview', label: 'Genel bakış' },
  { id: 'trainings', label: 'Eğitimler' },
  { id: 'activity', label: 'Aktivite geçmişi' },
] as const

type TabId = (typeof tabs)[number]['id']

const trainingLabels: Record<TrainingStatus, string> = {
  not_started: 'Başlamadı',
  in_progress: 'Devam ediyor',
  failed: 'Başarısız',
  successful: 'Başarılı',
}

const trainingClasses: Record<TrainingStatus, string> = {
  not_started: 'border-ink-200 bg-ink-50 text-ink-600',
  in_progress: 'border-amber-200 bg-amber-50 text-amber-700',
  failed: 'border-rose-200 bg-rose-50 text-rose-700',
  successful: 'border-emerald-200 bg-emerald-50 text-emerald-700',
}

const assignmentStatusLabels: Record<string, string> = {
  active: 'Aktif',
  pending_approval: 'Onay bekliyor',
  completed: 'Tamamlandı',
  expired: 'Süresi doldu',
}

const assignmentStatusClasses: Record<string, string> = {
  active: 'border-brand-200 bg-brand-50 text-brand-700',
  pending_approval: 'border-amber-200 bg-amber-50 text-amber-700',
  completed: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  expired: 'border-rose-200 bg-rose-50 text-rose-700',
}

function formatMinutes(value: number) {
  if (!value) return '0 dk'
  const hours = Math.floor(value / 60)
  const minutes = value % 60
  return hours ? `${hours} sa ${minutes} dk` : `${minutes} dk`
}

function initials(name: string) {
  return name.split(' ').slice(0, 2).map((part) => part[0]).join('').toLocaleUpperCase('tr-TR')
}

function riskClass(risk: Participant['riskLevel']) {
  if (risk === 'Çok tehlikeli') return 'border-rose-200 bg-rose-50 text-rose-700'
  if (risk === 'Tehlikeli') return 'border-amber-200 bg-amber-50 text-amber-700'
  return 'border-emerald-200 bg-emerald-50 text-emerald-700'
}

function DetailItem({ label, value, strong = false }: { label: string; value: ReactNode; strong?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-5 border-b border-ink-100 py-3 last:border-b-0">
      <dt className="shrink-0 text-xs text-ink-400">{label}</dt>
      <dd className={cn('max-w-[64%] text-right text-xs text-ink-700', strong && 'font-semibold')}>{value}</dd>
    </div>
  )
}

export function ParticipantDetailPage() {
  const { participantId } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabId>('overview')
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAssignModal, setShowAssignModal] = useState(false)

  const participant = useMemo(() => {
    const all = readParticipants()
    return all.find((p) => p.id === Number(participantId))
  }, [participantId])

  const participantAssignments = useMemo<TrainingAssignment[]>(() => {
    if (!participant) return []
    return readAssignments().filter((a) => a.participantId === participant.id)
  }, [participant])

  const company = useMemo(() => {
    if (!participant) return null
    return readCustomers().find((c) => c.id === participant.companyId) ?? null
  }, [participant])

  if (!participant) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-ink-50 text-ink-300">
          <UserRound className="h-8 w-8" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-ink-900">Katılımcı bulunamadı</h1>
          <p className="mt-1 text-sm text-ink-500">Aradığınız katılımcı kaydı silinmiş veya taşınmış olabilir.</p>
        </div>
        <Button variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />} onClick={() => navigate('/dashboard/katilimcilar')}>
          Katılımcı listesine dön
        </Button>
      </div>
    )
  }

  function handleDelete() {
    if (!window.confirm(`${participant!.name} kaydı silinsin mi? Bu işlem geri alınamaz.`)) return
    saveParticipants(readParticipants().filter((p) => p.id !== participant!.id))
    toast.success('Katılımcı kaydı silindi')
    navigate('/dashboard/katilimcilar')
  }

  function handleUpdate(updated: Participant) {
    const all = readParticipants()
    saveParticipants(all.map((p) => (p.id === updated.id ? updated : p)))
    toast.success('Katılımcı bilgileri güncellendi')
    setShowEditModal(false)
    // Sayfayı yenilemek için navigate
    navigate(`/dashboard/katilimcilar/${updated.id}`, { replace: true })
  }

  const activeAssignments = participantAssignments.filter((a) => a.status === 'active')
  const completedAssignments = participantAssignments.filter((a) => a.status === 'completed')

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <Link to="/dashboard/katilimcilar" className="inline-flex items-center gap-2 text-xs font-semibold text-ink-500 transition-colors hover:text-brand-700">
          <ArrowLeft className="h-4 w-4" /> Katılımcı listesine dön
        </Link>
        <div className="mt-5 flex items-center gap-2 text-xs font-medium text-ink-400">
          <span>Katılımcılar</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-ink-600">Katılımcı detayı</span>
        </div>
      </motion.div>

      {/* Header kartı */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.04 }}
        className="relative overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-[0_8px_28px_-18px_rgba(17,24,39,0.28)]"
      >
        <div className="absolute right-0 top-0 h-40 w-40 translate-x-12 -translate-y-20 rounded-full border-[24px] border-brand-50" />
        <div className="relative border-b border-ink-100 p-5 sm:p-7">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
            <div className="flex min-w-0 items-start gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-50 text-lg font-bold text-brand-700">
                {initials(participant.name)}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="truncate text-xl font-bold tracking-[-0.025em] text-ink-900 sm:text-2xl">{participant.name}</h1>
                  <span className={cn(
                    'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold',
                    participant.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-ink-100 text-ink-500',
                  )}>
                    <span className={cn('h-1.5 w-1.5 rounded-full', participant.status === 'active' ? 'bg-emerald-500' : 'bg-ink-400')} />
                    {participant.status === 'active' ? 'Aktif' : 'Pasif'}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-ink-500">
                  {participant.department} <span className="mx-1.5 text-ink-300">·</span> {participant.company}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-ink-400">
                  <span className="inline-flex items-center gap-1.5">
                    <UserRound className="h-3.5 w-3.5" /> @{participant.username}
                  </span>
                  <span className="h-3 w-px bg-ink-200" />
                  <span className={cn('inline-flex items-center gap-1.5 rounded-lg border px-2 py-0.5 font-semibold', riskClass(participant.riskLevel))}>
                    <ShieldCheck className="h-3 w-3" /> {participant.riskLevel}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] gap-2 sm:flex sm:w-auto">
              <Button
                className="h-9 min-w-0 px-3 text-xs sm:px-3.5 sm:text-sm"
                variant="outline"
                size="sm"
                leftIcon={<Edit3 className="h-4 w-4" />}
                onClick={() => setShowEditModal(true)}
              >
                Düzenle
              </Button>
              <Button
                className="h-9 min-w-0 px-3 text-xs sm:px-3.5 sm:text-sm"
                variant="outline"
                size="sm"
                leftIcon={<GraduationCap className="h-4 w-4" />}
                onClick={() => setShowAssignModal(true)}
              >
                Eğitim ata
              </Button>
              <button
                type="button"
                onClick={handleDelete}
                className="grid h-9 w-9 place-items-center rounded-xl border border-ink-200 text-ink-400 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                aria-label="Katılımcıyı sil"
                title="Katılımcıyı sil"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* İstatistik kartları */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Eğitim ilerlemesi', value: `%${participant.progress}`, icon: GraduationCap, color: 'text-brand-600' },
              { label: 'Toplam süre', value: formatMinutes(participant.trainingMinutes), icon: Clock, color: 'text-sky-600' },
              { label: 'Aktif eğitim', value: activeAssignments.length, icon: CheckCircle2, color: 'text-amber-600' },
              { label: 'Tamamlanan', value: completedAssignments.length, icon: ShieldCheck, color: 'text-emerald-600' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-ink-100 bg-ink-50/40 p-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400">{stat.label}</span>
                  <stat.icon className={cn('h-4 w-4', stat.color)} strokeWidth={1.8} />
                </div>
                <p className="mt-2 text-xl font-bold tabular-nums text-ink-900">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 overflow-x-auto px-4 sm:px-7">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'relative shrink-0 whitespace-nowrap px-2.5 py-4 text-xs font-semibold transition-colors sm:px-3',
                activeTab === tab.id ? 'text-brand-700' : 'text-ink-400 hover:text-ink-700',
              )}
            >
              {tab.label}
              {activeTab === tab.id && <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-brand-600" />}
            </button>
          ))}
        </div>
      </motion.section>

      {/* Tab içerikleri */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid gap-5 lg:grid-cols-2"
          >
            {/* Kişisel bilgiler */}
            <section className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold text-ink-900">Kişisel bilgiler</h2>
                  <p className="mt-1 text-xs text-ink-400">Kimlik ve iletişim detayları</p>
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <UserRound className="h-[18px] w-[18px]" />
                </span>
              </div>
              <dl className="mt-5">
                <DetailItem label="Ad Soyad" value={participant.name} strong />
                <DetailItem label="Kullanıcı adı" value={<span className="font-mono">@{participant.username}</span>} />
                <DetailItem label="E-posta" value={participant.email === '—' ? <span className="text-ink-400">Girilmemiş</span> : participant.email} />
                <DetailItem label="Telefon" value={participant.phone === '—' ? <span className="text-ink-400">Girilmemiş</span> : participant.phone} />
                <DetailItem label="TC Kimlik No" value={<span className="font-mono">{participant.tcNumber}</span>} />
                <DetailItem label="Durum" value={
                  <span className={cn('inline-flex rounded-lg border px-2.5 py-1 text-[11px] font-semibold', participant.status === 'active' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-ink-200 bg-ink-50 text-ink-500')}>
                    {participant.status === 'active' ? 'Aktif' : 'Pasif'}
                  </span>
                } />
              </dl>
            </section>

            {/* İş bilgileri */}
            <section className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold text-ink-900">İş bilgileri</h2>
                  <p className="mt-1 text-xs text-ink-400">Firma ve departman detayları</p>
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <Building2 className="h-[18px] w-[18px]" />
                </span>
              </div>
              <dl className="mt-5">
                <DetailItem label="Firma" value={
                  company ? (
                    <Link to={`/dashboard/firmalar/${company.id}`} className="font-semibold text-brand-700 hover:underline">
                      {participant.company}
                    </Link>
                  ) : participant.company
                } strong />
                <DetailItem label="Departman / Ünvan" value={participant.department} strong />
                <DetailItem label="Tehlike sınıfı" value={
                  <span className={cn('inline-flex rounded-lg border px-2.5 py-1 text-[11px] font-semibold', riskClass(participant.riskLevel))}>
                    {participant.riskLevel}
                  </span>
                } />
                {company && <DetailItem label="Sektör" value={company.sector} />}
                {company && <DetailItem label="Konum" value={<span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {company.location}</span>} />}
                {company && <DetailItem label="Çalışan sayısı" value={company.employees} />}
              </dl>
            </section>

            {/* Eğitim özeti */}
            <section className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6 lg:col-span-2">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold text-ink-900">Eğitim durumu özeti</h2>
                  <p className="mt-1 text-xs text-ink-400">Genel eğitim ilerlemesi ve tarihler</p>
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <GraduationCap className="h-[18px] w-[18px]" />
                </span>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* İlerleme barı */}
                <div className="rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 p-4 text-white sm:col-span-2">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-brand-100/70">Eğitim ilerlemesi</p>
                      <p className="mt-2 text-3xl font-bold">%{participant.progress}</p>
                    </div>
                    <GraduationCap className="h-8 w-8 text-brand-200" />
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/15">
                    <div className="h-full rounded-full bg-brand-300 transition-all" style={{ width: `${participant.progress}%` }} />
                  </div>
                </div>

                <div className="rounded-xl border border-ink-100 p-4">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-ink-400" strokeWidth={1.8} />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400">Son tamamlama</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-ink-900">{participant.lastCompletion}</p>
                </div>

                <div className="rounded-xl border border-ink-100 p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-ink-400" strokeWidth={1.8} />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400">Sonraki eğitim</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-ink-900">{participant.nextTraining}</p>
                </div>

                <div className="rounded-xl border border-ink-100 p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400">Eğitim durumu</span>
                  <p className="mt-2">
                    <span className={cn('inline-flex rounded-lg border px-2.5 py-1 text-[11px] font-semibold', trainingClasses[participant.trainingStatus])}>
                      {trainingLabels[participant.trainingStatus]}
                    </span>
                  </p>
                </div>

                <div className="rounded-xl border border-ink-100 p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400">Toplam süre</span>
                  <p className="mt-2 text-sm font-semibold text-ink-900">{formatMinutes(participant.trainingMinutes)}</p>
                </div>

                <div className="rounded-xl border border-ink-100 p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400">Son giriş</span>
                  <p className="mt-2 text-sm font-semibold text-ink-900">{participant.lastLogin}</p>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === 'trainings' && (
          <motion.div
            key="trainings"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            {/* Atanan eğitimler */}
            <section className="rounded-2xl border border-ink-200/80 bg-white shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]">
              <div className="flex items-center justify-between gap-3 border-b border-ink-100 p-5 sm:p-6">
                <div>
                  <h2 className="text-sm font-semibold text-ink-900">Atanan eğitimler</h2>
                  <p className="mt-1 text-xs text-ink-400">{participantAssignments.length} eğitim ataması</p>
                </div>
                <Button size="sm" variant="outline" leftIcon={<GraduationCap className="h-4 w-4" />} onClick={() => setShowAssignModal(true)}>
                  Eğitim ata
                </Button>
              </div>

              {participantAssignments.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ink-50 text-ink-300">
                    <GraduationCap className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-ink-600">Henüz eğitim atanmamış</p>
                  <p className="mt-1 text-xs text-ink-400">Bu katılımcıya eğitim atamak için "Eğitim ata" butonunu kullanın.</p>
                </div>
              ) : (
                <div className="divide-y divide-ink-100">
                  {participantAssignments.map((assignment) => {
                    const training = trainingCatalog.find((t) => t.id === assignment.trainingId)
                    return (
                      <div key={assignment.id} className="flex items-center gap-4 p-4 transition-colors hover:bg-ink-50/40 sm:p-5">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                          <GraduationCap className="h-5 w-5" strokeWidth={1.7} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-ink-800">{assignment.trainingName}</p>
                          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-ink-400">
                            <span className="inline-flex items-center gap-1">
                              <CalendarDays className="h-3 w-3" /> Bitiş: {assignment.dueDate}
                            </span>
                            <span>İlerleme: %{assignment.progress}</span>
                            {training && <span>{training.chapters.length} bölüm</span>}
                          </div>
                        </div>
                        <span className={cn('inline-flex shrink-0 rounded-lg border px-2.5 py-1 text-[11px] font-semibold', assignmentStatusClasses[assignment.status])}>
                          {assignmentStatusLabels[assignment.status] ?? assignment.status}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </section>
          </motion.div>
        )}

        {activeTab === 'activity' && (
          <motion.div
            key="activity"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <section className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold text-ink-900">Aktivite geçmişi</h2>
                  <p className="mt-1 text-xs text-ink-400">Sistem girişleri ve eğitim etkileşimleri</p>
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <Clock className="h-[18px] w-[18px]" />
                </span>
              </div>

              {/* Timeline */}
              <div className="mt-6 space-y-4">
                {[
                  { icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600', title: 'Hesap oluşturuldu', desc: `Katılımcı sisteme eklendi — ${participant.company}`, date: participant.lastLogin === 'Henüz giriş yapmadı' ? 'Henüz giriş yapılmadı' : 'Sisteme kayıt' },
                  { icon: Mail, color: 'bg-sky-50 text-sky-600', title: 'Son giriş', desc: participant.lastLogin, date: participant.lastLogin === 'Henüz giriş yapmadı' ? '—' : participant.lastLogin },
                  { icon: GraduationCap, color: 'bg-brand-50 text-brand-600', title: 'Eğitim durumu', desc: `${trainingLabels[participant.trainingStatus]} — %${participant.progress} ilerleme`, date: participant.lastCompletion === '—' ? 'Henüz eğitim tamamlanmadı' : `Son tamamlama: ${participant.lastCompletion}` },
                  ...(completedAssignments.length > 0 ? [{
                    icon: ShieldCheck,
                    color: 'bg-emerald-50 text-emerald-600',
                    title: `${completedAssignments.length} eğitim tamamlandı`,
                    desc: 'Tamamlanan eğitimler başarıyla kaydedildi',
                    date: participant.lastCompletion,
                  }] : []),
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-xl', item.color)}>
                        <item.icon className="h-4 w-4" strokeWidth={1.8} />
                      </span>
                      {idx < 3 && <span className="mt-1 h-full w-px bg-ink-100" />}
                    </div>
                    <div className="min-w-0 flex-1 pb-4">
                      <p className="text-sm font-semibold text-ink-800">{item.title}</p>
                      <p className="mt-0.5 text-xs text-ink-500">{item.desc}</p>
                      <p className="mt-1 text-[11px] text-ink-400">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              {participant.lastLogin === 'Henüz giriş yapmadı' && (
                <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-amber-50/60 p-4">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" strokeWidth={1.8} />
                  <p className="text-[11px] leading-5 text-amber-800/80">
                    Bu katılımcı henüz sisteme giriş yapmamış. Giriş bilgileri: kullanıcı adı <span className="font-mono font-semibold">@{participant.username}</span>, şifre <span className="font-mono font-semibold">{participant.password ?? '123456'}</span>
                  </p>
                </div>
              )}
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Düzenleme modalı */}
      {showEditModal && (
        <SingleParticipantModal
          participant={participant}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdate}
        />
      )}

      {/* Eğitim atama modalı */}
      {showAssignModal && (
        <AssignmentModal
          participant={participant}
          onClose={() => setShowAssignModal(false)}
          onAddAssignment={(participantId, trainingId, dueDate, options) => {
            // addAssignment fonksiyonu localStorage'a kaydeder
            import('@/features/assignments/data/assignments').then(({ addAssignment }) => {
              addAssignment(participantId, trainingId, dueDate, options)
              const training = trainingCatalog.find((t) => t.id === trainingId)
              toast.success('Eğitim atandı', { description: `${training?.name ?? 'Eğitim'} başarıyla atandı.` })
              setShowAssignModal(false)
              // Sayfayı yenile
              navigate(`/dashboard/katilimcilar/${participantId}`, { replace: true })
            })
          }}
          onRemoveAssignment={(assignmentId, trainingName) => {
            import('@/features/assignments/data/assignments').then(({ removeAssignment }) => {
              removeAssignment(assignmentId)
              toast.info('Atama kaldırıldı', { description: `${trainingName} ataması kaldırıldı.` })
              navigate(`/dashboard/katilimcilar/${participant.id}`, { replace: true })
            })
          }}
        />
      )}
    </div>
  )
}
