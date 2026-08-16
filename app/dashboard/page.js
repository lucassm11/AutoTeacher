// app/dashboard/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export default function Dashboard() {
  const router = useRouter();

  const [usuario, setUsuario] = useState(null);
  const [comprobandoSesion, setComprobandoSesion] = useState(true);

  const [rubrica, setRubrica] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [nombreArchivo, setNombreArchivo] = useState('');

  const [corrigiendo, setCorrigiendo] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');
  const [guardado, setGuardado] = useState(false);

  useEffect(() => {
    const desuscribir = onAuthStateChanged(auth, (usuarioActual) => {
      if (usuarioActual) {
        setUsuario(usuarioActual);
      } else {
        router.push('/login');
      }
      setComprobandoSesion(false);
    });
    return () => desuscribir();
  }, [router]);

  const cerrarSesion = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const corregirExamen = async (e) => {
    e.preventDefault();
    setError('');
    setResultado(null);
    setGuardado(false);

    if (!archivo || !rubrica) {
      setError('Sube un archivo y escribe la rúbrica antes de corregir.');
      return;
    }

    setCorrigiendo(true);

    try {
      const formData = new FormData();
      formData.append('archivo', archivo);
      formData.append('rubrica', rubrica);

      const respuesta = await fetch('/api/corregir', {
        method: 'POST',
        body: formData,
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.error || 'Error al corregir el examen.');
      }

      setResultado(datos);
    } catch (err) {
      setError(err.message);
    } finally {
      setCorrigiendo(false);
    }
  };

  const confirmarYGuardar = async () => {
    try {
      await addDoc(collection(db, 'correcciones'), {
        profesor_id: usuario.uid,
        rubrica_texto: rubrica,
        resultado: resultado,
        fecha: serverTimestamp(),
        estado: 'confirmada',
      });
      setGuardado(true);
    } catch (err) {
      setError('No se pudo guardar la corrección: ' + err.message);
    }
  };

  if (comprobandoSesion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[color:var(--color-paper)]">
        <p className="text-[color:var(--color-ink)]/60">Cargando…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[color:var(--color-paper)]">
      {/* Cabecera */}
      <header className="bg-[color:var(--color-pine)] text-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-display italic text-2xl">
            Auto<span className="text-[color:var(--color-gold)]">Teacher</span>
          </h1>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-white/70 hidden sm:inline">{usuario?.email}</span>
            <button
              onClick={cerrarSesion}
              className="rounded-lg border border-white/25 px-3 py-1.5 hover:bg-white/10 transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-2">
        {/* Columna izquierda: formulario */}
        <section className="bg-white rounded-2xl shadow-sm border border-black/5 p-6 h-fit">
          <h2 className="font-display text-xl text-[color:var(--color-pine)] mb-4">
            Corregir una tarea
          </h2>

          <form onSubmit={corregirExamen} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[color:var(--color-ink)]/80 mb-1">
                Rúbrica de corrección
              </label>
              <textarea
                value={rubrica}
                onChange={(e) => setRubrica(e.target.value)}
                rows={7}
                placeholder="Escribe aquí los criterios: preguntas, puntos por pregunta, qué se considera correcto…"
                className="w-full rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[color:var(--color-indigo)] transition resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[color:var(--color-ink)]/80 mb-1">
                Foto o PDF de la tarea
              </label>
              <label className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-black/15 hover:border-[color:var(--color-indigo)] px-4 py-8 cursor-pointer transition text-center">
                <span className="text-sm text-[color:var(--color-ink)]/70">
                  {nombreArchivo || 'Toca para hacer una foto o elegir un archivo'}
                </span>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  capture="environment"
                  onChange={(e) => {
                    setArchivo(e.target.files[0]);
                    setNombreArchivo(e.target.files[0]?.name || '');
                  }}
                  required
                  className="hidden"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={corrigiendo}
              className="w-full rounded-lg bg-[color:var(--color-indigo)] hover:bg-[color:var(--color-indigo-light)] disabled:opacity-60 text-white font-medium py-3 transition shadow-sm"
            >
              {corrigiendo ? 'Corrigiendo…' : 'Corregir'}
            </button>
          </form>

          {error && (
            <p className="mt-4 text-sm text-[color:var(--color-red-pen-dark)] bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
        </section>

        {/* Columna derecha: resultado */}
        <section>
          {!resultado && !corrigiendo && (
            <div className="h-full flex items-center justify-center text-center text-[color:var(--color-ink)]/40 border-2 border-dashed border-black/10 rounded-2xl p-12">
              <p className="font-display italic text-lg">
                El resultado de la corrección aparecerá aquí
              </p>
            </div>
          )}

          {corrigiendo && (
            <div className="h-full flex items-center justify-center text-center text-[color:var(--color-ink)]/50 rounded-2xl p-12">
              <p>Corrigiendo con IA…</p>
            </div>
          )}

          {resultado && (
            <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-6 relative">
              {/* El sello de nota: elemento distintivo */}
              <div className="grade-stamp absolute -top-5 -right-3 sm:right-4 rounded-full w-24 h-24 flex flex-col items-center justify-center bg-white">
                <span className="font-mono-score text-2xl font-semibold leading-none">
                  {resultado.nota_total}
                </span>
                <span className="font-mono-score text-xs opacity-70">
                  / {resultado.nota_sobre}
                </span>
              </div>

              <h3 className="font-display text-xl text-[color:var(--color-pine)] mb-5 pr-20">
                Resultado de la corrección
              </h3>

              <div className="space-y-4">
                {resultado.preguntas.map((pregunta) => (
                  <div
                    key={pregunta.numero}
                    className="border-l-2 border-[color:var(--color-red-pen)]/40 pl-4"
                  >
                    <p className="text-sm font-semibold text-[color:var(--color-ink)]">
                      Pregunta {pregunta.numero}{' '}
                      <span className="font-mono-score text-[color:var(--color-red-pen-dark)]">
                        {pregunta.puntos_obtenidos}/{pregunta.puntos_totales}
                      </span>
                    </p>
                    <p className="text-sm text-[color:var(--color-ink)]/70 mt-0.5">
                      {pregunta.comentario}
                    </p>
                  </div>
                ))}
              </div>

              <p className="font-display italic text-[color:var(--color-ink)]/80 mt-6 pt-5 border-t border-black/5">
                {resultado.feedback_general}
              </p>

              {!guardado ? (
                <button
                  onClick={confirmarYGuardar}
                  className="mt-6 w-full rounded-lg bg-[color:var(--color-pine)] hover:bg-[color:var(--color-pine-light)] text-white font-medium py-3 transition shadow-sm"
                >
                  Confirmar y guardar
                </button>
              ) : (
                <p className="mt-6 text-center text-sm font-medium text-[color:var(--color-pine)] bg-[color:var(--color-paper)] rounded-lg py-2.5">
                  ✓ Guardado correctamente
                </p>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
