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
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button, Checkbox, Input } from '@/components/ui'
import { readParticipants } from '@/features/participants/data/participants'
import { useAuth } from '../AuthContext'
import { useParticipantAuth, type ParticipantUser } from '../ParticipantAuthContext'

const loginSchema = z.object({
  login: z
    .string()
    .min(1, 'E-posta, TC Kimlik No veya kullanıcı adı gerekli.')
    .refine((value) => {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      const isTc = /^\d{11}$/.test(value)
      // Kullanıcı adları ASCII-only olduğu için Türkçe karakter içeren
      // girişleri de kabul et (normalizasyon karşılaştırma sırasında yapılır)
      const isUsername = /^[a-zA-Z0-9._ğıüşöçİĞÜŞÖÇ-]{3,}$/.test(value)
      return isEmail || isTc || isUsername
    }, 'Geçerli bir e-posta, 11 haneli TC veya kullanıcı adı girin.'),
  password: z
    .string()
    .min(1, 'Şifre gerekli.')
    .max(64, 'Şifre çok uzun.'),
  remember: z.boolean(),
})

/** Türkçe karakterleri ASCII karşılıklarına çevirir.
 *  Kullanıcı adları generateUsername ile ASCII-only oluşturulur,
 *  ama kullanıcı giriş yaparken Türkçe karakter kullanabilir
 *  (örn: "ahmet.yılmaz" ı ile). Bu normalizasyon ile eşleşme sağlanır. */
const TR_TO_ASCII: Record<string, string> = {
  ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u',
  Ç: 'c', Ğ: 'g', İ: 'i', Ö: 'o', Ş: 's', Ü: 'u',
}
function normalizeForCompare(value: string): string {
  return value.replace(/[çğıöşüÇĞİÖŞÜ]/g, (ch) => TR_TO_ASCII[ch] ?? ch).toLocaleLowerCase('en-US')
}

type LoginForm = z.infer<typeof loginSchema>

