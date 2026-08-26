import { motion } from 'framer-motion'
import {
  ArrowRight,
  Eye,
  LifeBuoy,
  MessageSquareReply,
  Plus,
  ShieldCheck,
  Ticket,
  XCircle,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'

type Priority = 'Yüksek' | 'Orta' | 'Düşük'
type Status = 'Açık' | 'Yanıt bekliyor' | 'Çözüldü'
type FilterTab = 'Tümü' | 'Açık' | 'Yanıt bekliyor' | 'Çözüldü'

interface SupportTicket {
  id: string
  subject: string
  priority: Priority
  status: Status
  createdAt: string
  category: string
}

const filterTabs: FilterTab[] = ['Tümü', 'Açık', 'Yanıt bekliyor', 'Çözüldü']

const supportTickets: SupportTicket[] = [
  {
    id: 'TKT-2041',
    subject: 'Müşteri içe aktarımında Excel hatası',
    priority: 'Yüksek',
    status: 'Açık',
    createdAt: '2 saat önce',
    category: 'Müşteriler',
  },
  {
    id: 'TKT-2040',
    subject: 'Katılımcı OTP doğrulama kodu ulaşmıyor',
    priority: 'Yüksek',
    status: 'Yanıt bekliyor',
    createdAt: '5 saat önce',
    category: 'Katılımcılar',
  },
  {
    id: 'TKT-2038',
    subject: 'Eğitim sertifikası PDF indirilemiyor',
    priority: 'Orta',
    status: 'Açık',
    createdAt: '1 gün önce',
    category: 'Eğitimler',
  },
  {
    id: 'TKT-2035',
    subject: 'Rapor filtresi tarih aralığı çalışmıyor',
    priority: 'Orta',
    status: 'Yanıt bekliyor',
    createdAt: '2 gün önce',
    category: 'Raporlar',
  },
  {
    id: 'TKT-2031',
    subject: 'Kullanıcı rol yetkilendirme sorunu',
    priority: 'Düşük',
    status: 'Çözüldü',
    createdAt: '3 gün önce',
    category: 'Sistem',
  },
  {
    id: 'TKT-2028',
    subject: 'Şirket logosu güncellenmiyor',
    priority: 'Düşük',
    status: 'Çözüldü',
    createdAt: '5 gün önce',
    category: 'Sistem',
  },
]

const faqItems = [
  {
    question: 'Destek talebi nasıl oluştururum?',
    answer:
      'Sağ üstteki "Yeni talep" butonuna tıklayarak konu, öncelik ve açıklama bilgilerini girin. Talebiniz oluşturulduktan sonra destek ekibi en kısa sürede yanıt verecektir.',
  },
  {
    question: 'Talep öncelik seviyeleri nelerdir?',
    answer:
      'Yüksek öncelik: iş akışınızı durduran kritik sorunlar. Orta öncelik: işlemlerinizi etkileyen ancak geçici çözümü olan sorunlar. Düşük öncelik: bilgi talepleri ve kozmetik iyileştirmeler.',
  },
  {
    question: 'Çözülen talebi yeniden açabilir miyim?',
    answer:
      'Evet. Çözülen bir talebin detayından "Yeniden aç" seçeneğiyle talebi tekrar açık duruma alabilir ve ekibimiz süreci devam ettirir.',
  },
  {
    question: 'Ortalama yanıt süresi ne kadar?',
    answer:
      'Yüksek öncelikli taleplerde ortalama ilk yanıt süresi 2 saatten kısadır. Orta ve düşük öncelikli taleplerde ise aynı iş günü içinde yanıt verilir.',
  },
]

function priorityClass(priority: Priority) {
  if (priority === 'Yüksek') return 'border-rose-200 bg-rose-50 text-rose-700'
  if (priority === 'Orta') return 'border-amber-200 bg-amber-50 text-amber-700'
  return 'border-ink-200 bg-ink-50 text-ink-600'
}

function statusClass(status: Status) {
  if (status === 'Açık') return 'bg-sky-50 text-sky-700'
  if (status === 'Yanıt bekliyor') return 'bg-amber-50 text-amber-700'
  return 'bg-emerald-50 text-emerald-700'
}

function statusDotClass(status: Status) {
  if (status === 'Açık') return 'bg-sky-500'
  if (status === 'Yanıt bekliyor') return 'bg-amber-500'
  return 'bg-emerald-500'
}

export function SupportRequestPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('Tümü')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)

  const filteredTickets = useMemo(() => {
    return supportTickets.filter(
      (ticket) => activeTab === 'Tümü' || ticket.status === activeTab,
    )
  }, [activeTab])

  function handleNewTicket() {
    toast.info('Yeni talep formu yakında açılacak.', {
      description: 'Konu ve öncelik bilgilerini girerek talebinizi oluşturun.',
    })
  }

  function handleView(id: string) {
    toast.info(`Talep ${id} detayları yakında açılacak.`)
  }

  function handleReply(id: string) {
    toast.info(`Talep ${id} için yanıt ekranı açılıyor...`)
  }

  function handleClose(id: string) {
    toast.success(`Talep ${id} kapatıldı`, {
      description: 'Talep durumu "Çözüldü" olarak güncellendi.',
    })
  }

  function toggleFaq(index: number) {
    setExpandedFaq((current) => (current === index ? null : index))
  }

  return (
    <div className="space-y-7">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"
      >
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-ink-400">
            <span>Destek</span>
            <span>/</span>
            <span className="text-ink-600">Destek talebi</span>
          </div>
          <h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[30px]">
            Destek talepleri
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm text-ink-500">
            Destek taleplerinizi takip edin, öncelik ve durum bilgileriyle
            birlikte yönetin.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus className="h-4 w-4" strokeWidth={1.8} />}
            onClick={handleNewTicket}
          >
            Yeni talep
          </Button>
        </div>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="min-w-0 rounded-2xl border border-ink-200/80 bg-white shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]"
      >
        <div className="flex flex-col justify-between gap-4 border-b border-ink-100 p-5 sm:flex-row sm:items-center sm:p-6">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-ink-900">Talep listesi</h2>
            <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700">
              {filteredTickets.length} kayıt
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filterTabs.map((tab) => {
              const count =
                tab === 'Tümü'
                  ? supportTickets.length
                  : supportTickets.filter((ticket) => ticket.status === tab).length
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-colors',
                    activeTab === tab
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-ink-500 hover:bg-ink-50 hover:text-ink-800',
                  )}
                >
                  {tab}
                  <span
                    className={cn(
                      'rounded-full px-1.5 py-0.5 text-[10px] font-bold',
                      activeTab === tab
                        ? 'bg-brand-600 text-white'
                        : 'bg-ink-100 text-ink-500',
                    )}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-xs">
            <thead className="border-b border-ink-100 bg-ink-50/40 text-[10px] font-semibold uppercase tracking-wider text-ink-400">
              <tr>
                <th className="px-5 py-3.5 font-semibold sm:px-6">Talep no</th>
                <th className="px-3 py-3.5 font-semibold">Konu</th>
                <th className="px-3 py-3.5 font-semibold">Öncelik</th>
                <th className="px-3 py-3.5 font-semibold">Durum</th>
                <th className="px-3 py-3.5 font-semibold">Oluşturma</th>
                <th className="px-5 py-3.5 text-right font-semibold sm:px-6">
                  İşlem
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {filteredTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="group transition-colors hover:bg-brand-50/35"
                >
                  <td className="px-5 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                        <Ticket className="h-4 w-4" strokeWidth={1.7} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-ink-800">
                          {ticket.id}
                        </p>
                        <p className="mt-0.5 text-[11px] text-ink-400">
                          {ticket.category}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <p className="max-w-xs truncate text-sm font-medium text-ink-800">
                      {ticket.subject}
                    </p>
                  </td>
                  <td className="px-3 py-4">
                    <span
                      className={cn(
                        'inline-flex whitespace-nowrap rounded-lg border px-2.5 py-1 text-[11px] font-semibold',
                        priorityClass(ticket.priority),
                      )}
                    >
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold',
                        statusClass(ticket.status),
                      )}
                    >
                      <span
                        className={cn(
                          'h-1.5 w-1.5 rounded-full',
                          statusDotClass(ticket.status),
                        )}
                      />
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    <p className="text-[11px] font-medium text-ink-600">
                      {ticket.createdAt}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-right sm:px-6">
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleView(ticket.id)}
                        className="rounded-lg p-2 text-ink-400 transition-colors hover:bg-brand-50 hover:text-brand-700"
                        aria-label={`${ticket.id} detayları`}
                      >
                        <Eye className="h-4 w-4" strokeWidth={1.7} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleReply(ticket.id)}
                        className="rounded-lg p-2 text-ink-400 transition-colors hover:bg-sky-50 hover:text-sky-700"
                        aria-label={`${ticket.id} yanıtla`}
                      >
                        <MessageSquareReply className="h-4 w-4" strokeWidth={1.7} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleClose(ticket.id)}
                        className="rounded-lg p-2 text-ink-400 transition-colors hover:bg-rose-50 hover:text-rose-700"
                        aria-label={`${ticket.id} kapat`}
                      >
                        <XCircle className="h-4 w-4" strokeWidth={1.7} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTickets.length === 0 && (
            <div className="px-6 py-16 text-center">
              <LifeBuoy className="mx-auto h-8 w-8 text-ink-300" strokeWidth={1.7} />
              <p className="mt-3 text-sm font-semibold text-ink-700">
                Talep bulunamadı
              </p>
              <p className="mt-1 text-xs text-ink-400">
                Bu duruma uygun kayıt yok. Farklı bir sekme seçerek tekrar deneyin.
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between gap-3 border-t border-ink-100 px-5 py-4 text-xs text-ink-400 sm:flex-row sm:items-center sm:px-6">
          <span>{filteredTickets.length} talep gösteriliyor</span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-500" strokeWidth={1.7} />
            Destek ekibi 7/24 ulaşılabilir
          </span>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.14 }}
        className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6"
      >
        <div className="mb-4 flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-700">
            <LifeBuoy className="h-[18px] w-[18px]" strokeWidth={1.7} />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-ink-900">
              Sık sorulan sorular
            </h2>
            <p className="mt-0.5 text-xs text-ink-400">
              Destek talepleri hakkında merak edilenler.
            </p>
          </div>
        </div>
        <div className="divide-y divide-ink-100">
          {faqItems.map((item, index) => {
            const isOpen = expandedFaq === index
            return (
              <div key={index}>
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-ink-800">
                    {item.question}
                  </span>
                  <ArrowRight
                    className={cn(
                      'h-4 w-4 shrink-0 text-ink-400 transition-transform duration-200',
                      isOpen && 'rotate-90 text-brand-600',
                    )}
                    strokeWidth={1.8}
                  />
                </button>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-4 text-sm leading-6 text-ink-500">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>
      </motion.section>
    </div>
  )
}
