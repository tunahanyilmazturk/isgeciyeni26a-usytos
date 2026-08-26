export { DoctorsPage } from './pages/DoctorsPage'
export { ExpertsPage } from './pages/ExpertsPage'
export type { Doctor, DoctorLevel, Expert, ExpertTitle } from './data/people'
export {
  DOCTORS_STORAGE_KEY,
  EXPERTS_STORAGE_KEY,
  initialDoctors,
  initialExperts,
  readDoctors,
  readExperts,
  saveDoctors,
  saveExperts,
} from './data/people'
