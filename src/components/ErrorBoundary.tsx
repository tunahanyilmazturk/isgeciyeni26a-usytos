import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('Unhandled application error', error, errorInfo)
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <main className="flex min-h-screen items-center justify-center bg-ink-50 px-4 py-10">
        <section className="w-full max-w-md rounded-2xl border border-ink-200 bg-white p-6 text-center shadow-[0_12px_40px_-24px_rgba(17,24,39,0.3)] sm:p-8" role="alert">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-amber-50 text-amber-600">
            <AlertTriangle className="h-6 w-6" />
          </span>
          <h1 className="mt-4 text-lg font-bold text-ink-900">Beklenmeyen bir hata oluştu</h1>
          <p className="mt-2 text-sm leading-6 text-ink-500">
            Sayfa yüklenirken bir sorun oluştu. Tekrar deneyebilir veya uygulamayı yenileyebilirsiniz.
          </p>
          {import.meta.env.DEV && this.state.error && (
            <pre className="mt-4 max-h-32 overflow-auto rounded-lg bg-ink-50 p-3 text-left text-[11px] text-rose-700">
              {this.state.error.message}
            </pre>
          )}
          <div className="mt-6 flex justify-center gap-2.5">
            <Button type="button" variant="outline" onClick={this.handleRetry}>Tekrar dene</Button>
            <Button type="button" onClick={this.handleReload} leftIcon={<RefreshCw className="h-4 w-4" />}>Yenile</Button>
          </div>
        </section>
      </main>
    )
  }
}
