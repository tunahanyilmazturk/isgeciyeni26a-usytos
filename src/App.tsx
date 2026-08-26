import { Route, Routes } from 'react-router-dom'
import { DashboardLayout } from './layouts/DashboardLayout'
import { BulkCustomerImportPage, CustomerCreatePage, CustomerDetailPage, CustomersPage } from './features/customers'
import { LoginPage } from './features/auth'
import { DashboardPage, DashboardPlaceholderPage } from './features/dashboard'
import { ParticipantCreatePage, ParticipantsPage } from './features/participants'
import { TrainingsPage } from './features/trainings'
import { DoctorsPage, ExpertsPage } from './features/people'
import { CompanyInfoPage, UsersPage } from './features/settings'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/giris" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
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
        <Route path="*" element={<DashboardPlaceholderPage />} />
      </Route>
    </Routes>
  )
}

export default App
