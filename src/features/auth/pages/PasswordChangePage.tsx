import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import {
  AlertCircle,
  ArrowRight,
  HardHat,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
} from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button, Input } from '@/components/ui'
import { useParticipantAuth } from '../ParticipantAuthContext'

const passwordSchema = z.object({
  newPassword: z
    .string()
    .min(8, 'Şifre en az 8 karakter olmalı.')
    .max(64, 'Şifre çok uzun.'),
})

type PasswordForm = z.infer<typeof passwordSchema>

const contactSchema = z.object({
  email: z.string().min(1, 'E-posta gerekli.').email('Geçerli bir e-posta girin.'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası girin.'),
})

type ContactForm = z.infer<typeof contactSchema>

export function PasswordChangePage() {
  const navigate = useNavigate()
  const { user, changePassword, updateContact } = useParticipantAuth()
  const [submitting, setSubmitting] = useState(false)
  const [step, setStep] = useState<'password' | 'contact'>('password')

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { newPassword: '' },
  })

  const contactForm = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { email: '', phone: '' },
  })

  if (!user) {
    navigate('/katilimci/giris', { replace: true })
    return null
  }

  function onPasswordSubmit(data: PasswordForm) {
    setSubmitting(true)
    setTimeout(() => {
      changePassword(data.newPassword)
      setSubmitting(false)
      setStep('contact')
    }, 600)
  }

  function onContactSubmit(data: ContactForm) {
    setSubmitting(true)
    setTimeout(() => {
      updateContact(data.email, data.phone)
      setSubmitting(false)
      toast.success('Bilgileriniz kaydedildi', {
        description: 'Eğitim panelinize yönlendiriliyorsunuz…',
      })
      navigate('/katilimci', { replace: true })
    }, 600)
  }

  function skipContact() {
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      toast.success('Eğitim panelinize yönlendiriliyorsunuz…')
      navigate('/katilimci', { replace: true })
    }, 400)
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-ink-900">
      {/* Header */}
      <header className="border-b border-ink-200/70 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-10">
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
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-8 sm:min-h-[calc(100vh-72px)] sm:px-8 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="w-full max-w-[480px]"
        >
          {/* Adım göstergesi */}
          <div className="mb-5 flex items-center gap-2 sm:mb-6">
            <div className="flex items-center gap-2">
              <span className={step === 'password' ? 'grid h-7 w-7 place-items-center rounded-full bg-brand-600 text-xs font-bold text-white' : 'grid h-7 w-7 place-items-center rounded-full bg-emerald-500 text-xs font-bold text-white'}>
                {step === 'password' ? '1' : '✓'}
              </span>
              <span className={step === 'password' ? 'text-xs font-semibold text-ink-900' : 'text-xs font-medium text-ink-400'}>Şifre</span>
            </div>
            <span className="h-px flex-1 bg-ink-200" />
            <div className="flex items-center gap-2">
              <span className={step === 'contact' ? 'grid h-7 w-7 place-items-center rounded-full bg-brand-600 text-xs font-bold text-white' : 'grid h-7 w-7 place-items-center rounded-full bg-ink-200 text-xs font-bold text-ink-400'}>
                2
              </span>
              <span className={step === 'contact' ? 'text-xs font-semibold text-ink-900' : 'text-xs font-medium text-ink-400'}>İletişim</span>
            </div>
          </div>

          {step === 'password' ? (
            <>
              {/* Uyarı banner */}
              <div className="mb-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50/80 p-4 sm:mb-6 sm:p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-700">
                  <AlertCircle className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div>
                  <h2 className="text-sm font-semibold text-amber-900">Zorunlu şifre değişikliği</h2>
                  <p className="mt-1 text-xs leading-6 text-amber-800/80">
                    İlk girişte şifrenizi değiştirmeniz zorunludur. En az 8 karakterli bir şifre belirleyin.
                  </p>
                </div>
              </div>

              {/* Form kartı */}
              <section className="rounded-2xl border border-ink-200/90 bg-white p-5 shadow-[0_12px_40px_-24px_rgba(17,24,39,0.28)] sm:p-8">
                <div className="mb-7">
                  <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                    Güvenlik
                  </div>
                  <h1 className="text-[26px] font-bold tracking-[-0.04em] text-ink-900">
                    Şifrenizi değiştirin
                  </h1>
                  <p className="mt-2 text-sm leading-6 text-ink-500">
                    Hesabınız için en az 8 karakterli yeni bir şifre belirleyin.
                  </p>
                </div>

                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-5" noValidate>
                  <Input
                    label="Yeni şifre"
                    type="password"
                    placeholder="En az 8 karakter"
                    autoComplete="new-password"
                    icon={<LockKeyhole className="h-[18px] w-[18px]" strokeWidth={1.8} />}
                    error={passwordForm.formState.errors.newPassword?.message}
                    {...passwordForm.register('newPassword')}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    loading={submitting}
                    leftIcon={!submitting ? <ShieldCheck className="h-4 w-4" /> : undefined}
                    className="mt-1 w-full"
                  >
                    {submitting ? 'Kaydediliyor…' : 'Devam et'}
                  </Button>
                </form>
              </section>
            </>
          ) : (
            <>
              {/* Bilgi banner */}
              <div className="mb-5 flex items-start gap-3 rounded-2xl border border-brand-200 bg-brand-50/80 p-4 sm:mb-6 sm:p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">
                  <Mail className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div>
                  <h2 className="text-sm font-semibold text-brand-900">İletişim bilgileriniz</h2>
                  <p className="mt-1 text-xs leading-6 text-brand-800/80">
                    Eğitim bildirimleri ve hesap kurtarma için e-posta ve telefon numaranızı girin.
                  </p>
                </div>
              </div>

              {/* Form kartı */}
              <section className="rounded-2xl border border-ink-200/90 bg-white p-5 shadow-[0_12px_40px_-24px_rgba(17,24,39,0.28)] sm:p-8">
                <div className="mb-7">
                  <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                    İletişim
                  </div>
                  <h1 className="text-[26px] font-bold tracking-[-0.04em] text-ink-900">
                    İletişim bilgilerinizi girin
                  </h1>
                  <p className="mt-2 text-sm leading-6 text-ink-500">
                    {user.name}, size ulaşabilmemiz için iletişim bilgilerinizi tamamlayın.
                  </p>
                </div>

                <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-5" noValidate>
                  <Input
                    label="E-posta"
                    type="email"
                    placeholder="ornek@email.com"
                    autoComplete="email"
                    icon={<Mail className="h-[18px] w-[18px]" strokeWidth={1.8} />}
                    error={contactForm.formState.errors.email?.message}
                    {...contactForm.register('email')}
                  />

                  <Input
                    label="Telefon numarası"
                    type="tel"
                    placeholder="05XX XXX XX XX"
                    autoComplete="tel"
                    icon={<Phone className="h-[18px] w-[18px]" strokeWidth={1.8} />}
                    error={contactForm.formState.errors.phone?.message}
                    {...contactForm.register('phone')}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    loading={submitting}
                    leftIcon={!submitting ? <ArrowRight className="h-4 w-4" /> : undefined}
                    className="mt-1 w-full"
                  >
                    {submitting ? 'Kaydediliyor…' : 'Bilgileri kaydet ve devam et'}
                  </Button>

                  <button
                    type="button"
                    onClick={skipContact}
                    disabled={submitting}
                    className="w-full text-center text-xs font-medium text-ink-400 transition-colors hover:text-ink-600"
                  >
                    Şimdi geç, sonra tamamla
                  </button>
                </form>
              </section>
            </>
          )}

          <p className="mt-6 text-center text-[11px] leading-5 text-ink-400">
            Bilgileriniz KVKK uyumlu şekilde saklanır.
          </p>
        </motion.div>
      </main>
    </div>
  )
}
