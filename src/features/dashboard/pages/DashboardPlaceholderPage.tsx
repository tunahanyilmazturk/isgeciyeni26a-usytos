import { ArrowLeft, Construction } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui'

interface DashboardPlaceholderPageProps {
  title?: string
}

export function DashboardPlaceholderPage({ title }: DashboardPlaceholderPageProps) {
  const location = useLocation()
  const section = title ?? location.pathname.split('/').filter(Boolean).pop() ?? 'sayfa'

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-sm text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600">
          <Construction className="h-6 w-6" strokeWidth={1.7} />
        </span>
        <h1 className="mt-5 text-xl font-bold text-ink-900">Bu bölüm hazırlanıyor</h1>
        <p className="mt-2 text-sm leading-6 text-ink-500">
          <span className="font-medium text-ink-700">{section}</span> modülü dashboard altyapısına bağlandığında burada yer alacak.
        </p>
        <Link to="/dashboard" className="mt-6 inline-flex">
          <Button variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Genel bakışa dön
          </Button>
        </Link>
      </div>
    </div>
  )
}
