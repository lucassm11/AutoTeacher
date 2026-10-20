'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import AdapBot from '@/app/components/AdapBot';

const PERFILES = [
  { group: 'Trastornos del Neurodesarrollo', items: [
    'TDAH con déficit de atención sostenida y fatiga cognitiva',
    'TDAH predominantemente hiperactivo-impulsivo',
    'TDAH combinado (atención + hiperactividad)',
    'Dislexia evolutiva con baja velocidad lectora',
    'Disgrafía y dificultades en la escritura',
    'Discalculia y dificultades en el razonamiento lógico',
    'Trastorno del Desarrollo del Lenguaje (TDL/TEL)',
    'Trastorno de la Coordinación Motriz (DCD)',
  ]},
  { group: 'Dificultades de Aprendizaje', items: [
    'Dificultades de aprendizaje (Lectura facilitada y apoyos visuales)',
    'Dificultades de memoria de trabajo',
    'Retraso madurativo generalizado',
  ]},
  { group: 'Otros Perfiles', items: [
    'Altas capacidades intelectuales (ACI)',
    'Ansiedad ante la evaluación',
    'Trastorno del espectro autista (TEA) - Nivel 1',
    'Barreras sensoriales (audición / visión)',
    'Multidiscapacidad / Plurideficiencia',
  ]},
];

const PERFILES_GRATIS = [
  'TDAH con déficit de atención sostenida y fatiga cognitiva',
  'TDAH predominantemente hiperactivo-impulsivo',
  'TDAH combinado (atención + hiperactividad)',
];

const CURSOS = [
  '1º Primaria','2º Primaria','3º Primaria','4º Primaria','5º Primaria','6º Primaria',
  '1º ESO','2º ESO','3º ESO','4º ESO','1º Bachillerato',
];

const PERFIL_SLUG_MAP = {
  'TDAH con déficit de atención sostenida y fatiga cognitiva': 'tdah-atencion',
  'TDAH predominantemente hiperactivo-impulsivo': 'tdah-hiperactivo',
  'TDAH combinado (atención + hiperactividad)': 'tdah-combinado',
  'Dislexia evolutiva con baja velocidad lectora': 'dislexia',
  'Disgrafía y dificultades en la escritura': 'disgrafia',
  'Discalculia y dificultades en el razonamiento lógico': 'discalculia',
  'Trastorno del Desarrollo del Lenguaje (TDL/TEL)': 'tdl',
  'Trastorno de la Coordinación Motriz (DCD)': 'dcd',
  'Dificultades de aprendizaje (Lectura facilitada y apoyos visuales)': 'dificultades-aprendizaje',
  'Dificultades de memoria de trabajo': 'memoria-trabajo',
  'Retraso madurativo generalizado': 'retraso-madurativo',
  'Altas capacidades intelectuales (ACI)': 'altas-capacidades',
  'Ansiedad ante la evaluación': 'ansiedad',
  'Trastorno del espectro autista (TEA) - Nivel 1': 'tea',
  'Barreras sensoriales (audición / visión)': 'barreras-sensoriales',
  'Multidiscapacidad / Plurideficiencia': 'multidiscapacidad',
};

