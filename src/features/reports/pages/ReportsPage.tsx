import { motion } from 'framer-motion'
import {
  ArrowDownToLine,
  BarChart3,
  Download,
  FileText,
  PieChart as PieChartIcon,
  Plus,
  TrendingUp,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
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
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const monthlyTrend = [
  { name: 'Nis', tamamlanan: 42, hedef: 50 },
  { name: 'May', tamamlanan: 51, hedef: 55 },
  { name: 'Haz', tamamlanan: 48, hedef: 60 },
  { name: 'Tem', tamamlanan: 63, hedef: 65 },
  { name: 'Ağu', tamamlanan: 71, hedef: 70 },
  { name: 'Eyl', tamamlanan: 68, hedef: 75 },
]

const companyCompletion = [
  { name: 'Yıldız Mühendislik', oran: 86 },
  { name: 'Anadolu İnşaat', oran: 72 },
  { name: 'Marmara Tekstil', oran: 64 },
  { name: 'Ege Lojistik', oran: 91 },
  { name: 'Boğaziçi Metal', oran: 58 },
]

const riskDistribution = [
  { name: 'Az tehlikeli', value: 14, color: '#1c9f94' },
  { name: 'Tehlikeli', value: 9, color: '#e5b454' },
  { name: 'Çok tehlikeli', value: 5, color: '#dc7b6f' },
]

const recentReports = [
  { id: 'RPT-2026-091', name: 'Eylül 2026 İSG Performans Raporu', type: 'Aylık özet', date: '26 Eyl 2026', status: 'Hazır' },
  { id: 'RPT-2026-090', name: 'Q3 Risk Değerlendirme Raporu', type: 'Risk analizi', date: '22 Eyl 2026', status: 'Hazır' },
  { id: 'RPT-2026-089', name: 'Eğitim Tamamlama Raporu — Anadolu İnşaat', type: 'Firma bazlı', date: '18 Eyl 2026', status: 'Hazır' },
  { id: 'RPT-2026-088', name: 'Ağustos 2026 Denetim Özeti', type: 'Denetim', date: '05 Eyl 2026', status: 'Arşivlendi' },
  { id: 'RPT-2026-087', name: 'Yıllık İSG Eğilim Raporu 2026', type: 'Yıllık', date: '01 Eyl 2026', status: 'Taslak' },
  { id: 'RPT-2026-086', name: 'Çalışan Sağlığı Raporu — Marmara Tekstil', type: 'Firma bazlı', date: '28 Ağu 2026', status: 'Hazır' },
]

const statusStyles: Record<string, string> = {
  'Hazır': 'bg-emerald-50 text-emerald-600',
  'Arşivlendi': 'bg-ink-100 text-ink-600',
  'Taslak': 'bg-amber-50 text-amber-600',
}

export function ReportsPage() {
  const handleDownload = (name: string) => {
    toast.success(`"${name}" indiriliyor`, { description: 'Rapor PDF olarak hazırlanıyor.' })
  }

  const handleCreateReport = () => {
    toast.success('Yeni rapor oluşturuluyor', { description: 'Rapor sihirbazı birazdan açılacak.' })
  }

  const handleDownloadAll = () => {
    toast.success('Rapor paketi indiriliyor', { description: 'Tüm hazır raporlar tek arşiv olarak hazırlanıyor.' })
  }

  return (
    <div className="space-y-7">
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
      >
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-ink-400">
            <span>Ana menü</span>
            <span>/</span>
            <span className="text-ink-600">Raporlar</span>
          </div>
          <h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[30px]">Raporlar</h1>
          <p className="mt-1.5 text-sm text-ink-500">İSG performans ve risk metriklerini tek ekranda takip edin.</p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="outline" size="md" leftIcon={<ArrowDownToLine className="h-4 w-4" strokeWidth={1.8} />} onClick={handleDownloadAll}>
            Rapor indir
          </Button>
          <Button size="md" leftIcon={<Plus className="h-4 w-4" strokeWidth={1.8} />} onClick={handleCreateReport}>
            Rapor oluştur
          </Button>
        </div>
      </motion.section>

      <section className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-ink-900">Eğitim tamamlama trendi</h2>
              <p className="mt-1 text-xs text-ink-400">Son 6 ayda tamamlanan eğitimler ve hedef</p>
            </div>
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-700">
              <TrendingUp className="h-[18px] w-[18px]" strokeWidth={1.8} />
            </span>
          </div>
          <div className="mt-6 h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrend} margin={{ top: 8, right: 4, left: -24, bottom: 0 }}>
                <defs>
                  <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1c9f94" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#1c9f94" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
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
                <Area type="monotone" dataKey="hedef" name="Hedef" stroke="#c3cad4" strokeWidth={2} strokeDasharray="5 4" fill="url(#targetGradient)" />
                <Area type="monotone" dataKey="tamamlanan" name="Tamamlanan" stroke="#1c9f94" strokeWidth={2.5} fill="url(#completedGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex items-center gap-5 text-xs text-ink-500">
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-brand-500" />Tamamlanan</span>
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-ink-300" />Hedef</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-ink-900">Risk dağılımı</h2>
              <p className="mt-1 text-xs text-ink-400">Aktif risk değerlendirmeleri</p>
            </div>
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-700">
              <PieChartIcon className="h-[18px] w-[18px]" strokeWidth={1.8} />
            </span>
          </div>
          <div className="relative mx-auto mt-3 h-[200px] w-full max-w-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={riskDistribution} dataKey="value" nameKey="name" innerRadius={62} outerRadius={88} paddingAngle={3} stroke="none">
                  {riskDistribution.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ border: '1px solid #e3e7ee', borderRadius: 12, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-center">
              <div>
                <p className="text-2xl font-bold tracking-[-0.04em] text-ink-900">28</p>
                <p className="text-[11px] text-ink-400">toplam değerlendirme</p>
              </div>
            </div>
          </div>
          <div className="space-y-2.5">
            {riskDistribution.map((risk) => (
              <div key={risk.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-ink-600">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: risk.color }} />
                  {risk.name}
                </span>
                <span className="font-semibold text-ink-800">{risk.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-ink-900">Firmaya göre eğitim tamamlama</h2>
            <p className="mt-1 text-xs text-ink-400">İlk 5 firma — tamamlanma oranı (%)</p>
          </div>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-700">
            <BarChart3 className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </span>
        </div>
        <div className="mt-6 h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={companyCompletion} margin={{ top: 8, right: 4, left: -24, bottom: 0 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1c9f94" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="#1c9f94" stopOpacity={0.55} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#eef0f3" strokeDasharray="4 4" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9aa3b2', fontSize: 11 }} dy={10} interval={0} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9aa3b2', fontSize: 11 }} />
              <Tooltip
                cursor={{ fill: 'rgba(28,159,148,0.06)' }}
                contentStyle={{ border: '1px solid #e3e7ee', borderRadius: 12, boxShadow: '0 8px 24px -12px rgba(17,24,39,.25)', fontSize: 12 }}
                labelStyle={{ color: '#374151', fontWeight: 600, marginBottom: 4 }}
              />
              <Bar dataKey="oran" name="Tamamlama %" radius={[6, 6, 0, 0]} maxBarSize={56} fill="url(#barGradient)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6"
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-ink-900">Son raporlar</h2>
            <p className="mt-1 text-xs text-ink-400">Oluşturulan ve arşivlenen son raporlar</p>
          </div>
          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-700">{recentReports.length} rapor</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-xs">
            <thead className="border-b border-ink-100 text-[10px] font-semibold uppercase tracking-wider text-ink-400">
              <tr>
                <th className="pb-3 font-semibold">Rapor adı</th>
                <th className="pb-3 font-semibold">Tür</th>
                <th className="pb-3 font-semibold">Tarih</th>
                <th className="pb-3 font-semibold">Durum</th>
                <th className="pb-3 text-right font-semibold">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {recentReports.map((report) => (
                <tr key={report.id} className="group transition-colors hover:bg-ink-50/60">
                  <td className="py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                        <FileText className="h-4 w-4" strokeWidth={1.8} />
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold text-ink-700">{report.name}</p>
                        <p className="mt-0.5 text-[11px] text-ink-400">{report.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 text-ink-500">{report.type}</td>
                  <td className="py-3.5 text-ink-500">{report.date}</td>
                  <td className="py-3.5">
                    <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold', statusStyles[report.status])}>
                      {report.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => handleDownload(report.name)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-ink-700 transition-colors hover:border-ink-300 hover:bg-ink-50"
                    >
                      <Download className="h-3.5 w-3.5" strokeWidth={1.8} />
                      İndir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  )
}
