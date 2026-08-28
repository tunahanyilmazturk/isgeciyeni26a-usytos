import { z } from 'zod'
import { writeStorage } from '@/lib/storage'

export const COMPANY_INFO_STORAGE_KEY = 'hantech-company-info'

export const companyProfileSchema = z.object({
  name: z.string().trim().min(2),
  phone: z.string().trim(),
  email: z.string().trim(),
  website: z.string().trim(),
  taxOffice: z.string().trim(),
  taxNumber: z.string().trim(),
  registryNumber: z.string().trim(),
  authorizationCertificate: z.string().trim(),
  address: z.string().trim().min(5),
  certificateIssuerTitle: z.string().trim(),
  logoDataUrl: z.string(),
  logoFileName: z.string(),
  sealDataUrl: z.string(),
  sealFileName: z.string(),
  participantOtpEnabled: z.boolean(),
  participantOtpChannel: z.string(),
  staffOtpEnabled: z.boolean(),
  staffOtpChannel: z.string(),
  notifyEmail: z.boolean(),
  notifySms: z.boolean(),
})

export type CompanyProfile = z.infer<typeof companyProfileSchema>

export const defaultCompanyProfile: CompanyProfile = {
  name: 'Demo OSGB',
  phone: '000 000 00 00',
  email: 'bilgi@hantech.com.tr',
  website: 'www.hantech.com.tr',
  taxOffice: 'Demo Vergi Dairesi',
  taxNumber: 'DEMO-VKN-OSGB',
  registryNumber: 'DEMO-OSGB-0001',
  authorizationCertificate: 'DEMO-YETKI-0001',
  address: 'Demo OSGB adresi',
  certificateIssuerTitle: 'İş Sağlığı ve Güvenliği Eğitim Birimi',
  logoDataUrl: '',
  logoFileName: '',
  sealDataUrl: '',
  sealFileName: '',
  participantOtpEnabled: false,
  participantOtpChannel: 'email',
  staffOtpEnabled: false,
  staffOtpChannel: 'email',
  notifyEmail: true,
  notifySms: false,
}

export function readCompanyProfile(): CompanyProfile {
  if (typeof window === 'undefined') return defaultCompanyProfile
  try {
    const stored = JSON.parse(window.localStorage.getItem(COMPANY_INFO_STORAGE_KEY) ?? '{}') as Partial<CompanyProfile>
    const result = companyProfileSchema.safeParse({
      ...defaultCompanyProfile,
      ...stored,
    })
    return result.success ? result.data : defaultCompanyProfile
  } catch {
    return defaultCompanyProfile
  }
}

export function saveCompanyProfile(profile: CompanyProfile) {
  return writeStorage(COMPANY_INFO_STORAGE_KEY, profile)
}
