import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  HardHat,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button, Input } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useParticipantAuth } from '../ParticipantAuthContext'

const passwordSchema = z.object({
  newPassword: z
    .string()
    .min(8, 'Şifre en az 8 karakter olmalı.')
    .max(64, 'Şifre çok uzun.')
    .refine((v) => /[a-zA-Z]/.test(v), 'En az bir harf içermeli.')
    .refine((v) => /\d/.test(v), 'En az bir rakam içermeli.'),
})

type PasswordForm = z.infer<typeof passwordSchema>

const contactSchema = z.object({
  email: z.string().min(1, 'E-posta gerekli.').email('Geçerli bir e-posta girin.'),
  phone: z
    .string()
    .min(10, 'Geçerli bir telefon numarası girin.')
    .refine((v) => /^0?\d{10}$|^\+90\d{10}$/.test(v.replace(/\s/g, '')), 'Geçerli bir Türk telefon numarası girin (örn: 05XX XXX XX XX).'),
})

type ContactForm = z.infer<typeof contactSchema>

/** Şifre güçlülük seviyesi */
function getPasswordStrength(pwd: string): { score: number; label: string; color: string } {
  let score = 0
  if (pwd.length >= 8) score++
  if (pwd.length >= 12) score++
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++
  if (/\d/.test(pwd)) score++
  if (/[^a-zA-Z0-9]/.test(pwd)) score++
  const levels = [
    { label: 'Çok zayıf', color: 'bg-rose-500' },
    { label: 'Zayıf', color: 'bg-amber-500' },
    { label: 'Orta', color: 'bg-yellow-500' },
    { label: 'İyi', color: 'bg-lime-500' },
    { label: 'Güçlü', color: 'bg-emerald-500' },
    { label: 'Çok güçlü', color: 'bg-emerald-600' },
  ]
  return { score, ...levels[Math.min(score, 5)] }
}

