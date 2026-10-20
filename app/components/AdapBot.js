'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const SUGGESTIONS_MAP = {
  'TDAH': ['Por que se reducen las preguntas?', 'Que adaptaciones son validas para inspeccion?', 'Como adaptar un examen de matematicas?'],
  'Dislexia': ['Por que usar bancos de palabras?', 'Que tipografia es la mejor?', 'Como evaluar comprension lectora?'],
  'default': ['Que adaptaciones recomiendas?', 'Explica el principio DUA', 'Como justificar ante inspeccion?'],
};

function getSuggestions(perfil) {
  if (!perfil) return SUGGESTIONS_MAP.default;
  const upper = perfil.toUpperCase();
  if (upper.includes('TDAH')) return SUGGESTIONS_MAP.TDAH;
  if (upper.includes('DISLEXIA') || upper.includes('LECTURA')) return SUGGESTIONS_MAP.Dislexia;
  if (upper.includes('TEA')) return ['Por que la literalidad importa?', 'Como estructurar consignas?', 'Que rutinas funcionan?'];
  if (upper.includes('ANSIEDAD')) return ['Como reducir la presion?', 'Que formato es menos estresante?', 'Se puede flexibilizar el tiempo?'];
  if (upper.includes('CALCULIA') || upper.includes('MATE')) return ['Por que manipulativos ayudan?', 'Como simplificar enunciados?', 'Se permite calculadora?'];
  return SUGGESTIONS_MAP.default;
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5 px-1">
      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#1B3A32] to-[#2d6b5a] flex items-center justify-center shrink-0 shadow-sm">
        <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20L12 4L20 20" /><path d="M7.5 14H16.5" /></svg>
      </div>
      <div className="bg-white border border-black/[0.06] rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1B3A32]/30 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-[#1B3A32]/30 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-[#1B3A32]/30 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ msg, isLast }) {
  const isUser = msg.rol === 'usuario';
  return (
    <div className={`flex items-end gap-2.5 px-1 ${isUser ? 'flex-row-reverse' : ''} ${isLast ? 'animate-[fadeSlideIn_0.3s_ease-out]' : ''}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#1B3A32] to-[#2d6b5a] flex items-center justify-center shrink-0 shadow-sm">
          <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20L12 4L20 20" /><path d="M7.5 14H16.5" /></svg>
        </div>
      )}
      <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
        isUser
          ? 'bg-[#1B3A32] text-white rounded-br-md'
          : 'bg-white border border-black/[0.06] text-[#1a1a1a]/80 rounded-bl-md'
      }`}>
        <p className="whitespace-pre-wrap">{msg.texto}</p>
      </div>
      {isUser && (
        <div className="w-7 h-7 rounded-lg bg-[#1B3A32]/10 flex items-center justify-center shrink-0">
          <svg className="w-3.5 h-3.5 text-[#1B3A32]" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
        </div>
      )}
    </div>
  );
}

