import { Award, CheckCircle2, Download, Printer } from 'lucide-react'
import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui'
import { readAssignments } from '@/features/assignments/data/assignments'
import { readParticipants } from '@/features/participants/data/participants'
import { readTrainings } from '@/features/trainings/data/trainings'
import { useParticipantAuth } from '../ParticipantAuthContext'

export function ParticipantCertificatePage() {
  const { assignmentId } = useParams<{ assignmentId: string }>()
  const navigate = useNavigate()
  const { user } = useParticipantAuth()
  const data = useMemo(() => {
    const assignment = readAssignments().find((item) => item.id === assignmentId)
    const training = assignment ? readTrainings().find((item) => item.id === assignment.trainingId) : undefined
    const participant = assignment ? readParticipants().find((item) => item.id === assignment.participantId) : undefined
    return { assignment, training, participant }
  }, [assignmentId])

  if (!data.assignment || !data.training || data.assignment.approvalStatus !== 'approved' || data.assignment.participantId !== user?.id) {
    return <div className="rounded-2xl border border-ink-200 bg-white p-10 text-center"><p className="text-sm font-semibold text-ink-700">Sertifika henüz hazır değil.</p><Button className="mt-4" size="sm" onClick={() => navigate('/katilimci/egitimler')}>Eğitimlerime dön</Button></div>
  }

  const participantName = data.participant?.name ?? user?.name ?? 'Katılımcı'
  const approvedDate = data.assignment.approvedAt ?? new Date().toLocaleDateString('tr-TR')

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">Başarı belgesi</p><h1 className="mt-1 text-2xl font-bold tracking-tight text-ink-900">Eğitim sertifikası</h1></div><div className="flex gap-2"><Button variant="outline" size="sm" leftIcon={<Printer className="h-4 w-4" />} onClick={() => window.print()}>Yazdır</Button><Button size="sm" leftIcon={<Download className="h-4 w-4" />} onClick={() => window.print()}>PDF olarak kaydet</Button></div></div>
      <article className="relative overflow-hidden rounded-3xl border-2 border-brand-200 bg-white p-6 shadow-[0_18px_50px_-28px_rgba(15,118,110,0.45)] sm:p-12">
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-brand-600 via-teal-400 to-brand-600" />
        <div className="text-center"><span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-brand-700"><Award className="h-8 w-8" /></span><p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-brand-700">HanTech İSG Eğitim Portalı</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">Eğitim Başarı Sertifikası</h2><p className="mt-8 text-sm text-ink-500">Bu belge, aşağıda adı bulunan katılımcının eğitimi başarıyla tamamladığını ve ilgili birim tarafından onaylandığını gösterir.</p><p className="mt-8 text-2xl font-bold text-ink-900 sm:text-3xl">{participantName}</p><div className="mx-auto mt-3 h-px max-w-sm bg-brand-200" /><p className="mt-7 text-lg font-semibold text-brand-700">{data.training.name}</p><div className="mt-10 grid gap-4 text-left sm:grid-cols-3"><div className="rounded-xl bg-ink-50 p-3"><p className="text-[10px] uppercase tracking-wide text-ink-400">Sertifika no</p><p className="mt-1 text-xs font-bold text-ink-800">{data.assignment.certificateId}</p></div><div className="rounded-xl bg-ink-50 p-3"><p className="text-[10px] uppercase tracking-wide text-ink-400">Onay tarihi</p><p className="mt-1 text-xs font-bold text-ink-800">{approvedDate}</p></div><div className="rounded-xl bg-ink-50 p-3"><p className="text-[10px] uppercase tracking-wide text-ink-400">Durum</p><p className="mt-1 flex items-center gap-1 text-xs font-bold text-emerald-700"><CheckCircle2 className="h-3.5 w-3.5" /> Onaylandı</p></div></div></div>
      </article>
    </div>
  )
}
