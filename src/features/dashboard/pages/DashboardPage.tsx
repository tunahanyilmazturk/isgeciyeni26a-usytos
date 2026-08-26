import { motion } from 'framer-motion'
import {
  AlertTriangle,
  ArrowUpRight,
  BookOpen,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileWarning,
  MoreHorizontal,
  Plus,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { readCustomers } from '@/features/customers/data/customers'
import { readParticipants } from '@/features/participants/data/participants'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Button } from '@/components/ui'

const activityData = [
  { name: '01 Ağu', tamamlanan: 18, atanan: 26 },
  { name: '05 Ağu', tamamlanan: 24, atanan: 31 },
  { name: '09 Ağu', tamamlanan: 31, atanan: 38 },
  { name: '13 Ağu', tamamlanan: 29, atanan: 44 },
  { name: '17 Ağu', tamamlanan: 42, atanan: 51 },
  { name: '21 Ağu', tamamlanan: 48, atanan: 58 },
  { name: '25 Ağu', tamamlanan: 56, atanan: 64 },
]

const actions = [
  { icon: FileWarning, title: '3 risk değerlendirmesi yenilenmeli', detail: 'Son tarih: 28 Ağustos', tone: 'warning' },
  { icon: ClipboardCheck, title: '2 denetim raporu onay bekliyor', detail: 'Bugün oluşturuldu', tone: 'neutral' },
  { icon: BookOpen, title: '12 çalışanın eğitimi tamamlanmadı', detail: 'Son tarih: 30 Ağustos', tone: 'danger' },
]

const toneStyles = {
  teal: 'bg-brand-50 text-brand-700',
  violet: 'bg-violet-50 text-violet-600',
  green: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600',
}

