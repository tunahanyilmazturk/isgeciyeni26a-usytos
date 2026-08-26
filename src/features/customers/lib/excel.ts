import * as XLSX from 'xlsx'

export type ImportRowAction = 'new' | 'update' | 'warning' | 'skipped'

export type ImportedCustomerRow = {
  company: string
  sgkNumber: string
  city: string
  employees: number
  risk: string
  expert: string
  doctor: string
  contractStatus: string
  action: ImportRowAction
  warning?: string
}

export type IsgImportSummary = {
  total: number
  newCustomers: number
  updates: number
  warnings: number
  skipped: number
}

export type IsgImportResult = {
  rows: ImportedCustomerRow[]
  summary: IsgImportSummary
  sheetName: string
}

const columnIndex = {
  assignedPerson: 5,
  certificateType: 6,
  customerName: 14,
  customerSgkNumber: 15,
  customerCity: 16,
  employeeCount: 17,
  riskLevel: 18,
  contractStart: 19,
  contractEnd: 20,
  contractStatus: 21,
} as const

const templateHeaders = Array.from({ length: 22 }, () => '')
Object.assign(templateHeaders, {
  5: 'Görevlendirilen kişi ad soyad',
  6: 'Sertifika tipi (uzman / hekim)',
  11: 'Hizmet veren SGK no',
  13: 'Hizmet veren yetki belgesi no',
  14: 'Müşteri unvanı',
  15: 'Müşteri SGK işyeri sicil no',
  16: 'Müşteri ili',
  17: 'Çalışan sayısı',
  18: 'Tehlike sınıfı',
  19: 'Sözleşme başlangıç',
  20: 'Sözleşme bitiş',
  21: 'Sözleşme statüsü',
})

function cellText(value: unknown) {
  return String(value ?? '').trim()
}

function normalized(value: string) {
  return value.toLocaleLowerCase('tr-TR').replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u').replace(/[.\s_-]/g, '')
}

function parseEmployees(value: unknown) {
  const parsed = Number(cellText(value).replace(/[^0-9]/g, ''))
  return Number.isFinite(parsed) ? parsed : 0
}

function parseRisk(value: string) {
  const risk = normalized(value)
  if (risk.includes('coktehlikeli')) return 'Çok tehlikeli'
  if (risk.includes('tehlikeli')) return 'Tehlikeli'
  if (risk.includes('aztehlikeli')) return 'Az tehlikeli'
  return value || 'Tanımsız'
}

function parseContractStatus(value: string) {
  const status = normalized(value)
  if (status.includes('devam')) return 'Devam ediyor'
  if (status.includes('iptal')) return 'İptal edildi'
  if (status.includes('sonland')) return 'Sonlandırıldı'
  if (status.includes('teklif')) return 'Teklif aşamasında'
  return value || 'Tanımsız'
}

function isOngoingContract(value: string) {
  return normalized(value).includes('devam')
}

function findHeaderRow(rows: unknown[][]) {
  const maxRowsToInspect = Math.min(rows.length, 10)
  for (let index = 0; index < maxRowsToInspect; index += 1) {
    const row = rows[index].map(cellText).map(normalized)
    if (row.some((value) => value.includes('musteriunvani')) || row.some((value) => value.includes('musterisgk'))) return index
  }
  return 0
}

