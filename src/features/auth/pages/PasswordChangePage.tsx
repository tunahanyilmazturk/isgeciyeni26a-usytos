import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import {
  AlertCircle,
  Check,
  HardHat,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
} from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button, Input } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useParticipantAuth } from '../ParticipantAuthContext'

const passwordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, 'Şifre en az 8 karakter olmalı.')
      .max(64, 'Şifre çok uzun.')
      .regex(/[A-Z]/, 'En az bir büyük harf olmalı.')
      .regex(/[a-z]/, 'En az bir küçük harf olmalı.')
      .regex(/\d/, 'En az bir rakam olmalı.'),
    confirmPassword: z.string().min(1, 'Şifre tekrarı gerekli.'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Şifreler eşleşmiyor.',
    path: ['confirmPassword'],
  })

type PasswordForm = z.infer<typeof passwordSchema>

interface PasswordRule {
  label: string
  test: (value: string) => boolean
}

const passwordRules: PasswordRule[] = [
  { label: 'En az 8 karakter', test: (v) => v.length >= 8 },
  { label: 'En az bir büyük harf', test: (v) => /[A-Z]/.test(v) },
  { label: 'En az bir küçük harf', test: (v) => /[a-z]/.test(v) },
  { label: 'En az bir rakam', test: (v) => /\d/.test(v) },
]

export function PasswordChangePage() {
  const navigate = useNavigate()
  const { user, changePassword } = useParticipantAuth()
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { newPassword: '', confirmPassword: '' },
  })

  const newPasswordValue = watch('newPassword') ?? ''

  if (!user) {
    navigate('/katilimci/giris', { replace: true })
    return null
  }

  function onSubmit(data: PasswordForm) {
    setSubmitting(true)
    setTimeout(() => {
      changePassword(data.newPassword)
      setSubmitting(false)
      toast.success('Şifre değiştirildi', {
        description: 'Eğitim panelinize yönlendiriliyorsunuz…',
      })
      navigate('/katilimci', { replace: true })
    }, 800)
  }

  const passedRules = passwordRules.filter((r) => r.test(newPasswordValue))
  const allPassed = passedRules.length === passwordRules.length

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
          {/* Uyarı banner */}
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50/80 p-4 sm:mb-6 sm:p-5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-700">
              <AlertCircle className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-amber-900">Zorunlu şifre değişikliği</h2>
              <p className="mt-1 text-xs leading-6 text-amber-800/80">
                KVKK gereği ilk girişte şifrenizi değiştirmeniz zorunludur. Şifrenizi
                değiştirmeden eğitim içeriklerine erişemezsiniz.
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
                Hesabınızı güvende tutmak için yeni bir şifre belirleyin.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <Input
                label="Yeni şifre"
                type="password"
                placeholder="Yeni şifrenizi girin"
                autoComplete="new-password"
                icon={<LockKeyhole className="h-[18px] w-[18px]" strokeWidth={1.8} />}
                error={errors.newPassword?.message}
                {...register('newPassword')}
              />

              {/* Şifre güç kuralları */}
              <div className="rounded-xl border border-ink-200 bg-ink-50/50 p-4">
                <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-ink-500">
                  <KeyRound className="h-3.5 w-3.5" strokeWidth={1.8} />
                  Şifre gereksinimleri
                </p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {passwordRules.map((rule) => {
                    const passed = rule.test(newPasswordValue)
                    return (
                      <li
                        key={rule.label}
                        className={cn(
                          'flex items-center gap-2 text-xs transition-colors',
                          passed ? 'text-emerald-600' : 'text-ink-400',
                        )}
                      >
                        <span
                          className={cn(
                            'grid h-4 w-4 shrink-0 place-items-center rounded-full transition-colors',
                            passed ? 'bg-emerald-100 text-emerald-600' : 'bg-ink-200 text-ink-400',
                          )}
                        >
                          {passed ? (
                            <Check className="h-3 w-3" strokeWidth={2.5} />
                          ) : (
                            <span className="h-1 w-1 rounded-full bg-current" />
                          )}
                        </span>
                        {rule.label}
                      </li>
                    )
                  })}
                </ul>
              </div>

              <Input
                label="Yeni şifre (tekrar)"
                type="password"
                placeholder="Şifrenizi tekrar girin"
                autoComplete="new-password"
                icon={<LockKeyhole className="h-[18px] w-[18px]" strokeWidth={1.8} />}
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
              />

              <Button
                type="submit"
                size="lg"
                loading={submitting}
                disabled={!allPassed}
                leftIcon={!submitting ? <ShieldCheck className="h-4 w-4" /> : undefined}
                className="mt-1 w-full"
              >
                {submitting ? 'Kaydediliyor…' : 'Şifreyi değiştir ve devam et'}
              </Button>
            </form>
          </section>

          <p className="mt-6 text-center text-[11px] leading-5 text-ink-400">
            Şifreniz KVKK uyumlu şekilde saklanır. Bu adım atlanamaz.
          </p>
        </motion.div>
      </main>
    </div>
  )
}
