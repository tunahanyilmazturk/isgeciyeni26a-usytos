import { motion } from 'framer-motion'
import { ArrowRight, Award, Check, ChevronRight, ClipboardCheck, Clock3, Eye, FileCheck2, Filter, History, LockKeyhole, MessageSquareWarning, Search, ShieldCheck, Stethoscope, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useAuth } from '@/features/auth/AuthContext'
import { readParticipants } from '@/features/participants/data/participants'
import { readTrainings, type Training } from '@/features/trainings/data/trainings'
import { readAssignments, updateAssignment, type TrainingApprovalTarget, type TrainingAssignment } from '../data/assignments'

type ReviewRow = { assignment: TrainingAssignment; participant?: ReturnType<typeof readParticipants>[number]; training?: Training }
const targetLabels: Record<TrainingApprovalTarget, string> = { expert: 'İSG uzmanı', doctor: 'İşyeri hekimi' }

function canReview(target: TrainingAssignment['approvalRequestedTo'], role?: string) {
  return role === 'Yönetici' || (target === 'expert' && role === 'İSG Uzmanı') || (target === 'doctor' && role === 'İşyeri Hekimi')
}

function averageScore(assignment: TrainingAssignment) {
  const scores = Object.values(assignment.moduleScores)
  return scores.length ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : 0
}

function answerTotals(assignment: TrainingAssignment) {
  const answers = Object.values(assignment.quizReviews).flat()
  const correct = answers.filter((answer) => answer.selectedIndex === answer.correctIndex).length
  return { answers, correct, wrong: answers.length - correct }
}

function ApprovalPath({ assignment }: { assignment: TrainingAssignment }) {
  const targets = assignment.approvalTargets?.length ? assignment.approvalTargets : assignment.approvalRequestedTo ? [assignment.approvalRequestedTo] : []
  return <div className="flex flex-wrap items-center gap-2">{targets.map((target, index) => {
    const decision = assignment.approvalDecisions?.[target]
    const active = assignment.approvalStatus === 'pending' && assignment.approvalRequestedTo === target
    return <div key={target} className="contents">
      {index > 0 && <ArrowRight className="h-3.5 w-3.5 text-ink-300" />}
      <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold', decision === 'approved' && 'border-emerald-200 bg-emerald-50 text-emerald-700', decision === 'rejected' && 'border-rose-200 bg-rose-50 text-rose-700', active && 'border-amber-200 bg-amber-50 text-amber-700', !decision && !active && 'border-ink-200 bg-ink-50 text-ink-500')}>
        {decision === 'approved' ? <Check className="h-3 w-3" /> : decision === 'rejected' ? <X className="h-3 w-3" /> : target === 'doctor' ? <Stethoscope className="h-3 w-3" /> : <ShieldCheck className="h-3 w-3" />}
        {targetLabels[target]} · {decision === 'approved' ? 'Onaylandı' : decision === 'rejected' ? 'Reddedildi' : active ? 'Sırada' : 'Bekliyor'}
      </span>
    </div>
  })}</div>
}

