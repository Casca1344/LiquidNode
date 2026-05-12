import { useEffect, useState, type ComponentType } from 'react'
import {
  Activity,
  BookOpen,
  ChevronRight,
  Cpu,
  ExternalLink,
  Hexagon,
  Layers3,
  TrendingUp,
  type LucideProps,
} from 'lucide-react'

type MainView = 'dashboard' | 'protocol'
type MintStatus = 'idle' | 'processing' | 'success'

function GradientBorder({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-cyan-500/40 via-violet-500/25 to-emerald-400/30 p-px shadow-[0_0_40px_-12px_rgba(34,211,238,0.35)]">
      <div className="rounded-[15px] bg-[#050508]/95">{children}</div>
    </div>
  )
}

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
}: {
  label: string
  value: string
  sub?: string
  icon: ComponentType<LucideProps>
}) {
  return (
    <GradientBorder>
      <div className="flex flex-col gap-3 px-5 py-4 text-left">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">
            {label}
          </span>
          <Icon className="h-4 w-4 text-cyan-400/80" strokeWidth={1.5} />
        </div>
        <p className="font-semibold tabular-nums tracking-tight text-slate-100 text-xl">
          {value}
        </p>
        {sub ? (
          <p className="text-xs text-slate-500 leading-relaxed">{sub}</p>
        ) : null}
      </div>
    </GradientBorder>
  )
}

