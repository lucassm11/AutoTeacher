// app/historial/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export default function Historial() {
  const router = useRouter();

  const [usuario, setUsuario] = useState(null);
  const [comprobandoSesion, setComprobandoSesion] = useState(true);
  const [correcciones, setCorrecciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [abierta, setAbierta] = useState(null); // id de la corrección expandida

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

  useEffect(() => {
    if (!usuario) return;

    const cargarHistorial = async () => {
      try {
        const q = query(
          collection(db, 'correcciones'),
          where('profesor_id', '==', usuario.uid),
          orderBy('fecha', 'desc')
        );
        const snapshot = await getDocs(q);
        const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCorrecciones(lista);
      } catch (err) {
        // Firestore pide crear un índice compuesto la primera vez que
        // combinas "where" + "orderBy" en campos distintos. Si pasa,
        // el propio error trae un enlace para crearlo con un clic.
        console.error(err);
        setError(
          'No se pudo cargar el historial. Si es la primera vez, revisa la consola del navegador: puede que Firestore te pida crear un índice (con un enlace directo para hacerlo).'
        );
      } finally {
        setCargando(false);
      }
    };

    cargarHistorial();
  }, [usuario]);

  const formatearFecha = (fecha) => {
    if (!fecha?.toDate) return '';
    return fecha.toDate().toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
      <header className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="font-display italic text-2xl text-[color:var(--color-pine)]">
          Auto<span className="text-[color:var(--color-red-pen)]">Gradely</span>
        </Link>
        <Link
          href="/dashboard"
          className="text-sm rounded-lg border border-black/15 px-3 py-1.5 hover:bg-black/5 transition"
        >
          ← Volver a corregir
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <h2 className="font-display text-2xl text-[color:var(--color-pine)] mb-6">
          Historial de correcciones
        </h2>

        {cargando && <p className="text-[color:var(--color-ink)]/60">Cargando historial…</p>}

        {error && (
          <p className="text-sm text-[color:var(--color-red-pen-dark)] bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        {!cargando && !error && correcciones.length === 0 && (
          <div className="text-center border-2 border-dashed border-black/10 rounded-2xl p-12">
            <p className="font-display italic text-lg text-[color:var(--color-ink)]/50">
              Todavía no has confirmado ninguna corrección.
            </p>
            <Link
              href="/dashboard"
              className="inline-block mt-4 text-sm text-[color:var(--color-indigo)] hover:underline"
            >
              Corrige tu primera tarea
            </Link>
          </div>
        )}

        <div className="space-y-3">
          {correcciones.map((c) => {
            const abiertaActual = abierta === c.id;
            return (
              <div
                key={c.id}
                className="bg-white rounded-xl border border-black/5 overflow-hidden"
              >
                <button
                  onClick={() => setAbierta(abiertaActual ? null : c.id)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <div>
                    <p className="text-sm font-medium text-[color:var(--color-ink)]">
                      {formatearFecha(c.fecha)}
                    </p>
                    <p className="text-xs text-[color:var(--color-ink)]/50 mt-0.5 line-clamp-1">
                      {c.rubrica_texto?.slice(0, 60)}…
                    </p>
                  </div>
                  <span className="font-mono-score text-lg text-[color:var(--color-red-pen-dark)]">
                    {c.resultado?.nota_total}/{c.resultado?.nota_sobre}
                  </span>
                </button>

                {abiertaActual && (
                  <div className="border-t border-black/5 px-5 py-4 space-y-3">
                    {c.resultado?.preguntas?.map((p) => (
                      <div key={p.numero} className="border-l-2 border-[color:var(--color-red-pen)]/40 pl-3">
                        <p className="text-sm font-semibold">
                          Pregunta {p.numero}{' '}
                          <span className="font-mono-score text-[color:var(--color-red-pen-dark)]">
                            {p.puntos_obtenidos}/{p.puntos_totales}
                          </span>
                        </p>
                        <p className="text-sm text-[color:var(--color-ink)]/70">{p.comentario}</p>
                      </div>
                    ))}
                    <p className="font-display italic text-sm text-[color:var(--color-ink)]/80 pt-2 border-t border-black/5">
                      {c.resultado?.feedback_general}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