export function TrainingApprovalQueuePage({ history = false }: { history?: boolean }) {
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const isHistory = history || location.pathname.endsWith('/gecmis')
  const [search, setSearch] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [targetFilter, setTargetFilter] = useState<'all' | TrainingApprovalTarget>('all')
  const [resultFilter, setResultFilter] = useState<'all' | 'approved' | 'rejected'>('all')
  const [sort, setSort] = useState<'newest' | 'score-low' | 'score-high'>('newest')
  const participants = useMemo(() => readParticipants(), [])
  const trainings = useMemo(() => readTrainings(), [])
  const assignments = useMemo(() => readAssignments(), [refreshKey])

  const rows = useMemo<ReviewRow[]>(() => {
    const query = search.trim().toLocaleLowerCase('tr-TR')
    return assignments.filter((assignment) => isHistory ? ['approved', 'rejected'].includes(assignment.approvalStatus) : assignment.approvalStatus === 'pending').map((assignment) => ({
      assignment,
      participant: participants.find((participant) => participant.id === assignment.participantId),
      training: trainings.find((training) => training.id === assignment.trainingId),
    })).filter((row) => {
      const matchesSearch = !query || `${row.participant?.name ?? ''} ${row.participant?.company ?? ''} ${row.training?.name ?? row.assignment.trainingName} ${row.assignment.certificateId ?? ''}`.toLocaleLowerCase('tr-TR').includes(query)
      const matchesTarget = targetFilter === 'all' || (row.assignment.approvalTargets ?? [row.assignment.approvalRequestedTo]).includes(targetFilter)
      const matchesResult = !isHistory || resultFilter === 'all' || row.assignment.approvalStatus === resultFilter
      return matchesSearch && matchesTarget && matchesResult
    }).sort((a, b) => sort === 'score-low' ? averageScore(a.assignment) - averageScore(b.assignment) : sort === 'score-high' ? averageScore(b.assignment) - averageScore(a.assignment) : (b.assignment.submittedAt ?? '').localeCompare(a.assignment.submittedAt ?? ''))
  }, [assignments, isHistory, participants, resultFilter, search, sort, targetFilter, trainings])
  const selectedRow = rows.find((row) => row.assignment.id === selectedId) ?? null

  function review(assignment: TrainingAssignment, decision: 'approved' | 'rejected', note?: string) {
    if (!canReview(assignment.approvalRequestedTo, user?.role)) return void toast.error('Bu onay aşaması hesabınızın rolüne atanmadı.')
    const currentTarget = assignment.approvalRequestedTo
    if (!currentTarget) return void toast.error('Aktif onay aşaması bulunamadı.')
    const targets = assignment.approvalTargets?.length ? assignment.approvalTargets : [currentTarget]
    const approvalDecisions = { ...assignment.approvalDecisions, [currentTarget]: decision }
    const nextTarget = decision === 'approved' ? targets.slice(targets.indexOf(currentTarget) + 1).find((target) => approvalDecisions[target] !== 'approved') : undefined
    const fullyApproved = decision === 'approved' && !nextTarget
    const certificateId = fullyApproved ? `HT-${new Date().getFullYear()}-${assignment.id}` : assignment.certificateId
    updateAssignment(assignment.id, {
      approvalStatus: decision === 'rejected' ? 'rejected' : fullyApproved ? 'approved' : 'pending', approvalRequestedTo: nextTarget,
      approvalDecisions, status: decision === 'rejected' || fullyApproved ? 'completed' : 'pending_approval',
      approvedBy: fullyApproved ? user?.name : assignment.approvedBy, approvedAt: fullyApproved ? new Date().toLocaleDateString('tr-TR') : assignment.approvedAt, certificateId,
      rejectionReason: decision === 'rejected' ? note : assignment.rejectionReason,
      approvalHistory: [...(assignment.approvalHistory ?? []), { target: currentTarget, decision, reviewerName: user?.name ?? 'Yetkili kullanıcı', reviewerRole: user?.role ?? 'Yetkili', at: new Date().toISOString(), note: note?.trim() || undefined }],
    })
    setSelectedId(null); setRefreshKey((value) => value + 1)
    toast.success(decision === 'rejected' ? 'Eğitim sonucu reddedildi' : nextTarget ? 'Onay tamamlandı, sıradaki birime iletildi' : 'Eğitim onaylandı ve sertifika oluşturuldu', {
      description: decision === 'rejected' ? 'Sonuç kilitli olarak geçmişe taşındı.' : nextTarget ? `Sonuç şimdi ${targetLabels[nextTarget]} onayında.` : `Sertifika numarası: ${certificateId}`,
    })
  }

  const pendingCount = assignments.filter((item) => item.approvalStatus === 'pending').length
  const approvedCount = assignments.filter((item) => item.approvalStatus === 'approved').length
  const rejectedCount = assignments.filter((item) => item.approvalStatus === 'rejected').length
  const expertCount = assignments.filter((item) => item.approvalStatus === 'pending' && item.approvalRequestedTo === 'expert').length
  const doctorCount = assignments.filter((item) => item.approvalStatus === 'pending' && item.approvalRequestedTo === 'doctor').length
  return <div className="space-y-5">
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
      <div><div className="mb-1.5 text-xs font-medium text-ink-400">Ana menü / <span className="text-ink-600">Eğitim Onayları</span></div><h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[28px]">Eğitim onayları</h1><p className="mt-1 text-sm text-ink-500">Teslim edilen eğitimleri inceleyin, onay zincirini yönetin ve sertifikalandırın.</p></div>
      <div className="flex flex-wrap gap-2"><Metric count={pendingCount} label="Onay bekliyor" tone="amber" /><Metric count={expertCount} label="Uzman sırası" tone="blue" /><Metric count={doctorCount} label="Hekim sırası" tone="violet" /><Metric count={approvedCount} label="Sertifikalandı" tone="green" /></div>
    </motion.div>

    <section className="overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]">
      <div className="flex flex-col gap-3 border-b border-ink-100 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1.5 rounded-xl bg-ink-50 p-1"><Tab to="/dashboard/egitim-atamalari/onay-kuyrugu" label="Bekleyen onaylar" /><Tab to="/dashboard/egitim-atamalari/onay-kuyrugu/gecmis" label="Geçmiş onaylar" /></div>
        <div className="relative w-full sm:w-72"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Katılımcı, firma veya eğitim ara..." className="h-10 w-full rounded-xl border border-ink-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-brand-500" /></div>
      </div>
      <div className="flex flex-col gap-2 border-b border-ink-100 bg-ink-50/50 px-4 py-3 sm:flex-row sm:items-center">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-ink-400"><Filter className="h-3.5 w-3.5" /> Filtreler</span>
        <select value={targetFilter} onChange={(event) => setTargetFilter(event.target.value as typeof targetFilter)} className="h-9 rounded-xl border border-ink-200 bg-white px-3 text-xs font-semibold text-ink-600 outline-none focus:border-brand-500"><option value="all">Tüm onay rolleri</option><option value="expert">İSG uzmanı</option><option value="doctor">İşyeri hekimi</option></select>
        {isHistory && <select value={resultFilter} onChange={(event) => setResultFilter(event.target.value as typeof resultFilter)} className="h-9 rounded-xl border border-ink-200 bg-white px-3 text-xs font-semibold text-ink-600 outline-none focus:border-brand-500"><option value="all">Tüm sonuçlar</option><option value="approved">Onaylananlar</option><option value="rejected">Reddedilenler</option></select>}
        <select value={sort} onChange={(event) => setSort(event.target.value as typeof sort)} className="h-9 rounded-xl border border-ink-200 bg-white px-3 text-xs font-semibold text-ink-600 outline-none focus:border-brand-500"><option value="newest">En yeni teslim</option><option value="score-low">Düşük puan önce</option><option value="score-high">Yüksek puan önce</option></select>
        <span className="sm:ml-auto text-[10px] font-semibold text-ink-400">{rows.length} sonuç gösteriliyor</span>
      </div>
      {rows.length === 0 ? <div className="flex flex-col items-center justify-center px-5 py-20 text-center"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink-50"><FileCheck2 className="h-7 w-7 text-ink-300" /></span><p className="mt-4 text-sm font-semibold text-ink-700">{isHistory ? 'Henüz sonuç geçmişi yok' : 'Bekleyen eğitim sonucu yok'}</p><p className="mt-1 max-w-md text-xs leading-5 text-ink-400">Katılımcı “Eğitimi tamamla ve teslim et” dediğinde sonuç burada görünür.</p></div> : <div className="divide-y divide-ink-100">{rows.map(({ assignment, participant, training }) => {
        const totals = answerTotals(assignment); const score = averageScore(assignment); const authorized = canReview(assignment.approvalRequestedTo, user?.role)
        return <article key={assignment.id} className="grid gap-4 p-4 transition hover:bg-ink-50/50 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="flex min-w-0 items-start gap-3.5"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">{assignment.approvalStatus === 'approved' ? <Award className="h-5 w-5" /> : assignment.approvalRequestedTo === 'doctor' ? <Stethoscope className="h-5 w-5" /> : <ClipboardCheck className="h-5 w-5" />}</span><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h2 className="truncate text-sm font-bold text-ink-900">{training?.name ?? assignment.trainingName}</h2><span className="rounded-md bg-ink-100 px-1.5 py-0.5 text-[9px] font-semibold text-ink-500">{assignment.id}</span></div><p className="mt-1 text-xs text-ink-500"><b className="text-ink-700">{participant?.name ?? 'Katılımcı'}</b> · {participant?.company ?? 'Firma bilgisi yok'} · {participant?.department ?? 'Birim bilgisi yok'}</p><div className="mt-2.5"><ApprovalPath assignment={assignment} /></div></div></div>
          <div className="flex flex-wrap items-center gap-2 lg:justify-end"><div className="mr-1 flex items-center gap-3 rounded-xl border border-ink-100 bg-ink-50 px-3 py-2 text-center"><SmallStat value={`%${score}`} label="Ortalama" /><span className="h-7 w-px bg-ink-200" /><SmallStat value={String(totals.wrong)} label="Hata" danger /></div>{!isHistory && !authorized && <span className="inline-flex items-center gap-1 rounded-lg bg-ink-100 px-2.5 py-2 text-[10px] font-semibold text-ink-500"><LockKeyhole className="h-3 w-3" /> Görüntüleme</span>}<Button size="sm" variant="outline" rightIcon={<ChevronRight className="h-3.5 w-3.5" />} onClick={() => setSelectedId(assignment.id)}><Eye className="h-3.5 w-3.5" /> Sonucu incele</Button></div>
        </article>
      })}</div>}
    </section>
    <ProcessGuide pending={pendingCount} expert={expertCount} doctor={doctorCount} approved={approvedCount} rejected={rejectedCount} />
    {selectedRow && <ResultDrawer row={selectedRow} role={user?.role} isHistory={isHistory} onClose={() => setSelectedId(null)} onReview={review} onOpenCertificates={() => navigate('/dashboard/sertifikalar')} />}
  </div>
}

