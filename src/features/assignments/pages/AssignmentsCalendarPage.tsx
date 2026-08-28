import { motion } from 'framer-motion'
import { CalendarDays, ClipboardCheck, Users } from 'lucide-react'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { AssignmentCalendar } from './AssignmentsPage'
import { getActiveTrainingCount, getParticipantAssignmentSummaries } from '../data/assignments'

export function AssignmentsCalendarPage() {
  const navigate = useNavigate()
  const summaries = useMemo(() => getParticipantAssignmentSummaries(), [])
  const activeTrainingCount = getActiveTrainingCount()
  const assignmentCount = summaries.reduce((total, summary) => total + summary.assignments.length, 0)
  const participantCount = summaries.filter((summary) => summary.assignments.length > 0).length

  return (
    <div className="space-y-5">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-ink-400"><span>Ana menü</span><span>/</span><span className="text-ink-600">Takvim</span></div>
          <h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[30px]">Eğitim takvimi</h1>
          <p className="mt-1.5 max-w-2xl text-sm text-ink-500">Eğitim atamalarını, son tarihleri ve katılımcı süreçlerini tek bir takvimden takip edin.</p>
        </div>
        <button type="button" onClick={() => navigate('/dashboard/egitim-atamalari')} className="inline-flex h-9 items-center justify-center gap-2 self-start rounded-xl border border-ink-200 bg-white px-3.5 text-xs font-semibold text-ink-600 shadow-sm transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 lg:self-auto"><ClipboardCheck className="h-3.5 w-3.5" /> Eğitim atamalarına git</button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="grid gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50/70 via-white to-white p-4"><span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-100 text-brand-700"><CalendarDays className="h-4 w-4" /></span><div><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand-700">Aktif eğitim</p><p className="mt-1 text-xl font-bold text-ink-900">{activeTrainingCount}</p></div></div>
        <div className="flex items-center gap-3 rounded-2xl border border-ink-200 bg-white p-4"><span className="grid h-9 w-9 place-items-center rounded-xl bg-sky-50 text-sky-700"><ClipboardCheck className="h-4 w-4" /></span><div><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-500">Toplam atama</p><p className="mt-1 text-xl font-bold text-ink-900">{assignmentCount}</p></div></div>
        <div className="flex items-center gap-3 rounded-2xl border border-ink-200 bg-white p-4"><span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-50 text-violet-700"><Users className="h-4 w-4" /></span><div><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-500">Planı olan kişi</p><p className="mt-1 text-xl font-bold text-ink-900">{participantCount}</p></div></div>
      </motion.div>

      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-[0_5px_24px_-16px_rgba(17,24,39,0.24)]">
        <AssignmentCalendar summaries={summaries} activeTrainingCount={activeTrainingCount} />
      </motion.section>
    </div>
  )
}
