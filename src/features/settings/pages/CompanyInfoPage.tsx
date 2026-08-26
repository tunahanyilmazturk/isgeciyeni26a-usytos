import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import {
  BellRing,
  Building2,
  Check,
  ChevronDown,
  FileBadge2,
  Info,
  LockKeyhole,
  Mail,
  MessageSquareText,
  Phone,
  Save,
  ShieldCheck,
  Upload,
  Users,
} from 'lucide-react'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button, Checkbox, Input } from '@/components/ui'
import { readStorage, writeStorage } from '@/lib/storage'
import { cn } from '@/lib/utils'

const companySchema = z.object({
  name: z.string().trim().min(2, 'Firma unvanı gerekli.'),
  phone: z.string().trim(),
  taxOffice: z.string().trim(),
  taxNumber: z.string().trim(),
  registryNumber: z.string().trim(),
  authorizationCertificate: z.string().trim(),
  address: z.string().trim().min(5, 'Adres bilgisi gerekli.'),
  participantOtpEnabled: z.boolean(),
  participantOtpChannel: z.string(),
  staffOtpEnabled: z.boolean(),
  staffOtpChannel: z.string(),
  notifyEmail: z.boolean(),
  notifySms: z.boolean(),
})

type CompanyForm = z.infer<typeof companySchema>

const defaultValues: CompanyForm = {
  name: 'Demo OSGB',
  phone: '000 000 00 00',
  taxOffice: 'Demo Vergi Dairesi',
  taxNumber: 'DEMO-VKN-OSGB',
  registryNumber: 'DEMO-OSGB-0001',
  authorizationCertificate: 'DEMO-YETKI-0001',
  address: 'Demo OSGB adresi',
  participantOtpEnabled: false,
  participantOtpChannel: 'email',
  staffOtpEnabled: false,
  staffOtpChannel: 'email',
  notifyEmail: true,
  notifySms: false,
}

const COMPANY_INFO_STORAGE_KEY = 'hantech-company-info'

