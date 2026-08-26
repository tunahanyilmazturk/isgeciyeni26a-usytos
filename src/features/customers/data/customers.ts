import { z } from 'zod'
import { readStorage, writeStorage } from '@/lib/storage'

export type RiskLevel = 'Az tehlikeli' | 'Tehlikeli' | 'Çok tehlikeli'
export type ContractStatus = 'Devam ediyor' | 'Teklif aşamasında' | 'Sonlandırıldı'
export type ApprovalStatus = 'Onaylandı' | 'Onay bekliyor'
export type CompanyStatus = 'active' | 'passive'

export interface Customer {
  id: number
  name: string
  taxNumber: string
  sector: string
  location: string
  employees: number
  riskLevel: RiskLevel
  expert: string
  doctor: string
  expertMinutes: number
  doctorMinutes: number
  contractStatus: ContractStatus
  approvalStatus: ApprovalStatus
  status: CompanyStatus
  contactName: string
  contactEmail: string
  contactPhone: string
  updatedAt: string
  // — Detail ek alanları (opsiyonel, CustomerDetailPage için) —
  socialSecurityNumber?: string
  naceCode?: string
  participants?: number
  contractStart?: string
  contractEnd?: string
  approver?: string
  signatory?: string
  city?: string
  district?: string
  address?: string
  accountant?: string
  accountantPhone?: string
  accountantEmail?: string
  visitPeriod?: string
  completedVisits?: number
  plannedVisits?: number
  nextVisit?: string
  expertClass?: string
}

const customerSchema = z.object({
  id: z.number(),
  name: z.string(),
  taxNumber: z.string(),
  sector: z.string(),
  location: z.string(),
  employees: z.number(),
  riskLevel: z.enum(['Az tehlikeli', 'Tehlikeli', 'Çok tehlikeli']),
  expert: z.string(),
  doctor: z.string(),
  expertMinutes: z.number(),
  doctorMinutes: z.number(),
  contractStatus: z.enum(['Devam ediyor', 'Teklif aşamasında', 'Sonlandırıldı']),
  approvalStatus: z.enum(['Onaylandı', 'Onay bekliyor']),
  status: z.enum(['active', 'passive']),
  contactName: z.string(),
  contactEmail: z.string(),
  contactPhone: z.string(),
  updatedAt: z.string(),
}).passthrough()
const customersSchema = z.array(customerSchema)

export const CUSTOMERS_STORAGE_KEY = 'hantech-customers'

export function readCustomers(): Customer[] {
  return readStorage(CUSTOMERS_STORAGE_KEY, initialCustomers, customersSchema)
}

export function saveCustomers(customers: Customer[]): boolean {
  return writeStorage(CUSTOMERS_STORAGE_KEY, customers)
}

export function readCustomerById(id: string | number): Customer | undefined {
  const numericId = typeof id === 'string' ? Number(id) : id
  return readCustomers().find((c) => c.id === numericId)
}

