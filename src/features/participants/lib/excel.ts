import * as XLSX from 'xlsx'

export type ParticipantListExportRow = {
  name: string
  username: string
  email: string
  phone: string
  tcNumber: string
  company: string
  department: string
  riskLevel: string
  trainingMinutes: number
  progress: number
  trainingStatus: string
  lastCompletion: string
  nextTraining: string
  status: string
  lastLogin: string
}

const trainingStatusLabels: Record<string, string> = {
  not_started: 'Başlamadı',
  in_progress: 'Devam ediyor',
  failed: 'Başarısız',
  successful: 'Başarılı',
}

const participantStatusLabels: Record<string, string> = {
  active: 'Aktif',
  passive: 'Pasif',
}

function formatTrainingMinutes(value: number) {
  if (!value) return '0 dk'
  const hours = Math.floor(value / 60)
  const minutes = value % 60
  return hours ? `${hours} sa ${minutes} dk` : `${minutes} dk`
}

export function downloadParticipantList(rows: readonly ParticipantListExportRow[]) {
  const worksheet = XLSX.utils.json_to_sheet(rows.map((row) => ({
    'Ad Soyad': row.name,
    'Kullanıcı adı': row.username,
    'E-posta': row.email,
    'Telefon': row.phone,
    'TC Kimlik No': row.tcNumber,
    'Firma': row.company,
    'Departman': row.department,
    'Tehlike sınıfı': row.riskLevel,
    'Eğitim süresi': formatTrainingMinutes(row.trainingMinutes),
    'Eğitim ilerlemesi': `%${row.progress}`,
    'Eğitim durumu': trainingStatusLabels[row.trainingStatus] ?? row.trainingStatus,
    'Son eğitim tamamlama': row.lastCompletion,
    'Sonraki eğitim tarihi': row.nextTraining,
    'Durum': participantStatusLabels[row.status] ?? row.status,
    'Son giriş': row.lastLogin,
  })))
  worksheet['!cols'] = [
    { wch: 26 }, { wch: 18 }, { wch: 30 }, { wch: 16 }, { wch: 16 }, { wch: 24 },
    { wch: 18 }, { wch: 18 }, { wch: 16 }, { wch: 18 }, { wch: 18 }, { wch: 22 },
    { wch: 22 }, { wch: 12 }, { wch: 22 },
  ]
  worksheet['!autofilter'] = { ref: `A1:O${rows.length + 1}` }
  worksheet['!freeze'] = { ySplit: 1 }
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Katılımcılar')
  XLSX.writeFile(workbook, `hantech-katilimcilar-${new Date().toISOString().slice(0, 10)}.xlsx`)
}

export function downloadParticipantLoginList(companyName: string, participantNames: readonly string[]) {
  const worksheet = XLSX.utils.json_to_sheet(participantNames.map((name, index) => ({
    'Firma adı': companyName,
    'Katılımcı': name,
    'Kullanıcı adı': `katilimci${index + 1}`,
    'Giriş adresi': '/giris',
    'Durum': 'Aktif',
  })))
  worksheet['!cols'] = [{ wch: 26 }, { wch: 24 }, { wch: 18 }, { wch: 34 }, { wch: 12 }]
  worksheet['!autofilter'] = { ref: `A1:E${participantNames.length + 1}` }
  worksheet['!freeze'] = { ySplit: 1 }
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Giriş Listesi')
  XLSX.writeFile(workbook, `${companyName.replace(/[^a-z0-9ığüşöçİĞÜŞÖÇ]+/gi, '-').replace(/^-|-$/g, '')}-giris-listesi.xlsx`)
}

/**
 * Toplu katılımcı ekleme için boş Excel şablonu indirir.
 * Kullanıcı bu şablonu doldurup Excel'den kopyalayarak modal'a yapıştırabilir.
 * Şablon birkaç örnek satır ve açıklama içerir.
 */
export function downloadBulkParticipantTemplate(_companies: readonly string[]) {
  const sampleRows = [
    { 'Ad Soyad': '', 'Kullanıcı adı': '', 'Şifre': '123456', 'TC Kimlik No': '', 'Firma': '', 'Ünvan': '' },
    { 'Ad Soyad': '', 'Kullanıcı adı': '', 'Şifre': '123456', 'TC Kimlik No': '', 'Firma': '', 'Ünvan': '' },
    { 'Ad Soyad': '', 'Kullanıcı adı': '', 'Şifre': '123456', 'TC Kimlik No': '', 'Firma': '', 'Ünvan': '' },
    { 'Ad Soyad': '', 'Kullanıcı adı': '', 'Şifre': '123456', 'TC Kimlik No': '', 'Firma': '', 'Ünvan': '' },
    { 'Ad Soyad': '', 'Kullanıcı adı': '', 'Şifre': '123456', 'TC Kimlik No': '', 'Firma': '', 'Ünvan': '' },
  ]
  const worksheet = XLSX.utils.json_to_sheet(sampleRows)
  worksheet['!cols'] = [
    { wch: 26 }, // Ad Soyad
    { wch: 20 }, // Kullanıcı adı
    { wch: 14 }, // Şifre
    { wch: 16 }, // TC Kimlik No
    { wch: 24 }, // Firma
    { wch: 22 }, // Ünvan
  ]
  worksheet['!autofilter'] = { ref: `A1:F${sampleRows.length + 1}` }
  worksheet['!freeze'] = { ySplit: 1 }
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Toplu Katılımcı')
  XLSX.writeFile(workbook, `hantech-toplu-katilimci-sablonu-${new Date().toISOString().slice(0, 10)}.xlsx`)
}
