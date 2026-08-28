import { motion } from 'framer-motion'
import { Award, BadgeCheck, Ban, Building2, Check, Clock3, Download, Eye, FileBadge2, Filter, GraduationCap, Printer, RefreshCcw, Search, ShieldCheck, Stamp, UserRound, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { readAssignments, type TrainingAssignment } from '@/features/assignments/data/assignments'
import { readParticipants, type Participant } from '@/features/participants/data/participants'
import { readTrainings, type Training } from '@/features/trainings/data/trainings'
import { readCompanyProfile } from '@/features/settings/data/companyProfile'
import { findUserByName } from '@/features/settings/data/settings'
import { findPeopleStampByName } from '@/features/people/data/people'
import { certificateMeta, readCertificateRegistry, recordCertificateDownload, recordCertificatePrint, setCertificateRegistryStatus, type CertificateRegistryEntry } from '../data/certificateRegistry'

type CertificateRecord = { assignment: TrainingAssignment; participant: Participant; training: Training; score: number; meta: CertificateRegistryEntry }

function scoreOf(assignment: TrainingAssignment) {
  const scores = Object.values(assignment.moduleScores)
  return scores.length ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : 0
}

function readCertificates(registry: CertificateRegistryEntry[]): CertificateRecord[] {
  const participants = readParticipants()
  const trainings = readTrainings()
  return readAssignments().filter((assignment) => assignment.approvalStatus === 'approved' && assignment.certificateId).flatMap((assignment) => {
    const participant = participants.find((item) => item.id === assignment.participantId)
    const training = trainings.find((item) => item.id === assignment.trainingId)
    return participant && training ? [{ assignment, participant, training, score: scoreOf(assignment), meta: certificateMeta(assignment.id, registry) }] : []
  })
}

export function CertificatesPage() {
  const [registry, setRegistry] = useState(() => readCertificateRegistry())
  const records = useMemo(() => readCertificates(registry), [registry])
  const [search, setSearch] = useState('')
  const [company, setCompany] = useState('Tümü')
  const [trainingId, setTrainingId] = useState('Tümü')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [previewId, setPreviewId] = useState<string | null>(null)
  const [verify, setVerify] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'revoked'>('all')
  const [sort, setSort] = useState<'newest' | 'score-high' | 'printed'>('newest')
  const [pdfGenerating, setPdfGenerating] = useState(false)

  const companies = useMemo(() => [...new Set(records.map((record) => record.participant.company))].sort((a, b) => a.localeCompare(b, 'tr')), [records])
  const trainings = useMemo(() => [...new Map(records.map((record) => [record.training.id, record.training])).values()], [records])
  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('tr-TR')
    return records.filter((record) => {
      const haystack = `${record.participant.name} ${record.participant.tcNumber} ${record.participant.company} ${record.training.name} ${record.assignment.certificateId}`.toLocaleLowerCase('tr-TR')
      return (!query || haystack.includes(query)) && (company === 'Tümü' || record.participant.company === company) && (trainingId === 'Tümü' || record.training.id === trainingId) && (statusFilter === 'all' || record.meta.status === statusFilter)
    }).sort((a, b) => sort === 'score-high' ? b.score - a.score : sort === 'printed' ? b.meta.printCount - a.meta.printCount : (b.assignment.approvedAt ?? '').localeCompare(a.assignment.approvedAt ?? ''))
  }, [company, records, search, sort, statusFilter, trainingId])

  const preview = records.find((record) => record.assignment.id === previewId) ?? null
  const printRecords = records.filter((record) => selectedIds.includes(record.assignment.id) && record.meta.status === 'active')
  const verified = verify.trim() ? records.find((record) => record.assignment.certificateId?.toLocaleLowerCase('tr-TR') === verify.trim().toLocaleLowerCase('tr-TR')) : undefined
  const selectableVisible = filtered.filter((record) => record.meta.status === 'active')
  const allVisibleSelected = selectableVisible.length > 0 && selectableVisible.every((record) => selectedIds.includes(record.assignment.id))

  function toggle(id: string) { setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]) }
  function toggleVisible() {
    const visibleIds = selectableVisible.map((record) => record.assignment.id)
    setSelectedIds((current) => allVisibleSelected ? current.filter((id) => !visibleIds.includes(id)) : [...new Set([...current, ...visibleIds])])
  }
  function print(items: CertificateRecord[]) {
    const activeItems = items.filter((item) => item.meta.status === 'active')
    if (!activeItems.length) return
    const ids = activeItems.map((item) => item.assignment.id)
    setSelectedIds(ids)
    setRegistry(recordCertificatePrint(ids))
    window.setTimeout(() => window.print(), 80)
  }

  async function downloadPdf(items: CertificateRecord[]) {
    const activeItems = items.filter((item) => item.meta.status === 'active')
    if (!activeItems.length || pdfGenerating) return
    const ids = activeItems.map((item) => item.assignment.id)
    setPdfGenerating(true)
    setSelectedIds(ids)
    try {
      await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())))
      const elements = ids.map((id) => document.querySelector<HTMLElement>(`.certificates-print-area [data-certificate-id="${id}"]`)).filter((element): element is HTMLElement => Boolean(element))
      const filename = activeItems.length === 1 ? `${activeItems[0].participant.name}-${activeItems[0].assignment.certificateId}` : `hantech-${activeItems.length}-sertifika`
      const { generateCertificatePdf } = await import('../data/certificatePdf')
      const result = await generateCertificatePdf(elements, filename)
      setRegistry(recordCertificateDownload(ids))
      toast.success('PDF dosyası oluşturuldu', { description: `${result.pageCount} sayfa · ${Math.max(1, Math.round(result.size / 1024))} KB · ${result.filename}` })
    } catch (error) {
      toast.error('PDF oluşturulamadı', { description: error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu.' })
    } finally {
      setPdfGenerating(false)
    }
  }

  function setStatus(record: CertificateRecord, status: 'active' | 'revoked', reason?: string) {
    setRegistry(setCertificateRegistryStatus(record.assignment.id, status, reason))
    setSelectedIds((current) => current.filter((id) => id !== record.assignment.id))
  }

  function exportCsv() {
    const rows = [['Sertifika No', 'Katılımcı', 'TC Kimlik No', 'Firma', 'Eğitim', 'Başarı Puanı', 'Onay Tarihi', 'Durum', 'Baskı Adedi'], ...filtered.map((record) => [record.assignment.certificateId ?? '', record.participant.name, record.participant.tcNumber, record.participant.company, record.training.name, String(record.score), record.assignment.approvedAt ?? '', record.meta.status === 'active' ? 'Aktif' : 'Pasif', String(record.meta.printCount)])]
    const csv = `\uFEFF${rows.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(';')).join('\n')}`
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a'); link.href = url; link.download = `hantech-sertifikalar-${new Date().toISOString().slice(0, 10)}.csv`; link.click(); URL.revokeObjectURL(url)
  }

  return <div className="space-y-5">
    <style>{`@media screen{.certificates-print-area{position:fixed;left:-20000px;top:0;width:1123px;pointer-events:none}.certificates-print-area .certificate-sheet{width:1123px;height:794px}}@media print{@page{size:A4 landscape;margin:0}body *{visibility:hidden!important}.certificates-print-area,.certificates-print-area *{visibility:visible!important}.certificates-print-area{display:block!important;position:absolute;inset:0;width:100%}.certificate-sheet{break-after:page;width:297mm;height:210mm}.certificate-sheet:last-child{break-after:auto}}`}</style>
    <motion.header initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
      <div><div className="mb-1.5 text-xs font-medium text-ink-400">Ana menü / <span className="text-ink-600">Sertifikalar</span></div><h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[28px]">Sertifika merkezi</h1><p className="mt-1 max-w-2xl text-sm text-ink-500">Onaylanan eğitim belgelerini doğrulayın, önizleyin ve toplu olarak yazdırın.</p></div>
      <div className="flex flex-wrap gap-2"><SummaryCard value={records.filter((record) => record.meta.status === 'active').length} label="Aktif belge" icon={<FileBadge2 />} /><SummaryCard value={records.filter((record) => record.meta.status === 'revoked').length} label="Pasif belge" icon={<Ban />} /><SummaryCard value={records.reduce((sum, record) => sum + record.meta.printCount, 0)} label="Toplam baskı" icon={<Printer />} /><SummaryCard value={new Set(records.map((record) => record.participant.id)).size} label="Sertifikalı kişi" icon={<GraduationCap />} /></div>
    </motion.header>

    <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_330px]">
      <div className="overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-[0_4px_18px_-14px_rgba(17,24,39,.22)]">
        <div className="space-y-3 border-b border-ink-100 p-4">
          <div className="flex flex-col gap-2 lg:flex-row"><div className="relative flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Katılımcı, TC, eğitim veya sertifika no ara..." className="h-10 w-full rounded-xl border border-ink-200 bg-ink-50/50 pl-9 pr-3 text-sm outline-none focus:border-brand-500 focus:bg-white" /></div><Select value={company} onChange={setCompany} icon={<Building2 />} options={['Tümü', ...companies]} /><Select value={trainingId} onChange={setTrainingId} icon={<Filter />} options={[{ value: 'Tümü', label: 'Tüm eğitimler' }, ...trainings.map((item) => ({ value: item.id, label: item.name }))]} /></div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center"><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)} className="h-9 rounded-xl border border-ink-200 bg-white px-3 text-xs font-semibold text-ink-600 outline-none"><option value="all">Tüm belge durumları</option><option value="active">Aktif belgeler</option><option value="revoked">Pasif belgeler</option></select><select value={sort} onChange={(event) => setSort(event.target.value as typeof sort)} className="h-9 rounded-xl border border-ink-200 bg-white px-3 text-xs font-semibold text-ink-600 outline-none"><option value="newest">En yeni onay</option><option value="score-high">Yüksek puan önce</option><option value="printed">En çok basılan</option></select><Button size="sm" variant="outline" leftIcon={<Download className="h-3.5 w-3.5" />} onClick={exportCsv}>CSV dışa aktar</Button></div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-ink-100 pt-3"><label className="inline-flex cursor-pointer items-center gap-2 text-[11px] font-semibold text-ink-600"><input type="checkbox" checked={allVisibleSelected} onChange={toggleVisible} className="h-4 w-4 rounded border-ink-300 accent-brand-600" /> Aktif görünenleri seç</label><div className="flex items-center gap-2"><span className="text-[10px] text-ink-400">{filtered.length} belge · {selectedIds.length} seçili</span><Button size="sm" variant="outline" disabled={!selectedIds.length || pdfGenerating} leftIcon={<Printer className="h-3.5 w-3.5" />} onClick={() => print(printRecords)}>Yazdır</Button><Button size="sm" loading={pdfGenerating} disabled={!selectedIds.length} leftIcon={<Download className="h-3.5 w-3.5" />} onClick={() => downloadPdf(printRecords)}>PDF indir</Button></div></div>
        </div>

        {filtered.length ? <div className="divide-y divide-ink-100">{filtered.map((record) => <CertificateRow key={record.assignment.id} record={record} selected={selectedIds.includes(record.assignment.id)} pdfGenerating={pdfGenerating} onToggle={() => toggle(record.assignment.id)} onPreview={() => setPreviewId(record.assignment.id)} onPrint={() => print([record])} onDownload={() => downloadPdf([record])} />)}</div> : <EmptyCertificates hasRecords={records.length > 0} onClear={() => { setSearch(''); setCompany('Tümü'); setTrainingId('Tümü'); setStatusFilter('all') }} />}
      </div>

      <aside className="space-y-4">
        <section className="rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-4"><div className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-600 text-white"><ShieldCheck className="h-5 w-5" /></span><div><h2 className="text-sm font-bold text-ink-900">Belge doğrulama</h2><p className="mt-1 text-[11px] leading-4 text-ink-500">Basılı belgedeki sertifika numarasını girerek sistem kaydını kontrol edin.</p></div></div><div className="mt-4 flex gap-2"><input value={verify} onChange={(event) => setVerify(event.target.value)} placeholder="HT-2026-A-1008" className="h-10 min-w-0 flex-1 rounded-xl border border-ink-200 bg-white px-3 text-xs font-semibold outline-none focus:border-brand-500" /><button className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-white" aria-label="Doğrula"><Check className="h-4 w-4" /></button></div>{verify.trim() && (verified ? verified.meta.status === 'active' ? <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3"><p className="flex items-center gap-1.5 text-xs font-bold text-emerald-800"><BadgeCheck className="h-4 w-4" /> Geçerli ve aktif sertifika</p><p className="mt-1 text-[10px] text-emerald-700">{verified.participant.name} · {verified.training.name}</p></div> : <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 p-3"><p className="flex items-center gap-1.5 text-xs font-bold text-rose-800"><Ban className="h-4 w-4" /> Sertifika pasif</p><p className="mt-1 text-[10px] text-rose-700">{verified.meta.revocationReason ?? 'Belge yönetici tarafından pasife alınmış.'}</p></div> : <p className="mt-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-[11px] font-semibold text-rose-700">Bu numarayla eşleşen onaylı belge bulunamadı.</p>)}</section>
        <section className="rounded-2xl border border-ink-200 bg-white p-4"><h2 className="text-sm font-bold text-ink-900">Belge operasyonu</h2><div className="mt-3 grid grid-cols-3 gap-2"><OperationMetric value={records.filter((record) => record.meta.lastPrintedAt).length} label="Basılmış" icon={<Printer />} /><OperationMetric value={records.reduce((sum, record) => sum + record.meta.printCount, 0)} label="Baskı" icon={<Clock3 />} /><OperationMetric value={records.reduce((sum, record) => sum + (record.meta.downloadCount ?? 0), 0)} label="PDF" icon={<Download />} /></div></section>
        <section className="rounded-2xl border border-ink-200 bg-white p-4"><h2 className="text-sm font-bold text-ink-900">Belge standardı</h2><div className="mt-3 space-y-3"><StandardItem icon={<BadgeCheck />} title="Benzersiz belge numarası" text="Her onaylanan eğitim sonucu için tekil kayıt." /><StandardItem icon={<UserRound />} title="Katılımcı ve eğitim kapsamı" text="Kimlik, görev, işveren, konu ve sonuç alanları birlikte gösterilir." /><StandardItem icon={<Stamp />} title="İki ayrı kaşe alanı" text="Kurum kaşesi ile onaylayan yetkilinin kaşesi birbirinden ayrıdır." /><StandardItem icon={<ShieldCheck />} title="İzlenebilir onay kaydı" text="Onaylayan kullanıcı, unvan ve tarih korunur; e-imza ayrıca yürütülür." /><StandardItem icon={<Printer />} title="A4 yatay PDF" text="Tekli ve toplu gerçek PDF üretimine uygun düzen." /></div></section>
      </aside>
    </section>

    {preview && <CertificatePreview record={preview} pdfGenerating={pdfGenerating} onClose={() => setPreviewId(null)} onPrint={() => print([preview])} onDownload={() => downloadPdf([preview])} onStatusChange={(status, reason) => setStatus(preview, status, reason)} />}
    <div className="certificates-print-area">{printRecords.map((record) => <CertificateDocument key={record.assignment.id} record={record} />)}</div>
  </div>
}

