import { z } from 'zod'
import { readStorage, writeStorage } from '@/lib/storage'

export type TrainingPackage = 'Temel Paket' | 'Sektör Paketi'
export type TrainingRisk = 'Az Tehlikeli' | 'Tehlikeli' | 'Çok Tehlikeli'
export type ContentItemType = 'slide' | 'video'

export interface Slide {
  id: string
  title: string
  content: string
  mediaUrl?: string
}

export interface ContentItem {
  id: string
  title: string
  type: ContentItemType
  slides?: Slide[]
  videoUrl?: string
}

export interface Question {
  id: string
  text: string
  options: string[]
  correctIndex: number
}

export interface Quiz {
  id: string
  title: string
  questions: Question[]
}

export interface TrainingModule {
  id: string
  title: string
  items: ContentItem[]
  quiz?: Quiz
}

export interface Training {
  id: string
  name: string
  package: TrainingPackage
  risk: TrainingRisk
  description: string
  passingScore: number
  modules: TrainingModule[]
  contentVersion?: number
}

const slideSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  mediaUrl: z.string().optional(),
})

const contentItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.enum(['slide', 'video']),
  slides: z.array(slideSchema).optional(),
  videoUrl: z.string().optional(),
})

const questionSchema = z.object({
  id: z.string(),
  text: z.string(),
  options: z.array(z.string()),
  correctIndex: z.number(),
})

const quizSchema = z.object({
  id: z.string(),
  title: z.string(),
  questions: z.array(questionSchema),
})

const moduleSchema = z.object({
  id: z.string(),
  title: z.string(),
  items: z.array(contentItemSchema),
  quiz: z.union([quizSchema, z.undefined()]).optional(),
})

const trainingSchema = z.object({
  id: z.string(),
  name: z.string(),
  package: z.enum(['Temel Paket', 'Sektör Paketi']),
  risk: z.enum(['Az Tehlikeli', 'Tehlikeli', 'Çok Tehlikeli']),
  description: z.string(),
  passingScore: z.number(),
  modules: z.array(moduleSchema),
  contentVersion: z.number().optional(),
})

const trainingsSchema = z.array(trainingSchema)

const STORAGE_KEY = 'hantech-trainings'

export function readTrainings(): Training[] {
  return readStorage(STORAGE_KEY, [], trainingsSchema)
}

export function saveTrainings(trainings: Training[]): boolean {
  return writeStorage(STORAGE_KEY, trainings)
}

export function addTraining(training: Training): Training[] {
  const trainings = readTrainings()
  const updated = [...trainings, training]
  saveTrainings(updated)
  return updated
}

export function updateTraining(id: string, patch: Partial<Training>): Training[] {
  const trainings = readTrainings()
  const updated = trainings.map((t) => (t.id === id ? { ...t, ...patch } : t))
  saveTrainings(updated)
  return updated
}

export function removeTraining(id: string): Training[] {
  const trainings = readTrainings()
  const updated = trainings.filter((t) => t.id !== id)
  saveTrainings(updated)
  return updated
}

/** Geriye dönük uyumluluk: eski kodlarda hâlâ trainingCatalog olarak kullanılan
 *  importları bozmamak için readTrainings() sonucunu döner. */
export const trainingCatalog: Training[] = readTrainings()

export { trainingSchema }
