import { AnimatePresence, motion } from 'framer-motion'
import {
  BookOpen,
  ChevronDown,
  Eye,
  FileText,
  Layers3,
  ListCollapse,
  Maximize2,
  Minimize2,
  Search,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  X,
  Zap,
} from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button, Pagination, ViewToggle, type ViewMode, paginate, getPaginationIndices } from '@/components/ui'
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
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [packageFilter, setPackageFilter] = useState<'all' | TrainingPackage>('all')
  const [riskFilter, setRiskFilter] = useState<'all' | TrainingRisk>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [expanded, setExpanded] = useState<string[]>([])
  const [view, setView] = useState<ViewMode>('table')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const filteredTrainings = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('tr-TR')
    return trainingCatalog.filter((training) => {
      const haystack = `${training.name} ${training.description} ${training.risk} ${training.chapters.map((chapter) => `${chapter.title} ${chapter.topics.join(' ')}`).join(' ')}`.toLocaleLowerCase('tr-TR')
      return (!query || haystack.includes(query)) && (packageFilter === 'all' || training.package === packageFilter) && (riskFilter === 'all' || training.risk === riskFilter)
    })
  }, [search, packageFilter, riskFilter])

  const totalPages = Math.max(1, Math.ceil(filteredTrainings.length / pageSize))
  const paginatedTrainings = paginate(filteredTrainings, currentPage, pageSize)
  const { startIndex, endIndex } = getPaginationIndices(currentPage, pageSize, filteredTrainings.length)

  const baseCount = trainingCatalog.filter((t) => t.package === 'Temel Paket').length
  const sectorCount = trainingCatalog.filter((t) => t.package === 'Sektör Paketi').length
  const chapterCount = trainingCatalog.reduce((sum, t) => sum + getChapterCount(t), 0)
  const topicCount = trainingCatalog.reduce((sum, t) => sum + getTopicCount(t), 0)

  const filterCount = (packageFilter !== 'all' ? 1 : 0) + (riskFilter !== 'all' ? 1 : 0)
  const hasActiveFilters = search || packageFilter !== 'all' || riskFilter !== 'all'
  const allExpanded = expanded.length === paginatedTrainings.length && paginatedTrainings.length > 0

  const toggleTraining = useCallback((id: string) => {
    setExpanded((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }, [])

  const expandAll = useCallback(() => setExpanded(paginatedTrainings.map((t) => t.id)), [paginatedTrainings])
  const collapseAll = useCallback(() => setExpanded([]), [])

  function clearFilters() {
    setSearch('')
    setPackageFilter('all')
    setRiskFilter('all')
  }

  const handlePreview = useCallback((training: Training) => {
    navigate(`/dashboard/egitimler/${training.id}/katilimci-onizleme`)
  }, [navigate])

  return (
    <div className="space-y-7">
      {/* Header — standart proje pattern'i */}
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

      {/* Stats — brand-900 hero (Diğer sayfalarla aynı hero pattern) */}
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.04 }} className="relative overflow-hidden rounded-2xl bg-brand-900 p-5 text-white shadow-[0_12px_32px_-18px_rgba(18,70,65,0.5)] sm:p-6">
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

      {/* Ana içerik kartı — standart wrapper */}
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.08 }} className="min-w-0 rounded-2xl border border-ink-200/80 bg-white shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]">
        {/* Filtre header — diğer sayfalarla aynı yapı */}
        <div className="border-b border-ink-100 p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-ink-900">Eğitim listesi</h2>
                <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700">{filteredTrainings.length} kayıt</span>
              </div>
              <p className="mt-1 text-xs text-ink-400">Paket, tehlike sınıfı ve içerik yapısına göre filtreleyin.</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Eğitim, başlık veya konu ara..." className="h-10 w-full rounded-xl border border-ink-200 bg-ink-50/50 pl-9 pr-9 text-sm text-ink-800 outline-none transition-all placeholder:text-ink-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10 sm:w-64" />
                {search && <button type="button" onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-0.5 text-ink-400 hover:bg-ink-100 hover:text-ink-600" aria-label="Temizle"><X className="h-3.5 w-3.5" /></button>}
              </div>
              <button type="button" onClick={() => setShowFilters((c) => !c)} className={cn('inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-3.5 text-xs font-semibold transition-colors', showFilters || filterCount ? 'border-brand-200 bg-brand-50 text-brand-700' : 'border-ink-200 text-ink-600 hover:bg-ink-50')}>
                <SlidersHorizontal className="h-4 w-4" /> Filtreler {filterCount > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand-600 px-1 text-[10px] text-white">{filterCount}</span>}
              </button>
              <ViewToggle view={view} onChange={setView} />
            </div>
          </div>

          {showFilters && (
            <div className="mt-5 grid gap-3 border-t border-ink-100 pt-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              <label>
                <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink-400">Paket</span>
                <div className="relative">
                  <select value={packageFilter} onChange={(event) => setPackageFilter(event.target.value as 'all' | TrainingPackage)} className="h-10 w-full appearance-none rounded-xl border border-ink-200 bg-white px-3 pr-8 text-xs font-medium text-ink-700 outline-none transition-colors focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10">
                    <option value="all">Tüm paketler</option>
                    <option value="Temel Paket">Temel Paket</option>
                    <option value="Sektör Paketi">Sektör Paketi</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                </div>
              </label>
              <label>
                <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink-400">Tehlike sınıfı</span>
                <div className="relative">
                  <select value={riskFilter} onChange={(event) => setRiskFilter(event.target.value as 'all' | TrainingRisk)} className="h-10 w-full appearance-none rounded-xl border border-ink-200 bg-white px-3 pr-8 text-xs font-medium text-ink-700 outline-none transition-colors focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10">
                    <option value="all">Tüm sınıflar</option>
                    <option value="Az Tehlikeli">Az Tehlikeli</option>
                    <option value="Tehlikeli">Tehlikeli</option>
                    <option value="Çok Tehlikeli">Çok Tehlikeli</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                </div>
              </label>
              <div className="flex items-end">
                <button type="button" onClick={clearFilters} disabled={!hasActiveFilters} className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg px-3 text-xs font-semibold text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-800 disabled:opacity-40">
                  <X className="h-3.5 w-3.5" /> Filtreleri temizle
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tümünü aç/kapat barı */}
        {view === 'table' && paginatedTrainings.length > 0 && (
          <div className="flex items-center justify-between border-b border-ink-100 px-5 py-2.5 sm:px-6">
            <span className="text-[11px] font-medium text-ink-400">{expanded.length} / {paginatedTrainings.length} eğitim açık</span>
            <button type="button" onClick={allExpanded ? collapseAll : expandAll} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-brand-700 transition-colors hover:bg-brand-50">
              {allExpanded ? <><Minimize2 className="h-3.5 w-3.5" /> Tümünü kapat</> : <><Maximize2 className="h-3.5 w-3.5" /> Tümünü aç</>}
            </button>
          </div>
        )}

        {/* Liste görünümü — accordion */}
        {view === 'table' && (
          <div className="divide-y divide-ink-100">
            {paginatedTrainings.map((training) => {
              const isExpanded = expanded.includes(training.id)
              const topicCount = getTopicCount(training)
              const chapterCount = getChapterCount(training)
              const isBase = training.package === 'Temel Paket'

              return (
                <article key={training.id} className={cn('transition-colors', isExpanded ? 'bg-brand-50/30' : 'hover:bg-ink-50/40')}>
                  {/* Summary satırı */}
                  <div className="flex cursor-pointer items-center gap-3 px-5 py-4 sm:px-6" onClick={() => toggleTraining(training.id)}>
                    <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-xl', isBase ? 'bg-brand-50 text-brand-700' : 'bg-violet-50 text-violet-700')}>
                      {isBase ? <Layers3 className="h-5 w-5" /> : <Zap className="h-5 w-5" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink-800">{highlightText(training.name, search)}</p>
                      <p className="mt-0.5 truncate text-[11px] text-ink-400">{training.description}</p>
                    </div>
                    <span className="hidden items-center gap-2 sm:flex">
                      <span className={cn('rounded-lg border px-2.5 py-1 text-[10px] font-semibold', packageClasses[training.package])}>{training.package}</span>
                      <span className={cn('rounded-lg border px-2.5 py-1 text-[10px] font-semibold', riskClasses[training.risk])}>{training.risk}</span>
                      <span className="rounded-lg bg-ink-50 px-2.5 py-1 text-[10px] font-medium text-ink-500">{chapterCount} başlık · {topicCount} konu</span>
                    </span>
                    <button type="button" onClick={(e) => { e.stopPropagation(); handlePreview(training) }} className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-ink-900 px-3 py-2 text-[11px] font-bold text-white transition-colors hover:bg-brand-700">
                      <Eye className="h-3.5 w-3.5" /><span className="hidden sm:inline">Önizle</span>
                    </button>
                    <ChevronDown className={cn('h-4 w-4 shrink-0 text-ink-400 transition-transform', isExpanded && 'rotate-180')} />
                  </div>

                  {/* Açılır içerik */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                        <div className="px-5 pb-5 sm:px-6">
                          <div className="mb-3 flex items-center gap-2">
                            <span className={cn('text-[10px] font-bold uppercase tracking-[0.14em]', isBase ? 'text-brand-700' : 'text-violet-700')}>İçerik yapısı</span>
                            <span className="h-px flex-1 bg-ink-200" />
                            <span className="text-[10px] text-ink-400">{chapterCount} alt başlık · {topicCount} konu</span>
                          </div>
                          <div className="space-y-2">
                            {training.chapters.map((chapter, index) => (
                              <div key={chapter.id} className="overflow-hidden rounded-xl border border-ink-200/80 bg-white">
                                <div className="flex items-center gap-3 bg-ink-50/80 px-4 py-2.5">
                                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-ink-100 text-[10px] font-bold text-brand-700">{index + 1}</span>
                                  <span className="min-w-0 flex-1 text-xs font-semibold text-ink-700">{highlightText(chapter.title, search)}</span>
                                  <span className="text-[10px] text-ink-400">{chapter.topics.length} konu</span>
                                </div>
                                <ul className="divide-y divide-ink-100 px-4">
                                  {chapter.topics.map((topic) => (
                                    <li key={topic} className="flex items-center gap-2.5 py-2 text-xs leading-5 text-ink-500">
                                      <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', isBase ? 'bg-brand-500' : 'bg-violet-500')} />
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

            {filteredTrainings.length === 0 && (
              <div className="px-6 py-16 text-center">
                <Search className="mx-auto h-8 w-8 text-ink-300" />
                <p className="mt-3 text-sm font-semibold text-ink-700">Eğitim bulunamadı</p>
                <p className="mt-1 text-xs text-ink-400">Arama veya filtre kriterlerini değiştirerek tekrar deneyin.</p>
                {hasActiveFilters && <button type="button" onClick={clearFilters} className="mt-4 text-xs font-semibold text-brand-700 hover:text-brand-800">Filtreleri temizle</button>}
              </div>
            )}
          </div>
        )}

        {/* Kart görünümü — grid */}
        {view === 'card' && (
          <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 sm:p-6">
            {paginatedTrainings.map((training) => {
              const isBase = training.package === 'Temel Paket'
              return (
                <div key={training.id} className="cursor-pointer rounded-2xl border border-ink-200/80 bg-white p-5 transition-all hover:border-brand-300 hover:shadow-[0_8px_24px_-12px_rgba(17,24,39,0.18)]" onClick={() => handlePreview(training)}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className={cn('grid h-11 w-11 shrink-0 place-items-center rounded-xl', isBase ? 'bg-brand-50 text-brand-700' : 'bg-violet-50 text-violet-700')}>
                        {isBase ? <Layers3 className="h-5 w-5" /> : <Zap className="h-5 w-5" />}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-ink-800">{highlightText(training.name, search)}</p>
                        <p className="mt-0.5 truncate text-[11px] text-ink-400">{training.package}</p>
                      </div>
                    </div>
                    <span className={cn('shrink-0 rounded-lg border px-2 py-0.5 text-[10px] font-semibold', riskClasses[training.risk])}>{training.risk}</span>
                  </div>
                  <div className="mt-4 space-y-2 border-t border-ink-100 pt-3">
                    <p className="line-clamp-2 text-[11px] leading-relaxed text-ink-500">{training.description}</p>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="inline-flex items-center gap-1.5 font-medium text-ink-600"><ListCollapse className="h-3.5 w-3.5 text-ink-400" />{getChapterCount(training)} başlık</span>
                      <span className="inline-flex items-center gap-1.5 font-medium text-ink-600"><FileText className="h-3.5 w-3.5 text-ink-400" />{getTopicCount(training)} konu</span>
                    </div>
                  </div>
                </div>
              )
            })}
            {filteredTrainings.length === 0 && (
              <div className="col-span-full py-16 text-center">
                <Search className="mx-auto h-8 w-8 text-ink-300" />
                <p className="mt-3 text-sm font-semibold text-ink-700">Eğitim bulunamadı</p>
              </div>
            )}
          </div>
        )}

        {/* Pagination — diğer sayfalarla aynı */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredTrainings.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1) }}
          startIndex={startIndex}
          endIndex={endIndex}
          itemName="eğitim"
        />
      </motion.section>
    </div>
  )
}
