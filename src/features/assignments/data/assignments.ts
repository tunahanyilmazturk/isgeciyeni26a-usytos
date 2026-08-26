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
}

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
      })
    }
  })

  return assignments
}

export function readAssignments(): TrainingAssignment[] {
  if (typeof window === 'undefined') return generateAssignments()
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    const parsed = stored ? JSON.parse(stored) : null
    if (Array.isArray(parsed)) return parsed as TrainingAssignment[]
    const generated = generateAssignments()
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(generated))
    return generated
  } catch {
    return generateAssignments()
  }
}

export function saveAssignments(assignments: TrainingAssignment[]) {
  if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments))
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
