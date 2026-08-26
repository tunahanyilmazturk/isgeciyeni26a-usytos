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
  { id: 1, name: 'Katilımcı 5516-08', username: 'demo_c5516_p08_o1167', email: 'katilimci5516_08@cetka-osgb.demo.local', phone: '+90 532 000 08 16', tcNumber: '10011670048', companyId: 1, company: 'Quantis Tekstil', riskLevel: 'Tehlikeli', department: 'Üretim', trainingMinutes: 0, progress: 0, trainingStatus: 'not_started', lastCompletion: '—', nextTraining: '—', status: 'active', lastLogin: '16.07.2026 09:56' },
  { id: 2, name: 'Katilımcı 5516-10', username: 'demo_c5516_p10_o1167', email: 'katilimci5516_10@cetka-osgb.demo.local', phone: '+90 532 000 10 16', tcNumber: '10011670050', companyId: 1, company: 'Quantis Tekstil', riskLevel: 'Tehlikeli', department: 'İnsan Kaynakları', trainingMinutes: 0, progress: 0, trainingStatus: 'not_started', lastCompletion: '—', nextTraining: '—', status: 'active', lastLogin: '14.07.2026 11:10' },
  { id: 3, name: 'Katilımcı 5516-09', username: 'demo_c5516_p09_o1167', email: 'katilimci5516_09@cetka-osgb.demo.local', phone: '+90 532 000 09 16', tcNumber: '10011670049', companyId: 1, company: 'Quantis Tekstil', riskLevel: 'Tehlikeli', department: 'Kalite', trainingMinutes: 0, progress: 0, trainingStatus: 'not_started', lastCompletion: '—', nextTraining: '—', status: 'active', lastLogin: '15.07.2026 10:03' },
  { id: 4, name: 'Katilımcı 5516-06', username: 'demo_c5516_p06_o1167', email: 'katilimci5516_06@cetka-osgb.demo.local', phone: '+90 532 000 06 16', tcNumber: '10011670046', companyId: 1, company: 'Quantis Tekstil', riskLevel: 'Tehlikeli', department: 'Operasyon', trainingMinutes: 51, progress: 2, trainingStatus: 'in_progress', lastCompletion: '—', nextTraining: '—', status: 'active', lastLogin: '18.07.2026 15:42' },
  { id: 5, name: 'Katilımcı 5516-07', username: 'demo_c5516_p07_o1167', email: 'katilimci5516_07@cetka-osgb.demo.local', phone: '+90 532 000 07 16', tcNumber: '10011670047', companyId: 1, company: 'Quantis Tekstil', riskLevel: 'Tehlikeli', department: 'Yönetim', trainingMinutes: 67, progress: 100, trainingStatus: 'failed', lastCompletion: '—', nextTraining: '—', status: 'active', lastLogin: '17.07.2026 16:49' },
  { id: 6, name: 'Katilımcı 5516-03', username: 'demo_c5516_p03_o1167', email: 'katilimci5516_03@cetka-osgb.demo.local', phone: '+90 532 000 03 16', tcNumber: '10011670043', companyId: 1, company: 'Quantis Tekstil', riskLevel: 'Tehlikeli', department: 'Üretim', trainingMinutes: 2097, progress: 100, trainingStatus: 'successful', lastCompletion: '03.07.2026', nextTraining: '03.07.2028', status: 'active', lastLogin: '21.07.2026 12:21' },
  { id: 7, name: 'Katilımcı 5515-10', username: 'demo_c5515_p10_o1167', email: 'katilimci5515_10@cetka-osgb.demo.local', phone: '+90 532 000 10 15', tcNumber: '10011670040', companyId: 2, company: 'Pelion Gıda', riskLevel: 'Az tehlikeli', department: 'Paketleme', trainingMinutes: 0, progress: 0, trainingStatus: 'not_started', lastCompletion: '—', nextTraining: '—', status: 'active', lastLogin: '19.07.2026 11:10' },
  { id: 8, name: 'Katilımcı 5515-07', username: 'demo_c5515_p07_o1167', email: 'katilimci5515_07@cetka-osgb.demo.local', phone: '+90 532 000 07 15', tcNumber: '10011670037', companyId: 2, company: 'Pelion Gıda', riskLevel: 'Az tehlikeli', department: 'Üretim', trainingMinutes: 67, progress: 100, trainingStatus: 'failed', lastCompletion: '—', nextTraining: '—', status: 'active', lastLogin: '24.06.2026 16:49' },
  { id: 9, name: 'Katilımcı 5513-04', username: 'demo_c5513_p04_o1167', email: 'katilimci5513_04@cetka-osgb.demo.local', phone: '+90 532 000 04 13', tcNumber: '10011670034', companyId: 3, company: 'Nexora Kimya', riskLevel: 'Tehlikeli', department: 'Laboratuvar', trainingMinutes: 840, progress: 76, trainingStatus: 'in_progress', lastCompletion: '—', nextTraining: '15.08.2026', status: 'active', lastLogin: '20.07.2026 09:21' },
  { id: 10, name: 'Katilımcı 5514-02', username: 'demo_c5514_p02_o1167', email: 'katilimci5514_02@cetka-osgb.demo.local', phone: '+90 532 000 02 14', tcNumber: '10011670032', companyId: 4, company: 'Vortan Metal', riskLevel: 'Çok tehlikeli', department: 'Bakım', trainingMinutes: 2640, progress: 100, trainingStatus: 'successful', lastCompletion: '07.07.2026', nextTraining: '07.07.2028', status: 'active', lastLogin: '22.07.2026 14:18' },
  { id: 11, name: 'Katilımcı 5512-01', username: 'demo_c5512_p01_o1167', email: 'katilimci5512_01@cetka-osgb.demo.local', phone: '+90 532 000 01 12', tcNumber: '10011670031', companyId: 5, company: 'Asteria Lojistik', riskLevel: 'Az tehlikeli', department: 'Sevkiyat', trainingMinutes: 0, progress: 0, trainingStatus: 'not_started', lastCompletion: '—', nextTraining: '—', status: 'passive', lastLogin: '11.07.2026 10:04' },
  { id: 12, name: 'Katilımcı 5512-02', username: 'demo_c5512_p02_o1167', email: 'katilimci5512_02@cetka-osgb.demo.local', phone: '+90 532 000 02 12', tcNumber: '10011670033', companyId: 5, company: 'Asteria Lojistik', riskLevel: 'Az tehlikeli', department: 'Depo', trainingMinutes: 420, progress: 42, trainingStatus: 'in_progress', lastCompletion: '—', nextTraining: '22.08.2026', status: 'active', lastLogin: '21.07.2026 13:44' },
]
