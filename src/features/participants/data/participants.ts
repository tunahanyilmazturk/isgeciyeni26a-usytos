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

export const initialParticipants: Participant[] = []
