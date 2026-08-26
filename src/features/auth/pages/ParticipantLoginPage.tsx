import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  CircleHelp,
  HardHat,
  LockKeyhole,
  ShieldCheck,
  UserRound,
  Wand2,
} from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button, Input } from '@/components/ui'
import { readParticipants } from '@/features/participants/data/participants'
import { useParticipantAuth, type ParticipantUser } from '../ParticipantAuthContext'

const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'Kullanıcı adı gerekli.'),
  password: z
    .string()
    .min(6, 'Şifre en az 6 karakter olmalı.')
    .max(64, 'Şifre çok uzun.'),
})

type ParticipantLoginForm = z.infer<typeof loginSchema>

export function ParticipantLoginPage() {
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const { login } = useParticipantAuth()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ParticipantLoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  })

  function fillDemo() {
    const participants = readParticipants()
    if (participants.length === 0) {
      toast.error('Demo katılımcı bulunamadı', {
        description: 'Önce yönetim panelinden bir katılımcı oluşturun.',
      })
      return
    }
    const first = participants.find((p) => p.status === 'active') ?? participants[0]
    setValue('username', first.username, { shouldValidate: true })
    setValue('password', first.password ?? 'demo1234', { shouldValidate: true })
    toast.info('Demo katılımcı bilgileri dolduruldu', {
      description: `${first.name} (${first.company})`,
    })
  }

  function onSubmit(data: ParticipantLoginForm) {
    setSubmitting(true)
    setTimeout(() => {
      const participants = readParticipants()
      const found = participants.find((p) => p.username === data.username)
      if (!found) {
        setSubmitting(false)
        toast.error('Giriş başarısız', {
          description: 'Kullanıcı adı bulunamadı.',
        })
        return
      }
      if (found.status !== 'active') {
        setSubmitting(false)
        toast.error('Hesap pasif', {
          description: 'Hesabınız pasif durumda. Yöneticinizle iletişime geçin.',
        })
        return
      }
      // Şifre kontrolü — şifre kaydedilmişse kontrol et, yoksa geçici şifre kabul et
      if (found.password && found.password !== data.password) {
        setSubmitting(false)
        toast.error('Giriş başarısız', {
          description: 'Şifre hatalı.',
        })
        return
      }
      const participantUser: ParticipantUser = {
        id: found.id,
        name: found.name,
        username: found.username,
        email: found.email,
        company: found.company,
        department: found.department,
        riskLevel: found.riskLevel,
        trainingStatus: found.trainingStatus,
        progress: found.progress,
        trainingMinutes: found.trainingMinutes,
        lastCompletion: found.lastCompletion,
        nextTraining: found.nextTraining,
        lastLogin: new Date().toLocaleDateString('tr-TR') + ', ' + new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      }
      login(participantUser)
      setSubmitting(false)
      toast.success('Giriş başarılı', {
        description: 'Eğitim panelinize yönlendiriliyorsunuz…',
      })
      navigate('/katilimci')
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-ink-900">
      <header className="border-b border-ink-200/70 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-10">
          <Link to="/" className="flex items-center gap-3" aria-label="HanTech ana sayfa">
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
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 transition-colors hover:text-ink-800"
          >
            <CircleHelp className="h-4 w-4" strokeWidth={1.8} />
            <span className="hidden sm:inline">Yönetici girişi</span>
            <span className="sm:hidden">Yönetici</span>
          </Link>
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-8 sm:min-h-[calc(100vh-72px)] sm:px-8 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="w-full max-w-[440px]"
        >
          <section className="rounded-2xl border border-ink-200/90 bg-white p-5 shadow-[0_12px_40px_-24px_rgba(17,24,39,0.28)] sm:p-9">
            <div className="mb-8">
              <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                Katılımcı girişi
              </div>
              <h1 className="text-[29px] font-bold tracking-[-0.04em] text-ink-900">
                Eğitim portalına giriş
              </h1>
              <p className="mt-2 text-sm leading-6 text-ink-500">
                İSG eğitimlerinizi görüntülemek ve tamamlamak için hesabınıza giriş yapın.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <Input
                label="Kullanıcı adı"
                placeholder="kullanici.adi"
                autoComplete="username"
                icon={<UserRound className="h-[18px] w-[18px]" strokeWidth={1.8} />}
                error={errors.username?.message}
                {...register('username')}
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

            {import.meta.env.DEV && (
              <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-dashed border-ink-300 bg-ink-50/70 px-4 py-3.5">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-brand-600 ring-1 ring-ink-200">
                    <Wand2 className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-ink-700">Demo katılımcı</p>
                    <p className="mt-0.5 truncate text-[11px] text-ink-400">İlk katılımcı ile doldur</p>
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
