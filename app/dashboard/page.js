// app/dashboard/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export default function Dashboard() {
  const router = useRouter();

  // Guardamos el usuario logueado. Empieza en null mientras comprobamos
  // si hay sesión activa o no.
  const [usuario, setUsuario] = useState(null);
  const [comprobandoSesion, setComprobandoSesion] = useState(true);

  // Datos del formulario
  const [rubrica, setRubrica] = useState('');
  const [archivo, setArchivo] = useState(null);

  // Estado del proceso de corrección
  const [corrigiendo, setCorrigiendo] = useState(false);
  const [resultado, setResultado] = useState(null); // aquí guardamos el JSON que devuelve la IA
  const [error, setError] = useState('');
  const [guardado, setGuardado] = useState(false);

  // 1. Al cargar la página, comprobamos si hay un profesor logueado.
  // Si no lo hay, lo mandamos de vuelta al login.
  useEffect(() => {
    const desuscribir = onAuthStateChanged(auth, (usuarioActual) => {
      if (usuarioActual) {
        setUsuario(usuarioActual);
      } else {
        router.push('/login');
      }
      setComprobandoSesion(false);
    });
    // Limpiamos el listener cuando el componente se desmonta
    return () => desuscribir();
  }, [router]);

  const cerrarSesion = async () => {
    await signOut(auth);
    router.push('/login');
  };

  // 2. Envía el archivo + rúbrica al endpoint /api/corregir
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

  // 3. Cuando el profesor revisa el resultado y confirma, lo guardamos en Firestore
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

  // Mientras comprobamos si hay sesión, no mostramos nada todavía
  // (evita un parpadeo raro mostrando el formulario y luego redirigiendo)
  if (comprobandoSesion) {
    return <p style={{ padding: '20px' }}>Cargando...</p>;
  }

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>AutoTeacher</h1>
        <button onClick={cerrarSesion} style={{ padding: '8px 12px' }}>
          Cerrar sesión
        </button>
      </div>
      <p>Conectado como: {usuario?.email}</p>

      <hr style={{ margin: '20px 0' }} />

      <h2>Corregir una tarea</h2>

      <form onSubmit={corregirExamen}>
        <div style={{ marginBottom: '12px' }}>
          <label>Rúbrica de corrección</label>
          <br />
          <textarea
            value={rubrica}
            onChange={(e) => setRubrica(e.target.value)}
            rows={6}
            placeholder="Escribe aquí los criterios de corrección: preguntas, puntos por pregunta, qué se considera correcto..."
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label>Foto o PDF de la tarea</label>
          <br />
          {/* "capture" hace que en móvil se abra directamente la cámara */}
          <input
            type="file"
            accept="image/*,application/pdf"
            capture="environment"
            onChange={(e) => setArchivo(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" disabled={corrigiendo} style={{ padding: '10px 16px' }}>
          {corrigiendo ? 'Corrigiendo...' : 'Corregir'}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '12px' }}>{error}</p>}

      {/* 4. Mostramos el resultado para que el profesor lo revise antes de confirmar */}
      {resultado && (
        <div style={{ marginTop: '30px', padding: '16px', border: '1px solid #ccc' }}>
          <h3>
            Resultado: {resultado.nota_total} / {resultado.nota_sobre}
          </h3>

          {resultado.preguntas.map((pregunta) => (
            <div key={pregunta.numero} style={{ marginBottom: '12px' }}>
              <strong>
                Pregunta {pregunta.numero}: {pregunta.puntos_obtenidos} / {pregunta.puntos_totales} puntos
              </strong>
              <p style={{ margin: '4px 0', color: '#555' }}>{pregunta.comentario}</p>
            </div>
          ))}

          <p style={{ fontStyle: 'italic' }}>{resultado.feedback_general}</p>

          {!guardado ? (
            <button onClick={confirmarYGuardar} style={{ padding: '10px 16px', marginTop: '10px' }}>
              Confirmar y guardar
            </button>
          ) : (
            <p style={{ color: 'green', fontWeight: 'bold' }}>✓ Guardado correctamente</p>
          )}
        </div>
      )}
    </div>
  );
}
