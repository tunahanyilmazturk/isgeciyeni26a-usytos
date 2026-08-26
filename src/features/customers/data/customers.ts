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

export const CUSTOMERS_STORAGE_KEY = 'hantech-customers'

export function readCustomers(): Customer[] {
  if (typeof window === 'undefined') return initialCustomers
  try {
    const stored = window.localStorage.getItem(CUSTOMERS_STORAGE_KEY)
    const parsed = stored ? JSON.parse(stored) : null
    return Array.isArray(parsed) ? (parsed as Customer[]) : initialCustomers
  } catch {
    return initialCustomers
  }
}

export function saveCustomers(customers: Customer[]) {
  if (typeof window !== 'undefined')
    window.localStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(customers))
}

export function readCustomerById(id: string | number): Customer | undefined {
  const numericId = typeof id === 'string' ? Number(id) : id
  return readCustomers().find((c) => c.id === numericId)
}

export const initialCustomers: Customer[] = [
  {
    id: 1,
    name: 'Quantis Tekstil',
    taxNumber: '67000601167',
    sector: 'Tekstil üretimi',
    location: 'Bursa / Nilüfer',
    employees: 84,
    riskLevel: 'Tehlikeli',
    expert: 'Barış Eren',
    doctor: 'Elif Demir',
    expertMinutes: 720,
    doctorMinutes: 360,
    contractStatus: 'Devam ediyor',
    approvalStatus: 'Onaylandı',
    status: 'active',
    contactName: 'Cem Yılmaz',
    contactEmail: 'cem.yilmaz@quantis.com',
    contactPhone: '+90 224 555 12 40',
    updatedAt: 'Bugün, 09:42',
    socialSecurityNumber: '2-95116706-1-1-1857000-35-83-88-5',
    naceCode: '13.92.01 — Ev tekstili ürünleri imalatı',
    participants: 10,
    contractStart: '01.01.2026',
    contractEnd: '31.12.2026',
    approver: 'İSG KATİP sistemi',
    signatory: 'Cem Yılmaz',
    city: 'Bursa',
    district: 'Nilüfer',
    address: 'Organize Sanayi Bölgesi, Nilüfer / Bursa',
    visitPeriod: 'Aylık',
    completedVisits: 5,
    plannedVisits: 7,
    nextVisit: '18 Haziran 2026',
    expertClass: 'B Sınıfı İş Güvenliği Uzmanı',
  },
  {
    id: 2,
    name: 'Pelion Gıda',
    taxNumber: '67000601154',
    sector: 'Gıda ve üretim',
    location: 'İstanbul / Tuzla',
    employees: 126,
    riskLevel: 'Az tehlikeli',
    expert: 'Seda Yalçın',
    doctor: 'Onur Polat',
    expertMinutes: 1080,
    doctorMinutes: 540,
    contractStatus: 'Devam ediyor',
    approvalStatus: 'Onaylandı',
    status: 'active',
    contactName: 'Derya Aydın',
    contactEmail: 'derya.aydin@pelion.com',
    contactPhone: '+90 216 555 08 21',
    updatedAt: 'Dün, 16:18',
    socialSecurityNumber: '2-95116705-1-1-1857000-35-83-88-4',
    naceCode: '10.89.01 — Gıda ürünleri imalatı',
    participants: 14,
    contractStart: '15.02.2026',
    contractEnd: '14.02.2027',
    approver: 'İSG KATİP sistemi',
    signatory: 'Derya Aydın',
    city: 'İstanbul',
    district: 'Tuzla',
    address: 'İstanbul Anadolu Yakası OSB, Tuzla / İstanbul',
    visitPeriod: 'Aylık',
    completedVisits: 4,
    plannedVisits: 6,
    nextVisit: '21 Haziran 2026',
    expertClass: 'A Sınıfı İş Güvenliği Uzmanı',
  },
  {
    id: 3,
    name: 'Vortan Metal',
    taxNumber: '67000601147',
    sector: 'Metal sanayi',
    location: 'Kocaeli / Gebze',
    employees: 58,
    riskLevel: 'Çok tehlikeli',
    expert: 'Ozan Tekin',
    doctor: 'Elif Demir',
    expertMinutes: 960,
    doctorMinutes: 480,
    contractStatus: 'Devam ediyor',
    approvalStatus: 'Onay bekliyor',
    status: 'active',
    contactName: 'Murat Kılıç',
    contactEmail: 'murat.kilic@vortan.com',
    contactPhone: '+90 262 555 41 90',
    updatedAt: '12 Haz, 14:06',
    socialSecurityNumber: '2-95116704-1-1-1857000-35-83-88-3',
    naceCode: '25.62.01 — Metal işleme',
    participants: 8,
    contractStart: '01.03.2026',
    contractEnd: '28.02.2027',
    approver: 'Henüz onaylanmadı',
    signatory: 'Murat Kılıç',
    city: 'Kocaeli',
    district: 'Gebze',
    address: 'Gebze Güzeller OSB, Gebze / Kocaeli',
    visitPeriod: 'Aylık',
    completedVisits: 3,
    plannedVisits: 5,
    nextVisit: '16 Haziran 2026',
    expertClass: 'C Sınıfı İş Güvenliği Uzmanı',
  },
  {
    id: 4,
    name: 'Nexora Kimya',
    taxNumber: '67000601130',
    sector: 'Kimya',
    location: 'İzmir / Aliağa',
    employees: 43,
    riskLevel: 'Tehlikeli',
    expert: 'Deniz Kara',
    doctor: 'Onur Polat',
    expertMinutes: 600,
    doctorMinutes: 300,
    contractStatus: 'Teklif aşamasında',
    approvalStatus: 'Onay bekliyor',
    status: 'active',
    contactName: 'Selin Özkan',
    contactEmail: 'selin.ozkan@nexora.com',
    contactPhone: '+90 232 555 19 63',
    updatedAt: '11 Haz, 10:24',
    socialSecurityNumber: '2-95116703-1-1-1857000-35-83-88-2',
    naceCode: '20.59.01 — Kimyasal ürünler imalatı',
    participants: 7,
    contractStart: '01.04.2026',
    contractEnd: 'Teklif bekleniyor',
    approver: 'Henüz onaylanmadı',
    signatory: 'Selin Özkan',
    city: 'İzmir',
    district: 'Aliağa',
    address: 'Aliağa Organize Sanayi Bölgesi / İzmir',
    visitPeriod: 'Aylık',
    completedVisits: 2,
    plannedVisits: 4,
    nextVisit: '24 Haziran 2026',
    expertClass: 'B Sınıfı İş Güvenliği Uzmanı',
  },
  {
    id: 5,
    name: 'Asteria Lojistik',
    taxNumber: '67000601123',
    sector: 'Lojistik',
    location: 'Ankara / Sincan',
    employees: 72,
    riskLevel: 'Az tehlikeli',
    expert: 'Mert Acar',
    doctor: 'Elif Demir',
    expertMinutes: 720,
    doctorMinutes: 360,
    contractStatus: 'Devam ediyor',
    approvalStatus: 'Onaylandı',
    status: 'active',
    contactName: 'Kaan Erdem',
    contactEmail: 'kaan.erdem@asteria.com',
    contactPhone: '+90 312 555 27 11',
    updatedAt: '10 Haz, 18:32',
    socialSecurityNumber: '2-95116702-1-1-1857000-35-83-88-1',
    naceCode: '52.10.01 — Depolama ve lojistik',
    participants: 9,
    contractStart: '10.01.2026',
    contractEnd: '09.01.2027',
    approver: 'İSG KATİP sistemi',
    signatory: 'Kaan Erdem',
    city: 'Ankara',
    district: 'Sincan',
    address: 'Ankara Lojistik Üssü, Sincan / Ankara',
    visitPeriod: 'Aylık',
    completedVisits: 5,
    plannedVisits: 6,
    nextVisit: '20 Haziran 2026',
    expertClass: 'A Sınıfı İş Güvenliği Uzmanı',
  },
  {
    id: 6,
    name: 'Novatek Yapı',
    taxNumber: '67000601116',
    sector: 'Yapı ve inşaat',
    location: 'İstanbul / Ataşehir',
    employees: 31,
    riskLevel: 'Çok tehlikeli',
    expert: 'Barış Eren',
    doctor: 'Onur Polat',
    expertMinutes: 480,
    doctorMinutes: 240,
    contractStatus: 'Sonlandırıldı',
    approvalStatus: 'Onaylandı',
    status: 'passive',
    contactName: 'Berk Can',
    contactEmail: 'berk.can@novatek.com',
    contactPhone: '+90 216 555 31 08',
    updatedAt: '08 Haz, 11:55',
    socialSecurityNumber: '2-95116701-1-1-1857000-35-83-88-0',
    naceCode: '41.20.01 — Bina inşaatı',
    participants: 5,
    contractStart: '01.02.2026',
    contractEnd: '31.05.2026',
    approver: 'İSG KATİP sistemi',
    signatory: 'Berk Can',
    city: 'İstanbul',
    district: 'Ataşehir',
    address: 'Barbaros Mahallesi, Ataşehir / İstanbul',
    visitPeriod: 'Aylık',
    completedVisits: 2,
    plannedVisits: 2,
    nextVisit: '—',
    expertClass: 'B Sınıfı İş Güvenliği Uzmanı',
  },
  {
    id: 7,
    name: 'Luma Elektronik',
    taxNumber: '67000601009',
    sector: 'Elektronik',
    location: 'Bursa / Osmangazi',
    employees: 14,
    riskLevel: 'Az tehlikeli',
    expert: 'Seda Yalçın',
    doctor: 'Onur Polat',
    expertMinutes: 240,
    doctorMinutes: 120,
    contractStatus: 'Devam ediyor',
    approvalStatus: 'Onaylandı',
    status: 'active',
    contactName: 'İrem Şen',
    contactEmail: 'irem.sen@luma.com',
    contactPhone: '+90 224 555 44 12',
    updatedAt: '06 Haz, 15:21',
    socialSecurityNumber: '2-95116700-1-1-1857000-35-83-88-9',
    naceCode: '26.11.01 — Elektronik devre imalatı',
    participants: 4,
    contractStart: '12.03.2026',
    contractEnd: '11.03.2027',
    approver: 'İSG KATİP sistemi',
    signatory: 'İrem Şen',
    city: 'Bursa',
    district: 'Osmangazi',
    address: 'Küçük Sanayi Sitesi, Osmangazi / Bursa',
    visitPeriod: 'Üç aylık',
    completedVisits: 1,
    plannedVisits: 2,
    nextVisit: '02 Temmuz 2026',
    expertClass: 'A Sınıfı İş Güvenliği Uzmanı',
  },
  {
    id: 8,
    name: 'Arvento Enerji',
    taxNumber: '67000601992',
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
    contactName: 'Oğuz Kaya',
    contactEmail: 'oguz.kaya@arvento.com',
    contactPhone: '+90 332 555 62 18',
    updatedAt: '04 Haz, 09:15',
    socialSecurityNumber: '2-95116699-1-1-1857000-35-83-88-8',
    naceCode: '35.11.01 — Elektrik enerjisi üretimi',
    participants: 0,
    contractStart: '—',
    contractEnd: '—',
    approver: 'Henüz onaylanmadı',
    signatory: 'Oğuz Kaya',
    city: 'Konya',
    district: 'Selçuklu',
    address: 'Konya Teknoloji Sanayi Bölgesi / Konya',
    visitPeriod: '—',
    completedVisits: 0,
    plannedVisits: 0,
    nextVisit: '—',
    expertClass: '—',
  },
]
