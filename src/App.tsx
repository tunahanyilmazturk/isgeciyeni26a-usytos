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
          <Route path="osgb-bilgileri/faturalar" element={<DashboardPlaceholderPage title="Faturalar" />} />
          <Route path="egitim-atamalari" element={<DashboardPlaceholderPage title="Eğitim Atamaları" />} />
          <Route path="egitim-atamalari/onay-kuyrugu" element={<DashboardPlaceholderPage title="Bekleyen Onaylar" />} />
          <Route path="egitim-atamalari/onay-kuyrugu/gecmis" element={<DashboardPlaceholderPage title="Geçmiş Onaylar" />} />
          <Route path="imza-kuyrugu" element={<DashboardPlaceholderPage title="E-İmza Kuyruğu" />} />
          <Route path="canli-egitim" element={<DashboardPlaceholderPage title="Canlı Eğitim" />} />
          <Route path="raporlar" element={<DashboardPlaceholderPage title="Raporlar" />} />
          <Route path="destek/kilavuz" element={<DashboardPlaceholderPage title="Kullanım Kılavuzu" />} />
          <Route path="destek/video" element={<DashboardPlaceholderPage title="Kullanım Videosu" />} />
          <Route path="destek/talepler" element={<DashboardPlaceholderPage title="Destek Talebi" />} />
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
