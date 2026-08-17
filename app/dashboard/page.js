// app/dashboard/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  increment,
} from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

// Límites diarios del plan gratuito. El plan Pro no tiene límite.
const LIMITE_CORRECCIONES_GRATIS = 5;
const LIMITE_ANOTACIONES_GRATIS = 2;

// Fecha de hoy en formato "AAAA-MM-DD", usada como parte del id del
// documento de uso diario, para que el contador se reinicie solo cada día.
const fechaHoy = () => new Date().toISOString().slice(0, 10);

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

  // --- Rúbricas guardadas ---
  const [rubricasGuardadas, setRubricasGuardadas] = useState([]);
  const [rubricaSeleccionada, setRubricaSeleccionada] = useState('');
  const [mostrarGuardar, setMostrarGuardar] = useState(false);
  const [tituloNuevaRubrica, setTituloNuevaRubrica] = useState('');
  const [guardandoRubrica, setGuardandoRubrica] = useState(false);

  // --- Plan del profesor y Modo Autopiloto ---
  const [plan, setPlan] = useState('gratis');
  const [autopiloto, setAutopiloto] = useState(false);

  // --- Examen anotado visualmente ---
  const [imagenAnotada, setImagenAnotada] = useState(null);
  const [generandoImagen, setGenerandoImagen] = useState(false);
  const [errorImagen, setErrorImagen] = useState('');

  // --- Uso diario (solo aplica límite al plan gratuito) ---
  const [usoHoy, setUsoHoy] = useState({ correcciones: 0, anotaciones: 0 });

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

  // Cuando ya sabemos quién es el profesor, cargamos sus rúbricas, su perfil y su uso de hoy
  useEffect(() => {
    if (!usuario) return;
    cargarRubricasGuardadas();
    cargarOCrearPerfil();
    cargarUsoDiario();
  }, [usuario]);

  const cargarOCrearPerfil = async () => {
    try {
      const perfilRef = doc(db, 'perfiles', usuario.uid);
      const perfilSnap = await getDoc(perfilRef);
      if (perfilSnap.exists()) {
        setPlan(perfilSnap.data().plan || 'gratis');
      } else {
        // Primera vez que este profesor entra: le creamos un perfil en plan gratis
        await setDoc(perfilRef, { plan: 'gratis', email: usuario.email });
        setPlan('gratis');
      }
    } catch (err) {
      console.error('Error al cargar el perfil:', err);
    }
  };

  const idUsoHoy = () => `${usuario.uid}_${fechaHoy()}`;

  const cargarUsoDiario = async () => {
    try {
      const usoRef = doc(db, 'uso_diario', `${usuario.uid}_${fechaHoy()}`);
      const usoSnap = await getDoc(usoRef);
      if (usoSnap.exists()) {
        setUsoHoy({
          correcciones: usoSnap.data().correcciones || 0,
          anotaciones: usoSnap.data().anotaciones || 0,
        });
      } else {
        setUsoHoy({ correcciones: 0, anotaciones: 0 });
      }
    } catch (err) {
      console.error('Error al cargar el uso diario:', err);
    }
  };

  // Suma 1 al contador indicado ("correcciones" o "anotaciones") de hoy.
  // Usamos setDoc con merge para crear el documento si es la primera acción
  // del día, o incrementar si ya existía.
  const incrementarUsoDiario = async (campo) => {
    try {
      const usoRef = doc(db, 'uso_diario', idUsoHoy());
      await setDoc(
        usoRef,
        {
          profesor_id: usuario.uid,
          fecha: fechaHoy(),
          [campo]: increment(1),
        },
        { merge: true }
      );
      setUsoHoy((prev) => ({ ...prev, [campo]: prev[campo] + 1 }));
    } catch (err) {
      console.error('Error al actualizar el uso diario:', err);
    }
  };

  const cargarRubricasGuardadas = async () => {
    try {
      const q = query(
        collection(db, 'rubricas'),
        where('profesor_id', '==', usuario.uid)
      );
      const snapshot = await getDocs(q);
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRubricasGuardadas(lista);
    } catch (err) {
      console.error('Error al cargar rúbricas:', err);
    }
  };

  const cerrarSesion = async () => {
    await signOut(auth);
    router.push('/login');
  };

  // Cuando el profesor elige una rúbrica guardada en el desplegable
  const seleccionarRubrica = (id) => {
    setRubricaSeleccionada(id);
    if (!id) return;
    const encontrada = rubricasGuardadas.find((r) => r.id === id);
    if (encontrada) setRubrica(encontrada.contenido);
  };

  const guardarRubricaActual = async () => {
    if (!rubrica.trim() || !tituloNuevaRubrica.trim()) return;
    setGuardandoRubrica(true);
    try {
      await addDoc(collection(db, 'rubricas'), {
        profesor_id: usuario.uid,
        titulo: tituloNuevaRubrica.trim(),
        contenido: rubrica,
        fecha: serverTimestamp(),
      });
      setTituloNuevaRubrica('');
      setMostrarGuardar(false);
      await cargarRubricasGuardadas();
    } catch (err) {
      setError('No se pudo guardar la rúbrica: ' + err.message);
    } finally {
      setGuardandoRubrica(false);
    }
  };

  const corregirExamen = async (e) => {
    e.preventDefault();
    setError('');
    setResultado(null);
    setGuardado(false);
    setImagenAnotada(null);
    setErrorImagen('');

    if (!archivo || (!autopiloto && !rubrica)) {
      setError(
        autopiloto
          ? 'Sube un archivo antes de corregir.'
          : 'Sube un archivo y escribe la rúbrica antes de corregir.'
      );
      return;
    }

    // Límite diario del plan gratuito
    if (plan !== 'pro' && usoHoy.correcciones >= LIMITE_CORRECCIONES_GRATIS) {
      setError('LIMITE_CORRECCIONES');
      return;
    }

    setCorrigiendo(true);

    try {
      const formData = new FormData();
      formData.append('archivo', archivo);
      formData.append('rubrica', autopiloto ? '' : rubrica);
      formData.append('modo', autopiloto ? 'autopiloto' : 'rubrica');

      const respuesta = await fetch('/api/corregir', {
        method: 'POST',
        body: formData,
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.error || 'Error al corregir el examen.');
      }

      setResultado(datos);
      incrementarUsoDiario('correcciones');

      // Si es una foto (no PDF) y todavía no ha superado su límite diario
      // de fotos anotadas, generamos automáticamente la versión visual.
      const puedeAnotar = plan === 'pro' || usoHoy.anotaciones < LIMITE_ANOTACIONES_GRATIS;
      if (archivo.type?.startsWith('image/') && puedeAnotar) {
        generarImagenAnotada(datos);
      } else if (archivo.type?.startsWith('image/')) {
        setErrorImagen('LIMITE_ANOTACIONES');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setCorrigiendo(false);
    }
  };

  const generarImagenAnotada = async (resultadoData) => {
    setGenerandoImagen(true);
    setErrorImagen('');
    try {
      const formData = new FormData();
      formData.append('archivo', archivo);
      formData.append('resultado', JSON.stringify(resultadoData));
      formData.append('plan', plan);

      const respuesta = await fetch('/api/anotar', {
        method: 'POST',
        body: formData,
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.error || 'No se pudo generar el examen anotado.');
      }

      setImagenAnotada(datos.imagen_base64);
      incrementarUsoDiario('anotaciones');
    } catch (err) {
      setErrorImagen(err.message);
    } finally {
      setGenerandoImagen(false);
    }
  };

  const confirmarYGuardar = async () => {
    try {
      await addDoc(collection(db, 'correcciones'), {
        profesor_id: usuario.uid,
        rubrica_texto: autopiloto ? null : rubrica,
        modo: autopiloto ? 'autopiloto' : 'rubrica',
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
      <header className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="font-display italic text-2xl text-[color:var(--color-pine)]">
          Auto<span className="text-[color:var(--color-red-pen)]">Gradely</span>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              plan === 'pro'
                ? 'bg-[color:var(--color-gold)] text-[color:var(--color-ink)]'
                : 'bg-black/5 text-[color:var(--color-ink)]/60'
            }`}
          >
            Plan {plan === 'pro' ? 'Pro' : 'Gratis'}
          </span>
          <Link
            href="/historial"
            className="text-[color:var(--color-ink)]/70 hover:text-[color:var(--color-ink)] transition"
          >
            Historial
          </Link>
          <span className="text-[color:var(--color-ink)]/50 hidden sm:inline">
            {usuario?.email}
          </span>
          <button
            onClick={cerrarSesion}
            className="rounded-lg border border-black/15 px-3 py-1.5 hover:bg-black/5 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-2">
        <section className="bg-white rounded-2xl shadow-sm border border-black/5 p-6 h-fit">
          <h2 className="font-display text-xl text-[color:var(--color-pine)] mb-4">
            Corregir una tarea
          </h2>

          <form onSubmit={corregirExamen} className="space-y-5">
            {/* Modo Autopiloto: solo para plan Pro */}
            <div
              className={`rounded-lg border px-4 py-3 flex items-start justify-between gap-3 ${
                autopiloto
                  ? 'border-[color:var(--color-gold)] bg-[color:var(--color-gold)]/10'
                  : 'border-black/10'
              }`}
            >
              <div>
                <p className="text-sm font-semibold text-[color:var(--color-ink)] flex items-center gap-2">
                  Modo Autopiloto
                  {plan !== 'pro' && (
                    <span className="text-[10px] uppercase font-bold bg-[color:var(--color-indigo)] text-white rounded-full px-2 py-0.5">
                      Pro
                    </span>
                  )}
                </p>
                <p className="text-xs text-[color:var(--color-ink)]/60 mt-0.5">
                  {plan === 'pro'
                    ? 'La IA corrige el examen de forma autónoma, sin rúbrica. Tú validas el resultado.'
                    : 'Disponible en el plan Pro: la IA corrige sin necesidad de rúbrica.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => plan === 'pro' && setAutopiloto(!autopiloto)}
                disabled={plan !== 'pro'}
                className={`shrink-0 w-11 h-6 rounded-full relative transition ${
                  autopiloto ? 'bg-[color:var(--color-indigo)]' : 'bg-black/15'
                } ${plan !== 'pro' ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition ${
                    autopiloto ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </div>

            {!autopiloto && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-[color:var(--color-ink)]/80">
                    Rúbrica de corrección
                  </label>
                  {rubricasGuardadas.length > 0 && (
                    <select
                      value={rubricaSeleccionada}
                      onChange={(e) => seleccionarRubrica(e.target.value)}
                      className="text-xs border border-black/10 rounded-md px-2 py-1 outline-none"
                    >
                      <option value="">Cargar rúbrica guardada…</option>
                      {rubricasGuardadas.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.titulo}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <textarea
                  value={rubrica}
                  onChange={(e) => setRubrica(e.target.value)}
                  rows={7}
                  placeholder="Escribe aquí los criterios: preguntas, puntos por pregunta, qué se considera correcto…"
                  className="w-full rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[color:var(--color-indigo)] transition resize-none"
                  required={!autopiloto}
                />

                {/* Guardar rúbrica para reutilizar */}
                {!mostrarGuardar ? (
                  <button
                    type="button"
                    onClick={() => setMostrarGuardar(true)}
                    disabled={!rubrica.trim()}
                    className="mt-2 text-xs text-[color:var(--color-indigo)] hover:underline disabled:text-black/30 disabled:no-underline"
                  >
                    Guardar esta rúbrica para usarla luego
                  </button>
                ) : (
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      value={tituloNuevaRubrica}
                      onChange={(e) => setTituloNuevaRubrica(e.target.value)}
                      placeholder="Nombre para esta rúbrica (ej. Examen Matemáticas 3ºESO)"
                      className="flex-1 text-xs rounded-md border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--color-indigo)]"
                    />
                    <button
                      type="button"
                      onClick={guardarRubricaActual}
                      disabled={guardandoRubrica || !tituloNuevaRubrica.trim()}
                      className="text-xs bg-[color:var(--color-indigo)] text-white rounded-md px-3 py-2 disabled:opacity-50"
                    >
                      {guardandoRubrica ? 'Guardando…' : 'Guardar'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setMostrarGuardar(false)}
                      className="text-xs text-[color:var(--color-ink)]/50 px-2"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            )}

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

            {plan !== 'pro' && (
              <p className="text-center text-xs text-[color:var(--color-ink)]/50">
                {Math.max(LIMITE_CORRECCIONES_GRATIS - usoHoy.correcciones, 0)} de{' '}
                {LIMITE_CORRECCIONES_GRATIS} correcciones gratuitas restantes hoy
              </p>
            )}
          </form>

          {error === 'LIMITE_CORRECCIONES' ? (
            <div className="mt-4 rounded-lg bg-[color:var(--color-indigo)]/5 border border-[color:var(--color-indigo)]/30 px-4 py-3">
              <p className="text-sm font-semibold text-[color:var(--color-ink)]">
                Has alcanzado tus {LIMITE_CORRECCIONES_GRATIS} correcciones gratuitas de hoy
              </p>
              <p className="text-xs text-[color:var(--color-ink)]/60 mt-1 mb-2">
                Pasa a Pro para corregir sin límite diario.
              </p>
              <Link
                href="/#planes"
                className="inline-block text-sm bg-[color:var(--color-indigo)] text-white rounded-lg px-4 py-2 hover:bg-[color:var(--color-indigo-light)] transition"
              >
                Ver planes
              </Link>
            </div>
          ) : (
            error && (
              <p className="mt-4 text-sm text-[color:var(--color-red-pen-dark)] bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )
          )}
        </section>

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

              {resultado.criterios_aplicados && (
                <div className="mb-5 rounded-lg bg-[color:var(--color-gold)]/10 border border-[color:var(--color-gold)] px-4 py-3">
                  <p className="text-xs font-semibold text-[color:var(--color-ink)] mb-1">
                    ⚠ Corrección generada en Modo Autopiloto — revisa con especial atención
                  </p>
                  {resultado.asignatura_detectada && (
                    <p className="text-xs text-[color:var(--color-ink)]/70 mb-1">
                      Asignatura detectada: <strong>{resultado.asignatura_detectada}</strong>
                    </p>
                  )}
                  <p className="text-xs text-[color:var(--color-ink)]/70">
                    Criterios aplicados: {resultado.criterios_aplicados}
                  </p>
                </div>
              )}

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

              {/* Examen corregido visualmente */}
              <div className="mt-6 pt-5 border-t border-black/5">
                <h4 className="text-sm font-semibold text-[color:var(--color-ink)] mb-3">
                  Examen corregido visualmente
                </h4>

                {generandoImagen && (
                  <p className="text-sm text-[color:var(--color-ink)]/50">
                    Dibujando las correcciones sobre la imagen…
                  </p>
                )}

                {errorImagen === 'LIMITE_ANOTACIONES' ? (
                  <div className="rounded-lg bg-[color:var(--color-indigo)]/5 border border-[color:var(--color-indigo)]/30 px-4 py-3">
                    <p className="text-sm font-semibold text-[color:var(--color-ink)]">
                      Has alcanzado tus {LIMITE_ANOTACIONES_GRATIS} fotos corregidas gratuitas de hoy
                    </p>
                    <p className="text-xs text-[color:var(--color-ink)]/60 mt-1 mb-2">
                      La nota y el feedback de arriba sí se han guardado con normalidad. Pasa a Pro para generar fotos anotadas sin límite diario.
                    </p>
                    <Link
                      href="/#planes"
                      className="inline-block text-sm bg-[color:var(--color-indigo)] text-white rounded-lg px-4 py-2 hover:bg-[color:var(--color-indigo-light)] transition"
                    >
                      Ver planes
                    </Link>
                  </div>
                ) : (
                  errorImagen && (
                    <p className="text-sm text-[color:var(--color-ink)]/50">{errorImagen}</p>
                  )
                )}

                {imagenAnotada && (
                  <div>
                    <img
                      src={`data:image/png;base64,${imagenAnotada}`}
                      alt="Examen con las correcciones dibujadas encima"
                      className="rounded-lg border border-black/10 w-full"
                    />
                    <a
                      href={`data:image/png;base64,${imagenAnotada}`}
                      download="examen-corregido.png"
                      className="mt-3 inline-block text-sm text-[color:var(--color-indigo)] hover:underline"
                    >
                      ↓ Descargar examen corregido
                    </a>
                    {plan !== 'pro' && (
                      <p className="text-xs text-[color:var(--color-ink)]/50 mt-1">
                        Las descargas del plan gratuito incluyen una marca de agua de AutoGradely.
                      </p>
                    )}
                  </div>
                )}
              </div>

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
