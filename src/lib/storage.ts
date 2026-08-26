interface SafeParseSchema<T> {
  safeParse(value: unknown):
    | { success: true; data: T }
    | { success: false; error?: unknown }
}

/**
 * Browser-only persistence adapter used by the current frontend prototype.
 * This is not a security boundary and can be replaced by an API adapter later.
 */
export function readStorage<T>(key: string, fallback: T, schema: SafeParseSchema<T>): T {
  if (typeof window === 'undefined') return fallback

  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback

    const result = schema.safeParse(JSON.parse(raw))
    return result.success ? result.data : fallback
  } catch {
    return fallback
  }
}

export function writeStorage<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') return false

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function removeStorage(key: string): boolean {
  if (typeof window === 'undefined') return false

  try {
    window.localStorage.removeItem(key)
    return true
  } catch {
    return false
  }
}
