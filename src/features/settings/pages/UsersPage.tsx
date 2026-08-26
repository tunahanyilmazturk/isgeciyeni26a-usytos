import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Building2,
  Check,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  Edit3,
  FileCheck2,
  Gauge,
  KeyRound,
  LifeBuoy,
  Mail,
  MoreHorizontal,
  Phone,
  Search,
  ShieldCheck,
  Trash2,
  UserPlus,
  UserRound,
  Users,
  Video,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { ChangeEvent, ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button, Input, Pagination, paginate, getPaginationIndices, ViewToggle, type ViewMode, BulkActionBar } from '@/components/ui'
import { cn } from '@/lib/utils'
import { type User, type UserStatus, readUsers, saveUsers } from '../data/settings'

type ModuleId = 'dashboard' | 'companies' | 'participants' | 'assignments' | 'signatures' | 'liveTraining' | 'reports' | 'trainings' | 'companyInfo' | 'support'

const modules: { id: ModuleId; label: string; icon: ReactNode }[] = [
  { id: 'dashboard', label: 'Gösterge Paneli', icon: <Gauge /> },
  { id: 'companies', label: 'Firmalar', icon: <Building2 /> },
  { id: 'participants', label: 'Katılımcılar', icon: <Users /> },
  { id: 'assignments', label: 'Eğitim Atamaları', icon: <ClipboardCheck /> },
  { id: 'signatures', label: 'E-İmza Kuyruğu', icon: <KeyRound /> },
  { id: 'liveTraining', label: 'Canlı Eğitim', icon: <Video /> },
  { id: 'reports', label: 'Raporlar', icon: <Gauge /> },
  { id: 'trainings', label: 'Eğitimler', icon: <BookOpen /> },
  { id: 'companyInfo', label: 'OSGB Bilgileri', icon: <FileCheck2 /> },
  { id: 'support', label: 'Destek', icon: <LifeBuoy /> },
]

const roleStyles: Record<string, string> = {
  Yönetici: 'bg-violet-50 text-violet-700',
  'İSG Uzmanı': 'bg-brand-50 text-brand-700',
  'İşyeri Hekimi': 'bg-rose-50 text-rose-700',
  Personel: 'bg-ink-100 text-ink-600',
}

const statusStyles: Record<UserStatus, { label: string; className: string }> = {
  active: { label: 'Aktif', className: 'bg-emerald-50 text-emerald-700' },
  pending: { label: 'Davet bekliyor', className: 'bg-amber-50 text-amber-700' },
  inactive: { label: 'Pasif', className: 'bg-ink-100 text-ink-500' },
}

type RoleDefinition = { id: string; name: string; description: string; permissions: ModuleId[]; system: boolean }

const defaultRoleDefinitions: RoleDefinition[] = [
  { id: 'admin', name: 'Yönetici', description: 'Tüm modüllere ve kurum ayarlarına tam erişim.', permissions: modules.map((module) => module.id), system: true },
  { id: 'expert', name: 'İSG Uzmanı', description: 'Saha, eğitim ve raporlama süreçlerini yönetir.', permissions: ['dashboard', 'companies', 'participants', 'assignments', 'signatures', 'liveTraining', 'reports', 'trainings', 'support'], system: true },
  { id: 'doctor', name: 'İşyeri Hekimi', description: 'Katılımcı ve sağlık odaklı eğitim süreçlerine erişir.', permissions: ['dashboard', 'participants', 'assignments', 'signatures', 'trainings', 'support'], system: true },
  { id: 'staff', name: 'Personel', description: 'Kendisine atanan eğitimleri ve destek alanını görür.', permissions: ['dashboard', 'participants', 'trainings', 'support'], system: true },
]

