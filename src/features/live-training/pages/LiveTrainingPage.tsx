import { motion } from 'framer-motion'
import {
  Bell,
  CalendarClock,
  CheckCircle2,
  Clock,
  Play,
  Radio,
  Users,
  Video,
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'

type SessionStatus = 'live' | 'upcoming' | 'completed'

interface Session {
  id: string
  name: string
  trainer: string
  company: string
  participants: number
  capacity: number
  startTime: string
  duration: string
  status: SessionStatus
  category: string
}

const activeSessions: Session[] = [
  { id: 'L-301', name: 'Temel İSG Eğitimi — Canlı Oturum', trainer: 'Uzm. Mert Yıldız', company: 'Quantis Tekstil', participants: 24, capacity: 30, startTime: '10:00', duration: '2 saat', status: 'live', category: 'Temel Paket' },
  { id: 'L-302', name: 'Acil Durum Planı Briefing', trainer: 'Uzm. Selin Arslan', company: 'Pelion Gıda', participants: 18, capacity: 25, startTime: '11:30', duration: '45 dk', status: 'live', category: 'Sektör Paketi' },
  { id: 'L-303', name: 'Yüksekten Çalışma Güvenliği', trainer: 'Uzm. Can Öztürk', company: 'Vesta Metal', participants: 12, capacity: 20, startTime: '13:00', duration: '1 saat', status: 'live', category: 'Sektör Paketi' },
]

const upcomingSessions: Session[] = [
  { id: 'L-304', name: 'Risk Değerlendirmesi Atölyesi', trainer: 'Uzm. Burak Şahin', company: 'Norden Lojistik', participants: 8, capacity: 22, startTime: '15:00', duration: '1.5 saat', status: 'upcoming', category: 'Sektör Paketi' },
  { id: 'L-305', name: 'İlk Yardım Uygulamaları', trainer: 'Uzm. Ayşe Kaya', company: 'Quantis Tekstil', participants: 15, capacity: 28, startTime: '16:30', duration: '2 saat', status: 'upcoming', category: 'Temel Paket' },
  { id: 'L-306', name: 'Yangın Güvenliği Semineri', trainer: 'Uzm. Emre Çelik', company: 'Pelion Gıda', participants: 6, capacity: 30, startTime: 'Yarın 10:00', duration: '1 saat', status: 'upcoming', category: 'Temel Paket' },
  { id: 'L-307', name: 'Elektrik Güvenliği Eğitimi', trainer: 'Uzm. Deniz Koç', company: 'Vesta Metal', participants: 4, capacity: 18, startTime: 'Yarın 14:00', duration: '1.5 saat', status: 'upcoming', category: 'Sektör Paketi' },
]

const statusConfig: Record<SessionStatus, { label: string; dot: string; badge: string }> = {
  live: { label: 'Canlı', dot: 'bg-red-500', badge: 'border-red-200 bg-red-50 text-red-600' },
  upcoming: { label: 'Yakında', dot: 'bg-amber-500', badge: 'border-amber-200 bg-amber-50 text-amber-700' },
  completed: { label: 'Tamamlandı', dot: 'bg-emerald-500', badge: 'border-emerald-200 bg-emerald-50 text-emerald-700' },
}

export function LiveTrainingPage() {
  const [featured] = useState<Session>(activeSessions[0])

  const totalParticipants = [...activeSessions, ...upcomingSessions].reduce((sum, s) => sum + s.participants, 0)
  const totalCapacity = [...activeSessions, ...upcomingSessions].reduce((sum, s) => sum + s.capacity, 0)
  const averageAttendance = totalCapacity ? Math.round((totalParticipants / totalCapacity) * 100) : 0

  return (
    <div className="space-y-7">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-ink-400">
            <span>Ana menü</span><span>/</span><span className="text-ink-600">Canlı Eğitim</span>
          </div>
          <h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[30px]">Canlı eğitim</h1>
          <p className="mt-1.5 max-w-2xl text-sm text-ink-500">Aktif ve yaklaşan çevrimiçi eğitim oturumlarını takip edin, katılımcılarla gerçek zamanlı bağlanın.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" leftIcon={<CalendarClock className="h-4 w-4" strokeWidth={1.7} />} onClick={() => toast.info('Oturum takvimi hazırlanacak.')}>Oturum takvimi</Button>
          <Button size="md" leftIcon={<Video className="h-4 w-4" strokeWidth={1.7} />} onClick={() => toast.success('Yeni canlı oturum planlama akışı başlatıldı.', { description: 'Eğitmen ve katılımcı seçimi yapabilirsiniz.' })}>Yeni oturum</Button>
        </div>
      </motion.div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Aktif oturum', value: activeSessions.length, detail: 'Şu an yayında', icon: Radio, tone: 'red' },
          { label: 'Bugün planlanan', value: activeSessions.length + upcomingSessions.slice(0, 2).length, detail: 'Bugünkü oturumlar', icon: CalendarClock, tone: 'teal' },
          { label: 'Toplam katılımcı', value: totalParticipants, detail: 'Tüm oturumlar', icon: Users, tone: 'blue' },
          { label: 'Ortalama katılım', value: `%${averageAttendance}`, detail: 'Doluluk oranı', icon: CheckCircle2, tone: 'green' },
        ].map((stat, index) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]">
            <div className="flex items-start justify-between gap-3">
              <p className="text-[13px] font-medium text-ink-500">{stat.label}</p>
              <span className={cn('grid h-9 w-9 place-items-center rounded-xl', stat.tone === 'red' && 'bg-red-50 text-red-600', stat.tone === 'teal' && 'bg-brand-50 text-brand-700', stat.tone === 'blue' && 'bg-blue-50 text-blue-600', stat.tone === 'green' && 'bg-emerald-50 text-emerald-600')}>
                <stat.icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
              </span>
            </div>
            <p className="mt-4 text-xl font-bold tracking-[-0.03em] text-ink-900">{stat.value}</p>
            <p className="mt-1 text-xs text-ink-400">{stat.detail}</p>
          </motion.div>
        ))}
      </section>

      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }} className="relative overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]">
        <div className="grid gap-0 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative flex min-h-[260px] flex-col justify-between gap-4 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 p-6 text-white sm:p-8">
            <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full border-[26px] border-white/5" />
            <div className="absolute -bottom-24 left-32 h-44 w-44 rounded-full border-[18px] border-white/5" />
            <div className="relative">
              <div className="mb-3 flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-red-200">Canlı yayında</span>
              </div>
              <h2 className="text-xl font-bold tracking-[-0.02em] sm:text-2xl">{featured.name}</h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-brand-100/75">{featured.trainer} · {featured.company}</p>
            </div>
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-4 text-xs text-brand-100/85">
                <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" strokeWidth={1.7} /> {featured.startTime} · {featured.duration}</span>
                <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4" strokeWidth={1.7} /> {featured.participants}/{featured.capacity} katılımcı</span>
              </div>
              <Button variant="primary" size="md" leftIcon={<Play className="h-4 w-4 fill-current" strokeWidth={1.7} />} className="bg-white text-brand-800 hover:bg-brand-50 active:bg-brand-100 shadow-none" onClick={() => toast.success('Canlı oturuma bağlanılıyor...', { description: `${featured.name} · ${featured.trainer}` })}>Katıl</Button>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-3 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Öne çıkan oturum</p>
            <div className="grid place-items-center rounded-2xl bg-brand-50/60 p-6">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/30">
                <Play className="h-7 w-7 fill-current" strokeWidth={1.7} />
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-ink-400">Katılım</span>
                <span className="font-semibold text-ink-700">{featured.participants}/{featured.capacity}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-ink-100">
                <div className="h-full rounded-full bg-brand-500" style={{ width: `${Math.round((featured.participants / featured.capacity) * 100)}%` }} />
              </div>
              <p className="pt-1 text-[11px] text-ink-400">Oturum {Math.round((featured.participants / featured.capacity) * 100)}% dolulukta · {featured.category}</p>
            </div>
          </div>
        </div>
      </motion.section>

      <div className="grid gap-6 xl:grid-cols-2">
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.14 }} className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-red-50 text-red-600"><Radio className="h-[18px] w-[18px]" strokeWidth={1.7} /></span>
              <div>
                <h2 className="text-sm font-semibold text-ink-900">Aktif oturumlar</h2>
                <p className="mt-0.5 text-xs text-ink-400">Şu an yayında olan eğitimler</p>
              </div>
            </div>
            <span className="rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold text-red-600">{activeSessions.length} canlı</span>
          </div>
          <div className="space-y-3">
            {activeSessions.map((session) => {
              const cfg = statusConfig[session.status]
              const fill = Math.round((session.participants / session.capacity) * 100)
              return (
                <article key={session.id} className="rounded-2xl border border-ink-200/80 bg-white p-4 transition-all hover:border-ink-300">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                        </span>
                        <span className={cn('inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold', cfg.badge)}>{cfg.label}</span>
                      </div>
                      <p className="truncate text-sm font-semibold text-ink-800">{session.name}</p>
                      <p className="mt-0.5 truncate text-xs text-ink-400">{session.trainer} · {session.company}</p>
                    </div>
                    <Button variant="subtle" size="sm" leftIcon={<Play className="h-3.5 w-3.5 fill-current" strokeWidth={1.7} />} onClick={() => toast.success('Canlı oturuma bağlanılıyor...', { description: `${session.name}` })}>Katıl</Button>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3 text-[11px] text-ink-400">
                    <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" strokeWidth={1.7} /> {session.startTime} · {session.duration}</span>
                    <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" strokeWidth={1.7} /> {session.participants}/{session.capacity}</span>
                  </div>
                  <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-ink-100">
                    <div className="h-full rounded-full bg-red-500" style={{ width: `${fill}%` }} />
                  </div>
                </article>
              )
            })}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.18 }} className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-50 text-amber-600"><CalendarClock className="h-[18px] w-[18px]" strokeWidth={1.7} /></span>
              <div>
                <h2 className="text-sm font-semibold text-ink-900">Yaklaşan oturumlar</h2>
                <p className="mt-0.5 text-xs text-ink-400">Planlanan sonraki eğitimler</p>
              </div>
            </div>
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-700">{upcomingSessions.length} planlı</span>
          </div>
          <div className="space-y-3">
            {upcomingSessions.map((session) => {
              const cfg = statusConfig[session.status]
              const fill = Math.round((session.participants / session.capacity) * 100)
              return (
                <article key={session.id} className="rounded-2xl border border-ink-200/80 bg-white p-4 transition-all hover:border-ink-300">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex items-center gap-2">
                        <span className={cn('inline-flex h-2 w-2 rounded-full', cfg.dot)} />
                        <span className={cn('inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold', cfg.badge)}>{cfg.label}</span>
                      </div>
                      <p className="truncate text-sm font-semibold text-ink-800">{session.name}</p>
                      <p className="mt-0.5 truncate text-xs text-ink-400">{session.trainer} · {session.company}</p>
                    </div>
                    <Button variant="outline" size="sm" leftIcon={<Bell className="h-3.5 w-3.5" strokeWidth={1.7} />} onClick={() => toast.success('Hatırlatma ayarlandı.', { description: `${session.name} başlamadan önce bilgilendirileceksiniz.` })}>Hatırlat</Button>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3 text-[11px] text-ink-400">
                    <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" strokeWidth={1.7} /> {session.startTime} · {session.duration}</span>
                    <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" strokeWidth={1.7} /> {session.participants}/{session.capacity}</span>
                  </div>
                  <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-ink-100">
                    <div className="h-full rounded-full bg-amber-500" style={{ width: `${fill}%` }} />
                  </div>
                </article>
              )
            })}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
