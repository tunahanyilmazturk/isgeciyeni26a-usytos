import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDownToLine,
  ClipboardCheck,
  Edit3,
  Filter,
  GraduationCap,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Trash2,
  UserPlus,
  Users,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Button, Input, Pagination, paginate, getPaginationIndices } from '@/components/ui'
import { downloadParticipantList } from '../lib/excel'
import { cn } from '@/lib/utils'
import { readParticipants, saveParticipants, type Participant, type ParticipantStatus, type TrainingStatus } from '../data/participants'
import { addAssignment, bulkAssign, removeAssignment, type AssignmentOptions } from '@/features/assignments/data/assignments'
import { AssignmentModal, BulkAssignmentModal } from '@/features/assignments/components/AssignmentModals'
import { trainingCatalog } from '@/features/trainings/data/trainings'
import { BulkParticipantModal } from '../components/BulkParticipantModal'
import { SingleParticipantModal } from '../components/SingleParticipantModal'

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

function formatMinutes(value: number) {
  if (!value) return '0 dk'
  const hours = Math.floor(value / 60)
  const minutes = value % 60
  return hours ? `${hours} sa ${minutes} dk` : `${minutes} dk`
}

function initials(name: string) {
  return name.split(' ').slice(0, 2).map((part) => part[0]).join('').toLocaleUpperCase('tr-TR')
}

function parseDate(value: string) {
  if (value === '—') return 0
  const [day, month, year] = value.split('.').map(Number)
  return year && month && day ? new Date(year, month - 1, day).getTime() : 0
}

function statusLabel(status: ParticipantStatus) {
  return status === 'active' ? 'Aktif' : 'Pasif'
}

