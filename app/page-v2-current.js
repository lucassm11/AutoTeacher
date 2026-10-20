'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

function AnimatedCounter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, target, duration]);

  return <span ref={ref}>{count.toLocaleString('es-ES')}</span>;
}

function FloatingTag({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase rounded-full px-3 py-1.5 ${className}`}>
      {children}
    </span>
  );
}

function MorphBlob({ className = '' }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full opacity-[0.04]">
        <path fill="currentColor" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.4,-0.9C86.8,14.5,81,29,72.1,41.5C63.2,54,51.2,64.5,37.7,72.1C24.2,79.7,9.1,84.4,-4.3,82.3C-17.7,80.2,-35.3,71.3,-48.2,59.8C-61.1,48.3,-69.2,34.1,-74.3,18.7C-79.4,3.3,-81.5,-13.3,-75.4,-26.4C-69.3,-39.5,-55,-49.1,-40.7,-56C-26.4,-62.9,-13.2,-67.1,1.5,-69.2C16.2,-71.3,32.4,-71.4,44.7,-76.4Z" transform="translate(100 100)" />
      </svg>
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-2">
      <svg width="200" height="12" viewBox="0 0 200 12" className="opacity-[0.08]">
        <circle cx="100" cy="6" r="3" fill="currentColor" />
        <line x1="20" y1="6" x2="90" y2="6" stroke="currentColor" strokeWidth="0.5" />
        <line x1="110" y1="6" x2="180" y2="6" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

const BRAIN_NODES = [0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
  const rad = a * Math.PI / 180;
  return { x1: +(100 + Math.cos(rad) * 24).toFixed(4), y1: +(80 + Math.sin(rad) * 24).toFixed(4), x2: +(100 + Math.cos(rad) * 36).toFixed(4), y2: +(80 + Math.sin(rad) * 36).toFixed(4) };
});
const BRAIN_DOTS = [0, 60, 120, 180, 240, 300].map((a) => {
  const rad = a * Math.PI / 180;
  return { cx: +(100 + Math.cos(rad) * 55).toFixed(4), cy: +(80 + Math.sin(rad) * 55).toFixed(4) };
});

function FeatureIllustration({ variant }) {
  const illustrations = {
    upload: (
      <svg viewBox="0 0 200 160" className="w-full h-full">
        <defs>
          <linearGradient id="ug1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#1B3A32" stopOpacity="0.08" /><stop offset="100%" stopColor="#1B3A32" stopOpacity="0.02" /></linearGradient>
          <linearGradient id="ug2" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#1B3A32" stopOpacity="0.15" /><stop offset="100%" stopColor="#10b981" stopOpacity="0.15" /></linearGradient>
        </defs>
        <rect x="30" y="20" width="140" height="120" rx="12" fill="url(#ug1)" stroke="#1B3A32" strokeOpacity="0.1" strokeWidth="1" />
        <rect x="50" y="45" width="100" height="8" rx="4" fill="#1B3A32" fillOpacity="0.08" />
        <rect x="50" y="62" width="70" height="8" rx="4" fill="#1B3A32" fillOpacity="0.06" />
        <rect x="50" y="79" width="85" height="8" rx="4" fill="#1B3A32" fillOpacity="0.06" />
        <rect x="50" y="96" width="60" height="8" rx="4" fill="#1B3A32" fillOpacity="0.06" />
        <circle cx="155" cy="110" r="22" fill="#1B3A32" fillOpacity="0.9" />
        <path d="M148 110l5 5 10-10" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="25" y="8" width="150" height="4" rx="2" fill="url(#ug2)" />
      </svg>
    ),
    brain: (
      <svg viewBox="0 0 200 160" className="w-full h-full">
        <defs>
          <radialGradient id="bg1" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#1B3A32" stopOpacity="0.06" /><stop offset="100%" stopColor="#1B3A32" stopOpacity="0" /></radialGradient>
        </defs>
        <circle cx="100" cy="80" r="70" fill="url(#bg1)" />
        <circle cx="100" cy="80" r="40" fill="none" stroke="#1B3A32" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="4 3" />
        <circle cx="100" cy="80" r="55" fill="none" stroke="#1B3A32" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="6 4" />
        <circle cx="100" cy="80" r="20" fill="#1B3A32" fillOpacity="0.9" />
        <path d="M92 76 Q96 68 104 68 Q112 68 108 76" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M92 82 Q96 90 108 82" stroke="white" strokeWidth="1.5" fill="none" />
        {BRAIN_NODES.map((n, i) => (
          <line key={i} x1={n.x1} y1={n.y1} x2={n.x2} y2={n.y2} stroke="#1B3A32" strokeOpacity="0.15" strokeWidth="1" strokeLinecap="round" />
        ))}
        {BRAIN_DOTS.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r="5" fill="white" stroke="#1B3A32" strokeOpacity="0.15" strokeWidth="1" />
        ))}
      </svg>
    ),
    adapt: (
      <svg viewBox="0 0 200 160" className="w-full h-full">
        <defs>
          <linearGradient id="ag1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#1B3A32" stopOpacity="0.06" /><stop offset="100%" stopColor="#10b981" stopOpacity="0.06" /></linearGradient>
        </defs>
        <rect x="10" y="25" width="80" height="110" rx="8" fill="white" stroke="#1B3A32" strokeOpacity="0.1" strokeWidth="1" />
        <rect x="110" y="25" width="80" height="110" rx="8" fill="url(#ag1)" stroke="#10b981" strokeOpacity="0.15" strokeWidth="1" />
        <rect x="20" y="40" width="60" height="5" rx="2.5" fill="#1B3A32" fillOpacity="0.1" />
        <rect x="20" y="52" width="50" height="5" rx="2.5" fill="#1B3A32" fillOpacity="0.06" />
        <rect x="20" y="64" width="55" height="5" rx="2.5" fill="#1B3A32" fillOpacity="0.06" />
        <rect x="20" y="76" width="45" height="5" rx="2.5" fill="#1B3A32" fillOpacity="0.06" />
        <rect x="120" y="40" width="60" height="5" rx="2.5" fill="#10b981" fillOpacity="0.2" />
        <rect x="120" y="55" width="40" height="4" rx="2" fill="#1B3A32" fillOpacity="0.06" />
        <rect x="120" y="64" width="35" height="4" rx="2" fill="#1B3A32" fillOpacity="0.06" />
        <rect x="120" y="76" width="55" height="4" rx="2" fill="#1B3A32" fillOpacity="0.06" />
        <path d="M92 80 L108 80" stroke="#1B3A32" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="3 2" />
        <polygon points="106,76 112,80 106,84" fill="#1B3A32" fillOpacity="0.2" />
      </svg>
    ),
  };
  return illustrations[variant] || null;
}

const FAQS = [
  { q: 'Como funciona exactamente?', a: 'Subes el examen como imagen, PDF o texto. Seleccionas el perfil del alumno (TDAH, dislexia, etc.) y Adapto reescribe las preguntas con adaptaciones reales: bancos de palabras, consignas simplificadas, tiempos reducidos y pistas visuales.' },
  { q: 'Sirve la documentacion para presentar en CCP o ante la inspeccion educativa?', a: 'Si. Adapto estructura el informe y las adaptaciones conforme a los principios DUA y los criterios curriculares de la LOMLOE. Proporciona al docente y al orientador la justificacion tecnica, puntuacion DUA y hoja de apoyos en PDF para fundamentar las medidas adoptadas ante el centro y la inspeccion.' },
  { q: 'Necesito saber de educacion para usarlo?', a: 'Para nada. Solo indicas el curso, la materia y el tipo de necesidad. Adapto se encarga del resto usando IA entrenada con normativa educativa espanola vigente.' },
  { q: 'Que formatos puedo subir?', a: 'PDF, imagen (JPG/PNG) o texto directo. Puedes pegar el examen completo o subir una foto con el movil.' },
  { q: 'Hay version gratis?', a: 'Si. Puedes adaptar hasta 3 examenes gratis con marca de agua en el PDF. Sin registro, sin tarjeta.' },
];

export default function Home() {
  const [annual, setAnnual] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const mountedRef = useRef(false);
  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    requestAnimationFrame(() => setHeroVisible(true));
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a1a1a] overflow-hidden selection:bg-[#1B3A32] selection:text-white">

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#faf8f5]/80 backdrop-blur-2xl border-b border-black/[0.04]">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#1B3A32] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <span className="flex items-baseline">
              <span className="font-display italic text-3xl text-[#1B3A32] tracking-tight">Adap</span>
              <span className="font-display italic text-3xl text-[#c43e3e] tracking-tight">to</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {['Como funciona', 'Resultado', 'Precios'].map((s) => (
              <a key={s} href={'#' + s.toLowerCase().replace(/ /g, '-')} className="text-sm text-[#1a1a1a]/50 hover:text-[#1a1a1a] px-4 py-2 rounded-full hover:bg-black/[0.03] transition-all duration-300">{s}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-[#1a1a1a]/60 hover:text-[#1a1a1a] px-4 py-2 transition-colors hidden sm:block">Iniciar sesion</Link>
            <Link href="/auditor-dua" className="text-sm font-semibold bg-[#1B3A32] text-white rounded-full px-5 py-2.5 hover:bg-[#24493f] hover:shadow-lg hover:shadow-[#1B3A32]/20 transition-all duration-300 hover:-translate-y-0.5">
              Adaptar gratis
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-40 pb-32 md:pt-52 md:pb-44 overflow-hidden">
        <MorphBlob className="top-10 -left-40 w-[600px] h-[600px] text-[#1B3A32]" />
        <MorphBlob className="bottom-0 -right-40 w-[500px] h-[500px] text-[#c43e3e]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <div className={'transition-all duration-1000 ' + (heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
              <FloatingTag className="bg-[#1B3A32]/[0.06] text-[#1B3A32] border border-[#1B3A32]/10 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Ya disponible para profesores
              </FloatingTag>
            </div>
            <h1 className={'font-display text-[3.5rem] md:text-[5.5rem] leading-[0.95] tracking-tight mb-8 transition-all duration-1000 delay-100 ' + (heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
              <span className="text-[#1a1a1a]">El examen</span><br />
              <span className="text-[#1a1a1a]">se adapta </span>
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#1B3A32] to-[#2d6b5a] bg-clip-text text-transparent">al alumno.</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#1B3A32]/[0.06] -rotate-1 rounded-sm" />
              </span>
            </h1>
            <p className={'text-xl md:text-2xl text-[#1a1a1a]/45 max-w-2xl leading-relaxed mb-12 transition-all duration-1000 delay-200 ' + (heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
              Subes un examen. Seleccionas el perfil del alumno.<br className="hidden md:block" />
              Adapto lo reescribe con adaptaciones reales en segundos.
            </p>
            <div className={'flex flex-wrap items-center gap-4 mb-12 transition-all duration-1000 delay-300 ' + (heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
              <Link href="/auditor-dua" className="group inline-flex items-center gap-3 bg-[#1B3A32] text-white font-semibold rounded-full px-8 py-4 hover:bg-[#24493f] hover:shadow-xl hover:shadow-[#1B3A32]/20 transition-all duration-300 hover:-translate-y-0.5 text-base">
                Adaptar mi primer examen
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
              <a href="#como-funciona" className="inline-flex items-center gap-2 text-[#1a1a1a]/50 hover:text-[#1a1a1a] font-medium px-6 py-4 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" /></svg>
                Ver como funciona
              </a>
            </div>
            <div className={'flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 transition-all duration-1000 delay-[400ms] ' + (heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
              <div className="flex -space-x-2">
                {['bg-[#1B3A32]', 'bg-[#c43e3e]', 'bg-[#2f4468]', 'bg-[#e3a23c]', 'bg-[#6b4c9a]'].map((c, i) => (
                  <div key={i} className={'w-9 h-9 rounded-full ' + c + ' border-2 border-[#faf8f5] flex items-center justify-center text-[10px] text-white font-bold shadow-sm'}>
                    {['ML', 'CR', 'AS', 'JP', 'RG'][i]}
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="font-semibold text-[#1a1a1a]">+10.000</span>{' '}
                <span className="text-[#1a1a1a]/40">examenes adaptados por profesores en Espana</span>
              </div>
            </div>
          </div>

          <div className={'hidden lg:block absolute top-32 right-0 w-[480px] transition-all duration-1000 delay-500 ' + (heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12')}>
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-br from-[#1B3A32]/10 to-[#c43e3e]/5 rounded-3xl blur-2xl" />
              <div className="relative bg-white rounded-2xl shadow-2xl shadow-black/[0.06] border border-black/[0.04] overflow-hidden">
                <div className="px-6 py-4 border-b border-black/[0.04] flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-[#1a1a1a]/40 uppercase tracking-wider">Resultado del analisis</p>
                    <p className="text-sm text-[#1a1a1a]/70 mt-0.5">3a Primaria - Lengua</p>
                  </div>
                  <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    APROBADO
                  </div>
                </div>
                <div className="px-6 py-6 flex items-center gap-6">
                  <div className="relative">
                    <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f0f0f0" strokeWidth="2.5" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="82, 100" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-mono-score text-2xl font-bold text-[#1a1a1a]">82</span>
                      <span className="text-[9px] text-[#1a1a1a]/30 font-medium">/100</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#1a1a1a]/50">Adaptaciones</span>
                      <span className="font-semibold text-[#1a1a1a]">12 aplicadas</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/[0.04] rounded-full overflow-hidden">
                      <div className="h-full bg-[#1B3A32] rounded-full" style={{ width: '82%' }} />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#1a1a1a]/50">Criterios LOMLOE</span>
                      <span className="font-semibold text-emerald-600">9/10 conformes</span>
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <div className="bg-[#f0fdf4] rounded-xl p-4 border border-emerald-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-2">Pregunta adaptada</p>
                    <p className="text-sm text-[#1a1a1a]/80 leading-relaxed">
                      Completa la tabla de conjugacion del verbo <strong>&quot;haber&quot;</strong>. Solo los tiempos:{' '}
                      <span className="bg-emerald-100 text-emerald-700 font-semibold px-1.5 py-0.5 rounded">Presente</span>{' '}
                      <span className="bg-emerald-100 text-emerald-700 font-semibold px-1.5 py-0.5 rounded">Preterito</span>{' '}
                      <span className="bg-emerald-100 text-emerald-700 font-semibold px-1.5 py-0.5 rounded">Futuro</span>
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {['he', 'has', 'ha', 'habia', 'habre'].map((w) => (
                        <span key={w} className="text-[10px] bg-blue-50 text-blue-600 border border-blue-100 rounded-full px-2.5 py-0.5 font-medium">{w}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <section className="border-y border-black/[0.04] bg-white/60 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#1a1a1a]/20 mb-8">Disenado con las normativas educativas de</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              { label: 'DUA', full: 'Diseno Universal para el Aprendizaje' },
              { label: 'NEAE', full: 'Necesidades Especificas de Apoyo Educativo' },
              { label: 'LOMLOE', full: 'Ley Organica 3/2020' },
              { label: 'B.O.E.', full: 'Boletin Oficial del Estado' },
            ].map((n) => (
              <div key={n.label} className="flex items-center gap-3 group cursor-default">
                <div className="w-10 h-10 rounded-xl bg-[#1B3A32]/[0.05] border border-[#1B3A32]/10 flex items-center justify-center group-hover:bg-[#1B3A32]/[0.1] transition-colors">
                  <span className="font-mono text-xs font-bold text-[#1B3A32]/60">{n.label.slice(0, 2)}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1a1a1a]/60">{n.label}</p>
                  <p className="text-[10px] text-[#1a1a1a]/25">{n.full}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METRICAS */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: 10000, suffix: '+', label: 'Examenes adaptados', color: 'text-[#1B3A32]' },
              { value: 96, suffix: '%', label: 'Alineacion con marco DUA', color: 'text-emerald-600' },
              { value: 3, suffix: 's', label: 'Tiempo promedio', color: 'text-[#c43e3e]' },
              { value: 15, suffix: '+', label: 'Perfiles de alumno', color: 'text-[#2f4468]' },
            ].map((m) => (
              <div key={m.label} className="text-center group">
                <div className={'font-mono-score text-4xl md:text-5xl font-bold ' + m.color + ' transition-transform duration-300 group-hover:scale-110'}>
                  <AnimatedCounter target={m.value} />{m.suffix}
                </div>
                <p className="text-sm text-[#1a1a1a]/40 mt-2">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="relative py-28 md:py-36">
        <MorphBlob className="top-20 -right-20 w-[400px] h-[400px] text-[#1B3A32]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20">
            <div>
              <FloatingTag className="bg-[#1B3A32]/[0.06] text-[#1B3A32] border border-[#1B3A32]/10 mb-6">Proceso</FloatingTag>
              <h2 className="font-display text-4xl md:text-5xl tracking-tight text-[#1a1a1a]">
                Tres pasos.<br />Cero complicaciones.
              </h2>
            </div>
            <p className="text-[#1a1a1a]/40 text-lg max-w-sm mt-4 md:mt-0">
              Olvidate de adaptar examenes a mano. Adapto lo hace por ti.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-[4.5rem] left-[16%] right-[16%] h-px bg-gradient-to-r from-emerald-300/40 via-amber-300/40 to-[#1B3A32]/40" />
            {[
              { num: '01', color: 'from-emerald-500/10 to-emerald-500/[0.02]', borderColor: 'border-emerald-500/20', iconColor: 'text-emerald-600', iconPath: 'M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z', title: 'Perfil del alumno', desc: 'Curso, materia y dictamen psicopedagogico. TDAH, dislexia, TEL, discalculia...' },
              { num: '02', color: 'from-amber-500/10 to-amber-500/[0.02]', borderColor: 'border-amber-500/20', iconColor: 'text-amber-600', iconPath: 'M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5', title: 'Sube el examen', desc: 'Foto con el movil, PDF directo o texto pegado. Lo que te sea mas facil.' },
              { num: '03', color: 'from-[#1B3A32]/10 to-[#1B3A32]/[0.02]', borderColor: 'border-[#1B3A32]/20', iconColor: 'text-[#1B3A32]', iconPath: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Todo listo', desc: 'Examen reescrito, dictamen tecnico, puntuacion DUA y hoja de apoyos.' },
            ].map((step) => (
              <div key={step.num} className={'group relative bg-gradient-to-b ' + step.color + ' rounded-2xl border ' + step.borderColor + ' p-8 hover:shadow-xl hover:shadow-black/[0.04] transition-all duration-500 hover:-translate-y-1'}>
                <div className={'w-14 h-14 rounded-2xl bg-white border ' + step.borderColor + ' flex items-center justify-center mb-6 ' + step.iconColor + ' group-hover:scale-110 transition-transform duration-300'}>
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d={step.iconPath} /></svg>
                </div>
                <span className="font-mono text-xs text-[#1a1a1a]/20 tracking-widest">{step.num}</span>
                <h3 className="font-display text-xl text-[#1a1a1a] mt-2 mb-3">{step.title}</h3>
                <p className="text-sm text-[#1a1a1a]/45 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE ILLUSTRATIONS */}
      <section className="py-20 bg-white border-y border-black/[0.04]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { ill: 'upload', title: 'Sube en cualquier formato', desc: 'PDF, foto, texto pegado. Adapto lee y procesa el contenido automaticamente.' },
              { ill: 'brain', title: 'IA que entiende educacion', desc: 'No es un traductor. Conoce el marco DUA, los criterios LOMLOE y los perfiles NEAE.' },
              { ill: 'adapt', title: 'Adaptaciones reales', desc: 'No solo acorta texto. Reduce carga cognitiva, anade apoyos visuales y simplifica consignas.' },
            ].map((item) => (
              <div key={item.ill} className="text-center">
                <div className="w-full max-w-[200px] mx-auto mb-6 h-[160px]">
                  <FeatureIllustration variant={item.ill} />
                </div>
                <h3 className="font-display text-lg text-[#1a1a1a] mb-2">{item.title}</h3>
                <p className="text-sm text-[#1a1a1a]/40 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTADO ANTES/DESPUES */}
      <section id="resultado" className="relative py-28 md:py-36">
        <MorphBlob className="bottom-0 -left-20 w-[350px] h-[350px] text-[#c43e3e]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <FloatingTag className="bg-[#c43e3e]/[0.06] text-[#c43e3e] border border-[#c43e3e]/10 mb-6">Transformacion real</FloatingTag>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight text-[#1a1a1a] mb-4">Asi adapta Adapto un examen real.</h2>
            <p className="text-[#1a1a1a]/40 text-lg max-w-xl mx-auto">Mira la diferencia entre el examen original y la version adaptada para un alumno con TDAH.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-black/[0.06] overflow-hidden">
              <div className="px-6 py-4 bg-[#faf8f5] border-b border-black/[0.04] flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1a1a1a]/30">Original</span>
                <span className="text-xs text-[#1a1a1a]/30">Sin adaptar</span>
              </div>
              <div className="p-6 space-y-5">
                {[
                  { n: 'P1', text: 'Completa la siguiente tabla de conjugacion del verbo "haber" en todos sus tiempos verbales.' },
                  { n: 'P2', text: 'Escribe un parrafo de al menos 10 oraciones sobre las consecuencias de la contaminacion en los ecosistemas acuaticos.' },
                  { n: 'P3', text: 'Analiza criticamente el siguiente texto argumentativo e identifica las premisas, el argumento principal y la conclusion del autor.' },
                  { n: 'P4', text: 'Compara y contrasta los conceptos de democracia representativa y democracia directa, proporcionando al menos tres ejemplos historicos de cada una.' },
                ].map((q) => (
                  <div key={q.n} className="flex items-start gap-3">
                    <span className="font-mono text-xs text-[#1a1a1a]/20 mt-1 shrink-0">{q.n}</span>
                    <p className="text-sm text-[#1a1a1a]/60 leading-relaxed">{q.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border-2 border-emerald-200 overflow-hidden shadow-lg shadow-emerald-500/[0.05]">
              <div className="px-6 py-4 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Adaptado para TDAH</span>
                <span className="text-xs text-emerald-500 font-semibold">12 adaptaciones</span>
              </div>
              <div className="p-6 space-y-5">
                {[
                  { n: 'P1', text: 'Completa la tabla de conjugacion del verbo "haber". Solo:', tags: ['Presente', 'Preterito', 'Futuro'], words: ['he', 'has', 'ha', 'habia', 'habre'] },
                  { n: 'P2', text: 'Escribe 5 oraciones sobre la contaminacion. Usa estas palabras:', tags: null, words: ['contaminacion', 'agua', 'reciclar', 'planeta'] },
                  { n: 'P3', text: 'Lee el texto. Subraya la conclusion del autor.', tags: null, hint: 'Busca la frase que resume lo que el autor piensa sobre el tema.' },
                  { n: 'P4', text: 'Elige: democracia representativa o directa? Escribe por que con 2 razones.', tags: null, hint: 'Piensa en como se elige al presidente de tu comunidad.' },
                ].map((q) => (
                  <div key={q.n} className="flex items-start gap-3">
                    <span className="font-mono text-xs text-emerald-500/60 mt-1 shrink-0">{q.n}</span>
                    <div className="flex-1">
                      <p className="text-sm text-[#1a1a1a]/80 leading-relaxed">{q.text}</p>
                      {q.tags && <div className="flex flex-wrap gap-1.5 mt-2">{q.tags.map((t) => <span key={t} className="text-[10px] bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">{t}</span>)}</div>}
                      {q.words && <div className="flex flex-wrap gap-1.5 mt-2">{q.words.map((w) => <span key={w} className="text-[10px] bg-blue-50 text-blue-600 border border-blue-100 rounded-full px-2.5 py-0.5 font-medium">{w}</span>)}</div>}
                      {q.hint && <div className="mt-2 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2"><p className="text-[11px] text-amber-700"><span className="font-semibold">Pista: </span>{q.hint}</p></div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* TESTIMONIOS */}
      <section className="py-28 md:py-36 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <FloatingTag className="bg-[#6b4c9a]/[0.06] text-[#6b4c9a] border border-[#6b4c9a]/10 mb-6">Testimonios</FloatingTag>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight text-[#1a1a1a]">Profesores reales, resultados reales.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Maria L.', role: 'Prof. Primaria, Madrid', initials: 'ML', color: 'bg-[#1B3A32]', text: 'Pasaba 2 horas adaptando cada examen. Ahora lo tengo en 30 segundos. El dictamen psicopedagogico que genera es de un nivel que yo no alcanzaba.' },
              { name: 'Carlos R.', role: 'Prof. Secundaria, Sevilla', initials: 'CR', color: 'bg-[#c43e3e]', text: 'Lo uso con mis alumnos de TDAH. Las adaptaciones son reales: bancos de palabras, tiempos reducidos, pistas. No es un simple acortador de texto.' },
              { name: 'Ana S.', role: 'Orientadora, Barcelona', initials: 'AS', color: 'bg-[#2f4468]', text: 'El informe DUA que genera es impecable. Lo aportamos en las reuniones de CCP y facilita enormemente la justificacion tecnica de las medidas adoptadas.' },
            ].map((t) => (
              <div key={t.name} className="bg-[#faf8f5] rounded-2xl border border-black/[0.04] p-7 hover:shadow-lg hover:shadow-black/[0.04] transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#e3a23c]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-sm text-[#1a1a1a]/60 leading-relaxed mb-6">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-black/[0.04]">
                  <div className={'w-9 h-9 rounded-full ' + t.color + ' flex items-center justify-center text-[10px] text-white font-bold'}>{t.initials}</div>
                  <div>
                    <p className="text-sm font-semibold text-[#1a1a1a]">{t.name}</p>
                    <p className="text-xs text-[#1a1a1a]/30">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 md:py-36">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center mb-16">
            <FloatingTag className="bg-[#e3a23c]/[0.06] text-[#e3a23c] border border-[#e3a23c]/10 mb-6">Preguntas frecuentes</FloatingTag>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight text-[#1a1a1a]">Resolvemos tus dudas.</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-black/[0.06] overflow-hidden bg-white transition-all duration-300 hover:border-black/[0.1]">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left">
                  <span className="font-display text-base text-[#1a1a1a] pr-4">{faq.q}</span>
                  <svg className={'w-5 h-5 text-[#1a1a1a]/30 shrink-0 transition-transform duration-300 ' + (openFaq === i ? 'rotate-180' : '')} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </button>
                <div className={'grid transition-all duration-300 ' + (openFaq === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm text-[#1a1a1a]/45 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* PRECIOS */}
      <section id="precios" className="relative py-28 md:py-36 bg-white">
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <FloatingTag className="bg-[#2f4468]/[0.06] text-[#2f4468] border border-[#2f4468]/10 mb-6">Precios</FloatingTag>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight text-[#1a1a1a] mb-4">Simple, justo, sin sorpresas.</h2>
            <div className="inline-flex items-center gap-1 bg-black/[0.03] rounded-full p-1 mt-8">
              <button onClick={() => setAnnual(false)} className={'text-sm px-5 py-2.5 rounded-full transition-all duration-300 ' + (!annual ? 'bg-white text-[#1a1a1a] shadow-sm' : 'text-[#1a1a1a]/40 hover:text-[#1a1a1a]/60')}>Mensual</button>
              <button onClick={() => setAnnual(true)} className={'text-sm px-5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 ' + (annual ? 'bg-white text-[#1a1a1a] shadow-sm' : 'text-[#1a1a1a]/40 hover:text-[#1a1a1a]/60')}>
                Anual<span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">-20%</span>
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
            <div className="bg-[#faf8f5] rounded-2xl border border-black/[0.06] p-8 hover:shadow-xl hover:shadow-black/[0.04] transition-all duration-500 hover:-translate-y-1">
              <h3 className="font-display text-xl text-[#1a1a1a]">Basico</h3>
              <p className="text-sm text-[#1a1a1a]/40 mt-1 mb-6">Para uso puntual</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-mono-score text-5xl font-bold text-[#1a1a1a]">{annual ? '12' : '15'}</span>
                <span className="text-[#1a1a1a]/40 text-sm">EUR/mes</span>
              </div>
              <ul className="space-y-3 mb-8">
                {['20 adaptaciones al mes', 'PDF descargable', 'Examen adaptado', '5 perfiles'].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[#1a1a1a]/60">
                    <svg className="w-4 h-4 text-[#1B3A32] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/auditor-dua" className="block text-center border border-[#1B3A32]/20 text-[#1B3A32] hover:bg-[#1B3A32] hover:text-white font-semibold rounded-xl px-4 py-3 transition-all duration-300 text-sm">Empezar</Link>
            </div>
            <div className="relative bg-[#1B3A32] text-white rounded-2xl p-8 shadow-2xl shadow-[#1B3A32]/20 scale-[1.03] md:scale-105">
              <span className="absolute -top-3.5 left-8 text-[10px] font-bold uppercase tracking-wider bg-[#e3a23c] text-[#1a1a1a] rounded-full px-3 py-1">Mas elegido</span>
              <h3 className="font-display text-xl">Pro</h3>
              <p className="text-sm text-white/50 mt-1 mb-6">Para uso semanal real</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-mono-score text-5xl font-bold">{annual ? '28' : '35'}</span>
                <span className="text-white/40 text-sm">EUR/mes</span>
              </div>
              <ul className="space-y-3 mb-8">
                {['Adaptaciones ilimitadas', 'PDF sin marca de agua', 'Historico guardado', '15 perfiles', 'Soporte prioritario'].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/70">
                    <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/auditor-dua" className="block text-center bg-white text-[#1B3A32] hover:bg-white/90 font-semibold rounded-xl px-4 py-3 transition-all duration-300 text-sm">Empezar con Pro</Link>
            </div>
            <div className="bg-[#faf8f5] rounded-2xl border border-black/[0.06] p-8 hover:shadow-xl hover:shadow-black/[0.04] transition-all duration-500 hover:-translate-y-1">
              <h3 className="font-display text-xl text-[#1a1a1a]">Centros</h3>
              <p className="text-sm text-[#1a1a1a]/40 mt-1 mb-6">Colegios y academias</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-mono-score text-4xl font-bold text-[#1a1a1a]">A medida</span>
              </div>
              <ul className="space-y-3 mb-8">
                {['Precio por asiento', 'Panel de administracion', 'Soporte dedicado', 'SLA garantizado'].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[#1a1a1a]/60">
                    <svg className="w-4 h-4 text-[#1B3A32] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/auditor-dua" className="block text-center border border-[#1B3A32]/20 text-[#1B3A32] hover:bg-[#1B3A32] hover:text-white font-semibold rounded-xl px-4 py-3 transition-all duration-300 text-sm">Hablemos</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative py-24 md:py-32 bg-[#1B3A32] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#c43e3e]/[0.05] rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-4xl md:text-6xl text-white tracking-tight mb-6">Adaptar un examen<br />nunca fue tan facil.</h2>
          <p className="text-lg text-white/40 max-w-lg mx-auto mb-10">Sube tu primer examen ahora. Gratis, sin registro, sin compromiso.</p>
          <Link href="/auditor-dua" className="group inline-flex items-center gap-3 bg-white text-[#1B3A32] font-semibold rounded-full px-10 py-4 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:-translate-y-0.5 text-base">
            Adaptar mi primer examen
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/[0.04] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#1B3A32] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <span className="flex items-baseline">
              <span className="font-display italic text-xl text-[#1B3A32]">Adap</span>
              <span className="font-display italic text-xl text-[#c43e3e]">to</span>
            </span>
          </div>
          <div className="flex items-center gap-8">
            {['Como funciona', 'Resultado', 'Precios'].map((s) => (
              <a key={s} href={'#' + s.toLowerCase().replace(/ /g, '-')} className="text-sm text-[#1a1a1a]/30 hover:text-[#1a1a1a]/60 transition-colors">{s}</a>
            ))}
          </div>
          <span className="text-xs text-[#1a1a1a]/20">&copy; {new Date().getFullYear()} Adapto. Hecho para profesores.</span>
        </div>
      </footer>
    </div>
  );
}
