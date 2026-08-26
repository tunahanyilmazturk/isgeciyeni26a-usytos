import { AnimatePresence, motion } from 'framer-motion'
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Eye,
  Filter,
  Layers3,
  Maximize2,
  Minimize2,
  Search,
  Settings2,
  Sparkles,
  Users,
  X,
  Zap,
} from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { trainingCatalog, type Training, type TrainingPackage, type TrainingRisk } from '../data/trainings'

const riskClasses: Record<TrainingRisk, string> = {
  'Az Tehlikeli': 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Tehlikeli: 'border-amber-200 bg-amber-50 text-amber-700',
  'Çok Tehlikeli': 'border-rose-200 bg-rose-50 text-rose-700',
}

const packageClasses: Record<TrainingPackage, string> = {
  'Temel Paket': 'border-brand-200 bg-brand-50 text-brand-700',
  'Sektör Paketi': 'border-violet-200 bg-violet-50 text-violet-700',
}

function getTopicCount(training: Training) {
  return training.chapters.reduce((sum, chapter) => sum + chapter.topics.length, 0)
}

function getChapterCount(training: Training) {
  return training.chapters.length
}

/** Arama terimini metin içinde vurgular */
function highlightText(text: string, query: string) {
  if (!query.trim()) return text
  const normalized = text.toLocaleLowerCase('tr-TR')
  const q = query.trim().toLocaleLowerCase('tr-TR')
  const idx = normalized.indexOf(q)
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded bg-brand-100 px-0.5 font-semibold text-brand-800">{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  )
}