export default function App() {
  const [mainView, setMainView] = useState<MainView>('dashboard')
  const [amount, setAmount] = useState('10.00')
  const [mintStatus, setMintStatus] = useState<MintStatus>('idle')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const loader = document.getElementById('loader')
    if (!loader) return
    loader.classList.add('loader--hidden')
    loader.setAttribute('aria-busy', 'false')
    const removeId = window.setTimeout(() => loader.remove(), 480)
    return () => clearTimeout(removeId)
  }, [])

  useEffect(() => {
    if (mintStatus !== 'processing') return

    let cancelled = false
    setProgress(0)
    const start = performance.now()

    const tick = (now: number) => {
      if (cancelled) return
      const elapsed = now - start
      const next = Math.min(100, (elapsed / 2000) * 100)
      setProgress(next)
      if (next < 100) {
        requestAnimationFrame(tick)
      } else if (!cancelled) {
        setMintStatus('success')
      }
    }

    const id = requestAnimationFrame(tick)
    return () => {
      cancelled = true
      cancelAnimationFrame(id)
    }
  }, [mintStatus])

  const handleMint = () => {
    const n = Number.parseFloat(amount.replace(',', '.'))
    if (!Number.isFinite(n) || n <= 0) return
    if (mintStatus === 'processing') return

    setProgress(0)
    setMintStatus('processing')
  }

  return (
    <div className="relative flex min-h-svh flex-col bg-[#020204] text-slate-200">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,211,238,0.12),transparent),radial-gradient(ellipse_60%_40%_at_100%_0%,rgba(139,92,246,0.08),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `linear-gradient(rgba(148,163,184,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.04) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <header className="relative z-10 border-b border-white/[0.06] bg-[#020204]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 ring-1 ring-cyan-400/30">
              <Hexagon className="h-5 w-5 text-cyan-300" strokeWidth={1.5} />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                Solana · Liquid Staking
              </p>
              <p className="text-lg font-semibold tracking-tight text-white">
                Liquid Node
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-1 rounded-full bg-white/[0.04] p-1 ring-1 ring-white/[0.06]">
            {(
              [
                ['dashboard', 'Dashboard'],
                ['protocol', 'Protocol'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setMainView(id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  mainView === id
                    ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/15 text-white shadow-[0_0_20px_-8px_rgba(34,211,238,0.5)] ring-1 ring-cyan-400/25'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 rounded-full bg-white/[0.03] px-3 py-1.5 ring-1 ring-white/[0.06]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs font-medium text-slate-400">
              Mainnet-beta · Simulado
            </span>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-5 py-10">
        {mainView === 'protocol' ? (
          <div className="mx-auto max-w-2xl text-center">
            <Cpu className="mx-auto mb-6 h-12 w-12 text-cyan-400/70" strokeWidth={1.2} />
            <h1 className="mb-3 text-3xl font-semibold tracking-tight text-white">
              Protocolo
            </h1>
            <p className="text-slate-500 leading-relaxed">
              Vista simulada para la demo: liquid staking dirigido a validadores premium,
              slashing coverage y curación de nodos en Solana.
            </p>
            <button
              type="button"
              onClick={() => setMainView('dashboard')}
              className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-cyan-400 hover:text-cyan-300"
            >
              Volver al dashboard
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
            <GradientBorder>
              <div className="space-y-8 px-7 py-8 sm:px-10 sm:py-10">
                <div className="space-y-2 text-left">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-400/80">
                    Stake your SOL
                  </p>
                  <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    Acuña tSOL en un entorno institucional
                  </h1>
                  <p className="max-w-xl text-sm text-slate-500 leading-relaxed">
                    Taller SOL (tSOL) representa tu posición líquida con exposición a
                    validadores seleccionados. Esta interfaz es una maqueta para
                    presentación — sin firma on-chain.
                  </p>
                </div>

                <div className="space-y-3 text-left">
                  <label
                    htmlFor="sol-amount"
                    className="text-xs font-medium uppercase tracking-wider text-slate-500"
                  >
                    Cantidad (SOL)
                  </label>
                  <div className="group relative rounded-xl bg-[#0c0c10] ring-1 ring-white/[0.08] transition focus-within:ring-cyan-500/40 focus-within:shadow-[0_0_24px_-8px_rgba(34,211,238,0.35)]">
                    <input
                      id="sol-amount"
                      type="text"
                      inputMode="decimal"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full rounded-xl bg-transparent px-5 py-4 text-2xl font-semibold tabular-nums tracking-tight text-white outline-none placeholder:text-slate-600"
                      placeholder="0.00"
                      disabled={mintStatus === 'processing'}
                    />
                    <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-600">
                      SOL
                    </span>
                  </div>
                </div>

                {mintStatus === 'processing' ? (
                  <div className="space-y-3 rounded-xl border border-cyan-500/20 bg-cyan-500/[0.06] px-5 py-4 text-left">
                    <div className="flex items-center gap-2 text-sm font-medium text-cyan-200">
                      <Activity className="h-4 w-4 shrink-0 animate-pulse" />
                      Procesando en Solana...
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-black/40">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 transition-[width] duration-75 ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                ) : null}

                {mintStatus === 'success' ? (
                  <div className="flex items-start gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.07] px-5 py-4 text-left">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300">
                      <Layers3 className="h-4 w-4" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="font-medium text-emerald-100">
                        Transacción Exitosa: Recibiste tSOL
                      </p>
                      <p className="mt-1 text-xs text-emerald-200/60">
                        Simulación completada. Listo para tu video demo.
                      </p>
                    </div>
                  </div>
                ) : null}

                <button
                  type="button"
                  onClick={handleMint}
                  disabled={mintStatus === 'processing'}
                  className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-600 px-8 py-4 text-base font-semibold tracking-tight text-white shadow-[0_0_40px_-10px_rgba(34,211,238,0.55)] transition hover:brightness-110 disabled:pointer-events-none disabled:opacity-60"
                >
                  <span className="relative z-10">
                    {mintStatus === 'processing'
                      ? 'Confirmando...'
                      : 'Mint tSOL (Taller SOL)'}
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                  />
                </button>
              </div>
            </GradientBorder>

            <aside className="flex flex-col gap-4">
              <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                Estadísticas
              </p>
              <StatCard
                label="APY actual"
                value="7.8%"
                sub="Rendimiento anualizado de referencia (estático)."
                icon={TrendingUp}
              />
              <StatCard
                label="Total staked"
                value="1,240,400 SOL"
                sub="TVL agregado del protocolo simulado."
                icon={Layers3}
              />
              <StatCard
                label="Precio tSOL"
                value="1.042 SOL"
                sub="Tipo de cambio redondeado — 1 tSOL ≈ 1.042 SOL."
                icon={Activity}
              />
            </aside>
          </div>
        )}
      </main>

      <footer className="relative z-10 border-t border-white/[0.06] bg-[#020204]/90 py-6 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 text-sm text-slate-500">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-2 transition hover:text-cyan-400"
          >
            <ExternalLink className="h-4 w-4" />
            Solana Explorer
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-2 transition hover:text-cyan-400"
          >
            <BookOpen className="h-4 w-4" />
            Documentation
          </a>
          <span className="hidden sm:inline text-slate-700">·</span>
          <span className="text-xs text-slate-600">© Liquid Node — Demo UI</span>
        </div>
      </footer>
    </div>
  )
}
