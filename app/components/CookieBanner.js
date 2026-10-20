'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  const mountedRef = useRef(false);
  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    const consent = localStorage.getItem('adapto-cookie-consent');
    if (!consent) {
      requestAnimationFrame(() => setVisible(true));
    }
  }, []);

  const accept = () => {
    localStorage.setItem('adapto-cookie-consent', 'accepted');
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem('adapto-cookie-consent', 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="mx-auto max-w-3xl bg-white rounded-2xl shadow-2xl shadow-black/[0.12] border border-black/[0.06] p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start gap-5">
          <div className="w-10 h-10 rounded-xl bg-[#1B3A32]/[0.06] border border-[#1B3A32]/10 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-[#1B3A32]/60" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-[#1a1a1a]/70 leading-relaxed mb-4">
              Utilizamos cookies tecnicas necesarias para el funcionamiento del sitio (autenticacion, sesion). No utilizamos cookies de analitica ni publicitarias. Puede consultar nuestra{' '}
              <Link href="/politica-cookies" className="text-[#1B3A32] hover:underline font-medium">politica de cookies</Link>{' '}
              para mas informacion.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={accept}
                className="bg-[#1B3A32] text-white text-sm font-semibold rounded-lg px-5 py-2.5 hover:bg-[#24493f] transition-colors"
              >
                Aceptar
              </button>
              <button
                onClick={reject}
                className="border border-black/[0.08] text-[#1a1a1a]/50 text-sm font-medium rounded-lg px-5 py-2.5 hover:bg-black/[0.02] transition-colors"
              >
                Rechazar
              </button>
              <Link href="/politica-cookies" className="text-xs text-[#1a1a1a]/30 hover:text-[#1a1a1a]/50 transition-colors ml-1">
                Mas informacion
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
