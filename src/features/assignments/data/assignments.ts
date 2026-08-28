import { z } from 'zod'
import { readStorage, writeStorage } from '@/lib/storage'
import { readParticipants, type Participant } from '@/features/participants/data/participants'
import { readTrainings } from '@/features/trainings/data/trainings'

export type AssignmentStatus = 'active' | 'pending_approval' | 'completed' | 'expired'
export type TrainingApprovalStatus = 'not_requested' | 'pending' | 'approved' | 'rejected'
export type TrainingApprovalTarget = 'expert' | 'doctor'

export interface TrainingApprovalEvent {
  target: TrainingApprovalTarget
  decision: 'approved' | 'rejected'
  reviewerName: string
  reviewerRole: string
  at: string
  note?: string
}

export interface QuizAnswerReview {
  questionId: string
  questionText: string
  selectedIndex: number
  selectedText: string
  correctIndex: number
  correctText: string
}

export interface TrainingAssignment {
  id: string
  participantId: number
  trainingId: string
  trainingName: string
  status: AssignmentStatus
  assignedDate: string
  dueDate: string
  progress: number
  completedModuleIds: string[]
  completedItemIds: string[]
  moduleScores: Record<string, number>
  quizReviews: Record<string, QuizAnswerReview[]>
  approvalStatus: TrainingApprovalStatus
  approvalRequestedTo?: TrainingApprovalTarget
  approvalTargets?: TrainingApprovalTarget[]
  approvalDecisions?: Partial<Record<TrainingApprovalTarget, 'approved' | 'rejected'>>
  approvalHistory?: TrainingApprovalEvent[]
  rejectionReason?: string
  submittedAt?: string
  approvedBy?: string
  approvedAt?: string
  certificateId?: string
  lastModuleId?: string
  lastItemId?: string
  requiresExpertApproval: boolean
  requiresDoctorApproval: boolean
}

const assignmentSchema = z.object({
  id: z.string(),
  participantId: z.number(),
  trainingId: z.string(),
  trainingName: z.string(),
  status: z.enum(['active', 'pending_approval', 'completed', 'expired']),
  assignedDate: z.string(),
  dueDate: z.string(),
  progress: z.number(),
  completedModuleIds: z.array(z.string()),
  completedItemIds: z.array(z.string()),
  moduleScores: z.record(z.string(), z.number()),
  quizReviews: z.record(z.string(), z.array(z.object({
    questionId: z.string(), questionText: z.string(), selectedIndex: z.number(), selectedText: z.string(), correctIndex: z.number(), correctText: z.string(),
  }))).default({}),
  approvalStatus: z.enum(['not_requested', 'pending', 'approved', 'rejected']).default('not_requested'),
  approvalRequestedTo: z.enum(['expert', 'doctor']).optional(),
  approvalTargets: z.array(z.enum(['expert', 'doctor'])).optional(),
  approvalDecisions: z.object({
    expert: z.enum(['approved', 'rejected']).optional(),
    doctor: z.enum(['approved', 'rejected']).optional(),
  }).optional(),
  approvalHistory: z.array(z.object({
    target: z.enum(['expert', 'doctor']),
    decision: z.enum(['approved', 'rejected']),
    reviewerName: z.string(),
    reviewerRole: z.string(),
    at: z.string(),
    note: z.string().optional(),
  })).optional(),
  rejectionReason: z.string().optional(),
  submittedAt: z.string().optional(),
  approvedBy: z.string().optional(),
  approvedAt: z.string().optional(),
  certificateId: z.string().optional(),
  lastModuleId: z.string().optional(),
  lastItemId: z.string().optional(),
  requiresExpertApproval: z.boolean(),
  requiresDoctorApproval: z.boolean(),
})

const assignmentsSchema = z.array(assignmentSchema)

export interface ParticipantAssignmentSummary {
  participant: Participant
  activeCount: number
  pendingCount: number
  completedCount: number
  assignments: TrainingAssignment[]
}

const STORAGE_KEY = 'hantech-assignments'

/** Atamalar yalnızca manuel olarak (addAssignment/bulkAssign) oluşturulur.
 *  Otomatik/demo atama üretimi kaldırıldı. */
function generateAssignments(): TrainingAssignment[] {
  return []
}

export function readAssignments(): TrainingAssignment[] {
  return readStorage(STORAGE_KEY, generateAssignments(), assignmentsSchema)
}

export function saveAssignments(assignments: TrainingAssignment[]): boolean {
  return writeStorage(STORAGE_KEY, assignments)
}

/** Atama oluşturma seçenekleri */
export interface AssignmentOptions {
  requiresExpertApproval?: boolean
  requiresDoctorApproval?: boolean
}

function nextAssignmentId(assignments: TrainingAssignment[]): string {
  const max = assignments.reduce((acc, a) => {
    const n = Number.parseInt(a.id.replace(/^A-/, ''), 10)
    return Number.isNaN(n) ? acc : Math.max(acc, n)
  }, 1000)
  return `A-${max + 1}`
}

/** Bir katılımcıya yeni eğitim ataması ekler */
export function addAssignment(
  participantId: number,
  trainingId: string,
  dueDate: string,
  options: AssignmentOptions = {},
): TrainingAssignment {
  const assignments = readAssignments()
  const training = readTrainings().find((t) => t.id === trainingId)
  const newAssignment: TrainingAssignment = {
    id: nextAssignmentId(assignments),
    participantId,
    trainingId,
    trainingName: training?.name ?? 'Bilinmeyen eğitim',
    status: 'active',
    assignedDate: new Date().toLocaleDateString('tr-TR'),
    dueDate,
    progress: 0,
    completedModuleIds: [],
    completedItemIds: [],
    moduleScores: {},
    quizReviews: {},
    approvalStatus: 'not_requested',
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

/** Atamayı günceller */
export function updateAssignment(assignmentId: string, patch: Partial<TrainingAssignment>): TrainingAssignment | null {
  const assignments = readAssignments()
  const index = assignments.findIndex((a) => a.id === assignmentId)
  if (index === -1) return null
  const updated = [...assignments]
  updated[index] = { ...updated[index], ...patch }
  saveAssignments(updated)
  return updated[index]
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
  const trainings = readTrainings()
  const newAssignments: TrainingAssignment[] = []
  for (const participantId of participantIds) {
    for (const trainingId of trainingIds) {
      const key = `${participantId}:${trainingId}`
      if (existing.has(key)) continue
      const training = trainings.find((t) => t.id === trainingId)
      newAssignments.push({
        id: nextAssignmentId([...assignments, ...newAssignments]),
        participantId,
        trainingId,
        trainingName: training?.name ?? 'Bilinmeyen eğitim',
        status: 'active',
        assignedDate: new Date().toLocaleDateString('tr-TR'),
        dueDate,
        progress: 0,
        completedModuleIds: [],
        completedItemIds: [],
        moduleScores: {},
        quizReviews: {},
        approvalStatus: 'not_requested',
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
