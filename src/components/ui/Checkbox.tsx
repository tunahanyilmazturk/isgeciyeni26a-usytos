import type { InputHTMLAttributes, ReactNode } from 'react'
import { useId } from 'react'
import { cn } from '@/lib/utils'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode
}

export function Checkbox({ label, id, className, ...props }: CheckboxProps) {
  const generatedId = useId()
  const checkboxId = id ?? generatedId

  return (
    <label
      htmlFor={checkboxId}
      className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-ink-600 select-none"
    >
      <input
        id={checkboxId}
        type="checkbox"
        className={cn(
          'h-4 w-4 rounded border-ink-300 bg-white',
          'transition-colors',
          className,
        )}
        {...props}
      />
      {label}
    </label>
  )
}
