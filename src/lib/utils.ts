import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Tailwind sınıflarını çakışmadan birleştirir.
 * Örn: cn('px-2', condition && 'px-4', 'text-red-500')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