const userSchema = z.object({
  firstName: z.string().trim().min(2, 'İsim en az 2 karakter olmalı.'),
  lastName: z.string().trim().min(2, 'Soyisim en az 2 karakter olmalı.'),
  username: z.string().trim().min(3, 'Kullanıcı adı en az 3 karakter olmalı.'),
  email: z.string().trim().email('Geçerli bir e-posta giriniz.'),
  phone: z.string().trim(),
  role: z.string().min(1, 'Rol seçiniz.'),
  company: z.string().trim().min(2, 'Firma seçiniz.'),
  permissions: z.array(z.string()).min(1, 'En az bir modül erişimi seçiniz.'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalı.'),
  passwordConfirmation: z.string(),
}).refine(({ password, passwordConfirmation }) => password === passwordConfirmation, { path: ['passwordConfirmation'], message: 'Şifreler eşleşmiyor.' })

type UserForm = z.infer<typeof userSchema>

const roleSchema = z.object({ name: z.string().trim().min(2, 'Rol adı en az 2 karakter olmalı.'), description: z.string().trim().min(8, 'Kısa bir açıklama giriniz.'), permissions: z.array(z.string()).min(1, 'En az bir modül seçiniz.') })
type RoleForm = z.infer<typeof roleSchema>

function initials(user: User) { return `${user.firstName[0]}${user.lastName[0]}`.toLocaleUpperCase('tr-TR') }
function getRolePermissions(role: string, definitions: RoleDefinition[]) { return definitions.find((item) => item.name === role)?.permissions ?? [] }

export function UsersPage() {
  const [users, setUsers] = useState(() => readUsers())
  const [roleDefinitions, setRoleDefinitions] = useState(defaultRoleDefinitions)
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users')
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false)
  const [selectedPermissions, setSelectedPermissions] = useState<ModuleId[]>([])
  const [selectedRolePermissions, setSelectedRolePermissions] = useState<ModuleId[]>([])
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [view, setView] = useState<ViewMode>('table')
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  useEffect(() => saveUsers(users), [users])

  const userForm = useForm<UserForm>({ resolver: zodResolver(userSchema), defaultValues: { firstName: '', lastName: '', username: '', email: '', phone: '', role: '', company: 'Çetka OSGB', permissions: [], password: '', passwordConfirmation: '' } })
  const roleForm = useForm<RoleForm>({ resolver: zodResolver(roleSchema), defaultValues: { name: '', description: '', permissions: [] } })
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = userForm
  const { register: registerRole, handleSubmit: handleRoleSubmit, reset: resetRole, setValue: setRoleValue, formState: { errors: roleErrors, isSubmitting: isRoleSubmitting } } = roleForm

  useEffect(() => {
    register('permissions')
    registerRole('permissions')
  }, [register, registerRole])

  const modalOpen = isUserModalOpen || isRoleModalOpen
  useEffect(() => {
    if (!modalOpen) return
    function onKeyDown(event: KeyboardEvent) { if (event.key === 'Escape') { setIsUserModalOpen(false); setIsRoleModalOpen(false) } }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = '' }
  }, [modalOpen])

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('tr-TR')
    return users.filter((user) => (!query || `${user.firstName} ${user.lastName} ${user.username} ${user.email}`.toLocaleLowerCase('tr-TR').includes(query)) && (roleFilter === 'all' || user.role === roleFilter) && (statusFilter === 'all' || user.status === statusFilter))
  }, [users, search, roleFilter, statusFilter])

  useEffect(() => { setCurrentPage(1) }, [users, search, roleFilter, statusFilter])

  const totalPages = Math.ceil(filteredUsers.length / pageSize) || 1
  const paginatedUsers = paginate(filteredUsers, currentPage, pageSize)
  const { startIndex, endIndex } = getPaginationIndices(currentPage, pageSize, filteredUsers.length)

  const toggleSelection = (id: number) => setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  const toggleAll = () => setSelectedIds((current) => current.length === paginatedUsers.length ? [] : paginatedUsers.map((item) => item.id))
  const handleBulkDelete = () => { setUsers((current) => current.filter((item) => !selectedIds.includes(item.id))); toast.success(`${selectedIds.length} kullanıcı silindi`); setSelectedIds([]) }

  function openUserModal() { reset(); setSelectedPermissions([]); setIsUserModalOpen(true) }
  function handleRoleChange(event: ChangeEvent<HTMLSelectElement>) { const role = event.target.value; const permissions = getRolePermissions(role, roleDefinitions); setValue('role', role, { shouldValidate: true }); setSelectedPermissions(permissions); setValue('permissions', permissions, { shouldValidate: true }) }
  function toggleUserPermission(permission: ModuleId) { setSelectedPermissions((current) => { const next = current.includes(permission) ? current.filter((item) => item !== permission) : [...current, permission]; setValue('permissions', next, { shouldValidate: true }); return next }) }
  function onSubmit(data: UserForm) { const user: User = { id: Date.now(), firstName: data.firstName, lastName: data.lastName, username: data.username, email: data.email, phone: data.phone || undefined, role: data.role, company: data.company, permissions: data.permissions as ModuleId[], lastLogin: 'Henüz giriş yapmadı', status: 'pending' }; setUsers((current) => [user, ...current]); reset(); setSelectedPermissions([]); setIsUserModalOpen(false); toast.success('Kullanıcı daveti oluşturuldu', { description: `${user.firstName} ${user.lastName} için davet hazırlandı.` }) }
  function handleDeleteUser(user: User) { if (!window.confirm(`${user.firstName} ${user.lastName} kullanıcısı silinsin mi?`)) return; setUsers((current) => current.filter((item) => item.id !== user.id)); toast.success('Kullanıcı silindi') }

  function openNewRoleModal() { setEditingRoleId(null); resetRole({ name: '', description: '', permissions: [] }); setSelectedRolePermissions([]); setIsRoleModalOpen(true) }
  function openEditRole(role: RoleDefinition) { setEditingRoleId(role.id); resetRole({ name: role.name, description: role.description, permissions: role.permissions }); setSelectedRolePermissions(role.permissions); setIsRoleModalOpen(true) }
  function toggleRolePermission(permission: ModuleId) { setSelectedRolePermissions((current) => { const next = current.includes(permission) ? current.filter((item) => item !== permission) : [...current, permission]; setRoleValue('permissions', next, { shouldValidate: true }); return next }) }
  function onRoleSubmit(data: RoleForm) {
    const oldRole = editingRoleId ? roleDefinitions.find((role) => role.id === editingRoleId) : undefined
    const nextRole: RoleDefinition = { id: editingRoleId ?? `custom-${Date.now()}`, name: oldRole?.system ? oldRole.name : data.name, description: data.description, permissions: data.permissions as ModuleId[], system: oldRole?.system ?? false }
    setRoleDefinitions((current) => editingRoleId ? current.map((role) => role.id === editingRoleId ? nextRole : role) : [...current, nextRole])
    if (oldRole) setUsers((current) => current.map((user) => user.role === oldRole.name ? { ...user, permissions: nextRole.permissions } : user))
    setIsRoleModalOpen(false); setSelectedRolePermissions([]); resetRole(); toast.success(editingRoleId ? 'Rol güncellendi' : 'Yeni rol oluşturuldu', { description: `${nextRole.name} rolünün modül erişimleri kaydedildi.` })
  }
  function handleDeleteRole(role: RoleDefinition) { if (role.system) { toast.error('Sistem rolleri silinemez'); return } if (users.some((user) => user.role === role.name)) { toast.error('Bu rol kullanıcılar tarafından kullanılıyor', { description: 'Önce kullanıcıların rolünü değiştirin.' }); return } if (!window.confirm(`${role.name} rolü silinsin mi?`)) return; setRoleDefinitions((current) => current.filter((item) => item.id !== role.id)); toast.success('Rol silindi') }

  return (
    <div className="space-y-7">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div><div className="mb-2 flex items-center gap-2 text-xs font-medium text-ink-400"><span>OSGB Bilgileri</span><span>/</span><span className="text-ink-600">Kullanıcılar</span></div><h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[30px]">Kullanıcı yönetimi</h1><p className="mt-1.5 text-sm text-ink-500">Ekip üyelerini, rollerini ve modül erişimlerini tek yerden yönetin.</p></div>
        {activeTab === 'users' ? <Button size="md" leftIcon={<UserPlus className="h-4 w-4" />} onClick={openUserModal}>Yeni kullanıcı ekle</Button> : <Button size="md" leftIcon={<PlusIcon />} onClick={openNewRoleModal}>Yeni rol oluştur</Button>}
      </motion.div>

      <div className="flex items-center gap-1 border-b border-ink-200"><button type="button" onClick={() => setActiveTab('users')} className={cn('relative px-4 pb-3 text-sm font-semibold transition-colors', activeTab === 'users' ? 'text-brand-700' : 'text-ink-400 hover:text-ink-700')}>Kullanıcılar <span className="ml-1.5 rounded-full bg-ink-100 px-2 py-0.5 text-[10px] text-ink-500">{users.length}</span>{activeTab === 'users' && <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-brand-600" />}</button><button type="button" onClick={() => setActiveTab('roles')} className={cn('relative px-4 pb-3 text-sm font-semibold transition-colors', activeTab === 'roles' ? 'text-brand-700' : 'text-ink-400 hover:text-ink-700')}>Roller & Yetkiler <span className="ml-1.5 rounded-full bg-ink-100 px-2 py-0.5 text-[10px] text-ink-500">{roleDefinitions.length}</span>{activeTab === 'roles' && <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-brand-600" />}</button></div>

      {activeTab === 'users' ? <>
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="min-w-0 rounded-2xl border border-ink-200/80 bg-white shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]"><div className="flex flex-col justify-between gap-4 border-b border-ink-100 p-5 sm:flex-row sm:items-center sm:p-6"><div><h2 className="text-sm font-semibold text-ink-900">Sistem kullanıcıları</h2><p className="mt-1 text-xs text-ink-400">{filteredUsers.length} kullanıcı gösteriliyor.</p></div><div className="flex flex-col gap-2 sm:flex-row"><div className="relative"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Kullanıcı ara..." className="h-10 w-full rounded-xl border border-ink-200 bg-ink-50/50 pl-9 pr-3 text-sm text-ink-800 outline-none transition-all placeholder:text-ink-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10 sm:w-52" /></div><SelectFilter value={roleFilter} onChange={setRoleFilter} options={['all', ...roleDefinitions.map((role) => role.name)]} allLabel="Tüm roller" /><SelectFilter value={statusFilter} onChange={setStatusFilter} options={['all', 'active', 'pending', 'inactive']} labels={{ active: 'Aktif', pending: 'Davet bekliyor', inactive: 'Pasif' }} allLabel="Tüm durumlar" /><ViewToggle view={view} onChange={setView} /></div></div><BulkActionBar selectedCount={selectedIds.length} itemName="kullanıcı" onClear={() => setSelectedIds([])} onDelete={handleBulkDelete} />{view === 'table' && (<div className="overflow-x-auto max-h-[calc(100dvh-380px)] overflow-y-auto"><table className="w-full min-w-[1000px] text-left text-xs"><thead className="border-b border-ink-100 bg-ink-50/40 text-[10px] font-semibold uppercase tracking-wider text-ink-400"><tr><th className="w-12 px-5 py-3.5 sm:px-6"><input type="checkbox" checked={paginatedUsers.length > 0 && selectedIds.length === paginatedUsers.length} onChange={toggleAll} aria-label="Tümünü seç" className="h-4 w-4 rounded border-ink-300" /></th><th className="px-5 py-3.5 font-semibold sm:px-6">Kullanıcı</th><th className="px-3 py-3.5 font-semibold">Rol</th><th className="px-3 py-3.5 font-semibold">Firma</th><th className="px-3 py-3.5 font-semibold">Modül erişimi</th><th className="px-3 py-3.5 font-semibold">Son giriş</th><th className="px-3 py-3.5 font-semibold">Durum</th><th className="px-5 py-3.5 text-right font-semibold sm:px-6">İşlem</th></tr></thead><tbody className="divide-y divide-ink-100">{paginatedUsers.map((user) => <tr key={user.id} className="group transition-colors hover:bg-ink-50/50"><td className="px-5 py-4 sm:px-6"><input type="checkbox" checked={selectedIds.includes(user.id)} onChange={() => toggleSelection(user.id)} aria-label={`${user.firstName} seç`} className="h-4 w-4 rounded border-ink-300" /></td><td className="px-5 py-4 sm:px-6"><div className="flex items-center gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-50 text-[11px] font-bold text-brand-700">{initials(user)}</span><div className="min-w-0"><p className="truncate text-sm font-semibold text-ink-800">{user.firstName} {user.lastName}</p><p className="mt-0.5 truncate text-[11px] text-ink-400">@{user.username} · {user.email}</p></div></div></td><td className="px-3 py-4"><span className={cn('inline-flex rounded-lg px-2.5 py-1 text-[11px] font-semibold', roleStyles[user.role] ?? 'bg-ink-100 text-ink-600')}>{user.role}</span></td><td className="px-3 py-4 text-ink-600">{user.company}</td><td className="px-3 py-4"><span className="inline-flex items-center gap-1.5 rounded-lg bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-700"><ShieldCheck className="h-3.5 w-3.5" />{user.permissions?.length ?? getRolePermissions(user.role, roleDefinitions).length} modül</span></td><td className="px-3 py-4"><span className="flex items-center gap-1.5 text-ink-500"><Clock3 className="h-3.5 w-3.5 text-ink-400" />{user.lastLogin}</span></td><td className="px-3 py-4"><span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold', statusStyles[user.status].className)}><span className="h-1.5 w-1.5 rounded-full bg-current" />{statusStyles[user.status].label}</span></td><td className="px-5 py-4 text-right sm:px-6"><div className="inline-flex items-center gap-1"><button type="button" onClick={() => toast.info('Düzenleme ekranı sıradaki adımda hazırlanacak.')} className="rounded-lg p-2 text-ink-400 hover:bg-brand-50 hover:text-brand-700" aria-label="Kullanıcıyı düzenle"><Edit3 className="h-4 w-4" /></button><button type="button" onClick={() => handleDeleteUser(user)} className="rounded-lg p-2 text-ink-400 hover:bg-rose-50 hover:text-rose-600" aria-label="Kullanıcıyı sil"><Trash2 className="h-4 w-4" /></button><button type="button" className="rounded-lg p-2 text-ink-400 hover:bg-ink-100 hover:text-ink-700" aria-label="Daha fazla seçenek"><MoreHorizontal className="h-4 w-4" /></button></div></td></tr>)}</tbody></table>{filteredUsers.length === 0 && <div className="px-6 py-14 text-center"><Search className="mx-auto h-7 w-7 text-ink-300" /><p className="mt-3 text-sm font-medium text-ink-600">Kullanıcı bulunamadı</p></div>}</div>)}{view === 'card' && (<div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 sm:p-6">{paginatedUsers.map((user) => (<div key={user.id} className="rounded-2xl border border-ink-200/80 bg-white p-5 transition-all hover:border-brand-300 hover:shadow-[0_8px_24px_-12px_rgba(17,24,39,0.18)]"><div className="flex items-start justify-between"><div className="flex items-center gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-50 text-sm font-bold text-brand-700">{initials(user)}</span><div className="min-w-0"><p className="truncate text-sm font-semibold text-ink-800">{user.firstName} {user.lastName}</p><p className="mt-0.5 truncate text-[11px] text-ink-400">@{user.username}</p></div></div><input type="checkbox" checked={selectedIds.includes(user.id)} onChange={() => toggleSelection(user.id)} aria-label={`${user.firstName} seç`} className="h-4 w-4 rounded border-ink-300" /></div><div className="mt-4 space-y-2 border-t border-ink-100 pt-3"><div className="flex items-center justify-between"><span className={cn('inline-flex rounded-lg px-2.5 py-1 text-[11px] font-semibold', roleStyles[user.role] ?? 'bg-ink-100 text-ink-600')}>{user.role}</span><span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold', statusStyles[user.status].className)}><span className="h-1.5 w-1.5 rounded-full bg-current" />{statusStyles[user.status].label}</span></div><p className="truncate text-[11px] text-ink-500">{user.email}</p><p className="text-[11px] text-ink-400">Son giriş: {user.lastLogin}</p></div></div>))}{paginatedUsers.length === 0 && <div className="col-span-full py-16 text-center"><Search className="mx-auto h-8 w-8 text-ink-300" /><p className="mt-3 text-sm font-semibold text-ink-700">Kullanıcı bulunamadı</p></div>}</div>)}<Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filteredUsers.length} pageSize={pageSize} onPageChange={setCurrentPage} onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1) }} startIndex={startIndex} endIndex={endIndex} itemName="kullanıcı" /></motion.section>
      </> : <RolesTab roles={roleDefinitions} users={users} onEdit={openEditRole} onDelete={handleDeleteRole} onNew={openNewRoleModal} />}

      {isUserModalOpen && <UserModal register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors} isSubmitting={isSubmitting} selectedPermissions={selectedPermissions} roleDefinitions={roleDefinitions} onRoleChange={handleRoleChange} onTogglePermission={toggleUserPermission} onClose={() => setIsUserModalOpen(false)} />}
      {isRoleModalOpen && <RoleModal register={registerRole} handleSubmit={handleRoleSubmit} onSubmit={onRoleSubmit} errors={roleErrors} isSubmitting={isRoleSubmitting} selectedPermissions={selectedRolePermissions} onTogglePermission={toggleRolePermission} editingRole={roleDefinitions.find((role) => role.id === editingRoleId)} onClose={() => setIsRoleModalOpen(false)} />}
    </div>
  )
}

function SelectFilter({ value, onChange, options, labels, allLabel }: { value: string; onChange: (value: string) => void; options: string[]; labels?: Record<string, string>; allLabel: string }) { return <div className="relative"><select value={value} onChange={(event) => onChange(event.target.value)} className="h-10 w-full appearance-none rounded-xl border border-ink-200 bg-white px-3 pr-9 text-xs font-medium text-ink-600 outline-none focus:border-brand-500 sm:w-36">{options.map((option) => <option key={option} value={option}>{option === 'all' ? allLabel : labels?.[option] ?? option}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" /></div> }
function PlusIcon() { return <PlusIconSvg /> }
function PlusIconSvg() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4"><path d="M12 5v14M5 12h14" /></svg> }

type UserModalProps = { register: ReturnType<typeof useForm<UserForm>>['register']; handleSubmit: ReturnType<typeof useForm<UserForm>>['handleSubmit']; onSubmit: (data: UserForm) => void; errors: ReturnType<typeof useForm<UserForm>>['formState']['errors']; isSubmitting: boolean; selectedPermissions: ModuleId[]; roleDefinitions: RoleDefinition[]; onRoleChange: (event: ChangeEvent<HTMLSelectElement>) => void; onTogglePermission: (permission: ModuleId) => void; onClose: () => void }
function UserModal({ register, handleSubmit, onSubmit, errors, isSubmitting, selectedPermissions, roleDefinitions, onRoleChange, onTogglePermission, onClose }: UserModalProps) { return <ModalShell title="Yeni kullanıcı ekle" subtitle="Kullanıcı hesabı ve modül erişimlerini tanımlayın." icon={<UserRound className="h-5 w-5" />} onClose={onClose}><form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-6 py-6 sm:px-7" noValidate><div className="grid gap-4 sm:grid-cols-2"><Input label="İsim" placeholder="Seda" error={errors.firstName?.message} {...register('firstName')} /><Input label="Soyisim" placeholder="Yalçın" error={errors.lastName?.message} {...register('lastName')} /><Input label="Kullanıcı adı" placeholder="seda.yalcin" error={errors.username?.message} {...register('username')} /><Input label="E-posta" type="email" placeholder="kullanici@ornek.com" icon={<Mail className="h-[18px] w-[18px]" />} error={errors.email?.message} {...register('email')} /><Input label="Telefon" type="tel" placeholder="+90 5xx xxx xx xx" icon={<Phone className="h-[18px] w-[18px]" />} {...register('phone')} /><div><label htmlFor="user-company" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">Firma / kapsam</label><select id="user-company" className="h-12 w-full rounded-xl border border-ink-200 bg-white px-3.5 text-sm outline-none focus:border-brand-500" {...register('company')}><option>Çetka OSGB</option><option>Tüm firmalar</option></select></div></div><div className="grid gap-4 sm:grid-cols-2"><div><label htmlFor="user-role" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">Sistem rolü</label><div className="relative"><select id="user-role" className={cn('h-12 w-full appearance-none rounded-xl border bg-white px-3.5 pr-10 text-sm outline-none focus:border-brand-500', errors.role ? 'border-red-400' : 'border-ink-200')} {...register('role', { onChange: onRoleChange })}><option value="">Rol seçiniz</option>{roleDefinitions.map((role) => <option key={role.id} value={role.name}>{role.name}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" /></div>{errors.role && <p className="mt-1.5 text-xs text-red-500">{errors.role.message}</p>}</div><div className="flex items-center rounded-xl bg-brand-50/60 p-3 text-[11px] leading-5 text-brand-800"><KeyRound className="mr-2 h-4 w-4 shrink-0 text-brand-600" />Rol seçildiğinde erişim şablonu uygulanır.</div></div><PermissionPicker permissions={selectedPermissions} onToggle={onTogglePermission} error={errors.permissions?.message} /><div className="border-t border-ink-100 pt-5"><p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-ink-600">İlk giriş şifresi</p><div className="grid gap-4 sm:grid-cols-2"><Input label="Şifre" type="password" placeholder="En az 6 karakter" error={errors.password?.message} {...register('password')} /><Input label="Şifre tekrar" type="password" placeholder="Şifreyi tekrar girin" error={errors.passwordConfirmation?.message} {...register('passwordConfirmation')} /></div></div><ModalActions onClose={onClose} submitting={isSubmitting} submitLabel="Kullanıcıyı davet et" /></form></ModalShell> }

function PermissionPicker({ permissions, onToggle, error }: { permissions: ModuleId[]; onToggle: (permission: ModuleId) => void; error?: string }) { return <div className="rounded-xl border border-ink-200 bg-ink-50/40 p-4"><div className="flex items-start justify-between gap-3"><div><h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-700">Modül erişimleri</h3><p className="mt-1 text-[11px] text-ink-400">Bu kullanıcı hangi bölümlere erişebilsin?</p></div><span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-ink-500 ring-1 ring-ink-200">{permissions.length}/{modules.length} seçili</span></div><div className="mt-4 grid gap-2 sm:grid-cols-2">{modules.map((module) => { const selected = permissions.includes(module.id); return <label key={module.id} className={cn('flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors', selected ? 'border-brand-200 bg-brand-50/70' : 'border-ink-200 bg-white hover:border-ink-300')}><input type="checkbox" checked={selected} onChange={() => onToggle(module.id)} className="h-4 w-4 rounded border-ink-300 accent-brand-600" /><span className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-md', selected ? 'bg-white text-brand-700' : 'bg-ink-100 text-ink-400')}><span className="[&>svg]:h-4 [&>svg]:w-4">{module.icon}</span></span><span className="flex-1 text-xs font-medium text-ink-700">{module.label}</span>{selected && <Check className="h-4 w-4 text-brand-600" />}</label> })}</div>{error && <p className="mt-3 text-xs font-medium text-red-500">{error}</p>}</div> }

function RolesTab({ roles, users, onEdit, onDelete, onNew }: { roles: RoleDefinition[]; users: User[]; onEdit: (role: RoleDefinition) => void; onDelete: (role: RoleDefinition) => void; onNew: () => void }) { return <section className="space-y-5"><div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-5 sm:p-6"><div className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-brand-700 ring-1 ring-brand-100"><ShieldCheck className="h-5 w-5" /></span><div><h2 className="text-sm font-semibold text-ink-900">Rol ve yetki merkezi</h2><p className="mt-1 text-xs leading-5 text-ink-600">Rolleri oluşturun, düzenleyin ve her rolün hangi modüllere erişebileceğini belirleyin.</p></div></div></div><div className="grid gap-4 md:grid-cols-2">{roles.map((role) => { const assigned = users.filter((user) => user.role === role.name).length; return <motion.article key={role.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]"><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><span className={cn('grid h-10 w-10 place-items-center rounded-xl', roleStyles[role.name] ?? 'bg-brand-50 text-brand-700')}><KeyRound className="h-5 w-5" /></span><div><h3 className="text-sm font-semibold text-ink-900">{role.name}</h3><p className="mt-1 text-[11px] text-ink-400">{assigned} kullanıcı · {role.system ? 'Sistem rolü' : 'Özel rol'}</p></div></div><div className="flex gap-1"><button type="button" onClick={() => onEdit(role)} className="rounded-lg p-2 text-ink-400 hover:bg-brand-50 hover:text-brand-700" aria-label={`${role.name} rolünü düzenle`}><Edit3 className="h-4 w-4" /></button><button type="button" onClick={() => onDelete(role)} className="rounded-lg p-2 text-ink-400 hover:bg-rose-50 hover:text-rose-600" aria-label={`${role.name} rolünü sil`}><Trash2 className="h-4 w-4" /></button></div></div><p className="mt-4 text-xs leading-5 text-ink-500">{role.description}</p><div className="mt-4 flex flex-wrap gap-1.5">{role.permissions.slice(0, 5).map((permission) => <span key={permission} className="rounded-md bg-ink-50 px-2 py-1 text-[10px] font-medium text-ink-500 ring-1 ring-ink-200">{modules.find((module) => module.id === permission)?.label}</span>)}{role.permissions.length > 5 && <span className="rounded-md bg-brand-50 px-2 py-1 text-[10px] font-semibold text-brand-700">+{role.permissions.length - 5} daha</span>}</div><div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4 text-[11px] text-ink-400"><span>{role.permissions.length} / {modules.length} modüle erişim</span>{role.system && <span className="inline-flex items-center gap-1 text-ink-500"><ShieldCheck className="h-3.5 w-3.5" />Korunan rol</span>}</div></motion.article> })}<button type="button" onClick={onNew} className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-ink-300 bg-white p-5 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/30"><span className="grid h-10 w-10 place-items-center rounded-xl bg-ink-100 text-ink-500"><PlusIcon /></span><span className="mt-3 text-sm font-semibold text-ink-700">Yeni özel rol oluştur</span><span className="mt-1 text-xs text-ink-400">Kullanıcılarınıza özel modül erişimleri tanımlayın.</span></button></div></section> }

type RoleModalProps = { register: ReturnType<typeof useForm<RoleForm>>['register']; handleSubmit: ReturnType<typeof useForm<RoleForm>>['handleSubmit']; onSubmit: (data: RoleForm) => void; errors: ReturnType<typeof useForm<RoleForm>>['formState']['errors']; isSubmitting: boolean; selectedPermissions: ModuleId[]; onTogglePermission: (permission: ModuleId) => void; editingRole?: RoleDefinition; onClose: () => void }
function RoleModal({ register, handleSubmit, onSubmit, errors, isSubmitting, selectedPermissions, onTogglePermission, editingRole, onClose }: RoleModalProps) { return <ModalShell title={editingRole ? 'Rolü düzenle' : 'Yeni rol oluştur'} subtitle="Rol adı, açıklaması ve modül erişimlerini belirleyin." icon={<KeyRound className="h-5 w-5" />} onClose={onClose}><form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-6 py-6 sm:px-7" noValidate><Input label="Rol adı" placeholder="Örn. Saha Sorumlusu" disabled={editingRole?.system} error={errors.name?.message} {...register('name')} /><div><label htmlFor="role-description" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">Açıklama</label><textarea id="role-description" rows={3} placeholder="Bu rolün sorumluluklarını kısaca açıklayın." className="w-full resize-none rounded-xl border border-ink-200 px-3.5 py-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10" {...register('description')} />{errors.description && <p className="mt-1.5 text-xs text-red-500">{errors.description.message}</p>}</div><PermissionPicker permissions={selectedPermissions} onToggle={onTogglePermission} error={errors.permissions?.message} /><ModalActions onClose={onClose} submitting={isSubmitting} submitLabel={editingRole ? 'Değişiklikleri kaydet' : 'Rolü oluştur'} /></form></ModalShell> }

function ModalShell({ title, subtitle, icon, onClose, children }: { title: string; subtitle: string; icon: ReactNode; onClose: () => void; children: ReactNode }) { return <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink-900/25 p-4 backdrop-blur-[2px] sm:p-8" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><motion.div initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.2 }} role="dialog" aria-modal="true" className="relative z-10 my-auto max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto rounded-2xl border border-ink-200 bg-white shadow-[0_24px_80px_-24px_rgba(17,24,39,0.35)] sm:max-h-[calc(100vh-4rem)]"><div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-ink-100 bg-white/95 px-6 py-5 backdrop-blur sm:px-7"><div className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">{icon}</span><div><h2 className="text-base font-semibold text-ink-900">{title}</h2><p className="mt-1 text-xs text-ink-400">{subtitle}</p></div></div><button type="button" onClick={onClose} className="rounded-xl p-2 text-ink-400 hover:bg-ink-100 hover:text-ink-700" aria-label="Modalı kapat"><X className="h-5 w-5" /></button></div>{children}</motion.div></div> }
function ModalActions({ onClose, submitting, submitLabel }: { onClose: () => void; submitting: boolean; submitLabel: string }) { return <div className="flex flex-col-reverse gap-3 border-t border-ink-100 pt-5 sm:flex-row sm:justify-end"><Button type="button" variant="outline" onClick={onClose}>Vazgeç</Button><Button type="submit" loading={submitting} leftIcon={!submitting ? <Check className="h-4 w-4" /> : undefined}>{submitLabel}</Button></div> }