export function parseIsgWorkbook(data: ArrayBuffer, existingSgkNumbers: readonly string[] = []): IsgImportResult {
  const workbook = XLSX.read(data, { type: 'array', cellDates: true, raw: false })
  const sheetName = workbook.SheetNames[0]
  if (!sheetName) throw new Error('Excel dosyasında okunabilir bir çalışma sayfası bulunamadı.')

  const worksheet = workbook.Sheets[sheetName]
  const rows = XLSX.utils.sheet_to_json<unknown[]>(worksheet, { header: 1, defval: '', raw: false }) as unknown[][]
  if (rows.length < 2) throw new Error('Excel dosyasında aktarılacak kayıt bulunamadı.')

  const headerRowIndex = findHeaderRow(rows)
  const sourceRows = rows.slice(headerRowIndex + 1)
  const grouped = new Map<string, ImportedCustomerRow>()
  let skipped = 0

  sourceRows.forEach((row, index) => {
    const company = cellText(row[columnIndex.customerName])
    const sgkNumber = cellText(row[columnIndex.customerSgkNumber])
    const contractStatus = parseContractStatus(cellText(row[columnIndex.contractStatus]))

    if (!company || !sgkNumber || !isOngoingContract(contractStatus)) {
      if (row.some((cell) => cellText(cell))) skipped += 1
      return
    }

    const key = sgkNumber || `${company}-${index}`
    const current = grouped.get(key) ?? {
      company,
      sgkNumber,
      city: cellText(row[columnIndex.customerCity]),
      employees: parseEmployees(row[columnIndex.employeeCount]),
      risk: parseRisk(cellText(row[columnIndex.riskLevel])),
      expert: '',
      doctor: '',
      contractStatus,
      action: existingSgkNumbers.includes(sgkNumber) ? 'update' : 'new',
    }

    const assignedPerson = cellText(row[columnIndex.assignedPerson])
    const certificateType = normalized(cellText(row[columnIndex.certificateType]))
    if (certificateType.includes('hekim') || certificateType.includes('doktor')) current.doctor = assignedPerson
    else if (assignedPerson) current.expert = assignedPerson
    grouped.set(key, current)
  })

  const parsedRows = [...grouped.values()].map((row) => {
    if (!row.expert || !row.doctor) {
      return { ...row, action: 'warning' as const, warning: !row.expert && !row.doctor ? 'Uzman ve hekim ataması eksik' : !row.expert ? 'Uzman ataması eksik' : 'Hekim ataması eksik' }
    }
    return row
  })

  const updates = parsedRows.filter((row) => row.action === 'update').length
  const warnings = parsedRows.filter((row) => row.action === 'warning').length
  const newCustomers = parsedRows.filter((row) => row.action === 'new' || row.action === 'warning').length

  return {
    rows: parsedRows,
    sheetName,
    summary: { total: sourceRows.filter((row) => row.some((cell) => cellText(cell))).length, newCustomers, updates, warnings, skipped },
  }
}

export function downloadCustomerTemplate() {
  const sampleRow = Array.from({ length: 22 }, () => '')
  Object.assign(sampleRow, {
    5: 'Barış Eren',
    6: 'Uzman',
    11: 'OSGB-SGK-001',
    13: 'YETKI-001',
    14: 'Örnek Firma A.Ş.',
    15: '2-95116706-1-1-1857000-35-83-88-5',
    16: 'Bursa',
    17: '84',
    18: 'Tehlikeli',
    19: '01.01.2026',
    20: '31.12.2026',
    21: 'Sözleşme Devam Ediyor',
  })
  const worksheet = XLSX.utils.aoa_to_sheet([templateHeaders, sampleRow])
  worksheet['!cols'] = Array.from({ length: 22 }, (_, index) => ({ wch: [14, 14, 14, 14, 24, 28, 24, 14, 14, 14, 14, 20, 14, 24, 28, 28, 16, 14, 18, 18, 18, 25][index] }))
  worksheet['!autofilter'] = { ref: 'A1:V2' }
  worksheet['!freeze'] = { ySplit: 1 }
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'ISG Müşteri Aktarımı')
  XLSX.writeFile(workbook, 'hantech-isg-musteri-sablonu.xlsx')
}

export type CustomerListExportRow = {
  name: string
  taxNumber: string
  sector: string
  location: string
  employees: number
  riskLevel: string
  expert: string
  doctor: string
  contractStatus: string
  approvalStatus: string
  status: string
}

export function downloadCustomerList(rows: readonly CustomerListExportRow[]) {
  const worksheet = XLSX.utils.json_to_sheet(rows.map((row) => ({
    'Firma adı': row.name,
    'Vergi numarası': row.taxNumber,
    Sektör: row.sector,
    'Merkez / Şube': row.location,
    'Çalışan sayısı': row.employees,
    'Tehlike sınıfı': row.riskLevel,
    'İSG uzmanı': row.expert || 'Atanmamış',
    'İşyeri hekimi': row.doctor || 'Atanmamış',
    'Sözleşme statüsü': row.contractStatus,
    'Onay durumu': row.approvalStatus,
    Durum: row.status,
  })))
  worksheet['!cols'] = [
    { wch: 26 }, { wch: 18 }, { wch: 24 }, { wch: 22 }, { wch: 16 }, { wch: 18 },
    { wch: 22 }, { wch: 22 }, { wch: 22 }, { wch: 18 }, { wch: 12 },
  ]
  worksheet['!autofilter'] = { ref: `A1:K${rows.length + 1}` }
  worksheet['!freeze'] = { ySplit: 1 }
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Müşteri Listesi')
  XLSX.writeFile(workbook, `hantech-musteriler-${new Date().toISOString().slice(0, 10)}.xlsx`)
}
