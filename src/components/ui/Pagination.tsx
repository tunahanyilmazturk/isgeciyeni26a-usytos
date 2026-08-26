import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (size: number) => void
  pageSizeOptions?: number[]
  /** Başlangıç indeksi (0-based) */
  startIndex: number
  /** Bitiş indeksi (0-based, dahil) */
  endIndex: number
  itemName?: string
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
  startIndex,
  endIndex,
  itemName = 'kayıt',
}: PaginationProps) {
  if (totalItems === 0) return null

  const canPrev = currentPage > 1
  const canNext = currentPage < totalPages

  // Sayfa numaralarını hesapla (max 5 buton göster)
  const pages: (number | '...')[] = []
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    pages.push(1)
    if (currentPage > 3) pages.push('...')
    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)
    for (let i = start; i <= end; i++) pages.push(i)
    if (currentPage < totalPages - 2) pages.push('...')
    pages.push(totalPages)
  }

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-ink-100 px-4 py-3 text-xs text-ink-500 sm:flex-row sm:px-6">
      {/* Sol: bilgi + sayfa boyutu */}
      <div className="flex items-center gap-3">
        <span className="whitespace-nowrap">
          {startIndex + 1}–{Math.min(endIndex + 1, totalItems)} / {totalItems} {itemName}
        </span>
        {onPageSizeChange && (
          <span className="flex items-center gap-1.5">
            <span className="hidden text-ink-400 sm:inline">Sayfa:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="h-7 rounded-lg border border-ink-200 bg-white px-2 text-xs font-medium text-ink-700 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </span>
        )}
      </div>

      {/* Sağ: sayfa navigasyonu */}
      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onPageChange(1)}
            disabled={!canPrev}
            className="grid h-7 w-7 place-items-center rounded-lg border border-ink-200 text-ink-500 transition-colors hover:bg-ink-50 disabled:opacity-40 disabled:hover:bg-transparent"
            aria-label="İlk sayfa"
          >
            <ChevronsLeft className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!canPrev}
            className="grid h-7 w-7 place-items-center rounded-lg border border-ink-200 text-ink-500 transition-colors hover:bg-ink-50 disabled:opacity-40 disabled:hover:bg-transparent"
            aria-label="Önceki sayfa"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>

          {pages.map((page, idx) =>
            page === '...' ? (
              <span key={`ellipsis-${idx}`} className="px-1 text-ink-400">…</span>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                className={cn(
                  'grid h-7 min-w-7 place-items-center rounded-lg px-2 text-xs font-semibold transition-colors',
                  page === currentPage
                    ? 'bg-brand-600 text-white'
                    : 'border border-ink-200 text-ink-600 hover:bg-ink-50',
                )}
              >
                {page}
              </button>
            ),
          )}

          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!canNext}
            className="grid h-7 w-7 place-items-center rounded-lg border border-ink-200 text-ink-500 transition-colors hover:bg-ink-50 disabled:opacity-40 disabled:hover:bg-transparent"
            aria-label="Sonraki sayfa"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            disabled={!canNext}
            className="grid h-7 w-7 place-items-center rounded-lg border border-ink-200 text-ink-500 transition-colors hover:bg-ink-50 disabled:opacity-40 disabled:hover:bg-transparent"
            aria-label="Son sayfa"
          >
            <ChevronsRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  )
}

/** Bir array'ı sayfalara bölme yardımcısı */
export function paginate<T>(items: T[], currentPage: number, pageSize: number): T[] {
  const start = (currentPage - 1) * pageSize
  return items.slice(start, start + pageSize)
}

/** Sayfalama indekslerini hesaplama yardımcısı */
export function getPaginationIndices(currentPage: number, pageSize: number, totalItems: number) {
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1)
  return { startIndex, endIndex }
}
