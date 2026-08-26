import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { z } from 'zod'
import { readStorage, removeStorage, writeStorage } from '@/lib/storage'

export interface AuthUser {
  name: string
  email: string
  role: string
  company: string
  initials: string
}

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (user: AuthUser) => void
  logout: () => void
}

const STORAGE_KEY = 'hantech-auth'
const authUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  role: z.string(),
  company: z.string(),
  initials: z.string(),
})

const AuthContext = createContext<AuthState | null>(null)

function readStoredUser(): AuthUser | null {
  return readStorage(STORAGE_KEY, null, z.union([authUserSchema, z.null()]))
}

function persistUser(user: AuthUser | null) {
  if (user) writeStorage(STORAGE_KEY, user)
  else removeStorage(STORAGE_KEY)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser())

  useEffect(() => {
    persistUser(user)
  }, [user])

  const login = useCallback((next: AuthUser) => setUser(next), [])
  const logout = useCallback(() => setUser(null), [])

  const value = useMemo<AuthState>(
    () => ({ user, isAuthenticated: Boolean(user), login, logout }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
