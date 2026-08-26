import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export interface ParticipantUser {
  id: number
  name: string
  username: string
  email: string
  phone: string
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
  mustChangePassword: boolean
  login: (user: ParticipantUser) => void
  logout: () => void
  approveKvkk: () => void
  changePassword: (newPassword: string) => void
  updateContact: (email: string, phone: string) => void
}

const STORAGE_KEY = 'hantech-participant-auth'
const KVKK_KEY = 'hantech-participant-kvkk'
const PWD_CHANGED_KEY = 'hantech-participant-pwd-changed'

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

function readKvkkApproved(userId?: number): boolean {
  if (typeof window === 'undefined') return false
  try {
    if (userId !== undefined) {
      return window.localStorage.getItem(`${KVKK_KEY}-${userId}`) === 'true'
    }
    return window.localStorage.getItem(KVKK_KEY) === 'true'
  } catch {
    return false
  }
}

function readPwdChanged(userId?: number): boolean {
  if (typeof window === 'undefined') return false
  try {
    if (userId !== undefined) {
      return window.localStorage.getItem(`${PWD_CHANGED_KEY}-${userId}`) === 'true'
    }
    return false
  } catch {
    return false
  }
}

export function ParticipantAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ParticipantUser | null>(() => readStoredUser())
  const [kvkkApproved, setKvkkApproved] = useState<boolean>(() => readKvkkApproved(readStoredUser()?.id))
  const [mustChangePassword, setMustChangePassword] = useState<boolean>(() => !readPwdChanged(readStoredUser()?.id))

  useEffect(() => {
    if (user) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else window.localStorage.removeItem(STORAGE_KEY)
  }, [user])

  const login = useCallback((next: ParticipantUser) => {
    setUser(next)
    const kvkk = readKvkkApproved(next.id)
    setKvkkApproved(kvkk)
    // Şifre değişikliği yapılmadıysa zorunlu
    setMustChangePassword(!readPwdChanged(next.id))
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setKvkkApproved(false)
    setMustChangePassword(false)
  }, [])

  const approveKvkk = useCallback(() => {
    setKvkkApproved(true)
    if (user) window.localStorage.setItem(`${KVKK_KEY}-${user.id}`, 'true')
  }, [user])

  const changePassword = useCallback((newPassword: string) => {
    // Şifre localStorage'daki katılımcı kaydında güncellenir
    if (!user) return
    try {
      const raw = window.localStorage.getItem('hantech-participants')
      if (raw) {
        const participants = JSON.parse(raw) as Array<{ id: number; password?: string }>
        const updated = participants.map((p) =>
          p.id === user.id ? { ...p, password: newPassword } : p,
        )
        window.localStorage.setItem('hantech-participants', JSON.stringify(updated))
      }
    } catch {
      // Hata durumunda devam et
    }
    window.localStorage.setItem(`${PWD_CHANGED_KEY}-${user.id}`, 'true')
    setMustChangePassword(false)
  }, [user])

  const updateContact = useCallback((email: string, phone: string) => {
    if (!user) return
    const nextUser = { ...user, email, phone }
    setUser(nextUser)
    try {
      const raw = window.localStorage.getItem('hantech-participants')
      if (raw) {
        const participants = JSON.parse(raw) as Array<{ id: number; email?: string; phone?: string }>
        const updated = participants.map((p) =>
          p.id === user.id ? { ...p, email, phone } : p,
        )
        window.localStorage.setItem('hantech-participants', JSON.stringify(updated))
      }
    } catch {
      // Hata durumunda devam et
    }
  }, [user])

  const value = useMemo<ParticipantAuthState>(
    () => ({ user, isAuthenticated: Boolean(user), kvkkApproved, mustChangePassword, login, logout, approveKvkk, changePassword, updateContact }),
    [user, kvkkApproved, mustChangePassword, login, logout, approveKvkk, changePassword, updateContact],
  )

  return <ParticipantAuthContext.Provider value={value}>{children}</ParticipantAuthContext.Provider>
}

export function useParticipantAuth() {
  const ctx = useContext(ParticipantAuthContext)
  if (!ctx) throw new Error('useParticipantAuth must be used within ParticipantAuthProvider')
  return ctx
}
