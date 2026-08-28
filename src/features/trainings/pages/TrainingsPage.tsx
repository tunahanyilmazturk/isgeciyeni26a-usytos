import { motion } from 'framer-motion'
import { BookOpen, CheckCircle2, ChevronRight, CircleGauge, Eye, FileQuestion, GraduationCap, Image as ImageIcon, Layers3, PlayCircle, Plus, Search, SlidersHorizontal, Trash2, Users, Video, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { readAssignments } from '@/features/assignments/data/assignments'
import { readTrainings, removeTraining, type Training } from '../data/trainings'
import { seedTrainingCatalog } from '../data/seed'

function moduleCount(training: Training) { return training.modules.length }
function contentCount(training: Training) { return training.modules.reduce((sum, module) => sum + module.items.length, 0) }
function questionCount(training: Training) { return training.modules.reduce((sum, module) => sum + (module.quiz?.questions.length ?? 0), 0) }
function slideCount(training: Training) { return training.modules.reduce((sum, module) => sum + module.items.reduce((itemSum, item) => itemSum + (item.slides?.length ?? 0), 0), 0) }
function coverImage(training: Training) {
  for (const module of training.modules) for (const item of module.items) for (const slide of item.slides ?? []) if (slide.mediaUrl) return slide.mediaUrl
  return undefined
}

const packageClasses: Record<Training['package'], string> = {
  'Temel Paket': 'border-brand-200 bg-brand-50 text-brand-700',
  'Sektör Paketi': 'border-violet-200 bg-violet-50 text-violet-700',
}
const riskClasses: Record<Training['risk'], string> = {
  'Az Tehlikeli': 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Tehlikeli: 'border-amber-200 bg-amber-50 text-amber-700',
  'Çok Tehlikeli': 'border-rose-200 bg-rose-50 text-rose-700',
}

export function TrainingsPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [packageFilter, setPackageFilter] = useState<'Tümü' | Training['package']>('Tümü')
  const [riskFilter, setRiskFilter] = useState<'Tümü' | Training['risk']>('Tümü')
  const [trainings, setTrainings] = useState<Training[]>(() => readTrainings())
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const assignments = useMemo(() => readAssignments(), [])

  useEffect(() => { seedTrainingCatalog(); setTrainings(readTrainings()) }, [])

  const filteredTrainings = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('tr-TR')
    return trainings.filter((training) => {
      const matchesSearch = !query || `${training.name} ${training.description} ${training.risk} ${training.package}`.toLocaleLowerCase('tr-TR').includes(query)
      return matchesSearch && (packageFilter === 'Tümü' || training.package === packageFilter) && (riskFilter === 'Tümü' || training.risk === riskFilter)
    })
  }, [packageFilter, riskFilter, search, trainings])

  const selectedTraining = trainings.find((training) => training.id === selectedId) ?? null
  const activeFilterCount = Number(packageFilter !== 'Tümü') + Number(riskFilter !== 'Tümü')

  function handleRemove(id: string, name: string) {
    const usedCount = assignments.filter((assignment) => assignment.trainingId === id).length
    const message = usedCount ? `“${name}” ${usedCount} atamada kullanılıyor. Yine de silmek istiyor musunuz?` : `“${name}” eğitimini silmek istediğinize emin misiniz?`
    if (!confirm(message)) return
    setTrainings(removeTraining(id)); setSelectedId(null)
    toast.success('Eğitim katalogdan kaldırıldı', { description: `“${name}” silindi.` })
  }

  return <div className="space-y-5">
    <motion.header initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
      <div><div className="mb-1.5 text-xs font-medium text-ink-400">Ana menü / <span className="text-ink-600">Eğitimler</span></div><h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[28px]">Eğitim kataloğu</h1><p className="mt-1 max-w-2xl text-sm text-ink-500">Eğitim kapsamını tek ekrandan inceleyin; modül, içerik ve sınavları yönetin.</p></div>
      <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => navigate('/dashboard/egitimler/yeni')}>Yeni eğitim oluştur</Button>
    </motion.header>

    <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .05 }} className="rounded-2xl border border-ink-200/80 bg-white p-3.5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="relative min-w-0 flex-1 xl:max-w-md"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Eğitim adı veya içerik ara..." className="h-10 w-full rounded-xl border border-ink-200 bg-ink-50/60 pl-9 pr-4 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10" /></div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex gap-1 rounded-xl bg-ink-50 p-1">{(['Tümü', 'Temel Paket', 'Sektör Paketi'] as const).map((item) => <button key={item} onClick={() => setPackageFilter(item)} className={cn('rounded-lg px-3 py-2 text-[11px] font-semibold transition', packageFilter === item ? 'bg-white text-brand-700 shadow-sm' : 'text-ink-500 hover:text-ink-800')}>{item}</button>)}</div>
          <label className="relative"><SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-400" /><select value={riskFilter} onChange={(event) => setRiskFilter(event.target.value as typeof riskFilter)} className="h-10 w-full appearance-none rounded-xl border border-ink-200 bg-white pl-9 pr-8 text-xs font-semibold text-ink-600 outline-none focus:border-brand-500 sm:w-44"><option>Tümü</option><option>Az Tehlikeli</option><option>Tehlikeli</option><option>Çok Tehlikeli</option></select></label>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-ink-100 pt-3 text-[11px] text-ink-400"><span><b className="text-ink-700">{filteredTrainings.length}</b> eğitim gösteriliyor</span>{activeFilterCount > 0 && <button onClick={() => { setPackageFilter('Tümü'); setRiskFilter('Tümü') }} className="font-semibold text-brand-700 hover:text-brand-800">{activeFilterCount} filtreyi temizle</button>}</div>
    </motion.section>

    {filteredTrainings.length ? <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-4 xl:grid-cols-2">
      {filteredTrainings.map((training, index) => {
        const cover = coverImage(training)
        const assigned = assignments.filter((assignment) => assignment.trainingId === training.id).length
        return <motion.article key={training.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * .025, .15) }} className="group overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-[0_8px_24px_-20px_rgba(15,23,42,.32)] transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_14px_32px_-22px_rgba(13,148,136,.35)]">
          <div className="flex min-h-[224px] flex-col sm:flex-row">
            <div className="relative w-full shrink-0 overflow-hidden bg-gradient-to-br from-[#07182d] to-brand-800 sm:w-44" style={{ minHeight: 160 }}>
              {cover ? <img src={cover} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" /> : <div className="absolute inset-0 grid place-items-center"><GraduationCap className="h-12 w-12 text-white/30" /></div>}
              <div className="absolute inset-0 bg-gradient-to-t from-[#061326]/85 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3"><span className="inline-flex rounded-md bg-white/90 px-2 py-1 text-[9px] font-bold text-ink-800 backdrop-blur">{training.id}</span><p className="mt-2 text-[10px] font-semibold text-white/80">İçerik sürümü v{training.contentVersion ?? 1}</p></div>
            </div>
            <div className="flex min-w-0 flex-col p-4">
              <div className="flex flex-wrap gap-1.5"><span className={cn('rounded-md border px-2 py-0.5 text-[9px] font-bold', packageClasses[training.package])}>{training.package}</span><span className={cn('rounded-md border px-2 py-0.5 text-[9px] font-bold', riskClasses[training.risk])}>{training.risk}</span></div>
              <h2 className="mt-2.5 line-clamp-2 text-[15px] font-bold leading-5 text-ink-900">{training.name}</h2>
              <p className="mt-1.5 line-clamp-2 text-[11px] leading-4.5 text-ink-500">{training.description}</p>
              <div className="mt-3 flex gap-1.5"><CardStat icon={<Layers3 />} value={moduleCount(training)} label="Modül" /><CardStat icon={<PlayCircle />} value={contentCount(training)} label="İçerik" /><CardStat icon={<FileQuestion />} value={questionCount(training)} label="Soru" /><CardStat icon={<Users />} value={assigned} label="Atama" /></div>
              <div className="mt-auto flex items-center justify-between gap-2 border-t border-ink-100 pt-3"><span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-ink-500"><CircleGauge className="h-3.5 w-3.5 text-brand-600" /> Başarı barajı %{training.passingScore}</span><div className="flex gap-1.5"><Button size="sm" variant="outline" onClick={() => setSelectedId(training.id)}><Eye className="h-3.5 w-3.5" /> İncele</Button><Button size="sm" onClick={() => navigate(`/dashboard/egitimler/${training.id}/duzenle`)}>İçeriği yönet</Button></div></div>
            </div>
          </div>
        </motion.article>
      })}
    </motion.section> : <section className="rounded-2xl border border-dashed border-ink-200 bg-white px-6 py-20 text-center"><BookOpen className="mx-auto h-9 w-9 text-ink-300" /><p className="mt-3 text-sm font-semibold text-ink-700">Eğitim bulunamadı</p><p className="mt-1 text-xs text-ink-400">Arama metnini veya filtreleri değiştirerek tekrar deneyin.</p><Button className="mt-4" size="sm" variant="outline" onClick={() => { setSearch(''); setPackageFilter('Tümü'); setRiskFilter('Tümü') }}>Filtreleri temizle</Button></section>}

    {selectedTraining && <TrainingDrawer training={selectedTraining} assignmentCount={assignments.filter((assignment) => assignment.trainingId === selectedTraining.id).length} onClose={() => setSelectedId(null)} onEdit={() => navigate(`/dashboard/egitimler/${selectedTraining.id}/duzenle`)} onRemove={() => handleRemove(selectedTraining.id, selectedTraining.name)} />}
  </div>
}