function SelectField({
  id,
  label,
  error,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          className={cn(
            'h-12 w-full appearance-none rounded-xl border bg-white px-3.5 pr-10 text-sm text-ink-900 outline-none transition-all',
            'focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10',
            error ? 'border-red-400' : 'border-ink-200 hover:border-ink-300',
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  )
}

interface SettingCardProps {
  icon: React.ReactNode
  eyebrow: string
  title: string
  description: string
  children: React.ReactNode
}

function SettingCard({ icon, eyebrow, title, description, children }: SettingCardProps) {
  return (
    <section className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] sm:p-6">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">{icon}</span>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-600">{eyebrow}</p>
          <h2 className="mt-1 text-sm font-semibold text-ink-900">{title}</h2>
          <p className="mt-1.5 max-w-2xl text-xs leading-5 text-ink-500">{description}</p>
        </div>
      </div>
      <div className="mt-5 border-t border-ink-100 pt-5">{children}</div>
    </section>
  )
}

export function CompanyInfoPage() {
  const [logoName, setLogoName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CompanyForm>({
    resolver: zodResolver(companySchema),
    defaultValues: readStorage(COMPANY_INFO_STORAGE_KEY, defaultValues, companySchema),
  })

  function onSubmit(data: CompanyForm) {
    const saved = writeStorage(COMPANY_INFO_STORAGE_KEY, data)
    if (!saved) {
      toast.error('Kurum bilgileri kaydedilemedi', { description: 'Tarayıcı depolama alanına erişilemedi.' })
      return
    }
    toast.success('Kurum bilgileri kaydedildi', {
      description: 'Bilgiler bu tarayıcıda saklandı. Merkezi paylaşım için backend gereklidir.',
    })
  }

  function handleLogoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Logo dosyası 2 MB sınırını aşamaz.')
      event.target.value = ''
      return
    }
    setLogoName(file.name)
    toast.info('Logo seçildi', { description: 'Değişikliği kaydetmek için Kaydet butonuna basın.' })
  }

  return (
    <div className="space-y-7">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
      >
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-ink-400">
            <span>OSGB Bilgileri</span>
            <span>/</span>
            <span className="text-ink-600">Firma Bilgileri</span>
          </div>
          <h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[30px]">Kurum bilgileri</h1>
          <p className="mt-1.5 text-sm text-ink-500">OSGB profilinizi, güvenlik tercihlerinizi ve bildirim ayarlarınızı yönetin.</p>
        </div>
        <Button type="button" leftIcon={<Save className="h-4 w-4" />} onClick={() => void handleSubmit(onSubmit)()} loading={isSubmitting}>
          Değişiklikleri kaydet
        </Button>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="rounded-2xl border border-ink-200/80 bg-white shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]"
        >
          <div className="border-b border-ink-100 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700"><Building2 className="h-5 w-5" strokeWidth={1.7} /></span>
              <div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-600">Kurum profili</p><h2 className="mt-1 text-sm font-semibold text-ink-900">Firma bilgileri</h2><p className="mt-1.5 text-xs leading-5 text-ink-500">Kurumunuzun temel bilgileri ve resmi kayıt numaraları.</p></div>
            </div>
          </div>
          <div className="p-5 sm:p-6">
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-800">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" strokeWidth={1.8} />
              <p><span className="font-semibold">Firma kimlik bilgileri sistem tarafından korunur.</span> Değişiklik gereken durumlarda sistem yöneticinizle iletişime geçin. Logo ve güvenlik tercihlerinizi bu sayfadan güncelleyebilirsiniz.</p>
            </div>
            <fieldset disabled className="grid gap-4 opacity-80 md:grid-cols-2">
              <Input label="Firma unvanı" icon={<Building2 className="h-[18px] w-[18px]" />} error={errors.name?.message} {...register('name')} />
              <Input label="Telefon" icon={<Phone className="h-[18px] w-[18px]" />} {...register('phone')} />
              <Input label="Vergi dairesi" {...register('taxOffice')} />
              <Input label="Vergi numarası" {...register('taxNumber')} />
              <Input label="İşyeri SGK no" icon={<FileBadge2 className="h-[18px] w-[18px]" />} {...register('registryNumber')} />
              <Input label="İşyeri yetki belgesi no" icon={<ShieldCheck className="h-[18px] w-[18px]" />} {...register('authorizationCertificate')} />
              <div className="md:col-span-2"><label htmlFor="company-address" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">Adres</label><textarea id="company-address" rows={3} className="w-full resize-none rounded-xl border border-ink-200 bg-white px-3.5 py-3 text-sm text-ink-900 outline-none transition-all placeholder:text-ink-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10" {...register('address')} />{errors.address && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.address.message}</p>}</div>
            </fieldset>

            <div className="mt-6 border-t border-ink-100 pt-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl border border-dashed border-ink-300 bg-ink-50 text-ink-400"><Upload className="h-4 w-4" /></span><div><p className="text-sm font-semibold text-ink-800">Firma logosu</p><p className="mt-1 text-xs text-ink-400">JPG, PNG veya WEBP · Maksimum 2 MB</p></div></div>
                <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" onChange={handleLogoChange} className="hidden" />
                <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} leftIcon={<Upload className="h-4 w-4" />}>{logoName ? 'Logoyu değiştir' : 'Logo seç'}</Button>
              </div>
              {logoName && <p className="mt-3 rounded-lg bg-brand-50 px-3 py-2 text-xs font-medium text-brand-700"><Check className="mr-1 inline h-3.5 w-3.5" />{logoName}</p>}
            </div>
          </div>
        </motion.section>

        <div className="grid gap-5 xl:grid-cols-2">
          <SettingCard icon={<UsersIcon />} eyebrow="Katılımcı güvenliği" title="Katılımcı girişi (OTP)" description="Katılımcıların şifre sonrası tek kullanımlık kod ile giriş yapmasını zorunlu tutun. SMS için hesabınızda SMS özelliği açık olmalıdır.">
            <div className="space-y-4">
              <Checkbox label="Katılımcılar için OTP zorunlu olsun" {...register('participantOtpEnabled')} />
              <SelectField label="OTP kanalı" id="participant-channel" {...register('participantOtpChannel')}><option value="email">E-posta</option><option value="sms">SMS</option></SelectField>
              <p className="flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2.5 text-[11px] leading-5 text-amber-700"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />SMS özelliği kapalıysa yalnızca e-posta kanalı kullanılabilir.</p>
            </div>
          </SettingCard>

          <SettingCard icon={<LockKeyhole className="h-5 w-5" strokeWidth={1.7} />} eyebrow="Personel güvenliği" title="Uzman, doktor ve personel girişi" description="Uzman, işyeri hekimi ve personel kullanıcılarının girişlerinde tek kullanımlık kod isteyerek hesap güvenliğini artırın.">
            <div className="space-y-4">
              <Checkbox label="Personel için OTP zorunlu olsun" {...register('staffOtpEnabled')} />
              <SelectField label="OTP kanalı" id="staff-channel" {...register('staffOtpChannel')}><option value="email">E-posta</option><option value="sms">SMS</option></SelectField>
              <p className="flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2.5 text-[11px] leading-5 text-amber-700"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />SMS özelliği kapalıysa yalnızca e-posta kanalı kullanılabilir.</p>
            </div>
          </SettingCard>
        </div>

        <SettingCard icon={<BellRing className="h-5 w-5" strokeWidth={1.7} />} eyebrow="Otomatik bildirimler" title="Uzman / doktor / personel hesap bildirimleri" description="Yeni kullanıcı oluşturulduğunda giriş bağlantısı ve geçici şifreyi hangi kanallarla göndereceğinizi seçin.">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-xl border border-ink-200 p-4 transition-colors hover:border-brand-200 hover:bg-brand-50/40"><Checkbox label="" {...register('notifyEmail')} /><span className="-ml-1"><span className="flex items-center gap-2 text-sm font-semibold text-ink-700"><Mail className="h-4 w-4 text-brand-600" />E-posta ile gönder</span><span className="mt-1 block text-xs leading-5 text-ink-400">Giriş bilgilerini kullanıcının e-posta adresine gönder.</span></span></div>
            <div className="flex items-start gap-3 rounded-xl border border-ink-200 p-4 transition-colors hover:border-brand-200 hover:bg-brand-50/40"><Checkbox label="" {...register('notifySms')} /><span className="-ml-1"><span className="flex items-center gap-2 text-sm font-semibold text-ink-700"><MessageSquareText className="h-4 w-4 text-brand-600" />SMS ile gönder</span><span className="mt-1 block text-xs leading-5 text-ink-400">SMS özelliği ve yeterli kontör gerektirir.</span></span></div>
          </div>
          <p className="mt-4 flex items-start gap-2 rounded-lg bg-ink-50 px-3 py-2.5 text-[11px] leading-5 text-ink-500"><ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" />Kullanıcı şifreleri güvenli şekilde iletilir ve sistem üzerinde düz metin olarak saklanmaz.</p>
        </SettingCard>

        <div className="flex justify-end pt-1"><Button type="submit" loading={isSubmitting} leftIcon={!isSubmitting ? <Save className="h-4 w-4" /> : undefined}>Değişiklikleri kaydet</Button></div>
      </form>
    </div>
  )
}

function UsersIcon() {
  return <span className="text-brand-700"><Users className="h-5 w-5" strokeWidth={1.7} /></span>
}
