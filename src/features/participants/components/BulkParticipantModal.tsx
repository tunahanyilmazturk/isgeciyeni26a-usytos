import { motion } from 'framer-motion'
import { Plus, Trash2, UserPlus, Users, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button, SearchableSelect } from '@/components/ui'
import { cn } from '@/lib/utils'
import { readCustomers } from '@/features/customers/data/customers'
import { type Participant } from '../data/participants'

export interface BulkParticipantRow {
  key: string
  name: string
  username: string
  password: string
  tcNumber: string
  company: string
  jobTitle: string
}

const DEFAULT_PASSWORD = import.meta.env.DEV ? 'dev-demo-1234' : ''

function emptyRow(key: string, defaultCompany: string): BulkParticipantRow {
  return {
    key,
    name: '',
    username: '',
    password: DEFAULT_PASSWORD,
    tcNumber: '',
    company: defaultCompany,
    jobTitle: '',
  }
}

/** Toplu katılımcı ekleme modal'ı — editable table + satır ekle/sil */
export function BulkParticipantModal({
  companies,
  defaultCompany,
  onClose,
  onCreate,
}: {
  companies: string[]
  defaultCompany: string
  onClose: () => void
  onCreate: (participants: Participant[]) => void
}) {
  const [rows, setRows] = useState<BulkParticipantRow[]>(() =>
    Array.from({ length: 5 }, (_, i) => emptyRow(`row-${Date.now()}-${i}`, defaultCompany)),
  )

  const companyOptions = useMemo(
    () => companies.map((c) => ({ value: c, label: c })),
    [companies],
  )

  // ESC ile kapatma
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])

  function updateRow(key: string, field: keyof BulkParticipantRow, value: string) {
    setRows((current) => current.map((r) => (r.key === key ? { ...r, [field]: value } : r)))
  }

  function addRow() {
    setRows((current) => [...current, emptyRow(`row-${Date.now()}-${current.length}`, defaultCompany)])
  }

  function removeRow(key: string) {
    setRows((current) => (current.length > 1 ? current.filter((r) => r.key !== key) : current))
  }

  function addMultipleRows(count: number) {
    setRows((current) => [
      ...current,
      ...Array.from({ length: count }, (_, i) => emptyRow(`row-${Date.now()}-${current.length + i}`, defaultCompany)),
    ])
  }

  // Validasyon — Ad Soyad, Kullanıcı adı, Ünvan zorunlu
  const validRows = useMemo(
    () => rows.filter((r) => r.name.trim() && r.username.trim() && r.jobTitle.trim()),
    [rows],
  )
  const invalidCount = rows.length - validRows.length
  const canSubmit = validRows.length > 0

  // Duplicate username kontrolü
  const usernameCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    validRows.forEach((r) => {
      const u = r.username.trim().toLocaleLowerCase('tr-TR')
      counts[u] = (counts[u] ?? 0) + 1
    })
    return counts
  }, [validRows])
  const duplicateUsernames = Object.entries(usernameCounts).filter(([, c]) => c > 1).map(([u]) => u)

  function handleSubmit() {
    if (!canSubmit || duplicateUsernames.length > 0) return
    const customers = readCustomers()
    const now = Date.now()
    const participants: Participant[] = validRows.map((r, i) => {
      const customer = customers.find((c) => c.name === r.company)
      const riskLevel = (customer?.riskLevel ?? 'Tehlikeli') as Participant['riskLevel']
      return {
        id: now + i,
        name: r.name.trim(),
        username: r.username.trim(),
        email: '—',
        phone: '—',
        tcNumber: r.tcNumber.trim() || '—',
        companyId: customer?.id ?? companies.indexOf(r.company) + 1,
        company: r.company,
        riskLevel,
        department: r.jobTitle.trim(),
        trainingMinutes: 0,
        progress: 0,
        trainingStatus: 'not_started',
        lastCompletion: '—',
        nextTraining: '—',
        status: 'active',
        lastLogin: 'Henüz giriş yapmadı',
        password: r.password.trim() || DEFAULT_PASSWORD,
      }
    })
    onCreate(participants)
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-ink-900/30 backdrop-blur-[3px]"
        role="presentation"
        onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 16 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bulk-participant-modal-title"
        aria-describedby="bulk-participant-modal-description"
        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-2xl shadow-ink-900/15"
      >
        {/* Header */}
        <div className="shrink-0 border-b border-ink-100 bg-gradient-to-br from-brand-50/60 via-white to-white px-6 py-5 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-100 text-brand-700 ring-1 ring-brand-200">
                <Users className="h-6 w-6" strokeWidth={1.8} />
              </span>
              <div>
                <h2 id="bulk-participant-modal-title" className="text-lg font-bold tracking-tight text-ink-900">Toplu katılımcı ekle</h2>
                <p id="bulk-participant-modal-description" className="mt-0.5 text-sm text-ink-500">
                  Tabloya bilgileri girin, satır ekleyerek listeyi uzatın. E-posta ve telefonu katılımcı ilk girişte kendisi girecek.
                </p>
              </div>
            </div>
            <button type="button" onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-700" aria-label="Kapat">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="shrink-0 flex flex-wrap items-center gap-2 border-b border-ink-100 bg-ink-50/30 px-6 py-3 sm:px-8">
          <span className="text-xs font-semibold text-ink-600">
            {validRows.length} geçerli{invalidCount > 0 && <span className="text-amber-600"> · {invalidCount} eksik</span>}
            {duplicateUsernames.length > 0 && <span className="text-rose-600"> · {duplicateUsernames.length} tekrarlanan kullanıcı adı</span>}
          </span>
          <div className="ml-auto flex flex-wrap gap-2">
            <button type="button" onClick={() => addMultipleRows(5)} className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 text-xs font-semibold text-ink-600 transition-colors hover:bg-ink-50">
              <Plus className="h-3.5 w-3.5" /> 5 satır ekle
            </button>
            <button type="button" onClick={() => addMultipleRows(10)} className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 text-xs font-semibold text-ink-600 transition-colors hover:bg-ink-50">
              <Plus className="h-3.5 w-3.5" /> 10 satır ekle
            </button>
            <button type="button" onClick={addRow} className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-brand-200 bg-brand-50 px-3 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-100">
              <Plus className="h-3.5 w-3.5" /> Satır ekle
            </button>
          </div>
        </div>

        {/* Table — scroll edilebilir gövde */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-xs">
            <thead className="sticky top-0 z-10 border-b border-ink-100 bg-ink-50/80 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-ink-400">
              <tr>
                <th className="w-10 px-3 py-3 text-center">#</th>
                <th className="min-w-[160px] px-2 py-3">Ad Soyad <span className="text-rose-400">*</span></th>
                <th className="min-w-[150px] px-2 py-3">Kullanıcı adı <span className="text-rose-400">*</span></th>
                <th className="min-w-[120px] px-2 py-3">Şifre <span className="text-rose-400">*</span></th>
                <th className="min-w-[120px] px-2 py-3">TC Kimlik</th>
                <th className="min-w-[160px] px-2 py-3">Firma</th>
                <th className="min-w-[140px] px-2 py-3">Ünvan <span className="text-rose-400">*</span></th>
                <th className="w-10 px-2 py-3 text-center">Sil</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {rows.map((row, idx) => {
                const isValid = row.name.trim() && row.username.trim() && row.jobTitle.trim()
                const isDuplicate = row.username.trim() && usernameCounts[row.username.trim().toLocaleLowerCase('tr-TR')] > 1
                return (
                  <tr key={row.key} className={cn('transition-colors', isValid ? 'bg-white' : 'bg-amber-50/20')}>
                    <td className="px-3 py-2 text-center text-[10px] font-semibold text-ink-300 tabular-nums">{idx + 1}</td>
                    <td className="px-2 py-1.5">
                      <input
                        type="text"
                        value={row.name}
                        onChange={(e) => updateRow(row.key, 'name', e.target.value)}
                        placeholder="Ad Soyad"
                        className="h-9 w-full rounded-lg border border-ink-200 bg-white px-2.5 text-xs font-medium text-ink-800 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10"
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <input
                        type="text"
                        value={row.username}
                        onChange={(e) => updateRow(row.key, 'username', e.target.value)}
                        placeholder="ahmet.yilmaz"
                        className={cn(
                          'h-9 w-full rounded-lg border bg-white px-2.5 text-xs font-medium text-ink-800 outline-none transition-colors focus:ring-2 focus:ring-brand-500/10',
                          isDuplicate ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10' : 'border-ink-200 focus:border-brand-500',
                        )}
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <input
                        type="text"
                        value={row.password}
                        onChange={(e) => updateRow(row.key, 'password', e.target.value)}
                        placeholder={DEFAULT_PASSWORD}
                        className="h-9 w-full rounded-lg border border-ink-200 bg-white px-2.5 text-xs font-medium text-ink-800 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10"
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={11}
                        value={row.tcNumber}
                        onChange={(e) => updateRow(row.key, 'tcNumber', e.target.value.replace(/\D/g, ''))}
                        placeholder="11 hane"
                        className="h-9 w-full rounded-lg border border-ink-200 bg-white px-2.5 text-xs font-medium text-ink-800 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10"
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <SearchableSelect
                        size="sm"
                        options={companyOptions}
                        value={row.company}
                        onChange={(value) => updateRow(row.key, 'company', value)}
                        placeholder="Firma seçin…"
                        searchPlaceholder="Firma ara…"
                        emptyText="Firma bulunamadı."
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <input
                        type="text"
                        value={row.jobTitle}
                        onChange={(e) => updateRow(row.key, 'jobTitle', e.target.value)}
                        placeholder="Üretim operatörü"
                        className="h-9 w-full rounded-lg border border-ink-200 bg-white px-2.5 text-xs font-medium text-ink-800 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10"
                      />
                    </td>
                    <td className="px-2 py-1.5 text-center">
                      <button
                        type="button"
                        onClick={() => removeRow(row.key)}
                        disabled={rows.length === 1}
                        className="grid h-8 w-8 place-items-center rounded-lg text-ink-300 transition-colors hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-30"
                        aria-label="Satırı sil"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {rows.length === 0 && (
            <div className="px-6 py-12 text-center">
              <Users className="mx-auto h-8 w-8 text-ink-300" strokeWidth={1.5} />
              <p className="mt-3 text-sm font-semibold text-ink-600">Tablo boş</p>
              <p className="mt-1 text-xs text-ink-400">"Satır ekle" butonu ile yeni satırlar oluşturun.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-ink-100 bg-ink-50/40 px-6 py-4 sm:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="text-xs text-ink-500">
              {canSubmit ? (
                <span><span className="font-bold text-ink-800">{validRows.length}</span> katılımcı eklenecek</span>
              ) : (
                <span>En az bir satırın ad, kullanıcı adı ve ünvan alanlarını doldurun</span>
              )}
              {duplicateUsernames.length > 0 && (
                <span className="ml-2 text-rose-500">· {duplicateUsernames.length} tekrarlanan kullanıcı adı var</span>
              )}
            </div>
            <div className="flex gap-2.5">
              <Button type="button" variant="outline" size="md" onClick={onClose}>İptal</Button>
              <Button type="button" size="md" disabled={!canSubmit || duplicateUsernames.length > 0} leftIcon={<UserPlus className="h-4 w-4" strokeWidth={1.7} />} onClick={handleSubmit}>
                {validRows.length} katılımcı ekle
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body,
  )
}
