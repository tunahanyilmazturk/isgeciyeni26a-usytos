import { z } from 'zod'
import { readStorage, writeStorage } from '@/lib/storage'
import { readParticipants, type Participant } from '@/features/participants/data/participants'
import { trainingCatalog } from '@/features/trainings/data/trainings'

export type AssignmentStatus = 'active' | 'pending_approval' | 'completed' | 'expired'

export interface TrainingAssignment {
  id: string
  participantId: number
  trainingId: string
  trainingName: string
  status: AssignmentStatus
  assignedDate: string
  dueDate: string
  progress: number
  preTest: boolean
  requiresExpertApproval: boolean
  requiresDoctorApproval: boolean
}

const assignmentsSchema = z.array(z.object({
  id: z.string(),
  participantId: z.number(),
  trainingId: z.string(),
  trainingName: z.string(),
  status: z.enum(['active', 'pending_approval', 'completed', 'expired']),
  assignedDate: z.string(),
  dueDate: z.string(),
  progress: z.number(),
  preTest: z.boolean(),
  requiresExpertApproval: z.boolean(),
  requiresDoctorApproval: z.boolean(),
}))

export interface ParticipantAssignmentSummary {
  participant: Participant
  activeCount: number
  pendingCount: number
  completedCount: number
  assignments: TrainingAssignment[]
}

const STORAGE_KEY = 'hantech-assignments'

/** Katılımcı ve eğitim kataloğundan demo atama verisi üretir */
function generateAssignments(): TrainingAssignment[] {
  const participants = readParticipants()
  const trainings = trainingCatalog
  const assignments: TrainingAssignment[] = []

  // Her katılımcıya 1-3 rastgele eğitim ata
  participants.forEach((p, pIdx) => {
    const seed = p.id + pIdx
    const numAssignments = 1 + (seed % 3) // 1-3 atama
    for (let i = 0; i < numAssignments; i++) {
      const training = trainings[(seed + i) % trainings.length]
      const statusRoll = (seed + i) % 5
      const status: AssignmentStatus =
        statusRoll === 0 ? 'pending_approval' :
        statusRoll === 1 ? 'completed' :
        statusRoll === 2 ? 'expired' :
        'active'
      assignments.push({
        id: `A-${1000 + assignments.length + 1}`,
        participantId: p.id,
        trainingId: training.id,
        trainingName: training.name,
        status,
        assignedDate: '01.09.2026',
        dueDate: status === 'expired' ? '15.07.2026' : '30.11.2026',
        progress: status === 'completed' ? 100 : status === 'active' ? 20 + ((seed + i) % 60) : 0,
        preTest: (seed + i) % 3 === 0,
        requiresExpertApproval: status === 'pending_approval',
        requiresDoctorApproval: false,
      })
    }
  })

  return assignments
}

export function readAssignments(): TrainingAssignment[] {
  const generated = generateAssignments()
  return readStorage(STORAGE_KEY, generated, assignmentsSchema)
}

export function saveAssignments(assignments: TrainingAssignment[]): boolean {
  return writeStorage(STORAGE_KEY, assignments)
}

/** Atama oluşturma seçenekleri */
export interface AssignmentOptions {
  preTest?: boolean
  requiresExpertApproval?: boolean
  requiresDoctorApproval?: boolean
}

/** Bir katılımcıya yeni eğitim ataması ekler */
export function addAssignment(
  participantId: number,
  trainingId: string,
  dueDate: string,
  options: AssignmentOptions = {},
): TrainingAssignment {
  const assignments = readAssignments()
  const training = trainingCatalog.find((t) => t.id === trainingId)
  const needsApproval = options.requiresExpertApproval || options.requiresDoctorApproval
  const newAssignment: TrainingAssignment = {
    id: `A-${1000 + assignments.length + 1}`,
    participantId,
    trainingId,
    trainingName: training?.name ?? 'Bilinmeyen eğitim',
    status: needsApproval ? 'pending_approval' : 'active',
    assignedDate: new Date().toLocaleDateString('tr-TR'),
    dueDate,
    progress: 0,
    preTest: options.preTest ?? false,
    requiresExpertApproval: options.requiresExpertApproval ?? false,
    requiresDoctorApproval: options.requiresDoctorApproval ?? false,
  }
  const updated = [...assignments, newAssignment]
  saveAssignments(updated)
  return newAssignment
}

/** Bir atamayı kaldırır */
export function removeAssignment(assignmentId: string): void {
  const assignments = readAssignments()
  const updated = assignments.filter((a) => a.id !== assignmentId)
  saveAssignments(updated)
}

/** Birden fazla katılımcıya birden fazla eğitim toplu atar
 *  Halihazırda atanmış (participantId+trainingId) çiftlerini atlar
 */
export function bulkAssign(
  participantIds: number[],
  trainingIds: string[],
  dueDate: string,
  options: AssignmentOptions = {},
): { added: number; skipped: number } {
  const assignments = readAssignments()
  const existing = new Set(assignments.map((a) => `${a.participantId}:${a.trainingId}`))
  const needsApproval = options.requiresExpertApproval || options.requiresDoctorApproval

  const newAssignments: TrainingAssignment[] = []
  for (const participantId of participantIds) {
    for (const trainingId of trainingIds) {
      const key = `${participantId}:${trainingId}`
      if (existing.has(key)) continue
      const training = trainingCatalog.find((t) => t.id === trainingId)
      newAssignments.push({
        id: `A-${1000 + assignments.length + newAssignments.length + 1}`,
        participantId,
        trainingId,
        trainingName: training?.name ?? 'Bilinmeyen eğitim',
        status: needsApproval ? 'pending_approval' : 'active',
        assignedDate: new Date().toLocaleDateString('tr-TR'),
        dueDate,
        progress: 0,
        preTest: options.preTest ?? false,
        requiresExpertApproval: options.requiresExpertApproval ?? false,
        requiresDoctorApproval: options.requiresDoctorApproval ?? false,
      })
      existing.add(key)
    }
  }

  if (newAssignments.length > 0) {
    saveAssignments([...assignments, ...newAssignments])
  }

  const totalRequested = participantIds.length * trainingIds.length
  return { added: newAssignments.length, skipped: totalRequested - newAssignments.length }
}

/** Tüm katılımcıların atama özetini üretir */
export function getParticipantAssignmentSummaries(): ParticipantAssignmentSummary[] {
  const participants = readParticipants()
  const assignments = readAssignments()

  return participants.map((participant) => {
    const participantAssignments = assignments.filter((a) => a.participantId === participant.id)
    return {
      participant,
      activeCount: participantAssignments.filter((a) => a.status === 'active').length,
      pendingCount: participantAssignments.filter((a) => a.status === 'pending_approval').length,
      completedCount: participantAssignments.filter((a) => a.status === 'completed').length,
      assignments: participantAssignments,
    }
  })
}

/** Sistem genelindeki aktif eğitim sayısı (benzersiz trainingId) */
export function getActiveTrainingCount(): number {
  const assignments = readAssignments()
  const activeTrainingIds = new Set(
    assignments.filter((a) => a.status === 'active').map((a) => a.trainingId)
  )
  return activeTrainingIds.size
}