export function DashboardPage() {
  const customers = useMemo(() => readCustomers(), [])
  const participants = useMemo(() => readParticipants(), [])

  const activeCustomers = customers.filter((c) => c.status === 'active')
  const totalEmployees = customers.reduce((sum, c) => sum + c.employees, 0)

  const trainingCompleted = participants.filter((p) => p.trainingStatus === 'successful').length
  const trainingCompletionRate = participants.length > 0
    ? Math.round((trainingCompleted / participants.length) * 100)
    : 0

  const overdueParticipants = participants.filter(
    (p) => p.trainingStatus === 'failed' || (p.trainingStatus !== 'successful' && p.nextTraining === '—'),
  ).length

  // Risk distribution for pie chart
  const lowRisk = customers.filter((c) => c.riskLevel === 'Az tehlikeli').length
  const mediumRisk = customers.filter((c) => c.riskLevel === 'Tehlikeli').length
  const highRisk = customers.filter((c) => c.riskLevel === 'Çok tehlikeli').length

  const riskData = [
    { name: 'Düşük', value: lowRisk, color: '#1c9f94' },
    { name: 'Orta', value: mediumRisk, color: '#e5b454' },
    { name: 'Yüksek', value: highRisk, color: '#dc7b6f' },
  ]

  const topCompanies = activeCustomers.slice(0, 4).map((c) => {
    const companyParticipants = participants.filter((p) => p.company === c.name)
    const completed = companyParticipants.filter((p) => p.trainingStatus === 'successful').length
    const progress = companyParticipants.length > 0
      ? Math.round((completed / companyParticipants.length) * 100)
      : 0
    const status = progress >= 75 ? 'İyi durumda' : progress >= 50 ? 'Takipte' : 'Aksiyon gerekli'
    return { name: c.name, employees: companyParticipants.length, progress, status }
  })

  const stats = [
    { label: 'Toplam firma', value: String(activeCustomers.length), change: '+1 bu ay', icon: Building2, tone: 'teal' },
    { label: 'Aktif çalışan', value: String(totalEmployees), change: '+8 bu ay', icon: Users, tone: 'violet' },
    { label: 'Eğitim tamamlama', value: `%${trainingCompletionRate}`, change: '+%12 geçen aya göre', icon: CheckCircle2, tone: 'green' },
    { label: 'Açık aksiyon', value: String(overdueParticipants), change: '3 yüksek öncelik', icon: AlertTriangle, tone: 'amber' },
  ]

  return (
    <div className="space-y-7">
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
      >
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-brand-600">25 Ağustos 2026, Salı</p>
          <h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[30px]">Günaydın, Savaş</h1>
          <p className="mt-1.5 text-sm text-ink-500">İSG süreçlerinizin bugünkü durumuna genel bir bakış.</p>
        </div>
        <Button size="md" leftIcon={<Plus className="h-4 w-4" />}>
          Yeni kayıt
        </Button>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="relative overflow-hidden rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-white px-6 py-6 sm:px-8 sm:py-7"
      >
        <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-brand-100/50 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <div className="hidden h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-600 text-white shadow-sm shadow-brand-600/20 sm:grid">
              <ShieldCheck className="h-5 w-5" strokeWidth={1.7} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand-700">Çalışma alanı özeti</p>
              <h2 className="mt-1.5 text-lg font-semibold tracking-[-0.02em] text-ink-900">İSG yönetiminiz kontrol altında</h2>
              <p className="mt-1 text-sm text-ink-500">Son 30 günde 64 eğitim ataması yapıldı, 56'sı tamamlandı.</p>
            </div>
          </div>
          <Link to="/dashboard/raporlar" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800">
            Detaylı raporu gör
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 + index * 0.05 }}
            className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-[13px] font-medium text-ink-500">{stat.label}</p>
              <span className={`grid h-9 w-9 place-items-center rounded-xl ${toneStyles[stat.tone as keyof typeof toneStyles]}`}>
                <stat.icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
              </span>
            </div>
            <p className="mt-4 text-[27px] font-bold tracking-[-0.04em] text-ink-900">{stat.value}</p>
            <p className="mt-1 text-xs text-ink-400">{stat.change}</p>
          </motion.div>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-ink-900">Eğitim aktivitesi</h2>
              <p className="mt-1 text-xs text-ink-400">Son 30 gündeki atama ve tamamlanma durumu</p>
            </div>
            <button type="button" className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100 hover:text-ink-700" aria-label="Daha fazla seçenek">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-6 h-[245px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 8, right: 4, left: -24, bottom: 0 }}>
                <defs>
                  <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1c9f94" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#1c9f94" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="assignedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#cdd3dd" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#cdd3dd" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#eef0f3" strokeDasharray="4 4" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9aa3b2', fontSize: 11 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9aa3b2', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ border: '1px solid #e3e7ee', borderRadius: 12, boxShadow: '0 8px 24px -12px rgba(17,24,39,.25)', fontSize: 12 }}
                  labelStyle={{ color: '#374151', fontWeight: 600, marginBottom: 4 }}
                />
                <Area type="monotone" dataKey="atanan" name="Atanan" stroke="#c3cad4" strokeWidth={2} fill="url(#assignedGradient)" />
                <Area type="monotone" dataKey="tamamlanan" name="Tamamlanan" stroke="#1c9f94" strokeWidth={2.5} fill="url(#completedGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex items-center gap-5 text-xs text-ink-500">
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-brand-500" />Tamamlanan</span>
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-ink-300" />Atanan</span>
          </div>
        </div>

        <div className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-ink-900">Risk dağılımı</h2>
              <p className="mt-1 text-xs text-ink-400">Aktif risk değerlendirmeleri</p>
            </div>
            <ShieldCheck className="h-5 w-5 text-ink-300" strokeWidth={1.7} />
          </div>
          <div className="relative mx-auto mt-3 h-[190px] w-full max-w-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={riskData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={84} paddingAngle={3} stroke="none">
                  {riskData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ border: '1px solid #e3e7ee', borderRadius: 12, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-center">
              <div><p className="text-2xl font-bold tracking-[-0.04em] text-ink-900">100</p><p className="text-[11px] text-ink-400">toplam risk</p></div>
            </div>
          </div>
          <div className="space-y-2.5">
            {riskData.map((risk) => (
              <div key={risk.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-ink-600"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: risk.color }} />{risk.name}</span>
                <span className="font-semibold text-ink-800">{risk.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.35fr_1fr]">
        <div className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-ink-900">Firma özeti</h2>
              <p className="mt-1 text-xs text-ink-400">Eğitim tamamlama oranına göre</p>
            </div>
            <Link to="/dashboard/firmalar" className="text-xs font-semibold text-brand-600 hover:text-brand-700">Tümünü gör</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-left text-xs">
              <thead className="border-b border-ink-100 text-[10px] font-semibold uppercase tracking-wider text-ink-400">
                <tr><th className="pb-3 font-semibold">Firma</th><th className="pb-3 font-semibold">Çalışan</th><th className="pb-3 font-semibold">İlerleme</th><th className="pb-3 text-right font-semibold">Durum</th></tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {topCompanies.map((company) => (
                  <tr key={company.name} className="group">
                    <td className="py-3.5 font-semibold text-ink-700">{company.name}</td>
                    <td className="py-3.5 text-ink-500">{company.employees}</td>
                    <td className="py-3.5"><div className="flex items-center gap-2"><div className="h-1.5 w-20 overflow-hidden rounded-full bg-ink-100"><div className="h-full rounded-full bg-brand-500" style={{ width: `${company.progress}%` }} /></div><span className="text-ink-500">{company.progress}%</span></div></td>
                    <td className="py-3.5 text-right"><span className={company.progress < 60 ? 'text-amber-600' : company.progress < 75 ? 'text-ink-500' : 'text-brand-600'}>{company.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div><h2 className="text-sm font-semibold text-ink-900">Öncelikli aksiyonlar</h2><p className="mt-1 text-xs text-ink-400">İlgilenmeniz gerekenler</p></div>
            <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-700">12 açık</span>
          </div>
          <div className="space-y-1">
            {actions.map((action) => (
              <Link key={action.title} to="/dashboard/aksiyonlar" className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-ink-50">
                <span className={cnActionTone(action.tone)}><action.icon className="h-4 w-4" strokeWidth={1.8} /></span>
                <span className="min-w-0 flex-1"><span className="block text-xs font-semibold leading-5 text-ink-700">{action.title}</span><span className="mt-0.5 flex items-center gap-1 text-[11px] text-ink-400"><Clock3 className="h-3 w-3" />{action.detail}</span></span>
                <ArrowUpRight className="mt-1 h-3.5 w-3.5 shrink-0 text-ink-300" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function cnActionTone(tone: string) {
  if (tone === 'warning') return 'grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-amber-50 text-amber-600'
  if (tone === 'danger') return 'grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-rose-50 text-rose-500'
  return 'grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600'
}