export const initialCustomers: Customer[] = [
  {
    id: 1,
    name: 'Quantis Tekstil',
    taxNumber: 'DEMO-VKN-001',
    sector: 'Tekstil üretimi',
    location: 'Bursa / Nilüfer',
    employees: 84,
    riskLevel: 'Tehlikeli',
    expert: 'Demo Uzman 01',
    doctor: 'Demo Hekim 01',
    expertMinutes: 720,
    doctorMinutes: 360,
    contractStatus: 'Devam ediyor',
    approvalStatus: 'Onaylandı',
    status: 'active',
    contactName: 'Demo Yetkili 01',
    contactEmail: 'firma01@example.invalid',
    contactPhone: '+90 000 000 00 01',
    updatedAt: 'Bugün, 09:42',
    socialSecurityNumber: 'DEMO-SGK-16706-1-1-1857000-35-83-88-5',
    naceCode: '13.92.01 — Ev tekstili ürünleri imalatı',
    participants: 10,
    contractStart: '01.01.2026',
    contractEnd: '31.12.2026',
    approver: 'İSG KATİP sistemi',
    signatory: 'Demo Yetkili 01',
    city: 'Bursa',
    district: 'Nilüfer',
    address: 'Demo adresi 01',
    visitPeriod: 'Aylık',
    completedVisits: 5,
    plannedVisits: 7,
    nextVisit: '18 Haziran 2026',
    expertClass: 'B Sınıfı İş Güvenliği Uzmanı',
  },
  {
    id: 2,
    name: 'Pelion Gıda',
    taxNumber: 'DEMO-VKN-002',
    sector: 'Gıda ve üretim',
    location: 'İstanbul / Tuzla',
    employees: 126,
    riskLevel: 'Az tehlikeli',
    expert: 'Demo Uzman 02',
    doctor: 'Demo Hekim 02',
    expertMinutes: 1080,
    doctorMinutes: 540,
    contractStatus: 'Devam ediyor',
    approvalStatus: 'Onaylandı',
    status: 'active',
    contactName: 'Demo Yetkili 02',
    contactEmail: 'firma02@example.invalid',
    contactPhone: '+90 000 000 00 02',
    updatedAt: 'Dün, 16:18',
    socialSecurityNumber: 'DEMO-SGK-16705-1-1-1857000-35-83-88-4',
    naceCode: '10.89.01 — Gıda ürünleri imalatı',
    participants: 14,
    contractStart: '15.02.2026',
    contractEnd: '14.02.2027',
    approver: 'İSG KATİP sistemi',
    signatory: 'Demo Yetkili 02',
    city: 'İstanbul',
    district: 'Tuzla',
    address: 'Demo adresi 02',
    visitPeriod: 'Aylık',
    completedVisits: 4,
    plannedVisits: 6,
    nextVisit: '21 Haziran 2026',
    expertClass: 'A Sınıfı İş Güvenliği Uzmanı',
  },
  {
    id: 3,
    name: 'Vortan Metal',
    taxNumber: 'DEMO-VKN-003',
    sector: 'Metal sanayi',
    location: 'Kocaeli / Gebze',
    employees: 58,
    riskLevel: 'Çok tehlikeli',
    expert: 'Demo Uzman 03',
    doctor: 'Demo Hekim 01',
    expertMinutes: 960,
    doctorMinutes: 480,
    contractStatus: 'Devam ediyor',
    approvalStatus: 'Onay bekliyor',
    status: 'active',
    contactName: 'Demo Yetkili 03',
    contactEmail: 'firma03@example.invalid',
    contactPhone: '+90 000 000 00 03',
    updatedAt: '12 Haz, 14:06',
    socialSecurityNumber: 'DEMO-SGK-16704-1-1-1857000-35-83-88-3',
    naceCode: '25.62.01 — Metal işleme',
    participants: 8,
    contractStart: '01.03.2026',
    contractEnd: '28.02.2027',
    approver: 'Henüz onaylanmadı',
    signatory: 'Demo Yetkili 03',
    city: 'Kocaeli',
    district: 'Gebze',
    address: 'Demo adresi 03',
    visitPeriod: 'Aylık',
    completedVisits: 3,
    plannedVisits: 5,
    nextVisit: '16 Haziran 2026',
    expertClass: 'C Sınıfı İş Güvenliği Uzmanı',
  },
  {
    id: 4,
    name: 'Nexora Kimya',
    taxNumber: 'DEMO-VKN-004',
    sector: 'Kimya',
    location: 'İzmir / Aliağa',
    employees: 43,
    riskLevel: 'Tehlikeli',
    expert: 'Demo Uzman 04',
    doctor: 'Demo Hekim 02',
    expertMinutes: 600,
    doctorMinutes: 300,
    contractStatus: 'Teklif aşamasında',
    approvalStatus: 'Onay bekliyor',
    status: 'active',
    contactName: 'Demo Yetkili 04',
    contactEmail: 'firma04@example.invalid',
    contactPhone: '+90 000 000 00 04',
    updatedAt: '11 Haz, 10:24',
    socialSecurityNumber: 'DEMO-SGK-16703-1-1-1857000-35-83-88-2',
    naceCode: '20.59.01 — Kimyasal ürünler imalatı',
    participants: 7,
    contractStart: '01.04.2026',
    contractEnd: 'Teklif bekleniyor',
    approver: 'Henüz onaylanmadı',
    signatory: 'Demo Yetkili 04',
    city: 'İzmir',
    district: 'Aliağa',
    address: 'Demo adresi 04',
    visitPeriod: 'Aylık',
    completedVisits: 2,
    plannedVisits: 4,
    nextVisit: '24 Haziran 2026',
    expertClass: 'B Sınıfı İş Güvenliği Uzmanı',
  },
  {
    id: 5,
    name: 'Asteria Lojistik',
    taxNumber: 'DEMO-VKN-005',
    sector: 'Lojistik',
    location: 'Ankara / Sincan',
    employees: 72,
    riskLevel: 'Az tehlikeli',
    expert: 'Demo Uzman 05',
    doctor: 'Demo Hekim 01',
    expertMinutes: 720,
    doctorMinutes: 360,
    contractStatus: 'Devam ediyor',
    approvalStatus: 'Onaylandı',
    status: 'active',
    contactName: 'Demo Yetkili 05',
    contactEmail: 'firma05@example.invalid',
    contactPhone: '+90 000 000 00 05',
    updatedAt: '10 Haz, 18:32',
    socialSecurityNumber: 'DEMO-SGK-16702-1-1-1857000-35-83-88-1',
    naceCode: '52.10.01 — Depolama ve lojistik',
    participants: 9,
    contractStart: '10.01.2026',
    contractEnd: '09.01.2027',
    approver: 'İSG KATİP sistemi',
    signatory: 'Demo Yetkili 05',
    city: 'Ankara',
    district: 'Sincan',
    address: 'Demo adresi 05',
    visitPeriod: 'Aylık',
    completedVisits: 5,
    plannedVisits: 6,
    nextVisit: '20 Haziran 2026',
    expertClass: 'A Sınıfı İş Güvenliği Uzmanı',
  },
  {
    id: 6,
    name: 'Novatek Yapı',
    taxNumber: 'DEMO-VKN-006',
    sector: 'Yapı ve inşaat',
    location: 'İstanbul / Ataşehir',
    employees: 31,
    riskLevel: 'Çok tehlikeli',
    expert: 'Demo Uzman 01',
    doctor: 'Demo Hekim 02',
    expertMinutes: 480,
    doctorMinutes: 240,
    contractStatus: 'Sonlandırıldı',
    approvalStatus: 'Onaylandı',
    status: 'passive',
    contactName: 'Demo Yetkili 06',
    contactEmail: 'firma06@example.invalid',
    contactPhone: '+90 000 000 00 06',
    updatedAt: '08 Haz, 11:55',
    socialSecurityNumber: 'DEMO-SGK-16701-1-1-1857000-35-83-88-0',
    naceCode: '41.20.01 — Bina inşaatı',
    participants: 5,
    contractStart: '01.02.2026',
    contractEnd: '31.05.2026',
    approver: 'İSG KATİP sistemi',
    signatory: 'Demo Yetkili 06',
    city: 'İstanbul',
    district: 'Ataşehir',
    address: 'Demo adresi 06',
    visitPeriod: 'Aylık',
    completedVisits: 2,
    plannedVisits: 2,
    nextVisit: '—',
    expertClass: 'B Sınıfı İş Güvenliği Uzmanı',
  },
  {
    id: 7,
    name: 'Luma Elektronik',
    taxNumber: 'DEMO-VKN-007',
    sector: 'Elektronik',
    location: 'Bursa / Osmangazi',
    employees: 14,
    riskLevel: 'Az tehlikeli',
    expert: 'Demo Uzman 02',
    doctor: 'Demo Hekim 02',
    expertMinutes: 240,
    doctorMinutes: 120,
    contractStatus: 'Devam ediyor',
    approvalStatus: 'Onaylandı',
    status: 'active',
    contactName: 'Demo Yetkili 07',
    contactEmail: 'firma07@example.invalid',
    contactPhone: '+90 000 000 00 07',
    updatedAt: '06 Haz, 15:21',
    socialSecurityNumber: 'DEMO-SGK-16700-1-1-1857000-35-83-88-9',
    naceCode: '26.11.01 — Elektronik devre imalatı',
    participants: 4,
    contractStart: '12.03.2026',
    contractEnd: '11.03.2027',
    approver: 'İSG KATİP sistemi',
    signatory: 'Demo Yetkili 07',
    city: 'Bursa',
    district: 'Osmangazi',
    address: 'Demo adresi 07',
    visitPeriod: 'Üç aylık',
    completedVisits: 1,
    plannedVisits: 2,
    nextVisit: '02 Temmuz 2026',
    expertClass: 'A Sınıfı İş Güvenliği Uzmanı',
  },
  {
    id: 8,
    name: 'Arvento Enerji',
    taxNumber: 'DEMO-VKN-008',
    sector: 'Enerji',
    location: 'Konya / Selçuklu',
    employees: 0,
    riskLevel: 'Çok tehlikeli',
    expert: '',
    doctor: '',
    expertMinutes: 0,
    doctorMinutes: 0,
    contractStatus: 'Teklif aşamasında',
    approvalStatus: 'Onay bekliyor',
    status: 'active',
    contactName: 'Demo Yetkili 08',
    contactEmail: 'firma08@example.invalid',
    contactPhone: '+90 000 000 00 08',
    updatedAt: '04 Haz, 09:15',
    socialSecurityNumber: 'DEMO-SGK-16699-1-1-1857000-35-83-88-8',
    naceCode: '35.11.01 — Elektrik enerjisi üretimi',
    participants: 0,
    contractStart: '—',
    contractEnd: '—',
    approver: 'Henüz onaylanmadı',
    signatory: 'Demo Yetkili 08',
    city: 'Konya',
    district: 'Selçuklu',
    address: 'Demo adresi 08',
    visitPeriod: '—',
    completedVisits: 0,
    plannedVisits: 0,
    nextVisit: '—',
    expertClass: '—',
  },
]
