import { LayoutGrid, List } from 'lucide-react'
import { cn } from '@/lib/utils'

type ViewMode = 'table' | 'card'

interface ViewToggleProps {
  view: ViewMode
  onChange: (view: ViewMode) => void
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="inline-flex items-center rounded-xl border border-ink-200 bg-ink-50/50 p-0.5">
      <button
        type="button"
        onClick={() => onChange('table')}
        className={cn(
          'inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold transition-colors',
          view === 'table' ? 'bg-white text-ink-800 shadow-sm' : 'text-ink-400 hover:text-ink-600',
        )}
        aria-label="Tablo görünümü"
        aria-pressed={view === 'table'}
      >
        <List className="h-4 w-4" strokeWidth={1.8} />
        <span className="hidden sm:inline">Tablo</span>
      </button>
      <button
        type="button"
        onClick={() => onChange('card')}
        className={cn(
          'inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold transition-colors',
          view === 'card' ? 'bg-white text-ink-800 shadow-sm' : 'text-ink-400 hover:text-ink-600',
        )}
        aria-label="Kart görünümü"
        aria-pressed={view === 'card'}
      >
        <LayoutGrid className="h-4 w-4" strokeWidth={1.8} />
        <span className="hidden sm:inline">Kart</span>
      </button>
    </div>
  )
}

export type { ViewMode }
