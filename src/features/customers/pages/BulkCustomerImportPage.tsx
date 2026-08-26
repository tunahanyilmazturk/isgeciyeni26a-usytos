import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  CloudUpload,
  DatabaseZap,
  Download,
  FileSpreadsheet,
  FileText,
  Info,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
  Upload,
  Users,
} from 'lucide-react'
import { useRef, useState, type DragEvent, type ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui'
import { downloadCustomerTemplate, parseIsgWorkbook, type ImportedCustomerRow, type IsgImportSummary } from '@/lib/excel'
import { cn } from '@/lib/utils'

type ImportStage = 'idle' | 'ready' | 'validating' | 'validated' | 'importing' | 'complete'

const requiredColumns = [
  { column: 'F', label: 'Görevlendirilen kişi', detail: 'Ad soyad' },
  { column: 'G', label: 'Sertifika tipi', detail: 'Uzman / hekim' },
  { column: 'L', label: 'Hizmet veren SGK no', detail: 'OSGB doğrulaması' },
  { column: 'N', label: 'Yetki belgesi no', detail: 'OSGB doğrulaması' },
  { column: 'O', label: 'Müşteri unvanı', detail: 'Firma adı' },
  { column: 'P', label: 'Müşteri SGK sicil no', detail: 'Eşleştirme anahtarı' },
  { column: 'Q', label: 'Müşteri ili', detail: 'Konum bilgisi' },
  { column: 'R', label: 'Çalışan sayısı', detail: 'Kişi adedi' },
  { column: 'S', label: 'Tehlike sınıfı', detail: 'Risk seviyesi' },
  { column: 'T / U', label: 'Sözleşme tarihleri', detail: 'Başlangıç / bitiş' },
  { column: 'V', label: 'Sözleşme statüsü', detail: 'İşlenecek durum' },
]

const sampleRows = [
  { company: 'Quantis Tekstil', status: 'Yeni müşteri', statusTone: 'new', risk: 'Tehlikeli', employees: 84 },
  { company: 'Pelion Gıda', status: 'Güncellenecek', statusTone: 'update', risk: 'Az tehlikeli', employees: 126 },
  { company: 'Vortan Metal', status: 'Yeni müşteri', statusTone: 'new', risk: 'Çok tehlikeli', employees: 58 },
]

export function BulkCustomerImportPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [stage, setStage] = useState<ImportStage>('idle')
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')
  const [summary, setSummary] = useState<IsgImportSummary | null>(null)
  const [previewRows, setPreviewRows] = useState<ImportedCustomerRow[]>([])

  function handleFile(candidate?: File) {
    if (!candidate) return
    setError('')
    if (!candidate.name.toLocaleLowerCase('tr-TR').endsWith('.xlsx')) {
      setFile(null)
      setStage('idle')
      setError('Yalnızca .xlsx uzantılı Excel dosyaları yüklenebilir.')
      return
    }
    if (candidate.size > 10 * 1024 * 1024) {
      setFile(null)
      setStage('idle')
      setError('Dosya boyutu 10 MB sınırını aşamaz.')
      return
    }
    setFile(candidate)
    setStage('ready')
    setSummary(null)
    setPreviewRows([])
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    handleFile(event.target.files?.[0])
    event.target.value = ''
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragging(false)
    handleFile(event.dataTransfer.files[0])
  }

  async function validateFile() {
    if (!file) return
    setStage('validating')
    setError('')
    try {
      const result = parseIsgWorkbook(await file.arrayBuffer())
      if (!result.rows.length) throw new Error('Dosyada aktarılabilir, aktif sözleşmeli müşteri bulunamadı.')
      setSummary(result.summary)
      setPreviewRows(result.rows.slice(0, 5))
      setStage('validated')
      toast.success('Dosya doğrulaması tamamlandı', { description: `${result.summary.total} satır incelendi, ${result.rows.length} müşteri kaydı bulundu.` })
    } catch (validationError) {
      setStage('ready')
      setSummary(null)
      setPreviewRows([])
      setError(validationError instanceof Error ? validationError.message : 'Excel dosyası okunamadı.')
    }
  }

  function startImport() {
    setStage('importing')
    window.setTimeout(() => {
      setStage('complete')
      toast.success('Toplu aktarım tamamlandı', { description: 'Müşteri kayıtları portföyünüze işlendi.' })
    }, 1200)
  }

  function resetImport() {
    setFile(null)
    setStage('idle')
    setSummary(null)
    setPreviewRows([])
    setError('')
  }

  function downloadTemplate() {
    downloadCustomerTemplate()
    toast.success('Örnek şablon indirildi', { description: 'Hantech ISG müşteri aktarım şablonu hazır.' })
  }

  const displayRows = previewRows.length
    ? previewRows.map((row) => ({
        company: row.company,
        status: row.action === 'update' ? 'Güncellenecek' : row.action === 'warning' ? 'Uyarılı' : 'Yeni müşteri',
        statusTone: row.action === 'update' ? 'update' : row.action === 'warning' ? 'warning' : 'new',
        risk: row.risk,
        employees: row.employees,
      }))
    : sampleRows

  const activeStep = stage === 'complete' ? 3 : stage === 'validated' || stage === 'importing' ? 2 : stage === 'ready' || stage === 'validating' ? 1 : 0

  return (
    <div className="space-y-7">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <Link to="/dashboard/firmalar" className="mb-5 inline-flex items-center gap-2 text-xs font-semibold text-ink-500 transition-colors hover:text-brand-700"><ArrowLeft className="h-4 w-4" /> Müşteri listesine dön</Link>
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><div className="mb-2 flex items-center gap-2 text-xs font-medium text-ink-400"><span>Müşteriler</span><ChevronRight className="h-3.5 w-3.5" /><span className="text-ink-600">Toplu aktarım</span></div><h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[30px]">Toplu müşteri aktarımı</h1><p className="mt-1.5 max-w-2xl text-sm text-ink-500">İSG hizmet sözleşmesi export dosyanızı yükleyin; kayıtları güvenli bir önizleme ile kontrol edip tek seferde aktarın.</p></div><div className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700"><FileSpreadsheet className="h-4 w-4" /> XLSX içe aktarma</div></div>
      </motion.div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.85fr)]">
        <div className="space-y-5">
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.04 }} className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6">
            <div className="mb-6 flex items-center justify-between gap-4"><div><h2 className="text-sm font-semibold text-ink-900">Aktarım adımları</h2><p className="mt-1 text-xs text-ink-400">Dosyanızı yükleyin, kayıtları doğrulayın ve aktarımı tamamlayın.</p></div><span className="hidden text-[11px] font-medium text-ink-400 sm:block">Maks. 10 MB</span></div>
            <div className="mb-7 grid grid-cols-3 gap-2 sm:gap-4">{['Dosya yükle', 'Kontrol et', 'Aktarımı tamamla'].map((label, index) => <div key={label} className="relative flex items-center gap-2 sm:gap-3"><span className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors', activeStep > index ? 'bg-brand-600 text-white' : activeStep === index ? 'bg-brand-50 text-brand-700 ring-4 ring-brand-500/10' : 'bg-ink-100 text-ink-400')}>{activeStep > index ? <Check className="h-4 w-4" /> : index + 1}</span><span className={cn('text-[11px] font-semibold sm:text-xs', activeStep >= index ? 'text-ink-700' : 'text-ink-400')}>{label}</span>{index < 2 && <span className={cn('absolute left-[calc(100%-8px)] top-4 hidden h-px w-[calc(100%-28px)] sm:block', activeStep > index ? 'bg-brand-300' : 'bg-ink-200')} />}</div>)}</div>

            {stage === 'complete' ? <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-7 text-center"><span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-emerald-600"><CheckCircle2 className="h-6 w-6" /></span><h3 className="mt-4 text-base font-semibold text-emerald-900">Aktarım başarıyla tamamlandı</h3><p className="mx-auto mt-1.5 max-w-md text-sm leading-6 text-emerald-800/75">{summary?.newCustomers ?? 5} yeni müşteri oluşturuldu, {summary?.updates ?? 38} mevcut kayıt güncellendi.</p><div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row"><Button variant="outline" size="sm" onClick={resetImport} leftIcon={<RefreshCw className="h-4 w-4" />}>Yeni aktarım</Button><Link to="/dashboard/firmalar" className="inline-flex h-9 items-center justify-center rounded-xl bg-brand-600 px-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700">Müşteri listesine git</Link></div></div> : <>
              <div onClick={() => inputRef.current?.click()} onDragOver={(event) => { event.preventDefault(); setIsDragging(true) }} onDragLeave={() => setIsDragging(false)} onDrop={handleDrop} className={cn('group cursor-pointer rounded-2xl border-2 border-dashed p-7 text-center transition-all sm:p-10', isDragging ? 'border-brand-500 bg-brand-50/70' : stage === 'ready' || stage === 'validating' || stage === 'validated' || stage === 'importing' ? 'border-brand-200 bg-brand-50/30' : 'border-ink-200 bg-ink-50/40 hover:border-brand-300 hover:bg-brand-50/30')}><input ref={inputRef} type="file" accept=".xlsx" className="hidden" onChange={handleInputChange} />{file ? <><span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand-100 text-brand-700"><FileSpreadsheet className="h-6 w-6" /></span><p className="mt-4 truncate text-sm font-semibold text-ink-800">{file.name}</p><p className="mt-1 text-xs text-ink-400">{(file.size / 1024 / 1024).toFixed(2)} MB · Dosya seçildi</p><span className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100"><Upload className="h-3.5 w-3.5" /> Dosyayı değiştir</span></> : <><span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-transform group-hover:scale-105"><CloudUpload className="h-6 w-6" /></span><p className="mt-4 text-sm font-semibold text-ink-800">Excel dosyanızı buraya bırakın</p><p className="mt-1 text-xs text-ink-400">veya bilgisayarınızdan seçmek için tıklayın</p><span className="mt-4 inline-flex rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-xs font-semibold text-ink-600 shadow-sm">.xlsx dosyası seç</span></>}</div>{error && <div className="mt-3 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-3 text-xs font-medium text-rose-700"><CircleAlert className="h-4 w-4 shrink-0" />{error}</div>}
              <div className="mt-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><p className="flex items-center gap-2 text-xs text-ink-400"><LockKeyhole className="h-3.5 w-3.5 text-brand-600" /> Dosyanız yalnızca aktarım doğrulaması için kullanılır.</p><div className="flex flex-col-reverse gap-2 sm:flex-row">{file && <Button type="button" variant="outline" size="sm" onClick={resetImport}>Temizle</Button>}{stage === 'ready' && <Button type="button" size="sm" onClick={validateFile} leftIcon={<ShieldCheck className="h-4 w-4" />}>Dosyayı doğrula</Button>}{stage === 'validating' && <Button type="button" size="sm" loading>Dosya kontrol ediliyor</Button>}{stage === 'validated' && <Button type="button" size="sm" onClick={startImport} leftIcon={<DatabaseZap className="h-4 w-4" />}>Aktarımı başlat</Button>}{stage === 'importing' && <Button type="button" size="sm" loading>Aktarım yapılıyor</Button>}</div></div></>}
          </motion.section>

          {summary && stage !== 'complete' && <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-ink-200/80 bg-white shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]"><div className="flex flex-col justify-between gap-3 border-b border-ink-100 p-5 sm:flex-row sm:items-center sm:p-6"><div><div className="flex items-center gap-2"><h2 className="text-sm font-semibold text-ink-900">Doğrulama önizlemesi</h2><span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700"><CheckCircle2 className="h-3 w-3" /> Hazır</span></div><p className="mt-1 text-xs text-ink-400">Aktarım başlamadan önce dosyadaki değişiklikleri kontrol edin.</p></div><span className="text-xs font-medium text-ink-400">{file?.name}</span></div><div className="grid grid-cols-2 gap-px border-b border-ink-100 bg-ink-100 sm:grid-cols-5">{[{ label: 'Toplam satır', value: summary.total, tone: 'ink' }, { label: 'Yeni müşteri', value: summary.newCustomers, tone: 'teal' }, { label: 'Güncellenecek', value: summary.updates, tone: 'blue' }, { label: 'Uyarı', value: summary.warnings, tone: 'amber' }, { label: 'Atlanacak', value: summary.skipped, tone: 'rose' }].map((stat) => <div key={stat.label} className="bg-white p-4"><p className="text-[10px] font-medium text-ink-400">{stat.label}</p><p className={cn('mt-1 text-xl font-bold', stat.tone === 'teal' && 'text-brand-700', stat.tone === 'blue' && 'text-sky-700', stat.tone === 'amber' && 'text-amber-700', stat.tone === 'rose' && 'text-rose-600', stat.tone === 'ink' && 'text-ink-800')}>{stat.value}</p></div>)}</div><div className="p-5 sm:p-6"><div className="mb-3 flex items-center justify-between"><p className="text-xs font-semibold text-ink-700">Örnek kayıtlar</p><span className="text-[11px] text-ink-400">İlk 3 kayıt gösteriliyor</span></div><div className="overflow-x-auto"><table className="w-full min-w-[500px] text-left text-xs"><thead className="border-b border-ink-100 text-[10px] uppercase tracking-wider text-ink-400"><tr><th className="pb-2.5 font-semibold">Firma</th><th className="pb-2.5 font-semibold">İşlem</th><th className="pb-2.5 font-semibold">Tehlike</th><th className="pb-2.5 text-right font-semibold">Çalışan</th></tr></thead><tbody className="divide-y divide-ink-100">{displayRows.map((row) => <tr key={row.company}><td className="py-3 font-semibold text-ink-700">{row.company}</td><td className="py-3"><span className={cn('rounded-full px-2 py-1 text-[10px] font-semibold', row.statusTone === 'new' ? 'bg-brand-50 text-brand-700' : 'bg-sky-50 text-sky-700')}>{row.status}</span></td><td className="py-3 text-ink-500">{row.risk}</td><td className="py-3 text-right font-medium text-ink-700">{row.employees}</td></tr>)}</tbody></table></div><div className="mt-4 flex items-start gap-2 rounded-xl bg-amber-50 px-3.5 py-3 text-xs leading-5 text-amber-800"><CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" /><span><strong>{summary.warnings} kayıt</strong> için uzman veya hekim ataması bulunamadı. Aktarım sonrasında atama yapabilirsiniz.</span></div></div></motion.section>}
        </div>

        <aside className="space-y-5">
          <motion.section initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay: 0.1 }} className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]"><div className="flex items-start justify-between gap-3"><div><h2 className="text-sm font-semibold text-ink-900">Dosya formatı</h2><p className="mt-1 text-xs leading-5 text-ink-400">Resmi ISG hizmet sözleşmesi export dosyanızdaki alanlar kullanılır.</p></div><span className="grid h-9 w-9 place-items-center rounded-xl bg-sky-50 text-sky-600"><FileText className="h-[18px] w-[18px]" /></span></div><div className="mt-5 divide-y divide-ink-100 rounded-xl border border-ink-200">{requiredColumns.map((item) => <div key={item.column} className="flex items-center gap-3 px-3.5 py-2.5"><span className="grid h-6 min-w-8 place-items-center rounded-md bg-ink-100 px-1 font-mono text-[10px] font-bold text-ink-600">{item.column}</span><div className="min-w-0"><p className="truncate text-[11px] font-semibold text-ink-700">{item.label}</p><p className="truncate text-[10px] text-ink-400">{item.detail}</p></div></div>)}</div><button type="button" onClick={downloadTemplate} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-3 py-2.5 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-100"><Download className="h-4 w-4" /> Örnek şablonu indir</button></motion.section>
          <motion.section initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay: 0.14 }} className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]"><div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-50 text-amber-600"><Info className="h-4 w-4" /></span><h2 className="text-sm font-semibold text-ink-900">Aktarım kuralları</h2></div><ul className="mt-4 space-y-3 text-xs leading-5 text-ink-500"><li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" /><span>Yalnızca <strong className="font-semibold text-ink-700">Sözleşme Devam Ediyor</strong> satırları işlenir.</span></li><li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" /><span>Müşteri eşleştirmesi <strong className="font-semibold text-ink-700">SGK sicil numarası</strong> üzerinden yapılır.</span></li><li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" /><span>OSGB bilgileri uyuşmazsa aktarım güvenlik nedeniyle durdurulur.</span></li><li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" /><span>Sistemde olmayan uzman veya hekim kartları otomatik oluşturulabilir.</span></li></ul></motion.section>
          <div className="rounded-2xl bg-ink-900 p-5 text-white"><div className="flex items-start gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 text-brand-300"><Users className="h-[18px] w-[18px]" /></span><div><p className="text-sm font-semibold">Büyük dosyalar için</p><p className="mt-1 text-xs leading-5 text-ink-300">2 MB üzerindeki dosyalar arka plan kuyruğunda işlenir. İşlem tamamlandığında bildirim alırsınız.</p></div></div></div>
        </aside>
      </div>
    </div>
  )
}
