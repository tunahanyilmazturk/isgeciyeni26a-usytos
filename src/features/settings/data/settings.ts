export type UserStatus = 'active' | 'pending' | 'inactive'

export interface User {
  id: number
  firstName: string
  lastName: string
  username: string
  email: string
  phone?: string
  role: string
  company: string
  permissions?: string[]
  lastLogin: string
  status: UserStatus
}

export const USERS_STORAGE_KEY = 'hantech-users'

export function readUsers(): User[] {
  if (typeof window === 'undefined') return initialUsers
  try {
    const stored = window.localStorage.getItem(USERS_STORAGE_KEY)
    const parsed = stored ? JSON.parse(stored) : null
    return Array.isArray(parsed) ? (parsed as User[]) : initialUsers
  } catch {
    return initialUsers
  }
}

export function saveUsers(users: User[]) {
  if (typeof window !== 'undefined')
    window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

export const initialUsers: User[] = [
  { id: 1, firstName: 'Savaş', lastName: 'Akay', username: 'savas.akay', email: 'savasakay@cetkaosgb.com', role: 'Yönetici', company: 'Çetka OSGB', lastLogin: 'Şimdi', status: 'active' },
  { id: 2, firstName: 'Barış', lastName: 'Eren', username: 'baris.eren', email: 'baris.eren@hantech.com', role: 'İSG Uzmanı', company: 'Çetka OSGB', lastLogin: 'Bugün, 09:42', status: 'active' },
  { id: 3, firstName: 'Seda', lastName: 'Yalçın', username: 'seda.yalcin', email: 'seda.yalcin@hantech.com', role: 'İSG Uzmanı', company: 'Çetka OSGB', lastLogin: 'Dün, 16:18', status: 'active' },
  { id: 4, firstName: 'Onur', lastName: 'Polat', username: 'onur.polat', email: 'onur.polat@hantech.com', role: 'İşyeri Hekimi', company: 'Çetka OSGB', lastLogin: '12 Ağustos 2026', status: 'active' },
  { id: 5, firstName: 'Elif', lastName: 'Demir', username: 'elif.demir', email: 'elif.demir@hantech.com', role: 'İşyeri Hekimi', company: 'Çetka OSGB', lastLogin: '—', status: 'pending' },
  { id: 6, firstName: 'Mert', lastName: 'Acar', username: 'mert.acar', email: 'mert.acar@hantech.com', role: 'Personel', company: 'Çetka OSGB', lastLogin: '03 Ağustos 2026', status: 'inactive' },
]