export function TrainingsPage() {
  const [search, setSearch] = useState('')
  const [packageFilter, setPackageFilter] = useState<'all' | TrainingPackage>('all')
  const [riskFilter, setRiskFilter] = useState<'all' | TrainingRisk>('all')
  const [expanded, setExpanded] = useState<string[]>(['base-low'])
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null)

  const filteredTrainings = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('tr-TR')
    return trainingCatalog.filter((training) => {
      const haystack = `${training.name} ${training.description} ${training.risk} ${training.chapters.map((chapter) => `${chapter.title} ${chapter.topics.join(' ')}`).join(' ')}`.toLocaleLowerCase('tr-TR')
      return (!query || haystack.includes(query)) && (packageFilter === 'all' || training.package === packageFilter) && (riskFilter === 'all' || training.risk === riskFilter)
    })
  }, [search, packageFilter, riskFilter])

  const baseTrainings = filteredTrainings.filter((training) => training.package === 'Temel Paket')
  const sectorTrainings = filteredTrainings.filter((training) => training.package === 'Sektör Paketi')
  const baseCount = trainingCatalog.filter((training) => training.package === 'Temel Paket').length
  const sectorCount = trainingCatalog.filter((training) => training.package === 'Sektör Paketi').length
  const chapterCount = trainingCatalog.reduce((sum, training) => sum + getChapterCount(training), 0)
  const topicCount = trainingCatalog.reduce((sum, training) => sum + getTopicCount(training), 0)

  const toggleTraining = useCallback((id: string) => {
    setExpanded((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }, [])

  const expandAll = useCallback(() => {
    setExpanded(filteredTrainings.map((t) => t.id))
  }, [filteredTrainings])

  const collapseAll = useCallback(() => {
    setExpanded([])
  }, [])

  const resetFilters = useCallback(() => {
    setSearch('')
    setPackageFilter('all')
    setRiskFilter('all')
  }, [])

  const handlePreview = useCallback((training: Training) => {
    setSelectedTraining(training)
  }, [])

  const hasActiveFilters = search || packageFilter !== 'all' || riskFilter !== 'all'
  const allExpanded = expanded.length === filteredTrainings.length && filteredTrainings.length > 0

  return (
    <div className="space-y-7">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-ink-400">
            <span>Ana menü</span><span>/</span><span className="text-ink-600">Eğitimler</span>
          </div>
          <h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[30px]">Eğitim kataloğu</h1>
          <p className="mt-1.5 max-w-2xl text-sm text-ink-500">Temel ve sektöre özel İSG eğitim içeriklerini keşfedin, konu hiyerarşisini inceleyin.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" leftIcon={<Settings2 className="h-4 w-4" />} onClick={() => toast.info('Katalog ayarları hazırlanacak.')}>Katalog ayarları</Button>
          <Button size="md" leftIcon={<Sparkles className="h-4 w-4" />} onClick={() => toast.info('Yeni eğitim oluşturma ekranı hazırlanacak.')}>Yeni eğitim</Button>
        </div>
      </motion.div>

      {/* Stats Banner — brand-900 petrol yeşili, proje tasarım dili */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.04 }}
        className="relative overflow-hidden rounded-2xl bg-brand-900 p-5 text-white shadow-[0_12px_32px_-18px_rgba(18,70,65,0.5)] sm:p-6"
      >
        <div className="absolute -right-12 -top-20 h-56 w-56 rounded-full border-[26px] border-brand-800/50" aria-hidden />
        <div className="absolute -bottom-24 right-40 h-44 w-44 rounded-full border-[18px] border-brand-800/40" aria-hidden />
        <div className="relative flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-200">
              <BookOpen className="h-3.5 w-3.5" /> İçerik merkezi
            </div>
            <h2 className="text-lg font-semibold tracking-[-0.02em] sm:text-xl">Doğru eğitim, doğru risk seviyesinde.</h2>
            <p className="mt-1.5 max-w-xl text-sm leading-6 text-brand-100/75">Katılımcılarınıza atayacağınız eğitimleri paket, tehlike sınıfı ve içerik yapısına göre hızlıca bulun.</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-white/10 px-4 py-3">
              <p className="text-2xl font-bold tabular-nums">{baseCount}</p>
              <p className="mt-1 text-[10px] text-brand-100/70">temel eğitim</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/10 px-4 py-3">
              <p className="text-2xl font-bold tabular-nums">{sectorCount}</p>
              <p className="mt-1 text-[10px] text-brand-100/70">sektör eğitimi</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/10 px-4 py-3">
              <p className="text-2xl font-bold tabular-nums">{chapterCount}</p>
              <p className="mt-1 text-[10px] text-brand-100/70">alt başlık</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/10 px-4 py-3">
              <p className="text-2xl font-bold tabular-nums">{topicCount}</p>
              <p className="mt-1 text-[10px] text-brand-100/70">konu</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Arama + Filtre + Tümünü Aç/Kapat */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.08 }}
        className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6"
      >
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
          <label className="min-w-0 flex-1">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">Eğitim ara</span>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Eğitim, alt başlık veya konu adıyla ara..."
                className="h-12 w-full rounded-xl border border-ink-200 bg-ink-50/50 pl-10 pr-10 text-sm text-ink-800 outline-none transition-all placeholder:text-ink-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
              />
              {search && (
                <button type="button" onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-ink-400 hover:bg-ink-100 hover:text-ink-600" aria-label="Aramayı temizle">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </label>
          <div className="grid gap-2 sm:grid-cols-2 xl:w-[390px]">
            <label>
              <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink-400">Paket</span>
              <select value={packageFilter} onChange={(event) => setPackageFilter(event.target.value as 'all' | TrainingPackage)} className="h-10 w-full rounded-xl border border-ink-200 bg-white px-3 text-xs font-semibold text-ink-700 outline-none focus:border-brand-500">
                <option value="all">Tüm paketler</option>
                <option value="Temel Paket">Temel Paket</option>
                <option value="Sektör Paketi">Sektör Paketi</option>
              </select>
            </label>
            <label>
              <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink-400">Tehlike sınıfı</span>
              <select value={riskFilter} onChange={(event) => setRiskFilter(event.target.value as 'all' | TrainingRisk)} className="h-10 w-full rounded-xl border border-ink-200 bg-white px-3 text-xs font-semibold text-ink-700 outline-none focus:border-brand-500">
                <option value="all">Tüm sınıflar</option>
                <option value="Az Tehlikeli">Az tehlikeli</option>
                <option value="Tehlikeli">Tehlikeli</option>
                <option value="Çok Tehlikeli">Çok tehlikeli</option>
              </select>
            </label>
          </div>
          <div className="flex shrink-0 gap-2">
            <button type="button" onClick={resetFilters} disabled={!hasActiveFilters} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-ink-200 px-3.5 text-xs font-semibold text-ink-600 transition-colors hover:bg-ink-50 disabled:opacity-40 disabled:hover:bg-transparent">
              <Filter className="h-4 w-4" /> Temizle
            </button>
            <button type="button" onClick={allExpanded ? collapseAll : expandAll} disabled={filteredTrainings.length === 0} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-ink-200 px-3.5 text-xs font-semibold text-ink-600 transition-colors hover:bg-ink-50 disabled:opacity-40 disabled:hover:bg-transparent">
              {allExpanded ? <><Minimize2 className="h-4 w-4" /> Tümünü kapat</> : <><Maximize2 className="h-4 w-4" /> Tümünü aç</>}
            </button>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-ink-100 pt-4 text-xs text-ink-400">
          <span className="font-medium text-ink-600">{filteredTrainings.length} eğitim gösteriliyor</span>
          <span>·</span>
          <span>Toplam {trainingCatalog.length} katalog kaydı</span>
          {search && <span className="rounded-full bg-brand-50 px-2.5 py-1 font-semibold text-brand-700">"{search}" araması</span>}
          {packageFilter !== 'all' && <span className="rounded-full bg-brand-50 px-2.5 py-1 font-semibold text-brand-700">{packageFilter}</span>}
          {riskFilter !== 'all' && <span className="rounded-full bg-brand-50 px-2.5 py-1 font-semibold text-brand-700">{riskFilter}</span>}
        </div>
      </motion.section>

      {/* Eğitim grupları */}
      <div className="space-y-10">
        {([
          ['Temel Paket', baseTrainings, 'Temel İSG eğitim paketleri; katılımcılara doğrudan atanabilir.', 'brand'] as const,
          ['Sektör Paketi', sectorTrainings, 'İşe ve işyerine özel riskleri kapsayan sektörel eğitim içerikleri.', 'violet'] as const,
        ]).map(([packageName, trainings, description, tone]) => (
          <motion.section
            key={packageName}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.12 }}
            aria-labelledby={`training-${packageName}`}
          >
            {/* Grup başlığı */}
            <div className={cn(
              'mb-4 flex items-center gap-3 rounded-2xl border px-5 py-4',
              tone === 'brand' ? 'border-brand-100 bg-brand-50/60' : 'border-violet-100 bg-violet-50/50',
            )}>
              <span className={cn(
                'grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white',
                tone === 'brand' ? 'text-brand-700 ring-1 ring-brand-100' : 'text-violet-700 ring-1 ring-violet-100',
              )} aria-hidden>
                {tone === 'brand' ? <Layers3 className="h-[18px] w-[18px]" /> : <Zap className="h-[18px] w-[18px]" />}
              </span>
              <div className="min-w-0 flex-1">
                <h2 id={`training-${packageName}`} className="text-sm font-bold tracking-tight text-ink-900">
                  {packageName === 'Temel Paket' ? '1–3. Konu (Temel Paket)' : '4. Konu (Sektör Paketi)'}
                </h2>
                <p className="mt-0.5 text-xs text-ink-500">{description}</p>
              </div>
              <span className={cn(
                'shrink-0 rounded-full border px-3 py-1 text-[11px] font-semibold tabular-nums',
                tone === 'brand' ? 'border-brand-200 bg-white text-brand-700' : 'border-violet-200 bg-white text-violet-700',
              )}>
                {trainings.length} eğitim
              </span>
            </div>

            {/* Eğitim kartları */}
            <div className="space-y-2.5">
              {trainings.map((training) => {
                const isExpanded = expanded.includes(training.id)
                const topicCount = getTopicCount(training)
                const chapterCount = getChapterCount(training)
                const barColor = tone === 'brand' ? 'bg-brand-500' : 'bg-violet-500'
                const dotColor = tone === 'brand' ? 'bg-brand-500' : 'bg-violet-500'

                return (
                  <article
                    key={training.id}
                    className={cn(
                      'group overflow-hidden rounded-2xl border bg-white shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] transition-all',
                      isExpanded ? 'border-ink-300 shadow-lg shadow-ink-900/5' : 'border-ink-200/80 hover:border-ink-300',
                    )}
                  >
                    {/* Summary satırı */}
                    <div className="flex cursor-pointer items-center gap-3 px-4 py-3.5 sm:px-5 sm:py-4" onClick={() => toggleTraining(training.id)}>
                      <span className={cn('h-9 w-1 shrink-0 rounded-full transition-opacity', barColor, isExpanded ? 'opacity-100' : 'opacity-60')} aria-hidden />

                      <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-ink-800 group-hover:text-ink-900">
                        {highlightText(training.name, search)}
                      </span>

                      <span className="hidden items-center gap-2 sm:flex">
                        <span className={cn('rounded-lg border px-2.5 py-1 text-[10px] font-semibold', riskClasses[training.risk])}>
                          {training.risk}
                        </span>
                        <span className="rounded-lg bg-ink-50 px-2.5 py-1 text-[10px] font-medium text-ink-500">
                          {chapterCount} başlık · {topicCount} konu
                        </span>
                      </span>

                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handlePreview(training) }}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-ink-900 px-3 py-2 text-[11px] font-bold text-white transition-colors hover:bg-brand-700"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Önizle</span>
                      </button>

                      <ChevronDown className={cn('h-4 w-4 shrink-0 text-ink-400 transition-transform', isExpanded && 'rotate-180')} />
                    </div>

                    {/* Açılır içerik */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-ink-100 bg-ink-50/30 px-5 pb-5 pt-4">
                            <p className="mb-4 text-xs leading-relaxed text-ink-500">{training.description}</p>

                            <div className="mb-4 flex items-center gap-2">
                              <span className={cn('text-[10px] font-bold uppercase tracking-[0.14em]', tone === 'brand' ? 'text-brand-700' : 'text-violet-700')}>İçerik yapısı</span>
                              <span className="h-px flex-1 bg-ink-200" />
                              <span className="text-[10px] text-ink-400">{chapterCount} alt başlık · {topicCount} konu</span>
                            </div>

                            <div className="space-y-2">
                              {training.chapters.map((chapter, index) => (
                                <div key={chapter.id} className="overflow-hidden rounded-xl border border-ink-200/80 bg-white">
                                  <div className="flex items-center gap-3 bg-ink-50/80 px-4 py-3">
                                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-ink-100 text-[10px] font-bold text-brand-700">{index + 1}</span>
                                    <span className="min-w-0 flex-1 text-xs font-semibold text-ink-700">{highlightText(chapter.title, search)}</span>
                                    <span className="text-[10px] text-ink-400">{chapter.topics.length} konu</span>
                                  </div>
                                  <ul className="divide-y divide-ink-100 px-4">
                                    {chapter.topics.map((topic) => (
                                      <li key={topic} className="flex items-center gap-2.5 py-2 text-xs leading-5 text-ink-500">
                                        <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', dotColor)} />
                                        <span className="min-w-0 flex-1">{highlightText(topic, search)}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                )
              })}
            </div>

            {!trainings.length && (
              <div className="rounded-2xl border border-dashed border-ink-200 bg-white px-6 py-12 text-center">
                <Search className="mx-auto h-7 w-7 text-ink-300" />
                <p className="mt-3 text-sm font-semibold text-ink-700">Bu filtrelerle eğitim bulunamadı</p>
                <button type="button" onClick={resetFilters} className="mt-2 text-xs font-semibold text-brand-700">Filtreleri temizle</button>
              </div>
            )}
          </motion.section>
        ))}
      </div>

      {/* Önizleme drawer */}
      {selectedTraining && (
        <div className="fixed inset-0 z-50 bg-ink-900/20 backdrop-blur-[2px]" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedTraining(null) }}>
          <motion.aside initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} className="ml-auto flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-ink-200 bg-white shadow-[-20px_0_60px_-28px_rgba(17,24,39,0.32)]">
            <div className="border-b border-ink-100 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-xl', selectedTraining.package === 'Temel Paket' ? 'bg-brand-50 text-brand-700' : 'bg-violet-50 text-violet-700')}>
                    <BookOpen className="h-5 w-5" />
                  </span>
                  <div>
                    <span className={cn('inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold', packageClasses[selectedTraining.package])}>{selectedTraining.package}</span>
                    <h2 className="mt-2 text-base font-bold text-ink-900">{selectedTraining.name}</h2>
                  </div>
                </div>
                <button type="button" onClick={() => setSelectedTraining(null)} className="rounded-xl p-2 text-ink-400 hover:bg-ink-100" aria-label="Önizlemeyi kapat">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-4 text-sm leading-6 text-ink-500">{selectedTraining.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className={cn('rounded-lg border px-2.5 py-1 text-[11px] font-semibold', riskClasses[selectedTraining.risk])}>{selectedTraining.risk}</span>
                <span className="rounded-lg bg-ink-100 px-2.5 py-1 text-[11px] font-medium text-ink-600">{getChapterCount(selectedTraining)} alt başlık</span>
                <span className="rounded-lg bg-ink-100 px-2.5 py-1 text-[11px] font-medium text-ink-600">{getTopicCount(selectedTraining)} konu</span>
              </div>
            </div>
            <div className="flex-1 space-y-4 p-6">
              {selectedTraining.chapters.map((chapter, index) => (
                <div key={chapter.id} className="rounded-xl border border-ink-200 p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-50 text-[11px] font-bold text-brand-700">{index + 1}</span>
                    <h3 className="text-sm font-semibold text-ink-800">{chapter.title}</h3>
                  </div>
                  <ul className="mt-3 space-y-2.5">
                    {chapter.topics.map((topic) => (
                      <li key={topic} className="flex gap-2.5 text-xs leading-5 text-ink-500">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" />{topic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-ink-100 p-6">
              <Button className="w-full" leftIcon={<Users className="h-4 w-4" />} onClick={() => toast.info('Katılımcı eğitim atama ekranı hazırlanacak.')}>Bu eğitimi ata</Button>
            </div>
          </motion.aside>
        </div>
      )}
    </div>
  )
}
