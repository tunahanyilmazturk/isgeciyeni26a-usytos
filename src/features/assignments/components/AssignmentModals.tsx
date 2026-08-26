import { AnimatePresence, motion } from 'framer-motion'
import {
  CheckCircle2,
  ClipboardCheck,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button, SearchableSelect } from '@/components/ui'
import { cn } from '@/lib/utils'
import { readParticipants, type Participant } from '@/features/participants/data/participants'
import { trainingCatalog } from '@/features/trainings/data/trainings'
import {
  readAssignments,
  type AssignmentOptions,
  type TrainingAssignment,
} from '../data/assignments'

function initials(name: string) {
  return name.split(' ').slice(0, 2).map((part) => part[0]).join('').toLocaleUpperCase('tr-TR')
}

const assignmentStatusLabels: Record<TrainingAssignment['status'], string> = {
  active: 'Yürürlükte',
  pending_approval: 'Onay bekliyor',
  completed: 'Tamamlandı',
  expired: 'Süresi doldu',
}

const assignmentStatusClasses: Record<TrainingAssignment['status'], string> = {
  active: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  pending_approval: 'border-amber-200 bg-amber-50 text-amber-700',
  completed: 'border-brand-200 bg-brand-50 text-brand-700',
  expired: 'border-rose-200 bg-rose-50 text-rose-700',
}

