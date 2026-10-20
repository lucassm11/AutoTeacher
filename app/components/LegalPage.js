'use client';

import Link from 'next/link';

function AdaptoLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[#1B3A32] to-[#2d6b5a] flex items-center justify-center">
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 20L12 4L20 20" />
          <path d="M7.5 14H16.5" />
        </svg>
      </div>
      <span className="flex items-baseline">
        <span className="font-display text-xl text-[#1a1a1a]">adap</span>
        <span className="font-display text-xl text-[#1B3A32]">to</span>
      </span>
    </Link>
  );
}

export default function LegalPage({ title, lastUpdated, children }) {
  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a1a1a]">
      <header className="border-b border-black/[0.04] bg-[#faf8f5]/80 backdrop-blur-2xl">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <AdaptoLogo />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <h1 className="font-display text-3xl md:text-4xl tracking-tight text-[#1a1a1a] mb-3">{title}</h1>
        <p className="text-sm text-[#1a1a1a]/30 mb-12">Ultima actualizacion: {lastUpdated}</p>
        <div className="prose-adapto space-y-8 text-[#1a1a1a]/65 leading-relaxed text-[15px]">
          {children}
        </div>
      </main>

      <footer className="border-t border-black/[0.04] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <AdaptoLogo />
          <div className="flex items-center gap-6 text-xs text-[#1a1a1a]/30">
            <Link href="/aviso-legal" className="hover:text-[#1a1a1a]/60 transition-colors">Aviso legal</Link>
            <Link href="/politica-privacidad" className="hover:text-[#1a1a1a]/60 transition-colors">Privacidad</Link>
            <Link href="/politica-cookies" className="hover:text-[#1a1a1a]/60 transition-colors">Cookies</Link>
            <Link href="/terminos-condiciones" className="hover:text-[#1a1a1a]/60 transition-colors">Terminos</Link>
            <Link href="/contacto" className="hover:text-[#1a1a1a]/60 transition-colors">Contacto</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
