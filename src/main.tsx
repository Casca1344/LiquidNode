import { Component, StrictMode, type ErrorInfo, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

class RootErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[Liquid Node] render error:', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-[#020204] px-6 py-16">
          <div className="max-w-md rounded-2xl bg-[#080810]/95 p-[1px] shadow-[0_0_48px_-16px_rgba(139,92,246,0.4)]">
            <div className="rounded-[15px] border border-violet-500/30 bg-[#0a0a12] px-8 py-10 text-center ring-1 ring-violet-400/15">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-400/80">
                Liquid Node
              </p>
              <p className="mt-4 text-base font-medium leading-relaxed text-slate-200">
                Protocol connection lost. Please refresh the node.
              </p>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

const rootEl = document.getElementById('root')
if (!rootEl) {
  throw new Error(
    '[Liquid Node] No existe el elemento #root en index.html — createRoot necesita un nodo DOM válido.',
  )
}

createRoot(rootEl).render(
  <StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </StrictMode>,
)