/** Bireysel eğitim atama modal'ı — ortalanmış, iki sütunlu, geniş ve rahat */
export function AssignmentModal({
  participant,
  onClose,
  onAddAssignment,
  onRemoveAssignment,
}: {
  participant: Participant | null | undefined
  onClose: () => void
  onAddAssignment: (participantId: number, trainingId: string, dueDate: string, options: AssignmentOptions) => void
  onRemoveAssignment: (assignmentId: string, trainingName: string) => void
}) {
  const allParticipants = useMemo(() => readParticipants(), [])
  const [selectedParticipantId, setSelectedParticipantId] = useState<number | null>(participant?.id ?? null)
  const [selectedTrainingIds, setSelectedTrainingIds] = useState<string[]>([])
  const [dueDate, setDueDate] = useState('')
  const [preTest, setPreTest] = useState(false)
  const [requiresExpertApproval, setRequiresExpertApproval] = useState(false)
  const [requiresDoctorApproval, setRequiresDoctorApproval] = useState(false)

  useEffect(() => {
    setSelectedParticipantId(participant?.id ?? null)
    setSelectedTrainingIds([])
    setDueDate('')
    setPreTest(false)
    setRequiresExpertApproval(false)
    setRequiresDoctorApproval(false)
  }, [participant])

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  const selectedParticipant = allParticipants.find((p) => p.id === selectedParticipantId) ?? null
  const participantAssignments = useMemo(() => {
    if (!selectedParticipantId) return []
    return readAssignments().filter((a) => a.participantId === selectedParticipantId)
  }, [selectedParticipantId, onAddAssignment, onRemoveAssignment])

  const ongoingAssignments = participantAssignments.filter((a) => a.status === 'active' || a.status === 'pending_approval')
  const completedAssignments = participantAssignments.filter((a) => a.status === 'completed' || a.status === 'expired')
  const assignedTrainingIds = new Set(participantAssignments.map((a) => a.trainingId))
  const baseTrainings = trainingCatalog.filter((t) => t.package === 'Temel Paket' && !assignedTrainingIds.has(t.id))
  const sectorTrainings = trainingCatalog.filter((t) => t.package === 'Sektör Paketi' && !assignedTrainingIds.has(t.id))

  const canSubmit = selectedParticipantId !== null && selectedTrainingIds.length > 0 && dueDate

  function toggleTraining(id: string) {
    setSelectedTrainingIds((current) => current.includes(id) ? current.filter((x) => x !== id) : [...current, id])
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit || !selectedParticipantId) return
    const options: AssignmentOptions = { preTest, requiresExpertApproval, requiresDoctorApproval }
    selectedTrainingIds.forEach((trainingId) => {
      onAddAssignment(selectedParticipantId, trainingId, dueDate, options)
    })
    setSelectedTrainingIds([])
    setDueDate('')
    setPreTest(false)
    setRequiresExpertApproval(false)
    setRequiresDoctorApproval(false)
  }

  const totalSelected = selectedTrainingIds.length

  return createPortal(
    <AnimatePresence>
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-ink-900/30 backdrop-blur-[3px]"
          role="presentation"
          onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 16 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-2xl shadow-ink-900/15">
            <div className="shrink-0 border-b border-ink-100 bg-gradient-to-br from-brand-50/60 via-white to-white px-6 py-5 sm:px-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-100 text-brand-700 ring-1 ring-brand-200">
                    <ClipboardCheck className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h2 className="text-lg font-bold tracking-tight text-ink-900">Eğitim ataması</h2>
                    <p className="mt-0.5 text-sm text-ink-500">
                      {participant ? `${participant.name} için atama yönetin` : 'Katılımcı seçip eğitim atayın'}
                    </p>
                  </div>
                </div>
                <button type="button" onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-700" aria-label="Kapat">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
              <div className="mx-auto max-w-4xl space-y-6">
                <section>
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-400">Katılımcı</h3>
                  {participant ? (
                    <div className="flex items-center gap-4 rounded-2xl border border-ink-200 bg-ink-50/40 p-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-50 text-sm font-bold text-brand-700 ring-1 ring-brand-100">
                        {initials(participant.name)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-ink-900">{participant.name}</p>
                        <p className="mt-0.5 truncate text-xs text-ink-400">
                          {participant.username} · {participant.company} · {participant.department}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <select
                      value={selectedParticipantId ?? ''}
                      onChange={(e) => setSelectedParticipantId(e.target.value ? Number(e.target.value) : null)}
                      className="h-12 w-full rounded-2xl border border-ink-200 bg-white px-4 text-sm font-medium text-ink-800 outline-none transition-colors focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
                    >
                      <option value="">Katılımcı seçin…</option>
                      {allParticipants.map((p) => (
                        <option key={p.id} value={p.id}>{p.name} — {p.company}</option>
                      ))}
                    </select>
                  )}
                </section>

                {selectedParticipant && ongoingAssignments.length > 0 && (
                  <section className="rounded-2xl border border-brand-100 bg-brand-50/20 p-5">
                    <div className="mb-4 flex items-center gap-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-brand-700">Devam eden atamalar</h3>
                      <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold text-brand-700">{ongoingAssignments.length}</span>
                    </div>
                    <div className="space-y-3">
                      {ongoingAssignments.map((assignment) => (
                        <div key={assignment.id} className="flex flex-col gap-3 rounded-xl border border-ink-200 bg-white p-4 lg:flex-row lg:items-center lg:gap-5">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-ink-900">{assignment.trainingName}</p>
                            <p className="mt-1 text-[11px] text-ink-400">
                              Atama: {assignment.assignedDate} · Son: {assignment.dueDate}
                              {assignment.preTest && ' · Ön test: Açık'}
                            </p>
                          </div>
                          <div className="flex shrink-0 items-center gap-3">
                            <div className="w-28 lg:w-40">
                              <div className="h-2 overflow-hidden rounded-full bg-ink-100">
                                <div
                                  className={cn('h-full rounded-full transition-all', assignment.status === 'pending_approval' ? 'bg-amber-500' : 'bg-brand-500')}
                                  style={{ width: `${assignment.progress}%` }}
                                />
                              </div>
                              <p className="mt-1 text-[10px] font-medium tabular-nums text-ink-400">%{assignment.progress}</p>
                            </div>
                            <span className={cn('inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold whitespace-nowrap', assignmentStatusClasses[assignment.status])}>
                              {assignmentStatusLabels[assignment.status]}
                            </span>
                            <button
                              type="button"
                              onClick={() => onRemoveAssignment(assignment.id, assignment.trainingName)}
                              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-ink-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
                              aria-label="Atamayı kaldır"
                            >
                              <Trash2 className="h-4 w-4" strokeWidth={1.7} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {selectedParticipant && completedAssignments.length > 0 && (
                  <section className="rounded-2xl border border-ink-200 bg-ink-50/20 p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-ink-400">Geçmiş atamalar</h3>
                      <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[10px] font-bold text-ink-600">{completedAssignments.length}</span>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {completedAssignments.map((assignment) => (
                        <div key={assignment.id} className="flex items-center justify-between gap-3 rounded-xl border border-ink-100 bg-white p-3">
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-semibold text-ink-700">{assignment.trainingName}</p>
                            <p className="mt-0.5 text-[10px] text-ink-400">Son: {assignment.dueDate} · %{assignment.progress}</p>
                          </div>
                          <span className={cn('inline-flex shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold', assignmentStatusClasses[assignment.status])}>
                            {assignmentStatusLabels[assignment.status]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {selectedParticipant && (
                  <div className="space-y-6 border-t border-ink-100 pt-6">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-ink-900">Yeni eğitim ata</h3>
                      {totalSelected > 0 && <span className="rounded-full bg-brand-600 px-2.5 py-0.5 text-[10px] font-bold text-white">{totalSelected} seçili</span>}
                    </div>

                    {baseTrainings.length === 0 && sectorTrainings.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-ink-200 bg-ink-50/30 px-6 py-10 text-center">
                        <CheckCircle2 className="mx-auto h-8 w-8 text-ink-300" strokeWidth={1.5} />
                        <p className="mt-3 text-sm font-semibold text-ink-600">Tüm eğitimler atanmış</p>
                        <p className="mt-1 text-xs text-ink-400">Bu katılımcıya atanabilecek yeni eğitim bulunmuyor.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                          <div className="space-y-5">
                            {baseTrainings.length > 0 && (
                              <div>
                                <p className="text-[11px] font-bold uppercase tracking-wider text-brand-600">1 — Temel paket eğitimleri</p>
                                <p className="mt-1 text-[11px] text-ink-400">Katılımcının tamamlayacağı ana eğitim paketleri.</p>
                                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                                  {baseTrainings.map((t) => {
                                    const isSelected = selectedTrainingIds.includes(t.id)
                                    return (
                                      <label
                                        key={t.id}
                                        className={cn('flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-all', isSelected ? 'border-brand-400 bg-brand-50/50 ring-1 ring-brand-200' : 'border-ink-200 bg-white hover:border-brand-200 hover:bg-brand-50/10')}
                                      >
                                        <input
                                          type="checkbox"
                                          checked={isSelected}
                                          onChange={() => toggleTraining(t.id)}
                                          className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
                                        />
                                        <div className="min-w-0 flex-1">
                                          <p className="text-sm font-semibold text-ink-800">{t.name}</p>
                                          <p className="mt-0.5 text-[11px] text-ink-400">{t.risk}</p>
                                        </div>
                                      </label>
                                    )
                                  })}
                                </div>
                              </div>
                            )}

                            {sectorTrainings.length > 0 && (
                              <div>
                                <p className="text-[11px] font-bold uppercase tracking-wider text-violet-600">2 — Sektör paketi eğitimleri</p>
                                <p className="mt-1 text-[11px] text-ink-400">İşe ve işyerine özgü riskleri kapsayan uygulamalı eğitimler.</p>
                                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                                  {sectorTrainings.map((t) => {
                                    const isSelected = selectedTrainingIds.includes(t.id)
                                    return (
                                      <label
                                        key={t.id}
                                        className={cn('flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-all', isSelected ? 'border-violet-400 bg-violet-50/50 ring-1 ring-violet-200' : 'border-ink-200 bg-white hover:border-violet-200 hover:bg-violet-50/10')}
                                      >
                                        <input
                                          type="checkbox"
                                          checked={isSelected}
                                          onChange={() => toggleTraining(t.id)}
                                          className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-300 text-violet-600 focus:ring-violet-500"
                                        />
                                        <div className="min-w-0 flex-1">
                                          <p className="text-sm font-semibold text-ink-800">{t.name}</p>
                                          <p className="mt-0.5 text-[11px] text-ink-400">{t.risk}</p>
                                        </div>
                                      </label>
                                    )
                                  })}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="space-y-4 lg:sticky lg:top-0 lg:self-start">
                            <div>
                              <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-ink-400">Son tarih</label>
                              <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="h-12 w-full rounded-xl border border-ink-200 bg-white px-3.5 text-sm font-medium text-ink-800 outline-none transition-colors focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
                              />
                            </div>

                            <label className={cn('flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all', preTest ? 'border-amber-300 bg-amber-50/50 ring-1 ring-amber-200' : 'border-ink-200 bg-white hover:border-amber-200')}>
                              <input
                                type="checkbox"
                                checked={preTest}
                                onChange={(e) => setPreTest(e.target.checked)}
                                className="mt-0.5 h-4 w-4 shrink-0 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                              />
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-amber-800">Ön test uygula</p>
                                <p className="mt-1 text-[11px] leading-relaxed text-amber-700">Videolardan önce eğitim sonu testini tanı olarak uygula (baraj/deneme yok; sertifikaya yazılmaz).</p>
                              </div>
                            </label>

                            <div className="rounded-xl border border-indigo-200 bg-indigo-50/30 p-4">
                              <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">Onay gereksinimleri</p>
                              <p className="mt-1 text-[11px] text-indigo-600">Hiçbiri seçilmezse atama doğrudan yürürlüğe girer.</p>
                              <div className="mt-3 space-y-2.5">
                                <label className={cn('flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-all', requiresExpertApproval ? 'border-indigo-300 bg-indigo-50/50' : 'border-indigo-200 bg-white hover:border-indigo-300')}>
                                  <input
                                    type="checkbox"
                                    checked={requiresExpertApproval}
                                    onChange={(e) => setRequiresExpertApproval(e.target.checked)}
                                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <div>
                                    <p className="text-xs font-semibold text-ink-800">İSG uzmanı onayı</p>
                                    <p className="mt-0.5 text-[10px] text-ink-400">Firmaya atanmış uzman onay vermelidir.</p>
                                  </div>
                                </label>
                                <label className={cn('flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-all', requiresDoctorApproval ? 'border-indigo-300 bg-indigo-50/50' : 'border-indigo-200 bg-white hover:border-indigo-300')}>
                                  <input
                                    type="checkbox"
                                    checked={requiresDoctorApproval}
                                    onChange={(e) => setRequiresDoctorApproval(e.target.checked)}
                                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <div>
                                    <p className="text-xs font-semibold text-ink-800">İşyeri hekimi onayı</p>
                                    <p className="mt-0.5 text-[10px] text-ink-400">Firmaya atanmış hekim onay vermelidir.</p>
                                  </div>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {selectedParticipant && (
              <div className="shrink-0 border-t border-ink-100 bg-ink-50/40 px-6 py-4 sm:px-8">
                <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
                  <p className="text-xs text-ink-500">
                    {canSubmit ? (
                      <span><span className="font-bold text-ink-800">{totalSelected}</span> eğitim atanacak</span>
                    ) : (
                      <span>Eğitim ve son tarih seçin</span>
                    )}
                  </p>
                  <div className="flex gap-2.5">
                    <Button type="button" variant="outline" size="md" onClick={onClose}>Kapat</Button>
                    <Button type="button" size="md" disabled={!canSubmit} leftIcon={<Plus className="h-4 w-4" strokeWidth={1.7} />} onClick={handleSubmit}>
                      {totalSelected > 0 ? `${totalSelected} eğitimi ata` : 'Eğitim ata'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </>
    </AnimatePresence>,
    document.body,
  )
}

/** Toplu eğitim atama modal'ı — çoklu katılımcı + çoklu eğitim seçimi */
export function BulkAssignmentModal({
  onClose,
  onSubmit,
  preselectedParticipantIds,
}: {
  onClose: () => void
  onSubmit: (participantIds: number[], trainingIds: string[], dueDate: string, options: AssignmentOptions) => void
  preselectedParticipantIds?: number[]
}) {
  const allParticipants = useMemo(() => readParticipants(), [])
  const companies = useMemo(
    () => [...new Set(allParticipants.map((p) => p.company))].sort((a, b) => a.localeCompare(b, 'tr')),
    [allParticipants],
  )

  const [selectedParticipantIds, setSelectedParticipantIds] = useState<number[]>(preselectedParticipantIds ?? [])
  const [selectedTrainingIds, setSelectedTrainingIds] = useState<string[]>([])
  const [dueDate, setDueDate] = useState('')
  const [preTest, setPreTest] = useState(false)
  const [requiresExpertApproval, setRequiresExpertApproval] = useState(false)
  const [requiresDoctorApproval, setRequiresDoctorApproval] = useState(false)
  const [companyFilter, setCompanyFilter] = useState('all')
  const [participantSearch, setParticipantSearch] = useState('')

  const companyFilterOptions = useMemo(
    () => [
      { value: 'all', label: 'Tüm firmalar' },
      ...companies.map((c) => ({ value: c, label: c })),
    ],
    [companies],
  )

  useEffect(() => {
    if (preselectedParticipantIds) setSelectedParticipantIds(preselectedParticipantIds)
  }, [preselectedParticipantIds])

  const filteredParticipants = useMemo(() => {
    const query = participantSearch.trim().toLocaleLowerCase('tr-TR')
    return allParticipants.filter((p) => {
      const matchesCompany = companyFilter === 'all' || p.company === companyFilter
      const haystack = `${p.name} ${p.username} ${p.company}`.toLocaleLowerCase('tr-TR')
      return matchesCompany && (!query || haystack.includes(query))
    })
  }, [allParticipants, companyFilter, participantSearch])

  const visibleParticipantIds = filteredParticipants.map((p) => p.id)
  const allVisibleSelected = visibleParticipantIds.length > 0 && visibleParticipantIds.every((id) => selectedParticipantIds.includes(id))

  function toggleParticipant(id: number) {
    setSelectedParticipantIds((current) => current.includes(id) ? current.filter((x) => x !== id) : [...current, id])
  }

  function toggleAllVisible() {
    setSelectedParticipantIds((current) => {
      if (allVisibleSelected) {
        return current.filter((id) => !visibleParticipantIds.includes(id))
      }
      return [...new Set([...current, ...visibleParticipantIds])]
    })
  }

  function toggleTraining(id: string) {
    setSelectedTrainingIds((current) => current.includes(id) ? current.filter((x) => x !== id) : [...current, id])
  }

  const canSubmit = selectedParticipantIds.length > 0 && selectedTrainingIds.length > 0 && dueDate
  const totalAssignments = selectedParticipantIds.length * selectedTrainingIds.length

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    onSubmit(selectedParticipantIds, selectedTrainingIds, dueDate, { preTest, requiresExpertApproval, requiresDoctorApproval })
  }

  return createPortal(
    <AnimatePresence>
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-ink-900/30 backdrop-blur-[2px]"
          role="presentation"
          onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-ink-100 p-6">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <Users className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div>
                  <h2 className="text-base font-bold text-ink-900">Toplu eğitim ataması</h2>
                  <p className="mt-1 text-xs text-ink-500">Birden fazla katılımcıya birden fazla eğitim tek seferde atayın.</p>
                </div>
              </div>
              <button type="button" onClick={onClose} className="rounded-xl p-2 text-ink-400 hover:bg-ink-100" aria-label="Kapat">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
              <div className="grid gap-6 p-6 lg:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wide text-ink-400">Katılımcılar</h3>
                    <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700">{selectedParticipantIds.length} seçili</span>
                  </div>

                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-400" strokeWidth={1.7} />
                      <input
                        value={participantSearch}
                        onChange={(e) => setParticipantSearch(e.target.value)}
                        placeholder="Ara..."
                        className="h-9 w-full rounded-lg border border-ink-200 bg-white pl-8 pr-3 text-xs text-ink-800 outline-none focus:border-brand-500"
                      />
                    </div>
                    <SearchableSelect
                      size="sm"
                      options={companyFilterOptions}
                      value={companyFilter}
                      onChange={setCompanyFilter}
                      placeholder="Firma seçin…"
                      searchPlaceholder="Firma ara…"
                      emptyText="Firma bulunamadı."
                      className="w-44 shrink-0"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={toggleAllVisible}
                    className={cn('inline-flex h-8 items-center gap-2 rounded-lg border px-3 text-xs font-semibold transition-colors', allVisibleSelected ? 'border-brand-200 bg-brand-50 text-brand-700' : 'border-ink-200 text-ink-600 hover:bg-ink-50')}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={1.8} />
                    {allVisibleSelected ? 'Seçimi kaldır' : 'Tümünü seç'}
                  </button>

                  <div className="max-h-[320px] space-y-1.5 overflow-y-auto rounded-xl border border-ink-100 bg-ink-50/20 p-2">
                    {filteredParticipants.map((p) => {
                      const isSelected = selectedParticipantIds.includes(p.id)
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => toggleParticipant(p.id)}
                          className={cn('flex w-full items-center gap-3 rounded-lg border p-2.5 text-left transition-colors', isSelected ? 'border-brand-300 bg-brand-50/50' : 'border-transparent hover:bg-white')}
                        >
                          <span className={cn('grid h-5 w-5 shrink-0 place-items-center rounded-md border', isSelected ? 'border-brand-500 bg-brand-500 text-white' : 'border-ink-300')}>
                            {isSelected && <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.5} />}
                          </span>
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-50 text-[10px] font-bold text-brand-700 ring-1 ring-brand-100">
                            {initials(p.name)}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-semibold text-ink-800">{p.name}</p>
                            <p className="mt-0.5 truncate text-[10px] text-ink-400">{p.company} · {p.department}</p>
                          </div>
                        </button>
                      )
                    })}
                    {filteredParticipants.length === 0 && (
                      <p className="py-6 text-center text-xs text-ink-400">Katılımcı bulunamadı.</p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wide text-ink-400">Eğitimler</h3>
                    <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700">{selectedTrainingIds.length} seçili</span>
                  </div>

                  <div className="max-h-[260px] space-y-1.5 overflow-y-auto rounded-xl border border-ink-100 bg-ink-50/20 p-2">
                    {trainingCatalog.map((t) => {
                      const isSelected = selectedTrainingIds.includes(t.id)
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => toggleTraining(t.id)}
                          className={cn('flex w-full items-center gap-3 rounded-lg border p-2.5 text-left transition-colors', isSelected ? 'border-brand-300 bg-brand-50/50' : 'border-transparent hover:bg-white')}
                        >
                          <span className={cn('grid h-5 w-5 shrink-0 place-items-center rounded-md border', isSelected ? 'border-brand-500 bg-brand-500 text-white' : 'border-ink-300')}>
                            {isSelected && <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.5} />}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-semibold text-ink-800">{t.name}</p>
                            <p className="mt-0.5 truncate text-[10px] text-ink-400">{t.package} · {t.risk}</p>
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink-400">Son tarih</label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="h-11 w-full rounded-xl border border-ink-200 bg-white px-3 text-sm font-medium text-ink-800 outline-none focus:border-brand-500"
                    />
                  </div>

                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/40 p-3">
                    <input
                      type="checkbox"
                      checked={preTest}
                      onChange={(e) => setPreTest(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <p className="text-xs font-semibold text-amber-800">Ön test uygula</p>
                      <p className="mt-0.5 text-[11px] text-amber-700">Videolardan önce tanı testi.</p>
                    </div>
                  </label>

                  <div className="rounded-xl border border-indigo-200 bg-indigo-50/30 p-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-indigo-700">Onay gereksinimleri</p>
                    <div className="mt-2.5 space-y-2">
                      <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-indigo-200 bg-white p-2.5 hover:border-indigo-300">
                        <input
                          type="checkbox"
                          checked={requiresExpertApproval}
                          onChange={(e) => setRequiresExpertApproval(e.target.checked)}
                          className="mt-0.5 h-4 w-4 rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <div>
                          <p className="text-xs font-semibold text-ink-800">İSG uzmanı onayı</p>
                          <p className="mt-0.5 text-[10px] text-ink-400">Firmaya atanmış uzman onay vermelidir.</p>
                        </div>
                      </label>
                      <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-indigo-200 bg-white p-2.5 hover:border-indigo-300">
                        <input
                          type="checkbox"
                          checked={requiresDoctorApproval}
                          onChange={(e) => setRequiresDoctorApproval(e.target.checked)}
                          className="mt-0.5 h-4 w-4 rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <div>
                          <p className="text-xs font-semibold text-ink-800">İşyeri hekimi onayı</p>
                          <p className="mt-0.5 text-[10px] text-ink-400">Firmaya atanmış hekim onay vermelidir.</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-ink-100 bg-ink-50/30 px-6 py-4">
                <div className="text-xs text-ink-500">
                  {canSubmit ? (
                    <span><span className="font-bold text-ink-800">{totalAssignments}</span> atama oluşturulacak</span>
                  ) : (
                    <span>Katılımcı, eğitim ve son tarih seçin</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" size="md" onClick={onClose}>İptal</Button>
                  <Button type="submit" size="md" disabled={!canSubmit} leftIcon={<Users className="h-4 w-4" strokeWidth={1.7} />}>
                    {totalAssignments} atama oluştur
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </>
    </AnimatePresence>,
    document.body,
  )
}
