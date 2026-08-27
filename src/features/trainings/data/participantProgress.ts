import { z } from 'zod'
import { readStorage, writeStorage } from '@/lib/storage'

export interface QuizResult {
  quizId: string
  score: number
  attempts: number
  passed: boolean
  lastAttemptAt: string
}

export interface ParticipantProgress {
  participantId: number
  contentCompletions: Record<string, boolean>
  quizResults: Record<string, QuizResult>
  currentContentId: string | null
  currentTrainingId: string | null
  totalXp: number
  streak: number
  lastStudyDate: string | null
  certificates: string[]
}

const quizResultSchema = z.object({
  quizId: z.string(),
  score: z.number(),
  attempts: z.number(),
  passed: z.boolean(),
  lastAttemptAt: z.string(),
})

const participantProgressSchema = z.object({
  participantId: z.number(),
  contentCompletions: z.record(z.string(), z.boolean()),
  quizResults: z.record(z.string(), quizResultSchema),
  currentContentId: z.string().nullable(),
  currentTrainingId: z.string().nullable(),
  totalXp: z.number(),
  streak: z.number(),
  lastStudyDate: z.string().nullable(),
  certificates: z.array(z.string()),
})

const progressMapSchema = z.record(z.string(), participantProgressSchema)

const STORAGE_KEY = 'hantech-participant-progress'

function createDefaultProgress(participantId: number): ParticipantProgress {
  return {
    participantId,
    contentCompletions: {},
    quizResults: {},
    currentContentId: null,
    currentTrainingId: null,
    totalXp: 0,
    streak: 0,
    lastStudyDate: null,
    certificates: [],
  }
}

function readAllProgress(): Record<string, ParticipantProgress> {
  return readStorage(STORAGE_KEY, {}, progressMapSchema)
}

function writeAllProgress(map: Record<string, ParticipantProgress>): boolean {
  return writeStorage(STORAGE_KEY, map)
}

export function readParticipantProgress(participantId: number): ParticipantProgress {
  const all = readAllProgress()
  return all[String(participantId)] ?? createDefaultProgress(participantId)
}

export function saveParticipantProgress(progress: ParticipantProgress): boolean {
  const all = readAllProgress()
  all[String(progress.participantId)] = progress
  return writeAllProgress(all)
}

/** Bir içeriği tamamlar ve XP kazandırır */
export function completeContent(
  participantId: number,
  trainingId: string,
  contentId: string,
  xpReward: number = 10,
): ParticipantProgress {
  const progress = readParticipantProgress(participantId)

  if (!progress.contentCompletions[contentId]) {
    progress.contentCompletions[contentId] = true
    progress.totalXp += xpReward
  }

  progress.currentTrainingId = trainingId
  progress.currentContentId = contentId
  progress.lastStudyDate = new Date().toISOString()
  progress.streak = updateStreak(progress.streak, progress.lastStudyDate)

  saveParticipantProgress(progress)
  return progress
}

/** Quiz sonucunu kaydeder */
export function saveQuizResult(
  participantId: number,
  quizId: string,
  score: number,
  passed: boolean,
): ParticipantProgress {
  const progress = readParticipantProgress(participantId)
  const existing = progress.quizResults[quizId]

  progress.quizResults[quizId] = {
    quizId,
    score,
    attempts: (existing?.attempts ?? 0) + 1,
    passed,
    lastAttemptAt: new Date().toISOString(),
  }

  if (passed && (!existing || !existing.passed)) {
    progress.totalXp += 20
  }

  progress.lastStudyDate = new Date().toISOString()
  progress.streak = updateStreak(progress.streak, progress.lastStudyDate)

  saveParticipantProgress(progress)
  return progress
}

/** Katılımcının sertifikasını kaydeder */
export function awardCertificate(participantId: number, trainingId: string): ParticipantProgress {
  const progress = readParticipantProgress(participantId)
  if (!progress.certificates.includes(trainingId)) {
    progress.certificates.push(trainingId)
    progress.totalXp += 100
  }
  saveParticipantProgress(progress)
  return progress
}

/** Son çalışma tarihine göre streak'i günceller */
function updateStreak(currentStreak: number, lastStudyDate: string | null): number {
  if (!lastStudyDate) return 1

  const last = new Date(lastStudyDate)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return currentStreak || 1
  if (diffDays === 1) return currentStreak + 1
  return 1
}

/** Bir eğitimdeki tamamlanma yüzdesini döner */
export function getTrainingProgressPercentage(
  participantId: number,
  _trainingId: string,
  contentIds: string[],
): number {
  const progress = readParticipantProgress(participantId)
  if (contentIds.length === 0) return 0
  const completed = contentIds.filter((id) => progress.contentCompletions[id]).length
  return Math.round((completed / contentIds.length) * 100)
}
