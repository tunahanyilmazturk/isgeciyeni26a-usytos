import { Trash2, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BulkActionBarProps {
  selectedCount: number
  itemName: string
  onClear: () => void
  onDelete?: () => void
  /** Ekstra aksiyon butonları */
  extraActions?: React.ReactNode
  className?: string
}

export function BulkActionBar({
  selectedCount,
  itemName,
  onClear,
  onDelete,
  extraActions,
  className,
}: BulkActionBarProps) {
  if (selectedCount === 0) return null

  return (
    <div
      className={cn(
        'flex flex-col justify-between gap-3 border-b border-brand-100 bg-brand-50/70 px-5 py-3.5 sm:flex-row sm:items-center sm:px-6',
        className,
      )}
    >
      <div className="flex items-center gap-2 text-xs font-semibold text-brand-800">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-brand-600 text-[10px] text-white">
          {selectedCount}
        </span>
        {itemName} seçildi
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {extraActions}
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-rose-600 px-3 text-xs font-semibold text-white transition-colors hover:bg-rose-700"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Sil
          </button>
        )}
        <button
          type="button"
          onClick={onClear}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-100"
        >
          <X className="h-3.5 w-3.5" />
          Seçimi kaldır
        </button>
      </div>
    </div>
  )
}
