'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

const PINE = '#1B3A32';

function ConfidenceRing({ value, size = 80, color }) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const c = color || (value >= 70 ? '#10b981' : value >= 40 ? '#f59e0b' : '#ef4444');
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#f0f0f0" strokeWidth="4" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={c} strokeWidth="4" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono-score text-lg font-bold" style={{ color: c }}>{value}</span>
        <span className="text-[8px] text-[#1a1a1a]/30 font-medium">%confianza</span>
      </div>
    </div>
  );
}

function PatternBar({ patron, evidencia, frecuencia }) {
  const width = frecuencia === 'alta' ? '100%' : frecuencia === 'media' ? '65%' : '35%';
  const barColor = frecuencia === 'alta' ? '#1B3A32' : frecuencia === 'media' ? '#f59e0b' : '#94a3b8';
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#1a1a1a]/70">{patron}</span>
        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: barColor }}>{frecuencia}</span>
      </div>
      <div className="h-1.5 bg-black/[0.04] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width, backgroundColor: barColor }} />
      </div>
      <p className="text-[11px] text-[#1a1a1a]/40 leading-relaxed">{evidencia}</p>
    </div>
  );
}

function DiagnosisCard({ diag, index }) {
  const [expanded, setExpanded] = useState(false);
  const accents = ['#1B3A32', '#2d6b5a', '#2f4468', '#6b4c9a'];
  const accent = accents[index % accents.length];

  return (
    <div className="bg-white rounded-3xl border border-black/[0.04] shadow-xl shadow-black/[0.03] overflow-hidden hover:shadow-2xl hover:shadow-black/[0.06] transition-all duration-500">
      {/* CARD HEADER */}
      <div className="relative px-6 py-5 border-b border-black/[0.04]">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none" style={{ backgroundColor: `${accent}06`, transform: 'translate(30%, -30%)' }} />
        <div className="flex items-start gap-5">
          <ConfidenceRing value={diag.confianza} color={accent} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: `${accent}80` }}>Hipotesis #{index + 1}</span>
            </div>
            <h3 className="font-display text-xl tracking-tight text-[#1a1a1a]">{diag.perfil}</h3>
            <Link href={`/perfil/${diag.slug}`} className="inline-flex items-center gap-1.5 mt-2 text-[11px] font-semibold transition-colors group" style={{ color: accent }}>
              Ver ficha completa
              <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
          </div>
        </div>
      </div>

      {/* EXPLICACION */}
      <div className="px-6 py-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: `${accent}12` }}>
            <svg className="w-3.5 h-3.5" style={{ color: accent }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/40">Por que este diagnostico</span>
        </div>
        <p className="text-sm text-[#1a1a1a]/60 leading-relaxed">{diag.explicacion_detallada}</p>
      </div>

      {/* PATRONES DETECTADOS */}
      {diag.patrones_detectados?.length > 0 && (
        <div className="px-6 pb-5">
          <button type="button" onClick={() => setExpanded(!expanded)} className="flex items-center gap-2 mb-3 cursor-pointer group">
            <div className="w-6 h-6 rounded-md bg-[#1B3A32]/[0.06] flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-[#1B3A32]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" /></svg>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/40 group-hover:text-[#1a1a1a]/60 transition-colors">
              {expanded ? 'Ocultar' : 'Ver'} {diag.patrones_detectados.length} patrones detectados
            </span>
            <svg className={`w-3 h-3 text-[#1a1a1a]/25 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
          </button>
          <div className={`grid transition-all duration-500 ease-in-out ${expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
              <div className="space-y-4 pt-1 pb-2">
                {diag.patrones_detectados.map((p, i) => (
                  <PatternBar key={i} {...p} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DESCARTES */}
      {diag.descartes?.length > 0 && (
        <div className="px-6 pb-5">
          <div className="bg-[#faf8f5] rounded-xl p-4 border border-black/[0.04]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/30 mb-2.5">Perfiles descartados</p>
            <div className="space-y-2">
              {diag.descartes.map((d, i) => (
                <div key={i} className="flex items-start gap-2">
                  <svg className="w-3.5 h-3.5 text-[#1a1a1a]/15 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  <div>
                    <span className="text-xs font-semibold text-[#1a1a1a]/50">{d.perfil}</span>
                    <span className="text-xs text-[#1a1a1a]/30"> — {d.razon}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProcessingSkeleton() {
  return (
    <div className="space-y-6 animate-[fadeSlideIn_0.5s_ease-out]">
      {[1, 2].map((i) => (
        <div key={i} className="bg-white rounded-3xl border border-black/[0.04] shadow-xl shadow-black/[0.03] p-6">
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 rounded-full bg-black/[0.04] animate-pulse" />
            <div className="flex-1 space-y-3">
              <div className="h-3 bg-black/[0.04] rounded-full w-20 animate-pulse" />
              <div className="h-5 bg-black/[0.04] rounded-full w-64 animate-pulse" />
              <div className="h-3 bg-black/[0.04] rounded-full w-32 animate-pulse" />
            </div>
          </div>
          <div className="mt-5 space-y-3">
            <div className="h-3 bg-black/[0.04] rounded-full w-full animate-pulse" />
            <div className="h-3 bg-black/[0.04] rounded-full w-4/5 animate-pulse" />
            <div className="h-3 bg-black/[0.04] rounded-full w-3/5 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function DiagnosticadorPage() {
  const { user, plan, loading: authLoading } = useAuth();
  const esPro = plan === 'pro';
  const [archivo, setArchivo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [procesando, setProcesando] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [descargando, setDescargando] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = useCallback((file) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { setError('El archivo no puede superar 10 MB.'); return; }
    setArchivo(file);
    setResultado(null);
    setError('');
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const diagnosticar = async () => {
    if (!archivo || !esPro) return;
    setProcesando(true);
    setError('');
    try {
      const reader = new FileReader();
      const base64 = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(archivo);
      });
      const res = await fetch('/api/diagnosticar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archivo_base64: base64,
          mime_type: archivo.type,
          uid: user?.uid,
          es_pro: esPro,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResultado(data);
    } catch (err) {
      setError(err.message || 'Error al diagnosticar.');
    } finally {
      setProcesando(false);
    }
  };

  const generarPDF = async () => {
    if (!resultado?.diagnosticos?.length) return;
    setDescargando(true);
    try {
      const pdfMake = (await import('pdfmake/build/pdfmake')).default;
      await import('pdfmake/build/vfs_fonts');
      const PINE = '#1B3A32', SLATE = '#334155', MUTED = '#64748b', GREEN = '#166534', AMBER = '#92400e', RED = '#991b1b', BLUE = '#1e40af', BLUE_BG = '#eff6ff';
      const fecha = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
      const d = resultado.diagnosticos;
      const principal = d[0];
      const confColor = (v) => v >= 70 ? GREEN : v >= 40 ? AMBER : RED;

      const generateLogoIcon = (size, cornerRadius) => {
        const canvas = document.createElement('canvas');
        const s = size * 2;
        canvas.width = s;
        canvas.height = s;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, s, s);
        gradient.addColorStop(0, '#1B3A32');
        gradient.addColorStop(1, '#2d6b5a');
        ctx.fillStyle = gradient;
        const r = cornerRadius * 2;
        ctx.beginPath();
        ctx.moveTo(r, 0);
        ctx.lineTo(s - r, 0);
        ctx.quadraticCurveTo(s, 0, s, r);
        ctx.lineTo(s, s - r);
        ctx.quadraticCurveTo(s, s, s - r, s);
        ctx.lineTo(r, s);
        ctx.quadraticCurveTo(0, s, 0, s - r);
        ctx.lineTo(0, r);
        ctx.quadraticCurveTo(0, 0, r, 0);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = `${Math.round(s * 0.5)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('A', s / 2, s / 2 + s * 0.015);
        return canvas.toDataURL('image/png');
      };
      const logoIconDataUrl = generateLogoIcon(22, 5);
      const noBorderLayout = () => ({ hLineWidth: () => 0, vLineWidth: () => 0, paddingLeft: () => 0, paddingRight: () => 0, paddingTop: () => 0, paddingBottom: () => 0 });

      const content = [];

      // HEADER
      content.push({ table: { widths: ['*', 120], body: [[
        { stack: [
          { table: { widths: [28, '*'], body: [[
            { image: 'adaptoIcon', width: 22, height: 22, margin: [0, 1, 0, 0], border: [false, false, false, false] },
            { text: [{ text: 'adap', fontSize: 22, bold: true, color: '#1a1a1a' }, { text: 'to', fontSize: 22, bold: true, color: PINE }], border: [false, false, false, false], margin: [0, 2, 0, 0] }
          ]] }, layout: noBorderLayout, border: [false, false, false, false], margin: [0, 0, 0, 2] },
          { text: 'INFORME DE DIAGNÓSTICO NEAE  ·  LOMLOE', fontSize: 7, color: MUTED, characterSpacing: 0.3 },
        ], border: [false, false, false, false] },
        { stack: [
          { text: fecha, fontSize: 9, color: SLATE, alignment: 'right', bold: true },
          { text: `${d.length} hipótesis identificadas`, fontSize: 8, color: MUTED, alignment: 'right', margin: [0, 2, 0, 0] },
        ], border: [false, false, false, false] }
      ]] }, layout: noBorderLayout, margin: [0, 0, 0, 4] });
      content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2.5, lineColor: PINE }], margin: [0, 6, 0, 16] });

      // 1. RESUMEN EJECUTIVO
      content.push({ text: '1. RESUMEN EJECUTIVO', fontSize: 11, bold: true, color: PINE, margin: [0, 0, 0, 8], characterSpacing: 0.5 });
      content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1.5, lineColor: PINE }], margin: [0, 0, 0, 10] });
      content.push({ margin: [0, 0, 0, 12], table: { widths: ['*', 80], body: [[
        { stack: [
          { text: [{ text: 'Hipótesis principal:  ', bold: true, fontSize: 10, color: SLATE }, { text: principal.perfil, fontSize: 10, bold: true, color: PINE }], margin: [0, 0, 0, 4] },
          { text: [{ text: 'Confianza:  ', bold: true, fontSize: 9, color: SLATE }, { text: `${principal.confianza}%`, fontSize: 14, bold: true, color: confColor(principal.confianza) }], margin: [0, 0, 0, 4] },
          { text: `Se han identificado ${d.length} posibles perfiles NEAE. Este informe es orientativo y no sustituye una evaluación psicopedagógica formal.`, fontSize: 8.5, color: MUTED, lineHeight: 1.4 },
        ], border: [false, false, false, false] },
        { stack: [
          { text: [{ text: `${d.length}`, fontSize: 28, bold: true, color: PINE }], alignment: 'center', margin: [0, 0, 0, 2] },
          { text: 'hipótesis', fontSize: 8, color: MUTED, alignment: 'center' },
        ], border: [false, false, false, false], margin: [0, 4, 0, 0] }
      ]] }, layout: { hLineWidth: () => 0.5, vLineWidth: () => 0.5, hLineColor: () => '#e2e8f0', vLineColor: () => '#e2e8f0', fillColor: () => '#f8fafc', paddingLeft: () => 10, paddingRight: () => 10, paddingTop: () => 8, paddingBottom: () => 8 } });

      // 2. TABLA RESUMEN
      content.push({ text: '2. TABLA RESUMEN', fontSize: 11, bold: true, color: PINE, margin: [0, 0, 0, 8], characterSpacing: 0.5 });
      content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1.5, lineColor: PINE }], margin: [0, 0, 0, 10] });
      const tableHeader = [
        { text: '#', bold: true, fontSize: 8, color: '#ffffff', fillColor: PINE, margin: [6, 4, 6, 4] },
        { text: 'Perfil NEAE', bold: true, fontSize: 8, color: '#ffffff', fillColor: PINE, margin: [6, 4, 6, 4] },
        { text: 'Confianza', bold: true, fontSize: 8, color: '#ffffff', fillColor: PINE, alignment: 'center', margin: [6, 4, 6, 4] },
        { text: 'Estado', bold: true, fontSize: 8, color: '#ffffff', fillColor: PINE, alignment: 'center', margin: [6, 4, 6, 4] },
      ];
      const tableRows = d.map((diag, i) => [
        { text: String(i + 1), fontSize: 9, color: SLATE, bold: true, margin: [6, 4, 6, 4], fillColor: i % 2 === 0 ? '#f8fafc' : '#ffffff' },
        { text: diag.perfil, fontSize: 9, color: SLATE, margin: [6, 4, 6, 4], fillColor: i % 2 === 0 ? '#f8fafc' : '#ffffff' },
        { text: `${diag.confianza}%`, fontSize: 10, bold: true, color: confColor(diag.confianza), alignment: 'center', margin: [6, 4, 6, 4], fillColor: i % 2 === 0 ? '#f8fafc' : '#ffffff' },
        { text: i === 0 ? 'Principal' : 'Posible', fontSize: 8, bold: true, color: i === 0 ? PINE : MUTED, alignment: 'center', margin: [6, 4, 6, 4], fillColor: i % 2 === 0 ? '#f8fafc' : '#ffffff' },
      ]);
      content.push({ margin: [0, 0, 0, 16], table: { widths: [30, '*', 70, 70], body: [tableHeader, ...tableRows] }, layout: { hLineWidth: () => 0.5, vLineWidth: () => 0.5, hLineColor: () => '#e2e8f0', vLineColor: () => '#e2e8f0', paddingLeft: () => 4, paddingRight: () => 4, paddingTop: () => 2, paddingBottom: () => 2 } });

      // 3. ANÁLISIS DETALLADO
      content.push({ text: '3. ANÁLISIS DETALLADO', fontSize: 11, bold: true, color: PINE, margin: [0, 0, 0, 8], characterSpacing: 0.5 });
      content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1.5, lineColor: PINE }], margin: [0, 0, 0, 10] });

      d.forEach((diag, idx) => {
        const accent = [PINE, '#2d6b5a', '#2f4468', '#6b4c9a'][idx % 4];
        // Hipotesis header — compact inline with mini thermometer bar
        content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5, lineColor: accent + '30' }], margin: [0, 8, 0, 6] });
        content.push({ text: [
          { text: `HIPÓTESIS ${idx + 1}`, bold: true, fontSize: 8, color: accent, characterSpacing: 0.5 },
          { text: `   ${diag.confianza}%`, bold: true, fontSize: 11, color: confColor(diag.confianza) },
        ], margin: [0, 0, 0, 3] });
        // Mini thermometer bar
        const barWidth = 120;
        const fillWidth = Math.round((diag.confianza / 100) * barWidth);
        content.push({ canvas: [
          { type: 'rect', x: 0, y: 0, w: barWidth, h: 4, r: 2, color: '#f0f0f0', lineColor: '#f0f0f0' },
          { type: 'rect', x: 0, y: 0, w: fillWidth, h: 4, r: 2, color: confColor(diag.confianza), opacity: 0.7 },
        ], margin: [0, 0, 0, 4] });
        // Perfil name
        content.push({ text: diag.perfil, fontSize: 11, bold: true, color: SLATE, margin: [0, 0, 0, 6] });
        // Explicacion
        content.push({ text: [{ text: 'Por qué este diagnóstico:  ', bold: true, fontSize: 9, color: PINE }, { text: diag.explicacion_detallada, fontSize: 9, color: MUTED }], alignment: 'justify', lineHeight: 1.5, margin: [0, 0, 0, 10] });

        // Patrones detectados
        if (diag.patrones_detectados?.length > 0) {
          content.push({ text: 'Patrones detectados', bold: true, fontSize: 9, color: SLATE, margin: [0, 0, 0, 6] });
          diag.patrones_detectados.forEach((p) => {
            const freqWidth = p.frecuencia === 'alta' ? 160 : p.frecuencia === 'media' ? 105 : 55;
            const freqColor = p.frecuencia === 'alta' ? PINE : p.frecuencia === 'media' ? AMBER : MUTED;
            content.push({ margin: [0, 0, 0, 6], table: { widths: ['*'], body: [[
              { stack: [
                { text: [{ text: p.patron, bold: true, fontSize: 8.5, color: SLATE }, { text: `     ${p.frecuencia}`, bold: true, fontSize: 7, color: freqColor, characterSpacing: 0.5 }], margin: [0, 0, 0, 3] },
                { canvas: [{ type: 'rect', x: 0, y: 0, w: freqWidth, h: 4, r: 2, color: freqColor, opacity: 0.6 }], margin: [0, 0, 0, 3] },
                { text: p.evidencia, fontSize: 8, color: MUTED, lineHeight: 1.4 },
              ], border: [false, false, false, false] }
            ]] }, layout: { hLineWidth: () => 0, vLineWidth: () => 0, paddingLeft: () => 8, paddingRight: () => 8, paddingTop: () => 4, paddingBottom: () => 4, fillColor: () => '#f8fafc' } });
          });
        }

        // Descartes
        if (diag.descartes?.length > 0) {
          content.push({ margin: [0, 6, 0, 0], text: 'Perfiles descartados', bold: true, fontSize: 8.5, color: MUTED });
          diag.descartes.forEach((desc) => {
            content.push({ text: [{ text: `✕  ${desc.perfil}`, bold: true, fontSize: 8, color: '#94a3b8' }, { text: ` — ${desc.razon}`, fontSize: 8, color: '#cbd5e1' }], margin: [8, 1, 0, 1] });
          });
        }

        // Separator
        if (idx < d.length - 1) {
          content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5, lineColor: '#e2e8f0' }], margin: [0, 12, 0, 12] });
        }
      });

      // 4. PASOS A SEGUIR
      content.push({ margin: [0, 10, 0, 0], canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5, lineColor: '#e2e8f0' }] });
      content.push({ text: '4. PASOS A SEGUIR', fontSize: 11, bold: true, color: PINE, margin: [0, 12, 0, 8], characterSpacing: 0.5 });
      content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1.5, lineColor: PINE }], margin: [0, 0, 0, 10] });
      const pasos = [
        { title: 'Solicitar evaluación psicopedagógica formal', desc: 'Contactar con el orientador u orientadora del centro para iniciar un proceso de evaluación completo. Este informe puede servir como referencia inicial.' },
        { title: 'Comunicar al equipo educativo', desc: 'Compartir estos resultados con el tutor y el equipo docente para implementar adaptaciones provisionales mientras se completa la evaluación formal.' },
        { title: 'Recoger documentación clínica previa', desc: 'Reunir informes neurológicos, pediátricos o psicológicos existentes que puedan complementar el diagnóstico.' },
        { title: 'Implementar adaptaciones provisionales', desc: 'Basándose en la hipótesis principal, aplicar las adaptaciones curriculares no significativas correspondientes al perfil identificado.' },
      ];
      const pasosLayout = { hLineWidth: () => 0, vLineWidth: () => 0, paddingLeft: () => 4, paddingRight: () => 4, paddingTop: () => 4, paddingBottom: () => 4 };
      const pasosBody = pasos.map((p, i) => ([
        { text: String(i + 1), bold: true, fontSize: 10, color: '#ffffff', alignment: 'center', fillColor: PINE, margin: [0, 3, 0, 0] },
        { stack: [
          { text: p.title, bold: true, fontSize: 9, color: SLATE, margin: [0, 0, 0, 2] },
          { text: p.desc, fontSize: 8, color: MUTED, lineHeight: 1.4 },
        ], border: [false, false, false, false] }
      ]));
      content.push({ margin: [0, 0, 0, 14], table: { widths: [24, '*'], body: pasosBody }, layout: pasosLayout, fillColor: BLUE_BG });

      // DISCLAIMER
      content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5, lineColor: '#e2e8f0' }], margin: [0, 4, 0, 10] });
      content.push({ text: [
        { text: 'Aviso legal:  ', bold: true, fontSize: 7.5, color: MUTED },
        { text: 'Este diagnóstico es orientativo y no sustituye una evaluación psicopedagógica formal realizada por un profesional cualificado. La validación final corresponde al orientador o orientadora del centro educativo. Los resultados se basan en el análisis de patrones de respuesta del examen aportado y pueden verse afectados por factores contextuales no capturados en la imagen.', fontSize: 7.5, color: '#94a3b8', italics: true },
      ], alignment: 'justify', lineHeight: 1.4, margin: [0, 0, 0, 8] });

      // FOOTER
      content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1.5, lineColor: PINE }], margin: [0, 4, 0, 6] });
      content.push({ text: [{ text: 'Generado por ', fontSize: 7, color: MUTED }, { text: 'adap', fontSize: 7, bold: true, color: '#1a1a1a' }, { text: 'to', fontSize: 7, bold: true, color: PINE }, { text: `  ·  ${fecha}`, fontSize: 7, color: MUTED }], alignment: 'center' });

      const docDefinition = {
        content,
        images: { adaptoIcon: logoIconDataUrl },
        defaultStyle: { font: 'Roboto', fontSize: 9, color: SLATE },
        pageSize: 'A4',
        pageMargins: [40, 40, 40, 40],
        footer: (cp, pc) => ({ text: `Página ${cp} de ${pc}`, fontSize: 7, color: MUTED, alignment: 'center', margin: [0, 15, 0, 0] }),
      };

      pdfMake.createPdf(docDefinition).download(`Adapto_Diagnostico_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (err) {
      console.error('Error generando PDF:', err);
    } finally {
      setDescargando(false);
    }
  };

  if (authLoading) return <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#1B3A32]/20 border-t-[#1B3A32] rounded-full animate-spin" /></div>;

  if (!esPro) {
    return (
      <div className="min-h-screen bg-[#faf8f5] text-[#1a1a1a] flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#1B3A32] to-[#2d6b5a] flex items-center justify-center shadow-xl shadow-[#1B3A32]/20">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
          </div>
          <h1 className="font-display text-3xl tracking-tight mb-3">Diagnosticador IA</h1>
          <p className="text-sm text-[#1a1a1a]/40 mb-8 leading-relaxed">Esta herramienta es exclusiva para cuentas <strong className="text-[#1a1a1a]/60">Pro</strong>. Sube un examen y la IA analizara los patrones de respuesta para sugerir posibles perfiles NEAE.</p>
          <Link href="/auditor-dua" className="inline-flex items-center gap-2 bg-[#1B3A32] text-white font-semibold rounded-full px-8 py-3.5 hover:bg-[#24493f] transition-all duration-300 text-sm">
            Actualizar a Pro
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a1a1a]">
      <style jsx global>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#faf8f5]/80 backdrop-blur-2xl border-b border-black/[0.04]">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1B3A32] to-[#2d6b5a] flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20L12 4L20 20" /><path d="M7.5 14H16.5" /></svg>
            </div>
            <span className="flex items-baseline">
              <span className="font-display text-3xl text-[#1a1a1a] tracking-tight">adap</span>
              <span className="font-display text-3xl text-[#1B3A32] tracking-tight">to</span>
            </span>
          </Link>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#1B3A32] bg-[#1B3A32]/[0.06] px-3 py-1.5 rounded-full border border-[#1B3A32]/10">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" /></svg>
            Pro
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 md:py-16">
        {/* HERO */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#1B3A32]/[0.06] text-[#1B3A32] border border-[#1B3A32]/10 rounded-full px-4 py-1.5 mb-6">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a6 6 0 0 1-4.49 2.03h-.04a6 6 0 0 1-4.49-2.03L5 14.5m14 0H5" /></svg>
            Diagnosticador IA
          </div>
          <h1 className="font-display text-4xl md:text-5xl tracking-tight text-[#1a1a1a] mb-4">Analiza patrones, sugiere perfiles.</h1>
          <p className="text-[#1a1a1a]/40 text-lg max-w-xl mx-auto leading-relaxed">Sube un examen respondido y la IA analizara los patrones de respuesta del alumno para sugerir posibles perfiles NEAE con un porcentaje de confianza.</p>
        </div>

        {/* UPLOAD ZONE */}
        {!resultado && !procesando && (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative rounded-3xl border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-300 ${
              dragActive
                ? 'border-[#1B3A32] bg-[#1B3A32]/[0.04] scale-[1.01]'
                : 'border-black/[0.08] bg-white hover:border-[#1B3A32]/30 hover:bg-[#1B3A32]/[0.02]'
            }`}
          >
            <input ref={fileInputRef} type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#1B3A32]/[0.08] to-[#1B3A32]/[0.02] border border-[#1B3A32]/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#1B3A32]/30" viewBox="0 0 200 160" fill="none">
                <rect x="20" y="15" width="160" height="130" rx="12" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 4" />
                <rect x="50" y="45" width="100" height="8" rx="4" fill="currentColor" fillOpacity="0.08" />
                <rect x="50" y="62" width="70" height="8" rx="4" fill="currentColor" fillOpacity="0.06" />
                <rect x="50" y="79" width="85" height="8" rx="4" fill="currentColor" fillOpacity="0.06" />
                <circle cx="155" cy="115" r="22" fill="currentColor" fillOpacity="0.08" />
                <path d="M148 115l5 5 10-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {preview ? (
              <div className="space-y-3">
                <div className="w-32 h-40 mx-auto rounded-xl overflow-hidden border border-black/[0.06] shadow-sm">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <p className="text-sm font-semibold text-[#1a1a1a]">{archivo?.name}</p>
                <p className="text-xs text-[#1a1a1a]/30">{(archivo?.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-[#1a1a1a]/60">Arrastra un examen o haz click para seleccionar</p>
                <p className="text-xs text-[#1a1a1a]/30">PDF, JPG, PNG — Maximo 10 MB</p>
              </div>
            )}
            {archivo && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); diagnosticar(); }}
                className="mt-6 inline-flex items-center gap-2 bg-[#1B3A32] text-white font-semibold rounded-full px-8 py-3.5 hover:bg-[#24493f] hover:shadow-lg hover:shadow-[#1B3A32]/20 transition-all duration-300 hover:-translate-y-0.5 text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a6 6 0 0 1-4.49 2.03h-.04a6 6 0 0 1-4.49-2.03L5 14.5m14 0H5" /></svg>
                Diagnosticar
              </button>
            )}
          </div>
        )}

        {/* PROCESSING */}
        {procesando && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#1B3A32]/10 p-8 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#1B3A32] to-[#2d6b5a] flex items-center justify-center shadow-lg shadow-[#1B3A32]/20 animate-pulse">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a6 6 0 0 1-4.49 2.03h-.04a6 6 0 0 1-4.49-2.03L5 14.5m14 0H5" /></svg>
              </div>
              <p className="text-sm font-semibold text-[#1a1a1a]/70 mb-1">Analizando patrones de respuesta...</p>
              <p className="text-xs text-[#1a1a1a]/35">La IA esta examinando el examen en busca de indicadores NEAE</p>
            </div>
            <ProcessingSkeleton />
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="mt-6 bg-[#c43e3e]/[0.04] border border-[#c43e3e]/15 rounded-2xl px-5 py-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-[#c43e3e] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
            <p className="text-sm text-[#c43e3e]/80">{error}</p>
          </div>
        )}

        {/* RESULTS */}
        {resultado?.diagnosticos?.length > 0 && (
          <div className="space-y-6 mt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl tracking-tight">Resultados del analisis</h2>
                <p className="text-xs text-[#1a1a1a]/35 mt-1">{resultado.diagnosticos.length} hipotesis identificadas por orden de probabilidad</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={generarPDF}
                  disabled={descargando}
                  className="text-xs font-semibold text-white bg-[#1B3A32] hover:bg-[#24493f] rounded-full px-4 py-2 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  {descargando ? (
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                  )}
                  Descargar PDF
                </button>
                <button
                  type="button"
                  onClick={() => { setResultado(null); setArchivo(null); setPreview(null); }}
                  className="text-xs font-semibold text-[#1B3A32] bg-[#1B3A32]/[0.06] hover:bg-[#1B3A32]/[0.1] border border-[#1B3A32]/10 rounded-full px-4 py-2 transition-colors cursor-pointer"
                >
                  Diagnosticar otro examen
                </button>
              </div>
            </div>
            {resultado.diagnosticos.map((diag, i) => (
              <DiagnosisCard key={i} diag={diag} index={i} />
            ))}
            <div className="bg-[#faf8f5] rounded-2xl border border-black/[0.04] p-5 text-center">
              <p className="text-xs text-[#1a1a1a]/30 leading-relaxed max-w-lg mx-auto">
                Este diagnostico es <strong className="text-[#1a1a1a]/45">orientativo</strong> y no sustituye la evaluacion psicopedagogica formal. La validacion final corresponde al orientador del centro.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
