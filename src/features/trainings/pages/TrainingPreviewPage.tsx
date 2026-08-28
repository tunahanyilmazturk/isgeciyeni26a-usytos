import { useNavigate } from 'react-router-dom'

export function TrainingPreviewPage() {
  const navigate = useNavigate()
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold tracking-tight text-ink-900">Eğitim Önizlemesi</h1>
      <p className="mt-2 text-sm text-ink-500">
        Eğitim önizleme ekranı yeni sistemle birlikte yeniden dizayn edilecek.
      </p>
      <button
        type="button"
        onClick={() => navigate('/dashboard/egitimler')}
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-bold text-white hover:bg-brand-700"
      >
        Eğitim listesine dön
      </button>
    </div>
  )
}
