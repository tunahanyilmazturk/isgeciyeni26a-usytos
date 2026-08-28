import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Tailwind sınıflarını çakışmadan birleştirir.
 * Örn: cn('px-2', condition && 'px-4', 'text-red-500')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const nanoidAlphabet = '0123456789abcdefghijklmnopqrstuvwxyz'

export function nanoid(size = 12): string {
  let id = ''
  for (let i = 0; i < size; i++) {
    id += nanoidAlphabet[Math.floor(Math.random() * nanoidAlphabet.length)]
  }
  return id
}
