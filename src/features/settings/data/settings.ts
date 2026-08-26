import { z } from 'zod'
import { readStorage, writeStorage } from '@/lib/storage'

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

const usersSchema = z.array(z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  role: z.string(),
  company: z.string(),
  permissions: z.array(z.string()).optional(),
  lastLogin: z.string(),
  status: z.enum(['active', 'pending', 'inactive']),
}))

export const USERS_STORAGE_KEY = 'hantech-users'

export function readUsers(): User[] {
  return readStorage(USERS_STORAGE_KEY, initialUsers, usersSchema)
}

export function saveUsers(users: User[]): boolean {
  return writeStorage(USERS_STORAGE_KEY, users)
}

export const initialUsers: User[] = [
  { id: 1, firstName: 'Demo', lastName: 'Yönetici', username: 'demo.yonetici', email: 'yonetici@example.invalid', role: 'Yönetici', company: 'Demo OSGB', lastLogin: 'Şimdi', status: 'active' },
  { id: 2, firstName: 'Demo', lastName: 'Uzman 01', username: 'demo.uzman01', email: 'uzman01@example.invalid', role: 'İSG Uzmanı', company: 'Demo OSGB', lastLogin: 'Bugün, 09:42', status: 'active' },
  { id: 3, firstName: 'Demo', lastName: 'Uzman 02', username: 'demo.uzman02', email: 'uzman02@example.invalid', role: 'İSG Uzmanı', company: 'Demo OSGB', lastLogin: 'Dün, 16:18', status: 'active' },
  { id: 4, firstName: 'Demo', lastName: 'Hekim 01', username: 'demo.hekim01', email: 'hekim01@example.invalid', role: 'İşyeri Hekimi', company: 'Demo OSGB', lastLogin: '12 Ağustos 2026', status: 'active' },
  { id: 5, firstName: 'Demo', lastName: 'Hekim 02', username: 'demo.hekim02', email: 'hekim02@example.invalid', role: 'İşyeri Hekimi', company: 'Demo OSGB', lastLogin: '—', status: 'pending' },
  { id: 6, firstName: 'Demo', lastName: 'Personel', username: 'demo.personel01', email: 'personel01@example.invalid', role: 'Personel', company: 'Demo OSGB', lastLogin: '03 Ağustos 2026', status: 'inactive' },
]