function CardStat({ icon, value, label }: { icon: ReactNode; value: number; label: string }) {
  return <div className="min-w-0 flex-1 rounded-lg bg-ink-50 px-2 py-2 text-center"><span className="mx-auto flex w-fit text-ink-400 [&>svg]:h-3.5 [&>svg]:w-3.5">{icon}</span><p className="mt-1 text-xs font-bold text-ink-800">{value}</p><p className="text-[8px] font-medium uppercase tracking-wide text-ink-400">{label}</p></div>
}

function TrainingDrawer({ training, assignmentCount, onClose, onEdit, onRemove }: { training: Training; assignmentCount: number; onClose: () => void; onEdit: () => void; onRemove: () => void }) {
  const cover = coverImage(training)
  return <div className="fixed inset-0 z-50 flex justify-end bg-ink-950/35 backdrop-blur-[2px]" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><motion.aside initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex h-full w-full max-w-xl flex-col bg-white shadow-2xl">
    <div className="relative h-48 shrink-0 overflow-hidden bg-gradient-to-br from-[#07182d] to-brand-800">{cover && <img src={cover} alt="" className="h-full w-full object-cover" />}<div className="absolute inset-0 bg-gradient-to-t from-[#061326]/90 via-[#061326]/20 to-transparent" /><button onClick={onClose} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-xl bg-white/90 text-ink-700 shadow" aria-label="Kapat"><X className="h-4 w-4" /></button><div className="absolute bottom-4 left-5 right-5"><div className="flex gap-1.5"><span className="rounded-md bg-white/90 px-2 py-1 text-[9px] font-bold text-ink-800">{training.package}</span><span className="rounded-md bg-white/90 px-2 py-1 text-[9px] font-bold text-ink-800">{training.risk}</span></div><h2 className="mt-2 text-xl font-bold leading-6 text-white">{training.name}</h2></div></div>
    <div className="flex-1 space-y-5 overflow-y-auto p-5">
      <p className="text-sm leading-6 text-ink-600">{training.description}</p>
      <section className="flex gap-2"><DrawerMetric value={moduleCount(training)} label="Modül" /><DrawerMetric value={slideCount(training)} label="Slayt" /><DrawerMetric value={questionCount(training)} label="Soru" /><DrawerMetric value={assignmentCount} label="Atama" /></section>
      <section><div className="flex items-center justify-between"><h3 className="text-sm font-bold text-ink-900">Eğitim akışı</h3><span className="text-[10px] font-semibold text-ink-400">%{training.passingScore} başarı barajı</span></div><div className="mt-2 space-y-2">{training.modules.map((module, index) => <div key={module.id} className="rounded-xl border border-ink-200 p-3"><div className="flex items-start gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand-50 text-[11px] font-bold text-brand-700">{index + 1}</span><div className="min-w-0 flex-1"><p className="text-xs font-bold text-ink-800">{module.title}</p><div className="mt-1.5 flex flex-wrap gap-2 text-[10px] text-ink-400"><span className="inline-flex items-center gap-1"><BookOpen className="h-3 w-3" /> {module.items.length} içerik</span><span className="inline-flex items-center gap-1"><FileQuestion className="h-3 w-3" /> {module.quiz?.questions.length ?? 0} soru</span></div><div className="mt-2 flex flex-wrap gap-1">{module.items.map((item) => <span key={item.id} className="inline-flex items-center gap-1 rounded-md bg-ink-50 px-2 py-1 text-[9px] font-medium text-ink-500">{item.type === 'video' ? <Video className="h-2.5 w-2.5" /> : <ImageIcon className="h-2.5 w-2.5" />}{item.title}</span>)}</div></div><ChevronRight className="h-4 w-4 text-ink-300" /></div></div>)}</div></section>
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3"><div className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" /><div><p className="text-xs font-bold text-emerald-800">Eğitim yayına hazır</p><p className="mt-1 text-[10px] leading-4 text-emerald-700">Modül, içerik ve test yapısı katılımcı atamalarında kullanılabilir.</p></div></div></div>
    </div>
    <footer className="flex items-center justify-between gap-3 border-t border-ink-100 bg-ink-50/80 p-4"><button onClick={onRemove} className="inline-flex h-9 items-center gap-1.5 rounded-xl px-3 text-xs font-semibold text-rose-600 hover:bg-rose-50"><Trash2 className="h-3.5 w-3.5" /> Eğitimi sil</button><Button size="sm" onClick={onEdit}>İçeriği düzenle <ChevronRight className="h-3.5 w-3.5" /></Button></footer>
  </motion.aside></div>
}

function DrawerMetric({ value, label }: { value: number; label: string }) { return <div className="min-w-0 flex-1 rounded-xl border border-ink-200 bg-ink-50 p-3 text-center"><p className="text-lg font-bold text-ink-800">{value}</p><p className="text-[9px] font-semibold uppercase tracking-wide text-ink-400">{label}</p></div> }
