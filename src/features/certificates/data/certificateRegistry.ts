import { z } from 'zod'
import { readStorage, writeStorage } from '@/lib/storage'

export type CertificateRegistryStatus = 'active' | 'revoked'

export interface CertificateRegistryEntry {
  assignmentId: string
  status: CertificateRegistryStatus
  printCount: number
  lastPrintedAt?: string
  downloadCount?: number
  lastDownloadedAt?: string
  revokedAt?: string
  revocationReason?: string
}

const registrySchema = z.array(z.object({
  assignmentId: z.string(),
  status: z.enum(['active', 'revoked']),
  printCount: z.number(),
  lastPrintedAt: z.string().optional(),
  downloadCount: z.number().optional(),
  lastDownloadedAt: z.string().optional(),
  revokedAt: z.string().optional(),
  revocationReason: z.string().optional(),
}))

const STORAGE_KEY = 'hantech-certificate-registry'

export function readCertificateRegistry(): CertificateRegistryEntry[] {
  return readStorage(STORAGE_KEY, [], registrySchema)
}

export function certificateMeta(assignmentId: string, entries = readCertificateRegistry()): CertificateRegistryEntry {
  return entries.find((entry) => entry.assignmentId === assignmentId) ?? { assignmentId, status: 'active', printCount: 0 }
}

export function recordCertificatePrint(assignmentIds: string[]): CertificateRegistryEntry[] {
  const entries = readCertificateRegistry()
  const now = new Date().toISOString()
  const ids = new Set(assignmentIds)
  const updated = entries.map((entry) => ids.has(entry.assignmentId) ? { ...entry, printCount: entry.printCount + 1, lastPrintedAt: now } : entry)
  for (const assignmentId of ids) if (!updated.some((entry) => entry.assignmentId === assignmentId)) updated.push({ assignmentId, status: 'active', printCount: 1, lastPrintedAt: now })
  writeStorage(STORAGE_KEY, updated)
  return updated
}

export function recordCertificateDownload(assignmentIds: string[]): CertificateRegistryEntry[] {
  const entries = readCertificateRegistry()
  const now = new Date().toISOString()
  const ids = new Set(assignmentIds)
  const updated = entries.map((entry) => ids.has(entry.assignmentId) ? { ...entry, downloadCount: (entry.downloadCount ?? 0) + 1, lastDownloadedAt: now } : entry)
  for (const assignmentId of ids) if (!updated.some((entry) => entry.assignmentId === assignmentId)) updated.push({ assignmentId, status: 'active', printCount: 0, downloadCount: 1, lastDownloadedAt: now })
  writeStorage(STORAGE_KEY, updated)
  return updated
}

export function setCertificateRegistryStatus(assignmentId: string, status: CertificateRegistryStatus, reason?: string): CertificateRegistryEntry[] {
  const entries = readCertificateRegistry()
  const current = certificateMeta(assignmentId, entries)
  const next: CertificateRegistryEntry = {
    ...current,
    status,
    revokedAt: status === 'revoked' ? new Date().toISOString() : undefined,
    revocationReason: status === 'revoked' ? reason?.trim() : undefined,
  }
  const updated = entries.some((entry) => entry.assignmentId === assignmentId) ? entries.map((entry) => entry.assignmentId === assignmentId ? next : entry) : [...entries, next]
  writeStorage(STORAGE_KEY, updated)
  return updated
}
