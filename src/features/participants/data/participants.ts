import { z } from 'zod'
import { readStorage, writeStorage } from '@/lib/storage'

export type ParticipantStatus = 'active' | 'passive'
export type TrainingStatus = 'not_started' | 'in_progress' | 'failed' | 'successful'

export interface Participant {
  id: number
  name: string
  username: string
  email: string
  phone: string
  tcNumber: string
  companyId: number
  company: string
  riskLevel: 'Az tehlikeli' | 'Tehlikeli' | 'Çok tehlikeli'
  department: string
  trainingMinutes: number
  progress: number
  trainingStatus: TrainingStatus
  lastCompletion: string
  nextTraining: string
  status: ParticipantStatus
  lastLogin: string
  password?: string
}

const participantSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  phone: z.string(),
  tcNumber: z.string(),
  companyId: z.number(),
  company: z.string(),
  riskLevel: z.enum(['Az tehlikeli', 'Tehlikeli', 'Çok tehlikeli']),
  department: z.string(),
  trainingMinutes: z.number(),
  progress: z.number(),
  trainingStatus: z.enum(['not_started', 'in_progress', 'failed', 'successful']),
  lastCompletion: z.string(),
  nextTraining: z.string(),
  status: z.enum(['active', 'passive']),
  lastLogin: z.string(),
  password: z.string().optional(),
})
const participantsSchema = z.array(participantSchema)

export const PARTICIPANTS_STORAGE_KEY = 'hantech-participants'

export function readParticipants(): Participant[] {
  return readStorage(PARTICIPANTS_STORAGE_KEY, initialParticipants, participantsSchema)
}

export function saveParticipants(participants: Participant[]): boolean {
  return writeStorage(PARTICIPANTS_STORAGE_KEY, participants)
}

export const initialParticipants: Participant[] = [
  { id: 1, name: 'Demo Katılımcı 01', username: 'demo.katilimci01', email: '—', phone: '—', tcNumber: '—', companyId: 1, company: 'Örnek Firma 01', riskLevel: 'Tehlikeli', department: 'Üretim', trainingMinutes: 0, progress: 0, trainingStatus: 'not_started', lastCompletion: '—', nextTraining: '—', status: 'active', lastLogin: 'Henüz giriş yapmadı', password: import.meta.env.DEV ? 'dev-demo-1234' : undefined },
  { id: 2, name: 'Demo Katılımcı 02', username: 'demo.katilimci02', email: '—', phone: '—', tcNumber: '—', companyId: 1, company: 'Örnek Firma 01', riskLevel: 'Tehlikeli', department: 'İnsan Kaynakları', trainingMinutes: 0, progress: 0, trainingStatus: 'not_started', lastCompletion: '—', nextTraining: '—', status: 'active', lastLogin: 'Henüz giriş yapmadı', password: import.meta.env.DEV ? 'dev-demo-1234' : undefined },
  { id: 3, name: 'Demo Katılımcı 03', username: 'demo.katilimci03', email: '—', phone: '—', tcNumber: '—', companyId: 2, company: 'Örnek Firma 02', riskLevel: 'Az tehlikeli', department: 'Paketleme', trainingMinutes: 0, progress: 0, trainingStatus: 'not_started', lastCompletion: '—', nextTraining: '—', status: 'active', lastLogin: 'Henüz giriş yapmadı', password: import.meta.env.DEV ? 'dev-demo-1234' : undefined },
  { id: 4, name: 'Demo Katılımcı 04', username: 'demo.katilimci04', email: '—', phone: '—', tcNumber: '—', companyId: 3, company: 'Örnek Firma 03', riskLevel: 'Tehlikeli', department: 'Laboratuvar', trainingMinutes: 0, progress: 0, trainingStatus: 'not_started', lastCompletion: '—', nextTraining: '—', status: 'active', lastLogin: 'Henüz giriş yapmadı', password: import.meta.env.DEV ? 'dev-demo-1234' : undefined },
  { id: 5, name: 'Demo Katılımcı 05', username: 'demo.katilimci05', email: '—', phone: '—', tcNumber: '—', companyId: 4, company: 'Örnek Firma 04', riskLevel: 'Çok tehlikeli', department: 'Bakım', trainingMinutes: 0, progress: 0, trainingStatus: 'not_started', lastCompletion: '—', nextTraining: '—', status: 'active', lastLogin: 'Henüz giriş yapmadı', password: import.meta.env.DEV ? 'dev-demo-1234' : undefined },
  { id: 6, name: 'Demo Katılımcı 06', username: 'demo.katilimci06', email: '—', phone: '—', tcNumber: '—', companyId: 5, company: 'Örnek Firma 05', riskLevel: 'Az tehlikeli', department: 'Depo', trainingMinutes: 0, progress: 0, trainingStatus: 'not_started', lastCompletion: '—', nextTraining: '—', status: 'active', lastLogin: 'Henüz giriş yapmadı', password: import.meta.env.DEV ? 'dev-demo-1234' : undefined },
]
