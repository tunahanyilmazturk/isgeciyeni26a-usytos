import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  CircleHelp,
  HardHat,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
  Wand2,
} from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button, Checkbox, Input } from '@/components/ui'
import { useAuth, type AuthUser } from '../AuthContext'

const DEMO_USER: AuthUser = {
  name: 'Savaş Akay',
  email: 'demo@hantech.com',
  role: 'Yönetici',
  company: 'Çetka OSGB',
  initials: 'SA',
}

const loginSchema = z.object({
  login: z
    .string()
    .min(1, 'E-posta veya TC Kimlik No gerekli.')
    .refine((value) => {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      const isTc = /^\d{11}$/.test(value)
      return isEmail || isTc
    }, 'Geçerli bir e-posta veya 11 haneli TC girin.'),
  password: z
    .string()
    .min(6, 'Şifre en az 6 karakter olmalı.')
    .max(64, 'Şifre çok uzun.'),
  remember: z.boolean(),
})

type LoginForm = z.infer<typeof loginSchema>

export function LoginPage() {
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { login: '', password: '', remember: false },
  })

  function fillDemo() {
    setValue('login', 'demo@hantech.com', { shouldValidate: true })
    setValue('password', 'demo1234', { shouldValidate: true })
    setValue('remember', true)
    toast.info('Demo hesap bilgileri dolduruldu', {
      description: 'Giriş yap butonuna basabilirsiniz.',
    })
  }

  function onSubmit(_data: LoginForm) {
    setSubmitting(true)
    // TODO: backend bağlanınca API çağrısı buraya
    setTimeout(() => {
      login(DEMO_USER)
      setSubmitting(false)
      toast.success('Giriş başarılı', {
        description: 'Yönetim paneline yönlendiriliyorsunuz…',
      })
      navigate('/dashboard')
    }, 1400)
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-ink-900">
      {/* Üst navigasyon */}
      <header className="border-b border-ink-200/70 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-10">
          <a href="#" className="flex items-center gap-3" aria-label="HanTech ana sayfa">
            <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-brand-600 text-white shadow-sm shadow-brand-600/20">
              <HardHat className="h-[18px] w-[18px]" strokeWidth={1.8} />
            </span>
            <span className="leading-none">
              <span className="block text-[13px] font-bold uppercase tracking-[0.18em] text-ink-900">
                HanTech
              </span>
              <span className="mt-1 block text-[10px] font-medium tracking-wide text-ink-400">
                İSG Yönetim Sistemi
              </span>
            </span>
          </a>

          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 transition-colors hover:text-ink-800"
          >
            <CircleHelp className="h-4 w-4" strokeWidth={1.8} />
            <span className="hidden sm:inline">Yardıma mı ihtiyacınız var?</span>
            <span className="sm:hidden">Yardım</span>
          </a>
        </div>
      </header>

      {/* Giriş alanı */}
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-8 sm:min-h-[calc(100vh-72px)] sm:px-8 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="w-full max-w-[440px]"
        >
          {/* Form kartı */}
          <section className="rounded-2xl border border-ink-200/90 bg-white p-5 shadow-[0_12px_40px_-24px_rgba(17,24,39,0.28)] sm:p-9">
            <div className="mb-8">
              <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                Güvenli çalışma alanı
              </div>
              <h1 className="text-[29px] font-bold tracking-[-0.04em] text-ink-900">
                Hoş geldiniz
              </h1>
              <p className="mt-2 text-sm leading-6 text-ink-500">
                İSG süreçlerinizi yönetmek için hesabınıza giriş yapın.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <Input
                label="E-posta veya TC Kimlik No"
                placeholder="ornek@hantech.com"
                autoComplete="username"
                icon={<Mail className="h-[18px] w-[18px]" strokeWidth={1.8} />}
                error={errors.login?.message}
                {...register('login')}
              />

              <Input
                label="Şifre"
                type="password"
                placeholder="Şifrenizi girin"
                autoComplete="current-password"
                icon={<LockKeyhole className="h-[18px] w-[18px]" strokeWidth={1.8} />}
                error={errors.password?.message}
                {...register('password')}
              />

              <div className="flex items-center justify-between gap-4 pt-0.5">
                <Checkbox label="Beni hatırla" {...register('remember')} />
                <a
                  href="#"
                  className="shrink-0 text-sm font-medium text-ink-500 transition-colors hover:text-brand-600"
                >
                  Şifremi unuttum
                </a>
              </div>

              <Button
                type="submit"
                size="lg"
                loading={submitting}
                rightIcon={!submitting ? <ArrowRight className="h-4 w-4" /> : undefined}
                className="mt-1 w-full"
              >
                {submitting ? 'Giriş yapılıyor…' : 'Giriş yap'}
              </Button>
            </form>

            {/* Demo erişimi — yalnızca geliştirme ortamında */}
            {import.meta.env.DEV && (
            <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-dashed border-ink-300 bg-ink-50/70 px-4 py-3.5">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-brand-600 ring-1 ring-ink-200">
                  <Wand2 className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-ink-700">Demo hesabı</p>
                  <p className="mt-0.5 truncate text-[11px] text-ink-400">Formu örnek bilgilerle doldur</p>
                </div>
              </div>
              <button
                type="button"
                onClick={fillDemo}
                className="shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-brand-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
              >
                Doldur
              </button>
            </div>
            )}
          </section>

          {/* Kayıt ve güvenlik */}
          <p className="mt-6 text-center text-sm text-ink-500">
            Hesabınız yok mu?{' '}
            <a href="#" className="font-semibold text-brand-600 hover:text-brand-700">
              Kayıt talebi oluşturun
            </a>
          </p>

          {/* Katılımcı girişi */}
          <div className="mt-5 flex items-center gap-3 rounded-xl border border-ink-200 bg-ink-50/50 px-4 py-3.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-brand-600 ring-1 ring-ink-200">
              <UserRound className="h-4 w-4" strokeWidth={1.8} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-ink-700">Katılımcı girişi</p>
              <p className="mt-0.5 truncate text-[11px] text-ink-400">İSG eğitim portalına giriş için</p>
            </div>
            <Link
              to="/katilimci/giris"
              className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold text-brand-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
            >
              Giriş yap →
            </Link>
          </div>

          <div className="mt-9 flex items-center justify-center gap-5 text-[11px] text-ink-400">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-ink-400" strokeWidth={1.8} />
              Güvenli bağlantı
            </span>
            <span className="h-3 w-px bg-ink-300" />
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-ink-400" strokeWidth={2} />
              KVKK uyumlu
            </span>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
