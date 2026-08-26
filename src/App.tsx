import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { DashboardLayout } from './layouts/DashboardLayout'
import { AuthProvider, LoginPage, useAuth } from './features/auth'

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
const ParticipantCreatePage = lazy(() =>
  import('./features/participants').then((m) => ({ default: m.ParticipantCreatePage })),
)
const TrainingsPage = lazy(() =>
  import('./features/trainings').then((m) => ({ default: m.TrainingsPage })),
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

function ProtectedRoutes() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/giris" replace />
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
          <Route path="katilimcilar/yeni" element={<ParticipantCreatePage />} />
          <Route path="egitimler" element={<TrainingsPage />} />
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

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/giris" element={<LoginPage />} />
        <Route path="/dashboard/*" element={<ProtectedRoutes />} />
      </Routes>
    </AuthProvider>
  )
}