function CertificateRow({ record, selected, pdfGenerating, onToggle, onPreview, onPrint, onDownload }: { record: CertificateRecord; selected: boolean; pdfGenerating: boolean; onToggle: () => void; onPreview: () => void; onPrint: () => void; onDownload: () => void }) {
  const active = record.meta.status === 'active'
  return <article className={cn('grid gap-3 p-4 transition hover:bg-ink-50/50 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center', selected && 'bg-brand-50/50', !active && 'bg-rose-50/30')}><input type="checkbox" checked={selected} onChange={onToggle} disabled={!active} title={!active ? 'Pasif sertifika yazdırılamaz' : undefined} className="mt-1 h-4 w-4 rounded border-ink-300 accent-brand-600 disabled:cursor-not-allowed disabled:opacity-40 lg:mt-0" /><div className="flex min-w-0 items-start gap-3"><span className={cn('grid h-11 w-11 shrink-0 place-items-center rounded-xl', active ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700')}>{active ? <Award className="h-5 w-5" /> : <Ban className="h-5 w-5" />}</span><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="text-sm font-bold text-ink-900">{record.participant.name}</h3><span className={cn('rounded-md px-2 py-0.5 text-[9px] font-bold', active ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700')}>{active ? 'Aktif' : 'Pasif'}</span></div><p className="mt-1 truncate text-xs font-semibold text-brand-700">{record.training.name}</p><div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-ink-400"><span>{record.participant.company}</span><span>{record.assignment.certificateId}</span><span>Başarı %{record.score}</span><span>{record.assignment.approvedAt ?? 'Tarih yok'}</span><span>{record.meta.printCount} baskı</span><span>{record.meta.downloadCount ?? 0} PDF</span>{record.meta.lastPrintedAt && <span>Son baskı: {new Date(record.meta.lastPrintedAt).toLocaleDateString('tr-TR')}</span>}</div></div></div><div className="flex items-center gap-2 lg:justify-end"><Button size="sm" variant="outline" leftIcon={<Eye className="h-3.5 w-3.5" />} onClick={onPreview}>İncele</Button><button onClick={onDownload} disabled={!active || pdfGenerating} className="grid h-9 w-9 place-items-center rounded-xl border border-ink-200 text-brand-700 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Sertifikayı PDF indir"><Download className="h-4 w-4" /></button><button onClick={onPrint} disabled={!active || pdfGenerating} className="grid h-9 w-9 place-items-center rounded-xl border border-ink-200 text-ink-500 hover:bg-ink-50 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Sertifikayı yazdır"><Printer className="h-4 w-4" /></button></div></article>
}

