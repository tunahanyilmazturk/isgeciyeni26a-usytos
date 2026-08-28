import html2canvas from 'html2canvas-pro'
import { jsPDF } from 'jspdf'

export interface CertificatePdfResult {
  filename: string
  pageCount: number
  size: number
}

function safeFilename(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLocaleLowerCase('tr-TR')
}

export async function generateCertificatePdf(elements: HTMLElement[], requestedFilename: string): Promise<CertificatePdfResult> {
  if (!elements.length) throw new Error('PDF oluşturulacak sertifika bulunamadı.')

  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4', compress: true })
  for (let index = 0; index < elements.length; index += 1) {
    if (index > 0) pdf.addPage('a4', 'landscape')
    const canvas = await html2canvas(elements[index], {
      backgroundColor: '#ffffff',
      scale: 3,
      useCORS: true,
      logging: false,
      imageTimeout: 15000,
      windowWidth: 1123,
      windowHeight: 794,
    })
    const image = canvas.toDataURL('image/png')
    pdf.addImage(image, 'PNG', 0, 0, 297, 210, undefined, 'FAST')
  }

  const filename = `${safeFilename(requestedFilename) || 'hantech-sertifikalar'}.pdf`
  const blob = pdf.output('blob')
  pdf.save(filename)
  return { filename, pageCount: elements.length, size: blob.size }
}
