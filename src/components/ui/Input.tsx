import { forwardRef, useId, useState } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: ReactNode
  hint?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, icon, hint, error, type = 'text', id, className, ...props },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : type

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span
            className={cn(
              'pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors',
              error ? 'text-red-400' : 'text-ink-400',
            )}
          >
            {icon}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          type={effectiveType}
          className={cn(
            'w-full rounded-xl border bg-white text-sm text-ink-900',
            'placeholder:text-ink-400',
            'transition-all duration-150',
            'focus:ring-4 focus:ring-brand-500/10',
            icon ? 'pl-11' : 'pl-3.5',
            isPassword ? 'pr-11' : 'pr-3.5',
            'h-12',
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10'
              : 'border-ink-200 hover:border-ink-300 focus:border-brand-500',
            className,
          )}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 transition-colors hover:text-ink-600"
            tabIndex={-1}
            aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      {error ? (
        <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-ink-400">{hint}</p>
      ) : null}
    </div>
  )
})