export function PasswordChangePage() {
  const navigate = useNavigate()
  const { user, changePassword, updateContact, mustChangePassword } = useParticipantAuth()
  const [submitting, setSubmitting] = useState(false)
  const [step, setStep] = useState<'password' | 'contact'>(mustChangePassword ? 'password' : 'contact')
  const [showPassword, setShowPassword] = useState(false)

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { newPassword: '' },
  })

  const contactForm = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { email: '', phone: '' },
  })

  const passwordValue = passwordForm.watch('newPassword')
  const strength = getPasswordStrength(passwordValue)

  if (!user) {
    navigate('/katilimci/giris', { replace: true })
    return null
  }

  function onPasswordSubmit(data: PasswordForm) {
    setSubmitting(true)
    changePassword(data.newPassword)
    setSubmitting(false)
    setStep('contact')
  }

  function onContactSubmit(data: ContactForm) {
    setSubmitting(true)
    updateContact(data.email, data.phone)
    setSubmitting(false)
    toast.success('Bilgileriniz kaydedildi', {
      description: 'Eğitim panelinize yönlendiriliyorsunuz…',
    })
    navigate('/katilimci', { replace: true })
  }

  const steps = [
    { id: 'password', label: 'Şifre', icon: LockKeyhole },
    { id: 'contact', label: 'İletişim', icon: Mail },
  ] as const

  const currentStepIndex = steps.findIndex((s) => s.id === step)

  return (
    <div className="min-h-screen bg-gradient-to-br from-ink-50 via-white to-brand-50/30 text-ink-900">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-ink-200/70 bg-white/80 backdrop-blur-md">
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
          <div className="hidden items-center gap-2 rounded-full bg-ink-50 px-3 py-1.5 sm:flex">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-100 text-[10px] font-bold text-brand-700">
              {user.name.charAt(0).toLocaleUpperCase('tr-TR')}
            </span>
            <span className="text-xs font-semibold text-ink-700">{user.name}</span>
          </div>
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-8 sm:min-h-[calc(100vh-72px)] sm:px-8 sm:py-14">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="w-full max-w-[520px]"
        >
          {/* Adım göstergesi — geliştirilmiş */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between">
              {steps.map((s, idx) => {
                const isComplete = idx < currentStepIndex
                const isCurrent = idx === currentStepIndex
                const Icon = s.icon
                return (
                  <div key={s.id} className="flex flex-1 items-center">
                    <div className="flex flex-col items-center gap-1.5">
                      <motion.div
                        initial={false}
                        animate={{
                          scale: isCurrent ? 1.05 : 1,
                          backgroundColor: isComplete ? '#059669' : isCurrent ? '#4f46e5' : '#e5e7eb',
                        }}
                        className={cn(
                          'grid h-10 w-10 place-items-center rounded-full text-sm font-bold shadow-sm',
                          isComplete ? 'text-white' : isCurrent ? 'text-white shadow-brand-500/25' : 'text-ink-400',
                        )}
                      >
                        {isComplete ? <Check className="h-5 w-5" strokeWidth={2.5} /> : <Icon className="h-4.5 w-4.5" strokeWidth={2} />}
                      </motion.div>
                      <span className={cn(
                        'text-[11px] font-semibold transition-colors',
                        isComplete ? 'text-emerald-600' : isCurrent ? 'text-ink-900' : 'text-ink-400',
                      )}>
                        {s.label}
                      </span>
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="relative mx-2 h-0.5 flex-1 overflow-hidden rounded-full bg-ink-200">
                        <motion.div
                          className="absolute inset-0 origin-left bg-emerald-500"
                          initial={false}
                          animate={{ scaleX: isComplete ? 1 : 0 }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 'password' ? (
              <motion.div
                key="password"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Uyarı banner */}
                <div className="mb-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50/50 p-4 sm:mb-6 sm:p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-700">
                    <AlertCircle className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold text-amber-900">Zorunlu şifre değişikliği</h2>
                    <p className="mt-1 text-xs leading-6 text-amber-800/80">
                      İlk girişte şifrenizi değiştirmeniz zorunludur. Güvenliğiniz için en az 8 karakter, harf ve rakam içeren bir şifre belirleyin.
                    </p>
                  </div>
                </div>

                {/* Form kartı */}
                <section className="overflow-hidden rounded-2xl border border-ink-200/90 bg-white shadow-[0_12px_40px_-24px_rgba(17,24,39,0.28)]">
                  {/* Üst başlık alanı */}
                  <div className="border-b border-ink-100 bg-gradient-to-br from-brand-50/50 to-white px-5 py-6 sm:px-8 sm:py-7">
                    <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                      Güvenlik
                    </div>
                    <h1 className="text-[26px] font-bold tracking-[-0.04em] text-ink-900">
                      Şifrenizi değiştirin
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-ink-500">
                      Hesabınız için yeni ve güvenli bir şifre belirleyin.
                    </p>
                  </div>

                  {/* Form alanı */}
                  <div className="p-5 sm:p-8">
                    <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-5" noValidate>
                      <div className="relative">
                        <Input
                          label="Yeni şifre"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="En az 8 karakter"
                          autoComplete="new-password"
                          icon={<LockKeyhole className="h-[18px] w-[18px]" strokeWidth={1.8} />}
                          error={passwordForm.formState.errors.newPassword?.message}
                          {...passwordForm.register('newPassword')}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-3 top-[38px] text-ink-400 transition-colors hover:text-ink-600"
                          aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeOff className="h-[18px] w-[18px]" strokeWidth={1.8} /> : <Eye className="h-[18px] w-[18px]" strokeWidth={1.8} />}
                        </button>
                      </div>

                      {/* Şifre güçlülük göstergesi */}
                      {passwordValue.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-semibold text-ink-500">Şifre gücü</span>
                            <span className={cn(
                              'text-[11px] font-bold',
                              strength.score <= 1 ? 'text-rose-600' : strength.score <= 2 ? 'text-amber-600' : strength.score <= 3 ? 'text-yellow-600' : 'text-emerald-600',
                            )}>
                              {strength.label}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            {[0, 1, 2, 3, 4].map((i) => (
                              <div
                                key={i}
                                className={cn(
                                  'h-1.5 flex-1 rounded-full transition-colors',
                                  i < strength.score ? strength.color : 'bg-ink-100',
                                )}
                              />
                            ))}
                          </div>
                          {/* Gereksinimler */}
                          <ul className="grid grid-cols-2 gap-x-3 gap-y-1 pt-1">
                            {[
                              { label: '8+ karakter', ok: passwordValue.length >= 8 },
                              { label: 'Harf', ok: /[a-zA-Z]/.test(passwordValue) },
                              { label: 'Rakam', ok: /\d/.test(passwordValue) },
                              { label: 'Özel karakter', ok: /[^a-zA-Z0-9]/.test(passwordValue) },
                            ].map((req) => (
                              <li key={req.label} className={cn(
                                'flex items-center gap-1.5 text-[10px] font-medium',
                                req.ok ? 'text-emerald-600' : 'text-ink-400',
                              )}>
                                {req.ok
                                  ? <CheckCircle2 className="h-3 w-3 shrink-0" strokeWidth={2} />
                                  : <span className="h-3 w-3 shrink-0 rounded-full border border-ink-300" />}
                                {req.label}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}

                      <Button
                        type="submit"
                        size="lg"
                        loading={submitting}
                        rightIcon={!submitting ? <ArrowRight className="h-4 w-4" /> : undefined}
                        className="mt-2 w-full"
                      >
                        {submitting ? 'Kaydediliyor…' : 'Şifreyi kaydet ve devam et'}
                      </Button>
                    </form>
                  </div>
                </section>
              </motion.div>
            ) : (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Bilgi banner */}
                <div className="mb-5 flex items-start gap-3 rounded-2xl border border-brand-200 bg-gradient-to-r from-brand-50 to-indigo-50/40 p-4 sm:mb-6 sm:p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">
                    <Mail className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold text-brand-900">İletişim bilgileriniz</h2>
                    <p className="mt-1 text-xs leading-6 text-brand-800/80">
                      Eğitim bildirimleri, hatırlatmalar ve hesap kurtarma için e-posta ve telefon numaranızı girin. Bu bilgiler KVKK kapsamında korunmaktadır.
                    </p>
                  </div>
                </div>

                {/* Form kartı */}
                <section className="overflow-hidden rounded-2xl border border-ink-200/90 bg-white shadow-[0_12px_40px_-24px_rgba(17,24,39,0.28)]">
                  {/* Üst başlık alanı */}
                  <div className="border-b border-ink-100 bg-gradient-to-br from-brand-50/50 to-white px-5 py-6 sm:px-8 sm:py-7">
                    <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
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

                  {/* Form alanı */}
                  <div className="p-5 sm:p-8">
                    {/* Mevcut bilgiler özeti */}
                    <div className="mb-5 grid gap-2 rounded-xl bg-ink-50/60 p-3 sm:grid-cols-2">
                      <div className="flex items-center gap-2 text-xs">
                        <UserRound className="h-3.5 w-3.5 text-ink-400" strokeWidth={1.8} />
                        <span className="text-ink-400">Ad Soyad:</span>
                        <span className="font-semibold text-ink-700">{user.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <MapPin className="h-3.5 w-3.5 text-ink-400" strokeWidth={1.8} />
                        <span className="text-ink-400">Firma:</span>
                        <span className="font-semibold text-ink-700">{user.company}</span>
                      </div>
                    </div>

                    <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-5" noValidate>
                      <Input
                        label="E-posta adresi"
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

                      {/* Bilgi notu */}
                      <div className="flex items-start gap-2.5 rounded-xl bg-sky-50/60 p-3.5">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" strokeWidth={1.8} />
                        <p className="text-[11px] leading-5 text-sky-800/80">
                          Telefon numaranız eğitim hatırlatmaları ve acil durum bildirimleri için kullanılacaktır. Numaranız üçüncü kişilerle paylaşılmaz.
                        </p>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        loading={submitting}
                        rightIcon={!submitting ? <ArrowRight className="h-4 w-4" /> : undefined}
                        className="mt-2 w-full"
                      >
                        {submitting ? 'Kaydediliyor…' : 'Bilgileri kaydet ve devam et'}
                      </Button>
                    </form>
                  </div>
                </section>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Alt bilgi */}
          <div className="mt-6 flex items-center justify-center gap-2 text-[11px] leading-5 text-ink-400">
            <ShieldCheck className="h-3.5 w-3.5 text-ink-400" strokeWidth={1.8} />
            Bilgileriniz KVKK uyumlu şekilde saklanır ve üçüncü kişilerle paylaşılmaz.
          </div>
        </motion.div>
      </main>
    </div>
  )
}
