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

export const PARTICIPANTS_STORAGE_KEY = 'hantech-participants'

export function readParticipants() {
  if (typeof window === 'undefined') return initialParticipants
  try {
    const stored = window.localStorage.getItem(PARTICIPANTS_STORAGE_KEY)
    const parsed = stored ? JSON.parse(stored) : null
    return Array.isArray(parsed) ? parsed as Participant[] : initialParticipants
  } catch {
    return initialParticipants
  }
}

export function saveParticipants(participants: Participant[]) {
  if (typeof window !== 'undefined') window.localStorage.setItem(PARTICIPANTS_STORAGE_KEY, JSON.stringify(participants))
}

export const initialParticipants: Participant[] = [
  { id: 1, name: 'Ahmet Yılmaz', username: 'ahmet.yilmaz', email: '—', phone: '—', tcNumber: '—', companyId: 1, company: 'Quantis Tekstil', riskLevel: 'Tehlikeli', department: 'Üretim', trainingMinutes: 0, progress: 0, trainingStatus: 'not_started', lastCompletion: '—', nextTraining: '—', status: 'active', lastLogin: 'Henüz giriş yapmadı', password: '123456' },
  { id: 2, name: 'Ayşe Demir', username: 'ayse.demir', email: '—', phone: '—', tcNumber: '—', companyId: 1, company: 'Quantis Tekstil', riskLevel: 'Tehlikeli', department: 'İnsan Kaynakları', trainingMinutes: 0, progress: 0, trainingStatus: 'not_started', lastCompletion: '—', nextTraining: '—', status: 'active', lastLogin: 'Henüz giriş yapmadı', password: '123456' },
  { id: 3, name: 'Mehmet Kaya', username: 'mehmet.kaya', email: '—', phone: '—', tcNumber: '—', companyId: 2, company: 'Pelion Gıda', riskLevel: 'Az tehlikeli', department: 'Paketleme', trainingMinutes: 0, progress: 0, trainingStatus: 'not_started', lastCompletion: '—', nextTraining: '—', status: 'active', lastLogin: 'Henüz giriş yapmadı', password: '123456' },
  { id: 4, name: 'Fatma Şahin', username: 'fatma.sahin', email: '—', phone: '—', tcNumber: '—', companyId: 3, company: 'Nexora Kimya', riskLevel: 'Tehlikeli', department: 'Laboratuvar', trainingMinutes: 0, progress: 0, trainingStatus: 'not_started', lastCompletion: '—', nextTraining: '—', status: 'active', lastLogin: 'Henüz giriş yapmadı', password: '123456' },
  { id: 5, name: 'Mustafa Çelik', username: 'mustafa.celik', email: '—', phone: '—', tcNumber: '—', companyId: 4, company: 'Vortan Metal', riskLevel: 'Çok tehlikeli', department: 'Bakım', trainingMinutes: 0, progress: 0, trainingStatus: 'not_started', lastCompletion: '—', nextTraining: '—', status: 'active', lastLogin: 'Henüz giriş yapmadı', password: '123456' },
  { id: 6, name: 'Emine Yıldız', username: 'emine.yildiz', email: '—', phone: '—', tcNumber: '—', companyId: 5, company: 'Asteria Lojistik', riskLevel: 'Az tehlikeli', department: 'Depo', trainingMinutes: 0, progress: 0, trainingStatus: 'not_started', lastCompletion: '—', nextTraining: '—', status: 'active', lastLogin: 'Henüz giriş yapmadı', password: '123456' },
]
