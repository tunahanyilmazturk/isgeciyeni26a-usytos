export type ExpertTitle = 'A Sınıfı İş Güvenliği Uzmanı' | 'B Sınıfı İş Güvenliği Uzmanı' | 'C Sınıfı İş Güvenliği Uzmanı'

export interface Expert {
  id: number
  firstName: string
  lastName: string
  title: ExpertTitle
  certificateNumber: string
  maxServiceDuration: number
  usedServiceDuration: number
  email?: string
  phone?: string
  status: 'active' | 'inactive'
}

export type DoctorLevel = 'Asistan' | 'Dr.' | 'Prof.'

export interface Doctor {
  id: number
  doctorLevel: DoctorLevel
  firstName: string
  lastName: string
  title: 'İşyeri Hekimi'
  certificateNumber: string
  maxServiceDuration: number
  usedServiceDuration: number
  email?: string
  phone?: string
  status: 'active' | 'inactive'
}

export const EXPERTS_STORAGE_KEY = 'hantech-experts'
export const DOCTORS_STORAGE_KEY = 'hantech-doctors'

export function readExperts(): Expert[] {
  if (typeof window === 'undefined') return initialExperts
  try {
    const stored = window.localStorage.getItem(EXPERTS_STORAGE_KEY)
    const parsed = stored ? JSON.parse(stored) : null
    return Array.isArray(parsed) ? (parsed as Expert[]) : initialExperts
  } catch {
    return initialExperts
  }
}

export function saveExperts(experts: Expert[]) {
  if (typeof window !== 'undefined')
    window.localStorage.setItem(EXPERTS_STORAGE_KEY, JSON.stringify(experts))
}

export function readDoctors(): Doctor[] {
  if (typeof window === 'undefined') return initialDoctors
  try {
    const stored = window.localStorage.getItem(DOCTORS_STORAGE_KEY)
    const parsed = stored ? JSON.parse(stored) : null
    return Array.isArray(parsed) ? (parsed as Doctor[]) : initialDoctors
  } catch {
    return initialDoctors
  }
}

export function saveDoctors(doctors: Doctor[]) {
  if (typeof window !== 'undefined')
    window.localStorage.setItem(DOCTORS_STORAGE_KEY, JSON.stringify(doctors))
}

export const initialExperts: Expert[] = [
  { id: 279, firstName: 'Demo', lastName: 'Uzman 01', title: 'B Sınıfı İş Güvenliği Uzmanı', certificateNumber: 'B-2024-0182', maxServiceDuration: 11700, usedServiceDuration: 6240, email: 'baris.eren@example.invalid', status: 'active' },
  { id: 278, firstName: 'Demo', lastName: 'Uzman 02', title: 'A Sınıfı İş Güvenliği Uzmanı', certificateNumber: 'A-2023-0094', maxServiceDuration: 11700, usedServiceDuration: 8100, email: 'seda.yalcin@example.invalid', status: 'active' },
  { id: 277, firstName: 'Demo', lastName: 'Uzman 03', title: 'C Sınıfı İş Güvenliği Uzmanı', certificateNumber: 'C-2025-0317', maxServiceDuration: 11700, usedServiceDuration: 2950, phone: '+90 000 000 00 00', status: 'active' },
  { id: 276, firstName: 'Demo', lastName: 'Uzman 04', title: 'B Sınıfı İş Güvenliği Uzmanı', certificateNumber: 'B-2024-0141', maxServiceDuration: 11700, usedServiceDuration: 11700, email: 'deniz.kara@example.invalid', status: 'active' },
  { id: 275, firstName: 'Demo', lastName: 'Uzman 05', title: 'A Sınıfı İş Güvenliği Uzmanı', certificateNumber: 'A-2022-0068', maxServiceDuration: 11700, usedServiceDuration: 0, status: 'inactive' },
]

export const initialDoctors: Doctor[] = [
  { id: 195, doctorLevel: 'Dr.', firstName: 'Demo', lastName: 'Hekim 01', title: 'İşyeri Hekimi', certificateNumber: 'HEK-2024-0108', maxServiceDuration: 11700, usedServiceDuration: 4680, email: 'onur.polat@example.invalid', status: 'active' },
  { id: 194, doctorLevel: 'Dr.', firstName: 'Demo', lastName: 'Hekim 02', title: 'İşyeri Hekimi', certificateNumber: 'HEK-2023-0074', maxServiceDuration: 11700, usedServiceDuration: 7020, email: 'elif.demir@example.invalid', status: 'active' },
]