export default function AdapBot({ perfil, resultado, curso, materia, esPro }) {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState('');
  const [cargando, setCargando] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const suggestions = getSuggestions(perfil);

  useEffect(() => {
    if (abierto) {
      const t = setTimeout(() => { setShowPanel(true); }, 10);
      const t2 = setTimeout(() => { inputRef.current?.focus(); }, 300);
      return () => { clearTimeout(t); clearTimeout(t2); };
    } else {
      setShowPanel(false);
    }
  }, [abierto]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes, cargando]);

  const enviar = useCallback(async (texto) => {
    if (!texto.trim() || cargando) return;
    const userMsg = { rol: 'usuario', texto: texto.trim() };
    setMensajes((prev) => [...prev, userMsg]);
    setInput('');
    setCargando(true);
    try {
      const res = await fetch('/api/adapbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mensaje: texto.trim(),
          historial: [...mensajes, userMsg].map((m) => ({ rol: m.rol, texto: m.texto })),
          perfil: esPro ? perfil : undefined,
          resultado: esPro && resultado ? {
            puntuacion_accesibilidad: resultado.puntuacion_accesibilidad,
            estado_cumplimiento: resultado.estado_cumplimiento,
            dictamen_general: resultado.dictamen_general,
            examen_adaptado: resultado.examen_adaptado?.map((p) => ({
              numero: p.numero,
              enunciado_adaptado: p.enunciado_adaptado,
              justificacion_adaptacion: p.justificacion_adaptacion,
            })),
          } : null,
          curso: esPro ? curso : undefined,
          materia: esPro ? materia : undefined,
          es_pro: esPro,
        }),
      });
      const data = await res.json();
      setMensajes((prev) => [...prev, { rol: 'bot', texto: data.respuesta || data.error || 'Sin respuesta.' }]);
    } catch {
      setMensajes((prev) => [...prev, { rol: 'bot', texto: 'Error de conexion. Intenta de nuevo.' }]);
    } finally {
      setCargando(false);
    }
  }, [mensajes, perfil, resultado, curso, materia, cargando, esPro]);

  const handleSubmit = (e) => {
    e.preventDefault();
    enviar(input);
  };

  return (
    <>
      <style jsx global>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* CHAT PANEL */}
      {abierto && (
        <div className={`mb-4 transition-all duration-500 ease-out ${showPanel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="bg-[#faf8f5] rounded-3xl border border-black/[0.06] shadow-2xl shadow-black/[0.08] overflow-hidden flex flex-col" style={{ height: '480px' }}>
            {/* HEADER */}
            <div className="relative bg-gradient-to-r from-[#1B3A32] to-[#2d6b5a] px-5 py-4 flex items-center gap-3 shrink-0">
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1), transparent 60%)' }} />
              <div className="relative w-10 h-10 rounded-xl bg-white/15 border border-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20L12 4L20 20" /><path d="M7.5 14H16.5" /></svg>
              </div>
              <div className="relative flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white tracking-tight">AdapBot</h3>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {!esPro && <span className="text-[9px] font-bold text-white/40 bg-white/10 px-1.5 py-0.5 rounded-full">Basico</span>}
                </div>
                <p className="text-[11px] text-white/50 truncate">{esPro ? (perfil || 'Asistente de adaptaciones') : 'Preguntas generales sobre adaptaciones'}</p>
              </div>
              <button
                type="button"
                onClick={() => setAbierto(false)}
                className="relative w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth">
              {mensajes.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1B3A32]/[0.08] to-[#1B3A32]/[0.02] border border-[#1B3A32]/10 flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-[#1B3A32]/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20L12 4L20 20" /><path d="M7.5 14H16.5" /></svg>
                  </div>
                  <p className="text-sm font-semibold text-[#1a1a1a]/60 mb-1">Hola, soy AdapBot</p>
                  {esPro ? (
                    <p className="text-xs text-[#1a1a1a]/35 leading-relaxed max-w-[240px]">Preguntame sobre las adaptaciones aplicadas, el perfil del alumno o normativa DUA.</p>
                  ) : (
                    <p className="text-xs text-[#1a1a1a]/35 leading-relaxed max-w-[240px]">Preguntas generales sobre adaptaciones educativas y perfiles NEAE. Para contexto personalizado, actualiza a Pro.</p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-5 justify-center">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => enviar(s)}
                        className="text-[11px] font-medium text-[#1B3A32]/60 bg-[#1B3A32]/[0.04] hover:bg-[#1B3A32]/[0.08] border border-[#1B3A32]/10 rounded-full px-3 py-1.5 transition-colors cursor-pointer"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {mensajes.map((msg, i) => (
                <MessageBubble key={i} msg={msg} isLast={i === mensajes.length - 1} />
              ))}
              {cargando && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* QUICK SUGGESTIONS (after messages) */}
            {mensajes.length > 0 && !cargando && (
              <div className="px-4 pb-2 flex gap-1.5 overflow-x-auto no-scrollbar">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => enviar(s)}
                    className="shrink-0 text-[10px] font-medium text-[#1B3A32]/50 bg-[#1B3A32]/[0.03] hover:bg-[#1B3A32]/[0.07] border border-[#1B3A32]/8 rounded-full px-2.5 py-1 transition-colors cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* INPUT */}
            <form onSubmit={handleSubmit} className="px-4 pb-4 pt-1 shrink-0">
              <div className="flex items-center gap-2 bg-white rounded-2xl border border-black/[0.06] shadow-sm px-3 py-2 focus-within:border-[#1B3A32]/20 focus-within:shadow-md focus-within:shadow-[#1B3A32]/[0.04] transition-all duration-300">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Preguntale a AdapBot..."
                  disabled={cargando}
                  className="flex-1 text-sm text-[#1a1a1a] placeholder:text-[#1a1a1a]/25 outline-none bg-transparent disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || cargando}
                  className="w-8 h-8 rounded-xl bg-[#1B3A32] hover:bg-[#24493f] disabled:bg-[#1B3A32]/30 text-white flex items-center justify-center transition-all duration-200 cursor-pointer disabled:cursor-default shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FAB BUTTON */}
      {!abierto && (
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setAbierto(true)}
            className="group relative w-full"
          >
            <div className="relative flex items-center justify-center gap-4 bg-gradient-to-r from-[#1B3A32] to-[#2d6b5a] text-white rounded-2xl pl-6 pr-6 py-5 shadow-xl shadow-[#1B3A32]/25 hover:shadow-2xl hover:shadow-[#1B3A32]/30 hover:-translate-y-0.5 transition-all duration-300 border border-[#1B3A32]/20">
              <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20L12 4L20 20" /><path d="M7.5 14H16.5" /></svg>
              </div>
              <div className="text-left flex-1">
                <p className="text-sm font-bold tracking-tight leading-none">AdapBot</p>
                <p className="text-xs text-white/50 mt-1">Preguntame sobre las adaptaciones, el perfil del alumno o la normativa DUA</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <svg className="w-5 h-5 text-white/40 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </div>
            </div>
          </button>
        </div>
      )}
    </>
  );
}