export function LoginPage() {
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const { login: adminLogin } = useAuth()
  const { login: participantLogin } = useParticipantAuth()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { login: '', password: '', remember: false },
  })

  function fillDemoAdmin() {
    setValue('login', 'demo@hantech.com', { shouldValidate: true })
    setValue('password', 'demo1234', { shouldValidate: true })
    setValue('remember', true)
    toast.info('Demo yönetici bilgileri dolduruldu', {
      description: 'Giriş yap butonuna basabilirsiniz.',
    })
  }

  function fillDemoParticipant() {
    const participants = readParticipants()
    if (participants.length === 0) {
      toast.error('Demo katılımcı bulunamadı', {
        description: 'Önce yönetim panelinden bir katılımcı oluşturun.',
      })
      return
    }
    const first = participants.find((p) => p.status === 'active') ?? participants[0]
    setValue('login', first.username, { shouldValidate: true })
    setValue('password', first.password ?? '123456', { shouldValidate: true })
    toast.info('Demo katılımcı bilgileri dolduruldu', {
      description: `${first.name} (${first.company})`,
    })
  }

  function onSubmit(data: LoginForm) {
    setSubmitting(true)

    const loginValue = data.login.trim()

      // 1) Önce katılımcı olarak giriş yapmayı dene (kullanıcı adı/e-posta/TC eşleşmesi)
      const participants = readParticipants()
      // Kullanıcı adları ASCII-only generateUsername ile oluşturulur.
      // Kullanıcı Türkçe karakterlerle yazsa bile eşleşmesi için
      // her iki tarafı da normalizeForCompare ile ASCII'ye çeviriyoruz.
      const normalizedLogin = normalizeForCompare(loginValue)
      const foundParticipant = participants.find((p) =>
        normalizeForCompare(p.username) === normalizedLogin
        || (p.email !== '—' && normalizeForCompare(p.email) === normalizedLogin)
        || (p.tcNumber !== '—' && p.tcNumber === loginValue),
      )

      if (foundParticipant) {
        // Katılımcı bulundu — katılımcı girişi
        if (foundParticipant.status !== 'active') {
          setSubmitting(false)
          toast.error('Hesap pasif', {
            description: 'Hesabınız pasif durumda. Yöneticinizle iletişime geçin.',
          })
          return
        }
        if (foundParticipant.password && foundParticipant.password !== data.password) {
          setSubmitting(false)
          toast.error('Giriş başarısız', {
            description: 'Şifre hatalı.',
          })
          return
        }

        const participantUser: ParticipantUser = {
          id: foundParticipant.id,
          name: foundParticipant.name,
          username: foundParticipant.username,
          email: foundParticipant.email,
          phone: foundParticipant.phone,
          company: foundParticipant.company,
          department: foundParticipant.department,
          riskLevel: foundParticipant.riskLevel,
          trainingStatus: foundParticipant.trainingStatus,
          progress: foundParticipant.progress,
          trainingMinutes: foundParticipant.trainingMinutes,
          lastCompletion: foundParticipant.lastCompletion,
          nextTraining: foundParticipant.nextTraining,
          lastLogin: new Date().toLocaleDateString('tr-TR') + ', ' + new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        }
        participantLogin(participantUser)
        setSubmitting(false)
        toast.success('Giriş başarılı', {
          description: 'Eğitim panelinize yönlendiriliyorsunuz…',
        })
        navigate('/katilimci')
        return
      }

      // 2) Demo yönetici hesabı.
      if (loginValue === 'demo@hantech.com') {
        if (data.password !== 'demo1234') {
          setSubmitting(false)
          toast.error('Giriş başarısız', {
            description: 'Şifre hatalı.',
          })
          return
        }
        adminLogin({
          name: 'Demo Yönetici',
          email: loginValue,
          role: 'Yönetici',
          company: 'Demo OSGB',
          initials: 'DY',
        })
        setSubmitting(false)
        toast.success('Giriş başarılı', {
          description: 'Yönetim paneline yönlendiriliyorsunuz…',
        })
        navigate('/dashboard')
        return
      }

      // 3) Eşleşme yok
      setSubmitting(false)
      toast.error('Giriş başarısız', {
        description: 'Kullanıcı adı, e-posta veya TC bulunamadı.',
      })
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
                Yönetici veya katılımcı hesabınızla giriş yapın. Sistem, hesap türünüzü otomatik tanır.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <Input
                label="E-posta, TC Kimlik No veya kullanıcı adı"
                placeholder="ornek@hantech.com veya kullanici.adi"
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

            {/* Demo erişimi */}
            <div className="mt-6 space-y-2.5">
              <div className="flex items-center justify-between gap-4 rounded-xl border border-dashed border-ink-300 bg-ink-50/70 px-4 py-3.5">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-brand-600 ring-1 ring-ink-200">
                    <Wand2 className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-ink-700">Demo yönetici</p>
                    <p className="mt-0.5 truncate text-[11px] text-ink-400">demo@hantech.com / demo1234</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={fillDemoAdmin}
                  className="shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-brand-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
                >
                  Doldur
                </button>
              </div>

              <div className="flex items-center justify-between gap-4 rounded-xl border border-dashed border-ink-300 bg-ink-50/70 px-4 py-3.5">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-brand-600 ring-1 ring-ink-200">
                    <UserRound className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-ink-700">Demo katılımcı</p>
                    <p className="mt-0.5 truncate text-[11px] text-ink-400">İlk aktif katılımcı ile doldur</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={fillDemoParticipant}
                  className="shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-brand-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
                >
                  Doldur
                </button>
              </div>
            </div>
          </section>

          {/* Kayıt ve güvenlik */}
          <p className="mt-6 text-center text-sm text-ink-500">
            Hesabınız yok mu?{' '}
            <a href="#" className="font-semibold text-brand-600 hover:text-brand-700">
              Kayıt talebi oluşturun
            </a>
          </p>

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
