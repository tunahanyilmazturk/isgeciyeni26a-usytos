import { ChevronDown, Search, X } from 'lucide-react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface SearchableSelectOption {
  value: string
  label: string
  hint?: string
}

/** Arama özellikli, klavye ile kullanılabilen combobox/listbox. */
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
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const listboxId = useId()

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr-TR')
    if (!q) return options
    return options.filter((o) => o.label.toLocaleLowerCase('tr-TR').includes(q))
  }, [options, query])

  const selectedOption = options.find((o) => o.value === value)
  const heightClass = size === 'sm' ? 'h-9 text-xs' : 'h-12 text-sm'
  const paddingClass = size === 'sm' ? 'px-2.5' : 'px-3.5'

  function close() {
    setOpen(false)
    setQuery('')
    triggerRef.current?.focus()
  }

  function openList() {
    const selectedIndex = filtered.findIndex((option) => option.value === value)
    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0)
    setOpen(true)
  }

  function select(nextValue: string) {
    onChange(nextValue)
    close()
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) close()
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      window.setTimeout(() => searchRef.current?.focus(), 0)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  useEffect(() => {
    if (highlightedIndex >= filtered.length) setHighlightedIndex(Math.max(filtered.length - 1, 0))
  }, [filtered.length, highlightedIndex])

  function handleTriggerKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (!open) openList()
    }
    if (e.key === 'Escape' && open) {
      e.preventDefault()
      close()
    }
  }

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex((current) => Math.min(current + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex((current) => Math.max(current - 1, 0))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setHighlightedIndex(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      setHighlightedIndex(Math.max(filtered.length - 1, 0))
    } else if (e.key === 'Enter' && filtered[highlightedIndex]) {
      e.preventDefault()
      select(filtered[highlightedIndex].value)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      close()
    }
  }

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-haspopup="listbox"
        aria-label={selectedOption?.label ?? placeholder}
        onClick={() => (open ? close() : openList())}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          'flex w-full items-center justify-between gap-2 rounded-lg border bg-white pr-14 outline-none transition-all hover:border-ink-300',
          heightClass,
          paddingClass,
          open ? 'border-brand-500 ring-2 ring-brand-500/10' : 'border-ink-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10',
        )}
      >
        <span className={cn('truncate', selectedOption ? 'text-ink-800' : 'text-ink-300')}>
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDown className={cn('absolute right-2.5 h-4 w-4 shrink-0 text-ink-400 transition-transform', open && 'rotate-180')} />
      </button>
      {selectedOption && (
        <button
          type="button"
          onClick={() => select('')}
          className="absolute right-7 top-1/2 z-10 grid h-5 w-5 -translate-y-1/2 place-items-center rounded text-ink-300 hover:bg-ink-100 hover:text-ink-600"
          aria-label="Seçimi temizle"
        >
          <X className="h-3 w-3" />
        </button>
      )}

      {open && (
        <div className="absolute left-0 right-0 top-full z-30 mt-1 overflow-hidden rounded-lg border border-ink-200 bg-white shadow-xl shadow-ink-900/10">
          <div className="relative border-b border-ink-100 p-2">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-400" strokeWidth={1.7} />
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setHighlightedIndex(0) }}
              onKeyDown={handleSearchKeyDown}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              aria-controls={listboxId}
              className="h-8 w-full rounded-md border border-ink-200 bg-ink-50/40 pl-8 pr-3 text-xs text-ink-800 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10"
            />
          </div>
          <div id={listboxId} role="listbox" aria-label="Seçenekler" className="max-h-[200px] overflow-y-auto py-1">
            {filtered.length > 0 ? (
              filtered.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={value === option.value}
                  tabIndex={-1}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={() => select(option.value)}
                  className={cn(
                    'flex w-full items-center justify-between gap-2 px-3 py-2 text-left transition-colors hover:bg-brand-50/50',
                    size === 'sm' ? 'text-xs' : 'text-sm',
                    index === highlightedIndex && 'bg-ink-50',
                    value === option.value && 'font-semibold text-brand-700',
                  )}
                >
                  <span className="truncate">{option.label}</span>
                  {option.hint && <span className="shrink-0 rounded-full bg-ink-100 px-2 py-0.5 text-[10px] font-medium text-ink-500">{option.hint}</span>}
                </button>
              ))
            ) : (
              <div className="px-3 py-5 text-center text-xs text-ink-400">{emptyText}</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