export function ParticipantsPage() {
  const [participants, setParticipants] = useState(() => readParticipants())
  const [search, setSearch] = useState('')
  const [companyFilter, setCompanyFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [trainingFilter, setTrainingFilter] = useState('all')
  const [overdueOnly, setOverdueOnly] = useState(false)
  const [completionFrom, setCompletionFrom] = useState('')
  const [completionTo, setCompletionTo] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newParticipant, setNewParticipant] = useState({ name: '', email: '', company: 'Quantis Tekstil', department: '' })
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [assignmentParticipant, setAssignmentParticipant] = useState<Participant | null | undefined>(undefined)
  const [showBulkModal, setShowBulkModal] = useState(false)
  const [bulkPreselectedIds, setBulkPreselectedIds] = useState<number[] | undefined>(undefined)
  const [showBulkParticipantModal, setShowBulkParticipantModal] = useState(false)
  const [showSingleParticipantModal, setShowSingleParticipantModal] = useState(false)

  useEffect(() => {
    saveParticipants(participants)
  }, [participants])

  const companies = useMemo(() => [...new Set(participants.map((participant) => participant.company))].sort((a, b) => a.localeCompare(b, 'tr')), [participants])
  const filteredParticipants = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('tr-TR')
    const from = completionFrom ? new Date(`${completionFrom}T00:00:00`).getTime() : 0
    const to = completionTo ? new Date(`${completionTo}T23:59:59`).getTime() : Number.MAX_SAFE_INTEGER
    return participants.filter((participant) => {
      const haystack = `${participant.name} ${participant.username} ${participant.email} ${participant.tcNumber} ${participant.company}`.toLocaleLowerCase('tr-TR')
      const lastCompletion = parseDate(participant.lastCompletion)
      const isOverdue = participant.trainingStatus === 'failed' || (participant.nextTraining === '—' && participant.trainingStatus !== 'successful')
      return (!query || haystack.includes(query)) &&
        (companyFilter === 'all' || participant.company === companyFilter) &&
        (statusFilter === 'all' || participant.status === statusFilter) &&
        (trainingFilter === 'all' || participant.trainingStatus === trainingFilter) &&
        (!overdueOnly || isOverdue) &&
        (!completionFrom || (lastCompletion > 0 && lastCompletion >= from)) &&
        (!completionTo || (lastCompletion > 0 && lastCompletion <= to))
    })
  }, [participants, search, companyFilter, statusFilter, trainingFilter, overdueOnly, completionFrom, completionTo])

  useEffect(() => { setCurrentPage(1) }, [participants, search, companyFilter, statusFilter, trainingFilter, overdueOnly, completionFrom, completionTo])

  const totalPages = Math.ceil(filteredParticipants.length / pageSize) || 1
  const paginatedItems = paginate(filteredParticipants, currentPage, pageSize)
  const { startIndex, endIndex } = getPaginationIndices(currentPage, pageSize, filteredParticipants.length)

  function clearFilters() {
    setSearch('')
    setCompanyFilter('all')
    setStatusFilter('all')
    setTrainingFilter('all')
    setOverdueOnly(false)
    setCompletionFrom('')
    setCompletionTo('')
  }

  function toggleSelection(id: number) {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  function toggleAll() {
    setSelectedIds((current) => current.length === filteredParticipants.length ? [] : filteredParticipants.map((participant) => participant.id))
  }

  function applyBulkAction(action: string) {
    if (!selectedIds.length) {
      toast.error('Önce en az bir katılımcı seçin')
      return
    }
    if (action === 'delete') {
      setParticipants((current) => current.filter((participant) => !selectedIds.includes(participant.id)))
      toast.success(`${selectedIds.length} katılımcı silindi`)
      setSelectedIds([])
    } else if (action === 'assign_training') {
      setBulkPreselectedIds([...selectedIds])
      setShowBulkModal(true)
    } else {
      const status: ParticipantStatus | undefined = action === 'activate' ? 'active' : action === 'passivate' ? 'passive' : undefined
      if (status) setParticipants((current) => current.map((participant) => selectedIds.includes(participant.id) ? { ...participant, status } : participant))
      toast.success(`${selectedIds.length} katılımcı için işlem uygulandı`)
      setSelectedIds([])
    }
  }

  function exportParticipants() {
    downloadParticipantList(participants)
    toast.success("Katılımcı listesi Excel'e aktarıldı")
  }

  function createParticipant() {
    if (!newParticipant.name.trim() || !newParticipant.email.trim() || !newParticipant.department.trim()) {
      toast.error('Katılımcı bilgilerini tamamlayın')
      return
    }
    const company = newParticipant.company
    const participant: Participant = {
      id: Date.now(), name: newParticipant.name, username: `katilimci${Date.now().toString().slice(-4)}`, email: newParticipant.email, phone: '—', tcNumber: '—', companyId: companies.indexOf(company) + 1, company, riskLevel: company === 'Pelion Gıda' ? 'Az tehlikeli' : 'Tehlikeli', department: newParticipant.department, trainingMinutes: 0, progress: 0, trainingStatus: 'not_started', lastCompletion: '—', nextTraining: '—', status: 'active', lastLogin: 'Henüz giriş yapmadı',
    }
    setParticipants((current) => [participant, ...current])
    setNewParticipant({ name: '', email: '', company: 'Quantis Tekstil', department: '' })
    setIsModalOpen(false)
    toast.success('Katılımcı başarıyla eklendi')
  }

  function handleAddAssignment(participantId: number, trainingId: string, dueDate: string, options: AssignmentOptions) {
    addAssignment(participantId, trainingId, dueDate, options)
    const training = trainingCatalog.find((t) => t.id === trainingId)
    toast.success('Eğitim atandı', { description: `${training?.name ?? 'Eğitim'} başarıyla atandı.` })
  }

  function handleRemoveAssignment(assignmentId: string, trainingName: string) {
    removeAssignment(assignmentId)
    toast.info('Atama kaldırıldı', { description: `${trainingName} ataması kaldırıldı.` })
  }

  function handleBulkSubmit(participantIds: number[], trainingIds: string[], dueDate: string, options: AssignmentOptions) {
    const result = bulkAssign(participantIds, trainingIds, dueDate, options)
    setShowBulkModal(false)
    setBulkPreselectedIds(undefined)
    setSelectedIds([])
    if (result.added > 0) {
      toast.success(`${result.added} atama oluşturuldu`, {
        description: result.skipped > 0 ? `${result.skipped} zaten atanmış olduğundan atlandı.` : 'Tüm atamalar başarıyla eklendi.',
      })
    } else {
      toast.info('Yeni atama eklenmedi', { description: 'Seçili tüm eğitimler katılımcılara zaten atanmış.' })
    }
  }

  function openBulkAssign() {
    setBulkPreselectedIds(selectedIds.length > 0 ? selectedIds : undefined)
    setShowBulkModal(true)
  }

  function handleBulkCreateParticipants(newParticipants: Participant[]) {
    setParticipants((current) => [...newParticipants, ...current])
    setShowBulkParticipantModal(false)
    toast.success(`${newParticipants.length} katılımcı eklendi`)
  }

  function handleCreateParticipant(participant: Participant) {
    setParticipants((current) => [participant, ...current])
    setShowSingleParticipantModal(false)
    toast.success('Katılımcı başarıyla oluşturuldu', {
      description: `${participant.name} — kullanıcı adı: ${participant.username}, şifre: ${participant.password}`,
    })
  }

  return <div className="space-y-7">
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><div className="mb-2 flex items-center gap-2 text-xs font-medium text-ink-400"><span>Ana menü</span><span>/</span><span className="text-ink-600">Katılımcılar</span></div><h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[30px]">Katılımcılar</h1><p className="mt-1.5 text-sm text-ink-500">Çalışan listenizi, eğitim yetkilendirmelerini ve gelişim durumunu tek ekrandan yönetin.</p></div><div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto"><Button className="h-9 min-w-0 border-emerald-200 bg-emerald-50 px-3 text-xs text-emerald-700 hover:border-emerald-300 hover:bg-emerald-100 sm:px-3.5 sm:text-sm" variant="outline" size="sm" leftIcon={<ArrowDownToLine className="h-4 w-4" />} onClick={exportParticipants}>Excel'e aktar</Button><Button className="h-9 min-w-0 px-3 text-xs sm:px-3.5 sm:text-sm" variant="outline" size="sm" leftIcon={<Users className="h-4 w-4" />} onClick={openBulkAssign}>Toplu eğitim ata</Button><Button className="h-9 min-w-0 px-3 text-xs sm:px-3.5 sm:text-sm" variant="outline" size="sm" leftIcon={<UserPlus className="h-4 w-4" />} onClick={() => setShowBulkParticipantModal(true)}>Toplu katılımcı</Button><Button className="h-9 min-w-0 px-3 text-xs sm:px-3.5 sm:text-sm" size="sm" leftIcon={<UserPlus className="h-4 w-4" />} onClick={() => setShowSingleParticipantModal(true)}>Yeni katılımcı</Button></div></motion.div>

    <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }} className="min-w-0 rounded-2xl border border-ink-200/80 bg-white shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]"><div className="border-b border-ink-100 p-5 sm:p-6"><div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center"><div><div className="flex items-center gap-2"><h2 className="text-sm font-semibold text-ink-900">Katılımcı listesi</h2><span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700">{filteredParticipants.length} kayıt</span></div><p className="mt-1 text-xs text-ink-400">Kişi, firma, eğitim ve geçerlilik durumuna göre filtreleyin.</p></div><div className="flex flex-col gap-2 sm:flex-row"><div className="relative"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Ad, kullanıcı adı, e-posta veya TC..." className="h-10 w-full rounded-xl border border-ink-200 bg-ink-50/50 pl-9 pr-3 text-sm text-ink-800 outline-none transition-all placeholder:text-ink-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10 sm:w-72" /></div><button type="button" onClick={() => setShowFilters((current) => !current)} className={cn('inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-3.5 text-xs font-semibold', showFilters ? 'border-brand-200 bg-brand-50 text-brand-700' : 'border-ink-200 text-ink-600 hover:bg-ink-50')}><Filter className="h-4 w-4" /> Filtreler</button></div></div>{showFilters && <div className="mt-5 grid min-w-0 gap-3 border-t border-ink-100 pt-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"><label><span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink-400">Firma</span><select value={companyFilter} onChange={(event) => setCompanyFilter(event.target.value)} className="h-10 min-w-0 w-full rounded-xl border border-ink-200 bg-white px-3 text-xs font-medium text-ink-700 outline-none focus:border-brand-500"><option value="all">Tüm Firmalar</option>{companies.map((company) => <option key={company} value={company}>{company}</option>)}</select></label><label><span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink-400">Katılımcı durumu</span><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="h-10 min-w-0 w-full rounded-xl border border-ink-200 bg-white px-3 text-xs font-medium text-ink-700 outline-none focus:border-brand-500"><option value="all">Tümü</option><option value="active">Aktif</option><option value="passive">Pasif</option></select></label><label><span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink-400">Eğitim durumu</span><select value={trainingFilter} onChange={(event) => setTrainingFilter(event.target.value)} className="h-10 min-w-0 w-full rounded-xl border border-ink-200 bg-white px-3 text-xs font-medium text-ink-700 outline-none focus:border-brand-500"><option value="all">Tümü</option>{Object.entries(trainingLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><label><span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink-400">Tamamlama başlangıç</span><input type="date" value={completionFrom} onChange={(event) => setCompletionFrom(event.target.value)} className="h-10 min-w-0 w-full rounded-xl border border-ink-200 bg-white px-3 text-xs text-ink-700 outline-none focus:border-brand-500" /></label><label><span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink-400">Tamamlama bitiş</span><input type="date" value={completionTo} onChange={(event) => setCompletionTo(event.target.value)} className="h-10 min-w-0 w-full rounded-xl border border-ink-200 bg-white px-3 text-xs text-ink-700 outline-none focus:border-brand-500" /></label><div className="flex items-end gap-3 sm:col-span-2 lg:col-span-3 xl:col-span-5"><label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 text-xs font-semibold text-amber-700"><input type="checkbox" checked={overdueOnly} onChange={(event) => setOverdueOnly(event.target.checked)} className="h-4 w-4 rounded border-amber-300" /> Eğitim süresi geçenler</label><button type="button" onClick={clearFilters} className="ml-auto inline-flex h-10 items-center gap-1.5 rounded-xl px-3 text-xs font-semibold text-ink-500 hover:bg-ink-100"><X className="h-3.5 w-3.5" /> Temizle</button></div></div>}</div>

      {selectedIds.length > 0 && <div className="flex flex-col justify-between gap-3 border-b border-brand-100 bg-brand-50/70 px-5 py-3.5 sm:flex-row sm:items-center sm:px-6"><div className="flex items-center gap-2 text-xs font-semibold text-brand-800"><span className="grid h-6 w-6 place-items-center rounded-md bg-brand-600 text-[10px] text-white">{selectedIds.length}</span> katılımcı seçildi</div><div className="flex flex-wrap items-center gap-2"><select defaultValue="" onChange={(event) => { if (event.target.value) applyBulkAction(event.target.value); event.target.value = '' }} className="h-9 rounded-lg border border-brand-200 bg-white px-3 text-xs font-semibold text-ink-700 outline-none"><option value="">Toplu işlem seçin</option><option value="assign_training">Eğitim ata</option><option value="activate">Aktif yap</option><option value="passivate">Pasif yap</option><option value="delete">Seçilenleri sil</option></select><button type="button" onClick={() => setSelectedIds([])} className="rounded-lg px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-100">Seçimi kaldır</button></div></div>}

      <div className="relative overflow-x-auto max-h-[calc(100dvh-380px)] overflow-y-auto">
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white via-white/80 to-transparent sm:hidden" />
        <div className="pointer-events-none absolute right-3 top-3 z-20 rounded-full bg-white/95 px-2 py-1 text-[10px] font-semibold text-ink-400 shadow-sm sm:hidden">Yatay kaydır</div>
        <table className="w-full min-w-[1240px] text-left text-xs"><thead className="border-b border-ink-100 bg-ink-50/40 text-[10px] font-semibold uppercase tracking-wider text-ink-400"><tr><th className="w-12 px-5 py-3.5 sm:px-6"><input type="checkbox" checked={filteredParticipants.length > 0 && selectedIds.length === filteredParticipants.length} onChange={toggleAll} aria-label="Tümünü seç" className="h-4 w-4 rounded border-ink-300" /></th><th className="px-2 py-3.5 font-semibold">Kullanıcı</th><th className="px-3 py-3.5 font-semibold">Firma</th><th className="px-3 py-3.5 font-semibold">Tehlike sınıfı</th><th className="px-3 py-3.5 font-semibold">Eğitim süresi</th><th className="px-3 py-3.5 font-semibold">İlerleme</th><th className="px-3 py-3.5 font-semibold">Eğitim durumu</th><th className="px-3 py-3.5 font-semibold">Son tamamlama</th><th className="px-3 py-3.5 font-semibold">Sonraki tarih</th><th className="px-3 py-3.5 font-semibold">Durum</th><th className="px-5 py-3.5 text-right font-semibold sm:px-6">İşlem</th></tr></thead><tbody className="divide-y divide-ink-100">{paginatedItems.map((participant) => <tr key={participant.id} onClick={() => setSelectedParticipant(participant)} className="group cursor-pointer transition-colors hover:bg-brand-50/35"><td className="px-5 py-4 sm:px-6" onClick={(event) => event.stopPropagation()}><input type="checkbox" checked={selectedIds.includes(participant.id)} onChange={() => toggleSelection(participant.id)} aria-label={`${participant.name} seç`} className="h-4 w-4 rounded border-ink-300" /></td><td className="px-2 py-4"><div className="flex items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-xs font-bold text-brand-700">{initials(participant.name)}</span><div className="min-w-0"><p className="truncate text-sm font-semibold text-ink-800">{participant.name}</p><p className="mt-0.5 truncate text-[11px] text-ink-400">{participant.email}</p><p className="mt-0.5 truncate font-mono text-[10px] text-ink-400">{participant.username}</p></div></div></td><td className="px-3 py-4"><p className="font-semibold text-ink-700">{participant.company}</p><p className="mt-1 text-[11px] text-ink-400">{participant.department}</p></td><td className="px-3 py-4 text-ink-600">{participant.riskLevel}</td><td className="px-3 py-4 font-medium text-ink-600">{formatMinutes(participant.trainingMinutes)}</td><td className="px-3 py-4"><div className="w-28"><div className="mb-1.5 flex items-center justify-between"><span className="text-[11px] font-semibold text-ink-600">%{participant.progress}</span><span className="text-[10px] text-ink-400">{participant.progress === 100 ? 'Tamamlandı' : 'Devam'}</span></div><div className="h-1.5 overflow-hidden rounded-full bg-ink-100"><div className={cn('h-full rounded-full', participant.trainingStatus === 'failed' ? 'bg-rose-400' : participant.progress === 100 ? 'bg-emerald-500' : 'bg-amber-400')} style={{ width: `${participant.progress}%` }} /></div></div></td><td className="px-3 py-4"><span className={cn('inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-semibold', trainingClasses[participant.trainingStatus])}>{trainingLabels[participant.trainingStatus]}</span></td><td className="px-3 py-4 text-ink-500">{participant.lastCompletion}</td><td className="px-3 py-4 text-ink-500">{participant.nextTraining}</td><td className="px-3 py-4"><span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold', participant.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-ink-100 text-ink-500')}><span className={cn('h-1.5 w-1.5 rounded-full', participant.status === 'active' ? 'bg-emerald-500' : 'bg-ink-400')} />{statusLabel(participant.status)}</span></td><td className="px-5 py-4 text-right sm:px-6" onClick={(event) => event.stopPropagation()}><div className="inline-flex items-center gap-1"><button type="button" onClick={() => setAssignmentParticipant(participant)} className="rounded-lg p-2 text-ink-400 hover:bg-brand-50 hover:text-brand-700" aria-label={`${participant.name} eğitim ata`}><ClipboardCheck className="h-4 w-4" /></button><button type="button" onClick={() => toast.info('Katılımcı düzenleme ekranı hazırlanacak.')} className="rounded-lg p-2 text-ink-400 hover:bg-brand-50 hover:text-brand-700" aria-label={`${participant.name} düzenle`}><Edit3 className="h-4 w-4" /></button><button type="button" onClick={() => { setParticipants((current) => current.filter((item) => item.id !== participant.id)); toast.success('Katılımcı kaydı silindi') }} className="rounded-lg p-2 text-ink-400 hover:bg-rose-50 hover:text-rose-600" aria-label={`${participant.name} sil`}><Trash2 className="h-4 w-4" /></button><button type="button" onClick={() => setSelectedParticipant(participant)} className="rounded-lg p-2 text-ink-400 hover:bg-ink-100 hover:text-ink-700" aria-label="Katılımcı seçenekleri"><MoreHorizontal className="h-4 w-4" /></button></div></td></tr>)}</tbody></table>{filteredParticipants.length === 0 && <div className="px-6 py-16 text-center"><Search className="mx-auto h-8 w-8 text-ink-300" /><p className="mt-3 text-sm font-semibold text-ink-700">Katılımcı bulunamadı</p><p className="mt-1 text-xs text-ink-400">Arama veya filtre kriterlerini değiştirerek tekrar deneyin.</p></div>}</div><Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredParticipants.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1) }}
          startIndex={startIndex}
          endIndex={endIndex}
          itemName="katılımcı"
        /></motion.section>

    {selectedParticipant && <div className="fixed inset-0 z-50 bg-ink-900/20 backdrop-blur-[2px]" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedParticipant(null) }}><motion.aside initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} className="ml-auto flex h-full max-h-[100dvh] w-full max-w-md flex-col overflow-y-auto overscroll-contain border-ink-200 bg-white shadow-[-20px_0_60px_-28px_rgba(17,24,39,0.32)] sm:border-l"><div className="border-b border-ink-100 p-4 sm:p-6"><div className="flex items-start justify-between gap-4"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-sm font-bold text-brand-700">{initials(selectedParticipant.name)}</span><div><h2 className="text-base font-semibold text-ink-900">{selectedParticipant.name}</h2><p className="mt-1 text-xs text-ink-400">Katılımcı detayları</p></div></div><button type="button" onClick={() => setSelectedParticipant(null)} className="rounded-xl p-2 text-ink-400 hover:bg-ink-100" aria-label="Paneli kapat"><X className="h-5 w-5" /></button></div><div className="mt-4 flex gap-2"><span className={cn('rounded-full px-2.5 py-1 text-[11px] font-semibold', trainingClasses[selectedParticipant.trainingStatus])}>{trainingLabels[selectedParticipant.trainingStatus]}</span><span className="rounded-full bg-ink-100 px-2.5 py-1 text-[11px] font-semibold text-ink-600">{selectedParticipant.company}</span></div></div><div className="flex-1 space-y-6 p-4 py-5 sm:p-6"><div className="rounded-2xl bg-brand-900 p-5 text-white"><div className="flex items-end justify-between"><div><p className="text-xs text-brand-100/70">Eğitim ilerlemesi</p><p className="mt-2 text-3xl font-bold">%{selectedParticipant.progress}</p></div><GraduationCap className="h-8 w-8 text-brand-200" /></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-brand-300" style={{ width: `${selectedParticipant.progress}%` }} /></div></div><div><h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">İletişim bilgileri</h3><div className="space-y-3 rounded-xl border border-ink-200 p-4"><div className="flex items-center gap-3"><Mail className="h-4 w-4 text-ink-400" /><span className="truncate text-xs text-ink-700">{selectedParticipant.email}</span></div><div className="flex items-center gap-3"><Phone className="h-4 w-4 text-ink-400" /><span className="text-xs text-ink-700">{selectedParticipant.phone}</span></div><div className="flex items-center justify-between border-t border-ink-100 pt-3"><span className="text-xs text-ink-400">TC kimlik no</span><span className="font-mono text-xs text-ink-700">{selectedParticipant.tcNumber}</span></div></div></div><div><h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">Eğitim özeti</h3><div className="divide-y divide-ink-100 rounded-xl border border-ink-200 px-4"><div className="flex justify-between py-3 text-xs"><span className="text-ink-400">Toplam geçirilen süre</span><span className="font-semibold text-ink-700">{formatMinutes(selectedParticipant.trainingMinutes)}</span></div><div className="flex justify-between py-3 text-xs"><span className="text-ink-400">Son tamamlama</span><span className="font-semibold text-ink-700">{selectedParticipant.lastCompletion}</span></div><div className="flex justify-between py-3 text-xs"><span className="text-ink-400">Sonraki eğitim</span><span className="font-semibold text-ink-700">{selectedParticipant.nextTraining}</span></div></div></div></div><div className="flex gap-2 border-t border-ink-100 p-6"><Button variant="outline" className="flex-1" leftIcon={<Edit3 className="h-4 w-4" />} onClick={() => toast.info('Düzenleme ekranı hazırlanacak.')}>Düzenle</Button><Button className="flex-1" leftIcon={<GraduationCap className="h-4 w-4" />} onClick={() => toast.info('Eğitim atama ekranı hazırlanacak.')}>Eğitim ata</Button></div></motion.aside></div>}

    {isModalOpen && <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overscroll-contain bg-ink-900/25 p-3 backdrop-blur-[2px] sm:p-8" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsModalOpen(false) }}><motion.div initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="my-auto max-h-[calc(100dvh-1.5rem)] min-h-0 w-full max-w-xl overflow-y-auto overscroll-contain rounded-xl border border-ink-200 bg-white shadow-[0_24px_80px_-24px_rgba(17,24,39,0.35)] sm:rounded-2xl"><div className="flex items-start justify-between gap-3 border-b border-ink-100 p-4 sm:gap-4 sm:p-6"><div><h2 className="text-base font-semibold text-ink-900">Yeni katılımcı ekle</h2><p className="mt-1 text-xs text-ink-400">Çalışan bilgilerini girerek eğitim paneline ekleyin.</p></div><button type="button" onClick={() => setIsModalOpen(false)} className="rounded-xl p-2 text-ink-400 hover:bg-ink-100" aria-label="Modalı kapat"><X className="h-5 w-5" /></button></div><div className="grid gap-4 p-4 py-5 sm:grid-cols-2 sm:p-6"><Input label="Ad Soyad" placeholder="Ad Soyad" value={newParticipant.name} onChange={(event) => setNewParticipant((current) => ({ ...current, name: event.target.value }))} /><Input label="E-posta" type="email" placeholder="calisan@firma.com" value={newParticipant.email} onChange={(event) => setNewParticipant((current) => ({ ...current, email: event.target.value }))} /><label><span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">Firma</span><select value={newParticipant.company} onChange={(event) => setNewParticipant((current) => ({ ...current, company: event.target.value }))} className="h-12 w-full rounded-xl border border-ink-200 bg-white px-3.5 text-sm text-ink-800 outline-none focus:border-brand-500">{companies.map((company) => <option key={company}>{company}</option>)}</select></label><Input label="Departman" placeholder="Örn. Üretim" value={newParticipant.department} onChange={(event) => setNewParticipant((current) => ({ ...current, department: event.target.value }))} /></div><div className="flex justify-end gap-2 border-t border-ink-100 p-6"><Button variant="outline" onClick={() => setIsModalOpen(false)}>Vazgeç</Button><Button onClick={createParticipant} leftIcon={<Plus className="h-4 w-4" />}>Katılımcıyı kaydet</Button></div></motion.div></div>}
    {/* Bireysel eğitim atama modal'ı */}
    <AnimatePresence>
      {assignmentParticipant !== undefined && (
        <AssignmentModal
          participant={assignmentParticipant}
          onClose={() => setAssignmentParticipant(undefined)}
          onAddAssignment={handleAddAssignment}
          onRemoveAssignment={handleRemoveAssignment}
        />
      )}
    </AnimatePresence>

    {/* Toplu eğitim atama modal'ı */}
    <AnimatePresence>
      {showBulkModal && (
        <BulkAssignmentModal
          onClose={() => { setShowBulkModal(false); setBulkPreselectedIds(undefined) }}
          onSubmit={handleBulkSubmit}
          preselectedParticipantIds={bulkPreselectedIds}
        />
      )}
    </AnimatePresence>

    {/* Toplu katılımcı ekleme modal'ı */}
    <AnimatePresence>
      {showBulkParticipantModal && (
        <BulkParticipantModal
          companies={companies}
          defaultCompany={companies[0] ?? 'Quantis Tekstil'}
          onClose={() => setShowBulkParticipantModal(false)}
          onCreate={handleBulkCreateParticipants}
        />
      )}
    </AnimatePresence>

    {/* Tekil katılımcı ekleme modal'ı */}
    <AnimatePresence>
      {showSingleParticipantModal && (
        <SingleParticipantModal
          onClose={() => setShowSingleParticipantModal(false)}
          onCreate={handleCreateParticipant}
        />
      )}
    </AnimatePresence>
    </div>
}
