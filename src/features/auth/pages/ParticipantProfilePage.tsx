import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import {
  Building2,
  CalendarDays,
  HardHat,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button, Input } from '@/components/ui'
import { useParticipantAuth } from '../ParticipantAuthContext'

const contactSchema = z.object({
  email: z.string().min(1, 'E-posta gerekli.').email('Geçerli bir e-posta girin.'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası girin.'),
})

type ContactForm = z.infer<typeof contactSchema>

const passwordSchema = z.object({
  newPassword: z.string().min(8, 'Şifre en az 8 karakter olmalı.').max(64, 'Şifre çok uzun.'),
})

type PasswordForm = z.infer<typeof passwordSchema>

export function ParticipantProfilePage() {
  const { user, updateContact, changePassword } = useParticipantAuth()
  const [submittingContact, setSubmittingContact] = useState(false)
  const [submittingPassword, setSubmittingPassword] = useState(false)

  const contactForm = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { email: user?.email ?? '', phone: user?.phone ?? '' },
  })

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { newPassword: '' },
  })

  if (!user) return null

  function onContactSubmit(data: ContactForm) {
    setSubmittingContact(true)
    updateContact(data.email, data.phone)
    setSubmittingContact(false)
    toast.success('İletişim bilgileri güncellendi')
  }

  function onPasswordSubmit(data: PasswordForm) {
    setSubmittingPassword(true)
    changePassword(data.newPassword)
    setSubmittingPassword(false)
    passwordForm.reset({ newPassword: '' })
    toast.success('Şifre güncellendi')
  }

  const infoItems = [
    { icon: UserRound, label: 'Ad Soyad', value: user.name },
    { icon: HardHat, label: 'Kullanıcı adı', value: user.username },
    { icon: Building2, label: 'Firma', value: user.company },
    { icon: ShieldCheck, label: 'Departman', value: user.department },
    { icon: HardHat, label: 'Risk sınıfı', value: user.riskLevel },
    { icon: CalendarDays, label: 'Son giriş', value: user.lastLogin },
  ]

  return (
    <div className="space-y-7">
      {/* Başlık */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div className="mb-2 flex items-center gap-2 text-xs font-medium text-ink-400">
          <span>Panel</span>
          <span>/</span>
          <span className="text-ink-600">Profil</span>
        </div>
        <h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[30px]">
          Profilim
        </h1>
        <p className="mt-1.5 text-sm text-ink-500">
          Hesap bilgilerinizi görüntüleyin, iletişim bilgilerinizi ve şifrenizi güncelleyin.
        </p>
      </motion.div>

      {/* Hesap bilgileri */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6"
      >
        <div className="mb-5 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
            <UserRound className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-ink-900">Hesap bilgileri</h2>
            <p className="mt-0.5 text-xs text-ink-400">Sistem kayıt bilgileriniz</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {infoItems.map((item) => (
            <div key={item.label} className="rounded-xl border border-ink-100 bg-ink-50/40 p-4">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                <item.icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                {item.label}
              </div>
              <p className="mt-2 text-sm font-semibold text-ink-800">{item.value}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* İletişim bilgileri */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-violet-700">
              <Mail className="h-[18px] w-[18px]" strokeWidth={1.8} />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-ink-900">İletişim bilgileri</h2>
              <p className="mt-0.5 text-xs text-ink-400">E-posta ve telefon numaranız</p>
            </div>
          </div>
          <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-4" noValidate>
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
            <Button type="submit" size="md" loading={submittingContact} className="w-full">
              {submittingContact ? 'Kaydediliyor…' : 'İletişim bilgilerini güncelle'}
            </Button>
          </form>
        </motion.section>

        {/* Şifre değiştir */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-700">
              <LockKeyhole className="h-[18px] w-[18px]" strokeWidth={1.8} />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-ink-900">Şifre değiştir</h2>
              <p className="mt-0.5 text-xs text-ink-400">En az 8 karakterli yeni şifre</p>
            </div>
          </div>
          <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4" noValidate>
            <Input
              label="Yeni şifre"
              type="password"
              placeholder="En az 8 karakter"
              autoComplete="new-password"
              icon={<LockKeyhole className="h-[18px] w-[18px]" strokeWidth={1.8} />}
              error={passwordForm.formState.errors.newPassword?.message}
              {...passwordForm.register('newPassword')}
            />
            <Button type="submit" size="md" loading={submittingPassword} className="w-full">
              {submittingPassword ? 'Kaydediliyor…' : 'Şifreyi güncelle'}
            </Button>
          </form>
        </motion.section>
      </div>
    </div>
  )
}