function ResultDrawer({ row, role, isHistory, onClose, onReview, onOpenCertificates }: { row: ReviewRow; role?: string; isHistory: boolean; onClose: () => void; onReview: (assignment: TrainingAssignment, decision: 'approved' | 'rejected', note?: string) => void; onOpenCertificates: () => void }) {
  const { assignment, participant, training } = row; const totals = answerTotals(assignment); const score = averageScore(assignment); const authorized = canReview(assignment.approvalRequestedTo, role)
  return <div className="fixed inset-0 z-50 flex justify-end bg-ink-950/35 backdrop-blur-[2px]" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><motion.aside initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex h-full w-full max-w-2xl flex-col bg-white shadow-2xl">
    <header className="flex items-start justify-between border-b border-ink-100 px-5 py-4"><div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-700">Eğitim sonuç dosyası</p><h2 className="mt-1 truncate text-lg font-bold text-ink-900">{training?.name ?? assignment.trainingName}</h2><p className="mt-1 text-xs text-ink-500">{participant?.name ?? 'Katılımcı'} · {participant?.company ?? 'Firma bilgisi yok'}</p></div><button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-xl border border-ink-200 text-ink-500" aria-label="Kapat"><X className="h-4 w-4" /></button></header>
    <div className="flex-1 space-y-5 overflow-y-auto p-5">
      <section className="grid grid-cols-2 gap-2 sm:grid-cols-4"><ResultMetric label="Genel başarı" value={`%${score}`} good={score >= (training?.passingScore ?? 70)} /><ResultMetric label="Doğru" value={`${totals.correct}/${totals.answers.length}`} good /><ResultMetric label="Yanlış" value={String(totals.wrong)} good={!totals.wrong} /><ResultMetric label="Teslim" value={assignment.submittedAt ? new Date(assignment.submittedAt).toLocaleDateString('tr-TR') : '—'} /></section>
      <section className="rounded-2xl border border-ink-200 p-4"><div className="mb-3"><h3 className="text-sm font-bold text-ink-900">Onay zinciri</h3><p className="mt-0.5 text-[11px] text-ink-400">Her birim yalnızca kendisine gelen aşamayı onaylar.</p></div><ApprovalPath assignment={assignment} /></section>
      <ApprovalAudit assignment={assignment} />
      <section><h3 className="text-sm font-bold text-ink-900">Modül sonuçları</h3><div className="mt-2 grid gap-2 sm:grid-cols-2">{(training?.modules ?? []).map((module) => { const reviews = assignment.quizReviews[module.id] ?? []; const moduleScore = assignment.moduleScores[module.id] ?? 0; return <div key={module.id} className="rounded-xl border border-ink-200 p-3"><div className="flex justify-between gap-3"><div><p className="text-xs font-semibold text-ink-800">{module.title}</p><p className="mt-1 text-[10px] text-ink-400">{reviews.length} soru · {reviews.filter((answer) => answer.selectedIndex !== answer.correctIndex).length} hata</p></div><span className={cn('h-fit rounded-lg px-2 py-1 text-xs font-bold', moduleScore >= (training?.passingScore ?? 70) ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700')}>%{moduleScore}</span></div></div> })}</div></section>
      <section><div className="flex justify-between"><h3 className="text-sm font-bold text-ink-900">Cevap analizi</h3><span className="text-[10px] font-semibold text-ink-400">{totals.answers.length} cevap</span></div><div className="mt-2 space-y-2">{totals.answers.length === 0 ? <p className="rounded-xl border border-dashed p-5 text-center text-xs text-ink-400">Kaydedilmiş test cevabı bulunamadı.</p> : totals.answers.map((answer, index) => { const correct = answer.selectedIndex === answer.correctIndex; return <div key={`${answer.questionId}-${index}`} className={cn('rounded-xl border p-3', correct ? 'border-emerald-100 bg-emerald-50/50' : 'border-rose-200 bg-rose-50/50')}><div className="flex items-start gap-2"><span className={cn('mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-white', correct ? 'bg-emerald-600' : 'bg-rose-600')}>{correct ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}</span><div><p className="text-xs font-semibold leading-5 text-ink-800">{answer.questionText}</p><p className={cn('mt-1 text-[11px]', correct ? 'text-emerald-700' : 'text-rose-700')}>Katılımcının cevabı: {answer.selectedText}</p>{!correct && <p className="mt-0.5 text-[11px] text-emerald-700">Doğru cevap: {answer.correctText}</p>}</div></div></div> })}</div></section>
    </div>
    <ApprovalFooter assignment={assignment} authorized={authorized} isHistory={isHistory} onReview={onReview} onOpenCertificates={onOpenCertificates} />
  </motion.aside></div>
}

function ApprovalAudit({ assignment }: { assignment: TrainingAssignment }) {
  const events = assignment.approvalHistory ?? []
  if (!events.length && !assignment.approvedBy && !assignment.rejectionReason) return null
  return <section><div className="flex items-center justify-between"><h3 className="text-sm font-bold text-ink-900">İşlem geçmişi</h3><History className="h-4 w-4 text-ink-400" /></div><div className="mt-2 space-y-2">{events.length ? events.map((event, index) => <div key={`${event.at}-${index}`} className="flex gap-3 rounded-xl border border-ink-200 p-3"><span className={cn('mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg', event.decision === 'approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700')}>{event.decision === 'approved' ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}</span><div className="min-w-0"><p className="text-xs font-bold text-ink-800">{event.reviewerName} · {event.decision === 'approved' ? 'Onayladı' : 'Reddetti'}</p><p className="mt-0.5 text-[10px] text-ink-400">{event.reviewerRole} · {targetLabels[event.target]} aşaması · {new Date(event.at).toLocaleString('tr-TR')}</p>{event.note && <p className="mt-2 rounded-lg bg-rose-50 px-2.5 py-2 text-[10px] leading-4 text-rose-700">{event.note}</p>}</div></div>) : <div className="rounded-xl border border-ink-200 p-3"><p className="text-xs font-bold text-ink-800">{assignment.approvedBy ?? 'Yetkili kullanıcı'} · {assignment.approvalStatus === 'approved' ? 'Onayladı' : 'Reddetti'}</p><p className="mt-1 text-[10px] text-ink-400">{assignment.approvedAt ?? 'Geçmiş kayıt'}</p>{assignment.rejectionReason && <p className="mt-2 text-[10px] text-rose-700">{assignment.rejectionReason}</p>}</div>}</div></section>
}

function ApprovalFooter({ assignment, authorized, isHistory, onReview, onOpenCertificates }: { assignment: TrainingAssignment; authorized: boolean; isHistory: boolean; onReview: (assignment: TrainingAssignment, decision: 'approved' | 'rejected', note?: string) => void; onOpenCertificates: () => void }) {
  const [rejecting, setRejecting] = useState(false)
  const [note, setNote] = useState('')
  if (isHistory || assignment.approvalStatus !== 'pending') return <footer className="border-t border-ink-100 bg-ink-50/80 p-4"><div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-ink-500">Bu sonuç tamamlanmış ve değişikliğe kapatılmıştır.</p>{assignment.certificateId ? <Button size="sm" leftIcon={<Award className="h-4 w-4" />} onClick={onOpenCertificates}>Sertifikayı aç</Button> : <span className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">Sertifika üretilmedi</span>}</div></footer>
  if (!authorized) return <footer className="border-t border-ink-100 bg-ink-50/80 p-4"><div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800"><LockKeyhole className="h-4 w-4" /> Bu aşama {assignment.approvalRequestedTo ? targetLabels[assignment.approvalRequestedTo] : 'başka bir yetkili'} hesabına atanmış.</div></footer>
  return <footer className="border-t border-ink-100 bg-ink-50/80 p-4">{rejecting ? <div className="space-y-2"><div className="flex items-center gap-2 text-xs font-bold text-rose-700"><MessageSquareWarning className="h-4 w-4" /> Ret gerekçesi zorunludur</div><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Katılımcının sonucunun neden reddedildiğini açıklayın..." rows={3} className="w-full resize-none rounded-xl border border-rose-200 bg-white p-3 text-xs leading-5 outline-none focus:border-rose-400" /><div className="flex justify-end gap-2"><Button size="sm" variant="ghost" onClick={() => { setRejecting(false); setNote('') }}>Vazgeç</Button><Button size="sm" disabled={note.trim().length < 3} onClick={() => onReview(assignment, 'rejected', note.trim())}>Gerekçeyle reddet</Button></div></div> : <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><p className="text-[11px] text-ink-500"><b className="text-ink-700">{targetLabels[assignment.approvalRequestedTo!]}</b> aşamasını sonuçlandırıyorsunuz.</p><div className="flex gap-2"><Button size="sm" variant="outline" leftIcon={<X className="h-3.5 w-3.5" />} onClick={() => setRejecting(true)}>Sonucu reddet</Button><Button size="sm" leftIcon={<Check className="h-3.5 w-3.5" />} onClick={() => onReview(assignment, 'approved')}>Onayla ve ilerlet</Button></div></div>}</footer>
}

function ProcessGuide({ pending, expert, doctor, approved, rejected }: { pending: number; expert: number; doctor: number; approved: number; rejected: number }) {
  return <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><GuideCard icon={<Clock3 />} title="Teslim kuyruğu" value={pending} text="Katılımcı tarafından tamamlanıp incelemeye gönderilen sonuç." tone="amber" /><GuideCard icon={<ShieldCheck />} title="Uzman incelemesi" value={expert} text="İSG uzmanının içerik ve sınav sonucunu değerlendirdiği aşama." tone="blue" /><GuideCard icon={<Stethoscope />} title="Hekim incelemesi" value={doctor} text="Sağlık kapsamlı eğitimlerde işyeri hekimi kontrolü." tone="violet" /><GuideCard icon={<Award />} title="Kapanan kayıtlar" value={approved + rejected} text={`${approved} sertifikalandı · ${rejected} reddedildi`} tone="green" /></section>
}

function GuideCard({ icon, title, value, text, tone }: { icon: React.ReactNode; title: string; value: number; text: string; tone: 'amber' | 'blue' | 'violet' | 'green' }) { const colors = { amber: 'bg-amber-50 text-amber-700', blue: 'bg-sky-50 text-sky-700', violet: 'bg-violet-50 text-violet-700', green: 'bg-emerald-50 text-emerald-700' }; return <div className="rounded-2xl border border-ink-200 bg-white p-4"><div className="flex items-center justify-between"><span className={cn('grid h-9 w-9 place-items-center rounded-xl [&>svg]:h-4 [&>svg]:w-4', colors[tone])}>{icon}</span><span className="text-xl font-bold text-ink-800">{value}</span></div><p className="mt-3 text-xs font-bold text-ink-800">{title}</p><p className="mt-1 text-[10px] leading-4 text-ink-400">{text}</p></div> }
function Metric({ count, label, tone }: { count: number; label: string; tone: 'amber' | 'blue' | 'violet' | 'green' }) { const colors = { amber: 'border-amber-200 bg-amber-50 text-amber-800', blue: 'border-sky-200 bg-sky-50 text-sky-800', violet: 'border-violet-200 bg-violet-50 text-violet-800', green: 'border-emerald-200 bg-emerald-50 text-emerald-800' }; return <div className={cn('min-w-24 rounded-xl border px-3 py-2', colors[tone])}><p className="text-lg font-bold">{count}</p><p className="text-[10px] font-semibold">{label}</p></div> }
function Tab({ to, label }: { to: string; label: string }) { return <NavLink to={to} className={({ isActive }) => cn('rounded-lg px-3 py-2 text-xs font-semibold transition', isActive ? 'bg-white text-brand-700 shadow-sm' : 'text-ink-500')}>{label}</NavLink> }
function SmallStat({ value, label, danger }: { value: string; label: string; danger?: boolean }) { return <div><p className={cn('text-sm font-bold', danger ? 'text-rose-600' : 'text-ink-800')}>{value}</p><p className="text-[9px] text-ink-400">{label}</p></div> }
function ResultMetric({ label, value, good }: { label: string; value: string; good?: boolean }) { return <div className={cn('rounded-xl border p-3', good === true ? 'border-emerald-200 bg-emerald-50' : good === false ? 'border-rose-200 bg-rose-50' : 'border-ink-200 bg-ink-50')}><p className={cn('text-lg font-bold', good === true ? 'text-emerald-800' : good === false ? 'text-rose-700' : 'text-ink-800')}>{value}</p><p className="mt-0.5 text-[10px] font-medium text-ink-500">{label}</p></div> }
