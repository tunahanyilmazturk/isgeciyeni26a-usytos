import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export interface ParticipantUser {
  id: number
  name: string
  username: string
  email: string
  company: string
  department: string
  riskLevel: string
  trainingStatus: string
  progress: number
  trainingMinutes: number
  lastCompletion: string
  nextTraining: string
  lastLogin: string
}

interface ParticipantAuthState {
  user: ParticipantUser | null
  isAuthenticated: boolean
  kvkkApproved: boolean
  login: (user: ParticipantUser) => void
  logout: () => void
  approveKvkk: () => void
}

const STORAGE_KEY = 'hantech-participant-auth'
const KVKK_KEY = 'hantech-participant-kvkk'

const ParticipantAuthContext = createContext<ParticipantAuthState | null>(null)

function readStoredUser(): ParticipantUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ParticipantUser) : null
  } catch {
    return null
  }
}

function readKvkkApproved(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return window.localStorage.getItem(KVKK_KEY) === 'true'
  } catch {
    return false
  }
}

export function ParticipantAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ParticipantUser | null>(() => readStoredUser())
  const [kvkkApproved, setKvkkApproved] = useState<boolean>(() => readKvkkApproved())

  useEffect(() => {
    if (user) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else window.localStorage.removeItem(STORAGE_KEY)
  }, [user])

  useEffect(() => {
    if (kvkkApproved) window.localStorage.setItem(KVKK_KEY, 'true')
    else window.localStorage.removeItem(KVKK_KEY)
  }, [kvkkApproved])

  const login = useCallback((next: ParticipantUser) => {
    setUser(next)
    // KVKK onayı kullanıcıya özgü saklanır
    setKvkkApproved(window.localStorage.getItem(`${KVKK_KEY}-${next.id}`) === 'true')
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setKvkkApproved(false)
  }, [])

  const approveKvkk = useCallback(() => {
    setKvkkApproved(true)
    if (user) window.localStorage.setItem(`${KVKK_KEY}-${user.id}`, 'true')
  }, [user])

  const value = useMemo<ParticipantAuthState>(
    () => ({ user, isAuthenticated: Boolean(user), kvkkApproved, login, logout, approveKvkk }),
    [user, kvkkApproved, login, logout, approveKvkk],
  )

  return <ParticipantAuthContext.Provider value={value}>{children}</ParticipantAuthContext.Provider>
}

export function useParticipantAuth() {
  const ctx = useContext(ParticipantAuthContext)
  if (!ctx) throw new Error('useParticipantAuth must be used within ParticipantAuthProvider')
  return ctx
}
