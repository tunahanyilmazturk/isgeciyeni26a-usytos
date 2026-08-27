import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { DashboardLayout } from './layouts/DashboardLayout'
import { ParticipantLayout } from './layouts/ParticipantLayout'
import { AuthProvider, useAuth } from './features/auth/AuthContext'
import { ParticipantAuthProvider, useParticipantAuth } from './features/auth/ParticipantAuthContext'
import { LoginPage } from './features/auth/pages/LoginPage'

const DashboardPage = lazy(() =>
  import('./features/dashboard').then((m) => ({ default: m.DashboardPage })),
)
const DashboardPlaceholderPage = lazy(() =>
  import('./features/dashboard').then((m) => ({ default: m.DashboardPlaceholderPage })),
)
const CustomersPage = lazy(() =>
  import('./features/customers').then((m) => ({ default: m.CustomersPage })),
)
const BulkCustomerImportPage = lazy(() =>
  import('./features/customers').then((m) => ({ default: m.BulkCustomerImportPage })),
)
const CustomerCreatePage = lazy(() =>
  import('./features/customers').then((m) => ({ default: m.CustomerCreatePage })),
)
const CustomerDetailPage = lazy(() =>
  import('./features/customers').then((m) => ({ default: m.CustomerDetailPage })),
)
const ParticipantsPage = lazy(() =>
  import('./features/participants').then((m) => ({ default: m.ParticipantsPage })),
)
const ParticipantDetailPage = lazy(() =>
  import('./features/participants').then((m) => ({ default: m.ParticipantDetailPage })),
)
const TrainingsPage = lazy(() =>
  import('./features/trainings').then((m) => ({ default: m.TrainingsPage })),
)
const TrainingPreviewPage = lazy(() =>
  import('./features/trainings').then((m) => ({ default: m.TrainingPreviewPage })),
)
const ExpertsPage = lazy(() =>
  import('./features/people').then((m) => ({ default: m.ExpertsPage })),
)
const DoctorsPage = lazy(() =>
  import('./features/people').then((m) => ({ default: m.DoctorsPage })),
)
const CompanyInfoPage = lazy(() =>
  import('./features/settings').then((m) => ({ default: m.CompanyInfoPage })),
)
const UsersPage = lazy(() =>
  import('./features/settings').then((m) => ({ default: m.UsersPage })),
)
const AssignmentsPage = lazy(() =>
  import('./features/assignments').then((m) => ({ default: m.AssignmentsPage })),
)
const SignatureQueuePage = lazy(() =>
  import('./features/signatures').then((m) => ({ default: m.SignatureQueuePage })),
)
const LiveTrainingPage = lazy(() =>
  import('./features/live-training').then((m) => ({ default: m.LiveTrainingPage })),
)
const ReportsPage = lazy(() =>
  import('./features/reports').then((m) => ({ default: m.ReportsPage })),
)
const InvoicesPage = lazy(() =>
  import('./features/invoices').then((m) => ({ default: m.InvoicesPage })),
)
const GuidePage = lazy(() =>
  import('./features/support').then((m) => ({ default: m.GuidePage })),
)
const VideoPage = lazy(() =>
  import('./features/support').then((m) => ({ default: m.VideoPage })),
)
const SupportRequestPage = lazy(() =>
  import('./features/support').then((m) => ({ default: m.SupportRequestPage })),
)
const KvkkApprovalPage = lazy(() =>
  import('./features/auth/pages/KvkkApprovalPage').then((m) => ({ default: m.KvkkApprovalPage })),
)
const PasswordChangePage = lazy(() =>
  import('./features/auth/pages/PasswordChangePage').then((m) => ({ default: m.PasswordChangePage })),
)
const ParticipantDashboardPage = lazy(() =>
  import('./features/auth/pages/ParticipantDashboardPage').then((m) => ({ default: m.ParticipantDashboardPage })),
)
const ParticipantTrainingsPage = lazy(() =>
  import('./features/auth/pages/ParticipantTrainingsPage').then((m) => ({ default: m.ParticipantTrainingsPage })),
)
const ParticipantProfilePage = lazy(() =>
  import('./features/auth/pages/ParticipantProfilePage').then((m) => ({ default: m.ParticipantProfilePage })),
)

type AdminModule = 'dashboard' | 'companies' | 'participants' | 'assignments' | 'signatures' | 'liveTraining' | 'reports' | 'trainings' | 'companyInfo' | 'support'

const roleModules: Record<string, AdminModule[]> = {
  Yönetici: ['dashboard', 'companies', 'participants', 'assignments', 'signatures', 'liveTraining', 'reports', 'trainings', 'companyInfo', 'support'],
  'İSG Uzmanı': ['dashboard', 'companies', 'participants', 'assignments', 'signatures', 'liveTraining', 'reports', 'trainings', 'support'],
  'İşyeri Hekimi': ['dashboard', 'participants', 'assignments', 'signatures', 'trainings', 'support'],
  Personel: ['dashboard', 'participants', 'trainings', 'support'],
}

