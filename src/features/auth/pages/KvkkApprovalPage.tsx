import { motion } from 'framer-motion'
import {
  Check,
  CheckCircle2,
  ChevronDown,
  FileText,
  HardHat,
  ShieldCheck,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useParticipantAuth } from '../ParticipantAuthContext'
import { KVKK_TEXT } from '../data/kvkk'

export function KvkkApprovalPage() {
  const navigate = useNavigate()
  const { user, approveKvkk, logout } = useParticipantAuth()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false)
  const [accepted, setAccepted] = useState(false)

  // Eğer kullanıcı giriş yapmamışsa login'e yönlendir
  useEffect(() => {
    if (!user) navigate('/katilimci/giris', { replace: true })
  }, [user, navigate])

  function handleScroll() {
    const el = scrollRef.current
    if (!el) return
    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 8
    if (isAtBottom && !hasScrolledToEnd) setHasScrolledToEnd(true)
  }

  function handleApprove() {
    if (!hasScrolledToEnd) {
      toast.error('Metni okuyun', {
        description: 'KVKK metnini sonuna kadar kaydırarak okuduğunuzu onaylayın.',
      })
      return
    }
    if (!accepted) {
      toast.error('Onay gerekli', {
        description: 'KVKK aydınlatma metnini kabul ettiğinizi işaretleyin.',
      })
      return
    }
    approveKvkk()
    toast.success('KVKK onayı tamam', {
      description: 'Eğitim panelinize yönlendiriliyorsunuz…',
    })
    navigate('/katilimci')
  }

  function handleReject() {
    logout()
    toast.info('Oturum kapatıldı', {
      description: 'KVKK metnini kabul etmediğiniz için giriş yapılamadı.',
    })
    navigate('/katilimci/giris', { replace: true })
  }

  if (!user) return null

  const kvkkLines = KVKK_TEXT.split('\n')

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-ink-900">
      {/* Header */}
      <header className="border-b border-ink-200/70 bg-white">
        <div className="mx-auto flex h-[72px] max-w-5xl items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-brand-600 text-white shadow-sm shadow-brand-600/20">
              <HardHat className="h-[18px] w-[18px]" strokeWidth={1.8} />
            </span>
            <span className="leading-none">
              <span className="block text-[13px] font-bold uppercase tracking-[0.18em] text-ink-900">
                HanTech
              </span>
              <span className="mt-1 block text-[10px] font-medium tracking-wide text-ink-400">
                İSG Eğitim Portalı
              </span>
            </span>
          </div>
          <button
            type="button"
            onClick={handleReject}
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 transition-colors hover:text-rose-600"
          >
            <X className="h-4 w-4" strokeWidth={1.8} />
            <span className="hidden sm:inline">Oturumu kapat</span>
          </button>
        </div>
      </header>

      {/* İçerik */}
      <main className="flex min-h-[calc(100vh-72px)] items-start justify-center px-5 py-10 sm:px-8 sm:py-14">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="w-full max-w-3xl"
        >
          {/* Başlık */}
          <div className="mb-6 flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700">
              <FileText className="h-6 w-6" strokeWidth={1.7} />
            </span>
            <div>
              <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                Yasal bilgilendirme
              </div>
              <h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[28px]">
                KVKK Aydınlatma Metni
              </h1>
              <p className="mt-1.5 text-sm leading-6 text-ink-500">
                Merhaba <span className="font-semibold text-ink-700">{user.name}</span>, devam etmeden önce
                kişisel verilerinizin işlenmesine ilişkin aydınlatma metnini okumanız ve onaylamanız gerekmektedir.
              </p>
            </div>
          </div>

          {/* KVKK metni — scroll alanı */}
          <div className="rounded-2xl border border-ink-200/90 bg-white shadow-[0_12px_40px_-24px_rgba(17,24,39,0.28)]">
            <div className="flex items-center justify-between border-b border-ink-100 px-6 py-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-brand-600" strokeWidth={1.8} />
                <span className="text-sm font-semibold text-ink-800">6698 sayılı KVKK Aydınlatma Metni</span>
              </div>
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors',
                  hasScrolledToEnd
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-amber-50 text-amber-700',
                )}
              >
                <span
                  className={cn(
                    'h-1.5 w-1.5 rounded-full',
                    hasScrolledToEnd ? 'bg-emerald-500' : 'bg-amber-500',
                  )}
                />
                {hasScrolledToEnd ? 'Okundu' : 'Okunuyor…'}
              </span>
            </div>

            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="h-[55vh] overflow-y-auto border-b border-ink-100 bg-slate-50/40 px-6 py-5 text-sm leading-7 text-ink-700"
            >
              {kvkkLines.map((line, index) => (
                <p key={index} className={cn(line.trim() === '' ? 'h-3' : 'mb-1')}>
                  {line.trim() === '' ? '' : line}
                </p>
              ))}
            </div>

            {/* Scroll ilerleme göstergesi */}
            {!hasScrolledToEnd && (
              <div className="flex items-center justify-center gap-2 border-b border-ink-100 bg-amber-50/50 px-6 py-2.5 text-[11px] font-medium text-amber-700">
                <ChevronDown className="h-3.5 w-3.5 animate-bounce" strokeWidth={2} />
                Metni sonuna kadar kaydırarak okuduğunuzu onaylayın
              </div>
            )}
          </div>

          {/* Onay checkbox + butonlar */}
          <div className="mt-6 space-y-5">
            <label
              className={cn(
                'flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors',
                hasScrolledToEnd
                  ? accepted
                    ? 'border-brand-300 bg-brand-50/60'
                    : 'border-ink-200 hover:border-ink-300'
                  : 'cursor-not-allowed border-ink-200 opacity-60',
              )}
            >
              <input
                type="checkbox"
                disabled={!hasScrolledToEnd}
                checked={accepted}
                onChange={(event) => setAccepted(event.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500/20"
              />
              <span className="text-sm leading-6 text-ink-700">
                <span className="font-semibold text-ink-900">KVKK Aydınlatma Metni'ni okudum, anladım ve kabul ediyorum.</span>
                <br />
                <span className="text-ink-500">
                  Kişisel verilerimin yukarıda belirtilen amaçlar kapsamında işlenmesini ve aktarılmasını onaylıyorum.
                </span>
              </span>
              {accepted && hasScrolledToEnd && (
                <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-brand-600" strokeWidth={1.8} />
              )}
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                size="lg"
                onClick={handleReject}
                leftIcon={<X className="h-4 w-4" />}
              >
                Reddet ve çık
              </Button>
              <Button
                size="lg"
                onClick={handleApprove}
                disabled={!hasScrolledToEnd || !accepted}
                leftIcon={hasScrolledToEnd && accepted ? <Check className="h-4 w-4" /> : undefined}
              >
                Onayla ve devam et
              </Button>
            </div>
          </div>

          {/* Alt bilgi */}
          <p className="mt-6 text-center text-[11px] leading-5 text-ink-400">
            Bu metin 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında hazırlanmıştır.
            Reddet seçeneğini seçerseniz oturumunuz kapatılacak ve giriş yapamazsınız.
          </p>
        </motion.div>
      </main>
    </div>
  )
}
