import { BadgeCheck, Mail, Save, ShieldCheck, Stamp, Trash2, Upload } from 'lucide-react'
import { useRef, useState, type ChangeEvent } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui'
import { useAuth } from '@/features/auth/AuthContext'
import { findUserByName, readUsers, saveUserStamp, saveUsers } from '../data/settings'

export function AdminProfilePage() {
  const { user } = useAuth()
  const existing = findUserByName(user?.name ?? '')
  const [stampDataUrl, setStampDataUrl] = useState(existing?.stampDataUrl ?? '')
  const [stampFileName, setStampFileName] = useState(existing?.stampFileName ?? '')
  const inputRef = useRef<HTMLInputElement>(null)

  function handleStampChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { toast.error('Yalnızca JPG, PNG veya WEBP görselleri kullanılabilir.'); event.target.value = ''; return }
    if (file.size > 1.5 * 1024 * 1024) { toast.error('Kaşe görseli 1,5 MB sınırını aşamaz.'); event.target.value = ''; return }
    const reader = new FileReader()
    reader.onload = () => { if (typeof reader.result !== 'string') return; setStampDataUrl(reader.result); setStampFileName(file.name) }
    reader.readAsDataURL(file)
  }

  function saveStamp() {
    const name = user?.name ?? ''
    let saved = saveUserStamp(name, stampDataUrl, stampFileName)
    if (!saved && user) {
      const names = user.name.trim().split(/\s+/)
      const fallbackUser = { id: Date.now(), firstName: names[0] ?? user.name, lastName: names.slice(1).join(' ') || 'Kullanıcı', username: user.email.split('@')[0], email: user.email, role: user.role, company: user.company, lastLogin: 'Şimdi', status: 'active' as const, stampDataUrl: stampDataUrl || undefined, stampFileName: stampFileName || undefined }
      const users = readUsers()
      if (saveUsers([fallbackUser, ...users])) saved = fallbackUser
    }
    if (!saved) { toast.error('Profil kaşesi kaydedilemedi.'); return }
    toast.success(stampDataUrl ? 'Profil kaşesi kaydedildi' : 'Profil kaşesi kaldırıldı', { description: 'Sonraki sertifika onaylarında güncel hesap kaşesi kullanılacak.' })
  }

  return <div className="space-y-6">
    <header><div className="mb-2 text-xs font-medium text-ink-400">Hesabım / <span className="text-ink-600">Profil</span></div><h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[30px]">Profilim</h1><p className="mt-1.5 text-sm text-ink-500">Hesap kimliğinizi ve eğitim onaylarında kullanılacak kişisel kaşenizi yönetin.</p></header>
    <div className="grid gap-5 xl:grid-cols-[360px_minmax(0,1fr)]">
      <section className="rounded-2xl border border-ink-200 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,.22)]"><div className="flex items-center gap-3"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-lg font-black text-brand-700">{user?.initials ?? 'K'}</span><div><h2 className="text-base font-bold text-ink-900">{user?.name ?? 'Kullanıcı'}</h2><p className="mt-1 text-xs font-semibold text-brand-700">{user?.role ?? 'Kullanıcı'}</p></div></div><div className="mt-5 space-y-3 border-t border-ink-100 pt-5"><ProfileRow icon={<Mail />} label="E-posta" value={user?.email ?? '—'} /><ProfileRow icon={<ShieldCheck />} label="Kurum" value={user?.company ?? '—'} /><ProfileRow icon={<BadgeCheck />} label="Hesap durumu" value="Aktif" /></div></section>
      <section className="rounded-2xl border border-ink-200 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,.22)] sm:p-6"><div className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700"><Stamp className="h-5 w-5" /></span><div><h2 className="text-sm font-bold text-ink-900">Onay kaşem</h2><p className="mt-1 text-xs leading-5 text-ink-500">Eğitim sonucunu onayladığınızda sertifikadaki “Eğitimi onaylayan” alanında bu görsel kullanılır.</p></div></div><div className="mt-5 grid gap-5 border-t border-ink-100 pt-5 md:grid-cols-[minmax(0,1fr)_240px]"><div className="grid min-h-56 place-items-center overflow-hidden rounded-2xl border border-dashed border-ink-300 bg-ink-50/60 p-5">{stampDataUrl ? <img src={stampDataUrl} alt="Profil kaşesi önizlemesi" className="max-h-48 max-w-full object-contain" /> : <div className="text-center"><span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-white text-ink-300 ring-1 ring-ink-200"><Stamp className="h-6 w-6" /></span><p className="mt-3 text-sm font-semibold text-ink-500">Henüz kaşe yüklenmedi</p><p className="mt-1 text-xs text-ink-400">Şeffaf arka planlı PNG önerilir.</p></div>}</div><div className="flex flex-col justify-between gap-4"><div className="rounded-xl bg-amber-50 p-3 text-[11px] leading-5 text-amber-800">Kaşe görseli, güvenli elektronik imza veya ıslak imza yerine geçmez. Belge üzerindeki görsel tanımlama alanıdır.</div><div><input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleStampChange} className="hidden" /><Button type="button" variant="outline" className="w-full" onClick={() => inputRef.current?.click()} leftIcon={<Upload className="h-4 w-4" />}>{stampDataUrl ? 'Kaşeyi değiştir' : 'Kaşe yükle'}</Button>{stampDataUrl && <Button type="button" variant="ghost" className="mt-2 w-full text-rose-600" onClick={() => { setStampDataUrl(''); setStampFileName('') }} leftIcon={<Trash2 className="h-4 w-4" />}>Kaşeyi kaldır</Button>}{stampFileName && <p className="mt-2 truncate text-center text-[10px] font-semibold text-brand-700">{stampFileName}</p>}<Button type="button" className="mt-4 w-full" onClick={saveStamp} leftIcon={<Save className="h-4 w-4" />}>Profili kaydet</Button></div></div></div></section>
    </div>
  </div>
}

function ProfileRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) { return <div className="flex items-center gap-3"><span className="text-ink-400 [&>svg]:h-4 [&>svg]:w-4">{icon}</span><div><p className="text-[10px] font-bold uppercase tracking-wide text-ink-400">{label}</p><p className="mt-0.5 text-xs font-semibold text-ink-700">{value}</p></div></div> }