function moduleForPath(pathname: string): AdminModule {
  if (pathname.startsWith('/dashboard/firmalar')) return 'companies'
  if (pathname.startsWith('/dashboard/katilimcilar')) return 'participants'
  if (pathname.startsWith('/dashboard/egitimler')) return 'trainings'
  if (pathname.startsWith('/dashboard/egitim-atamalari')) return 'assignments'
  if (pathname.startsWith('/dashboard/imza-kuyrugu')) return 'signatures'
  if (pathname.startsWith('/dashboard/canli-egitim')) return 'liveTraining'
  if (pathname.startsWith('/dashboard/raporlar')) return 'reports'
  if (pathname.startsWith('/dashboard/osgb-bilgileri')) return 'companyInfo'
  if (pathname.startsWith('/dashboard/destek')) return 'support'
  return 'dashboard'
}

// Bu guard yalnızca frontend UX/navigation içindir; gerçek authorization backend'de yapılmalıdır.
function hasFrontendAccess(role: string, pathname: string) {
  return roleModules[role]?.includes(moduleForPath(pathname)) ?? false
}

function ProtectedRoutes() {
  const { user, isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated || !user) {
    return <Navigate to="/giris" replace state={{ from: location.pathname }} />
  }

  if (!hasFrontendAccess(user.role, location.pathname)) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <DashboardLayout>
      <Suspense
        fallback={
          <div className="flex min-h-[60vh] items-center justify-center text-sm text-ink-400">
            Yükleniyor…
          </div>
        }
      >
        <Routes>
          <Route index element={<DashboardPage />} />
          <Route path="firmalar" element={<CustomersPage />} />
          <Route path="firmalar/toplu-isg-import" element={<BulkCustomerImportPage />} />
          <Route path="firmalar/yeni" element={<CustomerCreatePage />} />
          <Route path="firmalar/:customerId" element={<CustomerDetailPage />} />
          <Route path="katilimcilar" element={<ParticipantsPage />} />
          <Route path="katilimcilar/:participantId" element={<ParticipantDetailPage />} />
          <Route path="katilimcilar/yeni" element={<Navigate to="/dashboard/katilimcilar" replace />} />
          <Route path="egitimler" element={<TrainingsPage />} />
          <Route path="egitimler/:trainingId/katilimci-onizleme" element={<TrainingPreviewPage />} />
          <Route path="osgb-bilgileri/firma-bilgileri" element={<CompanyInfoPage />} />
          <Route path="osgb-bilgileri/egiticiler" element={<ExpertsPage />} />
          <Route path="osgb-bilgileri/doktorlar" element={<DoctorsPage />} />
          <Route path="osgb-bilgileri/kullanicilar" element={<UsersPage />} />
          <Route path="osgb-bilgileri/faturalar" element={<InvoicesPage />} />
          <Route path="egitim-atamalari" element={<AssignmentsPage />} />
          <Route path="egitim-atamalari/onay-kuyrugu" element={<AssignmentsPage />} />
          <Route path="egitim-atamalari/onay-kuyrugu/gecmis" element={<AssignmentsPage />} />
          <Route path="imza-kuyrugu" element={<SignatureQueuePage />} />
          <Route path="canli-egitim" element={<LiveTrainingPage />} />
          <Route path="raporlar" element={<ReportsPage />} />
          <Route path="destek/kilavuz" element={<GuidePage />} />
          <Route path="destek/video" element={<VideoPage />} />
          <Route path="destek/talepler" element={<SupportRequestPage />} />
          <Route path="*" element={<DashboardPlaceholderPage />} />
        </Routes>
      </Suspense>
    </DashboardLayout>
  )
}

function ParticipantRoutes() {
  const { isAuthenticated, kvkkApproved, mustChangePassword, mustUpdateContact } = useParticipantAuth()

  if (!isAuthenticated) {
    return <Navigate to="/giris" replace />
  }

  if (!kvkkApproved) {
    return <KvkkApprovalPage />
  }

  if (mustChangePassword || mustUpdateContact) {
    return <PasswordChangePage />
  }

  return (
    <ParticipantLayout>
      <Suspense
        fallback={
          <div className="flex min-h-[60vh] items-center justify-center text-sm text-ink-400">
            Yükleniyor…
          </div>
        }
      >
        <Routes>
          <Route index element={<ParticipantDashboardPage />} />
          <Route path="egitimler" element={<ParticipantTrainingsPage />} />
          <Route path="profil" element={<ParticipantProfilePage />} />
          <Route path="*" element={<Navigate to="/katilimci" replace />} />
        </Routes>
      </Suspense>
    </ParticipantLayout>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ParticipantAuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/giris" element={<LoginPage />} />
          <Route path="/dashboard/*" element={<ProtectedRoutes />} />
          <Route path="/katilimci/giris" element={<Navigate to="/giris" replace />} />
          <Route path="/katilimci/*" element={<ParticipantRoutes />} />
        </Routes>
      </ParticipantAuthProvider>
    </AuthProvider>
  )
}