export default function AuditorDuaPage() {
  const { user, plan, signInWithGoogle, signOut, loading: authLoading } = useAuth();
  const [curso, setCurso] = useState('3º Educación Primaria');
  const [materia, setMateria] = useState('Lengua Castellana');
  const [perfil, setPerfil] = useState('TDAH con déficit de atención sostenida y fatiga cognitiva');
  const [perfilOpen, setPerfilOpen] = useState(false);
  const [perfilSearch, setPerfilSearch] = useState('');
  const perfilRef = useRef(null);
  const perfilSearchRef = useRef(null);
  const [cursoOpen, setCursoOpen] = useState(false);
  const [cursoSearch, setCursoSearch] = useState('');
  const cursoRef = useRef(null);
  const cursoSearchRef = useRef(null);
  const [archivoData, setArchivoData] = useState(null);
  const [nombreArchivo, setNombreArchivo] = useState('');
  const [textoExamen, setTextoExamen] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [procesando, setProcesando] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');
  const [limiteAlcanzado, setLimiteAlcanzado] = useState(false);
  const [descargando, setDescargando] = useState(false);
  const [usadas, setUsadas] = useState(0);
  const [activeTab, setActiveTab] = useState('dictamen');
  const fileRef = useRef(null);

  const esPro = plan === 'pro';

  useEffect(() => {
    if (user && !esPro) {
      fetch(`/api/usage?uid=${user.uid}`)
        .then((r) => r.json())
        .then((d) => { if (d.usadas !== undefined) setUsadas(d.usadas); })
        .catch(() => {});
    }
  }, [user, esPro]);

  useEffect(() => {
    if (!perfilOpen) return;
    const handleClick = (e) => { if (perfilRef.current && !perfilRef.current.contains(e.target)) setPerfilOpen(false); };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [perfilOpen]);

  useEffect(() => {
    if (perfilOpen && perfilSearchRef.current) perfilSearchRef.current.focus();
  }, [perfilOpen]);

  useEffect(() => {
    if (!cursoOpen) return;
    const handleClick = (e) => { if (cursoRef.current && !cursoRef.current.contains(e.target)) setCursoOpen(false); };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [cursoOpen]);

  useEffect(() => {
    if (cursoOpen && cursoSearchRef.current) cursoSearchRef.current.focus();
  }, [cursoOpen]);

  const procesarArchivo = (file) => {
    if (!file) return;
    setNombreArchivo(file.name);
    setError('');
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let w = img.width, h = img.height;
          const max = 1600;
          if (w > max || h > max) { if (w > h) { h = Math.round((h * max) / w); w = max; } else { w = Math.round((w * max) / h); h = max; } }
          canvas.width = w; canvas.height = h;
          canvas.getContext('2d').drawImage(img, 0, 0, w, h);
          const b64 = canvas.toDataURL('image/jpeg', 0.85).split(',')[1];
          setArchivoData({ base64: b64, mimeType: 'image/jpeg' });
          setPreviewUrl(canvas.toDataURL('image/jpeg', 0.85));
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        setArchivoData({ base64: event.target.result.split(',')[1], mimeType: file.type || 'application/pdf' });
        setPreviewUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const ejecutarAuditoria = async (e) => {
    e.preventDefault();
    if (!archivoData && !textoExamen.trim()) { setError('Debes adjuntar un examen o escribir su contenido.'); return; }
    setProcesando(true); setError(''); setResultado(null);
    try {
      const res = await fetch('/api/auditar-examen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ archivo_base64: archivoData?.base64 || '', mime_type: archivoData?.mimeType || 'image/jpeg', texto_examen: textoExamen.trim(), curso, materia, perfil, uid: user.uid, es_pro: esPro }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 429 && data.limite_alcanzado) { setLimiteAlcanzado(true); setUsadas(data.usadas || 3); }
        throw new Error(data.error || 'Error en el servidor.');
      }
      setUsadas((p) => p + 1);
      setResultado(data);
    } catch (err) { setError(err.message); } finally { setProcesando(false); }
  };

  const generarPDF = async () => {
    if (!resultado) return;
    setDescargando(true);
    try {
      const pdfMake = (await import('pdfmake/build/pdfmake')).default;
      await import('pdfmake/build/vfs_fonts');
      const PINE = '#1B3A32', RED = '#c43e3e', SLATE = '#334155', MUTED = '#64748b', GREEN = '#166534', GREEN_BG = '#dcfce7', AMBER = '#92400e', AMBER_BG = '#fef3c7', BLUE = '#1e40af', BLUE_BG = '#eff6ff';
      const fecha = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
      const statusBg = resultado.estado_cumplimiento === 'APROBADO' ? '#22c55e' : resultado.estado_cumplimiento === 'REQUIERE_AJUSTES' ? '#f59e0b' : '#ef4444';
      const content = [];
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
      const logoIconDataUrl = generateLogoIcon(26, 6);
      const logoIconSmallDataUrl = generateLogoIcon(14, 3);
      const noBorderLayout = function() {
        return {
          hLineWidth: () => 0, vLineWidth: () => 0,
          paddingLeft: () => 0, paddingRight: () => 0,
          paddingTop: () => 0, paddingBottom: () => 0,
          fillColor: () => null,
        };
      };
      content.push({ table: { widths: ['*', 110], body: [[
        { stack: [
          { table: { widths: [32, '*'], body: [[
            { image: 'adaptoIcon', width: 26, height: 26, margin: [0, 1, 0, 0], border: [false, false, false, false] },
            { text: [{ text: 'adap', fontSize: 24, bold: true, color: '#1a1a1a' }, { text: 'to', fontSize: 24, bold: true, color: PINE }], border: [false, false, false, false], margin: [0, 2, 0, 0] }
          ]] }, layout: noBorderLayout, border: [false, false, false, false], margin: [0, 0, 0, 2] },
          { text: 'INFORME TÉCNICO DE ADAPTACIÓN  ·  MARCO DUA  ·  LOMLOE', fontSize: 7, color: MUTED, characterSpacing: 0.3 },
        ], border: [false, false, false, false] },
        { text: [{ text: String(resultado.puntuacion_accesibilidad), fontSize: 28, bold: true, color: '#ffffff' }, { text: ' /100', fontSize: 12, bold: true, color: '#ffffff' }], fillColor: statusBg, alignment: 'center', border: [false, false, false, false], margin: [0, 6, 0, 0] }
      ], [
        { text: '', border: [false, false, false, false] },
        { text: 'ÍNDICE DUA', fontSize: 7, bold: true, color: MUTED, alignment: 'center', border: [false, false, false, false], margin: [0, 2, 0, 0], characterSpacing: 1 }
      ]] }, layout: { hLineWidth: () => 0, vLineWidth: () => 0, paddingLeft: () => 0, paddingRight: () => 0, paddingTop: () => 0, paddingBottom: () => 0 }, margin: [0, 0, 0, 4] });
      content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2.5, lineColor: PINE }], margin: [0, 6, 0, 14] });
      content.push({ table: { widths: ['*', '*', '*', '*'], body: [[{ text: [{ text: 'Asignatura:  ', bold: true, fontSize: 8, color: MUTED }, { text: materia, fontSize: 8, color: SLATE }] }, { text: [{ text: 'Curso:  ', bold: true, fontSize: 8, color: MUTED }, { text: curso, fontSize: 8, color: SLATE }] }, { text: [{ text: 'Perfil:  ', bold: true, fontSize: 8, color: MUTED }, { text: perfil, fontSize: 8, color: SLATE }] }, { text: [{ text: 'Fecha:  ', bold: true, fontSize: 8, color: MUTED }, { text: fecha, fontSize: 8, color: SLATE }] }]] }, layout: { hLineWidth: () => 0.5, vLineWidth: () => 0.5, hLineColor: () => '#e2e8f0', vLineColor: () => '#e2e8f0', fillColor: () => '#f8fafc', paddingLeft: () => 8, paddingRight: () => 8, paddingTop: () => 6, paddingBottom: () => 6 }, margin: [0, 0, 0, 18] });
      content.push({ table: { widths: ['*'], body: [[{ text: [{ text: `Veredicto:  `, bold: true, fontSize: 10, color: '#ffffff' }, { text: (resultado.estado_cumplimiento || '').replace('_', ' '), bold: true, fontSize: 10, color: '#ffffff' }], fillColor: statusBg, alignment: 'center', border: [false, false, false, false] }]] }, layout: { hLineWidth: () => 0, vLineWidth: () => 0, paddingLeft: () => 12, paddingRight: () => 12, paddingTop: () => 6, paddingBottom: () => 6 }, margin: [0, 0, 0, 16] });
      content.push({ text: '1. DICTAMEN PSICOPEDAGÓGICO', fontSize: 11, bold: true, color: PINE, margin: [0, 0, 0, 8], characterSpacing: 0.5 });
      content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1.5, lineColor: PINE }], margin: [0, 0, 0, 8] });
      content.push({ text: resultado.dictamen_general, fontSize: 9.5, color: SLATE, alignment: 'justify', lineHeight: 1.5, margin: [0, 0, 0, 18] });
      content.push({ text: '2. DESGLOSE DE CRITERIOS TÉCNICOS LOMLOE / DUA', fontSize: 11, bold: true, color: PINE, margin: [0, 0, 0, 8], characterSpacing: 0.5 });
      content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1.5, lineColor: PINE }], margin: [0, 0, 0, 8] });
      resultado.auditoria_por_criterio.forEach((c) => {
        const bc = c.cumple ? GREEN : AMBER, bb = c.cumple ? GREEN_BG : AMBER_BG;
        content.push({ margin: [0, 0, 0, 8], table: { widths: ['*'], body: [[{ text: [{ text: c.criterio, bold: true, fontSize: 9.5, color: SLATE }, { text: `     ${c.cumple ? 'Conforme' : 'Revisar'}`, bold: true, fontSize: 8, color: bc, fillColor: bb }], border: [false, false, false, false] }], [{ text: [{ text: 'Diagnóstico:  ', bold: true, fontSize: 8.5, color: PINE }, { text: c.observacion, fontSize: 8.5, color: MUTED }], border: [false, false, false, false], margin: [0, 2, 0, 0] }], [{ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 495, y2: 0, lineWidth: 0.5, lineColor: '#e2e8f0' }], border: [false, false, false, false], margin: [0, 2, 0, 2] }], [{ text: [{ text: 'Recomendación:  ', bold: true, fontSize: 8.5, color: BLUE }, { text: c.recomendacion_concreta, fontSize: 8.5, color: SLATE }], border: [false, false, false, false], fillColor: BLUE_BG, margin: [6, 4, 6, 4] }]] }, layout: { hLineWidth: () => 0.5, vLineWidth: () => 0.5, hLineColor: () => '#e2e8f0', vLineColor: () => '#e2e8f0', paddingLeft: () => 8, paddingRight: () => 8, paddingTop: () => 4, paddingBottom: () => 4 } });
      });
      content.push({ text: '', margin: [0, 6, 0, 0] });
      content.push({ text: '3. EXAMEN ADAPTADO (LISTO PARA EL ALUMNO)', fontSize: 11, bold: true, color: PINE, margin: [0, 0, 0, 8], characterSpacing: 0.5 });
      content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1.5, lineColor: PINE }], margin: [0, 0, 0, 8] });
      if (resultado.examen_adaptado?.length > 0) {
        resultado.examen_adaptado.forEach((p) => {
          const PINE_C = '#1B3A32', PURPLE = '#6b4c9a';
          const qb = [[{ text: [{ text: `P${p.numero}`, bold: true, fontSize: 10, color: RED }, { text: `   ${p.enunciado_original}`, fontSize: 8, color: '#94a3b8', italics: true }], border: [false, false, false, false] }]];
          const tags = [];
          if (p.tipo_adaptacion) tags.push({ text: ` ${p.tipo_adaptacion} `, bold: true, fontSize: 7, color: PINE_C, decoration: 'underline', decorationColor: PINE_C });
          if (p.criterio_dua) tags.push({ text: `  DUA: ${p.criterio_dua} `, bold: true, fontSize: 7, color: PURPLE, decoration: 'underline', decorationColor: PURPLE });
          if (tags.length > 0) qb.push([{ text: tags, border: [false, false, false, false], margin: [0, 4, 0, 2] }]);
          qb.push([{ text: [{ text: 'ENUNCIADO ADAPTADO', bold: true, fontSize: 7, color: GREEN }], border: [false, false, false, false], fillColor: '#f0fdf4', margin: [0, 4, 0, 2] }]);
          qb.push([{ text: p.enunciado_adaptado, fontSize: 9.5, color: SLATE, border: [false, false, false, false], fillColor: '#ffffff', margin: [4, 2, 4, 4], lineHeight: 1.4 }]);
          const complexity = [];
          if (p.complejidad_original != null) complexity.push({ text: `Original: ${p.complejidad_original}/10`, fontSize: 8, color: '#94a3b8' });
          if (p.complejidad_adaptada != null) complexity.push({ text: `  →  Adaptado: ${p.complejidad_adaptada}/10`, fontSize: 8, color: GREEN, bold: true });
          if (complexity.length > 0) qb.push([{ text: complexity, border: [false, false, false, false], margin: [4, 0, 0, 2] }]);
          if (p.justificacion_adaptacion) qb.push([{ text: [{ text: 'JUSTIFICACIÓN  ', bold: true, fontSize: 7, color: AMBER }, { text: p.justificacion_adaptacion, fontSize: 8.5, color: '#78350f' }], border: [false, false, false, false], fillColor: AMBER_BG, margin: [4, 3, 4, 3] }]);
          if (p.consejo_aula) qb.push([{ text: [{ text: 'CONSEJO DE AULA  ', bold: true, fontSize: 7, color: PINE_C }, { text: p.consejo_aula, fontSize: 8.5, color: SLATE }], border: [false, false, false, false], fillColor: '#f0fdf4', margin: [4, 3, 4, 3] }]);
          content.push({ margin: [0, 0, 0, 10], table: { widths: ['*'], body: qb }, layout: { hLineWidth: () => 0.5, vLineWidth: () => 0.5, hLineColor: () => '#bbf7d0', vLineColor: () => '#bbf7d0', fillColor: () => '#f0fdf4', paddingLeft: () => 6, paddingRight: () => 6, paddingTop: () => 4, paddingBottom: () => 4 } });
        });
      } else { content.push({ text: 'No se generó examen adaptado.', fontSize: 9, color: MUTED, italics: true, margin: [0, 0, 0, 10] }); }
      content.push({
        margin: [0, 10, 0, 6],
        table: {
          widths: ['*'],
          body: [[{
            text: [
              { text: 'AVISO METODOLÓGICO Y LEGAL: ', bold: true, fontSize: 6.5, color: PINE },
              { text: 'Este documento constituye un informe técnico de apoyo psicopedagógico fundamentado en las pautas del Diseño Universal para el Aprendizaje (DUA) y las directrices curriculares de la LOMLOE. No constituye una certificación o resolución administrativa vinculante. La determinación final, aprobación formal y firma de las medidas y adaptaciones curriculares corresponde en exclusiva al equipo docente y al centro educativo conforme a la normativa vigente.', fontSize: 6.5, color: MUTED }
            ],
            border: [false, false, false, false],
            fillColor: '#f8fafc',
            margin: [6, 4, 6, 4]
          }]]
        },
        layout: { hLineWidth: () => 0.5, vLineWidth: () => 0.5, hLineColor: () => '#e2e8f0', vLineColor: () => '#e2e8f0', paddingLeft: () => 6, paddingRight: () => 6, paddingTop: () => 4, paddingBottom: () => 4 }
      });
      content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5, lineColor: '#e2e8f0' }], margin: [0, 6, 0, 6] });
      content.push({ table: { widths: ['auto', '*', 'auto'], body: [[
        { image: 'adaptoIconSmall', width: 14, height: 14, margin: [0, 1, 0, 0], border: [false, false, false, false] },
        { text: ' Generado por Adapto  ·  Herramienta de soporte docente conforme a DUA y LOMLOE', fontSize: 7, color: MUTED, margin: [0, 3, 0, 0] },
        { text: `${fecha}  ·  Documentación técnica para uso profesional docente.`, fontSize: 6.5, color: MUTED, alignment: 'right', margin: [0, 3, 0, 0] },
      ]] }, layout: { hLineWidth: () => 0, vLineWidth: () => 0, paddingLeft: () => 0, paddingRight: () => 0, paddingTop: () => 0, paddingBottom: () => 0 }, margin: [0, 0, 0, 0] });
      const docDefinition = { content, images: { adaptoIcon: logoIconDataUrl, adaptoIconSmall: logoIconSmallDataUrl }, defaultStyle: { font: 'Roboto', fontSize: 9, color: SLATE }, pageSize: 'A4', pageMargins: [40, 40, 40, 40], background: esPro ? undefined : () => ({ text: 'Adapto — Versión de prueba', fontSize: 44, color: '#f3f3f3', alignment: 'center', bold: true, margin: [0, 280, 0, 0], rotation: -35 }), footer: (cp, pc) => ({ text: `Página ${cp} de ${pc}`, fontSize: 7, color: MUTED, alignment: 'center', margin: [0, 15, 0, 0] }) };
      pdfMake.createPdf(docDefinition).download(`Adapto_${materia.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (err) { console.error('Error generating PDF:', err); } finally { setDescargando(false); }
  };

  const score = resultado?.puntuacion_accesibilidad || 0;
  const scoreColor = score >= 80 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';
  const conformes = resultado?.auditoria_por_criterio?.filter((c) => c.cumple).length || 0;
  const totalCriterios = resultado?.auditoria_por_criterio?.length || 1;
  const totalPreguntas = resultado?.examen_adaptado?.length || 0;
  const conJustificacion = resultado?.examen_adaptado?.filter((p) => p.justificacion_adaptacion).length || 0;
  const conPista = resultado?.examen_adaptado?.filter((p) => p.pista_adicional).length || 0;

  const [statsAnim, setStatsAnim] = useState({ score: 0, conformes: 0, preguntas: 0, pistas: 0 });
  const statsStartedRef = useRef(false);

  useEffect(() => {
    if (!resultado) { statsStartedRef.current = false; return; }
    if (statsStartedRef.current) return;
    statsStartedRef.current = true;
    const targets = { score: score, conformes: conformes, preguntas: totalPreguntas, pistas: conJustificacion };
    const durations = { score: 900, conformes: 650, preguntas: 500, pistas: 400 };
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    let raf;
    const tick = (now) => {
      const elapsed = now - start;
      const next = {};
      let allDone = true;
      for (const [k, target] of Object.entries(targets)) {
        const t = Math.min(elapsed / durations[k], 1);
        const val = Math.round(ease(t) * target);
        next[k] = val;
        if (t < 1) allDone = false;
      }
      setStatsAnim(next);
      if (!allDone) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [resultado, score, conformes, totalPreguntas, conJustificacion]);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a1a1a] overflow-hidden">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#faf8f5]/80 backdrop-blur-2xl border-b border-black/[0.04]">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1B3A32] to-[#2d6b5a] flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20L12 4L20 20" /><path d="M7.5 14H16.5" /></svg>
            </div>
            <span className="flex items-baseline">
              <span className="font-display text-3xl text-[#1a1a1a] tracking-tight">adap</span>
              <span className="font-display text-3xl text-[#1B3A32] tracking-tight">to</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {esPro && (
                  <Link href="/diagnosticador" className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#1B3A32] bg-[#1B3A32]/[0.06] hover:bg-[#1B3A32]/[0.1] border border-[#1B3A32]/10 rounded-full px-3 py-1.5 transition-colors">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a6 6 0 0 1-4.49 2.03h-.04a6 6 0 0 1-4.49-2.03L5 14.5m14 0H5" /></svg>
                    Diagnosticador
                  </Link>
                )}
                <div className="hidden sm:flex items-center gap-2 bg-white rounded-full border border-black/[0.06] px-4 py-2">
                  <div className="w-6 h-6 rounded-full bg-[#1B3A32] flex items-center justify-center text-[9px] text-white font-bold">{(user.displayName || user.email || '?')[0].toUpperCase()}</div>
                  <span className="text-xs text-[#1a1a1a]/60 max-w-[120px] truncate">{user.displayName || user.email}</span>
                  {esPro ? (
                    <span className="text-[9px] font-bold text-[#1B3A32] bg-[#1B3A32]/[0.06] px-1.5 py-0.5 rounded-full uppercase">Pro</span>
                  ) : (
                    <span className="text-[10px] text-[#1a1a1a]/30">{usadas}/3</span>
                  )}
                </div>
                <button onClick={signOut} className="text-xs text-[#1a1a1a]/40 hover:text-[#c43e3e] px-3 py-2 transition-colors cursor-pointer">Salir</button>
              </>
            ) : (
              <button onClick={signInWithGoogle} className="text-sm font-semibold bg-[#1B3A32] text-white rounded-full px-5 py-2.5 hover:bg-[#24493f] hover:shadow-lg hover:shadow-[#1B3A32]/20 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
                Iniciar sesión
              </button>
            )}
            <Link href="/" className="text-sm text-[#1a1a1a]/40 hover:text-[#1a1a1a]/70 px-3 py-2 transition-colors hidden md:block">Inicio</Link>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16 max-w-7xl mx-auto px-6">
        {/* NOT LOGGED IN */}
        {!user && !authLoading ? (
          <div className="max-w-lg mx-auto mt-8">
            <div className="bg-white rounded-3xl border border-black/[0.04] shadow-xl shadow-black/[0.03] p-10 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#1B3A32]/[0.08] to-[#1B3A32]/[0.02] border border-[#1B3A32]/10 flex items-center justify-center">
                <svg className="w-10 h-10 text-[#1B3A32]/40" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
              </div>
              <h2 className="font-display text-2xl text-[#1a1a1a] mb-3">Inicia sesión para adaptar</h2>
              <p className="text-sm text-[#1a1a1a]/40 max-w-xs mx-auto mb-8">Necesitas una cuenta para generar adaptaciones DUA. Es gratis y solo toma un momento.</p>
              <Link href="/login" className="inline-flex items-center gap-2 bg-[#1B3A32] text-white font-semibold rounded-full px-8 py-3.5 hover:bg-[#24493f] hover:shadow-xl hover:shadow-[#1B3A32]/20 transition-all duration-300 hover:-translate-y-0.5 text-sm">
                Iniciar sesión o crear cuenta
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
              <p className="mt-6"><Link href="/" className="text-xs text-[#1a1a1a]/25 hover:text-[#1a1a1a]/50 transition-colors">← Volver a Adapto</Link></p>
            </div>
          </div>
        ) : authLoading ? (
          <div className="max-w-lg mx-auto mt-16 text-center">
            <div className="w-10 h-10 rounded-full border-2 border-[#1B3A32]/10 border-t-[#1B3A32] animate-spin mx-auto" />
          </div>
        ) : (
          <>
            {/* PAGE HEADER */}
            <div className="mb-10">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase rounded-full px-3 py-1.5 bg-[#1B3A32]/[0.06] text-[#1B3A32] border border-[#1B3A32]/10 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1B3A32] animate-pulse" />
                Adaptador de examenes
              </div>
              <h1 className="font-display text-4xl md:text-5xl tracking-tight text-[#1a1a1a]">
                Adapta cualquier examen<br />
                <span className="text-[#1B3A32]">en segundos.</span>
              </h1>
              <p className="text-lg text-[#1a1a1a]/40 mt-3 max-w-2xl">Sube el examen en foto, PDF o texto. Selecciona el perfil del alumno y obtén el informe completo.</p>
            </div>

            {/* FORM + PREVIEW GRID */}
            <div className="grid lg:grid-cols-12 gap-6 items-start">
              {/* LEFT: FORM */}
              <div className="lg:col-span-5 space-y-4">
                <form onSubmit={ejecutarAuditoria} className="bg-white rounded-3xl border border-black/[0.04] shadow-xl shadow-black/[0.03] p-7 space-y-5">
                  {/* CURSO + MATERIA */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* CURSO */}
                    <div className="relative" ref={cursoRef}>
                      <label className="block text-[11px] font-semibold text-[#1a1a1a]/40 uppercase tracking-wider mb-2">Curso</label>
                      <button type="button" onClick={() => setCursoOpen(!cursoOpen)} className="w-full rounded-xl border border-black/[0.06] bg-[#faf8f5] px-4 py-3 text-sm text-left outline-none focus:ring-2 focus:ring-[#1B3A32]/15 focus:border-[#1B3A32]/30 transition-all cursor-pointer flex items-center justify-between gap-2">
                        <span className="truncate text-[#1a1a1a]/80">{curso}</span>
                        <svg className={`w-4 h-4 text-[#1a1a1a]/25 transition-transform duration-200 shrink-0 ${cursoOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                      </button>
                      {cursoOpen && (
                        <div className="absolute z-50 mt-2 w-full bg-white rounded-2xl border border-black/[0.06] shadow-2xl shadow-black/[0.08] overflow-hidden">
                          <div className="p-3 border-b border-black/[0.04]">
                            <div className="relative">
                              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1a1a1a]/25" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
                              <input ref={cursoSearchRef} type="text" value={cursoSearch} onChange={(e) => setCursoSearch(e.target.value)} placeholder="Buscar curso..." className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-[#faf8f5] border border-black/[0.04] outline-none focus:ring-1 focus:ring-[#1B3A32]/15 placeholder:text-[#1a1a1a]/20" />
                            </div>
                          </div>
                          <div className="max-h-64 overflow-y-auto py-1">
                            {(() => {
                              const primaria = CURSOS.filter(c => c.includes('Primaria'));
                              const eso = CURSOS.filter(c => c.includes('ESO'));
                              const bach = CURSOS.filter(c => c.includes('Bachillerato'));
                              const sections = [
                                { label: 'Primaria', color: 'bg-[#1B3A32]', items: primaria },
                                { label: 'ESO', color: 'bg-[#92400e]', items: eso },
                                { label: 'Bachillerato', color: 'bg-[#1e40af]', items: bach },
                              ];
                              return sections.filter(s => s.items.some(c => c.toLowerCase().includes(cursoSearch.toLowerCase()))).map((s) => (
                                <div key={s.label}>
                                  <div className="px-4 pt-3 pb-1.5 flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full ${s.color}`} />
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/30">{s.label}</span>
                                  </div>
                                  {s.items.filter(c => c.toLowerCase().includes(cursoSearch.toLowerCase())).map((c) => (
                                    <button key={c} type="button" onClick={() => { setCurso(c); setCursoOpen(false); setCursoSearch(''); }} className={`w-full text-left px-5 py-2.5 text-sm transition-colors flex items-center gap-3 ${c === curso ? 'bg-[#1B3A32]/[0.05] text-[#1B3A32] font-medium' : 'text-[#1a1a1a]/70 hover:bg-[#faf8f5]'}`}>
                                      {c === curso && <svg className="w-3.5 h-3.5 text-[#1B3A32] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>}
                                      <span className={c === curso ? '' : 'pl-[22px]'}>{c}</span>
                                    </button>
                                  ))}
                                </div>
                              ));
                            })()}
                          </div>
                        </div>
                      )}
                    </div>
                    {/* MATERIA */}
                    <div>
                      <label className="block text-[11px] font-semibold text-[#1a1a1a]/40 uppercase tracking-wider mb-2">Materia</label>
                      <div className="relative">
                        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1a1a1a]/20 pointer-events-none" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>
                        <input type="text" value={materia} onChange={(e) => setMateria(e.target.value)} required placeholder="Ej: Matemáticas" className="w-full rounded-xl border border-black/[0.06] bg-[#faf8f5] pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1B3A32]/15 focus:border-[#1B3A32]/30 transition-all placeholder:text-[#1a1a1a]/20" />
                      </div>
                    </div>
                  </div>

                  {/* PERFIL */}
                  <div className="relative" ref={perfilRef}>
                    <label className="block text-[11px] font-semibold text-[#1a1a1a]/40 uppercase tracking-wider mb-2">Perfil del alumno</label>
                    <button type="button" onClick={() => setPerfilOpen(!perfilOpen)} className="w-full rounded-xl border border-black/[0.06] bg-[#faf8f5] px-4 py-3 text-sm text-left outline-none focus:ring-2 focus:ring-[#1B3A32]/15 focus:border-[#1B3A32]/30 transition-all cursor-pointer flex items-center justify-between gap-2 group">
                      <span className="truncate text-[#1a1a1a]/80">{perfil}</span>
                      <svg className={`w-4 h-4 text-[#1a1a1a]/25 transition-transform duration-200 ${perfilOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                    </button>
                    {perfilOpen && (
                      <div className="absolute z-50 mt-2 w-full bg-white rounded-2xl border border-black/[0.06] shadow-2xl shadow-black/[0.08] overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                        <div className="p-3 border-b border-black/[0.04]">
                          <div className="relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1a1a1a]/25" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
                            <input ref={perfilSearchRef} type="text" value={perfilSearch} onChange={(e) => setPerfilSearch(e.target.value)} placeholder="Buscar perfil..." className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-[#faf8f5] border border-black/[0.04] outline-none focus:ring-1 focus:ring-[#1B3A32]/15 placeholder:text-[#1a1a1a]/20" />
                          </div>
                        </div>
                        <div className="max-h-64 overflow-y-auto py-1 scrollbar-thin">
                          {PERFILES.map((g) => {
                            const filtered = g.items.filter((i) => i.toLowerCase().includes(perfilSearch.toLowerCase()));
                            if (filtered.length === 0) return null;
                            const groupColors = { 'Trastornos del Neurodesarrollo': 'bg-[#1B3A32]', 'Dificultades de Aprendizaje': 'bg-[#92400e]', 'Otros Perfiles': 'bg-[#1e40af]' };
                            return (
                              <div key={g.group}>
                                <div className="px-4 pt-3 pb-1.5 flex items-center gap-2">
                                  <div className={`w-1.5 h-1.5 rounded-full ${groupColors[g.group] || 'bg-[#1a1a1a]/20'}`} />
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/30">{g.group}</span>
                                </div>
                                {filtered.map((item) => {
                                  const locked = !esPro && !PERFILES_GRATIS.includes(item);
                                  return (
                                    <button key={item} type="button" disabled={locked} onClick={() => { if (!locked) { setPerfil(item); setPerfilOpen(false); setPerfilSearch(''); } }} className={`w-full text-left px-5 py-2.5 text-sm transition-colors flex items-center gap-3 ${locked ? 'opacity-40 cursor-not-allowed' : item === perfil ? 'bg-[#1B3A32]/[0.05] text-[#1B3A32] font-medium' : 'text-[#1a1a1a]/70 hover:bg-[#faf8f5]'}`}>
                                      {item === perfil && <svg className="w-3.5 h-3.5 text-[#1B3A32] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>}
                                      <span className={item === perfil ? '' : 'pl-[22px]'}>{item}</span>
                                      {locked && (
                                        <svg className="w-3 h-3 text-[#1a1a1a]/20 shrink-0 ml-auto" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* FILE UPLOAD DROP ZONE */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1a1a1a]/40 uppercase tracking-wider mb-2">Examen</label>
                    {previewUrl ? (
                      <div className="rounded-2xl border border-black/[0.06] overflow-hidden bg-white">
                        <div className="px-4 py-2.5 bg-[#faf8f5] border-b border-black/[0.04] flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-[#1B3A32]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
                            <span className="text-xs font-medium text-[#1a1a1a]/60 truncate max-w-[180px]">{nombreArchivo}</span>
                          </div>
                          <button type="button" onClick={() => { setPreviewUrl(null); setArchivoData(null); setNombreArchivo(''); }} className="text-[10px] font-semibold text-[#c43e3e] hover:text-[#c43e3e]/70 cursor-pointer transition-colors">Quitar</button>
                        </div>
                        {previewUrl.startsWith('data:application/pdf') ? <iframe src={previewUrl} className="w-full h-48" title="Vista previa" /> : <NextImage src={previewUrl} alt="Vista previa" width={600} height={400} unoptimized className="w-full max-h-56 object-contain" />}
                      </div>
                    ) : (
                      <div onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={(e) => { e.preventDefault(); setDragOver(false); procesarArchivo(e.dataTransfer.files?.[0]); }} onClick={() => fileRef.current?.click()} className={'relative rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-300 ' + (dragOver ? 'border-[#1B3A32]/40 bg-[#1B3A32]/[0.03] scale-[1.01]' : 'border-black/[0.08] hover:border-[#1B3A32]/20 hover:bg-[#1B3A32]/[0.01]')}>
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#1B3A32]/[0.06] to-[#1B3A32]/[0.02] border border-[#1B3A32]/10 flex items-center justify-center">
                          <svg className="w-7 h-7 text-[#1B3A32]/30" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" /></svg>
                        </div>
                        <p className="text-sm font-semibold text-[#1a1a1a]/60 mb-1">{dragOver ? 'Suelta el archivo aqui' : 'Arrastra un examen o haz clic'}</p>
                        <p className="text-xs text-[#1a1a1a]/30">PDF, JPG, PNG o imagen</p>
                        <input ref={fileRef} type="file" accept="image/*,application/pdf" onChange={(e) => procesarArchivo(e.target.files?.[0])} className="hidden" />
                      </div>
                    )}
                  </div>

                  {/* TEXTAREA */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1a1a1a]/40 uppercase tracking-wider mb-2">O escribe / pega las preguntas</label>
                    <div className="relative group">
                      <svg className="absolute left-3.5 top-3.5 w-4 h-4 text-[#1a1a1a]/20 pointer-events-none" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
                      <textarea rows={4} value={textoExamen} onChange={(e) => setTextoExamen(e.target.value)} placeholder="Pega aquí el texto del examen si no tienes archivo..." className="w-full rounded-xl border border-black/[0.06] bg-[#faf8f5] pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1B3A32]/15 focus:border-[#1B3A32]/30 transition-all resize-none placeholder:text-[#1a1a1a]/20 leading-relaxed" />
                      {textoExamen.length > 0 && (
                        <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${textoExamen.length > 5000 ? 'bg-[#c43e3e]' : textoExamen.length > 2000 ? 'bg-amber-400' : 'bg-[#1B3A32]/40'}`} />
                          <span className="text-[10px] text-[#1a1a1a]/25 tabular-nums">{textoExamen.length.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* SUBMIT */}
                  <button type="submit" disabled={procesando || (!archivoData && !textoExamen.trim()) || (!esPro && limiteAlcanzado)} className="group w-full bg-[#1B3A32] text-white font-semibold rounded-xl px-6 py-4 hover:bg-[#24493f] hover:shadow-xl hover:shadow-[#1B3A32]/20 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none text-sm flex items-center justify-center gap-2">
                    {procesando ? (
                      <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Analizando...</>
                    ) : (!esPro && limiteAlcanzado) ? 'Limite alcanzado' : (
                      <>Adaptar examen
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                      </>
                    )}
                  </button>
                  {!esPro && (
                    <p className="text-[11px] text-center text-[#1a1a1a]/25">
                      {usadas < 3 ? `${3 - usadas} de 3 adaptaciones gratis restantes` : 'Limite gratis alcanzado'}
                    </p>
                  )}
                </form>

                {/* ADAPTATION STATS */}
                {resultado && (
                  <div className="mt-4 bg-white rounded-3xl border border-black/[0.04] shadow-xl shadow-black/[0.03] p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-lg bg-[#1B3A32]/[0.06] flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-[#1B3A32]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>
                      </div>
                      <span className="text-[11px] font-semibold text-[#1a1a1a]/40 uppercase tracking-wider">Resumen de la adaptación</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {/* SCORE */}
                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1B3A32] to-[#2d6b5a] p-4 text-white">
                        <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-[40px] bg-white/[0.06]" />
                        <p className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1">Puntuación</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold tabular-nums font-mono-score">{statsAnim.score}</span>
                          <span className="text-xs text-white/40">/100</span>
                        </div>
                      </div>
                      {/* CRITERIOS */}
                      <div className="relative overflow-hidden rounded-2xl bg-[#faf8f5] border border-black/[0.04] p-4">
                        <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-[40px] bg-[#1B3A32]/[0.03]" />
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/30 mb-1">Criterios OK</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold tabular-nums font-mono-score text-[#1B3A32]">{statsAnim.conformes}</span>
                          <span className="text-xs text-[#1a1a1a]/25">/4</span>
                        </div>
                        <div className="mt-2 h-1 rounded-full bg-black/[0.04] overflow-hidden">
                          <div className="h-full rounded-full bg-[#1B3A32]/60 transition-all duration-700" style={{ width: `${(conformes / 4) * 100}%` }} />
                        </div>
                      </div>
                      {/* PREGUNTAS ADAPTADAS */}
                      <div className="relative overflow-hidden rounded-2xl bg-[#faf8f5] border border-black/[0.04] p-4">
                        <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-[40px] bg-emerald-500/[0.04]" />
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/30 mb-1">Preguntas adaptadas</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold tabular-nums font-mono-score text-emerald-600">{statsAnim.preguntas}</span>
                        </div>
                      </div>
                      {/* CON PISTAS */}
                      <div className="relative overflow-hidden rounded-2xl bg-[#faf8f5] border border-black/[0.04] p-4">
                        <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-[40px] bg-amber-500/[0.04]" />
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/30 mb-1">Con justificación</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold tabular-nums font-mono-score text-amber-600">{statsAnim.pistas}</span>
                          <span className="text-xs text-[#1a1a1a]/25">/{totalPreguntas}</span>
                        </div>
                        {totalPreguntas > 0 && (
                          <div className="mt-2 h-1 rounded-full bg-black/[0.04] overflow-hidden">
                            <div className="h-full rounded-full bg-amber-400/60 transition-all duration-700" style={{ width: `${(conJustificacion / totalPreguntas) * 100}%` }} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ADAPBOT */}
                {resultado && (
                  <AdapBot perfil={perfil} resultado={resultado} curso={curso} materia={materia} esPro={esPro} />
                )}

                {/* SABER MÁS CARD */}
                {resultado && PERFIL_SLUG_MAP[perfil] && (
                  <Link href={`/perfil/${PERFIL_SLUG_MAP[perfil]}`} className="mt-4 block bg-white rounded-3xl border border-black/[0.04] shadow-xl shadow-black/[0.03] p-5 hover:shadow-2xl hover:shadow-[#1B3A32]/[0.06] hover:-translate-y-0.5 transition-all duration-300 group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1B3A32] to-[#2d6b5a] flex items-center justify-center shrink-0 shadow-lg shadow-[#1B3A32]/15 group-hover:scale-105 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#1B3A32]/40 mb-0.5">Aprende más</p>
                        <p className="text-sm font-semibold text-[#1a1a1a] group-hover:text-[#1B3A32] transition-colors">Conoce en profundidad el perfil «{perfil}»</p>
                        <p className="text-xs text-[#1a1a1a]/35 mt-0.5">Qué es, impacto en exámenes, adaptaciones y estudios científicos</p>
                      </div>
                      <svg className="w-5 h-5 text-[#1a1a1a]/15 group-hover:text-[#1B3A32] group-hover:translate-x-1 transition-all duration-300 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                    </div>
                  </Link>
                )}

                {error && (
                  <div className="bg-[#c43e3e]/[0.04] border border-[#c43e3e]/15 rounded-2xl px-5 py-4 flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#c43e3e] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
                    <p className="text-sm text-[#c43e3e]/80">{error}</p>
                  </div>
                )}
              </div>

              {/* RIGHT: RESULTS */}
              <div className="lg:col-span-7">
                {/* EMPTY STATE */}
                {!resultado && !procesando && (
                  <div className="bg-white rounded-3xl border border-black/[0.04] shadow-xl shadow-black/[0.03] p-12 text-center min-h-[500px] flex flex-col items-center justify-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-[#1B3A32]/[0.06] to-[#1B3A32]/[0.01] border border-[#1B3A32]/8 flex items-center justify-center">
                      <svg className="w-12 h-12 text-[#1B3A32]/20" viewBox="0 0 200 160" fill="none">
                        <rect x="20" y="15" width="160" height="130" rx="12" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 4" />
                        <rect x="40" y="35" width="120" height="6" rx="3" fill="currentColor" fillOpacity="0.15" />
                        <rect x="40" y="52" width="90" height="6" rx="3" fill="currentColor" fillOpacity="0.1" />
                        <rect x="40" y="69" width="105" height="6" rx="3" fill="currentColor" fillOpacity="0.1" />
                        <rect x="40" y="86" width="70" height="6" rx="3" fill="currentColor" fillOpacity="0.1" />
                        <circle cx="150" cy="115" r="20" fill="currentColor" fillOpacity="0.08" />
                        <path d="M143 115l5 5 10-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="font-display text-xl text-[#1a1a1a]/70 mb-2">Tu informe aparecera aqui</h3>
                    <p className="text-sm text-[#1a1a1a]/30 max-w-xs">Sube un examen y haz clic en adaptar. El informe DUA, dictamen y examen adaptado se mostraran en esta zona.</p>
                  </div>
                )}

                {/* LOADING STATE */}
                {procesando && (
                  <div className="bg-white rounded-3xl border border-black/[0.04] shadow-xl shadow-black/[0.03] p-12 text-center min-h-[500px] flex flex-col items-center justify-center">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 rounded-full border-[3px] border-[#1B3A32]/10" />
                      <div className="absolute inset-0 w-20 h-20 rounded-full border-[3px] border-transparent border-t-[#1B3A32] animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-lg bg-[#1B3A32]/[0.06] flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#1B3A32] animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 20L12 4L20 20" /><path d="M7.5 14H16.5" /></svg>
                        </div>
                      </div>
                    </div>
                    <p className="font-display text-lg text-[#1a1a1a]/70 mb-1">Analizando el examen...</p>
                    <p className="text-sm text-[#1a1a1a]/30">Revisando criterios DUA, NEAE y LOMLOE</p>
                    <div className="flex items-center gap-2 mt-6">
                      {['Dictamen', 'Criterios', 'Adaptaciones'].map((step, i) => (
                        <div key={step} className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5 bg-[#1B3A32]/[0.04] rounded-full px-3 py-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#1B3A32]/40 animate-pulse" style={{ animationDelay: `${i * 300}ms` }} />
                            <span className="text-[11px] text-[#1B3A32]/60 font-medium">{step}</span>
                          </div>
                          {i < 2 && <div className="w-4 h-px bg-[#1B3A32]/10" />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* RESULTS */}
                {resultado && (
                  <div className="space-y-6">
                    {/* SCORE HERO */}
                    <div className="bg-white rounded-3xl border border-black/[0.04] shadow-xl shadow-black/[0.03] overflow-hidden">
                      <div className="px-8 py-8 flex flex-col md:flex-row items-center gap-8">
                        {/* CIRCULAR SCORE */}
                        <div className="relative shrink-0">
                          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f0f0f0" strokeWidth="2" />
                            <circle cx="18" cy="18" r="15.9155" fill="none" stroke={scoreColor} strokeWidth="2.5" strokeDasharray={`${score}, 100`} strokeLinecap="round" className="transition-all duration-1000" />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="font-mono-score text-4xl font-bold" style={{ color: scoreColor }}>{score}</span>
                            <span className="text-[10px] text-[#1a1a1a]/25 font-medium">/100</span>
                          </div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <div className="flex flex-wrap items-center gap-2 mb-3 justify-center md:justify-start">
                            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${(resultado.estado_cumplimiento || '') === 'APROBADO' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : (resultado.estado_cumplimiento || '') === 'REQUIERE_AJUSTES' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                              {resultado.estado_cumplimiento === 'APROBADO' && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>}
                              {(resultado.estado_cumplimiento || '').replace('_', ' ')}
                            </span>
                            <span className="text-xs text-[#1a1a1a]/30">{conformes}/{totalCriterios} criterios conformes</span>
                          </div>
                          <h2 className="font-display text-2xl text-[#1a1a1a] mb-2">Dictamen psicopedagogico</h2>
                          <p className="text-sm text-[#1a1a1a]/45 leading-relaxed">{resultado.dictamen_general}</p>
                        </div>
                        <button onClick={generarPDF} disabled={descargando} className="shrink-0 group flex items-center gap-2 bg-[#1B3A32] text-white font-semibold rounded-xl px-5 py-3 hover:bg-[#24493f] hover:shadow-lg hover:shadow-[#1B3A32]/20 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-40 text-sm cursor-pointer">
                          {descargando ? <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Generando...</> : <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg> PDF</>}
                        </button>
                      </div>
                      {/* DUA EXPLANATION */}
                      <div className="px-8 pb-6">
                        <div className="bg-[#faf8f5] rounded-xl p-4 border border-black/[0.04]">
                          <p className="text-xs text-[#1a1a1a]/40 leading-relaxed">
                            <span className="font-semibold text-[#1a1a1a]/60">Índice DUA:</span> Mide el nivel de accesibilidad del examen (0-100) según las directrices DUA y el marco de atención a la diversidad LOMLOE.
                            {score >= 80 ? ' Cumple mayoritariamente con los principios DUA.' : score >= 50 ? ' Necesita mejoras metodológicas para facilitar el acceso al contenido.' : ' Presenta barreras de acceso significativas. Es recomendable reformularlo.'}
                          </p>
                          <p className="text-[11px] text-[#1a1a1a]/30 mt-2 border-t border-black/[0.04] pt-2">
                            Documentación técnica de soporte metodológico para el equipo docente y CCP. La aprobación formal y aplicación final de cualquier adaptación corresponde al centro educativo.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* TABS */}
                    <div className="flex items-center gap-1 bg-white rounded-xl border border-black/[0.04] p-1">
                      {[{ id: 'dictamen', label: 'Criterios tecnicos', count: totalCriterios }, { id: 'adaptado', label: 'Examen adaptado', count: resultado.examen_adaptado?.length || 0 }].map((tab) => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={'flex-1 flex items-center justify-center gap-2 text-sm font-medium rounded-lg px-4 py-3 transition-all duration-300 cursor-pointer ' + (activeTab === tab.id ? 'bg-[#1B3A32] text-white shadow-sm' : 'text-[#1a1a1a]/40 hover:text-[#1a1a1a]/60 hover:bg-black/[0.02]')}>
                          {tab.label}
                          <span className={'text-[10px] font-bold px-1.5 py-0.5 rounded-full ' + (activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-[#1B3A32]/[0.06] text-[#1B3A32]/50')}>{tab.count}</span>
                        </button>
                      ))}
                    </div>

                    {/* TAB: CRITERIOS — REWORKED */}
                    {activeTab === 'dictamen' && (
                      <div className="space-y-4">
                        {/* SUMMARY BAR */}
                        <div className="bg-white rounded-2xl border border-black/[0.04] p-5">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold text-[#1a1a1a]/40 uppercase tracking-wider">Cumplimiento por criterio</span>
                            <span className="text-xs font-bold text-[#1B3A32]">{conformes}/4</span>
                          </div>
                          <div className="flex gap-2">
                            {resultado.auditoria_por_criterio?.map((item, i) => (
                              <div key={i} className="flex-1 group/bar">
                                <div className="h-2 rounded-full bg-black/[0.03] overflow-hidden">
                                  <div className={`h-full rounded-full transition-all duration-700 ease-out ${item.cumple ? 'bg-gradient-to-r from-[#1B3A32] to-emerald-400' : 'bg-gradient-to-r from-amber-400 to-amber-300'}`} style={{ width: item.cumple ? '100%' : '35%', transitionDelay: `${i * 100}ms` }} />
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-2 mt-2">
                            {resultado.auditoria_por_criterio?.map((item, i) => (
                              <div key={i} className="flex-1 text-center">
                                <span className={`text-[9px] font-medium ${item.cumple ? 'text-[#1B3A32]/50' : 'text-amber-500/60'}`}>{item.cumple ? '✓' : '△'}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* CRITERION CARDS */}
                        {resultado.auditoria_por_criterio?.map((item, idx) => (
                          <div key={idx} className="bg-white rounded-2xl border border-black/[0.04] overflow-hidden hover:shadow-lg hover:shadow-black/[0.03] transition-all duration-500 group">
                            <div className="p-5">
                              <div className="flex items-start gap-4">
                                {/* STATUS RING */}
                                <div className="relative shrink-0">
                                  <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                                    <circle cx="18" cy="18" r="14" fill="none" stroke={item.cumple ? '#dcfce7' : '#fef3c7'} strokeWidth="3" />
                                    <circle cx="18" cy="18" r="14" fill="none" stroke={item.cumple ? '#1B3A32' : '#f59e0b'} strokeWidth="3" strokeDasharray={item.cumple ? '88 100' : '30 100'} strokeLinecap="round" className="transition-all duration-700" />
                                  </svg>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    {item.cumple ? (
                                      <svg className="w-4 h-4 text-[#1B3A32]" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                                    ) : (
                                      <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
                                    )}
                                  </div>
                                </div>
                                {/* CONTENT */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-bold text-[#1a1a1a]/25">0{idx + 1}</span>
                                    <h4 className="text-sm font-semibold text-[#1a1a1a]">{item.criterio}</h4>
                                  </div>
                                  <p className="text-sm text-[#1a1a1a]/40 leading-relaxed mb-3">{item.observacion}</p>
                                  <div className={`rounded-xl px-4 py-3 border ${item.cumple ? 'bg-[#1B3A32]/[0.02] border-[#1B3A32]/[0.06]' : 'bg-amber-50/50 border-amber-100'}`}>
                                    <div className="flex items-start gap-2">
                                      <svg className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${item.cumple ? 'text-[#1B3A32]/50' : 'text-amber-500/70'}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" /></svg>
                                      <p className="text-xs leading-relaxed">
                                        <span className={`font-semibold ${item.cumple ? 'text-[#1B3A32]/70' : 'text-amber-700/80'}`}>{item.cumple ? 'Mantenimiento: ' : 'Recomendación: '}</span>
                                        <span className={item.cumple ? 'text-[#1B3A32]/50' : 'text-amber-600/60'}>{item.recomendacion_concreta}</span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* TAB: EXAMEN ADAPTADO — REWORKED */}
                    {activeTab === 'adaptado' && resultado.examen_adaptado?.length > 0 && (
                      <div className="space-y-4">
                        {/* ADAPTATION LEGEND */}
                        <div className="bg-white rounded-2xl border border-black/[0.04] px-5 py-3 flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#c43e3e]/40" />
                            <span className="text-[10px] font-medium text-[#1a1a1a]/35">Original</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-[10px] font-medium text-[#1a1a1a]/35">Adaptado</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-amber-400" />
                            <span className="text-[10px] font-medium text-[#1a1a1a]/35">Justificación</span>
                          </div>
                        </div>

                        {/* QUESTION CARDS */}
                        {resultado.examen_adaptado.map((pregunta, idx) => {
                          const isBlurred = !esPro && idx >= 1;
                          return (
                            <div key={idx} className="relative bg-white rounded-2xl border border-black/[0.04] overflow-hidden hover:shadow-lg hover:shadow-black/[0.03] transition-all duration-500">
                              {/* QUESTION HEADER */}
                              <div className="px-5 py-3.5 bg-[#faf8f5] border-b border-black/[0.04] flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-[#1B3A32] text-white font-mono-score font-bold text-xs flex items-center justify-center shadow-sm">{pregunta.numero}</div>
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100 uppercase tracking-wider">Adaptada</span>
                              </div>

                              {/* BEFORE / AFTER SPLIT */}
                              <div className={`p-5 ${isBlurred ? 'blur-[6px] select-none' : ''}`}>
                                {/* TAGS ROW */}
                                <div className="flex flex-wrap items-center gap-2 mb-4">
                                  {pregunta.tipo_adaptacion && (
                                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#1B3A32] bg-[#1B3A32]/[0.06] px-2.5 py-1 rounded-full border border-[#1B3A32]/10">
                                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" /></svg>
                                      {pregunta.tipo_adaptacion}
                                    </span>
                                  )}
                                  {pregunta.criterio_dua && (
                                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#6b4c9a] bg-[#6b4c9a]/[0.06] px-2.5 py-1 rounded-full border border-[#6b4c9a]/10">
                                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" /></svg>
                                      DUA · {pregunta.criterio_dua}
                                    </span>
                                  )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {/* ORIGINAL */}
                                  <div className="rounded-xl bg-[#c43e3e]/[0.02] border border-[#c43e3e]/[0.06] p-4">
                                    <div className="flex items-center gap-1.5 mb-2">
                                      <div className="w-1.5 h-1.5 rounded-full bg-[#c43e3e]/40" />
                                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#c43e3e]/40">Original</span>
                                    </div>
                                    <p className="text-sm text-[#1a1a1a]/30 leading-relaxed line-through decoration-[#c43e3e]/20">{pregunta.enunciado_original}</p>
                                    {esPro && pregunta.complejidad_original != null && (
                                      <div className="mt-3 flex items-center gap-2">
                                        <span className="text-[9px] text-[#1a1a1a]/25 font-medium">Complejidad</span>
                                        <div className="flex-1 h-1.5 bg-black/[0.04] rounded-full overflow-hidden">
                                          <div className="h-full rounded-full bg-[#c43e3e]/30 transition-all duration-700" style={{ width: `${(pregunta.complejidad_original / 10) * 100}%` }} />
                                        </div>
                                        <span className="text-[10px] font-mono-score font-bold text-[#1a1a1a]/25">{pregunta.complejidad_original}/10</span>
                                      </div>
                                    )}
                                  </div>
                                  {/* ADAPTADO */}
                                  <div className="rounded-xl bg-emerald-50/40 border border-emerald-100 p-4">
                                    <div className="flex items-center gap-1.5 mb-2">
                                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                      <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600/60">Adaptado</span>
                                    </div>
                                    <p className="text-sm text-[#1a1a1a]/80 leading-relaxed font-medium">{pregunta.enunciado_adaptado}</p>
                                    {esPro && pregunta.complejidad_adaptada != null && (
                                      <div className="mt-3 flex items-center gap-2">
                                        <span className="text-[9px] text-[#1a1a1a]/25 font-medium">Complejidad</span>
                                        <div className="flex-1 h-1.5 bg-black/[0.04] rounded-full overflow-hidden">
                                          <div className="h-full rounded-full bg-emerald-500/40 transition-all duration-700" style={{ width: `${(pregunta.complejidad_adaptada / 10) * 100}%` }} />
                                        </div>
                                        <span className="text-[10px] font-mono-score font-bold text-emerald-600/50">{pregunta.complejidad_adaptada}/10</span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* JUSTIFICACIÓN */}
                                {pregunta.justificacion_adaptacion && (
                                  <div className="mt-3 rounded-xl bg-amber-50/60 border border-amber-200/50 p-3.5">
                                    <div className="flex items-center gap-2 mb-1.5">
                                      <svg className="w-3.5 h-3.5 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>
                                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700/60">Por qué esta adaptación</span>
                                    </div>
                                    <p className="text-xs text-amber-900/70 leading-relaxed">{pregunta.justificacion_adaptacion}</p>
                                  </div>
                                )}

                                {/* CONSEJO DE AULA */}
                                {pregunta.consejo_aula && (
                                  <div className="mt-2.5 rounded-xl bg-[#1B3A32]/[0.03] border border-[#1B3A32]/[0.08] p-3.5">
                                    <div className="flex items-center gap-2 mb-1.5">
                                      <svg className="w-3.5 h-3.5 text-[#1B3A32] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M9.75 18.75h4.5" /></svg>
                                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B3A32]/50">Consejo de aula</span>
                                    </div>
                                    <p className="text-xs text-[#1B3A32]/60 leading-relaxed">{pregunta.consejo_aula}</p>
                                  </div>
                                )}
                              </div>

                              {/* PRO GATE OVERLAY */}
                              {isBlurred && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-white via-white/95 to-white/80 backdrop-blur-[2px]">
                                  <div className="text-center px-6">
                                    <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-[#1B3A32] to-[#2d6b5a] flex items-center justify-center shadow-lg shadow-[#1B3A32]/20">
                                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                                    </div>
                                    <p className="text-sm font-semibold text-[#1a1a1a]/70 mb-1">Resto del informe</p>
                                    <p className="text-xs text-[#1a1a1a]/35 mb-4">Desbloquea todas las adaptaciones con Pro</p>
                                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B3A32] bg-[#1B3A32]/[0.06] px-4 py-2 rounded-full border border-[#1B3A32]/10">
                                      {resultado.examen_adaptado.length - 1} preguntas más
                                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {activeTab === 'adaptado' && (!resultado.examen_adaptado || resultado.examen_adaptado.length === 0) && (
                      <div className="bg-white rounded-2xl border border-black/[0.04] p-10 text-center">
                        <p className="text-sm text-[#1a1a1a]/30">No se genero examen adaptado para esta auditoria.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      {/* LIMIT MODAL */}
      {limiteAlcanzado && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setLimiteAlcanzado(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
            </div>
            <h2 className="font-display text-2xl text-[#1a1a1a] mb-2">Limite alcanzado</h2>
            <p className="text-sm text-[#1a1a1a]/45 mb-6">Has utilizado las <strong>3 adaptaciones gratis</strong>. Actualiza a Pro para continuar sin limites.</p>
            <div className="bg-[#faf8f5] rounded-xl p-4 text-left text-xs space-y-2 mb-6 border border-black/[0.04]">
              <div className="font-semibold text-[#1B3A32]">Plan Pro — 35 EUR/mes</div>
              <ul className="text-[#1a1a1a]/50 space-y-1">
                <li className="flex items-center gap-2"><svg className="w-3.5 h-3.5 text-[#1B3A32] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg> Adaptaciones ilimitadas</li>
                <li className="flex items-center gap-2"><svg className="w-3.5 h-3.5 text-[#1B3A32] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg> PDF sin marca de agua</li>
                <li className="flex items-center gap-2"><svg className="w-3.5 h-3.5 text-[#1B3A32] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg> 16 perfiles NEAE</li>
                <li className="flex items-center gap-2"><svg className="w-3.5 h-3.5 text-[#1B3A32] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg> Diagnosticador IA</li>
                <li className="flex items-center gap-2"><svg className="w-3.5 h-3.5 text-[#1B3A32] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg> AdapBot con contexto completo</li>
              </ul>
            </div>
            <button onClick={() => setLimiteAlcanzado(false)} className="w-full bg-[#1a1a1a] text-white font-semibold rounded-xl px-6 py-3.5 hover:bg-[#1a1a1a]/90 transition-colors text-sm cursor-pointer">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
