'use client';

import { useState } from 'react';
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

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: '', email: '', asunto: '', mensaje: '' });
  const [status, setStatus] = useState('idle');
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!consent) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) setStatus('sent');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a1a1a]">
      <header className="border-b border-black/[0.04] bg-[#faf8f5]/80 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <AdaptoLogo />
          <Link href="/" className="text-sm text-[#1a1a1a]/40 hover:text-[#1a1a1a]/60 transition-colors">Volver al inicio</Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-5 gap-16">
          <div className="md:col-span-2">
            <h1 className="font-display text-3xl md:text-4xl tracking-tight text-[#1a1a1a] mb-4">Contacto</h1>
            <p className="text-[#1a1a1a]/45 leading-relaxed mb-10">
              Tienes dudas, sugerencias o necesitas ayuda? Escribenos y te respondemos en menos de 24 horas.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1B3A32]/[0.06] border border-[#1B3A32]/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#1B3A32]/60" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1a1a1a]">Email</p>
                  <p className="text-sm text-[#1a1a1a]/40">hola@adapto.app</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1B3A32]/[0.06] border border-[#1B3A32]/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#1B3A32]/60" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1a1a1a]">Ubicacion</p>
                  <p className="text-sm text-[#1a1a1a]/40">Espana</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1B3A32]/[0.06] border border-[#1B3A32]/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#1B3A32]/60" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1a1a1a]">Horario</p>
                  <p className="text-sm text-[#1a1a1a]/40">Lunes a viernes, 9:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            {status === 'sent' ? (
              <div className="bg-white rounded-2xl border border-black/[0.06] p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                </div>
                <h2 className="font-display text-2xl text-[#1a1a1a] mb-3">Mensaje enviado</h2>
                <p className="text-[#1a1a1a]/45 mb-8">Gracias por contactarnos. Te responderemos en menos de 24 horas.</p>
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B3A32] hover:underline">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                  Volver al inicio
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-black/[0.06] p-8 md:p-10 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-[#1a1a1a]/40 uppercase tracking-wider mb-2">Nombre</label>
                    <input
                      type="text"
                      required
                      value={form.nombre}
                      onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-black/[0.08] bg-[#faf8f5] text-[#1a1a1a] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A32]/20 focus:border-[#1B3A32]/40 transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1a1a1a]/40 uppercase tracking-wider mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-black/[0.08] bg-[#faf8f5] text-[#1a1a1a] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A32]/20 focus:border-[#1B3A32]/40 transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1a1a1a]/40 uppercase tracking-wider mb-2">Asunto</label>
                  <select
                    value={form.asunto}
                    onChange={(e) => setForm({ ...form, asunto: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-black/[0.08] bg-[#faf8f5] text-[#1a1a1a] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A32]/20 focus:border-[#1B3A32]/40 transition-all"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="soporte">Soporte tecnico</option>
                    <option value="facturacion">Facturacion</option>
                    <option value="sugerencia">Sugerencia</option>
                    <option value="centros">Centros educativos</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1a1a1a]/40 uppercase tracking-wider mb-2">Mensaje</label>
                  <textarea
                    required
                    rows={5}
                    value={form.mensaje}
                    onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-black/[0.08] bg-[#faf8f5] text-[#1a1a1a] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A32]/20 focus:border-[#1B3A32]/40 transition-all resize-none"
                    placeholder="Escribe tu mensaje aqui..."
                  />
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-black/[0.15] text-[#1B3A32] focus:ring-[#1B3A32]/20"
                  />
                  <span className="text-xs text-[#1a1a1a]/35 leading-relaxed">
                    Acepto la{' '}
                    <Link href="/politica-privacidad" className="text-[#1B3A32]/70 hover:text-[#1B3A32] underline">politica de privacidad</Link>.
                    Tus datos seran tratados exclusivamente para responder a tu consulta.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={status === 'loading' || !consent}
                  className="w-full bg-[#1B3A32] text-white font-semibold rounded-xl px-6 py-3.5 hover:bg-[#24493f] hover:shadow-lg hover:shadow-[#1B3A32]/15 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                >
                  {status === 'loading' ? 'Enviando...' : status === 'error' ? 'Error al enviar. Intentalo de nuevo.' : 'Enviar mensaje'}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-black/[0.04] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <AdaptoLogo />
          <div className="flex items-center gap-6 text-xs text-[#1a1a1a]/30">
            <Link href="/aviso-legal" className="hover:text-[#1a1a1a]/60 transition-colors">Aviso legal</Link>
            <Link href="/politica-privacidad" className="hover:text-[#1a1a1a]/60 transition-colors">Privacidad</Link>
            <Link href="/politica-cookies" className="hover:text-[#1a1a1a]/60 transition-colors">Cookies</Link>
            <Link href="/terminos-condiciones" className="hover:text-[#1a1a1a]/60 transition-colors">Terminos</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
