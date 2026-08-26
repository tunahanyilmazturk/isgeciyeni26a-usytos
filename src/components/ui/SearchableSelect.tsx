import { ChevronDown, Search, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface SearchableSelectOption {
  value: string
  label: string
  hint?: string
}

/**
 * Arama özellikli select (combobox).
 * Çok sayıda seçenek varsa arama ile filtreleme yapmaya olanak tanır.
 */
export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = 'Seçiniz…',
  searchPlaceholder = 'Ara…',
  emptyText = 'Eşleşen kayıt bulunamadı.',
  className,
  size = 'md',
}: {
  options: SearchableSelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  className?: string
  size?: 'sm' | 'md'
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr-TR')
    if (!q) return options
    return options.filter((o) => o.label.toLocaleLowerCase('tr-TR').includes(q))
  }, [options, query])

  function select(value: string) {
    onChange(value)
    setOpen(false)
    setQuery('')
  }

  const selectedOption = options.find((o) => o.value === value)

  const heightClass = size === 'sm' ? 'h-9 text-xs' : 'h-12 text-sm'
  const paddingClass = size === 'sm' ? 'px-2.5' : 'px-3.5'

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex w-full items-center justify-between gap-2 rounded-lg border bg-white outline-none transition-all hover:border-ink-300',
          heightClass,
          paddingClass,
          open ? 'border-brand-500 ring-2 ring-brand-500/10' : 'border-ink-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10',
        )}
      >
        <span className={cn('truncate', selectedOption ? 'text-ink-800' : 'text-ink-300')}>
          {selectedOption?.label ?? placeholder}
        </span>
        <div className="flex shrink-0 items-center gap-1">
          {selectedOption && (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => { e.stopPropagation(); select('') }}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); select('') } }}
              className="grid h-4 w-4 place-items-center rounded text-ink-300 hover:bg-ink-100 hover:text-ink-600"
              aria-label="Temizle"
            >
              <X className="h-3 w-3" />
            </span>
          )}
          <ChevronDown className={cn('h-4 w-4 shrink-0 text-ink-400 transition-transform', open && 'rotate-180')} />
        </div>
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-30 mt-1 overflow-hidden rounded-lg border border-ink-200 bg-white shadow-xl shadow-ink-900/10">
          <div className="relative border-b border-ink-100 p-2">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-400" strokeWidth={1.7} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              autoFocus
              className="h-8 w-full rounded-md border border-ink-200 bg-ink-50/40 pl-8 pr-3 text-xs text-ink-800 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10"
            />
          </div>
          <div className="max-h-[200px] overflow-y-auto py-1">
            {filtered.length > 0 ? (
              filtered.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => select(option.value)}
                  className={cn(
                    'flex w-full items-center justify-between gap-2 px-3 py-2 text-left transition-colors hover:bg-brand-50/50',
                    size === 'sm' ? 'text-xs' : 'text-sm',
                    value === option.value ? 'bg-brand-50/70 font-semibold text-brand-700' : 'text-ink-700',
                  )}
                >
                  <span className="truncate">{option.label}</span>
                  {option.hint && (
                    <span className="shrink-0 rounded-full bg-ink-100 px-2 py-0.5 text-[10px] font-medium text-ink-500">{option.hint}</span>
                  )}
                </button>
              ))
            ) : (
              <div className="px-3 py-5 text-center text-xs text-ink-400">
                {emptyText}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