function CertificatePreview({ record, pdfGenerating, onClose, onPrint, onDownload, onStatusChange }: { record: CertificateRecord; pdfGenerating: boolean; onClose: () => void; onPrint: () => void; onDownload: () => void; onStatusChange: (status: 'active' | 'revoked', reason?: string) => void }) {
  const [changingStatus, setChangingStatus] = useState(false)
  const [reason, setReason] = useState('')
  const active = record.meta.status === 'active'
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/50 p-3 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><motion.div initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl"><header className="flex flex-col gap-3 border-b border-ink-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex items-center gap-2"><p className="text-xs font-bold text-ink-800">Sertifika önizlemesi</p><span className={cn('rounded-md px-2 py-0.5 text-[9px] font-bold', active ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700')}>{active ? 'Aktif belge' : 'Pasif belge'}</span></div><p className="mt-0.5 text-[10px] text-ink-400">{record.assignment.certificateId} · {record.meta.printCount} baskı · {record.meta.downloadCount ?? 0} PDF</p></div><div className="flex flex-wrap gap-2">{active ? <Button size="sm" variant="outline" leftIcon={<Ban className="h-3.5 w-3.5" />} onClick={() => setChangingStatus(true)}>Belgeyi pasife al</Button> : <Button size="sm" variant="outline" leftIcon={<RefreshCcw className="h-3.5 w-3.5" />} onClick={() => onStatusChange('active')}>Yeniden aktifleştir</Button>}<Button size="sm" variant="outline" disabled={!active || pdfGenerating} leftIcon={<Printer className="h-3.5 w-3.5" />} onClick={onPrint}>Yazdır</Button><Button size="sm" loading={pdfGenerating} disabled={!active} leftIcon={<Download className="h-3.5 w-3.5" />} onClick={onDownload}>PDF indir</Button><button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-xl border border-ink-200 text-ink-500" aria-label="Kapat"><X className="h-4 w-4" /></button></div></header>{changingStatus && <div className="border-b border-rose-100 bg-rose-50 p-4"><p className="text-xs font-bold text-rose-800">Belgeyi pasife alma gerekçesi</p><div className="mt-2 flex flex-col gap-2 sm:flex-row"><input value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Örn. Belge bilgisi düzeltilecek..." className="h-10 flex-1 rounded-xl border border-rose-200 bg-white px-3 text-xs outline-none focus:border-rose-400" /><Button size="sm" variant="ghost" onClick={() => { setChangingStatus(false); setReason('') }}>Vazgeç</Button><Button size="sm" disabled={reason.trim().length < 3} onClick={() => { onStatusChange('revoked', reason); setChangingStatus(false) }}>Gerekçeyle pasife al</Button></div></div>}<div className="max-h-[calc(100dvh-110px)] overflow-auto bg-ink-100 p-4 sm:p-7">{!active && <div className="mx-auto mb-3 max-w-[980px] rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-700">Bu belge pasiftir: {record.meta.revocationReason ?? 'Yönetici işlemi'}</div>}<CertificateDocument record={record} preview /></div></motion.div></div>
}

function CertificateDocument({ record, preview = false }: { record: CertificateRecord; preview?: boolean }) {
  const institution = readCompanyProfile()
  const approvedEvent = [...(record.assignment.approvalHistory ?? [])].reverse().find((event) => event.decision === 'approved')
  const approverName = record.assignment.approvedBy ?? approvedEvent?.reviewerName ?? 'Yetkili kullanıcı'
  const approverAccount = findUserByName(approverName)
  const approverSeal = findPeopleStampByName(approverName) || approverAccount?.stampDataUrl || ''
  const topics = record.training.modules.map((module) => module.title)
  return <article data-certificate-id={record.assignment.id} className={cn('certificate-sheet relative mx-auto overflow-hidden bg-[#f8fbfa] text-[#10223b]', preview && 'aspect-[1.414/1] h-auto w-full max-w-[980px] shadow-xl')}>
    <div className="absolute inset-0 border-[12px] border-[#083f3c]" /><div className="absolute inset-[19px] border-2 border-[#c8a95b]" /><div className="absolute inset-x-0 top-0 h-[126px] bg-[#083f3c]" /><div className="absolute inset-x-[19px] top-[122px] h-1 bg-[#c8a95b]" /><div className="absolute -bottom-28 -right-20 h-72 w-72 rounded-full border-[44px] border-[#c8a95b]/10" />
    {record.meta.status === 'revoked' && <div className="absolute inset-0 z-20 grid place-items-center bg-white/35"><span className="-rotate-12 rounded-2xl border-4 border-rose-600 px-8 py-3 text-4xl font-black uppercase tracking-[.18em] text-rose-600/80">PASİF BELGE</span></div>}
    <div className="relative flex h-full flex-col px-[5.3%] pb-[3.7%] pt-[2.7%]">
      <header className="grid h-[108px] grid-cols-[1fr_1.45fr_1fr] items-center gap-5 text-white"><div className="flex min-w-0 items-center gap-3">{institution.logoDataUrl ? <img src={institution.logoDataUrl} alt="Kurum logosu" className="h-14 w-20 object-contain object-left" /> : <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/12 ring-1 ring-white/15"><ShieldCheck className="h-6 w-6" /></span>}<div className="min-w-0"><p className="truncate text-[clamp(10px,1.08vw,15px)] font-black uppercase tracking-[.12em]">{institution.name}</p><p className="mt-1 text-[clamp(7px,.77vw,10px)] font-medium text-white/75">{institution.certificateIssuerTitle}</p></div></div><div className="text-center"><p className="text-[clamp(7px,.76vw,10px)] font-bold uppercase tracking-[.24em] text-[#e5cf8b]">6331 sayılı kanun kapsamında</p><p className="mt-2 whitespace-nowrap text-[clamp(11px,1.15vw,16px)] font-black uppercase tracking-[.07em]">Eğitim Tamamlama Belgesi</p></div><div className="text-right"><p className="text-[clamp(7px,.75vw,10px)] font-bold uppercase tracking-[.16em] text-white/65">Belge numarası</p><p className="mt-1.5 text-[clamp(10px,1.08vw,15px)] font-black tracking-wide text-[#f5df9a]">{record.assignment.certificateId}</p></div></header>

      <div className="mt-3 grid flex-1 grid-cols-[1fr_1.15fr] gap-[4.5%]">
        <section className="flex min-w-0 flex-col"><p className="text-[clamp(8px,.84vw,11px)] font-black uppercase tracking-[.2em] text-[#0b625d]">Belge sahibi</p><h2 className="mt-2 text-[clamp(21px,2.55vw,36px)] font-black leading-tight tracking-[-.035em] text-[#10223b]">{record.participant.name}</h2><div className="mt-2 h-[2px] w-32 bg-[#c8a95b]" /><p className="mt-3 text-[clamp(8px,.82vw,11px)] font-medium leading-relaxed text-slate-500">Aşağıda tanımlanan eğitimin tüm öğrenme ve değerlendirme adımlarını tamamlamıştır.</p><div className="mt-3 grid grid-cols-2 gap-2"><CertificateField label="T.C. Kimlik No" value={record.participant.tcNumber} /><CertificateField label="Görev / Bölüm" value={record.participant.department || '—'} /><CertificateField label="İşveren / İşyeri" value={record.participant.company} /><CertificateField label="Eğitim yöntemi" value="Dijital / uzaktan eğitim" /></div><div className="mt-3 rounded-xl border border-[#d7e7e5] bg-white/75 p-3"><p className="text-[clamp(7px,.72vw,10px)] font-black uppercase tracking-[.15em] text-[#0b625d]">Eğitim kapsamı</p><p className="mt-1.5 line-clamp-3 text-[clamp(8px,.79vw,11px)] font-medium leading-relaxed text-slate-600">{topics.join(' · ')}</p><p className="mt-1 text-[clamp(7px,.7vw,9px)] text-slate-400">{topics.length} modül · {record.assignment.completedItemIds.length} içerik kaydı · {Object.keys(record.assignment.quizReviews).length} değerlendirme</p></div></section>

        <section className="flex min-w-0 flex-col"><div className="rounded-2xl bg-[#0b625d] px-5 py-5 text-white"><p className="text-[clamp(8px,.82vw,11px)] font-bold uppercase tracking-[.17em] text-[#e5cf8b]">Tamamlanan eğitim</p><h3 className="mt-2 text-[clamp(17px,1.95vw,28px)] font-black leading-tight">{record.training.name}</h3><p className="mt-3 text-[clamp(8px,.82vw,11px)] font-medium text-white/75">Eğitim programı başarıyla tamamlanmıştır.</p></div><div className="mt-3 grid grid-cols-3 gap-2"><CertificateField label="Atama tarihi" value={record.assignment.assignedDate} /><CertificateField label="Tamamlama" value={record.assignment.submittedAt ? new Date(record.assignment.submittedAt).toLocaleDateString('tr-TR') : record.assignment.approvedAt ?? '—'} /><CertificateField label="Onay tarihi" value={record.assignment.approvedAt ?? '—'} /></div><div className="mt-auto flex h-28 items-end justify-end gap-8 pt-3"><SealImage image={institution.sealDataUrl} alt="Kurum kaşesi" /><SealImage image={approverSeal} alt={`${approverName} kaşesi`} /></div></section>
      </div>

      <footer className="mt-3 grid grid-cols-[1.4fr_1fr] items-end gap-4 border-t border-[#cad8d6] pt-2 text-[clamp(5px,.58vw,8px)] leading-relaxed text-slate-400"><div><p className="font-semibold text-slate-500">{institution.name} · {institution.authorizationCertificate || institution.registryNumber}</p><p>{institution.address} · {institution.phone} · {institution.email} · {institution.website}</p><p className="mt-0.5">Eğitici kayıtları, katılım/tamamlama verileri ve sınav evrakı sistemde ayrı izlenir. Kaşe görselleri güvenli elektronik imza yerine geçmez.</p></div><div className="text-right"><p className="font-bold uppercase tracking-[.12em] text-[#0b625d]">Belge doğrulama kodu</p><p className="font-mono text-[clamp(7px,.74vw,10px)] font-bold text-[#10223b]">{record.assignment.certificateId}</p><p>Katılımcı kayıt no: {record.participant.id} · İçerik sürümü: {record.training.contentVersion ?? 1}</p></div></footer>
    </div>
  </article>
}

function CertificateField({ label, value }: { label: string; value: string }) { return <div className="min-w-0 rounded-xl border border-slate-200/80 bg-white/90 px-3 py-2.5"><p className="text-[clamp(6px,.67vw,9px)] font-bold uppercase tracking-wide text-slate-400">{label}</p><p className="mt-1 truncate text-[clamp(8px,.82vw,11px)] font-bold text-slate-700">{value}</p></div> }
function SealImage({ image, alt }: { image: string; alt: string }) { return image ? <img src={image} alt={alt} className="max-h-24 w-36 object-contain" /> : null }
function SummaryCard({ value, label, icon }: { value: number; label: string; icon: React.ReactNode }) { return <div className="flex min-w-32 items-center gap-2.5 rounded-xl border border-ink-200 bg-white px-3 py-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand-700 [&>svg]:h-4 [&>svg]:w-4">{icon}</span><div><p className="text-base font-bold text-ink-800">{value}</p><p className="text-[9px] font-semibold text-ink-400">{label}</p></div></div> }
function OperationMetric({ value, label, icon }: { value: number; label: string; icon: React.ReactNode }) { return <div className="rounded-xl bg-ink-50 p-3"><div className="flex items-center justify-between"><span className="text-brand-600 [&>svg]:h-4 [&>svg]:w-4">{icon}</span><span className="text-base font-bold text-ink-800">{value}</span></div><p className="mt-2 text-[9px] font-semibold text-ink-400">{label}</p></div> }
function StandardItem({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="flex gap-2.5"><span className="mt-0.5 text-brand-600 [&>svg]:h-4 [&>svg]:w-4">{icon}</span><div><p className="text-[11px] font-bold text-ink-700">{title}</p><p className="mt-0.5 text-[10px] leading-4 text-ink-400">{text}</p></div></div> }
function Select({ value, onChange, icon, options }: { value: string; onChange: (value: string) => void; icon: React.ReactNode; options: (string | { value: string; label: string })[] }) { return <label className="relative"><span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400 [&>svg]:h-3.5 [&>svg]:w-3.5">{icon}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="h-10 w-full rounded-xl border border-ink-200 bg-white pl-9 pr-3 text-xs font-semibold text-ink-600 outline-none focus:border-brand-500 lg:w-44">{options.map((option) => typeof option === 'string' ? <option key={option} value={option}>{option}</option> : <option key={option.value} value={option.value}>{option.label}</option>)}</select></label> }
function EmptyCertificates({ hasRecords, onClear }: { hasRecords: boolean; onClear: () => void }) { return <div className="flex flex-col items-center px-5 py-20 text-center"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink-50"><Award className="h-7 w-7 text-ink-300" /></span><p className="mt-4 text-sm font-bold text-ink-700">{hasRecords ? 'Filtreye uygun sertifika yok' : 'Henüz sertifika üretilmedi'}</p><p className="mt-1 max-w-sm text-xs leading-5 text-ink-400">{hasRecords ? 'Arama ve filtreleri temizleyerek tüm belgeleri görüntüleyin.' : 'Eğitim sonucu uzman, hekim veya yönetici tarafından tamamen onaylandığında sertifika otomatik olarak burada oluşur.'}</p>{hasRecords && <Button className="mt-4" size="sm" variant="outline" onClick={onClear}>Filtreleri temizle</Button>}</div> }
