import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-[#faf8f5] text-[#1a1a1a] flex items-center justify-center px-6 py-16 overflow-hidden">
      <div className="absolute -top-32 -right-24 w-96 h-96 rounded-full bg-[#1B3A32]/[0.04] pointer-events-none" />
      <div className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-[#c43e3e]/[0.04] pointer-events-none" />

      <div className="relative max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-[#1B3A32] to-[#2d6b5a] flex items-center justify-center shadow-xl shadow-[#1B3A32]/20 -rotate-3">
          <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20L12 4L20 20" /><path d="M7.5 14H16.5" /></svg>
        </div>

        <p className="font-mono-score text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c43e3e] mb-3">Error 404</p>
        <h1 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
          Este perfil<br />
          <span className="text-[#1B3A32]">no existe.</span>
        </h1>
        <p className="text-sm text-[#1a1a1a]/40 leading-relaxed max-w-sm mx-auto mt-5 mb-9">
          El perfil que buscas no está disponible o la dirección es incorrecta. Puedes volver al inicio o abrir directamente el auditor DUA.
        </p>

        <div className="flex flex-col items-center gap-3">
          <Link href="/" className="inline-flex items-center gap-2 bg-[#1B3A32] text-white font-semibold rounded-full px-7 py-3.5 hover:bg-[#24493f] hover:shadow-xl hover:shadow-[#1B3A32]/20 transition-all duration-300 hover:-translate-y-0.5 text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
            Volver al inicio
          </Link>
        </div>

        <p className="mt-10">
          <Link href="/" className="text-xs text-[#1a1a1a]/25 hover:text-[#1a1a1a]/50 transition-colors">← Volver a Adapto</Link>
        </p>
      </div>
    </main>
  );
}
