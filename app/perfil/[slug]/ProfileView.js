'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const PINE = '#1B3A32';

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`${className} transition-all duration-700 ease-out will-change-transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {children}
    </div>
  );
}

function SectionHeading({ label, title, description }) {
  return (
    <div className="mb-6">
      <span className="text-[11px] font-semibold text-[#1a1a1a]/40 uppercase tracking-wider">{label}</span>
      <h2 className="font-display text-2xl md:text-3xl tracking-tight text-[#1a1a1a] mt-1.5">{title}</h2>
      {description && <p className="text-sm text-[#1a1a1a]/40 mt-2 max-w-2xl leading-relaxed">{description}</p>}
    </div>
  );
}

function Accordion({ open, onToggle, label, title, iconChip, children }) {
  return (
    <div className="bg-white rounded-3xl border border-black/[0.04] shadow-xl shadow-black/[0.03] overflow-hidden">
      <button type="button" onClick={onToggle} aria-expanded={open} className="w-full flex items-center gap-4 md:gap-5 px-6 md:px-8 py-6 text-left cursor-pointer group">
        {iconChip}
        <div className="flex-1 min-w-0">
          <span className="text-[11px] font-semibold text-[#1a1a1a]/40 uppercase tracking-wider">{label}</span>
          <h2 className={`font-display text-xl md:text-2xl tracking-tight mt-0.5 transition-colors ${open ? 'text-[#1B3A32]' : 'text-[#1a1a1a] group-hover:text-[#1B3A32]'}`}>{title}</h2>
        </div>
        <div className={`shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${open ? 'bg-[#1B3A32] border-[#1B3A32] rotate-180' : 'border-black/[0.06] group-hover:bg-[#faf8f5]'}`}>
          <svg className={`w-4 h-4 ${open ? 'text-white' : 'text-[#1a1a1a]/30'}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
        </div>
      </button>
      <div className={`grid transition-all duration-500 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="px-6 md:px-8 pb-8 pt-1">{children}</div>
        </div>
      </div>
    </div>
  );
}

function splitIntoChunks(text, maxLen = 280) {
  if (!text || text.length <= maxLen) return [text || ''];
  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks = [];
  let current = '';
  for (const s of sentences) {
    if ((current + ' ' + s).length > maxLen && current) { chunks.push(current.trim()); current = s; }
    else current = current ? current + ' ' + s : s;
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

export default function ProfileView({ perfil }) {
  const accent = perfil.accentColor || PINE;
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [queEsOpen, setQueEsOpen] = useState(true);
  const [impactoOpen, setImpactoOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(window.scrollY / total, 1) : 0);
      setShowTop(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const impactChunks = splitIntoChunks(perfil.impactInExams, 300);
  const adaptations = perfil.adaptationsWeSeek || [];
  const redFlags = perfil.examRedFlags || [];
  const studies = perfil.studies || [];
  const resources = perfil.resources || [];

  const queEsChip = (
    <div className="shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${accent}12` }}>
      <svg className="w-5 h-5" style={{ color: accent }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>
    </div>
  );

  const impactoChip = (
    <div className="shrink-0 w-11 h-11 rounded-2xl bg-[#c43e3e]/[0.08] flex items-center justify-center">
      <svg className="w-5 h-5 text-[#c43e3e]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" /></svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a1a1a]">
      {/* PROGRESS BAR */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-black/[0.03]">
        <div className="h-full" style={{ width: `${progress * 100}%`, background: `linear-gradient(90deg, ${accent}, ${PINE})` }} />
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ backgroundColor: accent }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(1000px 480px at 12% -10%, rgba(255,255,255,0.22), transparent 60%), radial-gradient(800px 420px at 95% 115%, rgba(0,0,0,0.28), transparent 60%)' }} />
        <div className="absolute -top-28 -right-24 w-[420px] h-[420px] rounded-full bg-white/[0.05] pointer-events-none" />
        <div className="absolute top-48 -left-36 w-80 h-80 rounded-full bg-black/[0.07] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 pt-7 pb-16 md:pt-9 md:pb-24">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors group">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
            Volver al inicio
          </Link>

          <div className="mt-12 md:mt-16 flex flex-col md:flex-row md:items-end gap-8 md:gap-12">
            <div className="shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-5xl md:text-6xl shadow-2xl shadow-black/20 select-none">
              {perfil.icon || '📘'}
            </div>
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/80">Prevalencia · {perfil.prevalence}</span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl tracking-tight text-white leading-[1.05]">{perfil.name}</h1>
              <p className="text-base md:text-lg text-white/65 leading-relaxed mt-5 max-w-2xl">{perfil.shortDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS ROW */}
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="-mt-10 md:-mt-12 relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-black/[0.04] shadow-xl shadow-black/[0.03] p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${accent}14` }}>
              <svg className="w-5 h-5" style={{ color: accent }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-[#1a1a1a]/40 uppercase tracking-wider">Prevalencia</p>
              <p className="text-sm font-semibold text-[#1a1a1a] mt-1 leading-snug">{perfil.prevalence}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-black/[0.04] shadow-xl shadow-black/[0.03] p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${accent}14` }}>
              <svg className="w-5 h-5" style={{ color: accent }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" /></svg>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-[#1a1a1a]/40 uppercase tracking-wider">Categoría</p>
              <p className="text-sm font-semibold text-[#1a1a1a] mt-1 leading-snug">{perfil.group}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-black/[0.04] shadow-xl shadow-black/[0.03] p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${accent}14` }}>
              <svg className="w-5 h-5" style={{ color: accent }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" /></svg>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-[#1a1a1a]/40 uppercase tracking-wider">Adaptaciones</p>
              <p className="text-sm font-semibold text-[#1a1a1a] mt-1 leading-snug">{adaptations.length} adaptaciones clave</p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 pt-12 md:pt-16 pb-16 space-y-12 md:space-y-16">
        {/* ACCORDION: QUE ES */}
        <section>
          <Accordion open={queEsOpen} onToggle={() => setQueEsOpen(!queEsOpen)} label="Definición" title="Qué es" iconChip={queEsChip}>
            <div className="space-y-4">
              {splitIntoChunks(perfil.fullDescription, 400).map((chunk, i) => (
                <p key={i} className="text-[15px] md:text-base text-[#1a1a1a]/60 leading-relaxed">{chunk}</p>
              ))}
            </div>
          </Accordion>
        </section>

        {/* ACCORDION: IMPACTO EN EXAMENES */}
        <section>
          <Accordion open={impactoOpen} onToggle={() => setImpactoOpen(!impactoOpen)} label="Banderas rojas" title="Impacto en exámenes" iconChip={impactoChip}>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-[#c43e3e]" />
              <p className="text-xs text-[#1a1a1a]/40">Barreras frecuentes que este perfil encuentra en una evaluación tradicional.</p>
            </div>
            <div className="space-y-4">
              {impactChunks.map((chunk, i) => (
                <Reveal key={i} delay={i * 90}>
                  <div className="rounded-2xl bg-[#c43e3e]/[0.03] border border-[#c43e3e]/[0.12] p-5 hover:bg-[#c43e3e]/[0.05] transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#c43e3e]/10 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-[#c43e3e]" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
                      </div>
                      <h3 className="text-sm font-semibold text-[#1a1a1a]">Impacto {i + 1}</h3>
                    </div>
                    <p className="text-sm text-[#1a1a1a]/45 leading-relaxed">{chunk}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* RED FLAGS LIST */}
            {redFlags.length > 0 && (
              <div className="mt-6 space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#c43e3e]/50 mb-3">Banderas rojas en el examen</p>
                {redFlags.map((flag, i) => (
                  <Reveal key={i} delay={i * 60}>
                    <div className="flex items-start gap-3 py-2">
                      <div className="w-5 h-5 rounded-full bg-[#c43e3e]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-[#c43e3e]" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      </div>
                      <p className="text-sm text-[#1a1a1a]/50 leading-relaxed">{flag}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </Accordion>
        </section>

        {/* CHECKLIST: ADAPTACIONES */}
        <section>
          <SectionHeading label="Adaptaciones" title="Adaptaciones que buscamos" description="Los apoyos que el auditor DUA aplica automáticamente al adaptar un examen para este perfil." />
          <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
            {adaptations.map((item, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="h-full bg-white rounded-2xl border border-black/[0.04] shadow-sm p-4 md:p-5 flex items-start gap-4 hover:shadow-xl hover:shadow-black/[0.03] hover:-translate-y-0.5 transition-all duration-300">
                  <div className="w-9 h-9 rounded-xl text-white font-mono-score font-bold text-sm flex items-center justify-center shrink-0" style={{ backgroundColor: accent }}>{i + 1}</div>
                  <p className="text-sm text-[#1a1a1a]/70 leading-relaxed flex-1">{item}</p>
                  <svg className="w-4 h-4 text-[#1B3A32]/40 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ESTUDIOS CIENTIFICOS */}
        {studies.length > 0 && (
          <section>
            <SectionHeading label="Evidencia" title="Estudios científicos" description="Investigación revisada por pares que respalda las adaptaciones recomendadas." />
            <div className="grid md:grid-cols-2 gap-4">
              {studies.map((estudio, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="h-full bg-white rounded-2xl border border-black/[0.04] shadow-xl shadow-black/[0.03] p-6 flex flex-col">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="font-mono-score text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: `${accent}12`, color: accent }}>{estudio.year}</span>
                      {estudio.url && (
                        <a href={estudio.url} target="_blank" rel="noopener noreferrer" className="text-[11px] font-semibold text-[#1a1a1a]/30 hover:text-[#1B3A32] transition-colors inline-flex items-center gap-1">
                          Ver estudio
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                        </a>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-[#1a1a1a]">{estudio.authors}</h3>
                    <p className="text-xs italic text-[#1a1a1a]/35 mt-0.5">{estudio.journal}</p>
                    <p className="text-sm text-[#1a1a1a]/55 leading-relaxed mt-3 flex-1">{estudio.finding}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* RECURSOS */}
        {resources.length > 0 && (
          <section>
            <SectionHeading label="Para profundizar" title="Recursos" />
            <div className="space-y-3">
              {resources.map((recurso, i) => (
                <Reveal key={i} delay={i * 70}>
                  <a href={recurso.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 bg-white rounded-2xl border border-black/[0.04] shadow-sm px-5 py-4 hover:border-[#1B3A32]/20 hover:shadow-xl hover:shadow-black/[0.03] hover:-translate-y-0.5 transition-all duration-300 group">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-[#1a1a1a] group-hover:text-[#1B3A32] transition-colors">{recurso.name}</h3>
                      {recurso.description && <p className="text-xs text-[#1a1a1a]/40 mt-0.5 truncate">{recurso.description}</p>}
                    </div>
                    <div className="w-9 h-9 rounded-full bg-[#faf8f5] border border-black/[0.04] flex items-center justify-center shrink-0 group-hover:bg-[#1B3A32] transition-colors duration-300">
                      <svg className="w-4 h-4 text-[#1a1a1a]/30 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <Reveal>
          <section className="relative overflow-hidden rounded-3xl px-8 py-12 md:py-16 text-center text-white" style={{ background: `linear-gradient(130deg, ${PINE} 0%, ${accent} 100%)` }}>
            <div className="absolute -top-20 -right-16 w-64 h-64 rounded-full bg-white/[0.06] pointer-events-none" />
            <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-black/[0.08] pointer-events-none" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/80">Listo para el aula</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl tracking-tight">Adapta un examen para este perfil</h2>
              <p className="text-white/60 text-sm md:text-base mt-3 max-w-xl mx-auto leading-relaxed">Sube el examen y Adapto aplicará automáticamente las adaptaciones DUA recomendadas para «{perfil.name}».</p>
              <Link href="/auditor-dua" className="mt-8 inline-flex items-center gap-2 bg-white font-semibold rounded-full px-8 py-4 text-sm hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300" style={{ color: PINE }}>
                Adaptar un examen para este perfil
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>
          </section>
        </Reveal>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-black/[0.04]">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col items-center gap-4 text-center">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1B3A32] to-[#2d6b5a] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20L12 4L20 20" /><path d="M7.5 14H16.5" /></svg>
            </div>
            <span className="flex items-baseline">
              <span className="font-display text-xl text-[#1a1a1a] tracking-tight">adap</span>
              <span className="font-display text-xl text-[#1B3A32] tracking-tight">to</span>
            </span>
          </Link>
          <p className="text-xs text-[#1a1a1a]/30 max-w-md leading-relaxed">Perfil NEAE · DUA / LOMLOE · La información es orientativa y no sustituye el dictamen del orientador del centro.</p>
          <Link href="/" className="text-xs font-medium text-[#1a1a1a]/40 hover:text-[#1B3A32] transition-colors inline-flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
            Volver a Adapto
          </Link>
        </div>
      </footer>

      {/* BACK TO TOP */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Volver arriba"
        className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-[#1B3A32] text-white shadow-xl shadow-[#1B3A32]/25 flex items-center justify-center transition-all duration-300 hover:bg-[#24493f] hover:-translate-y-1 cursor-pointer ${showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" /></svg>
      </button>
    </div>
  );
}
